export default {
  title: "Logic & Science: Order Matters!",
  image_url: "/images/week25/logic_cover_w25.jpg",
  audio_url: "/audio/week25/logic_main.mp3",
  intro_en: "Use logic and what you know about sequences to answer these questions.",
  intro_vi: "Dùng logic và những gì bạn biết về trình tự để trả lời các câu hỏi này.",
  questions: [
    {
      id: 1,
      type: "logic",
      question_en: "Mia wants to make a jam sandwich. She has bread, jam, and a knife. What must she do FIRST before she can spread the jam?",
      options: ["Get the two slices of bread out", "Eat the sandwich", "Rinse the knife", "Put the slices together"],
      correct: "Get the two slices of bread out",
      explanation_en: "Before you can spread jam, you need something to spread it on. The bread must come first.",
      audio_url: "/audio/week25/logic_q1.mp3"
    },
    {
      id: 2,
      type: "logic",
      question_en: "Leo did these steps in the WRONG ORDER: 1) Rinse mouth, 2) Brush teeth, 3) Squeeze toothpaste, 4) Tidy up. What is the CORRECT order?",
      options: [
        "3 → 2 → 1 → 4 (Squeeze → Brush → Rinse → Tidy)",
        "1 → 2 → 3 → 4 (Rinse → Brush → Squeeze → Tidy)",
        "2 → 3 → 1 → 4 (Brush → Squeeze → Rinse → Tidy)",
        "4 → 3 → 2 → 1 (Tidy → Squeeze → Brush → Rinse)"
      ],
      correct: "3 → 2 → 1 → 4 (Squeeze → Brush → Rinse → Tidy)",
      explanation_en: "You must squeeze toothpaste first, then brush teeth, then rinse your mouth, and finally tidy up.",
      audio_url: "/audio/week25/logic_q2.mp3"
    },
    {
      id: 3,
      type: "science",
      question_en: "In computer science, a set of step-by-step instructions is called an 'algorithm'. What would happen if a computer ran steps 2 and 3 of an algorithm in the WRONG order?",
      options: [
        "The result would be wrong or the program would crash",
        "Nothing — the order never matters in computers",
        "The computer would automatically fix the order",
        "The program would run faster"
      ],
      correct: "The result would be wrong or the program would crash",
      explanation_en: "Computers follow instructions exactly. If the order is wrong, the program cannot correct itself and will produce an error or wrong output.",
      audio_url: "/audio/week25/logic_q3.mp3"
    },
    {
      id: 4,
      type: "logic",
      question_en: "A plant grows in this sequence: seed planted → absorbs water → root grows → shoot grows → leaves appear. If the 'root grows' step was SKIPPED, what would happen to the plant?",
      options: [
        "The plant could not absorb water or stand upright, so it would die",
        "The plant would grow faster without roots",
        "The plant would grow leaves first instead",
        "Nothing would change — roots are not needed"
      ],
      correct: "The plant could not absorb water or stand upright, so it would die",
      explanation_en: "Roots absorb water and anchor the plant. Without this step, the plant cannot get the nutrients it needs and will not survive.",
      audio_url: "/audio/week25/logic_q4.mp3"
    },
    {
      id: 5,
      type: "science",
      question_en: "Why does the human digestive system follow the same sequence every time (mouth → stomach → intestine)?",
      options: [
        "Each organ is designed to process food at a specific stage — changing the order would damage the organs",
        "Because it is boring to change the order",
        "Because the food prefers to go in circles",
        "To make digestion take longer"
      ],
      correct: "Each organ is designed to process food at a specific stage — changing the order would damage the organs",
      explanation_en: "Each part of the digestive system has a specific job (teeth for chewing, stomach for acid digestion). The sequence ensures each organ gets the food at the right stage.",
      audio_url: "/audio/week25/logic_q5.mp3"
    }
  ]
};
