import React, { useState } from 'react';
import StoryWriting from '../write_speak/StoryWriting';
import RetellRecorder from '../../components/zones/RetellRecorder';
import ScienceReportCreator from '../../components/cambridge/ScienceReportCreator';
import AIDebateMode from '../../components/cambridge/AIDebateMode';
import { PenTool, Mic, TestTube, MessageSquare, Trophy, Sparkles, AlertCircle } from 'lucide-react';

export default function CreatorStudioZone({ data, weekNumber = 33 }) {
  const studioData = data?.creatorStudio || {};
  const [activeTab, setActiveTab] = useState('story_writer');
  const [studioXP, setStudioXP] = useState(0);

  // ─── Data Contract: Story Writer → Podcast Creator (mục 9.3) ───────────────
  // When student submits Story Writer, final_text is stored here and fed as
  // podcast script scenes to RetellRecorder (Podcast Creator).
  const [storySubmission, setStorySubmission] = useState(null);

  const handleStoryComplete = (xpEarned = 50, finalText = '') => {
    setStudioXP(prev => prev + xpEarned);
    if (finalText) {
      // Split story text into 3 scenes for Podcast Creator
      const sentences = finalText
        .split(/(?<=[.!?])\s+/)
        .filter(s => s.trim().length > 10);

      const third = Math.ceil(sentences.length / 3);
      const podcastScenes = [
        {
          id: 1,
          title: 'Scene 1: Your Opening',
          en: sentences.slice(0, third).join(' ') || sentences[0] || ''
        },
        {
          id: 2,
          title: 'Scene 2: Your Action Sequence',
          en: sentences.slice(third, third * 2).join(' ') || sentences[1] || ''
        },
        {
          id: 3,
          title: 'Scene 3: Your Conclusion',
          en: sentences.slice(third * 2).join(' ') || sentences[2] || ''
        }
      ].filter(scene => scene.en.trim().length > 0);

      setStorySubmission({ finalText, podcastScenes });
    }
  };

  const handleTaskComplete = (xpEarned = 50) => {
    setStudioXP(prev => prev + xpEarned);
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
            ✏️ STORY WRITER {storySubmission && <span className="ml-1 text-emerald-400">✓</span>}
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
            onComplete={(xp, finalText) => handleStoryComplete(xp, finalText)}
          />
        )}

        {activeTab === 'podcast_creator' && (
          <div className="space-y-4">
            {/* Data Contract Banner: shows when story has been written */}
            {storySubmission ? (
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 font-bold">
                <span className="text-emerald-600">✓</span>
                Story script loaded from your Story Writer! Narrate your own story below.
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 font-bold">
                <AlertCircle size={14} className="text-amber-600 shrink-0" />
                Tip: Write your story in Story Writer first — your script will load here automatically!
              </div>
            )}
            <RetellRecorder
              scenes={storySubmission?.podcastScenes || studioData.podcastScenes || []}
              weekNumber={weekNumber}
              onComplete={() => handleTaskComplete(50)}
            />
          </div>
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

