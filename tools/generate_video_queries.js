import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const ROOT_DIR = path.resolve(path.dirname(__filename), '..');

/**
 * BLUEPRINT-DRIVEN VIDEO QUERY GENERATOR
 * 
 * This script reads Blueprint data for each week and generates video_queries.json
 * based on:
 * - Week theme (from Blueprint)
 * - Grammar focus (from Blueprint)  
 * - Math/Sci/Soc keywords (from Blueprint)
 * - Video suggestions (from Blueprint)
 * 
 * Combined with: "ESL for kids cartoons" suffix for better YouTube search
 */

// BLUEPRINT DATA EXTRACTION (Weeks 1-54)
const BLUEPRINT_WEEKS = {
  1: {
    theme: "Hello, World!",
    grammar: "Subject Pronouns + Be (I am, You are)",
    keywords: "Numbers 1-10, Count to 10",
    video_hint: "Count to 10",
    read_topic: "The Junior Scholar - student identity"
  },
  2: {
    theme: "Family Squad",
    grammar: "Possessive Adjectives (My, Your)",
    keywords: "Family roles, family members",
    video_hint: "Family Finger",
    read_topic: "Family Roots - family tree"
  },
  3: {
    theme: "Mirror Game",
    grammar: "Is vs Has (She is tall / She has hair)",
    keywords: "Body parts, physical description",
    video_hint: "Parts of the Body",
    read_topic: "The Detective - describing people"
  },
  4: {
    theme: "Happy Jar",
    grammar: "Like + V-ing (I like playing)",
    keywords: "Emotions, feelings",
    video_hint: "Feelings Song",
    read_topic: "Emotional IQ - understanding emotions"
  },
  5: {
    theme: "Mystery House",
    grammar: "Articles A/An (A bed, An apple)",
    keywords: "Rooms in house, household items",
    video_hint: "Rooms in House",
    read_topic: "Smart Home - house tour"
  },
  6: {
    theme: "Treasure Hunt",
    grammar: "Prepositions of Place (In, On, Under)",
    keywords: "Spatial awareness, location",
    video_hint: "Where is it?",
    read_topic: "Interior Decorator - positioning objects"
  },
  7: {
    theme: "Backpack",
    grammar: "There is (Singular)",
    keywords: "School supplies, counting 1-20",
    video_hint: "School Supplies",
    read_topic: "Inventor's Kit - school items"
  },
  8: {
    theme: "Busy Class",
    grammar: "There are (Plural)",
    keywords: "Plural nouns, counting",
    video_hint: "Plural Song",
    read_topic: "Class Inventory - plural items"
  },
  9: {
    theme: "City Sounds & Sights",
    grammar: "Adjectives before nouns (It is a [adjective] [noun])",
    keywords: "City places, transportation, urban life",
    video_hint: "City Song",
    read_topic: "City Explorer - describing city scenes"
  },
  10: {
    theme: "The Farm Adventure",
    grammar: "Contrast with but (The city is noisy, but the farm is quiet)",
    keywords: "Farm animals, countryside, city vs farm",
    video_hint: "Farm Animals",
    read_topic: "Farm Tour - comparing locations"
  },
  11: {
    theme: "Weekend Fun Spots",
    grammar: "Preposition At (I play at the park)",
    keywords: "Places, park, library, supermarket, weekend activities",
    video_hint: "Places in Town",
    read_topic: "Weekend Adventure - places to visit"
  },
  12: {
    theme: "The Talent Show",
    grammar: "Can/Can't for Ability (I can sing, I can't swim)",
    keywords: "Abilities, talents, sing dance draw run jump swim",
    video_hint: "I Can Song",
    read_topic: "Talent Show - abilities and performances"
  },
  13: {
    theme: "Daily Routines",
    grammar: "Present Simple (I wake up, I go)",
    keywords: "wake up, brush teeth, eat breakfast, go to school, have lunch, do homework, watch TV, go to bed",
    video_hint: "Daily Routine Song",
    read_topic: "A Perfect School Day - daily routines and time"
  },
  14: {
    theme: "Welcome to My World",
    grammar: "Presentation & Self-Introduction (I present, I can, My family has)",
    keywords: "present, poster, family, abilities, talents, confident, proud",
    video_hint: "Show and Tell Song",
    read_topic: "Project Presentation - sharing about yourself and family"
  },
  15: {
    theme: "The Busy Park",
    grammar: "Present Continuous (S + am/is/are + V-ing)",
    keywords: "actions, running, jumping, playing, eating, park activities",
    video_hint: "What are you doing?",
    read_topic: "At the Park - describing actions happening now"
  },
  16: {
    theme: "Sports Commentary",
    grammar: "Present Continuous (is/are + verb-ing)",
    keywords: "sports, running, kicking, throwing, catching, scoring, commentary",
    video_hint: "Sports action verbs",
    read_topic: "Sports Reporter - describing live sports events"
  },
  17: {
    theme: "Weather & Clothes",
    grammar: "Cause and Effect: It is [weather], so I am wearing [clothes]",
    keywords: "weather, sunny, rainy, cloudy, snowy, hot, cold, clothes, jacket, umbrella",
    video_hint: "Weather Song",
    read_topic: "Weather Reporter - describing weather and dressing"
  },
  18: {
    theme: "The Live Reporter",
    grammar: "Present Continuous: I am reporting / She is filming / They are watching",
    keywords: "reporter, camera, filming, watching, happening, news, microphone, broadcasting",
    video_hint: "What is happening now?",
    read_topic: "Live News Reporter - describing current events"
  },
  // ── BLOCK B: THE FIRST STEPS BACK (Weeks 19-36) ──────────────────────────
  19: {
    theme: "When I Was Small",
    grammar: "Was / Were (Past State): I am big. I was small.",
    keywords: "baby, cute, little, noisy, quiet, kindergarten, grow, past, young",
    video_hint: "Was Were Song",
    read_topic: "Baby Photos - contrasting past and present"
  },
  20: {
    theme: "The Old Town",
    grammar: "There was / There were (Past Existence)",
    keywords: "old, new, building, tree, river, road, history, city, town",
    video_hint: "There was There were",
    read_topic: "History of My City - what existed before"
  },
  21: {
    theme: "Yesterday's Diary",
    grammar: "Past Simple Regular (-ed): walked, played, watched, cooked",
    keywords: "walked, looked, cooked, played, watched, cleaned, yesterday, diary",
    video_hint: "Past Tense -ed song",
    read_topic: "My Diary - finished actions from yesterday"
  },
  22: {
    theme: "The Time Detective",
    grammar: "Past Simple Questions: Did you play? Yes I did / No I didn't",
    keywords: "did, didn't, yesterday, last night, last week, interrogate, questions",
    video_hint: "Did you? Past Simple questions",
    read_topic: "Time Detective - asking about the past"
  },
  23: {
    theme: "The Art Class",
    grammar: "Past Simple Regular arts verbs: painted, colored, glued, folded",
    keywords: "paint, colour, glue, fold, cut, picture, scissors, art, craft",
    video_hint: "Past tense art verbs",
    read_topic: "Art Class - describing what we created"
  },
  24: {
    theme: "Feelings in the Past",
    grammar: "Was/Were + Adjectives: I was scared because / They were excited",
    keywords: "scared, tired, hungry, thirsty, excited, bored, surprised, feelings, emotions",
    video_hint: "Feelings emotions song",
    read_topic: "Emotion Diary - past feelings and reasons"
  },
  25: {
    theme: "Sequencing Actions",
    grammar: "Sequence Connectors: First, Next, Then, Finally",
    keywords: "bread, jam, spread, knife, toothpaste, brush, rinse, sequence, order, steps",
    video_hint: "How to sequence steps",
    read_topic: "How I Made a Sandwich - step-by-step sequences"
  },
  26: {
    theme: "My Weekend Comic",
    grammar: "Past Simple Review: Regular Verbs (-ed) and Was/Were",
    keywords: "comic, drawing, weekend, story, past, review",
    video_hint: "Weekend story past tense",
    read_topic: "My Weekend Comic - creative writing with past tense"
  },
  27: {
    theme: "Nature Sequencing",
    grammar: "Present Simple for Facts: It grows, It needs, It becomes",
    keywords: "seed, soil, water, sun, root, stem, leaf, flower, plant, grow, cycle",
    video_hint: "Plant Growth Life Cycle",
    read_topic: "How a Seed Becomes a Plant - natural sequence"
  },
  28: {
    theme: "The Tortoise and the Hare",
    grammar: "Past Simple Irregular in context: ran, slept, won",
    keywords: "fast, slow, race, sleep, win, lose, tortoise, hare, fable, story",
    video_hint: "Tortoise and Hare story",
    read_topic: "Story Retell - The Tortoise and the Hare"
  },
  29: {
    theme: "The Magic Trip",
    grammar: "Irregular Verbs 1 Movement: go-went, come-came, run-ran, fly-flew",
    keywords: "trip, holiday, beach, mountain, airplane, car, went, came, ran, flew",
    video_hint: "Irregular verbs movement song",
    read_topic: "The Magic Holiday Trip - movement irregular verbs"
  },
  30: {
    theme: "The Picnic",
    grammar: "Irregular Verbs 2 Consumption: eat-ate, drink-drank, buy-bought, give-gave",
    keywords: "picnic, basket, apple, juice, sandwich, share, ate, drank, bought, gave",
    video_hint: "Irregular verbs food eating",
    read_topic: "The Picnic - eating and drinking in past"
  },
  31: {
    theme: "The Senses",
    grammar: "Irregular Verbs 3 Perception: see-saw, hear-heard, feel-felt, smell-smelt",
    keywords: "bird, song, soft, hard, loud, beautiful, saw, heard, felt, forest, senses",
    video_hint: "5 senses song for kids",
    read_topic: "Forest Senses - perceiving the world around us"
  },
  32: {
    theme: "The Busy Day",
    grammar: "Irregular Verbs 4 Tasks: do-did, make-made, have-had, take-took",
    keywords: "homework, bed, breakfast, shower, mess, clean, did, made, had, took",
    video_hint: "Chores housework irregular verbs",
    read_topic: "Busy Day Chores - completed tasks in past"
  },
  33: {
    theme: "The Mistake",
    grammar: "Irregular Verbs 5 Accidents: break-broke, fall-fell, lose-lost, hurt-hurt",
    keywords: "mistake, accident, fix, sorry, careful, clumsy, broke, fell, lost, hurt",
    video_hint: "Accidents irregular verbs story",
    read_topic: "Oops Accidents - explaining what went wrong"
  },
  34: {
    theme: "The Lion and the Mouse",
    grammar: "Mixed Regular and Irregular Past tense: story telling practice",
    keywords: "net, trap, roar, help, friend, tiny, huge, lion, mouse, fable",
    video_hint: "Lion and Mouse fable story",
    read_topic: "Storytelling Practice - The Lion and the Mouse"
  },
  35: {
    theme: "The Best Day Ever",
    grammar: "Past Simple + Adjectives: describing best personal memories",
    keywords: "best, day, memory, amazing, wonderful, exciting, beautiful, adjectives",
    video_hint: "Best day story ESL kids",
    read_topic: "Personal Recount - The Best Day Ever"
  },
  36: {
    theme: "My Adventure Book",
    grammar: "Past Simple Review: mix of regular and irregular verbs creative writing",
    keywords: "adventure, book, journey, story, trip, write, illustrate, mini-book",
    video_hint: "Adventure story past tense",
    read_topic: "My Adventure Book - past tense creative writing"
  },
  // ── BLOCK C: CLIL FOUNDATIONS (Weeks 37-54) ──────────────────────────────
  37: {
    theme: "Living vs Non-Living",
    grammar: "It is living because it breathes/grows (Logical Reasoning with Because)",
    keywords: "living, non-living, breathe, grow, need, food, water, rock, plastic, science",
    video_hint: "Living non-living things",
    read_topic: "Nature Detective - investigating living things"
  },
  38: {
    theme: "Animal Abilities",
    grammar: "Can / Cannot (Can't): what animals can and cannot do",
    keywords: "jump, fly, swim, hunt, climb, run, heavy, fast, animal abilities",
    video_hint: "Animal abilities can cannot",
    read_topic: "Animal Superpowers - comparing abilities"
  },
  39: {
    theme: "Habitats",
    grammar: "I think the animal lives in the place (Opinion + habitat)",
    keywords: "habitat, desert, rainforest, ocean, polar, safe, dangerous, animals",
    video_hint: "Animal habitats song",
    read_topic: "Where Do Animals Live - habitats and environments"
  },
  40: {
    theme: "Beast Battle",
    grammar: "Comparative Adjectives (-er than): faster, stronger, bigger",
    keywords: "teeth, claws, fur, skin, heavy, light, comparative, predator, animals",
    video_hint: "Comparative adjectives faster stronger",
    read_topic: "Beast Battle - comparing animals with comparatives"
  },
  41: {
    theme: "Life Cycles",
    grammar: "Present Simple 3rd Person: It changes, It grows, It becomes",
    keywords: "egg, hatch, caterpillar, tadpole, chrysalis, butterfly, frog, life cycle",
    video_hint: "Butterfly life cycle for kids",
    read_topic: "Life Cycle Science - butterfly or frog transformation"
  },
  42: {
    theme: "The Water Journey",
    grammar: "Present Simple + Sequence: evaporation and water cycle",
    keywords: "sun, cloud, rain, river, ocean, evaporation, go up, come down, cycle, water",
    video_hint: "Water cycle song for kids",
    read_topic: "The Water Cycle - never-ending journey of water"
  },
  43: {
    theme: "The Plus Machine",
    grammar: "2 plus 2 equals 4 / 2 and 2 is 4 (Math literacy sentences)",
    keywords: "add, plus, combine, total, together, equals, addition, math language",
    video_hint: "Addition song for kids",
    read_topic: "Addition Language - reading math as sentences"
  },
  44: {
    theme: "The Cookie Monster",
    grammar: "Take away, Left, Minus (Subtraction language)",
    keywords: "minus, subtract, take away, how many left, lose, cookies, math",
    video_hint: "Subtraction song for kids",
    read_topic: "Subtraction Stories - taking away in English"
  },
  45: {
    theme: "Shape Detectives",
    grammar: "It has [number] sides. It is round. (Geometric description)",
    keywords: "square, circle, triangle, rectangle, side, corner, round, straight, shapes",
    video_hint: "Shapes song for kids",
    read_topic: "Shape Detectives - finding shapes in the classroom"
  },
  46: {
    theme: "The Pattern Code",
    grammar: "If [square] then [red] (Logical conditionals and patterns)",
    keywords: "pattern, next, repeat, sequence, before, after, predict, logic",
    video_hint: "Patterns and sequences for kids",
    read_topic: "Pattern Code - cracking visual sequences"
  },
  47: {
    theme: "Big Numbers",
    grammar: "Hyphenated numbers: twenty-one, forty-five, ninety-nine",
    keywords: "ten, twenty, thirty, hundred, count, how many, numbers, place value",
    video_hint: "Numbers 1 to 100 song",
    read_topic: "Big Numbers - counting and reading numbers to 100"
  },
  48: {
    theme: "Measuring Up",
    grammar: "It is [number] centimeters long/tall (Measurement sentences)",
    keywords: "long, short, tall, measure, ruler, centimeter, meter, length, height",
    video_hint: "Measuring length for kids",
    read_topic: "Measure Up - comparing lengths and heights"
  },
  49: {
    theme: "Future Dreams",
    grammar: "I want to be a [job] / I am going to be (Future intentions)",
    keywords: "doctor, teacher, pilot, artist, scientist, dream, future, job, career",
    video_hint: "Jobs careers future song for kids",
    read_topic: "When I Grow Up - jobs and future dreams"
  },
  50: {
    theme: "Review Station 1",
    grammar: "Past Present Future Mix: tense review grammar",
    keywords: "past, present, future, review, tenses, mix, grammar",
    video_hint: "Tenses review past present future",
    read_topic: "Tense Review - board game with all tenses"
  },
  51: {
    theme: "Review Station 2",
    grammar: "Vocabulary CLIL review: Nature, Home, School, Math",
    keywords: "nature, home, school, math, review, categorize, vocabulary",
    video_hint: "Vocabulary categories review",
    read_topic: "Vocab Categories - sorting words into groups"
  },
  52: {
    theme: "Have You Ever Bingo",
    grammar: "Have you ever...? Present Perfect chunks for experiences",
    keywords: "have you ever, seen, been, eaten, experience, bingo, present perfect",
    video_hint: "Have you ever experience song",
    read_topic: "Experience Bingo - have you ever done it"
  },
  53: {
    theme: "My Year in Review",
    grammar: "Portfolio writing: About Me self-introduction",
    keywords: "portfolio, best work, drawings, about me, introduction, year review",
    video_hint: "All about me song for kids",
    read_topic: "Year in Review - portfolio curation and self-introduction"
  },
  54: {
    theme: "Phase 1 Graduation",
    grammar: "I can present my portfolio (graduation speech)",
    keywords: "graduation, showcase, portfolio, speech, parents, proud, present",
    video_hint: "Graduation celebration kids",
    read_topic: "Phase 1 Graduation Showcase - presenting work to parents"
  },
  // ── PHASE 2: ACADEMIC APPLICATION (Weeks 55-120) ─────────────────────────
  55: {
    theme: "Cause and Effect Sentences",
    grammar: "Conjunctions Because (reason) vs So (result)",
    keywords: "cause, effect, reason, result, happen, connect, because, so, therefore",
    video_hint: "Cause and effect because so",
    read_topic: "The Why Game - connecting ideas with because and so"
  },
  56: {
    theme: "Cause and Effect Paragraph",
    grammar: "Sentence connectors: This leads to, As a result (sequence logic)",
    keywords: "lead to, due to, consequently, start, end, first, finally, chain reaction",
    video_hint: "Cause effect paragraph writing",
    read_topic: "Chain Reaction - explaining sequences of events"
  },
  57: {
    theme: "Problem and Solution",
    grammar: "Modals of Possibility: We can, We could, We should",
    keywords: "problem, solution, fix, solve, idea, suggest, broken, repair, modals",
    video_hint: "Problem solution modals can could should",
    read_topic: "Fix-It Squad - identifying problems and suggesting fixes"
  },
  58: {
    theme: "Problem Solution Paragraph",
    grammar: "First Conditional: If we fix it, it will be better",
    keywords: "plan, step, improve, better, success, fail, strategy, solution, result",
    video_hint: "First conditional if then ESL",
    read_topic: "The Master Plan - writing a detailed solution plan"
  },
  59: {
    theme: "Message in a Bottle",
    grammar: "Informal Tone: Contractions I'm It's, Greetings Hi Hey",
    keywords: "dear, best, friend, write, news, fun, reply, miss you, letter, informal",
    video_hint: "Writing a letter for kids",
    read_topic: "Friendly Letter - writing to a mysterious friend"
  },
  60: {
    theme: "The Mayor's Request",
    grammar: "Polite Modals: May I, Could you, Would like (formal writing)",
    keywords: "Sir, Madam, sincerely, request, improve, community, library, park, formal",
    video_hint: "Formal letter writing polite request",
    read_topic: "Formal Writing - polite request to the Mayor"
  },
  61: {
    theme: "Main Idea Hunter",
    grammar: "Subject + Verb core sentence identification (reading comprehension)",
    keywords: "main idea, detail, support, topic, important, about, title, reading",
    video_hint: "Main idea and details reading",
    read_topic: "Main Idea - finding the gem in a text"
  },
  62: {
    theme: "The Movie Trailer",
    grammar: "Reported Speech Basic: He said that (summarizing)",
    keywords: "summary, short, retell, story, scene, character, plot, paraphrase",
    video_hint: "Summarizing stories reported speech",
    read_topic: "Movie Trailer - retelling a story briefly"
  },
  63: {
    theme: "Reading Maps",
    grammar: "Prepositions of Location: North of, to the East of (compass directions)",
    keywords: "North, South, East, West, compass, map, key, direction, straight, turn",
    video_hint: "Compass directions map reading for kids",
    read_topic: "Treasure Map - describing exact locations"
  },
  64: {
    theme: "Data Stories",
    grammar: "Quantifiers: The majority of, Most, Few (factual reporting)",
    keywords: "chart, graph, show, data, popular, least, number, information, pictograph",
    video_hint: "Reading graphs charts for kids",
    read_topic: "Data Stories - writing sentences from charts and graphs"
  },
  65: {
    theme: "Review Cycle 2.1",
    grammar: "Review: Logic connectors, data language, letter writing",
    keywords: "review, logic, data, letter, newsletter, class, vocabulary",
    video_hint: "English review games for kids",
    read_topic: "Class Newsletter - reviewing logic and data skills"
  },
  66: {
    theme: "Email vs Handwritten Letters",
    grammar: "Modals, Comparatives, Because/So (debate opinion sentences)",
    keywords: "faster, slower, personal, easy, hard, keep, delete, email, letter",
    video_hint: "Opinion debate kids ESL",
    read_topic: "Micro-Debate - Email vs Handwritten Letters"
  },
  67: {
    theme: "OREO Structure",
    grammar: "Opinion Phrases: I strongly believe, In my view (persuasion intro)",
    keywords: "opinion, believe, think, agree, disagree, reason, example, OREO paragraph",
    video_hint: "Opinion writing OREO structure",
    read_topic: "Opinion Sandwich - intro to persuasive writing"
  },
  68: {
    theme: "Strong Reasons",
    grammar: "Connectors of Addition: Furthermore, In addition, For example",
    keywords: "support, detail, fact, true, prove, clear, furthermore, in addition",
    video_hint: "Connectors furthermore in addition for kids",
    read_topic: "Supporting the Argument - writing reasons and examples"
  },
  69: {
    theme: "Environmental Protection",
    grammar: "Modals of Obligation: Should, Must, Have to (persuasive advice)",
    keywords: "protect, save, environment, pollution, waste, recycle, clean, dirty",
    video_hint: "Environment protection should must",
    read_topic: "Save the Earth - persuasive paragraph about environment"
  },
  70: {
    theme: "My Green Idea Presentation",
    grammar: "Speaking Transitions: First of all, Finally (public speaking)",
    keywords: "speech, present, voice, loud, clear, audience, listen, environment",
    video_hint: "Speech presentation transitions for kids",
    read_topic: "Speaking for the Planet - persuasive speech presentation"
  },
  71: {
    theme: "The Solar System",
    grammar: "Superlative Adjectives: The biggest, The furthest, The hottest",
    keywords: "planet, solar system, orbit, sun, moon, star, space, telescope, superlative",
    video_hint: "Solar system planets for kids",
    read_topic: "Space Giants - describing planets with superlatives"
  },
  72: {
    theme: "Photosynthesis",
    grammar: "Passive Voice intro Present Simple: Sunlight is absorbed",
    keywords: "photosynthesis, sunlight, water, carbon dioxide, oxygen, energy, absorb, make",
    video_hint: "Photosynthesis explained for kids",
    read_topic: "Plant Power - how plants make food from sunlight"
  },
  73: {
    theme: "The Water Cycle Advanced",
    grammar: "Sequence Connectors Advanced: Subsequently, Following this, Eventually",
    keywords: "evaporation, condensation, precipitation, collection, vapor, turn into, cycle",
    video_hint: "Water cycle evaporation condensation",
    read_topic: "The Never-Ending Journey - advanced water cycle explanation"
  },
  74: {
    theme: "Food Chains",
    grammar: "Zero Conditional scientific facts: If plants die, animals have no food",
    keywords: "producer, consumer, predator, prey, energy, flow, eat, eaten by, food chain",
    video_hint: "Food chain producers consumers predators",
    read_topic: "Who Eats Who - energy flow in food chains"
  },
  75: {
    theme: "Ancient Egypt",
    grammar: "Used to / Would (Past habits): Egyptians used to build pyramids",
    keywords: "pyramid, pharaoh, Egypt, ancient, hieroglyphics, sphinx, used to, history",
    video_hint: "Ancient Egypt for kids pyramids pharaoh",
    read_topic: "Pyramids and Pharaohs - descriptive paragraph about Ancient Egypt"
  },
  76: {
    theme: "Explorers",
    grammar: "Narrative Past Tense: Columbus sailed, Magellan discovered (historical)",
    keywords: "explorer, ship, voyage, discover, map, ocean, Columbus, Magellan, navigate",
    video_hint: "Famous explorers for kids",
    read_topic: "Age of Exploration - writing about famous explorers"
  },
  77: {
    theme: "World Landmarks",
    grammar: "Relative Clauses intro: The Eiffel Tower, which is in Paris, is tall",
    keywords: "landmark, Eiffel Tower, Great Wall, Colosseum, Statue of Liberty, famous",
    video_hint: "World famous landmarks for kids",
    read_topic: "World Wonders - describing famous world landmarks"
  },
  78: {
    theme: "Cultures Around the World",
    grammar: "Present Simple + Opinion: People in Japan eat sushi / I think that",
    keywords: "culture, tradition, food, clothing, festival, celebrate, country, different",
    video_hint: "Cultures world traditions for kids",
    read_topic: "World Cultures - describing cultural traditions"
  },
  79: {
    theme: "Review Social Studies",
    grammar: "Review: Used to, Superlatives, Zero Conditional, Relative Clauses",
    keywords: "review, history, geography, culture, world, countries, facts",
    video_hint: "Social studies review for kids",
    read_topic: "World Knowledge Review - history, geography, culture"
  },
  80: {
    theme: "Project Presentation Prep",
    grammar: "Presentation language: First I will talk about / In conclusion",
    keywords: "present, project, poster, research, topic, introduction, conclusion",
    video_hint: "Presentation skills for kids",
    read_topic: "Project Presentation - organising and delivering research"
  },
  81: {
    theme: "The Master Architect",
    grammar: "Essay structure language: introduction, body, conclusion planning",
    keywords: "essay, plan, structure, outline, thesis, argument, paragraph, architect",
    video_hint: "Essay structure paragraph writing",
    read_topic: "Planning an Essay - building structure like a house"
  },
  82: {
    theme: "The Travel Vlogger",
    grammar: "Descriptive writing: adjectives and sensory details",
    keywords: "travel, place, describe, beautiful, amazing, favourite, adjectives, detail",
    video_hint: "Travel descriptive writing for kids",
    read_topic: "My Favourite Place - descriptive writing and drafting"
  },
  83: {
    theme: "Landforms",
    grammar: "It is formed by / It is located in (geographical description)",
    keywords: "mountain, valley, plain, river, lake, ocean, landform, geographic, formed",
    video_hint: "Landforms geography for kids",
    read_topic: "Earth's Shapes - describing landforms of the world"
  },
  84: {
    theme: "Volcanoes",
    grammar: "Passive Voice: Lava is pushed out / Rocks are formed by cooling",
    keywords: "volcano, lava, magma, erupt, crater, ash, explosion, rocks, tectonic",
    video_hint: "Volcano eruption for kids",
    read_topic: "Fire Mountain - how volcanoes work"
  },
  85: {
    theme: "Advanced Maps",
    grammar: "Prepositions of direction + Scale: 1 cm represents 10 km",
    keywords: "map, scale, distance, legend, compass, north, south, geographic, grid",
    video_hint: "Map reading scale for kids",
    read_topic: "Advanced Maps - reading scales and understanding distance"
  },
  86: {
    theme: "Weather vs Climate",
    grammar: "Present Simple for scientific facts vs Present Continuous for now",
    keywords: "weather, climate, temperature, season, pattern, forecast, warm, cold, humid",
    video_hint: "Weather vs climate difference for kids",
    read_topic: "Weather vs Climate - understanding the difference"
  },
  87: {
    theme: "Human Body",
    grammar: "Present Simple 3rd person: The heart pumps blood, Muscles move bones",
    keywords: "heart, lungs, brain, bones, muscles, digest, breathe, blood, organ, body",
    video_hint: "Human body organs for kids",
    read_topic: "Body Systems - how the human body works"
  },
  88: {
    theme: "Ancient Rome",
    grammar: "Used to / Historical Past: Romans used to have baths, Gladiators fought",
    keywords: "Rome, gladiator, colosseum, toga, emperor, senate, aqueduct, ancient",
    video_hint: "Ancient Rome for kids gladiators",
    read_topic: "Gladiators and Emperors - Ancient Rome history"
  },
  89: {
    theme: "Inventions",
    grammar: "Passive Voice: The telephone was invented by Bell (historical passive)",
    keywords: "invention, invent, discover, light, telephone, computer, internet, electricity",
    video_hint: "Famous inventions for kids",
    read_topic: "Brilliant Inventions - how they changed the world"
  },
  90: {
    theme: "Physics Forces",
    grammar: "Zero Conditional + Because: If you push harder, it moves faster",
    keywords: "force, push, pull, gravity, friction, speed, heavy, light, motion, physics",
    video_hint: "Forces gravity friction for kids",
    read_topic: "Forces in Action - push pull gravity and friction"
  },
  91: {
    theme: "The Scientific Method",
    grammar: "Logical sequence: First I hypothesized, Then I observed, Finally I concluded",
    keywords: "hypothesis, experiment, observe, predict, results, conclusion, scientific",
    video_hint: "Scientific method steps for kids",
    read_topic: "Science Lab - following the scientific method"
  },
  92: {
    theme: "Community Helpers",
    grammar: "Present Simple + Modals: Doctors help people / We should thank helpers",
    keywords: "doctor, firefighter, teacher, police, nurse, community, helper, job, role",
    video_hint: "Community helpers jobs for kids",
    read_topic: "Helpers in My Community - who keeps us safe"
  },
  93: {
    theme: "Passion Project Topic Selection",
    grammar: "Research question language: I want to find out about, My topic is",
    keywords: "topic, research, question, outline, choose, interest, passion, project",
    video_hint: "Research project choose topic for kids",
    read_topic: "Passion Project - selecting a research topic"
  },
  94: {
    theme: "Passion Project Drafting",
    grammar: "Drafting and editing language: revise, improve, fix punctuation",
    keywords: "draft, edit, revise, improve, writing, research, paragraph, sentence",
    video_hint: "Drafting editing writing for kids",
    read_topic: "Draft and Edit - improving your research writing"
  },
  95: {
    theme: "Passion Project Research",
    grammar: "Note-taking language: According to, It says that, The main idea is",
    keywords: "research, notes, source, information, facts, according to, take notes",
    video_hint: "Note taking research skills for kids",
    read_topic: "Information Hunting - finding and recording facts"
  },
  96: {
    theme: "Passion Project Presentation",
    grammar: "Presentation transitions: First I will talk about, Thank you for listening",
    keywords: "present, poster, project, audience, speak, slide, conclusion, thank",
    video_hint: "Presentation speech for kids",
    read_topic: "Show What You Know - presenting passion project"
  },
  97: {
    theme: "Government",
    grammar: "Modals of obligation: Citizens must vote / Leaders should listen",
    keywords: "government, leader, laws, vote, parliament, president, rights, citizen",
    video_hint: "Government how it works for kids",
    read_topic: "How Government Works - rules, leaders and laws"
  },
  98: {
    theme: "Democracy",
    grammar: "Opinion and argument: In a democracy, people can choose / I believe",
    keywords: "democracy, vote, election, fair, freedom, rights, majority, voice",
    video_hint: "Democracy voting for kids",
    read_topic: "Democracy in Action - voting and fairness"
  },
  99: {
    theme: "Good Citizen",
    grammar: "Should/Must for civic duties: We should respect / A good citizen must",
    keywords: "citizen, responsibility, respect, community, help, laws, rights, duties",
    video_hint: "Good citizen responsibilities for kids",
    read_topic: "Being a Good Citizen - rights and responsibilities"
  },
  100: {
    theme: "Rights and Responsibilities",
    grammar: "Contrast connectors: We have the right to... but we also must...",
    keywords: "rights, responsibilities, balance, freedom, speech, safety, fair, rule",
    video_hint: "Rights responsibilities for kids",
    read_topic: "My Rights and Duties - balancing freedom and responsibility"
  },
  101: {
    theme: "Needs vs Wants",
    grammar: "Distinction language: A need is something you must have / A want is",
    keywords: "needs, wants, budget, money, spending, save, essential, luxury, economy",
    video_hint: "Needs and wants for kids economics",
    read_topic: "Smart Shopper - understanding needs versus wants"
  },
  102: {
    theme: "Goods and Services",
    grammar: "Noun classification: Goods are physical items / Services are actions",
    keywords: "goods, services, buy, sell, market, store, physical, action, product",
    video_hint: "Goods and services economics for kids",
    read_topic: "Economy Basics - goods services and markets"
  },
  103: {
    theme: "Producers and Consumers",
    grammar: "Active vs Passive roles: Farmers produce food / We consume goods",
    keywords: "producer, consumer, farmer, factory, market, supply, product, consume",
    video_hint: "Producers consumers economy for kids",
    read_topic: "Who Makes What - producers and consumers in the economy"
  },
  104: {
    theme: "Supply and Demand",
    grammar: "Conditional economics: If many people want it, the price goes up",
    keywords: "supply, demand, price, popular, rare, market, expensive, cheap, trend",
    video_hint: "Supply demand for kids economics",
    read_topic: "Market Forces - supply demand and prices"
  },
  105: {
    theme: "Research Topic and Big Questions",
    grammar: "Question formation for research: What causes, How does, Why do",
    keywords: "research, big question, brainstorm, topic, question, inquiry, explore",
    video_hint: "Research questions how to ask for kids",
    read_topic: "Big Questions - choosing a research topic to investigate"
  },
  106: {
    theme: "Information Hunting",
    grammar: "Source evaluation: This source says / I found that / According to",
    keywords: "source, reliable, information, internet, book, article, fact, check",
    video_hint: "Finding reliable information for kids",
    read_topic: "Information Detective - finding reliable answers"
  },
  107: {
    theme: "The Note-Taker",
    grammar: "Paraphrasing: use my own words instead of copying directly",
    keywords: "notes, summarise, keywords, paraphrase, own words, write, record",
    video_hint: "Note taking paraphrasing for kids",
    read_topic: "Taking Notes - recording information in your own words"
  },
  108: {
    theme: "The Architect Outline",
    grammar: "Essay outline: Introduction states, Body explains, Conclusion summarises",
    keywords: "outline, structure, introduction, body, conclusion, organise, plan, essay",
    video_hint: "Essay outline structure for kids",
    read_topic: "Building an Outline - organising notes into structure"
  },
  109: {
    theme: "Drafting Body Paragraph 1",
    grammar: "Topic sentence + supporting details: My first main idea is / This shows that",
    keywords: "topic sentence, main idea, detail, evidence, support, paragraph, draft",
    video_hint: "Body paragraph writing for kids",
    read_topic: "Body Paragraph 1 - writing the first main idea"
  },
  110: {
    theme: "Drafting Body Paragraph 2",
    grammar: "Linking between paragraphs: Another important point is / Furthermore",
    keywords: "second paragraph, furthermore, another, linking, idea, evidence, transition",
    video_hint: "Linking paragraphs writing for kids",
    read_topic: "Body Paragraph 2 - writing the second main idea"
  },
  111: {
    theme: "Introduction and Conclusion",
    grammar: "Hook sentences + concluding language: In conclusion, To sum up",
    keywords: "hook, introduction, conclusion, reader, wrap up, summary, in conclusion",
    video_hint: "Introduction conclusion essay writing for kids",
    read_topic: "The Frame - writing strong introductions and conclusions"
  },
  112: {
    theme: "The Editor's Eye",
    grammar: "Verb Tense Consistency: checking if text stays in Past or Present throughout",
    keywords: "edit, proofread, revise, tense, consistency, correct, improve, check",
    video_hint: "Editing proofreading writing for kids",
    read_topic: "Polishing the Draft - editing and proofreading skills"
  },
  113: {
    theme: "Visual Aids and Captions",
    grammar: "Prepositional Phrases: In this picture, Next to the volcano, At the top",
    keywords: "image, picture, caption, diagram, visual, label, describe, next to, show",
    video_hint: "Visual aids captions for presentations kids",
    read_topic: "Show and Tell with Images - adding visuals to writing"
  },
  114: {
    theme: "Project Assembly",
    grammar: "Presentation language: My poster shows / I used this image to illustrate",
    keywords: "poster, assemble, layout, design, title, heading, image, project, display",
    video_hint: "Making a poster project for kids",
    read_topic: "Assembling the Project - putting the poster together"
  },
  115: {
    theme: "Speaking Notes",
    grammar: "Imperatives as self-prompts: Remember, Say, Show, Ask",
    keywords: "cue cards, speaking notes, prompts, keywords, remind, practice, speech",
    video_hint: "Cue cards public speaking for kids",
    read_topic: "Cue Cards - using speaking notes for presentations"
  },
  116: {
    theme: "Rehearsal Voice and Body",
    grammar: "Speaking fluency: clear voice, eye contact, confident body language",
    keywords: "rehearse, practice, voice, eye contact, confident, stand, speak, clear",
    video_hint: "Public speaking confidence for kids",
    read_topic: "Rehearsal Day - voice, body, and confidence practice"
  },
  117: {
    theme: "The Knowledge Fair Group A",
    grammar: "Presentation delivery: This is my topic / As you can see / In conclusion",
    keywords: "knowledge fair, present, audience, question, poster, topic, showcase",
    video_hint: "Presenting project science fair for kids",
    read_topic: "Knowledge Fair Group A - presenting research to audience"
  },
  118: {
    theme: "The Knowledge Fair Group B",
    grammar: "Presentation delivery: answering questions, responding to feedback",
    keywords: "knowledge fair, present, answer, question, feedback, audience, review",
    video_hint: "Q and A presentation skills for kids",
    read_topic: "Knowledge Fair Group B - presenting and answering questions"
  },
  119: {
    theme: "Reflection and Portfolio",
    grammar: "Past Tense Reflection: I learned, I improved, I was proud of",
    keywords: "reflect, portfolio, progress, learn, improve, proud, achievement, review",
    video_hint: "Reflection portfolio learning for kids",
    read_topic: "Looking Back - reflection and portfolio review"
  },
  120: {
    theme: "Phase 2 Graduation",
    grammar: "Present Perfect achievement: I have learned / I can now",
    keywords: "graduation, phase 2, celebrate, present, speech, achievement, complete",
    video_hint: "Graduation celebration achievement speech",
    read_topic: "Phase 2 Graduation - celebrating academic achievement"
  },
  // ── PHASE 3: ADVANCED ARGUMENTATION (Weeks 121-156) ──────────────────────
  121: {
    theme: "Intro to Argumentative Research",
    grammar: "Modals of Possibility: It could cause stress / It might help students",
    keywords: "argument, research, claim, evidence, stress, help, modal, could, might",
    video_hint: "Argumentative writing introduction for students",
    read_topic: "Argumentative Research - making claims with evidence"
  },
  122: {
    theme: "Critical Listening",
    grammar: "Reporting Verbs: The speaker claimed that / She argued that",
    keywords: "listen, claim, argue, report, speaker, debate, stated, according to",
    video_hint: "Critical listening debate skills for students",
    read_topic: "Critical Listening - analysing arguments you hear"
  },
  123: {
    theme: "The Thesis Statement",
    grammar: "Concession: Although homework is useful, it causes stress (Although clause)",
    keywords: "thesis, although, concession, argument, claim, statement, despite, while",
    video_hint: "Thesis statement writing for students",
    read_topic: "The Thesis - writing a strong argumentative claim"
  },
  124: {
    theme: "Drafting Arguments",
    grammar: "Linking Words Sequence: Firstly, Secondly, Furthermore (body paragraphs)",
    keywords: "firstly, secondly, furthermore, argument, body, draft, evidence, paragraph",
    video_hint: "Argumentative essay body paragraphs",
    read_topic: "Building Arguments - drafting body paragraphs"
  },
  125: {
    theme: "Introduction and Conclusion Argumentative",
    grammar: "Persuasive Verbs: Urge, Recommend, Should (call to action)",
    keywords: "hook, introduction, conclusion, urge, recommend, call to action, should",
    video_hint: "Persuasive introduction conclusion writing",
    read_topic: "Opening and Closing - strong intro and conclusion for arguments"
  },
  126: {
    theme: "From Essay to Speech",
    grammar: "Signposting: Moving on to, Let's look at, As I mentioned",
    keywords: "signpost, speech, essay, convert, moving on, transition, oral, deliver",
    video_hint: "Signposting speech transitions for students",
    read_topic: "From Page to Stage - turning essay into spoken argument"
  },
  127: {
    theme: "Rebuttal Practice",
    grammar: "Contrast Connectors: On the contrary, However (disagreeing politely)",
    keywords: "rebuttal, counter, on the contrary, however, disagree, response, debate",
    video_hint: "Debate rebuttal skills for students",
    read_topic: "The Counter-Strike - practising rebuttals in debate"
  },
  128: {
    theme: "The Live Debate 1",
    grammar: "Debate language: I agree/disagree because / With respect / My point is",
    keywords: "debate, live, argue, agree, disagree, point, respect, teams, homework",
    video_hint: "Student debate competition skills",
    read_topic: "Live Debate - arguing about homework with evidence"
  },
  129: {
    theme: "Debate 2 Preparation",
    grammar: "Future Continuous: My partner will be discussing / We will be showing",
    keywords: "video games, screen time, debate, prepare, strategy, team, topic, argument",
    video_hint: "Video games debate for students",
    read_topic: "Debate Prep - preparing arguments about video games"
  },
  130: {
    theme: "Research on Video Games",
    grammar: "Citation Phrases: According to researchers / Studies show that",
    keywords: "research, video games, studies, statistics, evidence, health, benefits, risks",
    video_hint: "Video games effects research for students",
    read_topic: "Video Games Research - finding evidence for your argument"
  },
  131: {
    theme: "Video Games Essay Structure",
    grammar: "Contrast Transitions: However, Nevertheless, Yet, On the other hand",
    keywords: "structure, essay, video games, contrast, nevertheless, however, yet, balance",
    video_hint: "Balanced argument essay writing",
    read_topic: "Video Games Essay - writing a balanced argument"
  },
  132: {
    theme: "Live Debate 2",
    grammar: "Debate delivery: fluency, tone, persuasion, responding to challenges",
    keywords: "live debate, video games, argue, refute, agree, challenge, respond, score",
    video_hint: "Debate tournament skills students",
    read_topic: "Live Debate 2 - arguing about video games"
  },
  133: {
    theme: "Deep Research and Data",
    grammar: "Citation Phrases: According to a study by / Statistics show that",
    keywords: "statistics, data, study, research, cited, evidence, findings, quantitative",
    video_hint: "Using statistics in argument writing",
    read_topic: "Data Driven Debate - finding and using statistical evidence"
  },
  134: {
    theme: "Identifying Fallacies",
    grammar: "Qualifiers: Some, Many, Often, Tend to (avoiding over-generalisation)",
    keywords: "fallacy, generalise, some, many, often, overgeneralize, logical error, claim",
    video_hint: "Logical fallacies for students",
    read_topic: "Fallacy Detector - recognising and avoiding logical errors"
  },
  135: {
    theme: "Counter-Argument Paragraph",
    grammar: "Contrast Transitions Advanced: However, Nevertheless, Yet, On the other hand",
    keywords: "counter-argument, concede, however, nevertheless, refute, balance, admit",
    video_hint: "Counter argument paragraph writing",
    read_topic: "Balanced Argumentation - writing the counter-argument paragraph"
  },
  136: {
    theme: "Drafting the Full Essay",
    grammar: "Cohesion: reviewing all linking words used throughout the text",
    keywords: "full essay, cohesion, linking words, stamina, draft, complete, final",
    video_hint: "Writing complete argumentative essay",
    read_topic: "The Full Draft - writing the complete argumentative essay"
  },
  137: {
    theme: "Editing Word Choice",
    grammar: "Synonyms and Antonyms: using varied vocabulary to improve style",
    keywords: "synonym, antonym, word choice, style, vocabulary, replace, precise, edit",
    video_hint: "Synonyms antonyms word choice for students",
    read_topic: "Word Craft - improving vocabulary and writing style"
  },
  138: {
    theme: "Advanced Rebuttal",
    grammar: "Polite Disagreement: I see your point but / With all due respect",
    keywords: "polite, disagree, rebuttal, attack evidence, challenge, respectful, debate",
    video_hint: "Advanced debate skills polite disagreement",
    read_topic: "Attacking Evidence - advanced rebuttal techniques"
  },
  139: {
    theme: "Team Strategy",
    grammar: "Future Continuous: My partner will be discussing / We will be showing",
    keywords: "team, strategy, plan, partner, role, speaker, timed, coordinate, debate",
    video_hint: "Team debate strategy coordination for students",
    read_topic: "Team Strategy - planning roles for the live debate"
  },
  140: {
    theme: "Live Debate 2 Video Games",
    grammar: "Debate fluency: spontaneous response, listening and rebutting",
    keywords: "video games, live debate, spontaneous, fluency, respond, team, win",
    video_hint: "Live debate video games competition",
    read_topic: "The Big Debate - video games for and against"
  },
  141: {
    theme: "Geometry Review Angles and Lines",
    grammar: "Geometry description: An acute angle is less than 90 degrees",
    keywords: "angle, line, acute, obtuse, right angle, parallel, perpendicular, degrees",
    video_hint: "Angles lines geometry for students",
    read_topic: "Angles and Lines Review - geometry vocabulary in English"
  },
  142: {
    theme: "Geometry Review Area and Volume",
    grammar: "Formula language: Area equals length times width",
    keywords: "area, volume, perimeter, formula, length, width, height, calculate, units",
    video_hint: "Area volume geometry formulas for kids",
    read_topic: "Area and Volume Review - calculating space in English"
  },
  143: {
    theme: "Critical Thinking Analysing Ads",
    grammar: "Persuasive language identification: This ad claims that / The purpose is to",
    keywords: "advertisement, ad, persuade, claim, target, trick, analyse, media, critical",
    video_hint: "Analysing advertisements critical thinking for students",
    read_topic: "Ad Detectives - analysing persuasive techniques in ads"
  },
  144: {
    theme: "Capstone Preparation",
    grammar: "Capstone planning language: I will argue that / My essay will discuss",
    keywords: "capstone, final project, topic, plan, thesis, essay, argument, choose",
    video_hint: "Capstone project planning for students",
    read_topic: "Capstone Planning - preparing for the final project"
  },
  145: {
    theme: "Independent Research",
    grammar: "Source Attribution: According to [Author] in [Article Name]",
    keywords: "independent, research, source, attribute, author, article, cite, bibliography",
    video_hint: "Independent research citing sources for students",
    read_topic: "Research Sprint - independent investigation of a topic"
  },
  146: {
    theme: "Synthesizing Information",
    grammar: "Connectors of Comparison: Similarly, Likewise, In the same way",
    keywords: "synthesize, combine, sources, similarly, likewise, comparison, information",
    video_hint: "Synthesizing information writing for students",
    read_topic: "Synthesis Writing - combining information from multiple sources"
  },
  147: {
    theme: "Advanced Thesis Writing",
    grammar: "Subordinating Conjunctions: While, Whereas, Although (nuanced claims)",
    keywords: "thesis, advanced, nuance, while, whereas, although, subordinate, claim",
    video_hint: "Advanced thesis subordinating conjunctions writing",
    read_topic: "Nuanced Claims - writing advanced thesis statements"
  },
  148: {
    theme: "Drafting Final Essay Independent",
    grammar: "Sentence variety: Simple, Compound, Complex structures in one text",
    keywords: "final, essay, draft, sentence variety, simple, compound, complex, independent",
    video_hint: "Writing varied sentence structures for students",
    read_topic: "Final Draft - writing the capstone essay independently"
  },
  149: {
    theme: "Final Polish and Peer Review",
    grammar: "Punctuation and Capitalisation check: commas, colons, apostrophes",
    keywords: "polish, peer review, punctuation, capitalisation, comma, colon, apostrophe",
    video_hint: "Peer review editing writing skills for students",
    read_topic: "Final Polish - peer review and proofreading the essay"
  },
  150: {
    theme: "Mock Debate and Strategy",
    grammar: "Debate preparation: rehearse, practice, respond to challenges",
    keywords: "mock, debate, practice, strategy, respond, challenge, prepare, timer",
    video_hint: "Mock debate practice strategy for students",
    read_topic: "Mock Debate Day - practising the final debate"
  },
  151: {
    theme: "The Capstone Debate",
    grammar: "Full debate performance: argument, rebuttal, conclusion, Q&A",
    keywords: "capstone, final debate, performance, argument, rebuttal, conclude, Q&A",
    video_hint: "Final debate performance public speaking students",
    read_topic: "The Capstone Debate - final performative debate event"
  },
  152: {
    theme: "Genre Review Narrative",
    grammar: "Narrative Tenses: Past Simple, Past Continuous, Past Perfect in stories",
    keywords: "narrative, story, tenses, past simple, past continuous, past perfect, genre",
    video_hint: "Narrative writing tenses story structure",
    read_topic: "Narrative Genre - mastering story writing tenses"
  },
  153: {
    theme: "Genre Review Expository",
    grammar: "Cause Effect Connectors Advanced: Consequently, Due to the fact that",
    keywords: "expository, explain, consequently, due to, fact, because, therefore, genre",
    video_hint: "Expository writing cause effect for students",
    read_topic: "Expository Genre - explaining with advanced connectors"
  },
  154: {
    theme: "Impromptu Speaking Skills",
    grammar: "Fillers and Connectors: That's an interesting question / To be honest",
    keywords: "impromptu, speaking, filler, connector, pause, respond, spontaneous, fluency",
    video_hint: "Impromptu speaking skills debate for students",
    read_topic: "On the Spot - responding to unexpected questions"
  },
  155: {
    theme: "Portfolio Preparation",
    grammar: "Past vs Present Perfect: I used to make mistakes, but now I have learned",
    keywords: "portfolio, present perfect, progress, used to, now, improvement, learning",
    video_hint: "Portfolio reflection growth mindset for students",
    read_topic: "Portfolio Day - curating your best work and reflecting on growth"
  },
  156: {
    theme: "Graduation Ceremony and Final Showcase",
    grammar: "Present Perfect achievement: I have completed / I can now",
    keywords: "graduation, final, showcase, celebrate, speech, achievement, three years, complete",
    video_hint: "Graduation ceremony celebration speech",
    read_topic: "Final Showcase - three-year graduation ceremony"
  }
};

// PRIORITY YOUTUBE CHANNELS (from Blueprint whitelist)
const PRIORITY_CHANNELS = [
  "English Singsing",
  "Little Fox", 
  "Super Simple Songs",
  "SciShow Kids",
  "Numberblocks",
  "British Council",
  "Peppa Pig",
  "National Geographic Kids"
];

// AGE-APPROPRIATE CHANNEL FILTERING (6-12 Primary School)
const PRIMARY_SCHOOL_CHANNELS = [
  "English Singsing",        // Grammar lessons, clear explanations
  "Little Fox",              // Stories with subtitles, level-based
  "British Council",         // Professional ESL content
  "National Geographic Kids", // Educational, documentary style
  "SciShow Kids",            // Science explanations
  "Numberblocks",            // Math concepts
  "Peppa Pig"                // OK for lower primary (6-8)
];

// PRESCHOOL CHANNELS (exclude for 6-12 content)
const PRESCHOOL_CHANNELS = [
  "Super Simple Songs",      // Nursery rhymes, puppet shows
  "Cocomelon",              // Baby songs
  "Dave and Ava",           // Toddler content
  "Blippi"                  // Preschool entertainment
];

/**
 * Check if a week is a review week (every 14 weeks: 14, 28, 42, 54)
 */
const isReviewWeek = (weekId) => {
  return weekId % 14 === 0;
};

/**
 * Aggregate grammar and keywords from previous 12 weeks for review weeks
 */
const aggregateReviewContent = (weekId) => {
  const startWeek = weekId - 13; // Previous 12 weeks (e.g., weeks 1-12 for week 14)
  const endWeek = weekId - 2;     // Exclude week 13 (also review week)
  
  const grammarTopics = [];
  const allKeywords = [];
  const themes = [];
  
  for (let w = startWeek; w <= endWeek; w++) {
    const weekData = BLUEPRINT_WEEKS[w];
    if (weekData) {
      grammarTopics.push(weekData.grammar);
      allKeywords.push(weekData.keywords);
      themes.push(weekData.theme);
    }
  }
  
  return {
    grammarSummary: grammarTopics.join(', '),
    keywordsSummary: allKeywords.join(', '),
    themesSummary: themes.slice(0, 5).join(', '), // Top 5 themes
    coreGrammar: [
      'subject pronouns', 'possessive adjectives', 'verb to be',
      'like + gerund', 'articles', 'prepositions', 'there is/are',
      'can/can\'t', 'present simple'
    ].join(' ')
  };
};

/**
 * Generate queries for REVIEW WEEKS (14, 28, 42, 54)
 * 
 * STRATEGY:
 * - Review weeks occur every 14 weeks (after completing 12 regular weeks + 1 transition week)
 * - Aggregate key grammar/topics from previous 12 weeks
 * - Combine with current week's specific presentation theme
 * - Prioritize AGE-APPROPRIATE content (6-12 primary school, not preschool)
 * - REUSE best videos from corresponding weeks in current cycle
 * 
 * WEEK 14 VIDEO STRUCTURE:
 * [1] GRAMMAR: Subject Pronouns (review Week 1-2)
 * [2] GRAMMAR: Can/Can't Abilities (review Week 12)
 * [3] STORY: Family Song (reuse from Week 2)
 * [4] VOCABULARY: Classroom Conversation (reuse from Week 1)
 * [5] SCIENCE: Talents/Abilities educational content
 * 
 * AGE-APPROPRIATE FILTERING:
 * ✅ British Council, English Singsing, Little Fox (grammar lessons, stories)
 * ✅ National Geographic Kids, SciShow Kids (educational)
 * ⚠️ Super Simple Songs (OK for songs, but avoid puppet shows)
 * ❌ Cocomelon, Dave and Ava, Blippi (preschool content)
 */
const generateReviewWeekQueries = (weekId, weekData) => {
  const reviewContent = aggregateReviewContent(weekId);
  
  console.log(`   📚 Reviewing: Weeks ${weekId - 13} to ${weekId - 2}`);
  
  // For Week 28, 42, 54: suggest reusing videos from Week 14, 28, 42
  const previousReviewWeek = weekId - 14;
  if (previousReviewWeek > 0) {
    console.log(`   💡 TIP: Consider reusing videos from Week ${previousReviewWeek} (previous review week)`);
  }
  
  const queries = {
    weekId: weekId,
    theme: weekData.theme,
    grammar_focus: `REVIEW: ${reviewContent.coreGrammar}`,
    review_of_weeks: `${weekId - 13}-${weekId - 2}`,
    reuse_suggestion: previousReviewWeek > 0 ? previousReviewWeek : null,
    videos: []
  };
  
  // VIDEO 1: GRAMMAR REVIEW - Subject Pronouns & Possessive (Weeks 1-2)
  // Age-appropriate: Use British Council or English Singsing (avoid nursery rhymes)
  queries.videos.push({
    id: 1,
    purpose: "GRAMMAR",
    priority_search: `British Council subject pronouns personal pronouns ESL primary school`,
    backup_search: `English Singsing pronouns I you he she we they grammar lesson for kids`,
    age_group: "6-12 primary",
    reuse_from_week: previousReviewWeek > 0 ? previousReviewWeek : null
  });
  
  // VIDEO 2: GRAMMAR REVIEW - Can/Can't Abilities (Week 12) + Week 14 theme
  // Week 14 specific: "I can present my poster" combines abilities with presentation
  queries.videos.push({
    id: 2,
    purpose: "GRAMMAR",
    priority_search: `English Singsing can can't abilities I can sing dance draw ESL for kids`,
    backup_search: `can can't abilities talents kids song ESL cartoons`,
    age_group: "6-12 primary",
    reuse_from_week: previousReviewWeek > 0 ? previousReviewWeek : null
  });
  
  // VIDEO 3: STORY/VOCABULARY - Family theme (reuse from Week 2)
  // For review weeks: suggest reusing "The People In My Family" from Week 2
  queries.videos.push({
    id: 3,
    purpose: "STORY",
    priority_search: `Little Fox my family story level 1 ESL for kids`,
    backup_search: `family members children story Peppa Pig cartoons for kids`,
    age_group: "6-12 primary",
    reuse_from_week: 2, // Always suggest reusing from Week 2 (Family Squad)
    reuse_video_title: "The People In My Family | Super Simple Songs",
    reuse_video_id: "yDua9ms9_eg"
  });
  
  // VIDEO 4: VOCABULARY - Introduce yourself / Self-introduction
  // Age-appropriate: Classroom conversation or story (not puppet shows)
  // Week 14 curated: Reuse "My School Day - Classroom Conversation" from Week 1
  queries.videos.push({
    id: 4,
    purpose: "VOCABULARY", 
    priority_search: `Little Fox introduce yourself self introduction story ESL for kids`,
    backup_search: `British Council self introduction greetings primary school ESL`,
    age_group: "6-12 primary",
    reuse_from_week: 1, // Week 1 has good classroom conversation video
    reuse_video_title: "My School Day - Classroom Language and Conversation",
    reuse_video_id: "FZPmnw4Ws5A"
  });
  
  // VIDEO 5: SCIENCE/SOCIAL - Talents, abilities, what I can do
  // Link to Week 12 (abilities) + Week 14 theme (talents, proud)
  queries.videos.push({
    id: 5,
    purpose: "SCIENCE",
    priority_search: `talents abilities what can you do kids educational video`,
    backup_search: `SciShow Kids skills talents what makes you special for kids`,
    reuse_from_week: previousReviewWeek > 0 ? previousReviewWeek : null
  });
  
  // Add metadata
  queries.topic = weekData.read_topic || weekData.theme;
  queries.science = weekData.keywords;
  
  return queries;
};


/**
 * Generate 5 video queries for a week based on Blueprint data
 */
const generateQueriesForWeek = (weekId) => {
  const weekData = BLUEPRINT_WEEKS[weekId];
  if (!weekData) {
    console.log(`⚠️  Week ${weekId} not in Blueprint data - using generic queries`);
    return generateGenericQueries(weekId);
  }
  
  console.log(`\n📋 Generating queries for Week ${weekId}: ${weekData.theme}`);
  
  // Check if this is a review week
  if (isReviewWeek(weekId)) {
    console.log(`   🔄 REVIEW WEEK - Aggregating from previous 12 weeks`);
    return generateReviewWeekQueries(weekId, weekData);
  }
  
  const queries = {
    weekId: weekId,
    theme: weekData.theme,
    grammar_focus: weekData.grammar,
    videos: []
  };
  
  // VIDEO 1: GRAMMAR - Always English Singsing
  const grammarTopics = extractGrammarKeywords(weekData.grammar);
  queries.videos.push({
    id: 1,
    purpose: "GRAMMAR",
    priority_search: `English Singsing ${grammarTopics} ESL for kids`,
    backup_search: `${grammarTopics} song ESL kids cartoons`
  });
  
  // VIDEO 2: GRAMMAR (backup) - Also English Singsing
  const grammarAlt = extractSecondaryGrammar(weekData.grammar);
  queries.videos.push({
    id: 2,
    purpose: "GRAMMAR",
    priority_search: `English Singsing ${grammarAlt} ESL for kids`,
    backup_search: `${grammarAlt} kids song ESL cartoons`
  });
  
  // VIDEO 3: STORY - Little Fox or Vooks
  const themeKeywords = extractThemeKeywords(weekData.theme, weekData.read_topic);
  queries.videos.push({
    id: 3,
    purpose: "STORY",
    priority_search: `Little Fox ${themeKeywords} story level 1 ESL for kids`,
    backup_search: `Vooks ${themeKeywords} story read aloud cartoons for kids`
  });
  
  // VIDEO 4: VOCABULARY - Based on video_hint from Blueprint
  const videoHint = weekData.video_hint || weekData.keywords;
  queries.videos.push({
    id: 4,
    purpose: "VOCABULARY",
    priority_search: `Little Fox ${videoHint} song ESL for kids`,
    backup_search: `${videoHint} ESL kids cartoons song`
  });
  
  // VIDEO 5: SCIENCE/MATH - Based on keywords
  const sciKeywords = weekData.keywords;
  const scienceChannel = sciKeywords.toLowerCase().includes('number') || sciKeywords.toLowerCase().includes('count') 
    ? "Numberblocks" 
    : "SciShow Kids";
  queries.videos.push({
    id: 5,
    purpose: "SCIENCE",
    priority_search: `${scienceChannel} ${sciKeywords} for kids`,
    backup_search: `${sciKeywords} kids science cartoons`
  });
  
  // Add metadata (optional)
  queries.topic = weekData.read_topic || weekData.theme;
  queries.science = weekData.keywords;
  
  return queries;
};

/**
 * Extract main grammar keywords from grammar string
 */
const extractGrammarKeywords = (grammarStr) => {
  const patterns = {
    'Subject Pronouns': 'subject pronouns I you he she',
    'Possessive Adjectives': 'possessive adjectives my your his her',
    'Is vs Has': 'is has verb to be have',
    'Like + V-ing': 'like love gerund ing',
    'Articles': 'articles a an the',
    'Prepositions': 'prepositions of place in on under',
    'There is': 'there is there are',
    'There are': 'plural there are',
    'Present Continuous': 'present continuous am is are doing',
    'Cause and Effect': 'because so cause effect adjectives',
  };
  
  for (const [key, value] of Object.entries(patterns)) {
    if (grammarStr.includes(key)) return value;
  }
  
  // Fallback: return first part before parenthesis
  return grammarStr.split('(')[0].trim().toLowerCase();
};

/**
 * Extract secondary grammar keywords (alternative search)
 */
const extractSecondaryGrammar = (grammarStr) => {
  // Extract content in parentheses as examples
  const match = grammarStr.match(/\(([^)]+)\)/);
  if (match) {
    return match[1].replace(/,/g, ' ');
  }
  
  // Fallback to main keywords
  return extractGrammarKeywords(grammarStr);
};

/**
 * Extract theme keywords for vocabulary videos
 */
const extractThemeKeywords = (theme, readTopic) => {
  const themeWords = theme.toLowerCase()
    .replace(/[!?.,]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3 && !['hello', 'game', 'squad'].includes(w));
  
  const topicWords = readTopic ? readTopic.toLowerCase().split('-')[0].trim() : '';
  
  return [...themeWords, topicWords].filter(Boolean).join(' ');
};

/**
 * Generate generic queries when Blueprint data is missing
 */
const generateGenericQueries = (weekId) => {
  return {
    weekId: weekId,
    theme: `Week ${weekId}`,
    grammar: "General ESL",
    videos: [
      {
        id: 1,
        purpose: "GRAMMAR",
        priority_search: "English Singsing grammar ESL for kids",
        backup_search: "grammar song ESL kids cartoons"
      },
      {
        id: 2,
        purpose: "GRAMMAR",
        priority_search: "English Singsing phonics song for kids",
        backup_search: "phonics ESL kids cartoons"
      },
      {
        id: 3,
        purpose: "STORY",
        priority_search: "Little Fox story level 1 ESL for kids",
        backup_search: "Vooks story read aloud cartoons for kids"
      },
      {
        id: 4,
        purpose: "VOCABULARY",
        priority_search: "Little Fox vocabulary song ESL for kids",
        backup_search: "vocabulary ESL kids cartoons"
      },
      {
        id: 5,
        purpose: "SCIENCE",
        priority_search: "SciShow Kids science for kids",
        backup_search: "science learning kids cartoons"
      }
    ]
  };
};

/**
 * Save video_queries.json to week folder
 */
const saveQueries = (weekId, queries) => {
  const weekStr = String(weekId).padStart(2, '0');
  const outPath = path.join(ROOT_DIR, `src/data/weeks/week_${weekStr}/video_queries.json`);
  
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(queries, null, 2));
  
  console.log(`✅ Saved: ${outPath}`);
  console.log(`   📝 ${queries.videos.length} queries generated`);
  queries.videos.forEach(v => {
    console.log(`      [${v.id}] ${v.purpose}: ${v.priority_search}`);
  });
};

/**
 * Main execution
 */
const main = () => {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`\n📺 VIDEO QUERIES GENERATOR (Blueprint-Driven)`);
    console.log(`\nUsage:`);
    console.log(`  node tools/generate_video_queries.js <week_number>`);
    console.log(`  node tools/generate_video_queries.js 2`);
    console.log(`  node tools/generate_video_queries.js 1-10  (range)`);
    console.log(`  node tools/generate_video_queries.js --all  (weeks 1-54)`);
    console.log(`\nThis will create video_queries.json based on Blueprint data.`);
    return;
  }
  
  let weekIds = [];
  
  if (args[0] === '--all') {
    weekIds = Array.from({ length: 156 }, (_, i) => i + 1);
  } else if (args[0].includes('-')) {
    const [start, end] = args[0].split('-').map(Number);
    weekIds = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  } else {
    weekIds = [parseInt(args[0])];
  }
  
  console.log(`\n🎬 Generating video queries for ${weekIds.length} week(s)...`);
  
  weekIds.forEach(weekId => {
    const queries = generateQueriesForWeek(weekId);
    saveQueries(weekId, queries);
  });
  
  console.log(`\n🎉 Done! Generated queries for ${weekIds.length} week(s)`);
  console.log(`\n📌 Next step: Run video fetching`);
  console.log(`   node tools/update_videos.js ${weekIds[0]}`);
};

main();
