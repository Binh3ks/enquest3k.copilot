import { BookOpen, MessageCircle, Mic, HelpCircle, MessageSquare, X, Lock } from 'lucide-react';
import useTutorStore from '../../../services/ai_tutor/tutorStore';
import { useLocation } from 'react-router-dom';
import StoryMissionTab from '../tabs/StoryMissionTab';
import FreeTalkTab from '../tabs/FreeTalkTab';
import PronunciationTab from '../tabs/PronunciationTab';
import QuizTab from '../tabs/QuizTab';
import DebateTab from '../tabs/DebateTab';

/**
 * TutorWindow - Mini Dashboard for AI Tutor
 * Floating window with 5-tab navigation
 * Persists conversation state across page navigation
 */
const TutorWindow = () => {
  const { activeTab, setActiveTab, widgetSize, setWidgetSize } = useTutorStore();
  const location = useLocation();
  
  // 🔥 Parse week number from URL
  const weekNumber = parseInt(location.pathname.match(/\/week\/(\d+)/)?.[1] || '1');
  
  // 🔒 Debate unlocks at week 20
  const isDebateUnlocked = weekNumber >= 20;

  const tabs = [
    { id: 'story', label: 'Story', icon: BookOpen },
    { id: 'freetalk', label: 'Chat', icon: MessageCircle },
    { id: 'pronunciation', label: 'Speak', icon: Mic },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'debate', label: 'Debate', icon: MessageSquare, locked: !isDebateUnlocked, requireWeek: 20 }
  ];

  const toggleSize = () => {
    setWidgetSize(widgetSize === 'normal' || widgetSize === 'medium' ? 'large' : 'normal');
  };

  // 🔥 Always use large mode for better UX
  const isLargeMode = true; // Force large mode
  
  const windowClasses = isLargeMode
    ? 'w-[50vw] h-[100vh] right-0 top-0 text-xl fixed'
    : 'w-[480px] h-[720px] right-6 bottom-24 text-lg fixed';

  return (
    <div className={`
      z-40 transition-all duration-300 shadow-2xl
      bg-white rounded-2xl overflow-hidden border border-gray-200
      ${windowClasses}
    `}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-3 text-white relative">
        {/* Close Button - Top Right */}
        <button
          onClick={() => useTutorStore.getState().setWidgetOpen(false)}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
          aria-label="Close AI Tutor"
        >
          <X size={14} className="text-white" />
        </button>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">
              ✨
            </div>
            <div>
              <h3 className="font-bold text-base">Ms. Nova</h3>
              <p className="text-xs text-white/80">Your AI English Coach</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
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
                  whitespace-nowrap transition-all duration-200 relative
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
        </div>
      </div>

      {/* Content Area */}
      <div className="h-[calc(100%-110px)] overflow-hidden">
        {activeTab === 'story' && <StoryMissionTab />}
        {activeTab === 'freetalk' && <FreeTalkTab />}
        {activeTab === 'pronunciation' && <PronunciationTab />}
        {activeTab === 'quiz' && <QuizTab />}
        {activeTab === 'debate' && isDebateUnlocked && <DebateTab />}
        {activeTab === 'debate' && !isDebateUnlocked && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
            <Lock size={48} className="mb-4 text-gray-400" />
            <h3 className="text-lg font-bold mb-2">Debate Locked</h3>
            <p className="text-sm text-center">
              This feature unlocks at <span className="font-bold text-purple-600">Week 20</span>
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
