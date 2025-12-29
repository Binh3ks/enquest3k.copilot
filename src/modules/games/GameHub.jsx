import React, { useState, useEffect } from 'react';
import { Gamepad2, X, Globe, Zap, Trophy, ExternalLink, Volume2, Loader2 } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import weekIndex from '../../data/weeks/index';
import { useMemo } from 'react';

const GameHub = ({ data }) => {
  const [activeGame, setActiveGame] = useState(null);
  const [gameState, setGameState] = useState('menu');
  
  // Get vocab from current week (prefer stations.new_words which has injected audio), fallback to global_vocab
  const currentWeekVocab = data?.stations?.new_words?.vocab || data?.global_vocab || [];

  // Multi-week SRS aggregation logic (uses `data.srs_weeks` if provided)
  // This collects vocab from specified previous weeks (when available in weekIndex)
  const vocabList = useMemo(() => {
    const agg = [...currentWeekVocab];
    const srsWeeks = data?.srs_weeks || [];
    if (Array.isArray(srsWeeks) && srsWeeks.length > 0) {
      srsWeeks.forEach(wid => {
        const key = typeof wid === 'number' ? String(wid) : wid;
        const wk = weekIndex[`week_${String(key).padStart(2, '0')}`] || weekIndex[key] || null;
        if (wk) {
          const wkData = wk.stations?.new_words?.vocab || wk.global_vocab || [];
          agg.push(...wkData);
        }
      });
    }
    // dedupe by word (case-insensitive)
    const seen = new Set();
    const dedup = [];
    agg.forEach(item => {
      const k = (item.word || '').toLowerCase();
      if (!seen.has(k)) { seen.add(k); dedup.push(item); }
    });
    return dedup;
  }, [currentWeekVocab, data]);
  
  const [isPlaying, setIsPlaying] = useState(false);

  // ========== GAME 1: HANGMAN ==========
  const HangmanGame = () => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [guessed, setGuessed] = useState(new Set());
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);

    const gameVocab = vocabList.slice(0, 5);
    const currentWord = gameVocab[currentIdx];
    const word = currentWord?.word.toUpperCase() || '';
    
    const wrongGuesses = Array.from(guessed).filter(letter => !word.includes(letter));
    const guessedLetters = Array.from(guessed).filter(letter => word.includes(letter));
    const wordDisplay = word
      .split('')
      .map(letter => guessedLetters.includes(letter) ? letter : '_')
      .join(' ');
    
    const isWon = word.split('').every(letter => guessedLetters.includes(letter));
    const isLost = wrongGuesses.length >= 6;
    const hangmanStage = Math.min(wrongGuesses.length, 6);

    const playWord = () => {
      if (!currentWord || isPlayingAudio) return;
      setIsPlayingAudio(true);
      // Log để kiểm tra audio_word
      console.log('[Hangman] Playing:', currentWord.word, 'Audio URL:', currentWord.audio_word);
      speakText(currentWord.word, currentWord.audio_word)
        .finally(() => setIsPlayingAudio(false));
    };

    const handleGuess = (letter) => {
      if (guessed.has(letter) || isWon || isLost) return;
      const newGuessed = new Set([...guessed, letter]);
      setGuessed(newGuessed);

      if (!word.includes(letter)) {
        speakText("Wrong!");
      }
    };

    const handleNext = () => {
      if (isWon) {
        setScore(score + 10);
        if (currentIdx < gameVocab.length - 1) {
          setCurrentIdx(currentIdx + 1);
          setGuessed(new Set());
        } else {
          setFinished(true);
        }
      } else if (isLost) {
        if (currentIdx < gameVocab.length - 1) {
          setCurrentIdx(currentIdx + 1);
          setGuessed(new Set());
        } else {
          setFinished(true);
        }
      }
    };

    // Enhanced Hangman expressions
    const HANGMAN_FACES = {
      0: '😊',  // Start: happy
      1: '😐',  // 1 wrong
      2: '😕',  // 2 wrong
      3: '😟',  // 3 wrong
      4: '😢',  // 4 wrong
      5: '😭',  // 5 wrong
      6: '💀'   // 6 wrong: dead
    };

    const HANGMAN_BODY = {
      0: '  ',     // No body
      1: '|O|',    // Head
      2: '|O|\n | ', // Head + body
      3: '|O|\n/| ', // Head + body + left arm
      4: '|O|\n/|\\', // Head + body + both arms
      5: '|O|\n/|\\\n| ', // Head + body + both arms + left leg
      6: '|O|\n/|\\\n|_\n '  // Head + body + both arms + both legs (dead)
    };

    if (!currentWord) return <div className="text-center py-8">Loading...</div>;

    return (
      <div className="p-4 flex flex-col h-full min-h-0 bg-gradient-to-b from-purple-50 to-white">
        <div className="text-center">
          <h3 className="text-2xl font-black text-purple-900 mb-1">🎭 HANGMAN</h3>
          <p className="text-xs font-bold text-purple-600">Word {currentIdx + 1} of {gameVocab.length} | Score: {score}</p>
        </div>

        {!finished ? (
          <div className="flex flex-col items-center gap-6 flex-1 overflow-auto pb-4">
            {/* Hangman Visual - Enhanced */}
            <div className="text-center">
              <div className="text-5xl font-black mb-2">
                {HANGMAN_FACES[hangmanStage]}
              </div>
                <div className="text-xs font-mono whitespace-pre text-purple-700 h-10 flex items-center justify-center">
                {isWon && '🎉 NICE!'}
                {isLost && '💀 DEAD!'}
                {!isWon && !isLost && '🤔 GUESS!'}
              </div>
            </div>

            {/* Word Display */}
            <div className="bg-white p-4 rounded-xl border-2 border-purple-400 shadow-md max-w-lg mx-auto">
              <div className="text-2xl md:text-3xl font-black text-purple-900 tracking-widest font-mono leading-relaxed">
                {wordDisplay}
              </div>
              <p className="text-sm font-bold text-purple-500 text-center mt-3">
                Wrong: {wrongGuesses.length}/6 | Remaining: {26 - guessed.size}
              </p>
            </div>

            {/* Audio Button */}
            <button 
              onClick={playWord}
              disabled={isPlayingAudio}
              className="p-2 bg-purple-500 hover:bg-purple-600 rounded-full text-white hover:scale-105 transition-transform disabled:opacity-50 shadow-sm"
              title="Click to hear the word"
            >
              {isPlayingAudio ? <Loader2 size={24} className="animate-spin" /> : <Volume2 size={24} />}
            </button>

            {/* Alphabet Grid */}
            <div className="grid grid-cols-7 gap-2 w-full max-w-lg">
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                <button
                  key={letter}
                  onClick={() => handleGuess(letter)}
                  disabled={guessed.has(letter) || isWon || isLost}
                  className={`p-3 text-sm font-black rounded-lg transition-all ${
                    guessed.has(letter)
                      ? word.includes(letter)
                        ? 'bg-green-500 text-white scale-95'
                        : 'bg-red-500 text-white scale-95'
                      : 'bg-purple-200 hover:bg-purple-300 text-purple-900 hover:scale-110'
                  } disabled:cursor-not-allowed`}
                >
                  {letter}
                </button>
              ))}
            </div>

            {/* Result */}
            {(isWon || isLost) && (
              <div className={`p-4 rounded-xl text-center font-black w-full max-w-md ${
                isWon ? 'bg-green-100 text-green-700 border-4 border-green-400' : 'bg-red-100 text-red-700 border-4 border-red-400'
              }`}>
                <p className="text-xl mb-2">{isWon ? '🎉 CORRECT!' : '💀 GAME OVER!'}</p>
                <p className="text-sm mb-3">{isWon ? `The word was: ${word}` : `The word was: ${word}`}</p>
                <button 
                  onClick={handleNext}
                  className={`w-full px-4 py-2 rounded-lg font-black text-white text-sm ${
                    isWon ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {currentIdx < gameVocab.length - 1 ? 'Next Word →' : 'Finish Game'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-8 flex-1">
            <Trophy size={120} className="text-yellow-400 drop-shadow-lg" />
            <h2 className="text-4xl font-black text-purple-900">🏆 GAME OVER!</h2>
            <p className="text-2xl font-bold text-slate-600">Final Score: {score}</p>
            <button onClick={() => { setGameState('menu'); setActiveGame(null); }} className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-black text-lg">
              ← Back to Menu
            </button>
          </div>
        )}
      </div>
    );
  };

  // ========== GAME 2: SPELL BEE ==========
  const SpellBeeGame = () => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [input, setInput] = useState("");
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);

    const gameVocab = vocabList.slice(0, 5);
    const currentWord = gameVocab[currentIdx];

    const playWord = () => {
      if (!currentWord || isPlayingAudio) return;
      setIsPlayingAudio(true);
      console.log('[SpellBee] Playing:', currentWord.word, 'Audio URL:', currentWord.audio_word);
      speakText(currentWord.word, currentWord.audio_word)
        .finally(() => setIsPlayingAudio(false));
    };

    const checkSpell = () => {
      if (input.toLowerCase().trim() === currentWord.word.toLowerCase()) {
        speakText("Correct!");
        setFeedback("✅ Correct!");
        setScore(score + 10);
        setTimeout(() => {
          if (currentIdx < gameVocab.length - 1) {
            setCurrentIdx(currentIdx + 1);
            setInput("");
            setFeedback("");
          } else {
            setFinished(true);
          }
        }, 800);
      } else {
        speakText("Try again!");
        setFeedback("❌ Try again!");
      }
    };

    if (!currentWord) return <div className="text-center py-12">Loading...</div>;

    return (
      <div className="p-8 flex flex-col h-full items-center justify-center">
        {!finished ? (
          <>
            <h3 className="text-2xl font-black text-amber-900 mb-4">🐝 SPELL BEE</h3>
            <p className="text-sm font-black text-amber-600 mb-8">Word {currentIdx + 1} of {gameVocab.length}</p>
            
            <div className="bg-white p-8 rounded-3xl shadow-lg border-4 border-amber-300 mb-8 max-w-sm">
              <button 
                onClick={playWord}
                disabled={isPlayingAudio}
                className="p-4 bg-amber-100 rounded-full text-amber-600 hover:scale-110 transition-transform mb-6 mx-auto block disabled:opacity-50"
              >
                {isPlayingAudio ? <Loader2 size={32} className="animate-spin" /> : <Volume2 size={32} />}
              </button>
              <p className="text-xs font-bold text-slate-500 text-center">Listen to the word, then type it:</p>
            </div>

            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && checkSpell()}
              className="w-full max-w-sm p-4 border-4 border-amber-300 rounded-2xl text-xl font-black text-center mb-6 outline-none focus:border-amber-500"
              placeholder="Type here..."
            />

            {feedback && <p className="text-2xl font-black mb-4">{feedback}</p>}

            <button onClick={checkSpell} className="w-full max-w-sm py-4 bg-amber-500 text-white rounded-2xl font-black text-lg hover:bg-amber-600">
              CHECK SPELLING
            </button>
          </>
        ) : (
          <div className="text-center">
            <Trophy size={80} className="text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl font-black text-amber-900 mb-2">🏆 COMPLETE!</h2>
            <p className="text-lg font-bold text-slate-600 mb-6">Final Score: {score}</p>
            <button onClick={() => { setGameState('menu'); setActiveGame(null); }} className="px-8 py-3 bg-green-600 text-white rounded-lg font-black">Back</button>
          </div>
        )}
      </div>
    );
  };

  // ========== GAME 3: VOCAB POP ==========
  const VocabPopGame = () => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);

    const gameVocab = vocabList.slice(0, 5);
    const currentWord = gameVocab[currentIdx];

    const playWord = () => {
      if (!currentWord || isPlayingAudio) return;
      setIsPlayingAudio(true);
      console.log('[VocabPop] Playing:', currentWord.word, 'Audio URL:', currentWord.audio_word);
      speakText(currentWord.word, currentWord.audio_word)
        .finally(() => setIsPlayingAudio(false));
    };

    const getOptions = () => {
      const correct = currentWord.definition_en;
      const wrong = gameVocab
        .filter((_, i) => i !== currentIdx)
        .slice(0, 2)
        .map(w => w.definition_en);
      return [correct, ...wrong].sort(() => Math.random() - 0.5);
    };

    const handleAnswer = (isCorrect) => {
      if (isCorrect) {
        speakText("Correct!");
        setScore(score + 10);
        if (currentIdx < gameVocab.length - 1) {
          setCurrentIdx(currentIdx + 1);
        } else {
          setFinished(true);
        }
      } else {
        speakText("Wrong bubble!");
      }
    };

    if (!currentWord) return <div className="text-center py-12">Loading...</div>;

    return (
      <div className="p-8 flex flex-col h-full items-center justify-center">
        {!finished ? (
          <>
            <h3 className="text-2xl font-black text-sky-900 mb-4">🎈 VOCAB POP</h3>
            <p className="text-sm font-black text-sky-600 mb-8">Word {currentIdx + 1} of {gameVocab.length}</p>
            
            <div className="bg-white p-8 rounded-3xl shadow-lg mb-8 max-w-sm border-4 border-sky-300">
              <button 
                onClick={playWord}
                disabled={isPlayingAudio}
                className="p-4 bg-sky-100 rounded-full text-sky-600 hover:scale-110 transition-transform mb-6 mx-auto block disabled:opacity-50"
              >
                {isPlayingAudio ? <Loader2 size={32} className="animate-spin" /> : <Volume2 size={32} />}
              </button>
              <p className="text-2xl font-black text-sky-900 text-center mb-2">{currentWord.word}</p>
              <p className="text-xs text-slate-500 text-center font-bold">Pop the bubble with the right definition!</p>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-sm">
              {getOptions().map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option === currentWord.definition_en)}
                  className="p-4 bg-sky-300 text-sky-900 rounded-full font-black text-sm hover:scale-110 transition-transform active:scale-95 shadow-lg border-4 border-sky-400"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <Trophy size={80} className="text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl font-black text-sky-900 mb-2">🎉 ALL BUBBLES POPPED!</h2>
            <p className="text-lg font-bold text-slate-600 mb-6">Final Score: {score}</p>
            <button onClick={() => { setGameState('menu'); setActiveGame(null); }} className="px-8 py-3 bg-green-600 text-white rounded-lg font-black">Back</button>
          </div>
        )}
      </div>
    );
  };

  // EXTERNAL GAMES
  const EXTERNAL_GAMES = [
    { id: 'gtle', title: 'Arcade World', icon: '🎮', url: 'https://www.gamestolearnenglish.com/', color: 'bg-gradient-to-br from-indigo-500 to-blue-600' },
    { id: 'wordwall', title: 'Wordwall Park', icon: '🌍', url: 'https://wordwall.net/', color: 'bg-gradient-to-br from-rose-400 to-pink-600' },
    { id: 'baamboozle', title: 'Baamboozle', icon: '🧩', url: 'https://www.baamboozle.com/', color: 'bg-gradient-to-br from-emerald-400 to-teal-600' },
    { id: 'eslgamesplus', title: 'ESL Games Plus', icon: '🧸', url: 'https://www.eslgamesplus.com/', color: 'bg-gradient-to-br from-yellow-400 to-orange-500' }
  ];

  const handleOpenExternal = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (activeGame) {
    return (
      <div className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center p-2 animate-in zoom-in-95">
        <button 
          onClick={() => { setGameState('menu'); setActiveGame(null); }} 
          className="absolute top-6 right-6 text-white bg-rose-500 p-4 rounded-full hover:bg-rose-600 active:scale-95 transition-all shadow-2xl z-[210]"
          title="Close Game (Esc)"
        >
          <X size={28} />
        </button>
        <div className="w-full h-full max-w-2xl max-h-[90vh] bg-white rounded-[20px] shadow-2xl overflow-auto border-2 border-slate-800 flex flex-col">
          {activeGame === 'hangman' && <HangmanGame />}
          {activeGame === 'spell' && <SpellBeeGame />}
          {activeGame === 'pop' && <VocabPopGame />}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-1000">
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 p-6 rounded-[32px] text-white shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-md shadow-inner rotate-3">
            <Gamepad2 size={36} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase drop-shadow-lg">Arcade Zone</h2>
        </div>
        <p className="text-indigo-100 font-bold text-sm md:text-lg max-w-xl">Turn your lesson into a high-score adventure! 🎮🏆</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Local Games */}
        <div className="bg-white p-6 rounded-[40px] shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-800 text-3xl flex items-center gap-4 mb-10 italic uppercase">
            <Zap className="text-amber-500 fill-amber-500" size={32} /> Lesson Missions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { id: 'hangman', title: 'Hangman', icon: '🎭', desc: 'Guess the word!' },
              { id: 'spell', title: 'Spell Bee', icon: '🐝', desc: 'Spell the word.' },
              { id: 'pop', title: 'Vocab Pop', icon: '🎈', desc: 'Pop the bubble!' }
            ].map(g => (
              <button
                key={g.id}
                onClick={() => { setActiveGame(g.id); setGameState('playing'); }}
                className="group bg-slate-50 p-6 rounded-[28px] hover:bg-indigo-600 transition-all text-center border-b-4 border-slate-200 hover:border-indigo-800"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-400">{g.icon}</div>
                <h4 className="font-black text-xl md:text-2xl text-slate-700 group-hover:text-white uppercase leading-none">{g.title}</h4>
                <p className="text-xs font-bold text-slate-400 group-hover:text-indigo-200 mt-2 uppercase tracking-widest">{g.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Online Games */}
        <div className="bg-slate-950 p-10 rounded-[70px] shadow-2xl border-4 border-slate-800 flex flex-col">
          <h3 className="font-black text-white text-3xl flex items-center gap-4 mb-10 italic uppercase">
            <Globe className="text-sky-400" size={32} /> World Adventure
          </h3>
          <div className="grid grid-cols-1 gap-5 flex-1">
            {EXTERNAL_GAMES.map(g => (
              <button
                key={g.id}
                onClick={() => handleOpenExternal(g.url)}
                className={`group ${g.color} p-8 rounded-[45px] transition-all cursor-pointer flex items-center justify-between border-b-8 border-black/30 hover:translate-x-2 active:scale-95`}
              >
                <div className="flex items-center gap-6 text-white">
                  <div className="text-6xl group-hover:rotate-12 transition-transform">{g.icon}</div>
                  <div>
                    <h4 className="font-black text-2xl uppercase tracking-tight">{g.title}</h4>
                    <p className="text-xs font-bold opacity-70 uppercase">Explore Online</p>
                  </div>
                </div>
                <div className="bg-white/20 p-4 rounded-3xl">
                  <ExternalLink className="text-white" size={24} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHub;
