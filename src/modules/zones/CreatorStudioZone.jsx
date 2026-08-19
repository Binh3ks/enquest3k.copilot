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
      {/* Compact Slim Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-purple-500/40 shadow-md flex items-center justify-between flex-wrap gap-3">
        <div className="space-y-0.5">
          <span className="px-2.5 py-0.5 bg-purple-500/30 text-purple-200 border border-purple-400/40 rounded-full text-[10px] font-black uppercase tracking-wider">
            Zone 3 • Creator Studio
          </span>
          <h2 className="text-lg font-black text-amber-300">
            🎨 CREATOR STUDIO — EXPRESS YOUR CREATIVITY
          </h2>
        </div>
        <div className="px-3.5 py-1.5 bg-purple-500/20 text-purple-300 border border-purple-400/40 rounded-xl font-black text-xs flex items-center gap-1.5">
          <Trophy size={16} className="text-amber-400" />
          <span>+{studioXP} STUDIO XP</span>
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
