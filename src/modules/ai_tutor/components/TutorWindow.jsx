import { BookOpen, MessageCircle, Mic, HelpCircle, MessageSquare } from 'lucide-react';
import useTutorStore from '../../../services/ai_tutor/tutorStore';
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

  const tabs = [
    { id: 'story', label: 'Story', icon: BookOpen },
    { id: 'freetalk', label: 'Chat', icon: MessageCircle },
    { id: 'pronunciation', label: 'Speak', icon: Mic },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'debate', label: 'Debate', icon: MessageSquare }
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
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-6 text-white"> {/* Larger padding */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3"> {/* More gap */}
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl"> {/* Bigger avatar */}
              ✨
            </div>
            <div>
              <h3 className="font-bold text-2xl">Ms. Nova</h3> {/* Bigger title */}
              <p className="text-sm text-white/80">Your AI English Coach</p>
            </div>
          </div>
          

        </div>

        {/* Tab Navigation with more gap and margin */}
        <div className="flex gap-3 mt-6 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-3 px-6 py-3 rounded-xl font-semibold
                  whitespace-nowrap transition-all duration-200
                  ${activeTab === tab.id 
                    ? 'bg-white text-purple-600 shadow-lg transform scale-105' 
                    : 'bg-white/20 text-white hover:bg-white/30 hover:scale-102'
                  }
                `}
              >
                <Icon size={20} />
                <span className="text-base font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="h-[calc(100%-180px)] overflow-hidden"> {/* Adjusted for bigger header */}
        {activeTab === 'story' && <StoryMissionTab />}
        {activeTab === 'freetalk' && <FreeTalkTab />}
        {activeTab === 'pronunciation' && <PronunciationTab />}
        {activeTab === 'quiz' && <QuizTab />}
        {activeTab === 'debate' && <DebateTab />}
      </div>
    </div>
  );
};

export default TutorWindow;
