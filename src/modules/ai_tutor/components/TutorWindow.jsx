import { BookOpen, MessageCircle, Mic, MessageSquare, X, Lock } from 'lucide-react';
import { useState } from 'react';
import useTutorStore from '../../../services/ai_tutor/tutorStore';
import { useLocation } from 'react-router-dom';
import StoryMissionTab from '../tabs/StoryMissionTab';
import FreeTalkTab from '../tabs/FreeTalkTab';
import PronunciationTab from '../tabs/PronunciationTab';
import DebateTab from '../tabs/DebateTab';

/**
 * TutorWindow - Mini Dashboard for AI Tutor
 * Floating window with 4-tab navigation (Production-Oriented)
 * Persists conversation state across page navigation
 */
const TutorWindow = () => {
  const { activeTab, setActiveTab, widgetSize, setWidgetSize } = useTutorStore();
  const location = useLocation();
  
  // 🔥 Parse week number from URL
  const weekNumber = parseInt(location.pathname.match(/\/week\/(\d+)/)?.[1] || '1');
  
  // 🔒 Debate unlocks at week 40 (Phase 1 ending)
  const isDebateUnlocked = weekNumber >= 40;

  const tabs = [
    { id: 'story', label: 'Story', icon: BookOpen },
    { id: 'freetalk', label: 'Chat', icon: MessageCircle },
    { id: 'pronunciation', label: 'Speak', icon: Mic },
    { id: 'debate', label: 'Debate', icon: MessageSquare, locked: !isDebateUnlocked, requireWeek: 40 }
  ];

  const toggleSize = () => {
    setWidgetSize(widgetSize === 'normal' || widgetSize === 'medium' ? 'large' : 'normal');
  };

  // 🔥 Inline flex layout — no fixed positioning needed (rendered inside MainLayout flex)

  return (
    <div className="flex-1 h-screen flex flex-col bg-white overflow-hidden border-l border-gray-200 shadow-2xl z-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-3 text-white">
        {/* Tab Navigation + Close button in same row */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide items-center">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isLocked = tab.locked;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => !isLocked && setActiveTab(tab.id)}
                disabled={isLocked}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs
                  whitespace-nowrap transition-all duration-200 relative flex-shrink-0
                  ${isLocked
                    ? 'bg-white/10 text-white/50 cursor-not-allowed'
                    : isActive
                      ? 'bg-white text-purple-600 shadow-md transform scale-105' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }
                `}
                title={isLocked ? `Unlocks at Week ${tab.requireWeek}` : ''}
              >
                {isLocked ? <Lock size={14} /> : <Icon size={14} />}
                <span>{tab.label}</span>
              </button>
            );
          })}
          {/* Close button — always at end of tab row */}
          <button
            onClick={() => useTutorStore.getState().setWidgetOpen(false)}
            className="ml-auto flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white text-purple-600 hover:bg-purple-50 text-xs font-bold shadow-sm transition-all"
            aria-label="Close AI Tutor"
          >
            <X size={14} />
            <span>Đóng</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'story' && <StoryMissionTab />}
        {activeTab === 'freetalk' && <FreeTalkTab />}
        {activeTab === 'pronunciation' && <PronunciationTab />}
        {activeTab === 'debate' && isDebateUnlocked && <DebateTab />}
        {activeTab === 'debate' && !isDebateUnlocked && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
            <Lock size={48} className="mb-4 text-gray-400" />
            <h3 className="text-lg font-bold mb-2">Debate Locked</h3>
            <p className="text-sm text-center">
              This feature unlocks at <span className="font-bold text-purple-600">Week 40</span>
            </p>
            <p className="text-xs text-center mt-2">
              Keep learning! You're currently on Week {weekNumber}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorWindow;
