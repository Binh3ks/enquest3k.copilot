import React, { useState, useEffect } from 'react';
import StoryWriting from '../write_speak/StoryWriting';
import RetellRecorder from '../../components/zones/RetellRecorder';
import ScienceReportCreator from '../../components/cambridge/ScienceReportCreator';
import AIDebateMode from '../../components/cambridge/AIDebateMode';
import { PenTool, Mic, TestTube, MessageSquare, Trophy, Sparkles, AlertCircle } from 'lucide-react';
import { useStationProgress } from '../../hooks/useStationProgress';

export default function CreatorStudioZone({ data, weekNumber = 33 }) {
  const studioData = data?.creatorStudio || {};
  const [activeTab, setActiveTab] = useState('story_writer');
  const [studioXP, setStudioXP] = useState(0);

  // Hydrate story submission from persistent station progress (story_writing)
  const { savedData: storySavedData } = useStationProgress(weekNumber, 'story_writing');

  const [storySubmission, setStorySubmission] = useState(null);

  // Sync saved story progress to Broadcast Studio on mount / progress update
  useEffect(() => {
    if (storySavedData?.fields) {
      const { setting = '', action = '', problem = '', solution = '' } = storySavedData.fields;
      const podcastScenes = [
        {
          id: 1,
          narrative_function: 'setting',
          title: 'Scene 1: Setting (🔵 Where & When)',
          en: setting.trim() || '(Fill Part 1 Setting in Story Writer to see your script here)',
          radio_starters: ["Welcome back to Corridor Watch!", "Breaking news from the hallway!", "On a sunny Monday morning..."]
        },
        {
          id: 2,
          narrative_function: 'action',
          title: 'Scene 2: Action (🟢 What Was Happening)',
          en: action.trim() || '(Fill Part 2 Action in Story Writer to see your script here)',
          radio_starters: ["Right then and there...", "Let's find out what happened next...", "As students were moving..."]
        },
        {
          id: 3,
          narrative_function: 'problem',
          title: 'Scene 3: Problem (🟠 What Went Wrong)',
          en: problem.trim() || '(Fill Part 3 Problem in Story Writer to see your script here)',
          radio_starters: ["But then, listeners...", "Suddenly, everything changed...", "Unexpectedly..."]
        },
        {
          id: 4,
          narrative_function: 'solution',
          title: 'Scene 4: Solution (🟣 How It Was Fixed)',
          en: solution.trim() || '(Fill Part 4 Solution in Story Writer to see your script here)',
          radio_starters: ["And that's why we always...", "To sum it up...", "Fortunately..."]
        }
      ];
      setStorySubmission({ mode: 'structured', finalText: storySavedData.text || '', podcastScenes });
    } else if (storySavedData?.text) {
      const sentences = storySavedData.text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 10);
      const third = Math.ceil(sentences.length / 3);
      const podcastScenes = [
        { id: 1, narrative_function: null, title: 'Scene 1: Your Opening', en: sentences.slice(0, third).join(' ') || sentences[0] || storySavedData.text },
        { id: 2, narrative_function: null, title: 'Scene 2: Your Action Sequence', en: sentences.slice(third, third * 2).join(' ') || sentences[1] || '' },
        { id: 3, narrative_function: null, title: 'Scene 3: Your Conclusion', en: sentences.slice(third * 2).join(' ') || sentences[2] || '' }
      ].filter(s => s.en.trim().length > 0);
      setStorySubmission({ mode: 'freeform', finalText: storySavedData.text, podcastScenes });
    }
  }, [storySavedData]);

  const handleStoryComplete = (xpEarned = 50, finalText = '', extraData = null) => {
    if (xpEarned > 0) setStudioXP(prev => prev + xpEarned);

    if (extraData?.structured && extraData?.fields) {
      // Data Contract v2: 4 Structured Broadcast Scenes (1:1 with story fields)
      const { setting = '', action = '', problem = '', solution = '' } = extraData.fields;
      const podcastScenes = [
        {
          id: 1,
          narrative_function: 'setting',
          title: 'Scene 1: Setting (🔵 Where & When)',
          en: setting.trim() || '(Fill Part 1 Setting in Story Writer to see your script here)',
          radio_starters: ["Welcome back to Corridor Watch!", "Breaking news from the hallway!", "On a sunny Monday morning..."]
        },
        {
          id: 2,
          narrative_function: 'action',
          title: 'Scene 2: Action (🟢 What Was Happening)',
          en: action.trim() || '(Fill Part 2 Action in Story Writer to see your script here)',
          radio_starters: ["Right then and there...", "Let's find out what happened next...", "As students were moving..."]
        },
        {
          id: 3,
          narrative_function: 'problem',
          title: 'Scene 3: Problem (🟠 What Went Wrong)',
          en: problem.trim() || '(Fill Part 3 Problem in Story Writer to see your script here)',
          radio_starters: ["But then, listeners...", "Suddenly, everything changed...", "Unexpectedly..."]
        },
        {
          id: 4,
          narrative_function: 'solution',
          title: 'Scene 4: Solution (🟣 How It Was Fixed)',
          en: solution.trim() || '(Fill Part 4 Solution in Story Writer to see your script here)',
          radio_starters: ["And that's why we always...", "To sum it up...", "Fortunately..."]
        }
      ];

      setStorySubmission({ mode: 'structured', finalText, podcastScenes });
    } else if (finalText) {
      // Freeform Mode (Tier 3 or legacy v1 schema)
      const sentences = finalText
        .split(/(?<=[.!?])\s+/)
        .filter(s => s.trim().length > 10);

      const third = Math.ceil(sentences.length / 3);
      const podcastScenes = [
        {
          id: 1,
          narrative_function: null,
          title: 'Scene 1: Your Opening',
          en: sentences.slice(0, third).join(' ') || sentences[0] || finalText
        },
        {
          id: 2,
          narrative_function: null,
          title: 'Scene 2: Your Action Sequence',
          en: sentences.slice(third, third * 2).join(' ') || sentences[1] || ''
        },
        {
          id: 3,
          narrative_function: null,
          title: 'Scene 3: Your Conclusion',
          en: sentences.slice(third * 2).join(' ') || sentences[2] || ''
        }
      ].filter(scene => scene.en.trim().length > 0);

      setStorySubmission({ mode: 'freeform', finalText, podcastScenes });
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
          🎨 CREATOR STUDIO — Produce your story script, broadcast episode, science report or AI debate!
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
            🎙️ BROADCAST STUDIO
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
            onComplete={(xp, finalText, extraData) => handleStoryComplete(xp, finalText, extraData)}
            onReportProgress={(percent, finalText, extraData) => handleStoryComplete(0, finalText, extraData)}
            onGoToSpeak={() => setActiveTab('podcast_creator')}
          />
        )}

        {activeTab === 'podcast_creator' && (
          <div className="space-y-4">
            {/* Data Contract Banner: shows mode & story connection */}
            {storySubmission ? (
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 font-bold">
                <span className="text-emerald-600">✓</span>
                {storySubmission.mode === 'structured'
                  ? 'Broadcast Studio: 4 Structured Narrative Scenes loaded 1:1 from your Story Writer!'
                  : 'Broadcast Studio: Story script loaded from your Story Writer!'}
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 font-bold">
                <AlertCircle size={14} className="text-amber-600 shrink-0" />
                Tip: Write your story in Story Writer first — your 4-scene script will load here automatically!
              </div>
            )}
            <RetellRecorder
              scenes={storySubmission?.podcastScenes || studioData.podcastScenes || []}
              weekNumber={weekNumber}
              mode={storySubmission?.mode || 'standalone'}
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

