/**
 * Checkpoint W14 — End of Pre-A1 Phase
 * Tests: Vocabulary (basic nouns/verbs W1-14), Grammar (simple present, have/has),
 *        Reading (short picture-based passage), Writing (3-sentence personal response)
 */
export default {
  week: 14,
  title: "Pre-A1 Checkpoint",
  badge: "🌟 Starter Star",

  vocab_test: {
    pass_threshold: 0.75, // 15/20
    questions: [
      { q: "My ___ is in the bedroom.", options: ["bed", "sky", "road", "ocean"], answer: "bed" },
      { q: "I drink water when I am ___.", options: ["thirsty", "tired", "happy", "cold"], answer: "thirsty" },
      { q: "We eat breakfast in the ___.", options: ["morning", "night", "class", "garden"], answer: "morning" },
      { q: "A dog is an ___.", options: ["animal", "object", "building", "colour"], answer: "animal" },
      { q: "I use a ___ to write.", options: ["pencil", "window", "bottle", "chair"], answer: "pencil" },
      { q: "The opposite of big is ___.", options: ["small", "fast", "loud", "dark"], answer: "small" },
      { q: "We go to ___ to learn.", options: ["school", "market", "hospital", "park"], answer: "school" },
      { q: "My mother is my ___.", options: ["parent", "friend", "teacher", "doctor"], answer: "parent" },
      { q: "I ___ my hands before eating.", options: ["wash", "draw", "kick", "open"], answer: "wash" },
      { q: "A ___ has four legs and can bark.", options: ["dog", "bird", "fish", "cat"], answer: "dog" },
      { q: "The sun rises in the ___.", options: ["east", "west", "north", "south"], answer: "east" },
      { q: "I feel ___ when I see my friends.", options: ["happy", "angry", "sick", "bored"], answer: "happy" },
      { q: "We use ___ to cut paper.", options: ["scissors", "glue", "pencil", "book"], answer: "scissors" },
      { q: "The colour of grass is ___.", options: ["green", "blue", "red", "yellow"], answer: "green" },
      { q: "I sleep at ___.", options: ["night", "noon", "morning", "class"], answer: "night" },
      { q: "A ___ is a person who teaches.", options: ["teacher", "cook", "driver", "player"], answer: "teacher" },
      { q: "We live in a ___.", options: ["house", "car", "shop", "boat"], answer: "house" },
      { q: "I wear a ___ when it rains.", options: ["raincoat", "swimsuit", "t-shirt", "shorts"], answer: "raincoat" },
      { q: "A banana is a ___.", options: ["fruit", "vegetable", "drink", "meat"], answer: "fruit" },
      { q: "We use our eyes to ___.", options: ["see", "hear", "smell", "taste"], answer: "see" },
    ],
  },

  grammar_test: {
    pass_threshold: 0.70, // ~11/15
    questions: [
      { q: "She ___ a big family.", options: ["have", "has", "is", "are"], answer: "has" },
      { q: "They ___ football every day.", options: ["play", "plays", "playing", "played"], answer: "play" },
      { q: "I ___ seven years old.", options: ["am", "is", "are", "be"], answer: "am" },
      { q: "The cat ___ on the mat.", options: ["sit", "sits", "sitting", "sat"], answer: "sits" },
      { q: "We ___ breakfast at 7 a.m.", options: ["eat", "eats", "eating", "ate"], answer: "eat" },
      { q: "There ___ two dogs in the yard.", options: ["is", "are", "am", "be"], answer: "are" },
      { q: "He ___ not like vegetables.", options: ["do", "does", "is", "are"], answer: "does" },
      { q: "Choose the correct sentence:", options: ["I has a book.", "I have a book.", "I am have book.", "I book have."], answer: "I have a book." },
      { q: "She ___ to school by bus.", options: ["go", "goes", "going", "gone"], answer: "goes" },
      { q: "My brothers ___ very tall.", options: ["is", "am", "are", "be"], answer: "are" },
      { q: "Choose the correct sentence:", options: ["He play soccer.", "He plays soccer.", "He playing soccer.", "He played soccer."], answer: "He plays soccer." },
      { q: "___ your father a doctor?", options: ["Is", "Are", "Am", "Do"], answer: "Is" },
      { q: "We ___ swimming on Sundays.", options: ["go", "goes", "going", "went"], answer: "go" },
      { q: "The bird ___ in the sky.", options: ["fly", "flies", "flying", "flied"], answer: "flies" },
      { q: "Choose the correct sentence:", options: ["They is happy.", "They am happy.", "They are happy.", "They be happy."], answer: "They are happy." },
    ],
  },

  reading: {
    pass_threshold: 0.70,
    passage: "Ben has a small garden. He grows tomatoes, carrots, and flowers. Every Saturday he waters the plants and pulls out the weeds. His favourite plant is the sunflower because it is tall and bright yellow. Ben loves spending time in his garden.",
    questions: [
      { q: "What does Ben grow in his garden?", options: ["Only flowers", "Tomatoes, carrots, and flowers", "Apples and oranges", "Beans and corn"], answer: "Tomatoes, carrots, and flowers" },
      { q: "When does Ben water his plants?", options: ["Every day", "Every Sunday", "Every Saturday", "After school"], answer: "Every Saturday" },
      { q: "What is Ben's favourite plant?", options: ["Tomato", "Carrot", "Rose", "Sunflower"], answer: "Sunflower" },
      { q: "Why does Ben like the sunflower?", options: ["It smells nice.", "It is tall and bright yellow.", "It grows fast.", "It tastes sweet."], answer: "It is tall and bright yellow." },
      { q: "What does Ben do after watering?", options: ["He eats lunch.", "He plays football.", "He pulls out weeds.", "He reads a book."], answer: "He pulls out weeds." },
      { q: "How does Ben feel about his garden?", options: ["He is bored of it.", "He loves it.", "He is afraid of it.", "He dislikes it."], answer: "He loves it." },
    ],
  },

  writing: {
    prompt: "Write 3-4 sentences about your favourite hobby. (Use: I like to..., I do it..., It makes me feel...)",
    rubric_threshold: 5,
    min_words: 12,
    hint: "Example: I like to draw pictures. I do it every evening. It makes me feel happy and calm.",
  },
};
