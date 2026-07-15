#!/usr/bin/env node

/**
 * Rebuild monolithic week_XX.js files from subfolder structure
 * Input: week_XX/ folder (read.js, explore.js, vocab.js, grammar.js, etc.)
 * Output: week_XX.js (monolithic file with stations object)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WEEK_NUMBERS = [9, 10, 11]; // Add more as needed

async function importStationFile(weekNum, stationName, isEasy = false) {
  const weekPadded = weekNum.toString().padStart(2, '0');
  const folderPath = isEasy ? `weeks_easy/week_${weekPadded}` : `weeks/week_${weekPadded}`;
  const filePath = path.join(__dirname, '../src/data', folderPath, `${stationName}.js`);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  ${filePath} not found`);
    return null;
  }
  
  try {
    const module = await import(filePath);
    return module.default;
  } catch (error) {
    console.error(`❌ Error importing ${filePath}:`, error.message);
    return null;
  }
}

async function rebuildWeekFile(weekNum, isEasy = false) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🔧 Rebuilding Week ${weekNum} ${isEasy ? '(EASY)' : '(ADVANCED)'}...`);
  console.log('='.repeat(60));
  
  const weekPadded = weekNum.toString().padStart(2, '0');
  
  // Load all station files
  const read = await importStationFile(weekNum, 'read', isEasy);
  const explore = await importStationFile(weekNum, 'explore', isEasy);
  const vocab = await importStationFile(weekNum, 'vocab', isEasy);
  const grammar = await importStationFile(weekNum, 'grammar', isEasy);
  const wordPower = await importStationFile(weekNum, 'word_power', isEasy);
  const dictation = await importStationFile(weekNum, 'dictation', isEasy);
  const shadowing = await importStationFile(weekNum, 'shadowing', isEasy);
  const sentenceBuilder = await importStationFile(weekNum, 'sentence_builder', isEasy);
  const mindmap = await importStationFile(weekNum, 'mindmap', isEasy);
  const twentyQuestions = await importStationFile(weekNum, 'twenty_questions', isEasy);
  const wordChain = await importStationFile(weekNum, 'word_chain', isEasy);
  const wordMatch = await importStationFile(weekNum, 'word_match', isEasy);
  const askAI = await importStationFile(weekNum, 'ask_ai', isEasy);
  const logic = await importStationFile(weekNum, 'logic', isEasy);
  
  // Load week_XX_real.js for metadata
  let weekReal;
  try {
    const realPath = path.join(__dirname, `../src/data/weeks/week_${weekPadded}_real.js`);
    const realModule = await import(realPath);
    weekReal = realModule.default;
  } catch (error) {
    console.warn(`⚠️  week_${weekPadded}_real.js not found, using defaults`);
    weekReal = { title: `Week ${weekNum}`, week_title_en: `Week ${weekNum}`, grammar_focus: "TBD" };
  }
  
  // Build monolithic structure
  const weekData = {
    weekId: weekNum,
    weekTitle_en: weekReal.week_title_en || `Week ${weekNum}`,
    weekTitle_vi: weekReal.week_title_vi || `Tuần ${weekNum}`,
    grammar_focus: weekReal.grammar_focus || "TBD",
    global_vocab: vocab?.vocab || [],
    stations: {}
  };
  
  // Merge read + explore into read_explore station
  if (read && explore) {
    weekData.stations.read_explore = {
      title: read.title || "Reading & Exploring",
      image_url: read.image_url || `/images/week${weekPadded}/read_cover_w${weekPadded}.jpg`,
      content_en: read.content_en || "",
      content_vi: read.content_vi || "",
      audio_url: read.audio_url || "",
      comprehension_questions: read.comprehension_questions || [],
      explore_title_en: explore.title_en || "Explore",
      explore_title_vi: explore.title_vi || "Khám phá",
      explore_image_url: explore.image_url || `/images/week${weekPadded}/explore_cover_w${weekPadded}.jpg`,
      explore_content_en: explore.content_en || "",
      explore_content_vi: explore.content_vi || "",
      explore_audio_url: explore.audio_url || "",
      explore_check_questions: explore.check_questions || []
    };
    console.log('✅ read_explore station built');
  }
  
  // Add vocab station
  if (vocab) {
    weekData.stations.new_words = {
      vocab: vocab.vocab || []
    };
    console.log('✅ new_words station built');
  }
  
  // Add word_match
  if (wordMatch) {
    weekData.stations.word_match = wordMatch;
    console.log('✅ word_match station built');
  }
  
  // Add grammar
  if (grammar) {
    weekData.stations.grammar = grammar;
    console.log('✅ grammar station built');
  }
  
  // Add word_power
  if (wordPower) {
    weekData.stations.word_power = wordPower;
    console.log('✅ word_power station built');
  }
  
  // Add dictation
  if (dictation) {
    weekData.stations.dictation = dictation;
    console.log('✅ dictation station built');
  }
  
  // Add shadowing
  if (shadowing) {
    weekData.stations.shadowing = shadowing;
    console.log('✅ shadowing station built');
  }
  
  // Add sentence_builder
  if (sentenceBuilder) {
    weekData.stations.sentence_builder = sentenceBuilder;
    console.log('✅ sentence_builder station built');
  }
  
  // Add mindmap
  if (mindmap) {
    weekData.stations.mindmap = mindmap;
    console.log('✅ mindmap station built');
  }
  
  // Add twenty_questions
  if (twentyQuestions) {
    weekData.stations.twenty_questions = twentyQuestions;
    console.log('✅ twenty_questions station built');
  }
  
  // Add word_chain
  if (wordChain) {
    weekData.stations.word_chain = wordChain;
    console.log('✅ word_chain station built');
  }
  
  // Add ask_ai
  if (askAI) {
    weekData.stations.ask_ai = askAI;
    console.log('✅ ask_ai station built');
  }
  
  // Add logic
  if (logic) {
    weekData.stations.logic = logic;
    console.log('✅ logic station built');
  }
  
  // Generate JS file content
  const jsContent = `/**
 * Week ${weekNum} - ${weekReal.week_title_en || `Week ${weekNum}`}
 * Auto-generated from subfolder structure
 * Generated: ${new Date().toISOString()}
 */

const weekData = ${JSON.stringify(weekData, null, 2)};

export default weekData;
`;
  
  // Write file
  const folderPath = isEasy ? 'weeks_easy' : 'weeks';
  const outputPath = path.join(__dirname, `../src/data/${folderPath}/week_${weekPadded}.js`);
  fs.writeFileSync(outputPath, jsContent, 'utf8');
  
  console.log(`\n✨ Wrote: ${outputPath}`);
  console.log(`📊 Stations: ${Object.keys(weekData.stations).length}`);
  console.log(`📚 Vocabulary: ${weekData.global_vocab.length} words`);
}

async function main() {
  console.log('\n' + '🔧 WEEK FILE REBUILDER'.padStart(50, '='));
  console.log('Rebuilding monolithic week files from subfolder structure\n');
  
  for (const weekNum of WEEK_NUMBERS) {
    await rebuildWeekFile(weekNum, false); // Advanced
    // await rebuildWeekFile(weekNum, true);  // Easy (if needed)
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ ALL WEEKS REBUILT SUCCESSFULLY!');
  console.log('='.repeat(60) + '\n');
  console.log('Next steps:');
  console.log('1. Review generated files in src/data/weeks/');
  console.log('2. Test in browser: npm run dev');
  console.log('3. Deploy: npm run build && npx wrangler pages deploy dist --project-name=enquest3k');
  console.log('');
}

main().catch(error => {
  console.error('\n❌ ERROR:', error);
  process.exit(1);
});
