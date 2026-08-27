// Pure Generated Speaking Hub for Week 33
export const speakingHub = {
  talkshow_video: {
    video_id: "corridor_safety_w33",
    title: "School Corridor Safety & Responsibility"
  },
  info_exchange_cards: {
    candidate_card: {
      title: "Tom's Accident (Candidate)",
      items: [
        { label: "Where — accident?",     value: "School Corridor",    known: true  },
        { label: "Which — body part?",     value: "Swollen Right Knee", known: false },
        { label: "When — accident?",       value: "Morning Break Time", known: true  },
        { label: "Who — helped Tom?",      value: "Jake from Grade 5",  known: false }
      ]
    },
    examiner_card: {
      title: "Jake's First Aid Action (Examiner)",
      items: [
        { label: "Where — Jake helped?",   value: "Near Science Room",            known: true  },
        { label: "What — first aid item?", value: "Clean Bandage and Cold Pack",   known: false },
        { label: "When — nurse arrived?",  value: "Within Two Minutes",            known: true  },
        { label: "Who — praised Jake?",    value: "The Headmaster in Assembly",    known: false }
      ]
    },
    audio_url: "/audio/week33/exam_intro_S2.mp3",
    dialogue_script: [
      { speaker: 'woman', text: 'Where did Tom get injured?' },
      { speaker: 'man',   text: 'Tom got injured in the school corridor near the science room.' },
      { speaker: 'woman', text: 'What time did the accident happen?' },
      { speaker: 'man',   text: 'The accident happened during morning break time.' },
      { speaker: 'woman', text: 'How long did it take the nurse to arrive?' },
      { speaker: 'man',   text: 'The school nurse arrived within two minutes with a clean bandage and a cold pack.' }
    ],
    prompt_questions: [
      "Where did the accident happen?",
      "Which part of Tom's body was hurt?",
      "When did the nurse arrive?"
    ],
    examiner_questions: [
      { id: "eq1", text: "Where did Tom get injured?", audio_url: "/audio/week33/exam_intro_S2.mp3" },
      { id: "eq2", text: "What time did the accident happen?", audio_url: "/audio/week33/exam_intro_S2.mp3" },
      { id: "eq3", text: "How long did it take the nurse to arrive?", audio_url: "/audio/week33/exam_intro_S2.mp3" }
    ]
  },
  picture_story: {
    title: "Jake's School Incident",
    images: [
      { id: 1, image_url: "/images/week33/ps_1.png", narrator_prompt: "Jake was walking carefully down the corridor." },
      { id: 2, image_url: "/images/week33/ps_2.png", narrator_prompt: "Suddenly, a boy ran fast and slipped on the wet floor." },
      { id: 3, image_url: "/images/week33/ps_3.png", narrator_prompt: "Jake rushed over to check on the hurt student." },
      { id: 4, image_url: "/images/week33/ps_4.png", narrator_prompt: "He called the school nurse right away and she bandaged his knee." }
    ],
    examiner_intro: "Look at these four pictures. They tell a story about Jake and a corridor incident. First, I'll tell you about picture one. Then you tell me about pictures two, three, and four."
  },
  personal_questions: {
    examiner_intro: "Now let's talk about you. Please listen to each question and answer clearly.",
    questions: [
      { id: "q1", question: "What's your favorite subject at school?", topic: "school", sample_answer_hint: "My favorite subject is English because I love stories." },
      { id: "q2", question: "What do you usually do on your birthday?", topic: "birthday", sample_answer_hint: "I usually have a party with my family and eat cake." },
      { id: "q3", question: "Tell me about your family.", topic: "family", sample_answer_hint: "There are four people in my family: my parents, my brother, and me." },
      { id: "q4", question: "What did you do last holiday?", topic: "holidays", sample_answer_hint: "Last holiday, I visited the beach with my cousins." }
    ]
  },
  find_differences: {
    picA: {
      title: "Picture A (School Corridor)",
      image_url: "/images/week33/w33_diff_scene_a.jpg"
    },
    picB: {
      title: "Picture B (Corridor Difference)",
      image_url: "/images/week33/w33_diff_scene_b.jpg"
    },
    differences: [
      { id: "d1", name: "Warning Sign Shape", prompt_en: "In Picture A, the warning sign is tall and yellow, but in Picture B, it is smaller.", x: 20, y: 22 },
      { id: "d2", name: "Wall Clock Time", prompt_en: "In Picture A, the clock shows ten o'clock, but in Picture B, it shows half past ten.", x: 78, y: 22 },
      { id: "d3", name: "Student Bag Color", prompt_en: "In Picture A, the student bag is blue, but in Picture B, it is bright red.", x: 30, y: 64 },
      { id: "d4", name: "First-Aid Box", prompt_en: "In Picture A, the first-aid box is on the wall, but in Picture B, it is missing.", x: 80, y: 70 }
    ]
  }
};

export const speakingHubData = speakingHub;
export default speakingHub;
