#!/usr/bin/env python3
"""Fix W29, W30, W31 lesson plans - embed reading passages from teacher_contents into
PART 1 READING INPUT title fields (same pattern as W27/W28).

TeacherPanel.jsx extractPart() reads everything after "READING INPUT" in the title
as the displayed passage text (prependLines).
"""
import json

BASE_LABEL = 'READING INPUT'

def fix_week(week_num):
    path = f"public/data/lessons/W{week_num}.json"
    data = json.load(open(path, encoding='utf-8'))
    
    sessions = data.get('sessions', [])
    tc = data.get('teacher_contents', [])
    
    changed = 0
    for sess_idx, session in enumerate(sessions):
        # Find matching teacher_contents entry
        tc_entry = None
        for item in tc:
            if item.get('session') == sess_idx + 1:
                tc_entry = item
                break
        if tc_entry is None and sess_idx < len(tc):
            tc_entry = tc[sess_idx]
        
        if not tc_entry:
            print(f"  W{week_num} Session {sess_idx+1}: no teacher_contents entry found")
            continue
        
        reading_passage = tc_entry.get('reading_passage', '')
        if not reading_passage or len(str(reading_passage)) < 50:
            print(f"  W{week_num} Session {sess_idx+1}: reading_passage too short or missing")
            continue
        
        # Find PART 1 READING INPUT
        for part in session.get('parts', []):
            title = part.get('title', '')
            if BASE_LABEL in title.upper():
                ai = title.upper().find(BASE_LABEL) + len(BASE_LABEL)
                prefix = title[:ai]  # "PART 1: READING INPUT"
                # Extract story title (short text right after READING INPUT)
                story_title = title[ai:].strip()
                # Build new title: "PART 1: READING INPUT  [Story Title] [Full passage]"
                new_title = f"{prefix}  {story_title} {reading_passage}"
                print(f"  W{week_num} Session {sess_idx+1}: ✅ embedded {len(reading_passage)} chars")
                print(f"    Story: {story_title[:50]!r}")
                print(f"    Passage: {str(reading_passage)[:80]!r}")
                part['title'] = new_title
                changed += 1
                break
    
    if changed > 0:
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"  → Saved {path} ({changed} sessions updated)")
    else:
        print(f"  → No changes made to W{week_num}")
    
    return changed

total = 0
for w in [29, 30, 31]:
    print(f"\nFixing W{w}...")
    total += fix_week(w)

print(f"\n{'='*40}")
print(f"Total sessions updated: {total}")

# Verify all 4 weeks
print("\nVerification:")
for w in [28, 29, 30, 31]:
    data = json.load(open(f"public/data/lessons/W{w}.json"))
    for i, s in enumerate(data['sessions']):
        for p in s.get('parts', []):
            if BASE_LABEL in p.get('title', '').upper():
                ai = p['title'].upper().find(BASE_LABEL) + len(BASE_LABEL)
                rest = p['title'][ai:].strip()
                icon = "✅" if len(rest) > 50 else "❌"
                print(f"  W{w} S{i+1}: {icon} {len(rest)} chars")
