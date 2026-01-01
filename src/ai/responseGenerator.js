/**
 * TUTOR RESPONSE GENERATOR
 * Rule-based conversation engine với state management
 * Nhớ context học sinh và tạo responses tự nhiên
 */

export class TutorResponseGenerator {
  constructor(weekConfig) {
    this.config = weekConfig;
    this.turn = 0;
    this.vocabUsed = new Set();
    
    // STATE MANAGEMENT - Nhớ thông tin học sinh
    this.context = {
      studentName: null,
      age: null,
      feeling: null,
      likesSchool: null,
      favoriteSubject: null,
      teacherName: null
    };
  }
  
  // Extract info from student input
  extractContext(input, contextKey) {
    // DON'T lowercase for name matching!
    const text = input.toLowerCase();
    
    if (contextKey === 'studentName') {
      // Extract name: "My name is Alex" or "I am Alex" or just "Binh"
      // Use original input (not lowercase) for name extraction
      const patterns = [
        /(?:my name is|i am|i'm)\s+([A-Za-z\u00C0-\u1EF9]+)/i,
        /^([A-Za-z\u00C0-\u1EF9]+)$/i  // Just the name
      ];
      
      for (const pattern of patterns) {
        const match = input.match(pattern);
        if (match && match[1]) {
          // Capitalize first letter, keep rest as-is
          const name = match[1].trim();
          this.context.studentName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
          break;
        }
      }
    }
    
    if (contextKey === 'age') {
      // Extract age: "I am 8 years old" or "8 years old"
      const match = text.match(/(\d+)/);
      if (match) this.context.age = match[1];
    }
    
    if (contextKey === 'feeling') {
      if (text.includes('excited') || text.includes('happy')) this.context.feeling = 'positive';
      if (text.includes('nervous') || text.includes('scared')) this.context.feeling = 'nervous';
    }
    
    if (contextKey === 'likesSchool') {
      this.context.likesSchool = text.includes('yes') || text.includes('like');
    }
    
    if (contextKey === 'favoriteSubject') {
      // Extract subject - EXPANDED LIST including Vietnamese
      const subjects = [
        'math', 'maths', 'mathematics',
        'english', 'literature',
        'vietnamese', 'tiếng việt',
        'science', 'biology', 'chemistry', 'physics',
        'art', 'drawing', 'painting',
        'music', 'singing',
        'pe', 'physical education', 'sports',
        'history', 'geography',
        'reading', 'writing'
      ];
      const found = subjects.find(s => text.includes(s));
      if (found) {
        // Normalize Vietnamese → English for consistency
        let normalized = found;
        if (found.includes('tiếng việt') || found === 'vietnamese') {
          normalized = 'Vietnamese';
        } else if (found.includes('toán') || found === 'maths' || found === 'mathematics') {
          normalized = 'Math';
        } else {
          normalized = found.charAt(0).toUpperCase() + found.slice(1);
        }
        this.context.favoriteSubject = normalized;
        console.log('[Generator] Saved favorite subject:', normalized, 'from input:', found);
      }
    }
    
    if (contextKey === 'teacherName') {
      // Extract teacher name: "Mr. Smith" or "Mrs. Johnson"
      const match = text.match(/(?:mr|mrs|ms|miss)\.?\s+([a-z]+)/i);
      if (match) this.context.teacherName = match[1];
    }
  }
  
  generateResponse(studentInput, currentTurn) {
    this.turn = currentTurn;
    
    // Determine max turns based on week phase
    const weekId = this.config.weekNumber || 1;
    const maxTurns = this.getMaxTurnsForWeek(weekId);
    
    // CRITICAL FIX: studentInput is the answer to the PREVIOUS turn
    // currentTurn = 3 means we just received answer for turn 2 and will ask turn 3
    // So we need to acknowledge turn 2 (currentTurn - 1), not turn 3!
    const previousTurn = this.turn - 1;
    const topicToAcknowledge = this.config.contentTopics[previousTurn - 1]; // Turn 2 → index 1
    
    // Check if should close (before asking next question)
    if (this.turn > maxTurns) {
      return this.generateClosing();
    }
    
    // EXTRACT & SAVE CONTEXT from the answer (use previous turn's context key)
    if (topicToAcknowledge && topicToAcknowledge.contextKey) {
      this.extractContext(studentInput, topicToAcknowledge.contextKey);
    }
    
    // Build response parts - Acknowledge the PREVIOUS turn's answer
    const story_beat = topicToAcknowledge 
      ? this.getContextualAck(topicToAcknowledge, studentInput)
      : "Great!";
    
    // Ask the NEXT question (current turn)
    const task = this.getQuestionForTurn(this.turn);
    
    // Return in Story Mission format { story_beat, task }
    return {
      story_beat: story_beat,
      task: task || null
    };
  }
  
  // Determine max turns based on week and phase
  getMaxTurnsForWeek(weekId) {
    // Phase 1 (Week 1-14): 7-10 turns
    if (weekId <= 14) return 10;
    // Phase 2 (Week 15-112): 10-20 turns
    if (weekId <= 112) return 20;
    // Phase 3 (Week 113-156): 20-30 turns
    return 30;
  }
  
  // Contextual acknowledgment - READ actual student response
  // FIXED: Now analyzes studentInput to give contextual feedback
  getContextualAck(topic, studentInput) {
    const name = this.context.studentName;
    const age = this.context.age;
    const subject = this.context.favoriteSubject;
    const teacher = this.context.teacherName;
    const input = studentInput.toLowerCase();
    
    // TURN 1: After getting name
    if (topic.turn === 1) {
      if (name) {
        return `Nice to meet you, ${name}! What a lovely name!`;
      }
      return "Nice to meet you!";
    }
    
    // TURN 2: After getting age
    if (topic.turn === 2) {
      if (age && name) {
        return `That's a great age! ${age} years old is perfect for this class!`;
      } else if (age) {
        return `You are at a great age for learning!`;
      }
      return "You sound like a wonderful student!";
    }
    
    // TURN 3: After getting teacher name
    if (topic.turn === 3) {
      // Read actual teacher name from input
      const actualTeacher = teacher || this.extractTeacherFromInput(input);
      if (actualTeacher && name) {
        return `${actualTeacher} sounds wonderful! I hope you enjoy the class, ${name}!`;
      } else if (actualTeacher) {
        return `${actualTeacher} sounds like a great teacher!`;
      }
      return "Your teacher sounds nice!";
    }
    
    // TURN 4: After favorite subject - READ from actual input
    if (topic.turn === 4) {
      const actualSubject = subject || this.extractSubjectFromInput(input);
      if (actualSubject) {
        const compliments = {
          'Math': `Excellent choice! Math is such a useful subject!`,
          'English': `Wonderful! English opens so many doors!`,
          'Vietnamese': `Great! Vietnamese is a beautiful language!`,
          'Science': `Fantastic! Science helps us understand the world!`,
          'Art': `Beautiful! Art lets you express your creativity!`,
          'Music': `Lovely! Music makes life more joyful!`,
          'History': `Interesting! History teaches us so much!`,
          'Pe': `Great! Staying active is so important!`
        };
        return compliments[actualSubject] || `${actualSubject} is a wonderful subject!`;
      }
      return `That's a great choice!`;
    }
    
    // TURN 5: After friends - READ actual response
    if (topic.turn === 5) {
      const hasManyFriends = input.includes('yes') || input.includes('many') || input.includes('lot');
      if (hasManyFriends) {
        return `That's wonderful! Friends make school so much more fun, ${name || 'dear'}!`;
      } else {
        return `That's okay! Making new friends takes time, ${name || 'dear'}. I'm sure you'll make more friends soon!`;
      }
    }
    
    // TURN 6: After classroom location - READ actual location
    if (topic.turn === 6) {
      // Extract location from input
      const hasLocation = input.includes('floor') || input.includes('building') || input.includes('room');
      if (hasLocation) {
        return `Good! It's important to know where your classroom is, ${name || 'dear'}!`;
      }
      return `Great! Now you know where to go!`;
    }
    
    // TURN 7+: After what you like - READ actual likes
    if (topic.turn === 7) {
      // Extract what they like from input
      const likes = this.extractLikesFromInput(input);
      if (likes) {
        return `I'm so glad you like ${likes}! That's what makes school special, ${name || 'dear'}!`;
      }
      return `I'm so glad you enjoy your school, ${name || 'dear'}!`;
    }
    
    // Default for extension turns
    return name ? `Wonderful, ${name}! That's very interesting!` : "Wonderful! That's very interesting!";
  }
  
  // Helper: Extract teacher name from input
  extractTeacherFromInput(input) {
    const patterns = [
      /(?:mr|ms|mrs|miss|teacher)\s+([A-Za-z\u00C0-\u1EF9]+)/i,
      /(?:teacher is|teacher's name is)\s+([A-Za-z\u00C0-\u1EF9]+)/i
    ];
    
    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match && match[1]) {
        const name = match[1].trim();
        return name.charAt(0).toUpperCase() + name.slice(1);
      }
    }
    return null;
  }
  
  // Helper: Extract subject from input
  extractSubjectFromInput(input) {
    const subjects = ['math', 'english', 'vietnamese', 'science', 'art', 'music', 'pe', 'history', 'reading', 'writing'];
    for (const subj of subjects) {
      if (input.includes(subj)) {
        return subj.charAt(0).toUpperCase() + subj.slice(1);
      }
    }
    return null;
  }
  
  // Helper: Extract what they like from input
  extractLikesFromInput(input) {
    // Look for words after "like" or "because"
    const patterns = [
      /(?:like|love)\s+([a-z\s]+?)(?:\.|because|it|$)/i,
      /because\s+(?:it is|it's)?\s*([a-z]+)/i
    ];
    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
    return null;
  }
  
  // UPDATED: Extended to 10 turns for Phase 1, with proper progression
  getQuestionForTurn(turn) {
    const name = this.context.studentName;
    const subject = this.context.favoriteSubject;
    
    // Core 7 turns + 3 extension turns for Phase 1
    const questions = {
      1: "What is your name?",
      2: `How old are you${name ? ', ' + name : ''}?`,
      3: `What is your teacher's name${name ? ', ' + name : ''}?`,
      4: "What is your favorite subject in school?",
      5: "Do you have many friends at school?",
      6: "Where is your classroom?",
      7: "What do you like about your school?",
      // Extension turns (optional, for deeper conversation)
      8: `What do you usually do with your friends${name ? ', ' + name : ''}?`,
      9: "What is in your backpack today?",
      10: "What do you want to learn next in school?"
    };
    
    return questions[turn] || null;
  }
  
  getCurrentHints(turn) {
    // Only 7 turns for Phase 1
    const topic = this.config.contentTopics[turn - 1];
    return topic ? topic.hints : [];
  }
  
  generateClosing() {
    const name = this.context.studentName || 'dear student';
    const age = this.context.age;
    const subject = this.context.favoriteSubject || 'learning';
    const teacher = this.context.teacherName || 'your teacher';
    
    let closingText = `Wonderful conversation today, ${name}!\n\n`;
    closingText += `Let me remember what you shared:\n`;
    
    if (age) {
      closingText += `• You are ${age} years old\n`;
    }
    
    if (this.context.favoriteSubject) {
      closingText += `• Your favorite subject is ${subject}\n`;
    }
    
    if (this.context.teacherName) {
      closingText += `• Your teacher is ${teacher}\n`;
    }
    
    closingText += `\nYou spoke so well today! `;
    
    if (this.vocabUsed.size > 0) {
      const vocabList = Array.from(this.vocabUsed).slice(0, 4);
      closingText += `You used great words like "${vocabList.join('", "')}"! `;
    }
    
    closingText += `\nI'm very proud of you, ${name}! Keep practicing!`;
    
    // INVITATION TO CONTINUE (not abrupt ending)
    return {
      story_beat: closingText.trim(),
      task: `Would you like to tell me more about your school${name ? ', ' + name : ''}? Or we can talk about your family next time! 😊`
    };
  }
}
