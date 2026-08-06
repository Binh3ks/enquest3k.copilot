import { useState, useEffect } from 'react';
import { Lightbulb, CheckCircle, Award, Volume2 } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { getImageUrl } from '../../utils/imageUrl';

/**
 * LogicScienceDisplay - Critical Thinking Questions (3 Questions)
 * 
 * Features:
 * - Logic puzzles
 * - Science reasoning
 * - Open-ended answers
 * - Progress tracking
 */
const LogicScienceDisplay = ({ weekNumber, questions = [], onProgress, learningMode = 'advanced' }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  // Attempt tracking: { [questionId]: { attempts } }
  const [attemptRecords, setAttemptRecords] = useState({});

  const question = questions[currentQuestion];

  useEffect(() => {
    const saved = localStorage.getItem(`logic_science_w${weekNumber}_${learningMode}`);
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
    setUserAnswer('');
    setFeedback(null);
  }, [weekNumber, learningMode]);

  useEffect(() => {
    if (onProgress) {
      onProgress(completed.length);
    }
  }, [completed.length, onProgress]);

  const saveProgress = (newCompleted, newCurrent, newAttemptRecords) => {
    localStorage.setItem(`logic_science_w${weekNumber}_${learningMode}`, JSON.stringify({
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
        'logic_lab',
        weekNumber,
        'advanced'
      );
    } catch (err) {
      console.error('Logic Lab audio failed:', err);
      setIsPlaying(false);
    }
  };

  const submitAnswer = () => {
    const trimmed = userAnswer.trim();
    if (!trimmed) {
      setFeedback({ type: 'error', message: 'Please enter an answer!' });
      return;
    }
    // Require a complete sentence (at least 5 words)
    const wordCount = trimmed.split(/\s+/).length;
    if (wordCount < 5) {
      setFeedback({ type: 'error', message: 'Please write a complete sentence (at least 5 words). For example: "I think this happens because..."' });
      return;
    }

    // Update attempt record
    const prev = attemptRecords[question.id] || { attempts: 0 };
    const newRecord = { attempts: prev.attempts + 1 };
    const newAttemptRecords = { ...attemptRecords, [question.id]: newRecord };
    setAttemptRecords(newAttemptRecords);

    // Logic questions are open-ended, so we mark as completed
    setFeedback({ 
      type: 'success', 
      message: 'Great thinking! Your answer has been recorded. 🧠' 
    });
    
    if (!completed.includes(question.id)) {
      const newCompleted = [...completed, question.id];
      setCompleted(newCompleted);
      saveProgress(newCompleted, currentQuestion, newAttemptRecords);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      const next = currentQuestion + 1;
      setCurrentQuestion(next);
      setUserAnswer('');
      setFeedback(null);
      saveProgress(completed, next);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      const prev = currentQuestion - 1;
      setCurrentQuestion(prev);
      setUserAnswer('');
      setFeedback(null);
      saveProgress(completed, prev);
    }
  };

  if (!question) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center text-gray-500">
          <Lightbulb size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-semibold">No Logic & Science questions available</p>
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
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Lightbulb size={24} className="text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Question {currentQuestion + 1} of {questions.length}</h3>
            <p className="text-sm text-gray-600">Critical Thinking Challenge</p>
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
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            <Volume2 size={20} className={isPlaying ? 'animate-pulse' : ''} />
            <span>{isPlaying ? 'Playing...' : 'Listen to Question'}</span>
          </button>
        )}

        {/* Question Text */}
        <div className="text-xl font-semibold text-gray-800 leading-relaxed">
          {question.question_en}
        </div>

        {/* Context Clue / Passage Box */}
        {(question.passage_en || question.clue_statement) && (
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
            <p className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">📖 Story Context Clue:</p>
            <p className="text-sm text-purple-900 italic font-medium">"{question.passage_en || question.clue_statement}"</p>
          </div>
        )}

        {/* Image if available */}
        {question.image_url && (
          <img 
            src={getImageUrl(question.image_url)} 
            alt="Question context" 
            className="w-full max-w-md mx-auto rounded-lg shadow-md"
          />
        )}

        {/* Answer Options (MCQ if available) */}
        {question.options && Array.isArray(question.options) ? (
          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = userAnswer === option;
              const isCorrectAnswer = option === (question.correct || question.correct_answer);
              let btnStyle = 'bg-gray-50 border-2 border-gray-200 text-gray-800 hover:bg-purple-50 hover:border-purple-300';

              if (feedback) {
                if (isCorrectAnswer) {
                  btnStyle = 'bg-green-100 border-2 border-green-500 text-green-900 font-bold';
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle = 'bg-red-100 border-2 border-red-500 text-red-900 line-through';
                }
              } else if (isSelected) {
                btnStyle = 'bg-purple-100 border-2 border-purple-500 text-purple-900 font-bold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (isCompleted && feedback) return;
                    setUserAnswer(option);
                    const isCorrect = option === (question.correct || question.correct_answer);
                    if (isCorrect) {
                      setFeedback({
                        type: 'success',
                        message: question.explanation_en ? `✅ Correct! ${question.explanation_en}` : 'Great thinking! Correct answer! 🧠'
                      });
                      if (!completed.includes(question.id)) {
                        const newCompleted = [...completed, question.id];
                        setCompleted(newCompleted);
                        saveProgress(newCompleted, currentQuestion, attemptRecords);
                      }
                    } else {
                      setFeedback({
                        type: 'error',
                        message: question.explanation_en ? `❌ Not quite. ${question.explanation_en}` : `Not quite. Try again!`
                      });
                    }
                  }}
                  className={`w-full text-left p-4 rounded-xl font-medium transition-all flex items-start space-x-3 ${btnStyle}`}
                >
                  <span className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm flex-shrink-0 mt-0.5">
                    {letter}
                  </span>
                  <span className="text-base leading-snug">{option}</span>
                </button>
              );
            })}
          </div>
        ) : (
          /* Textarea Fallback for legacy open-ended questions */
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Your Answer:
            </label>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Write a complete sentence..."
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 outline-none"
              disabled={isCompleted}
            />
            <button
              onClick={submitAnswer}
              disabled={isCompleted}
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold disabled:bg-gray-400"
            >
              {isCompleted ? 'Submitted' : 'Submit Answer'}
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
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Completion Badge */}
      {allCompleted && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 text-center">
          <Award size={48} className="mx-auto mb-3" />
          <h3 className="text-2xl font-bold mb-2">All Questions Answered!</h3>
          <p className="text-purple-100">You've completed Logic & Science for Week {weekNumber}! 🧠</p>
        </div>
      )}
    </div>
  );
};

export default LogicScienceDisplay;
