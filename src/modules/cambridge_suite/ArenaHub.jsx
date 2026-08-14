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


import SVGLineMatcher from '../../components/cambridge/SVGLineMatcher';
import VisualMatchingAH from '../../components/cambridge/VisualMatchingAH';
import SVGColorAndWrite from '../../components/cambridge/SVGColorAndWrite';

export default function ArenaHub({ data, weekNumber = 33 }) {
  const [viewMode, setViewMode] = useState('learn'); // 'learn' | 'check'
  const [mainCategory, setMainCategory] = useState('listening'); // 'listening' | 'arena'
  const [activeTab, setActiveTab] = useState('listening_p1');
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
      {/* Top Controls: Learn Mode vs Check Mode */}
      <div className="flex items-center justify-end mb-4">

        {/* Learn Mode vs Check Mode Switcher */}
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-2xl border transition-all ${
            viewMode === 'learn' ? 'bg-blue-50/80 border-blue-200 ring-2 ring-blue-100' : 'bg-amber-50/90 border-amber-300 ring-2 ring-amber-200'
          }`}>
            <button
              onClick={() => setViewMode('learn')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                viewMode === 'learn' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/60 text-blue-800 hover:bg-blue-100'
              }`}
            >
              <PlayCircle size={14} /> 📖 Learn Mode
            </button>
            <button
              onClick={() => setViewMode('check')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                viewMode === 'check' ? 'bg-amber-600 text-white shadow-md' : 'bg-white/60 text-amber-900 hover:bg-amber-100'
              }`}
            >
              <GraduationCap size={14} /> 🎯 Check Mode
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'learn' ? (
        <div className="space-y-6">
          {/* LEVEL 1 TABS: [ 🎧 Listening Missions ] vs [ ⚔️ Arena Games ] */}
          <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
            <button
              onClick={() => {
                setMainCategory('listening');
                setActiveTab('listening_p1');
              }}
              className={`flex-1 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 ${
                mainCategory === 'listening'
                  ? 'bg-blue-600 text-white shadow-lg scale-102 ring-4 ring-blue-200'
                  : 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100'
              }`}
            >
              🎧 Listening Missions
            </button>
            <button
              onClick={() => {
                setMainCategory('arena');
                setActiveTab('sentence_builder');
              }}
              className={`flex-1 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 ${
                mainCategory === 'arena'
                  ? 'bg-amber-500 text-white shadow-lg scale-102 ring-4 ring-amber-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              ⚔️ Arena Games
            </button>
          </div>

          {/* LEVEL 2 SUB-TABS NAVIGATION */}
          {mainCategory === 'listening' ? (
            <div className="flex items-center justify-between sm:justify-evenly w-full flex-wrap gap-2 p-1.5 bg-blue-50/60 rounded-2xl border border-blue-200">
              <button
                onClick={() => setActiveTab('listening_p1')}
                className={`flex-1 min-w-[120px] px-3.5 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'listening_p1' ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300' : 'bg-white text-blue-800 border border-blue-200 hover:bg-blue-100'
                }`}
              >
                🔗 Draw the Lines
              </button>
              <button
                onClick={() => setActiveTab('listening_p2')}
                className={`flex-1 min-w-[120px] px-3.5 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'listening_p2' ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300' : 'bg-white text-blue-800 border border-blue-200 hover:bg-blue-100'
                }`}
              >
                📋 Secret Notes
              </button>
              <button
                onClick={() => setActiveTab('listening_p3')}
                className={`flex-1 min-w-[120px] px-3.5 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'listening_p3' ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300' : 'bg-white text-blue-800 border border-blue-200 hover:bg-blue-100'
                }`}
              >
                🔍 Item Hunt
              </button>
              <button
                onClick={() => setActiveTab('listening_p4')}
                className={`flex-1 min-w-[120px] px-3.5 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'listening_p4' ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300' : 'bg-white text-blue-800 border border-blue-200 hover:bg-blue-100'
                }`}
              >
                🖼️ Picture Quiz
              </button>
              <button
                onClick={() => setActiveTab('listening_p5')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'listening_p5' ? 'bg-indigo-600 text-white shadow-md' : 'bg-indigo-50 text-indigo-800 border border-indigo-200 hover:bg-indigo-100'
                }`}
              >
                🎨 Magic Color
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-1.5 bg-amber-50/70 rounded-2xl border border-amber-200 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('sentence_builder')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'sentence_builder' ? 'bg-amber-500 text-white shadow-md' : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                🧠 Sentence Builder
              </button>
              <button
                onClick={() => setActiveTab('bar_model')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'bar_model' ? 'bg-amber-500 text-white shadow-md' : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                📐 Bar Model Quest
              </button>
              <button
                onClick={() => setActiveTab('flash_arena')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'flash_arena' ? 'bg-amber-500 text-white shadow-md' : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                ⚡ Speed Match
              </button>
            </div>
          )}

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
            {activeTab === 'listening_p1' && (
              <SVGLineMatcher
                customData={data?.listening_p1}
                onComplete={async (score) => {
                  const currentUser = useUserStore.getState().currentUser;
                  const learnerId = currentUser?.id || currentUser?.username || 'guest_01';
                  await learnerProgressService.logAttempt({
                    learnerId,
                    contentId: `w${weekNumber}_listening_p1`,
                    mode: 'learn',
                    result: score >= 80 ? 'correct' : 'incorrect',
                    score,
                    timeSpentSeconds: 45
                  });
                }}
              />
            )}
            {activeTab === 'listening_p2' && (
              <NotepadNoteCompleter
                title="School Incident Notepad (Secret Notes)"
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
            {activeTab === 'listening_p3' && (
              <VisualMatchingAH
                customData={data?.listening_p3}
                onComplete={async (score) => {
                  const currentUser = useUserStore.getState().currentUser;
                  const learnerId = currentUser?.id || currentUser?.username || 'guest_01';
                  await learnerProgressService.logAttempt({
                    learnerId,
                    contentId: `w${weekNumber}_listening_p3`,
                    mode: 'learn',
                    result: score >= 80 ? 'correct' : 'incorrect',
                    score,
                    timeSpentSeconds: 45
                  });
                }}
              />
            )}
            {activeTab === 'listening_p4' && (
              <Station2CheckMode
                customQuestions={data?.listening_p4_questions}
                onComplete={async (score) => {
                  const currentUser = useUserStore.getState().currentUser;
                  const learnerId = currentUser?.id || currentUser?.username || 'guest_01';
                  await learnerProgressService.logAttempt({
                    learnerId,
                    contentId: `w${weekNumber}_listening_p4`,
                    mode: 'learn',
                    result: score >= 80 ? 'correct' : 'incorrect',
                    score,
                    timeSpentSeconds: 45
                  });
                }}
              />
            )}
            {activeTab === 'listening_p5' && (
              <SVGColorAndWrite
                customData={data?.listening_p5}
                onComplete={async (score) => {
                  const currentUser = useUserStore.getState().currentUser;
                  const learnerId = currentUser?.id || currentUser?.username || 'guest_01';
                  await learnerProgressService.logAttempt({
                    learnerId,
                    contentId: `w${weekNumber}_listening_p5`,
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
