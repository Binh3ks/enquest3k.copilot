// WEEK 36: Adventure Stories (Irregular Verbs)
// Logic and Science Station — Easy Mode

export default {
  title: "Adventure Logic and Science",
  theme: "adventure_stories",
  questions: [
    { id: 1, type: "logic", question_en: "You went north and then turned right. Which direction are you facing now?", options: ["East", "West", "North", "South"], correct: "East", explanation_en: "When you face north and turn right, you turn 90 degrees clockwise. That makes you face east." },
    { id: 2, type: "science", question_en: "How does a submarine go down deep into the ocean?", options: ["It fills its tanks with water to become heavier", "It uses propellers to push it down", "It has a big anchor to pull it down", "The ocean water pushes it down"], correct: "It fills its tanks with water to become heavier", explanation_en: "A submarine fills its ballast tanks with water. This makes it heavier than the water around it, so it sinks. To come back up, it pushes the water out with air." },
    { id: 3, type: "logic", question_en: "If the cave has 3 rooms and each room has 2 doors to other rooms, how many doors are there in total?", options: ["6 doors", "3 doors", "9 doors", "5 doors"], correct: "3 doors", explanation_en: "If 3 rooms each have 2 doors, that is 6 doors. But each door connects TWO rooms, so we count each door once: 6 / 2 = 3 doors." },
    { id: 4, type: "science", question_en: "Coral reefs are like underwater cities. What tiny animals build coral reefs?", options: ["Coral polyps - tiny animals that make hard shells", "Seaweed - big plants that grow on the ocean floor", "Small fish - they build homes out of sand", "Crabs - they build walls out of rocks"], correct: "Coral polyps - tiny animals that make hard shells", explanation_en: "Coral reefs are built by millions of tiny animals called coral polyps. Each polyp makes a hard shell around itself. Over thousands of years, these shells build up to form huge coral reefs." },
    { id: 5, type: "logic", question_en: "Marco Polo went to China and came back. His trip took 24 years. He left when he was 17. How old was he when he came back?", options: ["41", "34", "37", "24"], correct: "41", explanation_en: "17 + 24 = 41. Marco Polo was 41 years old when he returned home." }
  ]
};