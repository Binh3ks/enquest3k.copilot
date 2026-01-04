/**
 * Story Mission Engine V4 - AI-Driven Flow
 * Engine tracks state, AI manages conversation and extracts data.
 */

import { buildNovaPrompt } from "./novaPromptBuilder.js";
import { parseResponse } from "./tutorSchemas.js";
import { generateTTS } from "../geminiTTS.js";
import { callAI } from "../aiProviders.js";
import { getMemory, saveToMemory } from "./memory.js";
import { validateGrammarScope } from "./grammarGuard.js";

export class StoryMissionEngine {
  constructor(mission, weekData = null) {
    this.mission = mission;
    this.weekData = weekData;
    const memory = getMemory();
    const requiredWords = (mission.successCriteria?.mustUseWords || []).map(w => w.toLowerCase().trim());
    this.state = {
      turnsCompleted: 0,
      vocabularyUsed: new Set(),
      studentContext: {
        name: memory.name || null,
        age: memory.age || null,
        class: memory.class || null,
        teacherName: memory.teacherName || null,
        subject: memory.subject || null,
      },
      conversationHistory: [],
      currentGoalIndex: 0,
      goals: mission.missionGoals || [],
      goalsCompleted: new Set(),
      lastQuestion: "",
      lastQuestionNormalized: "",
      userSentiment: "neutral",
      requiredVocabRemaining: new Set(requiredWords),
    };
  }

  async start() {
    const firstBeat = this.mission.openingBeat;
    if (!firstBeat || !firstBeat.aiPrompt) {
      throw new Error(`Mission is missing a valid opening beat: ${this.mission.title}`);
    }
    const sceneContext = this.mission.context?.scene || "";
    const greeting =
      firstBeat.aiPrompt || "Hi! I am Ms. Nova, your teacher. What is your name?";

    this.state.lastQuestion = greeting;
    const speed = this._getTTSSpeed();
    const ttsResult = await generateTTS(greeting, { speed });

    this.state.conversationHistory.push({ role: "assistant", content: greeting });

    return {
      story_beat: sceneContext,
      task: greeting,
      audioBlob: ttsResult.audioBlob,
      ttsProvider: ttsResult.provider,
    };
  }

  async generateTurn(userInput) {
    console.log("[Engine] Turn", this.state.turnsCompleted + 1, "- User:", userInput);
    this.state.turnsCompleted++;
    this.state.conversationHistory.push({ role: "user", content: userInput });
    this.state.userSentiment = this._detectUserSentiment(userInput);

    const maxTurns = this.mission.successCriteria?.minTurns || 10;
    if (this.state.turnsCompleted >= maxTurns) {
      const studentName = this.state.studentContext.name || "friend";
      const farewellMsg = `Wonderful job, ${studentName}! You did great today! I am so proud of you. See you next time!`;
      const speed = this._getTTSSpeed();
      const ttsResult = await generateTTS(farewellMsg, { speed });
      return {
        story_beat: farewellMsg,
        task: null,
        audioBlob: ttsResult.audioBlob,
        ttsProvider: ttsResult.provider,
        isComplete: true,
      };
    }

    const currentGoal = this.state.goals[this.state.currentGoalIndex] || "continue the conversation";
    const requiredVocabList = Array.from(this.state.requiredVocabRemaining);

    const prompt = buildNovaPrompt({
      mission: this.mission,
      state: this.state,
      userInput,
      currentGoal,
      requiredVocabRemaining: requiredVocabList,
    });

    console.log("[Engine] Calling AI...");
    let aiText = "";
    try {
      const aiResult = await callAI(prompt, "story");
      aiText = aiResult.text;
      console.log("[Engine] AI response:", aiText);
    } catch (error) {
      console.error("[Engine] AI call failed:", error);
      const fallbackQuestion = this._getFallbackQuestion(currentGoal);
      return this._createFallbackResponse("Sorry, I had a problem. Can you say that again?", fallbackQuestion);
    }

    const parsed = parseResponse(aiText, "STORY_MISSION_JSON");

    if (parsed.student_context_update) {
      this.state.studentContext = {
        ...this.state.studentContext,
        ...parsed.student_context_update,
      };
      saveToMemory(this.state.studentContext);
      console.log("[Engine] Updated context:", this.state.studentContext);
    }

    if (parsed.vocabulary_used && Array.isArray(parsed.vocabulary_used)) {
      parsed.vocabulary_used.forEach((word) => {
        const normalized = word.toLowerCase().trim();
        this.state.vocabularyUsed.add(normalized);
        this.state.requiredVocabRemaining.delete(normalized);
      });
      console.log(
        "[Engine] Vocabulary used:",
        Array.from(this.state.vocabularyUsed)
      );
    }

    this._evaluateAndAdvanceGoal();

    const weekId = this.weekData?.weekId || this.mission.context?.weekId || 1;
    const grammarCheck = validateGrammarScope(parsed.response_text, weekId);
    
    let conversationalResponse = parsed.response_text || "That's very interesting!";
    if (!grammarCheck.valid) {
      console.warn("[Engine] Grammar violation detected:", grammarCheck.violations);
      conversationalResponse = this._getGrammarFallback();
    }
    
    if (this.state.userSentiment === "negative" && conversationalResponse.match(/\b(great|good job|wonderful|excellent|happy)\b/i)) {
      console.warn("[Engine] Semantic mismatch: praising negative sentiment");
      conversationalResponse = this._getEmpathyResponse();
    }

    let nextQuestion = parsed.next_question || this._getFallbackQuestion(this.state.goals[this.state.currentGoalIndex]);
    const normalizedNext = this._normalizeQuestion(nextQuestion);
    
    if (normalizedNext === this.state.lastQuestionNormalized || this.state.goalsCompleted.has(this.state.currentGoalIndex)) {
      console.warn("[Engine] Repeated or completed goal question detected, using fallback");
      nextQuestion = this._getFallbackQuestion(this.state.goals[this.state.currentGoalIndex]);
    }
    
    this.state.lastQuestion = nextQuestion;
    this.state.lastQuestionNormalized = this._normalizeQuestion(nextQuestion);

    const fullResponse = conversationalResponse + " " + nextQuestion;
    this.state.conversationHistory.push({
      role: "assistant",
      content: fullResponse,
    });

    const speed = this._getTTSSpeed();
    const ttsResult = await generateTTS(fullResponse, { speed });

    return {
      story_beat: conversationalResponse,
      task: nextQuestion,
      audioBlob: ttsResult.audioBlob,
      ttsProvider: ttsResult.provider,
      isComplete: this.isComplete(),
    };
  }

  isComplete() {
    if (this.state.turnsCompleted < this.mission.successCriteria.minTurns) {
      return false;
    }
    return this.state.requiredVocabRemaining.size === 0;
  }

  getSummary() {
    return {
      turnsCompleted: this.state.turnsCompleted,
      vocabularyUsed: Array.from(this.state.vocabularyUsed),
      studentContext: this.state.studentContext,
    };
  }

  _getTTSSpeed() {
    const weekId = this.weekData?.weekId || this.mission.context?.weekId || 1;
    if (weekId <= 4) return 0.95;
    if (weekId <= 14) return 1.0;
    return 1.1;
  }

  _normalizeQuestion(q) {
    return q.toLowerCase().trim().replace(/[?!.,;]/g, "");
  }

  _detectUserSentiment(userInput) {
    const lower = userInput.toLowerCase();
    if (lower.match(/\b(can't find|cannot find|lost|missing|worried|help|problem|sad|scared)\b/)) {
      return "negative";
    }
    return "neutral";
  }

  _evaluateAndAdvanceGoal() {
    const currentGoal = this.state.goals[this.state.currentGoalIndex];
    if (!currentGoal) return;
    if (this.state.goalsCompleted.has(this.state.currentGoalIndex)) return;

    let goalComplete = false;
    const goalLower = currentGoal.toLowerCase();
    const lastUserMsg = this.state.conversationHistory[this.state.conversationHistory.length - 1]?.content || "";
    
    if (goalLower.includes("name") && this.state.studentContext.name) {
      goalComplete = true;
    } else if (goalLower.includes("age") && this.state.studentContext.age) {
      goalComplete = true;
    } else if (goalLower.includes("class") && this.state.studentContext.class) {
      goalComplete = true;
    } else if (goalLower.includes("teacher") && this.state.studentContext.teacherName) {
      goalComplete = true;
    } else if (goalLower.includes("subject") && this.state.studentContext.subject) {
      goalComplete = true;
    } else if (goalLower.includes("wrong") || goalLower.includes("what is wrong")) {
      if (lastUserMsg.length > 5) goalComplete = true;
    } else if (goalLower.includes("backpack") || goalLower.includes("in the")) {
      if (lastUserMsg.length > 5) goalComplete = true;
    } else if (goalLower.includes("where") || goalLower.includes("thinks")) {
      if (lastUserMsg.length > 5) goalComplete = true;
    } else if (goalLower.includes("see") || goalLower.includes("likes") || goalLower.includes("reading") || goalLower.includes("notebook") || goalLower.includes("library")) {
      if (lastUserMsg.length > 3) goalComplete = true;
    }

    if (goalComplete) {
      this.state.goalsCompleted.add(this.state.currentGoalIndex);
      console.log("[Engine] Goal", this.state.currentGoalIndex, "LOCKED as completed:", currentGoal);
      
      if (this.state.currentGoalIndex < this.state.goals.length - 1) {
        this.state.currentGoalIndex++;
        console.log("[Engine] Advanced to goal", this.state.currentGoalIndex, ":", this.state.goals[this.state.currentGoalIndex]);
      }
    }
  }

  _getFallbackQuestion(goal) {
    if (!goal) return "Can you tell me more?";
    const lower = goal.toLowerCase();
    if (lower.includes("name")) return "What is your name?";
    if (lower.includes("age")) return "How old are you?";
    if (lower.includes("class")) return "What class are you in?";
    if (lower.includes("teacher")) return "Who is your teacher?";
    if (lower.includes("subject")) return "What is your favorite subject?";
    if (lower.includes("wrong")) return "What is wrong?";
    if (lower.includes("backpack") || lower.includes("in the")) return "What is in your backpack?";
    if (lower.includes("where") || lower.includes("thinks")) return "Where do you think it is?";
    if (lower.includes("suggest") || lower.includes("look")) return "Do you want to look in the classroom?";
    if (lower.includes("see")) return "What do you see in the library?";
    if (lower.includes("likes") && lower.includes("reading")) return "Do you like reading books?";
    if (lower.includes("notebook")) return "Do you have a notebook?";
    if (lower.includes("library")) return "Do you like the library?";
    if (lower.includes("school")) return "Do you like school?";
    return "Can you tell me more?";
  }

  _getGrammarFallback() {
    const responses = [
      "That is great!",
      "I am happy to hear that!",
      "Good job!",
      "That is very interesting!",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  _getEmpathyResponse() {
    const responses = [
      "Oh no, I am sorry to hear that.",
      "That is not good. I want to help you.",
      "I understand. Let me help you.",
      "Do not worry. We can find it together.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  async _createFallbackResponse(message, question) {
    const speed = this._getTTSSpeed();
    const fullText = message + " " + question;
    const ttsResult = await generateTTS(fullText, { speed });
    return {
      story_beat: message,
      task: question,
      audioBlob: ttsResult.audioBlob,
      ttsProvider: ttsResult.provider,
      isComplete: this.isComplete(),
    };
  }

  reset() {
    const requiredWords = (this.mission.successCriteria?.mustUseWords || []).map(w => w.toLowerCase().trim());
    this.state = {
      ...this.state,
      turnsCompleted: 0,
      vocabularyUsed: new Set(),
      conversationHistory: [],
      currentGoalIndex: 0,
      goalsCompleted: new Set(),
      lastQuestion: "",
      lastQuestionNormalized: "",
      userSentiment: "neutral",
      requiredVocabRemaining: new Set(requiredWords),
    };
  }

  getState() {
    return {
      ...this.state,
      vocabularyUsed: Array.from(this.state.vocabularyUsed),
      missionTitle: this.mission.title,
    };
  }
}
