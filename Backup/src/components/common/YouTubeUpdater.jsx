import React, { useState } from 'react';
import { Youtube, Copy, Check } from 'lucide-react';
import { useFetchWeekData } from '../../utils/dataHooks';

const YouTubeUpdater = ({ defaultWeekId }) => {
    const [videos, setVideos] = useState(['', '', '', '', '']); 
    const [weekNum, setWeekNum] = useState(defaultWeekId || 1);
    const [jsonData, setJsonData] = useState('');
    const [copied, setCopied] = useState(false);
    const { data: currentWeekData, loading } = useFetchWeekData(parseInt(weekNum));

    const generateConfig = () => {
        const videoData = videos.filter(v => v.trim() !== '').map((id, index) => ({
            id: index + 1,
            videoId: id.trim(),
            title: `Video ${index + 1}`
        }));

        const jsonOutput = {
            weekId: parseInt(weekNum),
            station: 'daily_watch',
            videos: videoData
        };

        setJsonData(JSON.stringify(jsonOutput, null, 2));
    };

    const copyToClipboard = () => { 
        const textarea = document.createElement('textarea');
        textarea.value = jsonData;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true); 
        setTimeout(() => setCopied(false), 2000); 
    };

    return (
        <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-sm text-rose-700 flex items-center mb-4"><Youtube className="w-4 h-4 mr-2"/> Daily Watch Updater</h4>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Target Week</label>
                    <input type="number" value={weekNum} onChange={e => setWeekNum(e.target.value)} className="w-full p-3 border-2 border-slate-200 rounded-lg" min="1" max="144" />
                </div>
            </div>
            
            <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase">YouTube Video IDs (Max 5)</label>
                <div className='grid grid-cols-5 gap-2'>
                    {videos.map((v, i) => (
                        <input key={v.videoId || v.id || i} value={videos[i]} onChange={e => setVideos(videos.map((item, idx) => idx === i ? e.target.value : item))} placeholder={`ID ${i+1}`} className="w-full p-2 border rounded-lg text-xs" />
                    ))}
                </div>
            </div>
            
            <button onClick={generateConfig} className="w-full py-3 bg-rose-600 text-white rounded-lg font-bold text-sm hover:bg-rose-700 transition-colors">Generate Config JSON</button>

            <div className="relative">
                <textarea value={jsonData} readOnly className="w-full h-32 bg-slate-900 text-green-400 font-mono text-xs p-3 rounded-xl border-2 border-slate-700 focus:border-green-500 outline-none" placeholder="JSON config will appear here..." />
                {jsonData && (<button onClick={copyToClipboard} className="absolute top-3 right-3 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors flex items-center gap-2 text-xs font-bold backdrop-blur-sm border border-white/10">{copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}{copied ? "Copied!" : "Copy JSON"}</button>)}
            </div>
            
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-[11px] text-blue-800">
                <p className="font-bold">Workflow:</p>
                <p>1. Copy JSON above.</p>
                <p>2. Run Terminal command: <span className="font-mono text-xs bg-blue-100 px-1 rounded">node tools/update_videos.js</span>. Paste JSON & Enter.</p>
            </div>
        </div>
    ); 
};
export default YouTubeUpdater;
