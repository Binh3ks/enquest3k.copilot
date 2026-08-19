import React, { useState } from 'react';
import StoryWriting from '../write_speak/StoryWriting';
import RetellRecorder from '../../components/zones/RetellRecorder';
import ScienceReportCreator from '../../components/cambridge/ScienceReportCreator';
import AIDebateMode from '../../components/cambridge/AIDebateMode';
import { PenTool, Mic, TestTube, MessageSquare, Trophy, Sparkles } from 'lucide-react';

export default function CreatorStudioZone({ data, weekNumber = 33 }) {
  const studioData = data?.creatorStudio || {};
  const [activeTab, setActiveTab] = useState('story_writer');
  const [studioXP, setStudioXP] = useState(0);

  const handleTaskComplete = (xpEarned = 50) => {
    setTotalXP(prev => prev + xpEarned);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-5 animate-in fade-in duration-300 font-sans">
      {/* Slim Game Instruction Bar */}
      <div className="p-3 bg-purple-50 border border-purple-300 rounded-2xl flex items-center justify-between flex-wrap gap-2 text-xs">
        <span className="font-black text-purple-950 flex items-center gap-1.5">
          🎨 CREATOR STUDIO — Produce your story script, podcast, science report or AI debate!
        </span>
        <div className="px-3 py-1 bg-purple-600 text-white rounded-xl font-black text-xs shadow-sm flex items-center gap-1">
          <Trophy size={14} className="text-amber-300" />
          <span>+{studioXP} XP</span>
        </div>
      </div>

      {/* Vibrant Multi-Color Subtabs Selector */}
      <div className="w-full p-2 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
          <button
            type="button"
            onClick={() => setActiveTab('story_writer')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeTab === 'story_writer'
                ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300 scale-[1.02]'
                : 'bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100'
            }`}
          >
            ✏️ STORY WRITER
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('podcast_creator')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeTab === 'podcast_creator'
                ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-300 scale-[1.02]'
                : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            🎙️ PODCAST CREATOR
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('science_report')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeTab === 'science_report'
                ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300 scale-[1.02]'
                : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            🔬 SCIENCE REPORT
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ai_debate')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeTab === 'ai_debate'
                ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300 scale-[1.02]'
                : 'bg-indigo-50 text-indigo-900 border border-indigo-200 hover:bg-indigo-100'
            }`}
          >
            🎤 AI DEBATE
          </button>
        </div>
      </div>

      {/* Active Sub-Component */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-md min-h-[420px]">
        {activeTab === 'story_writer' && (
          <StoryWriting
            storyPrompts={studioData.storyPrompts}
            weekNumber={weekNumber}
            onComplete={() => handleTaskComplete(50)}
          />
        )}

        {activeTab === 'podcast_creator' && (
          <RetellRecorder
            storyText={studioData.podcastText}
            weekNumber={weekNumber}
            onComplete={() => handleTaskComplete(50)}
          />
        )}

        {activeTab === 'science_report' && (
          <ScienceReportCreator
            reportTopic={studioData.scienceTopic}
            weekNumber={weekNumber}
            onComplete={() => handleTaskComplete(50)}
          />
        )}

        {activeTab === 'ai_debate' && (
          <AIDebateMode
            debateTopics={studioData.debateTopics}
            weekNumber={weekNumber}
            onComplete={() => handleTaskComplete(60)}
          />
        )}
      </div>
    </div>
  );
}
