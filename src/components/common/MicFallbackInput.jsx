import React, { useState } from 'react';
import { Keyboard, Mic, Send } from 'lucide-react';

/**
 * MicFallbackInput — Reusable Keyboard Fallback for Speaking Tasks
 * 
 * Provides safe resilience when microphone permission is denied,
 * audio hardware fails, or SpeechRecognition is unavailable.
 */
export default function MicFallbackInput({
  onSubmit,
  placeholder = "Type your response here...",
  buttonLabel = "Submit Response →",
  color = "indigo",
  className = ""
}) {
  const [isTyping, setIsTyping] = useState(false);
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText('');
    setIsTyping(false);
  };

  if (!isTyping) {
    return (
      <div className={`text-center ${className}`}>
        <button
          type="button"
          onClick={() => setIsTyping(true)}
          className="text-[11px] font-bold text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1 mx-auto underline transition"
        >
          <Keyboard size={13} /> Microphone not working? Type instead
        </button>
      </div>
    );
  }

  return (
    <div className={`w-full space-y-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl animate-in fade-in ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-black text-slate-700 flex items-center gap-1.5">
          <Keyboard size={14} className="text-indigo-600" />
          Type your answer:
        </span>
        <button
          type="button"
          onClick={() => setIsTyping(false)}
          className="text-[11px] text-slate-500 hover:text-slate-700 flex items-center gap-1 underline"
        >
          <Mic size={12} /> Use Mic instead
        </button>
      </div>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 rounded-xl border-2 border-slate-300 focus:border-indigo-500 outline-none text-sm font-bold text-slate-900 bg-white"
        onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
        autoFocus
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!text.trim()}
        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-black text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5"
      >
        <Send size={13} />
        {buttonLabel}
      </button>
    </div>
  );
}
