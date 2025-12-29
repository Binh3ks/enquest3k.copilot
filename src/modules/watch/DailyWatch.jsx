import React, { useState, useEffect, useRef, memo } from 'react';
import { Play, CheckCircle, Clock, X, AlertCircle } from 'lucide-react';

// --- COMPONENT CON: VideoItem (BẤT TỬ TRƯỚC RE-RENDER) ---
const VideoItem = memo(({ video, percent, onClick }) => {
  const isDone = percent >= 90;
  return (
    <div onClick={() => onClick(video)}
      className={`relative rounded-xl overflow-hidden shadow-md cursor-pointer group hover:scale-[1.02] transition-all bg-white border-2 ${isDone ? 'border-green-400' : 'border-slate-100'}`}>
      <div className="aspect-video bg-slate-200 relative">
        <img src={video.thumb} alt={video.title} className="w-full h-full object-cover" onError={(e)=>{e.target.src='https://via.placeholder.com/320x180'}}/>
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10">
          <Play className="w-10 h-10 text-white opacity-80 group-hover:scale-110 transition-transform"/>
        </div>
        <div className="absolute bottom-0 left-0 h-1 bg-slate-200/50 w-full">
          <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${percent}%` }}></div>
        </div>
        {isDone && <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full shadow-lg"><CheckCircle size={16}/></div>}
      </div>
      <div className="p-3">
        <h3 className="font-bold text-slate-700 text-sm truncate">{video.title}</h3>
        <div className="text-[10px] text-slate-500 mt-1 flex justify-between font-bold">
          <span>{video.duration}</span>
          <span className={isDone ? 'text-green-600' : ''}>{percent}%</span>
        </div>
      </div>
    </div>
  );
});

const DailyWatch = ({ data, onReportProgress }) => {
  const [activeVideo, setActiveVideo] = useState(null); 
  const [playerState, setPlayerState] = useState(-1);
  const [watchData, setWatchData] = useState(() => {
    try { return JSON.parse(localStorage.getItem('daily_watch_seconds')) || {}; } catch(e) { return {}; }
  });
  const [realDuration, setRealDuration] = useState(0);

  const playerRef = useRef(null);
  const timerRef = useRef(null);

  // Sync Progress & LocalStorage
  useEffect(() => {
    if (data?.videos) {
      const saved = JSON.stringify(watchData);
      localStorage.setItem('daily_watch_seconds', saved);
      
      let completedCount = 0;
      data.videos.forEach(v => {
        const sec = watchData[v.id] || 0;
        const total = v.sim_duration || 300;
        if ((sec / total) >= 0.9) completedCount++;
      });
      onReportProgress?.(Math.round((completedCount / data.videos.length) * 100));
    }
  }, [watchData, data]);

  const startTimer = (id) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setWatchData(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    }, 1000);
  };

  const stopTimer = () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };

  // YT API Load
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  }, []);

  useEffect(() => {
    if (!activeVideo) return;
    setRealDuration(0);
    let player;
    const init = () => {
      if (window.YT && window.YT.Player) {
        player = new window.YT.Player('yt-player-frame', {
          videoId: activeVideo.videoId,
          playerVars: { 'autoplay': 1, 'controls': 1, 'rel': 0, 'modestbranding': 1 },
          events: {
            'onReady': (e) => { e.target.playVideo(); setRealDuration(e.target.getDuration()); },
            'onStateChange': (e) => {
              setPlayerState(e.data);
              if (e.data === 1) startTimer(activeVideo.id);
              else stopTimer();
            }
          }
        });
        playerRef.current = player;
      } else { setTimeout(init, 500); }
    };
    init();
    return () => { stopTimer(); if (playerRef.current?.destroy) playerRef.current.destroy(); };
  }, [activeVideo]);

  const getPercent = (id, fallback) => {
    const sec = watchData[id] || 0;
    const total = (activeVideo?.id === id && realDuration > 0) ? realDuration : (fallback || 300);
    return Math.min(100, Math.floor((sec / total) * 100));
  };

  if (!data?.videos) return null;

  return (
    <div className="pb-24">
      <div className="bg-rose-50 p-6 rounded-2xl border-2 border-rose-100 mb-8 flex justify-between items-center shadow-sm">
        <div>
          <h2 className="text-xl font-black text-rose-800 uppercase flex items-center gap-2"><Clock className="animate-pulse"/> Daily Watch</h2>
          <p className="text-xs text-rose-600 font-bold mt-1">Listen to English naturally every day.</p>
        </div>
        <div className="bg-white px-6 py-2 rounded-2xl border-2 border-rose-200 shadow-inner">
            <span className="text-2xl font-black text-rose-500">{data.videos.filter(v => getPercent(v.id, v.sim_duration) >= 90).length}</span>
            <span className="text-sm font-bold text-slate-400">/{data.videos.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.videos.map(v => (
          <VideoItem key={v.id} video={v} percent={getPercent(v.id, v.sim_duration)} onClick={setActiveVideo} />
        ))}
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <button onClick={() => setActiveVideo(null)} className="absolute top-6 right-6 text-white bg-white/10 hover:bg-rose-500 p-3 rounded-full transition-all"><X size={24}/></button>
          <div className="w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 relative">
            <div id="yt-player-frame" className="w-full h-full"></div>
          </div>
          <div className="mt-8 text-center max-w-2xl">
            <h3 className="text-white font-black text-2xl mb-2">{activeVideo.title}</h3>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 rounded-full border border-indigo-500/30 text-indigo-300 font-mono text-sm">
              {playerState === 1 ? 'Tracking Progress...' : 'Paused'} • {getPercent(activeVideo.id, realDuration || activeVideo.sim_duration)}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DailyWatch;
