/**
 * scripts/specs_mock_w40.mjs
 * 
 * SPECIFICATIONS FOR MOCK EXAM WEEK 40 (STAGE 1 A2 FLYERS)
 * Cumulative Grounding: Weeks 37, 38, 39, 40
 * Theme: "Beast Battle (Comparisons) & Wildlife Explorers"
 */

export const mockSpecW40 = {
  week: 40,
  theme: 'Beast Battle (Comparisons)',
  exam_title: 'Cambridge A2 Flyers Full Mock 2 (Weeks 37-40 Synthesis)',
  cefr_level: 'A2 Flyers',
  cumulativeBlock: [37, 38, 39, 40],

  source_grounding: {
    w37_source_words: ['living', 'breathe', 'grow', 'food', 'water'],
    w38_source_words: ['jump', 'fly', 'swim', 'hunt', 'climb'],
    w39_source_words: ['habitat', 'desert', 'rainforest', 'ocean', 'burrow'],
    w40_source_words: ['teeth', 'claws', 'fur', 'heavy', 'sharp'],
    grammar_grounding_summary: {
      w37_grammar: 'Simple Present factual statements for living necessities',
      w38_grammar: 'Modals of ability (can / cannot jump, fly, swim, hunt)',
      w39_grammar: 'Prepositions of location and environmental habitat clauses',
      w40_grammar: 'Comparative and superlative adjectives (faster, sharper, heavier)'
    },
    parts_grounding: {
      listening_p1: 'Riverbend Wildlife Reserve trail with Harry, Emma, Oliver, Helen, Richard',
      listening_p2: 'Ben Clark joining the Junior Wildlife Explorers Club',
      listening_p3: 'Matching animals to their natural habitats and shelters (A-H)',
      listening_p4: '3-picture MCQs about Sam and Mia\'s wildlife safari adventure',
      listening_p5: 'Research station exhibit colouring animals and writing WILD',
      reading_p1: '10 definitions matching animal adaptations and habitat vocabulary',
      reading_p2: 'Emma interviewing Ranger David about animal defenses and claws',
      reading_p3: 'Story cloze on a clever fox finding food and a safe burrow',
      reading_p4: 'Factual article on how creatures adapt to harsh desert and rainforest climates',
      reading_p5: 'Extended narrative on a safari expedition at Riverbend Wildlife Reserve',
      reading_p6: 'Diary open cloze by young wildlife explorer Sam',
      reading_p7: '3-panel picture story writing: Finding the Lost Bear Cub',
      speaking_p1: 'Spot 5 differences between Picture A and B at wildlife observation post',
      speaking_p2: 'Solo-AI cue cards: Table A Liam\'s Desert Safari / Table B Chloe\'s Rainforest Tour',
      speaking_p3: '5-frame picture story: The Hungry Leopard and the Clever Monkey',
      speaking_p4: '4 personal interview questions on favourite animals and nature trips'
    }
  },

  vocab: [
    { id: 1, word: 'living', pos: 'adj', ipa: '/ˈlɪvɪŋ/', definition_en: 'Alive, growing, and needing food and water to survive.', definition_vi: 'còn sống, sinh sống', example_en: 'All living creatures need clean water and fresh air.', sourceWeek: 37 },
    { id: 2, word: 'breathe', pos: 'verb', ipa: '/briːð/', definition_en: 'To take air into the lungs and send it out again.', definition_vi: 'hít thở', example_en: 'Dolphins swim to the surface to breathe fresh air.', sourceWeek: 37 },
    { id: 3, word: 'grow', pos: 'verb', ipa: '/ɡroʊ/', definition_en: 'To increase in size and change over time.', definition_vi: 'lớn lên, phát triển', example_en: 'Young cubs grow very quickly during their first year.', sourceWeek: 37 },
    { id: 4, word: 'food', pos: 'noun', ipa: '/fuːd/', definition_en: 'Things that living animals and plants consume for energy.', definition_vi: 'thức ăn', example_en: 'Herbivores search the green meadow for fresh food.', sourceWeek: 37 },
    { id: 5, word: 'water', pos: 'noun', ipa: '/ˈwɔːtər/', definition_en: 'The clear liquid that all living things need to drink.', definition_vi: 'nước', example_en: 'Animals gather near the riverbank to drink cool water.', sourceWeek: 37 },
    { id: 6, word: 'jump', pos: 'verb', ipa: '/dʒʌmp/', definition_en: 'To push off the ground into the air using legs.', definition_vi: 'nhảy lên', example_en: 'Tree frogs can jump high from one leaf to another.', sourceWeek: 38 },
    { id: 7, word: 'fly', pos: 'verb', ipa: '/flaɪ/', definition_en: 'To move through the air using wings.', definition_vi: 'bay lượn', example_en: 'Eagles fly high above the mountains looking for prey.', sourceWeek: 38 },
    { id: 8, word: 'swim', pos: 'verb', ipa: '/swɪm/', definition_en: 'To move through water by moving arms, legs, or fins.', definition_vi: 'bơi lội', example_en: 'River otters love to swim and dive for fish.', sourceWeek: 38 },
    { id: 9, word: 'hunt', pos: 'verb', ipa: '/hʌnt/', definition_en: 'To chase and catch wild animals for food.', definition_vi: 'săn mồi', example_en: 'Leopards hunt quietly in the tall savannah grass.', sourceWeek: 38 },
    { id: 10, word: 'climb', pos: 'verb', ipa: '/klaɪm/', definition_en: 'To go up towards the top of a tree, hill, or rock.', definition_vi: 'leo trèo', example_en: 'Bears can climb sturdy trees very quickly.', sourceWeek: 38 },
    { id: 11, word: 'habitat', pos: 'noun', ipa: '/ˈhæbɪtæt/', definition_en: 'The natural home or environment of an animal or plant.', definition_vi: 'môi trường sống', example_en: 'The polar region is the natural habitat of the white bear.', sourceWeek: 39 },
    { id: 12, word: 'desert', pos: 'noun', ipa: '/ˈdezərt/', definition_en: 'A dry, sandy region with very little rainfall.', definition_vi: 'sa mạc', example_en: 'Camels can survive many hot days in the dry desert.', sourceWeek: 39 },
    { id: 13, word: 'rainforest', pos: 'noun', ipa: '/ˈreɪnfɔːrɪst/', definition_en: 'A dense tropical forest with tall trees and heavy rain.', definition_vi: 'rừng mưa nhiệt đới', example_en: 'Colourful parrots live in the tropical rainforest canopy.', sourceWeek: 39 },
    { id: 14, word: 'ocean', pos: 'noun', ipa: '/ˈoʊʃən/', definition_en: 'A vast expanse of salt water covering much of Earth.', definition_vi: 'đại dương', example_en: 'Blue whales travel across the deep ocean every winter.', sourceWeek: 39 },
    { id: 15, word: 'burrow', pos: 'noun', ipa: '/ˈbɜːroʊ/', definition_en: 'A hole or tunnel dug in the ground by an animal for shelter.', definition_vi: 'hang đất', example_en: 'The desert fox slept safely inside its underground burrow.', sourceWeek: 39 },
    { id: 16, word: 'teeth', pos: 'noun', ipa: '/tiːθ/', definition_en: 'Hard white structures in the mouth used for biting and chewing.', definition_vi: 'răng', example_en: 'The wolf showed its sharp white teeth when eating.', sourceWeek: 40 },
    { id: 17, word: 'claws', pos: 'noun', ipa: '/klɔːz/', definition_en: 'Sharp curved horny nails on the paws of an animal.', definition_vi: 'móng vuốt', example_en: 'Cats use their curved claws to grip tree branches.', sourceWeek: 40 },
    { id: 18, word: 'fur', pos: 'noun', ipa: '/fɜːr/', definition_en: 'The thick coat of soft hair covering the skin of animals.', definition_vi: 'lông thú', example_en: 'The polar bear has thick fur to stay warm in the snow.', sourceWeek: 40 },
    { id: 19, word: 'sharp', pos: 'adj', ipa: '/ʃɑːrp/', definition_en: 'Having a thin edge or fine point able to cut or pierce easily.', definition_vi: 'sắc nhọn', example_en: 'Eagles have sharp talons to hold their food securely.', sourceWeek: 40 },
    { id: 20, word: 'heavy', pos: 'adj', ipa: '/ˈhevi/', definition_en: 'Weighing a lot, having great weight.', definition_vi: 'nặng nề, to lớn', example_en: 'The grizzly bear is a very heavy mammal with thick fur.', sourceWeek: 40 }
  ],

  listening_p1: {
    part: 1,
    instructions: "Listen and look. There is one example. Draw lines to match names to the correct people in the picture.",
    audio_script: "Narrator: Part 1. Listen and look. There is one example.\nMan: Look at this busy morning at the Riverbend Wildlife Reserve!\nWoman: Wow, there are so many junior scouts here! Who is that man near the entrance?\nMan: The man wearing a big sun hat and holding a reserve map? That is Ranger David.\nWoman: He looks very friendly.\nNarrator: Can you see the line? This is an example. Now you listen and draw lines.\n\n[1]\nWoman: Who is that girl looking through binoculars up into the tall trees?\nMan: The girl with the green cap? That is Emma. She is watching monkeys leap between branches.\nWoman: Oh, she is writing down what they do in her notebook!\n\n[2]\nWoman: Look at the boy sitting on the wooden bench writing on a clipboard.\nMan: Ah, that is Oliver. He is drawing a diagram of bear claws and animal teeth.\nWoman: His drawing looks very accurate!\n\n[3]\nWoman: Is that Helen standing by the wooden fence near the deer enclosure?\nMan: Yes, she is offering fresh green leaves to the baby deer.\nWoman: That is so sweet. The deer looks very gentle.\n\n[4]\nWoman: Who is the girl taking a photo of that colourful rainforest bird?\nMan: That is Sophia. She has a professional camera with a long lens.\nWoman: Her wildlife photographs will win a school prize, I am sure.\n\n[5]\nWoman: And who is the boy carrying the heavy blue backpack near the water station?\nMan: That is Richard. He always brings plenty of water bottles for our trail walk.\nWoman: That is sensible. Hiking in the warm sun makes everyone thirsty.",
    items: [
      { id: 1, name: "Emma", location: "girl with green cap looking through binoculars into tall trees", x: 230, y: 310, target: "girl looking through binoculars into trees" },
      { id: 2, name: "Oliver", location: "boy on wooden bench drawing claws on a clipboard", x: 480, y: 420, target: "boy drawing on clipboard on bench" },
      { id: 3, name: "Helen", location: "girl feeding fresh green leaves to baby deer by the fence", x: 720, y: 360, target: "girl feeding leaves to deer at fence" },
      { id: 4, name: "Sophia", location: "girl taking photo of colourful rainforest bird with big camera", x: 360, y: 190, target: "girl taking photograph of bird" },
      { id: 5, name: "Richard", location: "boy carrying heavy blue backpack near water station", x: 840, y: 390, target: "boy carrying heavy backpack near water" }
    ],
    example: { name: "David", location: "man in big sun hat holding reserve map", x: 120, y: 280 }
  },

  listening_p2: {
    part: 2,
    instructions: "Listen and look. There is one example. Read the notes and fill in the missing information.",
    audio_script: "Narrator: Part 2. Listen and look. There is one example.\nWoman: Good morning! Welcome to the Riverbend Wildlife Center. May I have your name?\nBoy: Hello! I want to join the Junior Wildlife Explorers. My first name is Ben.\nWoman: Ben, wonderful. Let me write that down.\nNarrator: Can you see the answer? Now you listen and write.\n\n[1]\nWoman: What is your family surname, Ben?\nBoy: It is Clark. C-L-A-R-K.\nWoman: Thank you, Ben Clark.\n\n[2]\nWoman: How old are you, Ben?\nBoy: I turned ten last month.\nWoman: Ten years old, perfect for our explorer club.\n\n[3]\nWoman: Which day do you want to join our field workshops?\nBoy: I have piano lessons on weekdays, so Saturday morning is best for me.\nWoman: Great, our Saturday club starts at ten o'clock.\n\n[4]\nWoman: Which room in the nature center will you meet in?\nBoy: Is it in Room 3C?\nWoman: Yes, Room 3C, right opposite the reptile exhibit.\n\n[5]\nWoman: What must every junior member bring to their first expedition?\nBoy: Should I bring my camping tent?\nWoman: No, you just need a sturdy notebook to record animal tracks.\nBoy: Excellent, I will bring my new hardcover notebook!",
    example: { field: "First name", value: "Ben" },
    items: [
      { id: 1, question: "Surname", prompt: "Surname:", answer: "Clark" },
      { id: 2, question: "Age", prompt: "Age:", answer: "10" },
      { id: 3, question: "Day of workshop", prompt: "Day of workshop:", answer: "Saturday" },
      { id: 4, question: "Meeting room", prompt: "Meeting room:", answer: "3C" },
      { id: 5, question: "Must bring", prompt: "Must bring:", answer: "notebook" }
    ]
  },

  listening_p3: {
    part: 3,
    instructions: "Listen and look. Where does each animal live? Match each animal to its correct habitat letter (A–H).",
    audio_script: "Narrator: Part 3. Listen and look. There is one example. Where does each animal live?\nGirl: Look at these animal pictures, Uncle Robert! Can you tell me where they make their shelters?\nMan: Of course, Clara. Let's start with the cheeky monkey. Monkeys sleep in high leafy tree branches where predators cannot reach them.\nGirl: Oh, up in the rainforest canopy!\nNarrator: Can you see the letter E? Now you listen and write a letter in each box.\n\n[1]\nMan: Now look at this small desert fox with huge ears.\nGirl: Where does it go during the hottest part of the day?\nMan: It digs deep under the cool sand into a subterranean burrow.\nGirl: That keeps it safe from the scorching sun!\n\n[2]\nGirl: What about the massive grizzly bear with thick brown fur?\nMan: Grizzly bears often find dry mountain caves among high rocky cliffs.\nGirl: A dark cave must keep them warm during chilly winter blizzards.\n\n[3]\nGirl: And look at this tiny bright green tree frog!\nMan: Tree frogs lay their eggs near clear rainforest pools and wet broad leaves.\nGirl: They need wet places because their delicate skin must stay moist.\n\n[4]\nMan: Do you know where grey seals spend the afternoon?\nGirl: In the water?\nMan: They swim in the open sea, but they rest on rocky ocean shores to soak up sunshine.\nGirl: That looks like a peaceful place to rest.\n\n[5]\nGirl: Lastly, where does the barn owl sleep during the daytime?\nMan: Barn owls hunt nocturnal prey at night and nest up in old wooden barns during the day.\nGirl: What a quiet hideout for a wise bird!",
    example: { day_or_item: "Monkey", letter: "E" },
    letters_available: [
      { letter: "A", description: "Wet rainforest pool with broad leaves" },
      { letter: "B", description: "Sandy underground desert burrow" },
      { letter: "C", description: "Old wooden barn in countryside" },
      { letter: "D", description: "Mountain cave among rocky cliffs" },
      { letter: "E", description: "High tree branches in forest canopy" },
      { letter: "F", description: "Rocky ocean shore with sea waves" },
      { letter: "G", description: "Tall grass in savannah meadow" },
      { letter: "H", description: "Snowy polar ice shelf" }
    ],
    items: [
      { id: 1, day_or_item: "Desert fox", letter: "B", target: "sandy underground burrow" },
      { id: 2, day_or_item: "Grizzly bear", letter: "D", target: "mountain cave among rocks" },
      { id: 3, day_or_item: "Tree frog", letter: "A", target: "wet rainforest pool" },
      { id: 4, day_or_item: "Grey seal", letter: "F", target: "rocky ocean shore" },
      { id: 5, day_or_item: "Barn owl", letter: "C", target: "old wooden barn" }
    ]
  },

  listening_p4: {
    part: 4,
    instructions: "Listen and look. There is one example. Choose the correct answer (A, B, or C).",
    audio_script: "Narrator: Part 4. Listen and look. There is one example. What did Sam drink at breakfast?\nWoman: Good morning, Sam. Did you drink your hot chocolate before the safari?\nBoy: No, Mum made fresh apple juice for me.\nWoman: Oh, apple juice is delicious!\nNarrator: Can you see the tick? Now you listen and choose the correct answer.\n\n[1] Which animal did Sam photograph first?\nWoman: What was the first wild animal you saw on the safari, Sam?\nBoy: We hoped to see a lion, but a spotted leopard was resting on a low branch right by our jeep!\nWoman: Wow, did you take a photo?\nBoy: Yes, I clicked my camera right away.\n\n[2] Which beast had the sharpest claws?\nWoman: Did you see any big predators up close?\nBoy: Yes! A huge brown bear was catching salmon in the stream. Its curved claws were sharper than kitchen knives!\nWoman: That must have looked impressive!\n\n[3] Where did the children have their picnic?\nWoman: Where did your group eat lunch after the long hike?\nBoy: First we walked past the visitor center, but Ranger David found a lovely shady clearing beside the rushing river.\nWoman: That sounds very refreshing.\n\n[4] What did the ranger show them in the sand?\nWoman: Did Ranger David teach you how to track animals?\nBoy: Yes! He showed us fresh wolf footprints pressed deep into the damp sand.\nWoman: How fascinating!\n\n[5] What time did the wildlife bus return?\nWoman: What time did you get back to school?\nBoy: The bus was scheduled for four o'clock, but traffic delayed us until quarter past four.\nWoman: Just in time for afternoon tea!",
    example: { question: "What did Sam drink at breakfast?", answer: "B" },
    items: [
      {
        id: 1,
        question: "Which animal did Sam photograph first?",
        options: [
          { letter: "A", text: "A spotted leopard resting on a tree branch" },
          { letter: "B", text: "A golden lion drinking from a waterhole" },
          { letter: "C", text: "A chimpanzee eating fresh bananas" }
        ],
        answer: "A"
      },
      {
        id: 2,
        question: "Which beast had the sharpest claws?",
        options: [
          { letter: "A", text: "A mountain eagle on a rock" },
          { letter: "B", text: "A small wildcat in the bushes" },
          { letter: "C", text: "A brown bear catching fish" }
        ],
        answer: "C"
      },
      {
        id: 3,
        question: "Where did the children have their picnic?",
        options: [
          { letter: "A", text: "Inside the visitor center cafe" },
          { letter: "B", text: "Beside the rushing river" },
          { letter: "C", text: "On top of the observation hill" }
        ],
        answer: "B"
      },
      {
        id: 4,
        question: "What did the ranger show them in the sand?",
        options: [
          { letter: "A", text: "Fresh animal footprints" },
          { letter: "B", text: "A dropped camera battery" },
          { letter: "C", text: "A fossilized shark tooth" }
        ],
        answer: "A"
      },
      {
        id: 5,
        question: "What time did the wildlife bus return?",
        options: [
          { letter: "A", text: "Three forty-five" },
          { letter: "B", text: "Four o'clock" },
          { letter: "C", text: "Quarter past four" }
        ],
        answer: "C"
      }
    ]
  },

  listening_p5: {
    part: 5,
    instructions: "Listen and look. There is one example. Colour and write.",
    audio_script: "Narrator: Part 5. Listen and look. There is one example.\nMan: Welcome to the Reserve Discovery Room. Would you like to colour this picture, Emma?\nGirl: Yes please! Can I start with the binoculars on the wooden desk?\nMan: Sure! Colour those binoculars yellow.\nGirl: Okay, I have my yellow pencil ready.\nNarrator: Can you see the yellow binoculars? This is an example. Now you listen and colour and write.\n\n[1]\nMan: Now find the model crocodile on the display shelf.\nGirl: Oh yes, it has very sharp teeth!\nMan: Can you colour that crocodile green?\nGirl: Green is a great colour for a river crocodile.\n\n[2]\nMan: Look on the wall above the desk. There is a framed picture of a desert fox.\nGirl: I see it. Its ears are huge!\nMan: Colour the desert fox in that picture brown.\nGirl: All right, colouring it brown now.\n\n[3]\nMan: Can you see the model eagle's nest near the big glass window?\nGirl: Yes, perched on a branch.\nMan: Please colour that nest blue.\nGirl: Blue? That will look bright and cheerful!\n\n[4]\nMan: Now I would like you to write a word.\nGirl: Oh good! Where should I write it?\nMan: Look at the long cloth banner hanging above the main door. Can you write the word WILD on it?\nGirl: W-I-L-D. I am writing WILD in neat capital letters on the banner.\nMan: Excellent job!\n\n[5]\nGirl: What should I colour last?\nMan: Do you see the small leopard figurine sitting next to the microscope?\nGirl: Yes, it is stalking forward on its paws.\nMan: Colour that leopard figurine yellow.\nGirl: Beautiful! The discovery room picture is completely finished now.",
    example: { instruction: "Colour the binoculars on the desk yellow", target: "binoculars on desk", colour: "yellow" },
    items: [
      { id: 1, type: "colour", target: "crocodile model on display shelf", colour: "green", action: "Colour the crocodile model on the display shelf green" },
      { id: 2, type: "colour", target: "desert fox picture on the wall", colour: "brown", action: "Colour the desert fox picture on the wall brown" },
      { id: 3, type: "colour", target: "eagle nest model near the window", colour: "blue", action: "Colour the eagle nest model near the window blue" },
      { id: 4, type: "write", target: "banner hanging above the main door", text: "WILD", action: "Write the word 'WILD' on the banner above the door" },
      { id: 5, type: "colour", target: "leopard figurine next to microscope", colour: "yellow", action: "Colour the leopard figurine next to the microscope yellow" }
    ]
  },

  reading_p1: {
    part: 1,
    instructions: "Look and read. Choose the correct words and write them on the lines. There is one example.",
    example: { definition: "Things that people and animals eat to stay healthy and strong.", answer: "food" },
    word_bank: [
      "teeth", "desert", "burrow", "living", "claws",
      "fur", "ocean", "climb", "swim", "rainforest",
      "food", "jump", "habitat", "heavy", "sharp"
    ],
    items: [
      { id: 1, definition: "An animal uses these hard white things in its mouth to bite food.", answer: "teeth" },
      { id: 2, definition: "A very dry, hot land covered with sand where camels live.", answer: "desert" },
      { id: 3, definition: "A hole or tunnel in the ground dug by small animals for shelter.", answer: "burrow" },
      { id: 4, definition: "Plants, animals, and humans that grow, breathe, and need water.", answer: "living" },
      { id: 5, definition: "The curved, sharp nails on the feet of lions, bears, or eagles.", answer: "claws" },
      { id: 6, definition: "The thick coat of soft hair that keeps animals warm in cold weather.", answer: "fur" },
      { id: 7, definition: "A very large area of blue salt water where whales and sharks live.", answer: "ocean" },
      { id: 8, definition: "To go up towards the top of a tall tree or steep rocky hill.", answer: "climb" },
      { id: 9, definition: "To move your body through water using arms, legs, or fins.", answer: "swim" },
      { id: 10, definition: "A warm tropical forest with tall trees, colourful birds, and heavy rain.", answer: "rainforest" }
    ]
  },

  reading_p2: {
    part: 2,
    instructions: "Emma is talking to Ranger David about wildlife. What does Emma say? Read the conversation and choose the best answer (A–H). There is one example.",
    example: { speaker_prompt: "Good morning Emma! Are you ready for our wildlife trail?", answer: "C" },
    options: [
      { letter: "A", text: "That sounds wonderful, let's head down to the river right now!" },
      { letter: "B", text: "Yes, sharp claws help them grip tree trunks and hunt food." },
      { letter: "C", text: "Yes, I have my notebook and binoculars ready in my backpack!" },
      { letter: "D", text: "Its large ears help it lose heat and stay cool in hot sand." },
      { letter: "E", text: "I left my umbrella in the school locker yesterday." },
      { letter: "F", text: "I really want to observe the spotted leopards near the rocky hill." },
      { letter: "G", text: "I borrowed three fascinating animal books from the library last week!" },
      { letter: "H", text: "They eat cereal and toast every morning at eight o'clock." }
    ],
    items: [
      { id: 1, speaker_prompt: "Which animal would you like to see first today?", answer: "F" },
      { id: 2, speaker_prompt: "Do you know why leopards need sharp claws?", answer: "B" },
      { id: 3, speaker_prompt: "Look at that desert fox in the sand. Why are its ears so big?", answer: "D" },
      { id: 4, speaker_prompt: "You know so many facts about animal habitats, Emma!", answer: "G" },
      { id: 5, speaker_prompt: "Shall we stop by the river trail to watch the otters swim?", answer: "A" }
    ]
  },

  reading_p3: {
    part: 3,
    instructions: "Read the story. Choose a word from the box. Write the correct word next to numbers 1–5. There is one example.",
    text: "Last summer, Sam spent a week camping near Pine Valley. One sunny afternoon, he sat quietly under an oak tree. Suddenly, he heard rustling leaves. A young desert fox peeked out from behind a rock. It looked hungry and was searching for [1] to eat. The fox sniffed the damp earth and used its front paws to dig near an old tree root. Sam noticed its long white [2] as it chewed on a fallen wild apple. Suddenly, a noisy hawk flew overhead. The little fox got frightened and ran straight into a sandy [3] under the boulders. Sam waited patiently until the bird flew away. Then, he watched the brave fox [4] up onto a sunny rock to warm its thick red [5]. Sam smiled and drew a lovely picture of his new woodland friend.",
    word_bank: [
      { word: "food", pos: "noun" },
      { word: "teeth", pos: "noun" },
      { word: "burrow", pos: "noun" },
      { word: "climb", pos: "verb" },
      { word: "fur", pos: "noun" },
      { word: "swim", pos: "verb" },
      { word: "heavy", pos: "adj" },
      { word: "ocean", pos: "noun" }
    ],
    items: [
      { id: 1, blank_id: 1, answer: "food" },
      { id: 2, blank_id: 2, answer: "teeth" },
      { id: 3, blank_id: 3, answer: "burrow" },
      { id: 4, blank_id: 4, answer: "climb" },
      { id: 5, blank_id: 5, answer: "fur" }
    ],
    title_question: {
      id: 6,
      question: "Now choose the best name for the story.",
      options: [
        "A stormy day on the ocean",
        "The clever fox and the woodland trail",
        "How to build a wooden tent"
      ],
      answer: "The clever fox and the woodland trail"
    }
  },

  reading_p4: {
    part: 4,
    instructions: "Read the text. Choose the right words and write them on the lines.",
    text: "Animals live [1] many different habitats all over our planet. Some animals live in deep oceans, [2] others thrive in hot, dry deserts. Every living creature must have food, water, and shelter to [3] alive. Predators like lions and wolves usually have sharper teeth [4] plant-eating herbivores. Their strong claws [5] used to catch prey and climb steep rocks. In polar regions, animals have thick [6] to protect their bodies from biting blizzards. Small creatures [7] as mice and desert foxes dig underground burrows [8] the earth stays cooler down there. Birds build cozy nests high in rainforest branches [9] their eggs remain safe from ground snakes. Observing wild animals in [10] natural homes teaches us how wonderfully nature works.",
    items: [
      { id: 1, blank_id: 1, options: ["in", "on", "at"], answer: "in" },
      { id: 2, blank_id: 2, options: ["while", "or", "so"], answer: "while" },
      { id: 3, blank_id: 3, options: ["stay", "stays", "stayed"], answer: "stay" },
      { id: 4, blank_id: 4, options: ["than", "then", "from"], answer: "than" },
      { id: 5, blank_id: 5, options: ["are", "is", "were"], answer: "are" },
      { id: 6, blank_id: 6, options: ["fur", "furs", "furred"], answer: "fur" },
      { id: 7, blank_id: 7, options: ["such", "so", "like"], answer: "such" },
      { id: 8, blank_id: 8, options: ["because", "although", "unless"], answer: "because" },
      { id: 9, blank_id: 9, options: ["so", "if", "but"], answer: "so" },
      { id: 10, blank_id: 10, options: ["their", "them", "theirs"], answer: "their" }
    ]
  },

  reading_p5: {
    part: 5,
    instructions: "Look at the picture and read the story. Write some words to complete the sentences about the story. You can use 1, 2, 3 or 4 words.",
    story: "Last Saturday, Leo and his sister Maya visited the Riverbend Wildlife Reserve with their grandfather. Grandfather was a retired park ranger who knew everything about animal tracks. When they arrived at the reserve gate at nine o'clock, the morning air was fresh and cool. Grandfather gave Leo a pair of silver binoculars and handed Maya a field sketchbook. As they walked along the shady forest trail, Maya spotted five grey squirrels chasing each other up a tall pine tree. Next, they crossed a sturdy wooden bridge over a rushing river. Leo looked down and gasped. A mother river otter was teaching two small pups how to swim in the clear water! The baby otters dipped their heads into the stream and splashed happily. Later that afternoon, Grandfather led the children to the rocky hill. Through his binoculars, Leo saw a majestic mountain eagle perched on a high boulder. It had sharp curved claws and huge brown wings. 'That eagle has the best eyesight in the whole valley,' Grandfather whispered. Before going home, the children enjoyed delicious honey cake and fresh milk at the reserve cafe. Leo decided that he wanted to become a wildlife ranger just like Grandfather.",
    example: { prompt: "Leo and Maya went to the reserve with their", answer: "grandfather" },
    items: [
      { id: 1, prompt: "The family arrived at the wildlife reserve gate at", answer: "nine o'clock" },
      { id: 2, prompt: "Grandfather gave Maya a", answer: "field sketchbook" },
      { id: 3, prompt: "Maya saw five grey squirrels climbing up a", answer: "tall pine tree" },
      { id: 4, prompt: "The mother otter was teaching her two pups how to", answer: "swim" },
      { id: 5, prompt: "On the rocky hill, Leo used binoculars to see a", answer: "mountain eagle" },
      { id: 6, prompt: "The eagle had huge brown wings and", answer: "sharp curved claws" },
      { id: 7, prompt: "At the reserve cafe, the children ate", answer: "honey cake" }
    ]
  },

  reading_p6: {
    part: 6,
    instructions: "Read the diary and write the missing words. Write one word on each line.",
    text: "Sunday, 14th October\nToday was the most exciting day of our autumn holiday! Dad drove us [1] the mountain wildlife park early this morning. It [2] very sunny and bright. We saw three brown bears playing near a waterfall. One bear was much bigger [3] the others and caught two fish with its sharp claws. I took lots of photos [4] I want to show my science teacher at school. Tomorrow, we [5] visit the desert reptile house. I cannot wait!",
    items: [
      { id: 1, blank_id: 1, answer: "to" },
      { id: 2, blank_id: 2, answer: "was" },
      { id: 3, blank_id: 3, answer: "than" },
      { id: 4, blank_id: 4, answer: "because" },
      { id: 5, blank_id: 5, answer: "will" }
    ]
  },

  writing_hub: {
    picture_story: {
      title: "Finding the Lost Bear Cub",
      instructions: "Look at the three pictures. Write the story. Write 20 or more words.",
      min_words: 20,
      model_sentence: "One sunny morning, Sam and Ranger David were hiking along a mountain trail when they discovered fresh bear paw prints in the damp mud. They followed the tracks carefully through the pine trees and discovered a frightened little cub sheltering behind a boulder. Ranger David gently guided the cub towards the meadow, where its delighted mother bear was waiting safely.",
      rubric: {
        content: 2,
        grammar_flow: 2,
        vocab_spelling: 1,
        total: 5
      },
      panels: [
        {
          panel_id: 1,
          title: "Spotting Animal Tracks",
          image_url: "/images/week40/writing_panel_1.png",
          caption: "Sam and Ranger David discover fresh bear paw tracks beside the forest stream.",
          word_bank: ["track", "paw", "mud", "hike", "careful"]
        },
        {
          panel_id: 2,
          title: "Discovering the Cub",
          image_url: "/images/week40/writing_panel_2.png",
          caption: "They find a small brown cub hiding behind a rocky boulder looking hungry.",
          word_bank: ["cub", "boulder", "fur", "frightened", "shelter"]
        },
        {
          panel_id: 3,
          title: "Reuniting with Mother Bear",
          image_url: "/images/week40/writing_panel_3.png",
          caption: "The cub runs happily across the sunny meadow to its grateful mother bear.",
          word_bank: ["reunited", "mother", "meadow", "delighted", "safe"]
        }
      ],
      ladder_steps: [
        { stage: "MODEL", focus: "Analyze 3-panel sequential storyline using Past Simple and connectors" },
        { stage: "BUILD", focus: "Draft 1-2 descriptive sentences per panel using animal vocabulary" },
        { stage: "WRITE", focus: "Compose complete paragraph narrative ensuring >= 20 words" },
        { stage: "EXPAND", focus: "Add descriptive adjectives (sharp claws, thick fur, grateful)" }
      ]
    }
  },

  speaking_hub: {
    find_differences: {
      part: 1,
      instructions: "Look at the two pictures. Find 5 differences and describe them to Nova.",
      examiner_script: "Here are two pictures of the Wildlife Observation Post. They look similar, but some things are different. In Picture A, there is one leopard in the tree, but in Picture B, there are two leopards. Now what other differences can you see?",
      differences: [
        { id: 1, picture_a: "One leopard is resting on the tree branch", picture_b: "Two leopards are resting on the tree branch" },
        { id: 2, picture_a: "The ranger is holding a blue clipboard", picture_b: "The ranger is holding a yellow map" },
        { id: 3, picture_a: "The weather is sunny with two white clouds", picture_b: "It is raining with dark grey clouds" },
        { id: 4, picture_a: "A brown rabbit is hopping near the burrow", picture_b: "A red fox is peeking out of the burrow" },
        { id: 5, picture_a: "The jeep parked by the gate is green", picture_b: "The jeep parked by the gate is red" }
      ]
    },

    info_exchange_cards: {
      table_a: {
        title: "Liam's Desert Safari",
        person: "Liam",
        fields: [
          {
            id: "location",
            cue_prompt: "Where / go",
            cue_word: "where",
            is_missing: true,
            acceptable_questions: [
              "Where did Liam go on his safari?",
              "Where is Liam's safari?",
              "Where did Liam go?"
            ],
            nova_reply: "Liam went to the Red Dune Desert in the north."
          },
          {
            id: "departure_time",
            cue_prompt: "What time / start",
            cue_word: "what time",
            is_missing: true,
            acceptable_questions: [
              "What time did the safari start?",
              "What time does it start?",
              "When did the tour begin?"
            ],
            nova_reply: "His desert safari started at half past seven in the morning."
          },
          {
            id: "transport",
            cue_prompt: "How / travel",
            cue_word: "how",
            is_missing: true,
            acceptable_questions: [
              "How did Liam travel across the desert?",
              "How did he travel?",
              "What transport did he use?"
            ],
            nova_reply: "He travelled in a strong four-wheel-drive safari jeep."
          },
          {
            id: "animal_seen",
            cue_prompt: "What animal / see",
            cue_word: "what animal",
            is_missing: true,
            acceptable_questions: [
              "What animal did Liam see?",
              "Which animals did he see in the desert?",
              "What did he see?"
            ],
            nova_reply: "He saw three desert foxes with big ears and two camels."
          },
          {
            id: "weather",
            cue_prompt: "What / weather like",
            cue_word: "weather",
            is_missing: true,
            acceptable_questions: [
              "What was the weather like?",
              "What was the weather like on the safari?",
              "Was it sunny?"
            ],
            nova_reply: "It was extremely hot and dry with bright sunshine."
          }
        ]
      },
      table_b: {
        title: "Chloe's Rainforest Tour",
        person: "Chloe",
        fields: [
          {
            id: "destination",
            cue_prompt: "Where / go",
            cue_word: "where",
            value: "Emerald Rainforest Reserve",
            nova_question: "Where did Chloe go on her wildlife tour?",
            acceptable_answers: [
              "She went to Emerald Rainforest Reserve.",
              "Chloe went to Emerald Rainforest Reserve.",
              "To Emerald Rainforest Reserve."
            ]
          },
          {
            id: "ticket_cost",
            cue_prompt: "How much / ticket",
            cue_word: "how much",
            value: "12 pounds",
            nova_question: "How much did Chloe's tour ticket cost?",
            acceptable_answers: [
              "Her ticket cost 12 pounds.",
              "It was twelve pounds.",
              "12 pounds."
            ]
          },
          {
            id: "activity",
            cue_prompt: "What / do",
            cue_word: "what do",
            value: "Walked on canopy treetop bridges",
            nova_question: "What activity did Chloe do in the rainforest?",
            acceptable_answers: [
              "She walked on canopy treetop bridges.",
              "Chloe walked on treetop bridges.",
              "Walking on canopy bridges."
            ]
          },
          {
            id: "equipment",
            cue_prompt: "What / bring",
            cue_word: "what bring",
            value: "A raincoat and binoculars",
            nova_question: "What equipment did Chloe bring with her?",
            acceptable_answers: [
              "She brought a raincoat and binoculars.",
              "Chloe took a raincoat and binoculars.",
              "A raincoat and binoculars."
            ]
          },
          {
            id: "duration",
            cue_prompt: "How long / tour",
            cue_word: "how long",
            value: "Four hours",
            nova_question: "How long did the rainforest tour last?",
            acceptable_answers: [
              "The tour lasted four hours.",
              "It took four hours.",
              "Four hours."
            ]
          }
        ]
      }
    },

    picture_story: {
      part: 3,
      title: "The Clever Monkey and the Leopard",
      instructions: "Look at the 5 pictures. They show a story about a monkey in the forest. Tell the story to Nova.",
      examiner_intro: "These pictures tell a story called 'The Clever Monkey and the Leopard'. Look at picture 1 first. A little monkey is eating sweet figs in a tall tree. A spotted leopard is watching from below. Now you tell the story.",
      frames: [
        {
          frame_id: 1,
          title: "Eating in the Tree",
          narration_prompt: "The monkey sits high on a green branch eating ripe fruit while a leopard sneaks below.",
          cue_keywords: ["monkey", "figs", "leopard", "branch", "hungry"]
        },
        {
          frame_id: 2,
          title: "The Leopard Climbs",
          narration_prompt: "The leopard uses its sharp claws to climb up the rough tree trunk towards the monkey.",
          cue_keywords: ["climb", "sharp claws", "trunk", "creeping", "frightened"]
        },
        {
          frame_id: 3,
          title: "The Big Jump",
          narration_prompt: "The agile monkey leaps safely across to a thinner branch that the heavy leopard cannot walk on.",
          cue_keywords: ["jump", "agile", "thin branch", "heavy", "safe"]
        },
        {
          frame_id: 4,
          title: "The Branch Bends",
          narration_prompt: "The heavy leopard steps onto the weak branch, but it bends and snaps under its weight.",
          cue_keywords: ["bends", "snaps", "weight", "slip", "fall"]
        },
        {
          frame_id: 5,
          title: "Safe and Chattering",
          narration_prompt: "The leopard lands harmlessly into soft river mud, while the clever monkey chatters happily high above.",
          cue_keywords: ["mud", "splash", "chatter", "clever", "happy"]
        }
      ]
    },

    personal_questions: {
      part: 4,
      instructions: "Answer Nova's questions about animals, wildlife, and outdoor places.",
      questions: [
        {
          id: 1,
          topic: "Favourite wild animal",
          question: "What is your favourite wild animal, and why do you like it?",
          follow_up: "Can that animal run fast or climb trees?"
        },
        {
          id: 2,
          topic: "Visiting nature parks",
          question: "Have you ever visited a wildlife park or a zoo with your family?",
          follow_up: "What was the most exciting animal you saw there?"
        },
        {
          id: 3,
          topic: "Animal habitats",
          question: "Would you prefer to explore a deep rainforest or a sandy desert?",
          follow_up: "What warm clothes or equipment would you pack?"
        },
        {
          id: 4,
          topic: "Looking after animals",
          question: "Why is it important to protect wild animals and their natural habitats?",
          follow_up: "What can children do to help birds and animals in their gardens?"
        }
      ]
    }
  }
};

