// Week 35 Singapore Math Problems (5 Dynamic Bar Model Problems)
export default {
  title: "Camping Distance & Campfire Math",
  problems: [
    {
      id: 1,
      title: "Problem 1: Hiking Distance (Part-Whole)",
      problemText: "The hiking trail is 1200 meters long. The family walked 800 meters before lunch. How many meters remained?",
      correctAnswer: 400,
      answer: "400 meters",
      hintText: "Total trail (1200m) - Walked distance (800m) = 400 meters remaining.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 800, label: "800m walked", color: "#4f46e5" },
          { value: 400, label: "400m left", color: "#06b6d4" }
        ],
        totalLabel: "1200m trail"
      }
    },
    {
      id: 2,
      title: "Problem 2: Firewood Collection (Part-Whole)",
      problemText: "Tom collected 18 pine sticks and his brother collected 14 oak sticks. How many sticks did they gather in total?",
      correctAnswer: 32,
      answer: "32 sticks",
      hintText: "Pine sticks (18) + Oak sticks (14) = 32 sticks in total.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 18, label: "18 pine", color: "#f59e0b" },
          { value: 14, label: "14 oak", color: "#10b981" }
        ],
        totalLabel: "32 sticks total"
      }
    },
    {
      id: 3,
      title: "Problem 3: Marshmallow Sharing (Part-Whole)",
      problemText: "The packet had 24 marshmallows. The family roasted 16 marshmallows. How many were left in the packet?",
      correctAnswer: 8,
      answer: "8 marshmallows",
      hintText: "Total marshmallows (24) - Roasted (16) = 8 marshmallows remaining.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 16, label: "16 roasted", color: "#ec4899" },
          { value: 8, label: "8 left", color: "#8b5cf6" }
        ],
        totalLabel: "24 marshmallows"
      }
    },
    {
      id: 4,
      title: "Problem 4: Tent Sleeping Space (Comparison)",
      problemText: "The large tent can fit 6 campers. A small tent can fit 2 campers. How many more campers fit in the large tent?",
      correctAnswer: 4,
      answer: "4 campers",
      hintText: "Large tent (6) - Small tent (2) = 4 more campers.",
      modelData: {
        type: "comparison",
        bars: [
          { value: 6, label: "Large tent (6)", color: "#0ea5e9" },
          { value: 2, label: "Small tent (2)", color: "#ef4444" }
        ],
        diffLabel: "4 more"
      }
    },
    {
      id: 5,
      title: "Problem 5: Stargazing Time (Part-Whole)",
      problemText: "They stargazed for 45 minutes before bedtime and 15 minutes at dawn. How many minutes did they stargaze in total?",
      correctAnswer: 60,
      answer: "60 minutes",
      hintText: "Night stargazing (45m) + Dawn stargazing (15m) = 60 minutes in total.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 45, label: "45m night", color: "#6366f1" },
          { value: 15, label: "15m dawn", color: "#14b8a6" }
        ],
        totalLabel: "60 min total"
      }
    }
  ]
};
