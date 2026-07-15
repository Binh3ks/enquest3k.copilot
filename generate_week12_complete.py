#!/usr/bin/env python3
"""
Generate Week 12: The Talent Show (Abilities)
Follows QUICK_REF.md 7-phase production workflow

Theme: Showcasing skills and abilities
Grammar: "I can / I can't"
Target Vocab: sing, dance, run, jump, climb, ride, draw, swim, cook, play (10 words)

Phase 1 Status: read.js and explore.js already created
This script: Complete remaining stations following Validation Table requirements
"""

import os
import json
import re

WEEK = 12
THEME = "The Talent Show"
VOCAB_WORDS = ["sing", "dance", "run", "jump", "climb", "ride", "draw", "swim", "cook", "play"]

# Paths
BASE_ADV = f"src/data/weeks/week_{WEEK}"
BASE_EASY = f"src/data/weeks_easy/week_{WEEK}"

def read_sentences_from_read_js(mode="advanced"):
    """Extract sentences from read.js for 100% extraction rule (dictation/shadowing)"""
    path = f"{BASE_ADV}/read.js" if mode == "advanced" else f"{BASE_EASY}/read.js"
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract content_en field
    match = re.search(r'content_en:\s*"([^"]+)"', content, re.DOTALL)
    if not match:
        print(f"WARNING: Could not extract content_en from {path}")
        return []
    
    text = match.group(1)
    
    # Split by sentence endings (. ! ?)
    sentences = []
    # Split pattern
    split_pattern = r'(?<=[.!?])\s+'
    # Remove bold pattern  
    bold_pattern = r'\*\*([^*]+)\*\*'
    
    for sent in re.split(split_pattern, text):
        sent = sent.strip()
        # Remove ** from bold words
        sent = re.sub(bold_pattern, r'\1', sent)
        # Skip image/audio URLs
        if sent and not sent.startswith('/') and len(sent) > 5:
            sentences.append(sent)
    
    return sentences

def create_dictation(mode="advanced"):
    """PHASE 2: Create dictation.js with 100% extraction from read.js"""
    sentences = read_sentences_from_read_js(mode)
    
    if mode == "advanced":
        expected_count = 14
        folder = "week12"
    else:
        expected_count = 10
        folder = "week12_easy"
    
    # Take first N sentences
    sentences = sentences[:expected_count]
    
    # Vietnamese translations (simplified)
    vi_map_adv = [
        "Tối nay là buổi biểu diễn tài năng của trường!",
        "Nhiều em thể hiện khả năng tuyệt vời.",
        "Sarah có thể hát hay trên sân khấu.",
        "Cô hát một bài hát nổi tiếng và khán giả rất thích.",
        "Tom có thể nhảy đầy năng lượng và phong cách.",
        "Cậu nhảy theo nhạc nhanh với động tác ấn tượng.",
        "Mike có thể chạy nhanh hơn bất kỳ ai trong lớp.",
        "Cậu chạy quanh đường đua với thời gian kỷ lục.",
        "Emma có thể nhảy rất cao qua chướng ngại vật.",
        "Cô nhảy với tư thế hoàn hảo và tiếp đất duyên dáng.",
        "Jack có thể leo tường dốc ở phòng tập leo núi.",
        "Cậu leo lên đỉnh nhanh chóng và vẫy tay chào mọi người.",
        "Lisa có thể vẽ chân dung và phong cảnh chi tiết.",
        "Cô vẽ một bức tranh đẹp cho buổi biểu diễn."
    ]
    
    vi_map_easy = [
        "Tôi có nhiều tài năng!",
        "Tôi có thể hát những bài hát vui.",
        "Tôi hát mỗi ngày ở nhà.",
        "Tôi có thể nhảy khi nghe nhạc.",
        "Tôi nhảy và vui chơi.",
        "Tôi có thể chạy nhanh trong công viên.",
        "Tôi chạy với bạn bè.",
        "Tôi có thể nhảy qua những hộp nhỏ.",
        "Tôi nhảy và cười.",
        "Tôi có thể leo trên sân chơi."
    ]
    
    vi_translations = vi_map_adv if mode == "advanced" else vi_map_easy
    
    items = []
    for i, sent in enumerate(sentences, 1):
        vi = vi_translations[i-1] if i-1 < len(vi_translations) else sent
        line = '    { id: ' + str(i) + ', text: "' + sent + '", meaning: "' + vi + '", audio_url: "/audio/' + folder + '/dictation_' + str(i) + '.mp3" }'
        items.append(line)
    
    joined_items = ',\n'.join(items)
    content = f"""export default {{
  sentences: [
{joined_items}
  ]
}};
"""
    
    path = f"{BASE_ADV}/dictation.js" if mode == "advanced" else f"{BASE_EASY}/dictation.js"
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Created {mode} dictation.js ({len(sentences)} sentences)")
    return len(sentences)

def create_shadowing(mode="advanced"):
    """PHASE 2: Create shadowing.js with same sentences as dictation"""
    sentences = read_sentences_from_read_js(mode)
    
    if mode == "advanced":
        expected_count = 14
        folder = "week12"
        title = "The Talent Show"
    else:
        expected_count = 10
        folder = "week12_easy"
        title = "My Talents"
    
    sentences = sentences[:expected_count]
    
    # Vietnamese translations (same as dictation)
    vi_map_adv = [
        "Tối nay là buổi biểu diễn tài năng của trường!",
        "Nhiều em thể hiện khả năng tuyệt vời.",
        "Sarah có thể hát hay trên sân khấu.",
        "Cô hát một bài hát nổi tiếng và khán giả rất thích.",
        "Tom có thể nhảy đầy năng lượng và phong cách.",
        "Cậu nhảy theo nhạc nhanh với động tác ấn tượng.",
        "Mike có thể chạy nhanh hơn bất kỳ ai trong lớp.",
        "Cậu chạy quanh đường đua với thời gian kỷ lục.",
        "Emma có thể nhảy rất cao qua chướng ngại vật.",
        "Cô nhảy với tư thế hoàn hảo và tiếp đất duyên dáng.",
        "Jack có thể leo tường dốc ở phòng tập leo núi.",
        "Cậu leo lên đỉnh nhanh chóng và vẫy tay chào mọi người.",
        "Lisa có thể vẽ chân dung và phong cảnh chi tiết.",
        "Cô vẽ một bức tranh đẹp cho buổi biểu diễn."
    ]
    
    vi_map_easy = [
        "Tôi có nhiều tài năng!",
        "Tôi có thể hát những bài hát vui.",
        "Tôi hát mỗi ngày ở nhà.",
        "Tôi có thể nhảy khi nghe nhạc.",
        "Tôi nhảy và vui chơi.",
        "Tôi có thể chạy nhanh trong công viên.",
        "Tôi chạy với bạn bè.",
        "Tôi có thể nhảy qua những hộp nhỏ.",
        "Tôi nhảy và cười.",
        "Tôi có thể leo trên sân chơi."
    ]
    
    vi_translations = vi_map_adv if mode == "advanced" else vi_map_easy
    
    items = []
    for i, sent in enumerate(sentences, 1):
        vi = vi_translations[i-1] if i-1 < len(vi_translations) else sent
        line = '    { id: ' + str(i) + ', text: "' + sent + '", vi: "' + vi + '", audio_url: "/audio/' + folder + '/shadowing_' + str(i) + '.mp3" }'
        items.append(line)
    
    joined_items = ',\n'.join(items)
    content = f"""export default {{
  title: "{title}",
  audio_full: "/audio/{folder}/shadowing_full.mp3",
  script: [
{joined_items}
  ]
}};
"""
    
    path = f"{BASE_ADV}/shadowing.js" if mode == "advanced" else f"{BASE_EASY}/shadowing.js"
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Created {mode} shadowing.js ({len(sentences)} sentences)")
    return len(sentences)

def create_vocab(mode="advanced"):
    """PHASE 3: Create vocab.js with 10 target words (SAME between modes)"""
    folder = "week12" if mode == "advanced" else "week12_easy"
    
    # CRITICAL: SAME 10 words in both modes, only examples differ
    vocab_data = {
        "sing": {
            "type": "verb",
            "meaning": "hát",
            "pronunciation": "/sɪŋ/",
            "definition": "to make music with your voice",
            "example_adv": "She sings beautifully at the concert.",
            "example_easy": "I sing happy songs.",
            "collocation": "sing a song, sing loudly, sing beautifully"
        },
        "dance": {
            "type": "verb",
            "meaning": "nhảy",
            "pronunciation": "/dæns/",
            "definition": "to move your body to music",
            "example_adv": "He dances with impressive energy and style.",
            "example_easy": "I dance when I hear music.",
            "collocation": "dance to music, dance gracefully, dance well"
        },
        "run": {
            "type": "verb",
            "meaning": "chạy",
            "pronunciation": "/rʌn/",
            "definition": "to move very fast on foot",
            "example_adv": "She runs faster than anyone in her grade.",
            "example_easy": "I run fast in the park.",
            "collocation": "run fast, run quickly, run a race"
        },
        "jump": {
            "type": "verb",
            "meaning": "nhảy",
            "pronunciation": "/dʒʌmp/",
            "definition": "to push yourself off the ground",
            "example_adv": "He jumps high over the obstacles with perfect form.",
            "example_easy": "I jump over small boxes.",
            "collocation": "jump high, jump over, jump rope"
        },
        "climb": {
            "type": "verb",
            "meaning": "leo",
            "pronunciation": "/klaɪm/",
            "definition": "to go up something using hands and feet",
            "example_adv": "She climbs steep walls at the climbing gym.",
            "example_easy": "I climb on the playground.",
            "collocation": "climb a tree, climb mountains, climb up"
        },
        "ride": {
            "type": "verb",
            "meaning": "đi (xe)",
            "pronunciation": "/raɪd/",
            "definition": "to sit on and control a bike or animal",
            "example_adv": "He rides his skateboard with amazing tricks.",
            "example_easy": "I ride my bike to school.",
            "collocation": "ride a bike, ride a horse, ride well"
        },
        "draw": {
            "type": "verb",
            "meaning": "vẽ",
            "pronunciation": "/drɔː/",
            "definition": "to make pictures with a pen or pencil",
            "example_adv": "She draws detailed portraits and landscapes.",
            "example_easy": "I draw pictures of my family.",
            "collocation": "draw a picture, draw well, draw beautifully"
        },
        "swim": {
            "type": "verb",
            "meaning": "bơi",
            "pronunciation": "/swɪm/",
            "definition": "to move through water",
            "example_adv": "She swims long distances with excellent technique.",
            "example_easy": "I swim in the pool.",
            "collocation": "swim fast, swim well, swim in the ocean"
        },
        "cook": {
            "type": "verb",
            "meaning": "nấu ăn",
            "pronunciation": "/kʊk/",
            "definition": "to prepare food by heating it",
            "example_adv": "He cooks delicious meals with complex recipes.",
            "example_easy": "I cook with my mom.",
            "collocation": "cook dinner, cook well, cook delicious food"
        },
        "play": {
            "type": "verb",
            "meaning": "chơi",
            "pronunciation": "/pleɪ/",
            "definition": "to do something for fun or make music",
            "example_adv": "She plays the piano with passion and skill.",
            "example_easy": "I play games with friends.",
            "collocation": "play music, play games, play the piano"
        }
    }
    
    items = []
    for i, word in enumerate(VOCAB_WORDS, 1):
        data = vocab_data[word]
        example = data["example_easy"] if mode == "easy" else data["example_adv"]
        
        item = f"""  {{
    id: {i},
    word: "{word}",
    pronunciation: "{data['pronunciation']}",
    type: "{data['type']}",
    meaning: "{data['meaning']}",
    definition: "{data['definition']}",
    image_url: "/images/{folder}/vocab_{word}.jpg",
    audio_url: "/audio/{folder}/vocab_{word}.mp3",
    audio_slow_url: "/audio/{folder}/vocab_{word}_slow.mp3",
    sentence_audio_url: "/audio/{folder}/vocab_{word}_sentence.mp3",
    sentence_slow_audio_url: "/audio/{folder}/vocab_{word}_sentence_slow.mp3",
    example: "{example}",
    collocation: "{data['collocation']}"
  }}"""
        items.append(item)
    
    content = f"""export default {{
  words: [
{',\\n'.join(items)}
  ]
}};
"""
    
    path = f"{BASE_ADV}/vocab.js" if mode == "advanced" else f"{BASE_EASY}/vocab.js"
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Created {mode} vocab.js (10 words)")

def create_grammar(mode="advanced"):
    """PHASE 3: Create grammar.js - 20 items (SAME between modes per Validation Table)"""
    folder = "week12" if mode == "advanced" else "week12_easy"
    
    # Grammar focus: "I can / I can't"
    questions = [
        ("Can you sing?", "tôi có thể hát", "Yes, I can sing.", "I can't sing.", "sing"),
        ("Can you dance?", "tôi có thể nhảy", "Yes, I can dance.", "I can't dance.", "dance"),
        ("Can Sarah sing?", "Sarah có thể hát", "Yes, she can sing.", "She can't sing.", "sing"),
        ("Can Tom dance?", "Tom có thể nhảy", "Yes, he can dance.", "He can't dance.", "dance"),
        ("Can you run fast?", "tôi có thể chạy nhanh", "Yes, I can run fast.", "I can't run fast.", "run"),
        ("Can Mike run fast?", "Mike có thể chạy nhanh", "Yes, he can run fast.", "He can't run fast.", "run"),
        ("Can you jump high?", "tôi có thể nhảy cao", "Yes, I can jump high.", "I can't jump high.", "jump"),
        ("Can Emma jump high?", "Emma có thể nhảy cao", "Yes, she can jump high.", "She can't jump high.", "jump"),
        ("Can you climb?", "tôi có thể leo", "Yes, I can climb.", "I can't climb.", "climb"),
        ("Can Jack climb?", "Jack có thể leo", "Yes, he can climb.", "He can't climb.", "climb"),
        ("Can you draw?", "tôi có thể vẽ", "Yes, I can draw.", "I can't draw.", "draw"),
        ("Can Lisa draw well?", "Lisa có thể vẽ giỏi", "Yes, she can draw well.", "She can't draw well.", "draw"),
        ("Can you ride a bike?", "tôi có thể đi xe đạp", "Yes, I can ride a bike.", "I can't ride a bike.", "ride"),
        ("Can Ben ride well?", "Ben có thể đi xe giỏi", "Yes, he can ride well.", "He can't ride well.", "ride"),
        ("Can you swim?", "tôi có thể bơi", "Yes, I can swim.", "I can't swim.", "swim"),
        ("Can Amy swim well?", "Amy có thể bơi giỏi", "Yes, she can swim well.", "She can't swim well.", "swim"),
        ("Can you cook?", "tôi có thể nấu ăn", "Yes, I can cook.", "I can't cook.", "cook"),
        ("Can David cook well?", "David có thể nấu giỏi", "Yes, he can cook well.", "He can't cook well.", "cook"),
        ("Can you play music?", "tôi có thể chơi nhạc", "Yes, I can play music.", "I can't play music.", "play"),
        ("Can Rachel play piano?", "Rachel có thể chơi piano", "Yes, she can play piano.", "She can't play piano.", "play")
    ]
    
    items = []
    for i, (q_en, q_vi, correct, wrong, vocab_word) in enumerate(questions, 1):
        item = f"""  {{
    id: {i},
    question_en: "{q_en}",
    question_vi: "{q_vi}",
    correct_answer: "{correct}",
    wrong_answer: "{wrong}",
    audio_question: "/audio/{folder}/grammar_q{i}.mp3",
    audio_correct: "/audio/{folder}/grammar_a{i}_correct.mp3",
    audio_wrong: "/audio/{folder}/grammar_a{i}_wrong.mp3",
    vocab_related: "{vocab_word}"
  }}"""
        items.append(item)
    
    content = f"""export default {{
  items: [
{',\\n'.join(items)}
  ]
}};
"""
    
    path = f"{BASE_ADV}/grammar.js" if mode == "advanced" else f"{BASE_EASY}/grammar.js"
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Created {mode} grammar.js (20 items)")

def create_logic(mode="advanced"):
    """PHASE 3: Create logic.js - 5 items for Phase 1 (SAME between modes)"""
    folder = "week12" if mode == "advanced" else "week12_easy"
    
    questions = [
        {
            "question": "If Sarah can sing, what can she do at the talent show?",
            "options": ["She can perform a song", "She can ride a bike", "She can cook food", "She can draw pictures"],
            "correct": 0,
            "explanation": "If someone can sing, they can perform a song at a talent show."
        },
        {
            "question": "Tom can dance. Mike can run. Who can move to music?",
            "options": ["Mike", "Tom", "Both of them", "Neither of them"],
            "correct": 1,
            "explanation": "Dancing means moving to music, so Tom can move to music."
        },
        {
            "question": "If you can't swim, where should you NOT go alone?",
            "options": ["The park", "The library", "The pool", "The classroom"],
            "correct": 2,
            "explanation": "If you can't swim, you should not go to the pool alone because it's dangerous."
        },
        {
            "question": "Lisa can draw. What does she need?",
            "options": ["A ball", "Paper and pencils", "A bike", "Water"],
            "correct": 1,
            "explanation": "To draw, you need paper and pencils to make pictures."
        },
        {
            "question": "If everyone has a special talent, what is true?",
            "options": ["Only some children are special", "You have no talents", "You also have a special talent", "Talents are not important"],
            "correct": 2,
            "explanation": "If everyone has a special talent, that means you also have a special talent."
        }
    ]
    
    items = []
    for i, q in enumerate(questions, 1):
        options_str = '", "'.join(q['options'])
        item = f"""  {{
    id: {i},
    question: "{q['question']}",
    options: ["{options_str}"],
    correct: {q['correct']},
    explanation: "{q['explanation']}",
    audio_url: "/audio/{folder}/logic_{i}.mp3"
  }}"""
        items.append(item)
    
    content = f"""export default {{
  items: [
{',\\n'.join(items)}
  ]
}};
"""
    
    path = f"{BASE_ADV}/logic.js" if mode == "advanced" else f"{BASE_EASY}/logic.js"
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Created {mode} logic.js (5 items - Phase 1)")

def create_word_power(mode="advanced"):
    """PHASE 3: Create word_power.js - 3 items for Phase 1 (SAME between modes)"""
    folder = "week12" if mode == "advanced" else "week12_easy"
    
    words = [
        {
            "word": "talent",
            "pronunciation": "/ˈtælənt/",
            "meaning": "tài năng",
            "definition": "a natural ability to do something well",
            "example": "She has a talent for singing.",
            "synonyms": "skill, ability, gift",
            "family": "talented (adj), talentless (adj)"
        },
        {
            "word": "ability",
            "pronunciation": "/əˈbɪləti/",
            "meaning": "khả năng",
            "definition": "the power or skill to do something",
            "example": "He has the ability to run very fast.",
            "synonyms": "capability, capacity, power",
            "family": "able (adj), unable (adj), disable (v)"
        },
        {
            "word": "perform",
            "pronunciation": "/pərˈfɔːrm/",
            "meaning": "biểu diễn",
            "definition": "to do something in front of an audience",
            "example": "They perform at the talent show tonight.",
            "synonyms": "present, show, act",
            "family": "performance (n), performer (n)"
        }
    ]
    
    items = []
    for i, w in enumerate(words, 1):
        item = f"""  {{
    id: {i},
    word: "{w['word']}",
    pronunciation: "{w['pronunciation']}",
    meaning: "{w['meaning']}",
    definition: "{w['definition']}",
    example: "{w['example']}",
    synonyms: "{w['synonyms']}",
    word_family: "{w['family']}",
    image_url: "/images/{folder}/word_power_{w['word']}.jpg",
    audio_url: "/audio/{folder}/word_power_{i}.mp3"
  }}"""
        items.append(item)
    
    content = f"""export default {{
  words: [
{',\\n'.join(items)}
  ]
}};
"""
    
    path = f"{BASE_ADV}/word_power.js" if mode == "advanced" else f"{BASE_EASY}/word_power.js"
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Created {mode} word_power.js (3 items - Phase 1)")

def create_writing(mode="advanced"):
    """PHASE 5: Create writing.js"""
    folder = "week12" if mode == "advanced" else "week12_easy"
    
    if mode == "advanced":
        prompt = "Write about a talent show at your school. Describe what different students can do. Use 'can' to talk about their abilities."
        prompt_vi = "Viết về buổi biểu diễn tài năng ở trường bạn. Mô tả những gì các học sinh khác có thể làm. Sử dụng 'can' để nói về khả năng của họ."
        min_words = 50
    else:
        prompt = "Write about what you can do. What are your talents? Use 'I can...' to tell about your abilities."
        prompt_vi = "Viết về những gì bạn có thể làm. Tài năng của bạn là gì? Sử dụng 'I can...' để kể về khả năng của bạn."
        min_words = 30
    
    content = f"""export default {{
  title: "My Talent Story",
  prompt_en: "{prompt}",
  prompt_vi: "{prompt_vi}",
  min_words: {min_words},
  word_bank: {json.dumps(VOCAB_WORDS)},
  sentence_starters: [
    "I can...",
    "She can...",
    "He can...",
    "At the talent show, students can..."
  ],
  audio_prompt: "/audio/{folder}/writing_prompt.mp3"
}};
"""
    
    path = f"{BASE_ADV}/writing.js" if mode == "advanced" else f"{BASE_EASY}/writing.js"
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Created {mode} writing.js")

def main():
    print("=" * 60)
    print("GENERATING WEEK 12: THE TALENT SHOW")
    print("Following QUICK_REF Production Workflow")
    print("=" * 60)
    
    print("\n📋 PHASE 1: Read & Explore - ALREADY CREATED")
    print("✓ read.js (Advanced & Easy)")
    print("✓ explore.js (Advanced & Easy)")
    
    print("\n📝 PHASE 2: Dictation & Shadowing (100% extraction)")
    adv_dict = create_dictation("advanced")
    easy_dict = create_dictation("easy")
    adv_shad = create_shadowing("advanced")
    easy_shad = create_shadowing("easy")
    
    if adv_dict != 14 or adv_shad != 14:
        print(f"⚠️  WARNING: Advanced should have 14 sentences, got dict={adv_dict}, shad={adv_shad}")
    if easy_dict != 10 or easy_shad != 10:
        print(f"⚠️  WARNING: Easy should have 10 sentences, got dict={easy_dict}, shad={easy_shad}")
    
    print("\n📚 PHASE 3: Vocab/Grammar/Logic/Word Power")
    create_vocab("advanced")
    create_vocab("easy")
    create_grammar("advanced")
    create_grammar("easy")
    create_logic("advanced")
    create_logic("easy")
    create_word_power("advanced")
    create_word_power("easy")
    
    print("\n✍️  PHASE 5: Writing")
    create_writing("advanced")
    create_writing("easy")
    
    print("\n" + "=" * 60)
    print("✅ GENERATION COMPLETE")
    print("=" * 60)
    print("\nNEXT STEPS:")
    print("1. Complete PHASE 4: mindmap, word_match, ask_ai (update week IDs)")
    print("2. Complete PHASE 5: daily_watch.js (5 videos MANDATORY)")
    print("3. Complete PHASE 6: week_12_real.js (AI Tutor)")
    print("4. Run validation: ./tools/validate_content_quality.sh 12")
    print("5. Run validation: ./tools/validate_dual_mode.sh 12")
    print("6. Generate audio: python3 tools/generate_audio_deepgram.py 12 --mode all --upload")

if __name__ == "__main__":
    main()
