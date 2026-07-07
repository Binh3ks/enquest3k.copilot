import React from 'react';
import { Play, Pause, Mic, MicOff, Globe, ChevronDown, PlayCircle, RotateCcw, Download } from 'lucide-react';

/**
 * ShadowingHeader — Title bar with controls: lang toggle, speed selector, play-all, record-all, play-back.
 */
export default function ShadowingHeader({
  title,
  isVi,
  onToggleLang,
  isPlayingAll,
  onPlayAll,
  isRecordingAll,
  onRecordAll,
  hasFullRecording,
  onPlayBackAll,
  isPlayingBack,
  onStopPlayBack,
  onDownloadAll,
  speed,
  onSpeedChange,
  speedOptions,
  progress,
  themeColor,
}) {
  return (
    <div className={`bg-${themeColor}-100 p-4 rounded-xl border border-${themeColor}-200 mb-4 flex flex-col sm:flex-row justify-between items-center gap-3 relative z-10 shadow-sm`}>
      {/* Left: Title + progress */}
      <div className="flex-1 min-w-0">
        <h2 className={`text-xl font-black text-${themeColor}-800 uppercase flex items-center gap-2`}>
          Shadowing
          <button
            onClick={onToggleLang}
            className="p-1 bg-white/50 rounded-md hover:bg-white text-xs font-bold text-slate-500 flex items-center border border-transparent hover:border-slate-300 transition-all"
          >
            <Globe className="w-3 h-3 mr-1" /> {isVi ? 'VI' : 'EN'}
          </button>
        </h2>
        <div className="flex items-center gap-3 mt-1">
          <p className="text-sm text-slate-600 font-bold">
            {isVi ? 'Nghe và Nhắc lại' : 'Listen & Repeat'}
          </p>
          {progress !== undefined && (
            <span className="text-xs text-slate-400">
              {progress}% {isVi ? 'hoàn thành' : 'completed'}
            </span>
          )}
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Speed selector */}
        <div className="relative">
          <select
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2 pr-7 text-xs font-bold text-slate-600 cursor-pointer hover:border-slate-300 transition-colors"
          >
            {speedOptions.map(s => (
              <option key={s} value={s}>{s}x</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
        </div>

        {/* Record All */}
        <button
          onClick={onRecordAll}
          className={`px-3 py-2 rounded-lg shadow-md text-white font-bold text-xs flex items-center transition-all ${
            isRecordingAll
              ? 'bg-rose-500 hover:bg-rose-600 animate-pulse'
              : 'bg-indigo-500 hover:bg-indigo-600'
          }`}
        >
          {isRecordingAll ? (
            <><MicOff className="w-3.5 h-3.5 mr-1" /> {isVi ? 'Dừng' : 'Stop'}</>
          ) : (
            <><Mic className="w-3.5 h-3.5 mr-1" /> {isVi ? 'Ghi Hết' : 'Record All'}</>
          )}
        </button>

        {/* Play Back + Download — only shown when has recording */}
        {hasFullRecording && (
          <div className="flex items-center gap-1">
            <button
              onClick={isPlayingBack ? onStopPlayBack : onPlayBackAll}
              className={`px-3 py-2 rounded-lg shadow-md text-white font-bold text-xs flex items-center transition-all ${
                isPlayingBack
                  ? 'bg-purple-500 hover:bg-purple-600 animate-pulse'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isPlayingBack ? (
                <><Pause className="w-3.5 h-3.5 mr-1" /> {isVi ? 'Dừng' : 'Stop'}</>
              ) : (
                <><PlayCircle className="w-3.5 h-3.5 mr-1" /> {isVi ? 'Nghe lại' : 'Play Back'}</>
              )}
            </button>
            <button
              onClick={onDownloadAll}
              className="px-2 py-2 rounded-lg shadow-md bg-slate-600 hover:bg-slate-700 text-white font-bold text-xs flex items-center transition-all"
              title={isVi ? 'Tải bản ghi' : 'Download recording'}
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Play All / Stop */}
        <button
          onClick={onPlayAll}
          className={`px-4 py-2 rounded-lg shadow-md text-white font-bold text-xs flex items-center transition-all ${
            isPlayingAll
              ? 'bg-rose-500 hover:bg-rose-600'
              : `bg-${themeColor}-500 hover:bg-${themeColor}-600`
          }`}
        >
          {isPlayingAll ? (
            <><Pause className="w-3.5 h-3.5 mr-1" /> {isVi ? 'Dừng' : 'Stop'}</>
          ) : (
            <><Play className="w-3.5 h-3.5 mr-1" /> {isVi ? 'Nghe Hết' : 'Play All'}</>
          )}
        </button>
      </div>
    </div>
  );
}
