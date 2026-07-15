import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Video, Mic, Type, Download, Play, Pause, RotateCcw, CheckCircle, AlertCircle, Globe, Loader2, ArrowRight, Eye, EyeOff, Edit3, BarChart2, Star, History, ChevronDown, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';
import { useStationProgress } from '../../hooks/useStationProgress';
import { scoreWriting } from '../../utils/writingRubric';
import { sendToAI } from '../../services/ai_tutor/aiRouter';
import { saveVideo, loadVideo } from '../../utils/videoStorage';

const AI_FEEDBACK_KEY = 'writing_ai_feedback_count'; // localStorage key
const AI_FEEDBACK_LIMIT = 3; // max per week per device

function getAiFeedbackCount(weekId) {
  try {
    const raw = localStorage.getItem(`${AI_FEEDBACK_KEY}_w${weekId}`);
    return raw ? parseInt(raw, 10) : 0;
  } catch { return 0; }
}
function incAiFeedbackCount(weekId) {
  try {
    const n = getAiFeedbackCount(weekId) + 1;
    localStorage.setItem(`${AI_FEEDBACK_KEY}_w${weekId}`, String(n));
    return n;
  } catch { return 1; }
}

const VideoChallenge = ({ data, themeColor, isVi, onToggleLang, onReportProgress }) => {
  const { weekId } = useParams();
  const content = (data?.writing || data?.video) ? (data.writing || data.video) : data;

  // 🔥 Universal Progress System Integration
  const { savedData, saveProgress, markComplete } = useStationProgress(
    parseInt(weekId), 
    'video_challenge'
  );

  // Track whether we've already hydrated local state from savedData.
  // Zustand hydrates asynchronously, so savedData may be empty on first render.
  const hydratedRef = useRef(false);

  // --- STATE ---
  const [activeTab, setActiveTab] = useState(savedData.lastTab || 'write'); 
  const [script, setScript] = useState(savedData.script || "");
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null); // always starts null; loaded async from IndexedDB
  const [countdown, setCountdown] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isScriptVisible, setIsScriptVisible] = useState(true);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(savedData.recorded || false);
  // 🆕 S2.2 — Writing Rubric
  const [rubricResult, setRubricResult] = useState(null);
  const [writingHistory, setWritingHistory] = useState(savedData.writingHistory || []);
  const [showHistory, setShowHistory] = useState(false);
  // 🆕 Phase-aware writing scaffold
  // Restore frameInputs from savedData so blanks survive reload
  const [frameInputs, setFrameInputs] = useState(savedData.frameInputs || {});
  const [ideaBlocks, setIdeaBlocks] = useState({ opening: '', main: '', ending: '' });
  const [isSttListening, setIsSttListening] = useState(false);
  // 🆕 Tiered hints system
  const [showVocabBank, setShowVocabBank] = useState(false);
  const [showModelParagraph, setShowModelParagraph] = useState(false);
  // 🆕 Inline hints per blank
  const [activeBlankHint, setActiveBlankHint] = useState(null); // { frameIndex, blankIndex }
  const [hintUsageCount, setHintUsageCount] = useState(0); // Track how many times hints were clicked

  // 🔥 HYDRATION FIX: savedData arrives async (Zustand rehydrates after first render).
  // Once savedData has real content, sync it into local state (only once per weekId).
  useEffect(() => {
    // Reset hydration flag when week changes so we re-hydrate for the new week
    hydratedRef.current = false;
  }, [weekId]);

  useEffect(() => {
    if (hydratedRef.current) return;
    // savedData is populated when it has any key
    if (Object.keys(savedData).length === 0) return;
    hydratedRef.current = true;
    if (savedData.script) setScript(savedData.script);
    if (savedData.frameInputs && Object.keys(savedData.frameInputs).length > 0) setFrameInputs(savedData.frameInputs);
    if (savedData.recorded) setHasRecorded(true);
    if (savedData.lastTab) setActiveTab(savedData.lastTab);
    if (savedData.writingHistory?.length) setWritingHistory(savedData.writingHistory);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedData]);
  
  // 🎯 DETECT MODE: Check if this is Easy (word banks) or Advanced (phrase banks)
  const isAdvancedMode = useMemo(() => {
    if (!content?.hints?.vocabulary_bank?.words) return false;
    // Calculate average word length - if many words are >15 chars, it's phrase bank (Advanced)
    const avgLength = content.hints.vocabulary_bank.words.reduce((sum, w) => sum + w.word.length, 0) 
                      / content.hints.vocabulary_bank.words.length;
    return avgLength > 15; // Phrase banks have longer avg length
  }, [content?.hints?.vocabulary_bank?.words]);
  
  // ─── POPUP HINT LOGIC ──────────────────────────────────────────────────────
  // Each sentence_frame may have an `answers` array (one entry per blank).
  // The popup ALWAYS shows the correct answer for that blank + random others + 1 distractor.
  // If no `answers` present (old data), falls back to random subset of vocab bank.
  // NO regex, NO POS tagging, NO complex rules.
  // eslint-disable-next-line no-unused-vars
  const categorizeWord = useCallback((word) => {
    const w = word.toLowerCase();
    const categories = [];
    
    // Past tense verbs (regular -ed + common irregular)
    if (w.match(/^(walked|played|watched|cooked|helped|returned|woke|felt|visited|liked|loved|enjoyed|went|ate|got|came|saw|had|made|took|gave|ran|swam|read|wrote|drew|sang|danced|jumped|climbed|rode|flew|slept|studied|cleaned|finished|talked|listened|started|opened|looked|washed|did|laughed|biked)$/) || w.match(/\b(got dressed|ate breakfast|ate lunch|ate dinner)\b/)) {
      categories.push('past_verb');
    }
    // Base/present verbs (more comprehensive list)
    if (w.match(/^(walk|play|watch|cook|help|return|wake|feel|visit|like|love|enjoy|run|read|swim|relax|eat|drink|sleep|study|write|draw|sing|dance|jump|climb|ride|fly)$/)) {
      categories.push('base_verb');
    }
    // -ING form verbs (present continuous)
    if (w.match(/ing$/)) {
      categories.push('verb_ing');
    }
    // Time words (including o'clock expressions)
    if (w.match(/^(saturday|sunday|monday|tuesday|wednesday|thursday|friday|morning|afternoon|evening|night|weekend|today|yesterday)$/) || w.match(/o'?clock/i)) {
      categories.push('time');
    }
    // Numbers (including digit forms)
    if (w.match(/^(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)$/) || w.match(/^\d+/)) {
      categories.push('number');
    }
    // Age-related
    if (w.match(/^(old|years|age)$/)) {
      categories.push('age');
    }
    // Weather adjectives
    if (w.match(/^(sunny|rainy|cloudy|windy|warm|cold|hot|cool)$/)) {
      categories.push('weather_adj');
    }
    // Emotion adjectives
    if (w.match(/^(happy|sad|excited|tired|angry|scared|bored|surprised|proud|relaxed|calm|grateful|peaceful)$/)) {
      categories.push('emotion_adj');
    }
    // General adjectives
    if (w.match(/^(big|small|good|bad|nice|great|funny|delicious|beautiful|wonderful)$/)) {
      categories.push('adjective');
    }
    // People/family nouns (including phrases like "my mom", "my friends")
    if (w.match(/\b(mother|father|sister|brother|friend|teacher|family|parent|mom|dad|friends)\b/)) {
      categories.push('person');
    }
    // Place nouns (including "the park", "the school")
    if (w.match(/\b(park|home|school|kitchen|bedroom|garden|beach|pool|shop|mall)\b/)) {
      categories.push('place');
    }
    // Activity/object nouns (including "my homework", "the TV")
    if (w.match(/\b(soccer|ball|game|movie|tv|book|food|lunch|dinner|breakfast|homework|desk|room|work|class)\b/)) {
      categories.push('activity', 'noun');
    }
    // Nature/outdoor nouns
    if (w.match(/\b(grass|tree|flower|sky|sun|bird|dog|cat|pet)\b/)) {
      categories.push('nature');
    }
    // Food nouns
    if (w.match(/^(rice|chicken|fish|egg|bread|fruit|vegetable|cake|pizza)$/)) {
      categories.push('food');
    }
    // Generic nouns
    if (w.match(/^(name|weather|day|time|thing|story)$/)) {
      categories.push('noun');
    }
    
    return categories.length > 0 ? categories : ['other'];
  }, []);
  
  // 🎯 SMART CONTEXT ANALYSIS: Determine what type of word each blank needs
  const analyzeBlankContext = useCallback((template, blankIndex) => {
    const parts = template.split('___');
    const before = parts[blankIndex] || '';
    const after = parts[blankIndex + 1] || '';
    
    const beforeLower = before.toLowerCase().trim();
    const afterLower = after.toLowerCase().trim();
    
    // 🆕 FULL TEMPLATE CONTEXT: Check entire sentence for modal verbs AND past tense indicators
    const fullTemplate = template.toLowerCase();
    const hasModalVerb = fullTemplate.match(/\b(can|will|could|would|should|may|might)\b/);
    const hasPastContext = fullTemplate.match(/\b(yesterday|last|woke up|went to|was|were|did|in the morning|in the evening)\b/);
    
    // Pattern matching for context clues
    const needs = [];
    
    // "My ___ is" → name/noun
    if (beforeLower.endsWith('my') && afterLower.startsWith('is')) {
      needs.push('noun', 'person');
    }
    // "I am ___ years" → number
    if (beforeLower.endsWith('am') && afterLower.startsWith('years')) {
      needs.push('number');
    }
    // "years ___" → old
    if (beforeLower.endsWith('years')) {
      needs.push('age');
    }
    // "Last ___," → time word
    if (beforeLower.endsWith('last')) {
      needs.push('time');
    }
    // "at ___" → time (especially after woke up, arrived, started)
    if (beforeLower.endsWith('at')) {
      needs.push('time', 'number');
    }
    // "I ___ up" → past verb (woke)
    if (beforeLower.endsWith('i') && afterLower.startsWith('up')) {
      needs.push('past_verb');
    }
    // "___ed ___" (second blank) → object/noun (after past tense verb)
    // Detect by: before ends with "ed" and is short (< 10 chars)
    if (beforeLower.trim().endsWith('ed') && beforeLower.length < 10) {
      needs.push('noun', 'activity', 'person', 'place', 'food');
    }
    // "in the ___." → time/place
    if (beforeLower.endsWith('the') && afterLower.match(/^[.,!?]/)) {
      needs.push('time', 'place', 'noun');
    }
    // "The ___ was" → noun (subject)
    if (beforeLower.endsWith('the') && afterLower.startsWith('was')) {
      needs.push('noun', 'weather_adj');
    }
    // "was very ___" → adjective
    if (beforeLower.endsWith('very')) {
      needs.push('adjective', 'emotion_adj', 'weather_adj');
    }
    // "very ___ and" → adjective
    if (beforeLower.endsWith('very') && afterLower.startsWith('and')) {
      needs.push('adjective', 'emotion_adj', 'weather_adj');
    }
    // "and ___." → context-dependent!
    if (beforeLower.endsWith('and') && afterLower.match(/^[.,!?]/)) {
      // If sentence has "felt" (emotion context), need adjective
      if (fullTemplate.toLowerCase().includes('felt')) {
        needs.push('emotion_adj', 'adjective');
      }
      // If sentence has modal verb (can, will, etc.), need base verb
      else if (hasModalVerb) {
        needs.push('base_verb', 'activity');
      } 
      // If sentence has past tense context (Yesterday, woke up, went to, etc.), need past verb
      else if (hasPastContext || beforeLower.match(/\b(walked|played|watched|cooked|helped|went|ate|did|woke|got|came|saw|had|made|took|gave|felt|ran|swam|read|wrote|drew|sang|danced|jumped|climbed|rode|flew|slept|studied|cleaned|finished|talked|listened|started|opened|looked)\b/)) {
        needs.push('past_verb', 'activity');
      }
      // Default: adjective (for descriptive sentences)
      else {
        needs.push('adjective', 'emotion_adj', 'weather_adj');
      }
    }
    // "I ___" in past tense context (Yesterday, I... / In the morning, I...)
    if (beforeLower.match(/\b(yesterday|morning|evening|afternoon),?\s+i$/i) || 
        (beforeLower.endsWith('i') && hasPastContext)) {
      needs.push('past_verb', 'activity');
    }
    // "I ___ to" → past verb
    if (beforeLower.endsWith('i') && afterLower.startsWith('to')) {
      needs.push('past_verb');
    }
    // "to the ___" → place
    if (beforeLower.endsWith('the') && (afterLower.startsWith('with') || afterLower.startsWith('.'))) {
      needs.push('place');
    }
    // "with my ___" → person/thing
    if (beforeLower.endsWith('my')) {
      needs.push('person', 'noun', 'nature');
    }
    // "We ___" → past verb
    if (beforeLower.endsWith('we')) {
      needs.push('past_verb');
    }
    // "on the ___" → place/surface
    if (beforeLower.endsWith('the') && (beforeLower.includes('on') || beforeLower.includes('at'))) {
      needs.push('place', 'nature', 'noun');
    }
    // "I ___ my" → past verb
    if (beforeLower.endsWith('i') && afterLower.startsWith('my')) {
      needs.push('past_verb');
    }
    // "in the ___." (again, more specific)
    if (beforeLower.includes('in the') && afterLower.match(/^[.,!?]/)) {
      needs.push('place', 'time');
    }
    // "with ___ and" → food/noun
    if (beforeLower.endsWith('with') && afterLower.startsWith('and')) {
      needs.push('food', 'noun');
    }
    // "and ___." (food context)
    if (beforeLower.includes('lunch') || beforeLower.includes('dinner') || beforeLower.includes('breakfast')) {
      needs.push('food', 'noun');
    }
    // "a ___ movie" → adjective
    if (afterLower.startsWith('movie') || afterLower.startsWith('book') || afterLower.startsWith('game')) {
      needs.push('adjective');
    }
    // "on ___." → TV/place
    if (beforeLower.endsWith('on') && afterLower.match(/^[.,!?]/)) {
      needs.push('activity', 'noun');
    }
    // "I was ___" → emotion adjective
    if (beforeLower.endsWith('was')) {
      needs.push('emotion_adj', 'adjective');
    }
    // "I felt ___" → emotion adjective
    if (beforeLower.endsWith('felt')) {
      needs.push('emotion_adj', 'adjective');
    }
    // "and ___." (emotion context)
    if (beforeLower.includes('was') && afterLower.match(/^[.,!?]/)) {
      needs.push('emotion_adj', 'adjective');
    }
    // "___ my mom" or "___ my family" → past verb (helped/cooked)
    if (afterLower.match(/^my (mom|dad|family|parents|teacher)/)) {
      needs.push('past_verb', 'activity');
    }
    // "___ my homework" → past verb (did/finished)
    if (afterLower.startsWith('my homework')) {
      needs.push('past_verb', 'activity');
    }
    // "I ___ home" → past verb (returned/went)
    if (afterLower.startsWith('home')) {
      needs.push('past_verb');
    }
    // "and ___ tired" → past verb (felt)
    if (afterLower.startsWith('tired') || afterLower.startsWith('happy') || afterLower.startsWith('sad')) {
      needs.push('past_verb');
    }
    // "but ___." → adjective/emotion
    if (beforeLower.endsWith('but')) {
      needs.push('emotion_adj', 'adjective');
    }
    // "can ___" → base verb (modal + base form)
    if (beforeLower.endsWith('can')) {
      needs.push('base_verb', 'activity');
    }
    // "will ___" → base verb
    if (beforeLower.endsWith('will')) {
      needs.push('base_verb');
    }
    // "to ___" (infinitive) → base verb
    if (beforeLower.endsWith('to') && !beforeLower.endsWith('went to') && !beforeLower.endsWith('returned to')) {
      needs.push('base_verb', 'activity');
    }
    // "___ing" (present continuous) → verb stem (Advanced) or -ing form (Easy)
    if (afterLower.startsWith('ing')) {
      needs.push('base_verb', 'activity', 'verb_ing');
    }
    // "___ed" (past tense) → base verb (app adds -ed suffix)
    if (afterLower.startsWith('ed')) {
      needs.push('base_verb', 'past_verb', 'activity');
    }
    // "are ___" or "is ___" (present continuous without -ing suffix) → -ing form
    if (beforeLower.endsWith('are') || beforeLower.endsWith('is')) {
      needs.push('verb_ing', 'activity', 'adjective');
    }
    
    return needs.length > 0 ? needs : ['any'];
  }, []);
  
  const getRelevantWordsForBlank = useCallback((frameIndex, blankIndex) => {
    if (!content?.sentence_frames || !content?.hints?.vocabulary_bank?.words) return [];
    const frame = content.sentence_frames[frameIndex];
    if (!frame) return [];

    // All vocab words, exclude === section headers
    const allWords = content.hints.vocabulary_bank.words.filter(w => !w.word.includes('==='));
    const correctPool = allWords.filter(w => !w.distractor);
    const distractorPool = allWords.filter(w => w.distractor);

    // Hint count based on scaffolding stage
    const stage = content.hints?.vocabulary_bank?.scaffolding_stage || 'medium';
    const avgLen = correctPool.length > 0
      ? correctPool.reduce((s, w) => s + w.word.length, 0) / correctPool.length : 0;
    const isPhrase = avgLen > 12;
    const maxHints = isPhrase
      ? (stage === 'high' ? 3 : stage === 'medium' ? 3 : stage === 'medium-low' ? 4 : 5)
      : (stage === 'high' ? 4 : stage === 'medium' ? 5 : stage === 'medium-low' ? 6 : 7);

    // Seeded RNG — different subset per blank
    const seed = frameIndex * 1000 + blankIndex;
    const rng = (n) => { const x = Math.sin(seed + n) * 10000; return x - Math.floor(x); };
    const seededShuffle = (arr) => {
      const out = [...arr];
      for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(rng(i) * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
      }
      return out;
    };

    // Try to find the correct answer for THIS blank from frame.answers
    const answers = frame.answers || [];
    const correctAnswerText = answers[blankIndex];

    // Creative blank: no hints, student writes freely
    if (correctAnswerText === '__creative__') return [{ word: '__creative__', vi: '', distractor: false }];
    const correctObj = correctAnswerText
      ? correctPool.find(w => w.word.toLowerCase() === correctAnswerText.toLowerCase())
        || { word: correctAnswerText, vi: '', distractor: false }
      : null;

    // Others = correct pool minus the answer for this blank
    const otherPool = correctObj
      ? correctPool.filter(w => w.word.toLowerCase() !== correctAnswerText.toLowerCase())
      : correctPool;
    const shuffledOthers = seededShuffle(otherPool);
    const distractor = seededShuffle(distractorPool)[0];

    // Build: answer (always first) + others + 1 distractor
    const numOthers = maxHints - (correctObj ? 1 : 0) - (distractor ? 1 : 0);
    const final = [
      ...(correctObj ? [correctObj] : []),
      ...shuffledOthers.slice(0, numOthers),
      ...(distractor ? [distractor] : [])
    ];

    // Final shuffle so correct answer isn't always first
    return seededShuffle(final);
  }, [content?.sentence_frames, content?.hints?.vocabulary_bank?.words, content?.hints?.vocabulary_bank?.scaffolding_stage]);
  
  // 🎯 MEMOIZED HINT CACHE: Cache filtered words per blank to prevent re-computation
  const hintCache = useMemo(() => {
    if (!content?.sentence_frames) return {};
    const cache = {};
    content.sentence_frames.forEach((frame, fi) => {
      const blankCount = frame.template.split('___').length - 1;
      for (let bi = 0; bi < blankCount; bi++) {
        cache[`${fi}-${bi}`] = getRelevantWordsForBlank(fi, bi);
      }
    });
    return cache;
  }, [content?.sentence_frames, getRelevantWordsForBlank]);
  
  // Refs
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null); 
  const mimeTypeRef = useRef(MediaRecorder.isTypeSupported("video/mp4") ? "video/mp4" : "video/webm");
  const popupRef = useRef(null); // For click outside detection
  const timerRef = useRef(null);
  const sttRef = useRef(null);

  // 🔥 Debounced Save to Universal Progress System
  useEffect(() => {
    const handler = setTimeout(() => {
      // Once recorded, always report as complete — prevents the safety net in
      // useStationProgress from blocking saves of script/frameInputs updates.
      const isComplete = hasRecorded || !!savedData.recorded;
      const percent = isComplete ? 100 : (script.length > 10 ? 30 : 0);
      
      saveProgress({
        recorded: hasRecorded || !!savedData.recorded,
        script: script,
        frameInputs: frameInputs, // 🔥 persist filled blanks across reload
        lastTab: activeTab,
        recordedAt: hasRecorded ? new Date().toISOString() : (savedData.recordedAt || null),
        writingHistory: writingHistory,
        // NOTE: videoUrl is NOT saved here — video is stored in IndexedDB (videoStorage.js)
      }, isComplete, percent);

      if (isComplete) {
        markComplete(100);
      }
    }, 1500);

    return () => clearTimeout(handler);
  }, [hasRecorded, script, frameInputs, activeTab, writingHistory, saveProgress, markComplete]);

  // 🤖 AI Writing Feedback
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isAiFeedbackLoading, setIsAiFeedbackLoading] = useState(false);
  const [aiFeedbackUsed, setAiFeedbackUsed] = useState(() => getAiFeedbackCount(weekId));

  const handleAiFeedback = async () => {
    if (!script.trim() || isAiFeedbackLoading) return;
    if (aiFeedbackUsed >= AI_FEEDBACK_LIMIT) return;
    setIsAiFeedbackLoading(true);
    setAiFeedback(null);
    try {
      const rubricSummary = rubricResult
        ? `Rubric score: ${rubricResult.total}/${rubricResult.maxTotal} (D1:${rubricResult.dimensions.D1.score} D2:${rubricResult.dimensions.D2.score} D3:${rubricResult.dimensions.D3.score} D4:${rubricResult.dimensions.D4.score})`
        : '';
      const systemPrompt = `You are Nova, a warm and encouraging English tutor for kids aged 6-15.
Read the student's English writing and give a short, natural, upbeat response in English — like a real teacher talking to a child.
Keep it under 40 words. Always positive and specific (mention something they did well). Point out at most ONE thing to improve, kindly.
Examples of tone: "Love this! Your sentence about the park is so vivid. Next time, try adding 'because' to explain why."
Or: "Great work! I can picture your family. Maybe try: My family IS big (not 'are')." 
${rubricSummary}
Respond in JSON: {"ai_response": "your feedback here"}`;
      const response = await sendToAI({
        systemPrompt,
        chatHistory: [],
        userMessage: `Bài viết của học sinh: "${script}"`,
        weekId: parseInt(weekId),
        skipGrammarGuard: true,
      });
      const raw = response?.ai_response;
      const text = typeof raw === 'string' ? raw
        : typeof response === 'string' ? response
        : '';
      setAiFeedback(text || 'Nova không thể nhận xét lúc này. Thử lại sau nhé!');
      const newCount = incAiFeedbackCount(weekId);
      setAiFeedbackUsed(newCount);
    } catch {
      setAiFeedback('Nova không thể nhận xét lúc này. Thử lại sau nhé!');
    } finally {
      setIsAiFeedbackLoading(false);
    }
  };

  // 🆕 S2.2 — Submit writing for rubric scoring
  const handleSubmitWriting = () => {
    if (!script.trim() || wordCount < 5) return;
    const wordBank = content?.keywords || content?.word_bank || [];
    const result = scoreWriting({
      text: script,
      wordBank,
      promptEn: content?.prompt_en || '',
      weekNumber: parseInt(weekId),
    });
    setRubricResult(result);
    // Add to history (keep last 5) — save D1/D2/D3/D4 breakdown for teacher reporting
    setWritingHistory(prev => [
      {
        date: new Date().toLocaleDateString(),
        text: script.slice(0, 100),
        score: result.total,
        max: result.maxTotal,
        tier: result.tier,
        D1: result.dimensions.D1.score,
        D2: result.dimensions.D2.score,
        D3: result.dimensions.D3.score,
        D4: result.dimensions.D4.score,
        wordCount: result.wordCount,
        feedback: result.feedback,
        submittedAt: new Date().toISOString(),
      },
      ...prev,
    ].slice(0, 5));
  };

  useEffect(() => {
    if (Object.keys(frameInputs).length === 0) return;
    const isComplete = hasRecorded || !!savedData.recorded;
    const percent = isComplete ? 100 : (script.length > 10 ? 30 : 0);
    saveProgress({
      recorded: isComplete,
      script,
      frameInputs,
      lastTab: activeTab,
      recordedAt: hasRecorded ? new Date().toISOString() : (savedData.recordedAt || null),
      writingHistory,
    }, isComplete, percent);
  }, [frameInputs, saveProgress, script, activeTab, hasRecorded, savedData.recorded, writingHistory]);

  // 🆕 STT handler (browser Web Speech API)
  const handleSttToggle = () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      alert(isVi ? 'Browser không hỗ trợ nhận giọng nói. Hãy dùng Chrome!' : 'Speech recognition not supported. Please use Chrome!');
      return;
    }
    if (isSttListening) {
      sttRef.current?.stop();
      setIsSttListening(false);
      return;
    }
    const rec = new SpeechRec();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setScript(prev => prev ? prev + ' ' + transcript : transcript);
      setIsSttListening(false);
    };
    rec.onerror = () => setIsSttListening(false);
    rec.onend = () => setIsSttListening(false);
    sttRef.current = rec;
    rec.start();
    setIsSttListening(true);
  };

  // Cleanup & Reset
  useEffect(() => {
    // Don't reset on initial load if there's saved data
    if (!savedData.script && !savedData.recorded) {
      setScript(""); 
      setVideoBlob(null);
      setVideoUrl(null);
      setIsRecording(false);
      setCountdown(0);
      setShowConfetti(false);
      setActiveTab('write');
      setIsPlaying(false);
      setHasRecorded(false);
      setFrameInputs({});
    }
    stopCamera(); 
    clearInterval(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.title]);

  // 🔥 Load video from IndexedDB when savedData becomes available (async server load)
  useEffect(() => {
    // savedData.recorded may arrive late (after server fetch), so depend on it
    if (savedData.recorded && !videoUrl && !videoBlob) {
      loadVideo(weekId).then(url => {
        if (url) setVideoUrl(url);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekId, savedData.recorded]);

  useEffect(() => {
    return () => {
        stopCamera();
        clearInterval(timerRef.current);
        if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- HANDLE VIDEO URL & PLAYBACK ---
  useEffect(() => {
    if (videoBlob) {
        const url = URL.createObjectURL(videoBlob);
        setVideoUrl(url);
        setIsPlaying(false); 
    } else if (!hasRecorded) {
        setVideoUrl(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoBlob]);

  // --- CAMERA LOGIC ---
  useEffect(() => {
    // Start camera only when on record tab AND no video loaded (neither new blob nor IndexedDB restore)
    if (activeTab === 'record' && !videoBlob && !videoUrl) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [activeTab, videoBlob, videoUrl]);

  // 🎯 KEYBOARD SHORTCUTS: ESC to close hints, Ctrl/Cmd+H to toggle
  useEffect(() => {
    const handleKeyDown = (e) => {
      // ESC: Close active hint popup
      if (e.key === 'Escape' && activeBlankHint) {
        setActiveBlankHint(null);
        e.preventDefault();
      }
      // Ctrl/Cmd + H: Toggle hint for focused input (if any)
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        const focusedInput = document.activeElement;
        if (focusedInput && focusedInput.tagName === 'INPUT' && focusedInput.dataset.blankKey) {
          const key = focusedInput.dataset.blankKey;
          setActiveBlankHint(activeBlankHint === key ? null : key);
          if (activeBlankHint !== key) {
            setHintUsageCount(prev => prev + 1);
          }
          e.preventDefault();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeBlankHint]);

  // ⏱️ AUTO-CLOSE: Close popup after 10 seconds (allows students to read and copy)
  useEffect(() => {
    if (activeBlankHint) {
      const timer = setTimeout(() => {
        setActiveBlankHint(null);
      }, 10000); // 10 seconds
      
      return () => clearTimeout(timer);
    }
  }, [activeBlankHint]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraReady(false);
  };

  const startCamera = async () => {
    stopCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" }, 
        audio: true 
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch(e => console.error("Play error:", e));
            setIsCameraReady(true);
        };
      }
    } catch (err) {
      console.error("Camera Error:", err);
    }
  };

  // --- PLAYBACK CONTROL ---
  const togglePlayback = () => {
    if (videoRef.current) {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            // Đảm bảo play từ đầu nếu đã kết thúc
            if (videoRef.current.ended) {
              videoRef.current.currentTime = 0;
            }
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  // Phase detection: 1 = Nền tảng (wk 1–42), 2 = Ứng dụng (wk 43–112), 3 = Tổng hợp (wk 113+)
  const weekNum = parseInt(weekId) || 1;
  const writingPhase = weekNum <= 42 ? 1 : weekNum <= 112 ? 2 : 3;

  if (!content || !content.title) return <div className="p-10 text-center text-slate-400">No content.</div>;

  // --- RECORDING LOGIC (FIXED) ---
  const handleStartSequence = () => {
    if (isRecording || countdown > 0 || !isCameraReady) return;
    
    // Đặt lại MIME type ngay trước khi ghi
    const types = [
        "video/mp4", 
        "video/webm;codecs=vp8,opus", 
        "video/webm"
    ];
    let selectedType = "video/webm";
    for (let t of types) {
        if (MediaRecorder.isTypeSupported(t)) {
            selectedType = t;
            break;
        }
    }
    mimeTypeRef.current = selectedType;

    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          startRecordingActual();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startRecordingActual = () => {
    if (!streamRef.current || !streamRef.current.active) {
        startCamera().then(() => { if(streamRef.current) startRecordingActual(); });
        return;
    }

    try {
      // Dùng mimeType đã được xác định.
      mediaRecorderRef.current = new MediaRecorder(streamRef.current, { mimeType: mimeTypeRef.current });
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        // FIX: Tạo blob trước khi clear interval
        const blob = new Blob(chunksRef.current, { type: mimeTypeRef.current });
        
        // FIX QUAN TRỌNG: Clear chunksRef SAU KHI tạo blob để tránh lỗi lặp
        chunksRef.current = []; 

        if (blob.size > 0) {
            setVideoBlob(blob);
            setHasRecorded(true);
            setShowConfetti(true);
            // 🔥 Persist video blob to IndexedDB so it survives tab-switch & reload
            saveVideo(weekId, blob).catch(err => console.warn('[VideoChallenge] saveVideo failed:', err));
        } else {
            alert("Lỗi: Không có dữ liệu video.");
        }
        setIsRecording(false);
        clearInterval(timerRef.current);
      };

      // start() không có timeslice để ghi liền mạch (Continuous Recording)
      mediaRecorderRef.current.start(); 
      
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (e) { 
        console.error("Recorder Start Error:", e); 
        setIsRecording(false); 
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  const handleDownload = () => {
    if (videoBlob) {
      const url = URL.createObjectURL(videoBlob);
      const a = document.createElement('a');
      a.href = url;
      // Luôn đặt tên file là MP4
      a.download = `my_video_${new Date().getTime()}.mp4`; 
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const wordCount = script.trim().split(/\s+/).filter(w => w.length > 0).length;

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      {/* 1. HEADER */}
      <div className="bg-slate-50 p-3 border-b border-slate-200 flex justify-between items-center flex-shrink-0 z-50 relative">
        <div className="flex items-center gap-3">
          <div className={`p-2 bg-${themeColor}-100 rounded-xl text-${themeColor}-600`}>
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h2 className={`text-base font-black text-${themeColor}-800 uppercase`}>
              {isVi ? "Viết & Nói" : "Write & Speak"}
            </h2>
            <p className="text-slate-500 font-bold text-[10px] truncate max-w-[200px]">{content.title}</p>
          </div>
        </div>
        
        <div className="flex bg-slate-200 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('write')}
            disabled={isRecording}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center transition-all ${activeTab === 'write' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Edit3 className="w-3 h-3 mr-1"/> {isVi ? "Viết" : "Write"}
          </button>
          <button 
            onClick={() => setActiveTab('record')}
            disabled={wordCount < 1 && !videoBlob} 
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center transition-all ${activeTab === 'record' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 disabled:opacity-50'}`}
          >
            <Video className="w-3 h-3 mr-1"/> {isVi ? "Quay" : "Record"}
          </button>
        </div>

        <button onClick={onToggleLang} className="px-2 py-1 bg-white rounded-lg text-[10px] font-bold border border-slate-200 shadow-sm">
          {isVi?'VI':'EN'}
        </button>
      </div>

      {/* --- TAB WRITE --- */}
      {activeTab === 'write' && (
        <div className="flex-1 overflow-y-auto p-4 animate-in fade-in slide-in-from-left-4 duration-300">
          <div className="flex-shrink-0 mb-3">
            {/* Phase indicator */}
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                writingPhase === 1 ? 'bg-blue-100 text-blue-600'
                : writingPhase === 2 ? 'bg-violet-100 text-violet-600'
                : 'bg-emerald-100 text-emerald-600'
              }`}>
                {writingPhase === 1 ? (isVi ? '📝 Câu khung (Phase 1)' : '📝 Sentence Frames (Phase 1)')
                 : writingPhase === 2 ? (isVi ? '📐 Dàn ý (Phase 2)' : '📐 Outline (Phase 2)')
                 : (isVi ? '✍️ Tự do (Phase 3)' : '✍️ Free Writing (Phase 3)')}
              </span>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-sm text-blue-800">
              <p className="font-bold uppercase text-[10px] text-blue-400 mb-1">{isVi ? "Gợi ý:" : "Prompt:"}</p>
              {isVi ? content.prompt_vi : content.prompt_en}
              {writingPhase === 1 && !content.sentence_frames?.length && (
                <p className="mt-1.5 text-[11px] text-blue-500 font-bold">{isVi ? '✏️ Hãy trả lời tất cả các câu hỏi gợi ý để viết thành 1 đoạn văn hoàn chỉnh!' : '✏️ Answer all the questions above to write one complete paragraph!'}</p>
              )}
              {writingPhase === 1 && content.sentence_frames?.length > 0 && (
                <p className="mt-1.5 text-[11px] text-indigo-500 font-bold">{isVi ? '✏️ Dùng khung câu bên dưới, rồi thêm câu của riêng bạn nha!' : '✏️ Use the frames below, then add your own sentences too!'}</p>
              )}
            </div>
          </div>

          {/* ── PHASE 1: Sentence Frames ── */}
          {writingPhase === 1 && content.sentence_frames?.length > 0 && (
            <div className="flex-shrink-0 mb-3 space-y-3">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                {isVi ? '📝 Điền vào khung câu:' : '📝 Fill in the sentence frames:'}
              </p>
              {content.sentence_frames.map((frame, fi) => {
                const parts = frame.template.split('___');
                const blankCount = parts.length - 1;
                const filledCount = Object.values(frameInputs[fi] || {}).filter(v => v.trim()).length;
                const allFilled = filledCount >= blankCount;
                
                return (
                  <div key={fi} className={`border rounded-xl p-4 transition-colors ${allFilled ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                      {parts.map((part, pi) => (
                        <React.Fragment key={pi}>
                          <span className="text-indigo-900">{part}</span>
                          {pi < parts.length - 1 && (
                            <div className="relative inline-flex items-center gap-1">
                              {/* Input with dynamic width based on content + keyboard support */}
                              <input
                                type="text"
                                value={frameInputs[fi]?.[pi] || ''}
                                onChange={e => setFrameInputs(prev => ({
                                  ...prev,
                                  [fi]: { ...(prev[fi] || {}), [pi]: e.target.value }
                                }))}
                                placeholder="..."
                                className="min-w-[120px] max-w-[300px] border-b-2 border-indigo-300 bg-white/80 px-2 py-1 outline-none text-indigo-700 font-bold placeholder:text-slate-300 rounded"
                                style={{ width: `${Math.max(120, (frameInputs[fi]?.[pi]?.length || 3) * 10)}px` }}
                                data-blank-key={`${fi}-${pi}`}
                                title={isVi ? 'Nhấn Ctrl+H để xem gợi ý' : 'Press Ctrl+H for hints'}
                              />
                              {/* Inline hint button */}
                              {content.hints?.vocabulary_bank?.words && (
                                <button
                                  onClick={() => {
                                    const key = `${fi}-${pi}`;
                                    if (activeBlankHint !== key) {
                                      // Track hint usage (only when opening, not closing)
                                      setHintUsageCount(prev => prev + 1);
                                    }
                                    setActiveBlankHint(activeBlankHint === key ? null : key);
                                  }}
                                  className={`hint-button flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                                    activeBlankHint === `${fi}-${pi}` 
                                      ? 'bg-amber-500 text-white shadow-lg scale-110' 
                                      : 'bg-amber-100 text-amber-600 hover:bg-amber-200 hover:scale-105'
                                  }`}
                                  title={isVi ? 'Gợi ý từ (Ctrl+H)' : 'Word hints (Ctrl+H)'}
                                >
                                  💡
                                </button>
                              )}
                              
                              {/* Inline hint popup with SMART FILTERING (CACHED) */}
                              {activeBlankHint === `${fi}-${pi}` && content.hints?.vocabulary_bank?.words && (() => {
                                const relevantWords = hintCache[`${fi}-${pi}`] || [];
                                return (
                                  <div ref={popupRef} className="absolute top-full left-0 mt-2 z-50 bg-white border-2 border-amber-300 rounded-xl shadow-2xl p-3 min-w-[280px] max-w-[400px]">
                                    <div className="flex items-center justify-between mb-2">
                                      <p className="text-[10px] font-black uppercase text-amber-600">
                                        {isVi ? '💡 Gợi ý từ cho ô này' : '💡 Hints for this blank'}
                                      </p>
                                      <button
                                        onClick={() => setActiveBlankHint(null)}
                                        className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                                        title={isVi ? 'Đóng (ESC)' : 'Close (ESC)'}
                                      >
                                        ✕
                                      </button>
                                    </div>
                                    <p className="text-[9px] text-orange-600 font-semibold mb-2 bg-orange-50 px-2 py-1 rounded">
                                      {isVi ? '⚠️ Tự gõ vào ô trên, không click được!' : '⚠️ Type manually, no clicking!'}
                                    </p>
                                    {/* Show relevant words for THIS BLANK only */}
                                    <div className="flex flex-wrap gap-1.5 max-h-[200px] overflow-y-auto">
                                      {relevantWords.length === 1 && relevantWords[0]?.word === '__creative__' ? (
                                        <div className="w-full text-center py-3">
                                          <p className="text-lg mb-1">✏️</p>
                                          <p className="text-xs font-semibold text-indigo-700">
                                            {isVi ? 'Tự sáng tạo nội dung của bạn!' : 'Write your own idea here!'}
                                          </p>
                                          <p className="text-[10px] text-slate-500 mt-1">
                                            {isVi ? 'Không có gợi ý — hãy dùng từ của chính bạn.' : 'No hints — use your own words.'}
                                          </p>
                                        </div>
                                      ) : relevantWords.length > 0 ? (
                                        relevantWords.map((w, i) => (
                                          <div
                                            key={i}
                                            className="px-2 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200"
                                          >
                                            {w.word}
                                            {isVi && w.vi && <div className="text-[9px] opacity-70">{w.vi}</div>}
                                          </div>
                                        ))
                                      ) : (
                                        <p className="text-xs text-slate-500 italic">
                                          {isVi ? 'Không có gợi ý cho ô này' : 'No hints for this blank'}
                                        </p>
                                      )}
                                    </div>
                                    {/* Smart hint count badge */}
                                    <div className="mt-2 pt-2 border-t border-amber-200">
                                      <p className="text-[9px] text-slate-500 text-center">
                                        {isVi 
                                          ? `Hiển thị ${relevantWords.length} từ phù hợp` 
                                          : `Showing ${relevantWords.length} relevant words`}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                );
              })}
              {(() => {
                const allFramesFilled = content.sentence_frames.every((frame, fi) => {
                  const blankCount = frame.template.split('___').length - 1;
                  const filled = Object.values(frameInputs[fi] || {}).filter(v => v.trim()).length;
                  return filled >= blankCount;
                });
                return (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        const sentences = content.sentence_frames.map((frame, fi) => {
                          const parts = frame.template.split('___');
                          return parts.map((p, pi) => p + (frameInputs[fi]?.[pi] || '')).join('').replace(/\s{2,}/g, ' ').trim();
                        }).filter(s => s.length > 0).join(' ');
                        // 🔥 REPLACE script (not append) — prevents stale old content showing up
                        setScript(sentences);
                      }}
                      disabled={!allFramesFilled}
                      className={`px-4 py-1.5 text-white text-xs font-bold rounded-lg transition-all ${allFramesFilled ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-300 cursor-not-allowed'}`}
                    >
                      {isVi ? '✓ Thêm vào kịch bản' : '✓ Add to script'}
                    </button>
                    {!allFramesFilled && (
                      <span className="text-[11px] text-slate-400 font-medium">
                        {isVi ? 'Điền hết các ô trước nhé' : 'Fill in all blanks first'}
                      </span>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* ── INFO: INLINE HINTS NOW AVAILABLE ── */}
          {writingPhase === 1 && content.hints?.vocabulary_bank && (
            <div className="flex-shrink-0 mb-3">
              <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                <p className="text-xs font-bold text-blue-800 flex items-center gap-2 mb-1">
                  <span className="text-lg">💡</span>
                  {isVi ? 'Gợi ý từ ngay bên cạnh mỗi ô!' : 'Hints available next to each blank!'}
                </p>
                <p className="text-[10px] text-blue-600 leading-relaxed mb-2">
                  {isVi 
                    ? 'Bấm nút 💡 bên cạnh mỗi ô để xem gợi ý từ. Nhớ TỰ GÕ vào ô nhé, không click được!'
                    : 'Click the 💡 button next to each blank for word hints. Remember to TYPE manually!'}
                </p>
                {/* Hint usage tracker - show encouragement + warning */}
                {hintUsageCount > 0 && (
                  <div className="flex flex-col gap-1">
                    <div className={`text-[10px] font-semibold px-2 py-1 rounded-md inline-flex items-center gap-1 ${
                      hintUsageCount <= 3 
                        ? 'bg-green-100 text-green-700' 
                        : hintUsageCount <= 8 
                        ? 'bg-amber-100 text-amber-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      <span>{hintUsageCount <= 3 ? '🎉' : hintUsageCount <= 8 ? '💪' : '📖'}</span>
                      <span>
                        {isVi 
                          ? `Đã dùng ${hintUsageCount} gợi ý${hintUsageCount <= 3 ? ' - Tuyệt vời!' : hintUsageCount <= 8 ? ' - Tốt lắm!' : ' - Cố gắng nhé!'}` 
                          : `Used ${hintUsageCount} hints${hintUsageCount <= 3 ? ' - Great!' : hintUsageCount <= 8 ? ' - Good job!' : ' - Keep trying!'}`}
                      </span>
                    </div>
                    <p className="text-[9px] text-orange-600 font-semibold flex items-center gap-1">
                      <span>⚠️</span>
                      <span>{isVi ? 'Bấm gợi ý nhiều quá sẽ bị trừ điểm' : 'Too many hint clicks will deduct your scores'}</span>
                    </p>
                  </div>
                )}
              </div>
              
              {/* 📖 MODEL SENTENCE - always visible as reference */}
              {content.model_sentence && (
                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <p className="text-[10px] font-black uppercase text-amber-700 mb-1 flex items-center gap-1">
                    <span>📖</span>
                    {isVi ? 'Bài mẫu tham khảo' : 'Model sentence for reference'}
                  </p>
                  <p className="text-[11px] text-amber-900 leading-relaxed italic">{content.model_sentence}</p>
                </div>
              )}
            </div>
          )}

          {/* ── TIER 2: MODEL PARAGRAPH (Hidden with Warning) ── */}
          {writingPhase === 1 && content.hints?.model_paragraph && (
            <div className="flex-shrink-0 mb-3">
              <button
                onClick={() => setShowModelParagraph(!showModelParagraph)}
                className="flex items-center gap-2 px-4 py-2 bg-violet-50 border border-violet-200 rounded-lg text-sm font-bold text-violet-700 hover:bg-violet-100 transition-all w-full justify-center"
              >
                <span>{showModelParagraph ? '🔼' : '📖'}</span>
                <span>{isVi ? content.hints.model_paragraph.label_vi : content.hints.model_paragraph.label_en}</span>
              </button>
              
              {showModelParagraph && (
                <div className="mt-3">
                  <div className="bg-orange-50 border border-orange-300 rounded-xl p-3 mb-3">
                    <p className="text-[11px] font-bold text-orange-700 flex items-center gap-2">
                      <span>⚠️</span>
                      <span>{isVi ? content.hints.model_paragraph.warning_vi : content.hints.model_paragraph.warning_en}</span>
                    </p>
                  </div>
                  <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
                    <p className="text-[10px] font-black uppercase text-violet-400 mb-2">
                      {isVi ? '📖 Bài mẫu tham khảo' : '📖 Example Paragraph'}
                    </p>
                    <p className="text-sm text-violet-900 leading-relaxed">{content.hints.model_paragraph.text}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── PHASE 2: Idea Blocks ── */}
          {writingPhase === 2 && (
            <div className="flex-shrink-0 mb-3 space-y-2">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                {isVi ? '📐 Lên dàn ý:' : '📐 Outline your ideas:'}
              </p>
              {[
                { key: 'opening', label: isVi ? '📌 Mở đầu (1 câu)' : '📌 Opening (1 sentence)', placeholder: 'I think / In my opinion / I believe...' },
                { key: 'main',    label: isVi ? '💡 Ý chính (1–2 câu)' : '💡 Main Idea (1–2 sentences)', placeholder: 'First... For example / Because...' },
                { key: 'ending',  label: isVi ? '🎯 Kết thúc (1 câu)' : '🎯 Ending (1 sentence)', placeholder: 'In conclusion / So I think...' },
              ].map(block => (
                <div key={block.key} className="bg-violet-50 border border-violet-100 rounded-xl p-2">
                  <p className="text-[10px] font-black text-violet-500 mb-1">{block.label}</p>
                  <input
                    type="text"
                    value={ideaBlocks[block.key]}
                    onChange={e => setIdeaBlocks(prev => ({ ...prev, [block.key]: e.target.value }))}
                    placeholder={block.placeholder}
                    className="w-full bg-transparent outline-none text-sm text-violet-900 font-medium placeholder:text-violet-300"
                  />
                </div>
              ))}
              <button
                onClick={() => {
                  const assembled = [ideaBlocks.opening, ideaBlocks.main, ideaBlocks.ending]
                    .filter(Boolean).join(' ');
                  if (assembled.trim()) setScript(assembled.trim());
                }}
                className="px-4 py-1.5 bg-violet-600 text-white text-xs font-bold rounded-lg hover:bg-violet-700 transition-all"
              >
                {isVi ? '✓ Ghép thành kịch bản' : '✓ Assemble into script'}
              </button>
            </div>
          )}

          <div className="relative group">
            <textarea 
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="w-full min-h-[160px] p-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-indigo-400 outline-none resize-none text-3xl leading-relaxed text-slate-700 placeholder:text-slate-300"
              placeholder={
                writingPhase === 1
                  ? (isVi ? 'Điền câu khung bên trên, hoặc viết thẳng vào đây...' : 'Fill frames above, or write directly here...')
                  : writingPhase === 2
                  ? (isVi ? 'Lên dàn ý bên trên rồi nhấn Ghép, hoặc viết thẳng vào đây...' : 'Use outline above then assemble, or write directly here...')
                  : (isVi ? 'Viết kịch bản của bạn...' : 'Write your script here...')
              }
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button
                onClick={handleSttToggle}
                title={isVi ? 'Nói để nhập văn bản (Chrome)' : 'Speak to type (Chrome)'}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  isSttListening
                    ? 'bg-red-100 border-red-300 text-red-600 animate-pulse'
                    : 'bg-white border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300'
                }`}
              >
                <Mic size={13} />
                {isSttListening && <span>{isVi ? 'Đang nghe...' : 'Listening...'}</span>}
              </button>
              <span className="text-xs font-bold text-slate-400 bg-white/80 px-2 py-1 rounded-lg border border-slate-100">
                {wordCount} words
              </span>
            </div>
          </div>
          <div className="mt-3 flex justify-between items-center gap-3">
            {/* 🆕 History toggle */}
            {writingHistory.length > 0 && (
              <button
                onClick={() => setShowHistory(h => !h)}
                className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-700 border border-slate-200 px-3 py-2 rounded-xl transition-all"
              >
                <History size={13} />
                {isVi ? 'Lịch sử' : 'History'}
                <ChevronDown size={12} className={`transition-transform ${showHistory ? 'rotate-180' : ''}`} />
              </button>
            )}
            <div className="flex items-center gap-3 ml-auto">
              {/* 🆕 Submit for rubric */}
              {wordCount >= 5 && (
                <button
                  onClick={handleSubmitWriting}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow transition-all flex items-center text-sm gap-1.5"
                >
                  <BarChart2 size={15} />
                  {isVi ? 'Chấm điểm' : 'Score Writing'}
                </button>
              )}
              <button 
                onClick={() => setActiveTab('record')}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all flex items-center text-sm"
              >
                {isVi ? "Quay phim" : "Record Video"} <ArrowRight className="ml-2 w-4 h-4"/>
              </button>
            </div>
          </div>

          {/* Model Answer — unlocks after student has written ≥ 8 words */}
          {content.model_sentence && wordCount >= 8 && (
            <details className="mt-3 group bg-green-50 p-3 rounded-xl border border-green-200 text-sm text-green-800 cursor-pointer">
              <summary className="font-bold list-none flex items-center gap-1 select-none text-xs">
                <CheckCircle className="w-3 h-3"/> {isVi ? "✨ Xem Bài Mẫu (so sánh với bài của em)" : "✨ View Model Answer (compare with yours)"}
              </summary>
              <div className="mt-2 pt-2 border-t border-green-200 italic leading-relaxed text-sm">"{content.model_sentence}"</div>
            </details>
          )}

          {/* 🆕 S2.2 — Writing History */}
          {showHistory && writingHistory.length > 0 && (
            <div className="mt-3 bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">
                {isVi ? 'Lịch sử nộp bài' : 'Submission History'}
              </p>
              {writingHistory.map((h, i) => (
                <div key={i} className="flex items-center justify-between bg-white border border-slate-100 rounded-xl px-3 py-2">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold">{h.date}</p>
                    <p className="text-xs text-slate-600 truncate max-w-[200px]">{h.text}…</p>
                  </div>
                  <span className={`text-xs font-black px-2 py-1 rounded-full ${
                    h.tier === 'excellent' ? 'bg-yellow-100 text-yellow-700'
                    : h.tier === 'good' ? 'bg-green-100 text-green-700'
                    : 'bg-slate-100 text-slate-500'
                  }`}>
                    {h.score}/{h.max}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 🆕 S2.2 — Rubric Result Card */}
          {rubricResult && (
            <>
            <div className="mt-4 bg-white border-2 border-emerald-200 rounded-3xl p-5 shadow-sm space-y-4">
              {/* Score header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart2 size={18} className="text-emerald-600" />
                  <span className="font-black text-emerald-800 uppercase text-sm">
                    {isVi ? 'Kết quả' : 'Writing Score'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {rubricResult.badge && (
                    <span className="flex items-center gap-1 text-xs font-black bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                      <Star size={12} className="fill-yellow-500 text-yellow-500" />
                      {rubricResult.badge}
                    </span>
                  )}
                  <span className={`text-2xl font-black ${
                    rubricResult.tier === 'excellent' ? 'text-yellow-600'
                    : rubricResult.tier === 'good' ? 'text-green-600'
                    : rubricResult.tier === 'needs_work' ? 'text-amber-600'
                    : 'text-rose-600'
                  }`}>
                    {rubricResult.total}<span className="text-sm text-slate-400">/{rubricResult.maxTotal}</span>
                  </span>
                </div>
              </div>

              {/* Dimensions */}
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(rubricResult.dimensions).map(([key, dim]) => {
                  const labels = { D1: '📋 Task', D2: '📚 Vocab', D3: '✏️ Grammar', D4: '🔗 Connectors' };
                  const colors = { 3: 'bg-green-100 text-green-700', 2: 'bg-amber-100 text-amber-700', 1: 'bg-rose-100 text-rose-700' };
                  return (
                    <div key={key} className={`rounded-xl p-3 ${colors[dim.score] || 'bg-slate-100'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-black uppercase">{labels[key]}</span>
                        <span className="font-black">{dim.score}/3{dim.isWarningOnly ? '*' : ''}</span>
                      </div>
                      <p className="text-[10px] leading-relaxed opacity-80">{dim.descriptor}</p>
                    </div>
                  );
                })}
              </div>

              {/* Best sentence */}
              {rubricResult.bestSentence && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3">
                  <p className="text-[10px] font-black uppercase text-indigo-400 mb-1">
                    ⭐ {isVi ? 'Câu hay nhất' : 'Best Sentence'}
                  </p>
                  <p className="text-sm font-bold text-indigo-800 italic">"{rubricResult.bestSentence}"</p>
                </div>
              )}

              {/* Feedback */}
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">
                  {isVi ? 'Nhận xét' : 'Feedback'}
                </p>
                <p className="text-sm text-slate-700 font-medium">{rubricResult.feedback}</p>
              </div>

              {/* Word count */}
              <p className="text-[10px] text-slate-400 font-bold text-right">
                {rubricResult.wordCount} {isVi ? 'từ' : 'words'}
                {rubricResult.dimensions.D4.isWarningOnly && (
                  <span className="ml-2 opacity-70">* D4 = {isVi ? 'cảnh báo (Phase 1)' : 'warning only (Phase 1)'}</span>
                )}
              </p>

              {/* Nova AI Feedback button */}
              <div className="pt-2 border-t border-emerald-100">
                {aiFeedbackUsed < AI_FEEDBACK_LIMIT ? (
                  <button
                    onClick={handleAiFeedback}
                    disabled={isAiFeedbackLoading}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white rounded-xl font-bold text-sm transition-all"
                  >
                    {isAiFeedbackLoading ? (
                      <><Loader2 size={15} className="animate-spin" /> {isVi ? 'Nova đang đọc bài...' : 'Nova is reading...'}</>
                    ) : (
                      <><Sparkles size={15} /> {isVi ? `Nova nhận xét (còn ${AI_FEEDBACK_LIMIT - aiFeedbackUsed} lần)` : `Nova Feedback (${AI_FEEDBACK_LIMIT - aiFeedbackUsed} left)`}</>
                    )}
                  </button>
                ) : (
                  <p className="text-center text-xs text-slate-400 font-bold py-1">
                    {isVi ? 'Nova đã nhận xét đủ 3 lần tuần này — bạn làm tốt lắm! 🌟' : "Nova's checked your writing 3 times this week — great effort! 🌟"}
                  </p>
                )}
              </div>
            </div>

            {/* Nova AI Feedback result */}
            {aiFeedback && (
              <div className="mt-3 bg-violet-50 border-2 border-violet-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-violet-600" />
                  <span className="text-xs font-black text-violet-700 uppercase tracking-wide">Nova nhận xét</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{aiFeedback}</p>
              </div>
            )}
            </>
          )}
        </div>
      )}

      {/* --- TAB RECORD --- */}
      {activeTab === 'record' && (
        <div className="flex-1 relative w-full h-full bg-black overflow-hidden group">
          
          {/* A. CAMERA LAYER */}
          <div className="absolute inset-0 z-0 flex items-center justify-center bg-black">
             {videoUrl ? (
                // PLAYBACK: Luôn dùng videoUrl và ref
                <video 
                    ref={videoRef}
                    key={videoUrl} 
                    src={videoUrl} 
                    className="w-full h-full object-contain bg-black" 
                    onEnded={handleVideoEnded}
                    playsInline
                />
             ) : (
                <video ref={videoRef} className="w-full h-full object-cover transform scale-x-[-1]" muted playsInline />
             )}
             
             {/* Loading State */}
             {!isCameraReady && !videoBlob && !videoUrl && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 text-white">
                    <Loader2 className="w-8 h-8 animate-spin mb-2"/>
                    <p className="text-xs font-bold uppercase">Camera Starting...</p>
                </div>
             )}

             {/* Countdown */}
             {countdown > 0 && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <span className="text-9xl font-black text-white animate-ping">{countdown}</span>
                </div>
             )}
          </div>

          {/* B. PROMPTER LAYER */}
          {!videoBlob && !videoUrl && isScriptVisible && (
            <div className="absolute top-0 left-0 right-0 z-20 h-1/4 bg-gradient-to-b from-black/90 to-transparent p-4 overflow-y-auto custom-scrollbar transition-all duration-300">
                <p className="text-yellow-400 text-4xl font-bold text-center drop-shadow-md leading-relaxed">
                    {script || "..."}
                </p>
            </div>
          )}

          {/* C. CONTROLS LAYER (Ghim đáy) */}
          <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black via-black/90 to-transparent pt-10 pb-4 px-6 flex items-end justify-between">
            
            {/* Left */}
            <div className="w-1/3 flex justify-start">
              {!videoBlob && !videoUrl && (
                <button 
                  onClick={() => setIsScriptVisible(!isScriptVisible)}
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-white text-xs font-bold transition-all border border-white/10"
                >
                  {isScriptVisible ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                  <span className="hidden sm:inline">{isVi ? "Kịch bản" : "Script"}</span>
                </button>
              )}
            </div>

            {/* Center: Record / Play Buttons */}
            <div className="w-1/3 flex flex-col items-center justify-end">
               
               {/* TIMER - NGAY TRÊN NÚT QUAY */}
               {isRecording && (
                  <div className="mb-3 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-xs flex items-center shadow-lg animate-pulse border border-white/20">
                      <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                      {formatTime(recordingTime)}
                  </div>
               )}

               {/* 1. Ready */}
               {!isRecording && !videoBlob && !videoUrl && (
                 <button 
                    onClick={handleStartSequence}
                    disabled={!isCameraReady}
                    className={`h-16 w-16 rounded-full border-4 border-white flex items-center justify-center shadow-lg transition-all ${!isCameraReady ? 'bg-gray-500 opacity-50' : 'bg-rose-600 hover:scale-110 hover:bg-rose-500'}`}
                 >
                    <div className="w-6 h-6 bg-white rounded-full"></div> 
                 </button>
               )}
               
               {/* 2. Recording */}
               {isRecording && (
                 <button onClick={handleStopRecording} className="h-16 w-16 bg-white rounded-full flex items-center justify-center border-4 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.8)]">
                    <div className="w-6 h-6 bg-rose-600 rounded-sm"></div>
                 </button>
               )}

               {/* 3. Playback Controls */}
               {(videoBlob || videoUrl) && (
                 <button 
                    onClick={togglePlayback}
                    className="h-16 w-16 bg-indigo-600 hover:bg-indigo-500 rounded-full border-4 border-white/20 shadow-lg flex items-center justify-center transform hover:scale-105 transition-all"
                 >
                    {isPlaying ? <Pause className="w-8 h-8 text-white fill-current"/> : <Play className="w-8 h-8 text-white fill-current ml-1"/>}
                 </button>
               )}
            </div>

            {/* Right: Actions */}
            <div className="w-1/3 flex justify-end gap-2">
               {!videoBlob && !isRecording && (
                 <button onClick={() => setActiveTab('write')} className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-white text-xs font-bold transition-all border border-white/10">
                    <Edit3 className="w-4 h-4"/>
                    <span className="hidden sm:inline">{isVi?"Sửa":"Edit"}</span>
                 </button>
               )}

               {(videoBlob || videoUrl) && (
                 <>
                    <button onClick={() => { setVideoBlob(null); setVideoUrl(null); setCountdown(0); }} className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 border border-white/10">
                        <RotateCcw className="w-5 h-5"/>
                    </button>
                    <button onClick={handleDownload} className="p-3 bg-green-600 rounded-full text-white hover:bg-green-500 shadow-lg">
                        <Download className="w-5 h-5"/>
                    </button>
                 </>
               )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default VideoChallenge;
