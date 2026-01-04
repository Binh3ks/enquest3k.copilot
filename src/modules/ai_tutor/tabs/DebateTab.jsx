import React, { useState, useRef, useEffect } from 'react';
import { Sword, Shuffle, Send, Mic, MicOff } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';
import { analyzeAnswer } from '../../../utils/smartCheck';
import { debateAI } from '../../../services/aiProviders';
import { week2TutorChecklist } from '../../../services/aiTutor/tutorPrompts';

/**
 * DebateTab - Structured debate practice
 */
const DebateTab = ({ weekData, recognitionRef }) => {
  const [debateTopic, setDebateTopic] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const scrollRef = useRef(null);

  const weekId = weekData?.weekId || 1;
  const weekInfo = { weekId };

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Generate debate topics
  const generateDebateTopics = () => {
    if (weekId < 15) return [];

    const topics = [];

    if (weekId === 9 || weekId === 10) {
      topics.push({ id: 1, topic: "City life is better than countryside", minTurns: 5 });
    }
    if (weekId >= 11 && weekId <= 14) {
      topics.push({ id: 2, topic: "Which community helper is most important?", minTurns: 5 });
    }

    if (weekId >= 15 && weekId <= 30) {
      topics.push(
        { id: 3, topic: "Is homework helpful or not?", minTurns: 5 },
        { id: 4, topic: "What's the best school subject?", minTurns: 5 }
      );
    }
    if (weekId >= 31 && weekId <= 80) {
      topics.push(
        { id: 5, topic: "Online learning vs classroom learning", minTurns: 8 },
        { id: 6, topic: "Should students have pets in classroom?", minTurns: 8 }
      );
    }
    if (weekId >= 81) {
      topics.push(
        { id: 7, topic: "Technology makes people less social", minTurns: 10 },
        { id: 8, topic: "Social media: helpful or harmful?", minTurns: 10 }
      );
    }

    return topics;
  };

  const debateTopics = generateDebateTopics();

  const startDebate = (topic) => {
    setDebateTopic(topic);
    const msg = `Let's debate: "${topic.topic}". Do you agree or disagree?`;
    setMessages([{ role: 'ai', text: msg }]);
    speakText("What's your opinion?");
  };

  const sendDebateMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;

    // SmartCheck grammar
    const checkResult = analyzeAnswer(userMsg, [], 'critical');
    if (checkResult.status === 'warning') {
      setMessages(prev => [...prev,
        { role: 'user', text: userMsg },
        { role: 'system', text: `⚠️ ${checkResult.message}` }
      ]);
    } else {
      setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    }
    setInput("");

    const turnNum = messages.filter(m => m.role === 'user').length + 1;

    try {
      const result = await debateAI(userMsg, {
        topic: debateTopic.topic,
        debateHistory: messages,
        weekInfo,
        weekId,
        turnNumber: turnNum
      });
      console.log(`[Debate] Provider: ${result.provider}`);

      speakText(result.text);

      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', text: result.text }]);
      }, 800);
    } catch (error) {
      console.error('Debate error:', error);
      setTimeout(() => {
        const fallback = turnNum <= 3
          ? "That's an interesting point. Can you explain more?"
          : "Great argument! You're thinking critically!";
        setMessages(prev => [...prev, { role: 'ai', text: fallback }]);
      }, 800);
    }
  };

  const toggleVoice = () => {
    if (!recognitionRef?.current) {
      alert('Speech recognition not supported. Try Chrome or Edge.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {weekId < 15 ? (
          <div className="text-center py-12">
            <Sword size={48} className="mx-auto text-slate-300 mb-3"/>
            <p className="text-sm font-bold text-slate-600 mb-2">🔒 Debate Locked</p>
            <p className="text-xs text-slate-500 px-6">Debates are available starting Week 15. Keep learning!</p>
          </div>
        ) : !debateTopic ? (
          <>
            <div className="text-center py-6">
              <Sword size={48} className="mx-auto text-rose-600 opacity-50 mb-3"/>
              <p className="text-sm font-bold text-slate-700 mb-4">Choose a Debate Topic</p>
              {debateTopics.slice(0, 4).map(topic => (
                <button
                  key={topic.id}
                  onClick={() => startDebate(topic)}
                  className="w-full p-3 mb-2 bg-white border-2 border-rose-100 rounded-xl text-xs font-bold text-slate-700 hover:bg-rose-50 transition-all text-left"
                >
                  <span className="block text-rose-600 text-[10px] uppercase font-black mb-1">Min {topic.minTurns} turns</span>
                  {topic.topic}
                </button>
              ))}
            </div>
            {weekId === 2 && (
              <div className="mt-4 bg-white p-3 rounded-lg border border-indigo-100 text-left text-xs text-slate-700">
                <p className="text-[11px] font-black text-indigo-600 uppercase">🎯 Week 2 Checklist</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {week2TutorChecklist.checklist.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
                <p className="text-[11px] font-black text-indigo-600 uppercase mt-3">💡 Tips</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {week2TutorChecklist.tips.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            )}
          </>
        ) : (
          <>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-[20px] text-sm font-bold shadow-sm ${m.role === 'user' ? 'bg-rose-600 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-rose-200'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            <button onClick={() => { setDebateTopic(null); setMessages([]); }} className="w-full p-2 text-xs font-bold text-slate-500 hover:text-rose-600 flex items-center justify-center gap-1">
              <Shuffle size={12}/>Change Topic
            </button>
            <div ref={scrollRef} />
          </>
        )}
      </div>

      {/* Input */}
      {debateTopic && (
        <div className="p-3 bg-white border-t flex gap-2 shrink-0">
          <button
            onClick={toggleVoice}
            className={`p-2.5 rounded-full transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-rose-100 hover:text-rose-600'}`}
          >
            {isListening ? <MicOff size={16}/> : <Mic size={16}/>}
          </button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendDebateMessage()}
            placeholder={isListening ? "Listening..." : "Type or speak..."}
            className="flex-1 p-2.5 bg-slate-50 border-2 border-slate-200 rounded-[15px] outline-none text-xs font-bold focus:border-rose-300"
            disabled={isListening}
          />
          <button
            onClick={sendDebateMessage}
            disabled={isListening}
            className="p-2.5 bg-rose-600 text-white rounded-full hover:bg-rose-700 disabled:opacity-50 transition-all"
          >
            <Send size={16}/>
          </button>
        </div>
      )}
    </div>
  );
};

export default DebateTab;
