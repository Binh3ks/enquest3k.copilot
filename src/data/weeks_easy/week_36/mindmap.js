// WEEK 36: Adventure Stories (Irregular Verbs) — Easy Mode
// Mindmap Station — Easy Mode
// W35 format: centerStems[] + branchLabels{}
// Grammar: Irregular verbs (past tense, simple)

const mindMapContent = {
  "centerStems": [
    { "text": "Yesterday, I ___ to school.", "type": "affirmative", "audio": "/audio/week36_easy/mindmap_stem_1.mp3" },
    { "text": "I ___ a big shell.", "type": "affirmative", "audio": "/audio/week36_easy/mindmap_stem_2.mp3" },
    { "text": "He ___ a book about caves.", "type": "affirmative", "audio": "/audio/week36_easy/mindmap_stem_3.mp3" },
    { "text": "I never ___ that picture.", "type": "negative", "audio": "/audio/week36_easy/mindmap_stem_4.mp3" },
    { "text": "We did not ___ a present.", "type": "negative", "audio": "/audio/week36_easy/mindmap_stem_5.mp3" },
    { "text": "What ___ you eat?", "type": "question", "audio": "/audio/week36_easy/mindmap_stem_6.mp3" }
  ],
  "branchLabels": {
    "Yesterday, I ___ to school.": [
      { "text": "went", "audio": "/audio/week36_easy/mindmap_branch_1_1.mp3" },
      { "text": "came", "audio": "/audio/week36_easy/mindmap_branch_1_2.mp3" },
      { "text": "ran", "audio": "/audio/week36_easy/mindmap_branch_1_3.mp3" },
      { "text": "rode", "audio": "/audio/week36_easy/mindmap_branch_1_4.mp3" },
      { "text": "swam", "audio": "/audio/week36_easy/mindmap_branch_1_5.mp3" },
      { "text": "walked", "audio": "/audio/week36_easy/mindmap_branch_1_6.mp3" }
    ],
    "I ___ a big shell.": [
      { "text": "found", "audio": "/audio/week36_easy/mindmap_branch_2_1.mp3" },
      { "text": "saw", "audio": "/audio/week36_easy/mindmap_branch_2_2.mp3" },
      { "text": "took", "audio": "/audio/week36_easy/mindmap_branch_2_3.mp3" },
      { "text": "had", "audio": "/audio/week36_easy/mindmap_branch_2_4.mp3" },
      { "text": "made", "audio": "/audio/week36_easy/mindmap_branch_2_5.mp3" },
      { "text": "got", "audio": "/audio/week36_easy/mindmap_branch_2_6.mp3" }
    ],
    "He ___ a book about caves.": [
      { "text": "wrote", "audio": "/audio/week36_easy/mindmap_branch_3_1.mp3" },
      { "text": "read", "audio": "/audio/week36_easy/mindmap_branch_3_2.mp3" },
      { "text": "had", "audio": "/audio/week36_easy/mindmap_branch_3_3.mp3" },
      { "text": "got", "audio": "/audio/week36_easy/mindmap_branch_3_4.mp3" },
      { "text": "made", "audio": "/audio/week36_easy/mindmap_branch_3_5.mp3" },
      { "text": "told", "audio": "/audio/week36_easy/mindmap_branch_3_6.mp3" }
    ],
    "I never ___ that picture.": [
      { "text": "saw", "audio": "/audio/week36_easy/mindmap_branch_4_1.mp3" },
      { "text": "made", "audio": "/audio/week36_easy/mindmap_branch_4_2.mp3" },
      { "text": "took", "audio": "/audio/week36_easy/mindmap_branch_4_3.mp3" },
      { "text": "found", "audio": "/audio/week36_easy/mindmap_branch_4_4.mp3" },
      { "text": "had", "audio": "/audio/week36_easy/mindmap_branch_4_5.mp3" },
      { "text": "got", "audio": "/audio/week36_easy/mindmap_branch_4_6.mp3" }
    ],
    "We did not ___ a present.": [
      { "text": "take", "audio": "/audio/week36_easy/mindmap_branch_5_1.mp3" },
      { "text": "make", "audio": "/audio/week36_easy/mindmap_branch_5_2.mp3" },
      { "text": "give", "audio": "/audio/week36_easy/mindmap_branch_5_3.mp3" },
      { "text": "find", "audio": "/audio/week36_easy/mindmap_branch_5_4.mp3" },
      { "text": "get", "audio": "/audio/week36_easy/mindmap_branch_5_5.mp3" },
      { "text": "have", "audio": "/audio/week36_easy/mindmap_branch_5_6.mp3" }
    ],
    "What ___ you eat?": [
      { "text": "did", "audio": "/audio/week36_easy/mindmap_branch_6_1.mp3" },
      { "text": "ate", "audio": "/audio/week36_easy/mindmap_branch_6_2.mp3" },
      { "text": "saw", "audio": "/audio/week36_easy/mindmap_branch_6_3.mp3" },
      { "text": "had", "audio": "/audio/week36_easy/mindmap_branch_6_4.mp3" },
      { "text": "made", "audio": "/audio/week36_easy/mindmap_branch_6_5.mp3" },
      { "text": "took", "audio": "/audio/week36_easy/mindmap_branch_6_6.mp3" }
    ]
  }
};

export default mindMapContent;