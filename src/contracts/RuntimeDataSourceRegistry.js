/**
 * EngQuest3K Runtime Data Source Registry
 * Central registry listing every active weekly data source consumed by runtime.
 * Ensures zero untracked data sources exist across the codebase.
 */

import fs from 'fs';
import path from 'path';

export const RUNTIME_DATA_SOURCE_TYPES = [
  { key: 'metadata', desc: 'Sidebar metadata titles in src/data/weeks/metadata.js', isGlobal: true },
  { key: 'index', desc: 'Main week export wrapper in src/data/weeks/week_XX/index.js' },
  { key: 'read', desc: 'Reading narrative text in src/data/weeks/week_XX/read.js' },
  { key: 'vocab', desc: 'Target vocabulary list in src/data/weeks/week_XX/vocab.js' },
  { key: 'explore', desc: 'Explore station content in src/data/weeks/week_XX/explore.js' },
  { key: 'grammar', desc: 'Grammar exercises in src/data/weeks/week_XX/grammar.js' },
  { key: 'logic_lab', desc: 'Logic lab activities in src/data/weeks/week_XX/logic_lab.js' },
  { key: 'writing', desc: 'Writing studio prompts & sentence frames in src/data/weeks/week_XX/writing.js' },
  { key: 'ask_ai', desc: 'Mascot AI dialogue cards in src/data/weeks/week_XX/ask_ai.js' },
  { key: 'dictation', desc: 'Listening dictation items in src/data/weeks/week_XX/dictation.js' },
  { key: 'shadowing', desc: 'Shadowing sentences in src/data/weeks/week_XX/shadowing.js' },
  { key: 'daily_watch', desc: 'Educational videos in src/data/weeks/week_XX/daily_watch.js' },
  { key: 'games', desc: 'Interactive minigames in src/data/weeks/week_XX/games.js' },
  { key: 'logic_science', desc: 'Logic science quiz in src/data/weeks/week_XX/logic_science.js' },
  { key: 'mindmap', desc: 'Speaking mindmap in src/data/weeks/week_XX/mindmap.js' },
  { key: 'shadowing_ipa', desc: 'Shadowing IPA items in src/data/weeks/week_XX/shadowing_ipa.js' },
  { key: 'singapore_math', desc: 'Singapore bar model math in src/data/weeks/week_XX/singapore_math.js' },
  { key: 'social_quiz', desc: 'Social studies quiz in src/data/weeks/week_XX/social_quiz.js' },
  { key: 'word_match', desc: 'Word match minigame in src/data/weeks/week_XX/word_match.js' },
  { key: 'word_power', desc: 'Word power activity in src/data/weeks/week_XX/word_power.js' },
  { key: 'flat_real', desc: 'Flat legacy schema export in src/data/weeks/week_XX_real.js' },
  { key: 'nested_real', desc: 'Nested legacy schema export in src/data/weeks/week_XX/week_XX_real.js' },
  { key: 'reading_hub', desc: 'Hub 1 wrapper in src/data/weeks/week_XX/reading_hub.js' },
  { key: 'listening_hub', desc: 'Hub 2 wrapper in src/data/weeks/week_XX/listening_hub.js' },
  { key: 'writing_hub', desc: 'Hub 3 wrapper in src/data/weeks/week_XX/writing_hub.js' },
  { key: 'speaking_hub', desc: 'Hub 4 wrapper in src/data/weeks/week_XX/speaking_hub.js' }
];

/**
 * Resolve absolute file paths for all registered runtime data sources for a week
 * @param {number} weekNum 
 * @returns {Array<{ key: string, name: string, filePath: string }>}
 */
export function getRegisteredDataSourcesForWeek(weekNum) {
  const root = process.cwd();
  const weekStr = weekNum < 10 ? `0${weekNum}` : `${weekNum}`;
  const weekDir = path.join(root, 'src', 'data', 'weeks', `week_${weekStr}`);

  const sources = [
    { key: 'metadata', name: `metadata.js (Week ${weekNum} entry)`, filePath: path.join(root, 'src', 'data', 'weeks', 'metadata.js') },
    { key: 'index', name: `week_${weekStr}/index.js`, filePath: path.join(weekDir, 'index.js') },
    { key: 'read', name: `week_${weekStr}/read.js`, filePath: path.join(weekDir, 'read.js') },
    { key: 'vocab', name: `week_${weekStr}/vocab.js`, filePath: path.join(weekDir, 'vocab.js') },
    { key: 'explore', name: `week_${weekStr}/explore.js`, filePath: path.join(weekDir, 'explore.js') },
    { key: 'grammar', name: `week_${weekStr}/grammar.js`, filePath: path.join(weekDir, 'grammar.js') },
    { key: 'logic_lab', name: `week_${weekStr}/logic_lab.js`, filePath: path.join(weekDir, 'logic_lab.js') },
    { key: 'writing', name: `week_${weekStr}/writing.js`, filePath: path.join(weekDir, 'writing.js') },
    { key: 'ask_ai', name: `week_${weekStr}/ask_ai.js`, filePath: path.join(weekDir, 'ask_ai.js') },
    { key: 'dictation', name: `week_${weekStr}/dictation.js`, filePath: path.join(weekDir, 'dictation.js') },
    { key: 'shadowing', name: `week_${weekStr}/shadowing.js`, filePath: path.join(weekDir, 'shadowing.js') },
    { key: 'daily_watch', name: `week_${weekStr}/daily_watch.js`, filePath: path.join(weekDir, 'daily_watch.js') },
    { key: 'games', name: `week_${weekStr}/games.js`, filePath: path.join(weekDir, 'games.js') },
    { key: 'logic_science', name: `week_${weekStr}/logic_science.js`, filePath: path.join(weekDir, 'logic_science.js') },
    { key: 'mindmap', name: `week_${weekStr}/mindmap.js`, filePath: path.join(weekDir, 'mindmap.js') },
    { key: 'shadowing_ipa', name: `week_${weekStr}/shadowing_ipa.js`, filePath: path.join(weekDir, 'shadowing_ipa.js') },
    { key: 'singapore_math', name: `week_${weekStr}/singapore_math.js`, filePath: path.join(weekDir, 'singapore_math.js') },
    { key: 'social_quiz', name: `week_${weekStr}/social_quiz.js`, filePath: path.join(weekDir, 'social_quiz.js') },
    { key: 'word_match', name: `week_${weekStr}/word_match.js`, filePath: path.join(weekDir, 'word_match.js') },
    { key: 'word_power', name: `week_${weekStr}/word_power.js`, filePath: path.join(weekDir, 'word_power.js') },
    { key: 'flat_real', name: `week_${weekStr}_real.js (flat)`, filePath: path.join(root, 'src', 'data', 'weeks', `week_${weekStr}_real.js`) },
    { key: 'nested_real', name: `week_${weekStr}/week_${weekStr}_real.js (nested)`, filePath: path.join(weekDir, `week_${weekStr}_real.js`) },
    { key: 'reading_hub', name: `week_${weekStr}/reading_hub.js`, filePath: path.join(weekDir, 'reading_hub.js') },
    { key: 'listening_hub', name: `week_${weekStr}/listening_hub.js`, filePath: path.join(weekDir, 'listening_hub.js') },
    { key: 'writing_hub', name: `week_${weekStr}/writing_hub.js`, filePath: path.join(weekDir, 'writing_hub.js') },
    { key: 'speaking_hub', name: `week_${weekStr}/speaking_hub.js`, filePath: path.join(weekDir, 'speaking_hub.js') }
  ];

  return sources.filter(s => fs.existsSync(s.filePath));
}

/**
 * Scan directory to detect any unregistered files in week data folders
 * @param {number} weekNum 
 * @returns {{ unregistered: string[] }}
 */
export function detectUnregisteredDataSources(weekNum) {
  const root = process.cwd();
  const weekStr = weekNum < 10 ? `0${weekNum}` : `${weekNum}`;
  const weekDir = path.join(root, 'src', 'data', 'weeks', `week_${weekStr}`);

  if (!fs.existsSync(weekDir)) return { unregistered: [] };

  const registeredBasenames = new Set(RUNTIME_DATA_SOURCE_TYPES.map(t => `${t.key}.js`).concat([`week_${weekStr}_real.js`, `index.js`, `reading_hub.js`, `listening_hub.js`, `writing_hub.js`, `speaking_hub.js`]));
  const actualFiles = fs.readdirSync(weekDir).filter(f => f.endsWith('.js') || f.endsWith('.jsx'));

  const unregistered = actualFiles.filter(f => !registeredBasenames.has(f));
  return { unregistered };
}

export default {
  RUNTIME_DATA_SOURCE_TYPES,
  getRegisteredDataSourcesForWeek,
  detectUnregisteredDataSources
};
