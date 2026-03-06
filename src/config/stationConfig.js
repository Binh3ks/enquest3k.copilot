import { BookOpen, Star, Target, Hash, Cpu, Mic, Feather, Eye, Compass, Zap, Youtube, Gamepad2 } from 'lucide-react';
import ReadingExplore from '../modules/read/ReadingExplore';
import VocabManager from '../modules/vocab/VocabManager';
import WordMatch from '../modules/match/WordMatch';
import GrammarEngine from '../modules/grammar/GrammarEngine';
import MindMapSpeaking from '../modules/production/MindMapSpeaking';
import AskAi from '../modules/ask_ai/AskAi';
import DictationEngine from '../modules/dictation/DictationEngine';
import Shadowing from '../modules/shadowing/Shadowing';
import VideoChallenge from '../modules/video/VideoChallenge';
import Explore from '../modules/explore/Explore';
import LogicLab from '../modules/logic/LogicLab';
import WordPower from '../modules/power/WordPower';
import DailyWatch from '../modules/watch/DailyWatch';
import GameHub from '../modules/games/GameHub';
import SelfRegulation from '../modules/self_regulation/SelfRegulation';

export const MODULE_COMPONENTS = {
  read_explore: ReadingExplore, new_words: VocabManager, word_match: WordMatch,
  grammar: GrammarEngine, mindmap_speaking: MindMapSpeaking, ask_ai: AskAi, 
  dictation: DictationEngine, shadowing: Shadowing, writing: VideoChallenge, 
  explore: Explore, logic_lab: LogicLab, word_power: WordPower, 
  daily_watch: DailyWatch, game_hub: GameHub, self_regulation: SelfRegulation 
};

// 🔥 UNIVERSAL PROGRESS SYSTEM - Station ID Mapping
// Maps tab keys (URL) to station IDs (database)
export const TAB_TO_STATION_ID = {
  // Watch & Video
  'daily_watch': 'daily_watch',
  'writing': 'video_challenge',
  'video_challenge': 'video_challenge',
  
  // AI & Interactive
  'ask_ai': 'ask_ai',
  'explore': 'explore',
  
  // Games
  'word_match': 'game_word_match',
  'word_power': 'game_word_power',
  'logic_lab': 'game_logic',
  'game_hub': 'game_hub',
  
  // Skills
  'new_words': 'vocab_mastery',
  'grammar': 'grammar_lab',
  'dictation': 'skill_dictation',
  'read_explore': 'skill_reading',
  'mindmap_speaking': 'production_mindmap',
  'shadowing': 'skill_shadowing',
  'sentence_builder': 'sentence_builder',
  
  // Meta
  'review': 'review_session',
  'self_regulation': 'self_regulation'
};

export const STATIONS = [
  { key: 'read_explore', stationId: 'skill_reading', icon: BookOpen, title_en: 'Read & Exp.', color: 'indigo' },
  { key: 'new_words', stationId: 'vocab_mastery', icon: Star, title_en: 'New Words', color: 'orange' }, 
  { key: 'word_match', stationId: 'game_word_match', icon: Target, title_en: 'Word Match', color: 'purple' },
  { key: 'grammar', stationId: 'grammar_lab', icon: Hash, title_en: 'Grammar', color: 'rose' },
  { key: 'mindmap_speaking', stationId: 'production_mindmap', icon: Cpu, title_en: 'Mindmap', color: 'indigo' },
  { key: 'ask_ai', stationId: 'ask_ai', icon: Cpu, title_en: 'Ask AI', color: 'emerald' },
  { key: 'dictation', stationId: 'skill_dictation', icon: Mic, title_en: 'Dictation', color: 'cyan' },
  { key: 'shadowing', stationId: 'skill_shadowing', icon: Feather, title_en: 'Shadow', color: 'blue' },
  { key: 'sentence_builder', stationId: 'sentence_builder', icon: Feather, title_en: 'Sentence Builder', color: 'amber' },
  { key: 'writing', stationId: 'video_challenge', icon: Eye, title_en: 'Write/Video', color: 'pink' },
  { key: 'explore', stationId: 'explore', icon: Compass, title_en: 'Explore', color: 'lime' },
  { key: 'logic_lab', stationId: 'game_logic', icon: Zap, title_en: 'Logic Lab', color: 'violet' },
  { key: 'word_power', stationId: 'game_word_power', icon: Zap, title_en: 'Word Power', color: 'teal' },
  { key: 'daily_watch', stationId: 'daily_watch', icon: Youtube, title_en: 'Daily Watch', color: 'red' },
  { key: 'game_hub', stationId: 'game_hub', icon: Gamepad2, title_en: 'Game Hub', color: 'amber' },
  { key: 'self_regulation', stationId: 'self_regulation', icon: Target, title_en: 'My Goals', color: 'sky' } 
];

// Helper function to get station ID from tab key
export const getStationId = (tabKey) => {
  return TAB_TO_STATION_ID[tabKey] || tabKey;
};
