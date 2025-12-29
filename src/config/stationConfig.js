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

export const STATIONS = [
  { key: 'read_explore', icon: BookOpen, title_en: 'Read & Exp.', color: 'indigo' },
  { key: 'new_words', icon: Star, title_en: 'New Words', color: 'orange' }, 
  { key: 'word_match', icon: Target, title_en: 'Word Match', color: 'purple' },
  { key: 'grammar', icon: Hash, title_en: 'Grammar', color: 'rose' },
  { key: 'mindmap_speaking', icon: Cpu, title_en: 'Mindmap', color: 'indigo' },
  { key: 'ask_ai', icon: Cpu, title_en: 'Ask AI', color: 'emerald' },
  { key: 'dictation', icon: Mic, title_en: 'Dictation', color: 'cyan' },
  { key: 'shadowing', icon: Feather, title_en: 'Shadow', color: 'blue' },
  { key: 'writing', icon: Eye, title_en: 'Write/Video', color: 'pink' },
  { key: 'explore', icon: Compass, title_en: 'Explore', color: 'lime' },
  { key: 'logic_lab', icon: Zap, title_en: 'Logic Lab', color: 'violet' },
  { key: 'word_power', icon: Zap, title_en: 'Word Power', color: 'teal' },
  { key: 'daily_watch', icon: Youtube, title_en: 'Daily Watch', color: 'red' },
  { key: 'game_hub', icon: Gamepad2, title_en: 'Game Hub', color: 'amber' },
  { key: 'self_regulation', icon: Target, title_en: 'My Goals', color: 'sky' } 
];
