import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Mic, MicOff, CheckCircle2, Sparkles, MessageSquare, Play, HelpCircle } from 'lucide-react';
import VoiceService from '../../services/voiceService';
import CompletionModal from '../common/CompletionModal';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { useUserStore } from '../../stores/useUserStore';

export function PersonalQuestionsCompleter({ customData, data: propData, onComplete }) {
  const activeData = customData || propData || {};
  const [answers, setAnswers] = useState({});
  const [activeRecordingId, setActiveRecordingId] = useState(null);
  const [showHints, setShowHints] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const recognitionRef = useRef(null);

  const examinerIntro = activeData?.examiner_intro || "Now let's talk about you. Please listen to each question and answer clearly.";
  
  const questions = activeData?.questions || [
    { id: "q1", question: "What's your favorite subject at school?", topic: "school", sample_answer_hint: "My favorite subject is English because I love stories." },
    { id: "q2", question: "What do you usually do on your birthday?", topic: "birthday", sample_answer_hint: "I usually have a party with my family and eat cake." },
    { id: "q3", question: "Tell me about your family.", topic: "family", sample_answer_hint: "There are four people in my family: my parents, my brother, and me." },
    { id: "q4", question: "What did you do last holiday?", topic: "holidays", sample_answer_hint: "Last holiday, I visited the beach with my cousins." }
  ];

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (_) {}
      }
    };
  }, []);

  const handlePlayIntro = () => {
    VoiceService.speak(examinerIntro);
  };

  const handlePlayQuestion = (text) => {
    VoiceService.speak(text);
  };

  const handleTextChange = (id, value) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const toggleRecording = (id) => {
    if (activeRecordingId === id) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (_) {}
      }
      setActiveRecordingId(null);
      return;
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      return;
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (_) {}
      }
      const rec = new SpeechRec();
      rec.lang = 'en-US';
      rec.continuous = false;
      rec.interimResults = false;

      rec.onstart = () => setActiveRecordingId(id);
      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setAnswers(prev => ({ ...prev, [id]: transcript }));
        setActiveRecordingId(null);
      };
      rec.onerror = () => setActiveRecordingId(null);
      rec.onend = () => setActiveRecordingId(null);

      recognitionRef.current = rec;
      rec.start();
    } catch (_) {
      setActiveRecordingId(null);
    }
  };

  const answeredCount = questions.filter(q => (answers[q.id] || '').trim().length > 0).length;
  const isAllAnswered = answeredCount === questions.length;

  const handleSubmit = () => {
    const finalScore = Math.min(100, Math.round((answeredCount / questions.length) * 100));
    setScore(finalScore);
    setIsSubmitted(true);

    if (finalScore >= 75) {
      fireCelebrationConfetti('Personal_Questions_Complete');
    }

    if (onComplete) onComplete(finalScore);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-1 sm:my-2 p-3 sm:p-5 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-md font-sans space-y-3 sm:space-y-3.5">
      <CompletionModal
        isOpen={isSubmitted && (score || 0) >= 50}
        onClose={() => {}}
        score={score || 0}
        maxScore={100}
        stars={(score || 0) >= 80 ? 3 : (score || 0) >= 60 ? 2 : 1}
        title="Speaking Part 4 Complete!"
        subtitle="You answered all personal questions with confidence!"
        customStat={`${answeredCount}/${questions.length} Answered`}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 border-b border-slate-200 gap-1.5">
        <div>
          <span className="px-2.5 py-0.5 bg-violet-100 text-violet-900 text-[10.5px] font-black rounded-full uppercase tracking-wider">
            Flyers Practice
          </span>
          <h2 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
            Personal Questions
          </h2>
          <p className="text-[11px] sm:text-xs text-violet-700 font-bold">
            Answer the examiner's questions about your life, hobbies, and family.
          </p>
        </div>
        <button
          onClick={handlePlayIntro}
          className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-black rounded-xl shadow-sm flex items-center gap-1.5 transition"
        >
          <Volume2 className="w-3.5 h-3.5" />
          Examiner Intro
        </button>
      </div>

      {/* Examiner Intro Banner */}
      <div className="p-2 sm:p-3 bg-violet-50 rounded-xl border border-violet-200 flex items-start gap-2">
        <MessageSquare className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-violet-900 font-medium leading-relaxed">
          &ldquo;{examinerIntro}&rdquo;
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-2 sm:space-y-2.5">
        {questions.map((q, idx) => {
          const isRecordingThis = activeRecordingId === q.id;
          const currentAnswer = answers[q.id] || '';
          const hasAnswer = currentAnswer.trim().length > 0;

          return (
            <div
              key={q.id}
              className={`p-2.5 sm:p-3.5 rounded-xl border-2 transition ${
                hasAnswer ? 'bg-emerald-50/40 border-emerald-300' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-[11px] font-black flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Topic: {q.topic || 'General'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handlePlayQuestion(q.question)}
                    className="p-1.5 bg-slate-100 hover:bg-violet-100 text-slate-700 hover:text-violet-700 rounded-lg transition"
                    title="Listen to question"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  {q.sample_answer_hint && (
                    <button
                      onClick={() => setShowHints(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                      className="text-[11px] font-bold text-slate-500 hover:text-violet-600 flex items-center gap-0.5"
                    >
                      <HelpCircle className="w-3 h-3" />
                      {showHints[q.id] ? 'Hide' : 'Hint'}
                    </button>
                  )}
                </div>
              </div>

              <div className="text-sm sm:text-base font-black text-slate-900 mb-2">
                {q.question}
              </div>

              {showHints[q.id] && q.sample_answer_hint && (
                <div className="mb-2 p-2 sm:p-2.5 bg-amber-50 rounded-lg sm:rounded-xl border border-amber-200 text-[11px] sm:text-xs text-amber-900 italic">
                  💡 Hint: &ldquo;{q.sample_answer_hint}&rdquo;
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={currentAnswer}
                  onChange={(e) => handleTextChange(q.id, e.target.value)}
                  disabled={isSubmitted}
                  placeholder="Type your spoken answer here..."
                  className="flex-1 px-4 py-2.5 bg-white rounded-xl border border-slate-300 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-60"
                />
                <button
                  onClick={() => toggleRecording(q.id)}
                  disabled={isSubmitted}
                  className={`p-2.5 rounded-xl font-bold transition flex items-center justify-center ${
                    isRecordingThis
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-violet-100 hover:bg-violet-200 text-violet-700'
                  }`}
                  title={isRecordingThis ? 'Stop recording' : 'Record your voice'}
                >
                  {isRecordingThis ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2.5 border-t border-slate-200">
        <div className="text-xs font-bold text-slate-600">
          Progress: {answeredCount}/{questions.length} answered
        </div>
        <button
          onClick={handleSubmit}
          disabled={!isAllAnswered || isSubmitted}
          className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition shadow-md ${
            isAllAnswered && !isSubmitted
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white cursor-pointer shadow-violet-200'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          {isSubmitted ? 'Submitted' : 'Submit Speaking Answers'}
        </button>
      </div>
    </div>
  );
}

export default PersonalQuestionsCompleter;
