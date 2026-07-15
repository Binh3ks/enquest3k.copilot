/**
 * TellYourStory.jsx — Speaking + Viva Voce tab (W16+).
 *
 * Scenario A (W16-W35): student has written a story in StoryWriting tab.
 *   They read it aloud. AI listens (Deepgram STT) + asks 1 verification
 *   question to confirm authorship, then student answers and AI verifies.
 * Scenario B (W36+): student chooses a topic and speaks freely.
 *
 * Saves progress under stationId 'speaking_test' via useStationProgress.
 * Unlocks 'storyteller_mic' badge on pass.
 *
 * Implementation: see plan /Users/binhnguyen/.claude/plans/refactored-bubbling-comet.md
 */

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Mic, MicOff, Loader2, CheckCircle, XCircle, Edit3, Sparkles, Play, ArrowRight, Volume2 } from 'lucide-react';
import Confetti from 'react-confetti';
import { useStationProgress } from '../../hooks/useStationProgress';
import { useUserStore } from '../../stores/useUserStore';
import { recordAudio, isRecordingSupported } from '../../utils/audioRecorder';
import { sendToAI } from '../../services/ai_tutor/aiRouter';
import { speakText } from '../../utils/AudioHelper';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').replace(/\/api$/, '');

const TellYourStory = ({ content, themeColor, isVi, onToggleLang, onReportProgress, onGoToWriting }) => {
  const { weekId } = useParams();
  const currentWeek = parseInt(weekId);
  const pictureMode = content?.story_prompts?.picture_mode;
  const topicMode = content?.story_prompts?.topic_mode;

  // Reading progress from StoryWriting (stationId 'story_writing') — same data, not separate
  // We don't need to use useUserStore directly; we can pull savedData via the stationId
  const { savedData: storySaved } = useStationProgress(currentWeek, 'story_writing');
  const { savedData: speakSaved, saveProgress, markComplete } = useStationProgress(currentWeek, 'speaking_test');

  const writingText = storySaved?.text || '';
  const hasWriting = writingText && writingText.length > 20;
  const hasTopicMode = !!topicMode;

  // Mode selection: 'A' (write first then speak) | 'B' (speak freely on topic)
  // For W16-W35: only A. For W36+: both.
  const [selectedMode, setSelectedMode] = useState(speakSaved?.scenario || (hasTopicMode ? 'A' : 'A'));

  // Scenario A state
  const [phase, setPhase] = useState(speakSaved?.phase || 'idle'); // idle | recording_story | analyzing_story | asking_question | recording_answer | verifying | done
  const [storyTranscript, setStoryTranscript] = useState(speakSaved?.storyTranscript || '');
  const [pronunciationScore, setPronunciationScore] = useState(speakSaved?.pronunciationScore || null);
  const [verificationQuestion, setVerificationQuestion] = useState(speakSaved?.question || '');
  const [expectedAnswerHint, setExpectedAnswerHint] = useState(speakSaved?.expectedHint || '');
  const [answerTranscript, setAnswerTranscript] = useState(speakSaved?.answerTranscript || '');
  const [verified, setVerified] = useState(speakSaved?.verified || null);
  const [wpm, setWpm] = useState(speakSaved?.wpm || null);

  // Scenario B state
  const [selectedTopicId, setSelectedTopicId] = useState(speakSaved?.topicId || null);
  const [topicTranscript, setTopicTranscript] = useState(speakSaved?.topicTranscript || '');
  const [topicContentScore, setTopicContentScore] = useState(speakSaved?.topicContentScore || null);

  // Topic chosen for mode B
  const selectedTopic = topicMode?.topics?.find(t => t.id === selectedTopicId);

  // Auto-save progress
  useEffect(() => {
    const payload = {
      scenario: selectedMode,
      phase,
      storyTranscript,
      pronunciationScore,
      question: verificationQuestion,
      expectedHint: expectedAnswerHint,
      answerTranscript,
      verified,
      wpm,
      topicId: selectedTopicId,
      topicTranscript,
      topicContentScore,
    };
    const isComplete = (verified === true) || (topicContentScore && topicContentScore >= 2);
    const percent = isComplete ? 100 : (phase === 'done' ? 50 : 0);
    saveProgress(payload, isComplete, percent);
    if (onReportProgress) onReportProgress(percent);
  }, [phase, storyTranscript, pronunciationScore, verificationQuestion, answerTranscript, verified, wpm, selectedMode, selectedTopicId, topicTranscript, topicContentScore]);

  // ── Mode selector (W36+ only) ──
  if (hasTopicMode && !selectedMode) {
    return (
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-black text-slate-800 uppercase">
          {isVi ? 'Chọn kiểu nói' : 'Choose how to speak'}
        </h2>
        <button
          onClick={() => setSelectedMode('A')}
          className="w-full text-left p-4 bg-gradient-to-r from-indigo-50 to-violet-50 border-2 border-indigo-200 rounded-2xl"
        >
          <p className="font-black text-slate-800 mb-1">Scenario A — {isVi ? 'Viết trước, nói lại' : 'Write first, then speak'}</p>
          <p className="text-xs text-slate-600">{isVi ? 'Bạn viết bài, sau đó đọc lại bài của mình' : 'Write a story, then read it aloud'}</p>
        </button>
        <button
          onClick={() => setSelectedMode('B')}
          className="w-full text-left p-4 bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-200 rounded-2xl"
        >
          <p className="font-black text-slate-800 mb-1">Scenario B — {isVi ? 'Nói tự do' : 'Speak freely'}</p>
          <p className="text-xs text-slate-600">{isVi ? 'Chọn chủ đề và nói 30-60 giây' : 'Pick a topic and speak for 30-60s'}</p>
        </button>
      </div>
    );
  }

  // ── Main render — choose A or B ──
  if (selectedMode === 'A' || !hasTopicMode) {
    return (
      <ScenarioA
        writingText={writingText}
        hasWriting={hasWriting}
        onGoToWriting={onGoToWriting}
        isVi={isVi}
        currentWeek={currentWeek}
        phase={phase} setPhase={setPhase}
        storyTranscript={storyTranscript} setStoryTranscript={setStoryTranscript}
        pronunciationScore={pronunciationScore} setPronunciationScore={setPronunciationScore}
        verificationQuestion={verificationQuestion} setVerificationQuestion={setVerificationQuestion}
        expectedAnswerHint={expectedAnswerHint} setExpectedAnswerHint={setExpectedAnswerHint}
        answerTranscript={answerTranscript} setAnswerTranscript={setAnswerTranscript}
        verified={verified} setVerified={setVerified}
        wpm={wpm} setWpm={setWpm}
      />
    );
  }
  return (
    <ScenarioB
      topicMode={topicMode}
      selectedTopicId={selectedTopicId} setSelectedTopicId={setSelectedTopicId}
      selectedTopic={selectedTopic}
      isVi={isVi}
      currentWeek={currentWeek}
      topicTranscript={topicTranscript} setTopicTranscript={setTopicTranscript}
      topicContentScore={topicContentScore} setTopicContentScore={setTopicContentScore}
      pronunciationScore={pronunciationScore} setPronunciationScore={setPronunciationScore}
    />
  );
};

// ─────────────────────────────────────────────────────────────
// Scenario A: Write first, then read aloud + Viva Voce
// ─────────────────────────────────────────────────────────────

const ScenarioA = ({
  writingText, hasWriting, onGoToWriting, isVi, currentWeek,
  phase, setPhase,
  storyTranscript, setStoryTranscript,
  pronunciationScore, setPronunciationScore,
  verificationQuestion, setVerificationQuestion,
  expectedAnswerHint, setExpectedAnswerHint,
  answerTranscript, setAnswerTranscript,
  verified, setVerified,
  wpm, setWpm,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const recordingStartRef = useRef(0);

  const startStoryRecording = async () => {
    if (!isRecordingSupported()) {
      setError(isVi ? 'Trình duyệt không hỗ trợ ghi âm' : 'Browser does not support recording');
      return;
    }
    setError(null);
    setIsRecording(true);
    setPhase('recording_story');
    recordingStartRef.current = Date.now();
    try {
      const blob = await recordAudio(30000); // 30s max
      const duration = (Date.now() - recordingStartRef.current) / 1000;
      await analyzeStoryRecording(blob, duration);
    } catch (e) {
      setError(e.message || 'Recording failed');
      setPhase('idle');
    } finally {
      setIsRecording(false);
    }
  };

  const analyzeStoryRecording = async (audioBlob, durationSec) => {
    setIsProcessing(true);
    setPhase('analyzing_story');
    try {
      // 1. Send to Deepgram
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      formData.append('targetText', writingText);
      const response = await fetch(`${API_BASE_URL}/pronunciation/evaluate-deepgram`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error(`Deepgram HTTP ${response.status}`);
      const data = await response.json();
      const transcript = data.transcript || '';
      const score = data.evaluation?.score || 0;
      setStoryTranscript(transcript);
      setPronunciationScore(score);
      setWpm(durationSec > 0 ? Math.round((transcript.split(/\s+/).filter(Boolean).length / durationSec) * 60) : 0);

      // 2. AI asks verification question
      setPhase('asking_question');
      const askResult = await sendToAI({
        systemPrompt: `You are Nova, an English teacher. A student has written a story. You must ask ONE short, simple comprehension question to verify they actually wrote it (not pasted from somewhere else). The question should reference a SPECIFIC detail from the story. Return JSON: { "question": "...", "expectedHint": "what the answer should contain" }. Keep the question under 15 words.`,
        chatHistory: [{ role: 'user', content: `Student's story: "${writingText}"` }],
        userMessage: 'Ask me one question about my story.',
        weekId: currentWeek,
        skipGrammarGuard: true,
      });
      const parsed = parseAIJson(askResult?.ai_response || askResult);
      setVerificationQuestion(parsed.question || 'What happened in your story?');
      setExpectedAnswerHint(parsed.expectedHint || '');
      setPhase('awaiting_answer');
    } catch (e) {
      setError(e.message);
      setPhase('idle');
    } finally {
      setIsProcessing(false);
    }
  };

  const startAnswerRecording = async () => {
    setIsRecording(true);
    setPhase('recording_answer');
    try {
      const blob = await recordAudio(15000); // 15s max for answer
      await analyzeAnswer(blob);
    } catch (e) {
      setError(e.message);
      setPhase('awaiting_answer');
    } finally {
      setIsRecording(false);
    }
  };

  const analyzeAnswer = async (audioBlob) => {
    setIsProcessing(true);
    setPhase('verifying');
    try {
      // 1. Deepgram for answer transcript
      const formData = new FormData();
      formData.append('audio', audioBlob, 'answer.webm');
      formData.append('targetText', expectedAnswerHint);
      const response = await fetch(`${API_BASE_URL}/pronunciation/evaluate-deepgram`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error(`Deepgram HTTP ${response.status}`);
      const data = await response.json();
      const transcript = data.transcript || '';
      setAnswerTranscript(transcript);

      // 2. AI verifies answer
      const verifyResult = await sendToAI({
        systemPrompt: `You are Nova. A student was asked a verification question about a story they wrote. The expected hint is given. Determine if the student's answer matches the expected content. Return JSON: { "verified": true|false, "feedback": "short feedback in English" }. Be lenient: accept any answer that mentions the right concept, even if worded differently.`,
        chatHistory: [
          { role: 'assistant', content: verificationQuestion },
          { role: 'user', content: transcript },
        ],
        userMessage: `Expected answer hint: "${expectedAnswerHint}". Does the student's answer match?`,
        weekId: currentWeek,
        skipGrammarGuard: true,
      });
      const parsed = parseAIJson(verifyResult?.ai_response || verifyResult);
      setVerified(parsed.verified === true);
      setPhase('done');
    } catch (e) {
      setError(e.message);
      setPhase('awaiting_answer');
    } finally {
      setIsProcessing(false);
    }
  };

  const playQuestion = () => {
    if (verificationQuestion) speakText(verificationQuestion, null, 1.0, null, 'story_teller', currentWeek);
  };

  const passed = verified === true && pronunciationScore >= 60;

  return (
    <div className="flex flex-col h-full overflow-hidden p-3">
      {passed && <Confetti recycle={false} numberOfPieces={150} />}

      {/* Writing display */}
      <div className="flex-shrink-0 bg-indigo-50 border border-indigo-200 rounded-2xl p-3 mb-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] font-black uppercase text-indigo-600">
            {isVi ? '📖 Bài viết của em' : '📖 Your story'}
          </p>
          {onGoToWriting && (
            <button onClick={onGoToWriting} className="text-[10px] text-indigo-600 underline flex items-center gap-1">
              <Edit3 className="w-3 h-3" />
              {isVi ? 'Sửa' : 'Edit'}
            </button>
          )}
        </div>
        {hasWriting ? (
          <p className="text-sm text-slate-700 leading-relaxed italic max-h-32 overflow-y-auto">"{writingText}"</p>
        ) : (
          <div className="py-2">
            <p className="text-xs text-rose-500 italic mb-2">
              {isVi ? 'Bạn chưa viết bài. Vui lòng quay lại tab Story Writing.' : 'No story yet. Please go back to Story Writing first.'}
            </p>
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3">
              <p className="text-[10px] font-black uppercase text-indigo-600 mb-1.5">
                {isVi ? '📋 Cách hoạt động' : '📋 How it works'}
              </p>
              <ol className="text-[10px] text-indigo-800 space-y-1 list-decimal pl-4">
                <li>{isVi ? 'Viết câu chuyện trong tab Story Writing' : 'Write your story in the Story Writing tab'}</li>
                <li>{isVi ? 'Quay lại đây và bấm Micro để đọc bài' : 'Come back here and tap the Mic to read aloud'}</li>
                <li>{isVi ? 'Nova sẽ nghe và đặt 1 câu hỏi xác nhận' : 'Nova listens and asks 1 verification question'}</li>
                <li>{isVi ? 'Trả lời câu hỏi để hoàn thành!' : 'Answer the question to finish!'}</li>
              </ol>
              {onGoToWriting && (
                <button
                  onClick={onGoToWriting}
                  className="mt-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold rounded-lg flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  {isVi ? 'Đi viết bài' : 'Go to Story Writing'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Recording area */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-2 text-xs text-rose-700">
            ⚠️ {error}
          </div>
        )}

        {/* Phase 1: Record story */}
        {(phase === 'idle' || phase === 'recording_story') && (
          <div className="text-center">
            <button
              onClick={startStoryRecording}
              disabled={!hasWriting || isRecording || isProcessing}
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all ${
                !hasWriting ? 'bg-slate-300' :
                isRecording ? 'bg-rose-500 animate-pulse' : 'bg-rose-600 hover:bg-rose-500 hover:scale-105'
              } text-white shadow-lg`}
            >
              <Mic className="w-8 h-8" />
            </button>
            <p className="text-xs text-slate-600 font-bold mt-2">
              {isVi ? 'Bấm để đọc lại bài của em' : 'Tap to read your story aloud'}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              {isVi ? 'Tối đa 30 giây' : 'Up to 30 seconds'}
            </p>
          </div>
        )}

        {/* Phase 2: Analyzing */}
        {phase === 'analyzing_story' && (
          <div className="text-center py-6">
            <Loader2 className="w-10 h-10 animate-spin mx-auto text-indigo-500" />
            <p className="text-xs text-slate-600 mt-2">{isVi ? 'Đang nghe...' : 'Listening to your story...'}</p>
          </div>
        )}

        {/* Phase 3: Ask question */}
        {phase === 'asking_question' && (
          <div className="text-center py-6">
            <Loader2 className="w-10 h-10 animate-spin mx-auto text-indigo-500" />
            <p className="text-xs text-slate-600 mt-2">{isVi ? 'Nova đang đặt câu hỏi...' : 'Nova is asking a question...'}</p>
          </div>
        )}

        {/* Phase 4: Awaiting answer */}
        {(phase === 'awaiting_answer' || phase === 'recording_answer') && (
          <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl p-4">
            <p className="text-[10px] font-black uppercase text-violet-600 mb-2">
              {isVi ? '🤔 Nova hỏi:' : '🤔 Nova asks:'}
            </p>
            <div className="flex items-start gap-2 mb-3">
              <p className="text-sm font-bold text-slate-800 flex-1">"{verificationQuestion}"</p>
              <button onClick={playQuestion} className="p-1.5 bg-violet-200 hover:bg-violet-300 rounded-full text-violet-700">
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center">
              <button
                onClick={startAnswerRecording}
                disabled={isRecording || isProcessing}
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-all ${
                  isRecording ? 'bg-rose-500 animate-pulse' : 'bg-rose-600 hover:bg-rose-500'
                } text-white shadow-lg`}
              >
                {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : <Mic className="w-6 h-6" />}
              </button>
              <p className="text-[10px] text-slate-500 mt-1">
                {isVi ? 'Bấm để trả lời' : 'Tap to answer'}
              </p>
            </div>
          </div>
        )}

        {/* Phase 5: Verifying */}
        {phase === 'verifying' && (
          <div className="text-center py-6">
            <Loader2 className="w-10 h-10 animate-spin mx-auto text-indigo-500" />
            <p className="text-xs text-slate-600 mt-2">{isVi ? 'Đang kiểm tra câu trả lời...' : 'Checking your answer...'}</p>
          </div>
        )}

        {/* Phase 6: Done */}
        {phase === 'done' && (
          <div className={`rounded-2xl p-4 border-2 ${passed ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              {passed ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-rose-600" />}
              <p className="font-black text-sm">
                {passed ? (isVi ? '🎉 Tuyệt vời! Bạn đã kể chuyện thành công!' : '🎉 Excellent! You told your story!') :
                          (isVi ? 'Thử lại nhé!' : 'Try again!')}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="bg-white rounded-lg p-2 text-center">
                <p className="text-[9px] text-slate-500 uppercase font-bold">Pronunciation</p>
                <p className="text-base font-black text-indigo-700">{pronunciationScore || 0}</p>
              </div>
              <div className="bg-white rounded-lg p-2 text-center">
                <p className="text-[9px] text-slate-500 uppercase font-bold">Verified</p>
                <p className="text-base font-black text-indigo-700">{verified ? '✅' : '❌'}</p>
              </div>
              <div className="bg-white rounded-lg p-2 text-center">
                <p className="text-[9px] text-slate-500 uppercase font-bold">WPM</p>
                <p className="text-base font-black text-indigo-700">{wpm || '-'}</p>
              </div>
            </div>
            {passed && (
              <p className="text-center text-[10px] text-emerald-700 font-black mt-2">
                🎤 Unlocked Storyteller card!
              </p>
            )}
            <button
              onClick={() => { setPhase('idle'); setStoryTranscript(''); setVerificationQuestion(''); setAnswerTranscript(''); setVerified(null); }}
              className="w-full mt-3 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg"
            >
              {isVi ? 'Thử lại' : 'Try again'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Scenario B: Free speaking on a topic (W36+)
// ─────────────────────────────────────────────────────────────

const ScenarioB = ({ topicMode, selectedTopicId, setSelectedTopicId, selectedTopic, isVi, currentWeek, topicTranscript, setTopicTranscript, topicContentScore, setTopicContentScore, pronunciationScore, setPronunciationScore }) => {
  const [phase, setPhase] = useState('idle');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [wpm, setWpm] = useState(null);

  // Topic picker
  if (!selectedTopicId) {
    return (
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-black text-slate-800 uppercase">
          {isVi ? 'Chọn chủ đề để nói' : 'Choose a topic to speak about'}
        </h2>
        {topicMode.topics.map(topic => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopicId(topic.id)}
            className="w-full text-left p-4 bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-200 rounded-2xl"
          >
            <p className="font-black text-slate-800 mb-1">{topic.title_en}</p>
            <p className="text-xs text-slate-600">{isVi ? topic.vi : topic.en}</p>
          </button>
        ))}
      </div>
    );
  }

  const startRecording = async () => {
    setIsRecording(true);
    setPhase('recording');
    const startTime = Date.now();
    try {
      const blob = await recordAudio(60000); // 60s max
      const duration = (Date.now() - startTime) / 1000;
      setIsProcessing(true);
      setPhase('analyzing');
      // Deepgram
      const formData = new FormData();
      formData.append('audio', blob, 'topic.webm');
      formData.append('targetText', (selectedTopic.word_bank || []).join(' '));
      const response = await fetch(`${API_BASE_URL}/pronunciation/evaluate-deepgram`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      const transcript = data.transcript || '';
      setTopicTranscript(transcript);
      setPronunciationScore(data.evaluation?.score || 0);
      setWpm(duration > 0 ? Math.round((transcript.split(/\s+/).filter(Boolean).length / duration) * 60) : 0);

      // AI content evaluation
      const evalResult = await sendToAI({
        systemPrompt: `You are an English teacher. A student spoke about this topic. Evaluate content relevance 0-3 and grammar 0-3. Topic: "${selectedTopic.title_en}". Return JSON: { "contentScore": 1-3, "grammarScore": 1-3, "feedback": "short feedback" }.`,
        chatHistory: [],
        userMessage: `Student transcript: "${transcript}". Topic: ${selectedTopic.en || selectedTopic.title_en}`,
        weekId: currentWeek,
        skipGrammarGuard: true,
      });
      const parsed = parseAIJson(evalResult?.ai_response || evalResult);
      setTopicContentScore(parsed.contentScore || 0);
      setPhase('done');
    } catch (e) {
      setPhase('idle');
    } finally {
      setIsRecording(false);
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden p-3">
      <div className="flex-shrink-0 bg-rose-50 border border-rose-200 rounded-2xl p-3 mb-3">
        <p className="text-[10px] font-black uppercase text-rose-600 mb-1">{isVi ? 'Chủ đề' : 'Topic'}</p>
        <p className="text-sm font-black text-rose-900 mb-1">{selectedTopic.title_en}</p>
        <p className="text-xs text-rose-800">{isVi ? selectedTopic.vi : selectedTopic.en}</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {(phase === 'idle' || phase === 'recording') && (
          <div className="text-center">
            <button
              onClick={startRecording}
              disabled={isRecording || isProcessing}
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
                isRecording ? 'bg-rose-500 animate-pulse' : 'bg-rose-600 hover:bg-rose-500 hover:scale-105'
              } text-white shadow-lg`}
            >
              {isProcessing ? <Loader2 className="w-8 h-8 animate-spin" /> : <Mic className="w-8 h-8" />}
            </button>
            <p className="text-xs text-slate-600 font-bold mt-2">
              {isVi ? 'Bấm để nói về chủ đề này' : 'Tap to speak about this topic'}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              {isVi ? '30-60 giây' : '30-60 seconds'}
            </p>
          </div>
        )}

        {phase === 'analyzing' && (
          <div className="text-center py-6">
            <Loader2 className="w-10 h-10 animate-spin mx-auto text-rose-500" />
            <p className="text-xs text-slate-600 mt-2">{isVi ? 'Đang chấm điểm...' : 'Scoring your speech...'}</p>
          </div>
        )}

        {phase === 'done' && (
          <div className={`rounded-2xl p-4 border-2 ${
            topicContentScore >= 2 ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
          }`}>
            <p className="font-black text-sm mb-2">
              {topicContentScore >= 2 ? (isVi ? '🎉 Tốt lắm!' : '🎉 Great job!') : (isVi ? 'Cố gắng thêm!' : 'Keep trying!')}
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white rounded-lg p-2 text-center">
                <p className="text-[9px] text-slate-500 uppercase font-bold">Pron</p>
                <p className="text-base font-black text-rose-700">{pronunciationScore || 0}</p>
              </div>
              <div className="bg-white rounded-lg p-2 text-center">
                <p className="text-[9px] text-slate-500 uppercase font-bold">Content</p>
                <p className="text-base font-black text-rose-700">{topicContentScore || 0}/3</p>
              </div>
              <div className="bg-white rounded-lg p-2 text-center">
                <p className="text-[9px] text-slate-500 uppercase font-bold">WPM</p>
                <p className="text-base font-black text-rose-700">{wpm || '-'}</p>
              </div>
            </div>
            {topicTranscript && (
              <details className="mt-2 text-[10px] text-slate-600">
                <summary className="cursor-pointer font-bold">{isVi ? 'Xem transcript' : 'View transcript'}</summary>
                <p className="mt-1 italic">"{topicTranscript}"</p>
              </details>
            )}
            <button
              onClick={() => setPhase('idle')}
              className="w-full mt-3 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg"
            >
              {isVi ? 'Thử lại' : 'Try again'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper: parse AI JSON response (may be wrapped in markdown or have extra text)
function parseAIJson(raw) {
  if (!raw) return {};
  if (typeof raw === 'object') return raw;
  if (typeof raw !== 'string') return {};
  // Try direct parse
  try { return JSON.parse(raw); } catch {}
  // Try extracting JSON block
  const m = raw.match(/\{[\s\S]*\}/);
  if (m) {
    try { return JSON.parse(m[0]); } catch {}
  }
  return {};
}

export default TellYourStory;
