#!/usr/bin/env python3
"""Complete ALL remaining Week 12 files - FULL PRODUCTION"""
import os

# === FIX VOCAB.JS - DIFFERENTIATION ===
# Advanced: Academic vocabulary about talents/performance
# Easy: Simple everyday words about hobbies

VOCAB_ADVANCED = [
    {"word": "perform", "pron": "/pərˈfɔːrm/", "vi": "biểu diễn", "en": "to do an activity in front of an audience", "ex": "She will perform at the talent show tonight.", "coll": "perform on stage"},
    {"word": "talent", "pron": "/ˈtæl.ənt/", "vi": "tài năng", "en": "a natural ability to do something well", "ex": "He has a talent for music.", "coll": "natural talent"},
    {"word": "ability", "pron": "/əˈbɪl.ə.ti/", "vi": "khả năng", "en": "the power or skill to do something", "ex": "Her ability to dance is amazing.", "coll": "special ability"},
    {"word": "showcase", "pron": "/ˈʃoʊ.keɪs/", "vi": "trưng bày, thể hiện", "en": "to show the best of something", "ex": "The event showcases young artists.", "coll": "showcase skills"},
    {"word": "demonstrate", "pron": "/ˈdem.ən.streɪt/", "vi": "chứng minh, thể hiện", "en": "to show how something works or how to do it", "ex": "He demonstrated his swimming technique.", "coll": "demonstrate ability"},
    {"word": "skill", "pron": "/skɪl/", "vi": "kỹ năng", "en": "the ability to do something well through practice", "ex": "Drawing requires artistic skill.", "coll": "improve skills"},
    {"word": "practice", "pron": "/ˈpræk.tɪs/", "vi": "luyện tập", "en": "to do something regularly to improve", "ex": "I practice singing every day.", "coll": "practice regularly"},
    {"word": "achieve", "pron": "/əˈtʃiːv/", "vi": "đạt được", "en": "to successfully do or complete something", "ex": "She achieved her goal of winning.", "coll": "achieve success"},
    {"word": "improve", "pron": "/ɪmˈpruːv/", "vi": "cải thiện", "en": "to become or make something better", "ex": "Practice helps you improve your skills.", "coll": "improve performance"},
    {"word": "confident", "pron": "/ˈkɑːn.fɪ.dənt/", "vi": "tự tin", "en": "believing in your ability to do something", "ex": "He feels confident about his performance.", "coll": "feel confident"}
]

VOCAB_EASY = [
    {"word": "sing", "pron": "/sɪŋ/", "vi": "hát", "en": "to make music with your voice", "ex": "I like to sing songs.", "coll": "sing a song"},
    {"word": "dance", "pron": "/dæns/", "vi": "nhảy", "en": "to move your body to music", "ex": "We dance at parties.", "coll": "dance to music"},
    {"word": "run", "pron": "/rʌn/", "vi": "chạy", "en": "to move fast with your legs", "ex": "I can run fast.", "coll": "run fast"},
    {"word": "jump", "pron": "/dʒʌmp/", "vi": "nhảy", "en": "to push yourself up into the air", "ex": "I jump high.", "coll": "jump high"},
    {"word": "swim", "pron": "/swɪm/", "vi": "bơi", "en": "to move through water", "ex": "I swim in summer.", "coll": "swim in the pool"},
    {"word": "draw", "pron": "/drɔː/", "vi": "vẽ", "en": "to make pictures with pencils or crayons", "ex": "I draw animals.", "coll": "draw pictures"},
    {"word": "play", "pron": "/pleɪ/", "vi": "chơi", "en": "to do something for fun", "ex": "I play with friends.", "coll": "play games"},
    {"word": "cook", "pron": "/kʊk/", "vi": "nấu ăn", "en": "to make food hot and ready to eat", "ex": "I cook with Mom.", "coll": "cook dinner"},
    {"word": "climb", "pron": "/klaɪm/", "vi": "trèo, leo", "en": "to go up using hands and feet", "ex": "I climb trees.", "coll": "climb up"},
    {"word": "ride", "pron": "/raɪd/", "vi": "đi xe", "en": "to sit on and control something that moves", "ex": "I ride my bike.", "coll": "ride a bike"}
]

def write_vocab_corrected(mode):
    """Generate vocab.js with PROPER differentiation"""
    folder = "weeks" if mode == "adv" else "weeks_easy"
    audio_folder = "week12" if mode == "adv" else "week12_easy"
    data = VOCAB_ADVANCED if mode == "adv" else VOCAB_EASY
    
    lines = ["export default {", "  vocab: ["]
    
    for i, word_obj in enumerate(data):
        item = "    {\n"
        item += "      id: " + str(i+1) + ",\n"
        item += '      word: "' + word_obj["word"] + '",\n'
        item += '      pronunciation: "' + word_obj["pron"] + '",\n'
        item += '      definition_vi: "' + word_obj["vi"] + '",\n'
        item += '      definition_en: "' + word_obj["en"] + '",\n'
        item += '      example: "' + word_obj["ex"] + '",\n'
        item += '      collocation: "' + word_obj["coll"] + '",\n'
        item += '      image_url: "/images/' + audio_folder + '/' + word_obj["word"].replace(" ", "_") + '.jpg",\n'
        
        if mode == "adv":
            # Advanced has 4 audio files
            item += '      audio_word: "/audio/' + audio_folder + '/vocab_' + word_obj["word"].replace(" ", "_") + '.mp3",\n'
            item += '      audio_definition: "/audio/' + audio_folder + '/vocab_def_' + word_obj["word"].replace(" ", "_") + '.mp3",\n'
            item += '      audio_example: "/audio/' + audio_folder + '/vocab_ex_' + word_obj["word"].replace(" ", "_") + '.mp3",\n'
            item += '      audio_collocation: "/audio/' + audio_folder + '/vocab_coll_' + word_obj["word"].replace(" ", "_") + '.mp3"\n'
        else:
            # Easy has 1 audio file
            item += '      audio_word: "/audio/' + audio_folder + '/vocab_' + word_obj["word"].replace(" ", "_") + '.mp3"\n'
        
        item += "    }"
        if i < len(data) - 1:
            item += ","
        lines.append(item)
    
    lines.append("  ]")
    lines.append("};")
    
    path = 'src/data/' + folder + '/week_12/vocab.js'
    with open(path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print('✅ VOCAB CORRECTED: ' + path)

# === EXPLORE.JS - Complete content ===
def write_explore_full(mode):
    """Complete explore.js with full Week 12 content"""
    folder = "weeks" if mode == "adv" else "weeks_easy"
    audio_folder = "week12" if mode == "adv" else "week12_easy"
    
    if mode == "adv":
        title_en = "Talents Around the World"
        title_vi = "Tài năng trên Thế giới"
        content_en = """People around the world have amazing talents! **In Spain**, children learn to dance flamenco with passion and energy. **In Kenya**, many children can **run** long distances every day. **In Japan**, students practice calligraphy and can **draw** beautiful characters. **In Brazil**, kids **play** football with incredible skill. **In India**, young people **sing** classical music with precision. Every culture celebrates different abilities!"""
        content_vi = """Con người trên thế giới có những tài năng tuyệt vời! Ở Tây Ban Nha, trẻ em học nhảy flamenco đầy đam mê và năng lượng. Ở Kenya, nhiều trẻ em có thể chạy đường dài mỗi ngày. Ở Nhật Bản, học sinh luyện thư pháp và có thể vẽ những chữ đẹp. Ở Brazil, trẻ em chơi bóng đá với kỹ năng đáng kinh ngạc. Ở Ấn Độ, người trẻ hát nhạc cổ điển với độ chính xác cao. Mỗi nền văn hóa tôn vinh những khả năng khác nhau!"""
        q1 = "Which country is famous for flamenco dancing?"
        a1 = "Spain"
        q2 = "What sport do Brazilian children play with great skill?"
        a2 = "Football"
        q3 = "In which country do students practice calligraphy?"
        a3 = "Japan"
    else:
        title_en = "Hobbies I Love"
        title_vi = "Sở thích tôi yêu"
        content_en = """I have many hobbies! I can **sing** my favorite songs at home. I can **dance** when I listen to music. On weekends, I **ride** my bike in the park. Sometimes I **draw** pictures of my family and pets. I like to **swim** in the summer. I also **cook** simple food with my mom. I cannot do everything perfectly, but I love trying new things!"""
        content_vi = """Tôi có nhiều sở thích! Tôi có thể hát những bài hát yêu thích ở nhà. Tôi có thể nhảy khi nghe nhạc. Cuối tuần, tôi đạp xe trong công viên. Đôi khi tôi vẽ tranh gia đình và thú cưng. Tôi thích bơi vào mùa hè. Tôi cũng nấu món ăn đơn giản với mẹ. Tôi không thể làm mọi thứ hoàn hảo, nhưng tôi thích thử những điều mới!"""
        q1 = "What does the writer do on weekends?"
        a1 = "Ride a bike in the park"
        q2 = "When does the writer like to swim?"
        a2 = "In the summer"
        q3 = "Who does the writer cook with?"
        a3 = "Mom"
    
    content = '''export default {
  title_en: "''' + title_en + '''",
  title_vi: "''' + title_vi + '''",
  content_en: `''' + content_en + '''`,
  content_vi: `''' + content_vi + '''`,
  audio_narration: "/audio/''' + audio_folder + '''/explore_narration.mp3",
  questions: [
    { q: "''' + q1 + '''", a: "''' + a1 + '''" },
    { q: "''' + q2 + '''", a: "''' + a2 + '''" },
    { q: "''' + q3 + '''", a: "''' + a3 + '''" }
  ]
};'''
    
    path = 'src/data/' + folder + '/week_12/explore.js'
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('✅ EXPLORE COMPLETED: ' + path)

# === Update minor files ===
def update_minor_files():
    """Update mindmap, word_match, ask_ai, games weekId"""
    files_to_update = [
        'src/data/weeks/week_12/mindmap.js',
        'src/data/weeks/week_12/word_match.js',
        'src/data/weeks/week_12/ask_ai.js',
        'src/data/weeks/week_12/games.js',
        'src/data/weeks_easy/week_12/mindmap.js',
        'src/data/weeks_easy/week_12/word_match.js',
        'src/data/weeks_easy/week_12/ask_ai.js',
        'src/data/weeks_easy/week_12/games.js'
    ]
    
    for filepath in files_to_update:
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace weekId from 6 to 12
            content = content.replace('weekId: 6', 'weekId: 12')
            content = content.replace('week_id: 6', 'week_id: 12')
            content = content.replace('week: 6', 'week: 12')
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print('✅ Updated weekId: ' + filepath)

if __name__ == "__main__":
    print("🚀 FINAL COMPLETION - Week 12\n")
    
    # Fix vocab with proper differentiation
    write_vocab_corrected("adv")
    write_vocab_corrected("easy")
    
    # Complete explore
    write_explore_full("adv")
    write_explore_full("easy")
    
    # Update minor files
    update_minor_files()
    
    print("\n✅ WEEK 12 100% COMPLETE!")
    print("Next: Run validation and generate audio")
