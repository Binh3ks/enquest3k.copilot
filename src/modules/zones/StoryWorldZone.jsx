import React, { useState, useRef } from 'react';
import GearIndicator from '../../components/zones/GearIndicator';
import CLILExplorer from '../../components/cambridge/CLILExplorer';
import HoverWord, { renderParsedText } from '../../components/common/HoverWord';
import { Film, Headphones, Mic, Globe, Volume2, Sparkles, CheckCircle2, ChevronRight, Play, Square, RotateCcw, MessageSquare, Info } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';

export default function StoryWorldZone({ data, weekNumber = 33 }) {
  const storyData = data?.storyWorld || {};
  const [currentGear, setCurrentGear] = useState(1);
  const [completedGears, setCompletedGears] = useState([1]);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [highlightMode, setHighlightMode] = useState('vocab');
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  // Gear 2: Sentence Karaoke state
  const [activeSentenceIdx, setActiveSentenceIdx] = useState(null);
  const [isPlayingFullAudio, setIsPlayingFullAudio] = useState(false);

  // Gear 3: Retell to Nova state
  const [isRecording, setIsRecording] = useState(false);
  const [retellAudioUrl, setRetellAudioUrl] = useState(null);
  const [novaFeedback, setNovaFeedback] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const scenes = storyData.storyScenes || [];
  const clilArticle = storyData.clilArticle || null;
  const grammarRegex = storyData.grammarRegex || [];
  const readExplore = storyData.readExplore || {};
  const fullStoryText = readExplore.content_en || "Jake was walking carefully down the school corridor after science class. Suddenly, a boy running fast slipped on the wet floor and fell down heavily. He hurt his knee and lost his balance completely. Jake stopped immediately to help his friend stay calm. He called the school nurse right away. The nurse arrived quickly with a clean bandage and a cold pack to treat the cut. Everyone felt relieved and praised Jake for following safety rules.";

  // Split story into individual sentences for Gear 2
  const storySentences = React.useMemo(() => {
    return fullStoryText
      .split(/(?<=[.!?])\s+/)
      .filter(s => s.trim().length > 0);
  }, [fullStoryText]);

  const currentScene = scenes[activeFrameIndex] || null;
  const currentSceneText = currentScene
    ? (currentScene.description_en || currentScene.en || currentScene.text || currentScene.title_en || '')
    : '';

  const handleNextGear = (targetGear) => {
    setCurrentGear(targetGear);
    if (!completedGears.includes(targetGear)) {
      setCompletedGears(prev => [...prev, targetGear]);
    }
  };

  const handleSpeakSentence = (sentenceText, idx) => {
    setActiveSentenceIdx(idx);
    speakText(sentenceText);
  };

  // Gear 3: Record Voice
  const startRetellRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRetellAudioUrl(audioUrl);
        setNovaFeedback({
          praise: "🎉 Fantastic Retelling! You captured the main action with great rhythm.",
          tip: "💡 Tip: Emphasize action verbs like 'was walking' and 'slipped' for even higher Flyers Speaking marks!"
        });
        if (!completedGears.includes(3)) {
          setCompletedGears(prev => [...prev, 3]);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setNovaFeedback(null);
    } catch (err) {
      console.warn("Microphone access simulated:", err);
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setRetellAudioUrl('/audio/sample_retell.mp3');
        setNovaFeedback({
          praise: "⭐ Wonderful retelling simulated! You spoke with great confidence.",
          tip: "💡 Keep practicing smooth sentence transitions like 'Suddenly' and 'Right away'."
        });
        if (!completedGears.includes(3)) {
          setCompletedGears(prev => [...prev, 3]);
        }
      }, 3000);
    }
  };

  const stopRetellRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* 4-Gear Story World Progression */}
      <GearIndicator
        currentGear={currentGear}
        onSelectGear={setCurrentGear}
        completedGears={completedGears}
      />

      {/* ========================================================================= */}
      {/* GEAR 1: 🎬 3D PIXAR WEBTOON & INTERACTIVE VOCABULARY HOTSPOTS             */}
      {/* ========================================================================= */}
      {currentGear === 1 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-blue-500/40 shadow-xl flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <span className="px-3 py-1 bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 rounded-full text-[10px] font-black uppercase tracking-wider">
                Gear 1 • 3D Webtoon Scene Explorer
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-amber-300">
                🎬 Visual Story & Interactive Hotspots
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Explore 5 3D Pixar scenes. Tap any glowing pin on the picture or any bold word to listen and learn!
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleNextGear(2)}
              className="px-5 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-2xl shadow-lg flex items-center gap-1.5 transition-all hover:scale-105"
            >
              Next: Gear 2 (Audio Narration) <ChevronRight size={16} />
            </button>
          </div>

          {/* 3D Webtoon Scene Card */}
          {scenes.length > 0 && currentScene && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-5">
              {/* Scene Image with Interactive Hotspots */}
              <div className="relative w-full aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-950 shadow-inner border border-slate-200">
                <img
                  src={currentScene.image_url || `/images/week${weekNumber}/webtoon_scene_${activeFrameIndex + 1}.png`}
                  alt={currentSceneText || `Scene ${activeFrameIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/images/scenes/default_story.jpg';
                  }}
                />

                {/* Scene Indicator Badge */}
                <div className="absolute top-3 left-3 px-3.5 py-1.5 bg-black/70 backdrop-blur-md text-amber-300 rounded-full text-xs font-black border border-white/20 shadow-md">
                  Scene {activeFrameIndex + 1} of {scenes.length}
                </div>

                {/* Interactive Hotspot Pins */}
                {currentScene.lexical_chunks?.map((chunk, cIdx) => (
                  <button
                    key={cIdx}
                    type="button"
                    style={{ top: `${chunk.y}%`, left: `${chunk.x}%` }}
                    onClick={() => {
                      setSelectedHotspot(chunk);
                      speakText(chunk.chunk || chunk.word);
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-6 w-6 bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 text-[10px] font-black items-center justify-center shadow-lg border-2 border-white group-hover:scale-125 transition-transform">
                        ✨
                      </span>
                    </div>
                  </button>
                ))}

                {/* Hotspot Definition Tooltip Popup */}
                {selectedHotspot && (
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-4 py-2.5 rounded-2xl border border-amber-400 shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in zoom-in-95 z-20">
                    <span className="text-lg">💡</span>
                    <div>
                      <div className="text-xs font-black text-amber-300">{selectedHotspot.chunk || selectedHotspot.word}</div>
                      <div className="text-[10px] text-slate-300">Tap speaker to hear pronunciation</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => speakText(selectedHotspot.chunk || selectedHotspot.word)}
                      className="p-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl"
                    >
                      <Volume2 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedHotspot(null)}
                      className="text-slate-400 hover:text-white text-xs font-black ml-1"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Listen to Scene Button (Fixed) */}
                <button
                  type="button"
                  onClick={() => speakText(currentSceneText)}
                  className="absolute bottom-3 right-3 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 font-black text-xs border border-white/30 z-10"
                >
                  <Volume2 size={18} /> Listen to Scene
                </button>
              </div>

              {/* Scene Narrative with Hover Dictionary */}
              <div className="p-5 bg-blue-50/70 rounded-2xl border border-blue-200/80 space-y-2">
                <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                  {renderParsedText(currentSceneText, 'blue', null, false, highlightMode, grammarRegex)}
                </div>
              </div>

              {/* Scene Carousel Navigation */}
              <div className="flex items-center justify-between gap-2 pt-2">
                <button
                  type="button"
                  disabled={activeFrameIndex === 0}
                  onClick={() => {
                    setActiveFrameIndex(prev => Math.max(0, prev - 1));
                    setSelectedHotspot(null);
                  }}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 rounded-xl text-xs font-black transition"
                >
                  ◀ Previous Scene
                </button>
                <div className="flex items-center gap-1.5">
                  {scenes.map((_, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => {
                        setActiveFrameIndex(sIdx);
                        setSelectedHotspot(null);
                      }}
                      className={`w-3.5 h-3.5 rounded-full transition-all ${
                        activeFrameIndex === sIdx ? 'bg-blue-600 scale-125 ring-2 ring-blue-300' : 'bg-slate-200 hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  disabled={activeFrameIndex === scenes.length - 1}
                  onClick={() => {
                    setActiveFrameIndex(prev => Math.min(scenes.length - 1, prev + 1));
                    setSelectedHotspot(null);
                  }}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl text-xs font-black transition shadow-md"
                >
                  Next Scene ▶
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* GEAR 2: 🎧 FULL AUDIO NARRATION & SENTENCE KARAOKE                        */}
      {/* ========================================================================= */}
      {currentGear === 2 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-900 via-orange-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-amber-500/40 shadow-xl flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <span className="px-3 py-1 bg-amber-500/30 text-amber-200 border border-amber-400/40 rounded-full text-[10px] font-black uppercase tracking-wider">
                Gear 2 • Full Audio Narration
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-amber-300">
                🎧 Continuous Story Narration & Sentence Replay
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Listen to the full studio audio. Tap any sentence to replay it individually with native pronunciation!
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleNextGear(3)}
              className="px-5 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs rounded-2xl shadow-lg flex items-center gap-1.5 transition-all hover:scale-105"
            >
              Next: Gear 3 (Retell to Nova) <ChevronRight size={16} />
            </button>
          </div>

          {/* Full Story Interactive Sentence List */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎙️</span>
                <div>
                  <h3 className="text-base font-black text-slate-900">Story Sentence Karaoke</h3>
                  <span className="text-xs text-slate-500">Tap any sentence to listen</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => speakText(fullStoryText)}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-black text-xs shadow-md flex items-center gap-2"
              >
                <Play size={16} /> Play Entire Story Audio
              </button>
            </div>

            <div className="space-y-3">
              {storySentences.map((sentence, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSpeakSentence(sentence, idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    activeSentenceIdx === idx
                      ? 'bg-amber-50 border-amber-300 shadow-md ring-2 ring-amber-200'
                      : 'bg-slate-50/80 hover:bg-amber-50/50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {sentence}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="p-2 text-amber-600 hover:bg-amber-200 rounded-xl shrink-0"
                    title="Replay this sentence"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GEAR 3: 🎙️ RETELL TO NOVA (VOICE RECORDING & ENCOURAGING FEEDBACK)        */}
      {/* ========================================================================= */}
      {currentGear === 3 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-purple-500/40 shadow-xl flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <span className="px-3 py-1 bg-purple-500/30 text-purple-200 border border-purple-400/40 rounded-full text-[10px] font-black uppercase tracking-wider">
                Gear 3 • Retell to Nova
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-amber-300">
                🎙️ Record Your 30-Second Story Retelling
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Tell Nova what happened in the corridor. Mascot Nova will listen and cheer for your speaking confidence!
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleNextGear(4)}
              className="px-5 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-black text-xs rounded-2xl shadow-lg flex items-center gap-1.5 transition-all hover:scale-105"
            >
              Next: Gear 4 (CLIL Science) <ChevronRight size={16} />
            </button>
          </div>

          {/* Recording Studio Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 text-center">
            {/* Mascot Nova Prompt Box */}
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 flex items-center gap-3 text-left">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-2xl shrink-0 shadow-md">
                🤖
              </div>
              <div>
                <h4 className="text-sm font-black text-purple-950">Mascot Nova is Listening!</h4>
                <p className="text-xs text-purple-800">
                  "Hi friend! Press the big button and tell me what Jake saw in the school corridor!"
                </p>
              </div>
            </div>

            {/* Record Control */}
            <div className="py-4 space-y-4">
              {!isRecording ? (
                <button
                  type="button"
                  onClick={startRetellRecording}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white rounded-3xl font-black text-base shadow-xl shadow-purple-500/25 transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                >
                  <Mic size={22} />
                  {retellAudioUrl ? 'Record Retelling Again' : 'Start 30s Voice Retell'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopRetellRecording}
                  className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-3xl font-black text-base shadow-xl shadow-rose-600/30 transition-all animate-pulse inline-flex items-center gap-2"
                >
                  <Square size={22} />
                  Stop Recording (I am Done)
                </button>
              )}

              {/* Playback Recording */}
              {retellAudioUrl && (
                <div className="p-4 bg-slate-900 text-white rounded-2xl border border-purple-500/40 max-w-md mx-auto flex items-center justify-between gap-3 shadow-lg">
                  <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                    <CheckCircle2 size={16} className="text-emerald-400" /> Your Recording
                  </span>
                  <audio src={retellAudioUrl} controls className="h-8 max-w-[200px]" />
                </div>
              )}

              {/* Nova Cheerful Feedback */}
              {novaFeedback && (
                <div className="p-5 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl text-left space-y-2 max-w-xl mx-auto animate-in fade-in">
                  <div className="text-sm font-black text-purple-950 flex items-center gap-2">
                    <Sparkles className="text-amber-500" size={18} />
                    {novaFeedback.praise}
                  </div>
                  <p className="text-xs font-medium text-purple-800">
                    {novaFeedback.tip}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GEAR 4: 🌍 CLIL SCIENCE & LOGIC EXPLORER (FRICTION & SAFETY)              */}
      {/* ========================================================================= */}
      {currentGear === 4 && clilArticle && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-emerald-500/40 shadow-xl flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <span className="px-3 py-1 bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 rounded-full text-[10px] font-black uppercase tracking-wider">
                Gear 4 • CLIL Science Deep Reading
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-amber-300">
                🌍 The Physics of Friction: Deep Science Article
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Explore why water reduces friction to zero, translate key scientific sentences and solve Bloom comprehension tasks.
              </p>
            </div>
          </div>

          <CLILExplorer
            clilData={clilArticle}
            highlightMode={highlightMode}
            setHighlightMode={setHighlightMode}
            targetGrammarRegex={grammarRegex}
          />
        </div>
      )}
    </div>
  );
}
