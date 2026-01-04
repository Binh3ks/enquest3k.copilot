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
  const [engine, setEngine] = useState(null);
  const scrollRef = useRef(null);
  
  // Get missions dynamically based on weekId
  const missions = getMissionsForWeek(weekData?.weekId || 1);
  
  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle mission start
  const handleStartMission = async (mission) => {
    console.log('[StoryMission] Starting mission:', mission.title);
    startMission(mission);
    
    // Initialize engine
    const missionEngine = new StoryMissionEngine(mission, weekData);
    setEngine(missionEngine);
    
    try {
      // Get opening from engine
      const opening = await missionEngine.start();
      
      console.log('[StoryMission] Opening:', opening);
      
      // Add only story_beat message (task is part of it)
      addMessage({ role: 'ai', text: opening.story_beat });
      
      // Set hints
      setCurrentHints(opening.scaffold?.hints || []);
      
      // Play OpenAI TTS audio if available
      if (opening.audioBlob) {
        const audioUrl = URL.createObjectURL(opening.audioBlob);
        const audio = new Audio(audioUrl);
        audio.play().catch(err => console.warn('[StoryMission] Audio play failed:', err));
      } else {
        // Fallback to browser TTS
        speakText(opening.story_beat);
      }
      
    } catch (error) {
      console.error('[StoryMission] Failed to start:', error);
      // Fallback
      const fallbackText = mission.steps[0].aiPrompt;
      addMessage({ role: 'ai', text: fallbackText });
      speakText(fallbackText);
      setCurrentHints(mission.steps[0].hints || []);
    }
  };
  
  // Handle user input
  const handleSubmit = async () => {
    if (!input.trim() || loading || !engine) return;
    
    const userText = input.trim();
    const wordCount = userText.split(/\s+/).length;
    
    // Add user message
    addMessage({ role: 'user', text: userText });
    setInput('');
    setLoading(true);
    
    // Update progress
    updateMissionProgress({
      turnsCompleted: missionProgress.turnsCompleted + 1,
      userSentenceLengths: [...missionProgress.userSentenceLengths, wordCount]
    });
    updateAvgSentenceLength(wordCount);
    
    try {
      // Use engine to generate turn
      const response = await engine.generateTurn(userText);
      
      console.log('[StoryMission] Turn response:', response);
      
      // Check vocab usage
      const usedVocab = currentMission.targetVocabulary
        .filter(v => userText.toLowerCase().includes(v.word.toLowerCase()))
        .map(v => v.word);
      
      usedVocab.forEach(word => {
        updateVocabMastery(word, 10);
        if (!missionProgress.vocabUsed.includes(word)) {
          updateMissionProgress({
            vocabUsed: [...missionProgress.vocabUsed, word]
          });
        }
      });
      
      // Add AI response (recast is built into story_beat)
      let fullSpeech = '';
      
      if (response.story_beat) {
        addMessage({ role: 'ai', text: response.story_beat });
      }
      
      // Update hints
      setCurrentHints(response.scaffold?.hints || []);
      
      // Play OpenAI TTS audio if available
      if (response.audioBlob) {
        const audioUrl = URL.createObjectURL(response.audioBlob);
        const audio = new Audio(audioUrl);
        audio.play().catch(err => console.warn('[StoryMission] Audio play failed:', err));
      } else if (response.story_beat) {
        // Fallback to browser TTS
        speakText(response.story_beat);
      }
      
      // Update scaffold level if needed
      if (response.scaffold && scaffoldLevel < 4) {
        setScaffoldLevel(prev => Math.min(4, prev + 1));
      }
      
      // Check completion
      if (response.isComplete) {
        handleMissionComplete();
      }
      
    } catch (error) {
      console.error('[StoryMission] Error:', error);
      addMessage({ role: 'ai', text: "Let's try again. What do you want to say?" });
      setLoading(false);
    }
  };
  
  // Handle mission completion
  const handleMissionComplete = () => {
    const engineSummary = engine ? engine.getSummary() : null;
    
    const summary = engineSummary || {
      turnsCompleted: missionProgress.turnsCompleted,
      vocabularyUsed: missionProgress.vocabUsed,
      completionRate: 100
    };
    
    console.log('[StoryMission] Completion summary:', summary);
    
    completeMission(summary);
    setShowSummary(true);
    
    const vocabList = summary.vocabularyUsed || summary.vocabUsed || [];
    const summaryText = `🎉 Mission Complete!\n✔ Words used: ${vocabList.join(', ')}\n🌟 Turns: ${summary.turnsCompleted}\n📊 Completion: ${Math.round(summary.completionRate)}%\n👍 Keep practicing!`;
    addMessage({ role: 'system', text: summaryText });
    speakText("Mission complete! Great job!");
  };
  
  // Voice input (with auto-send)
  const toggleVoice = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      let capturedTranscript = '';
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('[StoryMission] Voice transcript:', transcript);
        capturedTranscript = transcript;
        setInput(transcript);
      };
      
      recognitionRef.current.onend = async () => {
        console.log('[StoryMission] Voice recognition ended');
        setIsListening(false);
        
        // Auto-send using captured transcript (avoid stale closure)
        if (capturedTranscript.trim() && !loading && engine) {
          console.log('[StoryMission] Auto-sending:', capturedTranscript);
          
          const userText = capturedTranscript.trim();
          const wordCount = userText.split(/\\s+/).length;
          
          // Add user message
          addMessage({ role: 'user', text: userText });
          setInput('');
          setLoading(true);
          
          // Update progress
          updateMissionProgress({
            turnsCompleted: missionProgress.turnsCompleted + 1,
            userSentenceLengths: [...missionProgress.userSentenceLengths, wordCount]
          });
          updateAvgSentenceLength(wordCount);
          
          try {
            // Use engine to generate turn
            const response = await engine.generateTurn(userText);
            
            console.log('[StoryMission] Turn response:', response);
            
            // Check vocab usage
            const usedVocab = currentMission.targetVocabulary
              .filter(v => userText.toLowerCase().includes(v.word.toLowerCase()))
              .map(v => v.word);
            
            usedVocab.forEach(word => {
              updateVocabMastery(word, 10);
              if (!missionProgress.vocabUsed.includes(word)) {
                updateMissionProgress({
                  vocabUsed: [...missionProgress.vocabUsed, word]
                });
              }
            });
            
            // Add AI response
            if (response.story_beat) {
              addMessage({ role: 'ai', text: response.story_beat });
            }
            
            // Update hints
            setCurrentHints(response.scaffold?.hints || []);
            
            // Play OpenAI TTS audio if available
            if (response.audioBlob) {
              const audioUrl = URL.createObjectURL(response.audioBlob);
              const audio = new Audio(audioUrl);
              audio.play().catch(err => console.warn('[StoryMission] Audio play failed:', err));
            } else if (response.story_beat) {
              speakText(response.story_beat);
            }
            
            // Update scaffold level
            if (response.scaffold && scaffoldLevel < 4) {
              setScaffoldLevel(prev => Math.min(4, prev + 1));
            }
            
            // Check completion
            if (response.isComplete) {
              handleMissionComplete();
            }
            
            setLoading(false);
            
          } catch (error) {
            console.error('[StoryMission] Error:', error);
            addMessage({ role: 'ai', text: "Let's try again. What do you want to say?" });
            setLoading(false);
          }
        }
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('[StoryMission] Voice recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.start();
      setIsListening(true);
    }
  };
  
  // Helper: Shuffle array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  // Apply scaffolding
  const applyScaffolding = (chips, level) => {
    if (!chips || chips.length === 0) return [];
    
    if (level <= 1) {
      return shuffleArray([...chips]);
    }
    
    if (level === 2) {
      const keyWordIndex = chips.findIndex(w => 
        w.length > 3 && !['your', 'my', 'the', 'a', 'is', 'are', 'in', 'on'].includes(w.toLowerCase())
      );
      if (keyWordIndex >= 0) {
        const modified = [...chips];
        modified[keyWordIndex] = '___';
        return modified;
      }
    }
    
    if (level === 3) {
      const modified = [...chips];
      let blanked = 0;
      for (let i = 0; i < modified.length && blanked < 2; i++) {
        const word = modified[i];
        if (word.length > 3 && !['your', 'my', 'the', 'a', 'is', 'are', 'in', 'on'].includes(word.toLowerCase())) {
          modified[i] = '___';
          blanked++;
        }
      }
      return modified;
    }
    
    return [];
  };
  
  const getCurrentHints = () => {
    return applyScaffolding(currentHints, scaffoldLevel);
  };
  
  // Render mission list
  if (!currentMission) {
    return (
      <div className="space-y-3">
        <div className="text-center py-6">
          <BookText size={48} className="mx-auto text-purple-600 opacity-50 mb-3"/>
          <p className="text-sm font-bold text-slate-700 mb-2">📖 Story Missions</p>
          <p className="text-xs text-slate-600 mb-4 px-4">Choose a mission. You must speak to complete it!</p>
          
          <div className="space-y-2">
            {missions.map(mission => (
              <button
                key={mission.id}
                onClick={() => handleStartMission(mission)}
                className="w-full p-4 bg-white border-2 border-purple-100 rounded-xl text-left hover:bg-purple-50 hover:border-purple-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-700">{mission.title}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {mission.level === 'easy' ? '⭐ Easy' : mission.level === 'normal' ? '⭐⭐ Normal' : '⭐⭐⭐ Challenge'}
                      {' · '}
                      {mission.successCriteria.minTurns} turns
                    </p>
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
  
  // Render mission in progress
  return (
    <div className="space-y-3">
      {/* Mission header */}
      <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black text-purple-600">{currentMission.title}</p>
            <p className="text-[10px] text-purple-700 mt-1">
              Turn {missionProgress.turnsCompleted + 1} · Words used: {missionProgress.vocabUsed.length}/{currentMission.successCriteria.mustUseWords.length}
            </p>
          </div>
          <button
            onClick={() => {
              completeMission({});
              setShowSummary(false);
              setEngine(null);
            }}
            className="text-xs text-purple-600 hover:text-purple-800"
          >
            <RotateCcw size={16}/>
          </button>
        </div>
      </div>
      
      {/* Messages */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl text-sm ${
              msg.role === 'system'
                ? 'bg-amber-50 border-2 border-amber-200 text-amber-700 text-xs'
                : msg.role === 'ai'
                ? 'bg-purple-50 border-2 border-purple-200 text-purple-900'
                : 'bg-white border-2 border-slate-200 text-slate-800'
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      
      {/* Scaffold hints */}
      {scaffoldLevel >= 1 && !showSummary && getCurrentHints().length > 0 && (
        <div className="p-2 bg-green-50 border-2 border-green-200 rounded-xl space-y-2">
          <p className="text-[10px] font-black text-green-600 mb-1">
            💡 Hints (Level {scaffoldLevel}):
          </p>
          <div className="flex flex-wrap gap-1">
            {getCurrentHints().map((hint, i) => (
              <button
                key={i}
                onClick={() => setInput(prev => prev + (prev ? ' ' : '') + hint)}
                className="px-2 py-1 bg-white border border-green-300 rounded-lg text-xs font-bold text-green-700 hover:bg-green-100"
              >
                {hint}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Input */}
      {!showSummary && (
        <div className="flex gap-2">
          <button
            onClick={toggleVoice}
            disabled={loading}
            className={`p-2 rounded-lg ${isListening ? 'bg-red-500' : 'bg-purple-600'} hover:opacity-90 transition-all`}
          >
            {isListening ? <MicOff size={20} className="text-white"/> : <Mic size={20} className="text-white"/>}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && handleSubmit()}
            placeholder={isListening ? '🎤 Listening...' : 'Type or speak your answer...'}
            className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
            disabled={loading}
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '...' : <Send size={18}/>}
          </button>
        </div>
      )}
    </div>
  );
}
