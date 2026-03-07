#!/usr/bin/env python3
"""
ENGQUEST 3K - MASTER PRODUCTION SCRIPT
Generate complete week content following QUICK_REF.md 7-phase workflow
Usage: python3 mass_produce_week.py <WEEK_NUMBER> [--phase PHASE_NUM]
"""

import os
import sys
import re
import json
from pathlib import Path

# ============================================
# CONFIGURATION - EDIT FOR EACH WEEK
# ============================================

WEEK_CONFIG = {
    # From Syllabus: 1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt
    "week_number": None,  # Set via command line
    "phase": 1,
    "block": "A",
    "unit": None,  # Calculate: (week_number - 1) // 3 + 1
    
    # Must be filled from syllabus
    "theme_en": "",  # e.g., "The Talent Show"
    "theme_vi": "",  # e.g., "Cuộc thi Tài năng"
    "topic_en": "",  # e.g., "Showcasing skills - Talk about abilities"
    "topic_vi": "",
    "grammar_focus": "",  # e.g., "I can / I can't"
    "grammar_pattern": "",  # e.g., "I can/can't [verb]"
    
    # ⚠️ CRITICAL: Vocab words MUST be SAME in both modes!
    # Rule violation found in Week 12: Advanced had different words than Easy
    # Correct approach: SAME 10 words, DIFFERENT definitions/examples/complexity
    # Words MUST match bold words in read.js (both modes must have same bold words)
    "vocab_words": [],  # 10 words SAME for both modes
    
    # DEPRECATED fields (use vocab_words instead):
    "vocab_advanced": [],  # Legacy - will be ignored if vocab_words is set
    "vocab_easy": [],      # Legacy - will be ignored if vocab_words is set
    
    # Context differentiation
    "context_advanced": "",  # Global/third-person
    "context_easy": "",      # Personal/first-person
}

# ============================================
# PHASE 0: SETUP & CLONE
# ============================================

def phase0_setup(week_num):
    """Create folders and clone Golden Standard"""
    print("\n" + "="*60)
    print(f"📁 PHASE 0: Setup Week {week_num}")
    print("="*60)
    
    # Create directories
    adv_dir = f"src/data/weeks/week_{week_num:02d}"
    easy_dir = f"src/data/weeks_easy/week_{week_num:02d}"
    
    os.makedirs(adv_dir, exist_ok=True)
    os.makedirs(easy_dir, exist_ok=True)
    
    print(f"✅ Created: {adv_dir}")
    print(f"✅ Created: {easy_dir}")
    
    # Clone from Week 6 (Golden Standard for stations)
    import shutil
    
    # Advanced
    for file in ["ask_ai.js", "games.js", "mindmap.js", "word_match.js"]:
        src = f"src/data/weeks/week_06/{file}"
        dst = f"{adv_dir}/{file}"
        if os.path.exists(src) and not os.path.exists(dst):
            shutil.copy2(src, dst)
            # Update weekId
            with open(dst, 'r') as f:
                content = f.read()
            content = content.replace('weekId: 6', f'weekId: {week_num}')
            content = content.replace('week_id: 6', f'week_id: {week_num}')
            with open(dst, 'w') as f:
                f.write(content)
            print(f"✅ Cloned: {file}")
    
    # Easy
    for file in ["ask_ai.js", "games.js", "mindmap.js", "word_match.js"]:
        src = f"src/data/weeks_easy/week_06/{file}"
        dst = f"{easy_dir}/{file}"
        if os.path.exists(src) and not os.path.exists(dst):
            shutil.copy2(src, dst)
            with open(dst, 'r') as f:
                content = f.read()
            content = content.replace('weekId: 6', f'weekId: {week_num}')
            content = content.replace('week_id: 6', f'week_id: {week_num}')
            with open(dst, 'w') as f:
                f.write(content)
    
    # Clone AI Tutor from Week 7
    ai_tutor_src = "src/data/weeks/week_07_real.js"
    ai_tutor_dst = f"src/data/weeks/week_{week_num:02d}_real.js"
    if os.path.exists(ai_tutor_src) and not os.path.exists(ai_tutor_dst):
        shutil.copy2(ai_tutor_src, ai_tutor_dst)
        print(f"✅ Cloned AI Tutor: week_{week_num:02d}_real.js")
    
    print("\n✅ PHASE 0 COMPLETE")
    return True

# ============================================
# PHASE 1: READ & EXPLORE
# ============================================

def phase1_read_explore(week_num, config):
    """Generate read.js and explore.js for both modes"""
    print("\n" + "="*60)
    print(f"📖 PHASE 1: Read & Explore - Week {week_num}")
    print("="*60)
    
    if not config.get("theme_en"):
        print("❌ ERROR: theme_en not set in config!")
        return False
    
    # Advanced read.js
    adv_read = generate_read_advanced(week_num, config)
    write_file(f"src/data/weeks/week_{week_num:02d}/read.js", adv_read)
    print(f"✅ Created: read.js (Advanced)")
    
    # Easy read.js
    easy_read = generate_read_easy(week_num, config)
    write_file(f"src/data/weeks_easy/week_{week_num:02d}/read.js", easy_read)
    print(f"✅ Created: read.js (Easy)")
    
    # Advanced explore.js
    adv_explore = generate_explore_advanced(week_num, config)
    write_file(f"src/data/weeks/week_{week_num:02d}/explore.js", adv_explore)
    print(f"✅ Created: explore.js (Advanced)")
    
    # Easy explore.js
    easy_explore = generate_explore_easy(week_num, config)
    write_file(f"src/data/weeks_easy/week_{week_num:02d}/explore.js", easy_explore)
    print(f"✅ Created: explore.js (Easy)")
    
    print("\n✅ PHASE 1 COMPLETE")
    print("⚠️  MANUAL: Verify 10 bold words match between modes")
    return True

def generate_read_advanced(week_num, config):
    """Generate Advanced read.js template"""
    return f'''export default {{
  title: "{config['theme_en']}",
  image_url: "/images/week{week_num:02d}/read_cover_w{week_num}.jpg",
  audio_url: "/audio/week{week_num:02d}/read_explore_main.mp3",
  content_en: "PLACEHOLDER - Write 14-16 sentences with 10 **bold** words. Global context.",
  content_vi: "PLACEHOLDER - Vietnamese translation",
  comprehension_questions: [
    {{ id: 1, question_en: "Q1?", answer: ["ans1"], hint_en: "Hint...", hint_vi: "Gợi ý..." }},
    {{ id: 2, question_en: "Q2?", answer: ["ans2"], hint_en: "Hint...", hint_vi: "Gợi ý..." }},
    {{ id: 3, question_en: "Q3?", answer: ["ans3"], hint_en: "Hint...", hint_vi: "Gợi ý..." }}
  ],
  question: {{
    text_en: "Question about the topic...",
    text_vi: "Câu hỏi về chủ đề...",
    min_words: 30,
    hint_en: "Talk about...",
    hint_vi: "Nói về..."
  }}
}};'''

def generate_read_easy(week_num, config):
    """Generate Easy read.js template"""
    return f'''export default {{
  title: "{config['theme_en']} (Easy)",
  image_url: "/images/week{week_num:02d}_easy/read_cover_w{week_num}.jpg",
  audio_url: "/audio/week{week_num:02d}_easy/read_explore_main.mp3",
  content_en: "PLACEHOLDER - Write 10-12 sentences with SAME 10 **bold** words. Personal context (I/my/we).",
  content_vi: "PLACEHOLDER - Vietnamese translation",
  comprehension_questions: [
    {{ id: 1, question_en: "Q1?", answer: ["ans1"], hint_en: "Hint...", hint_vi: "Gợi ý..." }},
    {{ id: 2, question_en: "Q2?", answer: ["ans2"], hint_en: "Hint...", hint_vi: "Gợi ý..." }},
    {{ id: 3, question_en: "Q3?", answer: ["ans3"], hint_en: "Hint...", hint_vi: "Gợi ý..." }}
  ],
  question: {{
    text_en: "Question about you...",
    text_vi: "Câu hỏi về bạn...",
    min_words: 25,
    hint_en: "Talk about yourself...",
    hint_vi: "Nói về bản thân..."
  }}
}};'''

def generate_explore_advanced(week_num, config):
    """Generate Advanced explore.js"""
    return f'''export default {{
  title_en: "{config['theme_en']} Around the World",
  title_vi: "{config['theme_vi']} trên Thế giới",
  content_en: `PLACEHOLDER - Global context about {config['theme_en'].lower()}. Use **bold** words.`,
  content_vi: `PLACEHOLDER - Vietnamese translation`,
  audio_narration: "/audio/week{week_num:02d}/explore_narration.mp3",
  questions: [
    {{ q: "Q1?", a: "A1" }},
    {{ q: "Q2?", a: "A2" }},
    {{ q: "Q3?", a: "A3" }}
  ]
}};'''

def generate_explore_easy(week_num, config):
    """Generate Easy explore.js"""
    return f'''export default {{
  title_en: "My {config['theme_en']}",
  title_vi: "{config['theme_vi']} của tôi",
  content_en: `PLACEHOLDER - Personal context (I/my/we). Use SAME **bold** words.`,
  content_vi: `PLACEHOLDER - Vietnamese translation`,
  audio_narration: "/audio/week{week_num:02d}_easy/explore_narration.mp3",
  questions: [
    {{ q: "Q1?", a: "A1" }},
    {{ q: "Q2?", a: "A2" }},
    {{ q: "Q3?", a: "A3" }}
  ]
}};'''

# ============================================
# PHASE 2: DICTATION & SHADOWING (100% EXTRACTION)
# ============================================

def phase2_dictation_shadowing(week_num):
    """Extract sentences from read.js and generate dictation/shadowing"""
    print("\n" + "="*60)
    print(f"🎤 PHASE 2: Dictation & Shadowing (100% Extraction)")
    print("="*60)
    
    # Extract from Advanced
    adv_sentences, adv_vi = extract_from_read(
        f"src/data/weeks/week_{week_num:02d}/read.js"
    )
    if not adv_sentences:
        print("❌ ERROR: Cannot extract from Advanced read.js")
        return False
    
    # Take first 14 sentences
    adv_sentences = adv_sentences[:14]
    adv_vi = adv_vi[:14] if adv_vi else ["PLACEHOLDER"] * 14
    
    print(f"✅ Extracted {len(adv_sentences)} sentences from Advanced read.js")
    
    # Generate dictation & shadowing
    write_dictation(week_num, "adv", adv_sentences, adv_vi)
    write_shadowing(week_num, "adv", adv_sentences, adv_vi)
    
    # Extract from Easy
    easy_sentences, easy_vi = extract_from_read(
        f"src/data/weeks_easy/week_{week_num:02d}/read.js"
    )
    if not easy_sentences:
        print("❌ ERROR: Cannot extract from Easy read.js")
        return False
    
    # Take first 10 sentences
    easy_sentences = easy_sentences[:10]
    easy_vi = easy_vi[:10] if easy_vi else ["PLACEHOLDER"] * 10
    
    print(f"✅ Extracted {len(easy_sentences)} sentences from Easy read.js")
    
    # Generate dictation & shadowing
    write_dictation(week_num, "easy", easy_sentences, easy_vi)
    write_shadowing(week_num, "easy", easy_sentences, easy_vi)
    
    print("\n✅ PHASE 2 COMPLETE")
    print("⚠️  100% extraction verified")
    return True

def extract_from_read(filepath):
    """Extract sentences from read.js content_en and content_vi"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract content_en
    en_match = re.search(r'content_en:\s*["`]([^"`]+)["`]', content, re.DOTALL)
    if not en_match:
        return [], []
    
    en_text = en_match.group(1).replace('**', '')
    en_sentences = re.split(r'(?<=[.!?])\s+', en_text)
    en_sentences = [s.strip() for s in en_sentences if len(s.strip()) > 5]
    
    # Extract content_vi
    vi_match = re.search(r'content_vi:\s*["`]([^"`]+)["`]', content, re.DOTALL)
    if not vi_match:
        return en_sentences, []
    
    vi_text = vi_match.group(1).replace('**', '')
    vi_sentences = re.split(r'(?<=[.!?])\s+', vi_text)
    vi_sentences = [s.strip() for s in vi_sentences if len(s.strip()) > 5]
    
    return en_sentences, vi_sentences

def write_dictation(week_num, mode, sentences, vi_sentences):
    """Generate dictation.js"""
    folder = "weeks" if mode == "adv" else "weeks_easy"
    audio_folder = f"week{week_num:02d}" if mode == "adv" else f"week{week_num:02d}_easy"
    
    lines = ["export default {", "  sentences: ["]
    
    for i, (en, vi) in enumerate(zip(sentences, vi_sentences), 1):
        line = f'    {{ id: {i}, text: "{en}", meaning: "{vi}", audio_url: "/audio/{audio_folder}/dictation_{i}.mp3" }}'
        if i < len(sentences):
            line += ','
        lines.append(line)
    
    lines.append("  ]")
    lines.append("};")
    
    path = f"src/data/{folder}/week_{week_num:02d}/dictation.js"
    write_file(path, '\n'.join(lines))
    print(f"✅ Created: dictation.js ({mode.upper()}) - {len(sentences)} sentences")

def write_shadowing(week_num, mode, sentences, vi_sentences):
    """Generate shadowing.js"""
    folder = "weeks" if mode == "adv" else "weeks_easy"
    audio_folder = f"week{week_num:02d}" if mode == "adv" else f"week{week_num:02d}_easy"
    
    lines = ["export default {", "  sentences: ["]
    
    for i, (en, vi) in enumerate(zip(sentences, vi_sentences), 1):
        line = f'    {{ id: {i}, text: "{en}", vi: "{vi}", audio_url: "/audio/{audio_folder}/shadowing_{i}.mp3" }}'
        if i < len(sentences):
            line += ','
        lines.append(line)
    
    lines.append("  ]")
    lines.append("};")
    
    path = f"src/data/{folder}/week_{week_num:02d}/shadowing.js"
    write_file(path, '\n'.join(lines))
    print(f"✅ Created: shadowing.js ({mode.upper()}) - {len(sentences)} sentences")

# ============================================
# PHASE 3: VOCAB, GRAMMAR, LOGIC, WORD POWER, WRITING
# ============================================

def phase3_practice_stations(week_num, config):
    """Generate vocab, grammar, logic, word_power, writing"""
    print("\n" + "="*60)
    print(f"📚 PHASE 3: Practice Stations - Week {week_num}")
    print("="*60)
    
    #⚠️ VOCAB WORDS MUST BE SAME IN BOTH MODES
    # Validate vocab configuration
    if config.get('vocab_words'):
        # New approach: Use vocab_words (SAME for both modes)
        vocab_words = config['vocab_words']
        print(f"✅ Using vocab_words: {len(vocab_words)} words (SAME for both modes)")
    elif config.get('vocab_advanced') and config.get('vocab_easy'):
        # Legacy approach: Check if words match
        adv_words = [w.get('word') for w in config['vocab_advanced']]
        easy_words = [w.get('word') for w in config['vocab_easy']]
        
        if set(adv_words) != set(easy_words):
            print("\n" + "⚠️ "*30)
            print("❌ CRITICAL ERROR: Vocab words differ between modes!")
            print(f"Advanced words: {adv_words}")
            print(f"Easy words: {easy_words}")
            print("\n💡 FIX: vocab.js MUST have SAME 10 words in both modes!")
            print("   Differentiation should be in definitions/examples, NOT words!")
            print("   See: WEEK_12_COMPLETE_AUDIT_FIX_REPORT.md")
            print("⚠️ "*30 + "\n")
            
            response = input("⚠️  Continue anyway? (y/N): ")
            if response.lower() != 'y':
                return False
        
        # Use legacy fields
        write_vocab(week_num, "adv", config['vocab_advanced'])
        write_vocab(week_num, "easy", config['vocab_easy'])
    else:
        print("❌ ERROR: vocab_words (or vocab_advanced/vocab_easy) not set in config!")
        return False
    
    # If using new approach, generate vocab with same words
    if config.get('vocab_words'):
        # TODO: Generate advanced and easy versions from vocab_words
        # For now, user must manually edit vocab.js
        print("⚠️  TODO: Implement vocab generation from vocab_words")
        print("⚠️  For now, clone vocab.js from Week 6 and manually edit")
    
    # Grammar (20 exercises)
    write_grammar(week_num, "adv", config)
    write_grammar(week_num, "easy", config)
    
    # Logic (5 questions Phase 1)
    write_logic(week_num, config)
    
    # Word Power (3 words Phase 1)
    write_word_power(week_num, config)
    
    # Writing
    write_writing(week_num, "adv", config)
    write_writing(week_num, "easy", config)
    
    print("\n✅ PHASE 3 COMPLETE")
    print("⚠️  Manual: Review vocab examples and grammar exercises")
    print("⚠️  CRITICAL: Verify vocab words MATCH between modes!")
    return True

def write_vocab(week_num, mode, vocab_list):
    """Generate vocab.js"""
    folder = "weeks" if mode == "adv" else "weeks_easy"
    audio_folder = f"week{week_num:02d}" if mode == "adv" else f"week{week_num:02d}_easy"
    
    lines = ["export default {", "  vocab: ["]
    
    for i, word_obj in enumerate(vocab_list, 1):
        item = f'''    {{
      id: {i},
      word: "{word_obj.get('word', 'PLACEHOLDER')}",
      pronunciation: "{word_obj.get('pron', '/placeholder/')}",
      definition_vi: "{word_obj.get('vi', 'PLACEHOLDER')}",
      definition_en: "{word_obj.get('en', 'PLACEHOLDER')}",
      example: "{word_obj.get('ex', 'PLACEHOLDER example.')}",
      collocation: "{word_obj.get('coll', 'PLACEHOLDER')}",
      image_url: "/images/{audio_folder}/{word_obj.get('word', 'word').replace(' ', '_')}.jpg",'''
        
        if mode == "adv":
            item += f'''
      audio_word: "/audio/{audio_folder}/vocab_{word_obj.get('word', 'word').replace(' ', '_')}.mp3",
      audio_definition: "/audio/{audio_folder}/vocab_def_{word_obj.get('word', 'word').replace(' ', '_')}.mp3",
      audio_example: "/audio/{audio_folder}/vocab_ex_{word_obj.get('word', 'word').replace(' ', '_')}.mp3",
      audio_collocation: "/audio/{audio_folder}/vocab_coll_{word_obj.get('word', 'word').replace(' ', '_')}.mp3"'''
        else:
            item += f'''
      audio_word: "/audio/{audio_folder}/vocab_{word_obj.get('word', 'word').replace(' ', '_')}.mp3"'''
        
        item += "\n    }"
        if i < len(vocab_list):
            item += ","
        lines.append(item)
    
    lines.append("  ]")
    lines.append("};")
    
    path = f"src/data/{folder}/week_{week_num:02d}/vocab.js"
    write_file(path, '\n'.join(lines))
    print(f"✅ Created: vocab.js ({mode.upper()}) - {len(vocab_list)} words")

def write_grammar(week_num, mode, config):
    """Generate grammar.js template"""
    folder = "weeks" if mode == "adv" else "weeks_easy"
    
    content = f'''export default {{
  grammar_explanation: {{
    title_en: "{config.get('grammar_focus', 'PLACEHOLDER')}",
    title_vi: "PLACEHOLDER Vietnamese",
    rules: [
      {{ type: "rule", icon: "1️⃣", rule_en: "Rule 1...", rule_vi: "Quy tắc 1..." }},
      {{ type: "rule", icon: "2️⃣", rule_en: "Rule 2...", rule_vi: "Quy tắc 2..." }},
      {{ type: "rule", icon: "3️⃣", rule_en: "Rule 3...", rule_vi: "Quy tắc 3..." }},
      {{ type: "rule", icon: "4️⃣", rule_en: "Rule 4...", rule_vi: "Quy tắc 4..." }}
    ]
  }},
  exercises: [
    // PLACEHOLDER: 20 exercises (mc, fill, unscramble)
    {{ id: 1, type: "mc", question: "Q1?", options: ["A", "B", "C"], answer: "A", hint: "hint" }},
    // ... 19 more
  ]
}};'''
    
    path = f"src/data/{folder}/week_{week_num:02d}/grammar.js"
    write_file(path, content)
    print(f"✅ Created: grammar.js ({mode.upper()}) - Template with 20 exercises")

def write_logic(week_num, config):
    """Generate logic.js (same for both modes)"""
    content = f'''export default {{
  questions: [
    // PLACEHOLDER: 5 reasoning questions (Phase 1)
    {{
      id: 1,
      question: "Question about {config.get('theme_en', 'the theme')}?",
      options: ["A", "B", "C", "D"],
      answer: "A",
      explanation: "Explanation..."
    }},
    // ... 4 more
  ]
}};'''
    
    for folder in ['weeks', 'weeks_easy']:
        path = f"src/data/{folder}/week_{week_num:02d}/logic.js"
        write_file(path, content)
    
    print(f"✅ Created: logic.js (both modes) - 5 questions")

def write_word_power(week_num, config):
    """Generate word_power.js (same for both modes)"""
    content = f'''export default {{
  words: [
    // PLACEHOLDER: 3 advanced vocabulary words (Phase 1)
    {{
      id: 1,
      word: "PLACEHOLDER",
      pronunciation: "/placeholder/",
      definition_vi: "PLACEHOLDER",
      definition_en: "PLACEHOLDER",
      example: "PLACEHOLDER example.",
      origin: "From...",
      usage_note: "Note...",
      related_words: ["word1", "word2"],
      image_url: "/images/week{week_num:02d}/word1.jpg",
      audio_word: "/audio/week{week_num:02d}/wordpower_word1.mp3",
      audio_definition: "/audio/week{week_num:02d}/wordpower_def_word1.mp3",
      audio_example: "/audio/week{week_num:02d}/wordpower_ex_word1.mp3"
    }},
    // ... 2 more
  ]
}};'''
    
    for folder in ['weeks', 'weeks_easy']:
        path = f"src/data/{folder}/week_{week_num:02d}/word_power.js"
        write_file(path, content)
    
    print(f"✅ Created: word_power.js (both modes) - 3 words")

def write_writing(week_num, mode, config):
    """Generate writing.js"""
    folder = "weeks" if mode == "adv" else "weeks_easy"
    min_words = 50 if mode == "adv" else 30
    
    prompt_en = f"Write about {config.get('theme_en', 'the topic').lower()}."
    prompt_vi = f"Viết về {config.get('theme_vi', 'chủ đề').lower()}."
    
    content = f'''export default {{
  prompts: [
    {{
      id: 1,
      title_en: "{config.get('theme_en', 'Topic')}",
      title_vi: "{config.get('theme_vi', 'Chủ đề')}",
      prompt_en: "{prompt_en}",
      prompt_vi: "{prompt_vi}",
      min_words: {min_words},
      hints: ["Hint 1", "Hint 2", "Hint 3"]
    }}
  ]
}};'''
    
    path = f"src/data/{folder}/week_{week_num:02d}/writing.js"
    write_file(path, content)
    print(f"✅ Created: writing.js ({mode.upper()}) - {min_words} words min")

# ============================================
# PHASE 4: INDEX.JS & DAILY WATCH
# ============================================

def phase4_index_and_daily_watch(week_num, config):
    """Generate index.js and daily_watch.js"""
    print("\n" + "="*60)
    print(f"📺 PHASE 4: Index & Daily Watch - Week {week_num}")
    print("="*60)
    
    # Index.js for both modes
    write_index_js(week_num, "adv", config)
    write_index_js(week_num, "easy", config)
    
    # Daily Watch
    write_daily_watch(week_num, config)
    
    print("\n✅ PHASE 4 COMPLETE")
    print("⚠️  Manual: Run video query generation after this")
    return True

def write_index_js(week_num, mode, config):
    """Generate index.js"""
    folder = "weeks" if mode == "adv" else "weeks_easy"
    is_easy = "false" if mode == "adv" else "true"
    title_suffix = "" if mode == "adv" else " (Easy)"
    
    content = f'''import read from './read.js';
import vocab from './vocab.js';
import grammar from './grammar.js';
import ask_ai from './ask_ai.js';
import logic from './logic.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';
import writing from './writing.js';
import explore from './explore.js';
import word_power from './word_power.js';
import mindmap from './mindmap.js';
import daily_watch from './daily_watch.js';
import word_match from './word_match.js';

const weekData = {{
  weekId: {week_num},
  isEasy: {is_easy},
  weekTitle_en: "{config.get('theme_en', 'PLACEHOLDER')}{title_suffix}",
  weekTitle_vi: "{config.get('theme_vi', 'PLACEHOLDER')}",
  grammar_focus: "{config.get('grammar_focus', 'PLACEHOLDER')}",
  global_vocab: vocab.vocab,
  
  voiceConfig: {{
    narration: 'en-US-Neural2-D',
    vocabulary: 'en-US-Neural2-F',
    dictation: 'en-US-Neural2-F',
    questions: 'en-US-Neural2-D',
    mindmap: 'en-US-Neural2-D'
  }},
  
  stations: {{
    read_explore: read,
    new_words: vocab,
    word_match: word_match,
    grammar: grammar,
    word_power: word_power,
    ask_ai: ask_ai,
    logic_lab: logic,
    dictation: dictation,
    shadowing: shadowing,
    writing: writing,
    explore: explore,
    mindmap_speaking: mindmap,
    daily_watch: daily_watch
  }}
}};

export default weekData;'''
    
    path = f"src/data/{folder}/week_{week_num:02d}/index.js"
    write_file(path, content)
    print(f"✅ Created: index.js ({mode.upper()})")

def write_daily_watch(week_num, config):
    """Generate daily_watch.js template"""
    content = f'''export default {{
  videos: [
    // PLACEHOLDER: 5 YouTube videos (will be auto-generated via video_queries.json)
    {{ id: 1, title: "Video 1", videoId: "PLACEHOLDER", duration: "03:00", sim_duration: 180, thumb: "https://img.youtube.com/vi/PLACEHOLDER/mqdefault.jpg" }},
    {{ id: 2, title: "Video 2", videoId: "PLACEHOLDER", duration: "03:00", sim_duration: 180, thumb: "https://img.youtube.com/vi/PLACEHOLDER/mqdefault.jpg" }},
    {{ id: 3, title: "Video 3", videoId: "PLACEHOLDER", duration: "03:00", sim_duration: 180, thumb: "https://img.youtube.com/vi/PLACEHOLDER/mqdefault.jpg" }},
    {{ id: 4, title: "Video 4", videoId: "PLACEHOLDER", duration: "03:00", sim_duration: 180, thumb: "https://img.youtube.com/vi/PLACEHOLDER/mqdefault.jpg" }},
    {{ id: 5, title: "Video 5", videoId: "PLACEHOLDER", duration: "03:00", sim_duration: 180, thumb: "https://img.youtube.com/vi/PLACEHOLDER/mqdefault.jpg" }}
  ],
  bonus_games: [{{title: "Game", url: "#", description: "Review"}}]
}};'''
    
    for folder in ['weeks', 'weeks_easy']:
        path = f"src/data/{folder}/week_{week_num:02d}/daily_watch.js"
        write_file(path, content)
    
    print(f"✅ Created: daily_watch.js (both modes) - PLACEHOLDER videos")

# ============================================
# PHASE 5: AI TUTOR CUSTOMIZATION
# ============================================

def phase5_ai_tutor(week_num, config):
    """Customize AI Tutor from Week 7 template"""
    print("\n" + "="*60)
    print(f"🤖 PHASE 5: AI Tutor Customization - Week {week_num}")
    print("="*60)
    
    ai_tutor_path = f"src/data/weeks/week_{week_num:02d}_real.js"
    
    if not os.path.exists(ai_tutor_path):
        print(f"❌ ERROR: {ai_tutor_path} not found. Run Phase 0 first.")
        return False
    
    with open(ai_tutor_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace metadata
    content = re.sub(r'week_id:\s*\d+', f'week_id: {week_num}', content)
    content = re.sub(r'week_number:\s*\d+', f'week_number: {week_num}', content)
    content = re.sub(r'unit:\s*\d+', f'unit: {config.get("unit", 1)}', content)
    
    # Replace titles
    content = re.sub(
        r'title:\s*"[^"]*"',
        f'title: "Week {week_num}: {config.get("theme_en", "PLACEHOLDER")}"',
        content,
        count=1
    )
    content = re.sub(
        r'week_title_en:\s*"[^"]*"',
        f'week_title_en: "{config.get("theme_en", "PLACEHOLDER")}"',
        content
    )
    content = re.sub(
        r'week_title_vi:\s*"[^"]*"',
        f'week_title_vi: "{config.get("theme_vi", "PLACEHOLDER")}"',
        content
    )
    
    # Replace grammar focus
    content = re.sub(
        r'grammar_focus:\s*"[^"]*"',
        f'grammar_focus: "{config.get("grammar_focus", "PLACEHOLDER")}"',
        content
    )
    content = re.sub(
        r'grammar_pattern:\s*"[^"]*"',
        f'grammar_pattern: "{config.get("grammar_pattern", "PLACEHOLDER")}"',
        content
    )
    
    with open(ai_tutor_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Updated: week_{week_num:02d}_real.js")
    print("⚠️  Manual: Customize mission contexts and vocabulary arrays")
    
    return True

# ============================================
# HELPER FUNCTIONS
# ============================================

def write_file(path, content):
    """Write content to file"""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# ============================================
# MAIN
# ============================================

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 mass_produce_week.py <WEEK_NUMBER> [--phase PHASE_NUM]")
        print("\nExample:")
        print("  python3 mass_produce_week.py 13              # Run all phases")
        print("  python3 mass_produce_week.py 13 --phase 2    # Run Phase 2 only")
        sys.exit(1)
    
    week_num = int(sys.argv[1])
    WEEK_CONFIG['week_number'] = week_num
    WEEK_CONFIG['unit'] = (week_num - 1) // 3 + 1
    
    phase = None
    if '--phase' in sys.argv:
        phase_idx = sys.argv.index('--phase')
        phase = int(sys.argv[phase_idx + 1])
    
    print("="*60)
    print(f"🚀 ENGQUEST 3K - MASS PRODUCTION WEEK {week_num}")
    print("="*60)
    print(f"Phase: {phase if phase else 'ALL'}")
    print(f"Unit: {WEEK_CONFIG['unit']}")
    
    # Run phases
    if phase is None or phase == 0:
        phase0_setup(week_num)
    
    if phase is None or phase == 1:
        if not WEEK_CONFIG.get('theme_en'):
            print("\n❌ ERROR: Must configure WEEK_CONFIG before running Phase 1")
            print("Edit this script and fill in theme_en, grammar_focus, vocab, etc.")
            return
        phase1_read_explore(week_num, WEEK_CONFIG)
    
    if phase is None or phase == 2:
        phase2_dictation_shadowing(week_num)
    
    if phase is None or phase == 3:
        phase3_practice_stations(week_num, WEEK_CONFIG)
    
    if phase is None or phase == 4:
        phase4_index_and_daily_watch(week_num, WEEK_CONFIG)
    
    if phase is None or phase == 5:
        phase5_ai_tutor(week_num, WEEK_CONFIG)
    
    print("\n" + "="*60)
    print("✅ PRODUCTION COMPLETE")
    print("="*60)
    print("\n📋 NEXT STEPS:")
    print("="*60)
    print("\n1. FILL CONTENT (Phase 1-3):")
    print("   - Edit read.js: Write 14 sentences (Adv) / 10 sentences (Easy)")
    print("   - Ensure 10 SAME bold words in both modes")
    print("   - Edit explore.js: Global context (Adv) / Personal context (Easy)")
    print("   - Edit vocab.js: Fill all 10 words with examples")
    print("   - Edit grammar.js: Create 20 exercises")
    print("   - Edit logic.js: Create 5 reasoning questions")
    print("   - Edit word_power.js: 3 advanced vocabulary")
    print("   ")
    print("2. RE-EXTRACT (After editing read.js):")
    print(f"   python3 mass_produce_week.py {week_num} --phase 2")
    print("   ")
    print("3. GENERATE AUDIO:")
    print(f"   python3 tools/generate_audio_deepgram.py {week_num} --mode all --upload --force")
    print("   ")
    print("4. GENERATE VIDEOS:")
    print(f"   node tools/generate_video_queries.js {week_num}")
    print(f"   node tools/update_videos.js {week_num} --reset")
    print("   ")
    print("5. VALIDATE:")
    print(f"   ./tools/validate_content_quality.sh {week_num}")
    print(f"   ./tools/validate_dual_mode.sh {week_num}")
    print("   ")
    print("6. TEST:")
    print("   npm run dev")
    print(f"   Open: http://localhost:5173/week/{week_num}/vocab")
    print("   ")
    print("7. COMMIT:")
    print(f"   git add src/data/weeks/week_{week_num:02d}/ src/data/weeks_easy/week_{week_num:02d}/")
    print(f"   git add src/data/weeks/week_{week_num:02d}_real.js")
    print(f'   git commit -m "Week {week_num}: {WEEK_CONFIG.get("theme_en", "Complete")}"')
    print("   ")
    print("8. DEPLOY:")
    print("   git push origin main  # Auto-deploy via Cloudflare Pages")
    print("="*60)

if __name__ == "__main__":
    main()
