import React, { useState, useEffect, useRef } from 'react';
import { BookText, Send, RotateCcw, Sparkles } from 'lucide-react';
import { useTutorStore } from '../../../services/aiTutor/tutorStore';
import { StoryMissionEngine } from '../../../services/aiTutor/storyMissionEngine';
import { getMissionsForWeek } from '../../../data/storyMissions';
import { getHints } from '../../../services/aiTutor/hintEngine';
import { speakText } from '../../../utils/AudioHelper';

const MissionState = {
  SELECTING: 'SELECTING',
  AWAITING_USER_INPUT: 'AWAITING_USER_INPUT',
  PROCESSING_AI_RESPONSE: 'PROCESSING_AI_RESPONSE',
  DISPLAYING_BEAT: 'DISPLAYING_BEAT',
  ASKING_QUESTION: 'ASKING_QUESTION',
  COMPLETED: 'COMPLETED',
};

// LEGACY FILE - MOVED TO ARCHIVE
// This file is no longer used in V5 Premium
// See StoryMissionTab.jsx for current implementation

export default function StoryMissionV3() {
  return null;
}
  const { addMessage, clearMessages } = useTutorStore();
  const [missionState, setMissionState] = useState(MissionState.SELECTING);
  const [engine, setEngine] = useState(null);
  const [currentMission, setCurrentMission] = useState(null);
  const [messages, setMessages] = useState([]);
  const [hints, setHints] = useState([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  const missions = getMissionsForWeek(weekData?.weekId || 1);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleStartMission = async (mission) => {
    clearMessages();
    setMessages([]);
    setCurrentMission(mission);
    const missionEngine = new StoryMissionEngine(mission, weekData);
    setEngine(missionEngine);
    setMissionState(MissionState.PROCESSING_AI_RESPONSE);

    const opening = await missionEngine.start();
    await processResponse(opening);
  };
  
  const processResponse = async (response) => {
    // 1. Display Story Beat (Encouragement)
    setMissionState(MissionState.DISPLAYING_BEAT);
    if (response.story_beat) {
      const beatMsg = { role: 'ai', text: response.story_beat };
      setMessages(prev => [...prev, beatMsg]);
      await speakText(response.story_beat);
    }
    
    // 2. Display Task (The Question)
    await new Promise(resolve => setTimeout(resolve, 500)); // Natural pause
    setMissionState(MissionState.ASKING_QUESTION);
    if (response.task) {
      const taskMsg = { role: 'ai', text: response.task };
      setMessages(prev => [...prev, taskMsg]);
      await speakText(response.task);

      // 3. Generate perfectly synced hints
      const step = mission.beats?.[missionEngine.state.currentStep] || mission.steps?.[missionEngine.state.currentStep];
      const beatWithTask = { ...step, aiPrompt: response.task };
      const contextualHints = getHints(mission, beatWithTask, missionEngine.state.studentContext);
      setHints(contextualHints);
    }
    
    setMissionState(MissionState.AWAITING_USER_INPUT);
  };
  
  const handleSubmit = async () => {
    if (!input.trim() || missionState !== MissionState.AWAITING_USER_INPUT) return;
    
    const userText = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setHints([]);
    setMissionState(MissionState.PROCESSING_AI_RESPONSE);

    const response = await engine.generateTurn(userText);
    
    if (response.isComplete) {
      const summary = engine.getSummary();
      const summaryMsg = `🎉 Mission Complete! You used: ${summary.vocabularyUsed.join(', ')}. Great job, ${summary.studentContext.name}!`;
      setMessages(prev => [...prev, { role: 'system', text: summaryMsg }]);
      setMissionState(MissionState.COMPLETED);
    } else {
      await processResponse(response);
    }
  };

  const handleReset = () => {
    setMissionState(MissionState.SELECTING);
    setCurrentMission(null);
    setEngine(null);
    setMessages([]);
    setHints([]);
    clearMessages();
  };

  // UI Rendering
  if (missionState === MissionState.SELECTING) {
    return (
      <div className="space-y-3 p-4">
        <div className="text-center py-6">
          <BookText size={48} className="mx-auto text-purple-600 opacity-50 mb-3"/>
          <p className="text-sm font-bold text-slate-700 mb-2">📖 Story Missions</p>
          <p className="text-xs text-slate-600 mb-4 px-4">Choose a mission. Ms. Nova will guide you!</p>
          <div className="space-y-2">
            {missions.map(m => (
              <button key={m.id} onClick={() => handleStartMission(m)} className="w-full p-4 bg-white border-2 border-purple-100 rounded-xl text-left hover:bg-purple-50 hover:border-purple-300 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-700">{m.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{m.level} · {m.successCriteria.minTurns} turns</p>
                  </div>
                  <Sparkles size={20} className="text-purple-500"/>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-4">
      <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black text-purple-600">{currentMission.title}</p>
          </div>
          <button onClick={handleReset} className="text-xs text-purple-600 hover:text-purple-800"><RotateCcw size={16}/></button>
        </div>
      </div>
      
      <div className="space-y-2 max-h-[350px] overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`p-3 rounded-xl text-sm ${msg.role === 'system' ? 'bg-amber-50 border-2 border-amber-200 text-amber-700 text-xs' : msg.role === 'ai' ? 'bg-purple-50 border-2 border-purple-200 text-purple-900' : 'bg-white border-2 border-slate-200 text-slate-800'}`}>
            {msg.text}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      
      {hints.length > 0 && (
        <div className="p-2 bg-green-50 border-2 border-green-200 rounded-xl space-y-2">
          <p className="text-[10px] font-black text-green-600 mb-1">💡 Try using these words:</p>
          <div className="flex flex-wrap gap-1">
            {hints.map((hint, i) => (
              <button key={i} onClick={() => setInput(prev => prev + (prev ? ' ' : '') + hint)} className="px-2 py-1 bg-white border border-green-300 rounded-lg text-xs font-bold text-green-700 hover:bg-green-100">
                {hint}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} placeholder={missionState === MissionState.AWAITING_USER_INPUT ? "Type your answer..." : "..."} className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-lg text-sm focus:outline-none focus:border-purple-500" disabled={missionState !== MissionState.AWAITING_USER_INPUT}/>
        <button onClick={handleSubmit} disabled={missionState !== MissionState.AWAITING_USER_INPUT || !input.trim()} className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
          <Send size={18}/>
        </button>
      </div>
    </div>
  );
}
