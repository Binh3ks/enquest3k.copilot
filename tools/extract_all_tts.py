#!/usr/bin/env python3
"""
EXTRACT_ALL_TTS.PY - Complete TTS Text Extractor
Extract ĐỦ 1,931 files từ weeks 1-7 (EASY + ADVANCED)
Output: JSON với voice mapping cho Kokoro local generation
"""

import os
import re
import json
from pathlib import Path
from collections import defaultdict

ROOT = Path(__file__).parent.parent
WEEKS_BASE = ROOT / "src/data/weeks"
WEEKS_EASY_BASE = ROOT / "src/data/weeks_easy"
OUTPUT_FILE = ROOT / "tools/tts_all_tasks.json"

# Voice mapping (7 KOKORO VOICES cho các stations)
VOICE_MAP = {
    "shadowing":   "am_adam",      # 1. Male for sentence practice
    "dictation":   "am_michael",   # 2. Different male for clarity
    "new_word":    "af_bella",     # 3. Clear female for vocab
    "word_power":  "af_sarah",     # 4. Different female for phrases
    "explore":     "af_nicole",    # 5. Warm female for storytelling
    "ask_ai":      "af_sky",       # 6. Bright female for questions
    "logic":       "bf_emma",      # 7. British female for puzzles
    "mindmap":     "bf_isabella",  # Extra: British for mindmaps
    "read":        "af_sky",       # Fallback
}

def clean_text(text):
    """Clean text for TTS"""
    text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)
    text = re.sub(r'`([^`]+)`', r'\1', text)
    text = ' '.join(text.split())
    return text.strip()

def load_js_module(file_path):
    """Load JavaScript module and extract default export"""
    if not file_path.exists():
        return None
    
    try:
        content = file_path.read_text(encoding='utf-8')
        # Remove export statement
        content = re.sub(r'export\s+default\s+', '', content)
        content = content.rstrip().rstrip(';')
        return content
    except:
        return None

def extract_array_items(content, array_name):
    """Extract items from JavaScript array"""
    pattern = rf'{array_name}\s*:\s*\[(.*?)\]'
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        return []
    
    array_content = match.group(1)
    items = []
    
    for obj_match in re.finditer(r'\{([^}]+)\}', array_content):
        obj_content = obj_match.group(1)
        item = {}
        
        # Extract id
        id_match = re.search(r'id\s*:\s*(\d+)', obj_content)
        if id_match:
            item['id'] = int(id_match.group(1))
        
        # Extract text (multiple possible field names)
        for field in ['text', 'text_en', 'word', 'question_en', 'context_en']:
            text_match = re.search(rf'{field}\s*:\s*["\']([^"\']+)["\']', obj_content)
            if text_match:
                item['text'] = clean_text(text_match.group(1))
                break
        
        if 'text' in item:
            items.append(item)
    
    return items

def extract_vocab_words(content):
    """Extract vocabulary with definitions and examples"""
    words = []
    
    # Find vocab array
    patterns = [
        r'words\s*:\s*\[(.*?)\](?=\s*,\s*\w+:|\s*\})',
        r'vocab\s*:\s*\[(.*?)\](?=\s*,\s*\w+:|\s*\})',
        r'target_vocab\s*:\s*\[(.*?)\](?=\s*,\s*\w+:|\s*\})'
    ]
    
    vocab_content = None
    for pattern in patterns:
        match = re.search(pattern, content, re.DOTALL)
        if match:
            vocab_content = match.group(1)
            break
    
    if not vocab_content:
        return []
    
    # Extract each vocab object
    for obj_match in re.finditer(r'\{([^}]+)\}', vocab_content):
        obj = obj_match.group(1)
        
        word_match = re.search(r'word\s*:\s*["\']([^"\']+)["\']', obj)
        if not word_match:
            continue
        
        word = clean_text(word_match.group(1))
        word_data = {'word': word}
        
        def_match = re.search(r'definition_en\s*:\s*["\']([^"\']+)["\']', obj)
        if def_match:
            word_data['definition'] = clean_text(def_match.group(1))
        
        ex_match = re.search(r'example\s*:\s*["\']([^"\']+)["\']', obj)
        if ex_match:
            word_data['example'] = clean_text(ex_match.group(1))
        
        coll_match = re.search(r'collocation\s*:\s*["\']([^"\']+)["\']', obj)
        if coll_match:
            word_data['collocation'] = clean_text(coll_match.group(1))
        
        words.append(word_data)
    
    return words

def extract_mindmap_data(mindmap_file):
    """Extract mindmap stems and branches"""
    content = load_js_module(mindmap_file)
    if not content:
        return [], []
    
    stems = []
    branches = []
    
    # Extract centerStems
    stems_match = re.search(r'centerStems\s*:\s*\[(.*?)\]', content, re.DOTALL)
    if stems_match:
        stems_content = stems_match.group(1)
        
        # Check if stems have {text:..., audio:...} format
        if '{' in stems_content:
            for obj in re.finditer(r'\{\s*text\s*:\s*["\']([^"\']+)["\']', stems_content):
                stems.append(clean_text(obj.group(1)))
        else:
            # Simple string array
            for match in re.finditer(r'["\']([^"\']+)["\']', stems_content):
                text = clean_text(match.group(1))
                if text and len(text) > 3:  # Avoid short noise
                    stems.append(text)
    
    # Extract ALL branchLabels - better regex to match the entire object
    # Find all arrays within branchLabels (each stem has an array of branches)
    branches_match = re.search(r'branchLabels\s*:\s*\{(.*?)\n\s*\}', content, re.DOTALL)
    if branches_match:
        branches_content = branches_match.group(1)
        
        # Extract {text: "...", audio: "..."} objects
        # Only get the text field, ignore audio field
        for obj_match in re.finditer(r'\{\s*text\s*:\s*["\']([^"\']+)["\']', branches_content):
            text = clean_text(obj_match.group(1))
            # Only add actual branch content (not the stem keys)
            if len(text) > 2 and not text.endswith('___.') and not text.endswith('___'):
                branches.append(text)
    
    return stems, branches

def extract_week_data(week_num, mode='advanced'):
    """Extract all TTS text from one week"""
    base_dir = WEEKS_EASY_BASE if mode == 'easy' else WEEKS_BASE
    week_folder = base_dir / f"week_{week_num:02d}"
    
    if not week_folder.exists():
        return []
    
    print(f"📂 Scanning {mode.upper()} Week {week_num}...")
    
    tasks = []
    week_prefix = f"week{week_num}" if week_num < 10 else f"week{week_num}"
    if mode == 'easy':
        week_prefix += "_easy"
    
    # 1. SHADOWING
    shadowing_file = week_folder / "shadowing.js"
    if shadowing_file.exists():
        content = load_js_module(shadowing_file)
        if content:
            script_items = extract_array_items(content, 'script')
            if not script_items:
                script_items = extract_array_items(content, 'sentences')
            
            full_text_parts = []
            for item in script_items:
                if 'text' in item:
                    tasks.append({
                        'text': item['text'],
                        'filename': f"shadowing_{item.get('id', len(full_text_parts)+1)}.mp3",
                        'station': 'shadowing',
                        'voice': VOICE_MAP['shadowing'],
                        'week': week_num,
                        'mode': mode
                    })
                    full_text_parts.append(item['text'])
            
            # Full shadowing
            if full_text_parts:
                tasks.append({
                    'text': ' '.join(full_text_parts),
                    'filename': 'shadowing_full.mp3',
                    'station': 'shadowing',
                    'voice': VOICE_MAP['shadowing'],
                    'week': week_num,
                    'mode': mode
                })
                print(f"  ✅ Shadowing: {len(script_items)} + full")
    
    # 2. DICTATION
    dictation_file = week_folder / "dictation.js"
    if dictation_file.exists():
        content = load_js_module(dictation_file)
        if content:
            sentences = extract_array_items(content, 'sentences')
            for item in sentences:
                if 'text' in item:
                    tasks.append({
                        'text': item['text'],
                        'filename': f"dictation_{item.get('id', 0)}.mp3",
                        'station': 'dictation',
                        'voice': VOICE_MAP['dictation'],
                        'week': week_num,
                        'mode': mode
                    })
            if sentences:
                print(f"  ✅ Dictation: {len(sentences)}")
    
    # 3. VOCABULARY
    vocab_file = week_folder / "vocab.js"
    if vocab_file.exists():
        content = load_js_module(vocab_file)
        if content:
            words = extract_vocab_words(content)
            for word_data in words:
                word = word_data['word']
                word_slug = word.replace(' ', '_').lower()
                
                tasks.append({
                    'text': word,
                    'filename': f"vocab_{word_slug}.mp3",
                    'station': 'vocab',
                    'voice': VOICE_MAP['new_word'],
                    'week': week_num,
                    'mode': mode
                })
                
                if 'definition' in word_data:
                    tasks.append({
                        'text': word_data['definition'],
                        'filename': f"vocab_def_{word_slug}.mp3",
                        'station': 'vocab',
                        'voice': VOICE_MAP['new_word'],
                        'week': week_num,
                        'mode': mode
                    })
                
                if 'example' in word_data:
                    tasks.append({
                        'text': word_data['example'],
                        'filename': f"vocab_ex_{word_slug}.mp3",
                        'station': 'vocab',
                        'voice': VOICE_MAP['new_word'],
                        'week': week_num,
                        'mode': mode
                    })
                
                if 'collocation' in word_data:
                    tasks.append({
                        'text': word_data['collocation'],
                        'filename': f"vocab_coll_{word_slug}.mp3",
                        'station': 'vocab',
                        'voice': VOICE_MAP['new_word'],
                        'week': week_num,
                        'mode': mode
                    })
            
            if words:
                print(f"  ✅ Vocabulary: {len(words)} words")
    
    # 4. WORD POWER
    # Week 1 Advanced: from week_01_real.js only
    # Weeks 2-7 Advanced: from week_XX/word_power.js (folder structure)
    # All Easy weeks: from week_XX/word_power.js
    
    wp_words = []
    if mode == 'advanced' and week_num == 1:
        # Week 1 ADV: special case, from week_01_real.js
        week_real_file = WEEKS_BASE.parent / "weeks" / "week_01_real.js"
        if week_real_file.exists():
            content = load_js_module(week_real_file)
            if content:
                wp_match = re.search(r'word_power\s*:\s*\{(.*?)\}(?=\s*,\s*\w+:|\s*\}|$)', content, re.DOTALL)
                if wp_match:
                    wp_content = wp_match.group(1)
                    wp_words = extract_vocab_words(wp_content)
    else:
        # All other cases: word_power.js in week folder
        wp_file = week_folder / "word_power.js"
        if wp_file.exists():
            content = load_js_module(wp_file)
            if content:
                wp_words = extract_vocab_words(content)
    
    # Generate MP3 tasks for word_power
    for word_data in wp_words:
        word = word_data['word']
        word_slug = word.replace(' ', '_').lower()
        
        # 1. Word itself
        tasks.append({
            'text': word,
            'filename': f"wordpower_{word_slug}.mp3",
            'station': 'word_power',
            'voice': VOICE_MAP['word_power'],
            'week': week_num,
            'mode': mode
        })
        
        # 2. Definition
        if 'definition' in word_data:
            tasks.append({
                'text': word_data['definition'],
                'filename': f"wordpower_def_{word_slug}.mp3",
                'station': 'word_power',
                'voice': VOICE_MAP['word_power'],
                'week': week_num,
                'mode': mode
            })
        
        # 3. Example sentence
        if 'example' in word_data:
            tasks.append({
                'text': word_data['example'],
                'filename': f"wordpower_ex_{word_slug}.mp3",
                'station': 'word_power',
                'voice': VOICE_MAP['word_power'],
                'week': week_num,
                'mode': mode
            })
        
        # 4. Model sentence
        model_text = word_data.get('model_sentence', word)
        tasks.append({
            'text': model_text,
            'filename': f"wordpower_model_{word_slug}.mp3",
            'station': 'word_power',
            'voice': VOICE_MAP['word_power'],
            'week': week_num,
            'mode': mode
        })
        
        # 5. Collocation
        if 'collocation' in word_data:
            tasks.append({
                'text': word_data['collocation'],
                'filename': f"wordpower_coll_{word_slug}.mp3",
                'station': 'word_power',
                'voice': VOICE_MAP['word_power'],
                'week': week_num,
                'mode': mode
            })
    
    if wp_words:
        print(f"  ✅ Word Power: {len(wp_words)} phrases")
    
    # 5. EXPLORE (Reading main content)
    read_file = week_folder / "read.js"
    if read_file.exists():
        content = load_js_module(read_file)
        if content:
            content_match = re.search(r'content_en\s*:\s*`([^`]+)`', content)
            if not content_match:
                content_match = re.search(r'content_en\s*:\s*["\']([^"\']+)["\']', content)
            
            if content_match:
                reading_text = clean_text(content_match.group(1))
                
                # Two files: explore_main.mp3 and read_explore_main.mp3 (same content)
                tasks.append({
                    'text': reading_text,
                    'filename': 'explore_main.mp3',
                    'station': 'explore',
                    'voice': VOICE_MAP['explore'],
                    'week': week_num,
                    'mode': mode
                })
                
                tasks.append({
                    'text': reading_text,
                    'filename': 'read_explore_main.mp3',
                    'station': 'explore',
                    'voice': VOICE_MAP['explore'],
                    'week': week_num,
                    'mode': mode
                })
                print(f"  ✅ Explore: Main content")
    
    # 6. ASK AI (Ask & Investigate prompts)
    ask_ai_file = week_folder / "ask_ai.js"
    if ask_ai_file.exists():
        content = load_js_module(ask_ai_file)
        if content:
            # Find all context_en values directly
            context_matches = re.findall(r'context_en\s*:\s*["\']([^"\']+)["\']', content)
            for i, context_text in enumerate(context_matches, 1):
                tasks.append({
                    'text': clean_text(context_text),
                    'filename': f"ask_ai_{i}.mp3",
                    'station': 'ask_ai',
                    'voice': VOICE_MAP['ask_ai'],
                    'week': week_num,
                    'mode': mode
                })
            if context_matches:
                print(f"  ✅ Ask AI: {len(context_matches)} prompts")
    
    # 7. LOGIC LAB (Logic puzzles)
    logic_file = week_folder / "logic.js"
    if logic_file.exists():
        content = load_js_module(logic_file)
        if content:
            # Find all question_en values directly
            question_matches = re.findall(r'question_en\s*:\s*["\']([^"\']+)["\']', content)
            for i, question_text in enumerate(question_matches, 1):
                tasks.append({
                    'text': clean_text(question_text),
                    'filename': f"logic_{i}.mp3",
                    'station': 'logic',
                    'voice': VOICE_MAP['logic'],
                    'week': week_num,
                    'mode': mode
                })
            if question_matches:
                print(f"  ✅ Logic Lab: {len(question_matches)} puzzles")
    
    # 8. MINDMAP (Stems + Branches)
    mindmap_file = week_folder / "mindmap.js"
    if mindmap_file.exists():
        stems, branches = extract_mindmap_data(mindmap_file)
        
        # Generate stem files
        for i, stem_text in enumerate(stems, 1):
            tasks.append({
                'text': stem_text,
                'filename': f"mindmap_stem_{i}.mp3",
                'station': 'mindmap',
                'voice': VOICE_MAP['mindmap'],
                'week': week_num,
                'mode': mode
            })
        
        # Generate branch files
        for i, branch_text in enumerate(branches[:36], 1):  # Limit to 36 branches
            tasks.append({
                'text': branch_text,
                'filename': f"mindmap_branch_{i}.mp3",
                'station': 'mindmap',
                'voice': VOICE_MAP['mindmap'],
                'week': week_num,
                'mode': mode
            })
        
        if stems or branches:
            print(f"  ✅ Mindmap: {len(stems)} stems + {len(branches[:36])} branches")
    
    return tasks

def main():
    """Extract all TTS text from weeks 1-7"""
    print("🚀 COMPLETE TTS TEXT EXTRACTION")
    print("=" * 50)
    
    all_tasks = []
    
    for week_num in range(1, 8):
        # Advanced mode
        tasks = extract_week_data(week_num, 'advanced')
        if tasks:
            all_tasks.extend(tasks)
        
        # Easy mode
        tasks = extract_week_data(week_num, 'easy')
        if tasks:
            all_tasks.extend(tasks)
        
        print()
    
    # Save to JSON
    output_data = {
        'version': '2.0',
        'generated_at': '2026-02-13',
        'total_tasks': len(all_tasks),
        'voice_mapping': VOICE_MAP,
        'weeks': list(range(1, 8)),
        'modes': ['advanced', 'easy'],
        'tasks': all_tasks
    }
    
    OUTPUT_FILE.write_text(json.dumps(output_data, indent=2, ensure_ascii=False), encoding='utf-8')
    
    print("=" * 50)
    print(f"✅ EXTRACTION COMPLETE")
    print(f"📊 Total tasks: {len(all_tasks)}")
    print(f"📁 Output: {OUTPUT_FILE.relative_to(ROOT)}")
    
    # Statistics
    stats = defaultdict(int)
    for task in all_tasks:
        stats[task['station']] += 1
    
    print("\n📈 Breakdown by station:")
    for station, count in sorted(stats.items()):
        print(f"  {station:15s}: {count:4d} files")
    
    # Estimate
    avg_duration = 1.5  # seconds per file with Kokoro local
    total_duration = len(all_tasks) * avg_duration
    print(f"\n⏱️  Estimated generation time: {total_duration/60:.0f} minutes (~{total_duration/3600:.1f} hours)")
    print(f"💾 Estimated total size: ~{len(all_tasks) * 20 / 1024:.1f} MB")
    print(f"\n🎯 Target: 1,931 files (current: {len(all_tasks)})")

if __name__ == '__main__':
    main()
