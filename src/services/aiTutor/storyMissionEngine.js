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
      recentQuestionNormalized: [],
      postGoalQuestionIndex: 0,
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
    this.state.lastQuestionNormalized = this._normalizeQuestion(greeting);
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
    this._extractStudentContext(userInput);
    this.state.userSentiment = this._detectUserSentiment(userInput);

    const maxTurns = 10;
    if (this.state.turnsCompleted >= maxTurns) {
      const studentName = this.state.studentContext.name || "friend";
      const farewellMsg = `Wonderful job, ${studentName}! You are great today. I am proud of you. See you next time!`;
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

    this._advanceGoalIfSatisfied();
    const activeGoal = this._getActiveGoal();
    const currentGoal = activeGoal || this._getPracticeGoal();
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

    const weekId = this.weekData?.weekId || this.mission.context?.weekId || 1;
    const grammarCheck = validateGrammarScope(parsed.response_text, weekId);
    const helpIntent = this._needsHelp(userInput);

    let conversationalResponse = parsed.response_text || "That's very interesting!";
    let nextQuestion = parsed.next_question;
    const goalForQuestion = this._getActiveGoal();

    if (!nextQuestion) {
      nextQuestion = goalForQuestion
        ? this._getFallbackQuestion(goalForQuestion)
        : this._getPostGoalQuestion();
    }

    if (!helpIntent && !grammarCheck.valid) {
      console.warn("[Engine] Grammar violation detected:", grammarCheck.violations);
      conversationalResponse = this._getGrammarFallback();
    }
    
    if (this.state.userSentiment === "negative" && conversationalResponse.match(/\b(great|good job|wonderful|excellent|happy)\b/i)) {
      console.warn("[Engine] Semantic mismatch: praising negative sentiment");
      conversationalResponse = this._getEmpathyResponse();
    }

    if (helpIntent) {
      conversationalResponse = this._getHelpResponse();
      nextQuestion = this._getHelpQuestion(goalForQuestion);
    }

    if (weekId === 1 && (this._containsForbiddenPastTense(conversationalResponse) || this._containsForbiddenPastTense(nextQuestion))) {
      const safeTurn = this._getGrammarSafeTurn(goalForQuestion, helpIntent);
      conversationalResponse = safeTurn.responseText;
      nextQuestion = safeTurn.nextQuestion;
    }

    let normalizedNext = this._normalizeQuestion(nextQuestion);
    const completedGoalQuestions = this._getCompletedGoalQuestionSet();

    if (completedGoalQuestions.has(normalizedNext)) {
      nextQuestion = this._getNextGoalQuestionAfter(this.state.currentGoalIndex);
      normalizedNext = this._normalizeQuestion(nextQuestion);
    }

    if (normalizedNext === this.state.lastQuestionNormalized) {
      nextQuestion = this._getNextGoalQuestionAfter(this.state.currentGoalIndex);
      normalizedNext = this._normalizeQuestion(nextQuestion);
    }

    this.state.lastQuestion = nextQuestion;
    this.state.lastQuestionNormalized = normalizedNext;
    this._trackRecentQuestion(this.state.lastQuestionNormalized);

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
    if (!q) return "";
    return q
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, " ");
  }

  _detectUserSentiment(userInput) {
    if (this._needsHelp(userInput)) {
      return "negative";
    }
    const lower = userInput.toLowerCase();
    if (lower.match(/\b(can't find|cannot find|lost|missing|worried|help|problem|sad|scared)\b/)) {
      return "negative";
    }
    return "neutral";
  }

  _needsHelp(userInput) {
    const lower = userInput.toLowerCase();
    return lower.match(/\b(can't find|cannot find|lost|worried|help|wrong)\b/);
  }

  _extractStudentContext(userInput) {
    const updates = {};
    const classMatch = userInput.match(/\b(?:in\s+class|class)\s+([a-z0-9]+)\b/i);
    if (classMatch?.[1]) {
      updates.class = classMatch[1].toUpperCase();
    }

    const ageMatch = userInput.match(/\b(?:i am|i'm)\s+(\d{1,2})\b/i);
    if (ageMatch?.[1]) {
      updates.age = parseInt(ageMatch[1], 10);
    }

    const nameMatch = userInput.match(/\bmy name is\s+([a-zA-Z][a-zA-Z'-]*(?:\s+[a-zA-Z][a-zA-Z'-]*){0,2})\b/i);
    if (nameMatch?.[1]) {
      updates.name = nameMatch[1].trim();
    } else {
      const iAmMatch = userInput.match(/\b(?:i am|i'm)\s+(?!in\b)([a-zA-Z][a-zA-Z'-]*)\b/i);
      const candidate = iAmMatch?.[1]?.toLowerCase();
      if (candidate && !["a", "an", "the", "student"].includes(candidate) && !ageMatch) {
        updates.name = iAmMatch[1].trim();
      }
    }

    const teacherMatch = userInput.match(/\b(?:my teacher is|teacher is)\s+([a-zA-Z][a-zA-Z'-]*(?:\s+[a-zA-Z][a-zA-Z'-]*)?)\b/i);
    if (teacherMatch?.[1]) {
      updates.teacherName = teacherMatch[1].trim();
    }

    const subjectMatch = userInput.match(/\b(?:my favorite subject is|favorite subject is|my subject is|subject is)\s+([a-zA-Z][a-zA-Z'-]*)\b/i);
    if (subjectMatch?.[1]) {
      updates.subject = subjectMatch[1].trim();
    }

    const nextContext = { ...this.state.studentContext };
    let changed = false;
    Object.keys(updates).forEach((key) => {
      if (updates[key] && nextContext[key] !== updates[key]) {
        nextContext[key] = updates[key];
        changed = true;
      }
    });

    if (changed) {
      this.state.studentContext = nextContext;
      saveToMemory(this.state.studentContext);
    }
  }

  _containsForbiddenPastTense(text) {
    if (!text) return false;
    const banned = [
      "said",
      "told",
      "was",
      "were",
      "went",
      "had",
      "did",
      "kept",
      "found",
      "lost",
      "saw",
      "took",
      "got",
      "came",
    ];
    const pattern = new RegExp(`\\b(${banned.join("|")})\\b`, "i");
    return pattern.test(text);
  }

  _getGrammarSafeTurn(goal, helpIntent) {
    if (helpIntent) {
      return {
        responseText: this._getHelpResponse(),
        nextQuestion: this._getHelpQuestion(goal),
      };
    }
    return {
      responseText: "Thank you. We continue now.",
      nextQuestion: goal ? this._getFallbackQuestion(goal) : this._getPostGoalQuestion(),
    };
  }

  _getHelpResponse() {
    return "I am sorry. I want to help you.";
  }

  _getHelpQuestion(goal) {
    if (!goal) return "What is wrong?";
    const lower = goal.toLowerCase();
    if (lower.includes("wrong")) return "What is wrong?";
    if (lower.includes("backpack") || lower.includes("in the")) return "What is in your backpack?";
    if (lower.includes("where") || lower.includes("thinks")) return "Where do you think it is?";
    return "What is wrong?";
  }

  _evaluateAndAdvanceGoal() {
    const currentGoal = this.state.goals[this.state.currentGoalIndex];
    if (!currentGoal) return;
    if (this.state.goalsCompleted.has(this.state.currentGoalIndex)) return;

    if (this._isGoalSatisfied(currentGoal)) {
      this.state.goalsCompleted.add(this.state.currentGoalIndex);
      console.log("[Engine] Goal", this.state.currentGoalIndex, "LOCKED as completed:", currentGoal);
      
      if (this.state.currentGoalIndex < this.state.goals.length - 1) {
        this.state.currentGoalIndex++;
        console.log("[Engine] Advanced to goal", this.state.currentGoalIndex, ":", this.state.goals[this.state.currentGoalIndex]);
      } else {
        this.state.currentGoalIndex = this.state.goals.length;
      }
    }
  }

  _isGoalSatisfied(goal) {
    if (!goal) return false;
    const goalLower = goal.toLowerCase();
    const lastUserMsg = this.state.conversationHistory[this.state.conversationHistory.length - 1]?.content || "";

    if (goalLower.includes("name") && this.state.studentContext.name) return true;
    if (goalLower.includes("age") && this.state.studentContext.age) return true;
    if (goalLower.includes("class") && this.state.studentContext.class) return true;
    if (goalLower.includes("teacher") && this.state.studentContext.teacherName) return true;
    if (goalLower.includes("subject") && this.state.studentContext.subject) return true;
    if (goalLower.includes("wrong") || goalLower.includes("what is wrong")) {
      return lastUserMsg.length > 5;
    }
    if (goalLower.includes("backpack") || goalLower.includes("in the")) {
      return lastUserMsg.length > 5;
    }
    if (goalLower.includes("where") || goalLower.includes("thinks")) {
      return lastUserMsg.length > 5;
    }
    if (
      goalLower.includes("see") ||
      goalLower.includes("likes") ||
      goalLower.includes("reading") ||
      goalLower.includes("notebook") ||
      goalLower.includes("library")
    ) {
      return lastUserMsg.length > 3;
    }
    return false;
  }

  _advanceGoalIfSatisfied() {
    let advanced = false;
    while (this.state.currentGoalIndex < this.state.goals.length) {
      const goal = this.state.goals[this.state.currentGoalIndex];
      if (!goal || !this._isGoalSatisfied(goal)) break;
      this.state.goalsCompleted.add(this.state.currentGoalIndex);
      if (this.state.currentGoalIndex < this.state.goals.length - 1) {
        this.state.currentGoalIndex++;
        advanced = true;
      } else {
        this.state.currentGoalIndex = this.state.goals.length;
        advanced = true;
        break;
      }
    }
    if (advanced) {
      console.log(
        "[Engine] Skipped to goal",
        this.state.currentGoalIndex,
        ":",
        this.state.goals[this.state.currentGoalIndex]
      );
    }
  }

  _isRepeatedQuestion(normalizedQuestion) {
    if (!normalizedQuestion) return false;
    return this.state.recentQuestionNormalized.includes(normalizedQuestion);
  }

  _trackRecentQuestion(normalizedQuestion) {
    if (!normalizedQuestion) return;
    this.state.recentQuestionNormalized.push(normalizedQuestion);
    if (this.state.recentQuestionNormalized.length > 4) {
      this.state.recentQuestionNormalized.shift();
    }
  }

  _getActiveGoal() {
    if (this.state.currentGoalIndex >= this.state.goals.length) return null;
    return this.state.goals[this.state.currentGoalIndex];
  }

  _getPracticeGoal() {
    const remaining = Array.from(this.state.requiredVocabRemaining);
    if (remaining.length > 0) {
      return `Practice these words: ${remaining.join(", ")}`;
    }
    return "Practice the lesson with a new question";
  }

  _getCompletedGoalQuestionSet() {
    const completedQuestions = new Set();
    this.state.goalsCompleted.forEach((index) => {
      const goal = this.state.goals[index];
      const fallback = this._getFallbackQuestion(goal);
      if (fallback) {
        completedQuestions.add(this._normalizeQuestion(fallback));
      }
    });
    return completedQuestions;
  }

  _getNextGoalQuestionAfter(currentIndex) {
    for (let i = currentIndex + 1; i < this.state.goals.length; i++) {
      if (!this.state.goalsCompleted.has(i)) {
        this.state.currentGoalIndex = i;
        return this._getFallbackQuestion(this.state.goals[i]);
      }
    }
    return this._getPostGoalQuestion();
  }

  _getPostGoalQuestion() {
    const completedGoalQuestions = this._getCompletedGoalQuestionSet();
    const vocabQuestions = this._getVocabPracticeQuestions();
    const extraQuestions = [
      "What is your favorite subject?",
      "Do you like your teacher?",
      "What do you like to do at school?",
      "Do you have a book?",
      "Do you have a notebook?",
    ];
    const candidates = [...vocabQuestions, ...extraQuestions].filter((q) => {
      const normalized = this._normalizeQuestion(q);
      return (
        normalized &&
        !this._isRepeatedQuestion(normalized) &&
        !completedGoalQuestions.has(normalized)
      );
    });
    if (candidates.length === 0) {
      return "What do you like at school?";
    }
    const index = this.state.postGoalQuestionIndex % candidates.length;
    this.state.postGoalQuestionIndex += 1;
    return candidates[index];
  }

  _getVocabPracticeQuestions() {
    const vocab = (this.mission.targetVocabulary || [])
      .map((entry) => entry.word?.toLowerCase().trim())
      .filter(Boolean);
    return vocab
      .map((word) => this._getVocabQuestion(word))
      .filter(Boolean);
  }

  _getVocabQuestion(word) {
    if (word === "student") return "Are you a student?";
    if (word === "teacher") return "Do you like your teacher?";
    if (word === "school") return "What do you like at school?";
    if (word === "name") return "What is a name?";
    if (word === "backpack") return "Do you have a backpack?";
    if (word === "book") return "Do you have a book?";
    if (word === "notebook") return "Do you have a notebook?";
    if (word === "library") return "Do you like the library?";
    return `Do you like the word ${word}?`;
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
      "Do not worry. We find it together.",
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
      recentQuestionNormalized: [],
      postGoalQuestionIndex: 0,
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
