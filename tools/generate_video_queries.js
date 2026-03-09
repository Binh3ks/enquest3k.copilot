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
