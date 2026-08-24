// Week 34 Singapore Math Problems (5 Problems with dynamic BarModelSVG modelData)
export default {
  title: "Forest Journey & Animal Math Problems",
  problems: [
    {
      id: 1,
      title: "Problem 1: Rope Length for the Trap (Part-Whole)",
      problemText: "The hunters had 60 meters of strong rope. They used 25 meters to make the net. How many meters of rope were left?",
      correctAnswer: 35,
      answer: "35 meters",
      hintText: "Total rope (60m) - Used rope (25m) = 35 meters remaining.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 25, label: "25m used", color: "#ef4444" },
          { value: 35, label: "35m left", color: "#22c55e" }
        ],
        totalLabel: "60m rope total"
      }
    },
    {
      id: 2,
      title: "Problem 2: Daily Sleep Time (Part-Whole)",
      problemText: "The lion slept for 14 hours during the day and rested for 4 hours at night. How many hours did he rest in total?",
      correctAnswer: 18,
      answer: "18 hours",
      hintText: "Day sleep (14h) + Night rest (4h) = 18 hours in total.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 14, label: "14h day", color: "#4f46e5" },
          { value: 4, label: "4h night", color: "#06b6d4" }
        ],
        totalLabel: "18h total"
      }
    },
    {
      id: 3,
      title: "Problem 3: Mouse Running Distance (Comparison)",
      problemText: "The mouse ran 80 meters to reach the trapped lion. A rabbit ran 45 meters. How many more meters did the mouse run?",
      correctAnswer: 35,
      answer: "35 meters",
      hintText: "Mouse distance (80m) - Rabbit distance (45m) = 35 meters difference.",
      modelData: {
        type: "comparison",
        bars: [
          { value: 80, label: "Mouse (80m)", color: "#8b5cf6" },
          { value: 45, label: "Rabbit (45m)", color: "#f59e0b" }
        ],
        diffLabel: "35m more"
      }
    },
    {
      id: 4,
      title: "Problem 4: Chewing the Ropes (Part-Whole)",
      problemText: "The net had 30 thick ropes. The mouse chewed 18 ropes in the morning. How many ropes were left to chew?",
      correctAnswer: 12,
      answer: "12 ropes",
      hintText: "Total ropes (30) - Chewed ropes (18) = 12 ropes remaining.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 18, label: "18 chewed", color: "#10b981" },
          { value: 12, label: "12 left", color: "#6366f1" }
        ],
        totalLabel: "30 ropes"
      }
    },
    {
      id: 5,
      title: "Problem 5: Animals in the Clearing (Part-Whole)",
      problemText: "There were 50 animals in the forest clearing. 32 were birds and the rest were small mammals. How many small mammals were there?",
      correctAnswer: 18,
      answer: "18 small mammals",
      hintText: "Total animals (50) - Birds (32) = 18 small mammals.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 32, label: "32 birds", color: "#0ea5e9" },
          { value: 18, label: "18 mammals", color: "#ec4899" }
        ],
        totalLabel: "50 animals"
      }
    }
  ]
};
