/**
 * TTS Settings Control Panel
 * Reusable component for voice and speed selection
 */
import { Volume2, Gauge } from 'lucide-react';
import useTTSStore from '../../../stores/useTTSStore';

export default function TTSSettingsPanel({ compact = false }) {
  const { voice, speed, voices, speedPresets, setVoice, setSpeed } = useTTSStore();

  if (compact) {
    // Compact mode: Larger, more visible controls
    return (
      <div className="flex items-center gap-3 text-sm">
        {/* Voice selector */}
        <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-200 rounded-lg px-2.5 py-1.5 hover:bg-purple-100 transition-colors">
          <Volume2 className="w-4 h-4 text-purple-600" />
          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            className="text-sm font-medium border-none bg-transparent text-purple-700 focus:outline-none cursor-pointer appearance-none pr-1"
            style={{ backgroundImage: 'none' }}
          >
            {voices.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        {/* Speed selector */}
        <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-1.5 hover:bg-blue-100 transition-colors">
          <Gauge className="w-4 h-4 text-blue-600" />
          <select
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            className="text-sm font-medium border-none bg-transparent text-blue-700 focus:outline-none cursor-pointer appearance-none pr-1"
            style={{ backgroundImage: 'none' }}
          >
            {speedPresets.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  // Full mode: Detailed controls with descriptions
  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-lg p-4 space-y-4">
      <h3 className="text-sm font-bold text-white flex items-center gap-2">
        <Volume2 className="w-4 h-4 text-purple-400" />
        TTS Settings
      </h3>

      {/* Voice Selection */}
      <div className="space-y-2">
        <label className="text-xs text-gray-300 flex items-center gap-2">
          <Volume2 className="w-3 h-3" />
          Voice
        </label>
        <select
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          className="w-full bg-purple-900/30 text-white border border-purple-500/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
        >
          {voices.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name} - {v.description}
            </option>
          ))}
        </select>
      </div>

      {/* Speed Selection */}
      <div className="space-y-2">
        <label className="text-xs text-gray-300 flex items-center gap-2">
          <Gauge className="w-3 h-3" />
          Speed
        </label>
        <select
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          className="w-full bg-blue-900/30 text-white border border-blue-500/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        >
          {speedPresets.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label} - {s.description}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
