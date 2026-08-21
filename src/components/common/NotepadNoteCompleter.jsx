import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, Play, Pause, RotateCcw, Headphones } from 'lucide-react';
import VoiceService from '../../services/voiceService';
import HoverWord, { renderParsedText } from './HoverWord';


export function NotepadNoteCompleter({ title, notes, passageAudioText, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const defaultNotes = notes || [
    { id: 1, label: "Incident Location", hint: "Where did it happen?", target: "school corridor", audio_text: "The incident happened down the school corridor after science class." },
    { id: 2, label: "Cause of Fall", hint: "Why did he slip?", target: "wet floor", audio_text: "The classmate running fast slipped on the wet floor." },
    { id: 3, label: "Person Called", hint: "Who did Jake call?", target: "school nurse", audio_text: "Jake stopped immediately and called the school nurse." },
    { id: 4, label: "First Aid Applied", hint: "What did nurse apply?", target: "clean bandage", audio_text: "The nurse treated his cut knee gently with a clean bandage." },
    { id: 5, label: "School Rule", hint: "What rule to follow?", target: "never run", audio_text: "The headmaster reminded all students never to run in corridors." }
  ];

  // Combine notes audio into 1 continuous dialogue audio passage if passageAudioText is not passed
  const fullAudioPassage = passageAudioText || defaultNotes.map(n => n.audio_text).join(" ");

  // Cleanup audio playback on unmount or tab switch
  useEffect(() => {
    return () => {
      VoiceService.stopAudio();
    };
  }, []);

  const handleToggleMasterAudio = async () => {
    if (isPlaying) {
      VoiceService.stopAudio();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      try {
        await VoiceService.speak(fullAudioPassage, 'dictation');
      } catch (err) {
        console.warn('[Notepad] Audio playback error:', err);
      } finally {
        setIsPlaying(false);
      }
    }
  };

  const handleReplayMasterAudio = async () => {
    VoiceService.stopAudio();
    setIsPlaying(true);
    try {
      await VoiceService.speak(fullAudioPassage, 'dictation');
    } catch (err) {
      console.warn('[Notepad] Audio playback error:', err);
    } finally {
      setIsPlaying(false);
    }
  };


  const handleCheck = () => {
    let totalCorrect = 0;
    defaultNotes.forEach((note) => {
      const userAns = (answers[note.id] || '').trim().toLowerCase();
      const targetAns = note.target.toLowerCase();
      if (userAns === targetAns || (userAns && targetAns.includes(userAns))) {
        totalCorrect++;
      }
    });
    const finalScore = Math.round((totalCorrect / defaultNotes.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
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
        {/* Compact Header & Audio Bar */}
        <div className="flex items-center justify-between border-b border-amber-200 pb-2 mb-2.5 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleMasterAudio}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all shadow-xs flex items-center gap-1.5 active:scale-95 ${
                isPlaying
                  ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-300 animate-pulse'
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              {isPlaying ? <Pause size={14} className="fill-amber-950" /> : <Play size={14} className="fill-white ml-0.5" />}
              <span>{isPlaying ? 'Pause' : '🔊 Play Audio'}</span>
            </button>
            <h3 className="text-xs sm:text-sm font-black text-amber-950">
              {title || "School Incident Notepad"} (5 Notes)
            </h3>
          </div>

          <button
            onClick={handleReplayMasterAudio}
            className="p-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-xs transition border border-amber-300 active:scale-95"
            title="Replay from start"
          >
            <RotateCcw size={13} />
          </button>
        </div>

        {/* Notes Form List */}
        <div className="space-y-1.5">
          {defaultNotes.map((note, index) => {
            const userAns = (answers[note.id] || '').trim().toLowerCase();
            const targetAns = note.target.toLowerCase();
            const isCorrect = isSubmitted && (userAns === targetAns || (userAns && targetAns.includes(userAns)));

            return (
              <div key={note.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-2.5 bg-white rounded-xl border border-amber-200 gap-1.5 shadow-2xs">
                <div className="flex items-center gap-2 flex-1">
                  <span className="w-5 h-5 rounded-md bg-amber-200 text-amber-950 font-black text-[11px] flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <span className="text-xs font-black text-amber-950">
                      {note.label}:
                    </span>
                    <span className="text-[11px] text-amber-700 ml-1.5 italic font-medium">({note.hint})</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 justify-end">
                  <input
                    type="text"
                    disabled={isSubmitted}
                    value={answers[note.id] || ''}
                    onChange={(e) => setAnswers({ ...answers, [note.id]: e.target.value })}
                    placeholder="Type note..."
                    className={`px-2.5 py-1 rounded-lg border font-bold text-xs text-slate-900 w-36 sm:w-48 focus:outline-none transition-all ${
                      isSubmitted
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                          : 'border-rose-400 bg-rose-50 text-rose-950'
                        : 'border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-200'
                    }`}
                  />
                  {isSubmitted && (
                    isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <div className="flex items-center gap-0.5">
                        <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                        <span className="text-[10px] font-bold text-rose-600">({note.target})</span>
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
