import React, { useState, useEffect, useRef } from 'react';
import { Play, CheckCircle, Clock, X, Gamepad2, AlertCircle } from 'lucide-react';

const DailyWatch = ({ data, onReportProgress }) => {
  // State cô lập (Anti-Flash)
  const [activeVideo, setActiveVideo] = useState(null); 
  const [playerState, setPlayerState] = useState(-1);
  const [watchData, setWatchData] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  
  // State mới: Lưu thời lượng thực tế từ API để tính % chính xác
  const [realDuration, setRealDuration] = useState(0);

  const playerRef = useRef(null);
  const timerRef = useRef(null);

  // 1. Init API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // 2. Load LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('daily_watch_seconds');
      if (saved) setWatchData(JSON.parse(saved));
    } catch (e) {}
  }, []);

  // 3. Report Progress
  useEffect(() => {
    const handler = setTimeout(() => {
      if (data && data.videos && onReportProgress) {
        let completedCount = 0;
        data.videos.forEach(v => {
           // Ở view ngoài (lưới), dùng sim_duration làm chuẩn tạm thời
           const percent = getPercent(v.id, v.sim_duration || 300);
           if (percent >= 90) completedCount++;
        });
        const total = Math.round((completedCount / data.videos.length) * 100);
        onReportProgress(total);
        localStorage.setItem('daily_watch_seconds', JSON.stringify(watchData));
      }
    }, 1000);
    return () => clearTimeout(handler);
  }, [watchData, data]);

  useEffect(() => {
    return () => {
      stopTimer();
      if (playerRef.current) { try { playerRef.current.destroy(); } catch(e){} }
    };
  }, []);

  // 4. PLAYER LOGIC
  useEffect(() => {
    if (!activeVideo) return;

    // Reset duration thực tế về 0 khi mở video mới
    setRealDuration(0); 

    let initInterval;
    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        if (initInterval) clearInterval(initInterval);
        if (playerRef.current) { try { playerRef.current.destroy(); } catch(e){} }

        try {
          playerRef.current = new window.YT.Player('yt-player-frame', {
            height: '100%', width: '100%', videoId: activeVideo.videoId,
            playerVars: { 'autoplay': 1, 'rel': 0, 'modestbranding': 1, 'controls': 1, 'origin': window.location.origin },
            events: {
              'onReady': (e) => { 
                  e.target.playVideo();
                  // LẤY THỜI GIAN THỰC TẾ NGAY KHI LOAD
                  const d = e.target.getDuration();
                  if (d && d > 0) setRealDuration(d);
              },
              'onStateChange': (e) => {
                setPlayerState(e.data);
                // Cập nhật lại duration nếu lúc ready chưa lấy được
                if (e.data === 1) {
                    const d = e.target.getDuration();
                    if (d && d > 0) setRealDuration(d);
                    startTimer(activeVideo.id);
                } else {
                    stopTimer();
                }
              },
              'onError': () => { stopTimer(); setErrorMsg("Video unavailable."); }
            }
          });
        } catch (err) { setErrorMsg("Player Error."); }
      }
    };

    if (window.YT && window.YT.Player) initPlayer();
    else initInterval = setInterval(() => { if (window.YT && window.YT.Player) initPlayer(); }, 500);

    return () => {
      if (initInterval) clearInterval(initInterval);
      stopTimer();
    };
  }, [activeVideo]);

  const startTimer = (videoId) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setWatchData(prev => ({ ...prev, [videoId]: (prev[videoId] || 0) + 1 }));
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };

  const handleOpen = (video) => {
    setErrorMsg(null);
    setPlayerState(-1);
    setActiveVideo({ ...video });
  };

  const handleClose = () => {
    stopTimer();
    setActiveVideo(null);
  };

  // Hàm tính %: Nếu đang xem (có realDuration) thì dùng realDuration, ngược lại dùng sim_duration
  const getPercent = (videoId, fallbackDuration) => {
    const sec = watchData[videoId] || 0;
    // Nếu đang xem video này và đã lấy được realDuration, ưu tiên dùng nó
    const total = (activeVideo && activeVideo.id === videoId && realDuration > 0) 
                  ? realDuration 
                  : fallbackDuration;
    
    if (!total || total === 0) return 0;
    return Math.min(100, Math.floor((sec / total) * 100));
  };

  if (!data || !data.videos) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 mb-6 flex justify-between items-center shadow-sm">
        <div>
          <h2 className="text-lg font-black text-rose-800 uppercase flex items-center gap-2">
            <Clock className="w-5 h-5"/> Daily Watch
          </h2>
          <p className="text-xs text-rose-600 font-bold mt-1">Passive Listening</p>
        </div>
        <div className="text-right">
           <div className="text-2xl font-black text-rose-400">
             {data.videos.filter(v => getPercent(v.id, v.sim_duration || 300) >= 90).length}/{data.videos.length}
           </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {data.videos.map((v) => (
          <div key={v.id} onClick={() => handleOpen(v)}
            className="relative rounded-xl overflow-hidden shadow-md cursor-pointer group bg-white border-2 border-slate-100 hover:border-rose-300 transition-all">
            <div className="aspect-video bg-slate-200 relative">
               <img src={v.thumb} alt={v.title} className="w-full h-full object-cover" onError={(e)=>{e.target.src='https://via.placeholder.com/320x180'}}/>
               <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10">
                  <Play className="w-10 h-10 text-white opacity-80"/>
               </div>
               <div className="absolute bottom-0 left-0 h-1 bg-slate-200 w-full">
                  <div className="h-full bg-green-500" style={{ width: `${getPercent(v.id, v.sim_duration||300)}%` }}></div>
               </div>
            </div>
            <div className="p-3">
               <h3 className="font-bold text-slate-700 text-sm truncate">{v.title}</h3>
               <div className="text-xs text-slate-500 mt-1 flex justify-between">
                 <span>{v.duration}</span>
                 <span>{getPercent(v.id, v.sim_duration||300)}%</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center p-4">
           <button onClick={handleClose} className="absolute top-5 right-5 text-white bg-white/10 p-2 rounded-full"><X/></button>
           <div className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden border border-slate-700 relative">
              {errorMsg ? <div className="text-white p-10 text-center">{errorMsg}</div> : <div id="yt-player-frame" className="w-full h-full"></div>}
           </div>
           <div className="mt-4 text-white text-center font-bold text-xl">{activeVideo.title}</div>
           <div className="text-slate-400 text-sm mt-1">
             {/* Đã đổi chữ Recording -> Tracking Time */}
             {playerState===1 ? "Tracking Time..." : "Paused"} ({getPercent(activeVideo.id, realDuration || activeVideo.sim_duration || 300)}%)
           </div>
        </div>
      )}
    </div>
  );
};
export default DailyWatch;
