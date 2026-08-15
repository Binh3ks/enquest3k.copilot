import React, { useState, useEffect } from 'react';
import { contentBankService } from '../../../services/contentBankService';
import { SentenceBuilderBattle } from './LearnMode/SentenceBuilderBattle';
import { BarModelQuest } from './LearnMode/BarModelQuest';
import { FlashArena } from './LearnMode/FlashArena';
import { Station2CheckMode } from './CheckMode/Station2CheckMode';
import { AdaptiveExplainerModal } from './components/AdaptiveExplainerModal';
import { learnerProgressService } from '../../../services/learnerProgressService';
import { adaptiveLogicEngine } from '../../../services/adaptiveLogicEngine';
import { Swords, Layers, ShieldCheck, UserCheck, RefreshCw, Zap, Award, BookOpen, Flame, GraduationCap, PlayCircle } from 'lucide-react';

export default function Station2Hub() {
  const [viewMode, setViewMode] = useState('learn'); // 'learn' | 'check'
  const [activeTab, setActiveTab] = useState('sentence_builder'); // 'sentence_builder' | 'bar_model' | 'flash_arena'
  const [contentList, setContentList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [adaptiveGrammarTag, setAdaptiveGrammarTag] = useState(null);
  const [learnerAlias, setLearnerAlias] = useState('');
  const [parentIdentity, setParentIdentity] = useState(null);

  // Adaptive State Engine
  const [adaptiveState, setAdaptiveState] = useState({
    streak100: 0,
    failTracker: {},
    isEliteUnlocked: false
  });

  // Load content bank & learner identity on mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const items = await contentBankService.getStationContent({
          week: 'W33',
          station: '2',
          mode: 'learn'
        });
        setContentList(items);

        const parentInfo = await learnerProgressService.getPrivateParentIdentity('learner_default_01');
        setParentIdentity(parentInfo);
        setLearnerAlias(parentInfo ? parentInfo.anonymous_alias : 'Bé Sóc Nhanh Trí #382');
      } catch (err) {
        console.error('Failed to load station 2 content', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Centralized Adaptive Logic Processing
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8">
      {/* Top Bar Header */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Swords size={14} /> Trạm 2: Logic & Arena Battle
            </span>
            <span className="px-2.5 py-0.5 bg-slate-800 text-slate-400 rounded-md text-xs font-mono">
              Route: /hub/station-2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            EngQuest3K — Phase 1 Complete (W33–W36)
          </h1>
        </div>

        {/* Learn Mode vs Check Mode Switcher */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setViewMode('learn')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
                viewMode === 'learn'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <PlayCircle size={14} /> Learn Mode
            </button>
            <button
              onClick={() => setViewMode('check')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
                viewMode === 'check'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap size={14} /> Check Mode (Nova Challenge)
            </button>
          </div>

          {/* User Identity Display */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl">
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-md text-sm">
              🦊
            </div>
            <div className="hidden sm:block">
              <div className="text-[9px] text-slate-400 font-semibold flex items-center gap-1">
                <ShieldCheck size={10} className="text-emerald-400" /> Identity Protected
              </div>
              <div className="text-xs font-extrabold text-amber-300">{learnerAlias}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Learn Mode View */}
      {viewMode === 'learn' ? (
        <div className="max-w-5xl mx-auto">
          {/* Mode Navigation Tabs */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto flex-1">
              <button
                onClick={() => setActiveTab('sentence_builder')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 whitespace-nowrap ${
                  activeTab === 'sentence_builder'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen size={16} /> 1. Sentence Builder Battle
              </button>

              <button
                onClick={() => setActiveTab('bar_model')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 whitespace-nowrap ${
                  activeTab === 'bar_model'
                    ? 'bg-cyan-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers size={16} /> 2. Singapore Bar Model Quest
              </button>

              <button
                onClick={() => setActiveTab('flash_arena')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 whitespace-nowrap ${
                  activeTab === 'flash_arena'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap size={16} /> 3. Flash Arena (Timed Battle)
              </button>
            </div>

            {/* Streak 100% Badge */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-2xl">
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">100% Streak</div>
                <div className="text-sm font-black text-amber-400">{adaptiveState.streak100} / 5</div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <RefreshCw className="w-8 h-8 animate-spin text-indigo-500 mb-3" />
              <p className="text-sm font-medium">Đang tải Content Bank Trạm 2...</p>
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
                    handleAttemptEvaluation(
                      { isCorrect, isMinorError: false, score: isCorrect ? 100 : 0 },
                      tag
                    );
                  }}
                />
              )}

              {activeTab === 'flash_arena' && (
                <FlashArena
                  onAttemptResult={(isCorrect, tag) => {
                    handleAttemptEvaluation(
                      { isCorrect, isMinorError: false, score: isCorrect ? 100 : 0 },
                      tag
                    );
                  }}
                />
              )}

              {/* Sandbox Drawer */}
              <div className="mt-10 bg-slate-900/90 rounded-3xl p-6 border border-slate-800">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                  <h3 className="text-base font-extrabold text-amber-400 flex items-center gap-2">
                    <Layers size={18} /> Sandbox & Test Controls (Phân tích Trạng thái)
                  </h3>
                  <span className="text-xs text-slate-400">
                    Adaptive Engine: {adaptiveState.isEliteUnlocked ? 'Elite Unlocked' : 'Standard'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div className="font-bold text-indigo-300 mb-2 flex items-center gap-1">
                      <UserCheck size={14} /> Parent Identity Resolver (Isolated logic by design):
                    </div>
                    {parentIdentity ? (
                      <ul className="space-y-1 text-slate-400 font-mono">
                        <li>Tên thật con: <span className="text-slate-200">{parentIdentity.real_child_name}</span></li>
                        <li>Alias công khai: <span className="text-amber-300 font-bold">{parentIdentity.anonymous_alias}</span></li>
                        <li>Trạng thái Auth: <span className="text-emerald-400">Auth-Ready (Isolated by design)</span></li>
                      </ul>
                    ) : (
                      <span>Đang tải...</span>
                    )}
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div className="font-bold text-indigo-300 mb-2 flex items-center gap-1">
                      <Award size={14} /> Giả Lập Adaptive Engine State:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={async () => {
                          const res = await learnerProgressService.downloadLearnerProgressJSON('learner_default_01');
                          alert(`Đã xuất file tiến độ thành công: ${res.fileName}`);
                        }}
                        className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold rounded-lg flex items-center gap-1"
                      >
                        📥 Xuất File Dữ Liệu JSON Tiến Độ
                      </button>
                      <button
                        onClick={() =>
                          setAdaptiveState({
                            streak100: 5,
                            failTracker: {},
                            isEliteUnlocked: true
                          })
                        }
                        className="px-3 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold rounded-lg"
                      >
                        Mở ngay Elite Challenge (Streak 5)
                      </button>
                      <button
                        onClick={() => setAdaptiveGrammarTag('past_continuous_when_while')}
                        className="px-3 py-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold rounded-lg"
                      >
                        Mở Modal Học lại mẹo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Check Mode View */
        <div className="max-w-5xl mx-auto py-4">
          <Station2CheckMode />
        </div>
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
