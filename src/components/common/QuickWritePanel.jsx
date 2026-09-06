import React, { useState, useCallback } from 'react';
import { PenTool, ChevronDown, ChevronUp, CheckCircle, Send, Lightbulb, RotateCcw } from 'lucide-react';
import './QuickWritePanel.css';

/**
 * QuickWritePanel — Enhanced Micro-Writing Panel with Structured Scaffolding.
 * Provides multi-tier inputs:
 *   - Sentence Starters (Mở đầu câu)
 *   - Scientific / Content Chunks (Ý chính & Kiến thức)
 *   - Connectors & Conjunctions (Từ nối logic)
 *   - Safe Actions & Conclusions (Hành động & Kết luận)
 *
 * Props:
 *   prompt         — Writing prompt text
 *   scaffoldGroups — { starters: [], chunks: [], connectors: [], actions: [] }
 *   scaffoldPills  — (legacy fallback) string[]
 *   modelSentence  — Target exemplar sentence (e.g. 15-20 words)
 *   minWords       — Minimum word requirement (default 15)
 *   maxWords       — Maximum word limit (default 25)
 *   onSubmit       — (text: string) => void
 *   isLiteMode     — If true, show Draw & Say (W01–W16)
 */

export default function QuickWritePanel({
  prompt = 'Write 1-2 meaningful sentences about your scientific discovery.',
  scaffoldGroups,
  scaffoldPills = [],
  modelSentence,
  minWords = 15,
  maxWords = 25,
  onSubmit,
  isLiteMode = false,
  defaultExpanded = true,
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const isValid = wordCount >= minWords && wordCount <= maxWords;

  // Smart insertion: attaches commas/connectors cleanly without awkward double spaces
  const handleInsertPill = useCallback((pill) => {
    setText(prev => {
      const trimmed = prev.trim();
      if (!trimmed) return pill;

      // If pill starts with punctuation like comma or period
      if (pill.startsWith(',') || pill.startsWith('.')) {
        return `${trimmed}${pill}`;
      }

      // If previous text ends with comma or period
      if (trimmed.endsWith(',') || trimmed.endsWith('.')) {
        return `${trimmed} ${pill}`;
      }

      return `${trimmed} ${pill}`;
    });
  }, []);

  const handleClear = useCallback(() => {
    setText('');
  }, []);

  const handleSubmit = useCallback(() => {
    if (!isValid || submitted) return;
    setSubmitted(true);
    onSubmit?.(text.trim());
  }, [isValid, submitted, text, onSubmit]);

  // Normalize groups
  const groups = scaffoldGroups || (scaffoldPills.length > 0 ? { chunks: scaffoldPills } : null);

  // Lite Mode: Draw & Say placeholder
  if (isLiteMode) {
    return (
      <div className="qw-container qw-lite">
        <div className="qw-header" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="qw-header-left">
            <PenTool size={14} />
            <span>🎨 Draw & Say</span>
          </div>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        {isExpanded && (
          <div className="qw-lite-content">
            <p className="qw-lite-text">Draw a picture and say an English sentence! 🖍️</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`qw-container ${submitted ? 'qw-submitted' : ''}`}>
      {/* Collapsible Header */}
      <div className="qw-header" onClick={() => !submitted && setIsExpanded(!isExpanded)}>
        <div className="qw-header-left">
          {submitted ? <CheckCircle size={15} className="text-emerald-600" /> : <PenTool size={15} className="text-indigo-600" />}
          <span className="font-black">{submitted ? 'Quick Write Completed ✅' : '✏️ Quick Write — Scientific Discovery Report'}</span>
        </div>
        {!submitted && (isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
      </div>

      {/* Expanded Body */}
      {isExpanded && !submitted && (
        <div className="qw-body space-y-3">
          <p className="qw-prompt font-semibold text-slate-700">{prompt}</p>

          {/* Structured Scaffolding Categories */}
          {groups ? (
            <div className="space-y-2 bg-slate-50/80 p-2.5 rounded-xl border border-slate-200">
              {/* 1. Sentence Starters */}
              {groups.starters && groups.starters.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase text-indigo-700 flex items-center gap-1">
                    🚀 SENTENCE STARTERS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {groups.starters.map((pill, i) => (
                      <button
                        key={i}
                        type="button"
                        className="px-2.5 py-1 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-900 border border-indigo-200 text-xs font-bold transition active:scale-95 cursor-pointer"
                        onClick={() => handleInsertPill(pill)}
                      >
                        + {pill}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Core Scientific Chunks */}
              {groups.chunks && groups.chunks.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase text-sky-700 flex items-center gap-1">
                    🔬 CORE SCIENCE CHUNKS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {groups.chunks.map((pill, i) => (
                      <button
                        key={i}
                        type="button"
                        className="px-2.5 py-1 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-200 text-xs font-bold transition active:scale-95 cursor-pointer"
                        onClick={() => handleInsertPill(pill)}
                      >
                        + {pill}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Connectors */}
              {groups.connectors && groups.connectors.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase text-amber-700 flex items-center gap-1">
                    🔗 LOGICAL CONNECTORS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {groups.connectors.map((pill, i) => (
                      <button
                        key={i}
                        type="button"
                        className="px-2 py-0.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-extrabold transition active:scale-95 cursor-pointer font-mono"
                        onClick={() => handleInsertPill(pill)}
                      >
                        + {pill}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Action Conclusions */}
              {groups.actions && groups.actions.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase text-emerald-700 flex items-center gap-1">
                    🛡️ ACTIONS & SAFETY CONCLUSIONS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {groups.actions.map((pill, i) => (
                      <button
                        key={i}
                        type="button"
                        className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-200 text-xs font-bold transition active:scale-95 cursor-pointer"
                        onClick={() => handleInsertPill(pill)}
                      >
                        + {pill}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {/* Model Sentence Helper Toggle */}
          {modelSentence && (
            <div>
              <button
                type="button"
                onClick={() => setShowModel(prev => !prev)}
                className="text-xs text-indigo-700 hover:text-indigo-900 font-bold flex items-center gap-1 cursor-pointer transition"
              >
                <Lightbulb size={13} className="text-amber-500" />
                <span>{showModel ? 'Hide Model Sentence' : '💡 View Model Exemplar Sentence'}</span>
              </button>
              {showModel && (
                <div className="mt-1.5 p-2 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-950 font-medium leading-relaxed animate-in fade-in flex items-center justify-between gap-2">
                  <span>"{modelSentence}"</span>
                  <button
                    type="button"
                    onClick={() => setText(modelSentence)}
                    className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[11px] font-bold shrink-0 cursor-pointer"
                    title="Insert model sentence into text area"
                  >
                    Use This Model
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Text Area */}
          <div className="relative">
            <textarea
              className="qw-textarea"
              placeholder="Tap word pills above or type your report here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
            />
            {text && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-600 transition rounded-lg hover:bg-rose-50"
                title="Clear text"
              >
                <RotateCcw size={13} />
              </button>
            )}
          </div>

          {/* Word count + submit */}
          <div className="qw-footer">
            <div className="flex items-center gap-2">
              <span className={`qw-word-count ${isValid ? 'qw-valid font-black text-emerald-600' : 'text-slate-500 font-bold'}`}>
                {wordCount}/{maxWords} words {wordCount < minWords ? `(minimum ${minWords} words)` : wordCount > maxWords ? '(exceeds limit)' : '✓ Valid Length'}
              </span>
            </div>

            <button
              type="button"
              className="qw-submit-btn cursor-pointer flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold rounded-xl shadow transition"
              onClick={handleSubmit}
              disabled={!isValid}
            >
              <Send size={14} />
              <span>Submit Report (+30 XP)</span>
            </button>
          </div>
        </div>
      )}

      {/* Submitted Feedback */}
      {submitted && (
        <div className="qw-feedback p-3 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200 flex items-center justify-between">
          <span>🌟 Fantastic! You completed your scientific report with <strong>{wordCount} words</strong>!</span>
          <span className="font-mono font-black text-xs text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md">+30 XP</span>
        </div>
      )}
    </div>
  );
}
