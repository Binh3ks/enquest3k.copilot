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
        },
        {
          id: "field_a5",
          label: "how / feel now?",
          cue_word: "how",
          value: "?",
          is_missing: true,
          cue_prompt: "how / feel now?",
          grammar_scaffold: "How does Tom feel now?",
          acceptable_questions: [
            "How does Tom feel now?",
            "How does he feel now?",
            "How is Tom feeling now?",
            "How is he feeling now?",
            "Is Tom feeling better now?"
          ],
          nova_reply: "Tom feels much better now and his knee is recovering well."
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
          topic: "Location",
          short_label: "Location",
          label: "Location: Near the science room",
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
          topic: "First-aid items",
          short_label: "First-aid items",
          label: "First-aid items: Clean bandage & cold pack",
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
          topic: "Arrival time",
          short_label: "Arrival time",
          label: "Arrival time: Within two minutes",
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
          topic: "Praised by",
          short_label: "Praised by",
          label: "Praised by: Headmaster Brown",
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
        },
        {
          id: "field_b5",
          topic: "Safety rule",
          short_label: "Safety rule",
          label: "Safety rule: Never run in corridors",
          value: "Never run in school corridors.",
          nova_question: "What safety rule did the headmaster remind all students?",
          audio_url: "/audio/week33/info_exchange_q5.mp3",
          hint: "Look at your card — what must students never do inside?",
          acceptable_answers: [
            "Never run in school corridors.",
            "Students must never run in corridors.",
            "Never run inside the school.",
            "Walk carefully and never run inside.",
            "Always walk carefully in corridors."
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
      { speaker: 'man',   text: "How does Tom feel now?" },
      { speaker: 'woman', text: "Tom feels much better now and his knee is recovering well." },
      { speaker: 'woman', text: "Now it is my turn to ask you questions about Jake's first aid action. What first aid item did the nurse use?" },
      { speaker: 'man',   text: "The nurse used a clean bandage and a cold pack." },
      { speaker: 'woman', text: "What safety rule did the headmaster remind everyone?" },
      { speaker: 'man',   text: "Never run in school corridors." }
    ]
  },
  picture_story: {
    title: "Jake's School Incident",
    images: [
      {
        id: 1,
        image_url: "/images/week33/ps_1.png",
        narrator_prompt: "Jake was walking carefully down the corridor."
      },
      {
        id: 2,
        image_url: "/images/week33/ps_2.png",
        narrator_prompt: "Suddenly, he lost his balance on the wet floor and slipped."
      },
      {
        id: 3,
        image_url: "/images/week33/ps_3.png",
        narrator_prompt: "Jake stopped immediately to help his friend and called the school nurse."
      },
      {
        id: 4,
        image_url: "/images/week33/ps_4.png",
        narrator_prompt: "The nurse arrived quickly with a clean bandage and a cold pack to treat the cut."
      },
      {
        id: 5,
        image_url: "/images/week33/ps_5.png",
        narrator_prompt: "Everyone felt relieved, and the headmaster reminded all students never to run in corridors."
      }
    ],
    examiner_intro: "Look at these five pictures. They tell a story about Jake and a school corridor incident. First, I’ll tell you about picture one. Then you tell me what happens in pictures two, three, four and five.",
    examiner_pic1_narration: "In the first picture, Jake was walking carefully down the school corridor. He noticed the wet floor tiles near the science room."
  },
  personal_questions: {
    examiner_intro: "Now let's talk about you. Please listen to each question and answer clearly.",
    questions: [
      { id: "q1", question: "What's your favorite subject at school?", topic: "school", sample_answer_hint: "My favorite subject is English because I love stories." },
      { id: "q2", question: "What do you usually do on your birthday?", topic: "birthday", sample_answer_hint: "I usually have a party with my family and eat cake." },
      { id: "q3", topic: "family", question: "Tell me about your family.", sample_answer_hint: "There are four people in my family: my parents, my brother, and me." },
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
      { id: "d1", name: "Student Bag Color", prompt_en: "In Picture A, the bag on the bench is blue, but in Picture B, it is red.", prompt_vi: "Ở bức tranh A, chiếc cặp trên ghế màu xanh dương, nhưng ở bức tranh B, nó màu đỏ.", x: 9, y: 69 },
      { id: "d2", name: "Potted Plant on Floor", prompt_en: "In Picture A, there is no plant on the floor, but in Picture B, there is a potted plant under the bench.", prompt_vi: "Ở bức tranh A, không có cây dưới sàn, nhưng ở bức tranh B, có một chậu cây dưới ghế.", x: 6, y: 90 },
      { id: "d3", name: "Warning Sign Color", prompt_en: "In Picture A, the caution sign is yellow, but in Picture B, it is orange.", prompt_vi: "Ở bức tranh A, biển cảnh báo màu vàng, nhưng ở bức tranh B, nó màu cam.", x: 30, y: 63 },
      { id: "d4", name: "Boy's T-shirt Color", prompt_en: "In Picture A, the boy walking is wearing a red T-shirt, but in Picture B, he is wearing a blue T-shirt.", prompt_vi: "Ở bức tranh A, cậu bé mặc áo phông đỏ, nhưng ở bức tranh B, cậu bé mặc áo phông xanh dương.", x: 50, y: 61 },
      { id: "d5", name: "Hanging Coat Color", prompt_en: "In Picture A, the coat hanging on the wall is red, but in Picture B, it is green.", prompt_vi: "Ở bức tranh A, chiếc áo khoác treo trên tường màu đỏ, nhưng ở bức tranh B, nó màu xanh lá.", x: 73, y: 53 },
      { id: "d6", name: "Wall Clock Time", prompt_en: "In Picture A, the clock shows nine o'clock, but in Picture B, it shows ten o'clock.", prompt_vi: "Ở bức tranh A, đồng hồ chỉ 9 giờ, nhưng ở bức tranh B, đồng hồ chỉ 10 giờ.", x: 61, y: 20 }
    ]
  }
};

export const speakingHubData = speakingHub;
export default speakingHub;
