export default {
  title: "Sports Day Speed & Science Logic Lab",
  theme: "sports_day_science",
  questions: [
    {
      id: 1,
      type: "science",
      clue_statement: "Leo ran 100 metres in 10 seconds. He used the physics formula velocity = distance / time.",
      question_en: "What was Leo's average running velocity during the race?",
      options: [
        "10 metres per second",
        "100 metres per second",
        "1000 metres per second",
        "5 metres per second"
      ],
      correct: "10 metres per second",
      explanation_en: "Velocity = distance / time = 100m / 10s = 10 m/s!"
    },
    {
      id: 2,
      type: "logic",
      clue_statement: "If a runner starts accelerating 5 metres BEFORE reaching the exchange zone, they reach top speed right when receiving the baton.",
      question_en: "Why is sprinting early before the exchange zone better than starting from a standstill?",
      options: [
        "It maintains kinetic momentum so speed does not drop during handoff",
        "It lets the runner sit down and rest earlier",
        "It makes the baton weigh less",
        "It doubles the distance of the relay race"
      ],
      correct: "It maintains kinetic momentum so speed does not drop during handoff",
      explanation_en: "Starting early allows the receiver to match the incoming runner's speed, maintaining kinetic momentum smoothly!"
    },
    {
      id: 3,
      type: "science",
      clue_statement: "Runners in Iten, Kenya train at 2,400 metres above sea level where the air has lower oxygen density.",
      question_en: "How does high-altitude training help marathon runners perform better at sea level?",
      options: [
        "The body produces more red blood cells to carry oxygen efficiently",
        "The thin air makes the legs grow longer",
        "Runners learn to breathe underwater",
        "High altitude reduces gravity so runners weigh less"
      ],
      correct: "The body produces more red blood cells to carry oxygen efficiently",
      explanation_en: "At high altitudes, thin air triggers the body to produce extra red blood cells, boosting endurance when competing at lower sea-level altitudes!"
    },
    {
      id: 4,
      type: "logic",
      clue_statement: "Team A finished the 4x100m relay in 48 seconds. Team B finished 3 seconds slower than Team A.",
      question_en: "What was Team B's total relay time?",
      options: [
        "51 seconds",
        "45 seconds",
        "52 seconds",
        "44 seconds"
      ],
      correct: "51 seconds",
      explanation_en: "48 seconds + 3 seconds slower = 51 seconds!"
    },
    {
      id: 5,
      type: "science",
      clue_statement: "During a long marathon, muscles require continuous oxygen and glucose energy to contract.",
      question_en: "What happens to a runner's heart rate during intense physical sprinting?",
      options: [
        "Heart rate increases to pump oxygen-rich blood quickly to muscles",
        "Heart rate stops completely to conserve energy",
        "Heart rate slows down so the body can sleep",
        "Heart rate stays exactly at zero"
      ],
      correct: "Heart rate increases to pump oxygen-rich blood quickly to muscles",
      explanation_en: "During exercise, muscles demand more oxygen, causing the heart to beat faster to pump oxygenated blood!"
    }
  ]
};
