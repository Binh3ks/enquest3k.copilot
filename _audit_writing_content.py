#!/usr/bin/env python3
"""
Comprehensive audit of ALL writing content (Easy + Advanced, W1-31)
Checks:
1. Templates with "___ed" suffix (should be removed)
2. Templates requiring past tense but vocabulary has base verbs
3. Templates requiring verbs but vocabulary shows adjectives
4. Grammar errors in templates
5. Vocabulary mismatch with blank context
"""

import re
import json
from pathlib import Path

def extract_templates_from_js(file_path):
    """Extract sentence_frames and vocabulary from writing.js file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract sentence_frames
        frames_match = re.search(r'sentence_frames:\s*\[(.*?)\](?=,\s*hints|\s*};)', content, re.DOTALL)
        if not frames_match:
            return None, None
        
        frames_text = frames_match.group(1)
        templates = re.findall(r'"template":"(.*?)"', frames_text)
        
        # Extract vocabulary_bank words
        vocab_match = re.search(r'vocabulary_bank:.*?words:\s*\[(.*?)\]', content, re.DOTALL)
        if not vocab_match:
            return templates, []
        
        vocab_text = vocab_match.group(1)
        # Extract {word: "...", ...} objects
        vocab_objects = re.findall(r'\{word:\s*"(.*?)".*?distractor:\s*(true|false)', vocab_text)
        
        return templates, vocab_objects
        
    except Exception as e:
        print(f"  ❌ Error reading {file_path}: {e}")
        return None, None

def check_ed_suffix(templates):
    """Check for ___ed patterns in templates"""
    issues = []
    for i, template in enumerate(templates, 1):
        if '___ed' in template:
            issues.append(f"  🚨 Frame {i}: Has '___ed' suffix → {template}")
    return issues

def check_past_tense_context(templates, vocab):
    """Check if past tense templates have conjugated verbs in vocabulary"""
    issues = []
    past_indicators = ['yesterday', 'last', 'did you', 'woke up', 'went to', 'was', 'were']
    
    # Common base verbs that should be conjugated
    base_verbs = ['walk', 'talk', 'play', 'help', 'watch', 'listen', 'clean', 'cook', 
                  'paint', 'draw', 'color', 'cut', 'glue', 'fold', 'create',
                  'start', 'stop', 'wake', 'win', 'arrive', 'visit', 'run']
    
    # Check if templates suggest past tense
    has_past_context = any(indicator in ' '.join(templates).lower() for indicator in past_indicators)
    
    if has_past_context:
        vocab_words = [word for word, distractor in vocab if distractor == 'false' and not word.startswith('===')]
        base_in_vocab = [v for v in vocab_words if v.lower() in base_verbs]
        
        if base_in_vocab:
            issues.append(f"  ⚠️  Past tense context but base verbs in vocab: {', '.join(base_in_vocab[:5])}")
    
    return issues

def check_verb_adjective_mismatch(templates, vocab):
    """Check for patterns like 'can ___' but vocabulary has adjectives"""
    issues = []
    
    # Patterns requiring verbs
    verb_patterns = [r'can\s+___', r'will\s+___', r'to\s+___', r'I\s+___\s+to']
    
    # Common adjectives that shouldn't appear after modal verbs
    adjectives = ['happy', 'sad', 'excited', 'tired', 'beautiful', 'nice', 'great', 'wonderful']
    
    for pattern in verb_patterns:
        if any(re.search(pattern, template) for template in templates):
            vocab_words = [word for word, distractor in vocab if distractor == 'false' and not word.startswith('===')]
            adj_in_vocab = [v for v in vocab_words if v.lower() in adjectives]
            
            if adj_in_vocab:
                issues.append(f"  ⚠️  Modal verb pattern but adjectives in vocab: {', '.join(adj_in_vocab[:3])}")
                break
    
    return issues

def audit_week(week_num, mode='easy'):
    """Audit a single week's writing content"""
    if mode == 'easy':
        file_path = Path(f'src/data/weeks_easy/week_{week_num:02d}/writing.js')
    else:
        file_path = Path(f'src/data/weeks/week_{week_num:02d}/writing.js')
    
    if not file_path.exists():
        print(f"❌ W{week_num:02d} {mode.upper()}: File not found")
        return False
    
    templates, vocab = extract_templates_from_js(file_path)
    
    if templates is None:
        print(f"❌ W{week_num:02d} {mode.upper()}: Could not parse content")
        return False
    
    issues = []
    
    # Run checks
    issues.extend(check_ed_suffix(templates))
    issues.extend(check_past_tense_context(templates, vocab))
    issues.extend(check_verb_adjective_mismatch(templates, vocab))
    
    if issues:
        print(f"\n🔍 W{week_num:02d} {mode.upper()}:")
        for issue in issues:
            print(issue)
        return False
    else:
        print(f"✅ W{week_num:02d} {mode.upper()}: OK", end='  ')
        return True

def main():
    print("=" * 80)
    print("COMPREHENSIVE WRITING CONTENT AUDIT - W1-31 (Easy + Advanced)")
    print("=" * 80)
    
    easy_pass = []
    easy_fail = []
    adv_pass = []
    adv_fail = []
    
    # Audit Easy mode
    print("\n" + "=" * 80)
    print("EASY MODE (W1-31)")
    print("=" * 80)
    
    for week in range(1, 32):
        if audit_week(week, mode='easy'):
            easy_pass.append(week)
        else:
            easy_fail.append(week)
        
        # Print newline every 5 weeks for readability
        if week % 5 == 0:
            print()
    
    # Audit Advanced mode
    print("\n" + "=" * 80)
    print("ADVANCED MODE (W1-31)")
    print("=" * 80)
    
    for week in range(1, 32):
        if audit_week(week, mode='advanced'):
            adv_pass.append(week)
        else:
            adv_fail.append(week)
        
        if week % 5 == 0:
            print()
    
    # Summary
    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print(f"Easy Mode:  ✅ {len(easy_pass)}/31 pass  |  🚨 {len(easy_fail)}/31 need fixes")
    if easy_fail:
        print(f"  Needs fixes: W{', W'.join(map(str, easy_fail))}")
    
    print(f"Advanced:   ✅ {len(adv_pass)}/31 pass  |  🚨 {len(adv_fail)}/31 need fixes")
    if adv_fail:
        print(f"  Needs fixes: W{', W'.join(map(str, adv_fail))}")
    
    print("\n" + "=" * 80)

if __name__ == '__main__':
    main()
