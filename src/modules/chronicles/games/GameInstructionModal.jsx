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
  phonics_bubble: {
    icon: '🔊',
    title: 'Phonics Sound Blaster',
    doorType: '🔵 VOCAB / PHONICS DOOR',
    mission: 'Listen carefully to the target English sound and pop the matching word bubbles across 5 rounds!',
    steps: [
      {
        num: '1',
        label: 'Listen to Target Sound',
        desc: 'Pay attention to the target phoneme displayed and pronounced at the top.',
      },
      {
        num: '2',
        label: 'Preview Audio on Bubbles',
        desc: 'Tap the speaker button on any bubble to hear its native pronunciation first.',
      },
      {
        num: '3',
        label: 'Blast Matching Bubbles',
        desc: 'Tap bubbles that contain the target sound before they float away.',
      },
      {
        num: '4',
        label: 'Maintain Combo',
        desc: 'Pop consecutive correct bubbles without errors to trigger combo score multipliers.',
      },
    ],
    starsGuide: '1★: 3 Rounds Cleared | 2★: 4 Rounds Cleared | 3★: 5 Rounds with High Accuracy',
  },
  chunk_catapult: {
    icon: '🧩',
    title: 'Chunk Catapult Match',
    doorType: '🟡 GRAMMAR DOOR',
    mission: 'Launch sentence starters into their matching predicate completions using the magical catapult!',
    steps: [
      {
        num: '1',
        label: 'Select Starter Chunk',
        desc: 'Tap a sentence starter card in the left column to load it into the catapult chamber.',
      },
      {
        num: '2',
        label: 'Aim at Completion',
        desc: 'Tap the matching predicate chunk in the right column to launch your projectile.',
      },
      {
        num: '3',
        label: 'Form Full Collocations',
        desc: 'Connected pairs lock in green energy, reinforcing syntactic and semantic coherence.',
      },
      {
        num: '4',
        label: 'Clear All Pairs',
        desc: 'Link all 5 sentence chunks accurately before the catapult timer expires.',
      },
    ],
    starsGuide: '1★: 3 Pairs Matched | 2★: 4 Pairs Matched | 3★: 5 Pairs with ≤1 Mistake',
  },
  meteor_smasher: {
    icon: '🛸',
    title: 'Meteor Smasher',
    doorType: '🔴 INTEGRATION DOOR',
    mission: 'Defend the station by blasting incoming cosmic meteors that carry matching definitions or words!',
    steps: [
      {
        num: '1',
        label: 'Check Target HUD',
        desc: 'Look at the target display at the top to see the active word or definition.',
      },
      {
        num: '2',
        label: 'Identify Incoming Meteor',
        desc: 'Three meteors plunge simultaneously. Scan their contents rapidly.',
      },
      {
        num: '3',
        label: 'Blast the Correct Rock',
        desc: 'Tap the correct meteor to trigger a particle explosion and score points.',
      },
      {
        num: '4',
        label: 'Trigger Meteor Storm',
        desc: 'Destroy 3 meteors in a row to unleash a Meteor Storm screen clear!',
      },
    ],
    starsGuide: '1★: 4–6 Hits | 2★: 7–9 Hits | 3★: 10+ Hits in 45 Seconds',
  },
  highway_runner: {
    icon: '🏎️',
    title: 'Highway Word Runner',
    doorType: '🔵 VOCAB DOOR',
    mission: 'Steer your race car through 3 highway lanes to collect target vocabulary stars and dodge hazards!',
    steps: [
      {
        num: '1',
        label: 'Read Highway Objective',
        desc: 'Observe the target meaning or category shown on your racing dashboard.',
      },
      {
        num: '2',
        label: 'Steer Between 3 Lanes',
        desc: 'Use the Left / Right arrow keys or touch buttons to change lanes smoothly.',
      },
      {
        num: '3',
        label: 'Collect Target Stars',
        desc: 'Drive into glowing word stars that match the target definition for turbo points.',
      },
      {
        num: '4',
        label: 'Dodge Hazard Obstacles',
        desc: 'Avoid wrong word barriers; hitting obstacles spins your vehicle and consumes lives.',
      },
    ],
    starsGuide: '1★: 5+ Collects | 2★: 10+ Collects | 3★: 15+ Collects with Surviving Lives',
  },
  spell_train_express: {
    icon: '🚆',
    title: 'Syntax Express 4-Car',
    doorType: '🟡 GRAMMAR DOOR',
    mission: 'Hitch complex 4-part syntactic carriages to the high-speed bullet train before departure whistle!',
    steps: [
      {
        num: '1',
        label: 'Inspect 4-Car Sequence',
        desc: 'Review [Subject] ➔ [Verb] ➔ [Object] ➔ [Adverbial / Clause] requirements.',
      },
      {
        num: '2',
        label: 'Filter Out Distractors',
        desc: 'The platform contains 2 distractor carts. Ignore irrelevant words.',
      },
      {
        num: '3',
        label: 'Hitch in Exact Order',
        desc: 'Tap carriages in sequence to link them to the futuristic locomotive.',
      },
      {
        num: '4',
        label: 'Express Route Bonus',
        desc: 'Assemble carriages without unhitching to earn the zero-undo speedrunner bonus.',
      },
    ],
    starsGuide: '1★: 2 Trains Cleared | 2★: 3 Trains Cleared | 3★: 4 Trains with 0 Strikes',
  },
  lexical_riddle: {
    icon: '🔍',
    title: 'Mystery Riddle Detective',
    doorType: '🔴 INTEGRATION DOOR',
    mission: 'Solve 5 mystery case files by deducing secret words from progressive context clues!',
    steps: [
      {
        num: '1',
        label: 'Read Initial Clue',
        desc: 'Analyze Clue #1. Guess early for maximum detective prestige points (+30 pts)!',
      },
      {
        num: '2',
        label: 'Request More Clues',
        desc: 'Need evidence? Tap Reveal Next Clue to uncover narrower descriptive clues.',
      },
      {
        num: '3',
        label: 'Inspect Suspect Cards',
        desc: 'Select the matching vocabulary suspect from the 4 clue cards below.',
      },
      {
        num: '4',
        label: 'Close All 5 Cases',
        desc: 'Crack all 5 mystery dossiers before the detective timer runs out.',
      },
    ],
    starsGuide: '1★: 3 Cases Solved | 2★: 4 Cases Solved | 3★: 5 Cases with Early Deductions',
  },
  grand_matrix: {
    icon: '👑',
    title: 'Grand Master Matrix',
    doorType: '🔵 VOCAB ELITE DOOR',
    mission: 'Solve the 4×4 master grid by grouping all 4 dimensions of each vocabulary item together!',
    steps: [
      {
        num: '1',
        label: 'Understand 4 Dimensions',
        desc: 'Each word has: Word card, Definition, Example Sentence, and Part-of-Speech tag.',
      },
      {
        num: '2',
        label: 'Select 4 Matching Cards',
        desc: 'Tap 4 cards in the 16-card matrix that correspond to the exact same vocabulary entry.',
      },
      {
        num: '3',
        label: 'Lock Matrix Group',
        desc: 'Hit LOCK GROUP to verify. Correct sets blast off the board in golden light.',
      },
      {
        num: '4',
        label: 'Clear All 4 Groups',
        desc: 'Complete all 4 groups before exhausting your remaining stabilization attempts.',
      },
    ],
    starsGuide: '1★: Cleared with ≤4 Retries | 2★: Cleared with ≤2 Retries | 3★: Flawless Matrix Clear',
  },
  titan_forge: {
    icon: '⚡',
    title: 'Titan Grammar Forge',
    doorType: '🟡 GRAMMAR ELITE DOOR',
    mission: 'Spot grammar errors on the ancient Titan tablet and forge the perfect corrections with your hammer!',
    steps: [
      {
        num: '1',
        label: 'Spot the Error Word',
        desc: 'Read the inscribed sentence on the Titan stone tablet and tap the word containing the error.',
      },
      {
        num: '2',
        label: 'Choose Correction Rune',
        desc: 'Select the grammatically accurate replacement rune from the 4 forge choices below.',
      },
      {
        num: '3',
        label: 'Titan Forge Strike',
        desc: 'Correct replacements imbue the stone tablet with golden fire and repair the sentence.',
      },
      {
        num: '4',
        label: 'Repair 6 Inscriptions',
        desc: 'Overcome tense, agreement, article, and preposition errors across 6 trials.',
      },
    ],
    starsGuide: '1★: 3 Inscriptions Forged | 2★: 4 Inscriptions Forged | 3★: 5–6 Perfect Forges',
  },
  cambridge_cloze: {
    icon: '🏆',
    title: 'Cambridge Cloze Gauntlet',
    doorType: '🔴 INTEGRATION ELITE DOOR',
    mission: 'Type missing English words directly into the gauntlet passage to deplete the Boss HP bar!',
    steps: [
      {
        num: '1',
        label: 'Read Connected Story',
        desc: 'Examine the multi-sentence passage and determine missing syntactic and lexical keys.',
      },
      {
        num: '2',
        label: 'Type the Exact Word',
        desc: 'Tap each blank input field and type the answer directly via keyboard.',
      },
      {
        num: '3',
        label: 'Use Hint Sparingly',
        desc: 'Stuck? Press the 💡 Hint button to reveal a starting letter (costs 10 score points).',
      },
      {
        num: '4',
        label: 'Submit Gauntlet',
        desc: 'Submit your completed passage to deal lethal damage to the chamber guardian.',
      },
    ],
    starsGuide: '1★: 3/5 Blanks Correct | 2★: 4/5 Blanks Correct | 3★: 5/5 Full Gauntlet Mastery',
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
