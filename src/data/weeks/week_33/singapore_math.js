// Week 33 Singapore Math Problems (Full 5 Problems with dynamic BarModelSVG modelData)
export default {
  title: "Corridor Distance & School Safety Math",
  problems: [
    {
      id: 1,
      title: "Problem 1: Corridor Distance (Part-Whole)",
      problemText: "Jake walked 40 meters. The corridor is 100 meters long. How many meters are left?",
      correctAnswer: 60,
      answer: "60 meters",
      hintText: "Total distance (100m) - Walked distance (40m) = 60 meters remaining.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 40, label: "40m walked", color: "#4f46e5" },
          { value: 60, label: "60m left", color: "#06b6d4" }
        ],
        totalLabel: "100m corridor"
      }
    },
    {
      id: 2,
      title: "Problem 2: Bandage Stock (Part-Whole)",
      problemText: "The nurse had 25 bandages. She used 8 bandages. How many bandages remain?",
      correctAnswer: 17,
      answer: "17 bandages",
      hintText: "Total bandages (25) - Used bandages (8) = 17 bandages remaining.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 8, label: "8 used", color: "#ef4444" },
          { value: 17, label: "17 left", color: "#22c55e" }
        ],
        totalLabel: "25 bandages"
      }
    },
    {
      id: 3,
      title: "Problem 3: Treatment Time (Part-Whole)",
      problemText: "Tom rested for 15 minutes and applied ice for 10 minutes. What is the total treatment time?",
      correctAnswer: 25,
      answer: "25 minutes",
      hintText: "Resting time (15m) + Ice treatment time (10m) = 25 total minutes.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 15, label: "15m rest", color: "#8b5cf6" },
          { value: 10, label: "10m ice", color: "#0ea5e9" }
        ],
        totalLabel: "25 min total"
      }
    },
    {
      id: 4,
      title: "Problem 4: Safety Rule Compliance (Part-Whole)",
      problemText: "Class 4A has 30 students. 24 students followed safety rules. How many ran?",
      correctAnswer: 6,
      answer: "6 students",
      hintText: "Total students (30) - Safe students (24) = 6 students running.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 24, label: "24 safe", color: "#22c55e" },
          { value: 6, label: "6 ran", color: "#f97316" }
        ],
        totalLabel: "30 students"
      }
    },
    {
      id: 5,
      title: "Problem 5: Safety Helper Stars (Multiplication)",
      problemText: "The headmaster gave 5 safety stars to each of 4 helpers. How many stars in total?",
      correctAnswer: 20,
      answer: "20 stars",
      hintText: "Multiply 5 stars × 4 helpers = 20 total stars.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 5, label: "Helper 1", color: "#f59e0b" },
          { value: 5, label: "Helper 2", color: "#f59e0b" },
          { value: 5, label: "Helper 3", color: "#f59e0b" },
          { value: 5, label: "Helper 4", color: "#f59e0b" }
        ],
        totalLabel: "20 stars"
      }
    }
  ]
};
