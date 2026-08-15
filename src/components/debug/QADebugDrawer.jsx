import React, { useState, useEffect } from 'react';
import { Bug, X, RefreshCw, Layers, CheckCircle2, Trash2, ShieldAlert } from 'lucide-react';
import { srsService } from '../../services/srsService';

export default function QADebugDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [srsData, setSrsData] = useState({});
  const [progressLog, setProgressLog] = useState([]);

  const refreshData = () => {
    try {
      const srsMap = srsService.loadSRSData();
      setSrsData(srsMap);

      const rawProgress = localStorage.getItem('engquest_learner_progress_v1');
      if (rawProgress) {
        setProgressLog(JSON.parse(rawProgress));
      }
    } catch (_) {}
  };

  useEffect(() => {
    refreshData();
    const handleUpdate = () => refreshData();
    window.addEventListener('engquest_progress_updated', handleUpdate);

    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('engquest_progress_updated', handleUpdate);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleReset = () => {
    if (window.confirm('Reset all local SRS and Progress data for QA re-testing?')) {
      localStorage.removeItem('engquest_srs_vocab_v1');
      localStorage.removeItem('engquest_learner_progress_v1');
      refreshData();
      window.dispatchEvent(new Event('engquest_progress_updated'));
    }
  };

  const srsEntries = Object.values(srsData);
  const box1Words = srsEntries.filter((i) => i.box === 1);
  const box2Words = srsEntries.filter((i) => i.box === 2);
  const box3Words = srsEntries.filter((i) => i.box === 3);

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => {
          refreshData();
          setIsOpen(true);
        }}
        className="fixed bottom-4 right-4 z-[99990] px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-mono text-xs font-bold rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 transition active:scale-95"
      >
        <Bug size={16} />
        <span>SRS QA Panel (Ctrl+Shift+S)</span>
      </button>

      {/* Slide-over Debug Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex justify-end bg-slate-950/60 backdrop-blur-sm font-sans animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 text-slate-100 h-full p-6 overflow-y-auto space-y-6 border-l border-slate-800 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Bug className="text-amber-400" size={20} />
                <h3 className="text-lg font-black text-white">SRS & Progress QA Inspector</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* SRS Leitner Box Overview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                  📖 Leitner Box Vocabulary ({srsEntries.length} Words)
                </span>
                <button
                  onClick={refreshData}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                >
                  <RefreshCw size={12} /> Refresh
                </button>
              </div>

              {/* Box 1 */}
              <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                <span className="text-xs font-black text-rose-400 block mb-1">
                  📦 Box 1 - New / Difficult ({box1Words.length})
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {box1Words.map((w, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-rose-950/80 text-rose-300 text-[11px] font-bold rounded-md border border-rose-800">
                      {w.word}
                    </span>
                  ))}
                  {box1Words.length === 0 && <span className="text-xs text-slate-500 italic">No words</span>}
                </div>
              </div>

              {/* Box 2 */}
              <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                <span className="text-xs font-black text-amber-400 block mb-1">
                  📦 Box 2 - Learning ({box2Words.length})
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {box2Words.map((w, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-amber-950/80 text-amber-300 text-[11px] font-bold rounded-md border border-amber-800">
                      {w.word}
                    </span>
                  ))}
                  {box2Words.length === 0 && <span className="text-xs text-slate-500 italic">No words</span>}
                </div>
              </div>

              {/* Box 3 */}
              <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                <span className="text-xs font-black text-emerald-400 block mb-1">
                  📦 Box 3 - Mastered ({box3Words.length})
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {box3Words.map((w, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-emerald-950/80 text-emerald-300 text-[11px] font-bold rounded-md border border-emerald-800">
                      {w.word}
                    </span>
                  ))}
                  {box3Words.length === 0 && <span className="text-xs text-slate-500 italic">No words</span>}
                </div>
              </div>
            </div>

            {/* Recent Progress Logs */}
            <div className="space-y-3">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                📊 Logged Attempts History ({progressLog.length})
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                {progressLog.slice(-5).reverse().map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-xs flex justify-between items-center">
                    <div>
                      <span className="font-bold text-white block">{item.content_id}</span>
                      <span className="text-[10px] text-slate-400">Mode: {item.mode}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-emerald-400 block">{item.final_score}% Score</span>
                      <span className="text-[10px] text-slate-400">
                        {item.attempt_log?.length || 1} attempts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Reset Button */}
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={handleReset}
                className="w-full py-2.5 bg-rose-900/40 hover:bg-rose-900/60 text-rose-300 font-bold text-xs rounded-xl border border-rose-700 flex items-center justify-center gap-2 transition"
              >
                <Trash2 size={14} /> Reset All QA Test Progress Data
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
