#!/usr/bin/env node
/**
 * TASK 22c: Live-Schema Trace
 * Maps every active quest route to its component chain and the EXACT data fields read.
 * Identifies unused legacy fields for quarantine.
 * Exports docs/week33_live_schema.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log(`\n========================================================================`);
console.log(`📐 TASK 22c: LIVE-SCHEMA TRACE & COMPONENT CHAIN MAPPER`);
console.log(`========================================================================`);

const LIVE_SCHEMA_MAP = {
  version: "1.0.0 (W33+ Master Invariant)",
  description: "Live schema trace of the 15-quest / 4-zone architecture",
  zones: {
    zone_1_story_world: {
      component: "StoryWorldZone.jsx",
      quests: {
        gear1_webtoon: {
          component_chain: ["TaskScreen.jsx", "StoryWorldZone.jsx", "SceneExplorer.jsx"],
          data_source: "reading_hub.js",
          active_fields_read: [
            "read_explore.story_scenes[].id",
            "read_explore.story_scenes[].scene_number",
            "read_explore.story_scenes[].title_en",
            "read_explore.story_scenes[].title_vi",
            "read_explore.story_scenes[].narration_en",
            "read_explore.story_scenes[].narration_vi",
            "read_explore.story_scenes[].image_url",
            "read_explore.story_scenes[].hotspots[].id",
            "read_explore.story_scenes[].hotspots[].label_en",
            "read_explore.story_scenes[].hotspots[].label_vi",
            "read_explore.story_scenes[].hotspots[].x",
            "read_explore.story_scenes[].hotspots[].y"
          ]
        },
        gear2_karaoke: {
          component_chain: ["TaskScreen.jsx", "StoryWorldZone.jsx", "VoiceShadowing.jsx"],
          data_source: "reading_hub.js -> shadowing.js",
          active_fields_read: [
            "shadowingData.sentences[].id",
            "shadowingData.sentences[].text",
            "shadowingData.sentences[].words[]",
            "shadowingData.sentences[].ipa[]",
            "shadowingData.sentences[].audio_url"
          ]
        },
        gear3_retell: {
          component_chain: ["TaskScreen.jsx", "StoryWorldZone.jsx", "StoryRetell.jsx"],
          data_source: "reading_hub.js",
          active_fields_read: [
            "read_explore.title",
            "read_explore.reading_passage",
            "read_explore.audio_url",
            "read_explore.retell_prompts[]"
          ]
        }
      }
    },
    zone_2_knowledge_lab: {
      component: "KnowledgeLabZone.jsx",
      quests: {
        gear4_clil: {
          component_chain: ["TaskScreen.jsx", "KnowledgeLabZone.jsx", "FactFinder.jsx"],
          data_source: "reading_hub.js",
          active_fields_read: [
            "read_explore.clil_article.title",
            "read_explore.clil_article.content_en",
            "read_explore.clil_article.content_vi",
            "read_explore.clil_article.cover_image",
            "read_explore.clil_article.audio_url",
            "read_explore.clil_article.comprehension_questions[]"
          ]
        },
        science_lab: {
          component_chain: ["TaskScreen.jsx", "KnowledgeLabZone.jsx", "ScienceDragDropLab.jsx"],
          data_source: "listening_hub.js -> logic_science.js",
          active_fields_read: [
            "science_lab.simulation_title",
            "science_lab.experiment_steps[]",
            "science_lab.interactive_items[]",
            "science_lab.conclusion_formula"
          ]
        },
        science_report: {
          component_chain: ["TaskScreen.jsx", "KnowledgeLabZone.jsx", "DiscoveryReport.jsx"],
          data_source: "reading_hub.js & writing_hub.js",
          active_fields_read: [
            "pbl_mission.title_en",
            "pbl_mission.task_en",
            "sentence_frames[]",
            "word_bank_pills[]"
          ]
        }
      }
    },
    zone_2_battle_arena: {
      component: "BattleArenaZone.jsx",
      quests: {
        word_blitz: {
          component_chain: ["TaskScreen.jsx", "BattleArenaZone.jsx", "FlashArena.jsx"],
          data_source: "reading_hub.js (vocab) | listening_hub.js (flash_arena)",
          active_fields_read: [
            "vocab[].word",
            "vocab[].definition_vi",
            "vocab[].audio_word"
          ]
        },
        sentence_smash: {
          component_chain: ["TaskScreen.jsx", "BattleArenaZone.jsx", "SentenceBuilderBattle.jsx"],
          data_source: "listening_hub.js (grammar_drills)",
          active_fields_read: [
            "grammar_drills[].id",
            "grammar_drills[].target_sentence",
            "grammar_drills[].scrambled_words[]",
            "grammar_drills[].translation_vi"
          ]
        },
        math_quest: {
          component_chain: ["TaskScreen.jsx", "BattleArenaZone.jsx", "BarModelQuest.jsx"],
          data_source: "listening_hub.js -> singapore_math.js",
          active_fields_read: [
            "singapore_math[].id",
            "singapore_math[].problem_en",
            "singapore_math[].bar_model_svg",
            "singapore_math[].answer_value",
            "singapore_math[].step_by_step_solution"
          ]
        }
      }
    },
    zone_3_creator_studio: {
      component: "CreatorStudioZone.jsx",
      quests: {
        story_writer: {
          component_chain: ["TaskScreen.jsx", "CreatorStudioZone.jsx", "StoryWriting.jsx"],
          data_source: "writing_hub.js -> writing.js",
          active_fields_read: [
            "picture_story.panels[].image_url",
            "picture_story.word_bank[]",
            "picture_story.sentence_frames[]",
            "picture_story.min_words"
          ]
        },
        broadcast_studio: {
          component_chain: ["TaskScreen.jsx", "CreatorStudioZone.jsx", "VideoChallenge.jsx"],
          data_source: "speaking_hub.js",
          active_fields_read: [
            "talkshow_video.video_id",
            "talkshow_video.title",
            "dialogue_lines[].speaker",
            "dialogue_lines[].text"
          ]
        },
        info_exchange: {
          component_chain: ["TaskScreen.jsx", "CreatorStudioZone.jsx", "InformationExchangeP2.jsx"],
          data_source: "speaking_hub.js",
          active_fields_read: [
            "info_exchange_cards.candidate_card",
            "info_exchange_cards.examiner_card",
            "info_exchange_cards.prompt_questions[]"
          ]
        }
      }
    },
    zone_4_boss_castle: {
      component: "BossBattleZone.jsx",
      quests: {
        boss_listening: {
          component_chain: ["TaskScreen.jsx", "BossBattleZone.jsx", "SVGLineMatcher.jsx", "SVGColorAndWrite.jsx", "VisualMatchingAH.jsx"],
          data_source: "listening_hub.js",
          active_fields_read: [
            "listening_p1.image_url",
            "listening_p1.audio_url",
            "listening_p1.names[]",
            "listening_p1.targets[]",
            "listening_p2_notes[].target",
            "listening_p3.items[]",
            "listening_p3.cards[]",
            "listening_p5.image_url",
            "listening_p5.instructions[]"
          ]
        },
        boss_reading: {
          component_chain: ["TaskScreen.jsx", "BossBattleZone.jsx", "WordBankMatchingGrid.jsx", "DialogueAHCompleter.jsx", "InlineTextClozeDropdown.jsx", "TextExtractionCompleter.jsx"],
          data_source: "writing_hub.js & reading_hub.js",
          active_fields_read: [
            "rw_part_1.words[]",
            "rw_part_1.definitions[]",
            "rw_part_2.turns[]",
            "rw_part_2.options[]",
            "rw_part_4.text_template",
            "rw_part_4.answers",
            "rw_part_5.story_text",
            "rw_part_5.questions[]"
          ]
        },
        weekly_review: {
          component_chain: ["TaskScreen.jsx", "BossBattleZone.jsx", "OpenClozeCompleter.jsx", "FindDifferencesInteractive.jsx"],
          data_source: "reading_hub.js & speaking_hub.js",
          active_fields_read: [
            "rw_part_6.text_template",
            "rw_part_6.answers",
            "find_differences.image_a",
            "find_differences.image_b",
            "find_differences.differences[]"
          ]
        }
      }
    }
  },
  quarantined_legacy_fields: [
    "explore.js -> content_en/content_vi unmounted station",
    "daily_watch.js -> legacy video list outside broadcast_studio",
    "logic_lab.js -> old monolithic wrapper replaced by singapore_math.js & logic_science.js",
    "word_power.js -> legacy SRS list replaced by 4-hub vocab.js",
    "ask_ai -> unmounted station tab outside AI Tutor V28"
  ]
};

const outPath = path.join(rootDir, 'docs/week33_live_schema.json');
fs.writeFileSync(outPath, JSON.stringify(LIVE_SCHEMA_MAP, null, 2), 'utf8');
console.log(`📄 Saved Live Schema Trace to: ${outPath}`);
