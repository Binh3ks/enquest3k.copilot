// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Mindmap Station — Advanced Mode

const mindMapContent = {
  centerStems: [
    { text: "Jake had an accident in the ___ yesterday.", audio: "/audio/week33/mindmap_stem_1.mp3" },
    { text: "Jake was ___ in the school corridor.", audio: "/audio/week33/mindmap_stem_2.mp3" },
    { text: "Jake ___ his knee when he fell.", audio: "/audio/week33/mindmap_stem_3.mp3" },
    { text: "Jake ___ something when he fell down.", audio: "/audio/week33/mindmap_stem_4.mp3" },
    { text: "Jake felt ___ after the accident.", audio: "/audio/week33/mindmap_stem_5.mp3" },
    { text: "Jake learned a very important ___ today.", audio: "/audio/week33/mindmap_stem_6.mp3" }
  ],
  branchLabels: {
    "Jake had an accident in the ___ yesterday.": [
      { text: "school corridor", audio: "/audio/week33/mindmap_branch_1a.mp3" },
      { text: "playground", audio: "/audio/week33/mindmap_branch_1b.mp3" },
      { text: "classroom", audio: "/audio/week33/mindmap_branch_1c.mp3" },
      { text: "kitchen", audio: "/audio/week33/mindmap_branch_1d.mp3" },
      { text: "garden", audio: "/audio/week33/mindmap_branch_1e.mp3" },
      { text: "hallway", audio: "/audio/week33/mindmap_branch_1f.mp3" }
    ],
    "Jake was ___ in the school corridor.": [
      { text: "running", audio: "/audio/week33/mindmap_branch_2a.mp3" },
      { text: "walking carefully", audio: "/audio/week33/mindmap_branch_2b.mp3" },
      { text: "jumping", audio: "/audio/week33/mindmap_branch_2c.mp3" },
      { text: "skipping", audio: "/audio/week33/mindmap_branch_2d.mp3" },
      { text: "standing", audio: "/audio/week33/mindmap_branch_2e.mp3" },
      { text: "sitting", audio: "/audio/week33/mindmap_branch_2f.mp3" }
    ],
    "Jake ___ his knee when he fell.": [
      { text: "hit", audio: "/audio/week33/mindmap_branch_3a.mp3" },
      { text: "hurt", audio: "/audio/week33/mindmap_branch_3b.mp3" },
      { text: "bumped", audio: "/audio/week33/mindmap_branch_3c.mp3" },
      { text: "scratched", audio: "/audio/week33/mindmap_branch_3d.mp3" },
      { text: "cut", audio: "/audio/week33/mindmap_branch_3e.mp3" },
      { text: "injured", audio: "/audio/week33/mindmap_branch_3f.mp3" }
    ],
    "Jake ___ something when he fell down.": [
      { text: "broke", audio: "/audio/week33/mindmap_branch_4a.mp3" },
      { text: "dropped", audio: "/audio/week33/mindmap_branch_4b.mp3" },
      { text: "spilled", audio: "/audio/week33/mindmap_branch_4c.mp3" },
      { text: "lost", audio: "/audio/week33/mindmap_branch_4d.mp3" },
      { text: "damaged", audio: "/audio/week33/mindmap_branch_4e.mp3" },
      { text: "cracked", audio: "/audio/week33/mindmap_branch_4f.mp3" }
    ],
    "Jake felt ___ after the accident.": [
      { text: "terrible", audio: "/audio/week33/mindmap_branch_5a.mp3" },
      { text: "sad", audio: "/audio/week33/mindmap_branch_5b.mp3" },
      { text: "scared", audio: "/audio/week33/mindmap_branch_5c.mp3" },
      { text: "nervous", audio: "/audio/week33/mindmap_branch_5d.mp3" },
      { text: "sorry", audio: "/audio/week33/mindmap_branch_5e.mp3" },
      { text: "upset", audio: "/audio/week33/mindmap_branch_5f.mp3" }
    ],
    "Jake learned a very important ___ today.": [
      { text: "lesson", audio: "/audio/week33/mindmap_branch_6a.mp3" },
      { text: "rule", audio: "/audio/week33/mindmap_branch_6b.mp3" },
      { text: "lesson about safety", audio: "/audio/week33/mindmap_branch_6c.mp3" },
      { text: "lesson about being careful", audio: "/audio/week33/mindmap_branch_6d.mp3" },
      { text: "message", audio: "/audio/week33/mindmap_branch_6e.mp3" },
      { text: "message about safety", audio: "/audio/week33/mindmap_branch_6f.mp3" }
    ]
  }
};

export default mindMapContent;
