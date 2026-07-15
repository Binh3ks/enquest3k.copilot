import { useState } from 'react';
import { Microscope, Globe, Lightbulb, CheckCircle } from 'lucide-react';

/**
 * TabbedExplore - Dual Tab Component for W16+ Explore Structure
 * 
 * Two tabs:
 * 1. STEM Activities - Science experiments & projects
 * 2. Social Activities - History/Geography exploration
 * 
 * Hands-on interactive learning activities
 */
const TabbedExplore = ({ weekNumber, weekData }) => {
  const [activeTab, setActiveTab] = useState('stem');
  const [completed, setCompleted] = useState({});

  const tabs = [
    {
      id: 'stem',
      label: 'STEM Activities',
      icon: Microscope,
      color: 'cyan',
      description: 'Science & Technology Projects'
    },
    {
      id: 'social',
      label: 'Social Activities',
      icon: Globe,
      color: 'amber',
      description: 'History & Geography'
    }
  ];

  const currentContent = activeTab === 'stem' ? weekData?.explore_stem : weekData?.explore_social;

  const handleComplete = (activityId) => {
    setCompleted(prev => ({
      ...prev,
      [activityId]: true
    }));
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-cyan-50 via-white to-amber-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Explore & Discover</h2>
            <p className="text-sm text-gray-600">Week {weekNumber} • Hands-On Activities</p>
          </div>
          <Lightbulb size={24} className="text-cyan-600" />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex space-x-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold
                  transition-all duration-200
                  ${isActive
                    ? `bg-${tab.color}-100 text-${tab.color}-700 shadow-lg transform scale-105`
                    : `bg-gray-100 text-gray-600 hover:bg-gray-200`
                  }
                `}
                style={isActive ? { 
                  backgroundColor: tab.id === 'stem' ? '#cffafe' : '#fef3c7',
                  color: tab.id === 'stem' ? '#0e7490' : '#92400e',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                } : {}}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        
        {/* Active Tab Description */}
        <div className="mt-2 text-xs text-gray-600">
          {tabs.find(t => t.id === activeTab)?.description}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {currentContent && currentContent.activities ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {currentContent.activities.map((activity, idx) => {
              const isCompleted = completed[activity.id];
              
              return (
                <div 
                  key={activity.id}
                  className={`bg-white rounded-xl shadow-lg p-6 border-2 ${
                    isCompleted ? 'border-green-400 bg-green-50' : activeTab === 'stem' ? 'border-cyan-200' : 'border-amber-200'
                  }`}
                >
                  {/* Activity Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-2xl font-bold ${
                        activeTab === 'stem' ? 'text-cyan-800' : 'text-amber-800'
                      }`}>
                        {activity.title_en}
                      </h3>
                      <p className="text-sm text-gray-600 italic">{activity.title_vi}</p>
                    </div>
                    {isCompleted && <CheckCircle size={32} className="text-green-600" />}
                  </div>

                  {/* Description */}
                  <p className="text-lg text-gray-700 mb-6">
                    {activity.description_en}
                  </p>

                  {/* Instructions */}
                  <div className={`p-4 rounded-lg mb-6 ${
                    activeTab === 'stem' ? 'bg-cyan-50' : 'bg-amber-50'
                  }`}>
                    <h4 className="font-bold text-lg mb-3">Instructions:</h4>
                    <ol className="space-y-2">
                      {activity.instructions_en.map((instruction, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="font-bold text-gray-600">{i + 1}.</span>
                          <span className="text-gray-700">{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Learning Goal */}
                  {activity.learning_goal_en && (
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded mb-6">
                      <h4 className="font-bold text-blue-900 mb-2">💡 What You'll Learn:</h4>
                      <p className="text-blue-800">{activity.learning_goal_en}</p>
                    </div>
                  )}

                  {/* Questions */}
                  {activity.questions && activity.questions.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-bold text-lg">Reflection Questions:</h4>
                      {activity.questions.map((q, i) => (
                        <div key={q.id} className="p-3 bg-gray-50 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-1">{q.question_en}</p>
                          <p className="text-sm text-gray-600">{q.question_vi}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Complete Button */}
                  {!isCompleted && (
                    <button
                      onClick={() => handleComplete(activity.id)}
                      className={`mt-6 w-full py-3 rounded-lg font-bold text-white shadow-lg transition-all ${
                        activeTab === 'stem' 
                          ? 'bg-cyan-600 hover:bg-cyan-700' 
                          : 'bg-amber-600 hover:bg-amber-700'
                      }`}
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Lightbulb size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">Loading activities...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabbedExplore;
