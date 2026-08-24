// Week 34 Writing Studio Data
export default {
  title: "The Lion and the Mouse — Picture Story",
  prompt_en: "Look at the three pictures. Write the story. Write 20 or more words.",
  prompt_vi: "Nhìn vào 3 bức tranh. Viết câu chuyện ngụ ngôn (20 từ trở lên).",
  min_sentences: 3,
  min_words: 20,
  max_words: 60,
  model_sentence: "While a huge lion was sleeping under a tree, a tiny mouse ran across his paw. The lion caught the mouse but let him go free. Later, hunters trapped the lion in a heavy rope net. The brave mouse chewed the ropes with his sharp teeth and freed his friend.",
  picture_story: [
    {
      panel_id: 'panel_1',
      title_en: 'Panel 1: Mouse on Sleeping Lion',
      title_vi: 'Cảnh 1: Chuột Nhỏ Trên Chân Sư Tử',
      image_url: '/images/week34/writing_panel_1.png'
    },
    {
      panel_id: 'panel_2',
      title_en: 'Panel 2: Lion Trapped in Net',
      title_vi: 'Cảnh 2: Sư Tử Bị Mắc Bẫy Lưới',
      image_url: '/images/week34/writing_panel_2.png'
    },
    {
      panel_id: 'panel_3',
      title_en: 'Panel 3: Mouse Chewing Ropes',
      title_vi: 'Cảnh 3: Chuột Cắn Dây Cứu Sư Tử',
      image_url: '/images/week34/writing_panel_3.png'
    }
  ],
  word_bank_pills: {
    action_verbs: ['was sleeping', 'ran across', 'caught mouse', 'let him go', 'trapped in net', 'chewed ropes', 'freed the lion'],
    connectors: ['one afternoon', 'suddenly', 'then', 'while', 'because', 'later', 'finally'],
    cumulative_chunks: ['sleeping under a tree', 'ran across his paw', 'caught the tiny mouse', 'trapped in a heavy net', 'chewed through the ropes'],
    grammar_boosters: ['was sleeping', 'was walking', 'were setting a trap', 'had promised']
  },
  sentence_frames: [
    { template: "While the lion was sleeping, a tiny ___ ran across his paw.", answers: ["mouse"] },
    { template: "The lion woke up and caught the mouse with his big ___.", answers: ["paw"] },
    { template: "Hunters trapped the lion in a strong rope ___.", answers: ["net"] },
    { template: "The mouse chewed the ropes with his sharp ___.", answers: ["teeth"] },
    { template: "The lion was freed and they became best ___.", answers: ["friends"] }
  ],
  picture_mode: {
    type: "picture",
    image_url: "/images/week34/writing_panel_1.png",
    panels: [
      {
        id: 1,
        image_url: "/images/week34/writing_panel_1.png",
        caption: "Panel 1: The tiny mouse runs across the sleeping lion's paw",
        character_guide: "Lion (sleeping under tree) vs. Mouse (tiny and fast)",
        action_tags: ["sleeping", "running", "forest", "tree"],
        nova_question_en: "Look at Panel 1: What was the huge lion doing when the tiny mouse ran across his paw?",
        pills: ["was sleeping under a tree,", "a tiny mouse ran across,", "on a warm afternoon,", "in the green forest,"],
        grammar_hint: "Past Continuous: was/were + V-ing (was sleeping)",
        sentence_frame: "One warm afternoon, a huge lion was sleeping under a tree when a tiny mouse ran across his paw.",
        pill_color: "blue"
      },
      {
        id: 2,
        image_url: "/images/week34/writing_panel_2.png",
        caption: "Panel 2: The lion is caught in the hunters' rope net",
        character_guide: "Lion (trapped and roaring) vs. Hunters (placed the trap)",
        action_tags: ["trapped", "net", "roaring", "ropes"],
        nova_question_en: "What happened to the lion in Panel 2 while he was walking in the forest?",
        pills: ["was walking down the path,", "stepped into a hidden trap,", "a heavy rope net,", "roared loudly for help,"],
        grammar_hint: "Past Simple: stepped, roared, trapped",
        sentence_frame: "A few days later, the lion stepped into a hidden rope net and roared loudly for help.",
        pill_color: "amber"
      },
      {
        id: 3,
        image_url: "/images/week34/writing_panel_3.png",
        caption: "Panel 3: The brave mouse chews the thick ropes to free the lion",
        character_guide: "Mouse (chewing ropes with sharp teeth) & Lion (relieved and free)",
        action_tags: ["chewing", "sharp teeth", "freed", "best friends"],
        nova_question_en: "How did the little mouse help the mighty lion in Panel 3?",
        pills: ["chewed through the thick ropes,", "with his sharp teeth,", "the lion was freed safely,", "became best friends forever,"],
        grammar_hint: "Past Simple: chewed, freed, thanked",
        sentence_frame: "The mouse chewed the ropes with his sharp teeth, freed the lion, and they became best friends.",
        pill_color: "emerald"
      }
    ]
  }
};
