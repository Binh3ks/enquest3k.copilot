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
          className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Trophy Emoji */}
          <div className="text-center mb-6">
            <div className="text-8xl animate-bounce">🎉</div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Week {weekId} Complete!
          </h2>

          {/* Bonus Stars */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            <span className="text-2xl font-bold text-yellow-600">+50 Bonus Stars!</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
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
          <p className="text-center text-gray-600 mb-6">
            Ready for your next challenge?
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleContinue}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Continue to Week {weekId + 1}
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={handleReview}
              className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-2xl hover:bg-gray-200 transition-all"
            >
              Review Week {weekId}
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
