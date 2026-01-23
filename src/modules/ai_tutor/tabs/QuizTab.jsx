import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Trophy, RotateCcw, Sparkles, Gamepad2 } from 'lucide-react';
import { useUserStore } from '../../../stores/useUserStore';
import { getCurrentWeekData } from '../../../data/weekData';
import { textToSpeech } from '../../../services/ai_tutor/ttsEngine';
import useTutorStore from '../../../services/ai_tutor/tutorStore';
import { useLocation } from 'react-router-dom';
import { NovaEngine } from '../../../services/ai_tutor/novaEngine';

/**
 * 🎮 NOVA ARCADE - Quiz Tab with Gamification
 * 
 * 4 Game Types:
 * 1. Emoji Detective 🕵️‍♀️ - Vocabulary puzzles with emojis
 * 2. Broken Robot 🤖 - Grammar correction challenges
 * 3. Sentence Builder 🧱 - Drag-and-drop sentence construction
 * 4. True or False ❌✅ - Quick comprehension challenges
 */
const QuizTab = () => {
  const location = useLocation();
  const weekNumber = parseInt(location.pathname.match(/\/week\/(\d+)/)?.[1] || '1');
  const currentWeek = `week-${weekNumber}`;
  const userName = useUserStore(state => state.name) || 'Student';
  
  const [weekData, setWeekData] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [error, setError] = useState(null);

  const autoPlayEnabled = useTutorStore(state => state.autoPlayEnabled);

  // Load week data and generate AI-powered game
  useEffect(() => {
    const loadGame = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🎮 Nova Arcade loading for:', currentWeek);
        const data = await getCurrentWeekData(currentWeek);
        setWeekData(data);
        
        // Create NovaEngine instance
        const novaEngine = new NovaEngine(data, { name: userName, age: 8 });
        
        // Request quiz game from AI
        console.log('🎲 Generating quiz game via NovaEngine...');
        const response = await novaEngine.sendToNova({
          mode: 'quiz_game',
          userMessage: 'Generate a quiz game',
          chatHistory: [],
          context: {
            weekId: weekNumber,
            weekData: data
          }
        });
        
        console.log('✅ Game generated:', response);
        
        // Parse game data from AI response
        let gameJson;
        if (typeof response === 'string') {
          gameJson = JSON.parse(response);
        } else if (response.text) {
          gameJson = JSON.parse(response.text);
        } else if (response.content) {
          gameJson = JSON.parse(response.content);
        } else {
          gameJson = response;
        }
        
        setGameData(gameJson);
        
        // Play intro text if available
        if (autoPlayEnabled && gameJson.intro_text) {
          await textToSpeech(gameJson.intro_text, {
            mode: 'conversation',
            autoPlay: true
          });
        }
        
      } catch (err) {
        console.error('❌ Failed to load quiz game:', err);
        setError(err.message || 'Failed to load quiz. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadGame();
  }, [currentWeek, userName, autoPlayEnabled, weekNumber]);

  // Handle answer selection
  const handleAnswerClick = async (answer) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);

    const currentRoundData = gameData.rounds[currentRound];
    const isCorrect = answer.toLowerCase().trim() === currentRoundData.correct_answer.toLowerCase().trim();
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Audio feedback
    if (autoPlayEnabled) {
      const feedback = isCorrect 
        ? "Chính xác! Tuyệt vời!" 
        : `Chưa đúng. ${currentRoundData.explanation}`;
      
      try {
        await textToSpeech(feedback, {
          mode: 'conversation',
          autoPlay: true
        });
      } catch (error) {
        console.error('TTS Error:', error);
      }
    }
  };

  // Move to next round
  const handleNext = () => {
    if (currentRound < gameData.rounds.length - 1) {
      setCurrentRound(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setGameComplete(true);
    }
  };

  // Reset game
  const handleReset = () => {
    setCurrentRound(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setGameComplete(false);
  };

  // Render game-specific UI based on game type
  const renderGameContent = () => {
    if (!gameData) return null;
    
    const round = gameData.rounds[currentRound];
    const gameType = gameData.game_type;

    // Game type configuration
    const gameInfo = {
      emoji_detective: { title: '🕵️‍♀️ Emoji Detective', color: 'purple' },
      broken_robot: { title: '🤖 Broken Robot', color: 'red' },
      sentence_builder: { title: '🧱 Sentence Builder', color: 'blue' },
      true_false: { title: '❌✅ True or False', color: 'green' }
    };

    const info = gameInfo[gameType] || { title: '🎮 Quiz Game', color: 'yellow' };

    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        {/* Game Type Header */}
        <div className="mb-6 text-center">
          <div className="inline-block px-4 py-2 bg-purple-100 rounded-full mb-3">
            <h3 className="text-lg font-bold text-purple-700">
              {info.title}
            </h3>
          </div>
          <p className="text-sm text-gray-600">
            Round {currentRound + 1} of {gameData.rounds.length}
          </p>
        </div>

        {/* Question Display - Different layout for each game type */}
        <div className="mb-8">
          {gameType === 'emoji_detective' && (
            <div className="text-center">
              <div className="text-6xl mb-4">{round.question}</div>
              <p className="text-sm text-gray-500">Từ vựng nào phù hợp?</p>
            </div>
          )}
          
          {gameType === 'broken_robot' && (
            <div>
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-3">
                <p className="text-xs text-red-600 mb-2">🤖 Robot bị lỗi nói:</p>
                <p className="text-lg font-mono text-gray-800">{round.question}</p>
              </div>
              <p className="text-sm text-gray-600">Hãy sửa lỗi ngữ pháp!</p>
            </div>
          )}
          
          {gameType === 'sentence_builder' && (
            <div>
              <p className="text-sm text-gray-600 mb-3">Xếp các từ thành câu hoàn chỉnh:</p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {round.question.split(' ').map((word, idx) => (
                  <span key={idx} className="px-4 py-2 bg-blue-100 border-2 border-blue-300 rounded-lg font-medium text-gray-800">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {gameType === 'true_false' && (
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800 mb-3">{round.question}</p>
              <p className="text-sm text-gray-500">Đúng hay Sai?</p>
            </div>
          )}
        </div>

        {/* Answer Options - True/False or Multiple Choice */}
        {gameType === 'true_false' ? (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => handleAnswerClick('true')}
              disabled={isAnswered}
              className={`p-6 rounded-xl border-3 transition-all ${
                isAnswered 
                  ? selectedAnswer === 'true'
                    ? round.correct_answer.toLowerCase() === 'true'
                      ? 'bg-green-100 border-green-500'
                      : 'bg-red-100 border-red-500'
                    : 'bg-gray-100 border-gray-300 opacity-50'
                  : 'bg-white border-gray-300 hover:border-green-500 hover:bg-green-50 cursor-pointer'
              }`}
            >
              <div className="text-5xl mb-2">✅</div>
              <div className="text-lg font-bold">ĐÚNG</div>
            </button>
            <button
              onClick={() => handleAnswerClick('false')}
              disabled={isAnswered}
              className={`p-6 rounded-xl border-3 transition-all ${
                isAnswered 
                  ? selectedAnswer === 'false'
                    ? round.correct_answer.toLowerCase() === 'false'
                      ? 'bg-green-100 border-green-500'
                      : 'bg-red-100 border-red-500'
                    : 'bg-gray-100 border-gray-300 opacity-50'
                  : 'bg-white border-gray-300 hover:border-red-500 hover:bg-red-50 cursor-pointer'
              }`}
            >
              <div className="text-5xl mb-2">❌</div>
              <div className="text-lg font-bold">SAI</div>
            </button>
          </div>
        ) : (
          <div className="space-y-2 mb-6">
            {round.options?.map((option, index) => {
              const isCorrect = option.toLowerCase().trim() === round.correct_answer.toLowerCase().trim();
              const isSelected = option === selectedAnswer;
              
              let buttonClass = 'w-full p-3 text-left rounded-lg border-2 transition-all duration-200 ';
              
              if (!isAnswered) {
                buttonClass += 'border-gray-300 hover:border-purple-500 hover:bg-purple-50 cursor-pointer';
              } else {
                if (isSelected) {
                  buttonClass += isCorrect 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-red-500 bg-red-50';
                } else if (isCorrect) {
                  buttonClass += 'border-green-500 bg-green-50';
                } else {
                  buttonClass += 'border-gray-200 bg-gray-50 opacity-50';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  disabled={isAnswered}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800">{option}</span>
                    {isAnswered && isSelected && (
                      isCorrect ? (
                        <CheckCircle2 size={18} className="text-green-600" />
                      ) : (
                        <XCircle size={18} className="text-red-600" />
                      )
                    )}
                    {isAnswered && !isSelected && isCorrect && (
                      <CheckCircle2 size={18} className="text-green-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Feedback & Next Button */}
        {isAnswered && (
          <div className="pt-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700">
                <span className="font-bold">Giải thích:</span> {round.explanation}
              </p>
              {round.hint && (
                <p className="text-xs text-gray-600 mt-2">
                  💡 {round.hint}
                </p>
              )}
            </div>
            <button
              onClick={handleNext}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors font-bold flex items-center justify-center space-x-2"
            >
              <span>{currentRound < gameData.rounds.length - 1 ? 'Round Tiếp Theo →' : 'Hoàn Thành! 🎉'}</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-50 to-pink-50">
        <Gamepad2 size={48} className="text-purple-500 animate-pulse mb-4" />
        <p className="text-gray-600 font-medium">🎮 Đang tạo game...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-red-50 to-orange-50">
        <XCircle size={48} className="text-red-500 mb-4" />
        <p className="text-gray-800 font-medium mb-2">Lỗi tải game</p>
        <p className="text-gray-600 text-sm mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Thử Lại
        </button>
      </div>
    );
  }

  if (!weekData || !gameData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading quiz...</p>
      </div>
    );
  }

  if (!weekData || !gameData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading quiz...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white border-b border-purple-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800">🎮 Nova Arcade</h2>
              <p className="text-xs text-gray-500">Học qua game vui vẻ!</p>
            </div>
          </div>

          {!gameComplete && gameData && (
            <div className="text-right">
              <p className="text-xs font-medium text-gray-700">
                Score: {score} / {gameData.rounds.length}
              </p>
              <p className="text-xs text-purple-600">
                Week {weekNumber}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        {gameComplete ? (
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Trophy size={48} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              Hoàn Thành! 🎉
            </h3>
            <p className="text-xl text-gray-600 mb-4">
              Điểm: <span className="font-bold text-purple-600">{score}</span> / <span className="font-bold">{gameData.rounds.length}</span>
            </p>
            
            <div className="bg-white rounded-xl p-6 mb-6">
              <div className="text-6xl mb-3">
                {score === gameData.rounds.length ? '🌟' : score >= gameData.rounds.length * 0.6 ? '😊' : '💪'}
              </div>
              <p className="text-lg font-medium text-gray-700">
                {score === gameData.rounds.length 
                  ? 'Hoàn hảo! Em giỏi quá!' 
                  : score >= gameData.rounds.length * 0.6 
                  ? 'Tốt lắm! Tiếp tục phát huy nhé!' 
                  : 'Cố lên! Chơi lại để cải thiện!'}
              </p>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center space-x-2 mx-auto font-bold"
            >
              <RotateCcw size={20} />
              <span>Chơi Game Khác</span>
            </button>
          </div>
        ) : (
          renderGameContent()
        )}
      </div>

      {/* Progress Bar */}
      {!gameComplete && gameData && (
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Tiến độ</span>
              <span className="text-sm font-medium text-gray-800">
                {currentRound + 1} / {gameData.rounds.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentRound + 1) / gameData.rounds.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizTab;
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(answer)}
                    disabled={isAnswered}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-800">{answer}</span>
                      {isAnswered && isSelected && (
                        isCorrect ? (
                          <CheckCircle2 size={18} className="text-green-600" />
                        ) : (
                          <XCircle size={18} className="text-red-600" />
                        )
                      )}
                      {isAnswered && !isSelected && isCorrect && (
                        <CheckCircle2 size={18} className="text-green-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback & Next Button */}
            {isAnswered && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <p className={`text-lg font-medium ${
                    selectedAnswer === currentQuestion.correctAnswer 
                      ? 'text-green-700' 
                      : 'text-red-700'
                  }`}>
                    {selectedAnswer === currentQuestion.correctAnswer 
                      ? '✨ Correct! Well done!' 
                      : `💡 The correct answer is: ${currentQuestion.correctAnswer}`}
                  </p>
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                  >
                    {currentQuestionIndex < totalQuestions - 1 ? 'Next →' : 'Finish'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {!quizComplete && (
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-medium text-gray-800">
                {currentQuestionIndex + 1} / {totalQuestions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizTab;
