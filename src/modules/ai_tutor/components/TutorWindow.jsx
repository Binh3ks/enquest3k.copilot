import { BookOpen, MessageCircle, Mic, HelpCircle, MessageSquare, Minimize2, Maximize2 } from 'lucide-react';
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
    setWidgetSize(widgetSize === 'normal' ? 'large' : 'normal');
  };

  const windowClasses = widgetSize === 'large' 
    ? 'w-[95vw] h-[85vh] right-[2.5vw] bottom-[2.5vh]'
    : 'w-[400px] h-[600px] right-6 bottom-24';

  return (
    <div className={`
      fixed z-40 transition-all duration-300 shadow-2xl
      bg-white rounded-2xl overflow-hidden
      ${windowClasses}
    `}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              ✨
            </div>
            <div>
              <h3 className="font-bold text-lg">Ms. Nova</h3>
              <p className="text-xs text-white/80">Your AI English Coach</p>
            </div>
          </div>
          
          {/* Size Toggle */}
          <button
            onClick={toggleSize}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Toggle window size"
          >
            {widgetSize === 'normal' ? (
              <Maximize2 size={20} />
            ) : (
              <Minimize2 size={20} />
            )}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                  whitespace-nowrap transition-all duration-200
                  ${activeTab === tab.id 
                    ? 'bg-white text-purple-600 shadow-lg' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                  }
                `}
              >
                <Icon size={16} />
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="h-[calc(100%-140px)] overflow-hidden">
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
