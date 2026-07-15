import React from 'react';
import { X } from 'lucide-react';

/**
 * PracticeSettingsModal — Settings for shadowing practice.
 * Options: Speed, Repeat Count, Wait Mode, Sub Sync
 */
const REPEAT_OPTIONS = [1, 2, 3, 5, 10];
const WAIT_MODES = [
  { value: 'off', label: 'Off' },
  { value: 'manual', label: 'Manual' },
  { value: '30%', label: '+30%' },
  { value: '50%', label: '+50%' },
  { value: '80%', label: '+80%' },
  { value: '100%', label: '+100%' },
  { value: '120%', label: '+120%' },
];
const SUB_SYNC_OPTIONS = [
  { value: '-100', label: '-100ms' },
  { value: '0', label: '0ms' },
  { value: '100', label: '+100ms' },
];

export default function PracticeSettingsModal({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
  speed,
  onSpeedChange,
  speedOptions,
  isVi,
}) {
  if (!isOpen) return null;

  const update = (patch) => onSettingsChange({ ...settings, ...patch });

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="text-xl">⚙️</span> {isVi ? 'Cài đặt luyện tập' : 'Practice Settings'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Speed */}
          <div>
            <p className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
              {isVi ? 'Tốc độ:' : 'Speed:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {speedOptions.map(s => (
                <button
                  key={s}
                  onClick={() => onSpeedChange(s)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold ${
                    speed === s
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Repeat Count */}
          <div>
            <p className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
              {isVi ? 'Số lần lặp:' : 'Repeat Count:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {REPEAT_OPTIONS.map(n => (
                <button
                  key={n}
                  onClick={() => update({ repeatCount: n })}
                  className={`px-4 py-2 rounded-lg text-sm font-bold ${
                    settings?.repeatCount === n
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {n} {n === 1 ? (isVi ? 'lần' : 'Time') : (isVi ? 'lần' : 'Times')}
                </button>
              ))}
            </div>
          </div>

          {/* Wait Mode */}
          <div>
            <p className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
              {isVi ? 'Chế độ chờ:' : 'Wait Mode:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {WAIT_MODES.map(w => (
                <button
                  key={w.value}
                  onClick={() => update({ waitMode: w.value })}
                  className={`px-4 py-2 rounded-lg text-sm font-bold ${
                    settings?.waitMode === w.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sub Sync */}
          <div>
            <p className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
              {isVi ? 'Đồng bộ phụ đề:' : 'Sub Sync:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {SUB_SYNC_OPTIONS.map(s => (
                <button
                  key={s.value}
                  onClick={() => update({ subSync: parseInt(s.value) })}
                  className={`px-4 py-2 rounded-lg text-sm font-bold ${
                    String(settings?.subSync) === s.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors"
          >
            {isVi ? 'Xong' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
}
