import { useState, useEffect } from 'react';
import { Calculator, CheckCircle, XCircle, Lightbulb, Volume2, Award } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { getImageUrl } from '../../utils/imageUrl';

/**
 * SingaporeMathDisplay - Bar Model Word Problems (5 Questions)
 * 
 * Features:
 * - Visual bar model display
 * - Math vocabulary highlighting
 * - CPA stages (Concrete-Pictorial-Abstract)
 * - Answer validation with unit checking
 * - Audio support for questions
 * - Hint system
 */
const SingaporeMathDisplay = ({ weekNumber, problems = [], onProgress, learningMode = 'advanced' }) => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  // Retry / error tracking per question
  const [attemptCount, setAttemptCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  // Per-question attempt records: { [problemId]: { attempts, errors } }
  const [attemptRecords, setAttemptRecords] = useState({});

  const problem = problems[currentProblem];

  useEffect(() => {
    // Load saved progress - include learningMode in key to separate Easy/Advanced
    const saved = localStorage.getItem(`singapore_math_w${weekNumber}_${learningMode}`);
    if (saved) {
      const data = JSON.parse(saved);
      setCompleted(data.completed || []);
      setCurrentProblem(data.currentProblem || 0);
      setAttemptRecords(data.attemptRecords || {});
    } else {
      // Reset to first problem if no saved data for this mode
      setCurrentProblem(0);
      setCompleted([]);
      setAttemptRecords({});
    }
    setUserAnswer('');
    setFeedback(null);
    setShowHint(false);
    setAttemptCount(0);
    setErrorCount(0);
  }, [weekNumber, learningMode]);

  useEffect(() => {
    // Update parent progress
    if (onProgress) {
      onProgress(completed.length);
    }
  }, [completed.length, onProgress]);

  const saveProgress = (newCompleted, newCurrent, newAttemptRecords) => {
    localStorage.setItem(`singapore_math_w${weekNumber}_${learningMode}`, JSON.stringify({
      completed: newCompleted,
      currentProblem: newCurrent,
      attemptRecords: newAttemptRecords ?? attemptRecords,
    }));
  };

  const playAudio = async () => {
    if (!problem?.question_en) return;
    
    setIsPlaying(true);
    try {
      await speakText(
        problem.question_en,
        problem.audio_url,
        1.0,
        () => setIsPlaying(false),
        'singapore_math',
        weekNumber,
        'advanced'
      );
    } catch (err) {
      console.error('Singapore Math audio failed:', err);
      setIsPlaying(false);
    }
  };

  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      setFeedback({ type: 'error', message: 'Please enter an answer!' });
      return;
    }

    // Require a complete sentence (at least 4 words including a number and unit)
    const trimmed = userAnswer.trim();
    const wordCount = trimmed.split(/\s+/).length;
    if (wordCount < 4) {
      setFeedback({ type: 'error', message: 'Please write a complete sentence, e.g. "There are 8 eggs in total."' });
      return;
    }

    const newAttempt = attemptCount + 1;
    setAttemptCount(newAttempt);

    const normalizedAnswer = trimmed.toLowerCase();
    const correctAnswers = problem.answer.map(a => a.toLowerCase());
    
    const isCorrect = correctAnswers.some(correct => {
      // The user's sentence must contain the correct answer
      return normalizedAnswer === correct || normalizedAnswer.includes(correct);
    });

    const MAX_ATTEMPTS = 3;
    const newErrorCount = isCorrect ? errorCount : errorCount + 1;
    if (!isCorrect) setErrorCount(newErrorCount);

    // Update attempt records for this problem
    const newAttemptRecords = {
      ...attemptRecords,
      [problem.id]: {
        attempts: newAttempt,
        errors: newErrorCount,
        finalCorrect: isCorrect,
      }
    };
    setAttemptRecords(newAttemptRecords);

    if (isCorrect) {
      setFeedback({ 
        type: 'success', 
        message: newAttempt > 1
          ? `Correct! ✨ (${newAttempt} attempts, ${newErrorCount} error${newErrorCount !== 1 ? 's' : ''})`
          : 'Excellent! You got it right! 🎉'
      });
      
      // Mark as completed
      if (!completed.includes(problem.id)) {
        const newCompleted = [...completed, problem.id];
        setCompleted(newCompleted);
        saveProgress(newCompleted, currentProblem, newAttemptRecords);
      }
    } else if (newAttempt >= MAX_ATTEMPTS) {
      // Ran out of attempts — reveal answer and mark complete (with errors recorded)
      const correctDisplay = problem.answer[0];
      setFeedback({ 
        type: 'error', 
        message: `${MAX_ATTEMPTS} attempts used. The answer is: "${correctDisplay}" — keep practising! 📚`
      });
      if (!completed.includes(problem.id)) {
        const newCompleted = [...completed, problem.id];
        setCompleted(newCompleted);
        saveProgress(newCompleted, currentProblem, newAttemptRecords);
      }
    } else {
      const remaining = MAX_ATTEMPTS - newAttempt;
      setFeedback({ 
        type: 'error', 
        message: `Not quite right. Try again! (${remaining} attempt${remaining !== 1 ? 's' : ''} left)`
      });
      saveProgress(completed, currentProblem, newAttemptRecords);
    }
  };

  const nextProblem = () => {
    if (currentProblem < problems.length - 1) {
      const next = currentProblem + 1;
      setCurrentProblem(next);
      setUserAnswer('');
      setFeedback(null);
      setShowHint(false);
      setAttemptCount(0);
      setErrorCount(0);
      saveProgress(completed, next);
    }
  };

  const prevProblem = () => {
    if (currentProblem > 0) {
      const prev = currentProblem - 1;
      setCurrentProblem(prev);
      setUserAnswer('');
      setFeedback(null);
      setShowHint(false);
      setAttemptCount(0);
      setErrorCount(0);
      saveProgress(completed, prev);
    }
  };

  if (!problem) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center text-gray-500">
          <Calculator size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-semibold">No Singapore Math problems available</p>
          <p className="text-sm mt-2">Check back later!</p>
        </div>
      </div>
    );
  }

  const isCompleted = completed.includes(problem.id);
  const allCompleted = completed.length === problems.length;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Calculator size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Problem {currentProblem + 1} of {problems.length}</h3>
            <p className="text-sm text-gray-600">
              {problem.type === 'part_whole' ? 'Part-Whole Model' : 
               problem.type === 'comparison' ? 'Comparison Model' : 
               'Math Problem'}
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
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        {/* Audio Button */}
        {problem.audio_url && (
          <button
            onClick={playAudio}
            disabled={isPlaying}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <Volume2 size={20} className={isPlaying ? 'animate-pulse' : ''} />
            <span>{isPlaying ? 'Playing...' : 'Listen to Question'}</span>
          </button>
        )}

        {/* Question Text */}
        <div className="text-lg leading-relaxed text-gray-800">
          {problem.question_en}
        </div>

        {/* Math Vocabulary Tags */}
        {problem.math_vocab && problem.math_vocab.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-gray-500">Math Words:</span>
            {problem.math_vocab.map((word, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
              >
                {word}
              </span>
            ))}
          </div>
        )}

        {/* Bar Model Image */}
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-800 font-semibold mb-2">Bar Model:</p>
          {problem.bar_model ? (
            <>
              {!imgFailed ? (
                <img
                  src={getImageUrl(problem.bar_model)}
                  alt="Bar Model Diagram"
                  className="w-full max-w-md mx-auto"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div className="text-center text-gray-500 text-sm mt-2">
                  [Bar model image unavailable — it may still be generating]
                </div>
              )}
            </>
          ) : (
            <div className="text-sm text-slate-700 space-y-3">
              <p className="font-semibold text-blue-700">Visual model unavailable.</p>
              <p>Use the steps below to imagine the bar model structure:</p>
              <ul className="list-disc list-inside space-y-1">
                {problem.solution_steps?.map((step, idx) => (
                  <li key={idx} className="rounded-md bg-white p-3 border border-slate-200">
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Hint Section */}
        {showHint && problem.hint_en && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex items-start space-x-2">
              <Lightbulb size={20} className="text-yellow-600 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-800 text-sm">Hint:</p>
                <p className="text-yellow-700 text-sm mt-1">{problem.hint_en}</p>
              </div>
            </div>
          </div>
        )}

        {/* Answer Input */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Your Answer: <span className="text-gray-500 font-normal">(write a full sentence with the number and unit!)</span>
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              placeholder="e.g., There are 8 eggs in total."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg"
              disabled={isCompleted}
            />
            <button
              onClick={checkAnswer}
              disabled={isCompleted}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Check
            </button>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`flex items-start space-x-2 p-4 rounded-lg ${
            feedback.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            {feedback.type === 'success' ? (
              <CheckCircle size={20} className="text-green-600 mt-0.5" />
            ) : (
              <XCircle size={20} className="text-red-600 mt-0.5" />
            )}
            <p className={`text-sm font-medium ${
              feedback.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {feedback.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 font-medium"
          >
            <Lightbulb size={18} />
            <span>{showHint ? 'Hide' : 'Show'} Hint</span>
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={prevProblem}
              disabled={currentProblem === 0}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            <button
              onClick={nextProblem}
              disabled={currentProblem === problems.length - 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Completion Badge */}
      {allCompleted && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-6 text-center">
          <Award size={48} className="mx-auto mb-3" />
          <h3 className="text-2xl font-bold mb-2">All Problems Solved!</h3>
          <p className="text-blue-100">You've mastered Singapore Math for Week {weekNumber}! 🎉</p>
        </div>
      )}
    </div>
  );
};

export default SingaporeMathDisplay;
