import { useEffect, useRef, useState } from 'react';
import { useGameValidation } from '../hooks/useGameValidation';
import { getGameData } from '../../../config/gameAdaptation';

export default function AskMeGame({ weekNumber, learningMode = 'advanced', onGameComplete }) {
  const {
    gameState,
    initializeGame,
    validateInput,
    isGameComplete,
    getProgress,
    turnCount
  } = useGameValidation('ask_me', weekNumber, learningMode);

  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [hasMicUsed, setHasMicUsed] = useState(false);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);
  const completionRef = useRef(false);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    // Reset mic state when context changes
    setHasMicUsed(false);
    setUserInput('');
  }, [gameState?.contextIndex, gameState?.questionStep]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        setHasMicUsed(true);
        setIsListening(false);
        // Ensure recognition stops
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      };
      recognitionRef.current.onerror = () => {
        setIsListening(false);
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      };
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    if (!completionRef.current && isGameComplete()) {
      completionRef.current = true;
      if (onGameComplete) {
        onGameComplete({ gameId: 'ask_me' });
      }
    }
  }, [isGameComplete, onGameComplete]);

  if (!gameState) {
    return <div className="text-center py-20">Loading...</div>;
  }

  const progress = getProgress();
  const gameData = getGameData(weekNumber, learningMode, 'ask_me') || {};
  const contexts = (learningMode === 'easy' ? gameData.contexts_easy : gameData.contexts_advanced) || [];
  const context = contexts[gameState.contextIndex % Math.max(contexts.length, 1)] || {
    intro: 'Ask me a question about school.',
    topic: 'school'
  };
  const taskType = context.task_type || 'find_question';
  const steps = context.steps || [];
  const step = steps[gameState.questionStep] || null;
  const requiredWords = step?.required_question_words || context.required_question_words || [];
  const requiredKeywords = step?.required_keywords || context.required_keywords || [];
  
  let questionHints = [];
  if (taskType === 'mini_interview' && step?.question_hints) {
    questionHints = step.question_hints;
  } else if (context.question_hints) {
    questionHints = context.question_hints;
  }
  
  const scrambledQuestions = questionHints.map((text) => text.replace(/[.!?]$/, '').split(' ').reverse().join(' '));
  const instruction = learningMode === 'easy' ? gameData.instructions_easy : gameData.instructions_advanced;

  const handleMicClick = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }
    setHasMicUsed(true);
    setIsListening(true);
    recognitionRef.current.start();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    // Stop mic if still listening
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    
    const result = validateInput(userInput);
    setFeedback({ type: result.correct ? 'success' : 'error', message: result.feedback });
    if (result.correct) setUserInput('');
  };

  return (
    <div className="ask-me-game max-w-3xl mx-auto p-6">
      <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">🎤 Ask Me</h2>
            <p className="text-purple-100 mt-1">Ask a question based on the context</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-purple-100">Progress</div>
            <div className="text-2xl font-bold">{progress.current}/{progress.total}</div>
          </div>
        </div>
      </div>

      {instruction && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4 text-sm text-purple-800">
          {instruction}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="text-sm text-gray-500">Context</div>
        <div className="text-2xl font-bold text-gray-800 mt-2">{context.intro}</div>
        {taskType === 'find_question' && context.answer && (
          <div className="mt-3 text-sm text-gray-500">Answer: {context.answer}</div>
        )}
        {taskType === 'mini_interview' && step?.prompt && (
          <div className="mt-3 text-sm text-gray-500">Step {gameState.questionStep + 1}: {step.prompt}</div>
        )}
      </div>

      {scrambledQuestions.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="text-xs text-gray-500 mb-2">Question Hints (unscramble these)</div>
          <div className="flex flex-wrap gap-2 text-sm">
            {scrambledQuestions.map((text, idx) => (
              <span key={`scramble-${idx}`} className="px-2 py-1 bg-purple-50 border border-purple-200 rounded-full">{text}</span>
            ))}
          </div>
        </div>
      )}

      {feedback && (
        <div className={`p-4 mb-4 rounded-lg ${feedback.type === 'success' ? 'bg-green-50 border border-green-300' : 'bg-red-50 border border-red-300'}`}>
          <div className={feedback.type === 'success' ? 'text-green-800' : 'text-red-800'}>{feedback.message}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={hasMicUsed ? "Type your question..." : "🔒 PRESS MIC TO SPEAK FIRST!"}
            className={`w-full px-4 py-3 border-2 rounded-lg ${
              !hasMicUsed 
                ? 'bg-slate-100 border-slate-300 cursor-not-allowed text-slate-400' 
                : 'border-gray-300'
            }`}
            disabled={!hasMicUsed}
          />
        </div>
        <button
          type="button"
          onClick={handleMicClick}
          className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 ${
            isListening 
              ? 'bg-purple-500 text-white animate-pulse' 
              : hasMicUsed 
                ? 'bg-green-500 text-white' 
                : 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white hover:shadow-lg hover:scale-105'
          }`}
          title="Speak your question"
        >
          <span className="text-2xl">🎤</span>
          <span className="text-sm">{isListening ? 'Listening...' : hasMicUsed ? '✓' : 'MIC'}</span>
        </button>
        <button type="submit" className="px-6 py-3 bg-purple-500 text-white rounded-lg" disabled={!hasMicUsed}>Check</button>
      </form>

      <div className="text-xs text-gray-400 mt-4 text-center">Turn {turnCount}</div>

      {isGameComplete() && (
        <div className="mt-6 bg-purple-100 border border-purple-300 rounded-lg p-4 text-center">
          Great job! You completed the questions.
        </div>
      )}
    </div>
  );
}
