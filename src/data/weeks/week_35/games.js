// WEEK 35: Environmental Issues
// Games Station — Advanced Mode

export const week35GamesAdvanced = {
  title: "Games: Environmental Issues — Protecting Our Planet",
  image_url: null,
  audio_url: "/audio/week35/games_main.mp3",
  games: [
    {
      id: "env_modal_verbs",
      type: "matching",
      title_en: "Modal Verb Match!",
      instruction_en: "Match each modal verb to its correct use.",
      instruction_vi: "Nối mỗi động từ modal với cách sử dụng đúng.",
      cards: [
        { id: "a1", type: "word", value: "MUST" }, { id: "a2", type: "meaning", value: "bắt buộc phải" },
        { id: "b1", type: "word", value: "SHOULD" }, { id: "b2", type: "meaning", value: "nên làm" },
        { id: "c1", type: "word", value: "CAN" }, { id: "c2", type: "meaning", value: "có thể làm" },
        { id: "d1", type: "word", value: "MUST NOT" }, { id: "d2", type: "meaning", value: "không được phép" },
        { id: "e1", type: "word", value: "SHOULD NOT" }, { id: "e2", type: "meaning", value: "không nên" },
        { id: "f1", type: "word", value: "CAN NOT" }, { id: "f2", type: "meaning", value: "không thể" }
      ]
    },
    {
      id: "env_problem_solution",
      type: "sorting",
      title_en: "Problem and Solution Sort!",
      instruction_en: "Sort each item into problems or solutions.",
      instruction_vi: "Sắp xếp mỗi mục vào vấn đề hoặc giải pháp.",
      categories: ["Environmental Problems", "Solutions"],
      items: [
        { text: "Factories release harmful gases.", correct: "Environmental Problems" },
        { text: "Solar power produces clean energy.", correct: "Solutions" },
        { text: "Polar ice is melting.", correct: "Environmental Problems" },
        { text: "We should recycle.", correct: "Solutions" },
        { text: "Sea levels are rising.", correct: "Environmental Problems" },
        { text: "We can plant more trees.", correct: "Solutions" },
        { text: "Plastic pollutes oceans.", correct: "Environmental Problems" },
        { text: "We must reduce emissions.", correct: "Solutions" }
      ]
    }
  ],
  show_tell: {
    steps: 3,
    word_list: ["planet", "pollution", "climate", "recycle", "renewable", "solar", "wind", "protect", "difference", "act"],
    instructions_easy: "Say the word clearly, then add a short phrase, then use it in a sentence about environmental issues.",
    instructions_advanced: "Use the word in a full sentence with a modal verb (must/should/can) about environmental issues.",
    step_instructions: {
      1: "Step 1: say the word clearly.",
      2: "Step 2: add a short phrase with the word.",
      3: "Step 3: make a full sentence with must, should, or can using the word."
    }
  },
  make_sentence: {
    instructions_easy: "Unscramble the words to make a correct sentence about environmental issues.",
    instructions_advanced: "Unscramble the words to make a correct sentence with a modal verb (must/should/can).",
    sentences_easy: [
      { scrambled: ["We", "must", "protect", "our", "planet"], answer: "We must protect our planet." },
      { scrambled: ["You", "should", "recycle", "more"], answer: "You should recycle more." },
      { scrambled: ["Solar", "power", "can", "help", "us"], answer: "Solar power can help us." },
      { scrambled: ["We", "must", "reduce", "pollution"], answer: "We must reduce pollution." },
      { scrambled: ["Climate", "change", "is", "a", "problem"], answer: "Climate change is a problem." }
    ],
    sentences_advanced: [
      { scrambled: ["We", "must", "protect", "our", "planet", "from", "pollution"], answer: "We must protect our planet from pollution." },
      { scrambled: ["Solar", "power", "and", "wind", "power", "can", "replace", "fossil", "fuels"], answer: "Solar power and wind power can replace fossil fuels." },
      { scrambled: ["We", "should", "all", "act", "now", "to", "save", "our", "planet"], answer: "We should all act now to save our planet." },
      { scrambled: ["Factories", "must", "reduce", "their", "carbon", "emissions"], answer: "Factories must reduce their carbon emissions." },
      { scrambled: ["Small", "actions", "can", "make", "a", "big", "difference"], answer: "Small actions can make a big difference." }
    ]
  },
  ask_me: {
    instructions_easy: "Ask a simple question about environmental issues using what, why, or how.",
    instructions_advanced: "Ask a question about environmental issues using modal verbs.",
    contexts_easy: [
      {
        id: "w35_env_problem",
        task_type: "find_question",
        topic: "environmental problems",
        intro: "Climate change is causing the Earth to get warmer. Polar ice is melting. Ask what is causing climate change.",
        acceptedQuestions: ["What is causing climate change?", "What is happening to the Earth?", "Why is the Earth getting warmer?"],
        answer: "Climate change is causing the Earth to get warmer because of greenhouse gases."
      },
      {
        id: "w35_what_can_we_do",
        task_type: "find_question",
        topic: "what we can do",
        intro: "We can recycle, plant trees, and use less energy to help the environment. Ask what we can do.",
        acceptedQuestions: ["What can we do to help?", "How can we protect our planet?", "What should we do?"],
        answer: "We can recycle, plant trees, and use less energy."
      }
    ],
    contexts_advanced: [
      {
        id: "w35_adv_modal",
        task_type: "find_question",
        topic: "modal verbs",
        intro: "We must act now to save our planet. We should reduce pollution. Ask about what we must do.",
        acceptedQuestions: ["What must we do to save our planet?", "What should we do to help?", "How can we make a difference?"],
        answer: "We must act now to save our planet. We must reduce pollution and invest in renewable energy."
      },
      {
        id: "w35_adv_renewable",
        task_type: "find_question",
        topic: "renewable energy",
        intro: "Solar power and wind power are renewable energy sources. They can replace fossil fuels. Ask about renewable energy.",
        acceptedQuestions: ["What can replace fossil fuels?", "Which energy sources are renewable?", "How can we reduce emissions?"],
        answer: "Solar power and wind power can replace fossil fuels. They are renewable energy sources."
      }
    ]
  }
};

export default week35GamesAdvanced;
