import { useState, useEffect, useRef } from 'react';
import { Bot, X, BrainCircuit, MessageCircle, Volume2, Award, BookText, Sword } from 'lucide-react';

// Import Tab Components
import ChatTab from './tabs/ChatTab';
import PronunciationTab from './tabs/PronunciationTab';
import QuizTab from './tabs/QuizTab';
import NovaStoryTab from './tabs/NovaStoryTab';
import DebateTab from './tabs/DebateTab';

/**
 * AITutor - Main Container
 * Manages tab routing and shared state (Speech Recognition)
 *
 * REFACTORED: Reduced from 1306 lines to ~100 lines (92% reduction!)
 * Logic extracted to:
 * - ChatTab.jsx (Free Talk Mode)
 * - PronunciationTab.jsx
 * - QuizTab.jsx (Vocabulary, Math, Science)
 * - DebateTab.jsx
 * - NovaStoryTab.jsx (Story Mission)
 */
const AITutor = ({ weekData, isVi = false, learningMode = 'advanced' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');

  // Shared Speech Recognition (passed to child tabs)
  const recognitionRef = useRef(null);

  // Web Speech API setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
    }
  }, []);

  // Render
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center z-[100] border-4 border-white transition-all group hover:scale-110"
      >
        <Bot size={32} className="group-hover:rotate-12 transition-transform"/>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[440px] h-[720px] bg-white rounded-[40px] shadow-2xl flex flex-col z-[100] border-4 border-indigo-50 overflow-hidden animate-in slide-in-from-right duration-300">
      {/* HEADER */}
      <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <BrainCircuit size={24}/>
          <div className="font-black text-sm uppercase">Ms. Nova</div>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-700 p-1 rounded-lg transition-all">
          <X size={20}/>
        </button>
      </div>

      {/* TABS */}
      <div className="flex bg-indigo-50 p-2 gap-1 shrink-0 border-b border-indigo-200 overflow-x-auto">
        {[
          { id: 'chat', icon: MessageCircle, label: 'Talk' },
          { id: 'pronunciation', icon: Volume2, label: 'Pronunciation' },
          { id: 'quiz', icon: Award, label: 'Quiz' },
          { id: 'story', icon: BookText, label: 'Story' },
          { id: 'debate', icon: Sword, label: 'Debate' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center gap-1 py-2 px-2 rounded-lg text-[10px] font-black uppercase transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-indigo-600'
            }`}
          >
            <tab.icon size={12}/>
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT - Route to Tab Components */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' && <ChatTab weekData={weekData} recognitionRef={recognitionRef} />}
        {activeTab === 'pronunciation' && <PronunciationTab weekData={weekData} recognitionRef={recognitionRef} />}
        {activeTab === 'quiz' && <QuizTab weekData={weekData} recognitionRef={recognitionRef} />}
        {activeTab === 'story' && <NovaStoryTab weekData={weekData} recognitionRef={recognitionRef} />}
        {activeTab === 'debate' && <DebateTab weekData={weekData} recognitionRef={recognitionRef} />}
      </div>
    </div>
  );
};

export default AITutor;
