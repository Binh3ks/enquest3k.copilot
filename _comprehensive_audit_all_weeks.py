#!/usr/bin/env python3
"""
COMPREHENSIVE AUDIT: All 31 weeks, both Easy & Advanced modes
Check for:
1. Sentences that don't make sense
2. Grammar errors
3. Blanks with unclear word type requirements
4. Templates with multiple blanks that are ambiguous
5. Vocabulary issues (distractors, wrong types, insufficient variety)
"""

import os
import re
import json

# Common issues to check
ISSUES = []

def audit_week(week_num, mode='easy'):
    """Audit a single week for all issues"""
    folder = 'weeks_easy' if mode == 'easy' else 'weeks'
    file_path = f'src/data/{folder}/week_{week_num}/writing.js'
    
    if not os.path.exists(file_path):
        ISSUES.append(f"⚠️  W{week_num} {mode.upper()}: File not found")
        return
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract sentence_frames
    frames_match = re.search(r'sentence_frames:\s*\[(.*?)\],\s*hints:', content, re.DOTALL)
    if not frames_match:
        ISSUES.append(f"⚠️  W{week_num} {mode.upper()}: No sentence_frames found")
        return
    
    frames_text = frames_match.group(1)
    templates = re.findall(r'template:\s*[\'"](.+?)[\'"]', frames_text)
    
    # Extract vocabulary
    vocab_match = re.search(r'vocabulary_bank:\s*{.*?words:\s*\[(.*?)\]', content, re.DOTALL)
    if not vocab_match:
        ISSUES.append(f"⚠️  W{week_num} {mode.upper()}: No vocabulary_bank found")
        return
    
    vocab_text = vocab_match.group(1)
    words = re.findall(r'{word:\s*[\'"](.+?)[\'"].*?distractor:\s*(true|false)', vocab_text, re.DOTALL)
    
    # Separate correct words and distractors
    correct_words = [w[0] for w in words if w[1] == 'false' and '===' not in w[0]]
    distractors = [w[0] for w in words if w[1] == 'true']
    
    # Count word types
    past_verbs = [w for w in correct_words if re.match(r'.*(ed|went|got|ate|was|were|had|did|made|came|saw|said|took|gave)$', w)]
    base_verbs = [w for w in correct_words if re.match(r'^(walk|talk|play|run|swim|eat|go|come|see|do|make|have|help|watch|listen|read|write|study|work|clean|cook)$', w)]
    adjectives = [w for w in correct_words if re.match(r'^(happy|sad|tired|excited|great|good|nice|beautiful|fun|big|small|new|old|young|hot|cold|warm|cool)$', w)]
    
    # Check each template
    for i, template in enumerate(templates, 1):
        blank_count = template.count('___')
        
        # Issue 1: Templates with ___ed suffix
        if '___ed' in template:
            ISSUES.append(f"❌ W{week_num} {mode.upper()} S{i}: Has '___ed' suffix → '{template}'")
        
        # Issue 2: Multiple blanks without clear context
        if blank_count >= 2:
            # Check if blanks are ambiguous
            parts = template.split('___')
            
            # Example: "In the morning, I ___ ___" - what is blank 2?
            if len(parts) == 3 and parts[1].strip() == '':
                ISSUES.append(f"⚠️  W{week_num} {mode.upper()} S{i}: Ambiguous 2 blanks → '{template}' (blank 2 unclear)")
            
            # Check for "Yesterday, I ___ and ___" patterns
            if 'and ___' in template and template.startswith('Yesterday'):
                # This is OK if both blanks are past_verb
                pass
            
            # Check for "I ___ at ___ and ___" patterns  
            if template.count('___') == 3:
                ISSUES.append(f"⚠️  W{week_num} {mode.upper()} S{i}: 3 blanks may be ambiguous → '{template}'")
        
        # Issue 3: Grammar patterns that don't make sense
        # "I walk to school" in past tense context
        if 'Yesterday' in template and 'can ___' not in template and 'will ___' not in template:
            # Should only have past tense verbs
            if base_verbs and len(base_verbs) > len(past_verbs):
                ISSUES.append(f"⚠️  W{week_num} {mode.upper()} S{i}: Past tense template but more base verbs than past")
        
        # Issue 4: Incomplete sentences
        if template.endswith('___'):
            # Check if it's a complete thought
            if not any(word in template.lower() for word in ['was', 'is', 'felt', 'looked', 'seemed']):
                # Might be incomplete
                pass
    
    # Issue 5: Insufficient verb variety
    if mode == 'easy':
        if len(past_verbs) < 15:
            ISSUES.append(f"⚠️  W{week_num} {mode.upper()}: Only {len(past_verbs)} past tense verbs (need 15-20)")
    
    # Issue 6: Too many distractors
    if len(distractors) > len(correct_words) * 0.3:
        ISSUES.append(f"⚠️  W{week_num} {mode.upper()}: Too many distractors ({len(distractors)}/{len(correct_words)} = {len(distractors)/len(correct_words)*100:.0f}%)")
    
    # Issue 7: Distractors that are base forms of correct past verbs
    for d in distractors:
        # Check if distractor is base form of a past verb
        if d in ['walk', 'talk', 'play', 'help', 'watch', 'listen', 'clean', 'cook']:
            past_form = d + 'ed'
            if past_form in past_verbs:
                ISSUES.append(f"⚠️  W{week_num} {mode.upper()}: Distractor '{d}' has past form '{past_form}' in vocab")

def generate_report():
    """Generate comprehensive report"""
    print("=" * 80)
    print("COMPREHENSIVE AUDIT: ALL 31 WEEKS (Easy + Advanced)")
    print("=" * 80)
    print()
    
    # Audit all weeks
    for week in range(1, 32):
        audit_week(week, 'easy')
        audit_week(week, 'advanced')
    
    # Print grouped issues
    if not ISSUES:
        print("✅ NO ISSUES FOUND!")
        return
    
    # Group by week
    issues_by_week = {}
    for issue in ISSUES:
        match = re.match(r'[⚠️❌]+\s+W(\d+)', issue)
        if match:
            week = int(match.group(1))
            if week not in issues_by_week:
                issues_by_week[week] = []
            issues_by_week[week].append(issue)
    
    # Print by week
    for week in sorted(issues_by_week.keys()):
        print(f"\n{'─' * 80}")
        print(f"WEEK {week}")
        print('─' * 80)
        for issue in issues_by_week[week]:
            print(issue)
    
    # Summary
    print(f"\n{'=' * 80}")
    print(f"TOTAL ISSUES: {len(ISSUES)}")
    print('=' * 80)
    
    # Count by type
    critical = len([i for i in ISSUES if '❌' in i])
    warnings = len([i for i in ISSUES if '⚠️' in i])
    print(f"❌ CRITICAL: {critical}")
    print(f"⚠️  WARNINGS: {warnings}")

if __name__ == '__main__':
    generate_report()
