/**
 * Gemini API Quota Monitor - Shows remaining API calls
 */
import { useState, useEffect } from 'react';
import geminiCache from '../../services/geminiCache';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function QuotaMonitor() {
  const [quota, setQuota] = useState({ perMinute: 50, perDay: 1200, resetTime: '--:--' });
  const [isLow, setIsLow] = useState(false);

  useEffect(() => {
    const updateQuota = () => {
      const current = geminiCache.getRemainingQuota();
      setQuota(current);
      setIsLow(current.perMinute < 10 || current.perDay < 100);
    };

    updateQuota();
    const interval = setInterval(updateQuota, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const percentMinute = (quota.perMinute / 50) * 100;
  const percentDay = (quota.perDay / 1200) * 100;

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs w-64 z-50">
      <div className="flex items-center gap-2 mb-2">
        {isLow ? (
          <AlertCircle className="w-4 h-4 text-orange-500" />
        ) : (
          <CheckCircle className="w-4 h-4 text-green-500" />
        )}
        <span className="font-semibold text-gray-700">Gemini API Quota</span>
      </div>

      {/* Per Minute */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-gray-600">Per Minute:</span>
          <span className={`font-mono ${quota.perMinute < 10 ? 'text-orange-600' : 'text-gray-800'}`}>
            {quota.perMinute}/50
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full transition-all ${
              percentMinute > 50 ? 'bg-green-500' : percentMinute > 20 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${percentMinute}%` }}
          />
        </div>
      </div>

      {/* Per Day */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-gray-600">Per Day:</span>
          <span className={`font-mono ${quota.perDay < 100 ? 'text-orange-600' : 'text-gray-800'}`}>
            {quota.perDay}/1200
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full transition-all ${
              percentDay > 50 ? 'bg-green-500' : percentDay > 20 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${percentDay}%` }}
          />
        </div>
      </div>

      {/* Reset Time */}
      <div className="flex items-center gap-1 text-gray-500 pt-1 border-t border-gray-100">
        <Clock className="w-3 h-3" />
        <span>Resets at: {quota.resetTime}</span>
      </div>

      {isLow && (
        <div className="mt-2 text-orange-600 text-[10px] leading-tight">
          ⚠️ Quota low. Responses will use smart caching + fallbacks.
        </div>
      )}
    </div>
  );
}
