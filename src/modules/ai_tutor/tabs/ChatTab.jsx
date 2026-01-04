import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Sparkles, Volume2 } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';
import { generateTTSWithCache } from '../../../services/tts';
import { chatAI } from '../../../services/aiProviders';

/**
 * ChatTab - Free Talk Mode (Ms. Nova Off-Duty)
 * Connection over Correction
 */
const ChatTab = ({ weekData, recognitionRef }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const scrollRef = useRef(null);
  const messageHistoryRef = useRef([]);

  const weekId = weekData?.weekId || 1;
  const weekTitle = weekData?.weekTitle_en || "English Learning";
  const vocabList = weekData?.stations?.new_words?.vocab || [];
  const weekInfo = { weekId, weekTitle }; // Simplified

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-start Free Talk on mount
  useEffect(() => {
    if (messages.length === 0) {
      startFreeTalk();
    }
  }, []);

  // FREE TALK HANDLERS
  const startFreeTalk = () => {
    const getFreeTalkOpening = () => {
      const baseGreetings = [
        "Hello! 👋 I am happy to see you! How are you today?",
        "Hi! 😊 I feel great today! How do you feel?",
        "Hey! 🌟 I like talking with you! How are you?"
      ];

      // Add week-aware flavor
      if (weekId === 1) {
        return "Hey! 👋 You start school! How do you feel about it?";
      } else if (weekId === 2 && vocabList.some(v => ['family', 'mother', 'father'].includes(v.word?.toLowerCase()))) {
        return "Hi! 🌟 Tell me about your family! Do you have brothers or sisters?";
      }

      return baseGreetings[Math.floor(Math.random() * baseGreetings.length)];
    };

    const startMsg = getFreeTalkOpening();
    const startMood = deriveMood(startMsg);
    const startHints = ["I am happy!", "I am tired.", "I am hungry."];

    messageHistoryRef.current = [];
    setMessages([{ role: 'ai', text: startMsg, mood: startMood, hints: startHints }]);
    messageHistoryRef.current.push({ role: 'assistant', content: startMsg });

    speakText(startMsg);
  };

  // Derive mood emoji from text
  const deriveMood = (text) => {
    const lower = text?.toLowerCase() || '';
    if (lower.includes('wow') || lower.includes('amazing') || lower.includes('great')) return '🤩';
    if (lower.includes('fun') || lower.includes('cool')) return '😎';
    if (lower.includes('sorry') || lower.includes('oh no')) return '🥺';
    if (lower.includes('haha') || lower.includes('funny')) return '😂';
    if (lower.includes('love') || lower.includes('like')) return '😊';
    return '🙂';
  };

  // Create hint chips
  const createHints = (responseText) => {
    const lower = (responseText || '').toLowerCase();

    if (lower.includes('how are you') || lower.includes('how do you feel')) {
      return ['💡 I am happy!', '💡 I am tired.', '💡 I am good.'];
    }
    if (lower.includes('school')) {
      if (lower.includes('good or bad')) return ['💡 Good!', '💡 Bad.'];
      if (lower.includes('desk or playground')) return ['💡 I like desk.', '💡 I like playground.'];
      return ['💡 My school is good.', '💡 I like my class.'];
    }
    if (lower.includes('mom') || lower.includes('dad')) {
      return ['💡 My mom.', '💡 My dad.', '💡 My family.'];
    }
    if (lower.includes('brother') || lower.includes('sister')) {
      return ['💡 Yes, I have!', '💡 No, I don\'t.'];
    }
    if (lower.includes('pizza') || lower.includes('burger')) {
      return ['💡 Pizza!', '💡 Burgers!'];
    }
    if (lower.includes('play') || lower.includes('game')) {
      return ['💡 Football!', '💡 Basketball!', '💡 Hide and seek!'];
    }

    return ['💡 Yes!', '💡 No!', '💡 Tell me more!'];
  };

  const playOnlineTTS = async (text) => {
    try {
      const audioBlob = await generateTTSWithCache(text, { voice: 'shimmer', speed: 1.0 });
      if (!audioBlob) return false;
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      await audio.play();
      audio.onended = () => URL.revokeObjectURL(audioUrl);
      audio.onerror = () => URL.revokeObjectURL(audioUrl);
      return true;
    } catch (e) {
      console.warn('[Free Talk] Online TTS failed:', e);
      return false;
    }
  };

  const limitWords = (text, maxWords = 12) => {
    const parts = (text || '').split(/\s+/).filter(Boolean);
    if (parts.length <= maxWords) return parts.join(' ');
    return parts.slice(0, maxWords).join(' ');
  };

  const handleSendChat = async (overrideText = null) => {
    const raw = overrideText ?? input;
    const userMsg = (raw ?? '').toString().trim();
    if (!userMsg || loading) return;

    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    setLoading(true);

    messageHistoryRef.current.push({ role: 'user', content: userMsg });

    try {
      const result = await chatAI(userMsg, {
        conversationHistory: messageHistoryRef.current,
        mode: 'free_talk',
        weekInfo,
        vocabList,
        weekId,
        weekTitle,
        temperature: 0.75
      });
      console.log(`[Free Talk] Provider: ${result.provider}, Time: ${result.duration}ms`);

      const aiText = limitWords(result.text || '', 12);
      const aiMood = result.mood || deriveMood(aiText);
      const aiHints = result.hints || createHints(aiText);

      setMessages(prev => [...prev, { role: 'ai', text: aiText, provider: result.provider, mood: aiMood, hints: aiHints }]);
      messageHistoryRef.current.push({ role: 'assistant', content: aiText });

      const ttsOk = await playOnlineTTS(aiText);
      if (!ttsOk) speakText(aiText);
    } catch (error) {
      console.error('Free Talk error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble. Can you try again?" }]);
    } finally {
      setLoading(false);
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
        setIsListening(false);
        handleSendChat(transcript);
      };
      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Empty State */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 px-6 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4 ring-4 ring-indigo-50">
              <Sparkles className="text-indigo-600" size={40}/>
            </div>
            <p className="text-sm font-black text-slate-800">Hi! I'm Ms. Nova!</p>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              I'm your witty and patient ESL tutor. Let's chat!
            </p>
          </div>
        )}

        {/* Chat Stream */}
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col w-full mb-4 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] px-5 py-4 rounded-3xl text-base md:text-lg font-bold shadow-sm relative group transition-all ${
              m.role === 'user'
                ? 'bg-indigo-600 text-white rounded-br-none'
                : 'bg-white text-slate-700 border border-indigo-100 rounded-bl-none'
            }`}>
              {m.role === 'ai' && m.mood && (
                <div className="absolute -top-4 -left-2 text-3xl drop-shadow-md">
                  {m.mood}
                </div>
              )}
              <div className="mt-1">{m.text}</div>

              {m.role === 'ai' && (
                <button
                  onClick={() => speakText(m.text)}
                  className="absolute -bottom-7 left-2 text-slate-400 hover:text-indigo-600 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Volume2 size={14} />
                </button>
              )}
            </div>

            {/* Reply Chips */}
            {m.role === 'ai' && i === messages.length - 1 && Array.isArray(m.hints) && m.hints.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2 ml-2">
                {m.hints.map((hint, hIdx) => (
                  <button
                    key={hIdx}
                    onClick={() => handleSendChat(hint)}
                    className="bg-white border-2 border-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-xs md:text-sm font-bold shadow-sm hover:bg-indigo-50 hover:border-indigo-300 transition-all active:scale-95"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div className="flex justify-start w-full mb-4">
            <div className="bg-white px-4 py-3 rounded-3xl rounded-bl-none shadow-sm border border-indigo-100 flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase mr-1">Nova is typing</span>
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleVoice}
            className={`p-4 rounded-full shadow-lg transition-all duration-300 border-4 border-white ${
              isListening
                ? 'bg-red-500 text-white scale-110 shadow-red-200 animate-pulse'
                : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
            }`}
          >
            {isListening ? <MicOff size={24}/> : <Mic size={24}/>}
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
              placeholder={isListening ? "Listening..." : "Say something..."}
              disabled={isListening}
              className="w-full bg-slate-100 text-slate-700 rounded-full px-5 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all font-bold text-sm disabled:opacity-50"
            />
            <button
              onClick={() => handleSendChat()}
              disabled={!input.trim() || loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Send size={16}/>
            </button>
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 mt-2">
          Try saying: "I'm happy today!" or "Tell me a joke"
        </p>
      </div>
    </div>
  );
};

export default ChatTab;
