export default {
  title: "Logic Lab: Sequence Max's Day",
  theme: "Time Detective Agency - Ordering Diary Events",
  description: "Help Detective Nova put Max's diary events in the right order! Use FIRST, THEN, NEXT, FINALLY.",
  grammar_connection: "Past Simple -ed verbs + sequence words (first, then, next, finally)",

  exercises: [
    {
      id: 1,
      type: "sequence_order",
      instruction: "Put Max's morning activities in the correct order. Number 1 to 4.",
      items: [
        { text: "He listened to the teacher.", correct_order: 3 },
        { text: "He walked to school.", correct_order: 2 },
        { text: "He woke up early.", correct_order: 1 },
        { text: "He played soccer at break time.", correct_order: 4 }
      ],
      sentence_frame: "First, Max ___. Then, he ___. Next, he ___. Finally, he ___.",
      audio_url: "/audio/week21/logic_q1.mp3"
    },
    {
      id: 2,
      type: "multiple_choice",
      question: "What did Max do AFTER school?",
      options: [
        "He walked to school.",
        "He helped his mother and cleaned his room.",
        "He looked at the stars."
      ],
      answer: "He helped his mother and cleaned his room.",
      explanation: "After school comes AFTER school time. He helped and cleaned in the afternoon.",
      audio_url: "/audio/week21/logic_q2.mp3"
    },
    {
      id: 3,
      type: "true_false",
      question: "Max watched TV BEFORE he cleaned his room.",
      answer: false,
      explanation: "Max cleaned his room first (afternoon), then watched TV later (evening).",
      audio_url: "/audio/week21/logic_q3.mp3"
    },
    {
      id: 4,
      type: "sequence_order",
      instruction: "Order Max's evening activities.",
      items: [
        { text: "He finished his diary.", correct_order: 3 },
        { text: "He watched TV.", correct_order: 1 },
        { text: "He started to sleep.", correct_order: 4 },
        { text: "He looked at the stars.", correct_order: 2 }
      ],
      sentence_frame: "First he ___. Then he ___. Next he ___. Finally he ___.",
      audio_url: "/audio/week21/logic_q4.mp3"
    },
    {
      id: 5,
      type: "cause_effect",
      question: "WHY did Max look tired at the end of the diary?",
      options: [
        "Because he walked, played, helped, cleaned, and watched — he did many activities!",
        "Because he only watched TV all day.",
        "Because he did not eat dinner."
      ],
      answer: "Because he walked, played, helped, cleaned, and watched — he did many activities!",
      explanation: "Max had a very busy day with many -ed verb activities. That is why he was tired!",
      audio_url: "/audio/week21/logic_q5.mp3"
    }
  ],

  sequence_words: {
    first: { word: "First", use: "The first / most important action", example: "First, Max walked to school." },
    then: { word: "Then", use: "The next action after", example: "Then, he listened to the teacher." },
    next: { word: "Next", use: "The following action", example: "Next, he played soccer." },
    finally: { word: "Finally", use: "The last action", example: "Finally, he started to sleep." }
  }
};
