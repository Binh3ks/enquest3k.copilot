#!/usr/bin/env python3
"""
DEBUG and FIX Week 1 story_arc issues
"""

import json
import re

WEEK1_FILE = "/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks/week_01_real.js"

def extract_mission_story_arc(content, mission_id):
    """Extract story_arc for a specific mission"""
    # Find mission block
    pattern = rf'mission_id: {mission_id},.*?(story_arc: {{.*?}}),.*?minimum_turns'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        return match.group(1)
    return None

def main():
    print("🔍 Debugging Week 1 story_arc...")
    
    with open(WEEK1_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check Mission 2 story_arc
    print("\n📋 Mission 2 story_arc:")
    m2_story = extract_mission_story_arc(content, 2)
    if m2_story:
        print(f"  Found: {len(m2_story)} chars")
        print(f"  First 200 chars: {m2_story[:200]}")
        # Check if it has phases array
        if 'phases: [' in m2_story:
            print("  ✅ Has phases array")
        else:
            print("  ❌ NO phases array!")
    else:
        print("  ❌ Not found!")
    
    # Check Mission 3 story_arc
    print("\n📋 Mission 3 story_arc:")
    m3_story = extract_mission_story_arc(content, 3)
    if m3_story:
        print(f"  Found: {len(m3_story)} chars")
        print(f"  First 200 chars: {m3_story[:200]}")
        if 'phases: [' in m3_story:
            print("  ✅ Has phases array")
        else:
            print("  ❌ NO phases array!")
    else:
        print("  ❌ Not found!")
    
    # Check if the closing braces are correct
    print("\n🔍 Checking structure...")
    m2_count_open = m2_story.count('{') if m2_story else 0
    m2_count_close = m2_story.count('}') if m2_story else 0
    print(f"  Mission 2: {{ count={m2_count_open}, }} count={m2_count_close}")
    
    m3_count_open = m3_story.count('{') if m3_story else 0
    m3_count_close = m3_story.count('}') if m3_story else 0
    print(f"  Mission 3: {{ count={m3_count_open}, }} count={m3_count_close}")
    
    if m2_count_open != m2_count_close:
        print("  ⚠️ Mission 2: Unbalanced braces!")
    if m3_count_open != m3_count_close:
        print("  ⚠️ Mission 3: Unbalanced braces!")


if __name__ == "__main__":
    main()
