import React, { useState } from 'react';
import { SentenceBuilderBattle } from '../hubs/station2/LearnMode/SentenceBuilderBattle';
import { BarModelQuest } from '../hubs/station2/LearnMode/BarModelQuest';
import { FlashArena } from '../hubs/station2/LearnMode/FlashArena';
import { Station2CheckMode } from '../hubs/station2/CheckMode/Station2CheckMode';
import { AdaptiveExplainerModal } from '../hubs/station2/components/AdaptiveExplainerModal';
import NotepadNoteCompleter from '../../components/common/NotepadNoteCompleter';
import { learnerProgressService } from '../../services/learnerProgressService';
import { useUserStore } from '../../stores/useUserStore';
import { Swords, PlayCircle, GraduationCap, Award, Brain, Zap, Layers, FileText } from 'lucide-react';


export default function ArenaHub({ data, weekNumber = 33 }) {
  const [viewMode, setViewMode] = useState('learn'); // 'learn' | 'check'
  const [activeTab, setActiveTab] = useState('sentence_builder'); // 'sentence_builder' | 'bar_model' | 'flash_arena'
  const [adaptiveGrammarTag, setAdaptiveGrammarTag] = useState(null);
  const [consecutiveFails, setConsecutiveFails] = useState(0);

  const [adaptiveState, setAdaptiveState] = useState({
    streak100: 0,
    isEliteUnlocked: false
  });

  const handleAttemptEvaluation = (attemptResult) => {
    if (attemptResult?.isCorrect) {
      setConsecutiveFails(0);
      setAdaptiveState((prev) => {
        const nextStreak = prev.streak100 + 1;
        return {
          streak100: nextStreak,
          isEliteUnlocked: nextStreak >= 3
        };
      });
    } else {
      setAdaptiveState((prev) => ({ ...prev, streak100: 0 }));
      const nextFails = consecutiveFails + 1;
      setConsecutiveFails(nextFails);
      if (nextFails >= 2) {
        setAdaptiveGrammarTag('past_continuous_when_while');
        setConsecutiveFails(0);
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-xl font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Hub 2: Arena Battles
          </h1>
        </div>

        {/* Learn Mode vs Check Mode Switcher */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-50/70 p-1.5 rounded-2xl border border-amber-200 flex items-center gap-1.5">
            <button
              onClick={() => setViewMode('learn')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                viewMode === 'learn' ? 'bg-amber-500 text-white shadow-md' : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              <PlayCircle size={14} /> Learn Mode
            </button>
            <button
              onClick={() => setViewMode('check')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                viewMode === 'check' ? 'bg-emerald-600 text-white shadow-md' : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              <GraduationCap size={14} /> Check Mode
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'learn' ? (
        <div className="space-y-6">
          {/* Sub-Tabs Navigation for Learn Mode */}
          <div className="flex items-center justify-between flex-wrap gap-3 p-2 bg-amber-50/70 rounded-2xl border border-amber-200">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('sentence_builder')}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                  activeTab === 'sentence_builder' ? 'bg-amber-500 text-white shadow-md' : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <Brain size={15} /> Sentence Builder
              </button>
              <button
                onClick={() => setActiveTab('bar_model')}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                  activeTab === 'bar_model' ? 'bg-amber-500 text-white shadow-md' : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <Zap size={15} /> Bar Model Quest
              </button>
              <button
                onClick={() => setActiveTab('flash_arena')}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                  activeTab === 'flash_arena' ? 'bg-amber-500 text-white shadow-md' : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <Layers size={15} /> Flash Arena
              </button>
              <button
                onClick={() => setActiveTab('listening_p2')}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                  activeTab === 'listening_p2' ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300' : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                }`}
              >
                <FileText size={15} /> Listening P2: Notepad
              </button>
            </div>

            <div className="px-3 py-1.5 bg-amber-50 text-amber-900 rounded-xl text-xs font-black border border-amber-200 flex items-center gap-1.5 shadow-sm">
              <Award size={14} /> Streak: {adaptiveState.streak100}/5
              {adaptiveState.isEliteUnlocked && (
                <span className="ml-1 px-2 py-0.5 bg-amber-200 text-amber-950 rounded-md text-[10px] uppercase font-black tracking-wider">
                  PET B1 Badge Unlocked!
                </span>
              )}
            </div>
          </div>

          {/* Active Interactive Battle Sub-Component */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-6 min-h-[420px]">
            {activeTab === 'sentence_builder' && (
              <SentenceBuilderBattle
                customDrills={data?.grammar_drills}
                onAttemptResult={handleAttemptEvaluation}
              />
            )}
            {activeTab === 'bar_model' && (
              <BarModelQuest
                customQuestions={data?.singapore_math}
                onAttemptResult={handleAttemptEvaluation}
              />
            )}
            {activeTab === 'flash_arena' && (
              <FlashArena
                customSets={data?.flash_arena}
                onAttemptResult={handleAttemptEvaluation}
              />
            )}
            {activeTab === 'listening_p2' && (
              <NotepadNoteCompleter
                title="School Incident Notepad (Cambridge Listening P2)"
                notes={data?.listening_p2_notes}
                onComplete={async (score) => {
                  const currentUser = useUserStore.getState().currentUser;
                  const learnerId = currentUser?.id || currentUser?.username || 'guest_01';
                  await learnerProgressService.logAttempt({
                    learnerId,
                    contentId: `w${weekNumber}_listening_p2`,
                    mode: 'learn',
                    result: score >= 80 ? 'correct' : 'incorrect',
                    score,
                    timeSpentSeconds: 45
                  });
                }}
              />
            )}
          </div>

        </div>
      ) : (
        /* CHECK MODE (Cambridge Exam Standard - 10 Questions) */
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <Station2CheckMode weekNumber={weekNumber} />
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
