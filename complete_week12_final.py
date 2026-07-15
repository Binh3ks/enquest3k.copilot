#!/usr/bin/env python3
"""Generate ALL remaining Week 12 files - no f-strings!"""
import os

# === DICTATION ADVANCED (14 sentences from read.js) ===
DICT_ADV = [
    ("Tonight is the school talent show! Many children showcase their amazing abilities.", "Tối nay là buổi biểu diễn tài năng của trường! Nhiều em nhỏ thể hiện khả năng tuyệt vời của mình."),
    ("Sarah can sing beautifully on stage.", "Sarah có thể hát hay trên sân khấu."),
    ("She sings a popular song and the audience loves it.", "Cô ấy hát một bài hát nổi tiếng và khán giả rất thích."),
    ("Tom can dance with energy and style.", "Tom có thể nhảy đầy năng lượng và phong cách."),
    ("He performs a cool hip-hop routine.", "Cậu ấy biểu diễn một tiết mục hip-hop ngầu."),
    ("Mike can run faster than anyone in his grade.", "Mike có thể chạy nhanh hơn bất kỳ ai trong lớp."),
    ("He demonstrates his speed on the track.", "Cậu ấy thể hiện tốc độ của mình trên đường chạy."),
    ("Lily can jump very high with a rope.", "Lily có thể nhảy rất cao với dây nhảy."),
    ("She shows her amazing jump rope skills.", "Cô ấy cho thấy kỹ năng nhảy dây tuyệt vời."),
    ("Ben can climb the wall quickly during practice.", "Ben có thể trèo tường nhanh chóng trong buổi luyện tập."),
    ("Emma can ride her bike without training wheels.", "Emma có thể đạp xe không cần bánh phụ."),
    ("Jack can draw amazing animals and people.", "Jack có thể vẽ động vật và con người tuyệt đẹp."),
    ("Mia can swim across the pool easily.", "Mia có thể bơi qua bể một cách dễ dàng."),
    ("Every child has unique talents!", "Mỗi đứa trẻ đều có tài năng riêng!")
]

# === DICTATION EASY (10 sentences) ===
DICT_EASY = [
    ("I have many talents!", "Tôi có nhiều tài năng!"),
    ("I can sing happy songs.", "Tôi có thể hát những bài hát vui."),
    ("I sing every day at home.", "Tôi hát mỗi ngày ở nhà."),
    ("I can dance with my friends.", "Tôi có thể nhảy với bạn bè."),
    ("I can run fast in the park.", "Tôi có thể chạy nhanh trong công viên."),
    ("I run with my friends.", "Tôi chạy cùng bạn bè."),
    ("I can jump high too!", "Tôi cũng có thể nhảy cao!"),
    ("I can climb trees in the garden.", "Tôi có thể trèo cây trong vườn."),
    ("I can ride my bike every day.", "Tôi có thể đạp xe mỗi ngày."),
    ("I love showing my talents!", "Tôi thích thể hiện tài năng của mình!")
]

# === GRAMMAR EXERCISES (20 items) ===
GRAMMAR_EX = [
    ('1', 'mc', 'Can you ___ English?', '["speak", "speaking", "speaks"]', 'speak', 'ability'),
    ('2', 'fill', 'I ___ swim very well.', 'can', '', 'positive form'),
    ('3', 'mc', "She ___ play the piano.", '["can", "cans", "caning"]', 'can', 'singular subject'),
    ('4', 'fill', "He can ___ very fast.", 'run', '', 'verb after can'),
    ('5', 'mc', 'Can birds ___?', '["fly", "flies", "flying"]', 'fly', 'question form'),
    ('6', 'fill', "They ___ dance at the party.", 'can', '', 'ability'),
    ('7', 'mc', "I ___ ride a bike.", '["can", "am", "is"]', 'can', 'ability verb'),
    ('8', 'fill', "Can you ___ high?", 'jump', '', 'question'),
    ('9', 'unscramble', 'Order:', '["can", "I", "sing", "songs"]', 'I can sing songs.', 'I can'),
    ('10', 'unscramble', 'Order:', '["you", "Can", "draw", "?"]', 'Can you draw?', 'Can you'),
    ('11', 'mc', "She can ___ delicious food.", '["cook", "cooks", "cooking"]', 'cook', 'verb'),
    ('12', 'fill', "We ___ play games together.", 'can', '', 'plural subject'),
    ('13', 'mc', 'Can he ___?', '["climb", "climbs", "climbing"]', 'climb', 'question'),
    ('14', 'fill', "You can ___ in the pool.", 'swim', '', 'activity'),
    ('15', 'mc', "They can ___ on stage.", '["dance", "dances", "dancing"]', 'dance', 'plural'),
    ('16', 'fill', "I can ___ pictures.", 'draw', '', 'verb'),
    ('17', 'unscramble', 'Order:', '["can", "swim", "fish", "Fish"]', 'Fish can swim.', 'Fish can'),
    ('18', 'unscramble', 'Order:', '["ride", "can", "I", "a", "bike"]', 'I can ride a bike.', 'I can ride'),
    ('19', 'mc', 'Can you ___ me?', '["help", "helps", "helping"]', 'help', 'request'),
    ('20', 'fill', "Dogs can ___ loudly.", 'bark', '', 'ability')
]

def write_dictation(mode):
    """Generate dictation.js"""
    folder = "weeks" if mode == "adv" else "weeks_easy"
    audio_folder = "week12" if mode == "adv" else "week12_easy"
    data = DICT_ADV if mode == "adv" else DICT_EASY
    
    lines = ["export default {", "  sentences: ["]
    for i, (text, meaning) in enumerate(data):
        line = '    { id: ' + str(i+1) + ', text: "' + text + '", meaning: "' + meaning + '", audio_url: "/audio/' + audio_folder + '/dictation_' + str(i+1) + '.mp3" }'
        if i < len(data) - 1:
            line += ','
        lines.append(line)
    lines.append("  ]")
    lines.append("};")
    
    path = 'src/data/' + folder + '/week_12/dictation.js'
    with open(path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print('✅ Created ' + path)

def write_shadowing(mode):
    """Generate shadowing.js (same as dictation)"""
    folder = "weeks" if mode == "adv" else "weeks_easy"
    audio_folder = "week12" if mode == "adv" else "week12_easy"
    data = DICT_ADV if mode == "adv" else DICT_EASY
    
    lines = ["export default {", "  sentences: ["]
    for i, (text, vi) in enumerate(data):
        line = '    { id: ' + str(i+1) + ', text: "' + text + '", vi: "' + vi + '", audio_url: "/audio/' + audio_folder + '/shadowing_' + str(i+1) + '.mp3" }'
        if i < len(data) - 1:
            line += ','
        lines.append(line)
    lines.append("  ]")
    lines.append("};")
    
    path = 'src/data/' + folder + '/week_12/shadowing.js'
    with open(path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print('✅ Created ' + path)

def write_grammar(mode):
    """Generate grammar.js"""
    folder = "weeks" if mode == "adv" else "weeks_easy"
    
    lines = [
        "export default {",
        "  grammar_explanation: {",
        '    title_en: "I can / I can\'t (Abilities)",',
        '    title_vi: "Tôi có thể / Tôi không thể (Khả năng)",',
        "    rules: [",
        '      { type: "rule", icon: "1️⃣", rule_en: "Use \'I can\' to talk about abilities: I can swim.", rule_vi: "Dùng \'I can\' để nói về khả năng: Tôi có thể bơi." },',
        '      { type: "rule", icon: "2️⃣", rule_en: "Use \'I can\'t\' (cannot) for things you cannot do: I can\'t fly.", rule_vi: "Dùng \'I can\'t\' cho việc không thể làm: Tôi không thể bay." },',
        '      { type: "rule", icon: "3️⃣", rule_en: "Use \'Can you...?\' to ask about abilities: Can you dance?", rule_vi: "Dùng \'Can you...?\' để hỏi về khả năng: Bạn có thể nhảy không?" },',
        '      { type: "rule", icon: "4️⃣", rule_en: "After \'can\', always use base verb (not -ing or -s): He can run.", rule_vi: "Sau \'can\', luôn dùng động từ gốc: Anh ấy có thể chạy." }',
        "    ]",
        "  },",
        "  exercises: ["
    ]
    
    for i, (id_num, ex_type, question, options_or_answer, answer, hint) in enumerate(GRAMMAR_EX):
        if ex_type == 'mc':
            line = '    { id: ' + id_num + ', type: "mc", question: "' + question + '", options: ' + options_or_answer + ', answer: "' + answer + '", hint: "' + hint + '" }'
        elif ex_type == 'fill':
            line = '    { id: ' + id_num + ', type: "fill", question: "' + question + '", answer: "' + answer + '", hint: "' + hint + '" }'
        else:  # unscramble
            line = '    { id: ' + id_num + ', type: "unscramble", question: "' + question + '", words: ' + options_or_answer + ', answer: "' + answer + '", hint: "' + hint + '" }'
        
        if i < len(GRAMMAR_EX) - 1:
            line += ','
        lines.append(line)
    
    lines.append("  ]")
    lines.append("};")
    
    path = 'src/data/' + folder + '/week_12/grammar.js'
    with open(path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print('✅ Created ' + path)

def write_logic():
    """Generate logic.js (same for both modes)"""
    content = '''export default {
  questions: [
    {
      id: 1,
      question: "Sarah can sing and Tom can dance. Who performs on stage with music and voice?",
      options: ["Sarah", "Tom", "Both", "Neither"],
      answer: "Sarah",
      explanation: "Sarah sings, which uses voice and music."
    },
    {
      id: 2,
      question: "Mike can run fast and Lily can jump high. Who would win a race?",
      options: ["Mike", "Lily", "Both", "Cannot tell"],
      answer: "Mike",
      explanation: "Running fast helps win a race."
    },
    {
      id: 3,
      question: "Ben can climb and Emma can ride a bike. Who needs wheels for their talent?",
      options: ["Ben", "Emma", "Both", "Neither"],
      answer: "Emma",
      explanation: "A bike has wheels; climbing doesn't need wheels."
    },
    {
      id: 4,
      question: "Jack can draw and Mia can swim. Who needs water for their talent?",
      options: ["Jack", "Mia", "Both", "Neither"],
      answer: "Mia",
      explanation: "Swimming requires water; drawing doesn't."
    },
    {
      id: 5,
      question: "If someone can cook, can they also sing?",
      options: ["Yes, always", "No, never", "Maybe, they are different skills", "Impossible"],
      answer: "Maybe, they are different skills",
      explanation: "Cooking and singing are separate abilities. A person can have both, one, or neither."
    }
  ]
};'''
    
    for folder in ['weeks', 'weeks_easy']:
        path = 'src/data/' + folder + '/week_12/logic.js'
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print('✅ Created ' + path)

def write_word_power():
    """Generate word_power.js (same for both modes)"""
    content = '''export default {
  words: [
    {
      id: 1,
      word: "talent",
      pronunciation: "/ˈtæl.ənt/",
      definition_vi: "tài năng, khiếu",
      definition_en: "a natural ability to do something well",
      example: "She has a talent for singing.",
      origin: "From Latin 'talentum' meaning a sum of money",
      usage_note: "Everyone has unique talents!",
      related_words: ["talented", "skill", "gift"],
      image_url: "/images/week12/talent.jpg",
      audio_word: "/audio/week12/wordpower_talent.mp3",
      audio_definition: "/audio/week12/wordpower_def_talent.mp3",
      audio_example: "/audio/week12/wordpower_ex_talent.mp3"
    },
    {
      id: 2,
      word: "ability",
      pronunciation: "/əˈbɪl.ə.ti/",
      definition_vi: "khả năng",
      definition_en: "the power or skill to do something",
      example: "He has the ability to run very fast.",
      origin: "From Latin 'habilis' meaning easily handled",
      usage_note: "Abilities can be learned or natural.",
      related_words: ["able", "capable", "skill"],
      image_url: "/images/week12/ability.jpg",
      audio_word: "/audio/week12/wordpower_ability.mp3",
      audio_definition: "/audio/week12/wordpower_def_ability.mp3",
      audio_example: "/audio/week12/wordpower_ex_ability.mp3"
    },
    {
      id: 3,
      word: "perform",
      pronunciation: "/pərˈfɔːrm/",
      definition_vi: "biểu diễn, thực hiện",
      definition_en: "to do an activity or task, especially in front of people",
      example: "The children will perform at the talent show.",
      origin: "From Old French 'parfournir' meaning to complete",
      usage_note: "Often used for shows and presentations.",
      related_words: ["performance", "performer", "show"],
      image_url: "/images/week12/perform.jpg",
      audio_word: "/audio/week12/wordpower_perform.mp3",
      audio_definition: "/audio/week12/wordpower_def_perform.mp3",
      audio_example: "/audio/week12/wordpower_ex_perform.mp3"
    }
  ]
};'''
    
    for folder in ['weeks', 'weeks_easy']:
        path = 'src/data/' + folder + '/week_12/word_power.js'
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print('✅ Created ' + path)

def write_writing(mode):
    """Generate writing.js"""
    folder = "weeks" if mode == "adv" else "weeks_easy"
    
    if mode == "adv":
        prompt_en = "Write about your talents. What can you do well? (Example: I can sing, I can draw, I cannot swim yet but I want to learn.)"
        prompt_vi = "Viết về tài năng của bạn. Bạn có thể làm gì tốt? (Ví dụ: Tôi có thể hát, tôi có thể vẽ, tôi chưa biết bơi nhưng muốn học.)"
        min_words = 50
    else:
        prompt_en = "Write 3-5 sentences about what you can do. Use 'I can...' (Example: I can sing. I can run fast.)"
        prompt_vi = "Viết 3-5 câu về những gì bạn có thể làm. Dùng 'I can...' (Ví dụ: Tôi có thể hát. Tôi có thể chạy nhanh.)"
        min_words = 30
    
    content = '''export default {
  prompts: [
    {
      id: 1,
      title_en: "My Talents",
      title_vi: "Tài năng của tôi",
      prompt_en: "''' + prompt_en + '''",
      prompt_vi: "''' + prompt_vi + '''",
      min_words: ''' + str(min_words) + ''',
      hints: ["What can you do?", "What can't you do yet?", "What do you want to learn?"]
    }
  ]
};'''
    
    path = 'src/data/' + folder + '/week_12/writing.js'
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('✅ Created ' + path)

if __name__ == "__main__":
    print("🚀 Generating ALL Week 12 files...\n")
    
    # Generate for both modes
    write_dictation("adv")
    write_dictation("easy")
    write_shadowing("adv")
    write_shadowing("easy")
    write_grammar("adv")
    write_grammar("easy")
    write_logic()
    write_word_power()
    write_writing("adv")
    write_writing("easy")
    
    print("\n✅ ALL FILES GENERATED! Run validation again.")
