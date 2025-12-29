import React, { useState, useEffect } from 'react';
import { Target, Image as ImageIcon, Type, RefreshCw, Trophy, Check, Star, Music, Play, ImageOff } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import InstructionBar from '../../components/common/InstructionBar';

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const WordMatch = ({ data, themeColor, isVi, onToggleLang, onReportProgress }) => {
  const [gameMode, setGameMode] = useState('meaning'); 
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isLock, setIsLock] = useState(false);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);

  const vocabList = data?.stations?.new_words?.vocab || [];

  useEffect(() => {
    if (vocabList.length > 0) {
      startNewGame(gameMode);
    }
  }, [data, gameMode]);

  // REPORT PROGRESS WHEN COMPLETED
  useEffect(() => {
      if (cards.length > 0 && matchedCards.length === cards.length) {
          if (onReportProgress) onReportProgress(100);
      }
  }, [matchedCards, cards, onReportProgress]);

  const startNewGame = (mode) => {
    const selectedVocab = vocabList.slice(0, 10); 
    
    let gameCards = [];
    selectedVocab.forEach(item => {
      const audioUrl = item.audio_word || item.audio_url;

      // 1. Word Card
      gameCards.push({ 
        id: item.id, type: 'word', 
        content: item.word, 
        speakContent: item.word,
        audioUrl: audioUrl,
        uniqueId: `word-${item.id}` 
      });
      
      // 2. Pair Card
      if (mode === 'meaning') {
        gameCards.push({ 
          id: item.id, type: 'meaning', 
          content: item.definition_vi, 
          speakContent: item.word,
          audioUrl: audioUrl,
          uniqueId: `pair-${item.id}` 
        });
      } else if (mode === 'image') {
        gameCards.push({ 
          id: item.id, type: 'image', 
          content: item.image_url, 
          speakContent: item.word,
          audioUrl: audioUrl,
          uniqueId: `pair-${item.id}` 
        });
      } else if (mode === 'audio') {
        gameCards.push({ 
          id: item.id, type: 'audio', 
          content: item.word, 
          speakContent: item.word,
          audioUrl: audioUrl,
          uniqueId: `pair-${item.id}` 
        });
      }
    });

    setCards(shuffleArray(gameCards));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setScore(0);
    setIsLock(false);
  };

  const handleCardClick = (card) => {
    if (isLock || flippedCards.includes(card) || matchedCards.includes(card.uniqueId)) return;

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);
    
    if (card.speakContent) {
      speakText(card.speakContent, card.audioUrl);
    }

    if (newFlipped.length === 2) {
      setIsLock(true);
      setMoves(prev => prev + 1);
      
      const [card1, card2] = newFlipped;
      
      if (card1.id === card2.id) {
        setTimeout(() => {
          setMatchedCards(prev => [...prev, card1.uniqueId, card2.uniqueId]);
          setFlippedCards([]);
          setIsLock(false);
          setScore(prev => prev + 10);
        }, 500);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setIsLock(false);
        }, 1000);
      }
    }
  };

  const handleImageError = (e, word) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  const isCompleted = cards.length > 0 && matchedCards.length === cards.length;

  if (!vocabList.length) return <div className="p-10 text-center text-slate-400">No vocabulary data found.</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in pb-24">
      <InstructionBar 
        themeColor={themeColor} isVi={isVi} onToggle={onToggleLang}
        textEn="Memory Game! Flip cards to hear words. Match pairs."
        textVi="Trò chơi trí nhớ! Lật thẻ để nghe từ. Tìm cặp tương ứng."
      />

      <div className="flex flex-wrap justify-center gap-3 mb-4 no-print bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
        {[
          { id: 'meaning', icon: Type, labelEn: 'Meaning', labelVi: 'Theo Nghĩa', color: 'indigo' },
          { id: 'image', icon: ImageIcon, labelEn: 'Image', labelVi: 'Theo Hình', color: 'emerald' },
          { id: 'audio', icon: Music, labelEn: 'Audio', labelVi: 'Theo Âm', color: 'rose' }
        ].map(mode => (
          <button 
            key={mode.id}
            onClick={() => setGameMode(mode.id)}
            className={`btn-3d px-5 py-3 rounded-xl font-bold flex items-center space-x-2 transition-all ${gameMode === mode.id ? `bg-${mode.color}-500 text-white ring-2 ring-${mode.color}-200` : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
          >
            <mode.icon className="w-5 h-5" />
            <span>{isVi ? mode.labelVi : mode.labelEn}</span>
          </button>
        ))}
        <button onClick={() => startNewGame(gameMode)} className="btn-3d px-4 py-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold ml-auto">
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
        {cards.map((card) => {
          const isFlipped = flippedCards.includes(card) || matchedCards.includes(card.uniqueId);
          const isMatched = matchedCards.includes(card.uniqueId);
          
          return (
            <div 
              key={card.uniqueId}
              onClick={() => handleCardClick(card)}
              className={`relative aspect-[3/4] cursor-pointer [perspective:1000px] group ${isMatched ? 'pointer-events-none' : ''}`}
            >
              <div className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                
                {/* BACK */}
                <div className={`absolute inset-0 rounded-xl shadow-md flex items-center justify-center [backface-visibility:hidden] bg-${themeColor}-500 border-4 border-white group-hover:-translate-y-1 transition-transform`}>
                  <Target className="w-8 h-8 text-white/50" />
                </div>

                {/* FRONT */}
                <div className={`absolute inset-0 bg-white rounded-xl shadow-md border-2 flex items-center justify-center p-2 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] ${isMatched ? 'border-green-400 bg-green-50 opacity-60 scale-95' : `border-${themeColor}-200`}`}>
                  
                  {card.type === 'image' ? (
                    <>
                      <img 
                        src={card.content} 
                        alt="card" 
                        className="w-full h-full object-cover rounded-lg" 
                        onError={(e) => handleImageError(e, card.speakContent)}
                      />
                      <div className="hidden w-full h-full flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-lg">
                        <ImageOff className="w-8 h-8 mb-1" />
                        <span className="text-xs font-bold">{card.speakContent}</span>
                      </div>
                    </>
                  ) : card.type === 'audio' ? (
                    <div className="flex flex-col items-center justify-center text-rose-500">
                      <div className="p-3 bg-rose-100 rounded-full mb-2"><Music className="w-8 h-8" /></div>
                      <span className="text-xs font-bold text-slate-400 uppercase">Listen</span>
                    </div>
                  ) : (
                    <span className={`font-bold select-none ${card.type === 'word' ? 'text-xl text-slate-800' : `text-sm text-${themeColor}-600`}`}>
                      {card.content}
                    </span>
                  )}
                
                  {isMatched && <div className="absolute top-1 right-1 text-green-500"><Check className="w-4 h-4" /></div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {isCompleted && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-bounce-in">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">{isVi ? 'Thắng rồi!' : 'Victory!'}</h3>
            <p className="mb-4 text-slate-500">{isVi ? `Hoàn thành trong ${moves} bước.` : `Finished in ${moves} moves.`}</p>
            <button onClick={() => startNewGame(gameMode)} className={`btn-3d w-full py-3 bg-${themeColor}-600 text-white rounded-xl font-bold`}>{isVi ? 'Chơi lại' : 'Play Again'}</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default WordMatch;
