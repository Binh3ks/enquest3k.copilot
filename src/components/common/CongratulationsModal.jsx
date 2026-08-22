import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Star, Clock, Target, ArrowRight } from 'lucide-react';
import Confetti from 'react-confetti';

/**
 * CongratulationsModal Component - Week completion celebration
 * Master Prompt V23 Section 0.1.2.B
 * 
 * Triggers: When weekProgress reaches 100%
 * Awards: +50 bonus stars
 * Features: Confetti animation, stats display, navigation to next week
 */
export default function CongratulationsModal({ weekId, onClose, userStats }) {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    // Update window size for confetti
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);

    // Stop confetti after 5 seconds
    const confettiTimer = setTimeout(() => setShowConfetti(false), 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(confettiTimer);
    };
  }, []);

  const handleContinue = () => {
    onClose();
    navigate(`/week/${weekId + 1}`);
  };

  const handleReview = () => {
    onClose();
    navigate(`/week/${weekId}`);
  };

  return (
    <>
      {/* Confetti Animation */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          recycle={false}
          colors={['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']}
        />
      )}

      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Modal Content */}
        <div
          className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-5 max-w-sm w-full mx-4 transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Trophy Emoji */}
          <div className="text-center mb-2">
            <div className="text-4xl animate-bounce">🏆</div>
          </div>

          {/* Heading */}
          <h2 className="text-xl sm:text-2xl font-black text-center mb-1 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Week {weekId} Complete!
          </h2>

          {/* Bonus Stars */}
          <div className="flex items-center justify-center gap-1.5 mb-3">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="text-base font-bold text-yellow-600">+50 Bonus Stars!</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <StatCard
              icon={Target}
              label="Stations"
              value="15/15"
              color="text-green-600"
            />
            <StatCard
              icon={Trophy}
              label="Accuracy"
              value={userStats?.accuracy || '100%'}
              color="text-blue-600"
            />
            <StatCard
              icon={Clock}
              label="Time Spent"
              value={userStats?.timeSpent || '--'}
              color="text-purple-600"
            />
            <StatCard
              icon={Star}
              label="Total Stars"
              value={userStats?.totalStars || '--'}
              color="text-yellow-600"
            />
          </div>

          {/* Next Week Message */}
          <p className="text-center text-xs text-gray-500 mb-3">
            Ready for your next challenge?
          </p>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleReview}
              className="flex-1 py-2 px-3 border border-gray-300 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Review
            </button>
            <button
              onClick={handleContinue}
              className="flex-1 py-2 px-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-black rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-colors flex items-center justify-center gap-1 shadow-md shadow-indigo-200"
            >
              Next Week <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 text-center">
      <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-gray-600 uppercase tracking-wide">{label}</div>
    </div>
  );
}
