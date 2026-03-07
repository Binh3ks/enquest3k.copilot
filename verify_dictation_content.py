#!/usr/bin/env python3
"""
Verify dictation.js content matches read.js exactly
"""
import re
from pathlib import Path

# Read dictation.js
dictation_path = Path('src/data/weeks_easy/week_12/dictation.js')
content = dictation_path.read_text(encoding='utf-8')

# Extract using the SAME regex as generate_audio_deepgram.py
matches = re.findall(r'(?:text_en|sentence|text)\s*:\s*["\']([^"\']+)["\']', content)

print('=== EXTRACTED FROM EASY MODE dictation.js ===')
for i, text in enumerate(matches, 1):
    print(f'{i}. {text}')

# Now check read.js
read_path = Path('src/data/weeks_easy/week_12/read.js')
read_content = read_path.read_text(encoding='utf-8')

# Extract content_en
m = re.search(r'content_en\s*:\s*["`]([^"`]+)["`]', read_content, re.DOTALL)
if m:
    full_text = m.group(1).replace('**', '')
    sentences = re.split(r'(?<=[.!?])\s+', full_text)
    sentences = [s.strip() for s in sentences if len(s.strip()) > 5]
    
    print('\n=== SENTENCES FROM EASY MODE read.js ===')
    for i, s in enumerate(sentences[:10], 1):
        print(f'{i}. {s}')
    
    # Compare
    print('\n=== COMPARISON ===')
    if matches[:10] == sentences[:10]:
        print('✅ DICTATION TEXT MATCHES READ.JS EXACTLY!')
    else:
        print('❌ MISMATCH FOUND:')
        for i in range(min(len(matches), 10)):
            if i < len(sentences):
                if matches[i] != sentences[i]:
                    print(f'  Line {i+1}:')
                    print(f'    Dictation: {matches[i]}')
                    print(f'    Read.js:   {sentences[i]}')
