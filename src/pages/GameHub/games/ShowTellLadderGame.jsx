import { useEffect, useRef, useState } from 'react';
import { useGameValidation } from '../hooks/useGameValidation';
import { speakText } from '../../../utils/AudioHelper';
import { getGameData } from '../../../config/gameAdaptation';

const WORD_DEFINITIONS = {
  name: 'What people call you.',
  desk: 'A table you use for studying or working.'
};

function isUsableEmoji(emoji) {
  return Boolean(emoji && !/[a-z0-9]/i.test(emoji));
}

export default function ShowTellLadderGame({ weekNumber, learningMode = 'advanced', onGameComplete }) {
  const {
    gameState,
    initializeGame,
    validateInput,
    isGameComplete,
    getProgress,
    turnCount
  } = useGameValidation('show_tell', weekNumber, learningMode);

  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [hasMicUsed, setHasMicUsed] = useState(false);
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);
  const completionRef = useRef(false);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    // Reset audio reveal when word or step changes
    setHasPlayedAudio(false);
  }, [gameState?.wordIndex, gameState?.step]);

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
        onGameComplete({ gameId: 'show_tell' });
      }
    }
  }, [isGameComplete, onGameComplete]);

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

  const playWordAudio = async (word) => {
    if (!word || isPlayingAudio) return;
    setIsPlayingAudio(true);
    try {
      // Compute expected R2 CDN path for vocabulary word (matches new_word station naming)
      const audioBase = learningMode === 'easy' ? `/audio/week${weekNumber}_easy` : `/audio/week${weekNumber}`;
      const wordFile = word.replace(/\s+/g, '_').toLowerCase();
      const audioUrl = `${audioBase}/vocab_${wordFile}.mp3`;
      await speakText(word, audioUrl, 1.0, null, 'new_word', weekNumber, learningMode);
      // Reveal word text after audio finishes
      setHasPlayedAudio(true);
    } finally {
      setIsPlayingAudio(false);
    }
  };

  if (!gameState || !gameState.currentWord) {
    return <div className="text-center py-20">Loading...</div>;
  }

  const progress = getProgress();
  const gameData = getGameData(weekNumber, learningMode, 'show_tell') || {};
  const emojiMap = gameData.emoji_map || {};
  const word = gameState.currentWord;
  const emoji = emojiMap[word?.toLowerCase()];
  const definition = gameData.definitions?.[word?.toLowerCase()] || WORD_DEFINITIONS[word?.toLowerCase()];
  const step = gameState.step;
  const instruction = learningMode === 'easy' ? gameData.instructions_easy : gameData.instructions_advanced;
  const stepInstructions = gameData.step_instructions || {};
  const wordKey = word?.toLowerCase();
  const detailsDefault = (learningMode === 'easy' ? gameData.details_easy : gameData.details_advanced) || [];
  const distractorsDefault = (learningMode === 'easy' ? gameData.distractors_easy : gameData.distractors_advanced) || [];
  const framesDefault = (learningMode === 'easy' ? gameData.frames_easy : gameData.frames_advanced) || [];
  const detailMap = gameData.detail_map || {};
  const distractorMap = gameData.distractor_map || {};
  const frameMap = gameData.frame_map || {};
  const sentenceHintsMap = gameData.sentence_hints_map || {};
  const details = detailMap[wordKey] || detailsDefault;
  const distractors = distractorMap[wordKey] || distractorsDefault;
  const frames = frameMap[wordKey] || framesDefault;
  const sentenceHints = sentenceHintsMap[wordKey] || [];
  const stepInstruction = stepInstructions[step] || instruction;

  const buildScramble = (sentence) => {
    const clean = sentence.replace(/[.!?]$/, '');
    return clean.split(' ').reverse().join(' ');
  };
  const scrambleList = sentenceHints.map((text) => buildScramble(text));

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

  const stepLabel = step === 1
    ? 'Step 1: Say the word'
    : step === 2
      ? 'Step 2: Add one detail'
      : step === 3
        ? 'Step 3: Make a sentence'
        : step === 4
          ? 'Step 4: Add a second sentence'
          : 'Step 5: Tell a mini story';

  return (
    <div className="show-tell-game max-w-3xl mx-auto p-6">
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">🪜 Show & Tell Ladder</h2>
            <p className="text-orange-100 mt-1">{stepLabel}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-orange-100">Progress</div>
            <div className="text-2xl font-bold">{progress.current}/{progress.total}</div>
          </div>
        </div>
      </div>

      {stepInstruction && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4 text-sm text-orange-800">
          {stepInstruction}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-6">
        <div className="mb-6 min-h-[200px] flex flex-col items-center justify-center">
          {/* Show definition first (always visible) */}
          {definition && (
            <div className="text-xl text-gray-700 mb-6 italic max-w-md mx-auto font-medium">
              💡 "{definition}"
            </div>
          )}
          
          {/* Reveal word text only after audio is played */}
          {hasPlayedAudio ? (
            <div className="text-6xl font-bold text-purple-600 uppercase tracking-wider 
                            animate-bounce hover:scale-110 transition-transform duration-300">
              {word}
            </div>
          ) : (
            <div className="text-5xl text-gray-300">❓</div>
          )}
        </div>

        <button
          onClick={() => playWordAudio(word)}
          disabled={isPlayingAudio}
          className="px-8 py-4 bg-orange-500 text-white rounded-full font-bold text-lg
                     hover:bg-orange-600 transition-colors shadow-lg
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlayingAudio ? '🔊 Playing...' : '🔊 Hear Word'}
        </button>
      </div>

      {feedback && (
        <div className={`p-4 mb-4 rounded-lg ${feedback.type === 'success' ? 'bg-green-50 border border-green-300' : 'bg-red-50 border border-red-300'}`}>
          <div className={feedback.type === 'success' ? 'text-green-800' : 'text-red-800'}>{feedback.message}</div>
        </div>
      )}

      {step === 2 && (details.length > 0 || distractors.length > 0) && (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="text-xs text-gray-500 mb-2">Hints</div>
          <div className="flex flex-wrap gap-2 text-sm">
            {details.map((word) => (
              <span key={`detail-${word}`} className="px-2 py-1 bg-green-50 border border-green-200 rounded-full">{word}</span>
            ))}
            {distractors.map((word) => (
              <span key={`tricky-${word}`} className="px-2 py-1 bg-rose-50 border border-rose-200 rounded-full">{word}</span>
            ))}
          </div>
        </div>
      )}

      {step === 3 && scrambleList.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="text-xs text-gray-500 mb-2">Sentence Hints (unscramble these)</div>
          <div className="flex flex-wrap gap-2 text-sm">
            {scrambleList.map((text, idx) => (
              <span key={`scramble-${idx}`} className="px-2 py-1 bg-purple-50 border border-purple-200 rounded-full">{text}</span>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="text-xs text-gray-500 mb-2">Hint: Add another sentence about the same word</div>
          <div className="text-sm text-gray-700 px-3 py-2">
            💡 Make TWO complete sentences. Both should use "{word}" and have proper punctuation.
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="text-xs text-gray-500 mb-2">Connector Words for Stories</div>
          <div className="flex flex-wrap gap-2 text-sm">
            {/* Mode-aware connector hints: simple for W25-28 Advanced, full set for W29+ */}
            {learningMode === 'advanced' && weekNumber >= 25 && weekNumber < 29 ? (
              ['because', 'so', 'I think'].map((word) => (
                <span key={`connector-${word}`} className="px-3 py-1 bg-indigo-50 border border-indigo-300 rounded-full font-semibold">{word}</span>
              ))
            ) : (
              ['because', 'so', 'and', 'but', 'I think'].map((word) => (
                <span key={`connector-${word}`} className="px-3 py-1 bg-indigo-50 border border-indigo-300 rounded-full font-semibold">{word}</span>
              ))
            )}
          </div>
          <div className="text-xs text-gray-600 mt-2 px-3">
            💡 Use one of these words to connect your ideas and tell a mini story!
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          {step >= 4 ? (
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={hasMicUsed ? "Type your answer..." : "🔒 PRESS MIC TO SPEAK FIRST!"}
              className={`w-full px-4 py-3 border-2 rounded-lg resize-none ${
                !hasMicUsed 
                  ? 'bg-slate-100 border-slate-300 cursor-not-allowed text-slate-400' 
                  : 'border-gray-300'
              }`}
              rows={4}
              disabled={!hasMicUsed}
            />
          ) : (
            <input
              ref={inputRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={hasMicUsed ? "Type your answer..." : "🔒 PRESS MIC TO SPEAK FIRST!"}
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
              ? 'bg-orange-500 text-white animate-pulse' 
              : hasMicUsed 
                ? 'bg-green-500 text-white' 
                : 'bg-gradient-to-br from-orange-500 to-indigo-500 text-white hover:shadow-lg hover:scale-105'
          }`}
          title="Speak your answer"
        >
          <span className="text-2xl">🎤</span>
          <span className="text-sm">{isListening ? 'Listening...' : hasMicUsed ? '✓' : 'MIC'}</span>
        </button>
        <button type="submit" className="px-6 py-3 bg-orange-500 text-white rounded-lg" disabled={!hasMicUsed}>Check</button>
      </form>

      <div className="text-xs text-gray-400 mt-4 text-center">Turn {turnCount}</div>

      {isGameComplete() && (
        <div className="mt-6 bg-orange-100 border border-orange-300 rounded-lg p-4 text-center">
          Great job! You finished this ladder set.
        </div>
      )}
    </div>
  );
}
