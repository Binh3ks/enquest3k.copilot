/**
 * TTS Settings Control Panel
 * Reusable component for voice and speed selection
 */
import { Volume2, Gauge } from 'lucide-react';
import useTTSStore from '../../../stores/useTTSStore';

export default function TTSSettingsPanel({ compact = false }) {
  const { voice, speed, voices, speedPresets, setVoice, setSpeed } = useTTSStore();

  if (compact) {
    // Compact mode: Small inline controls
    return (
      <div className="flex items-center gap-2 text-xs">
        {/* Voice selector */}
        <div className="flex items-center gap-1">
          <Volume2 className="w-3 h-3 text-purple-400" />
          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            className="bg-purple-900/30 text-white border border-purple-500/30 rounded px-2 py-0.5 text-xs focus:outline-none focus:border-purple-400"
          >
            {voices.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        {/* Speed selector */}
        <div className="flex items-center gap-1">
          <Gauge className="w-3 h-3 text-blue-400" />
          <select
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            className="bg-blue-900/30 text-white border border-blue-500/30 rounded px-2 py-0.5 text-xs focus:outline-none focus:border-blue-400"
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
