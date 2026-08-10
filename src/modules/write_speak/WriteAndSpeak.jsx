/**
 * WriteAndSpeak.jsx — Top-level wrapper for the Write & Speak Station.
 *
 * Roadmap Sub-tab Architecture:
 *  - Foundation Level (W01–W15): 2 Sub-tabs [Write -> Record Video]
 *  - Advanced Storytelling (W16+): 3 Sub-tabs [Model Challenge -> Story Writing -> Tell Your Story]
 *
 * Scaffolding & Kinesthetic Typing per ESL standards.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Video, Edit3, Mic, Type } from 'lucide-react';
import VideoChallenge from '../video/VideoChallenge';
import StoryWriting from './StoryWriting';
import TellYourStory from './TellYourStory';

const FOUNDATION_TABS = [
  { key: 'write',  label_en: 'Write',        label_vi: 'Viết câu',   icon: Type },
  { key: 'record', label_en: 'Record Video', label_vi: 'Quay video', icon: Video },
];

const ADVANCED_TABS = [
  { key: 'model', label_en: 'Model Challenge', label_vi: 'Thách thức câu mẫu', icon: Type },
  { key: 'story', label_en: 'Story Writing',   label_vi: 'Viết truyện',         icon: Edit3 },
  { key: 'speak', label_en: 'Tell Your Story', label_vi: 'Kể chuyện',           icon: Mic },
];

const WriteAndSpeak = ({ data, themeColor, isVi, onToggleLang, onReportProgress }) => {
  const { weekId } = useParams();
  const currentWeek = parseInt(weekId, 10) || 1;
  const isFoundation = currentWeek <= 15;

  const content = (data?.writing || data?.video) ? (data.writing || data.video) : data;
  const hasStoryPrompts = !!content?.story_prompts;

  // Determine tabs
  const visibleTabs = useMemo(() => {
    if (isFoundation || !hasStoryPrompts) return FOUNDATION_TABS;
    return ADVANCED_TABS;
  }, [isFoundation, hasStoryPrompts]);

  const [activeTab, setActiveTab] = useState(() => isFoundation ? 'write' : 'model');

  // Fallback if tab is invalid
  useEffect(() => {
    if (!visibleTabs.find(t => t.key === activeTab)) {
      setActiveTab(visibleTabs[0].key);
    }
  }, [visibleTabs, activeTab]);

  if (!content || (!content.title && !content.story_prompts && !content.hints && !data?.writing && !data?.video)) {
    return <div className="p-10 text-center text-slate-400 font-black italic">No content available for Write & Speak station.</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top tab bar */}
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
          className="ml-auto px-2.5 py-1 bg-white hover:bg-slate-50 rounded-lg text-[10px] font-bold border border-slate-200 shadow-sm text-slate-700"
        >
          {isVi ? 'VI' : 'EN'}
        </button>
      </div>

      {/* Sub-component render */}
      <div className="flex-1 min-h-0">
        {/* Foundation Level (W01-W15) */}
        {isFoundation ? (
          <VideoChallenge
            data={data}
            themeColor={themeColor}
            isVi={isVi}
            onToggleLang={onToggleLang}
            onReportProgress={onReportProgress}
            forcedTab={activeTab === 'record' ? 'record' : 'write'}
          />
        ) : (
          /* Advanced Storytelling (W16+) */
          <>
            {activeTab === 'model' && (
              <VideoChallenge
                data={data}
                themeColor={themeColor}
                isVi={isVi}
                onToggleLang={onToggleLang}
                onReportProgress={onReportProgress}
                forcedTab="write"
              />
            )}

            {activeTab === 'story' && (
              <StoryWriting
                content={content}
                themeColor={themeColor}
                isVi={isVi}
                onToggleLang={onToggleLang}
                onReportProgress={onReportProgress}
                onGoToSpeak={() => setActiveTab('speak')}
              />
            )}

            {activeTab === 'speak' && (
              <TellYourStory
                content={content}
                themeColor={themeColor}
                isVi={isVi}
                onToggleLang={onToggleLang}
                onReportProgress={onReportProgress}
                onGoToWriting={() => setActiveTab('story')}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WriteAndSpeak;
