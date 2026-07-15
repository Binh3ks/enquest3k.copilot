#!/usr/bin/env python3
"""Comprehensive audit of W28-31 content vs syllabus requirements."""
import json, os, re

SYLLABUS = {
    28: {
        "title": "Story Retell - The Tortoise and the Hare",
        "grammar": "Past Simple: Irregular Verbs in context (ran, slept, won)",
        "vocab": ["fast", "slow", "race", "sleep", "win", "lose"],
        "cambridge": "YLE Starters → Movers",
        "skill": "Oral Narrative",
    },
    29: {
        "title": "The Magic Trip (Irregular Verbs 1: Movement)",
        "grammar": "Go→Went, Come→Came, Run→Ran, Fly→Flew",
        "vocab": ["trip", "holiday", "beach", "mountain", "airplane", "car"],
        "cambridge": "YLE Movers",
        "skill": "Irregular verbs correctly",
    },
    30: {
        "title": "The Picnic (Irregular Verbs 2: Consumption)",
        "grammar": "Eat→Ate, Drink→Drank, Buy→Bought, Give→Gave",
        "vocab": ["picnic", "basket", "apple", "juice", "sandwich", "share"],
        "cambridge": "YLE Movers",
        "skill": "Describe what was eaten/drunk",
    },
    31: {
        "title": "The Senses (Irregular Verbs 3: Perception)",
        "grammar": "See→Saw, Hear→Heard, Feel→Felt, Smell→Smelt",
        "vocab": ["bird", "song", "soft", "hard", "loud", "beautiful"],
        "cambridge": "YLE Movers",
        "skill": "Describe sensory experiences in past",
    },
}

EXPECTED_FILES = ['vocab.js', 'grammar.js', 'read.js', 'writing.js', 'dictation.js',
                  'shadowing.js', 'word_match.js', 'games.js', 'logic.js', 'explore.js', 'ask_ai.js']

def get_vocab_words(week_num):
    path = f"src/data/weeks/week_{week_num}/vocab.js"
    if not os.path.exists(path):
        return []
    content = open(path).read()
    return re.findall(r'word:\s*"([^"]+)"', content)

def get_vocab_words_easy(week_num):
    path = f"src/data/weeks_easy/week_{week_num}/vocab.js"
    if not os.path.exists(path):
        return []
    content = open(path).read()
    return re.findall(r'word:\s*"([^"]+)"', content)

def get_grammar_title(week_num):
    path = f"src/data/weeks/week_{week_num}/grammar.js"
    if not os.path.exists(path):
        return "NOT FOUND"
    content = open(path).read()
    m = re.search(r'title_en:\s*"([^"]+)"', content)
    return m.group(1) if m else "no title_en found"

def check_cambridge_vocab_in_grammar(week_num):
    path = f"src/data/weeks/week_{week_num}/grammar.js"
    if not os.path.exists(path):
        return []
    content = open(path).read()
    return re.findall(r'Cambridge[^".\n]*', content)[:5]

def check_lesson_plan(week_num):
    lp_path = f"public/data/lessons/W{week_num}.json"
    if not os.path.exists(lp_path):
        return {"error": "NOT FOUND"}
    
    lp = json.load(open(lp_path))
    sessions = lp.get('sessions', [])
    result = {
        "session_count": len(sessions),
        "top_keys": list(lp.keys()),
        "sessions_2_exists": "sessions_2" in lp,
        "sessions_5_exists": "sessions_5" in lp,
        "teacher_contents_keys": [],
        "reading_passages": [],
    }
    
    # Teacher contents keys
    tc = lp.get('teacher_contents', [])
    if tc and isinstance(tc, list):
        result["teacher_contents_keys"] = list(tc[0].keys()) if tc else []
    
    # Reading passages status per session
    for i, s in enumerate(sessions):
        for p in s.get('parts', []):
            if 'READING INPUT' in p.get('title', '').upper():
                BASE = 'READING INPUT'
                ai = p['title'].upper().find(BASE) + len(BASE)
                rest = p['title'][ai:].strip()
                has = len(rest) > 50
                result["reading_passages"].append({
                    "session": i+1,
                    "chars": len(rest),
                    "ok": has,
                    "preview": rest[:60],
                })
    
    # Check vocab integration in lesson plan parts
    vocab_parts = []
    for i, s in enumerate(sessions):
        for p in s.get('parts', []):
            title = p.get('title', '')
            if 'VOCAB' in title.upper() or 'VOCABULARY' in title.upper():
                vocab_parts.append(f"S{i+1}: {title[:60]}")
    result["vocab_in_lesson_plan"] = vocab_parts
    
    # Check grammar integration
    grammar_parts = []
    for i, s in enumerate(sessions):
        for p in s.get('parts', []):
            title = p.get('title', '')
            if 'GRAMMAR' in title.upper():
                grammar_parts.append(f"S{i+1}: {title[:60]}")
    result["grammar_in_lesson_plan"] = grammar_parts
    
    # Count total parts per session
    result["parts_per_session"] = [len(s.get('parts', [])) for s in sessions]
    
    return result

for week_num in [28, 29, 30, 31]:
    syl = SYLLABUS[week_num]
    print(f"\n{'='*65}")
    print(f"  WEEK {week_num}: {syl['title']}")
    print(f"  Cambridge: {syl['cambridge']}")
    print(f"{'='*65}")
    
    # Files check
    base = f"src/data/weeks/week_{week_num}"
    base_easy = f"src/data/weeks_easy/week_{week_num}"
    present = [f for f in EXPECTED_FILES if os.path.exists(f"{base}/{f}")]
    missing = [f for f in EXPECTED_FILES if not os.path.exists(f"{base}/{f}")]
    easy_present = [f for f in EXPECTED_FILES if os.path.exists(f"{base_easy}/{f}")]
    
    print(f"\n[FILES - Advanced Mode] {len(present)}/{len(EXPECTED_FILES)}")
    if missing:
        print(f"  ❌ Missing: {', '.join(missing)}")
    else:
        print(f"  ✅ All {len(EXPECTED_FILES)} files present")
    print(f"[FILES - Easy Mode] {len(easy_present)}/{len(EXPECTED_FILES)}")
    
    # Vocab check
    words = get_vocab_words(week_num)
    words_easy = get_vocab_words_easy(week_num)
    print(f"\n[VOCAB - Advanced] {len(words)} words: {', '.join(words)}")
    print(f"[VOCAB - Easy]     {len(words_easy)} words: {', '.join(words_easy)}")
    
    # Syllabus vocab match
    syl_vocab = syl["vocab"]
    missing_vocab = [w for w in syl_vocab if not any(w.lower() in ww.lower() for ww in words)]
    if missing_vocab:
        print(f"  ⚠️  Syllabus vocab NOT in vocab.js: {missing_vocab}")
    else:
        print(f"  ✅ All syllabus vocab found in vocab.js")
    
    # Grammar check
    gram = get_grammar_title(week_num)
    print(f"\n[GRAMMAR] {gram}")
    print(f"  Syllabus: {syl['grammar']}")
    
    cam_refs = check_cambridge_vocab_in_grammar(week_num)
    if cam_refs:
        print(f"  Cambridge refs: {cam_refs}")
    
    # Lesson plan check
    lp = check_lesson_plan(week_num)
    print(f"\n[LESSON PLAN] W{week_num}.json")
    if "error" in lp:
        print(f"  ❌ {lp['error']}")
    else:
        print(f"  Sessions: {lp['session_count']} | Parts/session: {lp['parts_per_session']}")
        print(f"  Keys: {lp['top_keys']}")
        print(f"  sessions_2: {'✅' if lp['sessions_2_exists'] else '❌ MISSING'}")
        print(f"  sessions_5: {'✅' if lp['sessions_5_exists'] else '❌ MISSING'}")
        print(f"  teacher_contents keys: {lp['teacher_contents_keys']}")
        
        print(f"  Reading passages:")
        for rp in lp["reading_passages"]:
            icon = "✅" if rp["ok"] else "❌"
            print(f"    {icon} Session {rp['session']}: {rp['chars']} chars → {rp['preview']!r}")
        
        if lp["vocab_in_lesson_plan"]:
            print(f"  Vocab parts in lesson plan: {lp['vocab_in_lesson_plan']}")
        else:
            print(f"  ⚠️  No explicit VOCAB parts in lesson plan")
        
        if lp["grammar_in_lesson_plan"]:
            print(f"  Grammar parts: {lp['grammar_in_lesson_plan'][:3]}")
        else:
            print(f"  ⚠️  No explicit GRAMMAR parts in lesson plan")
