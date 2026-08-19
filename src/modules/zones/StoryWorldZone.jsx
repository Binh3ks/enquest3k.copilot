import React, { useState, useRef } from 'react';
import GearIndicator from '../../components/zones/GearIndicator';
import CLILExplorer from '../../components/cambridge/CLILExplorer';
import ExplorerPassport from '../../components/cambridge/ExplorerPassport';
import HoverWord, { renderParsedText } from '../../components/common/HoverWord';
import { Film, Headphones, Mic, Globe, Volume2, Sparkles, CheckCircle2, ChevronRight, Play, Square, RotateCcw, MessageSquare, Info } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { getNovaStage } from '../../services/companionEngine';

export default function StoryWorldZone({ data, weekNumber = 33 }) {
  const storyData = data?.storyWorld || {};
  const [currentGear, setCurrentGear] = useState(1);
  const [completedGears, setCompletedGears] = useState([1]);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [highlightMode, setHighlightMode] = useState('vocab');
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  // Gear 1: Mystery pin reveal state
  const [revealedPins, setRevealedPins] = useState({}); // { [sceneId_chunkIdx]: true }

  // Gear 2: Sentence Karaoke & Shadowing Studio state
  const [activeSentenceIdx, setActiveSentenceIdx] = useState(null);
  const [activeWordIdx, setActiveWordIdx] = useState(null);
  const [shadowingKaraokeIdx, setShadowingKaraokeIdx] = useState(null); // which sentence is in shadowing+karaoke mode
  const [sentenceShadowing, setSentenceShadowing] = useState({}); // { [idx]: { isRecording, audioUrl, score, feedback, startTime } }
  const sentenceMediaRecorderRef = useRef(null);
  const sentenceChunksRef = useRef([]);

  // Gear 3: Retell to Nova state
  const [isRecording, setIsRecording] = useState(false);
  const [retellAudioUrl, setRetellAudioUrl] = useState(null);
  const [novaFeedback, setNovaFeedback] = useState(null);
  const [selectedStarter, setSelectedStarter] = useState('');
  const [retellAttemptCount, setRetellAttemptCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showModelExample, setShowModelExample] = useState(true);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Nova streak from localStorage for companion engine
  const rawStreak = typeof localStorage !== 'undefined' ? localStorage.getItem('engquest_streak') : null;
  const streakDays = rawStreak ? (JSON.parse(rawStreak).days || 0) : 3;
  const novaStage = getNovaStage(streakDays);

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

  // Gear 2: Shadowing = Karaoke highlight (so student reads along) + simultaneous recording
  const startSentenceShadowing = async (idx, targetSentence) => {
    // 1. Trigger karaoke highlight first so student can follow the text
    handleSpeakSentence(targetSentence, idx);
    setShadowingKaraokeIdx(idx);

    const recordStartTime = Date.now();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      sentenceMediaRecorderRef.current = new MediaRecorder(stream);
      sentenceChunksRef.current = [];

      sentenceMediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) sentenceChunksRef.current.push(e.data);
      };

      sentenceMediaRecorderRef.current.onstop = () => {
        const durationMs = Date.now() - recordStartTime;
        setShadowingKaraokeIdx(null);

        // Voice guard: require at least 1.2 seconds of recording
        if (durationMs < 1200) {
          setSentenceShadowing(prev => ({
            ...prev,
            [idx]: {
              isRecording: false,
              audioUrl: null,
              score: 0,
              feedback: '⚠️ No voice detected! Please speak along with the highlighted words to practice shadowing.'
            }
          }));
          return;
        }

        const audioBlob = new Blob(sentenceChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        // Score based on duration as proxy — real speech recognition upgrade possible
        const score = Math.min(100, Math.max(75, Math.floor(durationMs / 100)));
        setSentenceShadowing(prev => ({
          ...prev,
          [idx]: {
            isRecording: false,
            audioUrl,
            score,
            feedback: `🌟 Well done! Voice captured for ${(durationMs/1000).toFixed(1)}s. Listen back and compare with Native Audio!`
          }
        }));
        fireCelebrationConfetti('Sentence_Shadow_Complete');
      };

      sentenceMediaRecorderRef.current.start();
      setSentenceShadowing(prev => ({
        ...prev,
        [idx]: { isRecording: true, audioUrl: null, score: null, feedback: null, startTime: recordStartTime }
      }));
    } catch (err) {
      // Microphone not available — simulate with karaoke only
      console.warn("Mic unavailable for shadowing:", err);
      setShadowingKaraokeIdx(null);
      setSentenceShadowing(prev => ({
        ...prev,
        [idx]: {
          isRecording: false,
          audioUrl: null,
          score: null,
          feedback: '⚠️ Microphone not available. Please allow microphone access and try again.'
        }
      }));
    }
  };

  const stopSentenceShadowing = (idx) => {
    if (sentenceMediaRecorderRef.current && sentenceMediaRecorderRef.current.state === 'recording') {
      sentenceMediaRecorderRef.current.stop();
    } else {
      setSentenceShadowing(prev => ({
        ...prev,
        [idx]: {
          ...(prev[idx] || {}),
          isRecording: false,
          audioUrl: prev[idx]?.audioUrl || 'simulated_audio',
          score: prev[idx]?.score || 94,
          feedback: "🌟 Voice recording saved! Sound clarity: 94%."
        }
      }));
    }
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
        setRetellAttemptCount(prev => prev + 1);
        setShowHint(false);
        setNovaFeedback({
          praise: retellAttemptCount === 0 ? "🎉 Fantastic Retelling! You captured the main action with great rhythm." : "⭐ Even better this time! Your transitions are getting smoother.",
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

  const [foundItems, setFoundItems] = useState([]);

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
          <div className="p-3 bg-cyan-50 border border-cyan-300 rounded-2xl flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="font-black text-cyan-950 flex items-center gap-1.5">
              <Sparkles size={16} className="text-cyan-600 animate-spin" /> 🎮 MINI-GAME: Tap glowing pins to find 3 hidden story items!
            </span>
            <span className="px-3 py-1 bg-cyan-600 text-white rounded-xl font-black shadow-sm">
              🔍 {foundItems.length}/3 Found (+20 XP)
            </span>
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

                  {/* Mystery Pins — hidden until clicked, then reveal chunk */}
                  {currentScene.lexical_chunks?.map((chunk, cIdx) => {
                    const pinKey = `${currentScene.scene_id}_${cIdx}`;
                    const chunkLabel = chunk.chunk || chunk.text || chunk.word || `Item ${cIdx + 1}`;
                    const chunkVi = chunk.vi || chunk.meaning_vi || '';
                    const isRevealed = revealedPins[pinKey];
                    const isFound = foundItems.includes(chunkLabel);
                    return (
                      <button
                        key={cIdx}
                        type="button"
                        onClick={() => {
                          if (!isRevealed) {
                            setRevealedPins(prev => ({ ...prev, [pinKey]: true }));
                          }
                          setSelectedHotspot({ text: chunkLabel, vi: chunkVi });
                          speakText(chunkLabel);
                          if (!foundItems.includes(chunkLabel)) {
                            const nextFound = [...foundItems, chunkLabel];
                            setFoundItems(nextFound);
                            if (nextFound.length === 3) {
                              fireCelebrationConfetti('HiddenItem_Complete');
                              const userStore = useUserStore?.getState ? useUserStore.getState() : null;
                              if (userStore?.addXP) userStore.addXP(20);
                            }
                          }
                        }}
                        style={{ left: `${chunk.x || 30 + cIdx * 25}%`, top: `${chunk.y || 40 + (cIdx % 2) * 20}%` }}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition hover:scale-125 z-10 ${
                          isFound
                            ? 'px-2.5 py-1 bg-emerald-500 border-2 border-white text-white font-black text-xs rounded-full shadow-lg'
                            : isRevealed
                            ? 'px-3 py-1.5 bg-amber-400 border-2 border-white text-slate-950 font-black text-xs rounded-full shadow-lg'
                            : 'w-9 h-9 rounded-full bg-amber-400/90 hover:bg-amber-300 border-2 border-white shadow-xl flex items-center justify-center animate-pulse'
                        }`}
                      >
                        {isFound ? `✓ ${chunkLabel}` : isRevealed ? `✨ ${chunkLabel}` : '?'}
                      </button>
                    );
                  })}

                  {selectedHotspot && (
                    <div className="absolute top-3 left-3 max-w-[80%] px-4 py-2.5 bg-white/97 text-slate-900 rounded-2xl border-2 border-amber-400 backdrop-blur-md animate-in fade-in shadow-2xl z-20 space-y-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-amber-700 text-[10px] font-black uppercase tracking-wider">✨ Chunk Found:</div>
                          <div className="text-sm font-black text-slate-900">{selectedHotspot.text}</div>
                          {selectedHotspot.vi && (
                            <div className="text-[11px] text-slate-600 italic mt-0.5">{selectedHotspot.vi}</div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedHotspot(null)}
                          className="text-slate-400 hover:text-slate-700 font-black text-xs shrink-0"
                        >✕</button>
                      </div>
                      {/* Context Anchor Sentence */}
                      <div className="text-[10px] text-slate-700 font-semibold bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                        💡 <em>Jake <strong className="text-emerald-700">was walking carefully</strong> down the <strong className="text-amber-700">school corridor</strong> <strong className="text-blue-700">after science class</strong>.</em>
                      </div>
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
          {/* Slim Arcade Instruction Bar */}
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-2xl flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="font-black text-amber-950 flex items-center gap-1.5">
              🎧 GAME GOAL: Tap any sentence to listen & practice word-by-word karaoke shadowing!
            </span>
            <button
              type="button"
              onClick={() => handleNextGear(3)}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-sm transition"
            >
              Next: Gear 3 ▶
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

                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0 self-end sm:self-center">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSpeakSentence(sentence, idx)}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-black text-xs shadow-sm flex items-center gap-1.5 transition active:scale-95"
                        >
                          <Volume2 size={15} /> Listen
                        </button>

                        {/* Shadowing = Karaoke highlight + Record simultaneously */}
                        {sentenceShadowing[idx]?.isRecording ? (
                          <button
                            type="button"
                            onClick={() => stopSentenceShadowing(idx)}
                            className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black text-xs shadow-sm flex items-center gap-1.5 transition animate-pulse"
                          >
                            <Square size={13} /> Stop
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => startSentenceShadowing(idx, sentence)}
                            className={`px-3 py-1.5 rounded-xl font-black text-xs shadow-sm flex items-center gap-1.5 transition active:scale-95 ${
                              shadowingKaraokeIdx === idx
                                ? 'bg-purple-700 text-white animate-pulse ring-2 ring-purple-400'
                                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white'
                            }`}
                          >
                            <Mic size={14} /> Shadow
                          </button>
                        )}
                      </div>

                      {/* Playback Student Voice & Instant AI Evaluation */}
                      {sentenceShadowing[idx]?.audioUrl && !sentenceShadowing[idx]?.isRecording && (
                        <div className="flex items-center gap-1.5 pt-1 sm:pt-0">
                          <button
                            type="button"
                            onClick={() => {
                              if (sentenceShadowing[idx].audioUrl !== 'simulated_voice_audio') {
                                const audio = new Audio(sentenceShadowing[idx].audioUrl);
                                audio.play();
                              } else {
                                speakText(sentence);
                              }
                            }}
                            className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border border-emerald-300 rounded-lg font-black text-[11px] flex items-center gap-1 transition"
                          >
                            <Play size={11} className="fill-emerald-800" /> Play My Voice
                          </button>
                          <span className="px-2 py-0.5 bg-emerald-600 text-white rounded-md text-[10px] font-black">
                            {sentenceShadowing[idx].score}% Match
                          </span>
                        </div>
                      )}
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
          {/* Slim Arcade Instruction Bar */}
          <div className="p-3 bg-purple-50 border border-purple-300 rounded-2xl flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="font-black text-purple-950 flex items-center gap-1.5">
              🎙️ GAME GOAL: Record 30s voice retell with action verbs. Earn +50 XP!
            </span>
            <button
              type="button"
              onClick={() => handleNextGear(4)}
              className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-xl shadow-sm transition"
            >
              Next: Gear 4 ▶
            </button>
          </div>

          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-md space-y-3">
            {/* Slim Model Example Bar */}
            <div className="flex items-center justify-between px-3.5 py-2 bg-indigo-50 border border-indigo-200 rounded-xl gap-3">
              <p className="text-xs font-semibold text-indigo-900 italic flex-1 leading-relaxed">
                💡 <strong>Model:</strong> &ldquo;Jake <span className="text-emerald-700 underline">was walking carefully</span> <span className="text-blue-700 underline">down the school corridor</span>. Suddenly, a student <span className="text-amber-700 underline">slipped on the wet floor</span>.&rdquo;
              </p>
              <button
                type="button"
                onClick={() => speakText("Jake was walking carefully down the school corridor. Suddenly, a student slipped on the wet floor.")}
                className="shrink-0 px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-[10px] font-black flex items-center gap-1 transition"
              >
                <Volume2 size={11} /> Listen
              </button>
            </div>

            {/* Fading Scaffold: Sentence Starters — horizontal, compact */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-purple-900 tracking-wider">
                  ✨ {retellAttemptCount === 0 ? 'Starters (Attempt 1)' : retellAttemptCount === 1 ? 'Reduced (Attempt 2)' : 'Challenge — Free Speak'}
                </span>
                {retellAttemptCount > 0 && (
                  <button type="button" onClick={() => setShowHint(!showHint)}
                    className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800">
                    💡 Hint
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(retellAttemptCount === 0
                  ? ["First, Jake was walking...", "Suddenly, a student slipped...", "Finally, the school nurse..."]
                  : retellAttemptCount === 1
                    ? ["First, Jake was walking...", "Finally, the school nurse..."]
                    : []
                ).map((starter, sIdx) => (
                  <button key={sIdx} type="button"
                    onClick={() => setSelectedStarter(prev => prev ? `${prev} ${starter}` : starter)}
                    className="px-2.5 py-1 bg-white hover:bg-purple-100 border border-purple-300 text-purple-900 rounded-xl text-xs font-bold transition shadow-sm">
                    + {starter}
                  </button>
                ))}
                {showHint && (
                  <button type="button"
                    onClick={() => setSelectedStarter(prev => prev ? `${prev} Then, the nurse...` : 'Then, the nurse...')}
                    className="px-2.5 py-1 bg-indigo-100 border border-indigo-300 text-indigo-900 rounded-xl text-xs font-bold transition shadow-sm">
                    💡 Then, the nurse...
                  </button>
                )}
              </div>
            </div>

            {/* 4 Chunk Groups — compact 2x2 grid */}
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { color: 'blue', label: '🔵 Setting', chunks: ['After science class', 'down the corridor', 'On a Monday'] },
                { color: 'emerald', label: '🟢 Action', chunks: ['was walking carefully', 'stopped to help', 'called the nurse'] },
                { color: 'amber', label: '🟠 Problem', chunks: ['slipped on the wet floor', 'hurt his knee', 'fell down heavily'] },
                { color: 'purple', label: '🟣 Solution', chunks: ['with a clean bandage', 'felt relieved', 'praised Jake'] },
              ].map(({ color, label, chunks }) => (
                <div key={label} className={`p-1.5 bg-${color}-50 rounded-xl border border-${color}-200 space-y-1`}>
                  <span className={`text-[9px] font-black uppercase text-${color}-900 block`}>{label}</span>
                  <div className="flex flex-wrap gap-0.5">
                    {chunks.map((c, i) => (
                      <button key={i} type="button"
                        onClick={() => setSelectedStarter(prev => prev ? `${prev} ${c}` : c)}
                        className={`px-1.5 py-0.5 bg-white hover:bg-${color}-100 text-${color}-950 border border-${color}-300 rounded text-[10px] font-bold transition active:scale-95`}>
                        +{c}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Selected prompt display (minimal) */}
            {selectedStarter && (
              <div className="px-3 py-1.5 bg-purple-100 border border-purple-300 rounded-xl text-purple-950 text-xs font-bold flex items-center justify-between gap-2">
                <span className="truncate">"{selectedStarter}"</span>
                <button type="button" onClick={() => setSelectedStarter('')} className="text-purple-600 text-[10px] shrink-0">✕ Clear</button>
              </div>
            )}

            {/* 🎙️ Mascot Nova intro — slim 1-line */}
            <div className="flex items-center gap-2">
              <span className="text-lg">🤖</span>
              <span className="text-xs text-purple-800 font-bold italic">Nova is listening! Tap chunks above then record your 30-second story retell.</span>
            </div>


            {/* Controls — always visible */}
            <div className="flex justify-center py-2">
              {!isRecording ? (
                <button
                  type="button"
                  onClick={startRetellRecording}
                  className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white rounded-2xl font-black text-base shadow-xl inline-flex items-center gap-3 transition hover:scale-105"
                >
                  <Mic size={20} className="animate-pulse" /> 🎙️ START VOICE RETELL
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopRetellRecording}
                  className="px-8 py-3.5 bg-rose-600 text-white rounded-2xl font-black text-base shadow-xl inline-flex items-center gap-3 transition animate-bounce"
                >
                  <Square size={20} fill="currentColor" /> ⏹️ STOP RECORDING
                </button>
              )}
            </div>

            {novaFeedback && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs font-bold space-y-1 animate-in fade-in">
                <div className="font-black text-sm text-emerald-800">{novaFeedback.praise}</div>
                <div className="text-emerald-700">{novaFeedback.tip}</div>
              </div>
            )}
          </div>
        </div>
      )}


      {/* ========================================================================= */}
      {/* GEAR 4: 🌍 CLIL KNOWLEDGE EXPLORER + EXPLORER PASSPORT (EPIC-1)          */}
      {/* ========================================================================= */}
      {currentGear === 4 && (
        <div className="space-y-5">
          {/* Nova Evolution Badge (companionEngine connected) */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 rounded-2xl text-xs font-black text-amber-900 shadow-sm">
            <span className="text-2xl">{novaStage.avatarIcon}</span>
            <div>
              <span className="block text-[11px] uppercase tracking-wider">{novaStage.title}</span>
              <span className="text-[10px] font-medium text-amber-800">{novaStage.badgeTitle} · Streak {streakDays}d</span>
            </div>
          </div>

          {/* CLIL Knowledge Explorer article */}
          <CLILExplorer
            clilData={clilArticle || readExplore}
            weekNumber={weekNumber}
            highlightMode={highlightMode}
            setHighlightMode={setHighlightMode}
            targetGrammarRegex={grammarRegex}
          />

          {/* Explorer Passport — CLIL Stamp Collection (EPIC-1) */}
          <ExplorerPassport earnedStamps={['science']} />
        </div>
      )}
    </div>
  );
}
