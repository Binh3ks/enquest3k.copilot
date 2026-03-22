import { useState, useEffect } from 'react';
import { Lightbulb, CheckCircle, Award, Volume2 } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';

/**
 * LogicScienceDisplay - Critical Thinking Questions (3 Questions)
 * 
 * Features:
 * - Logic puzzles
 * - Science reasoning
 * - Open-ended answers
 * - Progress tracking
 */
const LogicScienceDisplay = ({ weekNumber, questions = [], onProgress }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const question = questions[currentQuestion];

  useEffect(() => {
    const saved = localStorage.getItem(`logic_science_w${weekNumber}`);
    if (saved) {
      const data = JSON.parse(saved);
      setCompleted(data.completed || []);
      setCurrentQuestion(data.currentQuestion || 0);
    }
  }, [weekNumber]);

  useEffect(() => {
    if (onProgress) {
      onProgress(completed.length);
    }
  }, [completed.length, onProgress]);

  const saveProgress = (newCompleted, newCurrent) => {
    localStorage.setItem(`logic_science_w${weekNumber}`, JSON.stringify({
      completed: newCompleted,
      currentQuestion: newCurrent
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
    if (!userAnswer.trim()) {
      setFeedback({ type: 'error', message: 'Please enter an answer!' });
      return;
    }

    // Logic questions are open-ended, so we mark as completed
    setFeedback({ 
      type: 'success', 
      message: 'Great thinking! Your answer has been recorded. 🧠' 
    });
    
    if (!completed.includes(question.id)) {
      const newCompleted = [...completed, question.id];
      setCompleted(newCompleted);
      saveProgress(newCompleted, currentQuestion);
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

        {/* Image if available */}
        {question.image_url && (
          <img 
            src={question.image_url} 
            alt="Question context" 
            className="w-full max-w-md mx-auto rounded-lg shadow-md"
          />
        )}

        {/* Answer Input */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Your Answer:
          </label>
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Explain your reasoning..."
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
            disabled={isCompleted}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={submitAnswer}
          disabled={isCompleted}
          className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isCompleted ? 'Submitted' : 'Submit Answer'}
        </button>

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
