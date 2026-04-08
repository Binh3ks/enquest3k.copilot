export const week29GamesAdvanced = {
  title: "Games: Off We Go! — Irregular Verbs 1",
  image_url: "/images/week29/games_cover_w29.jpg",
  audio_url: "/audio/week29/games_main.mp3",
  games: [
    {
      id: "verb_time_machine",
      type: "matching",
      title_en: "Verb Time Machine!",
      instruction_en: "Match each base verb to its past simple form.",
      instruction_vi: "Noi moi dong tu nguyen mau voi dang qua khu cua no.",
      cards: [
        { id: "a1", type: "word", value: "go" }, { id: "a2", type: "meaning", value: "went" },
        { id: "b1", type: "word", value: "run" }, { id: "b2", type: "meaning", value: "ran" },
        { id: "c1", type: "word", value: "come" }, { id: "c2", type: "meaning", value: "came" },
        { id: "d1", type: "word", value: "fly" }, { id: "d2", type: "meaning", value: "flew" },
        { id: "e1", type: "word", value: "journey" }, { id: "e2", type: "meaning", value: "cuoc hanh trinh" },
        { id: "f1", type: "word", value: "departure" }, { id: "f2", type: "meaning", value: "khoi hanh" },
        { id: "g1", type: "word", value: "destination" }, { id: "g2", type: "meaning", value: "diem den" }
      ]
    },
    {
      id: "airport_sequence",
      type: "sorting",
      title_en: "Airport Story Sequence!",
      instruction_en: "Drag each event into the correct order of Lily's journey.",
      instruction_vi: "Keo moi su kien vao dung thu tu cua hanh trinh cua Lily.",
      categories: ["Step 1 (First)", "Step 2 (Next)", "Step 3 (After that)", "Step 4 (Finally)"],
      items: [
        { text: "Lily's family went to the airport by taxi.", correct: "Step 1 (First)" },
        { text: "Dad ran to the check-in desk because they were early.", correct: "Step 1 (First)" },
        { text: "Mum came through the doors with two big suitcases.", correct: "Step 2 (Next)" },
        { text: "They rushed to the departure gate for boarding.", correct: "Step 2 (Next)" },
        { text: "The plane flew up into the blue sky above the clouds.", correct: "Step 3 (After that)" },
        { text: "Lily pressed her face against the window to see the tiny cars below.", correct: "Step 3 (After that)" },
        { text: "The plane landed at Da Nang — their destination.", correct: "Step 4 (Finally)" },
        { text: "Grandma ran to hug everyone and asked: 'How was the journey?'", correct: "Step 4 (Finally)" }
      ]
    }
  ],
  show_tell: {
    steps: 3,
    word_list: ["journey", "airport", "passenger", "departure", "arrival", "ticket", "luggage", "platform", "destination", "route", "delay", "vehicle", "adventure"],
    instructions_easy: "Say the word clearly, then add a short phrase, then use went/ran/came/flew in a sentence.",
    instructions_advanced: "Use the word in a full Past Simple sentence about a travel experience, with went / ran / came / flew.",
    step_instructions: {
      1: "Step 1: say the word clearly.",
      2: "Step 2: add a short phrase with the word.",
      3: "Step 3: make a full Past Simple sentence using the word."
    }
  }
};

