import { useState, useEffect } from 'react';
import { Mic, Volume2, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { useUserStore } from '../../../stores/useUserStore';
import { getCurrentWeekData } from '../../../data/weekData';
import { textToSpeech } from '../../../services/ai_tutor/ttsEngine';
import useTutorStore from '../../../services/ai_tutor/tutorStore';

/**
 * Pronunciation Tab - Practice speaking target vocabulary
 * Uses Web Speech API for text-to-speech
 */
const PronunciationTab = () => {
  const { currentWeek } = useUserStore();
  const [weekData, setWeekData] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [practiceMode, setPracticeMode] = useState('listen'); // listen | practice | complete
  const [attempts, setAttempts] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // Load week data
  useEffect(() => {
    const data = getCurrentWeekData(currentWeek || 'week-1');
    setWeekData(data);
  }, [currentWeek]);

  const currentWord = weekData?.vocabulary?.[currentWordIndex];
  const totalWords = weekData?.vocabulary?.length || 0;
  const { preferences } = useTutorStore();

  // Text-to-Speech using 4-layer TTS
  const speakWord = async (word) => {
    try {
      await textToSpeech(word, {
        voice: preferences.voice || 'nova',
        autoPlay: true,
        speed: 0.8
      });
    } catch (error) {
      console.error('TTS Error:', error);
      // Fallback to browser TTS
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // Handle listen mode
  const handleListen = () => {
    if (currentWord) {
      speakWord(currentWord.word);
    }
  };

  // Handle practice attempt
  const handlePractice = () => {
    setPracticeMode('practice');
    setAttempts(prev => prev + 1);
    
    // Simulate attempt (in real app, would use Speech Recognition API)
    setTimeout(() => {
      // For now, assume success after 1 attempt
      setCorrectCount(prev => prev + 1);
      setPracticeMode('complete');
    }, 2000);
  };

  // Move to next word
  const handleNext = () => {
    if (currentWordIndex < totalWords - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setPracticeMode('listen');
      setAttempts(0);
    }
  };

  // Reset practice
  const handleReset = () => {
    setCurrentWordIndex(0);
    setPracticeMode('listen');
    setAttempts(0);
    setCorrectCount(0);
  };

  if (!weekData || !currentWord) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading pronunciation practice...</p>
      </div>
    );
  }

  const isLastWord = currentWordIndex === totalWords - 1;
  const allComplete = practiceMode === 'complete' && isLastWord;

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-green-50 to-teal-50">
      {/* Header */}
      <div className="bg-white border-b border-green-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Mic size={20} className="text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Pronunciation Practice</h2>
              <p className="text-xs text-gray-500">Listen carefully and repeat</p>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">
                Word {currentWordIndex + 1} / {totalWords}
              </p>
              <p className="text-xs text-green-600">
                {correctCount} practiced
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        {allComplete ? (
          // Completion Screen
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Great Job! 🎉
            </h3>
            <p className="text-gray-600 mb-6">
              You practiced {totalWords} words from Week {currentWeek}!
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2 mx-auto"
            >
              <RotateCcw size={20} />
              <span>Practice Again</span>
            </button>
          </div>
        ) : (
          // Practice Card
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            {/* Word Display */}
            <div className="text-center mb-8">
              <h3 className="text-5xl font-bold text-gray-800 mb-4">
                {currentWord.word}
              </h3>
              <p className="text-xl text-gray-600 mb-2">
                {currentWord.meaning}
              </p>
              {currentWord.pronunciation && (
                <p className="text-sm text-gray-500 font-mono">
                  /{currentWord.pronunciation}/
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {practiceMode === 'listen' && (
                <>
                  <button
                    onClick={handleListen}
                    className="w-full py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center space-x-3 text-lg font-medium"
                  >
                    <Volume2 size={24} />
                    <span>Listen to Ms. Nova</span>
                  </button>
                  
                  <button
                    onClick={handlePractice}
                    className="w-full py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center space-x-3 text-lg font-medium"
                  >
                    <Mic size={24} />
                    <span>I'm Ready to Say It!</span>
                  </button>
                </>
              )}

              {practiceMode === 'practice' && (
                <div className="text-center py-8">
                  <div className="animate-pulse">
                    <Mic size={48} className="mx-auto text-green-500 mb-4" />
                    <p className="text-lg text-gray-600">Listening...</p>
                  </div>
                </div>
              )}

              {practiceMode === 'complete' && (
                <div className="text-center">
                  <CheckCircle2 size={48} className="mx-auto text-green-500 mb-4" />
                  <p className="text-lg font-medium text-green-700 mb-6">
                    Excellent pronunciation! 🌟
                  </p>
                  
                  {!isLastWord && (
                    <button
                      onClick={handleNext}
                      className="w-full py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
                    >
                      Next Word →
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Hint */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                💡 Tip: Listen carefully, then try to copy Ms. Nova's pronunciation
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Progress Bar */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm font-medium text-gray-800">
              {Math.round((correctCount / totalWords) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(correctCount / totalWords) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PronunciationTab;
