/**
 * Checkpoint W26 — End of A1 Phase (Starters → Movers transition)
 * Tests: Vocabulary (W15-26 topic words), Grammar (past simple, prepositions),
 *        Reading (short story), Writing (paragraph about an event)
 */
export default {
  week: 26,
  title: "A1 Checkpoint",
  badge: "🚀 Mover Badge",

  vocab_test: {
    pass_threshold: 0.75,
    questions: [
      { q: "She felt very ___ after the long journey.", options: ["exhausted", "curious", "polite", "generous"], answer: "exhausted" },
      { q: "The scientist made an amazing ___.", options: ["discovery", "argument", "mistake", "question"], answer: "discovery" },
      { q: "He was ___ to help the old lady cross the street.", options: ["willing", "nervous", "careless", "lazy"], answer: "willing" },
      { q: "The weather was ___ — sunny and warm.", options: ["pleasant", "terrible", "stormy", "freezing"], answer: "pleasant" },
      { q: "___ means to look at something carefully.", options: ["Observe", "Ignore", "Escape", "Collect"], answer: "Observe" },
      { q: "The bridge was too ___ for the truck to cross.", options: ["fragile", "strong", "wide", "short"], answer: "fragile" },
      { q: "She has great ___ for all living things.", options: ["respect", "doubt", "anger", "pity"], answer: "respect" },
      { q: "The team worked together in ___.", options: ["harmony", "silence", "danger", "confusion"], answer: "harmony" },
      { q: "He ___ from the busy city to live in the countryside.", options: ["escaped", "arrived", "remained", "started"], answer: "escaped" },
      { q: "The ___ of the river was very fast after the rain.", options: ["current", "colour", "smell", "shape"], answer: "current" },
      { q: "She received a ___ for finishing first.", options: ["reward", "request", "problem", "message"], answer: "reward" },
      { q: "The book gave a ___ description of the battle.", options: ["vivid", "boring", "short", "simple"], answer: "vivid" },
      { q: "___ means to make something better.", options: ["Improve", "Remove", "Ignore", "Reduce"], answer: "Improve" },
      { q: "The athlete trained with great ___.", options: ["dedication", "laziness", "confusion", "hesitation"], answer: "dedication" },
      { q: "We need to ___ water carefully.", options: ["conserve", "waste", "collect", "freeze"], answer: "conserve" },
      { q: "The children were very ___ during the storm.", options: ["frightened", "excited", "bored", "cheerful"], answer: "frightened" },
      { q: "___ means sharing your things with others.", options: ["Generosity", "Curiosity", "Honesty", "Bravery"], answer: "Generosity" },
      { q: "The plan was ___ — it worked perfectly.", options: ["brilliant", "ordinary", "useless", "simple"], answer: "brilliant" },
      { q: "She has a natural ___ for music.", options: ["talent", "dislike", "problem", "need"], answer: "talent" },
      { q: "The ruins were an important ___ site.", options: ["historical", "modern", "ordinary", "simple"], answer: "historical" },
    ],
  },

  grammar_test: {
    pass_threshold: 0.70,
    questions: [
      { q: "Yesterday, she ___ a long letter to her friend.", options: ["write", "writes", "wrote", "written"], answer: "wrote" },
      { q: "They ___ at the park last Sunday.", options: ["play", "plays", "played", "playing"], answer: "played" },
      { q: "Choose the correct sentence:", options: ["He goed to school.", "He goes to school yesterday.", "He went to school yesterday.", "He going to school yesterday."], answer: "He went to school yesterday." },
      { q: "We ___ a beautiful rainbow after the rain.", options: ["see", "sees", "saw", "seen"], answer: "saw" },
      { q: "She ___ not come to school yesterday because she was sick.", options: ["do", "does", "did", "was"], answer: "did" },
      { q: "The ball rolled ___ the hill.", options: ["down", "into", "above", "with"], answer: "down" },
      { q: "He put the book ___ the shelf.", options: ["on", "into", "under", "beside"], answer: "on" },
      { q: "Choose the correct sentence:", options: ["She didn't ate dinner.", "She didn't eat dinner.", "She not eat dinner.", "She doesn't ate dinner."], answer: "She didn't eat dinner." },
      { q: "The cat hid ___ the table.", options: ["under", "above", "into", "from"], answer: "under" },
      { q: "___ you sleep well last night?", options: ["Do", "Does", "Did", "Were"], answer: "Did" },
      { q: "He walked ___ the bridge slowly.", options: ["across", "between", "among", "inside"], answer: "across" },
      { q: "Choose the correct sentence:", options: ["They went to the beach last summer.", "They go to the beach last summer.", "They going to beach last summer.", "They goed to beach last summer."], answer: "They went to the beach last summer." },
      { q: "She sat ___ her two brothers.", options: ["between", "among", "inside", "above"], answer: "between" },
      { q: "The children ___ a lot of fun at the party.", options: ["have", "has", "had", "having"], answer: "had" },
      { q: "He ___ his homework before dinner.", options: ["finish", "finishes", "finished", "finishing"], answer: "finished" },
    ],
  },

  reading: {
    pass_threshold: 0.70,
    passage: "Last summer, Maya and her family visited a national park. It was their first time camping outdoors. They set up a tent near a lake and cooked food over a campfire. During the day, they hiked through tall trees and spotted a family of deer. That evening, they sat around the fire, told stories, and watched the stars appear one by one. Maya thought it was the best holiday she had ever had.",
    questions: [
      { q: "Where did Maya's family go last summer?", options: ["A beach resort", "A national park", "A city hotel", "A farm"], answer: "A national park" },
      { q: "Where did they set up their tent?", options: ["Near a river", "On a hill", "Near a lake", "In the forest"], answer: "Near a lake" },
      { q: "What did they see during the hike?", options: ["A bear family", "A family of deer", "Wild horses", "A flock of birds"], answer: "A family of deer" },
      { q: "What did they do that evening?", options: ["They watched TV.", "They went swimming.", "They sat around the fire and told stories.", "They drove back home."], answer: "They sat around the fire and told stories." },
      { q: "What did Maya think about the holiday?", options: ["It was boring.", "It was the best holiday she had ever had.", "It was too hot.", "It was too short."], answer: "It was the best holiday she had ever had." },
      { q: "What does 'spotted' mean in the passage?", options: ["painted with spots", "hid from", "noticed / saw", "caught"], answer: "noticed / saw" },
    ],
  },

  writing: {
    prompt: "Write a paragraph (4-5 sentences) about a trip or outing you enjoyed. Include: where you went, what you did, and how you felt.",
    rubric_threshold: 7,
    min_words: 20,
    hint: "Use past tense verbs: went, saw, ate, felt, enjoyed...",
  },
};
