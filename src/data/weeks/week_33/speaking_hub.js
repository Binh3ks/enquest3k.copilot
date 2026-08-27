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
    // Cambridge Speaking Part 2: Examiner asks Candidate → Candidate asks Examiner
    // Voices: woman = Examiner (Journey-F), man = Candidate (Neural2-D)
    dialogue_script: [
      { speaker: 'woman', text: "Now I'd like you to ask and answer some questions about the school accident. I have a card with some information, and so do you. Let's start. I'll ask you first." },
      { speaker: 'woman', text: "Where did the accident happen exactly?" },
      { speaker: 'man',   text: "It happened in the school corridor, near the science room." },
      { speaker: 'woman', text: "Good. And which part of Tom's body was hurt?" },
      { speaker: 'man',   text: "He hurt his right knee. It was quite swollen." },
      { speaker: 'woman', text: "Right. Now it's your turn. Ask me about Jake's information on your card." },
      { speaker: 'man',   text: "OK! What first aid item did Jake use to help Tom?" },
      { speaker: 'woman', text: "Jake used a clean bandage and a cold pack to treat Tom's knee." },
      { speaker: 'man',   text: "And who praised Jake afterwards?" },
      { speaker: 'woman', text: "The headmaster praised Jake in the school assembly. He was very proud of him." }
    ],
    prompt_questions: [
      "Where did the accident happen?",
      "Which part of Tom's body was hurt?",
      "What first aid item did Jake use?"
    ],
    examiner_questions: [
      { id: "eq1", text: "Where did the accident happen exactly?" },
      { id: "eq2", text: "Which part of Tom's body was hurt?" },
      { id: "eq3", text: "What first aid item did Jake use to help Tom?" }
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
