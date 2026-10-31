import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, Send, CheckCircle2, RefreshCw, Trophy, HelpCircle, PlayCircle, ArrowRight, LifeBuoy } from 'lucide-react';
import VoiceService from '../../services/voiceService';
import CompletionModal from '../common/CompletionModal';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { useUserStore } from '../../stores/useUserStore';
import ExamIntroAudioButton from '../common/ExamIntroAudioButton';
import { evaluateSpeechSyntax } from '../../utils/speechSyntaxEvaluator';


export function InformationExchangeP2({ customData, data: propData, isStealthMode = false, weekNumber, onComplete }) {
  const resolvedWeek = weekNumber || customData?.weekNumber || customData?.week || propData?.weekNumber || propData?.week;
  // Adapter: speaking_hub format (candidate_card / examiner_card) → table_a / table_b format
  function adaptSpeakingHubData(raw) {
    if (!raw) return null;
    if (raw.table_a && raw.table_b) return raw; // Already correct format
    if (raw.candidate_card || raw.examiner_card) {
      const candItems = (raw.candidate_card?.items || []);
      const examItems = (raw.examiner_card?.items || []);
      const candPerson = raw.candidate_card?.title?.match(/\(([^)]+)\)/)?.[1] || raw.candidate_card?.title?.split("'")[0] || "Character A";
      const examPerson = raw.examiner_card?.title?.match(/\(([^)]+)\)/)?.[1] || raw.examiner_card?.title?.split("'")[0] || "Character B";
      return {
        title: raw.candidate_card?.title || "Cue-Card Exchange",
        table_a: {
          title: `Table A: ${raw.candidate_card?.title || 'Candidate Card'} (Candidate Asks Questions)`,
          person: candPerson,
          fields: candItems.map((item, i) => {
            const cueWord = item.label.toLowerCase().includes('location') || item.label.toLowerCase().includes('where')
              ? 'Where'
              : item.label.toLowerCase().includes('time') || item.label.toLowerCase().includes('when')
              ? 'When'
              : item.label.toLowerCase().includes('friend') || item.label.toLowerCase().includes('who')
              ? 'Who'
              : 'What';
            return {
              id: `field_a${i + 1}`,
              label: item.label,
              value: item.value,
              is_missing: item.is_missing !== undefined ? item.is_missing : true,
              cue_word: cueWord,
              cue_prompt: `${cueWord} / ${item.label.toLowerCase().replace('?','')}?`,
              acceptable_questions: [
                `What is the ${item.label.toLowerCase().replace('?','')}?`,
                `Where does ${candPerson} ${item.label.toLowerCase().includes('live') ? 'live' : 'have'}?`,
                `When is the ${item.label.toLowerCase().replace('?','')}?`,
                `Who is the ${item.label.toLowerCase().replace('?','')}?`,
                `Can you tell me the ${item.label.toLowerCase().replace('?','')}?`
              ],
              nova_reply: `The ${item.label.toLowerCase().replace('?','')} is ${item.value}.`
            };
          })
        },
        table_b: {
          title: `Table B: ${raw.examiner_card?.title || 'Examiner Card'} (Examiner Asks Questions)`,
          person: examPerson,
          fields: examItems.map((item, i) => {
            const qAudio = item.audio_url || (raw.examiner_questions && raw.examiner_questions[i]?.audio_url) || (resolvedWeek ? `/audio/week${resolvedWeek}/info_exchange_q${i + 1}.mp3` : null);
            return {
              id: `field_b${i + 1}`,
              label: item.label,
              value: item.value,
              audio_url: qAudio,
              nova_question: (raw.examiner_questions && raw.examiner_questions[i]?.text) || `What is the ${item.label.toLowerCase().replace('?','')} of ${examPerson}?`,
              acceptable_answers: [
                item.value,
                `The ${item.label.toLowerCase().replace('?','')} is ${item.value}.`,
                item.value ? item.value.split(' ')[0] : ''
              ]
            };
          })
        },
        prompt_questions: raw.prompt_questions || []
      };
    }
    return null;
  }

  const rawInput = customData || propData;
  const data = adaptSpeakingHubData(rawInput);

  // State Machine for Conversational Flow
  // 'idle' | 'phase1_intro' | 'phase1_q' | 'phase2_intro' | 'phase2_q' | 'completed'
  const [flowState, setFlowState] = useState('idle');
  const [phase1Index, setPhase1Index] = useState(0); // 0 to 3 for Table B
  const [phase2Index, setPhase2Index] = useState(0); // 0 to 2 for Table A missing fields

  const [userInputText, setUserInputText] = useState('');
  const [isMicListening, setIsMicListening] = useState(false);
  const [revealedTableA, setRevealedTableA] = useState({});
  const [tableBResults, setTableBResults] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [attemptCounts, setAttemptCounts] = useState({});
  const [showLifebuoyHint, setShowLifebuoyHint] = useState(false);

  const silenceTimerRef = useRef(null);
  const speechDebounceTimerRef = useRef(null);

  const missingFieldsA = data.table_a.fields.filter(f => f.is_missing);
  const tableBFields = data.table_b.fields;

  // Active missing field in Phase 2 derived strictly by phase2Index
  const currentActiveFieldA = missingFieldsA[phase2Index] || null;

  // Helper function for Nova audio playback with debug logging
  const speakNovaWithDebug = (text, audioUrl = null) => {
    console.log(`[SPEAKING_P2_DEBUG] Nova Speaking: "${text}" | audioUrl: ${audioUrl}`);
    VoiceService.speak(text, 'questions', audioUrl);
  };

  // Clear silence and speech timers
  const clearAllTimers = () => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    if (speechDebounceTimerRef.current) clearTimeout(speechDebounceTimerRef.current);
  };

  // Reset 10s Silence Fallback Timer
  const resetSilenceTimer = () => {
    clearAllTimers();
    silenceTimerRef.current = setTimeout(() => {
      if (flowState === 'phase1_q' || flowState === 'phase2_q') {
        console.log('[SPEAKING_P2_DEBUG] Fallback Triggered: TIMEOUT -> Providing hint.');
        setFeedbackMessage({ type: 'info', text: 'Take your time! Look at the highlighted table row...' });
        speakNovaWithDebug("Take your time! Look at the table row and try speaking into the mic.");
      }
    }, 10000); // 10s timeout threshold
  };

  useEffect(() => {
    if (flowState === 'phase1_q' || flowState === 'phase2_q') {
      resetSilenceTimer();
    }
    return () => clearAllTimers();
  }, [flowState, phase1Index, phase2Index]);

  // Start Exam Flow
  const handleStartExam = () => {
    clearAllTimers();
    console.log('[SPEAKING_P2_DEBUG] Phase changed to: PHASE_1_INTRO | Current Question Index: 0');
    setFlowState('phase1_intro');
    setPhase1Index(0);
    setPhase2Index(0);
    setRevealedTableA({});
    setTableBResults({});
    setFeedbackMessage(null);
    setAttemptCounts({});
    setShowLifebuoyHint(false);

    // Play Phase 1 Intro Audio
    const candPerson = data.table_b?.person || 'the character';
    const introText = `I don't know anything about ${candPerson}, but you do. I'm going to ask you some questions.`;
    const introAudioUrl = resolvedWeek ? `/audio/week${resolvedWeek}/info_exchange_intro_p1.mp3` : null;
    speakNovaWithDebug(introText, introAudioUrl);
    
    // Auto-advance to Phase 1 Question 1 after 3.8 seconds
    setTimeout(() => {
      playPhase1Question(0);
    }, 3800);
  };

  // Play Question for Phase 1 (Examiner Asks, Candidate Answers)
  const playPhase1Question = (index) => {
    const field = tableBFields[index];
    if (!field) return;
    console.log(`[SPEAKING_P2_DEBUG] Phase changed to: PHASE_1_EXAMINER_ASKS | Current Question Index: ${index}`);
    setFlowState('phase1_q');
    setPhase1Index(index);
    setUserInputText('');
    setFeedbackMessage(null);
    setShowLifebuoyHint(false);
    speakNovaWithDebug(field.nova_question, field.audio_url);
    resetSilenceTimer();
  };

  // Play Phase 2 Intro & Transition to Candidate Asking Phase
  const startPhase2 = () => {
    clearAllTimers();
    console.log('[SPEAKING_P2_DEBUG] Phase changed to: PHASE_2_INTRO | Current Question Index: 0');
    setFlowState('phase2_intro');
    setPhase2Index(0);
    setUserInputText('');
    setFeedbackMessage(null);
    setShowLifebuoyHint(false);

    const examPerson = data.table_a?.person || 'the character';
    const transitionText = `Now, you don't know anything about ${examPerson}, so you ask me some questions.`;
    const transitionAudioUrl = resolvedWeek ? `/audio/week${resolvedWeek}/info_exchange_intro_p2.mp3` : null;
    speakNovaWithDebug(transitionText, transitionAudioUrl);

    setTimeout(() => {
      setFlowState('phase2_q');
      promptCandidateForQuestion(0);
    }, 3800);
  };

  const promptCandidateForQuestion = (index) => {
    const field = missingFieldsA[index];
    if (!field) return;
    console.log(`[SPEAKING_P2_DEBUG] Phase changed to: PHASE_2_CANDIDATE_ASKS | Current Question Index: ${index}`);
    setPhase2Index(index);
    setUserInputText('');
    setFeedbackMessage(null);
    setShowLifebuoyHint(false);
    resetSilenceTimer();
  };

  // Candidate Submits Answer for Phase 1 (Table B)
  const handlePhase1AnswerSubmit = (inputVal) => {
    clearAllTimers();
    const textToEval = inputVal || userInputText;
    if (!textToEval.trim()) return;

    console.log(`[SPEAKING_P2_DEBUG] User Transcript Received: "${textToEval}"`);

    const currentField = tableBFields[phase1Index];
    const attempts = (attemptCounts[currentField.id] || 0) + 1;
    setAttemptCounts(prev => ({ ...prev, [currentField.id]: attempts }));

    const result = evaluateSpeechSyntax(textToEval, currentField.acceptable_answers, { mode: 'sentence' });

    console.log(`[SPEAKING_P2_DEBUG] Evaluation Result -> Score: ${result.score}%, Status: ${result.isCorrect ? 'PASS' : 'FAIL'}, Attempts: ${attempts}`);

    setTableBResults(prev => ({
      ...prev,
      [currentField.id]: { userText: textToEval, isCorrect: result.isCorrect, score: result.score }
    }));

    if (result.isCorrect) {
      setFeedbackMessage({ type: 'success', text: 'Great answer!' });
      speakNovaWithDebug("Good job!");
    } else {
      if (attempts >= 2) {
        console.log(`[SPEAKING_P2_DEBUG] Fallback Triggered: MAX_ATTEMPTS_REACHED -> Providing hint.`);
        setShowLifebuoyHint(true);
      }
      setFeedbackMessage({ type: 'info', text: `Good try! Correct answer: ${currentField.value}` });
      speakNovaWithDebug("Good try!");
    }

    // Auto-advance to next question or Phase 2
    setTimeout(() => {
      if (phase1Index + 1 < tableBFields.length) {
        playPhase1Question(phase1Index + 1);
      } else {
        startPhase2();
      }
    }, 2500);
  };

  // Candidate Submits Question for Phase 2 (Table A)
  const handlePhase2QuestionSubmit = (inputVal) => {
    clearAllTimers();
    const textToEval = inputVal || userInputText;
    if (!textToEval.trim()) return;

    console.log(`[SPEAKING_P2_DEBUG] User Transcript Received: "${textToEval}"`);

    const currentField = currentActiveFieldA;
    if (!currentField) return;

    const attempts = (attemptCounts[currentField.id] || 0) + 1;
    setAttemptCounts(prev => ({ ...prev, [currentField.id]: attempts }));

    const result = evaluateSpeechSyntax(textToEval, currentField.acceptable_questions, { mode: 'question', cueWord: currentField.cue_prompt?.split('/')?.[0]?.trim() || '' });


    console.log(`[SPEAKING_P2_DEBUG] Evaluation Result -> Score: ${result.score}%, Status: ${result.isCorrect ? 'PASS' : 'FAIL'}, Attempts: ${attempts}`);

    // R-1 FIX: In Check/Stealth mode (strict Cambridge), only advance on correct answer.
    // In Learn mode, allow lenient bypass after ≥2 attempts to prevent permanent blocking.
    const isStrictPass = result.isCorrect;
    const isLenientPass = !isStealthMode && attempts >= 2 && textToEval.trim().length > 8;
    if (isStrictPass || isLenientPass) {
      setRevealedTableA(prev => ({
        ...prev,
        [currentField.id]: currentField.value
      }));
      setShowLifebuoyHint(false);
      setFeedbackMessage({ type: 'success', text: 'Correct question structure!' });
      speakNovaWithDebug(currentField.nova_reply);

      // Auto-advance to next question or complete
      setTimeout(() => {
        if (phase2Index + 1 < missingFieldsA.length) {
          promptCandidateForQuestion(phase2Index + 1);
        } else {
          console.log('[SPEAKING_P2_DEBUG] Phase changed to: EXAM_COMPLETED');
          setFlowState('completed');
          fireCelebrationConfetti('InfoExchange_Complete');
          speakNovaWithDebug("Fantastic job! You completed the Speaking Information Exchange Exam!");
        }
      }, 3500);
    } else {
      if (attempts >= 2) {
        console.log(`[SPEAKING_P2_DEBUG] Fallback Triggered: MAX_ATTEMPTS_REACHED -> Providing hint.`);
        setShowLifebuoyHint(true);
        setFeedbackMessage({ type: 'warning', text: `Lifebuoy Unlocked: Try asking "${currentField.acceptable_questions[0]}"` });
        speakNovaWithDebug(`Good try! Here is a hint. Try asking: ${currentField.acceptable_questions[0]}`);
      } else {
        setFeedbackMessage({ type: 'warning', text: `Good try! Try asking using 'Where' or 'What'.` });
        speakNovaWithDebug("Good try! Let's try asking again using Where or What.");
      }
    }
  };

  // Speech-to-Text Toggle with 3000ms Debounce VAD Timeout
  const handleToggleMic = () => {
    if (isMicListening) {
      setIsMicListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Browser Speech Recognition not available. Please type your response.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.continuous = true;

      setIsMicListening(true);
      recognition.start();

      recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          interimTranscript += event.results[i][0].transcript;
        }
        setUserInputText(interimTranscript);

        // 5000ms Speech Debounce Timer to prevent cutting off early mid-sentence for primary ESL learners
        if (speechDebounceTimerRef.current) clearTimeout(speechDebounceTimerRef.current);
        speechDebounceTimerRef.current = setTimeout(() => {
          recognition.stop();
          setIsMicListening(false);
          if (interimTranscript.trim()) {
            if (flowState === 'phase1_q') handlePhase1AnswerSubmit(interimTranscript);
            else if (flowState === 'phase2_q') handlePhase2QuestionSubmit(interimTranscript);
          }
        }, 5000); // 5000ms ESL VAD timeout threshold calibrated for primary learners
      };

      recognition.onerror = () => {
        setIsMicListening(false);
      };

      recognition.onend = () => {
        setIsMicListening(false);
      };
    } catch (err) {
      setIsMicListening(false);
    }
  };

  // Determine Dimming & Visual Isolation
  const isPhase1Active = flowState === 'phase1_intro' || flowState === 'phase1_q';
  const isPhase2Active = flowState === 'phase2_intro' || flowState === 'phase2_q';

  const isDataValid = Boolean(
    data &&
    data.table_a &&
    data.table_b &&
    Array.isArray(data.table_a.fields) &&
    Array.isArray(data.table_b.fields) &&
    data.table_a.fields.length > 0 &&
    data.table_b.fields.length > 0
  );

  if (!isDataValid) {
    return (
      <div data-testid="info-exchange-data-missing" className="w-full max-w-4xl mx-auto my-6 p-6 bg-rose-50 border-2 border-rose-300 rounded-3xl text-center space-y-3 font-sans">
        <div className="text-3xl">⚠️</div>
        <h3 className="text-lg font-black text-rose-900">Speaking Part 2 Data Missing (Fail-Loud)</h3>
        <p className="text-sm font-semibold text-rose-700">
          Speaking Hub data is missing or incomplete for week {resolvedWeek || 'N/A'}. Expected cue card data in speaking_hub.info_exchange_cards.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto my-4 p-4 sm:p-8 bg-slate-900 text-white rounded-3xl border border-purple-500/30 shadow-2xl font-sans space-y-6 relative overflow-hidden">
      <CompletionModal
        isOpen={flowState === 'completed'}
        onClose={() => {}}
        score={100}
        stars={3}
        xpEarned={50}
        srsWordsAdded={5}
        activityTitle="Cue Card Exchange (Speaking Part 2)"
      />
      {/* Decorative Glow Patterns */}
      <div className="pb-2 sm:pb-2.5 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2">
        <div>
          <span className="px-2.5 py-0.5 bg-purple-100 text-purple-900 text-[10px] font-black rounded-full uppercase tracking-wider flex items-center gap-1 w-max">
            Flyers Practice
          </span>
          <h2 className="text-sm sm:text-lg font-black text-slate-900 mt-0.5">
            Information Exchange (Ask & Answer Questions)
          </h2>
          <p className="text-[10.5px] sm:text-xs text-purple-700 font-bold">
            Look at the questions. Ask and answer questions using the information cards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ExamIntroAudioButton
            weekNumber={resolvedWeek}
            introId="exam_intro_S2"
            introText="Look at the questions. Ask and answer questions using the information cards."
          />
          {flowState === 'idle' && (
            <button
              onClick={handleStartExam}
              className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black rounded-xl text-xs shadow-md transition flex items-center gap-1.5 animate-bounce shrink-0"
            >
              🚀 START EXAM ({tableBFields.length} CUES)
            </button>
          )}
        </div>
      </div>

      {/* Side-by-Side Information Tables with Visual Isolation & Phase Dimming */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
        
        {/* TABLE A: CANDIDATE ASKS (MISSING INFO TO ASK) */}
        <div className={`rounded-xl sm:rounded-2xl border-2 p-2.5 sm:p-4 shadow-sm transition-all duration-500 ${
          isPhase2Active
            ? 'bg-amber-50 border-amber-500 ring-4 ring-amber-200 shadow-xl opacity-100 scale-101'
            : isPhase1Active
            ? 'opacity-40 pointer-events-none grayscale bg-slate-50 border-slate-200'
            : 'bg-slate-50/70 border-slate-200 opacity-90'
        }`}>
          <div className="flex items-center justify-between border-b border-amber-300/70 pb-1.5 mb-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="p-1 sm:p-1.5 bg-amber-500 text-white rounded-lg text-xs font-black">📋</span>
              <div>
                <h3 className="text-xs sm:text-base font-black text-amber-950 font-serif">
                  {data.table_a.title}
                </h3>
                <span className="text-[9.5px] sm:text-[10.5px] font-bold text-amber-800">Person: {data.table_a.person}</span>
              </div>
            </div>
            {isPhase2Active && (
              <span className="text-[9px] sm:text-[9.5px] font-black uppercase tracking-wider bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full animate-pulse shadow-2xs">
                Active: Ask Nova
              </span>
            )}
          </div>

          <div className="space-y-1 sm:space-y-2">
            {data.table_a.fields.map((field) => {
              const isMissing = field.is_missing;
              const isRevealed = revealedTableA[field.id];
              const isHighlighted = isPhase2Active && currentActiveFieldA?.id === field.id;

              return (
                <div
                  key={field.id}
                  className={`p-2 sm:p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                    isHighlighted
                      ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-300 shadow-sm scale-101 font-black'
                      : isRevealed
                      ? 'bg-emerald-100 border-emerald-400'
                      : !isMissing
                      ? 'bg-amber-100/50 border-amber-200'
                      : 'bg-white border-amber-200'
                  }`}
                >
                  <span className="text-xs font-black text-amber-950">{field.label}</span>
                  {!isMissing ? (
                    <span className="text-xs font-black text-slate-800 bg-amber-200/80 px-3 py-1 rounded-lg">
                      {field.value}
                    </span>
                  ) : isRevealed ? (
                    <span className="text-xs font-black text-emerald-950 bg-emerald-200 px-3 py-1 rounded-lg flex items-center gap-1">
                      <CheckCircle2 size={13} className="text-emerald-700" /> {isRevealed}
                    </span>
                  ) : (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition-all ${
                      isHighlighted
                        ? 'bg-amber-400 text-amber-950 border-amber-500 ring-2 ring-amber-300 font-black shadow-xs'
                        : 'bg-amber-50 text-amber-900 border-amber-200'
                    }`}>
                      {field.cue_prompt || `${field.cue_word || 'What'} / ${field.label.toLowerCase()}?`}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* TABLE B: CANDIDATE ANSWERS (COMPLETE INFO TO ANSWER) */}
        <div className={`rounded-xl sm:rounded-2xl border-2 p-2.5 sm:p-4 shadow-sm transition-all duration-500 ${
          isPhase1Active
            ? 'bg-indigo-50 border-indigo-500 ring-4 ring-indigo-200 shadow-xl opacity-100 scale-101'
            : isPhase2Active
            ? 'opacity-40 pointer-events-none grayscale bg-slate-50 border-slate-200'
            : 'bg-slate-50/70 border-slate-200 opacity-90'
        }`}>
          <div className="flex items-center justify-between border-b border-indigo-300/70 pb-1.5 mb-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="p-1 sm:p-1.5 bg-indigo-600 text-white rounded-lg text-xs font-black">🎙️</span>
              <div>
                <h3 className="text-xs sm:text-base font-black text-indigo-950 font-serif">
                  {data.table_b.title}
                </h3>
                <span className="text-[9.5px] sm:text-[10.5px] font-bold text-indigo-800">Person: {data.table_b.person}</span>
              </div>
            </div>
            {isPhase1Active && (
              <span className="text-[9px] sm:text-[9.5px] font-black uppercase tracking-wider bg-indigo-400 text-indigo-950 px-2 py-0.5 rounded-full animate-pulse shadow-2xs">
                Active: Answer Nova
              </span>
            )}
          </div>

          <div className="space-y-1 sm:space-y-2">
            {tableBFields.map((field, idx) => {
              const evalRes = tableBResults[field.id];
              const isHighlighted = flowState === 'phase1_q' && phase1Index === idx;

              return (
                <div
                  key={field.id}
                  className={`p-2 sm:p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                    isHighlighted
                      ? 'bg-indigo-100 border-indigo-500 ring-2 ring-indigo-300 shadow-sm scale-101 font-black'
                      : evalRes?.isCorrect
                      ? 'bg-emerald-100 border-emerald-400'
                      : 'bg-white border-indigo-200'
                  }`}
                >
                  <span className="text-xs font-black text-indigo-950">{field.label}</span>
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-lg ${isStealthMode ? 'bg-indigo-200/60 text-indigo-400 italic' : 'text-indigo-950 bg-indigo-100/90'}`}>
                    {isStealthMode ? '❓ Answer from your card' : field.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* CENTRAL VOICE CONTROLLER (HOSTED BY MASCOT NOVA) */}
      <div className="p-3 sm:p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 rounded-xl sm:rounded-2xl text-white shadow-xl border border-indigo-400/40 space-y-2 sm:space-y-3">
        {/* Nova Status Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-700/80 pb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 p-1.5 shrink-0 shadow-md border border-white/20 flex items-center justify-center text-xl">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-purple-300 uppercase tracking-widest">Examiner Mascot Nova</span>
                <span className="px-2 py-0.5 bg-purple-900 text-purple-200 rounded-md text-[10px] font-bold border border-purple-700">
                  {flowState === 'phase1_intro' || flowState === 'phase1_q' ? 'Phase 1: Candidate Answers' : flowState === 'phase2_intro' || flowState === 'phase2_q' ? 'Phase 2: Candidate Asks' : flowState === 'completed' ? 'Exam Complete' : 'Press Start'}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-300">
                {flowState === 'idle' && 'Click "Start Examiner Nova Flow" to begin the Speaking Exam.'}
                {flowState === 'phase1_intro' && `Nova: "I don't know anything about ${data.table_b?.person || 'the character'}, but you do..."`}
                {flowState === 'phase1_q' && `Listen to Nova's Question #${phase1Index + 1} and speak your answer from Table B!`}
                {flowState === 'phase2_intro' && `Nova: "Now, you don't know anything about ${data.table_a?.person || 'the character'}, so ask me..."`}
                {flowState === 'phase2_q' && `Look at highlighted row (${currentActiveFieldA?.label || ''}) in Table A and ask Nova!`}
                {flowState === 'completed' && '🎉 Exam Completed! Excellent Speaking Information Exchange.'}
              </p>
            </div>
          </div>

          {/* Cue Prompt Scaffolding Pill for Phase 2 (Hidden in Stealth / Check Mode) */}
          {!isStealthMode && flowState === 'phase2_q' && currentActiveFieldA && (
            <div className="bg-amber-400 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-xs shadow-md border border-amber-300 flex items-center gap-1.5 shrink-0">
              <HelpCircle size={14} /> Prompt: {currentActiveFieldA.cue_prompt}
            </div>
          )}
        </div>

        {/* Lifebuoy Scaffolding Hint Box (Max Attempts >= 2, Hidden in Stealth / Check Mode) */}
        {!isStealthMode && showLifebuoyHint && flowState === 'phase2_q' && currentActiveFieldA && (
          <div className="p-4 bg-amber-500/20 border-2 border-amber-400 rounded-2xl space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between text-amber-300 font-black text-xs">
              <span className="flex items-center gap-1.5">
                <LifeBuoy size={16} className="text-amber-400 animate-spin" /> 🛟 Lifebuoy Hint Unlocked (2 Failed Attempts):
              </span>
              <button
                onClick={() => VoiceService.speak(currentActiveFieldA.acceptable_questions[0], 'questions')}
                className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-black transition flex items-center gap-1 shadow-sm"
              >
                <Volume2 size={13} /> Listen Sample Audio
              </button>
            </div>
            <p className="text-sm font-black text-white">
              Try asking: <span className="text-amber-300 font-mono">"{currentActiveFieldA.acceptable_questions[0]}"</span>
            </p>
          </div>
        )}

        {/* Live Controller Actions (Mic & Input Field) */}
        {flowState !== 'idle' && flowState !== 'completed' && (
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleMic}
                className={`p-4 rounded-2xl text-white font-black transition flex items-center justify-center gap-2 shadow-xl shrink-0 ${
                  isMicListening ? 'bg-rose-600 ring-4 ring-rose-400 animate-pulse scale-105' : 'bg-purple-600 hover:bg-purple-500 active:scale-95'
                }`}
              >
                {isMicListening ? <MicOff size={22} /> : <Mic size={22} />}
                <span className="text-xs font-black hidden sm:inline">
                  {isMicListening ? 'Listening (3s Debounce)...' : 'Speak Response'}
                </span>
              </button>

              <input
                type="text"
                value={userInputText}
                onChange={(e) => setUserInputText(e.target.value)}
                placeholder={
                  flowState === 'phase1_q'
                    ? `Look at Table B and answer Nova...`
                    : `Ask Nova using prompt "${currentActiveFieldA?.cue_prompt || ''}"...`
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (flowState === 'phase1_q') handlePhase1AnswerSubmit(userInputText);
                    else if (flowState === 'phase2_q') handlePhase2QuestionSubmit(userInputText);
                  }
                }}
                className="flex-1 p-3.5 bg-slate-800 text-white placeholder-slate-400 rounded-2xl border border-slate-700 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner"
              />

              <button
                disabled={!userInputText.trim()}
                onClick={() => {
                  if (flowState === 'phase1_q') handlePhase1AnswerSubmit(userInputText);
                  else if (flowState === 'phase2_q') handlePhase2QuestionSubmit(userInputText);
                }}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-black shadow-md transition disabled:opacity-40 shrink-0 flex items-center gap-1.5"
              >
                <Send size={15} /> Send
              </button>
            </div>

            {/* Live Feedback Toast */}
            {feedbackMessage && (
              <div className={`p-3 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                feedbackMessage.type === 'success'
                  ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-700'
                  : 'bg-amber-900/80 text-amber-200 border border-amber-700'
              }`}>
                <Sparkles size={14} /> {feedbackMessage.text}
              </div>
            )}
          </div>
        )}

        {/* Completion Card */}
        {flowState === 'completed' && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-600 rounded-2xl text-center space-y-2 animate-in fade-in">
            <Trophy className="w-10 h-10 text-amber-400 mx-auto animate-bounce" />
            <h4 className="text-base font-black text-emerald-200">Exam State Machine Completed!</h4>
            <button
              onClick={handleStartExam}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl text-xs transition shadow-md inline-flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Retake Exam Flow
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default InformationExchangeP2;
