import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles, Send, CheckCircle2, MessageSquare, RefreshCw, Trophy, HelpCircle, User } from 'lucide-react';
import VoiceService from '../../services/voiceService';

/**
 * Speech Recognition Accuracy Evaluator
 */
const evaluateSpeechInput = (spokenText, acceptableList) => {
  if (!spokenText || !acceptableList || acceptableList.length === 0) {
    return { isCorrect: false, score: 0 };
  }
  const cleanSpoken = spokenText.toLowerCase().replace(/[^\w\s']/g, '').trim();

  for (const target of acceptableList) {
    const cleanTarget = target.toLowerCase().replace(/[^\w\s']/g, '').trim();
    if (cleanSpoken === cleanTarget || cleanSpoken.includes(cleanTarget) || cleanTarget.includes(cleanSpoken)) {
      return { isCorrect: true, score: 95 };
    }
  }

  // Word overlap check
  const spokenWords = new Set(cleanSpoken.split(/\s+/));
  for (const target of acceptableList) {
    const targetWords = target.toLowerCase().replace(/[^\w\s']/g, '').trim().split(/\s+/);
    let matchCount = 0;
    targetWords.forEach(w => { if (spokenWords.has(w)) matchCount++; });
    const ratio = matchCount / targetWords.length;
    if (ratio >= 0.5) {
      return { isCorrect: true, score: Math.round(ratio * 100) };
    }
  }

  return { isCorrect: false, score: 40 };
};

export function InformationExchangeP2({ customData }) {
  const data = customData || {
    title: "Cambridge Speaking Part 2 — Information Exchange",
    subtitle: "Table A: Candidate asks questions for missing info (?) • Table B: Candidate answers Nova's questions",
    table_a: {
      title: "Table A: Tom's Accident (Candidate Asks Questions)",
      person: "Tom",
      fields: [
        { id: "field_a1", label: "Who?", value: "Tom", is_missing: false },
        {
          id: "field_a2",
          label: "Injury location?",
          value: "?",
          is_missing: true,
          cue_prompt: "Where / Tom / get injured?",
          acceptable_questions: ["Where did Tom get injured?", "Where was Tom injured?", "Where did he slip?"],
          nova_reply: "Tom got injured in the main school corridor near the science lab."
        },
        {
          id: "field_a3",
          label: "Hurt what?",
          value: "?",
          is_missing: true,
          cue_prompt: "What / Tom / hurt?",
          acceptable_questions: ["What did Tom hurt?", "What did he hurt?", "Which part of his body did he hurt?"],
          nova_reply: "Tom hurt his left knee when he fell down."
        },
        {
          id: "field_a4",
          label: "Time?",
          value: "?",
          is_missing: true,
          cue_prompt: "What time / slip?",
          acceptable_questions: ["What time did Tom slip?", "What time did he slip?", "When did the accident happen?"],
          nova_reply: "He slipped at exactly 9:30 AM."
        }
      ]
    },
    table_b: {
      title: "Table B: Jake's Action (Examiner Asks Questions)",
      person: "Jake",
      fields: [
        {
          id: "field_b1",
          label: "Who?",
          value: "Jake",
          nova_question: "Who took quick action when Tom fell down?",
          acceptable_answers: ["Jake took quick action.", "Jake", "Jake did."]
        },
        {
          id: "field_b2",
          label: "Action taken?",
          value: "Called school nurse",
          nova_question: "What action did Jake take?",
          acceptable_answers: ["He called the school nurse.", "Called the school nurse", "He called the nurse for help."]
        },
        {
          id: "field_b3",
          label: "First aid item?",
          value: "Clean bandage & cold pack",
          nova_question: "What first aid item did the nurse bring?",
          acceptable_answers: ["She brought a clean bandage and a cold pack.", "Clean bandage and cold pack", "A clean bandage"]
        },
        {
          id: "field_b4",
          label: "Feeling?",
          value: "Relieved & safe",
          nova_question: "How did everyone feel after that?",
          acceptable_answers: ["Everyone felt relieved and safe.", "Relieved", "They felt relieved."]
        }
      ]
    }
  };

  // State for Table A (Asking Questions)
  const [activeFieldA, setActiveFieldA] = useState('field_a2');
  const [questionInputs, setQuestionInputs] = useState({});
  const [tableAAnswers, setTableAAnswers] = useState({});
  const [activeMicA, setActiveMicA] = useState(null);

  // State for Table B (Answering Questions)
  const [activeFieldB, setActiveFieldB] = useState('field_b1');
  const [answerInputs, setAnswerInputs] = useState({});
  const [tableBResults, setTableBResults] = useState({});
  const [activeMicB, setActiveMicB] = useState(null);

  // Handler for Submitting Question for Table A
  const handleAskQuestionSubmit = (field) => {
    const userText = questionInputs[field.id] || '';
    const result = evaluateSpeechInput(userText, field.acceptable_questions);

    if (result.isCorrect || userText.trim().length > 3) {
      setTableAAnswers((prev) => ({
        ...prev,
        [field.id]: { revealedValue: field.nova_reply, isPassed: true }
      }));
      VoiceService.speak(field.nova_reply, 'questions');
    } else {
      VoiceService.speak("Pardon? Can you ask again? For example: " + field.acceptable_questions[0], 'questions');
    }
  };

  // Handler for Nova Question Audio Playback for Table B
  const handlePlayNovaQuestion = (field) => {
    setActiveFieldB(field.id);
    VoiceService.speak(field.nova_question, 'questions');
  };

  // Handler for Submitting Answer for Table B
  const handleAnswerSubmit = (field) => {
    const userText = answerInputs[field.id] || '';
    const result = evaluateSpeechInput(userText, field.acceptable_answers);

    setTableBResults((prev) => ({
      ...prev,
      [field.id]: { userText, isCorrect: result.isCorrect, score: result.score }
    }));

    if (result.isCorrect) {
      VoiceService.speak("Excellent answer! " + field.value, 'questions');
    } else {
      VoiceService.speak("Good try! The answer is: " + field.value, 'questions');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans space-y-6">
      {/* Header Banner */}
      <div className="pb-4 border-b border-slate-200 space-y-1">
        <div className="flex items-center justify-between">
          <span className="px-3.5 py-1 bg-purple-100 text-purple-900 text-[11px] font-black rounded-full uppercase tracking-wider flex items-center gap-1.5 w-max">
            📊 INFORMATION EXCHANGE — SPEAKING PART 2
          </span>
          <span className="text-xs font-black text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Side-by-Side Information Tables
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Candidate Information Exchange (Ask & Answer Tables)
        </h2>
        <p className="text-xs font-bold text-slate-500">
          Table A: Candidate forms & asks questions to discover missing info (?) • Table B: Candidate answers Examiner Nova's questions.
        </p>
      </div>

      {/* Side-by-Side Information Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* TABLE A: CANDIDATE'S COPY (TOM'S ACCIDENT - ASK QUESTIONS) */}
        <div className="bg-amber-50/80 rounded-3xl border-2 border-amber-300 p-5 sm:p-6 shadow-lg space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div>
            {/* Table Header */}
            <div className="flex items-center justify-between border-b-2 border-amber-300 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-amber-500 text-white rounded-xl text-xs font-black">📋</span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-amber-950 font-serif">
                    {data.table_a.title}
                  </h3>
                  <span className="text-[11px] font-bold text-amber-800">Person: {data.table_a.person}</span>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-200 text-amber-950 px-2.5 py-1 rounded-full">
                Ask Questions
              </span>
            </div>

            {/* Information Rows */}
            <div className="space-y-3">
              {data.table_a.fields.map((field) => {
                const answerState = tableAAnswers[field.id];
                const isCurrentActive = activeFieldA === field.id;

                return (
                  <div
                    key={field.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      field.is_missing
                        ? answerState?.isPassed
                          ? 'bg-emerald-100/90 border-emerald-400 shadow-sm'
                          : isCurrentActive
                          ? 'bg-white border-amber-400 ring-2 ring-amber-200 shadow-md'
                          : 'bg-white/80 border-amber-200 hover:border-amber-300'
                        : 'bg-amber-100/50 border-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black text-amber-900 w-1/3">
                        {field.label}
                      </span>

                      {!field.is_missing ? (
                        <span className="text-xs font-black text-slate-800 bg-amber-200/80 px-3 py-1 rounded-lg">
                          {field.value}
                        </span>
                      ) : answerState?.isPassed ? (
                        <div className="flex items-center gap-1.5 text-xs font-black text-emerald-950 bg-emerald-200 px-3 py-1 rounded-lg">
                          <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
                          <span>{answerState.revealedValue}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setActiveFieldA(field.id)}
                          className="text-xs font-black text-amber-700 bg-amber-200 hover:bg-amber-300 px-3 py-1 rounded-lg transition animate-pulse"
                        >
                          ? (Form Question)
                        </button>
                      )}
                    </div>

                    {/* Interactive Form Question Expansion Panel */}
                    {field.is_missing && !answerState?.isPassed && isCurrentActive && (
                      <div className="mt-3 pt-3 border-t border-amber-200 space-y-2 animate-in fade-in">
                        <div className="text-[11px] font-black text-amber-800 flex items-center gap-1">
                          <HelpCircle size={13} className="text-amber-600" /> Cue Card Prompt:
                          <span className="text-amber-950 font-serif font-black bg-amber-200 px-2 py-0.5 rounded">
                            {field.cue_prompt}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="text"
                            value={questionInputs[field.id] || ''}
                            onChange={(e) => setQuestionInputs({ ...questionInputs, [field.id]: e.target.value })}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleAskQuestionSubmit(field); }}
                            placeholder={`Type: "${field.acceptable_questions[0]}"`}
                            className="flex-1 px-3 py-1.5 rounded-xl border-2 border-amber-300 text-xs font-bold text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                          />
                          <button
                            onClick={() => handleAskQuestionSubmit(field)}
                            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-xl text-xs transition shadow-md shrink-0 flex items-center gap-1"
                          >
                            <Send size={13} /> Ask Nova
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-[11px] font-bold text-amber-800 italic bg-amber-200/50 p-2.5 rounded-xl border border-amber-300/50 text-center">
            💡 Form 3 questions to uncover all missing info in Table A!
          </div>
        </div>

        {/* TABLE B: EXAMINER'S COPY (JAKE'S ACTION - ANSWER QUESTIONS) */}
        <div className="bg-indigo-50/80 rounded-3xl border-2 border-indigo-300 p-5 sm:p-6 shadow-lg space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div>
            {/* Table Header */}
            <div className="flex items-center justify-between border-b-2 border-indigo-300 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-indigo-600 text-white rounded-xl text-xs font-black">🎙️</span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-indigo-950 font-serif">
                    {data.table_b.title}
                  </h3>
                  <span className="text-[11px] font-bold text-indigo-800">Person: {data.table_b.person}</span>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-200 text-indigo-950 px-2.5 py-1 rounded-full">
                Answer Nova
              </span>
            </div>

            {/* Information Rows */}
            <div className="space-y-3">
              {data.table_b.fields.map((field) => {
                const evalResult = tableBResults[field.id];
                const isCurrentActive = activeFieldB === field.id;

                return (
                  <div
                    key={field.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      evalResult?.isCorrect
                        ? 'bg-emerald-100/90 border-emerald-400 shadow-sm'
                        : isCurrentActive
                        ? 'bg-white border-indigo-400 ring-2 ring-indigo-200 shadow-md'
                        : 'bg-white/80 border-indigo-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black text-indigo-900 w-1/3">
                        {field.label}
                      </span>
                      <span className="text-xs font-black text-indigo-950 bg-indigo-100 px-3 py-1 rounded-lg">
                        {field.value}
                      </span>
                      <button
                        onClick={() => handlePlayNovaQuestion(field)}
                        className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition shadow-sm shrink-0 flex items-center gap-1"
                        title="Listen to Nova's Question"
                      >
                        <Volume2 size={13} /> Ask
                      </button>
                    </div>

                    {/* Interactive Answer Input Panel */}
                    {isCurrentActive && (
                      <div className="mt-3 pt-3 border-t border-indigo-200 space-y-2 animate-in fade-in">
                        <div className="text-[11px] font-black text-indigo-900 bg-indigo-100/80 p-2 rounded-xl flex items-center gap-1.5">
                          <MessageSquare size={13} className="text-indigo-600 shrink-0" />
                          <span>Nova: "{field.nova_question}"</span>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="text"
                            value={answerInputs[field.id] || ''}
                            onChange={(e) => setAnswerInputs({ ...answerInputs, [field.id]: e.target.value })}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleAnswerSubmit(field); }}
                            placeholder={`Answer: "${field.value}"`}
                            className="flex-1 px-3 py-1.5 rounded-xl border-2 border-indigo-300 text-xs font-bold text-indigo-950 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                          />
                          <button
                            onClick={() => handleAnswerSubmit(field)}
                            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl text-xs transition shadow-md shrink-0 flex items-center gap-1"
                          >
                            <Send size={13} /> Answer
                          </button>
                        </div>

                        {evalResult && (
                          <div className={`text-[11px] font-black px-2.5 py-1 rounded-lg flex items-center justify-between ${
                            evalResult.isCorrect ? 'bg-emerald-200 text-emerald-950' : 'bg-amber-200 text-amber-950'
                          }`}>
                            <span>{evalResult.isCorrect ? '✓ Correct Answer!' : 'Good try!'}</span>
                            <span>Score: {evalResult.score}%</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-[11px] font-bold text-indigo-800 italic bg-indigo-200/50 p-2.5 rounded-xl border border-indigo-300/50 text-center">
            💡 Read information on Table B to answer Examiner Nova's 4 questions!
          </div>
        </div>

      </div>
    </div>
  );
}

export default InformationExchangeP2;
