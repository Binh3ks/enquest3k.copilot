#!/usr/bin/env python3
import os
import re

def check_file(path, mode):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    filename = os.path.basename(path)
    issues = []
    
    # Check for audio_url fields
    audio_null_count = len(re.findall(r'audio_url\s*:\s*null', content))
    audio_path_count = len(re.findall(r'audio_url\s*:\s*["\']/', content))
    audio_word_count = len(re.findall(r'audio_word\s*:\s*["\']/', content))
    
    # Check for image_url fields
    image_empty_count = len(re.findall(r'image_url\s*:\s*["\']["\']', content))
    image_path_count = len(re.findall(r'image_url\s*:\s*["\']/', content))
    
    # Specific checks by file type
    if filename == 'vocab.js':
        vocab_items = len(re.findall(r'\{\s*id\s*:\s*\d+.*?word\s*:', content, re.DOTALL))
        if vocab_items != 10:
            issues.append(f"  ❌ Vocab: có {vocab_items} từ, cần 10")
        if audio_word_count != 10:
            issues.append(f"  ❌ Vocab: chỉ có {audio_word_count}/10 audio_word")
        if image_path_count < 10:
            issues.append(f"  ❌ Vocab: chỉ có {image_path_count}/10 image_url")
            
    elif filename == 'read.js':
        if 'image_url' not in content:
            issues.append(f"  ❌ Read: thiếu image_url")
        if 'audio_url' not in content:
            issues.append(f"  ❌ Read: thiếu audio_url")
            
    elif filename == 'explore.js':
        if 'image_url' not in content:
            issues.append(f"  ❌ Explore: thiếu image_url")
            
    elif filename == 'ask_ai.js':
        prompts = len(re.findall(r'\{\s*id\s*:\s*\d+', content))
        if prompts != 5:
            issues.append(f"  ❌ Ask AI: có {prompts} prompts, cần 5")
            
    elif filename == 'grammar.js':
        exercises = len(re.findall(r'\{\s*id\s*:\s*\d+', content))
        if exercises < 18 or exercises > 22:
            issues.append(f"  ⚠️  Grammar: có {exercises} exercises, cần 20")
            
    elif filename == 'logic.js':
        puzzles = len(re.findall(r'\{\s*id\s*:\s*\d+', content))
        if puzzles != 5:
            issues.append(f"  ❌ Logic: có {puzzles} puzzles, cần 5")
            
    elif filename == 'word_power.js':
        words = len(re.findall(r'\{\s*id\s*:\s*\d+', content))
        if words != 3:
            issues.append(f"  ❌ Word Power: có {words} words, cần 3")
        if image_path_count < 3:
            issues.append(f"  ❌ Word Power: thiếu image_url")
            
    elif filename == 'dictation.js':
        sentences = len(re.findall(r'\{\s*id\s*:\s*\d+', content))
        issues.append(f"  📊 Dictation: có {sentences} câu")
        
    elif filename == 'shadowing.js':
        script_items = len(re.findall(r'\{\s*id\s*:\s*\d+', content))
        if 'audio_full' not in content:
            issues.append(f"  ❌ Shadowing: thiếu audio_full")
        issues.append(f"  📊 Shadowing: có {script_items} câu, audio URLs: {audio_path_count}")
        
    elif filename == 'writing.js':
        if 'image_url' not in content:
            issues.append(f"  ❌ Writing: thiếu image_url")
            
    elif filename == 'daily_watch.js':
        videos = len(re.findall(r'\{\s*id\s*:\s*\d+', content))
        issues.append(f"  📊 Daily Watch: có {videos} videos")
    
    return issues

# Check Advanced mode
print("=" * 80)
print("🔍 TUẦN 2 - ADVANCED MODE")
print("=" * 80)

base_adv = "/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks/week_02"
files = ['vocab.js', 'read.js', 'explore.js', 'word_power.js', 'grammar.js', 
         'logic.js', 'writing.js', 'dictation.js', 'shadowing.js', 
         'word_match.js', 'mindmap.js', 'ask_ai.js', 'daily_watch.js']

for f in files:
    path = os.path.join(base_adv, f)
    if os.path.exists(path):
        issues = check_file(path, 'advanced')
        if issues:
            print(f"\n📄 {f}")
            for issue in issues:
                print(issue)
        else:
            print(f"✅ {f}")
    else:
        print(f"❌ THIẾU FILE: {f}")

# Check Easy mode
print("\n" + "=" * 80)
print("🔍 TUẦN 2 - EASY MODE")
print("=" * 80)

base_easy = "/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks_easy/week_02"

for f in files:
    path = os.path.join(base_easy, f)
    if os.path.exists(path):
        issues = check_file(path, 'easy')
        if issues:
            print(f"\n📄 {f}")
            for issue in issues:
                print(issue)
        else:
            print(f"✅ {f}")
    else:
        print(f"❌ THIẾU FILE: {f}")
