"""
Fix remaining audit gaps:
1. W28 PART 2 S1/S2/S3 — add sleep→slept and lose→lost vocab entries
2. W29 PART 2 S1 — add holiday, beach, airplane, car; S2 — add beach, airplane;
   S3 — expand from 9→20+ items
3. W31 PART 2 S1 — add bird, song, soft, hard, loud, beautiful;
   S2 — expand from 7→20+ items; S3 — expand from 7→20+ items
4. W30 S1 — fix header block (0 items → add Name/Date line)
"""

import json

# ─────────────────────────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────────────────────────

def find_part2(session):
    """Return (index, part) of PART 2 Vocabulary section."""
    for pi, p in enumerate(session['parts']):
        if 'PART 2' in p.get('title', '') and 'VOCAB' in p.get('title', '').upper():
            return pi, p
    return None, None


def insert_before_last(content, new_items):
    """Insert new_items just before the final Sub-total line."""
    if content and '[ Sub-total:' in str(content[-1]):
        for item in reversed(new_items):
            content.insert(-1, item)
    else:
        content.extend(new_items)


def replace_content(session, new_content, new_title=None):
    """Replace PART 2 content (and optionally title) for a given session."""
    _, part = find_part2(session)
    if part is None:
        print("  ⚠️  PART 2 not found")
        return
    part['content'] = new_content
    if new_title:
        part['title'] = new_title


# ─────────────────────────────────────────────────────────────────────────────
# W28 — add sleep→slept, lose→lost
# ─────────────────────────────────────────────────────────────────────────────

SLEEP_LOSE_S1 = [
    "EXTRA STORY VERBS (Tier 1 — irregular):",
    "6. sleep → slept (ngủ)",
    "→ Write 3 times: ______________________   ______________________   ______________________",
    "→ Collocation: slept under a tree / slept all afternoon",
    "→ Sentence: The hare _________________________ (slept) under the tree and missed the race.",
    "7. lose → lost (thua)",
    "→ Write 3 times: ______________________   ______________________   ______________________",
    "→ Collocation: lose a race / lose a game",
    "→ Sentence: The hare _________________________ (lost) the race because he was too proud.",
]

SLEEP_LOSE_S2 = [
    "EXTRA STORY VERBS — Deep Review:",
    "sleep → slept",
    "→ Opposite of 'sleep': ____________________ | Past form: ____________________",
    "→ Sentence using 'slept': ____________________________________________________",
    "lose → lost",
    "→ Opposite of 'lose': ____________________ | Past form: ____________________",
    "→ Sentence using 'lost': _____________________________________________________",
]

SLEEP_LOSE_S3 = [
    "sleep → slept: Vietnamese: ____________________ | Sentence: ____________________",
    "lose → lost:   Vietnamese: ____________________ | Sentence: ____________________",
]


def fix_w28(data):
    print("  Fixing W28 PART 2 (sleep/slept, lose/lost)...")

    # S1: insert extra verbs before TIER 2 TRANSPORT PREVIEW block
    _, p1 = find_part2(data['sessions'][0])
    c = p1['content']
    # Find 'TIER 2 TRANSPORT PREVIEW' line
    tier2_idx = next((i for i, x in enumerate(c) if 'TIER 2 TRANSPORT' in str(x)), None)
    if tier2_idx is not None:
        for item in reversed(SLEEP_LOSE_S1):
            c.insert(tier2_idx, item)
        print(f"    S1: inserted {len(SLEEP_LOSE_S1)} items before TIER 2 (now {len(c)} items)")
    else:
        insert_before_last(c, SLEEP_LOSE_S1)
        print(f"    S1: appended (TIER 2 not found) → {len(c)} items")

    # S2: append before subtotal
    _, p2 = find_part2(data['sessions'][1])
    insert_before_last(p2['content'], SLEEP_LOSE_S2)
    print(f"    S2: appended → {len(p2['content'])} items")

    # S3: append before subtotal
    _, p3 = find_part2(data['sessions'][2])
    insert_before_last(p3['content'], SLEEP_LOSE_S3)
    print(f"    S3: appended → {len(p3['content'])} items")


# ─────────────────────────────────────────────────────────────────────────────
# W29 — add holiday, beach, airplane, car; expand S3
# ─────────────────────────────────────────────────────────────────────────────

TRAVEL_WORDS_S1 = [
    "TIER 2 TRAVEL VOCABULARY (Topic Words):",
    "5. holiday (kỳ nghỉ)",
    "→ Write 3 times: _______________ _______________ _______________",
    "→ Key Collocation: go on a holiday / have a holiday",
    "→ Sentence: Last summer, we went on a _________________________ to the beach.",
    "6. beach (bãi biển)",
    "→ Write 3 times: _______________ _______________ _______________",
    "→ Key Collocation: went to the beach / played on the beach",
    "→ Sentence: Max _________________________ (went) to the _________________________ with his family.",
    "7. airplane (máy bay)",
    "→ Write 3 times: _______________ _______________ _______________",
    "→ Key Collocation: flew on an airplane / took an airplane",
    "→ Sentence: They _________________________ (flew) on a big _________________________ to their holiday.",
    "8. car (ô tô)",
    "→ Write 3 times: _______________ _______________ _______________",
    "→ Key Collocation: went by car / drove in a car",
    "→ Sentence: Luna's family _________________________ (went) by _________________________ to the mountain.",
]

TRAVEL_WORDS_S2 = [
    "TIER 2 TRAVEL WORDS — Deep Review:",
    "beach (bãi biển)",
    "→ Key Collocation: at the beach | went to the beach",
    "→ Collocation practice: We _________________________ (went) to the _________________________.",
    "→ Your turn: At the beach, I ___________________________________________________.",
    "airplane (máy bay)",
    "→ Key Collocation: flew on an airplane | took an airplane",
    "→ Collocation practice: They _________________________ (flew) on a big _________________________.",
    "→ Your turn: I have never / always _________________________ on an airplane. _______________",
]

W29_S3_NEW = [
    "MASTERY REVIEW — All vocabulary and verb forms this week.",
    "VERB FORMS (write past tense + 1 sentence each):",
    "went (go):   Past = _____________ | Sentence: Last week, I _________________________ to _____________.",
    "came (come): Past = _____________ | Sentence: My friend _________________________ to my house.",
    "ran (run):   Past = _____________ | Sentence: The rabbit _________________________ very fast.",
    "flew (fly):  Past = _____________ | Sentence: The airplane _________________________ high in the sky.",
    "NEGATIVE FORM (write the negative):",
    "1. 'I went to school.'          → 'I didn't _________________________ to school.'",
    "2. 'She flew on an airplane.'   → 'She didn't _________________________.'",
    "3. 'He came to the party.'      → 'He didn't _________________________.'",
    "TRAVEL VOCABULARY (write Vietnamese + 1 past tense sentence):",
    "holiday:  Vietnamese: ________________ | Sentence: We _________________________ on a holiday.",
    "beach:    Vietnamese: ________________ | Sentence: I _________________________ to the beach.",
    "airplane: Vietnamese: ________________ | Sentence: They _________________________ on an airplane.",
    "car:      Vietnamese: ________________ | Sentence: We _________________________ in the car.",
    "trip:     Vietnamese: ________________ | Sentence: Max went on a _________________________ to _______.",
    "mountain: Vietnamese: ________________ | Sentence: Luna _________________________ a tall mountain.",
    "[ Sub-total: ___ / 16 ]",
]


def fix_w29(data):
    print("  Fixing W29 PART 2 (holiday/beach/airplane/car + expand S3)...")

    # S1: append travel vocab before subtotal
    _, p1 = find_part2(data['sessions'][0])
    insert_before_last(p1['content'], TRAVEL_WORDS_S1)
    print(f"    S1: appended {len(TRAVEL_WORDS_S1)} items → {len(p1['content'])} items")

    # S2: append beach + airplane deep review before subtotal
    _, p2 = find_part2(data['sessions'][1])
    insert_before_last(p2['content'], TRAVEL_WORDS_S2)
    print(f"    S2: appended {len(TRAVEL_WORDS_S2)} items → {len(p2['content'])} items")

    # S3: replace thin 9-item content with full mastery content
    _, p3 = find_part2(data['sessions'][2])
    p3['content'] = W29_S3_NEW
    p3['title'] = "PART 2: VOCABULARY BUILDING — Mastery Level: ALL vocab + verb forms this week"
    print(f"    S3: replaced → {len(p3['content'])} items")


# ─────────────────────────────────────────────────────────────────────────────
# W31 — add bird/song/soft/hard/loud/beautiful; expand S2 and S3
# ─────────────────────────────────────────────────────────────────────────────

SENSES_NATURE_S1 = [
    "TIER 2 TOPIC VOCABULARY — Nature & Describing Words:",
    "5. bird (con chim)",
    "→ Write 3 times: ____________________ ____________________ ____________________",
    "→ Key Collocation: saw a bird / heard a bird singing",
    "→ Sentence: Max _________________________ (saw) a beautiful _________________________ in the tree.",
    "6. song (bài hát / tiếng hót)",
    "→ Write 3 times: ____________________ ____________________ ____________________",
    "→ Key Collocation: heard a song / sang a song",
    "→ Sentence: I _________________________ (heard) the bird's _________________________ in the forest.",
    "7. soft (mềm)",
    "→ Write 3 times: ____________________ ____________________ ____________________",
    "→ Key Collocation: soft leaves / soft wind / felt soft",
    "→ Sentence: I _________________________ (felt) the _________________________ (soft) leaves.",
    "8. hard (cứng)",
    "→ Write 3 times: ____________________ ____________________ ____________________",
    "→ Opposite of soft: ____________________ | Sentence: The rock was very _________________________ .",
    "9. loud (to, ồn ào)",
    "→ Write 3 times: ____________________ ____________________ ____________________",
    "→ Key Collocation: a loud sound / a loud bird / heard a loud noise",
    "→ Sentence: I _________________________ (heard) a very _________________________ (loud) sound.",
    "10. beautiful (đẹp)",
    "→ Write 3 times: ____________________ ____________________ ____________________",
    "→ Key Collocation: a beautiful waterfall / beautiful flowers",
    "→ Sentence: Max _________________________ (saw) a _________________________ (beautiful) waterfall.",
]

W31_S2_NEW = [
    "DEEP REVIEW — Verb forms + Topic vocabulary from Week 31.",
    "SENSE VERBS — Review (write past tense + collocation):",
    "saw (see):     → past: _____________ | I saw ___________________________________.",
    "heard (hear):  → past: _____________ | I heard __________________________________.",
    "felt (feel):   → past: _____________ | I felt (sensation): ________________________.",
    "               →                     | I felt (emotion): __________________________.",
    "smelt (smell): → past: _____________ | I smelt _________________________________.",
    "NEGATIVE FORM DRILL (write the negative):",
    "1. 'I saw a bird.'            → 'I didn't _______________________ a bird.'",
    "2. 'She heard the loud sound.'→ 'She didn't _____________________ the sound.'",
    "3. 'He smelt the flowers.'    → 'He didn't ______________________ the flowers.'",
    "TOPIC VOCABULARY — Deep Review (write Vietnamese + 1 sentence):",
    "bird:      Vietnamese: ________________ | Sentence: I saw a _________________________ in the tree.",
    "song:      Vietnamese: ________________ | Sentence: I heard its _______________________ loudly.",
    "soft:      Vietnamese: ________________ | Sentence: I felt the ________________________ grass.",
    "hard:      Vietnamese: ________________ | Sentence: The rock felt very _____________________.",
    "loud:      Vietnamese: ________________ | Sentence: There was a ___________________ sound outside.",
    "beautiful: Vietnamese: ________________ | Sentence: I saw a __________________ waterfall.",
    "[ Sub-total: ___ / 8 ]",
]

W31_S3_NEW = [
    "MASTERY REVIEW — All vocabulary and verb forms from Week 31.",
    "SENSE VERBS — Write past tense + affirmative + negative sentence:",
    "see → saw:     ✅ 'I saw __________________________________________________.'",
    "               ✅ 'I didn't see ___________________________________________.'",
    "hear → heard:  ✅ 'I heard ________________________________________________.'",
    "               ✅ 'I didn't hear ___________________________________________.'",
    "feel → felt:   ✅ 'I felt _________________________________________________ (sensation).'",
    "               ✅ 'I felt _________________________________________________ (emotion).'",
    "smell → smelt: ✅ 'I smelt ________________________________________________.'",
    "               ✅ 'I didn't smell __________________________________________.'",
    "TOPIC VOCABULARY MASTERY (write Vietnamese + sentence using past tense):",
    "bird:      Vietnamese: ________________ | Past sentence: _______________________",
    "song:      Vietnamese: ________________ | Past sentence: _______________________",
    "soft:      Vietnamese: ________________ | Past sentence: _______________________",
    "hard:      Vietnamese: ________________ | Past sentence: _______________________",
    "loud:      Vietnamese: ________________ | Past sentence: _______________________",
    "beautiful: Vietnamese: ________________ | Past sentence: _______________________",
    "PRODUCTION — Use ALL 4 sense verbs in 4 sentences about a walk in nature:",
    "1. (saw)   I saw ____________________________________________________________.",
    "2. (heard) I heard __________________________________________________________.",
    "3. (felt)  I felt ____________________________________________________________.",
    "4. (smelt) I smelt __________________________________________________________.",
    "[ Sub-total: ___ / 16 ]",
]


def fix_w31(data):
    print("  Fixing W31 PART 2 (add nature vocab + expand S2/S3)...")

    # S1: append nature words before subtotal
    _, p1 = find_part2(data['sessions'][0])
    insert_before_last(p1['content'], SENSES_NATURE_S1)
    p1['title'] = "PART 2: VOCABULARY BUILDING — Sense Verbs + Nature & Describing Words"
    print(f"    S1: appended {len(SENSES_NATURE_S1)} items → {len(p1['content'])} items")

    # S2: replace thin 7-item content with full deep review
    _, p2 = find_part2(data['sessions'][1])
    p2['content'] = W31_S2_NEW
    p2['title'] = "PART 2: VOCABULARY BUILDING — Deep Review: Sense Verbs + Topic Words"
    print(f"    S2: replaced → {len(p2['content'])} items")

    # S3: replace thin 7-item content with mastery
    _, p3 = find_part2(data['sessions'][2])
    p3['content'] = W31_S3_NEW
    p3['title'] = "PART 2: VOCABULARY BUILDING — Mastery Level: All Sense Verbs + Topic Words"
    print(f"    S3: replaced → {len(p3['content'])} items")


# ─────────────────────────────────────────────────────────────────────────────
# W30 — fix S1 header block (0 items)
# ─────────────────────────────────────────────────────────────────────────────

def fix_w30_header(data):
    print("  Fixing W30 S1 header block (0 items)...")
    s = data['sessions'][0]
    for p in s['parts']:
        if 'WEEK 30' in p.get('title', '') and 'SESSION 1' in p.get('title', ''):
            if len(p.get('content', [])) == 0:
                p['content'] = ["Name: ________________________________________ Date: ____________________ Class: _______"]
                print(f"    Header fixed → 1 item")
            else:
                print(f"    Header already has {len(p['content'])} items — skipping")
            break


# ─────────────────────────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────────────────────────

def main():
    fixes = {
        28: fix_w28,
        29: fix_w29,
        31: fix_w31,
    }

    for w, fix_fn in fixes.items():
        path = f"public/data/lessons/W{w}.json"
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        print(f"\nW{w}:")
        fix_fn(data)
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"  → saved")

    # W30 header fix
    path30 = "public/data/lessons/W30.json"
    with open(path30, 'r', encoding='utf-8') as f:
        d30 = json.load(f)
    print(f"\nW30:")
    fix_w30_header(d30)
    with open(path30, 'w', encoding='utf-8') as f:
        json.dump(d30, f, indent=2, ensure_ascii=False)
    print(f"  → saved")

    print("\nAll done.")


if __name__ == "__main__":
    main()
