/**
 * AI Provider Status Monitor
 * Shows which AI providers are available and their usage
 */
import { useState, useEffect } from 'react';
import { getProviderStatus, getActiveProvider, resetProviderErrors } from '../../services/aiProviders';
import { Cpu, CheckCircle, AlertCircle, XCircle, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';

export default function AIProviderStatus() {
  const [status, setStatus] = useState({});
  const [activeProvider, setActiveProvider] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const update = () => {
      setStatus(getProviderStatus());
      setActiveProvider(getActiveProvider());
    };

    update();
    const interval = setInterval(update, 2000);
    return () => clearInterval(interval);
  }, []);

  const providers = Object.entries(status);
  const activeInfo = status[activeProvider];

  const getStatusIcon = (provider) => {
    if (provider.errors >= 5) return <XCircle className="w-3 h-3 text-red-500" />;
    if (!provider.available) return <AlertCircle className="w-3 h-3 text-yellow-500" />;
    return <CheckCircle className="w-3 h-3 text-green-500" />;
  };

  const getProgressColor = (used, limit) => {
    if (limit === Infinity) return 'bg-green-500';
    const pct = (used / limit) * 100;
    if (pct > 80) return 'bg-red-500';
    if (pct > 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg text-xs w-64 z-50 overflow-hidden">
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-2.5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-500" />
          <span className="font-medium text-gray-700">AI: {activeInfo?.name || 'Loading...'}</span>
        </div>
        <div className="flex items-center gap-1">
          {activeInfo && getStatusIcon(activeInfo)}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-gray-100 p-2.5 space-y-2">
          {providers.map(([key, provider]) => (
            <div
              key={key}
              className={`p-2 rounded ${key === activeProvider ? 'bg-indigo-50 border border-indigo-200' : 'bg-gray-50'}`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  {getStatusIcon(provider)}
                  <span className={`font-medium ${key === activeProvider ? 'text-indigo-700' : 'text-gray-600'}`}>
                    {provider.name}
                  </span>
                </div>
                {key === activeProvider && (
                  <span className="text-[10px] bg-indigo-500 text-white px-1.5 py-0.5 rounded">
                    ACTIVE
                  </span>
                )}
              </div>

              {/* Usage bars */}
              {provider.minuteLimit !== Infinity && (
                <div className="mb-1">
                  <div className="flex justify-between text-[10px] text-gray-500 mb-0.5">
                    <span>Minute</span>
                    <span>{provider.minuteUsed}/{provider.minuteLimit}</span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getProgressColor(provider.minuteUsed, provider.minuteLimit)} transition-all`}
                      style={{ width: `${Math.min((provider.minuteUsed / provider.minuteLimit) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {provider.dailyLimit !== Infinity && (
                <div>
                  <div className="flex justify-between text-[10px] text-gray-500 mb-0.5">
                    <span>Daily</span>
                    <span>{provider.dailyUsed}/{provider.dailyLimit}</span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getProgressColor(provider.dailyUsed, provider.dailyLimit)} transition-all`}
                      style={{ width: `${Math.min((provider.dailyUsed / provider.dailyLimit) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {provider.dailyLimit === Infinity && (
                <div className="text-[10px] text-gray-500">
                  ∞ Unlimited (fallback)
                </div>
              )}

              {provider.errors > 0 && (
                <div className="text-[10px] text-red-500 mt-1">
                  ⚠️ {provider.errors} error(s)
                </div>
              )}
            </div>
          ))}

          {/* Footer */}
          <div className="flex items-center justify-between pt-1 border-t border-gray-100">
            <span className="text-[10px] text-gray-400">Auto-switches on quota</span>
            <button
              onClick={() => {
                resetProviderErrors();
                setStatus(getProviderStatus());
              }}
              className="flex items-center gap-1 text-[10px] text-indigo-600 hover:text-indigo-800"
              title="Reset errors and retry providers"
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
