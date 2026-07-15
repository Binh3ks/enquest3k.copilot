#!/usr/bin/env python3
"""
Week 16 DEEP CONTENT VALIDATION
Validates ALL stations content matches Week 16 theme & requirements
"""

import re
import os
from pathlib import Path

print("=" * 80)
print("WEEK 16 DEEP CONTENT VALIDATION - March 20, 2026")
print("=" * 80)
print()

print("📋 SECTION 1: AI TUTOR CONTENT VALIDATION")
print("-" * 80)

# Check AI Tutor theme
try:
    with open('src/data/weeks/week_16_real.js', 'r', encoding='utf-8') as f:
        ai_tutor = f.read()
        
        # Extract theme
        theme_match = re.search(r'weekTitle_en:\s*["\']([^"\']+)["\']', ai_tutor)
        theme = theme_match.group(1) if theme_match else "NOT FOUND"
        
        # Extract grammar
        grammar_match = re.search(r'grammar_focus:\s*["\']([^"\']+)["\']', ai_tutor)
        grammar = grammar_match.group(1) if grammar_match else "NOT FOUND"
        
        # Check vocabulary coverage
        ai_vocab_words = ["kick", "throw", "catch", "run", "jump", "score", 
                         "team", "goal", "energy", "motion", "pass", "hit", "cheer"]
        found_vocab = sum(1 for word in ai_vocab_words if word in ai_tutor.lower())
        
        # Check mission count
        mission_count = len(re.findall(r'\bid:\s*[123],', ai_tutor))
        
        print(f"Theme: {theme}")
        print(f"  {'✅ CORRECT' if theme == 'Sports Commentary' else '❌ WRONG (expected Sports Commentary)'}")
        print(f"\nGrammar Focus: {grammar}")
        print(f"  {'✅ CORRECT' if 'Present Continuous' in grammar else '❌ WRONG'}")
        print(f"\nMissions: {mission_count}")
        print(f"  {'✅ CORRECT' if mission_count == 3 else f'❌ WRONG (expected 3)'}")
        print(f"\nVocabulary Coverage: {found_vocab}/{len(ai_vocab_words)} words found")
        print(f"  {'✅ GOOD' if found_vocab >= 10 else '⚠️ LOW (some vocab missing)'}")
        
except Exception as e:
    print(f"❌ ERROR reading AI Tutor: {e}")

print()
print("📋 SECTION 2: WORD_POWER VALIDATION (Phase 1 = 3 collocations)")
print("-" * 80)

try:
    with open('src/data/weeks/week_16/word_power.js', 'r', encoding='utf-8') as f:
        word_power = f.read()
        
        # Count collocations
        collocation_count = len(re.findall(r'\bid:\s*\d+', word_power))
        
        # Check if content matches theme
        sports_terms = ["kick", "score", "run", "goal", "ball", "team", "play"]
        found_terms = sum(1 for term in sports_terms if term.lower() in word_power.lower())
        
        print(f"Collocation Count: {collocation_count}")
        if collocation_count == 3:
            print("  ✅ CORRECT (Phase 1 = 3 collocations)")
        else:
            print(f"  ❌ WRONG: Expected 3 (Phase 1), found {collocation_count}")
        
        print(f"\nSports Theme Coverage: {found_terms}/{len(sports_terms)} terms")
        print(f"  {'✅ GOOD' if found_terms >= 4 else '⚠️ LOW'}")
        
        # List collocations
        collocations = re.findall(r'word:\s*["\']([^"\']+)["\']', word_power)
        if collocations:
            print(f"\nCollocations:")
            for i, coll in enumerate(collocations[:3], 1):
                print(f"  {i}. {coll}")
        
except Exception as e:
    print(f"❌ ERROR reading word_power: {e}")

print()
print("📋 SECTION 3: GAME HUB VALIDATION")
print("-" * 80)

try:
    with open('src/data/weeks/week_16/games.js', 'r', encoding='utf-8') as f:
        games = f.read()
        
        # Check vocabulary list
        vocab_section = re.search(r'vocabulary:\s*\[(.*?)\]', games, re.DOTALL)
        if vocab_section:
            vocab_list = re.findall(r'["\']([^"\']+)["\']', vocab_section.group(1))
            print(f"GameHub Vocabulary: {len(vocab_list)} words")
            print(f"  Words: {', '.join(vocab_list[:10])}{'...' if len(vocab_list) > 10 else ''}")
            print(f"  {'✅ CORRECT (13 words)' if len(vocab_list) == 13 else f'⚠️ Count: {len(vocab_list)}'}")
        
        # Check Show & Tell
        show_tell_section = 'show_tell:' in games
        make_sentence_section = 'make_sentence:' in games
        ask_me_section = 'ask_me:' in games
        
        print(f"\nGame Sections:")
        print(f"  Show & Tell: {'✅ EXISTS' if show_tell_section else '❌ MISSING'}")
        print(f"  Make Sentence: {'✅ EXISTS' if make_sentence_section else '❌ MISSING'}")
        print(f"  Ask Me: {'✅ EXISTS' if ask_me_section else '❌ MISSING'}")
        
        # Check theme match (no Week 6/7 legacy content)
        legacy_words = ["box", "desk", "treasure", "grandma"]
        found_legacy = [word for word in legacy_words if word in games.lower()]
        if found_legacy:
            print(f"\n  ❌ WARNING: Legacy content found: {', '.join(found_legacy)}")
            print(f"     (Games may be cloned from Week 6/7 without editing)")
        else:
            print(f"\n  ✅ No legacy Week 6/7 content detected")
        
except Exception as e:
    print(f"❌ ERROR reading games: {e}")

print()
print("📋 SECTION 4: ASK_AI VALIDATION")
print("-" * 80)

try:
    with open('src/data/weeks/week_16/ask_ai.js', 'r', encoding='utf-8') as f:
        ask_ai = f.read()
        
        # Count prompts
        prompt_count = len(re.findall(r'\bid:\s*\d+', ask_ai))
        
        # Check for sports theme
        sports_keywords = ["soccer", "ball", "kick", "score", "goal", "team", "run", "play"]
        found_keywords = sum(1 for kw in sports_keywords if kw in ask_ai.lower())
        
        # Check for STEM vocabulary (energy, motion)
        stem_keywords = ["energy", "motion", "teamwork"]
        found_stem = sum(1 for kw in stem_keywords if kw in ask_ai.lower())
        
        print(f"Prompt Count: {prompt_count}")
        print(f"  {'✅ CORRECT (5 prompts expected)' if prompt_count == 5 else f'⚠️ Found {prompt_count}'}")
        
        print(f"\nSports Theme: {found_keywords}/{len(sports_keywords)} keywords")
        print(f"  {'✅ STRONG' if found_keywords >= 4 else '⚠️ WEAK'}")
        
        print(f"\nSTEM Integration: {found_stem}/{len(stem_keywords)} STEM words")
        print(f"  {'✅ GOOD (W16+ requirement)' if found_stem >= 1 else '❌ NO STEM vocabulary'}")
        
        # Check for legacy content
        legacy_content = ["treasure", "grandma", "box", "toy"]
        found_legacy_ask = [word for word in legacy_content if word in ask_ai.lower()]
        if found_legacy_ask:
            print(f"\n  ❌ WARNING: Legacy content: {', '.join(found_legacy_ask)}")
        else:
            print(f"\n  ✅ No legacy content")
        
except Exception as e:
    print(f"❌ ERROR reading ask_ai: {e}")

print()
print("📋 SECTION 5: SUB-TABS STEM/SOCIAL INTEGRATION")
print("-" * 80)

# Check if sub-tabs have proper STEM/Social content
sub_tabs = [
    ('logic_science.js', 'Science', ['physics', 'science', 'force', 'gravity', 'energy', 'motion']),
    ('singapore_math.js', 'Math', ['part', 'whole', 'total', 'more', 'less', 'bar model']),
    ('social_quiz.js', 'Social Studies', ['history', 'geography', 'culture', 'country', 'ancient', 'pyramid'])
]

for filename, subject, keywords in sub_tabs:
    print(f"\n{subject} ({filename}):")
    try:
        filepath_adv = f'src/data/weeks/week_16/{filename}'
        filepath_easy = f'src/data/weeks_easy/week_16/{filename}'
        
        if os.path.exists(filepath_adv):
            with open(filepath_adv, 'r', encoding='utf-8') as f:
                content = f.read()
                
                # Count questions
                q_count = len(re.findall(r'\bid:\s*\d+', content))
                
                # Check keywords
                found_kw = sum(1 for kw in keywords if kw.lower() in content.lower())
                
                print(f"  Advanced: {q_count} questions | Keywords: {found_kw}/{len(keywords)}")
                
                # Specific checks
                if 'logic_science' in filename:
                    expected = 3
                    status = "✅ CORRECT" if q_count == expected else f"❌ WRONG (expected {expected})"
                    print(f"    {status}")
                    
                    # Check for sports-related science
                    sports_science = ['kick', 'run', 'motion', 'energy', 'force']
                    found_sports_sci = sum(1 for w in sports_science if w in content.lower())
                    if found_sports_sci >= 2:
                        print(f"    ✅ Sports+Science integration found")
                    else:
                        print(f"    ⚠️ May not be Week 16 specific (generic science)")
                        
                elif 'singapore_math' in filename:
                    expected = 5
                    status = "✅ CORRECT" if q_count == expected else f"❌ WRONG (expected {expected})"
                    print(f"    {status}")
                    
                elif 'social_quiz' in filename:
                    expected = 7
                    status = "✅ CORRECT" if q_count == expected else f"❌ WRONG (expected {expected})"
                    print(f"    {status}")
                    
                    # Check Olympics content (Week 16 social = Olympics history)
                    olympics = ['olympic', 'sport', 'athlete', 'ancient', 'greece']
                    found_olympics = sum(1 for w in olympics if w.lower() in content.lower())
                    if found_olympics >= 2:
                        print(f"    ✅ Olympics/Sports history content found")
                    else:
                        print(f"    ⚠️ May not be Week 16 specific (generic history)")
        else:
            print(f"  ❌ File not found: {filepath_adv}")
            
    except Exception as e:
        print(f"  ❌ ERROR: {e}")

print()
print("=" * 80)
print("📊 SUMMARY - CONTENT VALIDATION RESULTS")
print("=" * 80)

issues = []

# Check if AI Tutor has correct theme
if theme != "Sports Commentary":
    issues.append("1. AI TUTOR: Theme incorrect (should be 'Sports Commentary')")

# Check word_power count
if collocation_count != 3:
    issues.append(f"2. WORD_POWER: Has {collocation_count} collocations (should be 3 for Phase 1)")

# Check for legacy content in games
if found_legacy:
    issues.append(f"3. GAMES: Contains legacy content from W6/7: {', '.join(found_legacy)}")

# Check for legacy content in ask_ai
if found_legacy_ask:
    issues.append(f"4. ASK_AI: Contains legacy content: {', '.join(found_legacy_ask)}")

if not issues:
    print("✅ ALL CONTENT VALIDATIONS PASSED!")
    print("   Week 16 content matches theme and requirements.")
else:
    print("❌ CONTENT ISSUES FOUND:")
    for issue in issues:
        print(f"   {issue}")

print()
print("🎯 NEXT STEPS:")
print("   1. Fix bold words (0 → 13+ in all story files) - CRITICAL")
print("   2. Fix Easy grammar (13 → 20 exercises)")
print("   3. Remove backup files (3 files)")
if issues:
    print("   4. Fix content issues listed above")
print()
print("=" * 80)
