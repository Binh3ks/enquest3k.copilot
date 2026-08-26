// Pure Generated Listening Hub for Week 34
export const listeningHub = {
  listening_p1: {
    image_url: "/images/week34/w34_listening_p1_scene.jpg",
    audio_url: "/audio/week34/listening_p1_full.mp3",
    passage_audio_script: `Man: Look at Part 1. Now look at the picture. Listen and look. There is one example.
Girl: I can see a big animal sleeping under the tree!
Man: Yes, that is Leo the lion. He is resting peacefully.
Girl: Can you see the example line? Now you listen and draw lines.
Girl: Can you see the tiny mouse running near the lion's front paw?
Man: Yes, that is Milo the mouse. He is looking for seeds.
Girl: Who is that man hiding behind the bushes with a rope net?
Man: That is Hunter Jack. He is setting a trap between the trees.
Girl: Look up on the high branch! Who is that wise owl?
Man: That is Oliver the owl. He is watching the whole forest.
Girl: Look near the stream! There is a little bird singing.
Man: That is Bella the bird. She has colorful feathers.
Girl: Who is the white rabbit drinking water at the riverbank?
Man: That is Rob the rabbit. He is hopping gently.`,
    names: [
      { id: "n1", text: "Leo the Lion", target_id: "t1", isExample: true },
      { id: "n2", text: "Milo the Mouse", target_id: "t2" },
      { id: "n3", text: "Hunter Jack", target_id: "t3" },
      { id: "n4", text: "Oliver the Owl", target_id: "t4" },
      { id: "n5", text: "Bella the Bird", target_id: "t5" },
      { id: "n6", text: "Rob the Rabbit", target_id: "t6" },
      { id: "n7", text: "Sammy the Squirrel", target_id: null }
    ],
    targets: [
      { id: "t1", label: "Leo (Large sleeping lion under tree)", x: 45, y: 55, isExample: true },
      { id: "t2", label: "Milo (Tiny mouse on mossy rock)", x: 30, y: 70 },
      { id: "t3", label: "Hunter Jack (Man holding rope behind bush)", x: 80, y: 50 },
      { id: "t4", label: "Oliver (Wise owl on high branch)", x: 65, y: 25 },
      { id: "t5", label: "Bella (Colorful bird near stream)", x: 50, y: 18 },
      { id: "t6", label: "Rob (White rabbit drinking at riverbank)", x: 18, y: 75 }
    ]
  },

  listening_p2: {
    title: "The Forest Wildlife Project",
    audio_url: "/audio/week34/listening_p2_full.mp3",
    example: { field_label: "Fable story title", answer: "The Lion and Mouse" },
    fields: [
      { id: "f1", field_label: "Lion location", answer: "under a tree" },
      { id: "f2", field_label: "Running animal", answer: "tiny mouse" },
      { id: "f3", field_label: "Hunter equipment", answer: "rope net" },
      { id: "f4", field_label: "Cutting method", answer: "sharp teeth" },
      { id: "f5", field_label: "Story moral", answer: "small friends help" }
    ]
  },

  listening_p3: {
    example: { name: "Binoculars", target_letter: "H" },
    items: [
      { id: 1, name: "Wooden Trap", target_letter: "A", audio_url: "/audio/week34/listening_p3_item1.mp3" },
      { id: 2, name: "Thick Rope", target_letter: "B", audio_url: "/audio/week34/listening_p3_item2.mp3" },
      { id: 3, name: "Forest Map", target_letter: "C", audio_url: "/audio/week34/listening_p3_item3.mp3" },
      { id: 4, name: "Water Bottle", target_letter: "D", audio_url: "/audio/week34/listening_p3_item4.mp3" },
      { id: 5, name: "Compass", target_letter: "E", audio_url: "/audio/week34/listening_p3_item5.mp3" }
    ],
    cards: [
      { letter: "A", name: "Wooden Trap", location_name: "Forest Clearing", image_url: "/images/week34/card_a.jpg" },
      { letter: "B", name: "Thick Rope", location_name: "Hunter Camp", image_url: "/images/week34/card_b.jpg" },
      { letter: "C", name: "Forest Map", location_name: "Tree Hollow", image_url: "/images/week34/card_c.jpg" },
      { letter: "D", name: "Water Bottle", location_name: "Riverbank", image_url: "/images/week34/card_d.jpg" },
      { letter: "E", name: "Compass", location_name: "Lookout Rock", image_url: "/images/week34/card_e.jpg" },
      { letter: "F", name: "Flashlight", location_name: "Dark Cave", image_url: "/images/week34/card_f.jpg" },
      { letter: "G", name: "Backpack", location_name: "Base Tent", image_url: "/images/week34/card_g.jpg" },
      { letter: "H", name: "Binoculars", location_name: "Wooden Tower", image_url: "/images/week34/card_h.jpg" }
    ]
  },

  listening_p4: {
    audio_url: "/audio/week34/listening_p4_full.mp3",
    instructions: "Listen and tick the box. There is one example.",
    questions: [
      {
        id: "p4_example",
        isExample: true,
        question_en: "Where did Milo the mouse run in the morning?",
        audio_url: "/audio/week34/listening_p4_example.mp3",
        audio_script: `Boy: Look at the example. Where did Milo the mouse run in the morning?\nGirl: He ran across the mossy rocks.\nBoy: Can you see the tick? Now you listen and tick the box.`,
        options: [
          { letter: "A", text: "Across the mossy rocks", image_url: "/images/week34/mossy_rocks.jpg" },
          { letter: "B", text: "Near the hunter camp", image_url: "/images/week34/card_b.jpg" },
          { letter: "C", text: "Around the water river", image_url: "/images/week34/card_d.jpg" }
        ],
        answer: "A"
      },
      {
        id: "p4_q1",
        question_en: "Where was the lion resting in the afternoon?",
        audio_url: "/audio/week34/listening_p4_q1.mp3",
        audio_script: `Boy: Question 1. Where was the lion resting in the afternoon?\nGirl: He was sleeping peacefully under a shady tree.`,
        options: [
          { letter: "A", text: "Under a shady tree", image_url: "/images/week34/webtoon_scene_1.png" },
          { letter: "B", text: "Near a rocky cave", image_url: "/images/week34/card_f.jpg" },
          { letter: "C", text: "In the grassy field", image_url: "/images/week34/card_b.jpg" }
        ],
        answer: "A"
      },
      {
        id: "p4_q2",
        question_en: "What trapped the lion in the forest?",
        audio_url: "/audio/week34/listening_p4_q2.mp3",
        audio_script: `Boy: Question 2. What trapped the lion in the forest?\nGirl: The hunters placed a heavy rope net between the trees.`,
        options: [
          { letter: "A", text: "A wooden cage", image_url: "/images/week34/card_a.jpg" },
          { letter: "B", text: "A heavy rope net", image_url: "/images/week34/webtoon_scene_4.png" },
          { letter: "C", text: "A deep ground hole", image_url: "/images/week34/card_c.jpg" }
        ],
        answer: "B"
      },
      {
        id: "p4_q3",
        question_en: "How did the mouse free the lion?",
        audio_url: "/audio/week34/listening_p4_q3.mp3",
        audio_script: `Boy: Question 3. How did the mouse free the lion?\nGirl: He chewed through the thick ropes with his sharp teeth.`,
        options: [
          { letter: "A", text: "Using a wooden stick", image_url: "/images/week34/card_d.jpg" },
          { letter: "B", text: "Calling other animals", image_url: "/images/week34/card_e.jpg" },
          { letter: "C", text: "Chewing the thick ropes", image_url: "/images/week34/webtoon_scene_5.png" }
        ],
        answer: "C"
      },
      {
        id: "p4_q4",
        question_en: "Who helped the lion escape?",
        audio_url: "/audio/week34/listening_p4_q4.mp3",
        audio_script: `Boy: Question 4. Who helped the lion escape?\nGirl: The brave little mouse chewed the ropes to free him.`,
        options: [
          { letter: "A", text: "The brave little mouse", image_url: "/images/week34/webtoon_scene_5.png" },
          { letter: "B", text: "A big brown bear", image_url: "/images/week34/card_f.jpg" },
          { letter: "C", text: "A wise gray owl", image_url: "/images/week34/card_c.jpg" }
        ],
        answer: "A"
      },
      {
        id: "p4_q5",
        question_en: "How did the lion feel after being freed?",
        audio_url: "/audio/week34/listening_p4_q5.mp3",
        audio_script: `Boy: Question 5. How did the lion feel after being freed?\nGirl: He felt grateful and relieved that his little friend saved him.`,
        options: [
          { letter: "A", text: "Grateful and relieved", image_url: "/images/week34/webtoon_scene_1.png" },
          { letter: "B", text: "Angry and hungry", image_url: "/images/week34/card_b.jpg" },
          { letter: "C", text: "Scared of the mouse", image_url: "/images/week34/card_g.jpg" }
        ],
        answer: "A"
      }
    ]
  },

  listening_p5: {
    image_url: "/images/week34/webtoon_scene_1.png",
    audio_script: `Nova: Listen and colour and write. There is one example.
Woman: Look at this picture of the forest. Can you see the tall oak tree?
Man: Yes, I can see it.
Woman: Good. Colour the top leaves dark green.
Nova: Can you see the green leaves? This is an example. Now you listen and colour and write.
Woman: Look at the lion resting on the grass. Can you see his big mane?
Man: Yes, shall I colour it?
Woman: Yes, colour the lion's mane golden yellow.
Woman: Can you see the hunter's rope near the bushes? Let's write a word.
Man: What word shall I write?
Woman: Write the word 'TRAP' near the ropes.
Woman: Look at the little mouse sitting on the rock.
Man: He is so small! What colour should he be?
Woman: Colour the little mouse grey.
Woman: Can you see the wooden signboard near the path? Let's write the final word.
Man: What word should I write?
Woman: Write the word 'FRIENDS' on the signboard.`,
    instructions: [
      { id: "inst_0", item: "Example Object", text: "Color the example brown", x: 10, y: 10, color: "brown", isExample: true },
      { id: "inst_1", item: "Lion Mane", text: "Color the lion's mane golden yellow", x: 45, y: 55, color: "yellow", action: "colour" },
      { id: "inst_2", item: "Rope Trap", text: "Write the word 'TRAP' near the ropes", x: 65, y: 45, word: "TRAP", action: "write" },
      { id: "inst_3", item: "Tiny Mouse", text: "Color the little mouse grey", x: 30, y: 70, color: "grey", action: "colour" },
      { id: "inst_4", item: "Forest Signboard", text: "Write the word 'FRIENDS' on the signboard", x: 80, y: 30, word: "FRIENDS", action: "write" },
      { id: "inst_5", item: "Hunter's Hat", text: "Color the hat dark green", x: 90, y: 20, color: "dark green", action: "colour" }
    ]
  }
};

export const listeningHubData = listeningHub;
export default listeningHub;
