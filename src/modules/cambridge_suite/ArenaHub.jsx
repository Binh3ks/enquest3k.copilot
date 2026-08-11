import React, { useState, useEffect } from 'react';
import { contentBankService } from '../../services/contentBankService';
import { SentenceBuilderBattle } from '../hubs/station2/LearnMode/SentenceBuilderBattle';
import { BarModelQuest } from '../hubs/station2/LearnMode/BarModelQuest';
import { FlashArena } from '../hubs/station2/LearnMode/FlashArena';
import { Station2CheckMode } from '../hubs/station2/CheckMode/Station2CheckMode';
import { AdaptiveExplainerModal } from '../hubs/station2/components/AdaptiveExplainerModal';
import { learnerProgressService } from '../../services/learnerProgressService';
import { adaptiveLogicEngine } from '../../services/adaptiveLogicEngine';
import { Swords, Layers, ShieldCheck, RefreshCw, Zap, Award, BookOpen, Flame, GraduationCap, PlayCircle } from 'lucide-react';

export default function ArenaHub({ weekNumber = 33 }) {
  const [viewMode, setViewMode] = useState('learn'); // 'learn' | 'check'
  const [activeTab, setActiveTab] = useState('sentence_builder'); // 'sentence_builder' | 'bar_model' | 'flash_arena'
  const [contentList, setContentList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [adaptiveGrammarTag, setAdaptiveGrammarTag] = useState(null);
  const [learnerAlias, setLearnerAlias] = useState('');

  // Adaptive Logic State
  const [adaptiveState, setAdaptiveState] = useState({
    streak100: 0,
    failTracker: {},
    isEliteUnlocked: false
  });

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const items = await contentBankService.getStationContent({
          week: `W${weekNumber}`,
          station: '2',
          mode: 'learn'
        });
        setContentList(items);

        const parentInfo = await learnerProgressService.getPrivateParentIdentity('learner_default_01');
        setLearnerAlias(parentInfo ? parentInfo.anonymous_alias : 'Bé Sóc Nhanh Trí #382');
      } catch (err) {
        console.error('Failed to load arena hub data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [weekNumber]);

  const handleAttemptEvaluation = (evaluation, grammarTag) => {
    const res = adaptiveLogicEngine.processAttempt(adaptiveState, evaluation, grammarTag);
    setAdaptiveState(res.newState);

    if (res.triggerHint) {
      setAdaptiveGrammarTag(res.hintGrammarTag);
    }
  };

  const handleNextItem = () => {
    if (currentIndex < contentList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const currentItem = contentList[currentIndex];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
        <div>
          <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <Swords size={14} /> Hub 2: Logic & Arena Battles (W{weekNumber})
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-amber-400 mt-2">
            Grammar Bridge & Singapore Bar Models
          </h1>
        </div>

        {/* Learn Mode vs Check Mode Switcher */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setViewMode('learn')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
                viewMode === 'learn' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <PlayCircle size={14} /> Learn Mode
            </button>
            <button
              onClick={() => setViewMode('check')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
                viewMode === 'check' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap size={14} /> Check Mode (Cambridge Exam)
            </button>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl">
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-md text-sm">
              🦊
            </div>
            <div className="hidden sm:block">
              <div className="text-[9px] text-slate-400 font-semibold flex items-center gap-1">
                <ShieldCheck size={10} className="text-emerald-400" /> Protected
              </div>
              <div className="text-xs font-extrabold text-amber-300">{learnerAlias}</div>
            </div>
          </div>
        </div>
      </div>

      {viewMode === 'learn' ? (
        <div className="space-y-6">
          {/* Tabs Navigation & Adaptive Status */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto flex-1">
              <button
                onClick={() => setActiveTab('sentence_builder')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 whitespace-nowrap ${
                  activeTab === 'sentence_builder' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen size={16} /> 1. Sentence Builder Battle
              </button>

              <button
                onClick={() => setActiveTab('bar_model')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 whitespace-nowrap ${
                  activeTab === 'bar_model' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers size={16} /> 2. Singapore Bar Model Quest
              </button>

              <button
                onClick={() => setActiveTab('flash_arena')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 whitespace-nowrap ${
                  activeTab === 'flash_arena' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap size={16} /> 3. Flash Arena
              </button>
            </div>

            {/* Streak Counter & Elite Unlock Indicator */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-2xl">
                <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">100% Streak</div>
                  <div className="text-sm font-black text-amber-400">{adaptiveState.streak100} / 5</div>
                </div>
              </div>

              {adaptiveState.isEliteUnlocked && (
                <div className="flex items-center gap-1.5 px-3 py-2 bg-amber-500/20 border border-amber-500/60 rounded-2xl text-amber-300 font-extrabold text-xs">
                  <Award size={16} className="text-amber-400" /> ELITE UNLOCKED
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <RefreshCw className="w-8 h-8 animate-spin text-indigo-500 mb-3" />
              <p className="text-sm font-medium">Đang tải Arena Hub...</p>
            </div>
          ) : (
            <div>
              {activeTab === 'sentence_builder' && (
                <SentenceBuilderBattle
                  currentItem={currentItem}
                  onNext={handleNextItem}
                  onTriggerAdaptiveHint={(tag) => setAdaptiveGrammarTag(tag)}
                />
              )}

              {activeTab === 'bar_model' && (
                <BarModelQuest
                  onAttemptResult={(isCorrect, tag) => {
                    handleAttemptEvaluation({ isCorrect, isMinorError: false, score: isCorrect ? 100 : 0 }, tag);
                  }}
                />
              )}

              {activeTab === 'flash_arena' && (
                <FlashArena
                  onAttemptResult={(isCorrect, tag) => {
                    handleAttemptEvaluation({ isCorrect, isMinorError: false, score: isCorrect ? 100 : 0 }, tag);
                  }}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <Station2CheckMode />
      )}

      {/* Adaptive Explainer Modal */}
      {adaptiveGrammarTag && (
        <AdaptiveExplainerModal
          grammarTag={adaptiveGrammarTag}
          onClose={() => setAdaptiveGrammarTag(null)}
        />
      )}
    </div>
  );
}
