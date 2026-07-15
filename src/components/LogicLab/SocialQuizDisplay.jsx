import { useState, useEffect } from 'react';
import { Globe, CheckCircle, XCircle, Award, Volume2 } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { getImageUrl } from '../../utils/imageUrl';

/**
 * SocialQuizDisplay - Geography & History MCQ (7 Questions)
 * 
 * Features:
 * - Multiple choice questions (4 options)
 * - Geography, History, Culture topics
 * - Visual feedback
 * - Progress tracking
 * - Audio support
 */
const SocialQuizDisplay = ({ weekNumber, questions = [], onProgress, learningMode = 'advanced' }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [explanationSubmitted, setExplanationSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  // Retry / error tracking: { [questionId]: { attempts, errors, finalCorrect } }
  const [attemptRecords, setAttemptRecords] = useState({});

  const question = questions[currentQuestion];

  useEffect(() => {
    const saved = localStorage.getItem(`social_quiz_w${weekNumber}_${learningMode}`);
    if (saved) {
      const data = JSON.parse(saved);
      setCompleted(data.completed || []);
      setCurrentQuestion(data.currentQuestion || 0);
      setAttemptRecords(data.attemptRecords || {});
    } else {
      setCurrentQuestion(0);
      setCompleted([]);
      setAttemptRecords({});
    }
    setSelectedAnswer(null);
    setExplanation('');
    setExplanationSubmitted(false);
    setFeedback(null);
  }, [weekNumber, learningMode]);

  useEffect(() => {
    if (onProgress) {
      onProgress(completed.length);
    }
  }, [completed.length, onProgress]);

  const saveProgress = (newCompleted, newCurrent, newAttemptRecords) => {
    localStorage.setItem(`social_quiz_w${weekNumber}_${learningMode}`, JSON.stringify({
      completed: newCompleted,
      currentQuestion: newCurrent,
      attemptRecords: newAttemptRecords ?? attemptRecords,
    }));
  };

  const playAudio = async () => {
    if (!question?.question_en) return;
    
    setIsPlaying(true);
    try {
      await speakText(
        question.question_en,
        question.audio_url,
        1.0,
        () => setIsPlaying(false),
        'social_quiz',
        weekNumber,
        'advanced'
      );
    } catch (err) {
      console.error('Social Quiz audio failed:', err);
      setIsPlaying(false);
    }
  };

  const checkAnswer = (option) => {
    // Just select the MCQ option — student still needs to write a sentence explanation
    setSelectedAnswer(option);
    setExplanation('');
    setExplanationSubmitted(false);
    setFeedback(null);
  };

  const submitExplanation = () => {
    const trimmed = explanation.trim();
    if (!trimmed) {
      setFeedback({ type: 'error', message: 'Please write a sentence to explain your answer!' });
      return;
    }
    const wordCount = trimmed.split(/\s+/).length;
    if (wordCount < 5) {
      setFeedback({ type: 'error', message: 'Please write a complete sentence (at least 5 words). For example: "I chose this because Rome was a great empire."' });
      return;
    }

    setExplanationSubmitted(true);
    const isCorrect = selectedAnswer === question.correct_answer;

    // Update attempt record for this question
    const prev = attemptRecords[question.id] || { attempts: 0, errors: 0 };
    const newRecord = {
      attempts: prev.attempts + 1,
      errors: isCorrect ? prev.errors : prev.errors + 1,
      finalCorrect: isCorrect,
    };
    const newAttemptRecords = { ...attemptRecords, [question.id]: newRecord };
    setAttemptRecords(newAttemptRecords);

    if (isCorrect) {
      setFeedback({
        type: 'success',
        message: question.explanation_en || 'Correct! Well done! 🎉'
      });
    } else {
      setFeedback({
        type: 'error',
        message: `Not quite. The correct answer is: ${question.correct_answer}`
      });
    }

    if (!completed.includes(question.id)) {
      const newCompleted = [...completed, question.id];
      setCompleted(newCompleted);
      saveProgress(newCompleted, currentQuestion, newAttemptRecords);
    } else {
      saveProgress(completed, currentQuestion, newAttemptRecords);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      const next = currentQuestion + 1;
      setCurrentQuestion(next);
      setSelectedAnswer(null);
      setExplanation('');
      setExplanationSubmitted(false);
      setFeedback(null);
      saveProgress(completed, next, attemptRecords);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      const prev = currentQuestion - 1;
      setCurrentQuestion(prev);
      setSelectedAnswer(null);
      setExplanation('');
      setExplanationSubmitted(false);
      setFeedback(null);
      saveProgress(completed, prev, attemptRecords);
    }
  };

  if (!question) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center text-gray-500">
          <Globe size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-semibold">No Social Quiz questions available</p>
          <p className="text-sm mt-2">Check back later!</p>
        </div>
      </div>
    );
  }

  const isCompleted = completed.includes(question.id);
  const allCompleted = completed.length === questions.length;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Globe size={24} className="text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Question {currentQuestion + 1} of {questions.length}</h3>
            <p className="text-sm text-gray-600">
              {question.category || 'Social Studies'}
            </p>
          </div>
        </div>
        
        {isCompleted && (
          <div className="flex items-center space-x-2 text-green-600 font-semibold">
            <CheckCircle size={20} />
            <span>Completed</span>
          </div>
        )}
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Audio Button */}
        {question.audio_url && (
          <button
            onClick={playAudio}
            disabled={isPlaying}
            className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
          >
            <Volume2 size={20} className={isPlaying ? 'animate-pulse' : ''} />
            <span>{isPlaying ? 'Playing...' : 'Listen to Question'}</span>
          </button>
        )}

        {/* Question Image */}
        {question.image_url && (
          <img 
            src={getImageUrl(question.image_url)} 
            alt="Question visual" 
            className="w-full max-w-md mx-auto rounded-lg shadow-md"
          />
        )}

        {/* Question Text */}
        <div className="text-xl font-semibold text-gray-800">
          {question.question_en}
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {question.options?.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === question.correct_answer;
            const showResult = explanationSubmitted;
            
            let buttonStyle = 'border-2 border-gray-300 hover:border-green-400 hover:bg-green-50';

            if (isSelected && !showResult) {
              buttonStyle = 'border-2 border-blue-500 bg-blue-50';
            } else if (showResult && isSelected) {
              buttonStyle = isCorrect 
                ? 'border-2 border-green-500 bg-green-100' 
                : 'border-2 border-red-500 bg-red-100';
            } else if (showResult && isCorrect) {
              buttonStyle = 'border-2 border-green-500 bg-green-50';
            }
            
            return (
              <button
                key={idx}
                onClick={() => selectedAnswer === null && checkAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`
                  w-full text-left px-6 py-4 rounded-xl font-medium text-gray-800
                  transition-all duration-200 ${buttonStyle}
                `}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && isCorrect && (
                    <CheckCircle size={20} className="text-green-600" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle size={20} className="text-red-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation textarea — required after MCQ selection */}
        {selectedAnswer !== null && !explanationSubmitted && (
          <div className="space-y-2 pt-2">
            <label className="block text-sm font-semibold text-gray-700">
              Now explain your answer in a complete sentence:
              <span className="text-gray-500 font-normal ml-1">(at least 5 words)</span>
            </label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              rows={3}
              placeholder="e.g., I chose this answer because I know that ancient Rome had a powerful army."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-base resize-none"
            />
            <button
              onClick={submitExplanation}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
            >
              Submit Answer
            </button>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className={`p-4 rounded-lg ${
            feedback.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`text-sm font-medium ${
              feedback.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {feedback.message}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-4 border-t">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <button
            onClick={nextQuestion}
            disabled={currentQuestion === questions.length - 1}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Completion Badge */}
      {allCompleted && (
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl p-6 text-center">
          <Award size={48} className="mx-auto mb-3" />
          <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
          <p className="text-green-100">You've mastered Social Studies for Week {weekNumber}! 🌍</p>
        </div>
      )}
    </div>
  );
};

export default SocialQuizDisplay;
