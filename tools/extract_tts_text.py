#!/usr/bin/env python3
"""
EXTRACT_TTS_TEXT.PY - Kokoro TTS Text Extractor
Trích xuất TẤT CẢ text cần TTS từ weeks 1-7 (EASY + ADVANCED)
Output: JSON file với voice mapping sẵn sàng cho generation
"""

import os
import re
import json
from pathlib import Path
from collections import defaultdict

ROOT = Path(__file__).parent.parent
WEEKS_BASE = ROOT / "src/data/weeks"
WEEKS_EASY_BASE = ROOT / "src/data/weeks_easy"
OUTPUT_FILE = ROOT / "tools/tts_tasks_kokoro.json"

# Voice Mapping (station → Kokoro voice)
VOICE_MAP = {
    "read": "af_sky",           # Reading Explore
    "ask_ai": "af_sky",         # Ask & Investigate
    "new_word": "af_bella",     # New Word
    "explore": "af_bella",      # Explore
    "word_power": "af_bella",   # Word Power
    "dictation": "am_adam",     # Dictation
    "shadowing": "am_adam"      # Shadowing
}

def clean_text(text):
    """Clean text for TTS: remove markdown, special chars"""
    # Remove markdown bold
    text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)
    # Remove code blocks
    text = re.sub(r'`([^`]+)`', r'\1', text)
    # Normalize whitespace
    text = ' '.join(text.split())
    return text.strip()

def extract_from_js_file(file_path):
    """Extract JavaScript object from module file"""
    if not file_path.exists():
        return None
    
    try:
        content = file_path.read_text(encoding='utf-8')
        # Remove export statement
        content = re.sub(r'export\s+default\s+', '', content)
        # Remove trailing semicolon
        content = content.rstrip().rstrip(';')
        return content
    except Exception as e:
        print(f"⚠️  Error reading {file_path.name}: {e}")
        return None

def extract_array_items(content, array_name):
    """Extract items from JavaScript array"""
    pattern = rf'{array_name}\s*:\s*\[(.*?)\]'
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        return []
    
    array_content = match.group(1)
    # Extract objects
    items = []
    for obj_match in re.finditer(r'\{([^}]+)\}', array_content):
        obj_content = obj_match.group(1)
        item = {}
        
        # Extract id
        id_match = re.search(r'id\s*:\s*(\d+)', obj_content)
        if id_match:
            item['id'] = int(id_match.group(1))
        
        # Extract text (various field names)
        for field in ['text', 'text_en', 'word']:
            text_match = re.search(rf'{field}\s*:\s*["\']([^"\']+)["\']', obj_content)
            if text_match:
                item['text'] = clean_text(text_match.group(1))
                break
        
        if 'text' in item:
            items.append(item)
    
    return items

def extract_string_field(content, field_name):
    """Extract single string field from JavaScript object"""
    pattern = rf'{field_name}\s*:\s*["\']([^"\']+)["\']'
    match = re.search(pattern, content)
    return clean_text(match.group(1)) if match else None

def extract_vocab_words(content):
    """Extract vocabulary words with definitions and examples"""
    words = []
    
    # Find vocab array in various formats
    patterns = [
        r'words\s*:\s*\[(.*?)\](?=\s*,\s*\w+:|\s*\})',  # words: []
        r'vocab\s*:\s*\[(.*?)\](?=\s*,\s*\w+:|\s*\})',  # vocab: []
        r'target_vocab\s*:\s*\[(.*?)\](?=\s*,\s*\w+:|\s*\})'  # target_vocab: []
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
        
        # Extract definition_en
        def_match = re.search(r'definition_en\s*:\s*["\']([^"\']+)["\']', obj)
        if def_match:
            word_data['definition'] = clean_text(def_match.group(1))
        
        # Extract example
        ex_match = re.search(r'example\s*:\s*["\']([^"\']+)["\']', obj)
        if ex_match:
            word_data['example'] = clean_text(ex_match.group(1))
        
        # Extract collocation if exists
        coll_match = re.search(r'collocation\s*:\s*["\']([^"\']+)["\']', obj)
        if coll_match:
            word_data['collocation'] = clean_text(coll_match.group(1))
        
        words.append(word_data)
    
    return words

def extract_week_data(week_num, mode='advanced'):
    """Extract all TTS text from one week"""
    base_dir = WEEKS_EASY_BASE if mode == 'easy' else WEEKS_BASE
    week_folder = base_dir / f"week_{week_num:02d}"
    
    if not week_folder.exists():
        print(f"⚠️  {mode.upper()} Week {week_num}: Folder not found")
        return None
    
    print(f"📂 Scanning {mode.upper()} Week {week_num}...")
    
    tasks = []
    week_prefix = f"week{week_num}" if week_num < 10 else f"week{week_num}"
    if mode == 'easy':
        week_prefix += "_easy"
    
    # 1. SHADOWING
    shadowing_file = week_folder / "shadowing.js"
    if shadowing_file.exists():
        content = extract_from_js_file(shadowing_file)
        if content:
            # Extract script array
            script_items = extract_array_items(content, 'script')
            if not script_items:
                # Try alternative: sentences array
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
            
            # Full shadowing audio
            if full_text_parts:
                tasks.append({
                    'text': ' '.join(full_text_parts),
                    'filename': 'shadowing_full.mp3',
                    'station': 'shadowing',
                    'voice': VOICE_MAP['shadowing'],
                    'week': week_num,
                    'mode': mode
                })
                print(f"  ✅ Shadowing: {len(script_items)} sentences + full")
    
    # 2. DICTATION
    dictation_file = week_folder / "dictation.js"
    if dictation_file.exists():
        content = extract_from_js_file(dictation_file)
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
                print(f"  ✅ Dictation: {len(sentences)} sentences")
    
    # 3. VOCABULARY (New Word station)
    vocab_file = week_folder / "vocab.js"
    if vocab_file.exists():
        content = extract_from_js_file(vocab_file)
        if content:
            words = extract_vocab_words(content)
            for word_data in words:
                word = word_data['word']
                word_slug = word.replace(' ', '_').lower()
                
                # Word itself
                tasks.append({
                    'text': word,
                    'filename': f"vocab_{word_slug}.mp3",
                    'station': 'vocab',
                    'voice': VOICE_MAP['new_word'],
                    'week': week_num,
                    'mode': mode
                })
                
                # Definition
                if 'definition' in word_data:
                    tasks.append({
                        'text': word_data['definition'],
                        'filename': f"vocab_def_{word_slug}.mp3",
                        'station': 'vocab',
                        'voice': VOICE_MAP['new_word'],
                        'week': week_num,
                        'mode': mode
                    })
                
                # Example
                if 'example' in word_data:
                    tasks.append({
                        'text': word_data['example'],
                        'filename': f"vocab_ex_{word_slug}.mp3",
                        'station': 'vocab',
                        'voice': VOICE_MAP['new_word'],
                        'week': week_num,
                        'mode': mode
                    })
                
                # Collocation
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
    # Check in week_XX_real.js first
    week_real_file = WEEKS_BASE.parent / "weeks" / f"week_{week_num:02d}_real.js"
    if week_real_file.exists():
        content = extract_from_js_file(week_real_file)
        if content:
            # Find word_power section
            wp_match = re.search(r'word_power\s*:\s*\{(.*?)\}(?=\s*,\s*\w+:|\s*\}|$)', content, re.DOTALL)
            if wp_match:
                wp_content = wp_match.group(1)
                wp_words = extract_vocab_words(wp_content)
                
                for word_data in wp_words:
                    word = word_data['word']
                    word_slug = word.replace(' ', '_').lower()
                    
                    # Word/Phrase
                    tasks.append({
                        'text': word,
                        'filename': f"wordpower_{word_slug}.mp3",
                        'station': 'word_power',
                        'voice': VOICE_MAP['word_power'],
                        'week': week_num,
                        'mode': mode
                    })
                    
                    # Definition
                    if 'definition' in word_data:
                        tasks.append({
                            'text': word_data['definition'],
                            'filename': f"wordpower_def_{word_slug}.mp3",
                            'station': 'word_power',
                            'voice': VOICE_MAP['word_power'],
                            'week': week_num,
                            'mode': mode
                        })
                    
                    # Example (model sentence)
                    if 'example' in word_data:
                        tasks.append({
                            'text': word_data['example'],
                            'filename': f"wordpower_model_{word_slug}.mp3",
                            'station': 'word_power',
                            'voice': VOICE_MAP['word_power'],
                            'week': week_num,
                            'mode': mode
                        })
                    
                    # Collocation
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
    
    # 5. EXPLORE (Reading Explore main content)
    read_file = week_folder / "read.js"
    if read_file.exists():
        content = extract_from_js_file(read_file)
        if content:
            # Extract main reading content
            content_match = re.search(r'content_en\s*:\s*`([^`]+)`', content)
            if not content_match:
                content_match = re.search(r'content_en\s*:\s*["\']([^"\']+)["\']', content)
            
            if content_match:
                reading_text = clean_text(content_match.group(1))
                tasks.append({
                    'text': reading_text,
                    'filename': 'read_explore_main.mp3',
                    'station': 'explore',
                    'voice': VOICE_MAP['explore'],
                    'week': week_num,
                    'mode': mode
                })
                
                # Also create explore_main.mp3 (same content, different name)
                tasks.append({
                    'text': reading_text,
                    'filename': 'explore_main.mp3',
                    'station': 'explore',
                    'voice': VOICE_MAP['explore'],
                    'week': week_num,
                    'mode': mode
                })
                print(f"  ✅ Explore: Main reading content")
    
    return tasks

def main():
    """Extract TTS text from weeks 1-7 (both modes)"""
    print("🚀 KOKORO TTS TEXT EXTRACTION")
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
        'version': '1.0',
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
    avg_duration = 2.5  # seconds per file
    total_duration = len(all_tasks) * avg_duration
    print(f"\n⏱️  Estimated generation time: {total_duration/60:.1f} minutes")
    print(f"💾 Estimated total size: ~{len(all_tasks) * 20 / 1024:.1f} MB")

if __name__ == '__main__':
    main()
