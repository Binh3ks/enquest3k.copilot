import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import GearIndicator from '../../components/zones/GearIndicator';
import CLILExplorer from '../../components/cambridge/CLILExplorer';
import ExplorerPassport from '../../components/cambridge/ExplorerPassport';
import HoverWord, { renderParsedText } from '../../components/common/HoverWord';
import { Film, Headphones, Mic, Globe, Volume2, Sparkles, CheckCircle2, ChevronRight, Play, Square, RotateCcw, MessageSquare, Info } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { getNovaStage } from '../../services/companionEngine';
import useDailyQuestStore from '../../stores/useDailyQuestStore';

export default function StoryWorldZone({ data, weekNumber = 33, forcedGear = null, hideGearTabs = false }) {
  const [searchParams] = useSearchParams();
  const storyData = data?.storyWorld || {};
  const [currentGear, setCurrentGear] = useState(forcedGear || 1);
  const [completedGears, setCompletedGears] = useState([1]);

  // If forcedGear changes, update
  useEffect(() => {
    if (forcedGear) setCurrentGear(forcedGear);
  }, [forcedGear]);

  // Sync gear from URL query param ?gear=N (only if not forced)
  useEffect(() => {
    if (forcedGear) return;
    const gearParam = parseInt(searchParams.get('gear'), 10);
    if (gearParam >= 1 && gearParam <= 4) {
      setCurrentGear(gearParam);
    }
  }, [searchParams, forcedGear]);

  // Instant Quest completion tracking whenever currentGear changes
  useEffect(() => {
    const GEAR_QUEST_MAP = { 1: 'gear1_webtoon', 2: 'gear2_karaoke', 3: 'gear3_retell', 4: 'gear4_clil' };
    const questId = GEAR_QUEST_MAP[currentGear];
    if (questId) {
      useDailyQuestStore.getState().completeQuest(weekNumber, questId);
    }
  }, [currentGear, weekNumber]);
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
  const [completedKaraokeSentences, setCompletedKaraokeSentences] = useState({}); // { [idx]: true }
  const [karaokeStreak, setKaraokeStreak] = useState(0);
  const sentenceMediaRecorderRef = useRef(null);
  const sentenceChunksRef = useRef([]);
  const sentenceStreamRef = useRef(null);
  const sentenceSpeechRecRef = useRef(null);
  const recognizedTranscriptRef = useRef({});

  // Gear 3: Retell to Nova state
  const [isRecording, setIsRecording] = useState(false);
  const [retellAudioUrl, setRetellAudioUrl] = useState(null);
  const [novaFeedback, setNovaFeedback] = useState(null);
  const [retellAttemptCount, setRetellAttemptCount] = useState(0);
  const [showHint, setShowHint] = useState(true);       // Tier 1 default: keyword hints visible
  const [showStudy, setShowStudy] = useState(true);     // Study sentences panel
  const [studyScaffold, setStudyScaffold] = useState('full'); // 'full' | 'half' | 'structure'
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
    // Track quest completion for Today's Quest
    const GEAR_QUEST_MAP = { 1: 'gear1_webtoon', 2: 'gear2_karaoke', 3: 'gear3_retell', 4: 'gear4_clil' };
    const completedGearNum = targetGear - 1; // moving TO targetGear means previous is done
    if (completedGearNum >= 1 && GEAR_QUEST_MAP[completedGearNum]) {
      useDailyQuestStore.getState().completeQuest(weekNumber, GEAR_QUEST_MAP[completedGearNum]);
    }
  };

  // Auto-complete Gear 4 (CLIL) quest when user enters it (no "next" button after)
  useEffect(() => {
    if (currentGear === 4) {
      useDailyQuestStore.getState().completeQuest(weekNumber, 'gear4_clil');
    }
  }, [currentGear, weekNumber]);

  // Word-by-Word Karaoke Highlighting Simulation
  const handleSpeakSentence = (sentenceText, idx) => {
    setActiveSentenceIdx(idx);
    setActiveWordIdx(0);
    speakText(sentenceText);

    // Gamification: mark sentence completed & increment streak
    setCompletedKaraokeSentences(prev => {
      const updated = { ...prev, [idx]: true };
      const completedCount = Object.keys(updated).length;
      if (completedCount === storySentences.length) {
        fireCelebrationConfetti?.('Gear2_Karaoke_Master');
      }
      return updated;
    });
    setKaraokeStreak(prev => prev + 1);

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
    recognizedTranscriptRef.current[idx] = '';

    // Start browser SpeechRecognition in parallel if available
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      try {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        const rec = new SpeechRec();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = 'en-US';
        rec.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(r => r[0].transcript)
            .join(' ');
          recognizedTranscriptRef.current[idx] = transcript;
        };
        rec.start();
        sentenceSpeechRecRef.current = rec;
      } catch (_) {}
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      sentenceStreamRef.current = stream;
      sentenceMediaRecorderRef.current = new MediaRecorder(stream);
      sentenceChunksRef.current = [];

      sentenceMediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) sentenceChunksRef.current.push(e.data);
      };

      sentenceMediaRecorderRef.current.onstop = () => {
        const durationMs = Date.now() - recordStartTime;
        setShadowingKaraokeIdx(null);

        // Stop stream tracks to release microphone hardware immediately
        if (sentenceStreamRef.current) {
          sentenceStreamRef.current.getTracks().forEach(track => track.stop());
          sentenceStreamRef.current = null;
        }

        // Stop SpeechRecognition engine
        if (sentenceSpeechRecRef.current) {
          try { sentenceSpeechRecRef.current.stop(); } catch (_) {}
          sentenceSpeechRecRef.current = null;
        }

        const audioBlob = new Blob(sentenceChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);

        // Grade based on actual recognized words vs target sentence
        const spokenText = (recognizedTranscriptRef.current[idx] || '').trim().toLowerCase();
        const targetClean = targetSentence.toLowerCase().replace(/[^a-z0-9\s]/g, '');
        const targetWords = targetClean.split(/\s+/).filter(Boolean);
        const spokenWords = spokenText.replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);

        const matchedWords = targetWords.filter(w => spokenWords.includes(w));
        let score = targetWords.length > 0 ? Math.round((matchedWords.length / targetWords.length) * 100) : 0;

        // If no voice was recognized or duration too short
        if (spokenWords.length === 0 || durationMs < 1200) {
          score = 0;
          setSentenceShadowing(prev => ({
            ...prev,
            [idx]: {
              isRecording: false,
              audioUrl: null,
              score: 0,
              feedback: '⚠️ No voice spoken! Please speak out loud while shadowing the highlighted words.'
            }
          }));
          return;
        }

        setSentenceShadowing(prev => ({
          ...prev,
          [idx]: {
            isRecording: false,
            audioUrl,
            score,
            feedback: `🌟 Great shadowing! Accuracy: ${score}%. ${matchedWords.length}/${targetWords.length} target words matched!`
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
    if (sentenceSpeechRecRef.current) {
      try { sentenceSpeechRecRef.current.stop(); } catch (_) {}
      sentenceSpeechRecRef.current = null;
    }

    if (sentenceStreamRef.current) {
      sentenceStreamRef.current.getTracks().forEach(track => track.stop());
      sentenceStreamRef.current = null;
    }

    if (sentenceMediaRecorderRef.current && sentenceMediaRecorderRef.current.state === 'recording') {
      sentenceMediaRecorderRef.current.stop();
    } else {
      setSentenceShadowing(prev => ({
        ...prev,
        [idx]: {
          ...(prev[idx] || {}),
          isRecording: false,
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
      {/* 4-Gear Story World Progression Bar — hidden in task mode */}
      {!hideGearTabs && (
        <GearIndicator
          currentGear={currentGear}
          onSelectGear={setCurrentGear}
          completedGears={completedGears}
        />
      )}

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
              <div className="flex items-center gap-2">
                {/* Gamified Progress & Streak */}
                <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-xl text-xs font-black text-amber-900">
                  <span>⭐ {Object.keys(completedKaraokeSentences).length}/{storySentences.length}</span>
                  {karaokeStreak > 0 && (
                    <span className="px-2 py-0.5 bg-amber-400 text-slate-950 rounded-md text-[10px] animate-bounce">
                      🔥 {karaokeStreak} Streak!
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => speakText(fullStoryText)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-black text-xs shadow-md flex items-center gap-1.5"
                >
                  <Play size={14} /> Full Story Audio
                </button>
              </div>
            </div>

            {/* Sentences with Real Word-by-Word Karaoke */}
            <div className="space-y-3">
              {storySentences.map((sentence, idx) => {
                const isCurrentPlaying = activeSentenceIdx === idx;
                const isDone = completedKaraokeSentences[idx];
                const sentenceWords = sentence.split(/\s+/);

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                      isCurrentPlaying
                        ? 'bg-amber-100/90 border-amber-400 shadow-lg ring-4 ring-amber-300'
                        : isDone
                        ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                        : 'bg-slate-50 hover:bg-amber-50/60 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <span className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center shrink-0 mt-0.5 ${
                        isCurrentPlaying
                          ? 'bg-amber-500 text-slate-950 font-black animate-pulse'
                          : isDone
                          ? 'bg-emerald-500 text-white font-black'
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {isDone ? '✓' : idx + 1}
                      </span>
                      <div>
                        {/* Word-by-Word Karaoke Text OR Interactive Dictionary Lookup */}
                        {isCurrentPlaying ? (
                          <div className="text-sm sm:text-base font-black leading-relaxed flex flex-wrap gap-1">
                            {sentenceWords.map((word, wIdx) => {
                              const isWordActive = activeWordIdx === wIdx;
                              return (
                                <span
                                  key={wIdx}
                                  className={`px-1 py-0.5 rounded transition-all ${
                                    isWordActive
                                      ? 'bg-amber-400 text-slate-950 font-black scale-110 ring-2 ring-amber-300'
                                      : activeWordIdx !== null && wIdx < activeWordIdx
                                      ? 'text-amber-900 font-bold'
                                      : 'text-slate-900'
                                  }`}
                                >
                                  {word}
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-sm sm:text-base font-black leading-relaxed text-slate-900">
                            {renderParsedText(sentence, 'amber')}
                          </div>
                        )}
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
                          <span className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-black shadow-sm flex items-center gap-1">
                            {sentenceShadowing[idx].score >= 70 ? '🌟 Awesome!' : sentenceShadowing[idx].score >= 40 ? '⭐ Good Try!' : '✨ Shadowed!'}
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
      {/* GEAR 3: 🎙️ RETELL TO NOVA — LISTEN → RECALL → SPEAK                      */}
      {/* ========================================================================= */}
      {currentGear === 3 && (
        <div className="space-y-4">
          {/* Goal Bar */}
          <div className="p-3 bg-purple-50 border border-purple-300 rounded-2xl flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="font-black text-purple-950 flex items-center gap-1.5">
              🎙️ GAME GOAL: Listen to the full story, then retell it in your own words. Earn +50 XP!
            </span>
            <button
              type="button"
              onClick={() => handleNextGear(4)}
              className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-xl shadow-sm transition"
            >
              Next: Gear 4 ▶
            </button>
          </div>

          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-md space-y-4">

            {/* ── Step 1: Listen to Full Story ── */}
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-indigo-800">
                  🎧 Step 1 — Listen First
                </span>
                <button
                  type="button"
                  onClick={() => speakText(fullStoryText)}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black text-xs shadow-md flex items-center gap-1.5 transition active:scale-95"
                >
                  <Volume2 size={14} /> Play Full Story
                </button>
              </div>
              <p className="text-xs text-indigo-700 font-medium italic">
                Listen carefully — then study the sentences below before recording.
              </p>
            </div>

            {/* ── Study Sentences (Fading Scaffold) ── */}
            <div className="space-y-2">
              {/* Header row */}
              <div className="flex items-center justify-between flex-wrap gap-1.5">
                <span className="text-xs font-black uppercase tracking-widest text-indigo-800">
                  📚 Study Sentences
                </span>
                <div className="flex items-center gap-1 flex-wrap">
                  {showStudy && (
                    <>
                      {[
                        { id: 'full',    label: '📖 Full',       active: 'bg-indigo-600 text-white',   inactive: 'bg-white text-indigo-900 border border-indigo-200 hover:bg-indigo-50' },
                        { id: 'half',    label: '✂️ Half',       active: 'bg-amber-500 text-slate-950', inactive: 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50' },
                        { id: 'chunks',  label: '🧩 Key Chunks', active: 'bg-purple-600 text-white',   inactive: 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-50' },
                      ].map(({ id, label, active, inactive }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setStudyScaffold(id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition ${studyScaffold === id ? active : inactive}`}
                        >
                          {label}
                        </button>
                      ))}
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowStudy(prev => !prev)}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-black bg-slate-100 hover:bg-slate-200 text-slate-600 transition border border-slate-200"
                  >
                    {showStudy ? '✕ Hide' : '📚 Show'}
                  </button>
                </div>
              </div>

              {showStudy && (
                <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 animate-in fade-in duration-200">
                  {storySentences.map((sentence, idx) => {
                    const words = sentence.split(/\s+/);
                    const half = Math.ceil(words.length / 2);

                    // Key Chunks: find 2 or 3 chunk positions to blank out
                    // Progressive: W01-W20 = 2 blanks, W21+ = 3 blanks
                    const numBlanks = weekNumber >= 21 ? 3 : 2;

                    // Stop-words to skip as blank targets
                    const stopWords = new Set(['a','an','the','to','of','in','on','at','by','for',
                      'and','but','or','so','he','she','it','i','we','they','his','her','its',
                      'my','our','their','that','this','was','were','is','are','not','very']);

                    // Find content-word indices, skip first token (too obvious)
                    const contentIdxs = words
                      .map((w, i) => ({ w: w.toLowerCase().replace(/[^a-z]/g,''), i }))
                      .filter(({ w, i }) => i > 0 && w.length > 2 && !stopWords.has(w));

                    // Pick blank positions: spread across beginning/middle/end thirds
                    const chunkSize = 2; // blank 2 consecutive words per gap
                    const thirds = [
                      Math.floor(contentIdxs.length * 0.15),
                      Math.floor(contentIdxs.length * 0.5),
                      Math.floor(contentIdxs.length * 0.82),
                    ].slice(0, numBlanks);

                    const blankStarts = new Set();
                    thirds.forEach(ti => {
                      if (contentIdxs[ti]) blankStarts.add(contentIdxs[ti].i);
                    });

                    // Build set of all word indices that are blanked
                    const blankedIdxs = new Set();
                    blankStarts.forEach(start => {
                      for (let k = start; k < Math.min(start + chunkSize, words.length); k++) {
                        blankedIdxs.add(k);
                      }
                    });

                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-2 px-2.5 py-2 bg-indigo-50/60 border border-indigo-100 rounded-xl"
                      >
                        <span className="w-5 h-5 rounded-full bg-indigo-200 text-indigo-900 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div className="flex-1 min-w-0 text-sm font-bold text-slate-800 leading-relaxed">
                          {studyScaffold === 'full' && (
                            <span>{sentence}</span>
                          )}
                          {studyScaffold === 'half' && (
                            <span>
                              {words.slice(0, half).join(' ')}{' '}
                              <span className="text-slate-300 font-normal tracking-widest select-none">
                                {'___ '.repeat(words.length - half).trim()}
                              </span>
                            </span>
                          )}
                          {studyScaffold === 'chunks' && (
                            <span className="flex flex-wrap gap-x-1 gap-y-0.5 items-baseline">
                              {words.map((word, wIdx) => {
                                const isBlankStart = blankStarts.has(wIdx);
                                const isBlankContinue = blankedIdxs.has(wIdx) && !isBlankStart;
                                if (isBlankContinue) return null; // rendered as part of the blank span
                                if (blankedIdxs.has(wIdx)) {
                                  // Render the whole blanked chunk as one underline
                                  const chunkWords = words
                                    .slice(wIdx, Math.min(wIdx + chunkSize, words.length))
                                    .filter((_, ci) => blankedIdxs.has(wIdx + ci));
                                  const blankWidth = Math.max(48, chunkWords.join(' ').length * 7);
                                  return (
                                    <span
                                      key={wIdx}
                                      style={{ minWidth: blankWidth }}
                                      className="inline-block border-b-2 border-purple-400 h-5 rounded-sm bg-purple-50/60 mx-0.5"
                                      title={chunkWords.join(' ')}
                                    />
                                  );
                                }
                                return <span key={wIdx}>{word}</span>;
                              })}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => speakText(sentence)}
                          className="shrink-0 p-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg transition active:scale-95"
                          title="Listen to sentence"
                        >
                          <Volume2 size={13} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── Step 2: Memory Hints (Tier-gated) ── */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-purple-800">
                  💡 Step 2 — Memory Hints
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShowHint(true)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition ${
                      showHint ? 'bg-purple-600 text-white' : 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-100'
                    }`}
                  >
                    🌱 Show Hints
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowHint(false)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition ${
                      !showHint ? 'bg-slate-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    🧠 Hide (Challenge)
                  </button>
                </div>
              </div>

              {showHint && (
                <div className="grid grid-cols-2 gap-1.5 animate-in fade-in duration-200">
                  {[
                    { dot: '🔵', label: 'SETTING', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-950', keywords: ['After science class', 'corridor', 'Monday'] },
                    { dot: '🟢', label: 'ACTION',  bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-950', keywords: ['walking carefully', 'stopped to help', 'called nurse'] },
                    { dot: '🟠', label: 'PROBLEM', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-950', keywords: ['slipped', 'wet floor', 'fell heavily'] },
                    { dot: '🟣', label: 'SOLUTION', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-950', keywords: ['clean bandage', 'felt relieved', 'praised Jake'] },
                  ].map(({ dot, label, bg, border, text, keywords }) => (
                    <div key={label} className={`p-2.5 rounded-xl border ${bg} ${border} space-y-1.5`}>
                      <span className={`text-[9px] font-black uppercase ${text} flex items-center gap-1`}>
                        {dot} {label}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {keywords.map((kw, i) => (
                          <span
                            key={i}
                            className={`px-1.5 py-0.5 bg-white/80 border ${border} ${text} rounded text-[10px] font-bold select-none`}
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!showHint && (
                <p className="text-[11px] text-slate-400 font-medium italic pl-1">
                  Challenge mode — tell the story from memory! Tap "Show Hints" if you need help.
                </p>
              )}
            </div>

            {/* ── Step 3: Record ── */}
            <div className="pt-1 space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-purple-800 block">
                🎙️ Step 3 — Tell the Story
              </span>
              <div className="flex justify-center">
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={startRetellRecording}
                    className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white rounded-2xl font-black text-base shadow-xl inline-flex items-center gap-3 transition hover:scale-105 active:scale-95"
                  >
                    <Mic size={20} className="animate-pulse" /> 🎙️ START MY RETELL
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopRetellRecording}
                    className="px-8 py-3.5 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black text-base shadow-xl inline-flex items-center gap-3 transition animate-bounce"
                  >
                    <Square size={20} fill="currentColor" /> ⏹️ DONE — STOP
                  </button>
                )}
              </div>

              {retellAudioUrl && retellAudioUrl !== 'simulated_retell_audio' && (
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <audio controls src={retellAudioUrl} className="h-10 rounded-xl" />
                  <button
                    type="button"
                    onClick={startRetellRecording}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black flex items-center gap-1.5"
                  >
                    <RotateCcw size={13} /> Re-record
                  </button>
                </div>
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
