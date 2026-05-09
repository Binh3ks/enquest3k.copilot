#!/usr/bin/env python3
"""
Find specific adjectives that conflict with modal verb patterns
"""

import re
from pathlib import Path

ADJECTIVES_TO_CHECK = ['happy', 'sad', 'excited', 'tired', 'beautiful', 'nice', 'great', 'wonderful', 'angry', 'proud', 'grateful', 'calm']

PROBLEM_WEEKS = {
    'easy': [11, 12, 14, 16, 20, 21, 22, 26],
    'advanced': [10, 11, 12, 16, 25]
}

def extract_vocab_and_templates(file_path):
    """Extract vocabulary and templates"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract templates
        frames_match = re.search(r'sentence_frames:\s*\[(.*?)\](?=,\s*hints|\s*};)', content, re.DOTALL)
        templates = []
        if frames_match:
            frames_text = frames_match.group(1)
            templates = re.findall(r'"template":"(.*?)"', frames_text)
        
        # Extract vocabulary
        vocab_match = re.search(r'vocabulary_bank:.*?words:\s*\[(.*?)\]', content, re.DOTALL)
        vocab_list = []
        if vocab_match:
            vocab_text = vocab_match.group(1)
            vocab_objects = re.findall(r'\{word:\s*"(.*?)".*?distractor:\s*(true|false)', vocab_text)
            vocab_list = vocab_objects
        
        return templates, vocab_list
        
    except Exception as e:
        return [], []

def has_modal_pattern(templates):
    """Check if templates have modal verb patterns"""
    patterns = [r'can\s+___', r'will\s+___', r'to\s+___']
    for template in templates:
        for pattern in patterns:
            if re.search(pattern, template):
                return True
    return False

def find_conflicting_adjectives(vocab, templates):
    """Find adjectives in vocabulary when templates have modal verbs"""
    if not has_modal_pattern(templates):
        return []
    
    conflicts = []
    vocab_words = [word for word, distractor in vocab if distractor == 'false' and not word.startswith('===')]
    
    for word in vocab_words:
        if word.lower() in ADJECTIVES_TO_CHECK:
            conflicts.append(word)
    
    return conflicts

def main():
    print("=" * 80)
    print("MODAL VERB + ADJECTIVE CONFLICTS - DETAILED ANALYSIS")
    print("=" * 80)
    
    for mode in ['easy', 'advanced']:
        print(f"\n{mode.upper()} MODE:")
        print("-" * 80)
        
        for week in PROBLEM_WEEKS[mode]:
            if mode == 'easy':
                file_path = Path(f'src/data/weeks_easy/week_{week:02d}/writing.js')
            else:
                file_path = Path(f'src/data/weeks/week_{week:02d}/writing.js')
            
            if not file_path.exists():
                continue
            
            templates, vocab = extract_vocab_and_templates(file_path)
            conflicts = find_conflicting_adjectives(vocab, templates)
            
            if conflicts:
                print(f"\nW{week:02d} {mode.upper()}:")
                print(f"  📋 Templates with modal verbs:")
                for t in templates:
                    if re.search(r'(can|will|to)\s+___', t):
                        print(f"     - {t}")
                print(f"  🚨 Conflicting adjectives: {', '.join(conflicts)}")
    
    print("\n" + "=" * 80)

if __name__ == '__main__':
    main()
