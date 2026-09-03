import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Mic, Square, CheckCircle2, AlertCircle, Sparkles, BookOpen, RotateCcw, Keyboard } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import CompletionModal from '../common/CompletionModal';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { useUserStore } from '../../stores/useUserStore';

export function PictureStoryContinuation({ customData, data: propData, weekNumber = 34, onComplete }) {
  const activeData = customData || propData || {};
  const [activeImageIdx, setActiveImageIdx] = useState(1); // 1 = picture 2, 0 is picture 1 (examiner)
  const [storyText, setStoryText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const recognitionRef = useRef(null);

  const images = activeData?.images || [
    { id: 1, image_url: `/images/week${weekNumber}/ps_1.png`, narrator_prompt: "Leo and Milo decided to explore the forest." },
    { id: 2, image_url: `/images/week${weekNumber}/ps_2.png`, narrator_prompt: "They found a hidden cave near the river." },
    { id: 3, image_url: `/images/week${weekNumber}/ps_3.png`, narrator_prompt: "Inside the cave, they saw something shiny." },
    { id: 4, image_url: `/images/week${weekNumber}/ps_4.png`, narrator_prompt: "It was an old treasure chest with gold coins!" }
  ];

  const examinerIntro = activeData?.examiner_intro || "Look at these four pictures. They tell a story. First, I'll tell you about picture one. Then you tell me about pictures two, three, and four.";

  const wordCount = storyText.trim() ? storyText.trim().split(/\s+/).length : 0;
  const isLengthValid = wordCount >= 20;

  // Cleanup speech rec
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
    };
  }, []);

  const handlePlayExaminerLeadIn = () => {
    speakText(examinerIntro + " " + (images[0]?.narrator_prompt || ""));
  };

  const startRecording = () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      setShowTextInput(true);
      return;
    }

    try {
      const rec = new SpeechRec();
      rec.lang = 'en-US';
      rec.continuous = true;
      rec.interimResults = true;

      rec.onstart = () => setIsRecording(true);
      rec.onresult = (event) => {
        let fullTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          fullTranscript += event.results[i][0].transcript + ' ';
        }
        setStoryText(fullTranscript.trim());
      };
      rec.onerror = (e) => {
        console.warn('Speech recognition error in picture story:', e);
        setIsRecording(false);
        setShowTextInput(true);
      };
      rec.onend = () => setIsRecording(false);

      recognitionRef.current = rec;
      rec.start();
    } catch (err) {
      console.warn('SpeechRec start failed:', err);
      setIsRecording(false);
      setShowTextInput(true);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
    setIsRecording(false);
  };

  const handleSubmit = () => {
    if (!isLengthValid) return;
    const finalScore = Math.min(100, Math.round((wordCount / 25) * 100));
    setScore(finalScore);
    setIsSubmitted(true);

    if (finalScore >= 80) {
      fireCelebrationConfetti('PictureStory_Complete');
    }

    if (onComplete) onComplete(finalScore);
  };

  const handleReset = () => {
    setStoryText('');
    setIsSubmitted(false);
    setScore(null);
  };

  const starsEarned = (score || 0) >= 80 ? 3 : (score || 0) >= 60 ? 2 : 1;

  return (
    <div className="w-full max-w-5xl mx-auto my-4 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans space-y-6">
      <CompletionModal
        isOpen={isSubmitted && (score || 0) >= 50}
        onClose={() => {}}
        score={score || 0}
        stars={starsEarned}
        xpEarned={50}
        srsWordsAdded={5}
        activityTitle="Picture Story Continuation (Speaking Part 3)"
      />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <span className="px-3 py-1 bg-purple-100 text-purple-900 text-[11px] font-black rounded-full uppercase tracking-wider">
            Cambridge A2 Flyers Practice — Speaking Part 3
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Picture Story Continuation (5-Scene Sequence)
          </h2>
          <p className="text-xs text-purple-700 font-bold mt-0.5">
            {examinerIntro}
          </p>
        </div>
        <button
          type="button"
          onClick={handlePlayExaminerLeadIn}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 text-white rounded-xl font-black text-xs shadow-md flex items-center gap-1.5 shrink-0"
        >
          <Volume2 size={16} /> Listen to Examiner Lead-in
        </button>
      </div>

      {/* 5-Picture Continuous Row */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen size={15} className="text-purple-600" /> Story Scenes (Pictures 1–5):
          </span>
          <span className="text-[11px] font-bold text-slate-500">
            Picture 1 is Examiner Lead-In · Tell Pictures 2–5
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {images.map((img, idx) => {
            const isLeadIn = idx === 0;
            const isCurrent = activeImageIdx === idx;

            return (
              <div
                key={img.id || idx}
                onClick={() => !isSubmitted && setActiveImageIdx(idx)}
                className={`p-2 rounded-2xl border-2 transition-all cursor-pointer space-y-1.5 ${
                  isLeadIn
                    ? 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-200'
                    : isCurrent
                    ? 'bg-purple-50/90 border-purple-500 ring-2 ring-purple-300 scale-102 shadow-md'
                    : 'bg-white border-slate-200 hover:border-purple-300'
                }`}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={img.image_url}
                    alt={`Scene ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <span className={`absolute top-1 left-1 px-2 py-0.5 rounded-md font-black text-[10px] uppercase tracking-wider ${
                    isLeadIn ? 'bg-amber-500 text-white' : 'bg-slate-900/80 text-white'
                  }`}>
                    {isLeadIn ? '★ Picture 1' : `Picture ${idx + 1}`}
                  </span>
                </div>
                <p className="text-[10px] text-slate-700 font-semibold leading-tight line-clamp-2 px-1">
                  {img.narrator_prompt}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Student Recording & Narration Area */}
      <div className="p-5 sm:p-6 bg-purple-50/60 rounded-3xl border-2 border-purple-200 space-y-4 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-black text-xs flex items-center justify-center">
              🎙️
            </span>
            <h3 className="text-sm font-black text-purple-950">
              Your Turn: Retell Pictures 2, 3, 4, and 5
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-black border ${
              isLengthValid
                ? 'bg-emerald-100 border-emerald-300 text-emerald-950'
                : 'bg-amber-100 border-amber-300 text-amber-950'
            }`}>
              {wordCount} / 20 words min
            </span>

            <button
              type="button"
              onClick={() => setShowTextInput(prev => !prev)}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
            >
              <Keyboard size={14} /> {showTextInput ? 'Use Mic' : 'Type Story'}
            </button>
          </div>
        </div>

        {/* Live Narration Text Display or Editable Textarea */}
        <div className="relative">
          <textarea
            disabled={isSubmitted}
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
            rows={4}
            placeholder="Describe what happens in Pictures 2, 3, 4 and 5... (e.g. Next, they found a secret cave near the river. Inside, they discovered an old chest with gold coins!)"
            className={`w-full p-4 rounded-2xl border-2 font-medium text-sm text-slate-900 focus:outline-none transition leading-relaxed ${
              isSubmitted
                ? 'bg-slate-100 border-slate-300'
                : 'bg-white border-purple-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200'
            }`}
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
          <div className="flex items-center gap-2">
            {!isRecording ? (
              <button
                type="button"
                disabled={isSubmitted}
                onClick={startRecording}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black text-xs shadow-md flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
              >
                <Mic size={16} /> Record Your Voice
              </button>
            ) : (
              <button
                type="button"
                onClick={stopRecording}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-black text-xs shadow-md flex items-center gap-1.5 animate-pulse cursor-pointer"
              >
                <Square size={16} /> Stop Recording
              </button>
            )}
          </div>

          {!isSubmitted ? (
            <button
              type="button"
              disabled={!isLengthValid}
              onClick={handleSubmit}
              className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition shadow-md flex items-center gap-2 ${
                isLengthValid
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Sparkles size={16} /> Submit Story (≥20 words)
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-wider transition shadow-md"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PictureStoryContinuation;
