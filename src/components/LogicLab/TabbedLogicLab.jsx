import { useState, useEffect, useCallback } from 'react';
import { Lightbulb, Calculator, Globe, ChevronRight } from 'lucide-react';
import LogicScienceDisplay from './LogicScienceDisplay';
import SingaporeMathDisplay from './SingaporeMathDisplay';
import SocialQuizDisplay from './SocialQuizDisplay';

/**
 * TabbedLogicLab - Triple Tab Component for W16+ Structure
 * 
 * Three tabs:
 * 1. Logic & Science (5 questions) - Critical thinking
 * 2. Singapore Math (5 questions) - Bar model problems
 * 3. Social Quiz (5 questions) - Geography/History MCQ
 * 
 * Total: 15 questions per week (5+5+5)
 */
const TabbedLogicLab = ({ weekNumber, weekData, learningMode = 'advanced' }) => {
  const [activeTab, setActiveTab] = useState('logic');
  const [progress, setProgress] = useState({
    logic: { completed: 0, total: 5 },
    singapore: { completed: 0, total: 5 },
    social: { completed: 0, total: 5 }
  });

  // Load progress from localStorage — always apply correct totals (5/5/5)
  useEffect(() => {
    const savedProgress = localStorage.getItem(`logic_lab_progress_w${weekNumber}`);
    if (savedProgress) {
      const saved = JSON.parse(savedProgress);
      setProgress({
        logic:     { completed: saved.logic?.completed     || 0, total: 5 },
        singapore: { completed: saved.singapore?.completed || 0, total: 5 },
        social:    { completed: saved.social?.completed    || 0, total: 5 },
      });
    }
  }, [weekNumber]);

  // Save progress - WRAPPED with useCallback to prevent infinite loop
  const updateProgress = useCallback((tab, completed) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        [tab]: { ...prev[tab], completed }
      };
      localStorage.setItem(`logic_lab_progress_w${weekNumber}`, JSON.stringify(newProgress));
      return newProgress;
    });
  }, [weekNumber]);

  // Memoized callbacks for each tab to prevent infinite loop from inline functions
  const handleLogicProgress = useCallback((completed) => updateProgress('logic', completed), [updateProgress]);
  const handleSingaporeProgress = useCallback((completed) => updateProgress('singapore', completed), [updateProgress]);
  const handleSocialProgress = useCallback((completed) => updateProgress('social', completed), [updateProgress]);

  const tabs = [
    {
      id: 'logic',
      label: 'Logic & Science',
      icon: Lightbulb,
      color: 'purple',
      badge: '5Q',
      description: 'Critical thinking puzzles'
    },
    {
      id: 'singapore',
      label: 'Singapore Math',
      icon: Calculator,
      color: 'blue',
      badge: '5Q',
      description: 'Bar model word problems'
    },
    {
      id: 'social',
      label: 'Social Quiz',
      icon: Globe,
      color: 'green',
      badge: '5Q',
      description: 'Geography & History'
    }
  ];

  const totalCompleted = progress.logic.completed + progress.singapore.completed + progress.social.completed;
  const totalQuestions = 15;
  const completionPercent = Math.round((totalCompleted / totalQuestions) * 100);

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Header with Progress */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Logic Lab</h2>
            <p className="text-sm text-gray-600">Week {weekNumber} • 3 Challenge Stations</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">{completionPercent}%</div>
            <div className="text-xs text-gray-500">{totalCompleted}/{totalQuestions} completed</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 h-2 transition-all duration-500"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex space-x-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const tabProgress = progress[tab.id];
            const isComplete = tabProgress.completed === tabProgress.total;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm
                  transition-all duration-200 relative
                  ${isActive
                    ? `bg-${tab.color}-100 text-${tab.color}-700 shadow-lg transform scale-105`
                    : `bg-gray-100 text-gray-600 hover:bg-gray-200`
                  }
                `}
                style={isActive ? { 
                  backgroundColor: `var(--${tab.color}-100)`,
                  color: `var(--${tab.color}-700)`,
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                } : {}}
              >
                <div className="flex items-center space-x-2">
                  <Icon size={18} />
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.badge}</span>
                </div>
                
                {/* Progress Badge */}
                <div className={`
                  flex items-center space-x-1 text-xs font-bold
                  ${isComplete ? 'text-green-600' : 'text-gray-500'}
                `}>
                  <span>{tabProgress.completed}/{tabProgress.total}</span>
                  {isComplete && <span className="text-green-500">✓</span>}
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Active Tab Description */}
        <div className="mt-2 text-xs text-gray-600 flex items-center space-x-2">
          <ChevronRight size={14} />
          <span>{tabs.find(t => t.id === activeTab)?.description}</span>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'logic' && (
          <LogicScienceDisplay
            weekNumber={weekNumber}
            questions={weekData?.logic_science?.questions || weekData?.logic_lab?.logic_lab?.questions || weekData?.logic_lab?.questions || []}
            onProgress={handleLogicProgress}
            learningMode={learningMode}
          />
        )}
        
        {activeTab === 'singapore' && (
          <SingaporeMathDisplay
            weekNumber={weekNumber}
            problems={weekData?.singapore_math?.problems || []}
            onProgress={handleSingaporeProgress}
            learningMode={learningMode}
          />
        )}
        
        {activeTab === 'social' && (
          <SocialQuizDisplay
            weekNumber={weekNumber}
            questions={weekData?.social_quiz?.questions || []}
            onProgress={handleSocialProgress}
            learningMode={learningMode}
          />
        )}
      </div>
    </div>
  );
};

export default TabbedLogicLab;
