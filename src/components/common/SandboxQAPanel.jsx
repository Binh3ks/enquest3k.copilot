import React, { useState, useEffect } from 'react';
import { ShieldCheck, RotateCcw, Download, Sparkles, X, CheckCircle2, Terminal, AlertTriangle, Layers } from 'lucide-react';
import { learnerProgressService } from '../../services/learnerProgressService';
import weekIndex from '../../data/weeks/index';

export function SandboxQAPanel({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('actions');
  const [statusMsg, setStatusMsg] = useState(null);

  // Global key sequence listener for "adminQA" shortcut
  useEffect(() => {
    let keyBuffer = '';
    const handleKeyDown = (e) => {
      // Ignore key events when typing inside inputs/textareas
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      keyBuffer += e.key;
      if (keyBuffer.length > 20) keyBuffer = keyBuffer.slice(-20);

      if (keyBuffer.toLowerCase().endsWith('adminqa')) {
        keyBuffer = '';
        if (window.__openSandboxQA) window.__openSandboxQA();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const handleResetAllProgress = async () => {
    if (!window.confirm('⚠️ Reset All Progress?\nThis will clear all localStorage progress, scores, and station caches.')) return;

    try {
      await learnerProgressService.resetAllProgress();

      // Clear extra app localStorage keys
      const keysToRemove = [
        'engquest_learner_progress_v1',
        'engquest3k_progress_v4',
        'progressCache',
        'weekCompletion',
        'weekStars',
        'user_store_v1',
        'lastStation',
        'lastWeek'
      ];
      keysToRemove.forEach(k => localStorage.removeItem(k));

      setStatusMsg('✅ All progress reset successfully! Reloading...');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error('[Sandbox QA] Error resetting progress:', err);
      setStatusMsg('❌ Reset error: ' + err.message);
    }
  };

  const handleExportMockJSON = async () => {
    try {
      await learnerProgressService.downloadLearnerProgressJSON('learner_default_01');
      setStatusMsg('✅ Learner progress JSON exported!');
    } catch (err) {
      console.error('[Sandbox QA] Error exporting JSON:', err);
      setStatusMsg('❌ Export error: ' + err.message);
    }
  };

  const handleExportW33GoldenSchema = () => {
    try {
      const w33Data = weekIndex[33] || {};
      const jsonStr = JSON.stringify(w33Data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'w33_golden_schema_export.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatusMsg('✅ Week 33 Golden Schema JSON exported!');
    } catch (err) {
      console.error('[Sandbox QA] Error exporting schema:', err);
      setStatusMsg('❌ Schema export error: ' + err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md font-sans text-slate-100 animate-in fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border-2 border-indigo-500/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="p-5 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border-b border-indigo-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-2xl text-white shadow-lg">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">EngQuest3K Sandbox QA Panel</h3>
                <span className="px-2.5 py-0.5 bg-amber-400/20 border border-amber-400/40 text-amber-300 font-mono text-[10px] font-black rounded-full uppercase">
                  W33 Golden Locked
                </span>
              </div>
              <p className="text-xs font-bold text-indigo-200">
                Production Sandbox Shortcut: Type <code className="bg-indigo-950 px-1.5 py-0.5 rounded text-amber-300 font-mono">adminQA</code> or click Logo 5x
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Status Toast Notification */}
        {statusMsg && (
          <div className="px-5 py-2.5 bg-indigo-950 border-b border-indigo-800 text-xs font-black text-indigo-200 flex items-center justify-between animate-in fade-in">
            <span>{statusMsg}</span>
            <button onClick={() => setStatusMsg(null)} className="text-indigo-400 hover:text-white">✕</button>
          </div>
        )}

        {/* Main Content Area */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Action Buttons Grid */}
          <div className="space-y-3">
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Terminal size={14} className="text-indigo-400" /> Primary QA Production Tools:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Button 1: Reset All Progress */}
              <button
                onClick={handleResetAllProgress}
                className="p-5 bg-rose-950/60 hover:bg-rose-900/80 border-2 border-rose-600/50 rounded-2xl text-left transition group space-y-2 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-rose-600 text-white rounded-xl">
                    <RotateCcw size={20} />
                  </div>
                  <span className="text-[10px] font-black bg-rose-500/30 text-rose-300 px-2 py-0.5 rounded-full border border-rose-400/30">
                    CLEAR CACHE
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-black text-white group-hover:text-rose-200">
                    Reset All Progress
                  </h4>
                  <p className="text-xs font-medium text-rose-200/80 mt-1 leading-snug">
                    Calls learnerProgressService.resetAllProgress() & clears LocalStorage.
                  </p>
                </div>
              </button>

              {/* Button 2: Export Mock JSON */}
              <button
                onClick={handleExportMockJSON}
                className="p-5 bg-indigo-950/60 hover:bg-indigo-900/80 border-2 border-indigo-600/50 rounded-2xl text-left transition group space-y-2 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-indigo-600 text-white rounded-xl">
                    <Download size={20} />
                  </div>
                  <span className="text-[10px] font-black bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-400/30">
                    JSON EXPORT
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-black text-white group-hover:text-indigo-200">
                    Export Mock JSON
                  </h4>
                  <p className="text-xs font-medium text-indigo-200/80 mt-1 leading-snug">
                    Exports complete device learner attempts to structured JSON file.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Secondary Action: Export W33 Golden Schema */}
          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                <Layers size={14} /> Golden Blueprint Schema Export:
              </span>
              <span className="text-[10px] font-bold text-slate-400 font-mono">Week 33 Golden Schema</span>
            </div>
            <p className="text-xs font-medium text-slate-300 leading-relaxed">
              Export the current Week 33 master blueprint JSON data structure for content ingestion pipeline (W34-W46).
            </p>
            <button
              onClick={handleExportW33GoldenSchema}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center gap-1.5 shadow"
            >
              <Download size={14} /> Download W33 Golden Schema JSON
            </button>
          </div>

          {/* Shortcut Instructions Footer */}
          <div className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-800/40 text-xs font-medium text-indigo-300 space-y-1">
            <div className="font-black text-indigo-200 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-400" /> How to open this panel anywhere:
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-indigo-300/90 font-mono text-[11px]">
              <li>Type <span className="text-amber-300 font-bold">adminQA</span> anywhere on keydown</li>
              <li>Click the <span className="text-amber-300 font-bold">Lexio Logo 5 times</span> consecutively</li>
              <li>Or run <span className="text-amber-300 font-bold">window.__openSandboxQA()</span> in DevTools Console</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SandboxQAPanel;
