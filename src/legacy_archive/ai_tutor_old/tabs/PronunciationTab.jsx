import React, { useState } from 'react';
import { Volume2, Play, Mic, MicOff, RotateCcw } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';

/**
 * PronunciationTab - Practice pronunciation with vocabulary
 */
const PronunciationTab = ({ weekData, recognitionRef }) => {
  const [pronWord, setPronWord] = useState(null);
  const [pronScore, setPronScore] = useState(null);
  const [pronAttempts, setPronAttempts] = useState(0);
  const [isListening, setIsListening] = useState(false);

  const vocabList = weekData?.stations?.new_words?.vocab || [];
  const weekId = weekData?.weekId || 1;
  const simpleVocab = vocabList.filter(v => v.word && v.word.length <= (weekId <= 14 ? 6 : 10));

  const startPronunciation = () => {
    if (vocabList.length === 0) return;
    const word = vocabList[Math.floor(Math.random() * vocabList.length)];
    setPronWord(word);
    setPronScore(null);
    setPronAttempts(0);
    speakText(`Say the word: ${word.word}`);
  };

  const checkPronunciation = () => {
    if (!recognitionRef?.current || !pronWord) return;

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      const confidence = event.results[0][0].confidence;

      if (transcript.includes(pronWord.word.toLowerCase())) {
        const score = Math.round(confidence * 100);
        setPronScore(score);
        setPronAttempts(prev => prev + 1);
        speakText(score >= 80 ? "Excellent!" : score >= 60 ? "Good! Try again." : "Keep practicing!");
      } else {
        setPronScore(20);
        speakText(`I heard "${transcript}". Try: ${pronWord.word}`);
      }
      setIsListening(false);
    };

    recognitionRef.current.onend = () => setIsListening(false);
    recognitionRef.current.onerror = () => setIsListening(false);
    recognitionRef.current.start();
    setIsListening(true);
  };

  return (
    <div className="space-y-4 text-center p-4">
      {!pronWord ? (
        <>
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-indigo-50">
            <Volume2 size={40} className="text-indigo-600"/>
          </div>
          <p className="text-sm font-bold text-slate-700">Practice pronunciation with vocabulary!</p>
          <p className="text-xs text-slate-500 mb-4">Ms. Nova will listen and help you say it perfectly.</p>
          <button onClick={startPronunciation} className="w-full bg-indigo-600 text-white p-3 rounded-xl font-black text-sm uppercase hover:bg-indigo-700 flex items-center justify-center gap-2 transition-all active:scale-95">
            <Play size={16}/>Start Practice
          </button>
        </>
      ) : (
        <>
          <div className="bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-200">
            <p className="text-xs font-black text-indigo-600 uppercase mb-2">Say This Word:</p>
            <p className="text-3xl font-black text-slate-800 mb-2">{pronWord.word}</p>
            {pronWord.pronunciation && <p className="text-sm text-slate-500 italic">{pronWord.pronunciation}</p>}
            <button onClick={() => speakText(pronWord.word)} className="mt-3 p-2 bg-white rounded-lg hover:bg-indigo-100 transition-all">
              <Volume2 size={20} className="mx-auto text-indigo-600"/>
            </button>
          </div>

          {pronScore !== null && (
            <div className={`p-4 rounded-xl border-2 ${pronScore >= 80 ? 'bg-green-50 border-green-200' : pronScore >= 60 ? 'bg-yellow-50 border-yellow-200' : 'bg-orange-50 border-orange-200'}`}>
              <p className="text-2xl font-black mb-1">{pronScore}%</p>
              <p className="text-xs font-bold">{pronScore >= 80 ? 'Excellent!' : pronScore >= 60 ? 'Good! Try again.' : 'Keep practicing!'}</p>
              <p className="text-xs text-slate-500 mt-1">Attempts: {pronAttempts}</p>
            </div>
          )}

          <button
            onClick={checkPronunciation}
            disabled={isListening}
            className={`w-full p-4 rounded-xl font-black text-white flex items-center justify-center gap-2 transition-all ${isListening ? 'bg-red-500 animate-pulse' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {isListening ? <><MicOff size={18}/>Recording...</> : <><Mic size={18}/>Record Pronunciation</>}
          </button>

          <button onClick={startPronunciation} className="w-full p-2 text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center justify-center gap-1">
            <RotateCcw size={12}/>Try Another Word
          </button>
        </>
      )}
    </div>
  );
};

export default PronunciationTab;
