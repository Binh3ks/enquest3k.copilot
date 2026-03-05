#!/usr/bin/env python3
"""
Validate vocab uniqueness across weeks
Rule from Blueprint:
- Different weeks: 100% unique vocab (no overlap)
- Easy vs Advanced (same week): 50% overlap allowed
"""

import os
import re

def main():
    base = "src/data"
    weeks = [9, 10, 11]
    
    print("="*60)
    print("VOCAB VALIDATION - WEEKS 9, 10, 11")
    print("="*60)
    
    for week in weeks:
        wp = f"week_{week:02d}"
        
        # Advanced vocab
        adv_file = f"{base}/weeks/{wp}/vocab.js"
        adv_words = []
        if os.path.exists(adv_file):
            with open(adv_file) as f:
                content = f.read()
                adv_words = re.findall(r'word:\s*["\']([^"\']+)["\']', content)
        
        # Easy vocab  
        easy_file = f"{base}/weeks_easy/{wp}/vocab.js"
        easy_words = []
        if os.path.exists(easy_file):
            with open(easy_file) as f:
                content = f.read()
                easy_words = re.findall(r'word:\s*["\']([^"\']+)["\']', content)
        
        overlap = set(w.lower() for w in adv_words) & set(w.lower() for w in easy_words)
        overlap_pct = len(overlap) / len(adv_words) * 100 if adv_words else 0
        
        print(f"\nWEEK {week}:")
        print(f"  Advanced ({len(adv_words)}): {adv_words}")
        print(f"  Easy ({len(easy_words)}):     {easy_words}")
        print(f"  Overlap:  {sorted(overlap)} ({overlap_pct:.0f}%)")
        
        if overlap_pct < 40 or overlap_pct > 60:
            print(f"  ⚠️  WARNING: Overlap {overlap_pct:.0f}% outside 40-60% target!")
    
    # Check cross-week
    print(f"\n{'='*60}")
    print("CROSS-WEEK UNIQUENESS CHECK:")
    print('='*60)
    
    all_adv = {}
    all_easy = {}
    
    for week in weeks:
        wp = f"week_{week:02d}"
        
        adv_file = f"{base}/weeks/{wp}/vocab.js"
        if os.path.exists(adv_file):
            with open(adv_file) as f:
                words = re.findall(r'word:\s*["\']([^"\']+)["\']', f.read())
                all_adv[week] = set(w.lower() for w in words)
        
        easy_file = f"{base}/weeks_easy/{wp}/vocab.js"
        if os.path.exists(easy_file):
            with open(easy_file) as f:
                words = re.findall(r'word:\s*["\']([^"\']+)["\']', f.read())
                all_easy[week] = set(w.lower() for w in words)
    
    issues = 0
    for w1 in weeks:
        for w2 in weeks:
            if w1 < w2:
                # Advanced vs Advanced
                overlap_adv = all_adv.get(w1, set()) & all_adv.get(w2, set())
                if overlap_adv:
                    print(f"❌ Week {w1} Adv ∩ Week {w2} Adv: {sorted(overlap_adv)}")
                    issues += 1
                else:
                    print(f"✅ Week {w1} Adv ∩ Week {w2} Adv: No overlap")
                
                # Easy vs Easy
                overlap_easy = all_easy.get(w1, set()) & all_easy.get(w2, set())
                if overlap_easy:
                    print(f"❌ Week {w1} Easy ∩ Week {w2} Easy: {sorted(overlap_easy)}")
                    issues += 1
                else:
                    print(f"✅ Week {w1} Easy ∩ Week {w2} Easy: No overlap")
    
    print(f"\n{'='*60}")
    if issues == 0:
        print("✅ ALL WEEKS PASS VOCAB UNIQUENESS TEST!")
    else:
        print(f"❌ FOUND {issues} CROSS-WEEK OVERLAPS - NEEDS FIX!")
    print('='*60)

if __name__ == "__main__":
    main()
