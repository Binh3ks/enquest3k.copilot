#!/usr/bin/env python3
"""
Fix writing scaffolding issues:
1. Shuffle distractors into middle (not at end)
2. Remove '(sai dạng)' labels from distractor translations
3. Increase sentence frames: Easy 7-8, Advanced 5-6
"""

import re
import json

# Week 26 Advanced
w26_adv_frames = [
    '{"template":"Panel 1: On Saturday morning, I ___ed ___."}',
    '{"template":"Panel 2: Then I ___ed ___ and it was ___."}',
    '{"template":"Panel 2: I also ___ed ___ with ___."}',
    '{"template":"Panel 3: Suddenly, ___ happened!"}',
    '{"template":"Panel 4: At the end, I felt ___."}',
]

w26_adv_vocab = [
    '{word: "visited", vi: "đã thăm", distractor: false}',
    '{word: "played", vi: "đã chơi", distractor: false}',
    '{word: "play", vi: "chơi", distractor: true}',
    '{word: "watched", vi: "đã xem", distractor: false}',
    '{word: "walked", vi: "đi bộ", distractor: false}',
    '{word: "watch", vi: "xem", distractor: true}',
    '{word: "returned", vi: "đã về", distractor: false}',
    '{word: "was", vi: "đã là/ở", distractor: false}',
    '{word: "were", vi: "đã là/ở (nhiều người)", distractor: false}',
    '{word: "visit", vi: "thăm", distractor: true}',
    '{word: "first", vi: "đầu tiên", distractor: false}',
    '{word: "next", vi: "tiếp theo", distractor: false}',
    '{word: "finally", vi: "cuối cùng", distractor: false}',
]

# Week 27 Easy
w27_easy_frames = [
    '{"template":"A seed starts in the ___. It needs ___, ___, and ___."}',
    '{"template":"First, you plant the seed in ___ soil."}',
    '{"template":"First, the roots grow ___. Then, a small ___ appears."}',
    '{"template":"After a few days, the ___ pushes through the soil."}',
    '{"template":"The plant grows ___ and its leaves are ___."}',
    '{"template":"It needs ___ water and ___ sunlight every day."}',
    '{"template":"Finally, it becomes a ___ plant that ___."}',
    '{"template":"A plant is important because ___."}',
]

w27_easy_vocab = [
    '{word: "seed", vi: "hạt giống", distractor: false}',
    '{word: "soil", vi: "đất", distractor: false}',
    '{word: "root", vi: "rễ cây", distractor: false}',
    '{word: "grow", vi: "lớn", distractor: true}',
    '{word: "stem", vi: "thân cây", distractor: false}',
    '{word: "leaf", vi: "lá", distractor: false}',
    '{word: "need", vi: "cần", distractor: true}',
    '{word: "flower", vi: "hoa", distractor: false}',
    '{word: "sunlight", vi: "ánh sáng mặt trời", distractor: false}',
    '{word: "grows", vi: "lớn lên", distractor: false}',
    '{word: "needs", vi: "cần", distractor: false}',
    '{word: "sprout", vi: "mầm non", distractor: false}',
    '{word: "water", vi: "nước", distractor: false}',
    '{word: "absorbs", vi: "hấp thụ", distractor: false}',
]

print("Week 26 Advanced frames:", len(w26_adv_frames))
print("Week 26 Advanced vocab:", len(w26_adv_vocab))
print("Week 27 Easy frames:", len(w27_easy_frames))
print("Week 27 Easy vocab:", len(w27_easy_vocab))

print("\nUpdates needed:")
print("- W26 Adv: 5 frames, 13 vocab (3 distractors shuffled)")
print("- W27 Easy: 8 frames, 14 vocab (2 distractors shuffled)")
print("- Remove '(sai dạng)' from all distractor vi translations")
