import React, { useState, useEffect } from 'react';
import { contentBankService } from '../../services/contentBankService';
import { SentenceBuilderBattle } from '../hubs/station2/LearnMode/SentenceBuilderBattle';
import { BarModelQuest } from '../hubs/station2/LearnMode/BarModelQuest';
import { FlashArena } from '../hubs/station2/LearnMode/FlashArena';
import { Station2CheckMode } from '../hubs/station2/CheckMode/Station2CheckMode';
import { AdaptiveExplainerModal } from '../hubs/station2/components/AdaptiveExplainerModal';
import { learnerProgressService } from '../../services/learnerProgressService';
import { adaptiveLogicEngine } from '../../services/adaptiveLogicEngine';
import { Swords, Layers, ShieldCheck, RefreshCw, Zap, Award, GraduationCap, PlayCircle, BookOpen } from 'lucide-react';

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
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-xl font-sans">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
        <div>
          <span className="px-3.5 py-1.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <Swords size={14} /> Hub 2: Logic & Arena Battles (W{weekNumber})
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
            Grammar Bridge & Singapore Bar Models
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">Interactive Sentence Builder, Math Bar Model Quests & Speed Flash Arena</p>
        </div>

        {/* Learn Mode vs Check Mode Switcher */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex items-center gap-1">
            <button
              onClick={() => setViewMode('learn')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                viewMode === 'learn' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PlayCircle size={14} /> Learn Mode
            </button>
            <button
              onClick={() => setViewMode('check')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                viewMode === 'check' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap size={14} /> Check Mode (Cambridge Exam)
            </button>
          </div>

          <div className="px-3 py-1.5 bg-slate-900 text-amber-300 rounded-xl text-xs font-black border border-slate-800 flex items-center gap-1.5 shadow-sm">
            <ShieldCheck size={14} /> {learnerAlias || 'Learner #382'}
          </div>
        </div>
      </div>

      {viewMode === 'learn' ? (
        <div className="space-y-6">
          {/* Sub-Tabs Navigation for Learn Mode */}
          <div className="flex items-center justify-between flex-wrap gap-3 p-2 bg-slate-100 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('sentence_builder')}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                  activeTab === 'sentence_builder' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <BookOpen size={14} /> 1. Sentence Builder Battle
              </button>
              <button
                onClick={() => setActiveTab('bar_model')}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                  activeTab === 'bar_model' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <Layers size={14} /> 2. Singapore Bar Model Quest
              </button>
              <button
                onClick={() => setActiveTab('flash_arena')}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                  activeTab === 'flash_arena' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <Zap size={14} /> 3. Speed Flash Arena
              </button>
            </div>

            {/* Streak Tracker & Elite Badge Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-slate-200 text-xs font-black text-amber-600 shadow-sm">
              <Award size={14} /> Streak: {adaptiveState.streak100}/5
              {adaptiveState.isEliteUnlocked && (
                <span className="ml-1 px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md text-[10px] uppercase font-black tracking-wider">
                  PET B1 Badge Unlocked!
                </span>
              )}
            </div>
          </div>

          {/* Active Interactive Battle Sub-Component */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-6 min-h-[420px]">
            {activeTab === 'sentence_builder' && (
              <SentenceBuilderBattle
                item={currentItem}
                onAttemptEvaluate={handleAttemptEvaluation}
                onNext={handleNextItem}
              />
            )}
            {activeTab === 'bar_model' && (
              <BarModelQuest
                item={currentItem}
                onAttemptEvaluate={handleAttemptEvaluation}
                onNext={handleNextItem}
              />
            )}
            {activeTab === 'flash_arena' && (
              <FlashArena
                item={currentItem}
                onAttemptEvaluate={handleAttemptEvaluation}
                onNext={handleNextItem}
              />
            )}
          </div>
        </div>
      ) : (
        /* CHECK MODE (Cambridge Exam Standard) */
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <Station2CheckMode weekNumber={weekNumber} />
        </div>
      )}

      {/* Adaptive Explainer Modal (Triggers on 2 Consecutive Fails) */}
      {adaptiveGrammarTag && (
        <AdaptiveExplainerModal
          grammarTag={adaptiveGrammarTag}
          onClose={() => setAdaptiveGrammarTag(null)}
        />
      )}
    </div>
  );
}
