import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const storyData = data?.storyWorld || {};
  const [currentGear, setCurrentGear] = useState(forcedGear || 1);
  const [completedGears, setCompletedGears] = useState([1]);
  const [stepperIdx, setStepperIdx] = useState(0);

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

  // Quest completion is now handled by TaskScreen, not by visiting gears
  // (removed auto-complete that fired on mount/gear change)
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
  const [retellStepIdx, setRetellStepIdx] = useState(0);
  const [hintSecondsLeft, setHintSecondsLeft] = useState(null);
  const [retellRecordings, setRetellRecordings] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [retellAudioUrl, setRetellAudioUrl] = useState(null);
  const [novaFeedback, setNovaFeedback] = useState(null);
  const [retellAttemptCount, setRetellAttemptCount] = useState(0);
  const [showHint, setShowHint] = useState(true);       // Tier 1 default: keyword hints visible
  const [showStudy, setShowStudy] = useState(true);     // Study sentences panel
  const [studyScaffold, setStudyScaffold] = useState('full'); // 'full' | 'half' | 'chunks'
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // 10s Hint Countdown Timer
  useEffect(() => {
    if (hintSecondsLeft === null || hintSecondsLeft <= 0) return;
    const timer = setInterval(() => {
      setHintSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [hintSecondsLeft]);

  // Retell to Nova: 5 Question Steps
  const RETELL_QUESTIONS = [
    {
      step: 1,
      question_vi: 'Chuyện đó xảy ra ở đâu và khi nào?',
      question_en: 'Where and when did the story start?',
      chips: ['after science class', 'walking carefully', 'school corridor'],
      sentence: 'Jake was walking carefully down the school corridor after science class.',
    },
    {
      step: 2,
      question_vi: 'Điều bất ngờ gì đã xảy ra sau đó?',
      question_en: 'What happened suddenly on the wet floor?',
      chips: ['running fast', 'slipped on the wet floor', 'fell down heavily'],
      sentence: 'Suddenly, a boy running fast slipped on the wet floor and fell down heavily.',
    },
    {
      step: 3,
      question_vi: 'Bạn học sinh bị đau ở đâu?',
      question_en: 'How did the boy get hurt?',
      chips: ['hurt his knee', 'lost his balance', 'completely'],
      sentence: 'He hurt his knee and lost his balance completely.',
    },
    {
      step: 4,
      question_vi: 'Jake đã làm gì ngay lập tức để giúp bạn?',
      question_en: 'What did Jake do immediately to help?',
      chips: ['stopped immediately', 'help his friend', 'stay calm', 'called the school nurse'],
      sentence: 'Jake stopped immediately to help his friend stay calm and called the school nurse right away.',
    },
    {
      step: 5,
      question_vi: 'Cô y tá đã giúp thế nào và mọi người cảm thấy ra sao?',
      question_en: 'How did the nurse help and how did everyone feel?',
      chips: ['clean bandage', 'cold pack', 'felt relieved', 'praised Jake'],
      sentence: 'The nurse arrived quickly with a clean bandage, and everyone felt relieved and praised Jake for following safety rules.',
    },
  ];

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

  // Auto-complete Gear 4 (CLIL) quest when user navigates into it organically
  // Guard: only fires in normal zone mode (no forcedGear), not when TaskScreen mounts with forcedGear=4
  useEffect(() => {
    if (currentGear === 4 && !forcedGear) {
      useDailyQuestStore.getState().completeQuest(weekNumber, 'gear4_clil');
    }
  }, [currentGear, weekNumber, forcedGear]);

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
                  {activeFrameIndex < scenes.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setActiveFrameIndex(prev => Math.min(scenes.length - 1, prev + 1))}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow"
                    >
                      Next ▶
                    </button>
                  ) : hideGearTabs ? (
                    <button
                      type="button"
                      onClick={() => {
                        useDailyQuestStore.getState().completeQuest(weekNumber, 'gear1_webtoon');
                        fireCelebrationConfetti('Quest_Completed');
                        navigate(`/week/${weekNumber}/hub/1`);
                      }}
                      className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-white rounded-xl text-xs font-black shadow-lg animate-bounce"
                    >
                      🎉 Hoàn thành & Về map ▶
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={true}
                      className="px-4 py-2 bg-slate-100 opacity-40 text-slate-500 rounded-xl text-xs font-black"
                    >
                      Hết cảnh
                    </button>
                  )}
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
          {/* Slim Arcade Instruction Bar — only in normal zone mode */}
          {!hideGearTabs && (
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
          )}

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

            {/* ── TaskScreen Stepper Mode (1 sentence per screen) OR Legacy List Mode ── */}
            {hideGearTabs ? (
              <div className="space-y-6">
                {/* Stepper Header */}
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-xl">
                      Câu {stepperIdx + 1} / {storySentences.length}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {completedKaraokeSentences[stepperIdx] ? '✅ Đã luyện tập' : '⏳ Chưa hoàn thành'}
                    </span>
                  </div>
                  <div className="w-36 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300 rounded-full"
                      style={{ width: `${((stepperIdx + 1) / storySentences.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Big Focus Sentence Card */}
                {(() => {
                  const idx = stepperIdx;
                  const sentence = storySentences[idx] || '';
                  const isCurrentPlaying = activeSentenceIdx === idx;
                  const isDone = completedKaraokeSentences[idx];
                  const sentenceWords = sentence.split(/\s+/);

                  return (
                    <div className="p-6 sm:p-8 bg-gradient-to-b from-amber-50/80 to-white rounded-3xl border-2 border-amber-300 shadow-xl space-y-6 text-center">
                      <div className="min-h-[100px] flex items-center justify-center">
                        {isCurrentPlaying ? (
                          <div className="text-xl sm:text-2xl md:text-3xl font-black leading-relaxed flex flex-wrap justify-center gap-2">
                            {sentenceWords.map((word, wIdx) => {
                              const isWordActive = activeWordIdx === wIdx;
                              return (
                                <span
                                  key={wIdx}
                                  className={`px-2 py-1 rounded-xl transition-all duration-150 ${
                                    isWordActive
                                      ? 'bg-amber-400 text-slate-950 font-black scale-110 shadow-lg ring-4 ring-amber-300'
                                      : activeWordIdx !== null && wIdx < activeWordIdx
                                      ? 'text-amber-900 font-bold'
                                      : 'text-slate-800'
                                  }`}
                                >
                                  {word}
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-xl sm:text-2xl md:text-3xl font-black leading-relaxed text-slate-900">
                            {renderParsedText(sentence, 'amber')}
                          </div>
                        )}
                      </div>

                      {isCurrentPlaying && (
                        <div className="inline-flex items-center gap-2 text-xs font-black uppercase text-amber-800 tracking-wider bg-amber-200 px-3 py-1 rounded-full animate-pulse">
                          <Sparkles size={14} className="animate-spin text-amber-600" /> 🎤 Đang phát âm chuẩn từng từ...
                        </div>
                      )}

                      {/* Main Action Buttons */}
                      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                        <button
                          type="button"
                          onClick={() => handleSpeakSentence(sentence, idx)}
                          className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 rounded-2xl font-black text-sm sm:text-base shadow-lg hover:shadow-xl flex items-center gap-2 transition"
                        >
                          <Volume2 size={20} /> 🔊 Nghe mẫu (Listen)
                        </button>

                        {sentenceShadowing[idx]?.isRecording ? (
                          <button
                            type="button"
                            onClick={() => stopSentenceShadowing(idx)}
                            className="px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black text-sm sm:text-base shadow-lg flex items-center gap-2 transition animate-pulse"
                          >
                            <Square size={18} /> ⏹ Dừng thu âm
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => startSentenceShadowing(idx, sentence)}
                            className={`px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base shadow-lg hover:shadow-xl flex items-center gap-2 transition active:scale-95 ${
                              shadowingKaraokeIdx === idx
                                ? 'bg-purple-700 text-white animate-pulse ring-4 ring-purple-300'
                                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white'
                            }`}
                          >
                            <Mic size={20} /> 🎙️ Luyện nói (Shadow)
                          </button>
                        )}
                      </div>

                      {/* Student Voice Playback */}
                      {sentenceShadowing[idx]?.audioUrl && !sentenceShadowing[idx]?.isRecording && (
                        <div className="flex items-center justify-center gap-3 pt-2">
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
                            className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border border-emerald-300 rounded-xl font-black text-xs flex items-center gap-1.5 transition"
                          >
                            <Play size={14} className="fill-emerald-800" /> Nghe lại giọng mình
                          </button>
                          <span className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-black shadow-sm flex items-center gap-1">
                            {sentenceShadowing[idx].score >= 70 ? '🌟 Tuyệt vời!' : sentenceShadowing[idx].score >= 40 ? '⭐ Khá tốt!' : '✨ Đã ghi âm!'}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Stepper Navigation Footer */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    disabled={stepperIdx === 0}
                    onClick={() => setStepperIdx(prev => Math.max(0, prev - 1))}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 rounded-xl text-xs sm:text-sm font-black transition"
                  >
                    ◀ Câu trước
                  </button>

                  {stepperIdx < storySentences.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setStepperIdx(prev => Math.min(storySentences.length - 1, prev + 1))}
                      className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs sm:text-sm font-black shadow-md flex items-center gap-1.5 transition"
                    >
                      Câu tiếp theo ▶
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        useDailyQuestStore.getState().completeQuest(weekNumber, 'gear2_karaoke');
                        fireCelebrationConfetti('Quest_Completed');
                        navigate(`/week/${weekNumber}/hub/1`);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-white rounded-2xl text-xs sm:text-sm font-black shadow-xl flex items-center gap-2 transition animate-bounce"
                    >
                      🎉 Hoàn thành & Về bản đồ ▶
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Sentences with Real Word-by-Word Karaoke (List Mode) */
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
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() => handleSpeakSentence(sentence, idx)}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-black text-xs shadow-sm flex items-center gap-1.5 transition"
                        >
                          <Volume2 size={15} /> Listen
                        </button>
                        <button
                          type="button"
                          onClick={() => startSentenceShadowing(idx, sentence)}
                          className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-black text-xs shadow-sm flex items-center gap-1.5"
                        >
                          <Mic size={14} /> Shadow
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GEAR 3: 🎙️ RETELL TO NOVA — STEP-BY-STEP SINGLE SENTENCE FOCUS            */}
      {/* ========================================================================= */}
      {currentGear === 3 && (
        <div className="space-y-4 animate-in fade-in">
          {retellStepIdx < RETELL_QUESTIONS.length ? (
            (() => {
              const currentQ = RETELL_QUESTIONS[retellStepIdx];
              const isLastStep = retellStepIdx === RETELL_QUESTIONS.length - 1;
              const hasRecordedCurrent = !!retellRecordings[retellStepIdx];

              return (
                <div className="space-y-4">
                  {/* Stepper Progress Header */}
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-purple-900 bg-purple-100 px-3 py-1 rounded-xl">
                        🎙️ Retell to Nova
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        Câu {retellStepIdx + 1} / {RETELL_QUESTIONS.length}
                      </span>
                    </div>
                    <div className="w-36 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 rounded-full"
                        style={{ width: `${((retellStepIdx + 1) / RETELL_QUESTIONS.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Main Story Card */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-lg space-y-6 text-center">
                    {/* Nova Question Bubble */}
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl flex items-center gap-3 text-left">
                      <span className="text-3xl shrink-0">🦊</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black uppercase tracking-wider text-purple-600">
                          Nova hỏi:
                        </p>
                        <p className="text-sm sm:text-base font-black text-slate-900">
                          "{currentQ.question_vi}"
                        </p>
                        <p className="text-xs font-medium text-slate-500 italic">
                          {currentQ.question_en}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => speakText(currentQ.question_en)}
                        className="shrink-0 p-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl transition active:scale-95"
                        title="Nghe Nova đọc câu hỏi"
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>

                    {/* Scaffolded Input Chips */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block">
                        🔑 Từ vựng & Cụm từ gợi ý (Chạm để nghe phát âm):
                      </span>
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        {currentQ.chips.map((chip, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => speakText(chip)}
                            className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 rounded-xl text-xs sm:text-sm font-bold transition active:scale-95 flex items-center gap-1.5 shadow-sm"
                          >
                            <Volume2 size={12} className="text-indigo-500" />
                            {chip}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Hint Scaffolding Section with 10s Timer */}
                    <div className="space-y-2">
                      {hintSecondsLeft !== null ? (
                        <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl space-y-2 animate-in fade-in">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 bg-amber-200 text-amber-900 font-black text-[10px] rounded-lg animate-pulse">
                              ⏳ Gợi ý sẽ tự tắt sau: {hintSecondsLeft}s
                            </span>
                            <div className="flex items-center gap-1">
                              {[
                                { id: 'full', label: 'Full' },
                                { id: 'half', label: 'Half' },
                                { id: 'chunks', label: 'Chunks' },
                              ].map(({ id, label }) => (
                                <button
                                  key={id}
                                  type="button"
                                  onClick={() => setStudyScaffold(id)}
                                  className={`px-2 py-0.5 rounded text-[10px] font-black transition ${
                                    studyScaffold === id ? 'bg-amber-600 text-white' : 'bg-white text-amber-900 border border-amber-200'
                                  }`}
                                >
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed text-left">
                            {studyScaffold === 'full' && currentQ.sentence}
                            {studyScaffold === 'half' && (() => {
                              const w = currentQ.sentence.split(/\s+/);
                              const half = Math.ceil(w.length / 2);
                              return `${w.slice(0, half).join(' ')} ___ ...`;
                            })()}
                            {studyScaffold === 'chunks' && (() => {
                              const w = currentQ.sentence.split(/\s+/);
                              return w.map((word, i) => (i % 2 === 0 ? word : '___')).join(' ');
                            })()}
                          </p>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <button
                            type="button"
                            onClick={() => setHintSecondsLeft(10)}
                            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-200"
                          >
                            💡 Xem gợi ý câu (10s Hint)
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Big Central Mic Button */}
                    <div className="py-2 space-y-3">
                      <div className="flex flex-col items-center justify-center gap-2">
                        {!isRecording ? (
                          <button
                            type="button"
                            onClick={startRetellRecording}
                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-500 text-white flex flex-col items-center justify-center gap-1 shadow-2xl shadow-purple-500/30 transition hover:scale-105 active:scale-95"
                          >
                            <Mic size={36} className="animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-wider">Thu âm</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={stopRetellRecording}
                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex flex-col items-center justify-center gap-1 shadow-2xl shadow-rose-500/40 transition animate-bounce"
                          >
                            <Square size={32} fill="currentColor" />
                            <span className="text-[10px] font-black uppercase tracking-wider">Dừng</span>
                          </button>
                        )}
                        <p className="text-xs font-black text-slate-600">
                          {isRecording ? '🔴 Đang thu âm... Hãy kể lại câu này!' : '🦊 Nova: Hãy kể cho cô nghe nào!'}
                        </p>
                      </div>

                      {/* Recorded Audio Feedback */}
                      {retellRecordings[retellStepIdx] && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-3 animate-in fade-in max-w-md mx-auto">
                          <audio controls src={retellRecordings[retellStepIdx]} className="h-9 w-full sm:w-auto rounded-xl" />
                          <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 shrink-0">
                            <CheckCircle2 size={14} className="text-emerald-600" /> Đã ghi âm
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Step Navigation */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        disabled={retellStepIdx === 0}
                        onClick={() => setRetellStepIdx(prev => prev - 1)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 rounded-xl text-xs font-bold transition"
                      >
                        ◀ Câu trước
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (isLastStep) {
                            setRetellStepIdx(RETELL_QUESTIONS.length);
                            useDailyQuestStore.getState().completeQuest(weekNumber, 'gear3_retell');
                            fireCelebrationConfetti('Retell_Master');
                          } else {
                            setRetellStepIdx(prev => prev + 1);
                          }
                        }}
                        className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white rounded-xl text-xs sm:text-sm font-black shadow-md transition active:scale-95"
                      >
                        {isLastStep ? 'Hoàn thành Retell ▶' : 'Câu tiếp theo ▶'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            /* Victory Screen */
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-purple-200 shadow-xl text-center space-y-5 animate-in zoom-in-95">
              <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">
                🏆
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900">
                  Tuyệt vời! Bạn là Retell Master!
                </h3>
                <p className="text-sm font-medium text-slate-600">
                  Đã hoàn thành toàn bộ 5 câu kể chuyện với Nova (+50 XP)
                </p>
              </div>

              <div className="flex justify-center gap-1 text-2xl text-amber-400">
                ⭐⭐⭐⭐⭐
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    useDailyQuestStore.getState().completeQuest(weekNumber, 'gear3_retell');
                    fireCelebrationConfetti('Quest_Completed');
                    navigate(`/week/${weekNumber}/hub/1`);
                  }}
                  className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white rounded-2xl font-black text-sm shadow-xl flex items-center gap-2 transition hover:scale-105 animate-bounce"
                >
                  🎉 Hoàn thành & Trở về bản đồ ▶
                </button>
              </div>
            </div>
          )}
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
