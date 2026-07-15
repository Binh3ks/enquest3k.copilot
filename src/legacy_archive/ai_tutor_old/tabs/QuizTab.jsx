import React, { useState, useRef, useEffect } from 'react';
import { Award, Send, Mic, MicOff, RotateCcw, Calculator, FlaskConical } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';
import syllabusDB from '../../../data/syllabus_database';
import { analyzeAnswer } from '../../../utils/smartCheck';
import { mathAI, getActiveProvider, validateMathAnswer } from '../../../services/aiProviders';

/**
 * QuizTab - Multi-Subject Quiz (Vocabulary, Math, Science)
 */
const QuizTab = ({ weekData, recognitionRef }) => {
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizMessages, setQuizMessages] = useState([]);
  const [quizInput, setQuizInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [quizSubject, setQuizSubject] = useState('vocabulary');
  const [quizMode, setQuizMode] = useState('current'); // current or review
  const [currentQuizData, setCurrentQuizData] = useState(null);
  const [previousProblems, setPreviousProblems] = useState([]);
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef(null);

  const vocabList = weekData?.stations?.new_words?.vocab || [];
  const weekId = weekData?.weekId || 1;
  const weekInfo = syllabusDB[weekId] || {};
  const weekLevel = weekId <= 14 ? 'beginner' : weekId <= 50 ? 'intermediate' : 'advanced';

  // Get cumulative vocab (simplified - can be enhanced)
  const cumulativeVocab = React.useMemo(() => {
    return vocabList; // TODO: Implement cumulative loading if needed
  }, [vocabList]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [quizMessages]);

  const toggleVoice = () => {
    if (!recognitionRef?.current) {
      alert('Speech recognition not supported. Try Chrome or Edge.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuizInput(transcript);
      };
      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const startConversationalQuiz = async (subject = 'vocabulary') => {
    console.log(`[Quiz] Starting ${subject} quiz (${quizMode} mode) for Week ${weekId}`);
    setIsLoading(true);
    setQuizSubject(subject);
    setQuizIndex(0);
    setQuizScore(0);
    setPreviousProblems([]);
    setPreviousQuestions([]);

    try {
      if (subject === 'vocabulary') {
        const activeVocab = quizMode === 'review' ? cumulativeVocab : vocabList;
        if (activeVocab.length === 0) {
          setQuizMessages([{ role: 'ai', text: "No vocabulary available." }]);
          return;
        }
        const firstWord = activeVocab[0];
        const def = weekLevel === 'beginner' ? firstWord.definition_en?.split('.')[0] : firstWord.definition_en;
        const msg = `Let's play! I'll describe words. Ready? ${def}. What's the word?`;
        setCurrentQuizData({ answer: firstWord.word, type: 'vocab' });
        setQuizMessages([{ role: 'ai', text: msg }]);
        speakText(msg);
      } else if (subject === 'math') {
        try {
          console.log('[Quiz] Calling AI for math problem...');
          const problem = await mathAI({
            weekInfo,
            vocabList,
            weekId,
            difficulty: weekLevel,
            previousProblems: []
          });
          console.log(`[Quiz] Provider: ${getActiveProvider()}, Generated:`, problem.question);
          setCurrentQuizData(problem);
          setPreviousProblems([problem.question]);
          const msg = `Math time! ${problem.question}`;
          setQuizMessages([
            { role: 'ai', text: msg },
            { role: 'hint', text: problem.hint || "💡 Answer with number AND unit!" }
          ]);
          speakText(msg);
        } catch (error) {
          console.error('[Quiz] Gemini API error:', error);
          setQuizMessages([{ role: 'ai', text: "Let's start with an easy problem!" }]);
        }
      } else if (subject === 'science') {
        // Simplified fallback for science
        const fallbackMsg = "Science quiz! Is a dog living or non-living?";
        setCurrentQuizData({ q: "Is a dog living or non-living?", a: "living", options: ["living", "non-living"] });
        setQuizMessages([{ role: 'ai', text: fallbackMsg }]);
        speakText(fallbackMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const answerQuiz = async () => {
    if (!quizInput.trim()) return;
    const answer = quizInput.trim();

    const activeVocab = quizMode === 'review' ? cumulativeVocab : vocabList;

    // SmartCheck for non-math answers
    if (quizSubject !== 'math') {
      const checkResult = analyzeAnswer(answer, [], 'critical');
      if (checkResult.status === 'warning') {
        setQuizMessages(prev => [...prev, { role: 'system', text: `⚠️ ${checkResult.message}` }]);
      }
    }

    let isCorrect = false;
    let correctAnswer = "";
    let feedback = "";

    if (quizSubject === 'vocabulary') {
      const currentWord = activeVocab[quizIndex];
      correctAnswer = currentWord.word;
      isCorrect = answer.toLowerCase() === currentWord.word.toLowerCase();
      feedback = isCorrect ? "Correct! 🎉" : `It was "${correctAnswer}". Keep going!`;
    } else if (quizSubject === 'math') {
      correctAnswer = currentQuizData?.answer || '';
      isCorrect = validateMathAnswer(answer, correctAnswer);

      if (isCorrect) {
        feedback = `Correct! 🎉 ${currentQuizData?.explanation || ''}`;
      } else {
        const hasNumber = answer.match(/\d+/);
        if (hasNumber && !answer.match(/[a-z]/i)) {
          feedback = `Remember to include the UNIT! The answer is "${correctAnswer}"`;
        } else {
          feedback = `Not quite. The answer is "${correctAnswer}". ${currentQuizData?.explanation || ''}`;
        }
      }
    } else if (quizSubject === 'science') {
      correctAnswer = currentQuizData?.a || '';
      isCorrect = answer.toLowerCase().includes(correctAnswer.toLowerCase());
      feedback = isCorrect ? "Correct! 🎉" : `The answer is "${correctAnswer}". Keep learning!`;
    }

    setQuizMessages(prev => [...prev,
      { role: 'user', text: quizInput },
      { role: 'ai', text: feedback }
    ]);
    setQuizInput("");

    speakText(isCorrect ? "Correct!" : "Not quite.");

    if (isCorrect) setQuizScore(prev => prev + 1);

    const maxQuestions = quizSubject === 'vocabulary' ? Math.min(activeVocab.length, 5) : 5;

    if (quizIndex < maxQuestions - 1) {
      setTimeout(async () => {
        try {
          if (quizSubject === 'vocabulary') {
            const nextWord = activeVocab[quizIndex + 1];
            const def = weekLevel === 'beginner' ? nextWord.definition_en?.split('.')[0] : nextWord.definition_en;
            const nextQ = `Next: ${def}. What word?`;
            setCurrentQuizData({ answer: nextWord.word, type: 'vocab' });
            setQuizMessages(prev => [...prev, { role: 'ai', text: nextQ }]);
            speakText(nextQ);
          } else if (quizSubject === 'math') {
            console.log('[Quiz] Generating next math problem...');
            const problem = await mathAI({
              weekInfo,
              vocabList,
              weekId,
              difficulty: weekLevel,
              previousProblems
            });
            console.log('[Quiz] Generated:', problem.question);
            setCurrentQuizData(problem);
            setPreviousProblems(prev => [...prev, problem.question]);
            setQuizMessages(prev => [...prev,
              { role: 'ai', text: problem.question },
              { role: 'hint', text: problem.hint || "💡 Answer with number AND unit!" }
            ]);
            speakText(problem.question);
          }
        } catch (error) {
          console.error('Quiz generation error:', error);
        }
      }, 1500);
      setQuizIndex(prev => prev + 1);
    } else {
      setTimeout(() => {
        const finalMsg = `Done! Score: ${quizScore + (isCorrect ? 1 : 0)}/${maxQuestions}`;
        setQuizMessages(prev => [...prev, { role: 'ai', text: finalMsg }]);
        speakText(finalMsg);
      }, 1500);
    }
  };

  const resetQuiz = () => {
    setQuizMessages([]);
    setQuizSubject('');
    setCurrentQuizData(null);
    setQuizInput('');
    setQuizIndex(0);
    setQuizScore(0);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {quizMessages.length === 0 ? (
          <div className="text-center py-6">
            <Award size={48} className="mx-auto text-amber-500 opacity-50 mb-3"/>
            <p className="text-sm font-bold text-slate-700 mb-2">Multi-Subject Quiz!</p>
            <p className="text-xs text-slate-600 mb-4 px-4">Choose a subject to test your knowledge</p>

            <div className="space-y-2">
              {/* Quiz Mode Toggle */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setQuizMode('current')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${quizMode === 'current' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  This Week
                </button>
                <button
                  onClick={() => setQuizMode('review')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${quizMode === 'review' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  Review All (W1-{weekId})
                </button>
              </div>

              {/* Subject Buttons */}
              <button
                onClick={() => startConversationalQuiz('vocabulary')}
                disabled={isLoading}
                className="w-full p-3 bg-amber-500 text-white rounded-xl font-black text-sm uppercase hover:bg-amber-600 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? <><span className="animate-spin">⏳</span>Loading...</> : <><Award size={16}/>Vocabulary Quiz</>}
              </button>
              <button
                onClick={() => startConversationalQuiz('math')}
                disabled={isLoading}
                className="w-full p-3 bg-blue-500 text-white rounded-xl font-black text-sm uppercase hover:bg-blue-600 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? <><span className="animate-spin">⏳</span>Loading...</> : <><Calculator size={16}/>Math Quiz</>}
              </button>
              <button
                onClick={() => startConversationalQuiz('science')}
                disabled={isLoading}
                className="w-full p-3 bg-green-500 text-white rounded-xl font-black text-sm uppercase hover:bg-green-600 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? <><span className="animate-spin">⏳</span>Loading...</> : <><FlaskConical size={16}/>Science Quiz</>}
              </button>
            </div>
          </div>
        ) : (
          <>
            {quizMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : m.role === 'hint' ? 'justify-center' : 'justify-start'}`}>
                {m.role === 'hint' ? (
                  <div className="px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-[10px] font-bold text-amber-600">
                    {m.text}
                  </div>
                ) : (
                  <div className={`max-w-[85%] p-3 rounded-[20px] text-sm font-bold shadow-sm ${m.role === 'user' ? 'bg-amber-500 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-amber-200'}`}>
                    {m.text}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={resetQuiz}
              className="w-full p-2 text-xs font-bold text-slate-500 hover:text-amber-600 flex items-center justify-center gap-1"
            >
              <RotateCcw size={12}/>Back to Quiz Menu
            </button>
            <div ref={scrollRef} />
          </>
        )}
      </div>

      {/* Input */}
      {quizMessages.length > 0 && quizIndex < Math.min(vocabList.length, 5) && (
        <div className="p-3 bg-white border-t flex gap-2 shrink-0">
          <button
            onClick={toggleVoice}
            className={`p-2.5 rounded-full transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-amber-600'}`}
          >
            {isListening ? <MicOff size={16}/> : <Mic size={16}/>}
          </button>
          <input
            value={quizInput}
            onChange={e => setQuizInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && answerQuiz()}
            placeholder={isListening ? "Listening..." : "Type or speak..."}
            className="flex-1 p-2.5 bg-slate-50 border-2 border-slate-200 rounded-[15px] outline-none text-xs font-bold focus:border-amber-300"
            disabled={isListening}
          />
          <button
            onClick={answerQuiz}
            disabled={isListening}
            className="p-2.5 bg-amber-500 text-white rounded-full hover:bg-amber-600 disabled:opacity-50 transition-all"
          >
            <Send size={16}/>
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizTab;
