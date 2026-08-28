import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, Play, Pause, RotateCcw, Headphones } from 'lucide-react';
import VoiceService from '../../services/voiceService';
import HoverWord, { renderParsedText } from './HoverWord';
import ExamIntroAudioButton from './ExamIntroAudioButton';
import FlyersListeningPlayButton from './FlyersListeningPlayButton';
import CompletionModal from './CompletionModal';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { useUserStore } from '../../stores/useUserStore';

function normalizeNote(str) {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .replace(/^(the|a|an)\s+/, '')
    .replace(/\s+/g, ' ');
}

export function NotepadNoteCompleter({ customData, data: propData, title, notes, passageAudioText, onComplete, weekNumber = 33 }) {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const activeData = customData || propData || {};
  const notepadTitle = title || activeData?.title || "Official Cambridge Listening Part 2 Notepad";

  const exampleObj = useMemo(() => {
    if (activeData?.example) {
      return {
        label: activeData.example.field_label || activeData.example.label || "Example Item",
        answer: activeData.example.answer || activeData.example.target || "corridor"
      };
    }
    return {
      label: weekNumber === 34 ? "Wake-up time" : "Classroom number",
      answer: weekNumber === 34 ? "6:00 AM" : "Room 4B"
    };
  }, [activeData, weekNumber]);

  const defaultNotes = useMemo(() => {
    if (activeData?.fields && Array.isArray(activeData.fields)) {
      return activeData.fields.map((f, idx) => ({
        id: f.id || `f${idx + 1}`,
        label: f.field_label || f.label || `Note ${idx + 1}`,
        target: f.answer || f.target || "",
        hint: f.hint || `fill in ${f.field_label || f.label || 'note'}`
      }));
    }
    if (notes && Array.isArray(notes)) {
      return notes;
    }
    return [];
  }, [activeData, notes]);

  const audioUrl = activeData?.audio_url || `/audio/week${weekNumber}/listening_p2_full.mp3`;
  const fullAudioPassage = passageAudioText || defaultNotes.map(n => n.audio_text).filter(Boolean).join(" ");

  // Cleanup audio playback on unmount or tab switch
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      VoiceService.stopAudio();
    };
  }, []);

  const handleToggleMasterAudio = async () => {
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      VoiceService.stopAudio();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      try {
        if (audioUrl) {
          if (!audioRef.current) {
            audioRef.current = new Audio(audioUrl);
            audioRef.current.onended = () => setIsPlaying(false);
            audioRef.current.onerror = async () => {
              // Fallback to TTS
              await VoiceService.speak(fullAudioPassage || notepadTitle, 'dictation');
              setIsPlaying(false);
            };
          }
          await audioRef.current.play();
        } else {
          await VoiceService.speak(fullAudioPassage, 'dictation');
          setIsPlaying(false);
        }
      } catch (err) {
        console.warn('[Notepad] Audio playback error, falling back to TTS:', err);
        try {
          await VoiceService.speak(fullAudioPassage || notepadTitle, 'dictation');
        } catch (e) {}
        setIsPlaying(false);
      }
    }
  };

  const handleReplayMasterAudio = async () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      handleToggleMasterAudio();
    }
  };

  const handleCheck = () => {
    let totalCorrect = 0;
    defaultNotes.forEach((note) => {
      const userNorm = normalizeNote(answers[note.id] || '');
      const targetNorm = normalizeNote(note.target);
      if (userNorm && (userNorm === targetNorm || targetNorm.includes(userNorm) || userNorm.includes(targetNorm))) {
        totalCorrect++;
      }
    });
    const finalScore = Math.round((totalCorrect / defaultNotes.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);

    if (finalScore >= 80) {
      fireCelebrationConfetti('ListeningP2_Complete');
    }
    const userStore = useUserStore?.getState ? useUserStore.getState() : null;
    if (userStore?.addXP) userStore.addXP(50);

    if (onComplete) onComplete(finalScore);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-2 bg-amber-50/90 rounded-2xl sm:rounded-3xl border-2 border-amber-200 shadow-md p-3.5 sm:p-5 relative overflow-hidden font-sans space-y-3">
      {/* Top Notepad Spiral Binding Effect */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-amber-200/80 flex justify-around items-center px-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-amber-700 shadow-inner"></div>
        ))}
      </div>

      <div className="pt-2">
        {/* Cambridge Exam Header */}
        <div className="bg-gradient-to-r from-amber-900 to-slate-900 text-white px-4 py-2.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm mb-3">
          <div>
            <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider block">Official Cambridge Assessment</span>
            <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              🎧 CAMBRIDGE A2 FLYERS — LISTENING PART 2
            </h2>
          </div>
          <p className="text-[11px] text-slate-200 font-medium">
            Listen and write words or numbers. There is one example.
          </p>
        </div>

        {/* Compact Header & Audio Bar */}
        <div className="flex items-center justify-between border-b border-amber-200 pb-2 mb-2.5 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                window.location.href = `/week/${weekNumber || 33}/hub/1`;
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-xl text-xs font-black flex items-center gap-1 transition active:scale-95 shadow shrink-0"
            >
              ← Map
            </button>
            <FlyersListeningPlayButton
              partNumber={2}
              audioUrl={audioUrl}
              script={fullAudioPassage || notepadTitle}
              weekNumber={weekNumber || 33}
            />
            <ExamIntroAudioButton
              weekNumber={weekNumber || 33}
              introId="exam_intro_L2"
              introText="Listen and write. There is one example."
            />
            <h3 className="text-xs sm:text-sm font-black text-amber-950">
              {notepadTitle} (5 Notes)
            </h3>
          </div>

          <button
            type="button"
            onClick={handleReplayMasterAudio}
            className="p-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-xs transition border border-amber-300 active:scale-95"
            title="Replay from start"
          >
            <RotateCcw size={13} />
          </button>
        </div>

        {/* Notes Form List */}
        <div className="space-y-1.5">
          {/* Worked Example Row */}
          <div data-testid="example-row" className="p-2 sm:p-2.5 bg-amber-100/80 rounded-xl border-2 border-amber-300 shadow-2xs space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap justify-between">
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white font-black text-[10px] uppercase tracking-wider shadow-2xs">
                  ★ EXAMPLE
                </span>
                <span className="text-xs font-black text-amber-950">
                  {exampleObj.label}:
                </span>
              </div>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-200/80 px-1.5 py-0.5 rounded uppercase">
                Locked Example
              </span>
            </div>

            <div className="flex items-center gap-1.5 w-full">
              <input
                type="text"
                disabled={true}
                value={exampleObj.answer}
                className="flex-1 w-full px-3 py-1.5 rounded-lg border border-amber-300 font-black text-xs sm:text-sm text-amber-950 bg-amber-50/90 cursor-not-allowed"
              />
              <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
            </div>
          </div>

          {defaultNotes.map((note, index) => {
            const userNorm = normalizeNote(answers[note.id] || '');
            const targetNorm = normalizeNote(note.target);
            const isCorrect = isSubmitted && (userNorm === targetNorm || (userNorm && targetNorm.includes(userNorm)));

            return (
              <div key={note.id} className="p-2 sm:p-2.5 bg-white rounded-xl border border-amber-200 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="w-5 h-5 rounded-md bg-amber-200 text-amber-950 font-black text-[11px] flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-xs font-black text-amber-950">
                    {note.label}:
                  </span>
                </div>

                <div className="flex items-center gap-1.5 w-full">
                  <input
                    type="text"
                    disabled={isSubmitted}
                    value={answers[note.id] || ''}
                    onChange={(e) => setAnswers({ ...answers, [note.id]: e.target.value })}
                    placeholder="Type note answer here..."
                    className={`flex-1 w-full px-3 py-1.5 rounded-lg border font-bold text-xs sm:text-sm text-slate-900 focus:outline-none transition-all ${
                      isSubmitted
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                          : 'border-rose-400 bg-rose-50 text-rose-950'
                        : 'border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-200'
                    }`}
                  />
                  {isSubmitted && (
                    isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <div className="flex items-center gap-0.5 shrink-0">
                        <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                        <span className="text-[11px] font-bold text-rose-600">({note.target})</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Check Button & Results */}
        <div className="mt-3 pt-2 border-t border-amber-200 flex items-center justify-between">
          {!isSubmitted ? (
            <button
              onClick={handleCheck}
              disabled={Object.keys(answers).length === 0}
              className="w-full sm:w-auto px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-sm transition active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-40"
            >
              <Sparkles size={15} /> Check Notes
            </button>
          ) : (
            <div className="w-full flex items-center justify-between bg-white p-2.5 rounded-xl border border-amber-200">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600 animate-bounce" />
                <span className="text-xs font-black text-amber-950">
                  Score: {score}%
                </span>
              </div>
              <button
                onClick={() => {
                  setAnswers({});
                  setIsSubmitted(false);
                  setScore(0);
                }}
                className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs rounded-lg transition flex items-center gap-1"
              >
                <RotateCcw size={12} /> Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotepadNoteCompleter;
