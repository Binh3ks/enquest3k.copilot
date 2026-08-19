import React, { useState } from 'react';
import RetellRecorder from '../../components/zones/RetellRecorder';
import AIDebateMode from '../../components/cambridge/AIDebateMode';
import StoryWriting from '../write_speak/StoryWriting';
import { PenTool, Mic, Radio, MessageSquare, Trophy, FileText, CheckCircle2, ChevronRight, Sparkles, Send } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';

export default function CreatorStudioZone({ data, weekNumber = 33 }) {
  const creatorData = data?.creatorStudio || {};
  const [activeStudio, setActiveStudio] = useState('story_writer'); // 'story_writer' | 'podcast_creator' | 'science_report' | 'ai_debate'
  
  // Science report state
  const [reportText, setReportText] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const pictureStory = creatorData.pictureStory || null;
  const wordBankPills = creatorData.wordBankPills || [];
  const storyScenes = creatorData.storyScenes || [];
  const debateTopics = creatorData.debateTopics || [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-purple-500/40 shadow-xl flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-1">
          <span className="px-3 py-1 bg-purple-500/30 text-purple-200 border border-purple-400/40 rounded-full text-[10px] font-black uppercase tracking-wider">
            Zone 3 • Creator Studio
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-amber-300">
            🎨 CREATOR STUDIO — EXPRESS YOUR CREATIVITY
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Personal Content Creation • 3-Panel Serial Stories, Personal Podcast Recording & Physics Science Reports!
          </p>
        </div>
      </div>

      {/* Studio Subtabs Selector */}
      <div className="w-full p-2 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
          <button
            type="button"
            onClick={() => setActiveStudio('story_writer')}
            className={`w-full py-3 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeStudio === 'story_writer'
                ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300 scale-[1.02]'
                : 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-50'
            }`}
          >
            ✏️ STORY WRITER
          </button>
          <button
            type="button"
            onClick={() => setActiveStudio('podcast_creator')}
            className={`w-full py-3 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeStudio === 'podcast_creator'
                ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300 scale-[1.02]'
                : 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-50'
            }`}
          >
            🎙️ PODCAST CREATOR
          </button>
          <button
            type="button"
            onClick={() => setActiveStudio('science_report')}
            className={`w-full py-3 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeStudio === 'science_report'
                ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300 scale-[1.02]'
                : 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-50'
            }`}
          >
            🔬 SCIENCE REPORT
          </button>
          <button
            type="button"
            onClick={() => setActiveStudio('ai_debate')}
            className={`w-full py-3 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 text-center truncate ${
              activeStudio === 'ai_debate'
                ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300 scale-[1.02]'
                : 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-50'
            }`}
          >
            🎤 AI DEBATE
          </button>
        </div>
      </div>

      {/* Active Studio Screen */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md min-h-[440px]">
        {/* 1. ✏️ STORY WRITER */}
        {activeStudio === 'story_writer' && (
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
                    "While Jake was walking down the corridor...",
                    "Suddenly, a boy running fast slipped on the wet floor...",
                    "The school nurse arrived quickly with a clean bandage..."
                  ],
                  writing_prompts: {
                    en: "Describe what happened in the 3 picture panels using past continuous and past simple verbs.",
                    vi: "Describe what happened in the 3 picture panels using past continuous and past simple verbs."
                  }
                }
              }
            }}
          />
        )}

        {/* 2. 🎙️ PODCAST CREATOR */}
        {activeStudio === 'podcast_creator' && (
          <RetellRecorder
            scenes={storyScenes}
          />
        )}

        {/* 3. 🔬 SCIENCE REPORT */}
        {activeStudio === 'science_report' && (
          <div className="space-y-6">
            <div className="p-5 bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-900 text-white rounded-2xl border border-teal-500/40 space-y-2">
              <span className="px-3 py-1 bg-teal-500/30 text-teal-200 border border-teal-400/40 rounded-full text-[10px] font-black uppercase">
                Academic Science Mini-Report CLIL
              </span>
              <h3 className="text-lg font-black text-amber-300 flex items-center gap-2">
                🔬 Science Task: Why is a wet floor more slippery than a dry floor?
              </h3>
              <p className="text-xs text-slate-300">
                Write 3–5 sentences explaining the physics of friction, lubricants and safety rules using cause-effect connectors (because, so, as a result).
              </p>
            </div>

            {/* Starter Pills for Fun & Easy Science Writing */}
            <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200 space-y-2">
              <span className="text-xs font-black uppercase text-teal-900 tracking-wider flex items-center gap-1">
                <Sparkles size={14} className="text-teal-600" /> Tap Sentence Block to Insert:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Water acts as a liquid lubricant on smooth tiles.",
                  "As a result, friction between shoe soles and floor drops to near zero.",
                  "Because friction is reduced, shoes slide easily and people fall.",
                  "Placing a warning sign instructs students to walk carefully."
                ].map((starter, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setReportText(prev => (prev ? `${prev} ${starter}` : starter))}
                    className="px-3 py-1.5 bg-white hover:bg-teal-100 border border-teal-300 text-teal-950 rounded-xl text-xs font-bold transition text-left shadow-sm"
                  >
                    + {starter}
                  </button>
                ))}
              </div>
            </div>

            {/* Writing Area */}
            <div className="space-y-3">
              <textarea
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                placeholder="Write your science report here..."
                rows={6}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 font-bold text-sm text-slate-900 outline-none transition"
              />

              <div className="flex items-center justify-between flex-wrap gap-3">
                <span className="text-xs font-bold text-slate-500">
                  Word count: <span className="font-black text-teal-600">{reportText.trim().split(/\s+/).filter(Boolean).length}</span> words
                </span>
                <button
                  type="button"
                  disabled={reportText.trim().length < 10}
                  onClick={() => setReportSubmitted(true)}
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white rounded-xl font-black text-xs shadow-md flex items-center gap-2 transition"
                >
                  <Send size={16} /> Submit Science Report
                </button>
              </div>

              {reportSubmitted && (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs font-bold flex items-center gap-3 animate-in fade-in">
                  <CheckCircle2 className="text-emerald-600 shrink-0" size={20} />
                  <div>
                    🎉 Science Report Submitted Successfully! You earned <span className="font-black text-emerald-700 text-sm">+25 CLIL Science XP</span> for explaining cause-and-effect physics!
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. 🎤 AI DEBATE */}
        {activeStudio === 'ai_debate' && (
          <AIDebateMode
            debateTopics={debateTopics}
            weekNumber={weekNumber}
          />
        )}
      </div>
    </div>
  );
}
