import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import GearIndicator from '../../components/zones/GearIndicator';
import CLILExplorer from '../../components/cambridge/CLILExplorer';
import { SingleSubjectPassportSidebar, CLILSealStamp, GrandStampModal } from '../../components/cambridge/ExplorerPassport';
import HoverWord, { renderParsedText } from '../../components/common/HoverWord';
import { Film, Headphones, Mic, Globe, Volume2, Sparkles, CheckCircle2, ChevronRight, Play, Square, RotateCcw, MessageSquare, Info } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { VoiceService } from '../../services/voiceService';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { getNovaStage } from '../../services/companionEngine';
import useDailyQuestStore from '../../stores/useDailyQuestStore';
import { evaluateSpeechSyntax } from '../../utils/speechSyntaxEvaluator';
import MicFallbackInput from '../../components/common/MicFallbackInput';
import GrammarHintButton from '../../components/common/GrammarHintButton';
import PronunciationCoachCard, { getWordIpaList } from '../../components/common/PronunciationCoachCard';
import { loadIpaData } from '../shadowing/ipaUtils';
import { useUserStore } from '../../stores/useUserStore';
import { emitLearningEvent, GAMIFICATION_EVENTS } from '../../services/gamificationEventBus';

export default function StoryWorldZone({ data, weekNumber, forcedGear = null, hideGearTabs = false }) {
  const navigate = useNavigate();
  const routeParams = useParams();
  const activeWeek = weekNumber || (routeParams?.weekId ? parseInt(routeParams.weekId) : null) || data?.weekNumber || data?.week || data?.rawWeekData?.weekNumber || null;

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
  const karaokeRafRef = useRef(null);

  const stopKaraokeHighlight = () => {
    if (karaokeRafRef.current) {
      cancelAnimationFrame(karaokeRafRef.current);
      karaokeRafRef.current = null;
    }
  };

  // Clean up timers & media streams on unmount (prevent mic privacy indicator leak)
  useEffect(() => {
    return () => {
      stopKaraokeHighlight();
      if (sentenceStreamRef.current) {
        sentenceStreamRef.current.getTracks().forEach(track => track.stop());
        sentenceStreamRef.current = null;
      }
      if (sentenceMediaRecorderRef.current && sentenceMediaRecorderRef.current.state !== 'inactive') {
        try { sentenceMediaRecorderRef.current.stop(); } catch (_) {}
        sentenceMediaRecorderRef.current = null;
      }
      if (sentenceSpeechRecRef.current) {
        try { sentenceSpeechRecRef.current.stop(); } catch (_) {}
        sentenceSpeechRecRef.current = null;
      }
      if (retellStreamRef.current) {
        retellStreamRef.current.getTracks().forEach(track => track.stop());
        retellStreamRef.current = null;
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        try { mediaRecorderRef.current.stop(); } catch (_) {}
        mediaRecorderRef.current = null;
      }
      if (retellSpeechRecRef.current) {
        try { retellSpeechRecRef.current.stop(); } catch (_) {}
        retellSpeechRecRef.current = null;
      }
      try { VoiceService.pauseTTS(); } catch (_) {}
    };
  }, []);

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
  const [showStampModal, setShowStampModal] = useState(false);
  const [selectedStampId, setSelectedStampId] = useState('science');
  const [clilStampEarned, setClilStampEarned] = useState(false);

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

  // Nova streak from localStorage for companion engine
  const rawStreak = typeof localStorage !== 'undefined' ? localStorage.getItem('engquest_streak') : null;
  const streakDays = rawStreak ? (JSON.parse(rawStreak).days || 0) : 3;
  const novaStage = getNovaStage(streakDays);

  const scenes = storyData.storyScenes || data?.reading_hub?.read_explore?.story_scenes || data?.readingHubData?.read_explore?.story_scenes || data?.reading_hub?.story_scenes || [];
  const clilArticle = storyData.clilArticle || data?.reading_hub?.clil_article || data?.readingHubData?.clil_article || data?.reading_hub?.read_explore?.clil_article || data?.readingHubData?.read_explore?.clil_article || null;
  const grammarRegex = storyData.grammarRegex || data?.reading_hub?.grammarRegex || [];
  const readExplore = storyData.readExplore || data?.reading_hub?.read_explore || data?.readingHubData?.read_explore || data?.stations?.read_explore || data?.read_explore || data?.rawWeekData?.readExplore || data?.rawWeekData?.stations?.read_explore || {};
  const atomicSentences = storyData.shadowingData?.sentences || storyData.shadowing?.sentences || data?.reading_hub?.shadowingData?.sentences || data?.readingHubData?.shadowingData?.sentences || data?.stations?.shadowing?.sentences || data?.stations?.shadowing?.shadowingData?.sentences || data?.shadowing?.sentences || data?.rawWeekData?.stations?.shadowing?.sentences || null;

  const fullStoryText = readExplore.content_en || readExplore.text_en || readExplore.text || (atomicSentences ? atomicSentences.map(s => s.text).join(' ') : "");

  // Dynamic Retell to Nova: 5 Question Steps per week (No hardcoded leak)
  const RETELL_QUESTIONS = React.useMemo(() => {
    const rawRetell = readExplore.retell_questions || data?.stations?.read_explore?.retell_questions || data?.read_explore?.retell_questions || storyData.retell_questions;
    if (rawRetell && Array.isArray(rawRetell) && rawRetell.length > 0) {
      return rawRetell;
    }
    if (atomicSentences && atomicSentences.length >= 5) {
      return atomicSentences.slice(0, 5).map((s, idx) => ({
        step: idx + 1,
        question_vi: `Kể lại phần ${idx + 1} của câu chuyện:`,
        question_en: `Retell part ${idx + 1} of the story:`,
        chips: s.words ? s.words.slice(0, 3) : [],
        sentence: s.text
      }));
    }
    return [
      {
        step: 1,
        question_vi: 'Chuyện đó xảy ra ở đâu và khi nào?',
        question_en: 'Where and when did the story start?',
        chips: ['one day', 'story began'],
        sentence: fullStoryText.split('.')[0] || 'The story began one day.'
      }
    ];
  }, [readExplore, storyData, atomicSentences, fullStoryText]);

  // Split story into individual sentences for Gear 2
  const storySentences = React.useMemo(() => {
    if (atomicSentences && atomicSentences.length > 0) {
      return atomicSentences.map(s => s.text);
    }
    return fullStoryText
      .replace(/([.!?])\s+/g, '$1|SPLIT|')
      .split('|SPLIT|')
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }, [atomicSentences, fullStoryText]);

  // Load Shadowing IPA data for Phonetics Coach
  const [ipaMap, setIpaMap] = useState({});
  useEffect(() => {
    if (atomicSentences && atomicSentences.length > 0) {
      const map = {};
      atomicSentences.forEach((item, i) => {
        map[i] = Array.isArray(item.ipa) ? item.ipa.join(' ') : item.ipa;
      });
      setIpaMap(map);
      return;
    }
    if (currentGear === 2) {
      loadIpaData(activeWeek, 'advanced').then(data => {
        if (data && Array.isArray(data)) {
          const map = {};
          data.forEach((item, i) => {
            map[i] = Array.isArray(item.ipa) ? item.ipa.join(' ') : item.ipa;
          });
          setIpaMap(map);
        }
      }).catch(() => {});
    }
  }, [currentGear, activeWeek, atomicSentences]);

  const currentScene = scenes[activeFrameIndex] || null;
  const currentSceneText = currentScene
    ? (currentScene.narration_en || currentScene.description_en || currentScene.en || currentScene.text || currentScene.title_en || '')
    : '';

  const handleNextGear = (targetGear) => {
    setCurrentGear(targetGear);
    if (!completedGears.includes(targetGear)) {
      setCompletedGears(prev => [...prev, targetGear]);
    }
    // Track quest completion for Today's Quest
    const GEAR_QUEST_MAP = { 1: 'gear1_webtoon', 2: 'gear2_karaoke', 3: 'gear3_retell', 4: 'gear4_clil' };
    const completedGearNum = targetGear - 1; // moving TO targetGear means previous is done
    if (completedGearNum >= 1 && GEAR_QUEST_MAP[completedGearNum] && activeWeek) {
      const qId = GEAR_QUEST_MAP[completedGearNum];
      useDailyQuestStore.getState().completeQuest(activeWeek, qId);
      emitLearningEvent(GAMIFICATION_EVENTS.LEARNING_TASK_COMPLETED, {
        weekNumber: activeWeek,
        taskId: qId,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Auto-complete Gear 4 (CLIL) quest when user navigates into it organically
  // Guard: only fires in normal zone mode (no forcedGear), not when TaskScreen mounts with forcedGear=4
  useEffect(() => {
    if (currentGear === 4 && !forcedGear && activeWeek) {
      useDailyQuestStore.getState().completeQuest(activeWeek, 'gear4_clil');
      emitLearningEvent(GAMIFICATION_EVENTS.LEARNING_TASK_COMPLETED, {
        weekNumber: activeWeek,
        taskId: 'gear4_clil',
        timestamp: new Date().toISOString()
      });
    }
  }, [currentGear, activeWeek, forcedGear]);

  // Timing telemetry helper
  const markTiming = (label, extra = '') => {
    console.log(`[voice-shadow-timing] ⏱️ ${label}: ${performance.now().toFixed(1)}ms ${extra}`);
  };

  // Playback ID Mutex to prevent race conditions on rapid double-taps
  const currentPlaybackId = useRef(0);

  // 🚀 Background Pre-cache all story sentences into IndexedDB for 0ms latency on click
  useEffect(() => {
    if (storySentences && storySentences.length > 0) {
      storySentences.forEach((sentence) => {
        VoiceService.prefetch?.(sentence, 'shadowing', null, activeWeek).catch(() => {});
      });
    }
  }, [currentGear, storySentences, activeWeek]);

  // Word-by-Word Karaoke Highlighting Simulation (Real-Time Audio Sync & Weighted Pacing)
  const handleSpeakSentence = (sentenceText, idx, playbackId = null, onAudioStartCallback = null, caller = 'unknown') => {
    stopKaraokeHighlight();

    const words = sentenceText.split(/\s+/).filter(Boolean);

    // Synchronized Karaoke Highlight: Only start ticking when the audio ACTUALLY begins producing sound!
    const onPlayStart = ({ duration } = {}) => {
      // Race condition check: If user clicked another sentence/button, ignore stale playback
      if (playbackId !== null && playbackId !== currentPlaybackId.current) {
        markTiming('stale-playback-ignored', `playbackId=${playbackId}, current=${currentPlaybackId.current}, source=${caller}`);
        return;
      }

      markTiming('audio-playing-event', `idx=${idx}, duration=${duration ? duration.toFixed(2) + 's' : 'N/A'}, source=${caller}`);
      markTiming('karaoke-start', `idx=${idx}, source=${caller}`);

      // 🎯 STRICT GATE: Only activate UI playing state & highlight word 0 when sound actually emits!
      setActiveSentenceIdx(idx);
      setActiveWordIdx(0);
      if (onAudioStartCallback) onAudioStartCallback();

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

      stopKaraokeHighlight();

      // Calculate word time boundaries using phoneme / character length weighting:
      // Longer words ("carefully", "corridor", "immediately") naturally take more time,
      // while shorter function words ("was", "the", "to", "in") take less time.
      const weights = words.map(w => {
        const clean = w.replace(/[^a-zA-Z]/g, '');
        return Math.max(2, clean.length);
      });
      const totalWeight = weights.reduce((sum, w) => sum + w, 0);

      // Total audio duration: use reported duration or fallback to speech rate
      const effectiveDuration = (duration && duration > 0.5)
        ? duration
        : Math.max(1.8, words.length * 0.42);

      let accumulated = 0;
      const wordIntervals = words.map((w, i) => {
        const wordDur = (weights[i] / totalWeight) * effectiveDuration;
        const start = accumulated;
        const end = accumulated + wordDur;
        accumulated = end;
        return { word: w, start, end };
      });

      const startPerfTime = performance.now();

      const tick = () => {
        if (playbackId !== null && playbackId !== currentPlaybackId.current) {
          stopKaraokeHighlight();
          return;
        }

        const audio = VoiceService._currentAudio;
        let currentSec = 0;
        if (audio && typeof audio.currentTime === 'number' && !isNaN(audio.currentTime) && audio.currentTime >= 0) {
          currentSec = audio.currentTime;
        } else {
          currentSec = (performance.now() - startPerfTime) / 1000;
        }

        // Find which word corresponds to currentSec
        let matchedIdx = -1;
        for (let i = 0; i < wordIntervals.length; i++) {
          if (currentSec >= wordIntervals[i].start && currentSec < wordIntervals[i].end) {
            matchedIdx = i;
            break;
          }
        }

        if (matchedIdx === -1) {
          if (currentSec >= effectiveDuration) {
            matchedIdx = words.length - 1; // hold last word until audio ends
          } else {
            matchedIdx = 0;
          }
        }

        setActiveWordIdx(prev => (prev === matchedIdx ? prev : matchedIdx));

        karaokeRafRef.current = requestAnimationFrame(tick);
      };

      karaokeRafRef.current = requestAnimationFrame(tick);
    };

    const sentenceAudioUrl = `/audio/week${activeWeek || 33}/shadowing_${idx + 1}.mp3`;

    speakText(
      sentenceText,
      sentenceAudioUrl,
      1.0,
      () => {
        if (playbackId !== null && playbackId !== currentPlaybackId.current) return;
        stopKaraokeHighlight();
        setActiveWordIdx(null);
        setActiveSentenceIdx(null);
      },
      'shadowing',
      activeWeek,
      'advanced',
      false,
      onPlayStart
    );
  };

  // 🔊 Listen Model Audio Handler: Shared Mutex & Full Cancellation Guard
  const playListenModel = (sentenceText, idx, caller = 'listen-model-audio') => {
    markTiming('button-tap', `idx=${idx}, source=${caller}`);

    // 0. Bump Playback Mutex ID and clean up active intervals / timers
    currentPlaybackId.current += 1;
    const playbackId = currentPlaybackId.current;

    stopKaraokeHighlight();
    if (sentenceMediaRecorderRef.current && sentenceMediaRecorderRef.current.state !== 'inactive') {
      try { sentenceMediaRecorderRef.current.stop(); } catch (_) {}
      sentenceMediaRecorderRef.current = null;
    }
    if (sentenceSpeechRecRef.current) {
      try { sentenceSpeechRecRef.current.stop(); } catch (_) {}
      sentenceSpeechRecRef.current = null;
    }
    try { VoiceService.pauseTTS(); } catch (_) {}

    markTiming('play-called', `idx=${idx}, source=${caller}`);
    handleSpeakSentence(sentenceText, idx, playbackId, null, caller);
  };

  // 🔊 Full Story Audio Handler
  const playFullStoryAudio = () => {
    markTiming('button-tap', 'source=full-story-audio');
    currentPlaybackId.current += 1;
    stopKaraokeHighlight();
    if (sentenceMediaRecorderRef.current && sentenceMediaRecorderRef.current.state !== 'inactive') {
      try { sentenceMediaRecorderRef.current.stop(); } catch (_) {}
      sentenceMediaRecorderRef.current = null;
    }
    if (sentenceSpeechRecRef.current) {
      try { sentenceSpeechRecRef.current.stop(); } catch (_) {}
      sentenceSpeechRecRef.current = null;
    }
    try { VoiceService.pauseTTS(); } catch (_) {}
    setActiveSentenceIdx(null);
    setActiveWordIdx(null);
    speakText(fullStoryText, null, 1.0, null, 'shadowing', activeWeek);
  };

  // Gear 2: Shadowing = Instant Model Audio + Parallel Mic Recording (Exact Same Audio Path)
  const startSentenceShadowing = async (idx, targetSentence) => {
    markTiming('button-tap', `idx=${idx}, source=voice-shadow`);

    // 0. Bump Playback Mutex ID and clean up active intervals / timers
    currentPlaybackId.current += 1;
    const playbackId = currentPlaybackId.current;

    stopKaraokeHighlight();
    if (sentenceMediaRecorderRef.current && sentenceMediaRecorderRef.current.state !== 'inactive') {
      try { sentenceMediaRecorderRef.current.stop(); } catch (_) {}
      sentenceMediaRecorderRef.current = null;
    }
    if (sentenceSpeechRecRef.current) {
      try { sentenceSpeechRecRef.current.stop(); } catch (_) {}
      sentenceSpeechRecRef.current = null;
    }
    try { VoiceService.pauseTTS(); } catch (_) {}

    // 1. Synchronously trigger Model Audio — state only activates inside onPlayStart!
    markTiming('play-called', `idx=${idx}, source=voice-shadow`);
    handleSpeakSentence(targetSentence, idx, playbackId, () => {
      setShadowingKaraokeIdx(idx);
    }, 'voice-shadow');

    const recordStartTime = Date.now();
    recognizedTranscriptRef.current[idx] = '';

    setSentenceShadowing(prev => ({
      ...prev,
      [idx]: { isRecording: true, audioUrl: null, score: null, feedback: null, startTime: recordStartTime }
    }));

    // 2. On-demand getUserMedia with clean lifecycle
    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: false,
          autoGainControl: true
        }
      });
    } catch (e) {
      console.warn("[voice-shadow] On-demand mic request failed:", e);
    }

    if (!stream) {
      console.warn("[voice-shadow] No mic stream available for recording");
      setSentenceShadowing(prev => ({
        ...prev,
        [idx]: {
          isRecording: false,
          audioUrl: null,
          score: 0,
          spokenText: '',
          feedback: '⚠️ Microphone permission needed. Please allow microphone access in your browser!'
        }
      }));
      return;
    }

    sentenceStreamRef.current = stream;

    try {
      let mimeType = '';
      if (typeof MediaRecorder !== 'undefined') {
        if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          mimeType = 'audio/webm;codecs=opus';
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
        } else if (MediaRecorder.isTypeSupported('audio/webm')) {
          mimeType = 'audio/webm';
        }
      }
      const recorderOptions = mimeType ? { mimeType, audioBitsPerSecond: 128000 } : {};
      const recorder = new MediaRecorder(stream, recorderOptions);
      sentenceMediaRecorderRef.current = recorder;
      sentenceChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) sentenceChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        // 🔥 Release microphone tracks IMMEDIATELY so red recording dot disappears from browser tab
        if (sentenceStreamRef.current) {
          sentenceStreamRef.current.getTracks().forEach(track => track.stop());
          sentenceStreamRef.current = null;
        }
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }

        if (playbackId !== currentPlaybackId.current) return;
        const durationMs = Date.now() - recordStartTime;
        setShadowingKaraokeIdx(null);

        // Stop model TTS if still in-flight
        try { VoiceService.pauseTTS(); } catch (_) {}

        const blobType = recorder.mimeType || 'audio/webm';
        const audioBlob = new Blob(sentenceChunksRef.current, { type: blobType });
        const audioUrl = URL.createObjectURL(audioBlob);

        // If recording too short (less than 1s)
        if (durationMs < 1000) {
          setSentenceShadowing(prev => ({
            ...prev,
            [idx]: {
              isRecording: false,
              audioUrl: null,
              score: 0,
              spokenText: '',
              feedback: '⚠️ Recording was too short. Please speak the sentence out loud!'
            }
          }));
          return;
        }

        // 🎙️ Voice Activity Detection (VAD) & Silence Analysis via AudioContext Energy
        let rms = 0;
        let speechSamples = 0;
        let totalSamples = 0;
        try {
          const arrayBuffer = await audioBlob.arrayBuffer();
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          if (AudioCtx) {
            const ctx = new AudioCtx();
            const decoded = await ctx.decodeAudioData(arrayBuffer);
            const channelData = decoded.getChannelData(0);
            totalSamples = channelData.length;
            let sumSquares = 0;
            for (let i = 0; i < channelData.length; i++) {
              const s = channelData[i];
              sumSquares += s * s;
              if (Math.abs(s) > 0.03) speechSamples++;
            }
            rms = Math.sqrt(sumSquares / Math.max(1, totalSamples));
            try { ctx.close(); } catch (_) {}
          }
        } catch (vadErr) {
          console.warn('[VAD] Audio energy detection fallback:', vadErr);
        }

        const speechRatio = totalSamples > 0 ? (speechSamples / totalSamples) : 0;
        const isSilent = (totalSamples > 0 && (rms < 0.012 || speechRatio < 0.03));

        console.log(`[VAD Telemetry Raw] audioBlobSize=${audioBlob.size}B, rms=${rms}, speechRatio=${speechRatio}, totalSamples=${totalSamples}, speechSamples=${speechSamples}, isSilent=${isSilent}`);
        console.log(`[VAD Telemetry] audioBlobSize=${audioBlob.size}B, rms=${rms.toFixed(5)}, speechRatio=${speechRatio.toFixed(3)}, totalSamples=${totalSamples}, isSilent=${isSilent}`);

        if (isSilent) {
          // 🚫 Silence guard: No active speech detected
          setSentenceShadowing(prev => ({
            ...prev,
            [idx]: {
              isRecording: false,
              audioUrl: null,
              score: 0,
              spokenText: '',
              feedback: '⚠️ No speech detected. Please speak clearly into your mic!'
            }
          }));
          return;
        }

        // Student spoke into the mic -> Successfully recorded Voice Shadow
        setSentenceShadowing(prev => ({
          ...prev,
          [idx]: {
            isRecording: false,
            audioUrl,
            score: 100,
            spokenText: `(Recorded: ${(durationMs / 1000).toFixed(1)}s voice)`,
            feedback: `✨ Voice Shadow recorded! Tap 'Play My Voice' to listen & compare with model voice.`
          }
        }));

        fireCelebrationConfetti('Sentence_Shadow_Complete');
      };

      // 4. Start MediaRecorder
      recorder.start(100);
      markTiming('recording-started', `idx=${idx}`);
    } catch (err) {
      console.warn("[VoiceShadow] Mic recording error:", err);
    }
  };

  const stopSentenceShadowing = (idx) => {
    stopKaraokeHighlight();
    setActiveWordIdx(null);

    try { VoiceService.pauseTTS(); } catch (_) {}

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

  // Gear 3: Record Voice with AI Syntax Evaluation
  const retellSpeechRecRef = useRef(null);
  const retellTranscriptRef = useRef('');
  const [retellEvaluations, setRetellEvaluations] = useState({}); // { [stepIdx]: { transcript, evalResult } }
  const retellStreamRef = useRef(null);

  const startRetellRecording = async () => {
    retellTranscriptRef.current = '';
    const currentQ = RETELL_QUESTIONS[retellStepIdx];

    // Start browser SpeechRecognition in parallel (Desktop only)
    const isAndroidOrIOS = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (!isAndroidOrIOS && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      try {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        const rec = new SpeechRec();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = 'en-US';
        rec.onresult = (event) => {
          const transcript = Array.from(event.results).map(r => r[0].transcript).join(' ');
          retellTranscriptRef.current = transcript;
        };
        rec.start();
        retellSpeechRecRef.current = rec;
      } catch (_) {}
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: false,
          autoGainControl: true
        }
      });
      retellStreamRef.current = stream;

      let mimeType = '';
      if (typeof MediaRecorder !== 'undefined') {
        if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          mimeType = 'audio/webm;codecs=opus';
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
        } else if (MediaRecorder.isTypeSupported('audio/webm')) {
          mimeType = 'audio/webm';
        }
      }
      const recorderOptions = mimeType ? { mimeType, audioBitsPerSecond: 128000 } : {};
      const recorder = new MediaRecorder(stream, recorderOptions);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        if (retellSpeechRecRef.current) {
          try { retellSpeechRecRef.current.stop(); } catch (_) {}
          retellSpeechRecRef.current = null;
        }

        if (retellStreamRef.current) {
          retellStreamRef.current.getTracks().forEach(track => track.stop());
          retellStreamRef.current = null;
        }

        const blobType = recorder.mimeType || 'audio/webm';
        const audioBlob = new Blob(audioChunksRef.current, { type: blobType });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRetellRecordings(prev => ({ ...prev, [retellStepIdx]: audioUrl }));
        setRetellAttemptCount(prev => prev + 1);

        const spoken = retellTranscriptRef.current.trim();
        let evalRes;
        if (spoken.length > 0) {
          evalRes = evaluateSpeechSyntax(spoken, currentQ.sentence, { mode: 'sentence', minWords: 3 });
        } else if (audioBlob.size > 1500) {
          evalRes = {
            isCorrect: true,
            score: 85,
            feedback: "Great voice recording! Retell event completed.",
            spokenText: `(Voice recorded: ${(audioBlob.size / 1024).toFixed(0)}KB)`
          };
        } else {
          evalRes = {
            isCorrect: false,
            score: 0,
            feedback: "No voice detected. Please speak or type your answer below!",
            spokenText: ""
          };
        }

        setRetellEvaluations(prev => ({
          ...prev,
          [retellStepIdx]: { transcript: spoken || evalRes.spokenText, evalResult: evalRes }
        }));

        setNovaFeedback({
          praise: evalRes.isCorrect ? `🎉 ${evalRes.feedback} (Accuracy: ${evalRes.score}%)` : `⚠️ ${evalRes.feedback} (Accuracy: ${evalRes.score}%)`,
          tip: evalRes.isCorrect ? "💡 Tip: Great syntax and smooth sentence flow!" : `💡 Tip: Try saying: "${currentQ.sentence}"`
        });

        if (evalRes.isCorrect) {
          fireCelebrationConfetti('Retell_Complete');
          if (!completedGears.includes(3)) {
            setCompletedGears(prev => [...prev, 3]);
          }
        }
      };

      recorder.start(100);
      setIsRecording(true);
      setNovaFeedback(null);
    } catch (err) {
      console.warn("Microphone access fallback:", err);
      // Fallback
      handleManualRetellSubmit(currentQ.sentence);
    }
  };

  const handleManualRetellSubmit = (typedText) => {
    const currentQ = RETELL_QUESTIONS[retellStepIdx];
    const evalRes = evaluateSpeechSyntax(typedText, currentQ.sentence, { mode: 'sentence', minWords: 3 });

    setRetellRecordings(prev => ({ ...prev, [retellStepIdx]: 'typed_submission' }));
    setRetellEvaluations(prev => ({
      ...prev,
      [retellStepIdx]: { transcript: typedText, evalResult: evalRes }
    }));

    setNovaFeedback({
      praise: evalRes.isCorrect ? `🎉 ${evalRes.feedback} (Accuracy: ${evalRes.score}%)` : `⚠️ ${evalRes.feedback} (Accuracy: ${evalRes.score}%)`,
      tip: evalRes.isCorrect ? "💡 Tip: Accurate grammar and sentence construction!" : `💡 Tip: Check: "${currentQ.sentence}"`
    });

    if (evalRes.isCorrect) {
      fireCelebrationConfetti('Retell_Complete');
      if (!completedGears.includes(3)) {
        setCompletedGears(prev => [...prev, 3]);
      }
    }
  };

  const stopRetellRecording = () => {
    if (retellSpeechRecRef.current) {
      try { retellSpeechRecRef.current.stop(); } catch (_) {}
      retellSpeechRecRef.current = null;
    }

    if (retellStreamRef.current) {
      retellStreamRef.current.getTracks().forEach(track => track.stop());
      retellStreamRef.current = null;
    }

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
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-6 border border-slate-200 shadow-md space-y-3 sm:space-y-4">
            {currentScene && (
              <div className="space-y-3">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-200 shadow-md">
                  <img
                    src={currentScene.image_url}
                    alt={currentScene.title_en || 'Scene image'}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => { e.target.src = '/images/scenes/default_story.jpg'; }}
                  />

                  {/* Mystery Pins — compact circular badges to prevent label overlap */}
                  {(currentScene.lexical_chunks || currentScene.hotspots || []).map((chunk, cIdx) => {
                    const pinKey = `${currentScene.scene_id || currentScene.id || 'scene'}_${cIdx}`;
                    const chunkLabel = chunk.label_en || chunk.chunk || chunk.text || chunk.word || `Item ${cIdx + 1}`;
                    const chunkVi = chunk.label_vi || chunk.vi || chunk.meaning_vi || '';
                    const isRevealed = revealedPins[pinKey];
                    const isFound = foundItems.includes(chunkLabel);
                    
                    // Safe staggered fallback coordinates if not provided in JSON
                    const safeX = chunk.x ?? (20 + (cIdx * 30) % 70);
                    const safeY = chunk.y ?? (35 + (cIdx * 25) % 45);

                    return (
                      <button
                        key={cIdx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
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
                            }
                          }
                        }}
                        style={{ left: `${safeX}%`, top: `${safeY}%` }}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform active:scale-95 z-10 w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs font-black ${
                          isFound
                            ? 'bg-emerald-500 text-white ring-2 ring-emerald-300'
                            : isRevealed
                            ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-200'
                            : 'bg-amber-400/90 hover:bg-amber-300 text-slate-950 animate-pulse'
                        }`}
                        title={chunkLabel}
                        aria-label={chunkLabel}
                      >
                        {isFound ? '✓' : isRevealed ? '✨' : '?'}
                      </button>
                    );
                  })}

                  {selectedHotspot && (
                    <>
                      {/* Click outside to dismiss backdrop */}
                      <div
                        className="absolute inset-0 bg-black/35 backdrop-blur-[2px] z-20 transition-opacity animate-in fade-in duration-150 cursor-pointer"
                        onClick={() => setSelectedHotspot(null)}
                      />

                      {/* High-contrast Compact Centered Modal Card */}
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xs bg-white text-slate-900 rounded-2xl border-2 border-amber-500 shadow-2xl p-4 z-30 animate-in zoom-in-95 duration-150 space-y-2.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1 flex-1 min-w-0">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                              ✨ Chunk Found
                            </span>
                            <div className="text-base font-black text-slate-950 flex items-center gap-2 flex-wrap">
                              <span>{selectedHotspot.text}</span>
                              <button
                                type="button"
                                onClick={() => speakText(selectedHotspot.text)}
                                className="p-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 transition active:scale-95 shrink-0"
                                title="Listen again"
                              >
                                <Volume2 size={14} />
                              </button>
                            </div>
                            {selectedHotspot.vi && (
                              <div className="text-xs font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                                {selectedHotspot.vi}
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedHotspot(null)}
                            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs flex items-center justify-center transition active:scale-95 shrink-0 shadow-xs cursor-pointer"
                            aria-label="Close"
                          >
                            ✕
                          </button>
                        </div>

                        {/* Dismiss button */}
                        <button
                          type="button"
                          onClick={() => setSelectedHotspot(null)}
                          className="w-full py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-xs transition active:scale-95 text-center"
                        >
                          ✓ Got it (Đã hiểu)
                        </button>
                      </div>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => speakText(currentSceneText)}
                    className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 px-2.5 py-1.5 sm:px-4 sm:py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl shadow-md transition flex items-center gap-1 sm:gap-1.5 font-black text-[11px] sm:text-xs border border-white/40 z-10 backdrop-blur-xs active:scale-95"
                  >
                    <Volume2 size={14} className="sm:w-4 sm:h-4" /> <span>Listen to Scene</span>
                  </button>
                </div>

                <div className="p-3 sm:p-4 bg-blue-50/70 rounded-xl sm:rounded-2xl border border-blue-200/80">
                  <div className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
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
                        if (activeWeek) {
                          useDailyQuestStore.getState().completeQuest(activeWeek, 'gear1_webtoon');
                        }
                        fireCelebrationConfetti('Quest_Completed');
                        navigate(`/week/${activeWeek || 1}/hub/1`);
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

          <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-slate-200 shadow-md space-y-3 font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-indigo-600">
                  🎙️ Tap any sentence to listen & practice word-by-word karaoke
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Gamified Progress & Streak */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-xl text-[11px] font-black text-amber-900">
                  <span>⭐ {Object.keys(completedKaraokeSentences).length}/{storySentences.length}</span>
                  {karaokeStreak > 0 && (
                    <span className="px-1.5 py-0.5 bg-amber-400 text-slate-950 rounded-md text-[10px] animate-bounce">
                      🔥 {karaokeStreak}x
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={playFullStoryAudio}
                  className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg font-black text-[11px] shadow-sm flex items-center gap-1"
                >
                  <Play size={12} /> Full Audio
                </button>
              </div>
            </div>

            {/* ── TaskScreen Stepper Mode (1 sentence per screen) OR Legacy List Mode ── */}
            {hideGearTabs ? (
              <div className="space-y-3">
                {/* Stepper Header */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-lg">
                      Sentence {stepperIdx + 1}/{storySentences.length}
                    </span>
                  </div>
                  <div className="w-28 sm:w-36 h-2 bg-slate-200 rounded-full overflow-hidden">
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
                  const wordIpaList = getWordIpaList(sentence, ipaMap[idx] || null);

                  return (
                    <div className="p-2.5 sm:p-4 bg-gradient-to-b from-amber-50/80 to-white rounded-2xl border-2 border-amber-300 shadow-md space-y-2 sm:space-y-3 text-center">
                      <div className="min-h-[48px] sm:min-h-[56px] flex items-center justify-center py-0.5">
                        <div className="text-base sm:text-xl md:text-2xl font-black leading-snug flex flex-wrap items-end justify-center gap-x-1.5 sm:gap-x-2.5 gap-y-1.5 sm:gap-y-2">
                          {wordIpaList.map((item, wIdx) => {
                            const isWordActive = isCurrentPlaying && activeWordIdx === wIdx;
                            const isPast = isCurrentPlaying && activeWordIdx !== null && wIdx < activeWordIdx;

                            return (
                              <div key={wIdx} className="flex flex-col items-center justify-center min-w-[20px] sm:min-w-[24px]">
                                {/* Word */}
                                <span
                                  className={`px-1.5 sm:px-2 py-0.5 rounded-lg transition-all duration-150 ${
                                    isWordActive
                                      ? 'bg-amber-400 text-slate-950 font-black scale-105 shadow-md ring-2 ring-amber-300'
                                      : isPast
                                      ? 'text-amber-900 font-bold'
                                      : 'text-slate-900 font-black'
                                  }`}
                                >
                                  {item.word.replace(/\*\*/g, '')}
                                </span>
                                {/* IPA subtitle directly underneath each word */}
                                {item.ipa && (
                                  <span
                                    className={`text-[8.5px] sm:text-[10.5px] font-ipa tracking-tight mt-0 px-1 py-0 rounded transition-all ${
                                      isWordActive
                                        ? 'text-amber-950 font-black bg-amber-200 ring-1 ring-amber-300'
                                        : item.isStressed
                                        ? 'text-rose-700 font-bold bg-rose-50/90 border border-rose-200'
                                        : 'text-slate-600 font-semibold bg-slate-100/80'
                                    }`}
                                  >
                                    {item.ipa}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {isCurrentPlaying && (
                        <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase text-amber-800 tracking-wider bg-amber-200 px-2.5 py-0.5 rounded-full animate-pulse">
                          <Sparkles size={13} className="animate-spin text-amber-600" /> 🎤 Playing audio...
                        </div>
                      )}

                      {/* Main Action Buttons */}
                      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() => playListenModel(sentence, idx, 'listen-model-audio')}
                          className="px-4 sm:px-5 py-2 sm:py-2.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm shadow-md hover:shadow-lg flex items-center gap-1.5 transition"
                        >
                          <Volume2 size={16} /> 🔊 Listen Model
                        </button>

                        {sentenceShadowing[idx]?.isRecording ? (
                          <button
                            type="button"
                            onClick={() => stopSentenceShadowing(idx)}
                            className="px-4 sm:px-5 py-2 sm:py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition animate-pulse"
                          >
                            <Square size={16} /> ⏹ Stop Recording
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => startSentenceShadowing(idx, sentence)}
                            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm shadow-md hover:shadow-lg flex items-center gap-1.5 transition active:scale-95 ${
                              shadowingKaraokeIdx === idx
                                ? 'bg-purple-700 text-white animate-pulse ring-4 ring-purple-300'
                                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white'
                            }`}
                          >
                            <Mic size={20} /> 🎙️ Voice Shadow
                          </button>
                        )}
                      </div>

                      {/* Headphone Advice Tooltip / Badge */}
                      <div className="flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full shadow-xs" title="Wear headphones to prevent microphone echo when speaking while model audio plays">
                          🎧 <span>Please wear headphones during shadowing for the clearest recording!</span>
                        </span>
                      </div>

                      {/* Student Voice Playback */}
                      {sentenceShadowing[idx]?.audioUrl && !sentenceShadowing[idx]?.isRecording && (
                        <div className="flex flex-col items-center justify-center gap-2 pt-2">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                if (sentenceShadowing[idx].audioUrl !== 'simulated_voice_audio') {
                                  const audio = new Audio(sentenceShadowing[idx].audioUrl);
                                  audio.play().catch(e => console.warn('Voice playback error:', e));
                                } else {
                                  speakText(sentence, null, 1.0, null, 'shadowing', activeWeek);
                                }
                              }}
                              className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border border-emerald-300 rounded-xl font-black text-xs flex items-center gap-1.5 transition active:scale-95"
                            >
                              <Play size={14} className="fill-emerald-800" /> Play My Voice
                            </button>
                            <span
                              className="px-3 py-1.5 rounded-xl text-xs font-black shadow-sm flex items-center gap-1 text-white"
                              style={{
                                backgroundColor:
                                  (sentenceShadowing[idx].score > 0)
                                    ? '#059669'
                                    : '#dc2626'
                              }}
                            >
                              {sentenceShadowing[idx].score > 0
                                ? '✨ Voice Recorded!'
                                : '💪 Keep Practicing!'}
                            </span>
                          </div>
                          {sentenceShadowing[idx]?.feedback && (
                            <div className="flex flex-col items-center gap-0.5 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-center max-w-md">
                              <span>{sentenceShadowing[idx].feedback}</span>
                              {sentenceShadowing[idx]?.spokenText && (
                                <span className="text-[11px] text-slate-500 font-semibold italic">
                                  {sentenceShadowing[idx].spokenText}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Fallback alert if recording failed / too short */}
                      {!sentenceShadowing[idx]?.audioUrl && sentenceShadowing[idx]?.feedback && !sentenceShadowing[idx]?.isRecording && (
                        <div className="flex items-center justify-center pt-2">
                          <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-lg border border-rose-200">
                            {sentenceShadowing[idx].feedback}
                          </span>
                        </div>
                      )}

                      {/* 🎯 AI Pronunciation & Intonation Coach Guide */}
                      <PronunciationCoachCard
                        sentence={sentence}
                        customIpa={ipaMap[idx] || null}
                        defaultOpen={false}
                      />
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
                    ◀ Prev
                  </button>

                  {stepperIdx < storySentences.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setStepperIdx(prev => Math.min(storySentences.length - 1, prev + 1))}
                      className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs sm:text-sm font-black shadow-md flex items-center gap-1.5 transition"
                    >
                      Next ▶
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (activeWeek) {
                          useDailyQuestStore.getState().completeQuest(activeWeek, 'gear2_karaoke');
                        }
                        fireCelebrationConfetti('Quest_Completed');
                        navigate(`/week/${activeWeek || 1}/hub/1`);
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
                          onClick={() => playListenModel(sentence, idx, 'listen-model-audio-list')}
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
      {/* GEAR 3: 🎙️ RETELL TO NOVA — STEP-BY-STEP SINGLE SENTENCE FOCUS (ZERO-L1)   */}
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
                        Event {retellStepIdx + 1} of {RETELL_QUESTIONS.length}
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
                  <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-purple-200 shadow-md space-y-3.5 sm:space-y-5 text-center">
                    {/* Scene Visual Anchor Thumbnail + Nova Question Bubble */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-purple-50 border border-purple-200 rounded-xl sm:rounded-2xl text-left">
                      {scenes[retellStepIdx] && (
                        <div className="w-full sm:w-44 md:w-52 h-28 sm:h-28 md:h-32 rounded-xl overflow-hidden shadow-sm shrink-0 border border-purple-300 bg-slate-100">
                          <img
                            src={scenes[retellStepIdx]?.image_url || `/images/week${weekNum}/webtoon_scene_${retellStepIdx + 1}.png`}
                            alt={`Scene ${retellStepIdx + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src = `/images/week${weekNum}/webtoon_scene_1.png`; }}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                            "{currentQ.question_en}"
                          </p>
                          <button
                            type="button"
                            onClick={() => speakText(currentQ.question_en)}
                            className="p-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition active:scale-95 shadow-2xs shrink-0"
                            title="Listen"
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Scaffolded Input Chips */}
                    <div className="pt-0.5">
                      <div className="flex flex-wrap items-center justify-center gap-1.5">
                        {currentQ.chips.map((chip, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => speakText(chip)}
                            className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 rounded-lg text-xs font-bold transition active:scale-95 flex items-center gap-1 shadow-2xs"
                          >
                            <Volume2 size={11} className="text-indigo-500" />
                            {chip}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Hint Scaffolding Section with 10s Timer & Audio Listen Button */}
                    <div className="space-y-2">
                      {hintSecondsLeft !== null ? (
                        <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl space-y-3 animate-in fade-in">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className="px-2.5 py-0.5 bg-amber-200 text-amber-900 font-black text-[10px] rounded-lg animate-pulse">
                              ⏳ Hint closes in: {hintSecondsLeft}s
                            </span>
                            <div className="flex items-center gap-2">
                              {/* Audio Listen Button inside Hint */}
                              <button
                                type="button"
                                onClick={() => speakText(currentQ.sentence)}
                                className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-black flex items-center gap-1 shadow-sm transition active:scale-95"
                              >
                                <Volume2 size={13} /> Listen Sentence
                              </button>
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
                                      studyScaffold === id ? 'bg-amber-700 text-white' : 'bg-white text-amber-900 border border-amber-200'
                                    }`}
                                  >
                                    {label}
                                  </button>
                                ))}
                              </div>
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
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black transition flex items-center gap-1.5 border border-slate-200 shadow-sm"
                          >
                            💡 Show Sentence Hint (10s)
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
                            <span className="text-[10px] font-black uppercase tracking-wider">RECORD</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={stopRetellRecording}
                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex flex-col items-center justify-center gap-1 shadow-2xl shadow-rose-500/40 transition animate-bounce"
                          >
                            <Square size={32} fill="currentColor" />
                            <span className="text-[10px] font-black uppercase tracking-wider">STOP</span>
                          </button>
                        )}
                        <p className="text-xs font-black text-slate-600">
                          {isRecording ? '🔴 Recording... Speak your answer now!' : 'Tap RECORD to answer Nova'}
                        </p>
                      </div>


                      {/* Recorded Audio & AI Evaluation Feedback */}
                      {retellEvaluations[retellStepIdx] && (
                        <div className="space-y-2 max-w-md mx-auto animate-in fade-in">
                          <div className={`p-3.5 rounded-2xl border ${
                            retellEvaluations[retellStepIdx].evalResult.isCorrect
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                              : 'bg-amber-50 border-amber-300 text-amber-950'
                          } text-left space-y-1`}>
                            <div className="flex items-center justify-between text-xs font-black">
                              <span>{retellEvaluations[retellStepIdx].evalResult.feedback}</span>
                              <span>Score: {retellEvaluations[retellStepIdx].evalResult.score}%</span>
                            </div>
                            {retellEvaluations[retellStepIdx].transcript && (
                              <p className="text-xs font-medium italic">
                                You said: "{retellEvaluations[retellStepIdx].transcript}"
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Fallback Keyboard Input */}
                      <div className="pt-1 max-w-md mx-auto">
                        <MicFallbackInput
                          onSubmit={handleManualRetellSubmit}
                          placeholder={`e.g. ${currentQ.sentence}`}
                          buttonLabel="Submit Retell Sentence →"
                          color="purple"
                        />
                      </div>
                    </div>


                    {/* Step Navigation */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        disabled={retellStepIdx === 0}
                        onClick={() => setRetellStepIdx(prev => prev - 1)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 rounded-xl text-xs font-bold transition"
                      >
                        ◀ Previous
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (isLastStep) {
                            setRetellStepIdx(RETELL_QUESTIONS.length);
                            if (activeWeek) {
                              useDailyQuestStore.getState().completeQuest(activeWeek, 'gear3_retell');
                            }
                            fireCelebrationConfetti('Retell_Master');
                          } else {
                            setRetellStepIdx(prev => prev + 1);
                          }
                        }}
                        className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white rounded-xl text-xs sm:text-sm font-black shadow-md transition active:scale-95"
                      >
                        {isLastStep ? 'Complete Retell ▶' : 'Next Question ▶'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            /* Victory Screen (Zero-L1) */
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-purple-200 shadow-xl text-center space-y-5 animate-in zoom-in-95">
              <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">
                🏆
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900">
                  🌟 Fantastic! You are a Retell Master!
                </h3>
                <p className="text-sm font-medium text-slate-600">
                  You successfully retold all 5 story events with Nova (+50 XP)
                </p>
              </div>

              <div className="flex justify-center gap-1 text-2xl text-amber-400">
                ⭐⭐⭐⭐⭐
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    if (activeWeek) {
                      useDailyQuestStore.getState().completeQuest(activeWeek, 'gear3_retell');
                    }
                    fireCelebrationConfetti('Quest_Completed');
                    navigate(`/week/${activeWeek || 1}/hub/1`);
                  }}
                  className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white rounded-2xl font-black text-sm shadow-xl flex items-center gap-2 transition hover:scale-105 animate-bounce"
                >
                  🎉 Return to Quest Map ▶
                </button>
              </div>
            </div>
          )}
        </div>
      )}


      {/* ========================================================================= */}
      {/* GEAR 4: 🌍 CLIL KNOWLEDGE EXPLORER (Full-Width Expanded Layout)            */}
      {/* ========================================================================= */}
      {currentGear === 4 && (
        <div className="w-full animate-in fade-in duration-200">
          <CLILExplorer
            clilData={clilArticle || readExplore}
            weekNumber={activeWeek}
            highlightMode={highlightMode}
            setHighlightMode={setHighlightMode}
            targetGrammarRegex={grammarRegex}
            onCompleteCLIL={() => {
              setClilStampEarned(true);
              setSelectedStampId('science');
              setShowStampModal(true);
            }}
          />

          {/* Grand Stamp Slam Animation Modal */}
          <GrandStampModal
            isOpen={showStampModal}
            stampId={selectedStampId}
            level={selectedStampId === 'science' && clilStampEarned ? 2 : 1}
            onClose={() => setShowStampModal(false)}
          />
        </div>
      )}
    </div>
  );
}
