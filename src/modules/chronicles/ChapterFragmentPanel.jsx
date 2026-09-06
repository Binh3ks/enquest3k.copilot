/**
 * ChapterFragmentPanel.jsx — The Lexio Chronicles Chapter Crystal & Boss Chamber
 *
 * Displays progress toward collecting 4 weekly boss fragments within the current chapter.
 * When all 4 fragments are assembled, unlocks the Chapter Guardian confrontation.
 */

import React, { useState } from 'react';
import useChroniclesStore, { getChapterForWeek } from '../../stores/useChroniclesStore';
import { Shield, Sparkles, Trophy, Lock, Sword, Info, X } from 'lucide-react';

export default function ChapterFragmentPanel({ weekNumber = 33 }) {
  const chapter = getChapterForWeek(weekNumber);
  const chapterFragKey = `chapter${chapter.id}`;

  const fragments = useChroniclesStore((s) => s.bossFragments[chapterFragKey] || 0);
  const isChapterDefeated = useChroniclesStore((s) => Boolean(s.chapterBossCompleted[chapterFragKey]));

  const [showModal, setShowModal] = useState(false);

  const startWeek = chapter.weeks[0];
  const endWeek = chapter.weeks[chapter.weeks.length - 1];
  const totalSlots = 4;
  const isReadyForGuardian = fragments >= totalSlots && !isChapterDefeated;

  return (
    <div className="chapter-fragment-panel w-full max-w-4xl mx-auto px-4 py-6 text-white animate-in fade-in duration-300">
      {/* ── Chapter Hero Banner ── */}
      <div
        className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-2 rounded-3xl p-6 sm:p-8 mb-6 overflow-hidden shadow-2xl"
        style={{ borderColor: `${chapter.wingColor}55` }}
      >
        <div
          className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ backgroundColor: chapter.wingColor }}
        />

        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center text-5xl shadow-2xl border-2"
            style={{
              backgroundColor: `${chapter.wingColor}22`,
              borderColor: chapter.wingColor,
            }}
          >
            💎
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border bg-slate-800/80 border-slate-700 text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Chapter {chapter.id} • Weeks {startWeek}–{endWeek}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
              {chapter.title}
            </h2>
            <p className="text-sm font-semibold text-amber-300 mb-2">
              Crystal: {chapter.crystal}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Defeat weekly bosses to collect 4 crystal fragments. Reassemble the sacred crystal to awaken the Chapter Guardian!
            </p>
          </div>
        </div>
      </div>

      {/* ── Fragment Slots ── */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 mb-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-400" />
            <span>Crystal Relic Sockets</span>
          </h3>
          <span className="text-xs font-extrabold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
            {fragments} / {totalSlots} Collected
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-6 p-0.5 border border-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 transition-all duration-500"
            style={{ width: `${Math.min((fragments / totalSlots) * 100, 100)}%` }}
          />
        </div>

        {/* 4 Fragment Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((idx) => {
            const isCollected = idx < fragments;
            const targetWeek = startWeek + idx;

            return (
              <div
                key={idx}
                className={`relative rounded-2xl p-4 flex flex-col items-center justify-center border text-center transition-all ${
                  isCollected
                    ? 'bg-gradient-to-b from-indigo-950/60 to-purple-950/60 border-amber-400/60 shadow-lg shadow-indigo-950/50'
                    : 'bg-slate-950/40 border-slate-800/80 opacity-60'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-2 ${
                    isCollected
                      ? 'bg-amber-400/20 border border-amber-300/50 shadow-inner animate-pulse'
                      : 'bg-slate-800/40 border border-slate-700/50 text-slate-600'
                  }`}
                >
                  {isCollected ? '💎' : '⬜'}
                </div>
                <div className="text-xs font-black text-white mb-0.5">
                  Fragment {idx + 1}
                </div>
                <div className="text-[10px] text-slate-400 font-semibold">
                  {isCollected ? `Week ${targetWeek} Cleared` : `Week ${targetWeek} Boss`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Guardian Chamber Access ── */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-500/30 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-lg font-bold text-white mb-1 flex items-center justify-center sm:justify-start gap-2">
            <span>Chapter Guardian Confrontation</span>
            {isChapterDefeated && <span className="text-emerald-400 text-xs font-extrabold bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/40">✓ DEFEATED</span>}
          </h4>
          <p className="text-xs text-slate-300 max-w-lg">
            {isChapterDefeated
              ? 'You have already conquered this chapter guardian! The realm is at peace.'
              : isReadyForGuardian
              ? 'All 4 crystal fragments assembled! You are worthy to enter the Guardian sanctuary.'
              : `Collect ${totalSlots - fragments} more fragment${totalSlots - fragments > 1 ? 's' : ''} from weekly boss victories to awaken the Guardian.`}
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          disabled={!isReadyForGuardian && !isChapterDefeated}
          className={`px-6 py-3.5 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shrink-0 ${
            isReadyForGuardian
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 text-slate-950 shadow-xl shadow-amber-500/20 active:scale-95'
              : isChapterDefeated
              ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
              : 'bg-slate-800/60 text-slate-500 border border-slate-800 cursor-not-allowed'
          }`}
        >
          {isReadyForGuardian ? (
            <>
              <Sword className="w-4 h-4" />
              <span>Summon Chapter Boss</span>
            </>
          ) : isChapterDefeated ? (
            <>
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Guardian Hall</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Locked ({fragments}/{totalSlots})</span>
            </>
          )}
        </button>
      </div>

      {/* ── Phase 5 Coming Soon Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 text-center text-white relative shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-3xl mx-auto mb-4">
              ⚔️
            </div>

            <h3 className="text-xl font-black text-white mb-2">
              Chapter Guardian Gauntlet
            </h3>
            <p className="text-xs text-indigo-300 font-bold uppercase tracking-wider mb-4">
              Coming in Phase 5: The Grand Sovereign
            </p>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              The sacred 15-question supreme trial against the Chapter Guardian is being forged in Phase 5! Continue mastering daily rooms and collecting Power Points to prepare your Nova!
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm text-white transition shadow-lg shadow-indigo-600/30"
            >
              Back to Chronicles
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
