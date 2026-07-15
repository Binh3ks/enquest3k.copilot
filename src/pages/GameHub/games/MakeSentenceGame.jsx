import { useEffect, useRef, useState } from 'react';
import { useGameValidation } from '../hooks/useGameValidation';
import { getGameData } from '../../../config/gameAdaptation';

export default function MakeSentenceGame({ weekNumber, learningMode = 'advanced', onGameComplete }) {
  const {
    gameState,
    initializeGame,
    validateInput,
    isGameComplete,
    getProgress,
    turnCount
  } = useGameValidation('make_sentence', weekNumber, learningMode);

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
    // Reset mic state when sentence or step changes
    setHasMicUsed(false);
    setUserInput('');
  }, [gameState?.patternIndex, gameState?.step]);

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
        onGameComplete({ gameId: 'make_sentence' });
      }
    }
  }, [isGameComplete, onGameComplete]);

  if (!gameState) {
    return <div className="text-center py-20">Loading...</div>;
  }

  const progress = getProgress();
  const gameData = getGameData(weekNumber, learningMode, 'make_sentence') || {};
  const sentences = (learningMode === 'easy' ? gameData.sentences_easy : gameData.sentences_advanced) || [];
  const currentIndex = gameState.patternIndex % Math.max(sentences.length, 1);
  const sentenceData = sentences[currentIndex] || { scrambled: [], answer: '' };
  const scrambledWords = sentenceData.scrambled || [];
  const timePhrases = sentenceData.time_phrases || [];
  const locationPhrases = sentenceData.location_phrases || [];
  const instruction = learningMode === 'easy' ? gameData.instructions_easy : gameData.instructions_advanced;
  const step = gameState.step || 1;
  const stepsTotal = gameState.stepsTotal || 1;
  
  const stepLabel = step === 1
    ? 'Step 1: Unscramble the sentence'
    : step === 2
      ? 'Step 2: Add WHEN (time phrase)'
      : 'Step 3: Add WHERE (location phrase)';
  
  const stepColor = step === 1 ? 'indigo' : step === 2 ? 'blue' : 'purple';

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
    if (result.correct) {
      setFeedback({ type: 'success', message: result.feedback });
      setUserInput('');
    } else {
      setFeedback({ type: 'error', message: result.feedback });
    }
  };

  return (
    <div className="make-sentence-game max-w-3xl mx-auto p-6">
      <div className={`bg-gradient-to-r from-${stepColor}-500 to-${stepColor}-600 text-white rounded-lg p-6 mb-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">🚀 Sentence Expander</h2>
            <p className={`text-${stepColor}-100 mt-1`}>{stepLabel}</p>
            {stepsTotal > 1 && (
              <div className="text-xs text-white/80 mt-1">Step {step}/{stepsTotal}</div>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-indigo-100">Progress</div>
            <div className="text-2xl font-bold">{progress.current}/{progress.total}</div>
          </div>
        </div>
      </div>

      {instruction && step === 1 && (
        <div className={`bg-${stepColor}-50 border border-${stepColor}-200 rounded-lg p-4 mb-4 text-sm text-${stepColor}-800`}>
          {instruction}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        {step === 1 && (
          <>
            <div className="text-sm text-gray-500 mb-3">Scrambled Words</div>
            <div className="flex flex-wrap gap-3 justify-center">
              {scrambledWords.map((word, idx) => (
                <span key={`word-${idx}`} className={`px-4 py-2 bg-${stepColor}-50 border-2 border-${stepColor}-300 rounded-lg text-lg font-medium text-${stepColor}-800`}>
                  {word}
                </span>
              ))}
            </div>
          </>
        )}
        
        {step === 2 && (
          <>
            <div className="text-sm text-gray-500 mb-3">Base Sentence + WHEN?</div>
            <div className="text-base text-gray-700 mb-4 font-medium">
              {sentenceData.answer}
            </div>
            <div className="text-xs text-gray-500 mb-2">Choose a time phrase to add:</div>
            <div className="flex flex-wrap gap-2">
              {timePhrases.map((phrase, idx) => (
                <span key={`time-${idx}`} className="px-3 py-1 bg-blue-50 border border-blue-300 rounded-full text-sm text-blue-700">
                  {phrase}
                </span>
              ))}
            </div>
          </>
        )}
        
        {step === 3 && (
          <>
            <div className="text-sm text-gray-500 mb-3">Add WHERE to complete your sentence</div>
            <div className="text-base text-gray-700 mb-4 font-medium">
              {sentenceData.answer} <span className="text-blue-600">[+ time]</span>
            </div>
            <div className="text-xs text-gray-500 mb-2">Choose a location phrase to add:</div>
            <div className="flex flex-wrap gap-2">
              {locationPhrases.map((phrase, idx) => (
                <span key={`loc-${idx}`} className="px-3 py-1 bg-purple-50 border border-purple-300 rounded-full text-sm text-purple-700">
                  {phrase}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {feedback && (
        <div className={`p-4 mb-4 rounded-lg ${feedback.type === 'success' ? 'bg-green-50 border border-green-300' : 'bg-red-50 border border-red-300'}`}>
          <div className={feedback.type === 'success' ? 'text-green-800' : 'text-red-800'}>{feedback.message}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          {step >= 2 ? (
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={hasMicUsed ? "Type your expanded sentence..." : "🔒 PRESS MIC TO SPEAK FIRST!"}
              className={`w-full px-4 py-3 border-2 rounded-lg resize-none ${
                !hasMicUsed 
                  ? 'bg-slate-100 border-slate-300 cursor-not-allowed text-slate-400' 
                  : 'border-gray-300'
              }`}
              rows={3}
              disabled={!hasMicUsed}
            />
          ) : (
            <input
              ref={inputRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={hasMicUsed ? "Type your sentence..." : "🔒 PRESS MIC TO SPEAK FIRST!"}
              className={`w-full px-4 py-3 border-2 rounded-lg ${
                !hasMicUsed 
                  ? 'bg-slate-100 border-slate-300 cursor-not-allowed text-slate-400' 
                  : 'border-gray-300'
              }`}
              disabled={!hasMicUsed}
            />
          )}
        </div>
        <button
          type="button"
          onClick={handleMicClick}
          className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 ${
            isListening 
              ? `bg-${stepColor}-500 text-white animate-pulse`
              : hasMicUsed 
                ? 'bg-green-500 text-white' 
                : `bg-gradient-to-br from-${stepColor}-500 to-indigo-500 text-white hover:shadow-lg hover:scale-105`
          }`}
          title="Speak your answer"
        >
          <span className="text-2xl">🎤</span>
          <span className="text-sm">{isListening ? 'Listening...' : hasMicUsed ? '✓' : 'MIC'}</span>
        </button>
        <button type="submit" className={`px-6 py-3 bg-${stepColor}-500 text-white rounded-lg`} disabled={!hasMicUsed}>Check</button>
      </form>

      <div className="text-xs text-gray-400 mt-4 text-center">Turn {turnCount}</div>

      {isGameComplete() && (
        <div className="mt-6 bg-green-100 border border-green-300 rounded-lg p-4 text-center">
          <div className="text-green-800 font-bold text-lg">🎉 Amazing work!</div>
          <div className="text-green-700 text-sm mt-1">You expanded all sentences perfectly!</div>
        </div>
      )}
    </div>
  );
}
