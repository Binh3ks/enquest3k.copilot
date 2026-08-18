import React, { useState } from 'react';
import { SentenceBuilderBattle } from '../hubs/station2/LearnMode/SentenceBuilderBattle';
import { BarModelQuest } from '../hubs/station2/LearnMode/BarModelQuest';
import { FlashArena } from '../hubs/station2/LearnMode/FlashArena';
import { Station2CheckMode } from '../hubs/station2/CheckMode/Station2CheckMode';
import GlobalModeToggle from '../../components/cambridge/GlobalModeToggle';
import { AdaptiveExplainerModal } from '../hubs/station2/components/AdaptiveExplainerModal';
import NotepadNoteCompleter from '../../components/common/NotepadNoteCompleter';
import { learnerProgressService } from '../../services/learnerProgressService';
import { useUserStore } from '../../stores/useUserStore';
import { Swords, PlayCircle, GraduationCap, Award, Brain, Zap, Layers, FileText, Trophy, ShoppingBag } from 'lucide-react';
import NovaMascotStore from '../../components/mascot/NovaMascotStore';


import SVGLineMatcher from '../../components/cambridge/SVGLineMatcher';
import VisualMatchingAH from '../../components/cambridge/VisualMatchingAH';
import SVGColorAndWrite from '../../components/cambridge/SVGColorAndWrite';
import ScienceDragDropLab from '../hubs/station2/LearnMode/ScienceDragDropLab';

export default function ArenaHub({ data, weekNumber = 33 }) {
  const userXP = useUserStore((state) => state.userXP || 0);
  const [showMascotStore, setShowMascotStore] = useState(false);
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
      {/* Top Controls: Mode Toggle & Mascot Store */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <GlobalModeToggle
          activeMode={viewMode}
          onModeChange={(mode) => setViewMode(mode)}
        />

        <button
          onClick={() => setShowMascotStore(true)}
          className="px-3.5 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-md"
        >
          <ShoppingBag size={14} className="text-amber-300" /> Nova Store ({userXP} XP)
        </button>
      </div>

      {showMascotStore && (
        <NovaMascotStore isOpen={showMascotStore} onClose={() => setShowMascotStore(false)} />
      )}

      {viewMode === 'learn' ? (
        <div className="space-y-6">
          {/* LEVEL 1 TABS: [ 🎧 Listening Missions ] vs [ ⚔️ Arena Games ] */}
          <div className="w-full p-2 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner">
            <div className="grid grid-cols-2 gap-3 w-full">
              <button
                type="button"
                onClick={() => {
                  setMainCategory('listening');
                  setActiveTab('listening_p1');
                }}
                className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 text-center ${
                  mainCategory === 'listening'
                    ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-200'
                    : 'bg-white text-blue-900 border border-blue-200 hover:bg-blue-50'
                }`}
              >
                🎧 Listening Missions
              </button>
              <button
                type="button"
                onClick={() => {
                  setMainCategory('arena');
                  setActiveTab('sentence_builder');
                }}
                className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 text-center ${
                  mainCategory === 'arena'
                    ? 'bg-amber-500 text-white shadow-lg ring-4 ring-amber-200'
                    : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
                }`}
              >
                ⚔️ Arena Games
              </button>
            </div>
          </div>

          {/* LEVEL 2 SUB-TABS NAVIGATION */}
          {mainCategory === 'listening' ? (
            <div className="w-full p-2 bg-blue-50/70 rounded-2xl border border-blue-200 shadow-inner">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 w-full">
                <button
                  type="button"
                  onClick={() => setActiveTab('listening_p1')}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
                    activeTab === 'listening_p1' ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300' : 'bg-white text-blue-900 border border-blue-200 hover:bg-blue-50'
                  }`}
                >
                  🔗 Draw Lines
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('listening_p2')}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
                    activeTab === 'listening_p2' ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300' : 'bg-white text-blue-900 border border-blue-200 hover:bg-blue-50'
                  }`}
                >
                  📋 Secret Notes
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('listening_p3')}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
                    activeTab === 'listening_p3' ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300' : 'bg-white text-blue-900 border border-blue-200 hover:bg-blue-50'
                  }`}
                >
                  🔍 Item Hunt
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('listening_p4')}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
                    activeTab === 'listening_p4' ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300' : 'bg-white text-blue-900 border border-blue-200 hover:bg-blue-50'
                  }`}
                >
                  🖼️ Picture Quiz
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('listening_p5')}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
                    activeTab === 'listening_p5' ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300' : 'bg-white text-blue-900 border border-blue-200 hover:bg-blue-50'
                  }`}
                >
                  🎨 Magic Color
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full p-2 bg-amber-50/70 rounded-2xl border border-amber-200 shadow-inner">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
                <button
                  type="button"
                  onClick={() => setActiveTab('sentence_builder')}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
                    activeTab === 'sentence_builder' ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300' : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
                  }`}
                >
                  🧠 Sentence Builder
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('bar_model')}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
                    activeTab === 'bar_model' ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300' : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
                  }`}
                >
                  📐 Bar Model Quest
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('flash_arena')}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
                    activeTab === 'flash_arena' ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300' : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
                  }`}
                >
                  ⚡ Speed Match
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('science_lab')}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
                    activeTab === 'science_lab' ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300' : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
                  }`}
                >
                  🧪 Science Lab
                </button>
              </div>
            </div>
          )}

          {/* Active Interactive Battle Sub-Component */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-6 min-h-[420px]">
            {activeTab === 'sentence_builder' && (
              <SentenceBuilderBattle
                customDrills={data?.grammar_drills}
                grammarLesson={data?.grammar_lesson}
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
            {activeTab === 'science_lab' && (
              <ScienceDragDropLab
                customLabData={data?.science_lab}
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
        /* CHECK MODE: LIGHTWEIGHT WEEKLY CAMBRIDGE LISTENING MINI-CHECK (5 PICTURE QUIZ QUESTIONS) */
        <div className="space-y-4 animate-in fade-in">
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex items-center justify-between text-amber-900 shadow-sm">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-600 shrink-0" />
              <span className="text-xs font-black">🎯 WEEKLY CHECK MODE (MINI LISTENING TEST): Listen to 5 audio prompts with hidden scripts! (5 Questions • Cambridge Part 4 Standard)</span>
            </div>
            <span className="text-[10px] font-black uppercase px-2.5 py-1 bg-amber-200 text-amber-900 rounded-lg shrink-0">5-Min Check</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <Station2CheckMode customQuestions={data?.listening_p4_questions} weekNumber={weekNumber} isStealthMode={true} />
          </div>
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
