import React, { useState, useRef } from 'react';
import GearIndicator from '../../components/zones/GearIndicator';
import CLILExplorer from '../../components/cambridge/CLILExplorer';
import HoverWord, { renderParsedText } from '../../components/common/HoverWord';
import { Film, Headphones, Mic, Globe, Volume2, Sparkles, CheckCircle2, ChevronRight, Play, Square, RotateCcw, MessageSquare, Info } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';

export default function StoryWorldZone({ data, weekNumber = 33 }) {
  const storyData = data?.storyWorld || {};
  const [currentGear, setCurrentGear] = useState(1);
  const [completedGears, setCompletedGears] = useState([1]);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [highlightMode, setHighlightMode] = useState('vocab');
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  // Gear 2: Sentence Karaoke state
  const [activeSentenceIdx, setActiveSentenceIdx] = useState(null);
  const [activeWordIdx, setActiveWordIdx] = useState(null);

  // Gear 3: Retell to Nova state
  const [isRecording, setIsRecording] = useState(false);
  const [retellAudioUrl, setRetellAudioUrl] = useState(null);
  const [novaFeedback, setNovaFeedback] = useState(null);
  const [selectedStarter, setSelectedStarter] = useState('');
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

  // Word-by-Word Karaoke Highlighting Simulation
  const handleSpeakSentence = (sentenceText, idx) => {
    setActiveSentenceIdx(idx);
    setActiveWordIdx(0);
    speakText(sentenceText);

    const words = sentenceText.split(/\s+/);
    let wordCount = 0;
    const interval = setInterval(() => {
      wordCount++;
      if (wordCount < words.length) {
        setActiveWordIdx(wordCount);
      } else {
        clearInterval(interval);
        setActiveWordIdx(null);
      }
    }, 320); // 320ms per word Karaoke highlight speed
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
          tip: "💡 Tip: Emphasize action verbs like 'was walking' and 'slipped' for higher marks!"
        });
        fireCelebrationConfetti('Retell_Complete');
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
        setRetellAudioUrl('simulated_retell_audio');
        setNovaFeedback({
          praise: "⭐ Wonderful retelling simulated! You spoke with great confidence.",
          tip: "💡 Keep practicing smooth sentence transitions like 'Suddenly' and 'Right away'."
        });
        fireCelebrationConfetti('Retell_Complete');
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
    <div className="w-full max-w-5xl mx-auto space-y-5 animate-in fade-in duration-300 font-sans">
      {/* 4-Gear Story World Progression Bar */}
      <GearIndicator
        currentGear={currentGear}
        onSelectGear={setCurrentGear}
        completedGears={completedGears}
      />

      {/* ========================================================================= */}
      {/* GEAR 1: 🎬 3D PIXAR WEBTOON & INTERACTIVE VOCABULARY HOTSPOTS             */}
      {/* ========================================================================= */}
      {currentGear === 1 && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-blue-500/40 shadow-md flex items-center justify-between flex-wrap gap-3">
            <div className="space-y-0.5">
              <span className="px-2.5 py-0.5 bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 rounded-full text-[10px] font-black uppercase tracking-wider">
                Gear 1 • 3D Webtoon Scene Explorer
              </span>
              <h2 className="text-lg font-black text-amber-300">
                🎬 Visual Story & Interactive Hotspots
              </h2>
            </div>
            <button
              type="button"
              onClick={() => handleNextGear(2)}
              className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 text-slate-950 font-black text-xs rounded-xl shadow flex items-center gap-1 transition-all hover:scale-105"
            >
              Next: Gear 2 (Audio Narration) <ChevronRight size={14} />
            </button>
          </div>

          {/* Webtoon Viewer */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-md space-y-4">
            {currentScene && (
              <div className="space-y-3">
                <div className="relative w-full aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-200 shadow-md">
                  <img
                    src={currentScene.image_url}
                    alt={currentScene.title_en || 'Scene image'}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = '/images/scenes/default_story.jpg'; }}
                  />

                  {/* Render Pins */}
                  {currentScene.lexical_chunks?.map((chunk, cIdx) => (
                    <button
                      key={cIdx}
                      type="button"
                      onClick={() => {
                        setSelectedHotspot(chunk);
                        speakText(chunk.text);
                      }}
                      style={{ left: `${chunk.x || 30 + cIdx * 25}%`, top: `${chunk.y || 40 + (cIdx % 2) * 20}%` }}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 bg-amber-400/95 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-full shadow-lg border-2 border-white flex items-center gap-1 animate-bounce transition hover:scale-110 z-10"
                    >
                      ✨ {chunk.text}
                    </button>
                  ))}

                  {selectedHotspot && (
                    <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-950/90 text-white rounded-xl border border-amber-400 backdrop-blur-md animate-in fade-in flex items-center justify-between z-20">
                      <div>
                        <span className="text-amber-300 text-xs font-black">{selectedHotspot.text}</span>
                        <p className="text-[11px] text-slate-300 italic">{selectedHotspot.vi}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedHotspot(null)}
                        className="text-slate-400 hover:text-white text-xs font-black ml-1"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => speakText(currentSceneText)}
                    className="absolute bottom-3 right-3 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl shadow-md transition flex items-center gap-1.5 font-black text-xs border border-white/30 z-10"
                  >
                    <Volume2 size={16} /> Listen to Scene
                  </button>
                </div>

                <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200/80">
                  <div className="text-base font-bold text-slate-900 leading-relaxed">
                    {renderParsedText(currentSceneText, 'blue', null, false, highlightMode, grammarRegex)}
                  </div>
                </div>

                {/* Carousel controls */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    disabled={activeFrameIndex === 0}
                    onClick={() => setActiveFrameIndex(prev => Math.max(0, prev - 1))}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 rounded-xl text-xs font-black"
                  >
                    ◀ Previous
                  </button>
                  <span className="text-xs font-bold text-slate-500">Scene {activeFrameIndex + 1} of {scenes.length}</span>
                  <button
                    type="button"
                    disabled={activeFrameIndex === scenes.length - 1}
                    onClick={() => setActiveFrameIndex(prev => Math.min(scenes.length - 1, prev + 1))}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl text-xs font-black shadow"
                  >
                    Next ▶
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GEAR 2: 🎧 FULL AUDIO NARRATION & WORD-BY-WORD KARAOKE                    */}
      {/* ========================================================================= */}
      {currentGear === 2 && (
        <div className="space-y-4">
          {/* Compact Soft Banner */}
          <div className="bg-gradient-to-r from-amber-900 via-orange-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-amber-500/40 shadow-md flex items-center justify-between flex-wrap gap-3">
            <div className="space-y-0.5">
              <span className="px-2.5 py-0.5 bg-amber-500/30 text-amber-200 border border-amber-400/40 rounded-full text-[10px] font-black uppercase tracking-wider">
                Gear 2 • Full Audio Narration
              </span>
              <h2 className="text-lg font-black text-amber-300">
                🎧 Continuous Story Narration & Word-by-Word Karaoke
              </h2>
            </div>
            <button
              type="button"
              onClick={() => handleNextGear(3)}
              className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 text-slate-950 font-black text-xs rounded-xl shadow flex items-center gap-1 transition"
            >
              Next: Gear 3 (Retell to Nova) <ChevronRight size={14} />
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎙️</span>
                <div>
                  <h3 className="text-base font-black text-slate-900">Story Sentence Karaoke</h3>
                  <span className="text-xs text-slate-500">Tap any sentence to listen & practice word-by-word karaoke</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => speakText(fullStoryText)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-black text-xs shadow-md flex items-center gap-1.5"
              >
                <Play size={15} /> Play Entire Story Audio
              </button>
            </div>

            {/* Sentences with Real Word-by-Word Karaoke */}
            <div className="space-y-3">
              {storySentences.map((sentence, idx) => {
                const isCurrentPlaying = activeSentenceIdx === idx;
                const sentenceWords = sentence.split(/\s+/);

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                      isCurrentPlaying
                        ? 'bg-amber-100/90 border-amber-400 shadow-lg ring-4 ring-amber-300'
                        : 'bg-slate-50 hover:bg-amber-50/60 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <span className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center shrink-0 mt-0.5 ${
                        isCurrentPlaying ? 'bg-amber-500 text-slate-950 font-black animate-pulse' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {idx + 1}
                      </span>
                      <div>
                        {/* Word-by-Word Karaoke Text */}
                        <div className="text-sm sm:text-base font-black leading-relaxed flex flex-wrap gap-1">
                          {sentenceWords.map((word, wIdx) => {
                            const isWordActive = isCurrentPlaying && activeWordIdx === wIdx;
                            return (
                              <span
                                key={wIdx}
                                className={`px-1 py-0.5 rounded transition-all ${
                                  isWordActive
                                    ? 'bg-amber-400 text-slate-950 font-black scale-110 ring-2 ring-amber-300'
                                    : isCurrentPlaying && activeWordIdx !== null && wIdx < activeWordIdx
                                    ? 'text-amber-900 font-bold'
                                    : 'text-slate-900'
                                }`}
                              >
                                {word}
                              </span>
                            );
                          })}
                        </div>
                        {isCurrentPlaying && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-amber-800 tracking-wider mt-1 bg-amber-200/80 px-2 py-0.5 rounded-md">
                            <Sparkles size={12} className="animate-spin text-amber-600" /> 🎤 Real-Time Karaoke Syncing...
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleSpeakSentence(sentence, idx)}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-black text-xs shadow-sm flex items-center gap-1.5 transition active:scale-95"
                      >
                        <Volume2 size={16} /> Listen
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleSpeakSentence(sentence, idx);
                        }}
                        className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white rounded-xl font-black text-xs shadow-sm flex items-center gap-1.5 transition active:scale-95"
                      >
                        🎙️ Shadowing
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GEAR 3: 🎙️ RETELL TO NOVA (MASCOT STARTERS & FUN FEEDBACK)                 */}
      {/* ========================================================================= */}
      {currentGear === 3 && (
        <div className="space-y-4">
          {/* Compact Soft Banner */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-purple-500/40 shadow-md flex items-center justify-between flex-wrap gap-3">
            <div className="space-y-0.5">
              <span className="px-2.5 py-0.5 bg-purple-500/30 text-purple-200 border border-purple-400/40 rounded-full text-[10px] font-black uppercase tracking-wider">
                Gear 3 • Retell to Nova
              </span>
              <h2 className="text-lg font-black text-amber-300">
                🎙️ Record Your 30-Second Story Retelling
              </h2>
            </div>
            <button
              type="button"
              onClick={() => handleNextGear(4)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 text-white font-black text-xs rounded-xl shadow flex items-center gap-1 transition"
            >
              Next: Gear 4 (CLIL Knowledge Explorer) <ChevronRight size={14} />
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md space-y-5">
            {/* Mascot Nova Prompts (Half Stems & Target Vocab) */}
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-2xl shrink-0 shadow-md">
                🤖
              </div>
              <div className="space-y-3 flex-1">
                <h4 className="text-xs font-black uppercase text-purple-900 tracking-wider">Mascot Nova is Listening!</h4>
                <p className="text-xs text-purple-800 font-bold">
                  "Hi friend! Tap half sentence starters or target vocab pills below to help you speak with confidence!"
                </p>

                {/* Retell Half Starters */}
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-purple-900 tracking-wider">
                    ✨ Half Sentence Starters:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "First, Jake was walking...",
                      "Suddenly, a student slipped...",
                      "Finally, the school nurse..."
                    ].map((starter, sIdx) => (
                      <button
                        key={sIdx}
                        type="button"
                        onClick={() => setSelectedStarter(prev => prev ? `${prev} ${starter}` : starter)}
                        className="px-3 py-1 bg-white hover:bg-purple-100 border border-purple-300 text-purple-900 rounded-xl text-xs font-bold transition shadow-sm text-left"
                      >
                        + {starter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Vocab Pills */}
                <div className="space-y-1 pt-1 border-t border-purple-200/60">
                  <span className="text-[10px] font-black uppercase text-purple-900 tracking-wider">
                    🎯 Target Vocab & Action Verbs:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {["carefully", "running fast", "wet floor", "hurt knee", "clean bandage", "relieved"].map((vocab, vIdx) => (
                      <button
                        key={vIdx}
                        type="button"
                        onClick={() => setSelectedStarter(prev => prev ? `${prev} ${vocab}` : vocab)}
                        className="px-2.5 py-1 bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 rounded-lg text-xs font-bold transition"
                      >
                        + {vocab}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {selectedStarter && (
              <div className="p-3 bg-purple-100 border border-purple-300 rounded-xl text-purple-950 text-xs font-bold">
                Selected Prompt: <span className="font-black text-purple-900">"{selectedStarter}"</span>
              </div>
            )}

            {/* Controls */}
            <div className="text-center py-4 space-y-3">
              {!isRecording ? (
                <button
                  type="button"
                  onClick={startRetellRecording}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white rounded-2xl font-black text-base shadow-xl inline-flex items-center gap-3 transition hover:scale-105"
                >
                  <Mic size={22} className="animate-pulse" /> 🎙️ START 30S VOICE RETELL
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopRetellRecording}
                  className="px-8 py-4 bg-rose-600 text-white rounded-2xl font-black text-base shadow-xl inline-flex items-center gap-3 transition animate-bounce"
                >
                  <Square size={22} fill="currentColor" /> ⏹️ STOP RECORDING
                </button>
              )}
            </div>

            {novaFeedback && (
              <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs font-bold space-y-1 animate-in fade-in">
                <div className="font-black text-sm text-emerald-800">{novaFeedback.praise}</div>
                <div className="text-emerald-700">{novaFeedback.tip}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GEAR 4: 🌍 CLIL KNOWLEDGE EXPLORER (2 PARAGRAPHS & CHECK QUESTIONS)       */}
      {/* ========================================================================= */}
      {currentGear === 4 && (
        <CLILExplorer
          clilData={clilArticle || readExplore}
          weekNumber={weekNumber}
          highlightMode={highlightMode}
          setHighlightMode={setHighlightMode}
          targetGrammarRegex={grammarRegex}
        />
      )}
    </div>
  );
}
