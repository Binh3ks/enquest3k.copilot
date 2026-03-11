import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const ROOT_DIR = path.resolve(path.dirname(__filename), '..');

/**
 * BLUEPRINT-DRIVEN VIDEO QUERY GENERATOR
 * 
 * This script reads Blueprint data for each week and generates video_queries.json
 * based on:
 * - Week theme (from Blueprint)
 * - Grammar focus (from Blueprint)  
 * - Math/Sci/Soc keywords (from Blueprint)
 * - Video suggestions (from Blueprint)
 * 
 * Combined with: "ESL for kids cartoons" suffix for better YouTube search
 */

// BLUEPRINT DATA EXTRACTION (Weeks 1-54)
const BLUEPRINT_WEEKS = {
  1: {
    theme: "Hello, World!",
    grammar: "Subject Pronouns + Be (I am, You are)",
    keywords: "Numbers 1-10, Count to 10",
    video_hint: "Count to 10",
    read_topic: "The Junior Scholar - student identity"
  },
  2: {
    theme: "Family Squad",
    grammar: "Possessive Adjectives (My, Your)",
    keywords: "Family roles, family members",
    video_hint: "Family Finger",
    read_topic: "Family Roots - family tree"
  },
  3: {
    theme: "Mirror Game",
    grammar: "Is vs Has (She is tall / She has hair)",
    keywords: "Body parts, physical description",
    video_hint: "Parts of the Body",
    read_topic: "The Detective - describing people"
  },
  4: {
    theme: "Happy Jar",
    grammar: "Like + V-ing (I like playing)",
    keywords: "Emotions, feelings",
    video_hint: "Feelings Song",
    read_topic: "Emotional IQ - understanding emotions"
  },
  5: {
    theme: "Mystery House",
    grammar: "Articles A/An (A bed, An apple)",
    keywords: "Rooms in house, household items",
    video_hint: "Rooms in House",
    read_topic: "Smart Home - house tour"
  },
  6: {
    theme: "Treasure Hunt",
    grammar: "Prepositions of Place (In, On, Under)",
    keywords: "Spatial awareness, location",
    video_hint: "Where is it?",
    read_topic: "Interior Decorator - positioning objects"
  },
  7: {
    theme: "Backpack",
    grammar: "There is (Singular)",
    keywords: "School supplies, counting 1-20",
    video_hint: "School Supplies",
    read_topic: "Inventor's Kit - school items"
  },
  8: {
    theme: "Busy Class",
    grammar: "There are (Plural)",
    keywords: "Plural nouns, counting",
    video_hint: "Plural Song",
    read_topic: "Class Inventory - plural items"
  },
  9: {
    theme: "City Sounds & Sights",
    grammar: "Adjectives before nouns (It is a [adjective] [noun])",
    keywords: "City places, transportation, urban life",
    video_hint: "City Song",
    read_topic: "City Explorer - describing city scenes"
  },
  10: {
    theme: "The Farm Adventure",
    grammar: "Contrast with but (The city is noisy, but the farm is quiet)",
    keywords: "Farm animals, countryside, city vs farm",
    video_hint: "Farm Animals",
    read_topic: "Farm Tour - comparing locations"
  },
  11: {
    theme: "Weekend Fun Spots",
    grammar: "Preposition At (I play at the park)",
    keywords: "Places, park, library, supermarket, weekend activities",
    video_hint: "Places in Town",
    read_topic: "Weekend Adventure - places to visit"
  },
  12: {
    theme: "The Talent Show",
    grammar: "Can/Can't for Ability (I can sing, I can't swim)",
    keywords: "Abilities, talents, sing dance draw run jump swim",
    video_hint: "I Can Song",
    read_topic: "Talent Show - abilities and performances"
  },
  13: {
    theme: "Daily Routines",
    grammar: "Present Simple (I wake up, I go)",
    keywords: "wake up, brush teeth, eat breakfast, go to school, have lunch, do homework, watch TV, go to bed",
    video_hint: "Daily Routine Song",
    read_topic: "A Perfect School Day - daily routines and time"
  },
  14: {
    theme: "Welcome to My World",
    grammar: "Presentation & Self-Introduction (I present, I can, My family has)",
    keywords: "present, poster, family, abilities, talents, confident, proud",
    video_hint: "Show and Tell Song",
    read_topic: "Project Presentation - sharing about yourself and family"
  }
};

// PRIORITY YOUTUBE CHANNELS (from Blueprint whitelist)
const PRIORITY_CHANNELS = [
  "English Singsing",
  "Little Fox", 
  "Super Simple Songs",
  "SciShow Kids",
  "Numberblocks",
  "British Council",
  "Peppa Pig",
  "National Geographic Kids"
];

// AGE-APPROPRIATE CHANNEL FILTERING (6-12 Primary School)
const PRIMARY_SCHOOL_CHANNELS = [
  "English Singsing",        // Grammar lessons, clear explanations
  "Little Fox",              // Stories with subtitles, level-based
  "British Council",         // Professional ESL content
  "National Geographic Kids", // Educational, documentary style
  "SciShow Kids",            // Science explanations
  "Numberblocks",            // Math concepts
  "Peppa Pig"                // OK for lower primary (6-8)
];

// PRESCHOOL CHANNELS (exclude for 6-12 content)
const PRESCHOOL_CHANNELS = [
  "Super Simple Songs",      // Nursery rhymes, puppet shows
  "Cocomelon",              // Baby songs
  "Dave and Ava",           // Toddler content
  "Blippi"                  // Preschool entertainment
];

/**
 * Check if a week is a review week (every 14 weeks: 14, 28, 42, 54)
 */
const isReviewWeek = (weekId) => {
  return weekId % 14 === 0;
};

/**
 * Aggregate grammar and keywords from previous 12 weeks for review weeks
 */
const aggregateReviewContent = (weekId) => {
  const startWeek = weekId - 13; // Previous 12 weeks (e.g., weeks 1-12 for week 14)
  const endWeek = weekId - 2;     // Exclude week 13 (also review week)
  
  const grammarTopics = [];
  const allKeywords = [];
  const themes = [];
  
  for (let w = startWeek; w <= endWeek; w++) {
    const weekData = BLUEPRINT_WEEKS[w];
    if (weekData) {
      grammarTopics.push(weekData.grammar);
      allKeywords.push(weekData.keywords);
      themes.push(weekData.theme);
    }
  }
  
  return {
    grammarSummary: grammarTopics.join(', '),
    keywordsSummary: allKeywords.join(', '),
    themesSummary: themes.slice(0, 5).join(', '), // Top 5 themes
    coreGrammar: [
      'subject pronouns', 'possessive adjectives', 'verb to be',
      'like + gerund', 'articles', 'prepositions', 'there is/are',
      'can/can\'t', 'present simple'
    ].join(' ')
  };
};

/**
 * Generate queries for REVIEW WEEKS (14, 28, 42, 54)
 * 
 * STRATEGY:
 * - Review weeks occur every 14 weeks (after completing 12 regular weeks + 1 transition week)
 * - Aggregate key grammar/topics from previous 12 weeks
 * - Combine with current week's specific presentation theme
 * - Prioritize AGE-APPROPRIATE content (6-12 primary school, not preschool)
 * - REUSE best videos from corresponding weeks in current cycle
 * 
 * WEEK 14 VIDEO STRUCTURE:
 * [1] GRAMMAR: Subject Pronouns (review Week 1-2)
 * [2] GRAMMAR: Can/Can't Abilities (review Week 12)
 * [3] STORY: Family Song (reuse from Week 2)
 * [4] VOCABULARY: Classroom Conversation (reuse from Week 1)
 * [5] SCIENCE: Talents/Abilities educational content
 * 
 * AGE-APPROPRIATE FILTERING:
 * ✅ British Council, English Singsing, Little Fox (grammar lessons, stories)
 * ✅ National Geographic Kids, SciShow Kids (educational)
 * ⚠️ Super Simple Songs (OK for songs, but avoid puppet shows)
 * ❌ Cocomelon, Dave and Ava, Blippi (preschool content)
 */
const generateReviewWeekQueries = (weekId, weekData) => {
  const reviewContent = aggregateReviewContent(weekId);
  
  console.log(`   📚 Reviewing: Weeks ${weekId - 13} to ${weekId - 2}`);
  
  // For Week 28, 42, 54: suggest reusing videos from Week 14, 28, 42
  const previousReviewWeek = weekId - 14;
  if (previousReviewWeek > 0) {
    console.log(`   💡 TIP: Consider reusing videos from Week ${previousReviewWeek} (previous review week)`);
  }
  
  const queries = {
    weekId: weekId,
    theme: weekData.theme,
    grammar_focus: `REVIEW: ${reviewContent.coreGrammar}`,
    review_of_weeks: `${weekId - 13}-${weekId - 2}`,
    reuse_suggestion: previousReviewWeek > 0 ? previousReviewWeek : null,
    videos: []
  };
  
  // VIDEO 1: GRAMMAR REVIEW - Subject Pronouns & Possessive (Weeks 1-2)
  // Age-appropriate: Use British Council or English Singsing (avoid nursery rhymes)
  queries.videos.push({
    id: 1,
    purpose: "GRAMMAR",
    priority_search: `British Council subject pronouns personal pronouns ESL primary school`,
    backup_search: `English Singsing pronouns I you he she we they grammar lesson for kids`,
    age_group: "6-12 primary",
    reuse_from_week: previousReviewWeek > 0 ? previousReviewWeek : null
  });
  
  // VIDEO 2: GRAMMAR REVIEW - Can/Can't Abilities (Week 12) + Week 14 theme
  // Week 14 specific: "I can present my poster" combines abilities with presentation
  queries.videos.push({
    id: 2,
    purpose: "GRAMMAR",
    priority_search: `English Singsing can can't abilities I can sing dance draw ESL for kids`,
    backup_search: `can can't abilities talents kids song ESL cartoons`,
    age_group: "6-12 primary",
    reuse_from_week: previousReviewWeek > 0 ? previousReviewWeek : null
  });
  
  // VIDEO 3: STORY/VOCABULARY - Family theme (reuse from Week 2)
  // For review weeks: suggest reusing "The People In My Family" from Week 2
  queries.videos.push({
    id: 3,
    purpose: "STORY",
    priority_search: `Little Fox my family story level 1 ESL for kids`,
    backup_search: `family members children story Peppa Pig cartoons for kids`,
    age_group: "6-12 primary",
    reuse_from_week: 2, // Always suggest reusing from Week 2 (Family Squad)
    reuse_video_title: "The People In My Family | Super Simple Songs",
    reuse_video_id: "yDua9ms9_eg"
  });
  
  // VIDEO 4: VOCABULARY - Introduce yourself / Self-introduction
  // Age-appropriate: Classroom conversation or story (not puppet shows)
  // Week 14 curated: Reuse "My School Day - Classroom Conversation" from Week 1
  queries.videos.push({
    id: 4,
    purpose: "VOCABULARY", 
    priority_search: `Little Fox introduce yourself self introduction story ESL for kids`,
    backup_search: `British Council self introduction greetings primary school ESL`,
    age_group: "6-12 primary",
    reuse_from_week: 1, // Week 1 has good classroom conversation video
    reuse_video_title: "My School Day - Classroom Language and Conversation",
    reuse_video_id: "FZPmnw4Ws5A"
  });
  
  // VIDEO 5: SCIENCE/SOCIAL - Talents, abilities, what I can do
  // Link to Week 12 (abilities) + Week 14 theme (talents, proud)
  queries.videos.push({
    id: 5,
    purpose: "SCIENCE",
    priority_search: `talents abilities what can you do kids educational video`,
    backup_search: `SciShow Kids skills talents what makes you special for kids`,
    reuse_from_week: previousReviewWeek > 0 ? previousReviewWeek : null
  });
  
  // Add metadata
  queries.topic = weekData.read_topic || weekData.theme;
  queries.science = weekData.keywords;
  
  return queries;
};


/**
 * Generate 5 video queries for a week based on Blueprint data
 */
const generateQueriesForWeek = (weekId) => {
  const weekData = BLUEPRINT_WEEKS[weekId];
  if (!weekData) {
    console.log(`⚠️  Week ${weekId} not in Blueprint data - using generic queries`);
    return generateGenericQueries(weekId);
  }
  
  console.log(`\n📋 Generating queries for Week ${weekId}: ${weekData.theme}`);
  
  // Check if this is a review week
  if (isReviewWeek(weekId)) {
    console.log(`   🔄 REVIEW WEEK - Aggregating from previous 12 weeks`);
    return generateReviewWeekQueries(weekId, weekData);
  }
  
  const queries = {
    weekId: weekId,
    theme: weekData.theme,
    grammar_focus: weekData.grammar,
    videos: []
  };
  
  // VIDEO 1: GRAMMAR - Always English Singsing
  const grammarTopics = extractGrammarKeywords(weekData.grammar);
  queries.videos.push({
    id: 1,
    purpose: "GRAMMAR",
    priority_search: `English Singsing ${grammarTopics} ESL for kids`,
    backup_search: `${grammarTopics} song ESL kids cartoons`
  });
  
  // VIDEO 2: GRAMMAR (backup) - Also English Singsing
  const grammarAlt = extractSecondaryGrammar(weekData.grammar);
  queries.videos.push({
    id: 2,
    purpose: "GRAMMAR",
    priority_search: `English Singsing ${grammarAlt} ESL for kids`,
    backup_search: `${grammarAlt} kids song ESL cartoons`
  });
  
  // VIDEO 3: STORY - Little Fox or Vooks
  const themeKeywords = extractThemeKeywords(weekData.theme, weekData.read_topic);
  queries.videos.push({
    id: 3,
    purpose: "STORY",
    priority_search: `Little Fox ${themeKeywords} story level 1 ESL for kids`,
    backup_search: `Vooks ${themeKeywords} story read aloud cartoons for kids`
  });
  
  // VIDEO 4: VOCABULARY - Based on video_hint from Blueprint
  const videoHint = weekData.video_hint || weekData.keywords;
  queries.videos.push({
    id: 4,
    purpose: "VOCABULARY",
    priority_search: `Little Fox ${videoHint} song ESL for kids`,
    backup_search: `${videoHint} ESL kids cartoons song`
  });
  
  // VIDEO 5: SCIENCE/MATH - Based on keywords
  const sciKeywords = weekData.keywords;
  const scienceChannel = sciKeywords.toLowerCase().includes('number') || sciKeywords.toLowerCase().includes('count') 
    ? "Numberblocks" 
    : "SciShow Kids";
  queries.videos.push({
    id: 5,
    purpose: "SCIENCE",
    priority_search: `${scienceChannel} ${sciKeywords} for kids`,
    backup_search: `${sciKeywords} kids science cartoons`
  });
  
  // Add metadata (optional)
  queries.topic = weekData.read_topic || weekData.theme;
  queries.science = weekData.keywords;
  
  return queries;
};

/**
 * Extract main grammar keywords from grammar string
 */
const extractGrammarKeywords = (grammarStr) => {
  const patterns = {
    'Subject Pronouns': 'subject pronouns I you he she',
    'Possessive Adjectives': 'possessive adjectives my your his her',
    'Is vs Has': 'is has verb to be have',
    'Like + V-ing': 'like love gerund ing',
    'Articles': 'articles a an the',
    'Prepositions': 'prepositions of place in on under',
    'There is': 'there is there are',
    'There are': 'plural there are',
  };
  
  for (const [key, value] of Object.entries(patterns)) {
    if (grammarStr.includes(key)) return value;
  }
  
  // Fallback: return first part before parenthesis
  return grammarStr.split('(')[0].trim().toLowerCase();
};

/**
 * Extract secondary grammar keywords (alternative search)
 */
const extractSecondaryGrammar = (grammarStr) => {
  // Extract content in parentheses as examples
  const match = grammarStr.match(/\(([^)]+)\)/);
  if (match) {
    return match[1].replace(/,/g, ' ');
  }
  
  // Fallback to main keywords
  return extractGrammarKeywords(grammarStr);
};

/**
 * Extract theme keywords for vocabulary videos
 */
const extractThemeKeywords = (theme, readTopic) => {
  const themeWords = theme.toLowerCase()
    .replace(/[!?.,]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3 && !['hello', 'game', 'squad'].includes(w));
  
  const topicWords = readTopic ? readTopic.toLowerCase().split('-')[0].trim() : '';
  
  return [...themeWords, topicWords].filter(Boolean).join(' ');
};

/**
 * Generate generic queries when Blueprint data is missing
 */
const generateGenericQueries = (weekId) => {
  return {
    weekId: weekId,
    theme: `Week ${weekId}`,
    grammar: "General ESL",
    videos: [
      {
        id: 1,
        purpose: "GRAMMAR",
        priority_search: "English Singsing grammar ESL for kids",
        backup_search: "grammar song ESL kids cartoons"
      },
      {
        id: 2,
        purpose: "GRAMMAR",
        priority_search: "English Singsing phonics song for kids",
        backup_search: "phonics ESL kids cartoons"
      },
      {
        id: 3,
        purpose: "STORY",
        priority_search: "Little Fox story level 1 ESL for kids",
        backup_search: "Vooks story read aloud cartoons for kids"
      },
      {
        id: 4,
        purpose: "VOCABULARY",
        priority_search: "Little Fox vocabulary song ESL for kids",
        backup_search: "vocabulary ESL kids cartoons"
      },
      {
        id: 5,
        purpose: "SCIENCE",
        priority_search: "SciShow Kids science for kids",
        backup_search: "science learning kids cartoons"
      }
    ]
  };
};

/**
 * Save video_queries.json to week folder
 */
const saveQueries = (weekId, queries) => {
  const weekStr = String(weekId).padStart(2, '0');
  const outPath = path.join(ROOT_DIR, `src/data/weeks/week_${weekStr}/video_queries.json`);
  
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(queries, null, 2));
  
  console.log(`✅ Saved: ${outPath}`);
  console.log(`   📝 ${queries.videos.length} queries generated`);
  queries.videos.forEach(v => {
    console.log(`      [${v.id}] ${v.purpose}: ${v.priority_search}`);
  });
};

/**
 * Main execution
 */
const main = () => {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`\n📺 VIDEO QUERIES GENERATOR (Blueprint-Driven)`);
    console.log(`\nUsage:`);
    console.log(`  node tools/generate_video_queries.js <week_number>`);
    console.log(`  node tools/generate_video_queries.js 2`);
    console.log(`  node tools/generate_video_queries.js 1-10  (range)`);
    console.log(`  node tools/generate_video_queries.js --all  (weeks 1-54)`);
    console.log(`\nThis will create video_queries.json based on Blueprint data.`);
    return;
  }
  
  let weekIds = [];
  
  if (args[0] === '--all') {
    weekIds = Array.from({ length: 54 }, (_, i) => i + 1);
  } else if (args[0].includes('-')) {
    const [start, end] = args[0].split('-').map(Number);
    weekIds = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  } else {
    weekIds = [parseInt(args[0])];
  }
  
  console.log(`\n🎬 Generating video queries for ${weekIds.length} week(s)...`);
  
  weekIds.forEach(weekId => {
    const queries = generateQueriesForWeek(weekId);
    saveQueries(weekId, queries);
  });
  
  console.log(`\n🎉 Done! Generated queries for ${weekIds.length} week(s)`);
  console.log(`\n📌 Next step: Run video fetching`);
  console.log(`   node tools/update_videos.js ${weekIds[0]}`);
};

main();
