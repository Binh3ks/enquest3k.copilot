import { useState, useEffect } from 'react';
import { Brain, CheckCircle2, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { useUserStore } from '../../../stores/useUserStore';
import { getCurrentWeekData } from '../../../data/weekData';

/**
 * Quiz Tab - Test vocabulary and grammar knowledge
 * Syllabus-aware quizzes with immediate feedback
 */
const QuizTab = () => {
  const { user, currentWeek } = useUserStore();
  const [weekData, setWeekData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  // Load week data and generate questions
  useEffect(() => {
    const data = getCurrentWeekData(currentWeek || 'week-1');
    setWeekData(data);
    
    if (data?.vocabulary) {
      const generatedQuestions = generateQuestions(data.vocabulary);
      setQuestions(generatedQuestions);
    }
  }, [currentWeek]);

  // Generate quiz questions from vocabulary
  const generateQuestions = (vocabulary) => {
    const quizQuestions = [];
    
    // Question Type 1: What does this word mean?
    vocabulary.forEach((vocab, index) => {
      if (index < 5) { // Limit to 5 questions
        const otherWords = vocabulary.filter(v => v.word !== vocab.word);
        const wrongAnswers = otherWords
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(v => v.meaning);
        
        const answers = [vocab.meaning, ...wrongAnswers]
          .sort(() => Math.random() - 0.5);
        
        quizQuestions.push({
          type: 'meaning',
          question: `What does "${vocab.word}" mean?`,
          word: vocab.word,
          correctAnswer: vocab.meaning,
          answers: answers
        });
      }
    });

    return quizQuestions;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  // Handle answer selection
  const handleAnswerClick = (answer) => {
    if (isAnswered) return; // Prevent multiple selections
    
    setSelectedAnswer(answer);
    setIsAnswered(true);

    // Check if correct
    if (answer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  // Move to next question
  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizComplete(true);
    }
  };

  // Reset quiz
  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (!weekData || questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading quiz...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <div className="bg-white border-b border-yellow-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Brain size={20} className="text-yellow-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Quick Quiz</h2>
              <p className="text-xs text-gray-500">Test your knowledge!</p>
            </div>
          </div>

          {/* Score */}
          {!quizComplete && (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">
                  Question {currentQuestionIndex + 1} / {totalQuestions}
                </p>
                <p className="text-xs text-yellow-600">
                  Score: {score}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        {quizComplete ? (
          // Completion Screen
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy size={48} className="text-yellow-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              Quiz Complete! 🎉
            </h3>
            <p className="text-xl text-gray-600 mb-4">
              You scored <span className="font-bold text-yellow-600">{score}</span> out of <span className="font-bold">{totalQuestions}</span>
            </p>
            
            {/* Performance feedback */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <div className="text-6xl mb-3">
                {score === totalQuestions ? '🌟' : score >= totalQuestions * 0.7 ? '😊' : '💪'}
              </div>
              <p className="text-lg font-medium text-gray-700">
                {score === totalQuestions 
                  ? 'Perfect! You\'re amazing!' 
                  : score >= totalQuestions * 0.7 
                  ? 'Great job! Keep practicing!' 
                  : 'Good effort! Try again to improve!'}
              </p>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2 mx-auto"
            >
              <RotateCcw size={20} />
              <span>Try Again</span>
            </button>
          </div>
        ) : (
          // Quiz Card
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
            {/* Question */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-yellow-600">
                  Question {currentQuestionIndex + 1}
                </span>
                <span className="text-sm text-gray-500">
                  Week {currentWeek} Vocabulary
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.answers.map((answer, index) => {
                const isCorrect = answer === currentQuestion.correctAnswer;
                const isSelected = answer === selectedAnswer;
                
                let buttonClass = 'w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ';
                
                if (!isAnswered) {
                  buttonClass += 'border-gray-300 hover:border-yellow-500 hover:bg-yellow-50 cursor-pointer';
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
                    onClick={() => handleAnswerClick(answer)}
                    disabled={isAnswered}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg text-gray-800">{answer}</span>
                      {isAnswered && isSelected && (
                        isCorrect ? (
                          <CheckCircle2 size={24} className="text-green-600" />
                        ) : (
                          <XCircle size={24} className="text-red-600" />
                        )
                      )}
                      {isAnswered && !isSelected && isCorrect && (
                        <CheckCircle2 size={24} className="text-green-600" />
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
