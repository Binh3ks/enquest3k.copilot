#!/usr/bin/env python3
"""Fix W28.json - embed reading passages into PART 1 READING INPUT title fields.

W27 is the reference: each session's PART 1 title should be:
  "PART 1: READING INPUT  [Story Title] [Full passage text...]"

TeacherPanel.jsx extractPart() reads everything after "READING INPUT" as the
displayed passage text (prependLines).
"""
import json, re, copy

PASSAGES = {
    # Session 1 - classic Tortoise and Hare fable (matches comprehension questions:
    #   T/F: hare won? → FALSE;  T/F: tortoise stopped to sleep? → FALSE;
    #   fill-in: "The hare ran fast, but it was too ____!" → late)
    1: (
        "The Tortoise and the Hare",
        "Long ago, a hare and a tortoise lived in the forest. The hare was very fast. "
        "The tortoise was very slow. One day, the hare said: \"I am the fastest animal! "
        "You can never beat me!\" The tortoise smiled. \"Let us have a race,\" he said. "
        "All the animals came to watch. BANG! The race began. The hare ran very fast. "
        "He was far ahead in just a few minutes. He looked back. The tortoise was far, "
        "far behind. \"This race is too easy!\" said the hare. He saw a big shady tree. "
        "\"I will rest here for a while,\" he said. He lay down under the tree and fell "
        "fast asleep. Meanwhile, the tortoise kept walking. Step by step, he moved "
        "forward. He never stopped. Slowly, he walked past the sleeping hare. Finally, "
        "the tortoise crossed the finish line! All the animals cheered. The hare woke "
        "up and ran as fast as he could — but it was too late! The tortoise had already "
        "won. The moral of the story: Slow and steady wins the race!"
    ),
    # Session 2 - Detective Luna's perspective on the middle of the race (matches:
    #   T/F: hare looked back and saw tortoise coming? → FALSE (tortoise far behind);
    #   T/F: tortoise woke the hare up? → FALSE;
    #   fill-in: "The tortoise passed the ____________ hare." → sleeping)
    2: (
        "Detective Luna's Notes: The Middle of the Race",
        "Date: Race Day. At the halfway point, the hare was far ahead. He stopped and "
        "looked back once. He could not see the tortoise at all — the tortoise was far, "
        "far behind. The hare felt very confident. \"The tortoise is so slow. He can "
        "never catch me,\" he thought. He saw a tall shady tree beside the path. He "
        "decided to rest there. \"I have lots of time,\" he said. He lay down on the "
        "cool grass and soon fell fast asleep. He did not hear the birds singing. He "
        "did not hear the animals cheering. Meanwhile, the tortoise was still walking. "
        "He never looked back. He never stopped. One step. Two steps. Three steps. He "
        "walked past a rock. He walked past two trees. Then — he walked past the "
        "sleeping hare! The tortoise did not wake the hare up. He just kept walking "
        "steadily toward the finish line. Detective Luna wrote in her notebook: "
        "\"The tortoise passed the sleeping hare at 2:47 p.m. Slow and steady wins!\""
    ),
    # Session 3 - The Modern Race (matches comprehension questions:
    #   T/F: hare took a bus? → FALSE (hare took bicycle);
    #   T/F: tortoise won again? → TRUE;
    #   fill-in: "The bus went along its ____________ route and never got stuck." → steady)
    3: (
        "The Modern Race",
        "After the famous forest race, the animals decided to have a MODERN race in "
        "the city! Each animal could choose a different transport. The hare was very "
        "excited. He chose the fastest bicycle he could find. \"I will win this time "
        "too!\" he shouted. The tortoise walked slowly to the bus stop and chose the "
        "city bus on its regular route. \"Slow and steady,\" he smiled. BANG! The "
        "modern race began. The hare pedalled his bicycle very fast and went far ahead. "
        "But then he stopped to show off to the crowd. He waved and did tricks. He felt "
        "so confident that he stopped for a snack, then stopped to chat with friends. "
        "Before he knew it — he fell asleep again! Meanwhile, the city bus went along "
        "its steady route and never got stuck. It stopped at each station for just one "
        "minute and moved on again and again. When the hare finally woke up, he saw "
        "the bus crossing the finish line. The tortoise won the modern race again! "
        "The tortoise smiled and said: \"A steady route always wins.\""
    ),
}

path = 'public/data/lessons/W28.json'
with open(path, encoding='utf-8') as f:
    data = json.load(f)

changed = 0
for sess_idx, session in enumerate(data['sessions']):
    sess_num = sess_idx + 1
    if sess_num not in PASSAGES:
        continue
    story_title, passage_text = PASSAGES[sess_num]
    for part in session['parts']:
        title = part.get('title', '')
        if 'READING INPUT' in title.upper():
            # Replace the title with an embedded passage version
            BASE = 'READING INPUT'
            ai = title.upper().find(BASE) + len(BASE)
            prefix = title[:ai]  # e.g. "PART 1: READING INPUT"
            new_title = f"{prefix}  {story_title} {passage_text}"
            print(f"Session {sess_num}: updating READING INPUT title")
            print(f"  OLD: {title[:60]!r}")
            print(f"  NEW: {new_title[:80]!r}")
            part['title'] = new_title
            changed += 1
            break

print(f"\nTotal parts updated: {changed}")

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Saved {path}")

# Verify
data2 = json.load(open(path, encoding='utf-8'))
for sess_idx, session in enumerate(data2['sessions']):
    for p in session['parts']:
        if 'READING INPUT' in p.get('title','').upper():
            BASE = 'READING INPUT'
            ai = p['title'].upper().find(BASE) + len(BASE)
            rest = p['title'][ai:].strip()
            print(f"  Session {sess_idx+1}: passage chars = {len(rest)}, preview: {rest[:80]!r}")
