#!/usr/bin/env node
/**
 * SPEC GENERATOR - Extract week data from Syllabus
 * 
 * Usage: node tools/generate_spec.js <week_number>
 * Example: node tools/generate_spec.js 5
 * 
 * Output: docs/MASS/SPECS/week_05_spec.json
 * 
 * Purpose: Generate locked JSON spec file from 3-year syllabus
 * This ensures AI cannot hallucinate content - all data comes from source
 */

const fs = require('fs');
const path = require('path');

// ===== SYLLABUS DATABASE =====
// Extracted from "1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt"
// This is the SINGLE SOURCE OF TRUTH for all 156 weeks

const SYLLABUS_DB = {
  1: {
    title_en: "Hello, World!",
    title_vi: "Chào Thế giới!",
    topic: "Identity & Superheroes (Creating a Hero Identity)",
    topic_vi: "Bản sắc & Siêu anh hùng (Tạo nhân vật)",
    grammar_focus: "Pattern 'I am...' (Identity)",
    grammar_pattern: "I am [name/age/hero]",
    cefr_level: "A0",
    vocab_count: 10,
    target_vocab: [
      "name", "age", "student", "hero", "power", 
      "boy", "girl", "numbers 1-10", "hello", "world"
    ],
    phase: 1,
    block: "A",
    unit: 1
  },
  
  2: {
    title_en: "My Family Squad",
    title_vi: "Biệt đội Gia đình",
    topic: "Relationships (Family members as a team)",
    topic_vi: "Quan hệ (Các thành viên gia đình như một đội)",
    grammar_focus: "This is my... (Possession)",
    grammar_pattern: "This is my [family member]",
    cefr_level: "A0",
    vocab_count: 10,
    target_vocab: [
      "mother", "father", "brother", "sister", "team", 
      "leader", "helper", "family", "squad", "love"
    ],
    phase: 1,
    block: "A",
    unit: 1
  },
  
  3: {
    title_en: "The Mirror Game",
    title_vi: "Trò chơi Soi gương",
    topic: "Appearance (Describing physical traits)",
    topic_vi: "Ngoại hình (Miêu tả đặc điểm)",
    grammar_focus: "She is tall vs She has long hair",
    grammar_pattern: "[Subject] is [adjective] / [Subject] has [noun]",
    cefr_level: "A0",
    vocab_count: 10,
    target_vocab: [
      "tall", "short", "hair", "eyes", "long", 
      "curly", "straight", "glasses", "mirror", "look"
    ],
    phase: 1,
    block: "A",
    unit: 1
  },
  
  4: {
    title_en: "My Happy Jar",
    title_vi: "Chiếc hũ Hạnh phúc",
    topic: "Personality - Emotions and Likes",
    topic_vi: "Tính cách - Cảm xúc và Sở thích",
    grammar_focus: "Pattern 'I like + V-ing'",
    grammar_pattern: "I like [verb]-ing",
    cefr_level: "A0++",
    vocab_count: 10,
    target_vocab: [
      "happy", "sad", "funny", "friendly", "excited",
      "playing", "reading", "drawing", "singing", "jar"
    ],
    phase: 1,
    block: "A",
    unit: 1
  },
  
  5: {
    title_en: "The Mystery House",
    title_vi: "Ngôi nhà Bí ẩn",
    topic: "Nouns (Exploring rooms and furniture)",
    topic_vi: "Danh từ (Khám phá phòng và đồ đạc)",
    grammar_focus: "Articles 'A/An'",
    grammar_pattern: "A/An [noun]",
    cefr_level: "A0++",
    vocab_count: 10,
    target_vocab: [
      "bedroom", "kitchen", "bathroom", "living room", "bed",
      "chair", "table", "house", "mystery", "explore"
    ],
    phase: 1,
    block: "A",
    unit: 1
  },
  
  6: {
    title_en: "Treasure Hunt at Home",
    title_vi: "Truy tìm Kho báu",
    topic: "Location (Hiding and finding objects)",
    topic_vi: "Vị trí (Trốn và tìm đồ vật)",
    grammar_focus: "Prepositions (In, On, Under, Next to)",
    grammar_pattern: "The [object] is [preposition] the [place]",
    cefr_level: "A0++",
    vocab_count: 10,
    target_vocab: [
      "box", "desk", "floor", "wall", "window",
      "door", "hide", "seek", "treasure", "hunt"
    ],
    phase: 1,
    block: "A",
    unit: 1
  },
  
  7: {
    title_en: "Inside My Backpack",
    title_vi: "Trong Balo của tôi",
    topic: "School supplies (Singular)",
    topic_vi: "Đồ dùng học tập (Số ít)",
    grammar_focus: "There is a...",
    grammar_pattern: "There is a [singular noun]",
    cefr_level: "A0++",
    vocab_count: 10,
    target_vocab: [
      "backpack", "whiteboard", "teacher", "computer", "pen",
      "ruler", "eraser", "book", "inside", "school"
    ],
    phase: 1,
    block: "A",
    unit: 1
  },
  
  8: {
    title_en: "The Busy Classroom",
    title_vi: "Lớp học Bận rộn",
    topic: "Plural (Counting classroom items)",
    topic_vi: "Số nhiều (Đếm đồ vật trong lớp)",
    grammar_focus: "There are... + Plural Nouns",
    grammar_pattern: "There are [number] [plural nouns]",
    cefr_level: "A0++",
    vocab_count: 10,
    target_vocab: [
      "desks", "pencils", "students", "bags", "markers",
      "chairs", "classroom", "busy", "many", "count"
    ],
    phase: 1,
    block: "A",
    unit: 1
  },
  
  // Week 9-156 would continue here...
  // For now, we have Week 1-8 as golden standard
};

// ===== CEFR LEVEL MAPPING =====
const CEFR_RULES = {
  "A0": {
    tier: 1,
    sentence_length: "5-8 words",
    grammar_allowed: ["Present Simple", "I am/You are", "Articles A/An", "Basic pronouns"],
    grammar_forbidden: ["Past tense", "Future", "Modals", "Complex sentences"]
  },
  "A0++": {
    tier: 1,
    sentence_length: "6-10 words",
    grammar_allowed: ["Present Simple", "Present Continuous (-ing)", "There is/are", "Prepositions", "Plural -s"],
    grammar_forbidden: ["Past tense", "Future will", "Conditionals"]
  },
  "A1": {
    tier: "1-2",
    sentence_length: "8-12 words",
    grammar_allowed: ["Present Simple", "Present Continuous", "Past Simple (Regular)", "Can/Can't", "Simple questions"],
    grammar_forbidden: ["Present Perfect", "Passive", "Relative clauses"]
  },
  // ... more levels
};

// ===== MISSION STRUCTURE RULES =====
const MISSION_RULES = {
  "Week 1-3": {
    format: "canonical_question",
    missions_count: 3,
    objectives_per_mission: [8, 9, 10],
    hints_type: "individual_words",
    min_turns: 8,
    max_turns: 10
  },
  "Week 4+": {
    format: "question_variants",
    missions_count: 3,
    objectives_per_mission: [9, 10, 11],
    hints_type: "scrambled_sentence",
    variants_per_objective: 3,
    student_invitations: true,
    min_turns: 12,
    max_turns: 15
  }
};

// ===== MAIN GENERATOR FUNCTION =====
function generateWeekSpec(weekNum) {
  const weekId = parseInt(weekNum);
  
  if (!SYLLABUS_DB[weekId]) {
    console.error(`❌ Week ${weekId} not found in syllabus database`);
    console.log(`💡 Available weeks: 1-8 (more coming soon)`);
    process.exit(1);
  }
  
  const syllabus = SYLLABUS_DB[weekId];
  const missionRules = weekId >= 4 ? MISSION_RULES["Week 4+"] : MISSION_RULES["Week 1-3"];
  const cefrRules = CEFR_RULES[syllabus.cefr_level];
  
  // Build complete spec
  const spec = {
    // === METADATA (LOCKED) ===
    week_id: weekId,
    phase: syllabus.phase,
    block: syllabus.block,
    unit: syllabus.unit,
    week_number: weekId,
    
    // === FROM SYLLABUS (LOCKED) ===
    title_en: syllabus.title_en,
    title_vi: syllabus.title_vi,
    topic: syllabus.topic,
    topic_vi: syllabus.topic_vi,
    
    // === GRAMMAR (LOCKED) ===
    cefr_level: syllabus.cefr_level,
    grammar_focus: syllabus.grammar_focus,
    grammar_pattern: syllabus.grammar_pattern,
    grammar_rules: cefrRules,
    
    // === VOCABULARY (LOCKED) ===
    vocab_count: syllabus.vocab_count,
    target_vocab_words: syllabus.target_vocab,
    vocab_tier: cefrRules.tier,
    
    // === STATIONS STRUCTURE (LOCKED) ===
    // Based on Week 4 actual structure - 14 files total
    stations: {
      format: "station_files",
      count: 14,
      required_files: [
        "vocab.js",         // 10 words, audio_word only
        "read.js",          // Story content, split into sentences for dictation/shadowing
        "grammar.js",       // 20 exercises
        "dictation.js",     // From read.js sentences, use meaning: key
        "shadowing.js",     // From read.js sentences, use vi: key + audio_full
        "writing.js",       // Writing prompt
        "ask_ai.js",        // 5 AI prompts
        "logic.js",         // 5 logic problems
        "explore.js",       // Exploration content
        "word_power.js",    // 3 phrases (NO audio fields)
        "mindmap.js",       // 6 stems + 36 branches
        "daily_watch.js",   // 5 video slots
        "index.js",         // Main export, imports all stations
        "video_queries.json"// Video search queries (generated by AI, updated by script)
      ],
      dual_mode: true,
      advanced_folder: `week_${String(weekId).padStart(2, '0')}`,
      easy_folder: `week_${String(weekId).padStart(2, '0')}_easy`,
      reference_golden_standard: "src/data/weeks/week_04/"
    },
    
    // === GENERATION CONSTRAINTS (LOCKED) ===
    constraints: {
      sentence_length: cefrRules.sentence_length,
      grammar_allowed: cefrRules.grammar_allowed,
      grammar_forbidden: cefrRules.grammar_forbidden,
      vocab_source: "Must use target_vocab_words from this spec",
      cross_references: "All target_keywords must exist in target_vocab"
    },
    
    // === METADATA ===
    _spec_version: "1.0",
    _generated_at: new Date().toISOString(),
    _source: "1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt"
  };
  
  return spec;
}

// ===== CLI EXECUTION =====
if (require.main === module) {
  const weekNum = process.argv[2];
  
  if (!weekNum) {
    console.error("❌ Missing week number");
    console.log("Usage: node tools/generate_spec.js <week_number>");
    console.log("Example: node tools/generate_spec.js 5");
    process.exit(1);
  }
  
  const spec = generateWeekSpec(weekNum);
  const fileName = `week_${String(spec.week_id).padStart(2, '0')}_spec.json`;
  const outputPath = path.join(__dirname, '../SPECS', fileName);
  
  // Write to file
  fs.writeFileSync(outputPath, JSON.stringify(spec, null, 2));
  
  console.log(`✅ Generated: ${fileName}`);
  console.log(`📍 Location: MASS/SPECS/${fileName}`);
  console.log(`\n📊 Spec Summary:`);
  console.log(`   Title: ${spec.title_en} (${spec.title_vi})`);
  console.log(`   CEFR: ${spec.cefr_level}`);
  console.log(`   Topic: ${spec.topic}`);
  console.log(`   Grammar: ${spec.grammar_focus}`);
  console.log(`   Vocab: ${spec.vocab_count} words`);
  console.log(`   Words: ${spec.target_vocab_words.join(', ')}`);
  console.log(`   Format: ${spec.stations.count} station files`);
  console.log(`\n🎯 Next Step:`);
  console.log(`   1. Run: node MASS/tools/create_week.cjs ${spec.week_id}`);
  console.log(`   2. AI reads prompts: 08, 09, 10, 12`);
  console.log(`   3. AI generates 14 station files (13 .js + video_queries.json)`);
  console.log(`   4. Validate and generate assets`);
}

console.log('\n📁 All MASS production files in: MASS/ folder');

module.exports = { generateWeekSpec, SYLLABUS_DB, CEFR_RULES };
