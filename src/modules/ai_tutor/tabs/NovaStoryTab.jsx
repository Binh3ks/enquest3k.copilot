import React, { useState, useEffect, useRef } from "react";
import { BookText, Send, RotateCcw, Mic, BarChart3 } from "lucide-react";
import { useTutorStore } from "../../../services/aiTutor/tutorStore";
import { StoryMissionEngine } from "../../../services/aiTutor/storyMissionEngine";
import { getMissionsForWeek } from "../../../data/storyMissions";
import { speakText } from "../../../utils/AudioHelper";
import { getHints } from "../../../services/aiTutor/hintEngine";

const MissionState = {
  SELECTING: "SELECTING",
  PROCESSING: "PROCESSING",
  AWAITING_INPUT: "AWAITING_INPUT",
  COMPLETED: "COMPLETED",
};

export default function NovaStoryTab({ weekData, recognitionRef }) {
  const { clearMessages } = useTutorStore();
  const [state, setState] = useState(MissionState.SELECTING);
  const [engine, setEngine] = useState(null);
  const [currentMission, setCurrentMission] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [currentHints, setCurrentHints] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const listRef = useRef(null);
  const bottomRef = useRef(null);
  const hintsKey = currentHints.join("|");

  const missions = getMissionsForWeek(weekData?.weekId || 1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, currentQuestion, hintsKey]);

  const getLastQuestion = (messageList) => {
    for (let i = messageList.length - 1; i >= 0; i -= 1) {
      const msg = messageList[i];
      const text = typeof msg?.text === "string" ? msg.text.trim() : "";
      if (msg?.role === "ai" && text.endsWith("?")) {
        return text;
      }
    }
    return "";
  };

  const updateHintsForQuestion = (question, mission, studentContext) => {
    const trimmed = (question || "").trim();
    if (!trimmed) {
      setCurrentHints([]);
      setCurrentQuestion("");
      return;
    }
    const beatWithTask = { task: trimmed, aiPrompt: trimmed };
    const hints = getHints(mission, beatWithTask, studentContext);
    setCurrentHints(hints);
    setCurrentQuestion(trimmed);
  };

  const toggleVoice = () => {
    if (!recognitionRef?.current) {
      alert("Speech recognition not supported. Try Chrome or Edge.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSubmit(transcript);
      };
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const processResponse = async (response) => {
    const newMessages = [];
    if (response.story_beat) {
      newMessages.push({ role: "ai", text: response.story_beat });
    }
    if (response.task) {
      newMessages.push({ role: "ai", text: response.task });
    }
    if (newMessages.length > 0) {
      setMessages((prev) => [...prev, ...newMessages]);
    }
    
    const fullText = `${response.story_beat || ''} ${response.task || ''}`;
    if (fullText.trim()) {
      if (response.audioBlob) {
        const audioUrl = URL.createObjectURL(response.audioBlob);
        await speakText(fullText, audioUrl);
        setTimeout(() => URL.revokeObjectURL(audioUrl), 5000);
      } else {
        await speakText(fullText);
      }
    }
    
    const question = response.task || getLastQuestion([...messages, ...newMessages]);
    updateHintsForQuestion(question, currentMission, engine.state.studentContext);
    
    setState(MissionState.AWAITING_INPUT);
  };

  const handleStartMission = async (mission) => {
    clearMessages();
    setCurrentMission(mission);
    const missionEngine = new StoryMissionEngine(mission, weekData);
    setEngine(missionEngine);
    setState(MissionState.PROCESSING);
    
    const opening = await missionEngine.start();
    
    const initialMessages = [
        { role: "ai", text: opening.story_beat },
        { role: "ai", text: opening.task }
    ].filter(msg => msg.text);

    setMessages(initialMessages);
    
    const fullText = `${opening.story_beat || ''} ${opening.task || ''}`;
    if (opening.audioBlob) {
      const audioUrl = URL.createObjectURL(opening.audioBlob);
      await speakText(fullText, audioUrl);
      setTimeout(() => URL.revokeObjectURL(audioUrl), 5000);
    } else {
      await speakText(fullText);
    }
    
    const openingQuestion = opening.task || getLastQuestion(initialMessages);
    updateHintsForQuestion(openingQuestion, mission, missionEngine.state.studentContext);
    
    setState(MissionState.AWAITING_INPUT);
  };

  const handleSubmit = async (overrideText = null) => {
    const userText = (overrideText || input).trim();
    if (state !== MissionState.AWAITING_INPUT || !userText) return;

    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setError(null);
    setState(MissionState.PROCESSING);

    try {
      const response = await engine.generateTurn(userText);
      if (response.isComplete) {
        const summary = engine.getSummary();
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            text: `🎉 Mission Complete! You used: ${summary.vocabularyUsed.join(
              ", "
            )}.`,
          },
        ]);
        setState(MissionState.COMPLETED);
      } else {
        await processResponse(response);
      }
    } catch (err) {
      console.error("[NovaStoryTab] Error during turn generation:", err);
      setError(err.message || "Something went wrong. Please try again.");
      setState(MissionState.AWAITING_INPUT);
    }
  };

  const handleReset = () => {
    setState(MissionState.SELECTING);
    setCurrentMission(null);
    setEngine(null);
    setMessages([]);
    setCurrentHints([]);
    setCurrentQuestion("");
    clearMessages();
  };

  if (state === MissionState.SELECTING) {
    return (
      <div className="p-4">
        <div className="text-center py-6">
          <BookText size={48} className="mx-auto text-purple-600 opacity-50 mb-3" />
          <p className="text-sm font-bold text-slate-700 mb-2">📖 Story Missions</p>
          <p className="text-xs text-slate-600 mb-4 px-4">
            Choose a mission. Ms. Nova will guide you!
          </p>
          <div className="space-y-2">
            {missions.map((m) => (
              <button
                key={m.id}
                onClick={() => handleStartMission(m)}
                className="w-full p-4 bg-white border-2 border-purple-100 rounded-xl text-left hover:bg-purple-50 hover:border-purple-300 transition-all"
              >
                <p className="text-sm font-bold text-slate-700">{m.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const renderAnalytics = () => {
      const wordsToUse = currentMission.successCriteria.mustUseWords.filter(
          word => !engine.state.vocabularyUsed.has(word)
      );

      return (
        <div className="bg-white border-2 border-purple-200 rounded-lg p-2 space-y-2 text-[10px]">
            <p className="font-bold text-purple-700 mb-1">📊 Mission Progress</p>
            {wordsToUse.length > 0 ? (
                <div>
                    <p className="text-slate-600 font-bold mb-1">Words to practice:</p>
                    <div className="flex flex-wrap gap-1">
                        {wordsToUse.map(word => (
                            <span key={word} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-xs font-bold">{word}</span>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-green-600 font-bold">You've used all the target words. Great job!</p>
            )}
        </div>
      )
  }

  return (
    <div className="p-4 space-y-3 flex flex-col h-full">
      <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-3">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs font-black text-purple-600">
            {currentMission.title}
          </p>
          <button
            onClick={handleReset}
            className="text-purple-600 hover:text-purple-800"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {engine && (
          <div className="space-y-1">
            <div className="bg-purple-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${Math.min(
                    (engine.state.turnsCompleted /
                      currentMission.successCriteria.minTurns) *
                      100,
                    100
                  )}%`,
                }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-purple-600">
              <span className="font-bold">
                {engine.state.turnsCompleted}/
                {currentMission.successCriteria.minTurns} turns
              </span>
              <span className="font-bold">
                {engine.state.vocabularyUsed.size}/
                {currentMission.successCriteria.mustUseWords.length} words ✓
              </span>
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="text-purple-600 hover:text-purple-800"
              >
                <BarChart3 size={14} />
              </button>
            </div>
            {showAnalytics && renderAnalytics()}
          </div>
        )}
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto" ref={listRef}>
        {(() => {
          const normalizedQuestion = currentQuestion.trim();
          const lastQuestionIndex = normalizedQuestion
            ? messages.reduce(
                (acc, msg, idx) => {
                  const text = typeof msg?.text === "string" ? msg.text.trim() : "";
                  return msg?.role === "ai" && text === normalizedQuestion ? idx : acc;
                },
                -1
              )
            : -1;

          return messages.map((msg, i) => (
            <React.Fragment key={i}>
              <div
                className={`p-3 rounded-xl text-sm ${
                  msg.role === "ai" ? "bg-purple-50" : "bg-white border"
                }`}
              >
                {msg.text}
              </div>
              {i === lastQuestionIndex && currentHints.length > 0 && (
                <div className="p-2 bg-green-50 border-2 border-green-200 rounded-xl">
                  <div className="flex flex-wrap gap-1">
                    {currentHints.map((h, idx) => (
                      <button
                        key={idx}
                        onClick={() => setInput((prev) => prev + h + " ")}
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

      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3">
          <p className="text-xs font-bold text-red-700">
            Oops! Something went wrong
          </p>
          <p className="text-xs text-red-600 mt-1">{error}</p>
        </div>
      )}
      
      <div className="flex gap-2">
        <button
          onClick={toggleVoice}
          disabled={state !== MissionState.AWAITING_INPUT}
          className={`p-2 rounded-lg ${
            isListening ? "bg-red-500" : "bg-purple-600"
          } text-white`}
        >
          <Mic size={20} />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          disabled={state !== MissionState.AWAITING_INPUT}
          className="flex-1 p-2 border-2 rounded-lg"
        />
        <button
          onClick={() => handleSubmit()}
          disabled={state !== MissionState.AWAITING_INPUT || !input.trim()}
          className="p-2 bg-green-600 text-white rounded-lg"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
