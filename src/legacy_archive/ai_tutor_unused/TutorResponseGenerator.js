/**
 * TUTOR RESPONSE GENERATOR
 * Simple rule-based AI response system (no Groq/Gemini needed)
 * 
 * Based on: AITutor_Story_New Strategy_Artifact.txt
 * 
 * Generates:
 * 1. Acknowledgment (Great! Wonderful!)
 * 2. Feedback (I love how you said...)
 * 3. Next question (What is your...?)
 */

export class TutorResponseGenerator {
  constructor(weekConfig, mode = 'easy') {
    this.config = weekConfig;
    this.mode = mode;
    this.turn = 0;
    this.phase = 'content';
    this.vocabUsed = new Set();
    this.studentName = null;
  }
  
  /**
   * Generate acknowledgment based on sentiment
   */
  generateAck(sentiment = 'positive') {
    const acks = {
      positive: ["Great!", "Wonderful!", "Excellent!", "Perfect!", "Amazing!", "Fantastic!"],
      neutral: ["I see!", "Okay!", "Alright!", "Good!", "Understood!"],
      encouraging: ["That's okay!", "No worries!", "Let's try again!", "Good effort!"]
    };
    
    const list = acks[sentiment] || acks.positive;
    return list[Math.floor(Math.random() * list.length)];
  }
  
  /**
   * Generate feedback based on student input and topic
   */
  generateFeedback(studentInput, currentTopic) {
    if (!studentInput || !currentTopic) return "";
    
    // Extract student name from Turn 1
    if (this.turn === 1) {
      const nameMatch = studentInput.match(/(?:name is|i am|i'm)\s+(\w+)/i);
      if (nameMatch) {
        this.studentName = nameMatch[1];
        return `Nice to meet you, ${this.studentName}!`;
      }
    }
    
    // Check if student used expected vocab
    const usedVocab = currentTopic.expectedVocab?.filter(word => 
      studentInput.toLowerCase().includes(word.toLowerCase())
    );
    
    if (usedVocab && usedVocab.length > 0) {
      const word = usedVocab[0];
      this.vocabUsed.add(word);
      
      const feedbacks = [
        `I love how you used the word "${word}"!`,
        `Great use of the word "${word}"!`,
        `"${word}" is a wonderful word!`,
        `Perfect! You used "${word}"!`
      ];
      return feedbacks[Math.floor(Math.random() * feedbacks.length)];
    }
    
    // Feedback based on topic type
    const feedbackTemplates = {
      factual: [
        "That's good information.",
        "Thank you for sharing that.",
        "That's helpful to know."
      ],
      personal: [
        "Thank you for sharing that with me.",
        "I appreciate you telling me about that.",
        "That's nice to hear about you."
      ],
      opinion: [
        "That's an interesting perspective.",
        "I like how you think about that.",
        "That's a thoughtful answer."
      ],
      comparison: [
        "That's a thoughtful comparison.",
        "Great observation!",
        "I see what you mean."
      ],
      prediction: [
        "That sounds like a good plan.",
        "That's an exciting goal!",
        "I hope you achieve that!"
      ]
    };
    
    const templates = feedbackTemplates[currentTopic.type] || feedbackTemplates.factual;
    return templates[Math.floor(Math.random() * templates.length)];
  }
  
  /**
   * Get next question based on turn number
   */
  getNextQuestion(turn) {
    // Check if we're in closing phase
    if (turn > 15) {
      return null;
    }
    
    // Determine phase
    const phase = turn <= 10 ? 'content' : 'extension';
    
    let topic;
    if (phase === 'content') {
      topic = this.config.contentTopics[turn - 1];
    } else {
      topic = this.config.extensionTopics[turn - 11];
    }
    
    if (!topic) return null;
    
    // Return question based on mode
    let question = this.mode === 'easy' ? topic.easyQ : topic.advQ;
    
    // Replace [subject] placeholder if exists (for Turn 3)
    if (question.includes('[subject]') && this.lastSubject) {
      question = question.replace('[subject]', this.lastSubject);
    }
    
    return question;
  }
  
  /**
   * Extract subject from student input (for Turn 2)
   */
  extractSubject(studentInput) {
    const subjects = ['math', 'science', 'english', 'reading', 'writing', 'art', 'music', 'PE', 'history'];
    
    for (const subject of subjects) {
      if (studentInput.toLowerCase().includes(subject)) {
        this.lastSubject = subject;
        return subject;
      }
    }
    
    return null;
  }
  
  /**
   * Generate complete AI response
   * Returns: { story_beat, task }
   */
  generateResponse(studentInput, currentTurn) {
    this.turn = currentTurn;
    
    // Extract subject for Turn 3 context
    if (this.turn === 2) {
      this.extractSubject(studentInput);
    }
    
    // Get current topic
    let topic;
    if (this.turn <= 10) {
      topic = this.config.contentTopics[this.turn - 1];
    } else if (this.turn <= 15) {
      topic = this.config.extensionTopics[this.turn - 11];
    }
    
    if (!topic) {
      return this.generateClosing();
    }
    
    // Build response parts
    const ack = this.generateAck('positive');
    const feedback = this.generateFeedback(studentInput, topic);
    const nextQ = this.getNextQuestion(this.turn + 1);
    
    // Return in Story Mission format
    const story_beat = feedback ? `${ack} ${feedback}` : ack;
    
    return {
      story_beat: story_beat,
      task: nextQ || "Let's wrap up our conversation!"
    };
  }
  
  /**
   * Generate closing summary
   */
  generateClosing() {
    const studentName = this.studentName || "there";
    const vocabList = Array.from(this.vocabUsed).slice(0, 4);
    const vocabStr = vocabList.length > 0 
      ? vocabList.map(w => `"${w}"`).join(", ")
      : "wonderful words";
    
    const closingText = `
Great work today, ${studentName}!

We talked about:
${this.config.closing.summary.map(s => `• ${s}`).join('\n')}

You used ${vocabStr}!

${this.config.closing.nextWeekTeaser}

See you next time! 👋
    `.trim();
    
    return {
      story_beat: closingText,
      task: null
    };
  }
  
  /**
   * Get hints for current turn
   */
  getHints(currentTurn) {
    let topic;
    if (currentTurn <= 10) {
      topic = this.config.contentTopics[currentTurn - 1];
    } else if (currentTurn <= 15) {
      topic = this.config.extensionTopics[currentTurn - 11];
    }
    
    if (!topic || !topic.hints) return [];
    
    return this.mode === 'easy' ? topic.hints.easy : topic.hints.advanced;
  }
  
  /**
   * Reset generator for new conversation
   */
  reset() {
    this.turn = 0;
    this.phase = 'content';
    this.vocabUsed.clear();
    this.studentName = null;
    this.lastSubject = null;
  }
}
