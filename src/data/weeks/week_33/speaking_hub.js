// Pure Generated Speaking Hub for Week 33
export const speakingHub = {
  talkshow_video: {
    video_id: "corridor_safety_w33",
    title: "School Corridor Safety & Responsibility"
  },
  info_exchange_cards: {
    audio_url: "/audio/week33/exam_intro_S2.mp3",
    table_a: {
      title: "Tom's Accident",
      subtitle: "Candidate's Question Card (Ask Examiner)",
      person: "Tom",
      fields: [
        {
          id: "field_a1",
          label: "where / get injured?",
          cue_word: "where",
          value: "?",
          is_missing: true,
          cue_prompt: "where / get injured?",
          grammar_scaffold: "Where did Tom get injured?",
          acceptable_questions: [
            "Where did Tom get injured?",
            "Where was Tom injured?",
            "Where did he get hurt?",
            "Where did he slip?",
            "Where did the accident happen?"
          ],
          nova_reply: "Tom got injured in the main school corridor near the science lab."
        },
        {
          id: "field_a2",
          label: "what / hurt?",
          cue_word: "what",
          value: "?",
          is_missing: true,
          cue_prompt: "what / hurt?",
          grammar_scaffold: "What did Tom hurt?",
          acceptable_questions: [
            "What did Tom hurt?",
            "What did he hurt?",
            "Which part of his body did he hurt?",
            "What was hurt?"
          ],
          nova_reply: "Tom hurt his right knee when he fell on the wet floor."
        },
        {
          id: "field_a3",
          label: "when / accident happen?",
          cue_word: "when",
          value: "?",
          is_missing: true,
          cue_prompt: "when / accident happen?",
          grammar_scaffold: "When did the accident happen?",
          acceptable_questions: [
            "When did the accident happen?",
            "When did Tom slip?",
            "What time did the accident happen?",
            "When did he fall down?"
          ],
          nova_reply: "It happened this morning right after science class."
        },
        {
          id: "field_a4",
          label: "who / helped Tom?",
          cue_word: "who",
          value: "?",
          is_missing: true,
          cue_prompt: "who / helped Tom?",
          grammar_scaffold: "Who helped Tom?",
          acceptable_questions: [
            "Who helped Tom?",
            "Who helped Tom immediately?",
            "Who helped him?",
            "Who stopped to help?"
          ],
          nova_reply: "Jake stopped walking and called the school nurse right away."
        }
      ]
    },
    table_b: {
      title: "Jake's First Aid Action",
      subtitle: "Your Information Card — Answer the Examiner's Questions",
      person: "Jake",
      fields: [
        {
          id: "field_b1",
          label: "Where did Jake help Tom?",
          value: "Near the science room.",
          nova_question: "Where did Jake help his friend?",
          audio_url: "/audio/week33/info_exchange_q1.mp3",
          hint: "Check your card — where was Jake standing when he helped?",
          acceptable_answers: [
            "He helped him near the science room.",
            "Near the science room.",
            "In the school corridor near the science lab.",
            "Near the science lab."
          ]
        },
        {
          id: "field_b2",
          label: "What first-aid items did the nurse use?",
          value: "A clean bandage and a cold pack.",
          nova_question: "What first aid items did the nurse use?",
          audio_url: "/audio/week33/info_exchange_q2.mp3",
          hint: "Look at your card — two items are listed.",
          acceptable_answers: [
            "The nurse used a clean bandage and a cold pack.",
            "A clean bandage and a cold pack.",
            "Clean bandage and cold pack.",
            "She used a bandage and a cold pack."
          ]
        },
        {
          id: "field_b3",
          label: "How fast did the nurse arrive?",
          value: "Within two minutes.",
          nova_question: "How fast did the school nurse arrive to help?",
          audio_url: "/audio/week33/info_exchange_q3.mp3",
          hint: "Your card says the nurse was very quick — how many minutes?",
          acceptable_answers: [
            "She arrived within two minutes.",
            "Within two minutes.",
            "In about two minutes.",
            "Two minutes.",
            "In two minutes."
          ]
        },
        {
          id: "field_b4",
          label: "Who praised Jake?",
          value: "The headmaster praised him in the school assembly.",
          nova_question: "Who praised Jake for his quick action?",
          audio_url: "/audio/week33/info_exchange_q4.mp3",
          hint: "Who spoke about Jake in front of the whole school?",
          acceptable_answers: [
            "The headmaster praised him in school assembly.",
            "Headmaster Brown in the assembly.",
            "The headmaster.",
            "Headmaster Brown praised Jake.",
            "The headmaster praised him."
          ]
        }
      ]
    },
    dialogue_script: [
      { speaker: 'woman', text: "Now, let's practice asking and answering questions. I have information about Tom's accident, and you have questions to ask me. Let's begin." },
      { speaker: 'man',   text: "Where did Tom have the accident?" },
      { speaker: 'woman', text: "He slipped in the school corridor near the science lab." },
      { speaker: 'man',   text: "Which part of his body was hurt?" },
      { speaker: 'woman', text: "He hurt his right knee when he fell." },
      { speaker: 'man',   text: "When did the accident happen?" },
      { speaker: 'woman', text: "It happened this morning right after science class." },
      { speaker: 'man',   text: "Who helped Tom immediately?" },
      { speaker: 'woman', text: "Jake stopped walking and called the school nurse right away." },
      { speaker: 'woman', text: "Now it is my turn to ask you questions about Jake's first aid action. What first aid item did the nurse use?" },
      { speaker: 'man',   text: "The nurse used a clean bandage and a cold pack." }
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
