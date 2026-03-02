// EASY MODE - WEEK 2

const mindMapContent = {
  centerStems: [
    "This is my...",
    "My... is...",
    "I love my...",
    "This is...",
    "My... is...",
    "I have a..."
  ],
  branchLabels: {
    "This is my...": [
      "home",
      "mom",
      "dad",
      "baby",
      "cat",
      "dog"
    ],
    "My... is...": [
      "mom is nice",
      "dad is big",
      "baby is small",
      "cat is soft",
      "dog is fun",
      "home is good"
    ],
    "I love my...": [
      "home",
      "mom",
      "dad",
      "baby",
      "cat",
      "dog"
    ],
    "This is...": [
      "my room",
      "my bed",
      "my toy",
      "my book",
      "my cat",
      "my dog"
    ],
    "I have a...": [
      "mom",
      "dad",
      "baby",
      "cat",
      "dog",
      "room"
    ]
  },
  
  // Audio paths for TTS
  audio: {
    stems: {
      1: '/audio/week2_easy/mindmap_stem_1.mp3',
      2: '/audio/week2_easy/mindmap_stem_2.mp3',
      3: '/audio/week2_easy/mindmap_stem_3.mp3',
      4: '/audio/week2_easy/mindmap_stem_4.mp3',
      5: '/audio/week2_easy/mindmap_stem_5.mp3',
      6: '/audio/week2_easy/mindmap_stem_6.mp3'
    },
    branches: {
      'home': '/audio/mindmap/weeks_easy/week_02/branch_home.aiff',
      'mom': '/audio/mindmap/weeks_easy/week_02/branch_mom.aiff',
      'dad': '/audio/mindmap/weeks_easy/week_02/branch_dad.aiff',
      'baby': '/audio/mindmap/weeks_easy/week_02/branch_baby.aiff',
      'cat': '/audio/mindmap/weeks_easy/week_02/branch_cat.aiff',
      'dog': '/audio/mindmap/weeks_easy/week_02/branch_dog.aiff',
      'nice': '/audio/mindmap/weeks_easy/week_02/branch_nice.aiff',
      'fun': '/audio/mindmap/weeks_easy/week_02/branch_fun.aiff',
      'soft': '/audio/mindmap/weeks_easy/week_02/branch_soft.aiff',
      'small': '/audio/mindmap/weeks_easy/week_02/branch_small.aiff',
      'happy': '/audio/mindmap/weeks_easy/week_02/branch_happy.aiff',
      'room': '/audio/mindmap/weeks_easy/week_02/branch_room.aiff',
      'bed': '/audio/mindmap/weeks_easy/week_02/branch_bed.aiff',
      'book': '/audio/mindmap/weeks_easy/week_02/branch_book.aiff'
    }
  }
};

export default mindMapContent;
