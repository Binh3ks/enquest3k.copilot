/**
 * WriteAndSpeak.jsx — Top-level wrapper for the writing/speaking station.
 *
 * Renders 3 tabs (when content supports it):
 *  - Video Challenge (W1-W42 blank-filling + recording)
 *  - Story Writing   (W16+ picture-prompt or topic-choice writing)
 *  - Tell Your Story (W16+ speaking with Viva Voce verification)
 *
 * W1-W15 hides Story Writing + Tell Your Story because their writing.js
 * has no `story_prompts` key. W36+ drops pictures for free-topic mode.
 *
 * Mirrors the AI Tutor pattern (one component, sub-tab routing) per the
 * design plan at /Users/binhnguyen/.claude/plans/refactored-bubbling-comet.md
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Video, Edit3, Mic, Type, Loader2 } from 'lucide-react';
import VideoChallenge from '../video/VideoChallenge';
import StoryWriting from './StoryWriting';
import TellYourStory from './TellYourStory';

const TABS = [
  { key: 'video',   label_en: 'Video Challenge', label_vi: 'Video Challenge', icon: Video },
  { key: 'story',   label_en: 'Story Writing',   label_vi: 'Viết truyện',     icon: Edit3 },
  { key: 'speak',   label_en: 'Tell Your Story', label_vi: 'Kể chuyện',       icon: Mic  },
];

const WriteAndSpeak = ({ data, themeColor, isVi, onToggleLang, onReportProgress }) => {
  // Pick the content block (same convention as VideoChallenge)
  const content = (data?.writing || data?.video) ? (data.writing || data.video) : data;
  const hasStoryPrompts = !!content?.story_prompts;
  const hasPictureMode = !!content?.story_prompts?.picture_mode;
  const hasTopicMode = !!content?.story_prompts?.topic_mode;

  // Tabs we will actually show
  const visibleTabs = useMemo(() => {
    if (!hasStoryPrompts) return [TABS[0]]; // W1-W15: only Video Challenge
    return TABS;
  }, [hasStoryPrompts]);

  // Default tab: video. If we don't have video content (e.g. W1-W15 with no story data),
  // we still default to video. Story writing flow requires user to navigate explicitly.
  const [activeTab, setActiveTab] = useState('video');

  // If we ever land on a hidden tab (e.g. saved lastTab from before this feature),
  // fall back to video.
  useEffect(() => {
    if (!visibleTabs.find(t => t.key === activeTab)) {
      setActiveTab('video');
    }
  }, [visibleTabs, activeTab]);

  if (!content || !content.title) {
    return <div className="p-10 text-center text-slate-400 font-black italic">No content.</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top tab bar — only render if more than one tab visible */}
      {visibleTabs.length > 1 && (
        <div className="flex-shrink-0 bg-slate-50 px-3 py-2 border-b border-slate-200 flex items-center gap-2 z-40 relative">
          <div className="flex bg-slate-200 p-1 rounded-xl flex-1 sm:flex-none">
            {visibleTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{isVi ? tab.label_vi : tab.label_en}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={onToggleLang}
            className="ml-auto px-2 py-1 bg-white rounded-lg text-[10px] font-bold border border-slate-200 shadow-sm"
          >
            {isVi ? 'VI' : 'EN'}
          </button>
        </div>
      )}

      {/* Sub-component render */}
      <div className="flex-1 min-h-0">
        {activeTab === 'video' && (
          <VideoChallenge
            data={data}
            themeColor={themeColor}
            isVi={isVi}
            onToggleLang={onToggleLang}
            onReportProgress={onReportProgress}
          />
        )}

        {activeTab === 'story' && hasStoryPrompts && (
          <StoryWriting
            content={content}
            themeColor={themeColor}
            isVi={isVi}
            onToggleLang={onToggleLang}
            onReportProgress={onReportProgress}
            onGoToSpeak={() => setActiveTab('speak')}
          />
        )}

        {activeTab === 'speak' && hasStoryPrompts && (
          <TellYourStory
            content={content}
            themeColor={themeColor}
            isVi={isVi}
            onToggleLang={onToggleLang}
            onReportProgress={onReportProgress}
            onGoToWriting={() => setActiveTab('story')}
          />
        )}
      </div>
    </div>
  );
};

export default WriteAndSpeak;
