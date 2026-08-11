import { useState, useMemo } from 'react';
import { BookOpen, Microscope, Globe, Volume2 } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUrl';
import HoverWord from '../common/HoverWord';
import dictionaryData from '../../data/dictionary.json';
import { speakText } from '../../utils/AudioHelper';
import { useUserStore } from '../../stores/useUserStore';

/**
 * TabbedReadExplore - Dual Tab Component for W35+ Structure
 * 
 * Two tabs:
 * 1. STEM Story - Science/Technology context (10 STEM terms)
 * 2. Social Studies - History/Geography context (10 social terms)
 * 
 * Enhanced learning through content-based language acquisition
 */
const TabbedReadExplore = ({ weekNumber, weekData }) => {
  const { learningMode } = useUserStore();
  const [activeTab, setActiveTab] = useState('stem');
  const [isPlaying, setIsPlaying] = useState(false);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState({});

  const handleCheck = (idx, _userAnswer, _correctAnswers) => {
    setChecked(prev => ({ ...prev, [idx]: true }));
  };

  const dictionary = useMemo(() => {
    const arr = Array.isArray(dictionaryData) ? dictionaryData : [];
    return Object.fromEntries(arr.map(e => [(e.word || '').toLowerCase(), e]));
  }, []);

  const lookupDict = (raw) => {
    if (!raw) return null;
    const t = raw.toLowerCase().trim();
    if (dictionary[t]) return dictionary[t];
    if (t.endsWith('s') && dictionary[t.slice(0, -1)]) return dictionary[t.slice(0, -1)];
    if (t.endsWith('ed') && dictionary[t.slice(0, -2)]) return dictionary[t.slice(0, -2)];
    return null;
  };

  const renderStyledText = (text) => {
    if (!text) return null;
    let key = 0;
    const parts = [];
    const segments = text.split(/(\*\*.*?\*\*)/);

    for (const segment of segments) {
      if (segment.startsWith('**') && segment.endsWith('**')) {
        const word = segment.slice(2, -2).trim();
        parts.push(
          <HoverWord
            key={key++}
            word={word}
            themeColor={activeTab === 'stem' ? 'indigo' : 'amber'}
            onSpeak={(w) => speakText(w, null, 1.0, null, 'new_word', weekNumber, learningMode)}
            entry={lookupDict(word)}
            tier={1}
          />
        );
      } else {
        let currentWord = '';
        let currentNonWord = '';

        for (let i = 0; i < segment.length; i++) {
          const char = segment[i];
          const isWordChar = /[\w'-]/.test(char);

          if (isWordChar) {
            if (currentNonWord) {
              const cleanedNonWord = currentNonWord.replace(/^\s+([.,!?:;])/, '$1');
              parts.push(<span key={key++} className="text-xl md:text-2xl leading-relaxed md:leading-loose text-slate-800">{cleanedNonWord}</span>);
              currentNonWord = '';
            }
            currentWord += char;
          } else {
            if (currentWord) {
              const entry = lookupDict(currentWord);
              let tier = (entry && entry.meaning) ? 2 : 3;
              parts.push(
                <HoverWord
                  key={key++}
                  word={currentWord}
                  themeColor={activeTab === 'stem' ? 'indigo' : 'amber'}
                  onSpeak={(w) => speakText(w, null, 1.0, null, 'new_word', weekNumber, learningMode)}
                  entry={entry}
                  tier={tier}
                />
              );
              currentWord = '';
            }
            currentNonWord += char;
          }
        }

        if (currentWord) {
          const entry = lookupDict(currentWord);
          let tier = (entry && entry.meaning) ? 2 : 3;
          parts.push(
            <HoverWord
              key={key++}
              word={currentWord}
              themeColor={activeTab === 'stem' ? 'indigo' : 'amber'}
              onSpeak={(w) => speakText(w, null, 1.0, null, 'new_word', weekNumber, learningMode)}
              entry={entry}
              tier={tier}
            />
          );
        }
        if (currentNonWord) {
          const cleanedNonWord = currentNonWord.replace(/^\s+([.,!?:;])/, '$1');
          parts.push(<span key={key++} className="text-xl md:text-2xl leading-relaxed md:leading-loose text-slate-800">{cleanedNonWord}</span>);
        }
      }
    }

    return parts;
  };

  const tabs = [
    {
      id: 'stem',
      label: 'STEM Story',
      icon: Microscope,
      color: 'cyan',
      description: 'Science & Technology'
    },
    {
      id: 'social',
      label: 'Social Studies',
      icon: Globe,
      color: 'amber',
      description: 'History & Geography'
    }
  ];

  const currentContent = activeTab === 'stem' ? weekData?.read_stem : weekData?.read_social;

  const playAudio = async () => {
    if (!currentContent) return;
    
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    
    setIsPlaying(true);
    const textParts = [];
    if (currentContent.title_en) textParts.push(currentContent.title_en + '.');
    if (currentContent.subtitle_en) textParts.push(currentContent.subtitle_en + '.');
    if (Array.isArray(currentContent.paragraphs)) {
      currentContent.paragraphs.forEach(p => {
        textParts.push(p.replace(/\*\*/g, ''));
      });
    } else if (currentContent.content_en) {
      textParts.push(currentContent.content_en.replace(/\*\*/g, ''));
    }
    const fullText = textParts.join(' ');
    
    try {
      await speakText(
        fullText,
        currentContent.audio_url || null,
        1.0,
        () => setIsPlaying(false),
        'read_explore',
        weekNumber,
        learningMode,
        true // instant = true: immediate browser speech (<50ms) with background prefetch
      );
    } catch (err) {
      console.error('Story audio play failed:', err);
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-cyan-50 via-white to-amber-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Read & Explore</h2>
            <p className="text-sm text-gray-600">Week {weekNumber} • 2 Story Types</p>
          </div>
          <BookOpen size={24} className="text-cyan-600" />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex space-x-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold
                  transition-all duration-200
                  ${isActive
                    ? `bg-${tab.color}-100 text-${tab.color}-700 shadow-lg transform scale-105`
                    : `bg-gray-100 text-gray-600 hover:bg-gray-200`
                  }
                `}
                style={isActive ? { 
                  backgroundColor: tab.id === 'stem' ? '#cffafe' : '#fef3c7',
                  color: tab.id === 'stem' ? '#0e7490' : '#92400e',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                } : {}}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        
        {/* Active Tab Description */}
        <div className="mt-2 text-xs text-gray-600">
          {tabs.find(t => t.id === activeTab)?.description}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {currentContent ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Audio Control */}
            {currentContent.audio_url && (
              <button
                onClick={playAudio}
                disabled={isPlaying}
                className={`flex items-center space-x-2 text-white px-6 py-3 rounded-lg font-semibold shadow-lg ${
                  activeTab === 'stem' ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-amber-600 hover:bg-amber-700'
                }`}
              >
                <Volume2 size={20} className={isPlaying ? 'animate-pulse' : ''} />
                <span>{isPlaying ? 'Playing Story...' : 'Listen to Story'}</span>
              </button>
            )}

            {/* Title */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {currentContent.title_en}
              </h2>
              {currentContent.subtitle_en && (
                <p className="text-lg text-gray-600">{currentContent.subtitle_en}</p>
              )}
            </div>

            {/* Featured Image */}
            {currentContent.image_url && (
              <img 
                src={getImageUrl(currentContent.image_url)} 
                alt={currentContent.title_en}
                className="w-full rounded-xl shadow-lg"
              />
            )}

            {/* Story Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 space-y-6 border border-slate-100">
              {currentContent.paragraphs?.map((paragraph, idx) => (
                <p key={idx} className="text-xl md:text-2xl leading-relaxed md:leading-loose text-slate-800 font-medium">
                  {renderStyledText(paragraph)}
                </p>
              ))}

              {!currentContent.paragraphs && currentContent.content_en && (
                <div className="text-xl md:text-2xl leading-relaxed md:leading-loose text-slate-800 font-medium whitespace-pre-line">
                  {currentContent.content_en.split(/\n/).filter(s => s.trim()).map((para, idx) => (
                    <p key={idx} className="mb-6">{renderStyledText(para)}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Vocabulary Section */}
            {currentContent.key_vocabulary && currentContent.key_vocabulary.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className={`text-xl font-bold mb-4 ${
                  activeTab === 'stem' ? 'text-cyan-700' : 'text-amber-700'
                }`}>
                  Key Vocabulary ({currentContent.key_vocabulary.length} words)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentContent.key_vocabulary.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-lg border-2 ${
                        activeTab === 'stem' ? 'border-cyan-200 bg-cyan-50' : 'border-amber-200 bg-amber-50'
                      }`}
                    >
                      <div className={`font-bold text-lg ${
                        activeTab === 'stem' ? 'text-cyan-800' : 'text-amber-800'
                      }`}>
                        {item.word}
                      </div>
                      <div className="text-sm text-gray-700 mt-1">
                        {item.definition}
                      </div>
                      {item.example && (
                        <div className="text-sm text-gray-600 italic mt-2">
                          &ldquo;{item.example}&rdquo;
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comprehension Questions (if available) */}
            {currentContent.comprehension_questions && currentContent.comprehension_questions.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className={`text-xl font-bold mb-4 ${
                  activeTab === 'stem' ? 'text-cyan-700' : 'text-amber-700'
                }`}>
                  Comprehension Check
                </h3>
                <div className="space-y-4">
                  {currentContent.comprehension_questions.map((q, idx) => {
                    const questionText = typeof q === 'string' ? q : q.question_en || '';
                    const correctAnswers = typeof q === 'object' && q.answer
                      ? (Array.isArray(q.answer) ? q.answer : [q.answer])
                      : [];
                    const userAnswer = answers[idx] || '';
                    const showCorrect = checked[idx];
                    const isCorrect = showCorrect && correctAnswers.some(a =>
                      userAnswer.toLowerCase().trim().includes(a.toLowerCase().trim())
                    );
                    const colorClass = activeTab === 'stem' ? 'cyan' : 'amber';
                    const checkBtnClass = showCorrect && isCorrect
                      ? 'bg-green-500 cursor-not-allowed'
                      : !userAnswer.trim()
                        ? 'bg-slate-300 cursor-not-allowed'
                        : `bg-${colorClass}-500 hover:bg-${colorClass}-600`;
                    return (
                      <div key={idx} className={`p-4 rounded-lg border-2 ${showCorrect ? (isCorrect ? 'border-green-300 bg-green-50' : 'border-rose-300 bg-rose-50') : 'border-slate-200'}`}>
                        <div className="flex items-start space-x-2 mb-2">
                          <div className={`font-bold text-${colorClass}-600`}>
                            {idx + 1}.
                          </div>
                          <div className="text-gray-800 font-medium flex-1">{questionText}</div>
                        </div>
                        {q.options && Array.isArray(q.options) ? (
                          <div className="ml-6 space-y-2 mt-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {q.options.map((opt, optIdx) => {
                                const isSelected = userAnswer === opt;
                                const isOptCorrect = showCorrect && opt === correctAnswers[0];
                                const isOptWrong = showCorrect && isSelected && !isOptCorrect;
                                let btnStyle = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50";
                                if (isSelected) btnStyle = "bg-indigo-600 text-white border-indigo-600 font-bold shadow-sm";
                                if (showCorrect && isOptCorrect) btnStyle = "bg-green-600 text-white border-green-600 font-bold shadow-md";
                                if (showCorrect && isOptWrong) btnStyle = "bg-rose-500 text-white border-rose-500 font-bold opacity-80";

                                return (
                                  <button
                                    key={optIdx}
                                    disabled={showCorrect && isCorrect}
                                    onClick={() => {
                                      setAnswers(prev => ({ ...prev, [idx]: opt }));
                                      setChecked(prev => ({ ...prev, [idx]: true }));
                                    }}
                                    className={`px-4 py-2.5 rounded-xl border text-left text-sm transition-all flex items-center gap-2 ${btnStyle}`}
                                  >
                                    <span className="w-5 h-5 rounded-full bg-slate-100/30 text-xs font-black flex items-center justify-center flex-shrink-0">
                                      {String.fromCharCode(65 + optIdx)}
                                    </span>
                                    <span>{opt}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div className="flex space-x-2 ml-6">
                            <input
                              type="text"
                              value={userAnswer}
                              onChange={(e) => setAnswers(prev => ({ ...prev, [idx]: e.target.value }))}
                              onKeyDown={(e) => e.key === 'Enter' && handleCheck(idx, userAnswer, correctAnswers)}
                              placeholder="Type your answer..."
                              disabled={showCorrect && isCorrect}
                              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-400 text-sm"
                            />
                            <button
                              onClick={() => handleCheck(idx, userAnswer, correctAnswers)}
                              disabled={(showCorrect && isCorrect) || !userAnswer.trim()}
                              className={`px-4 py-2 rounded-lg font-bold text-xs text-white transition-colors ${checkBtnClass}`}
                            >
                              {showCorrect && isCorrect ? 'OK Correct' : 'Check'}
                            </button>
                          </div>
                        )}
                        {showCorrect && !isCorrect && correctAnswers.length > 0 && !q.options && (
                          <div className="ml-6 mt-2 text-sm text-green-700">
                            <strong>Answer:</strong> {correctAnswers[0]}
                          </div>
                        )}
                        {showCorrect && isCorrect && (
                          <div className="ml-6 mt-2 text-sm text-green-700">OK Great job!</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <BookOpen size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-semibold">
                {activeTab === 'stem' ? 'STEM Story' : 'Social Studies Story'} not available
              </p>
              <p className="text-sm mt-2">Check back later!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabbedReadExplore;
