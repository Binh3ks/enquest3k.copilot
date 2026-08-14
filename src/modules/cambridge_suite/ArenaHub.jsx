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
  const [activeTab, setActiveTab] = useState('sentence_builder');
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
            Hub 2: Arena Battles & Listening Suite
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
          {/* Sub-Tabs Navigation for Learn Mode & Listening Suite */}
          <div className="flex items-center justify-between flex-wrap gap-3 p-2 bg-amber-50/70 rounded-2xl border border-amber-200 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('sentence_builder')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                  activeTab === 'sentence_builder' ? 'bg-amber-500 text-white shadow-md' : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <Brain size={14} /> Sentence Builder
              </button>
              <button
                onClick={() => setActiveTab('bar_model')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                  activeTab === 'bar_model' ? 'bg-amber-500 text-white shadow-md' : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <Zap size={14} /> Bar Model Quest
              </button>
              <button
                onClick={() => setActiveTab('flash_arena')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                  activeTab === 'flash_arena' ? 'bg-amber-500 text-white shadow-md' : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <Layers size={14} /> Flash Arena
              </button>
              <button
                onClick={() => setActiveTab('listening_p1')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                  activeTab === 'listening_p1' ? 'bg-indigo-600 text-white shadow-md' : 'bg-indigo-50 text-indigo-800 border border-indigo-200 hover:bg-indigo-100'
                }`}
              >
                <FileText size={14} /> Listening P1: SVG Lines
              </button>
              <button
                onClick={() => setActiveTab('listening_p2')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                  activeTab === 'listening_p2' ? 'bg-indigo-600 text-white shadow-md' : 'bg-indigo-50 text-indigo-800 border border-indigo-200 hover:bg-indigo-100'
                }`}
              >
                <FileText size={14} /> Listening P2: Notepad
              </button>
              <button
                onClick={() => setActiveTab('listening_p3')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                  activeTab === 'listening_p3' ? 'bg-indigo-600 text-white shadow-md' : 'bg-indigo-50 text-indigo-800 border border-indigo-200 hover:bg-indigo-100'
                }`}
              >
                <FileText size={14} /> Listening P3: Visual A-H
              </button>
              <button
                onClick={() => setActiveTab('listening_p5')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                  activeTab === 'listening_p5' ? 'bg-indigo-600 text-white shadow-md' : 'bg-indigo-50 text-indigo-800 border border-indigo-200 hover:bg-indigo-100'
                }`}
              >
                <FileText size={14} /> Listening P5: Color & Write
              </button>
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
