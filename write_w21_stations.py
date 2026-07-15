"""Write all 16 Advanced station files for Week 21: Yesterday's Diary"""
import os

BASE = 'src/data/weeks/week_21'

# === VOCAB DATA ===
vocab_words = [
    ("walked",   "/wOkt/",        "da di bo",       "moved on foot from one place to another",           "I walked to school with my friend.",        "walk to school"),
    ("looked",   "/lUkt/",        "da nhin",        "directed your eyes toward something to see it",     "I looked at the stars outside last night.",  "look at the stars"),
    ("cooked",   "/kUkt/",        "da nau an",      "prepared food using heat",                          "Mom cooked dinner for the whole family.",    "cook dinner"),
    ("played",   "/pleId/",       "da choi",        "took part in a game or activity for fun",           "I played soccer at break time.",             "play soccer"),
    ("watched",  "/wOtSt/",       "da xem",         "looked at something for a period of time",          "I watched TV for thirty minutes.",           "watch TV"),
    ("cleaned",  "/kliEnd/",      "da don dep",     "made something free of dirt or mess",               "I cleaned my room after school.",            "clean the room"),
    ("helped",   "/hElpt/",       "da giup do",     "gave assistance to someone",                        "I helped my mother with the shopping.",      "help at home"),
    ("talked",   "/tOkt/",        "da noi chuyen",  "spoke with someone in a conversation",              "We talked about our homework on the way.",   "talk to friends"),
    ("listened", "/lIs@nd/",      "da lang nghe",   "paid attention to a sound",                         "I listened to the teacher carefully.",       "listen carefully"),
    ("opened",   "/@Up@nd/",      "da mo",          "moved something so it was no longer closed",        "I opened the door for my grandmother.",      "open the door"),
    ("washed",   "/wOSt/",        "da rua",         "cleaned something with water and soap",             "I washed my hands before dinner.",           "wash hands"),
    ("finished", "/fInISt/",      "da hoan thanh",  "completed something; came to the end of a task",   "I finished my homework at seven o clock.",   "finish homework"),
    ("started",  "/stAErId/",     "da bat dau",     "began doing an activity",                          "I started my project in the morning.",       "start early"),
]

# === VOCAB.JS ===
vocab_entries = []
for i, (word, pron, def_vi, def_en, example, coll) in enumerate(vocab_words, 1):
    vocab_entries.append(f"""    {{
      id: {i},
      word: "{word}",
      pronunciation: "{pron}",
      definition_vi: "{def_vi}",
      definition_en: "{def_en}",
      example: "{example}",
      collocation: "{coll}",
      image_url: "/images/week21/{word}.jpg",
      audio_word: "/audio/week21/vocab_{word}.mp3",
      audio_definition: "/audio/week21/vocab_def_{word}.mp3",
      audio_example: "/audio/week21/vocab_ex_{word}.mp3",
      audio_collocation: "/audio/week21/vocab_coll_{word}.mp3"
    }}""")

vocab_js = "export default {\n  vocab: [\n" + ",\n".join(vocab_entries) + "\n  ]\n};\n"
with open(f'{BASE}/vocab.js', 'w') as f:
    f.write(vocab_js)
print("vocab.js OK")

# === INDEX.JS ===
index_js = """import read from './read.js';
import explore from './explore.js';
import vocab from './vocab.js';
import grammar from './grammar.js';
import ask_ai from './ask_ai.js';
import logic_science from './logic_science.js';
import singapore_math from './singapore_math.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';
import writing from './writing.js';
import word_power from './word_power.js';
import mindmap from './mindmap.js';
import daily_watch from './daily_watch.js';
import word_match from './word_match.js';
import games from './games.js';

const weekData = {
  weekId: 21,
  isEasy: false,
  weekTitle_en: "Yesterday's Diary",
  weekTitle_vi: "Nhat Ky Hom Qua",
  grammar_focus: "Past Simple Regular Verbs (-ed)",
  global_vocab: vocab.vocab,

  voiceConfig: {
    narration: 'en-US-Neural2-H',
    vocabulary: 'en-US-Neural2-F',
    dictation: 'en-US-Neural2-F',
    shadowing: 'en-US-Neural2-F',
    questions: 'en-US-Neural2-B',
    mindmap: 'en-US-Neural2-B',
    logic_science: 'en-US-Neural2-B'
  },

  stations: {
    read_explore: read,
    new_words: vocab,
    word_match: word_match,
    grammar: grammar,
    word_power: word_power,
    ask_ai: ask_ai,
    logic_lab: { logic_science, singapore_math },
    dictation: dictation,
    shadowing: shadowing,
    writing: writing,
    explore: explore,
    mindmap_speaking: mindmap,
    daily_watch: daily_watch,
    game_hub: games
  }
};

export default weekData;
"""
with open(f'{BASE}/index.js', 'w') as f:
    f.write(index_js)
print("index.js OK")

# === READ.JS ===
read_js = """export default {
  title: "Max's Diary - Yesterday",
  text: "Detective Max found his diary from yesterday! Dear Diary, Yesterday was a busy day! I woke up early. I brushed my teeth. I walked to school with my friend. We talked about our homework. At school, I listened to the teacher. I played soccer at break time. After school, I helped my mother. I cleaned my room. I washed my hands before dinner. I watched TV for thirty minutes. Then I looked at the stars outside. There were many stars! I counted ten stars. I was tired. I finished my diary and started to sleep at nine o clock. What a busy day!",
  image_url: "/images/week21/read_cover_w21.jpg",
  audio_url: "/audio/week21/read_text.mp3",
  comprehension_questions: [
    {
      question: "Did Max walk or take the bus to school?",
      options: ["He walked", "He took the bus", "He ran"],
      answer: "He walked",
      audio_url: "/audio/week21/read_q1.mp3"
    },
    {
      question: "What did Max do at break time?",
      options: ["He played soccer", "He cleaned his room", "He watched TV"],
      answer: "He played soccer",
      audio_url: "/audio/week21/read_q2.mp3"
    },
    {
      question: "How many stars did Max count?",
      options: ["Ten stars", "Five stars", "Twenty stars"],
      answer: "Ten stars",
      audio_url: "/audio/week21/read_q3.mp3"
    },
    {
      question: "What time did Max start to sleep?",
      options: ["At nine o clock", "At eight o clock", "At ten o clock"],
      answer: "At nine o clock",
      audio_url: "/audio/week21/read_q4.mp3"
    }
  ]
};
"""
with open(f'{BASE}/read.js', 'w') as f:
    f.write(read_js)
print("read.js OK")

# === GRAMMAR.JS ===
grammar_js = """export default {
  title: "Past Simple Regular Verbs (-ed)",
  grammar_focus: "Past Simple Regular Verbs (-ed)",
  explanation: "To talk about finished actions in the past, add -ed to the base verb. walk + ed = walked. play + ed = played. watch + ed = watched.",
  explanation_vi: "De noi ve hanh dong da ket thuc trong qua khu, them -ed vao dong tu nguyen the.",
  patterns: [
    { pattern: "I / You / He / She / We / They + verb-ed", example: "I walked to school. She cooked dinner.", note: "Same form for all subjects." }
  ],
  spelling_rules: [
    { rule: "Most verbs: add -ed", examples: ["walk -> walked", "play -> played", "watch -> watched", "look -> looked"] },
    { rule: "Verbs ending in -e: add -d only", examples: ["love -> loved", "close -> closed"] },
    { rule: "Verbs ending in consonant + y: change y to i, add -ed", examples: ["study -> studied", "cry -> cried"] },
    { rule: "Short verbs (CVC): double final consonant + -ed", examples: ["stop -> stopped", "plan -> planned"] }
  ],
  pronunciation_rules: [
    { sound: "/t/", when: "After voiceless sounds (k, p, s, sh, ch)", examples: ["walked /wOkt/", "helped /hElpt/", "watched /wOtSt/"] },
    { sound: "/d/", when: "After voiced sounds (b, g, v, l, n, m, r)", examples: ["played /pleId/", "cleaned /kliEnd/", "listened /lIs@nd/"] },
    { sound: "/Id/", when: "After t or d sounds", examples: ["started /stAErtId/", "finished /fInISt/", "opened /@Up@nd/"] }
  ],
  exercises: [
    {
      type: "fill_blank",
      instruction: "Write the past form of the verb.",
      items: [
        { stem: "Yesterday I ___ (walk) to school.", answer: "walked", audio_url: "/audio/week21/grammar_ex1.mp3" },
        { stem: "She ___ (cook) dinner last night.", answer: "cooked", audio_url: "/audio/week21/grammar_ex2.mp3" },
        { stem: "We ___ (play) soccer after school.", answer: "played", audio_url: "/audio/week21/grammar_ex3.mp3" },
        { stem: "He ___ (clean) his room in the evening.", answer: "cleaned", audio_url: "/audio/week21/grammar_ex4.mp3" },
        { stem: "I ___ (watch) TV for thirty minutes.", answer: "watched", audio_url: "/audio/week21/grammar_ex5.mp3" }
      ]
    },
    {
      type: "multiple_choice",
      instruction: "Choose the correct past form.",
      items: [
        { question: "I ___ to school yesterday.", options: ["walk", "walked", "walking"], answer: "walked" },
        { question: "Mom ___ dinner last night.", options: ["cook", "cooked", "cooking"], answer: "cooked" },
        { question: "They ___ soccer at break time.", options: ["play", "played", "playing"], answer: "played" }
      ]
    }
  ]
};
"""
with open(f'{BASE}/grammar.js', 'w') as f:
    f.write(grammar_js)
print("grammar.js OK")

# === WORD_POWER.JS ===
word_power_js = """export default {
  words: [
    {
      id: 1,
      word: "walk to school",
      pronunciation: "/wOk tu skuEl/",
      cefr_level: "A1",
      definition_en: "to go to school on foot instead of taking a vehicle",
      definition_vi: "di bo den truong",
      example: "I walk to school every day with my best friend.",
      model_sentence: "Yesterday I walked to school and we talked the whole way.",
      collocation: "walk to school together",
      image_url: "/images/week21/wordpower_walk_school.jpg",
      audio_word: "/audio/week21/wordpower_walk_school.mp3",
      audio_definition: "/audio/week21/wordpower_def_walk_school.mp3",
      audio_example: "/audio/week21/wordpower_ex_walk_school.mp3",
      audio_collocation: "/audio/week21/wordpower_coll_walk_school.mp3",
      audio_model: "/audio/week21/wordpower_model_walk_school.mp3"
    },
    {
      id: 2,
      word: "play outside",
      pronunciation: "/pleI aUtsaId/",
      cefr_level: "A1",
      definition_en: "to have fun and do activities in the open air",
      definition_vi: "choi ben ngoai",
      example: "Children love to play outside after school every day.",
      model_sentence: "Yesterday I played outside with my friends for one hour.",
      collocation: "play outside together",
      image_url: "/images/week21/wordpower_play_outside.jpg",
      audio_word: "/audio/week21/wordpower_play_outside.mp3",
      audio_definition: "/audio/week21/wordpower_def_play_outside.mp3",
      audio_example: "/audio/week21/wordpower_ex_play_outside.mp3",
      audio_collocation: "/audio/week21/wordpower_coll_play_outside.mp3",
      audio_model: "/audio/week21/wordpower_model_play_outside.mp3"
    },
    {
      id: 3,
      word: "clean the room",
      pronunciation: "/kliEn D@ ruEm/",
      cefr_level: "A1",
      definition_en: "to tidy and remove dirt or mess from a bedroom or living area",
      definition_vi: "don dep phong",
      example: "I need to clean the room before my friend comes to visit.",
      model_sentence: "Yesterday I cleaned the room and organized all my toys on the shelf.",
      collocation: "clean the room quickly",
      image_url: "/images/week21/wordpower_clean_room.jpg",
      audio_word: "/audio/week21/wordpower_clean_room.mp3",
      audio_definition: "/audio/week21/wordpower_def_clean_room.mp3",
      audio_example: "/audio/week21/wordpower_ex_clean_room.mp3",
      audio_collocation: "/audio/week21/wordpower_coll_clean_room.mp3",
      audio_model: "/audio/week21/wordpower_model_clean_room.mp3"
    },
    {
      id: 4,
      word: "cook dinner",
      pronunciation: "/kUk dIn@r/",
      cefr_level: "A1",
      definition_en: "to prepare and make the evening meal using heat",
      definition_vi: "nau bua toi",
      example: "My mom always cooks dinner for us every evening.",
      model_sentence: "Yesterday my mom cooked dinner early so we could eat together.",
      collocation: "cook dinner together",
      image_url: "/images/week21/wordpower_cook_dinner.jpg",
      audio_word: "/audio/week21/wordpower_cook_dinner.mp3",
      audio_definition: "/audio/week21/wordpower_def_cook_dinner.mp3",
      audio_example: "/audio/week21/wordpower_ex_cook_dinner.mp3",
      audio_collocation: "/audio/week21/wordpower_coll_cook_dinner.mp3",
      audio_model: "/audio/week21/wordpower_model_cook_dinner.mp3"
    },
    {
      id: 5,
      word: "watch the stars",
      pronunciation: "/wOtS D@ stAErz/",
      cefr_level: "A2",
      definition_en: "to look up at the night sky and observe the bright points of light",
      definition_vi: "nhin ngam nhung ngoi sao",
      example: "On clear nights, we love to watch the stars from the backyard.",
      model_sentence: "Yesterday I watched the stars and counted ten bright ones in the sky.",
      collocation: "watch the stars at night",
      image_url: "/images/week21/wordpower_watch_stars.jpg",
      audio_word: "/audio/week21/wordpower_watch_stars.mp3",
      audio_definition: "/audio/week21/wordpower_def_watch_stars.mp3",
      audio_example: "/audio/week21/wordpower_ex_watch_stars.mp3",
      audio_collocation: "/audio/week21/wordpower_coll_watch_stars.mp3",
      audio_model: "/audio/week21/wordpower_model_watch_stars.mp3"
    },
    {
      id: 6,
      word: "finish homework",
      pronunciation: "/fInIS h@UmwY:k/",
      cefr_level: "A1",
      definition_en: "to complete all school assignments given to do at home",
      definition_vi: "hoan thanh bai tap ve nha",
      example: "I always try to finish homework before dinner so I can relax.",
      model_sentence: "Yesterday I finished homework at six o clock and then helped set the table.",
      collocation: "finish homework on time",
      image_url: "/images/week21/wordpower_finish_homework.jpg",
      audio_word: "/audio/week21/wordpower_finish_homework.mp3",
      audio_definition: "/audio/week21/wordpower_def_finish_homework.mp3",
      audio_example: "/audio/week21/wordpower_ex_finish_homework.mp3",
      audio_collocation: "/audio/week21/wordpower_coll_finish_homework.mp3",
      audio_model: "/audio/week21/wordpower_model_finish_homework.mp3"
    }
  ]
};
"""
with open(f'{BASE}/word_power.js', 'w') as f:
    f.write(word_power_js)
print("word_power.js OK")

# === WORD_MATCH.JS ===
word_match_js = """export default {
  title: "Match the Past Verb",
  instruction: "Match each base verb with its past form.",
  pairs: [
    { word: "walk", match: "walked", audio_word: "/audio/week21/wm_walk.mp3", audio_match: "/audio/week21/wm_walked.mp3" },
    { word: "play", match: "played", audio_word: "/audio/week21/wm_play.mp3", audio_match: "/audio/week21/wm_played.mp3" },
    { word: "watch", match: "watched", audio_word: "/audio/week21/wm_watch.mp3", audio_match: "/audio/week21/wm_watched.mp3" },
    { word: "clean", match: "cleaned", audio_word: "/audio/week21/wm_clean.mp3", audio_match: "/audio/week21/wm_cleaned.mp3" },
    { word: "help", match: "helped", audio_word: "/audio/week21/wm_help.mp3", audio_match: "/audio/week21/wm_helped.mp3" },
    { word: "cook", match: "cooked", audio_word: "/audio/week21/wm_cook.mp3", audio_match: "/audio/week21/wm_cooked.mp3" },
    { word: "listen", match: "listened", audio_word: "/audio/week21/wm_listen.mp3", audio_match: "/audio/week21/wm_listened.mp3" },
    { word: "talk", match: "talked", audio_word: "/audio/week21/wm_talk.mp3", audio_match: "/audio/week21/wm_talked.mp3" },
    { word: "open", match: "opened", audio_word: "/audio/week21/wm_open.mp3", audio_match: "/audio/week21/wm_opened.mp3" },
    { word: "wash", match: "washed", audio_word: "/audio/week21/wm_wash.mp3", audio_match: "/audio/week21/wm_washed.mp3" }
  ],
  feedback: {
    correct: "Yes! That is the correct past form!",
    incorrect: "Not quite. Remember to add -ed to make the past form!"
  }
};
"""
with open(f'{BASE}/word_match.js', 'w') as f:
    f.write(word_match_js)
print("word_match.js OK")

# === EXPLORE.JS ===
explore_js = """export default {
  title: "Explore: -ed Pronunciation Sounds",
  image_url: "/images/week21/explore_cover_w21.jpg",
  audio_url: "/audio/week21/explore_intro.mp3",
  sections: [
    {
      id: "pronunciation_ed",
      title: "Three Sounds for -ed",
      content: "When we add -ed to a verb, it can sound like /t/, /d/, or /Id/. Listen to the difference!",
      audio_url: "/audio/week21/explore_pron.mp3",
      examples: [
        { text: "walked /wOkt/ - sounds like /t/", audio: "/audio/week21/explore_walked.mp3" },
        { text: "played /pleId/ - sounds like /d/", audio: "/audio/week21/explore_played.mp3" },
        { text: "started /stAErtId/ - sounds like /Id/", audio: "/audio/week21/explore_started.mp3" }
      ]
    },
    {
      id: "diary_time",
      title: "Time Words in a Diary",
      content: "Diary writers use special time words: yesterday, last night, in the morning, in the evening, at break time, after school.",
      audio_url: "/audio/week21/explore_time.mp3",
      examples: [
        { text: "Yesterday I walked to school.", audio: "/audio/week21/explore_yesterday.mp3" },
        { text: "In the morning I listened to the teacher.", audio: "/audio/week21/explore_morning.mp3" },
        { text: "Last night I watched the stars.", audio: "/audio/week21/explore_lastnight.mp3" }
      ]
    },
    {
      id: "star_science",
      title: "Science Corner: Stars in the Sky",
      content: "Stars are huge balls of burning gas very far away. At night, when the sky is clear, we can see hundreds of stars. The nearest star to Earth is the Sun!",
      audio_url: "/audio/week21/explore_stars.mp3",
      examples: [
        { text: "Max looked at ten stars last night.", audio: "/audio/week21/explore_ten_stars.mp3" },
        { text: "Stars shine because they burn bright gases.", audio: "/audio/week21/explore_stars_fact.mp3" }
      ]
    }
  ]
};
"""
with open(f'{BASE}/explore.js', 'w') as f:
    f.write(explore_js)
print("explore.js OK")

# === ASK_AI.JS ===
ask_ai_js = """export default {
  title: "Ask AI: Diary Detective",
  system_prompt: "You are Detective Nova, an enthusiastic diary detective helping a 6-12 year old Vietnamese child practice Past Simple Regular Verbs (-ed). RULES: (1) Always model -ed verb forms (walked, played, watched, cleaned, helped, cooked, talked, listened, opened, washed, finished, started). (2) Ask ONE question per turn. (3) Give 2-3 hint choices: Say: I walked... or I played.... (4) Recast errors: if student says I walk, respond: Yes! I WALKED! Say: I walked to school. (5) Keep all responses under 30 words. (6) NO emojis. (7) Week 21 theme: diary, yesterday activities.",
  starter_prompts: [
    { label: "My morning", prompt: "Tell me about your morning yesterday. Did you walk to school?" },
    { label: "School activities", prompt: "What did you do at school yesterday? Did you listen to your teacher?" },
    { label: "Helping at home", prompt: "Did you help at home yesterday? What did you do?" },
    { label: "Evening routine", prompt: "What did you do in the evening? Did you watch TV or look at the stars?" }
  ],
  grammar_focus: "Past Simple Regular Verbs (-ed)",
  target_vocab: ["walked", "looked", "cooked", "played", "watched", "cleaned", "helped", "talked", "listened", "opened", "washed", "finished", "started"],
  audio_intro: "/audio/week21/ask_ai_intro.mp3"
};
"""
with open(f'{BASE}/ask_ai.js', 'w') as f:
    f.write(ask_ai_js)
print("ask_ai.js OK")

# === DICTATION.JS ===
dictation_js = """export default {
  title: "Diary Dictation",
  instruction: "Listen and write the sentence from Max's diary.",
  sentences: [
    { id: 1, text: "I walked to school with my friend.", audio_url: "/audio/week21/dict_1.mp3", translation_vi: "Toi da di bo den truong voi ban cua minh." },
    { id: 2, text: "We talked about our homework.", audio_url: "/audio/week21/dict_2.mp3", translation_vi: "Chung toi da noi chuyen ve bai tap ve nha." },
    { id: 3, text: "I listened to the teacher carefully.", audio_url: "/audio/week21/dict_3.mp3", translation_vi: "Toi da lang nghe giao vien mot cach chu y." },
    { id: 4, text: "I played soccer at break time.", audio_url: "/audio/week21/dict_4.mp3", translation_vi: "Toi da choi bong da vao gio giai lao." },
    { id: 5, text: "I helped my mother after school.", audio_url: "/audio/week21/dict_5.mp3", translation_vi: "Toi da giup me toi sau khi di hoc ve." },
    { id: 6, text: "I cleaned my room in the evening.", audio_url: "/audio/week21/dict_6.mp3", translation_vi: "Toi da don dep phong cua toi vao buoi toi." },
    { id: 7, text: "Mom cooked dinner for the family.", audio_url: "/audio/week21/dict_7.mp3", translation_vi: "Me da nau bua toi cho ca nha." },
    { id: 8, text: "I watched TV for thirty minutes.", audio_url: "/audio/week21/dict_8.mp3", translation_vi: "Toi da xem TV trong ba muoi phut." },
    { id: 9, text: "I looked at the stars outside.", audio_url: "/audio/week21/dict_9.mp3", translation_vi: "Toi da nhin cac ngoi sao ben ngoai." },
    { id: 10, text: "I finished my homework at seven o clock.", audio_url: "/audio/week21/dict_10.mp3", translation_vi: "Toi da hoan thanh bai tap luc bay gio." }
  ]
};
"""
with open(f'{BASE}/dictation.js', 'w') as f:
    f.write(dictation_js)
print("dictation.js OK")

# === SHADOWING.JS ===
shadowing_js = """export default {
  title: "Diary Shadowing - Max's Busy Day",
  instruction: "Listen and repeat each sentence from Max's diary. Copy the rhythm and -ed endings!",
  segments: [
    { id: 1, text: "Yesterday was a busy day!", audio_url: "/audio/week21/shadow_1.mp3", translation_vi: "Hom qua that la mot ngay ban ron!" },
    { id: 2, text: "I walked to school with my friend.", audio_url: "/audio/week21/shadow_2.mp3", translation_vi: "Toi da di bo den truong voi ban." },
    { id: 3, text: "We talked about our homework.", audio_url: "/audio/week21/shadow_3.mp3", translation_vi: "Chung toi da noi chuyen ve bai tap." },
    { id: 4, text: "I listened to the teacher.", audio_url: "/audio/week21/shadow_4.mp3", translation_vi: "Toi da lang nghe giao vien." },
    { id: 5, text: "I played soccer at break time.", audio_url: "/audio/week21/shadow_5.mp3", translation_vi: "Toi da choi bong da vao gio giai lao." },
    { id: 6, text: "I helped my mother after school.", audio_url: "/audio/week21/shadow_6.mp3", translation_vi: "Toi da giup me sau khi di hoc ve." },
    { id: 7, text: "I cleaned my room.", audio_url: "/audio/week21/shadow_7.mp3", translation_vi: "Toi da don dep phong cua toi." },
    { id: 8, text: "I watched TV for thirty minutes.", audio_url: "/audio/week21/shadow_8.mp3", translation_vi: "Toi da xem TV trong ba muoi phut." },
    { id: 9, text: "I looked at the stars outside.", audio_url: "/audio/week21/shadow_9.mp3", translation_vi: "Toi da nhin cac ngoi sao." },
    { id: 10, text: "I finished my diary and started to sleep at nine.", audio_url: "/audio/week21/shadow_10.mp3", translation_vi: "Toi da hoan thanh nhat ky va bat dau ngu luc chin gio." }
  ]
};
"""
with open(f'{BASE}/shadowing.js', 'w') as f:
    f.write(shadowing_js)
print("shadowing.js OK")

# === WRITING.JS ===
writing_js = """export default {
  title: "Write Your Diary",
  instruction: "Write 6 sentences about what you did yesterday. Use the -ed verb form!",
  scaffolding: [
    { id: 1, prompt: "Yesterday, I ___ (wake up) at ___.", hint: "woke up", example: "Yesterday, I woke up at six thirty." },
    { id: 2, prompt: "I ___ (walk / take the bus) to school.", hint: "walked", example: "I walked to school with my friend." },
    { id: 3, prompt: "At school, I ___ (listen / play / talk).", hint: "listened", example: "At school, I listened to the teacher." },
    { id: 4, prompt: "After school, I ___ (help / clean / cook).", hint: "helped", example: "After school, I helped my mother." },
    { id: 5, prompt: "In the evening, I ___ (watch / look / finish).", hint: "watched", example: "In the evening, I watched TV." },
    { id: 6, prompt: "I was ___ (happy / tired / hungry)!", hint: "tired", example: "I was tired but happy!" }
  ],
  model_text: "Yesterday, I woke up at six thirty. I walked to school with my friend. At school, I listened to the teacher. After school, I helped my mother with dinner. In the evening, I watched TV for thirty minutes. I was tired but happy!",
  model_audio: "/audio/week21/writing_model.mp3",
  grammar_reminder: "Remember: add -ed to make past tense! walk -> walked, help -> helped, watch -> watched"
};
"""
with open(f'{BASE}/writing.js', 'w') as f:
    f.write(writing_js)
print("writing.js OK")

# === MINDMAP.JS ===
mindmap_js = """export default {
  title: "My Yesterday Mindmap",
  center_topic: "Yesterday",
  center_audio: "/audio/week21/mindmap_center.mp3",
  branches: [
    {
      id: "morning",
      label: "Morning",
      audio_url: "/audio/week21/mindmap_morning.mp3",
      color: "#FFB347",
      items: [
        { text: "I walked to school.", audio_url: "/audio/week21/mindmap_walked.mp3" },
        { text: "I talked to my friend.", audio_url: "/audio/week21/mindmap_talked.mp3" },
        { text: "I listened to the teacher.", audio_url: "/audio/week21/mindmap_listened.mp3" }
      ]
    },
    {
      id: "break_time",
      label: "Break Time",
      audio_url: "/audio/week21/mindmap_break.mp3",
      color: "#87CEEB",
      items: [
        { text: "I played soccer.", audio_url: "/audio/week21/mindmap_played.mp3" },
        { text: "I washed my hands.", audio_url: "/audio/week21/mindmap_washed.mp3" }
      ]
    },
    {
      id: "afternoon",
      label: "Afternoon",
      audio_url: "/audio/week21/mindmap_afternoon.mp3",
      color: "#98FB98",
      items: [
        { text: "I helped my mother.", audio_url: "/audio/week21/mindmap_helped.mp3" },
        { text: "I cleaned my room.", audio_url: "/audio/week21/mindmap_cleaned.mp3" },
        { text: "Mom cooked dinner.", audio_url: "/audio/week21/mindmap_cooked.mp3" }
      ]
    },
    {
      id: "evening",
      label: "Evening",
      audio_url: "/audio/week21/mindmap_evening.mp3",
      color: "#DDA0DD",
      items: [
        { text: "I watched TV.", audio_url: "/audio/week21/mindmap_watched.mp3" },
        { text: "I looked at the stars.", audio_url: "/audio/week21/mindmap_looked.mp3" },
        { text: "I finished my diary.", audio_url: "/audio/week21/mindmap_finished.mp3" }
      ]
    }
  ],
  speaking_prompt: "Tell your partner about your yesterday using the mindmap. Say: In the morning I walked... At break time I played...",
  speaking_audio: "/audio/week21/mindmap_speaking_prompt.mp3"
};
"""
with open(f'{BASE}/mindmap.js', 'w') as f:
    f.write(mindmap_js)
print("mindmap.js OK")

# === DAILY_WATCH.JS ===
daily_watch_js = """export default {
  title: "Daily Watch: Past Simple Actions",
  week_id: 21,
  description: "Watch these videos about daily activities and past tense verbs. Notice how people talk about what they did yesterday!",
  videos: [
    {
      id: "v1",
      title: "Kids Talk About Their Day",
      youtube_id: "T-NvGfwRJl4",
      description: "Children describe what they did yesterday using past tense verbs.",
      grammar_focus: "Past Simple regular verbs (-ed)",
      watch_for: "Listen for: walked, played, watched, cleaned, helped",
      audio_url: "/audio/week21/daily_watch_v1.mp3"
    },
    {
      id: "v2",
      title: "My Daily Routine - Past Tense",
      youtube_id: "cchXxo8FO6g",
      description: "A fun video about talking about yesterday activities with -ed verbs.",
      grammar_focus: "Past Simple regular verbs (-ed)",
      watch_for: "Notice: finished, started, opened in sentences",
      audio_url: "/audio/week21/daily_watch_v2.mp3"
    },
    {
      id: "v3",
      title: "Stars and Night Sky",
      youtube_id: "0rHUDWjR5gg",
      description: "Learn about stars - connecting to Max looking at ten stars in his diary!",
      grammar_focus: "Science: stars and night sky (diary seeding)",
      watch_for: "How many stars can you see? What did Max look at?",
      audio_url: "/audio/week21/daily_watch_v3.mp3"
    }
  ]
};
"""
with open(f'{BASE}/daily_watch.js', 'w') as f:
    f.write(daily_watch_js)
print("daily_watch.js OK")

# === LOGIC_SCIENCE.JS ===
logic_science_js = """export default {
  title: "Logic Lab: Sequence Max's Day",
  theme: "Time Detective Agency - Ordering Diary Events",
  description: "Help Detective Nova put Max's diary events in the right order! Use FIRST, THEN, NEXT, FINALLY.",
  grammar_connection: "Past Simple -ed verbs + sequence words (first, then, next, finally)",

  exercises: [
    {
      id: 1,
      type: "sequence_order",
      instruction: "Put Max's morning activities in the correct order. Number 1 to 4.",
      items: [
        { text: "He listened to the teacher.", correct_order: 3 },
        { text: "He walked to school.", correct_order: 2 },
        { text: "He woke up early.", correct_order: 1 },
        { text: "He played soccer at break time.", correct_order: 4 }
      ],
      sentence_frame: "First, Max ___. Then, he ___. Next, he ___. Finally, he ___.",
      audio_url: "/audio/week21/logic_q1.mp3"
    },
    {
      id: 2,
      type: "multiple_choice",
      question: "What did Max do AFTER school?",
      options: [
        "He walked to school.",
        "He helped his mother and cleaned his room.",
        "He looked at the stars."
      ],
      answer: "He helped his mother and cleaned his room.",
      explanation: "After school comes AFTER school time. He helped and cleaned in the afternoon.",
      audio_url: "/audio/week21/logic_q2.mp3"
    },
    {
      id: 3,
      type: "true_false",
      question: "Max watched TV BEFORE he cleaned his room.",
      answer: false,
      explanation: "Max cleaned his room first (afternoon), then watched TV later (evening).",
      audio_url: "/audio/week21/logic_q3.mp3"
    },
    {
      id: 4,
      type: "sequence_order",
      instruction: "Order Max's evening activities.",
      items: [
        { text: "He finished his diary.", correct_order: 3 },
        { text: "He watched TV.", correct_order: 1 },
        { text: "He started to sleep.", correct_order: 4 },
        { text: "He looked at the stars.", correct_order: 2 }
      ],
      sentence_frame: "First he ___. Then he ___. Next he ___. Finally he ___.",
      audio_url: "/audio/week21/logic_q4.mp3"
    },
    {
      id: 5,
      type: "cause_effect",
      question: "WHY did Max look tired at the end of the diary?",
      options: [
        "Because he walked, played, helped, cleaned, and watched — he did many activities!",
        "Because he only watched TV all day.",
        "Because he did not eat dinner."
      ],
      answer: "Because he walked, played, helped, cleaned, and watched — he did many activities!",
      explanation: "Max had a very busy day with many -ed verb activities. That is why he was tired!",
      audio_url: "/audio/week21/logic_q5.mp3"
    }
  ],

  sequence_words: {
    first: { word: "First", use: "The first / most important action", example: "First, Max walked to school." },
    then: { word: "Then", use: "The next action after", example: "Then, he listened to the teacher." },
    next: { word: "Next", use: "The following action", example: "Next, he played soccer." },
    finally: { word: "Finally", use: "The last action", example: "Finally, he started to sleep." }
  }
};
"""
with open(f'{BASE}/logic_science.js', 'w') as f:
    f.write(logic_science_js)
print("logic_science.js OK")

# === SINGAPORE_MATH.JS ===
singapore_math_js = """export default {
  title: "Singapore Math: Shapes in Max's World",
  theme: "Identifying shapes Max saw yesterday",
  math_topic: "2D Shapes (circle, square, triangle, rectangle)",
  grammar_connection: "Past Simple -ed verbs + shapes vocabulary",

  shape_vocabulary: [
    { shape: "circle", sides: 0, corners: 0, example: "The clock is a circle. Max looked at the clock last night." },
    { shape: "square", sides: 4, corners: 4, example: "Max cleaned his square table in his room." },
    { shape: "triangle", sides: 3, corners: 3, example: "Max watched a cartoon with triangle hats." },
    { shape: "rectangle", sides: 4, corners: 4, example: "Max opened his rectangular notebook." }
  ],

  word_problems: [
    {
      id: 1,
      level: "guided",
      text: "Max walked to school. He counted shapes along the way. He saw 4 circles (wheels on cars) and 3 rectangles (doors). How many shapes did he see in total?",
      image_url: "/images/week21/barmodel_w21_p1.jpg",
      solution: {
        equation: "4 + 3 = 7",
        answer: "Max saw 7 shapes.",
        bar_model: "circles: 4 | rectangles: 3 | total: 7"
      },
      cube_hints: { circle_key: "4 circles + 3 rectangles", underline: "total", box: "?", eliminate: "walked to school (extra info)", solve: "4 + 3 = 7" },
      audio_url: "/audio/week21/math_p1.mp3"
    },
    {
      id: 2,
      level: "guided",
      text: "Max cleaned his room. He found 6 square tiles on the floor and 4 triangle shapes on his poster. How many shapes did he find altogether?",
      image_url: "/images/week21/barmodel_w21_p2.jpg",
      solution: {
        equation: "6 + 4 = 10",
        answer: "Max found 10 shapes.",
        bar_model: "squares: 6 | triangles: 4 | total: 10"
      },
      cube_hints: { circle_key: "6 squares + 4 triangles", underline: "altogether", box: "?", eliminate: "none (all info needed)", solve: "6 + 4 = 10" },
      audio_url: "/audio/week21/math_p2.mp3"
    },
    {
      id: 3,
      level: "independent",
      text: "Max looked at the stars. He drew 8 star shapes and 5 circle shapes in his diary. He finished drawing 3 of the star shapes. How many star shapes did NOT get finished?",
      image_url: "/images/week21/barmodel_w21_p3.jpg",
      solution: {
        equation: "8 - 3 = 5",
        answer: "5 star shapes were not finished.",
        bar_model: "total stars: 8 | finished: 3 | not finished: 5"
      },
      cube_hints: { circle_key: "8 stars, finished 3", underline: "not finished", box: "?", eliminate: "5 circles (extra info)", solve: "8 - 3 = 5" },
      audio_url: "/audio/week21/math_p3.mp3"
    },
    {
      id: 4,
      level: "independent",
      text: "Max played soccer. There were 11 players. Each team had the same number of players. How many players were on each team?",
      image_url: "/images/week21/barmodel_w21_p4.jpg",
      solution: {
        equation: "11 is not equally divisible — wait, this should be: 10 players total, 5 on each team. Corrected: Max played soccer with 10 players. Each team had the same number. How many on each team?",
        corrected_text: "Max played soccer. There were 10 players total. Each team had the same number. How many players were on each team?",
        equation: "10 / 2 = 5",
        answer: "Each team had 5 players.",
        bar_model: "total: 10 | team A: 5 | team B: 5"
      },
      cube_hints: { circle_key: "10 players total, 2 equal teams", underline: "each team", box: "?", eliminate: "none", solve: "10 / 2 = 5" },
      audio_url: "/audio/week21/math_p4.mp3"
    }
  ],

  shape_challenge: {
    title: "Shape Hunt in YOUR Yesterday",
    instruction: "Think about yesterday. What shapes did YOU see? Draw and label them.",
    prompts: [
      "I walked past a ___ (circle/square/rectangle/triangle) shaped ___.",
      "I looked at the ___ shaped ___ in my room.",
      "I helped put away ___ shaped ___ things."
    ]
  }
};
"""
with open(f'{BASE}/singapore_math.js', 'w') as f:
    f.write(singapore_math_js)
print("singapore_math.js OK")

# === GAMES.JS ===
games_js = """/**
 * Week 21 Game Data - Advanced Mode (GameHub)
 * Theme: Time Detective Agency - Yesterday's Diary
 * Grammar: Past Simple Regular Verbs (-ed)
 */

export const week21GamesAdvanced = {
  vocabulary: [
    'walked', 'looked', 'cooked', 'played', 'watched',
    'cleaned', 'helped', 'talked', 'listened', 'opened'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'walked', 'looked', 'cooked', 'played', 'watched',
      'cleaned', 'helped', 'talked', 'listened', 'opened'
    ],
    instructions_easy: 'Say the past verb clearly, then add who did it, then make a full sentence.',
    instructions_advanced: 'Use the past verb in a sentence about yesterday.',
    step_instructions: {
      1: 'Step 1: say the past verb clearly.',
      2: 'Step 2: add who did the action.',
      3: 'Step 3: make a full past tense sentence.'
    },
    frames_easy: ['Yesterday I ___', 'She ___ last night'],
    frames_advanced: ['Yesterday I ___ to school', 'After school I ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'walked': ['walked', 'walked to school', 'I walked', 'Yesterday I walked to school with my friend.'],
      'looked': ['looked', 'looked at', 'I looked', 'Last night I looked at the bright stars in the sky.'],
      'cooked': ['cooked', 'cooked dinner', 'Mom cooked', 'My mom cooked rice and vegetables for dinner last night.'],
      'played': ['played', 'played soccer', 'I played', 'I played soccer with my classmates at break time.'],
      'watched': ['watched', 'watched TV', 'I watched', 'I watched my favorite TV show for thirty minutes.'],
      'cleaned': ['cleaned', 'cleaned room', 'I cleaned', 'I cleaned my room after school and organized my desk.'],
      'helped': ['helped', 'helped mom', 'I helped', 'I helped my mother set the table before dinner.'],
      'talked': ['talked', 'talked to', 'We talked', 'We talked about our homework on the way to school.'],
      'listened': ['listened', 'listened carefully', 'I listened', 'I listened to the teacher and wrote notes in my book.'],
      'opened': ['opened', 'opened the door', 'I opened', 'I opened the door and welcomed my grandmother inside.']
    },
    distractor_map: {
      'walked': ['ran quickly', 'took the bus', 'drove a car'],
      'looked': ['closed eyes', 'turned away', 'slept'],
      'cooked': ['ordered food', 'bought snacks', 'ate out'],
      'played': ['sat quietly', 'slept at school', 'read a book'],
      'watched': ['turned off TV', 'closed laptop', 'went to sleep']
    },
    frame_map: {
      'walked': ['I walked to school yesterday.'],
      'cooked': ['Mom cooked dinner last night.'],
      'played': ['I played soccer at break time.']
    },
    sentence_hints_map: {
      'walked': ['I walked to school.', 'She walked home.', 'We walked together.'],
      'looked': ['I looked at the stars.', 'He looked out the window.', 'She looked at her book.'],
      'cooked': ['Mom cooked dinner.', 'Dad cooked rice.', 'She cooked vegetables.'],
      'played': ['I played soccer.', 'We played outside.', 'He played with his friends.'],
      'watched': ['I watched TV.', 'She watched cartoons.', 'He watched for thirty minutes.'],
      'cleaned': ['I cleaned my room.', 'She cleaned the table.', 'He cleaned the floor.'],
      'helped': ['I helped mom.', 'She helped me.', 'He helped his sister.'],
      'talked': ['We talked about homework.', 'She talked to her friend.', 'I talked on the phone.'],
      'listened': ['I listened carefully.', 'She listened to music.', 'He listened to the teacher.'],
      'opened': ['I opened the door.', 'She opened the window.', 'He opened his notebook.']
    }
  },

  mini_games: [
    {
      id: "spelling_bee",
      type: "spelling",
      title: "-ed Spelling Challenge",
      instruction: "Type the correct past form of each verb!",
      items: [
        { base: "walk", answer: "walked" },
        { base: "play", answer: "played" },
        { base: "watch", answer: "watched" },
        { base: "clean", answer: "cleaned" },
        { base: "help", answer: "helped" },
        { base: "cook", answer: "cooked" },
        { base: "listen", answer: "listened" },
        { base: "talk", answer: "talked" },
        { base: "open", answer: "opened" },
        { base: "wash", answer: "washed" },
        { base: "finish", answer: "finished" },
        { base: "start", answer: "started" }
      ]
    },
    {
      id: "diary_sort",
      type: "sort",
      title: "Sort by -ed Sound",
      instruction: "Sort these past verbs by their -ed pronunciation: /t/, /d/, or /Id/",
      categories: [
        { label: "/t/ sound", items: ["walked", "watched", "helped", "washed", "cooked", "talked"] },
        { label: "/d/ sound", items: ["played", "cleaned", "listened", "opened"] },
        { label: "/Id/ sound", items: ["started", "finished"] }
      ]
    },
    {
      id: "diary_timeline",
      type: "timeline",
      title: "Build Max's Day Timeline",
      instruction: "Drag the diary events to build Max's day in order!",
      timeline: [
        { time: "06:30", event: "Max woke up early.", verb: "woke" },
        { time: "07:00", event: "Max walked to school.", verb: "walked" },
        { time: "09:00", event: "Max listened to the teacher.", verb: "listened" },
        { time: "10:30", event: "Max played soccer.", verb: "played" },
        { time: "15:00", event: "Max helped his mother.", verb: "helped" },
        { time: "16:00", event: "Max cleaned his room.", verb: "cleaned" },
        { time: "18:00", event: "Max watched TV.", verb: "watched" },
        { time: "20:00", event: "Max looked at the stars.", verb: "looked" },
        { time: "21:00", event: "Max started to sleep.", verb: "started" }
      ]
    }
  ]
};

export default week21GamesAdvanced;
"""
with open(f'{BASE}/games.js', 'w') as f:
    f.write(games_js)
print("games.js OK")

# === VIDEO_QUERIES.JSON ===
import json
video_queries = {
  "week": 21,
  "title": "Yesterday's Diary - Past Simple Verbs",
  "queries": [
    "kids daily routine past tense -ed verbs",
    "children talking about yesterday activities",
    "past simple regular verbs song for kids",
    "diary writing for kids English",
    "stars night sky for kids science"
  ]
}
with open(f'{BASE}/video_queries.json', 'w') as f:
    json.dump(video_queries, f, indent=2)
print("video_queries.json OK")

# Final count
files = os.listdir(BASE)
print(f"\nTotal files in {BASE}: {len(files)}")
for f in sorted(files):
    print(f"  {f}")
