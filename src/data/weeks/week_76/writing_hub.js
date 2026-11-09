/**
 * STAGED MOCK EXAM DELIVERABLE: Writing Paper (All 2 Parts / 2 Extended Tasks)
 * Week: 76 | Level: Cambridge B1 Preliminary (PET) | Mode: FULL_MOCK
 * Pipeline: scripts/generate_pet_mock_content.mjs (Round 67 PET Pilot)
 * Cumulative Sourcing: Weeks 73, 74, 75, 76
 */

export const writingHubData = {
  week: 76,
  theme: "History/ELA: Explorers / Math: Map Scales",
  cefr_level: "B1 Preliminary",
  paper: "Writing",
  total_parts: 2,
  time_allowed_minutes: 45,

  // ── Part 1: Communicative Email Response (~100 words) ─────────────────────
  part1_email: {
    task_number: 1,
    instructions: "You must answer this question. Write your email in about 100 words.",
    scenario: "Read this email from your English-speaking friend Alex and the notes you have made.",
    incoming_email: {
      from: "Alex Miller (alex.m@schoolmail.com)",
      subject: "Visit to Maritime & Exploration Museum!",
      body: "Hi! I'm so excited about visiting the International Maritime Museum with you this weekend! [Note 1: Say which day]\n\nWould you prefer to explore the ancient Egyptian trade exhibition or the Great Voyages gallery first? [Note 2: Agree and explain why]\n\nI heard they have an interactive navigation workshop where we can calculate distances using map scales. Should we sign up? [Note 3: Suggest instruments]\n\nHow are we traveling to the museum on Saturday? [Note 4: Ask Alex]\n\nWrite back soon,\nAlex",
      notes: [
        { id: 1, prompt: "Say which day is best for you" },
        { id: 2, prompt: "State your preference between the galleries and explain why" },
        { id: 3, prompt: "Suggest trying ancient navigation instruments like compasses" },
        { id: 4, prompt: "Ask Alex about travel arrangements and meeting time" }
      ]
    },
    model_response: "Hi Alex,\n\nI'm really excited about our museum trip too! Saturday morning is definitely best for me because I have basketball practice on Sunday.\n\nI would love to explore the Great Voyages gallery first. I am fascinated by Ferdinand Magellan's three-year journey across the Pacific Ocean, and they have an authentic wooden caravel on display!\n\nSigning up for the navigation workshop is a fantastic idea. Let's make sure we test the antique brass compasses and practice measuring distances with map scales.\n\nShall we take the morning train together? What time should we meet at the central station?\n\nSee you soon,\nLiam",
    word_count: 104,
    rubric: {
      total_marks: 20,
      scales: {
        content: 5,
        communicative_achievement: 5,
        organisation: 5,
        language: 5
      },
      criteria: "Full marks require answering all four prompt notes, clear B1 register, logical paragraphing with connectors, and accurate grammatical structures."
    }
  },

  // ── Part 2: Extended Writing Choice (~100 words) ───────────────────────────
  part2_extended: {
    task_number: 2,
    instructions: "Choose ONE question from this part. Write your answer in about 100 words.",
    options: [
      {
        option_id: "article",
        type: "Article",
        title_prompt: "An Incredible Voyage of Discovery",
        announcement: "You see this notice in an international youth magazine:\n\nArticles Wanted: 'An Incredible Voyage of Discovery'\nWhich historical or modern explorer inspires you most? What hardships did they overcome during their journey, and what did their voyage teach humanity?\n\nWrite an article answering these questions. The best article will be published in our winter issue!",
        model_response: "The historical explorer who inspires me most is Ferdinand Magellan. In 1519, he led an audacious naval expedition of five wooden caravels into uncharted waters. He overcame immense hardships, including freezing Antarctic gales in the narrow straits and nearly four months of starvation crossing the vast Pacific Ocean.\n\nMagellan persevered by taking daily solar measurements with a wooden astrolabe and navigating by the stars. Although he perished in the Philippines, his ship Victoria completed the first circumnavigation of Earth. His voyage proved that our oceans are connected into one continuous global ecosystem, inspiring generations of future explorers.",
        word_count: 102
      },
      {
        option_id: "story",
        type: "Story",
        prompt_sentence: "As Captain Miller checked his brass compass, the morning mist began to clear.",
        model_response: "As Captain Miller checked his brass compass, the morning mist began to clear. Suddenly, towering emerald cliffs appeared directly ahead through the parted clouds. After three grueling weeks battling turbulent ocean storms, the expedition had finally reached the uncharted archipelago.\n\nMiller shouted to the crew to lower the canvas sails. The sailors cheered with relief as gentle waves carried the caravel into a calm turquoise lagoon. Nearby, a freshwater stream cascaded down rocky slopes, providing the drinking water they urgently needed to survive. Standing on the wooden deck, Miller sketched the coastline on his parchment chart, ready to begin their greatest scientific exploration.",
        word_count: 103
      }
    ],
    rubric: {
      total_marks: 20,
      scales: {
        content: 5,
        communicative_achievement: 5,
        organisation: 5,
        language: 5
      },
      criteria: "Marks awarded for fulfilling the task prompt, engaging target readers, coherent narrative flow, and varied B1 vocabulary and complex sentences."
    }
  }
};

export default writingHubData;
