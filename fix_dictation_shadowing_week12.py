#!/usr/bin/env python3
"""Extract EXACT sentences from read.js for dictation/shadowing - 100% rule"""
import re

def extract_sentences_from_read(filepath):
    """Extract sentences from read.js content_en"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find content_en value
    match = re.search(r'content_en:\s*"([^"]+)"', content)
    if not match:
        print(f"ERROR: Cannot find content_en in {filepath}")
        return []
    
    text = match.group(1)
    
    # Remove bold markers
    text = text.replace('**', '')
    
    # Split by sentence endings
    sentences = re.split(r'(?<=[.!?])\s+', text)
    sentences = [s.strip() for s in sentences if len(s.strip()) > 5]
    
    return sentences

def get_vietnamese_translation(en_text, mode):
    """Get Vietnamese translation from read.js"""
    filepath = f'src/data/weeks{"" if mode == "adv" else "_easy"}/week_12/read.js'
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find content_vi
    match = re.search(r'content_vi:\s*"([^"]+)"', content)
    if not match:
        return None
    
    vi_text = match.group(1).replace('**', '')
    vi_sentences = re.split(r'(?<=[.!?])\s+', vi_text)
    vi_sentences = [s.strip() for s in vi_sentences if len(s.strip()) > 5]
    
    return vi_sentences

# Extract Advanced sentences
adv_sentences = extract_sentences_from_read('src/data/weeks/week_12/read.js')
adv_vi = get_vietnamese_translation('', 'adv')

print("=== ADVANCED (14 sentences) ===")
for i, sent in enumerate(adv_sentences[:14], 1):
    print(f"{i}. {sent}")

print("\n=== ADVANCED VIETNAMESE ===")
if adv_vi:
    for i, sent in enumerate(adv_vi[:14], 1):
        print(f"{i}. {sent}")

# Extract Easy sentences  
easy_sentences = extract_sentences_from_read('src/data/weeks_easy/week_12/read.js')
easy_vi = get_vietnamese_translation('', 'easy')

print("\n=== EASY (10 sentences) ===")
for i, sent in enumerate(easy_sentences[:10], 1):
    print(f"{i}. {sent}")

print("\n=== EASY VIETNAMESE ===")
if easy_vi:
    for i, sent in enumerate(easy_vi[:10], 1):
        print(f"{i}. {sent}")

# Now generate corrected files
def write_dictation_corrected(mode, sentences, vi_sentences):
    """Write corrected dictation.js"""
    folder = "weeks" if mode == "adv" else "weeks_easy"
    audio_folder = "week12" if mode == "adv" else "week12_easy"
    
    lines = ["export default {", "  sentences: ["]
    
    for i, (en, vi) in enumerate(zip(sentences, vi_sentences), 1):
        line = f'    {{ id: {i}, text: "{en}", meaning: "{vi}", audio_url: "/audio/{audio_folder}/dictation_{i}.mp3" }}'
        if i < len(sentences):
            line += ','
        lines.append(line)
    
    lines.append("  ]")
    lines.append("};")
    
    path = f'src/data/{folder}/week_12/dictation.js'
    with open(path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    
    print(f'\n✅ CORRECTED: {path}')

def write_shadowing_corrected(mode, sentences, vi_sentences):
    """Write corrected shadowing.js"""
    folder = "weeks" if mode == "adv" else "weeks_easy"
    audio_folder = "week12" if mode == "adv" else "week12_easy"
    
    lines = ["export default {", "  sentences: ["]
    
    for i, (en, vi) in enumerate(zip(sentences, vi_sentences), 1):
        line = f'    {{ id: {i}, text: "{en}", vi: "{vi}", audio_url: "/audio/{audio_folder}/shadowing_{i}.mp3" }}'
        if i < len(sentences):
            line += ','
        lines.append(line)
    
    lines.append("  ]")
    lines.append("};")
    
    path = f'src/data/{folder}/week_12/shadowing.js'
    with open(path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    
    print(f'✅ CORRECTED: {path}')

# Write corrected files
write_dictation_corrected('adv', adv_sentences[:14], adv_vi[:14])
write_shadowing_corrected('adv', adv_sentences[:14], adv_vi[:14])
write_dictation_corrected('easy', easy_sentences[:10], easy_vi[:10])
write_shadowing_corrected('easy', easy_sentences[:10], easy_vi[:10])

print("\n✅ ALL CORRECTED! Now generate audio with:")
print("python3 tools/generate_audio_deepgram.py 12 --station dictation --station shadowing --mode all --upload --force")
