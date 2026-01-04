/**
 * STORY MISSION TAB - REBUILT
 * Ms. Nova's Story Mission with proper personality
 * Uses StoryMissionEngine for state management
 */

import React, { useState, useEffect, useRef } from 'react';
import { BookText, Send, Mic, MicOff, RotateCcw, Sparkles } from 'lucide-react';
import { useTutorStore } from '../../../services/aiTutor/tutorStore';
import { speakText } from '../../../utils/AudioHelper';
import { StoryMissionEngine } from '../../../services/aiTutor/storyMissionEngine';
import { getMissionsForWeek } from '../../../data/storyMissions';
import { getHints } from '../../../services/aiTutor/hintEngine';

export default function StoryMissionTab({ weekData, recognitionRef }) {
  const {
    currentMission,
    missionProgress,
    messages,
    addMessage,
    updateMissionProgress,
    startMission,
    completeMission,
    updateVocabMastery,
    updateAvgSentenceLength
  } = useTutorStore();
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [scaffoldLevel, setScaffoldLevel] = useState(1);
  const [showSummary, setShowSummary] = useState(false);
  const [currentHints, setCurrentHints] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [engine, setEngine] = useState(null);
  const scrollRef = useRef(null);
  const bottomRef = useRef(null);
  const hintsKey = currentHints.join('|');
  
  const missions = getMissionsForWeek(weekData?.weekId || 1);
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length, currentQuestion, hintsKey]);

  const getLastQuestion = (messageList) => {
    for (let i = messageList.length - 1; i >= 0; i -= 1) {
      const msg = messageList[i];
      const text = typeof msg?.text === 'string' ? msg.text.trim() : '';
      if (msg?.role === 'ai' && text.endsWith('?')) {
        return text;
      }
    }
    return '';
  };

  const updateHintsForQuestion = (question, mission, studentContext) => {
    const trimmed = (question || '').trim();
    if (!trimmed) {
      setCurrentHints([]);
      setCurrentQuestion('');
      return;
    }
    const beatWithTask = { task: trimmed, aiPrompt: trimmed };
    const hints = getHints(mission, beatWithTask, studentContext);
    setCurrentHints(hints);
    setCurrentQuestion(trimmed);
  };

  const handleStartMission = async (mission) => {
    startMission(mission);
    const missionEngine = new StoryMissionEngine(mission, weekData);
    setEngine(missionEngine);
    const opening = await missionEngine.start();
    
    if (opening.story_beat) {
      addMessage({ role: 'ai', text: opening.story_beat });
    }
    if (opening.task) {
      addMessage({ role: 'ai', text: opening.task });
    }
    
    const openingMessages = [
      { role: 'ai', text: opening.story_beat },
      { role: 'ai', text: opening.task }
    ].filter(msg => msg.text);
    const openingQuestion = opening.task || getLastQuestion(openingMessages);
    updateHintsForQuestion(openingQuestion, mission, missionEngine.state.studentContext);
    
    const fullText = `${opening.story_beat || ''} ${opening.task || ''}`;
    if (opening.audioBlob) {
      const audioUrl = URL.createObjectURL(opening.audioBlob);
      await speakText(fullText, audioUrl);
      setTimeout(() => URL.revokeObjectURL(audioUrl), 5000);
    } else {
      await speakText(fullText);
    }
  };

  const handleSubmit = async (userText) => {
    if (loading || !engine) return;
    
    addMessage({ role: 'user', text: userText });
    setLoading(true);

    const response = await engine.generateTurn(userText);
    
    let fullResponseText = '';

    if (response.story_beat) {
      fullResponseText += response.story_beat;
    }

    if (response.task) {
      fullResponseText += (fullResponseText ? ' ' : '') + response.task;
    }

    const newMessages = [];
    if (response.story_beat) {
      newMessages.push({ role: 'ai', text: response.story_beat });
    }
    if (response.task) {
      newMessages.push({ role: 'ai', text: response.task });
    }

    if (newMessages.length > 0) {
      newMessages.forEach(msg => addMessage(msg));
    }
    
    if (fullResponseText) {
      if (response.audioBlob) {
        const audioUrl = URL.createObjectURL(response.audioBlob);
        await speakText(fullResponseText, audioUrl);
        setTimeout(() => URL.revokeObjectURL(audioUrl), 5000);
      } else {
        await speakText(fullResponseText);
      }
    }
    
    const question = response.task || getLastQuestion([...messages, ...newMessages]);
    updateHintsForQuestion(question, currentMission, engine.state.studentContext);
    
    if (response.isComplete) {
      const summary = engine.getSummary();
      completeMission(summary);
      addMessage({ role: 'system', text: `🎉 Mission Complete! You used: ${summary.vocabularyUsed.join(', ')}.` });
    }
    
    setLoading(false);
  };
  
  // UI Rendering remains largely the same
  if (!currentMission) {
    return (
      <div className="p-4">
        <div className="text-center py-6">
          <BookText size={48} className="mx-auto text-purple-600 opacity-50 mb-3"/>
          <p className="text-sm font-bold text-slate-700 mb-2">📖 Story Missions</p>
          <p className="text-xs text-slate-600 mb-4 px-4">Choose a mission. Ms. Nova will guide you!</p>
          <div className="space-y-2">
            {missions.map(m => (
              <button key={m.id} onClick={() => handleStartMission(m)} className="w-full p-4 bg-white border-2 border-purple-100 rounded-xl text-left hover:bg-purple-50 hover:border-purple-300 transition-all">
                <p className="text-sm font-bold text-slate-700">{m.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-3 flex justify-between items-center">
        <p className="text-xs font-black text-purple-600">{currentMission.title}</p>
        <button onClick={() => completeMission({})} className="text-purple-600 hover:text-purple-800"><RotateCcw size={16}/></button>
      </div>
      <div className="space-y-2 max-h-[350px] overflow-y-auto" ref={scrollRef}>
        {(() => {
          const normalizedQuestion = currentQuestion.trim();
          const lastQuestionIndex = normalizedQuestion
            ? messages.reduce(
                (acc, msg, idx) => {
                  const text = typeof msg?.text === 'string' ? msg.text.trim() : '';
                  return msg?.role === 'ai' && text === normalizedQuestion ? idx : acc;
                },
                -1
              )
            : -1;

          return messages.map((msg, i) => (
            <React.Fragment key={i}>
              <div className={`p-3 rounded-xl text-sm ${msg.role === 'ai' ? 'bg-purple-50' : 'bg-white'}`}>
                {msg.text}
              </div>
              {i === lastQuestionIndex && currentHints.length > 0 && (
                <div className="p-2 bg-green-50 border-2 border-green-200 rounded-xl">
                  <div className="flex flex-wrap gap-1">
                    {currentHints.map((h, idx) => (
                      <button
                        key={idx}
                        onClick={() => setInput(prev => prev + h + ' ')}
                        className="px-2 py-1 bg-white border rounded-lg text-xs"
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </React.Fragment>
          ));
        })()}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit(e.target.value)} disabled={loading} className="flex-1 p-2 border-2 rounded-lg" />
        <button onClick={() => handleSubmit(input)} disabled={loading || !input.trim()} className="p-2 bg-green-600 text-white rounded-lg"><Send size={18}/></button>
      </div>
    </div>
  );
}
