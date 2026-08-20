import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, RefreshCw, Volume2, CheckCircle2, Sparkles } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { evaluateSpeechSyntax } from '../../utils/speechSyntaxEvaluator';
import MicFallbackInput from '../common/MicFallbackInput';

const NARRATIVE_STYLES = {
  setting:  { dot: '🔵', bg: 'bg-blue-50/70',    border: 'border-blue-200',    text: 'text-blue-950'    },
  action:   { dot: '🟢', bg: 'bg-emerald-50/70', border: 'border-emerald-200', text: 'text-emerald-950' },
  problem:  { dot: '🟠', bg: 'bg-amber-50/70',   border: 'border-amber-200',   text: 'text-amber-950'   },
  solution: { dot: '🟣', bg: 'bg-purple-50/70',  border: 'border-purple-200',  text: 'text-purple-950'  }
};
const FUNC_ORDER = ['setting', 'action', 'problem', 'solution'];

export default function RetellRecorder({ scenes = [], onComplete }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [evalResult, setEvalResult] = useState(null);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [tierMode, setTierMode] = useState('tier1');

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef('');

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (_) {}
      }
    };
  }, []);

  const DEFAULT_SCENES = [
    {
      id: 1,
      narrative_function: 'setting',
      en: "After science class, Jake was walking carefully down the school corridor.",
      radio_starters: ["Welcome back to Corridor Watch!", "Breaking news from the hallway!", "On a sunny Monday morning..."]
    },
    {
      id: 2,
      narrative_function: 'action',
      en: "Jake was walking carefully while other students were running fast.",
      radio_starters: ["Right then and there...", "Let's find out what happened next...", "As students were moving..."]
    },
    {
      id: 3,
      narrative_function: 'problem',
      en: "Suddenly, a student slipped on the wet floor and fell down heavily.",
      radio_starters: ["But then, listeners...", "Suddenly, everything changed...", "Unexpectedly..."]
    },
    {
      id: 4,
      narrative_function: 'solution',
      en: "The school nurse arrived quickly with a clean bandage to help.",
      radio_starters: ["And that's why we always...", "To sum it up...", "Fortunately..."]
    }
  ];

  const activeScenes = (scenes && scenes.length > 0) ? scenes : DEFAULT_SCENES;
  const fullScriptText = activeScenes.map(s => s.en || s.text || '').filter(Boolean).join(' ');

  const startRecording = async () => {
    setFeedback(null);
    setEvalResult(null);
    setRecordedAudioUrl(null);
    transcriptRef.current = '';

    // Start SpeechRecognition in parallel
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      try {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        const rec = new SpeechRec();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = 'en-US';
        rec.onresult = (event) => {
          const text = Array.from(event.results).map(r => r[0].transcript).join(' ');
          transcriptRef.current = text;
        };
        rec.start();
        recognitionRef.current = rec;
      } catch (_) {}
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        if (recognitionRef.current) {
          try { recognitionRef.current.stop(); } catch (_) {}
          recognitionRef.current = null;
        }

        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);

        const spoken = transcriptRef.current.trim();
        setSpokenTranscript(spoken);

        const evaluation = evaluateSpeechSyntax(spoken, fullScriptText, { mode: 'sentence', minWords: 4 });
        setEvalResult(evaluation);

        setFeedback({
          message: evaluation.isCorrect
            ? `🎉 Broadcast recorded! Accuracy: ${evaluation.score}%. Excellent storytelling!`
            : `⚠️ Broadcast recorded! Accuracy: ${evaluation.score}%. Try speaking with clearer transitions.`
        });

        fireCelebrationConfetti('Broadcast_Record');
        stream.getTracks().forEach(track => track.stop());
        if (onComplete) onComplete(50);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.warn('Microphone access fallback:', err);
      handleManualSubmit(fullScriptText);
    }
  };

  const handleManualSubmit = (typedText) => {
    setRecordedAudioUrl('typed_broadcast');
    setSpokenTranscript(typedText);

    const evaluation = evaluateSpeechSyntax(typedText, fullScriptText, { mode: 'sentence', minWords: 4 });
    setEvalResult(evaluation);

    setFeedback({
      message: evaluation.isCorrect
        ? `🎉 Broadcast script submitted! Accuracy: ${evaluation.score}%. Great syntax!`
        : `⚠️ Script submitted! Accuracy: ${evaluation.score}%. Check your sentence connectors.`
    });

    fireCelebrationConfetti('Broadcast_Record');
    if (onComplete) onComplete(50);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };


  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 text-slate-900 font-sans">

      {/* ── Goal Banner + Tier Selector ── */}
      <div className="p-3.5 bg-purple-50 border border-purple-300 rounded-2xl space-y-2 text-xs">
        <span className="font-black text-purple-950 block">
          🎙️ {tierMode === 'tier1'
            ? 'BROADCAST GOAL: Read your story aloud — perform it like a news reporter!'
            : tierMode === 'tier2'
            ? 'BROADCAST GOAL: Use a reporter opener, then tell your whole story!'
            : 'BROADCAST PRO GOAL: Open strong, use transitions & sound effects!'}
        </span>
        <div className="flex items-center gap-1.5 pt-1 border-t border-purple-200/70 flex-wrap">
          <span className="text-[10px] font-black uppercase text-purple-800 mr-1">Studio Mode:</span>
          {[
            { id: 'tier1', label: '🌱 Clean Mode',   activeClass: 'bg-purple-600 text-white', inactiveClass: 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-100' },
            { id: 'tier2', label: '✨ Reporter',      activeClass: 'bg-indigo-600 text-white', inactiveClass: 'bg-white text-indigo-900 border border-indigo-200 hover:bg-indigo-100' },
            { id: 'tier3', label: '🎙️ Radio Pro',    activeClass: 'bg-amber-500 text-slate-950 ring-1 ring-amber-300', inactiveClass: 'bg-amber-50 text-amber-950 border border-amber-300 hover:bg-amber-100' }
          ].map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTierMode(t.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition ${tierMode === t.id ? t.activeClass : t.inactiveClass}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Unified Story Script Card — all 4 parts visible, color-coded ── */}
      <div className="p-5 bg-purple-50/60 rounded-3xl border-2 border-purple-200 shadow-inner space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black uppercase tracking-widest text-purple-800">
            📖 YOUR STORY SCRIPT
          </span>
          <button
            type="button"
            onClick={() => speakText(fullScriptText)}
            className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-black text-xs shadow-md flex items-center gap-2 transition active:scale-95"
          >
            <Volume2 size={14} /> 🔊 Hear My Line
          </button>
        </div>

        {/* 4-part script — all visible simultaneously, static visual cues only */}
        <div className="space-y-2">
          {activeScenes.map((scene, idx) => {
            const func = scene.narrative_function || FUNC_ORDER[idx] || 'setting';
            const style = NARRATIVE_STYLES[func] || NARRATIVE_STYLES.setting;
            return (
              <div
                key={scene.id || idx}
                className={`flex items-baseline gap-2.5 px-3 py-2.5 rounded-xl border ${style.bg} ${style.border}`}
              >
                <span className="text-base leading-none shrink-0">{style.dot}</span>
                <p className={`text-base sm:text-lg font-black leading-snug ${style.text}`}>
                  {scene.en || scene.text || ''}
                </p>
              </div>
            );
          })}
        </div>

        {/* ─── TIER 2: 3 flat pills ─── */}
        {tierMode === 'tier2' && (
          <div className="pt-2.5 border-t border-purple-200/70 space-y-1.5 text-xs">
            <span className="font-black text-purple-900 uppercase text-[10px] block">
              ✨ Optional Reporter Openers (tap to hear, then say):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                activeScenes[0]?.radio_starters?.[0] || "Welcome back to Corridor Watch!",
                "SUDDENLY...",
                "To sum it up..."
              ].map((pill, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => speakText(pill)}
                  className="px-2.5 py-1 bg-white hover:bg-purple-100 border border-purple-300 text-purple-950 font-bold rounded-lg text-[11px] shadow-xs transition active:scale-95 flex items-center gap-1"
                >
                  <Volume2 size={11} className="text-purple-600" /> {pill}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── TIER 3: Radio Pro Suite ─── */}
        {tierMode === 'tier3' && (
          <div className="pt-3 border-t border-purple-200/70 space-y-2.5 text-xs animate-in fade-in duration-200">
            <div className="space-y-1">
              <span className="font-black text-purple-900 uppercase text-[10px] block">
                🎙️ Opening Starters (pick 1):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(activeScenes[0]?.radio_starters || [
                  "Welcome back to Corridor Watch!",
                  "Believe it or not...",
                  "Stay tuned to hear what happened...",
                  "Breaking news from the hallway!"
                ]).map((starter, sIdx) => (
                  <button key={sIdx} type="button" onClick={() => speakText(starter)}
                    className="px-2.5 py-1 bg-white hover:bg-purple-100 border border-purple-300 text-purple-950 font-bold rounded-lg text-[11px] shadow-xs transition active:scale-95 flex items-center gap-1">
                    <Volume2 size={11} className="text-purple-600" /> {starter}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <span className="font-black text-indigo-900 uppercase text-[10px] block">
                ✨ Transition Pills (weave in anywhere):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {["SUDDENLY...", "Wait for it...", "Right then and there!", "To sum it up...", "Let's find out!"].map((m, i) => (
                  <button key={i} type="button" onClick={() => speakText(m)}
                    className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 font-black rounded-md text-[10px] transition active:scale-95">
                    ⚡ {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-1 pt-1 border-t border-purple-100">
              <span className="font-black text-purple-900 uppercase text-[10px]">🎛️ Sound Board SFX:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { label: '⏸️ Pause 2s', text: 'Pause for 2 seconds', cls: 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300' },
                  { label: '👟 Footsteps', text: 'Footsteps', cls: 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300' },
                  { label: '⚠️ Uh-Oh!', text: 'Uh-oh! Be careful!', cls: 'bg-rose-100 hover:bg-rose-200 text-rose-950 border-rose-300' },
                  { label: '🔔 Bell Ring', text: 'School bell', cls: 'bg-blue-100 hover:bg-blue-200 text-blue-950 border-blue-300' }
                ].map((sfx, i) => (
                  <button key={i} type="button" onClick={() => speakText(sfx.text)}
                    className={`px-2.5 py-1 border font-bold rounded-lg text-[11px] flex items-center gap-1 shadow-xs active:scale-95 ${sfx.cls}`}>
                    {sfx.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Single Record Dock ── */}
      <div className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-200 text-center space-y-4">
        {!isRecording ? (
          <button
            type="button"
            onClick={startRecording}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl font-black text-base shadow-xl inline-flex items-center gap-3 transition hover:scale-105 active:scale-95"
          >
            <Mic size={22} className="animate-pulse" /> 🎙️ RECORD MY BROADCAST
          </button>
        ) : (
          <button
            type="button"
            onClick={stopRecording}
            className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black text-base shadow-xl inline-flex items-center gap-3 transition animate-bounce"
          >
            <Square size={22} fill="currentColor" /> ⏹️ STOP — DONE!
          </button>
        )}

        {recordedAudioUrl && (
          <div className="pt-2 flex items-center justify-center gap-4 flex-wrap">
            <audio controls src={recordedAudioUrl} className="h-10 rounded-xl" />
            <button
              type="button"
              onClick={startRecording}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-black flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Re-record
            </button>
          </div>
        )}

        {evalResult && (
          <div className={`p-4 rounded-2xl border ${
            evalResult.isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-amber-50 border-amber-300 text-amber-950'
          } text-xs font-black text-left space-y-1.5 max-w-xl mx-auto animate-in fade-in`}>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className={evalResult.isCorrect ? "text-emerald-600" : "text-amber-600"} />
                {evalResult.feedback}
              </span>
              <span className="px-2 py-0.5 bg-white rounded-md border text-[11px]">
                Score: {evalResult.score}%
              </span>
            </div>
            {spokenTranscript && (
              <p className="text-[11px] font-medium text-slate-700 italic">
                You spoke: "{spokenTranscript}"
              </p>
            )}
          </div>
        )}

        {feedback && !evalResult && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs font-black flex items-center justify-center gap-3 animate-in fade-in">
            <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Typing Fallback */}
        <div className="max-w-xl mx-auto pt-1 text-left">
          <MicFallbackInput
            onSubmit={handleManualSubmit}
            placeholder="Type your story broadcast script here..."
            buttonLabel="Submit Broadcast Script →"
            color="purple"
          />
        </div>

        {!recordedAudioUrl && !isRecording && (
          <p className="text-[11px] text-slate-400 font-medium">
            Read your whole story in one go — you can re-record as many times as you want!
          </p>
        )}
      </div>
    </div>
  );
}

