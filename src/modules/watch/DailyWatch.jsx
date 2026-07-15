import React, { useState, useEffect, useRef, memo } from 'react';
import { useParams } from 'react-router-dom';
import { Play, CheckCircle, Clock, X, AlertCircle } from 'lucide-react';
import { useStationProgress } from '../../hooks/useStationProgress';

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
  const { weekId } = useParams();
  
  // 🔥 Universal Progress System Integration
  const { savedData, saveProgress, markComplete } = useStationProgress(
    parseInt(weekId), 
    'daily_watch'
  );
  
  const [activeVideo, setActiveVideo] = useState(null); 
  const [playerState, setPlayerState] = useState(-1);
  const [playerError, setPlayerError] = useState(null);
  
  // State initialized from savedData
  const [watchData, setWatchData] = useState(() => savedData.watchData || {});
  const [videoDurations, setVideoDurations] = useState(() => savedData.videoDurations || {});
  const [isReady, setIsReady] = useState(false);
  const hasRestoredWatch = useRef(false);
  // BUG FIX (Jun 7, 2026): re-sync from savedData when store populates async
  // (the lazy useState only runs once on mount, before fetchWeekProgress returns)
  useEffect(() => {
    if (hasRestoredWatch.current) return;
    if (!savedData._savedAt) return;
    hasRestoredWatch.current = true;
    if (savedData.watchData && Object.keys(watchData).length === 0) setWatchData(savedData.watchData);
    if (savedData.videoDurations && Object.keys(videoDurations).length === 0) setVideoDurations(savedData.videoDurations);
  }, [savedData]);

  const playerRef = useRef(null);
  const timerRef = useRef(null);

  // Debounced Sync to Universal Progress System
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!isReady || !data?.videos) return;

      let completedCount = 0;
      let totalPercent = 0;
      
      data.videos.forEach(v => {
        const sec = watchData[v.id] || 0;
        const total = videoDurations[v.id] || v.duration_sec || v.sim_duration || 300;
        const percent = Math.min(Math.round((sec / total) * 100), 100);
        totalPercent += percent;
        if (percent >= 90) completedCount++;
      });
      
      const overallProgress = Math.round(totalPercent / data.videos.length);
      const isFullyCompleted = completedCount === data.videos.length;
      
      const progressData = { 
        watchData,
        videoDurations,
        completedCount,
        totalVideos: data.videos.length,
        lastWatchedId: activeVideo?.id,
      };

      saveProgress(progressData, isFullyCompleted, overallProgress);
      
      if (isFullyCompleted) {
        markComplete(100);
      }
      
    }, 1500); // 1.5 second debounce

    return () => clearTimeout(handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchData, videoDurations, isReady]); // Dependency on watchData and isReady

  // Component Ready Effect
  useEffect(() => {
    // Mark as ready once data is available
    if (data?.videos) {
      setIsReady(true);
    }
  }, [data?.videos]);


  const startTimer = (id) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        const currentTime = Math.floor(playerRef.current.getCurrentTime());
        setWatchData(prev => {
          if (prev[id] === currentTime) return prev; // No change
          return { ...prev, [id]: currentTime };
        });
      }
    }, 1000);
  };

  const stopTimer = () => { 
    if (timerRef.current) { 
      clearInterval(timerRef.current); 
      timerRef.current = null; 
    } 
    // Force save on stop
    if (playerRef.current && activeVideo && typeof playerRef.current.getCurrentTime === 'function') {
      const currentTime = Math.floor(playerRef.current.getCurrentTime());
       setWatchData(prev => ({ ...prev, [activeVideo.id]: currentTime }));
    }
  };

  // YT API Load
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  }, []);

const handleClosePlayer = () => {
    if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
      const currentTime = Math.floor(playerRef.current.getCurrentTime());
      setWatchData(prev => ({ ...prev, [activeVideo.id]: currentTime }));
    }
    setActiveVideo(null);
    setPlayerError(null);
  };

  useEffect(() => {
    if (!activeVideo) {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      return;
    };
    
    let player;
    const init = () => {
      if (!window.YT || !window.YT.Player) {
        setPlayerError('YouTube player is loading… Please wait a moment.');
        setTimeout(init, 1000);
        return;
      }
      setPlayerError(null);
      const startTime = watchData[activeVideo.id] || 0;

      player = new window.YT.Player('yt-player-frame', {
        videoId: activeVideo.videoId,
        playerVars: {
          'autoplay': 1,
          'controls': 1,
          'rel': 0,
          'modestbranding': 1,
          'start': startTime,
          'origin': window.location.origin
        },
        events: {
          'onReady': (e) => {
            const duration = e.target.getDuration();
            if (duration > 0 && videoDurations[activeVideo.id] !== duration) {
              setVideoDurations(prev => ({...prev, [activeVideo.id]: duration}));
            }
            e.target.playVideo();
          },
          'onStateChange': (e) => {
            setPlayerState(e.data);
            if (e.data === 1) { // Playing
              startTimer(activeVideo.id);
              setPlayerError(null);
            } else { // Paused, Ended, etc.
              stopTimer();
            }
          },
          'onError': (e) => {
            setPlayerError(`Video unavailable (error ${e.data}). Try another video.`);
            setPlayerState(-2); // Error state
          }
        }
      });
      playerRef.current = player;
    };
    
    init();
    
    return () => { 
      stopTimer(); 
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null; // Explicitly nullify
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeVideo]);

  const getPercent = (id, fallback) => {
    const sec = watchData[id] || 0;
    const total = videoDurations[id] || fallback || 300;
    return Math.min(100, Math.floor((sec / total) * 100));
  };

  if (!data) {
    return <div className="p-10 text-center animate-pulse text-slate-400">Loading Daily Watch...</div>;
  }
  if (!Array.isArray(data.videos) || data.videos.length === 0) {
    return <div className="p-10 text-center text-slate-400">No Daily Watch videos available.</div>;
  }

  return (
    <div className="pb-24">
      <div className="bg-rose-50 p-6 rounded-2xl border-2 border-rose-100 mb-8 flex justify-between items-center shadow-sm">
        <div>
          <h2 className="text-xl font-black text-rose-800 uppercase flex items-center gap-2"><Clock className="animate-pulse"/> Daily Watch</h2>
          <p className="text-xs text-rose-600 font-bold mt-1">Listen to English naturally every day.</p>
        </div>
        <div className="bg-white px-6 py-2 rounded-2xl border-2 border-rose-200 shadow-inner">
            <span className="text-2xl font-black text-rose-500">{data.videos.filter(v => getPercent(v.id, v.duration_sec || v.sim_duration) >= 90).length}</span>
            <span className="text-sm font-bold text-slate-400">/{data.videos.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.videos.map(v => (
          <VideoItem key={v.id} video={v} percent={getPercent(v.id, v.duration_sec || v.sim_duration)} onClick={setActiveVideo} />
        ))}
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <button onClick={handleClosePlayer} className="absolute top-6 right-6 text-white bg-white/10 hover:bg-rose-500 p-3 rounded-full transition-all"><X size={24}/></button>
          <div className="w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 relative">
            {playerError ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-white">
                  <AlertCircle className="w-12 h-12 mx-auto mb-3 text-rose-400" />
                  <p className="font-bold text-lg">{playerError}</p>
                  <p className="text-sm text-slate-400 mt-1">Video ID: {activeVideo.videoId}</p>
                </div>
              </div>
            ) : (
              <div id="yt-player-frame" className="w-full h-full"></div>
            )}
          </div>
          <div className="mt-8 text-center max-w-2xl">
            <h3 className="text-white font-black text-2xl mb-2">{activeVideo.title}</h3>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 rounded-full border border-indigo-500/30 text-indigo-300 font-mono text-sm">
              {playerState === 1 ? 'Tracking Progress...' : playerError ? 'Player Error' : 'Paused'} • {getPercent(activeVideo.id, videoDurations[activeVideo.id] || activeVideo.duration_sec || activeVideo.sim_duration)}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DailyWatch;
