const mindMapContent = {
  centerStems: [
    { text: "Yesterday, I ___.", audio: "/audio/week22_easy/mindmap_stem_1.mp3" },
    { text: "/audio/week22_easy/mindmap_stem_1.mp3", audio: "/audio/week22_easy/mindmap_stem_2.mp3" },
    { text: "My friend ___.", audio: "/audio/week22_easy/mindmap_stem_3.mp3" },
    { text: "/audio/week22_easy/mindmap_stem_2.mp3", audio: "/audio/week22_easy/mindmap_stem_4.mp3" },
    { text: "In the morning, I ___.", audio: "/audio/week22_easy/mindmap_stem_5.mp3" },
    { text: "/audio/week22_easy/mindmap_stem_3.mp3", audio: "/audio/week22_easy/mindmap_stem_6.mp3" },
    { text: "I really enjoy ___.", audio: "/audio/week22_easy/mindmap_stem_7.mp3" },
    { text: "/audio/week22_easy/mindmap_stem_4.mp3", audio: "/audio/week22_easy/mindmap_stem_8.mp3" },
    { text: "At home, I ___.", audio: "/audio/week22_easy/mindmap_stem_9.mp3" },
    { text: "/audio/week22_easy/mindmap_stem_5.mp3", audio: "/audio/week22_easy/mindmap_stem_10.mp3" },
    { text: "My best day ___.", audio: "/audio/week22_easy/mindmap_stem_11.mp3" },
    { text: "/audio/week22_easy/mindmap_stem_6.mp3", audio: "/audio/week22_easy/mindmap_stem_12.mp3" }
  ],
  branchLabels: {
    "Yesterday, I ___.": [
      { text: { text: "walked to school", audio: "/audio/week22_easy/mindmap_branch_1.mp3" }, audio: "/audio/week22_easy/mindmap_branch_1.mp3" },
      { text: { text: "played in the park", audio: "/audio/week22_easy/mindmap_branch_2.mp3" }, audio: "/audio/week22_easy/mindmap_branch_2.mp3" },
      { text: { text: "watched TV", audio: "/audio/week22_easy/mindmap_branch_3.mp3" }, audio: "/audio/week22_easy/mindmap_branch_3.mp3" },
      { text: { text: "listened to music", audio: "/audio/week22_easy/mindmap_branch_4.mp3" }, audio: "/audio/week22_easy/mindmap_branch_4.mp3" },
      { text: { text: "finished my homework", audio: "/audio/week22_easy/mindmap_branch_5.mp3" }, audio: "/audio/week22_easy/mindmap_branch_5.mp3" },
      { text: { text: "cleaned my room", audio: "/audio/week22_easy/mindmap_branch_6.mp3" }, audio: "/audio/week22_easy/mindmap_branch_6.mp3" }
    ],
    "My friend ___.": [
      { text: { text: "talked to me", audio: "/audio/week22_easy/mindmap_branch_7.mp3" }, audio: "/audio/week22_easy/mindmap_branch_7.mp3" },
      { text: { text: "played with me", audio: "/audio/week22_easy/mindmap_branch_8.mp3" }, audio: "/audio/week22_easy/mindmap_branch_8.mp3" },
      { text: { text: "helped me", audio: "/audio/week22_easy/mindmap_branch_9.mp3" }, audio: "/audio/week22_easy/mindmap_branch_9.mp3" },
      { text: { text: "looked at the stars", audio: "/audio/week22_easy/mindmap_branch_10.mp3" }, audio: "/audio/week22_easy/mindmap_branch_10.mp3" },
      { text: { text: "started a game", audio: "/audio/week22_easy/mindmap_branch_11.mp3" }, audio: "/audio/week22_easy/mindmap_branch_11.mp3" },
      { text: { text: "walked with me", audio: "/audio/week22_easy/mindmap_branch_12.mp3" }, audio: "/audio/week22_easy/mindmap_branch_12.mp3" }
    ],
    "In the morning, I ___.": [
      { text: { text: "walked to school", audio: "/audio/week22_easy/mindmap_branch_13.mp3" }, audio: "/audio/week22_easy/mindmap_branch_13.mp3" },
      { text: { text: "looked at the sky", audio: "/audio/week22_easy/mindmap_branch_14.mp3" }, audio: "/audio/week22_easy/mindmap_branch_14.mp3" },
      { text: { text: "opened my window", audio: "/audio/week22_easy/mindmap_branch_15.mp3" }, audio: "/audio/week22_easy/mindmap_branch_15.mp3" },
      { text: { text: "talked to mom", audio: "/audio/week22_easy/mindmap_branch_16.mp3" }, audio: "/audio/week22_easy/mindmap_branch_16.mp3" },
      { text: { text: "washed my face", audio: "/audio/week22_easy/mindmap_branch_17.mp3" }, audio: "/audio/week22_easy/mindmap_branch_17.mp3" },
      { text: { text: "started my day", audio: "/audio/week22_easy/mindmap_branch_18.mp3" }, audio: "/audio/week22_easy/mindmap_branch_18.mp3" }
    ],
    "I really enjoy ___.": [
      { text: { text: "playing in the park", audio: "/audio/week22_easy/mindmap_branch_19.mp3" }, audio: "/audio/week22_easy/mindmap_branch_19.mp3" },
      { text: { text: "watching movies", audio: "/audio/week22_easy/mindmap_branch_20.mp3" }, audio: "/audio/week22_easy/mindmap_branch_20.mp3" },
      { text: { text: "listening to music", audio: "/audio/week22_easy/mindmap_branch_21.mp3" }, audio: "/audio/week22_easy/mindmap_branch_21.mp3" },
      { text: { text: "talking to friends", audio: "/audio/week22_easy/mindmap_branch_22.mp3" }, audio: "/audio/week22_easy/mindmap_branch_22.mp3" },
      { text: { text: "helping my mom", audio: "/audio/week22_easy/mindmap_branch_23.mp3" }, audio: "/audio/week22_easy/mindmap_branch_23.mp3" },
      { text: { text: "cooking with dad", audio: "/audio/week22_easy/mindmap_branch_24.mp3" }, audio: "/audio/week22_easy/mindmap_branch_24.mp3" }
    ],
    "At home, I ___.": [
      { text: { text: "cleaned my room", audio: "/audio/week22_easy/mindmap_branch_25.mp3" }, audio: "/audio/week22_easy/mindmap_branch_25.mp3" },
      { text: { text: "helped with dinner", audio: "/audio/week22_easy/mindmap_branch_26.mp3" }, audio: "/audio/week22_easy/mindmap_branch_26.mp3" },
      { text: { text: "washed the dishes", audio: "/audio/week22_easy/mindmap_branch_27.mp3" }, audio: "/audio/week22_easy/mindmap_branch_27.mp3" },
      { text: { text: "finished my homework", audio: "/audio/week22_easy/mindmap_branch_28.mp3" }, audio: "/audio/week22_easy/mindmap_branch_28.mp3" },
      { text: { text: "talked to my family", audio: "/audio/week22_easy/mindmap_branch_29.mp3" }, audio: "/audio/week22_easy/mindmap_branch_29.mp3" },
      { text: { text: "watched a movie", audio: "/audio/week22_easy/mindmap_branch_30.mp3" }, audio: "/audio/week22_easy/mindmap_branch_30.mp3" }
    ],
    "My best day ___.": [
      { text: { text: "was yesterday", audio: "/audio/week22_easy/mindmap_branch_31.mp3" }, audio: "/audio/week22_easy/mindmap_branch_31.mp3" },
      { text: { text: "happened last week", audio: "/audio/week22_easy/mindmap_branch_32.mp3" }, audio: "/audio/week22_easy/mindmap_branch_32.mp3" },
      { text: { text: "started early", audio: "/audio/week22_easy/mindmap_branch_33.mp3" }, audio: "/audio/week22_easy/mindmap_branch_33.mp3" },
      { text: { text: "included my friends", audio: "/audio/week22_easy/mindmap_branch_34.mp3" }, audio: "/audio/week22_easy/mindmap_branch_34.mp3" },
      { text: { text: "ended with stars", audio: "/audio/week22_easy/mindmap_branch_35.mp3" }, audio: "/audio/week22_easy/mindmap_branch_35.mp3" },
      { text: { text: "made me happy", audio: "/audio/week22_easy/mindmap_branch_36.mp3" }, audio: "/audio/week22_easy/mindmap_branch_36.mp3" }
    ]
  }
};

export default mindMapContent;
