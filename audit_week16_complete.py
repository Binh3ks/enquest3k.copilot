#!/usr/bin/env python3
"""
Week 16 Complete Audit Script
Checks all requirements for W16+ golden standard
"""

import re
import os
from pathlib import Path

def count_exercises(filepath):
    """Count exercises with id: field"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            return len(re.findall(r'\bid:\s*\d+', content))
    except Exception as e:
        return f"ERROR: {e}"

def count_vocab_words(filepath):
    """Count vocabulary words"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            return len(re.findall(r'\bword:\s*["\']', content))
    except Exception as e:
        return f"ERROR: {e}"

def count_bold_words(filepath):
    """Count bold words in story files"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            return len(re.findall(r'\*\*[^*]+\*\*', content))
    except Exception as e:
        return f"ERROR: {e}"

def list_files_in_dir(dirpath):
    """List all .js files in directory"""
    try:
        files = sorted([f.name for f in Path(dirpath).glob('*.js')])
        return files
    except Exception as e:
        return []

def extract_voice_config(filepath):
    """Extract voiceConfig from index.js"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            # Find voiceConfig block
            match = re.search(r'voiceConfig:\s*\{([^}]+)\}', content, re.DOTALL)
            if match:
                config_text = match.group(1)
                # Extract voice assignments
                voices = re.findall(r'(\w+):\s*["\']([^"\']+)["\']', config_text)
                return voices
    except Exception as e:
        return []

def check_metadata(filepath):
    """Check metadata fields in index.js"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            weekId = re.search(r'weekId:\s*(\d+)', content)
            title = re.search(r'weekTitle_en:\s*["\']([^"\']+)["\']', content)
            grammar = re.search(r'grammar_focus:\s*["\']([^"\']+)["\']', content)
            isEasy = re.search(r'isEasy:\s*(true|false)', content)
            
            return {
                'weekId': weekId.group(1) if weekId else 'NOT FOUND',
                'title': title.group(1) if title else 'NOT FOUND',
                'grammar': grammar.group(1) if grammar else 'NOT FOUND',
                'isEasy': isEasy.group(1) if isEasy else 'NOT FOUND'
            }
    except Exception as e:
        return {'error': str(e)}

print("=" * 70)
print("WEEK 16 COMPLETE AUDIT REPORT")
print("=" * 70)
print()

# 1. FILE STRUCTURE
print("📁 1. FILE STRUCTURE")
print("-" * 70)
adv_files = list_files_in_dir('src/data/weeks/week_16')
easy_files = list_files_in_dir('src/data/weeks_easy/week_16')

print(f"Advanced Mode: {len(adv_files)} files (expected: 19)")
backup_adv = [f for f in adv_files if 'BACKUP' in f or 'FIXED' in f]
if backup_adv:
    print(f"  ⚠️  BACKUP FILES FOUND: {', '.join(backup_adv)}")
else:
    print("  ✅ No backup files")

print(f"Easy Mode: {len(easy_files)} files (expected: 19)")
backup_easy = [f for f in easy_files if 'BACKUP' in f or 'FIXED' in f]
if backup_easy:
    print(f"  ⚠️  BACKUP FILES FOUND: {', '.join(backup_easy)}")
else:
    print("  ✅ No backup files")

ai_tutor_exists = os.path.exists('src/data/weeks/week_16_real.js')
print(f"AI Tutor: {'✅ EXISTS' if ai_tutor_exists else '❌ NOT FOUND'}")
print()

# 2. METADATA VALIDATION
print("📋 2. METADATA VALIDATION")
print("-" * 70)
adv_meta = check_metadata('src/data/weeks/week_16/index.js')
easy_meta = check_metadata('src/data/weeks_easy/week_16/index.js')

print("Advanced Mode:")
for key, val in adv_meta.items():
    status = "✅" if (key == 'weekId' and val == '16') or (key == 'isEasy' and val == 'false') else ""
    print(f"  {key}: {val} {status}")

print("\nEasy Mode:")
for key, val in easy_meta.items():
    status = "✅" if (key == 'weekId' and val == '16') or (key == 'isEasy' and val == 'true') else ""
    print(f"  {key}: {val} {status}")
print()

# 3. VOICE CONFIG
print("🎙️ 3. VOICE CONFIG VALIDATION")
print("-" * 70)
adv_voices = extract_voice_config('src/data/weeks/week_16/index.js')
easy_voices = extract_voice_config('src/data/weeks_easy/week_16/index.js')

print("Advanced Mode:")
if adv_voices:
    unique = set([v[1] for v in adv_voices])
    print(f"  Total assignments: {len(adv_voices)}")
    print(f"  Unique voices: {len(unique)}")
    for field, voice in adv_voices:
        print(f"    {field}: {voice}")
    if len(unique) < 5:
        print(f"  ❌ ISSUE: Only {len(unique)} unique voices (expected: 5)")
        # Find duplicates
        from collections import Counter
        counts = Counter([v[1] for v in adv_voices])
        dups = {v: c for v, c in counts.items() if c > 1}
        if dups:
            print(f"  ⚠️  Duplicates: {dups}")
    else:
        print("  ✅ 5+ distinct voices")

print("\nEasy Mode:")
if easy_voices:
    unique = set([v[1] for v in easy_voices])
    print(f"  Total assignments: {len(easy_voices)}")
    print(f"  Unique voices: {len(unique)}")
    for field, voice in easy_voices:
        print(f"    {field}: {voice}")
    if len(unique) < 5:
        print(f"  ❌ ISSUE: Only {len(unique)} unique voices (expected: 5)")
        from collections import Counter
        counts = Counter([v[1] for v in easy_voices])
        dups = {v: c for v, c in counts.items() if c > 1}
        if dups:
            print(f"  ⚠️  Duplicates: {dups}")
    else:
        print("  ✅ 5+ distinct voices")
print()

# 4. GRAMMAR COUNT
print("📚 4. GRAMMAR EXERCISES")
print("-" * 70)
adv_grammar = count_exercises('src/data/weeks/week_16/grammar.js')
easy_grammar = count_exercises('src/data/weeks_easy/week_16/grammar.js')
print(f"Advanced: {adv_grammar} exercises {'✅ PASS' if adv_grammar == 20 else '❌ FAIL (expected 20)'}")
print(f"Easy: {easy_grammar} exercises {'✅ PASS' if easy_grammar == 20 else '❌ FAIL (expected 20)'}")
print()

# 5. SUB-TABS VALIDATION
print("🔢 5. SUB-TAB QUESTION COUNTS (W16+ Structure)")
print("-" * 70)
expected = {'logic_science': 3, 'singapore_math': 5, 'social_quiz': 7}

print("Advanced:")
adv_total = 0
for file, exp in expected.items():
    count = count_exercises(f'src/data/weeks/week_16/{file}.js')
    adv_total += count if isinstance(count, int) else 0
    status = "✅" if count == exp else f"❌ (expected {exp})"
    print(f"  {file}: {count} {status}")
print(f"  Total Logic Lab: {adv_total} {'✅ PASS' if adv_total == 15 else '❌ FAIL (expected 15)'}")

print("\nEasy:")
easy_total = 0
for file, exp in expected.items():
    count = count_exercises(f'src/data/weeks_easy/week_16/{file}.js')
    easy_total += count if isinstance(count, int) else 0
    status = "✅" if count == exp else f"❌ (expected {exp})"
    print(f"  {file}: {count} {status}")
print(f"  Total Logic Lab: {easy_total} {'✅ PASS' if easy_total == 15 else '❌ FAIL (expected 15)'}")
print()

# 6. VOCABULARY & BOLD WORDS
print("📖 6. VOCABULARY & BOLD WORD COVERAGE (100% Rule)")
print("-" * 70)
adv_vocab_count = count_vocab_words('src/data/weeks/week_16/vocab.js')
easy_vocab_count = count_vocab_words('src/data/weeks_easy/week_16/vocab.js')

print(f"Advanced vocab.js: {adv_vocab_count} words")
print(f"Easy vocab.js: {easy_vocab_count} words")
print()

# Check bold words in story files
story_files = ['read_stem.js', 'read_social.js']
print("Advanced Mode Bold Words:")
for file in story_files:
    count = count_bold_words(f'src/data/weeks/week_16/{file}')
    status = "✅ PASS" if count >= adv_vocab_count else f"❌ FAIL (need >= {adv_vocab_count})"
    print(f"  {file}: {count} bold words {status}")

print("\nEasy Mode Bold Words:")
for file in story_files:
    count = count_bold_words(f'src/data/weeks_easy/week_16/{file}')
    status = "✅ PASS" if count >= easy_vocab_count else f"❌ FAIL (need >= {easy_vocab_count})"
    print(f"  {file}: {count} bold words {status}")
print()

# Check explore files
explore_files = ['explore_stem.js', 'explore_social.js']
print("Advanced Mode Explore Bold Words:")
for file in explore_files:
    count = count_bold_words(f'src/data/weeks/week_16/{file}')
    print(f"  {file}: {count} bold words")

print("\nEasy Mode Explore Bold Words:")
for file in explore_files:
    count = count_bold_words(f'src/data/weeks_easy/week_16/{file}')
    print(f"  {file}: {count} bold words")
print()

# 7. SUMMARY
print("=" * 70)
print("📊 SUMMARY - ISSUES TO FIX")
print("=" * 70)

issues = []
if backup_adv or backup_easy:
    issues.append("1. REMOVE BACKUP FILES (word_power_BACKUP.js, word_power_FIXED.js)")

if len(set([v[1] for v in adv_voices])) < 5:
    issues.append("2. FIX VOICE CONFIG - Advanced has duplicate voices")
if len(set([v[1] for v in easy_voices])) < 5:
    issues.append("3. FIX VOICE CONFIG - Easy has duplicate voices")

if adv_grammar != 20:
    issues.append(f"4. FIX GRAMMAR COUNT - Advanced has {adv_grammar} (need 20)")
if easy_grammar != 20:
    issues.append(f"5. FIX GRAMMAR COUNT - Easy has {easy_grammar} (need 20)")

# Check bold words
adv_bold_read_stem = count_bold_words('src/data/weeks/week_16/read_stem.js')
adv_bold_read_social = count_bold_words('src/data/weeks/week_16/read_social.js')
if adv_bold_read_stem == 0 or adv_bold_read_social == 0:
    issues.append("6. ADD BOLD WORDS - Advanced stories have 0 bold words! (100% vocab coverage rule)")

easy_bold_read_stem = count_bold_words('src/data/weeks_easy/week_16/read_stem.js')
easy_bold_read_social = count_bold_words('src/data/weeks_easy/week_16/read_social.js')
if easy_bold_read_stem == 0 or easy_bold_read_social == 0:
    issues.append("7. ADD BOLD WORDS - Easy stories have 0 bold words! (100% vocab coverage rule)")

if adv_total != 15:
    issues.append(f"8. FIX SUB-TAB COUNTS - Advanced Logic Lab = {adv_total} (need 15)")
if easy_total != 15:
    issues.append(f"9. FIX SUB-TAB COUNTS - Easy Logic Lab = {easy_total} (need 15)")

if issues:
    for issue in issues:
        print(f"❌ {issue}")
else:
    print("✅ NO ISSUES FOUND - Week 16 is ready to be golden standard!")

print()
print("=" * 70)
