// ADVANCED MODE - WEEK 2

const mindMapContent = {
  centerStems: [
    "This is my...",
    "My... is...", 
    "We... together.",
    "I love my...",
    "This is...",
    "We are a..."
  ],
  branchLabels: {
    "This is my...": [
      "family",
      "father",
      "mother",
      "brother",
      "sister",
      "team"
    ],
    "My... is...": [
      "father is the leader",
      "mother is kind",
      "brother is a good helper", 
      "sister is funny",
      "family is happy",
      "team is strong"
    ],
    "We... together.": [
      "play",
      "love each other",
      "are a team",
      "help",
      "work",
      "learn"
    ],
    "I love my...": [
      "family",
      "father",
      "mother",
      "brother",
      "sister",
      "team"
    ],
    "This is...": [
      "my family",
      "my team",
      "my father",
      "my mother",
      "my brother",
      "my sister"
    ],
    "We are a...": [
      "team",
      "family", 
      "happy family",
      "strong team",
      "good team",
      "loving family"
    ]
  },
  
  // Audio paths for TTS
  audio: {
    stems: {
      1: '/audio/week2/mindmap_stem_1.mp3',
      2: '/audio/week2/mindmap_stem_2.mp3',  
      3: '/audio/week2/mindmap_stem_3.mp3',
      4: '/audio/week2/mindmap_stem_4.mp3',
      5: '/audio/week2/mindmap_stem_5.mp3',
      6: '/audio/week2/mindmap_stem_6.mp3'
    },
    branches: {
      'mother': '/audio/mindmap/week_02/branch_mother.aiff',
      'father': '/audio/mindmap/week_02/branch_father.aiff',
      'sister': '/audio/mindmap/week_02/branch_sister.aiff',
      'brother': '/audio/mindmap/week_02/branch_brother.aiff',
      'family': '/audio/mindmap/week_02/branch_family.aiff',
      'team': '/audio/mindmap/week_02/branch_team.aiff',
      'kind': '/audio/mindmap/week_02/branch_kind.aiff',
      'smart': '/audio/mindmap/week_02/branch_smart.aiff',
      'helpful': '/audio/mindmap/week_02/branch_helpful.aiff',
      'funny': '/audio/mindmap/week_02/branch_funny.aiff',
      'strong': '/audio/mindmap/week_02/branch_strong.aiff',
      'caring': '/audio/mindmap/week_02/branch_caring.aiff',
      'play': '/audio/mindmap/week_02/branch_play.aiff',
      'cook': '/audio/mindmap/week_02/branch_cook.aiff',
      'study': '/audio/mindmap/week_02/branch_study.aiff',
      'eat': '/audio/mindmap/week_02/branch_eat.aiff',
      'work': '/audio/mindmap/week_02/branch_work.aiff',
      'sleep': '/audio/mindmap/week_02/branch_sleep.aiff',
      'read': '/audio/mindmap/week_02/branch_read.aiff',
      'happy': '/audio/mindmap/week_02/branch_happy.aiff',
      'home': '/audio/mindmap/week_02/branch_home.aiff',
      'school': '/audio/mindmap/week_02/branch_school.aiff',
      'love': '/audio/mindmap/week_02/branch_love.aiff',
      'helper': '/audio/mindmap/week_02/branch_helper.aiff'
    }
  }
};

export default mindMapContent;
