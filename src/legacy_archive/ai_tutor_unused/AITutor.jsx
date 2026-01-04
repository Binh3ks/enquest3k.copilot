import { useState, useEffect } from 'react';
import { Sparkles, BookOpen, MessageCircle, Mic, Brain, Users } from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';
import StoryMissionTab from './tabs/StoryMissionTab';
import FreeTalkTab from './tabs/FreeTalkTab';
import PronunciationTab from './tabs/PronunciationTab';
import QuizTab from './tabs/QuizTab';
import DebateTab from './tabs/DebateTab';

/**
 * AI Tutor V3 - Ms. Nova
 * Main orchestrator component for all AI learning modes
 */
const AITutor = () => {
  // Global state
  const { user, currentWeek } = useUserStore();
  
  // Local state
  const [activeTab, setActiveTab] = useState('story');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = {
      role: 'assistant',
      content: `Hi ${user?.name || 'there'}! I'm Ms. Nova, your AI English coach! 🌟\n\nI'm here to help you learn English in a fun way. What would you like to do today?`,
      timestamp: Date.now()
    };
    setMessages([welcomeMessage]);
  }, [user?.name]);

  // Tab definitions
  const tabs = [
    {
      id: 'story',
      label: 'Story Mission',
      icon: BookOpen,
      color: 'purple',
      description: 'Complete a story adventure'
    },
    {
      id: 'freetalk',
      label: 'Free Talk',
      icon: MessageCircle,
      color: 'blue',
      description: 'Chat about anything'
    },
    {
      id: 'pronunciation',
      label: 'Pronunciation',
      icon: Mic,
      color: 'green',
      description: 'Practice speaking'
    },
    {
      id: 'quiz',
      label: 'Quiz',
      icon: Brain,
      color: 'yellow',
      description: 'Test your knowledge'
    },
    {
      id: 'debate',
      label: 'Debate',
      icon: Users,
      color: 'red',
      description: 'Share your opinions'
    }
  ];

  // Handle tab change
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // No need to reset messages - each tab manages its own state
  };

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'story':
        return <StoryMissionTab />;
      
      case 'freetalk':
        return <FreeTalkTab />;
      
      case 'pronunciation':
        return <PronunciationTab />;
      
      case 'quiz':
        return <QuizTab />;
      
      case 'debate':
        return <DebateTab />;
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Sparkles className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Ms. Nova</h1>
            <p className="text-sm text-gray-500">Your AI English Coach</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">{user?.name || 'Student'}</p>
            <p className="text-xs text-gray-500">Week {currentWeek}</p>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm
                  transition-all duration-200 whitespace-nowrap
                  ${isActive 
                    ? `bg-${tab.color}-100 text-${tab.color}-700 shadow-sm` 
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
                style={{
                  backgroundColor: isActive ? `var(--${tab.color}-100, #f3e8ff)` : undefined,
                  color: isActive ? `var(--${tab.color}-700, #7c3aed)` : undefined
                }}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        {renderTabContent()}
      </main>

      {/* Footer Info */}
      <footer className="bg-white border-t border-gray-200 px-6 py-2">
        <p className="text-xs text-center text-gray-500">
          Ms. Nova V3 • Pedagogical AI System • Learn English with confidence! 🚀
        </p>
      </footer>
    </div>
  );
};

export default AITutor;
