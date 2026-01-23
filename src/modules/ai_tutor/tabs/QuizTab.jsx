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
  const [loading, setLoading] = useState(true);
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [error, setError] = useState(null);

  const autoPlayEnabled = useTutorStore(state => state.autoPlayEnabled);

  useEffect(() => {
    const loadGame = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Nova Arcade loading:', currentWeek);
        const data = await getCurrentWeekData(currentWeek);
        setWeekData(data);
        
        const novaEngine = new NovaEngine(data, { name: userName, age: 8 });
        
        console.log('Generating quiz game...');
        const response = await novaEngine.sendToNova({
          mode: 'quiz_game',
          userMessage: 'Generate a quiz game',
          chatHistory: [],
          context: { weekId: weekNumber, weekData: data }
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
    
    loadGame();
  }, [currentWeek, userName, autoPlayEnabled, weekNumber]);

  const handleAnswerClick = async (answer) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);

    const round = gameData.rounds[currentRound];
    const isCorrect = answer.toLowerCase().trim() === round.correct_answer.toLowerCase().trim();
    
    if (isCorrect) setScore(prev => prev + 1);

    if (autoPlayEnabled) {
      const feedback = isCorrect ? "Chính xác!" : `Chưa đúng. ${round.explanation}`;
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
  };

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
      <div className="bg-white border-b border-purple-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800">🎮 Nova Arcade</h2>
              <p className="text-xs text-gray-500">Học qua game!</p>
            </div>
          </div>
          {!gameComplete && (
            <div className="text-right">
              <p className="text-xs font-medium text-gray-700">Score: {score} / {gameData.rounds.length}</p>
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
            <h3 className="text-3xl font-bold text-gray-800 mb-2">Hoàn Thành! 🎉</h3>
            <p className="text-xl text-gray-600 mb-4">
              Điểm: <span className="font-bold text-purple-600">{score}</span> / {gameData.rounds.length}
            </p>
            <div className="bg-white rounded-xl p-6 mb-6">
              <div className="text-6xl mb-3">
                {score === gameData.rounds.length ? '🌟' : score >= gameData.rounds.length * 0.6 ? '😊' : '💪'}
              </div>
              <p className="text-lg font-medium text-gray-700">
                {score === gameData.rounds.length ? 'Hoàn hảo!' : score >= gameData.rounds.length * 0.6 ? 'Tốt lắm!' : 'Cố lên!'}
              </p>
            </div>
            <button onClick={handleReset} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center space-x-2 mx-auto font-bold">
              <RotateCcw size={20} />
              <span>Chơi Lại</span>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
            <div className="mb-6 text-center">
              <div className="inline-block px-4 py-2 bg-purple-100 rounded-full mb-3">
                <h3 className="text-lg font-bold text-purple-700">{gameData.game_type}</h3>
              </div>
              <p className="text-sm text-gray-600">Round {currentRound + 1} / {gameData.rounds.length}</p>
            </div>

            <div className="mb-8 text-center">
              <div className="text-4xl mb-4">{round.question}</div>
            </div>

            {gameData.game_type === 'true_false' ? (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button onClick={() => handleAnswerClick('true')} disabled={isAnswered} 
                  className={`p-6 rounded-xl border-2 transition-all ${isAnswered ? selectedAnswer === 'true' ? round.correct_answer === 'true' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500' : 'opacity-50' : 'hover:bg-green-50'}`}>
                  <div className="text-5xl mb-2">✅</div>
                  <div className="text-lg font-bold">ĐÚNG</div>
                </button>
                <button onClick={() => handleAnswerClick('false')} disabled={isAnswered}
                  className={`p-6 rounded-xl border-2 transition-all ${isAnswered ? selectedAnswer === 'false' ? round.correct_answer === 'false' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500' : 'opacity-50' : 'hover:bg-red-50'}`}>
                  <div className="text-5xl mb-2">❌</div>
                  <div className="text-lg font-bold">SAI</div>
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
              <div className="pt-6 border-t">
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <p className="text-sm"><span className="font-bold">Giải thích:</span> {round.explanation}</p>
                </div>
                <button onClick={handleNext} className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold">
                  {currentRound < gameData.rounds.length - 1 ? 'Tiếp Theo →' : 'Hoàn Thành! 🎉'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {!gameComplete && (
        <div className="bg-white border-t p-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Tiến độ</span>
              <span className="text-sm font-medium">{currentRound + 1} / {gameData.rounds.length}</span>
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
