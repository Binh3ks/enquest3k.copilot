/**
 * GameInstructionModal.jsx — Interactive How-To-Play Guide for Chronicles Mini-Games
 *
 * 100% ENGLISH IMMERSION.
 * Provides clear Cambridge Young Learners gameplay instructions,
 * step-by-step guidance, and victory conditions for each challenge door.
 */

import React from 'react';
import { X, Sparkles, CheckCircle2, Trophy, Volume2, HelpCircle } from 'lucide-react';

const GAME_GUIDES = {
  arcane_bubble: {
    icon: '🔮',
    title: 'Arcane Bubble Pop',
    doorType: '🔵 VOCAB DOOR',
    mission: 'Pop the correct floating crystal bubbles matching the target word across 5 waves before time expires!',
    steps: [
      {
        num: '1',
        label: 'Spot Target Word',
        desc: 'Look at the glowing Spellbook card at the top to see the target word and phonetic cue.',
      },
      {
        num: '2',
        label: 'Listen to Native Audio',
        desc: 'Tap 🔊 to hear the Cambridge native pronunciation generated via Google Cloud TTS.',
      },
      {
        num: '3',
        label: 'Pop the Bubble',
        desc: 'Bubbles float up continuously. Quickly tap the bubble containing the matching word to trigger combo sparkles!',
      },
      {
        num: '4',
        label: 'Survive 5 Waves',
        desc: 'Each wave increases in speed. Maintain your combo streak and clear all 5 waves to earn 3 stars.',
      },
    ],
    starsGuide: '1★: ≥3 Waves Cleared | 2★: ≥4 Waves Cleared | 3★: 5 Waves Perfect Streak',
  },
  spell_train: {
    icon: '🚂',
    title: 'Spell Sentence Train',
    doorType: '🟡 GRAMMAR DOOR',
    mission: 'Hitch word carriages to the steaming locomotive in syntactic order: [Subject] ➔ [Verb] ➔ [Object] ➔ [Place/Time] before departure!',
    steps: [
      {
        num: '1',
        label: 'Check the Platform',
        desc: 'Inspect the scrambled word carts waiting on the station platform.',
      },
      {
        num: '2',
        label: 'Hitch in Syntax Order',
        desc: 'Tap carts in grammatical order: Subject ➔ Verb ➔ Object ➔ Place/Time.',
      },
      {
        num: '3',
        label: 'Fix Mistakes',
        desc: 'Tap any hitched carriage on the train to unhitch and return it to the platform.',
      },
      {
        num: '4',
        label: 'Beat the Departure Clock',
        desc: 'The steam engine is chugging and will depart in 25s! Fill all carriages before the departure whistle blows.',
      },
    ],
    starsGuide: '1★: 2 Trains Cleared | 2★: 3 Trains Cleared | 3★: 4 Trains Cleared (Zero Strikes)',
  },
  lexical_det: {
    icon: '🕵️‍♂️',
    title: 'Lexical Detective',
    doorType: '🔴 INTEGRATION DOOR',
    mission: 'Inspect the 4 clue cards and find the 1 Odd Word Out that does NOT belong to the semantic group!',
    steps: [
      {
        num: '1',
        label: 'Analyze Semantic Field',
        desc: 'Read all 4 word cards carefully and determine their common theme or category.',
      },
      {
        num: '2',
        label: 'Spot the Imposter',
        desc: 'Find the single intruder word that belongs to a completely different lexical group.',
      },
      {
        num: '3',
        label: 'Tap Clue Card',
        desc: 'Tap the imposter card before the magnifying countdown expires to bust the case.',
      },
      {
        num: '4',
        label: 'Solve 4 Cases',
        desc: 'Successfully solve all 4 detective cases in sequence to clear the chamber door.',
      },
    ],
    starsGuide: '1★: 2 Cases Solved | 2★: 3 Cases Solved | 3★: 4 Cases Solved',
  },
  crystal_match: {
    icon: '💎',
    title: 'Crystal Memory Match',
    doorType: '🔵 VOCAB DOOR',
    mission: 'Flip matching crystal cards to pair English vocabulary words with their correct definitions!',
    steps: [
      {
        num: '1',
        label: 'Flip Cards',
        desc: 'Tap any two face-down crystal cards to reveal their hidden word and definition.',
      },
      {
        num: '2',
        label: 'Match Pairs',
        desc: 'Matched pairs glow with golden energy and remain locked face-up on the board.',
      },
      {
        num: '3',
        label: 'Beat Speed Record',
        desc: 'Match all 8–10 cards rapidly to set a new Personal Best time on the Leaderboard.',
      },
    ],
    starsGuide: '1★: Cleared under 75s | 2★: Cleared under 50s | 3★: Cleared under 35s',
  },
  rune_forge: {
    icon: '⚒️',
    title: 'Rune Forge',
    doorType: '🟡 GRAMMAR DOOR',
    mission: 'Forge the missing grammar runes into the ancient runestone to complete the sentences!',
    steps: [
      {
        num: '1',
        label: 'Read Inscription',
        desc: 'Examine the runic sentence and analyze the missing grammatical role.',
      },
      {
        num: '2',
        label: 'Select Rune Cart',
        desc: 'Choose the grammatically accurate word rune from the glowing forge embers.',
      },
      {
        num: '3',
        label: 'Hammer Strike',
        desc: 'Strike 4 correct runes in sequence to forge the ancient relic.',
      },
    ],
    starsGuide: '1★: 2 Runes Forged | 2★: 3 Runes Forged | 3★: 4 Runes Forged',
  },
  ancient_scroll: {
    icon: '📜',
    title: 'Ancient Scroll Cloze',
    doorType: '🔴 INTEGRATION DOOR',
    mission: 'Restore the missing Cambridge vocabulary in the ancient story scroll to complete the lore!',
    steps: [
      {
        num: '1',
        label: 'Read Story Lore',
        desc: 'Read the paragraph context and follow the story narrative carefully.',
      },
      {
        num: '2',
        label: 'Fill Sentence Blanks',
        desc: 'Tap the correct word pills to fill in each blank in the sacred text.',
      },
      {
        num: '3',
        label: 'Restore Ancient Lore',
        desc: 'Verify all blanks and complete the scroll to summon the chamber guardian.',
      },
    ],
    starsGuide: '1★: 1 Blank Correct | 2★: 2 Blanks Correct | 3★: All Blanks Perfect',
  },
};

export default function GameInstructionModal({
  gameId = 'spell_train',
  isOpen,
  onClose,
  onStart,
  isIntro = false,
}) {
  if (!isOpen) return null;

  const guide = GAME_GUIDES[gameId] || GAME_GUIDES.spell_train;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border-2 border-amber-500/60 rounded-2xl p-6 shadow-2xl relative flex flex-col max-h-[92vh] text-white">
        {/* Close X (only in pause / help mode) */}
        {!isIntro && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        )}

        {/* Header Badge & Title */}
        <div className="flex items-center gap-3 mb-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20 shrink-0">
            {guide.icon}
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-black tracking-widest text-amber-400 uppercase">
              {guide.doorType}
            </span>
            <h3 className="text-xl font-black text-white leading-tight truncate">
              {guide.title}
            </h3>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
          {/* Mission Objective Card */}
          <div className="p-3.5 bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-500/5 border border-amber-500/30 rounded-xl">
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-400 tracking-wider uppercase mb-1">
              <Sparkles size={13} /> <span>Mission Objective</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-amber-100/90 leading-relaxed">
              {guide.mission}
            </p>
          </div>

          {/* Step-by-Step Guide */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-400 tracking-wider uppercase mb-2.5">
              <CheckCircle2 size={13} className="text-emerald-400" /> <span>How to Play (Step-by-Step)</span>
            </div>
            <div className="space-y-2">
              {guide.steps.map((step) => (
                <div
                  key={step.num}
                  className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-800/60 border border-white/5"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">
                      {step.label}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-300 font-medium leading-relaxed mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Star Requirements */}
          <div className="p-3 bg-slate-800/80 border border-white/10 rounded-xl flex items-center gap-2.5">
            <Trophy size={18} className="text-amber-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-black tracking-wider text-amber-400">
                Star Requirements
              </span>
              <p className="text-xs text-slate-200 font-semibold truncate">
                {guide.starsGuide}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 shrink-0 border-t border-white/10 mt-3">
          <button
            onClick={() => {
              if (onStart) onStart();
              if (onClose) onClose();
            }}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 active:scale-98 text-slate-950 font-black rounded-xl text-sm tracking-wide uppercase transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isIntro ? '⚡ Understood, Start Challenge!' : '⚡ Resume Game'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
