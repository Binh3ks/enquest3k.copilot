import fs from 'fs';
import path from 'path';

const filePath = 'src/modules/watch/DailyWatch.jsx';

// NỘI DUNG DAILY_WATCH.JSX CHUẨN (V6)
const newContent = `import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, CheckCircle, Lock, Star, Clock, X, Gamepad2, Loader2, AlertCircle, PauseCircle } from 'lucide-react';

const DailyWatch = ({ data, onReportProgress }) => {
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [playerState, setPlayerState] = useState(-1);
  const [watchData, setWatchData] = useState({}); 
  const [errorMsg, setErrorMsg] = useState(null);
  
  const playerRef = useRef(null); 
  const progressIntervalRef = useRef(null);
  const watchDataRef = useRef({}); 

  const activeVideo = useMemo(() => 
    data?.videos?.find(v => v.id === activeVideoId) || null, 
    [data, activeVideoId]
  );

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('daily_watch_seconds');
    if (saved) {
      const parsed = JSON.parse(saved);
      setWatchData(parsed);
      watchDataRef.current = parsed;
    } else if (data && data.videos) {
      const initial = {};
      data.videos.forEach(v => initial[v.id] = 0);
      setWatchData(initial);
      watchDataRef.current = initial;
    }
  }, [data]);

  // REPORT PROGRESS (DEBOUNCED)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
        if (data && data.videos && onReportProgress) {
            let completedCount = 0;
            data.videos.forEach(v => {
                const currentSec = watchData[v.id] || 0;
                const totalSec = v.sim_duration || 120;
                const percent = Math.floor((currentSec / totalSec) * 100);
                if (percent >= 90) completedCount++;
            });
            
            const totalProgress = Math.round((completedCount / data.videos.length) * 100);
            onReportProgress(totalProgress);
            localStorage.setItem('daily_watch_seconds', JSON.stringify(watchData));
        }
    }, 1000); 

    return () => clearTimeout(timeoutId);
  }, [watchData, data, onReportProgress]);

  const getThumbnail = (videoId) => {
    return "https://img.youtube.com/vi/" + videoId + "/mqdefault.jpg";
  };

  const startTracking = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    
    progressIntervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const currentTime = playerRef.current.getCurrentTime(); 
        
        if (currentTime > 0 && activeVideo) {
            const videoId = activeVideo.id;
            const currentSaved = watchDataRef.current[videoId] || 0;
            
            if (currentTime > currentSaved) {
                watchDataRef.current = {
                    ...watchDataRef.current,
                    [videoId]: Math.floor(currentTime)
                };
                setWatchData(prev => ({
                    ...prev,
                    [videoId]: Math.floor(currentTime)
                }));
            }
        }
      }
    }, 1000); 
  };

  const stopTracking = () => {
    if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
    }
  };

  // PLAYER LIFECYCLE
  useEffect(() => {
    if (!activeVideoId || !activeVideo) return;

    let checkApiInterval;
    
    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        if (checkApiInterval) clearInterval(checkApiInterval);
        
        if (playerRef.current) {
            try { playerRef.current.destroy(); } catch(e){}
        }

        try {
            playerRef.current = new window.YT.Player('yt-player-frame', {
              height: '100%',
              width: '100%',
              videoId: activeVideo.videoId,
              playerVars: {
                'autoplay': 1,
                'rel': 0,
                'modestbranding': 1,
                'controls': 1,
                'fs': 1 
              },
              events: {
                'onReady': (event) => {
                    event.target.playVideo();
                },
                'onStateChange': (event) => {
                    setPlayerState(event.data);
                    
                    if (event.data === window.YT.PlayerState.PLAYING) {
                        startTracking();
                    } 
                    else if (event.data === window.YT.PlayerState.ENDED) {
                        stopTracking();
                        const maxTime = activeVideo.sim_duration || 120;
                        setWatchData(prev => ({ ...prev, [activeVideo.id]: maxTime }));
                        watchDataRef.current[activeVideo.id] = maxTime;
                    }
                    else { 
                        stopTracking();
                    }
                },
                'onError': () => {
                    stopTracking();
                    setErrorMsg("Video không khả dụng (Bị chặn hoặc lỗi mạng).");
                }
              }
            });
        } catch (err) {
            setErrorMsg("Lỗi khởi tạo trình phát Youtube.");
        }
      }
    };

    if (window.YT && window.YT.Player) {
        initPlayer();
    } else {
        checkApiInterval = setInterval(() => {
            if (window.YT && window.YT.Player) initPlayer();
        }, 500);
    }

    return () => {
      if (checkApiInterval) clearInterval(checkApiInterval);
      stopTracking();
      if (playerRef.current) {
          try { playerRef.current.destroy(); playerRef.current = null; } catch(e){}
      }
    };
  }, [activeVideoId]); 

  const handleOpenModal = (video) => {
    setErrorMsg(null);
    setPlayerState(-1);
    setActiveVideoId(video.id);
  };

  const handleCloseModal = () => {
    setActiveVideoId(null); 
    setPlayerState(-1);
  };

  const getPercent = (videoId, totalDuration) => {
    const seconds = watchData[videoId] || 0;
    const p = Math.floor((seconds / totalDuration) * 100);
    return Math.min(100, p);
  };

  if (!data || !data.videos) return <div className="p-8 text-center">Loading Videos...</div>;

  const realCompleted = data.videos.every(v => getPercent(v.id, v.sim_duration || 120) >= 90);

  return (
    <div className="pb-24">
      <div className="bg-rose-100 p-4 rounded-xl border border-rose-200 mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-rose-800 uppercase flex items-center">
            Daily Watch
            <span className="ml-2 text-xs bg-rose-200 px-2 py-1 rounded text-rose-600">Passive Listening</span>
          </h2>
          <p className="text-sm text-slate-600 font-medium">Listening Time: Actual Playback</p>
        </div>
        <div className="text-center">
           <div className={\`text-2xl font-black \${realCompleted ? 'text-green-500' : 'text-slate-400'}\`}>
             {data.videos.filter(v => getPercent(v.id, v.sim_duration || 120) >= 90).length}/{data.videos.length}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {data.videos.map((video) => {
          const percent = getPercent(video.id, video.sim_duration || 120);
          const isDone = percent >= 90;

          return (
            <div 
              key={video.videoId || video.id} 
              onClick={() => handleOpenModal(video)}
              className={\`relative rounded-xl overflow-hidden shadow-md cursor-pointer group hover:scale-[1.02] transition-all bg-white border-2 \${isDone ? 'border-green-400' : 'border-slate-100'}\`}
            >
              <div className="aspect-video bg-slate-200 relative">
                 <img src={getThumbnail(video.videoId)} alt={video.title} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      {isDone ? <CheckCircle className="w-6 h-6 text-green-500" /> : <Play className="w-5 h-5 text-rose-500 ml-1" />}
                    </div>
                 </div>
                 <div className="absolute bottom-0 left-0 h-1.5 bg-slate-200 w-full">
                   <div className={\`h-full transition-all duration-500 \${isDone ? 'bg-green-500' : 'bg-rose-500'}\`} style={{ width: \`\${percent}%\` }}></div>
                 </div>
              </div>
              <div className="p-3">
                 <h3 className="font-bold text-slate-700 truncate text-sm">{video.title}</h3>
                 <div className="flex justify-between items-center mt-1">
                   <span className="text-xs text-slate-500 flex items-center"><Clock className="w-3 h-3 mr-1"/> {video.duration}</span>
                   <span className={\`text-xs font-bold \${isDone ? 'text-green-600' : 'text-rose-500'}\`}>{percent}%</span>
                 </div>
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="text-lg font-black text-slate-700 mb-4 flex items-center gap-2">
        <Gamepad2 className="w-6 h-6 text-amber-500" /> 
        GAME ZONE
        {!realCompleted && <span className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded ml-2">Locked</span>}
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        {data.bonus_games && data.bonus_games.map((game, idx) => (
           <div key={idx} className={\`relative block p-4 rounded-xl border-2 transition-all \${realCompleted ? 'bg-amber-50 border-amber-200 hover:border-amber-400 cursor-pointer shadow-sm hover:shadow-md' : 'bg-slate-100 border-slate-200 opacity-60'}\`}>
               <a href={realCompleted ? game.url : '#'} target={realCompleted ? "_blank" : "_self"} rel="noreferrer" className="flex items-center justify-between w-full h-full">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold text-lg">{idx + 1}</div>
                     <div>
                        <h4 className="font-bold text-slate-800">{game.title}</h4>
                        <p className="text-xs text-slate-500">{game.description}</p>
                     </div>
                  </div>
                  {realCompleted ? <Star className="w-5 h-5 fill-amber-400 text-amber-400" /> : <Lock className="w-5 h-5 text-slate-400" />}
               </a>
           </div>
        ))}
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 animate-in fade-in duration-200">
           <button onClick={handleCloseModal} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/30 rounded-full text-white transition-all z-50">
             <X className="w-8 h-8" />
           </button>
            
           <div className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative border border-slate-800">
               {errorMsg ? (
                   <div className="w-full h-full flex flex-col items-center justify-center text-rose-400">
                       <AlertCircle className="w-12 h-12 mb-2"/>
                       <p>{errorMsg}</p>
                   </div>
               ) : (
                   <div id="yt-player-frame" className="w-full h-full"></div>
               )}
           </div>
            
           <div className="mt-6 text-white text-center">
               <h2 className="text-2xl font-bold mb-2">{activeVideo.title}</h2>
               {/* FIX: HIỂN THỊ TIMER KỂ CẢ KHI PAUSED */}
               <div className="h-8"> 
                   {!errorMsg && (
                       getPercent(activeVideo.id, activeVideo.sim_duration || 120) >= 90 ? (
                           <div className="inline-flex items-center justify-center gap-2 text-green-400 font-mono bg-green-900/30 px-4 py-1 rounded-full border border-green-800">
                             <CheckCircle className="w-4 h-4" /> COMPLETED!
                           </div>
                       ) : playerState === 1 ? (
                           <div className="inline-flex items-center justify-center gap-2 text-green-400 font-mono bg-green-900/30 px-4 py-1 rounded-full border border-green-800 animate-pulse">
                             <Loader2 className="w-4 h-4 animate-spin" />
                             Tracking: {getPercent(activeVideo.id, activeVideo.sim_duration || 120)}%
                           </div>
                       ) : (
                           // KHI PAUSED VẪN HIỆN PHẦN TRĂM
                           <div className="inline-flex items-center justify-center gap-2 text-amber-400 font-mono bg-amber-900/30 px-4 py-1 rounded-full border border-amber-800">
                             <PauseCircle className="w-4 h-4" />
                             Paused: {getPercent(activeVideo.id, activeVideo.sim_duration || 120)}%
                           </div>
                       )
                   )}
               </div>
           </div>
        </div>
      )}
    </div>
  );
};
export default DailyWatch;`;

fs.writeFileSync(filePath, newContent, 'utf8');
console.log(`✅ DailyWatch.jsx UI Fixed: Timer always visible & Duration filter logic ready.`);
