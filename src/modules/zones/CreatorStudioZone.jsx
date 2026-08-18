import React, { useState } from 'react';
import RetellRecorder from '../../components/zones/RetellRecorder';
import AIDebateMode from '../../components/cambridge/AIDebateMode';
import DictationEngine from '../dictation/DictationEngine';
import StoryWriting from '../write_speak/StoryWriting';
import { PenTool, Mic, Radio, MessageSquare, Trophy, FileText, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export default function CreatorStudioZone({ data, weekNumber = 33 }) {
  const creatorData = data?.creatorStudio || {};
  const [activeStudio, setActiveStudio] = useState('story_writing'); // 'story_writing' | 'retell_voice' | 'podcast' | 'ai_debate' | 'dictation'

  const pictureStory = creatorData.pictureStory || null;
  const wordBankPills = creatorData.wordBankPills || [];
  const storyScenes = creatorData.storyScenes || [];
  const debateTopics = creatorData.debateTopics || [];
  const podcastShadowing = creatorData.podcastShadowing || null;
  const dictationData = creatorData.dictation || [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-purple-500/40 shadow-xl flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-1">
          <span className="px-3 py-1 bg-purple-500/30 text-purple-200 border border-purple-400/40 rounded-full text-[10px] font-black uppercase tracking-wider">
            Zone 3 • Language Creator Studio
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-amber-300">
            🎨 3-Panel Story Writing, Voice Retelling & AI Debate
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Compose 3-picture stories, record scene retellings, shadow audio podcasts and debate corridor safety rules with Nova!
          </p>
        </div>
      </div>

      {/* Studio Subtabs Selector */}
      <div className="w-full p-2 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 w-full">
          <button
            type="button"
            onClick={() => setActiveStudio('story_writing')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeStudio === 'story_writing'
                ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300'
                : 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-50'
            }`}
          >
            ✍️ 3-Picture Story
          </button>
          <button
            type="button"
            onClick={() => setActiveStudio('retell_voice')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeStudio === 'retell_voice'
                ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300'
                : 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-50'
            }`}
          >
            🎙️ Voice Retelling
          </button>
          <button
            type="button"
            onClick={() => setActiveStudio('podcast')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeStudio === 'podcast'
                ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300'
                : 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-50'
            }`}
          >
            📻 Podcast Studio
          </button>
          <button
            type="button"
            onClick={() => setActiveStudio('ai_debate')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeStudio === 'ai_debate'
                ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300'
                : 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-50'
            }`}
          >
            🎤 AI Debate
          </button>
          <button
            type="button"
            onClick={() => setActiveStudio('dictation')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeStudio === 'dictation'
                ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300'
                : 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-50'
            }`}
          >
            🎧 Dictation Pad
          </button>
        </div>
      </div>

      {/* Active Studio Screen */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md min-h-[420px]">
        {activeStudio === 'story_writing' && (
          <StoryWriting
            weekId={weekNumber}
            content={{
              story_prompts: {
                picture_mode: {
                  type: "picture",
                  image_url: "/images/week33/writing_panel_1.png",
                  panels: pictureStory || [
                    { id: 1, image_url: "/images/week33/writing_panel_1.png", caption: "Panel 1: Running in corridor" },
                    { id: 2, image_url: "/images/week33/writing_panel_2.png", caption: "Panel 2: Slipping on wet floor" },
                    { id: 3, image_url: "/images/week33/writing_panel_3.png", caption: "Panel 3: Nurse applying bandage" }
                  ],
                  word_bank: (wordBankPills && Array.isArray(wordBankPills))
                    ? wordBankPills
                    : (wordBankPills?.action_verbs || ["corridor", "slipped", "fell", "nurse", "bandage"]),
                  sentence_frames: creatorData.sentenceFrames || [
                    "While a student was running in the corridor, he...",
                    "Suddenly, he slipped on the wet floor and...",
                    "Jake called the school nurse, who arrived with..."
                  ],
                  writing_prompts: {
                    en: "Describe what happened in the 3 picture panels using past continuous and past simple verbs.",
                    vi: "Mô tả điều xảy ra trong 3 bức tranh dùng động từ quá khứ tiếp diễn và quá khứ đơn."
                  }
                }
              }
            }}
          />
        )}

        {activeStudio === 'retell_voice' && (
          <RetellRecorder
            scenes={storyScenes}
          />
        )}

        {activeStudio === 'podcast' && podcastShadowing && (
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200">
              <h4 className="text-sm font-black text-purple-950">📻 Episode: {podcastShadowing.episode_title}</h4>
              <p className="text-xs text-purple-800 mt-1">{podcastShadowing.intro}</p>
            </div>
            {/* Audio Script Lines */}
            <div className="space-y-3">
              {podcastShadowing.script_lines?.map((line, lIdx) => (
                <div key={lIdx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-black uppercase text-purple-600">{line.speaker}</span>
                    <p className="text-sm font-bold text-slate-800">{line.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeStudio === 'ai_debate' && (
          <AIDebateMode
            debateTopics={debateTopics}
            weekNumber={weekNumber}
          />
        )}

        {activeStudio === 'dictation' && (
          <DictationEngine
            dictationData={dictationData}
            weekId={weekNumber}
          />
        )}
      </div>
    </div>
  );
}
