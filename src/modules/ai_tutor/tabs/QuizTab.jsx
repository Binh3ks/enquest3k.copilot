import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Trophy, RotateCcw, Sparkles, Gamepad2 } from 'lucide-react';
import { useUserStore } from '../../../stores/useUserStore';
import { getCurrentWeekData } from '../../../data/weekData';
import { textToSpeech } from '../../../services/ai_tutor/ttsEngine';
import useTutorStore from '../../../services/ai_tutor/tutorStore';
import { useLocation } from 'react-router-dom';
import { NovaEngine } from '../../../services/ai_tutor/novaEngine';

const QuizTab = () => {
  const location = useLocation();
  const weekNumber = parseInt(location.pathname.match(/\/week\/(\d+)/)?.[1] || '1');
  const currentWeek = `week-${weekNumber}`;
  const userName = useUserStore(state => state.name) || 'Student';
  
  const [weekData, setWeekData] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [error, setError] = useState(null);
  const [showMenu, setShowMenu] = useState(true); // Show game selection menu

  const autoPlayEnabled = useTutorStore(state => state.autoPlayEnabled);

  const loadGame = async (gameType) => {
    try {
      setLoading(true);
      setError(null);
      setShowMenu(false); // Hide menu
      
      console.log('Nova Arcade loading:', currentWeek, '- Game type:', gameType);
      const data = await getCurrentWeekData(currentWeek);
      setWeekData(data);
      
      const novaEngine = new NovaEngine(data, { name: userName, age: 8 });
      
      console.log('Generating quiz game...');
      const response = await novaEngine.sendToNova({
        mode: 'quiz_game',
        userMessage: 'Generate a quiz game',
        chatHistory: [],
        context: { weekId: weekNumber, weekData: data, gameType } // Pass game type
      });
      
      let gameJson;
      if (typeof response === 'string') gameJson = JSON.parse(response);
      else if (response.text) gameJson = JSON.parse(response.text);
      else if (response.content) gameJson = JSON.parse(response.content);
      else gameJson = response;
      
      setGameData(gameJson);
      
      if (autoPlayEnabled && gameJson.intro_text) {
        await textToSpeech(gameJson.intro_text, { mode: 'conversation', autoPlay: true });
      }
    } catch (err) {
      console.error('Failed to load quiz:', err);
      setError(err.message || 'Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };
    
  const handleGameSelect = (gameType) => {
    loadGame(gameType);
  };

  const handleAnswerClick = async (answer) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);

    const round = gameData.rounds[currentRound];
    const isCorrect = answer.toLowerCase().trim() === round.correct_answer.toLowerCase().trim();
    
    if (isCorrect) setScore(prev => prev + 1);

    if (autoPlayEnabled) {
      const feedback = isCorrect ? "Correct! Well done!" : `Not quite. ${round.explanation}`;
      try {
        await textToSpeech(feedback, { mode: 'conversation', autoPlay: true });
      } catch (err) {
        console.error('TTS Error:', err);
      }
    }
  };

  const handleNext = () => {
    if (currentRound < gameData.rounds.length - 1) {
      setCurrentRound(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setGameComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentRound(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setGameComplete(false);
    setShowMenu(true);
    setGameData(null); // Clear game data
  };

  const handleBackToMenu = () => {
    setShowMenu(true);
    setGameData(null);
    setCurrentRound(0);
    setScore(0);
    setGameComplete(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const gameTypes = [
    { id: 'emoji_detective', name: 'Emoji Detective', icon: '🕵️‍♀️', desc: 'Guess words from emoji puzzles', color: 'from-yellow-400 to-orange-500' },
    { id: 'broken_robot', name: 'Broken Robot', icon: '🤖', desc: 'Fix grammar mistakes', color: 'from-blue-400 to-cyan-500' },
    { id: 'sentence_builder', name: 'Sentence Builder', icon: '🧱', desc: 'Build sentences from blocks', color: 'from-green-400 to-emerald-500' },
    { id: 'true_false', name: 'True or False', icon: '❓', desc: 'Answer fun fact questions', color: 'from-pink-400 to-rose-500' }
  ];

  if (showMenu) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
        <div className="bg-white border-b border-purple-200 px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800">🎮 Nova Arcade</h2>
              <p className="text-xs text-gray-500">Choose your game!</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Select a Game</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gameTypes.map((game) => (
                <button
                  key={game.id}
                  onClick={() => handleGameSelect(game.id)}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 text-left border-2 border-transparent hover:border-purple-300"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${game.color} rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity`} />
                  <div className="relative">
                    <div className="text-5xl mb-3">{game.icon}</div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{game.name}</h4>
                    <p className="text-sm text-gray-600">{game.desc}</p>
                    <div className="mt-4 text-purple-600 font-medium text-sm group-hover:translate-x-1 transition-transform inline-block">
                      Play Now →
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-50 to-pink-50">
        <Gamepad2 size={48} className="text-purple-500 animate-pulse mb-4" />
        <p className="text-gray-600 font-medium">Đang tạo game...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-red-50 to-orange-50">
        <XCircle size={48} className="text-red-500 mb-4" />
        <p className="text-gray-800 font-medium mb-2">Lỗi tải game</p>
        <p className="text-gray-600 text-sm mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Thử Lại
        </button>
      </div>
    );
  }

  if (!gameData || !gameData.rounds || gameData.rounds.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading game data...</p>
      </div>
    );
  }

  const round = gameData.rounds[currentRound];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <div className="bg-white border-b border-purple-200 px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button onClick={handleBackToMenu} className="text-purple-600 hover:text-purple-800 transition-colors">
              <RotateCcw size={18} />
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-gray-800">🎮 Nova Arcade</h2>
              <p className="text-xs text-gray-500">Learn through games!</p>
            </div>
          </div>
          {!gameComplete && (
            <div className="text-right">
              <p className="text-xs font-medium text-gray-700">Score: {score}/{gameData.rounds.length}</p>
              <p className="text-xs text-purple-600">Week {weekNumber}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        {gameComplete ? (
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy size={48} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">Complete! 🎉</h3>
            <p className="text-xl text-gray-600 mb-4">
              Score: <span className="font-bold text-purple-600">{score}</span> / {gameData.rounds.length}
            </p>
            <div className="bg-white rounded-xl p-6 mb-6">
              <div className="text-6xl mb-3">
                {score === gameData.rounds.length ? '🌟' : score >= gameData.rounds.length * 0.6 ? '😊' : '💪'}
              </div>
              <p className="text-lg font-medium text-gray-700">
                {score === gameData.rounds.length ? 'Perfect!' : score >= gameData.rounds.length * 0.6 ? 'Great job!' : 'Keep trying!'}
              </p>
            </div>
            <button onClick={handleReset} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center space-x-2 mx-auto font-bold">
              <RotateCcw size={20} />
              <span>Play Again</span>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-4 max-w-2xl w-full">
            <div className="mb-3 text-center">
              <div className="inline-block px-3 py-1 bg-purple-100 rounded-full mb-2">
                <h3 className="text-sm font-bold text-purple-700">
                  {gameData.game_type === 'emoji_detective' && '🕵️‍♀️ Emoji Detective'}
                  {gameData.game_type === 'broken_robot' && '🤖 Broken Robot'}
                  {gameData.game_type === 'sentence_builder' && '🧱 Sentence Builder'}
                  {gameData.game_type === 'true_false' && '❓ True or False'}
                </h3>
              </div>
              <p className="text-xs text-gray-600">Round {currentRound + 1} / {gameData.rounds.length}</p>
            </div>

            <div className="mb-4 text-center">
              <div className="text-3xl mb-3">{round.question}</div>
              {gameData.game_type === 'emoji_detective' && (
                <p className="text-sm text-purple-600 italic font-medium">Guess the word from the emojis!</p>
              )}
              {gameData.game_type === 'broken_robot' && (
                <p className="text-sm text-orange-600 italic font-medium">Find the correct sentence!</p>
              )}
              {gameData.game_type === 'sentence_builder' && (
                <p className="text-sm text-blue-600 italic font-medium">Choose the correct sentence order!</p>
              )}
              {gameData.game_type === 'true_false' && (
                <p className="text-sm text-green-600 italic font-medium">Is this statement true or false?</p>
              )}
            </div>

            {gameData.game_type === 'true_false' ? (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button onClick={() => handleAnswerClick('true')} disabled={isAnswered} 
                  className={`p-6 rounded-xl border-2 transition-all ${isAnswered ? selectedAnswer === 'true' ? round.correct_answer === 'true' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500' : 'opacity-50' : 'hover:bg-green-50'}`}>
                  <div className="text-5xl mb-2">✅</div>
                  <div className="text-lg font-bold">TRUE</div>
                </button>
                <button onClick={() => handleAnswerClick('false')} disabled={isAnswered}
                  className={`p-6 rounded-xl border-2 transition-all ${isAnswered ? selectedAnswer === 'false' ? round.correct_answer === 'false' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500' : 'opacity-50' : 'hover:bg-red-50'}`}>
                  <div className="text-5xl mb-2">❌</div>
                  <div className="text-lg font-bold">FALSE</div>
                </button>
              </div>
            ) : (
              <div className="space-y-2 mb-6">
                {round.options?.map((option, idx) => {
                  const isCorrect = option.toLowerCase() === round.correct_answer.toLowerCase();
                  const isSelected = option === selectedAnswer;
                  return (
                    <button key={idx} onClick={() => handleAnswerClick(option)} disabled={isAnswered}
                      className={`w-full p-3 text-left rounded-lg border-2 transition ${!isAnswered ? 'hover:border-purple-500' : isSelected ? isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500' : isCorrect ? 'bg-green-50 border-green-500' : 'opacity-50'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{option}</span>
                        {isAnswered && isSelected && (isCorrect ? <CheckCircle2 size={18} className="text-green-600" /> : <XCircle size={18} className="text-red-600" />)}
                        {isAnswered && !isSelected && isCorrect && <CheckCircle2 size={18} className="text-green-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {isAnswered && (
              <div className="pt-3 border-t">
                <div className="bg-blue-50 rounded-lg p-3 mb-3">
                  <p className="text-xs"><span className="font-bold">Explanation:</span> {round.explanation}</p>
                </div>
                <button onClick={handleNext} className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold text-sm">
                  {currentRound < gameData.rounds.length - 1 ? 'Next →' : 'Finish! 🎉'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {!gameComplete && (
        <div className="bg-white border-t p-2">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600">Progress</span>
              <span className="text-xs font-medium">{currentRound + 1} / {gameData.rounds.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all" 
                style={{ width: `${((currentRound + 1) / gameData.rounds.length) * 100}%` }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizTab;
