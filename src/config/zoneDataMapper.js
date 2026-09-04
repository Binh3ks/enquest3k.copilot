/**
 * Zone Data Mapper for EngQuest3K W33+
 * Transforms canonical 4-Hub weekData into 5 Experiential Learning Zones:
 * - Zone 1: Story World (Scene Explorer, Voice Shadow, Story Retell)
 * - Zone 2: Knowledge Lab (Fact Finder, Action Lab, Discovery Report)
 * - Zone 3: Battle Arena (Speed Match, Grammar Duel, Math Quest)
 * - Zone 4: Creator Studio (Story Writer, Video Challenge, Info Exchange)
 * - Zone 5: Boss Castle (Cambridge A2 Flyers 15-Shield Rotary Exam Simulation)
 */

export function mapDataToZones(weekData, weekNumber = 33) {
  if (!weekData) return null;

  const readingHub = weekData.readingHub || weekData.reading_hub || weekData.stations?.reading_hub || {};
  const listeningHub = weekData.listeningHub || weekData.listening_hub || weekData.stations?.listening_hub || {};
  const writingHub = weekData.writingHub || weekData.writing_hub || weekData.stations?.writing_hub || {};
  const speakingHub = weekData.speakingHub || weekData.speaking_hub || weekData.stations?.speaking_hub || {};
  const skillPracticeHub = weekData.skillPracticeHub || weekData.skill_practice_hub || weekData.stations?.skill_practice_hub || {};

  return {
    weekNumber: weekData.weekId || weekData.week || weekNumber,
    theme: weekData.theme || weekData.title || weekData.weekTitle_en || "Weekly Theme",
    title_vi: weekData.title_vi || "",
    rawWeekData: weekData,
    stations: weekData.stations || {},
    word_power: weekData.stations?.word_power || weekData.word_power || null,
    // Info Exchange — Cambridge Speaking Part 2 (forwarded directly to root)
    cue_card_info_exchange: weekData.cue_card_info_exchange
      || weekData.speakingHub?.cue_card_info_exchange
      || weekData.speaking_hub?.cue_card_info_exchange
      || weekData.stations?.ask_ai?.cue_card_info_exchange
      || speakingHub.info_exchange_cards
      || null,
    cue_card_prompts: weekData.cue_card_prompts
      || weekData.speakingHub?.cue_card_prompts
      || weekData.speaking_hub?.cue_card_prompts
      || null,

    // 4 Hubs Passthrough + Skill Practice Hub
    reading_hub: readingHub,
    listening_hub: listeningHub,
    writing_hub: writingHub,
    speaking_hub: speakingHub,
    skill_practice_hub: skillPracticeHub,

    // ZONE 1: STORY WORLD (Day 1)
    storyWorld: {
      storyScenes: readingHub.story_scenes || readingHub.read_explore?.story_scenes || [],
      clilArticle: readingHub.clil_article || readingHub.read_explore?.clil_article || null,
      vocab: readingHub.vocab || weekData.vocab || [],
      interactiveStory: readingHub.interactive_story || null,
      grammarRegex: listeningHub.target_grammar_regex || [],
      grammarLesson: listeningHub.grammar_lesson || null,
      readExplore: readingHub.read_explore || null,
    },

    // ZONE 2: KNOWLEDGE LAB (Day 2)
    knowledgeLab: {
      clilArticle: readingHub.clil_article || readingHub.read_explore?.clil_article || null,
      actionLab: skillPracticeHub.science_lab || listeningHub.science_lab || null,
      discoveryReport: {
        title_en: readingHub.clil_article?.title_en || "Corridor Friction & Safety Discovery Report",
        article: readingHub.clil_article || null,
      }
    },

    // ZONE 3: BATTLE ARENA (Day 3)
    battleArena: {
      flashArena: skillPracticeHub.flash_arena || listeningHub.flash_arena || readingHub.vocab || weekData.vocab || [],
      wordPower: weekData.stations?.word_power || weekData.word_power || readingHub.word_power || null,
      vocab: readingHub.vocab || weekData.vocab || weekData.stations?.new_words?.vocab || [],
      grammarDrills: skillPracticeHub.grammar_drills || listeningHub.grammar_drills || [],
      sentenceBuilder: skillPracticeHub.grammar_drills || listeningHub.grammar_drills || [],
      barModel: skillPracticeHub.singapore_math || listeningHub.singapore_math || [],
      scienceLab: skillPracticeHub.science_lab || listeningHub.science_lab || null,
      dictation: skillPracticeHub.dictation || listeningHub.dictation || [],
    },

    // ZONE 3: CREATOR STUDIO
    creatorStudio: {
      pictureStory: writingHub.picture_story || null,
      wordBankPills: writingHub.word_bank_pills || [],
      modelSentence: writingHub.model_sentence || null,
      sentenceFrames: writingHub.sentence_frames || [],
      minWords: writingHub.min_words || 20,
      pblMission: writingHub.pbl_mission || null,
      podcastShadowing: speakingHub.podcast_shadowing || null,
      debateTopics: speakingHub.debate_topics || [],
      storyScenes: readingHub.story_scenes || readingHub.read_explore?.story_scenes || [],
      dictation: skillPracticeHub.dictation || listeningHub.dictation || [],
      talkshowVideo: speakingHub.talkshow_video || null,
      dialogueLines: speakingHub.dialogue_lines || [],
      infoExchange: speakingHub.info_exchange_cards || null,
    },

    // ZONE 4: BOSS BATTLE (CAMBRIDGE SUITE)
    bossBattle: {
      listening: {
        p1: listeningHub.listening_p1 || null,
        p2: listeningHub.listening_p2 || listeningHub.listening_p2_notes || null,
        p3: listeningHub.listening_p3 || null,
        p4: listeningHub.listening_p4 || listeningHub.listening_p4_questions || null,
        p5: listeningHub.listening_p5 || null,
      },
      readingWriting: {
        p1: readingHub.rw_part_1 || readingHub.rw_part1 || writingHub.rw_part_1 || writingHub.rw_part1 || null,
        p2: readingHub.rw_part_2 || readingHub.rw_part2 || writingHub.rw_part_2 || writingHub.rw_part2 || null,
        p3: readingHub.reading_part3_story || writingHub.reading_part3_story || null,
        p4: readingHub.rw_part_4 || readingHub.rw_part4 || writingHub.rw_part_4 || writingHub.rw_part4 || null,
        p5: readingHub.rw_part_5 || readingHub.rw_part5 || writingHub.rw_part_5 || writingHub.rw_part5 || null,
        p6: readingHub.rw_part_6 || readingHub.rw_part_6_check_mode || writingHub.rw_part_6 || null,
        p7: writingHub.writing || writingHub.picture_story || writingHub || null,
      },
      speaking: {
        p1_findDiff: speakingHub.find_differences || null,
        p2_cueCard: speakingHub.info_exchange_cards || speakingHub.cue_card_prompts || speakingHub.cue_card_info_exchange || null,
        p3_p4_storyQA: speakingHub.picture_story_continuation || null,
        talkshowTurns: speakingHub.talkshow_turns || [],
      },
      checkModeDrills: readingHub.check_mode_drills || [],
    }
  };
}

export default mapDataToZones;
