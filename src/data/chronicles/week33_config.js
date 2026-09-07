/**
 * week33_config.js — The Lexio Chronicles Week 33 (Chapter 3: The Storm Tower)
 *
 * Full narrative and configuration for Week 33:
 * - Week Lore & Quest Giver (Zara the Storm Archivist)
 * - 5 Floors with rich NPC Dialogues, custom Cliffhanger teasers, and 15 unique Door challenges
 * - Weekly Boss Configuration: Storm Titan Vexor (Boss Type 2: Stone Golem / Grammar Titan)
 */

export const WEEK33_CHRONICLES_CONFIG = {
  weekNumber: 33,
  chapterId: 3,

  weekLore: {
    openingCrawl: "Storm Titan Vexor has awakened! Lightning crackles across the tower floors. Find the Storm Words to weaken his power!",
    questGiverName: "Zara the Storm Archivist",
    questGiverIcon: "⚡🧙‍♀️",
    questGiverRole: "Storm Archivist — Keeper of the Thunder Lexicon",
  },

  floors: [
    // Floor 1 — Chamber of Tales (Story World)
    {
      floorIndex: 0,
      floorName: "Chamber of Tales",
      floorSubtitle: "Story World — Day 1 Review",
      floorIcon: "📜",
      floorThemeColor: "#7C3AED",
      npcDialogue: {
        characterName: "Zara the Storm Archivist",
        characterIcon: "⚡🧙‍♀️",
        lines: [
          "You've braved the first storm chamber! The ancient tale-words are now yours.",
          "Jake's corridor adventure taught us that even small actions — like walking carefully — shape big outcomes.",
          "Three doors cleared! The Thunder Fragment glows brighter. Onward, Storm Scholar! ⚡",
        ],
        rewardHint: "3 stars earned → Thunder Fragment piece awarded!",
      },
      cliffhanger: {
        text: "A strange rune pulses on the Alchemy Lab door...",
        subText: "Complete Zone 2 (Day 2) to unlock Floor 2! 🔒",
        bgMoodColor: "#1a0520",
      },
      doors: [
        {
          doorIndex: 0,
          doorColor: "#7C3AED",
          doorIcon: "🔮",
          doorLabel: "VOCAB DOOR",
          gameId: "arcane_bubble",
          gameName: "Arcane Bubble Pop",
          duration: 60,
          difficulty: "medium",
          gameParams: { bubbleCount: 6, waveCount: 5 },
        },
        {
          doorIndex: 1,
          doorColor: "#F59E0B",
          doorIcon: "🚂",
          doorLabel: "GRAMMAR DOOR",
          gameId: "spell_train",
          gameName: "Spell Sentence Train",
          duration: 90,
          difficulty: "medium",
          gameParams: { sentenceCount: 3, distractor: true, showSyntaxLabels: true },
        },
        {
          doorIndex: 2,
          doorColor: "#EF4444",
          doorIcon: "🕵️",
          doorLabel: "INTEGRATION DOOR",
          gameId: "lexical_det",
          gameName: "Lexical Detective",
          duration: 90,
          difficulty: "medium",
          gameParams: { roundCount: 5, timerSeconds: 20, showHint: true },
        },
      ],
    },
    // Floor 2 — Alchemy Lab
    {
      floorIndex: 1,
      floorName: "Alchemy Lab",
      floorSubtitle: "Knowledge Lab — Day 2 Review",
      floorIcon: "⚗️",
      floorThemeColor: "#0EA5E9",
      npcDialogue: {
        characterName: "Professor Solvay",
        characterIcon: "🔬⚗️",
        lines: [
          "Excellent work in the Alchemy Lab! The science of words is now bending to your will.",
          "Remember: friction reduces sliding, rubber soles increase grip. Apply this knowledge to the crystal pairs!",
          "Two floors cleared! Vexor trembles. Continue your storm quest! ⚡",
        ],
        rewardHint: "6+ stars this week → Rare Crystal Fragment bonus!",
      },
      cliffhanger: {
        text: "A bolt of lightning seals the Thunder Arena door...",
        subText: "Complete Zone 3 (Day 3) quests to unlock Floor 3!",
        bgMoodColor: "#0c1a30",
      },
      doors: [
        {
          doorIndex: 0,
          doorColor: "#0EA5E9",
          doorIcon: "💎",
          doorLabel: "VOCAB DOOR",
          gameId: "crystal_match",
          gameName: "Crystal Memory Match",
          duration: 90,
          difficulty: "medium",
          gameParams: { pairCount: 6, includeExamples: false },
        },
        {
          doorIndex: 1,
          doorColor: "#F59E0B",
          doorIcon: "⚒️",
          doorLabel: "GRAMMAR DOOR",
          gameId: "rune_forge",
          gameName: "Rune Forge",
          duration: 75,
          difficulty: "medium",
          gameParams: { questionCount: 6 },
        },
        {
          doorIndex: 2,
          doorColor: "#EF4444",
          doorIcon: "📜",
          doorLabel: "INTEGRATION DOOR",
          gameId: "ancient_scroll",
          gameName: "Ancient Scroll Cloze",
          duration: 120,
          difficulty: "medium",
          gameParams: { blankCount: 4, wordBankSize: 6 },
        },
      ],
    },
    // Floor 3 — Thunder Arena
    {
      floorIndex: 2,
      floorName: "Thunder Arena",
      floorSubtitle: "Battle Arena — Day 3 Review",
      floorIcon: "⚡",
      floorThemeColor: "#F59E0B",
      npcDialogue: {
        characterName: "Commander Roark",
        characterIcon: "⚔️🛡️",
        lines: [
          "The Thunder Arena echoes your victories! Three challenges conquered.",
          "Speed Match, Grammar Duel, Math Quest — you've proven your lightning reflexes.",
          "Three floors down. The Storm Titan grows nervous. Press on! ⚡",
        ],
        rewardHint: "Perfect Phonics round = bonus Lexio Coin!",
      },
      cliffhanger: {
        text: "The Rune Sanctum glows with an ancient power...",
        subText: "Finish Day 4 quests to unlock Floor 4!",
        bgMoodColor: "#1a1000",
      },
      doors: [
        {
          doorIndex: 0,
          doorColor: "#0EA5E9",
          doorIcon: "🔊",
          doorLabel: "PHONICS DOOR",
          gameId: "phonics_bubble",
          gameName: "Phonics Sound Blaster",
          duration: 60,
          difficulty: "medium",
          gameParams: { roundCount: 5, playAudioOnTap: true },
        },
        {
          doorIndex: 1,
          doorColor: "#F59E0B",
          doorIcon: "🧩",
          doorLabel: "GRAMMAR DOOR",
          gameId: "chunk_catapult",
          gameName: "Chunk Catapult Match",
          duration: 75,
          difficulty: "medium",
          gameParams: { pairCount: 5 },
        },
        {
          doorIndex: 2,
          doorColor: "#EF4444",
          doorIcon: "🛸",
          doorLabel: "INTEGRATION DOOR",
          gameId: "meteor_smasher",
          gameName: "Meteor Smasher",
          duration: 45,
          difficulty: "hard",
          gameParams: { timeLimit: 45, simultaneousMeteors: 3 },
        },
      ],
    },
    // Floor 4 — Rune Sanctum
    {
      floorIndex: 3,
      floorName: "Rune Sanctum",
      floorSubtitle: "Creator Studio — Day 4 Review",
      floorIcon: "⚒️",
      floorThemeColor: "#EF4444",
      npcDialogue: {
        characterName: "Master Runesmith Kael",
        characterIcon: "🔮⚒️",
        lines: [
          "You've deciphered the ancient runes of the Sanctum! Four floors cleared.",
          "Story Writer, Video Challenge, Info Exchange — your creative powers are legendary.",
          "The Boss Chamber trembles. One more floor, then the Storm Titan awaits! ⚡",
        ],
        rewardHint: "Syntax Express with zero Undo = Elite Badge!",
      },
      cliffhanger: {
        text: "The Apex Spire's gates crack open...",
        subText: "Finish Day 5 quests to unlock the final floor!",
        bgMoodColor: "#1a0a0a",
      },
      doors: [
        {
          doorIndex: 0,
          doorColor: "#7C3AED",
          doorIcon: "🏎️",
          doorLabel: "VOCAB DOOR",
          gameId: "highway_runner",
          gameName: "Highway Word Runner",
          duration: 60,
          difficulty: "hard",
          gameParams: { laneCount: 3, speedMultiplier: 1.2 },
        },
        {
          doorIndex: 1,
          doorColor: "#F59E0B",
          doorIcon: "🚆",
          doorLabel: "GRAMMAR DOOR",
          gameId: "spell_train_express",
          gameName: "Syntax Express 4-Car",
          duration: 90,
          difficulty: "hard",
          gameParams: { carCount: 4, distractor: 2, noUndoBonus: true },
        },
        {
          doorIndex: 2,
          doorColor: "#EF4444",
          doorIcon: "🔍",
          doorLabel: "INTEGRATION DOOR",
          gameId: "lexical_riddle",
          gameName: "Mystery Riddle Detective",
          duration: 90,
          difficulty: "hard",
          gameParams: { riddles: 5, clueCount: 3, bonusForEarlyGuess: true },
        },
      ],
    },
    // Floor 5 — Apex Spire
    {
      floorIndex: 4,
      floorName: "Apex Spire",
      floorSubtitle: "Boss Castle — Full Week Review",
      floorIcon: "🏰",
      floorThemeColor: "#F59E0B",
      npcDialogue: {
        characterName: "Lexio (Your Companion)",
        characterIcon: "🦊",
        lines: [
          "We made it to the top of the Storm Tower! You've mastered all five floors!",
          "The Crystal of Speaking shivers in Vexor's grasp. You're ready. Let's claim it!",
          "Five floors. Full week. You are a Storm Scholar! Now face the Boss! ⚡👑",
        ],
        rewardHint: "Perfect Apex Spire = +50 bonus PP!",
      },
      cliffhanger: {
        text: "⚔️ Storm Titan Vexor emerges from the thundercloud...",
        subText: "Boss Chamber now unlocked! Face the Guardian!",
        bgMoodColor: "#0a0a1a",
      },
      doors: [
        {
          doorIndex: 0,
          doorColor: "#F59E0B",
          doorIcon: "👑",
          doorLabel: "ELITE VOCAB DOOR",
          gameId: "grand_matrix",
          gameName: "Grand Master Matrix",
          duration: 90,
          difficulty: "elite",
          gameParams: { vocabGroupCount: 4, cardsPerGroup: 4 },
        },
        {
          doorIndex: 1,
          doorColor: "#EF4444",
          doorIcon: "⚡",
          doorLabel: "ELITE GRAMMAR DOOR",
          gameId: "titan_forge",
          gameName: "Titan Grammar Forge",
          duration: 90,
          difficulty: "elite",
          gameParams: { questionCount: 6, errorTypes: ['tense', 'article', 'preposition', 'agreement'] },
        },
        {
          doorIndex: 2,
          doorColor: "#10B981",
          doorIcon: "🏆",
          doorLabel: "ELITE INTEGRATION DOOR",
          gameId: "cambridge_cloze",
          gameName: "Cambridge Cloze Gauntlet",
          duration: 120,
          difficulty: "elite",
          gameParams: { blankCount: 6, typeInMode: true, hintAllowed: true, hintCost: 10 },
        },
      ],
    },
  ],

  // Weekly Boss (W33 = Boss Type 2: Stone Golem / Grammar Titan)
  weeklyBoss: {
    bossId: "storm_titan_vexor_w33",
    bossType: 2,
    bossName: "Storm Titan Vexor",
    bossSubtitle: "Guardian of the Thunder Lexicon",
    bossSprite: "bbs-sprite-golem",
    bossLore: "Forged from broken sentences and misplaced words, Vexor grows stronger with every grammar mistake you make.",

    hpConfig: {
      bossHP: 100,
      playerHP: 100,
      damageToPlayer: { bronze: 20, silver: 15, gold: 10 },
      damageFromPlayer: 10,
    },

    questionTemplate: "sentence_arrange",
    questionCount: 10,

    rewards: {
      fragmentName: "Thunder Fragment",
      fragmentIcon: "⚡",
      crystalTeaser: "2 more Weekly Boss victories to forge the Crystal of Speaking!",
    },
  },
};

export default WEEK33_CHRONICLES_CONFIG;
