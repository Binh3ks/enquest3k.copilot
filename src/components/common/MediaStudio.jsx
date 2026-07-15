import React, { useState, useEffect, useRef } from 'react';
import { FileAudio, Image as ImageIcon, Copy, Check, Terminal, Youtube, Layers, Sparkles, X, Trash2, Edit3, Key } from 'lucide-react';
import weekIndex from '../../data/weeks/index';
import syllabusDB from '../../data/syllabus_database'; 

// --- CẤU HÌNH AUDIO/IMAGE (CODE CŨ - GIỮ NGUYÊN + BỔ SUNG) ---
const EDGE_VOICES = [
    { id: 'female_3', name: '👩 Ava (US - Natural)', value: 'en-US-AvaNeural' },
    { id: 'male_3', name: '👨 Andrew (US - Deep)', value: 'en-US-AndrewNeural' },
    { id: 'kid', name: '👶 Ana (US - Kid)', value: 'en-US-AnaNeural' },
    { id: 'female', name: '👩 Aria (US - Professional)', value: 'en-US-AriaNeural' },
    { id: 'male', name: '👨 Christopher (US - Formal)', value: 'en-US-ChristopherNeural' },
    { id: 'female_2', name: '👩 Jenny (US - Friendly)', value: 'en-US-JennyNeural' },
];
const OPENAI_VOICES = [
    { id: 'nova', name: '⚡ Nova (Nữ - Năng lượng)', value: 'nova' },
    { id: 'shimmer', name: '💎 Shimmer (Nữ - Trong trẻo)', value: 'shimmer' },
    { id: 'alloy', name: '🔔 Alloy (Nữ - Tự nhiên)', value: 'alloy' },
    { id: 'echo', name: '🎤 Echo (Nam - Ấm áp)', value: 'echo' },
    { id: 'onyx', name: '🗿 Onyx (Nam - Trầm)', value: 'onyx' },
    { id: 'fable', name: '🇬🇧 Fable (Teenager)', value: 'fable' },
];
// BỔ SUNG: Google Neural2 Voices cho voiceConfig override
const GOOGLE_NEURAL2_VOICES = [
    { id: 'us_d', name: '🇺🇸 US Male D (Authoritative)', value: 'en-US-Neural2-D' },
    { id: 'us_f', name: '🇺🇸 US Female F (Clear)', value: 'en-US-Neural2-F' },
    { id: 'us_e', name: '🇺🇸 US Neutral E', value: 'en-US-Neural2-E' },
    { id: 'us_a', name: '🇺🇸 US Male A', value: 'en-US-Neural2-A' },
    { id: 'us_g', name: '🇺🇸 US Male G', value: 'en-US-Neural2-G' },
    { id: 'gb_a', name: '🇬🇧 GB Male A (British)', value: 'en-GB-Neural2-A' },
    { id: 'gb_b', name: '🇬🇧 GB Female B (British)', value: 'en-GB-Neural2-B' },
    { id: 'gb_d', name: '🇬🇧 GB Male D (British)', value: 'en-GB-Neural2-D' },
    { id: 'au_a', name: '🇦🇺 AU Male A (Australian)', value: 'en-AU-Neural2-A' },
    { id: 'au_b', name: '🇦🇺 AU Female B (Australian)', value: 'en-AU-Neural2-B' },
];
const AUDIO_PROVIDERS = [
    { id: 'edge', name: '☁️ Edge TTS (Free/Fast)', icon: '🚀' },
    { id: 'openai', name: '✨ OpenAI (High Quality)', icon: '💎' },
    { id: 'google', name: '🌐 Google Neural2 (voiceConfig)', icon: '🎤' },
    { id: 'macos', name: '🍎 MacOS (Offline)', icon: '💻' }
];

const MediaStudio = ({ defaultWeekId }) => {
  // State chung
  const [activeMode, setActiveMode] = useState('video'); 
  const [command, setCommand] = useState('');
  const [copied, setCopied] = useState(false);
  const [jsonOutput, setJsonOutput] = useState('');
  
  // State Video (Cải tiến: Hỗ trợ nhập tay + Smart Fill)
  const [startWeekVid, setStartWeekVid] = useState(defaultWeekId || 1);
  const [multiWeekData, setMultiWeekData] = useState([]);
  const [apiKeyVideo, setApiKeyVideo] = useState(''); // Key riêng cho Video để tiện dụng
  
  // State Audio/Image (Khôi phục logic cũ)
  const [startWeek, setStartWeek] = useState(defaultWeekId || 1);
  const [endWeek, setEndWeek] = useState(defaultWeekId || 1);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(EDGE_VOICES[0].value);
  const [selectedProvider, setSelectedProvider] = useState('edge');

  const jsonRef = useRef(null);
  const cmdRef = useRef(null);

  // Effect Audio Provider (Code cũ + bổ sung Google)
  useEffect(() => {
      if (selectedProvider === 'edge') setSelectedVoice(EDGE_VOICES[0].value);
      if (selectedProvider === 'openai') setSelectedVoice(OPENAI_VOICES[0].value);
      if (selectedProvider === 'google') setSelectedVoice(GOOGLE_NEURAL2_VOICES[0].value);
  }, [selectedProvider]);

  // --- LOGIC VIDEO ---
  useEffect(() => {
      const initialData = [];
      const start = parseInt(startWeekVid) || 1;
      for(let i=0; i<3; i++) {
          const wId = start + i;
          if (wId > 144) break;
          const wInfo = weekIndex.find(w => w.id === wId);
          // Lấy topic từ dữ liệu hiện tại hoặc tạo mới
          const existingTopic = wInfo ? wInfo.title_en : `Topic Week ${wId}`;
          const existingVideos = wInfo?.data?.stations?.daily_watch?.videos || [];
          
          const inputs = Array(5).fill().map((_, idx) => {
              const vid = existingVideos[idx];
              if (vid && vid.videoId && vid.videoId !== 'placeholder') {
                  // Hiển thị query cũ, title, hoặc ID. Ưu tiên cái nào dễ đọc.
                  const display = vid.query || vid.title || `Video ${vid.videoId}`;
                  // Đánh dấu [KEEP] để biết video này đã tồn tại
                  return { id: (idx + 1).toString(), query: `[KEEP] ${display}`, isKeep: true };
              }
              return { id: (idx + 1).toString(), query: '', isKeep: false };
          });
          initialData.push({ weekId: wId, topicSeed: existingTopic, inputs: inputs });
      }
      setMultiWeekData(initialData);
  }, [startWeekVid, activeMode]);

  // Handler: Sửa ô input video (Cho phép nhập tay URL/Keyword)
  const handleVideoInputChange = (wIdx, vIdx, val) => { 
      const d=[...multiWeekData]; 
      d[wIdx].inputs[vIdx].query=val; 
      // Nếu người dùng sửa, bỏ cờ [KEEP] để tool biết cần xử lý lại
      if (val && !val.startsWith('[KEEP]')) d[wIdx].inputs[vIdx].isKeep = false;
      setMultiWeekData(d); 
  };

  // Handler: Xóa trắng tuần
  const handleClearWeek = (wIdx) => { 
      const d=[...multiWeekData]; 
      d[wIdx].inputs.forEach(i => { i.query=''; i.isKeep=false; }); 
      setMultiWeekData(d); 
  };
  
  // Handler: Smart Fill (Dùng Database Syllabus)
  const smartFillWeek = (wIdx) => {
      const d=[...multiWeekData];
      const wId = d[wIdx].weekId;
      const dbData = syllabusDB[wId];
      
      const slots = dbData ? [
          dbData.topic[0], dbData.grammar[0], dbData.math[0], dbData.science[0], `${dbData.topic[0].replace("vocabulary", "")} song`
      ] : [`Topic Week ${wId}`, `Grammar Week ${wId}`, `Math Week ${wId}`, `Science Week ${wId}`, `Song Week ${wId}`];

      d[wIdx].inputs.forEach((item, idx) => {
          // Chỉ điền vào ô trống hoặc ô không phải [KEEP] (không ghi đè cái đang có)
          if (!item.query || !item.query.startsWith('[KEEP]')) {
              item.query = slots[idx];
              item.isKeep = false;
          }
      });
      setMultiWeekData(d);
  };
  const fillAll = () => multiWeekData.forEach((_, i) => smartFillWeek(i));

  // --- GENERATE COMMAND ---
  const generateCommand = () => {
      setCommand(''); setJsonOutput('');
      const s = parseInt(startWeek) || 1;
      const e = parseInt(endWeek) || 1;

      if (activeMode === 'video') {
          // --- LOGIC VIDEO MỚI (JSON Task) ---
          const weeksConfig = multiWeekData.map(w => {
              // Lọc các ô cần update (không phải [KEEP] và không rỗng)
              const valid = w.inputs.filter(v => v.query && v.query.trim() !== '' && !v.query.startsWith('[KEEP]'))
                  .map(v => ({ id: parseInt(v.id), query: v.query.replace(/["\\]/g, '').trim() })); // Sanitize input
              return valid.length ? { weekId: w.weekId, videos: valid } : null;
          }).filter(w => w);

          if (!weeksConfig.length) return setCommand("echo '⚠️ Không có thay đổi nào. Hãy nhập từ khóa hoặc dùng Smart Fill.'");
          
          // Format: Array trực tiếp, không wrap trong { weeks: [...] }
          const jsonStr = JSON.stringify(weeksConfig, null, 2);
          setJsonOutput(jsonStr);
          const safeJsonStr = jsonStr.replace(/'/g, "'\\''");
          
          // Tự động inject API Key và đúng path
          let cmd = `echo '${safeJsonStr}' > src/data/video_tasks.json && node tools/update_videos.js`;
          if (apiKeyVideo.trim()) {
              cmd = `export YOUTUBE_API_KEY="${apiKeyVideo.trim()}" && ` + cmd;
          }
          setCommand(cmd);

      } else if (activeMode === 'image') {
          // --- LOGIC IMAGE CŨ (KHÔI PHỤC) ---
          if (!apiKeyInput.trim()) { setCommand("ERROR: Vui lòng nhập API Key (Gemini/Imagen)"); return; }
          setCommand(`node tools/batch_manager.js ${s} ${e} "${apiKeyInput.trim()}"`);

      } else if (activeMode === 'audio') {
          // --- LOGIC AUDIO (BỔ SUNG GOOGLE NEURAL2) ---
          let cmd = '';
          
          if (selectedProvider === 'google') {
              // Google Neural2 method (generate_audio.js)
              // Voice override qua environment variables
              cmd = `VOICE_OVERRIDE="${selectedVoice}" node tools/generate_audio.js ${s} ${e}`;
              if (apiKeyInput.trim()) {
                  cmd = `export GOOGLE_TTS_API_KEY="${apiKeyInput.trim()}" && ` + cmd;
              }
          } else {
              // Edge TTS / OpenAI TTS method (create_audio_tasks_only.js + generate_audio.py)
              cmd = `node tools/create_audio_tasks_only.js ${s} ${e} && python3 tools/generate_audio.py --provider ${selectedProvider} --voice "${selectedVoice}"`;
              if (selectedProvider === 'openai') {
                  if (!apiKeyInput.trim()) { setCommand("ERROR: Vui lòng nhập OpenAI Key"); return; }
                  cmd = `export OPENAI_API_KEY="${apiKeyInput.trim()}" && ` + cmd;
              }
          }
          setCommand(cmd);
      }
  };

  const handleCopy = (t) => { navigator.clipboard.writeText(t); setCopied(true); setTimeout(()=>setCopied(false), 2000); };

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-2xl font-bold text-indigo-700 border-b pb-3 flex items-center gap-3"><Terminal/> Production Studio v31 (Hybrid Stable)</h3>
      
      {/* TABS */}
      <div className="flex space-x-2 border-b border-slate-200 pb-3">
        {['video','audio','image'].map(m => (
            <button key={m} onClick={()=>setActiveMode(m)} className={`px-4 py-2 rounded-lg font-bold capitalize transition-all ${activeMode===m?'bg-indigo-600 text-white shadow-lg':'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>{m}</button>
        ))}
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
        
        {/* --- VIDEO MODE (Manual + Smart + URL Support) --- */}
        {activeMode === 'video' && (
          <div className="space-y-6">
              {/* API Key Video */}
              <div className="flex gap-4 items-center bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                 <Key size={16} className="text-yellow-700"/>
                 <input type="password" value={apiKeyVideo} onChange={(e)=>setApiKeyVideo(e.target.value)} className="flex-1 p-2 text-sm border border-yellow-300 rounded bg-white outline-none" placeholder="YouTube API Key (Optional - Auto Inject)"/>
              </div>

              <div className="flex justify-between items-center bg-white p-4 rounded-xl border shadow-sm">
                 <div className="flex gap-4 items-center">
                    <label className="text-sm font-bold text-slate-700">Start Week:</label>
                    <input type="number" value={startWeekVid} onChange={(e)=>setStartWeekVid(e.target.value)} className="w-20 p-2 border-2 rounded-lg font-bold text-center outline-none focus:border-indigo-500" min="1" max="144"/>
                 </div>
                 <button onClick={fillAll} className="px-3 py-2 bg-blue-100 text-blue-700 font-bold rounded-lg flex gap-2 text-sm items-center hover:bg-blue-200 transition-colors"><Sparkles size={14}/> Suggest All</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {multiWeekData.map((w, wIdx) => (
                    <div key={w.weekId} className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                       <div className="flex justify-between mb-3 border-b pb-2">
                          <h4 className="font-bold text-indigo-900">Week {w.weekId}</h4>
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono">{w.topicSeed}</span>
                       </div>
                       <div className="space-y-2">
                          {w.inputs.map((vid, vIdx) => (
                             <div key={vIdx} className="flex gap-1 items-center group">
                                <span className="text-[10px] font-bold text-slate-400 w-4 text-center">{vid.id}</span>
                                {/* Ô INPUT QUAN TRỌNG: Cho phép paste URL hoặc gõ từ khóa */}
                                <input 
                                    type="text" 
                                    className={`flex-1 p-2 text-xs border rounded transition-all outline-none focus:ring-2 focus:ring-indigo-200 ${vid.query.startsWith('[KEEP]')?'bg-green-50 text-green-700 border-green-100':'bg-white border-slate-200'}`} 
                                    value={vid.query} 
                                    onChange={(e)=>handleVideoInputChange(wIdx,vIdx,e.target.value)}
                                    placeholder="Paste URL or Keyword..."
                                />
                                <button onClick={()=>handleVideoInputChange(wIdx,vIdx,'')} className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"><X size={14}/></button>
                             </div>
                          ))}
                       </div>
                       <div className="mt-3 flex gap-2 pt-2 border-t">
                          <button onClick={()=>handleClearWeek(wIdx)} className="text-xs text-rose-500 font-bold px-2 flex items-center gap-1 hover:bg-rose-50 rounded py-1"><Trash2 size={12}/> Clear</button>
                          <button onClick={()=>smartFillWeek(wIdx)} className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded font-bold ml-auto flex items-center gap-1 hover:bg-indigo-100"><Edit3 size={12}/> Auto-Fill</button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
           )}

        {/* --- AUDIO SETTINGS (EDGE + OPENAI + GOOGLE NEURAL2) --- */}
        {activeMode === 'audio' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                 <label className="block text-xs font-bold mb-1 text-slate-500 uppercase">Provider</label>
                 <select value={selectedProvider} onChange={(e)=>setSelectedProvider(e.target.value)} className="w-full p-3 border-2 border-slate-200 rounded-lg font-bold bg-white outline-none">
                    {AUDIO_PROVIDERS.map(p=><option key={p.id} value={p.id}>{p.icon} {p.name}</option>)}
                 </select>
              </div>
              <div>
                 <label className="block text-xs font-bold mb-1 text-slate-500 uppercase">Voice {selectedProvider === 'google' && <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded ml-1">Override voiceConfig</span>}</label>
                 <select value={selectedVoice} onChange={(e)=>setSelectedVoice(e.target.value)} className="w-full p-3 border-2 border-slate-200 rounded-lg font-bold bg-white outline-none" disabled={selectedProvider === 'macos'}>
                    {selectedProvider === 'edge' && EDGE_VOICES.map(v=><option key={v.id} value={v.value}>{v.name}</option>)}
                    {selectedProvider === 'openai' && OPENAI_VOICES.map(v=><option key={v.id} value={v.value}>{v.name}</option>)}
                    {selectedProvider === 'google' && GOOGLE_NEURAL2_VOICES.map(v=><option key={v.id} value={v.value}>{v.name}</option>)}
                    {selectedProvider === 'macos' && <option>System Default</option>}
                 </select>
              </div>
              {(selectedProvider === 'openai' || selectedProvider === 'google') && (
                 <div className="col-span-2">
                    <label className="block text-xs font-bold mb-1 text-slate-500 uppercase">{selectedProvider === 'openai' ? 'OpenAI API Key' : 'Google TTS API Key (Optional)'}</label>
                    <input type="password" value={apiKeyInput} onChange={(e)=>setApiKeyInput(e.target.value)} className="w-full p-3 border-2 border-indigo-200 rounded-lg bg-indigo-50 outline-none" placeholder={selectedProvider === 'openai' ? 'sk-...' : 'AIzaSy... (Auto-load from API keys.txt)'} />
                 </div>
              )}
              {selectedProvider === 'google' && (
                 <div className="col-span-2 bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
                    ⚠️ <strong>voiceConfig Override:</strong> Voice này sẽ override voiceConfig trong week data. Các file đã có sẽ được skip (không tạo lại).
                 </div>
              )}
           </div>
        )}

        {/* --- IMAGE SETTINGS (OLD CODE) --- */}
        {activeMode === 'image' && (
           <div>
              <label className="block text-xs font-bold mb-1 text-slate-500 uppercase">API Key (Gemini/Imagen)</label>
              <input type="password" value={apiKeyInput} onChange={(e)=>setApiKeyInput(e.target.value)} className="w-full p-3 border-2 border-indigo-200 rounded-lg bg-indigo-50 outline-none" placeholder="Paste Key..."/>
           </div>
        )}

        {/* GENERATE BUTTON */}
        <button onClick={generateCommand} className={`w-full py-4 rounded-xl font-black text-white shadow-lg mt-4 flex justify-center gap-2 transform active:scale-95 transition-all ${activeMode==='video'?'bg-red-600 hover:bg-red-700':activeMode==='audio'?'bg-orange-500 hover:bg-orange-600':'bg-indigo-600 hover:bg-indigo-700'}`}>
            <Terminal className="w-5 h-5"/> GENERATE TERMINAL COMMAND
        </button>

        {/* OUTPUT CONSOLE */}
        {(command || jsonOutput) && (
          <div className="space-y-4 animate-in slide-in-from-bottom-4">
             {jsonOutput && <div className="relative"><p className="text-xs font-bold text-slate-500 mb-1">JSON Payload (Video Only)</p><textarea ref={jsonRef} readOnly value={jsonOutput} className="w-full p-4 bg-slate-900 text-cyan-400 font-mono text-xs rounded-xl h-32 outline-none"/><button onClick={()=>handleCopy(jsonOutput)} className="absolute top-8 right-2 bg-white/10 text-white hover:bg-white hover:text-black text-xs px-2 py-1 rounded transition-colors">Copy</button></div>}
             <div className="relative"><p className="text-xs font-bold text-slate-500 mb-1">Terminal Command</p><textarea ref={cmdRef} readOnly value={command} className="w-full p-4 bg-slate-900 text-green-400 font-mono text-sm rounded-xl h-32 border-l-4 border-green-500 outline-none"/><button onClick={()=>handleCopy(command)} className="absolute top-8 right-2 bg-green-600 text-white hover:bg-green-500 text-xs px-3 py-1.5 rounded-lg font-bold shadow-md flex items-center gap-1 transition-colors">{copied?<Check size={12}/>:<Copy size={12}/>} Copy CMD</button></div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MediaStudio;
