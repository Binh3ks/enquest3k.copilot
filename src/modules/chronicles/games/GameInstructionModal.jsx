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
    icon: '🏹',
    title: 'Chunk Catapult Slingshot',
    doorType: '🟡 GRAMMAR DOOR',
    mission: 'Launch magical fireball projectiles from the slingshot into the floating target basket that correctly completes the sentence chunk!',
    steps: [
      {
        num: '1',
        label: 'Read Sentence Starter',
        desc: 'Observe the opening phrase displayed in the top banner (e.g. "Jake was walking carefully down...").',
      },
      {
        num: '2',
        label: 'Drag & Aim Slingshot',
        desc: 'Touch or click and drag the loaded fireball backward to aim your trajectory arc at the correct floating basket.',
      },
      {
        num: '3',
        label: 'Release to Fire',
        desc: 'Release your touch or mouse button to fire the projectile into the target basket.',
      },
      {
        num: '4',
        label: 'Clear All 8 Pairs',
        desc: 'Score direct hits on all 8 collocation targets before the round timer expires.',
      },
    ],
    starsGuide: '1★: 3+ Pairs | 2★: 5+ Pairs | 3★: 7+ Pairs with Surviving Attempts',
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
    icon: '🏃‍♂️',
    title: 'Highway 3D Word Runner',
    doorType: '🔵 VOCAB DOOR',
    mission: 'Sprint down the 3D futuristic highway with Leo, collect matching vocabulary billboards, and dodge hazards!',
    steps: [
      {
        num: '1',
        label: 'Listen & Read Target Definition',
        desc: 'Hear the audio clue or read the definition banner at the top of the runway.',
      },
      {
        num: '2',
        label: 'Steer Between 3 Lanes',
        desc: 'Tap left/right screen zones or use Arrow keys / A & D to switch lanes.',
      },
      {
        num: '3',
        label: 'Collect Matching Word Billboards',
        desc: 'Sprint through the floating word crystal that matches the definition.',
      },
      {
        num: '4',
        label: 'Jump, Slide & Dodge Obstacles',
        desc: 'Double-tap/swipe up to jump hurdles, swipe down to slide under lasers, and steer away from barrels!',
      },
    ],
    starsGuide: '1★: 3+ Words | 2★: 6+ Words | 3★: 9+ Words & Surviving Hearts',
  },
  spell_train_express: {
    icon: '🚆',
    title: 'Syntax Express Rail',
    doorType: '🟡 GRAMMAR DOOR',
    mission: 'Switch the high-speed canyon express train onto the safe golden track by leaping across gantries and striking the correct grammatical clause lever!',
    steps: [
      {
        num: '1',
        label: 'Read Sentence Stem',
        desc: 'Observe the opening sentence clause in the top banner and note the missing connector.',
      },
      {
        num: '2',
        label: 'Platform-Jump Across Gantries',
        desc: 'Use Arrow keys / A & D to run, and Up / Space / Swipe Up to leap across elevated rail platforms.',
      },
      {
        num: '3',
        label: 'Strike the Correct Switch Lever',
        desc: 'Press E / Enter or tap the mechanical lever on the gantry displaying the correct completing clause.',
      },
      {
        num: '4',
        label: 'Prevent Express Derailment',
        desc: 'Flip the correct switch before the approaching express train reaches the danger junction!',
      },
    ],
    starsGuide: '1★: 1+ Round | 2★: 2+ Rounds | 3★: 3/3 Rounds Cleared with Surviving Hearts',
  },
  lexical_riddle: {
    icon: '🏛️',
    title: 'Riddle Run Maze',
    doorType: '🟡 INTEGRATION DOOR',
    mission: 'Escape the ancient stone labyrinth by leaping across elevated vault tiers, evading the patrolling wolf beast, and unlocking the correct sanctuary door!',
    steps: [
      {
        num: '1',
        label: 'Read Cambridge Riddle',
        desc: 'Analyze the mystery riddle banner displayed across the top of the labyrinth.',
      },
      {
        num: '2',
        label: 'Evade Patrolling Beast',
        desc: 'Watch out for the labyrinth wolf patrolling the lower floor. Leap onto stone platforms to stay safe!',
      },
      {
        num: '3',
        label: 'Platform-Jump Across Labyrinth',
        desc: 'Use Arrow keys / A & D to run, and Up / Space / Swipe Up to jump across elevated stone platforms.',
      },
      {
        num: '4',
        label: 'Unlock Sanctuary Door',
        desc: 'Press E / Enter or tap the vault door displaying the correct riddle answer to advance!',
      },
    ],
    starsGuide: '1★: 1+ Riddle | 2★: 2+ Riddles | 3★: 3/3 Riddles Solved with Surviving Hearts',
  },
  riddle_run_maze: {
    icon: '🏛️',
    title: 'Riddle Run Maze',
    doorType: '🟡 INTEGRATION DOOR',
    mission: 'Escape the ancient stone labyrinth by leaping across elevated vault tiers, evading the patrolling wolf beast, and unlocking the correct sanctuary door!',
    steps: [
      {
        num: '1',
        label: 'Read Cambridge Riddle',
        desc: 'Analyze the mystery riddle banner displayed across the top of the labyrinth.',
      },
      {
        num: '2',
        label: 'Evade Patrolling Beast',
        desc: 'Watch out for the labyrinth wolf patrolling the lower floor. Leap onto stone platforms to stay safe!',
      },
      {
        num: '3',
        label: 'Platform-Jump Across Labyrinth',
        desc: 'Use Arrow keys / A & D to run, and Up / Space / Swipe Up to jump across elevated stone platforms.',
      },
      {
        num: '4',
        label: 'Unlock Sanctuary Door',
        desc: 'Press E / Enter or tap the vault door displaying the correct riddle answer to advance!',
      },
    ],
    starsGuide: '1★: 1+ Riddle | 2★: 2+ Riddles | 3★: 3/3 Riddles Solved with Surviving Hearts',
  },
  grand_matrix: {
    icon: '👑',
    title: 'Grand Master Matrix',
    doorType: '🔵 VOCAB ELITE DOOR',
    mission: 'Leap across celestial matrix platforms at the summit of Apex Spire to harvest the glowing glyph nodes that match the target definition!',
    steps: [
      {
        num: '1',
        label: 'Read Matrix Query',
        desc: 'Observe the target definition displayed in the glowing celestial banner at the top of the arena.',
      },
      {
        num: '2',
        label: 'Traverse Cyber Platforms',
        desc: 'Navigate Leo using Arrow Keys / WASD or Mobile Touch Gestures to leap between floating coordinate beams.',
      },
      {
        num: '3',
        label: 'Evade Glitch Sentinels',
        desc: 'Dodge the patrolling corrupted Glitch Sentinels (👁️). Touching them costs 1 heart and causes glitch overload.',
      },
      {
        num: '4',
        label: 'Synthesize Glyph Node',
        desc: 'Jump onto the platform holding the matching word glyph and press E / Enter or tap it to harvest +40 XP!',
      },
    ],
    starsGuide: '1★: Harvest 1+ Node | 2★: Harvest 3+ Nodes | 3★: All 4 Matrix Nodes Synthesized with Surviving Hearts',
  },
  titan_forge: {
    icon: '⚙️',
    title: 'Titan Grammar Forge',
    doorType: '🟡 GRAMMAR ELITE DOOR',
    mission: 'Leap across elevated clockwork platforms, dodge steam hazard vents, and activate the correct gear cog to complete the sentence!',
    steps: [
      {
        num: '1',
        label: 'Inspect the Stem Sentence',
        desc: 'Read the top objective banner for the target sentence stem and grammar blank [ ___ ? ___ ].',
      },
      {
        num: '2',
        label: 'Traverse Clockwork Platforms',
        desc: 'Use Arrow/WASD keys (or swipe/tap on mobile) to leap across rotating gear decks and evade periodic steam blasts.',
      },
      {
        num: '3',
        label: 'Activate the Correct Gear Cog',
        desc: 'Approach or tap the gear cog with the grammatically accurate clause to engage the Titan Heart Engine.',
      },
      {
        num: '4',
        label: 'Forge All 3 Clockwork Gears',
        desc: 'Successfully engage all 3 gear cogs without losing your 3 hearts to earn 3 stars and complete the door.',
      },
    ],
    starsGuide: '1★: 40+ XP | 2★: 80+ XP | 3★: Complete All 3 Gears with Surviving Hearts',
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
  synonym_storm: {
    icon: '🌪️',
    title: 'Synonym Storm',
    doorType: '🔵 VOCAB DOOR',
    mission: 'Catch floating storm orbs that hold true synonyms (từ đồng nghĩa) for the target word!',
    steps: [
      { num: '1', label: 'Inspect Target Word', desc: 'Read the glowing target word displayed in the storm center.' },
      { num: '2', label: 'Scan Floating Orbs', desc: 'Scan the 4 swirling atmospheric orbs for the closest synonym.' },
      { num: '3', label: 'Tap the Match', desc: 'Tap the correct synonym orb before time runs out to charge the capacitor.' },
      { num: '4', label: 'Maintain Combo', desc: 'Clear all 5 rounds without losing your 3 energy hearts.' },
    ],
    starsGuide: '1★: 3 Rounds Won | 2★: 4 Rounds Won | 3★: 5 Rounds Streak',
  },
  connector_relay: {
    icon: '🌉',
    title: 'Connector Relay',
    doorType: '🟡 GRAMMAR DOOR',
    mission: 'Bridge the chasm by selecting the accurate grammatical connector to connect complex clauses!',
    steps: [
      { num: '1', label: 'Read Clause Gap', desc: 'Inspect the running sentence and spot the missing conjunction gap (_____).' },
      { num: '2', label: 'Analyze Logic', desc: 'Determine whether the relationship is cause (because), contrast (although), or condition (unless).' },
      { num: '3', label: 'Energize Portal', desc: 'Tap the correct connector portal to power Leo across the chasm.' },
      { num: '4', label: 'Finish All Segments', desc: 'Connect all 5 bridge segments before time expires.' },
    ],
    starsGuide: '1★: 3 Segments Linked | 2★: 4 Segments Linked | 3★: 5 Flawless Connections',
  },
  story_sequencer: {
    icon: '📖',
    title: 'Story Sequencer',
    doorType: '🔴 INTEGRATION DOOR',
    mission: 'Restore chronological order to 5 scrambled narrative scenes in under 45 seconds!',
    steps: [
      { num: '1', label: 'Read Narrative Cards', desc: 'Examine the 5 scrambled scene descriptions from the weekly adventure.' },
      { num: '2', label: 'Tap to Swap', desc: 'Tap one card, then tap another card to swap their chronological positions.' },
      { num: '3', label: 'Rebuild Timeline', desc: 'Arrange the scenes from beginning (1) to conclusion (5).' },
      { num: '4', label: 'Lock Chronology', desc: 'Complete sequence in 35-41s to earn full speed master stars!' },
    ],
    starsGuide: '1★: Solved in ≤60s | 2★: Solved in ≤50s | 3★: Solved in ≤40s (Speed Master)',
  },
  word_forge_scramble: {
    icon: '⚒️',
    title: 'Word Forge Scramble',
    doorType: '🔵 VOCAB DOOR',
    mission: 'Hammer out scrambled rune letter tiles in correct sequence to forge the weekly vocabulary words!',
    steps: [
      { num: '1', label: 'Read Definition Clue', desc: 'Check the anvil header for the English definition of the target word.' },
      { num: '2', label: 'Tap Letter Runes', desc: 'Tap the scrambled letter tiles in correct spelling order from left to right.' },
      { num: '3', label: 'Use Backspace if Needed', desc: 'Made a mistake? Tap Backspace to undo the last slotted letter.' },
      { num: '4', label: 'Forge All 5 Words', desc: 'Forge all 5 vocabulary words before the furnace cools down.' },
    ],
    starsGuide: '1★: 3 Words Forged | 2★: 4 Words Forged | 3★: 5 Words Flawlessly Forged',
  },
  question_quest: {
    icon: '❓',
    title: 'Question Quest',
    doorType: '🟡 GRAMMAR DOOR',
    mission: 'Select the precise WH-question that matches the narrative event on the quest scroll!',
    steps: [
      { num: '1', label: 'Read the Statement', desc: 'Read the narrative sentence detailing actions, people, or events.' },
      { num: '2', label: 'Examine 3 WH-Runes', desc: 'Review the 3 WH-question options (What / Where / When / Who / Why).' },
      { num: '3', label: 'Select Correct Question', desc: 'Tap the rune asking for the central highlighted information.' },
      { num: '4', label: 'Clear 5 Questions', desc: 'Complete all 5 rounds to earn master grammar XP.' },
    ],
    starsGuide: '1★: 3 Questions Matched | 2★: 4 Questions Matched | 3★: 5 Flawless Questions',
  },
  rune_balance_scale: {
    icon: '⚖️',
    title: 'Word Class Duel',
    doorType: '🔴 INTEGRATION DOOR',
    mission: 'Duel of parts of speech! Identify the context sentence where the target word fulfills the required word class (Noun vs Verb)!',
    steps: [
      { num: '1', label: 'Identify Target Role', desc: 'Check the prompt for the required role (e.g. NOUN as thing vs VERB as action).' },
      { num: '2', label: 'Read 4 Context Cards', desc: 'Examine how the dual-class word is used in each of the 4 sentences.' },
      { num: '3', label: 'Strike Correct Card', desc: 'Tap the card where the word functions as the requested part of speech.' },
      { num: '4', label: 'Conquer All Duels', desc: 'Win all 4 duels to master Cambridge word class disambiguation.' },
    ],
    starsGuide: '1★: 2 Duels Won | 2★: 3 Duels Won | 3★: 4 Flawless Duels',
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
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
