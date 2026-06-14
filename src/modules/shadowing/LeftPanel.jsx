import React, { useState } from 'react';
import { Eye, EyeOff, Link } from 'lucide-react';
import YouTubeEmbed from './YouTubeEmbed';

/**
 * LeftPanel — Full text display + YouTube video embed below.
 */
export default function LeftPanel({ contentEn, script, activeSentenceId, videoId, themeColor, isVi }) {
  const [hideText, setHideText] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [activeVideoId, setActiveVideoId] = useState(videoId);

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    // Extract videoId from YouTube URL
    const match = customUrl.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (match) {
      setActiveVideoId(match[1]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Full text card */}
      <div className={`bg-white p-5 rounded-2xl shadow-sm border border-slate-200 transition-all ${hideText ? 'blur-md select-none' : ''}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
            {isVi ? 'Toàn bộ văn bản' : 'Full Text'}
          </h3>
          <button
            onClick={() => setHideText(!hideText)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title={hideText ? 'Show text' : 'Hide text'}
          >
            {hideText ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-lg text-slate-700 leading-loose text-justify font-medium">
          {contentEn ? (
            // Render content_en with bold markers
            contentEn.split(/(\*\*.*?\*\*)/).map((part, i) =>
              part.startsWith('**') ? (
                <span key={i} className={`font-black text-${themeColor}-600`}>
                  {part.replace(/\*\*/g, '')}
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )
          ) : (
            // Fallback: join sentences
            script?.map((s, i) => (
              <span
                key={i}
                className={activeSentenceId === s.id ? `bg-${themeColor}-100 rounded px-0.5` : ''}
              >
                {s.text}{' '}
              </span>
            ))
          )}
        </p>
      </div>

      {/* YouTube embed */}
      {activeVideoId ? (
        <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200">
          <YouTubeEmbed videoId={activeVideoId} />
        </div>
      ) : (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
            {isVi ? 'Thêm video YouTube' : 'Add YouTube Video'}
          </p>
          <form onSubmit={handleUrlSubmit} className="flex gap-2">
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <Link className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
