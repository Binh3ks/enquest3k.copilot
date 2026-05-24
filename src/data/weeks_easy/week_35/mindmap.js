// WEEK 35 EASY: ENVIRONMENTAL ISSUES
// MindMap Speaking Station — Easy Mode

const mindMapContent = {
  centerStems: [
    { text: "The Earth is ___ today.", type: "affirmative", audio: "/audio/week35_easy/mindmap_stem_1.mp3" },
    { text: "Solar power comes from the ___.", type: "affirmative", audio: "/audio/week35_easy/mindmap_stem_2.mp3" },
    { text: "We should not ___ the Earth.", type: "negative", audio: "/audio/week35_easy/mindmap_stem_3.mp3" },
    { text: "The air is not ___ today.", type: "negative", audio: "/audio/week35_easy/mindmap_stem_4.mp3" },
    { text: "How can we ___ the Earth?", type: "question", audio: "/audio/week35_easy/mindmap_stem_5.mp3" },
    { text: "Do you ___ to recycle?", type: "question", audio: "/audio/week35_easy/mindmap_stem_6.mp3" }
  ],
  branchLabels: {
    "The Earth is ___ today.": [
      { text: "warm", audio: "/audio/week35_easy/mindmap_branch_1_1.mp3" },
      { text: "hot", audio: "/audio/week35_easy/mindmap_branch_1_2.mp3" },
      { text: "sick", audio: "/audio/week35_easy/mindmap_branch_1_3.mp3" },
      { text: "dry", audio: "/audio/week35_easy/mindmap_branch_1_4.mp3" },
      { text: "dirty", audio: "/audio/week35_easy/mindmap_branch_1_5.mp3" },
      { text: "beautiful", audio: "/audio/week35_easy/mindmap_branch_1_6.mp3" }
    ],
    "Solar power comes from the ___.": [
      { text: "sun", audio: "/audio/week35_easy/mindmap_branch_2_1.mp3" },
      { text: "sky", audio: "/audio/week35_easy/mindmap_branch_2_2.mp3" },
      { text: "solar panel", audio: "/audio/week35_easy/mindmap_branch_2_3.mp3" },
      { text: "light", audio: "/audio/week35_easy/mindmap_branch_2_4.mp3" },
      { text: "day", audio: "/audio/week35_easy/mindmap_branch_2_5.mp3" },
      { text: "space", audio: "/audio/week35_easy/mindmap_branch_2_6.mp3" }
    ],
    "We should not ___ the Earth.": [
      { text: "hurt", audio: "/audio/week35_easy/mindmap_branch_3_1.mp3" },
      { text: "pollute", audio: "/audio/week35_easy/mindmap_branch_3_2.mp3" },
      { text: "waste", audio: "/audio/week35_easy/mindmap_branch_3_3.mp3" },
      { text: "break", audio: "/audio/week35_easy/mindmap_branch_3_4.mp3" },
      { text: "ignore", audio: "/audio/week35_easy/mindmap_branch_3_5.mp3" },
      { text: "destroy", audio: "/audio/week35_easy/mindmap_branch_3_6.mp3" }
    ],
    "The air is not ___ today.": [
      { text: "clean", audio: "/audio/week35_easy/mindmap_branch_4_1.mp3" },
      { text: "fresh", audio: "/audio/week35_easy/mindmap_branch_4_2.mp3" },
      { text: "clear", audio: "/audio/week35_easy/mindmap_branch_4_3.mp3" },
      { text: "good", audio: "/audio/week35_easy/mindmap_branch_4_4.mp3" },
      { text: "healthy", audio: "/audio/week35_easy/mindmap_branch_4_5.mp3" },
      { text: "pure", audio: "/audio/week35_easy/mindmap_branch_4_6.mp3" }
    ],
    "How can we ___ the Earth?": [
      { text: "protect", audio: "/audio/week35_easy/mindmap_branch_5_1.mp3" },
      { text: "save", audio: "/audio/week35_easy/mindmap_branch_5_2.mp3" },
      { text: "help", audio: "/audio/week35_easy/mindmap_branch_5_3.mp3" },
      { text: "clean", audio: "/audio/week35_easy/mindmap_branch_5_4.mp3" },
      { text: "heal", audio: "/audio/week35_easy/mindmap_branch_5_5.mp3" },
      { text: "make better", audio: "/audio/week35_easy/mindmap_branch_5_6.mp3" }
    ],
    "Do you ___ to recycle?": [
      { text: "want", audio: "/audio/week35_easy/mindmap_branch_6_1.mp3" },
      { text: "like", audio: "/audio/week35_easy/mindmap_branch_6_2.mp3" },
      { text: "know how", audio: "/audio/week35_easy/mindmap_branch_6_3.mp3" },
      { text: "need to", audio: "/audio/week35_easy/mindmap_branch_6_4.mp3" },
      { text: "try", audio: "/audio/week35_easy/mindmap_branch_6_5.mp3" },
      { text: "have time", audio: "/audio/week35_easy/mindmap_branch_6_6.mp3" }
    ]
  }
};

export default mindMapContent;
