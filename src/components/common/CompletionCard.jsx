import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronRight, X } from 'lucide-react';

/**
 * CompletionCard — Sprint 4b
 * Overlay shown when a station is completed (100%).
 * Auto-advances to next station after 3s countdown.
 * Clicking "Để sau" closes the overlay and stays on current station.
 * Clicking "Bắt đầu ngay" navigates immediately.
 */
const CompletionCard = ({ stationName, nextStation, weekId, onClose }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  const goNext = () => {
    onClose();
    if (nextStation && weekId) {
      navigate(`/week/${weekId}/${nextStation.key}`);
    }
  };

  useEffect(() => {
    if (!nextStation) return;
    const id = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(id);
          goNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [nextStation]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center pointer-events-none pb-4 px-3">
      <div className="pointer-events-auto w-full max-w-xs bg-white rounded-2xl shadow-2xl border border-emerald-200 overflow-hidden animate-slide-up">
        {/* Green header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle size={17} className="text-white" />
            <div>
              <p className="text-[9px] text-emerald-100 font-bold uppercase tracking-widest leading-none">Hoàn thành!</p>
              <p className="text-xs font-black text-white leading-tight">{stationName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
            <X size={15} className="text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="px-3.5 py-3">
          {nextStation ? (
            <>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide mb-1">Tiếp theo</p>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 mb-3">
                <span className="text-base">{nextStation.emoji || '🎯'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-gray-800 truncate">{nextStation.title_vi || nextStation.title_en}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 rounded-lg px-1.5 py-0.5">
                  {countdown}s
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="flex-1 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Để sau
                </button>
                <button
                  onClick={goNext}
                  className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black flex items-center justify-center gap-1 transition-colors shadow-sm"
                >
                  Bắt đầu ngay <ChevronRight size={13} />
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-xs text-gray-600 mb-3 font-medium text-center">🎉 Bạn đã hoàn thành tất cả các station tuần này!</p>
              <button
                onClick={onClose}
                className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black transition-colors"
              >
                Tuyệt vời! 🏆
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompletionCard;
