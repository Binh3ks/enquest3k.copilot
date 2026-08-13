import React, { useState } from 'react';
import { Volume2, CheckCircle2, AlertCircle, Sparkles, HelpCircle } from 'lucide-react';
import VoiceService from '../../services/voiceService';


export function NotepadNoteCompleter({ title, notes, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const defaultNotes = notes || [
    { id: 1, label: "Incident Location", hint: "Where did it happen?", target: "school corridor", audio_text: "The incident happened down the school corridor after science class." },
    { id: 2, label: "Cause of Fall", hint: "Why did he slip?", target: "wet floor", audio_text: "The classmate running fast slipped on the wet floor." },
    { id: 3, label: "Person Called", hint: "Who did Jake call?", target: "school nurse", audio_text: "Jake stopped immediately and called the school nurse." },
    { id: 4, label: "First Aid Applied", hint: "What did nurse apply?", target: "clean bandage", audio_text: "The nurse treated his cut knee gently with a clean bandage." },
    { id: 5, label: "School Rule", hint: "What rule to follow?", target: "never run", audio_text: "The headmaster reminded all students never to run in corridors." }
  ];

  const handlePlayAudio = (text) => {
    VoiceService.speak(text, 'dictation');
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
    <div className="w-full max-w-2xl mx-auto my-6 bg-amber-50 rounded-3xl border-4 border-amber-200 shadow-xl p-6 sm:p-8 relative overflow-hidden">
      {/* Top Notepad Spiral Binding Effect */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-amber-200/80 flex justify-around items-center px-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-3 h-3 rounded-full bg-amber-700 shadow-inner"></div>
        ))}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between border-b-2 border-amber-300 pb-3 mb-6">
          <div>
            <span className="text-xs font-black text-amber-700 uppercase tracking-widest">CAMBRIDGE LISTENING PART 2</span>
            <h3 className="text-xl sm:text-2xl font-black text-amber-950 font-serif">{title || "School Incident Notepad"}</h3>
          </div>
          <span className="px-3 py-1 bg-amber-200 text-amber-900 text-xs font-black rounded-full font-mono">
            5 Notes
          </span>
        </div>

        {/* Notes Form List */}
        <div className="space-y-4 font-mono">
          {defaultNotes.map((note, index) => {
            const userAns = (answers[note.id] || '').trim().toLowerCase();
            const targetAns = note.target.toLowerCase();
            const isCorrect = isSubmitted && (userAns === targetAns || (userAns && targetAns.includes(userAns)));

            return (
              <div key={note.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-white/80 rounded-2xl border border-amber-200 gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => handlePlayAudio(note.audio_text)}
                    className="p-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-md transition-all active:scale-95 flex-shrink-0"
                    title="Listen to note prompt"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <div>
                    <span className="text-sm font-bold text-amber-900 font-sans">
                      {index + 1}. {note.label}:
                    </span>
                    <p className="text-xs text-amber-600 font-sans italic">{note.hint}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    disabled={isSubmitted}
                    value={answers[note.id] || ''}
                    onChange={(e) => setAnswers({ ...answers, [note.id]: e.target.value })}
                    placeholder="Type note..."
                    className={`px-3 py-2 rounded-xl border-2 font-bold text-sm text-slate-900 w-44 sm:w-52 focus:outline-none transition-all ${
                      isSubmitted
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                          : 'border-rose-400 bg-rose-50 text-rose-950'
                        : 'border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
                    }`}
                  />
                  {isSubmitted && (
                    isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <div className="flex items-center gap-1">
                        <AlertCircle className="w-6 h-6 text-rose-500 flex-shrink-0" />
                        <span className="text-xs font-bold text-rose-600">({note.target})</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit / Score Footer */}
        <div className="mt-6 pt-4 border-t-2 border-amber-300 flex items-center justify-between">
          {!isSubmitted ? (
            <button
              onClick={handleCheck}
              className="w-full sm:w-auto px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-black text-base rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Check Notepad Answers
            </button>
          ) : (
            <div className="w-full flex items-center justify-between bg-white/90 p-4 rounded-2xl border border-amber-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-600 animate-spin" />
                <span className="text-lg font-black text-amber-950">
                  Notepad Score: {score}%
                </span>
              </div>
              <button
                onClick={() => { setIsSubmitted(false); setAnswers({}); }}
                className="px-4 py-2 bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold text-sm rounded-xl transition-all"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotepadNoteCompleter;

