/**
 * STORY MISSION TAB
 * Turn-by-turn learning roleplay
 * AI teacher forces student to produce language
 */

import React, { useState, useEffect, useRef } from 'react';
import { BookText, Send, Mic, MicOff, Volume2, RotateCcw, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { useTutorStore } from '../../../services/aiTutor/tutorStore';
import { runStoryMission } from '../../../services/aiTutor/tutorEngine';
import { getMissionsForWeek } from '../../../data/storyMissions';
import { speakText } from '../../../utils/AudioHelper';

export default function StoryMissionTab({ weekData, recognitionRef }) {
  const {
    context,
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
  const scrollRef = useRef(null);
  
  const missions = getMissionsForWeek(weekData?.weekId || 1);
  
  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle mission start
  const handleStartMission = (mission) => {
    startMission(mission);
    addMessage({ role: 'ai', text: mission.opener });
    speakText(mission.opener);
  };
  
  // Handle user input
  const handleSubmit = async () => {
    if (!input.trim() || loading) return;
    
    const userText = input.trim();
    const wordCount = userText.split(/\s+/).length;
    
    // Check minimum word requirement
    if (wordCount < (context?.constraints?.userMinWords || 3)) {
      addMessage({ 
        role: 'system', 
        text: `⚠️ Try to say a little more! (At least ${context?.constraints?.userMinWords} words)` 
      });
      return;
    }
    
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
      // Call AI engine
      const response = await runStoryMission(weekData, userText, {
        mission: currentMission,
        storyHistory: messages,
        scaffoldLevel
      });
      
      // Check vocab usage
      const usedVocab = currentMission.targetVocabulary
        .filter(v => userText.toLowerCase().includes(v.word.toLowerCase()))
        .map(v => v.word);
      
      usedVocab.forEach(word => {
        updateVocabMastery(word, 10); // +10 for correct usage
        if (!missionProgress.vocabUsed.includes(word)) {
          updateMissionProgress({
            vocabUsed: [...missionProgress.vocabUsed, word]
          });
        }
      });
      
      // Add AI response
      if (response.story_beat) {
        addMessage({ role: 'ai', text: response.story_beat });
        speakText(response.story_beat);
      }
      
      // Add task if present
      if (response.task) {
        addMessage({ role: 'system', text: `📝 ${response.task}` });
      }
      
      // Show scaffold if needed
      if (response.scaffold && scaffoldLevel < 4) {
        setScaffoldLevel(prev => Math.min(4, prev + 1));
      }
      
      // Check completion
      const requiredWordsUsed = currentMission.successCriteria.mustUseWords
        .every(word => missionProgress.vocabUsed.includes(word));
      
      if (missionProgress.turnsCompleted >= currentMission.successCriteria.minTurns && requiredWordsUsed) {
        handleMissionComplete();
      }
      
    } catch (error) {
      console.error('[StoryMission] Error:', error);
      addMessage({ role: 'ai', text: "Let's try again. What do you want to say?" });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle mission completion
  const handleMissionComplete = () => {
    const summary = {
      turnsCompleted: missionProgress.turnsCompleted,
      vocabUsed: missionProgress.vocabUsed,
      avgSentenceLength: Math.round(
        missionProgress.userSentenceLengths.reduce((a, b) => a + b, 0) / 
        missionProgress.userSentenceLengths.length
      ),
      scaffoldLevel: scaffoldLevel
    };
    
    completeMission(summary);
    setShowSummary(true);
    
    const summaryText = `🎉 Mission Complete!\n✔ Words used: ${summary.vocabUsed.join(', ')}\n🌟 Sentences: ${summary.turnsCompleted}\n👍 Keep practicing!`;
    addMessage({ role: 'system', text: summaryText });
    speakText("Mission complete! Great job!");
  };
  
  // Voice input
  const toggleVoice = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
      recognitionRef.current.start();
      setIsListening(true);
    }
  };
  
  // Get contextual hints for LAST AI question
  // Hints = suggested words to answer the question AI just asked
  const getCurrentHints = () => {
    if (!currentMission || !messages.length) return [];
    
    // Find last AI message (the question we need to answer)
    const lastAIMessage = [...messages].reverse().find(m => m.role === 'ai');
    if (!lastAIMessage) {
      // No AI message yet - show hints for opener
      return deriveHintsFromPrompt(currentMission.opener, currentMission);
    }
    
    // Derive hints from EXACT text of last AI message
    return deriveHintsFromPrompt(lastAIMessage.text, currentMission);
  };
  
  // Helper: Derive contextual hints from AI prompt text
  const deriveHintsFromPrompt = (promptText, mission) => {
    const prompt = promptText.toLowerCase();
    const vocab = mission.targetVocabulary || [];
    
    // INTENT 1: What is your name?
    if (prompt.includes('what is your name') || prompt.includes("what's your name")) {
      return ['My', 'name', 'is', context.learnerName || 'Alex'];
    }
    
    // INTENT 2: Are you a student? (Yes/No question about identity)
    if (prompt.includes('are you a student')) {
      return ['Yes', 'I', 'am', 'a', 'student'];
    }
    
    if (prompt.includes('are you')) {
      // Generic are you question
      return ['Yes', 'I', 'am'];
    }
    
    // INTENT 3: Where is your [object]? 
    if (prompt.includes('where is your') || prompt.includes('where is my')) {
      // Extract the object being asked about
      const whereMatch = prompt.match(/where is (?:your|my) (\w+)/);
      const askedObject = whereMatch ? whereMatch[1] : null;
      
      if (askedObject === 'backpack') {
        return ['My', 'backpack', 'is', 'in', 'my', 'classroom'];
      }
      if (askedObject === 'book') {
        return ['My', 'book', 'is', 'in', 'my', 'backpack'];
      }
      if (askedObject === 'notebook') {
        return ['My', 'notebook', 'is', 'in', 'my', 'bag'];
      }
      
      // Generic location answer
      const obj = askedObject || 'thing';
      return ['My', obj, 'is', 'in'];
    }
    
    // INTENT 4: Where are you?
    if (prompt.includes('where are you')) {
      return ['I', 'am', 'in', 'the', 'classroom'];
    }
    
    // INTENT 5: What is in your [object]?
    if (prompt.includes('what is in') || prompt.includes('what do you have')) {
      const objects = vocab.filter(v => 
        ['book', 'notebook', 'pen', 'pencil', 'ruler'].includes(v.word)
      ).map(v => v.word);
      
      if (objects.length >= 2) {
        return ['My', objects[0], 'and', objects[1], 'are', 'in'];
      }
      return ['I', 'have', 'my', objects[0] || 'book'];
    }
    
    // INTENT 6: Cannot find / Lost
    if (prompt.includes('cannot find') || prompt.includes("can't find") || prompt.includes('lost')) {
      // Extract what was lost
      const lostMatch = prompt.match(/(?:find|lost) (?:your|my) (\w+)/);
      const lostItem = lostMatch ? lostMatch[1] : 'backpack';
      return ['I', 'cannot', 'find', 'my', lostItem];
    }
    
    // INTENT 7: Tell me/Say [instruction]
    if (prompt.includes('tell') || prompt.includes('say')) {
      // AI is asking to repeat something - show the required phrase
      const sayMatch = prompt.match(/say:?\s*['"]([^'"]+)['"]/i);
      if (sayMatch) {
        return sayMatch[1].split(' ').slice(0, 7); // Split quoted phrase into chips
      }
    }
    
    // DEFAULT: Show core vocabulary as fallback
    const coreWords = vocab.slice(0, 5).map(v => v.word);
    return coreWords.length > 0 ? coreWords : ['I', 'am', 'a', 'student'];
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
      {scaffoldLevel >= 1 && !showSummary && (
        <div className="p-2 bg-green-50 border-2 border-green-200 rounded-xl">
          <p className="text-[10px] font-black text-green-600 mb-1">💡 Hints:</p>
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
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Type your sentence..."
            className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
            disabled={loading}
          />
          <button
            onClick={toggleVoice}
            className={`p-2 rounded-lg ${isListening ? 'bg-red-500' : 'bg-slate-200'} hover:opacity-80`}
          >
            {isListening ? <MicOff size={20} className="text-white"/> : <Mic size={20}/>}
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold text-sm hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? '...' : <Send size={18}/>}
          </button>
        </div>
      )}
    </div>
  );
}
