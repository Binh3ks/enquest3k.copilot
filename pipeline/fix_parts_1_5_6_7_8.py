#!/usr/bin/env python3
"""
fix_parts_1_5_6_7_8.py
----------------------
Fixes W37-42 PART 1 (dictation blank + sub-total) and PART 5-8 (numbering + sub-totals).

PART 1:  First content line = story title (should be dictation blank) + missing Sub-total
PART 5:  No item numbering, no Mistake/Correction format, no Sub-total
PART 6:  Extended Task items not numbered, no Sub-total
PART 7:  Items not numbered, no Sub-total
PART 8:  No Sub-total
"""
import json, copy
from pathlib import Path

ROOT = Path(__file__).parent.parent
LESSONS_DIRS = [
    ROOT / 'public' / 'data' / 'lessons',
    ROOT / 'mcp-server' / 'data' / 'lessons',
]

# ─────────────────────────────────────────────────────────────────────────────
# PART 5 — proper Mistake / Correction content per week / session
# Format: list of (error_sentence, correction_skeleton) tuples
# ─────────────────────────────────────────────────────────────────────────────
PART5_DATA = {
    37: {
        1: [
            ("A dog are living thing.",
             "A dog ____________________ a living thing."),
            ("A rock is living because it grow.",
             "A rock is ____________________ because it does not grow."),
            ("Living things breathes air.",
             "Living things ____________________ air."),
            ("A car is non-living so it does not eat.",
             "A car is non-living ____________________ it does not breathe or grow."),
            ("I am a non-living thing.",
             "I am a ____________________ thing — I can breathe and grow!"),
        ],
        2: [
            ("A turtle is living because it move.",
             "A turtle is living because it ____________________."),
            ("A rock non-living thing.",
             "A rock ____________________ a non-living thing."),
            ("Yesterday, I see a living bird.",
             "Yesterday, I ____________________ a living bird."),
            ("The bird flyed into the tree.",
             "The bird ____________________ into the tree."),
            ("Water is living because it moves.",
             "Water is ____________________ — it does not breathe or grow."),
        ],
        3: [
            ("Today I will explains the rules.",
             "Today I will ____________________ the rules of living things."),
            ("The trees is living things.",
             "The trees ____________________ living things."),
            ("River stones does not need food.",
             "River stones ____________________ not need food."),
            ("A cat are a living thing.",
             "A cat ____________________ a living thing."),
            ("It is non-living because it not grow.",
             "It is non-living because it ____________________ grow."),
        ],
    },
    38: {
        1: [
            ("A dog are a mammal.",
             "A dog ____________________ a mammal."),
            ("Reptiles has dry scales.",
             "Reptiles ____________________ dry scales."),
            ("A amphibian lives in water.",
             "____________________ amphibian lives in water and on land."),
            ("An insects has six legs.",
             "An ____________________ has six legs."),
            ("A bird flys in the sky.",
             "A bird ____________________ in the sky."),
        ],
        2: [
            ("The dog are a mammal.",
             "The dog ____________________ a mammal."),
            ("The lizard have scales.",
             "The lizard ____________________ dry scales."),
            ("The frog are an amphibian.",
             "The frog ____________________ an amphibian."),
            ("A bird use feathers to fly.",
             "A bird ____________________ feathers to fly."),
            ("Animal groups is very interesting.",
             "Animal groups ____________________ very interesting."),
        ],
        3: [
            ("Dogs is mammals.",
             "Dogs ____________________ mammals."),
            ("Snakes has dry scales.",
             "Snakes ____________________ dry scales."),
            ("Frogs are a amphibian.",
             "Frogs are ____________________ amphibians."),
            ("Insects have exactly five legs.",
             "Insects have exactly ____________________ legs."),
            ("Birds uses feathers to fly.",
             "Birds ____________________ feathers to fly."),
        ],
    },
    39: {
        1: [
            ("A dog lay eggs.",
             "A dog ____________________ to live young, not eggs."),
            ("Birds gives birth.",
             "Birds ____________________ eggs to reproduce."),
            ("The egg hatch into a bird.",
             "The egg ____________________ and a baby bird comes out."),
            ("The mother protect the babies.",
             "The mother ____________________ the babies."),
            ("Mammals develops outside the body.",
             "Mammals develop ____________________ the mother's body."),
        ],
        2: [
            ("The platypus are a mammal.",
             "The platypus ____________________ a unique egg-laying mammal."),
            ("Both dog and cat gives birth.",
             "Both dog and cat ____________________ birth to live young."),
            ("Unlike a bird, a dog lay eggs.",
             "Unlike a bird, a dog ____________________ to live young."),
            ("The father protect the babies.",
             "The father ____________________ the babies from danger."),
            ("The babies develops inside.",
             "The babies ____________________ inside the mother."),
        ],
        3: [
            ("Both dog and cat lays eggs.",
             "Both dog and cat ____________________ birth to live young."),
            ("Unlike bird, fish gives birth.",
             "Unlike a bird, most fish ____________________ eggs to reproduce."),
            ("The egg hatches quickly yesterday.",
             "The egg ____________________ and a baby chick came out."),
            ("A mammal give birth.",
             "A mammal ____________________ birth to live young."),
            ("The babies develops inside.",
             "The babies ____________________ inside the mother."),
        ],
    },
    40: {
        1: [
            ("The desert is hoter than the forest.",
             "The desert is ____________________ than the forest."),
            ("The ocean is wet than the desert.",
             "The ocean is ____________________ than the desert."),
            ("Arctic is colder then the city.",
             "The Arctic is colder ____________________ the city."),
            ("Camels lives in the desert.",
             "Camels ____________________ in the desert."),
            ("Animals adapts to survive.",
             "Animals ____________________ to their habitat to survive."),
        ],
        2: [
            ("The polar habitat is cold than the forest.",
             "The polar habitat is ____________________ than the forest."),
            ("The desert are hotter than the ocean.",
             "The desert ____________________ hotter than the ocean."),
            ("Penguins lives in polar regions.",
             "Penguins ____________________ in polar regions."),
            ("The ocean is wetter then the desert.",
             "The ocean is wetter ____________________ the desert."),
            ("A whale is biger than a shark.",
             "A whale is ____________________ than a shark."),
        ],
        3: [
            ("The polar region are colder than the forest.",
             "The polar region ____________________ colder than the forest."),
            ("A polar bear have thick fur.",
             "A polar bear ____________________ thick fur to survive the cold."),
            ("The rainforest is hoter and weter.",
             "The rainforest is ____________________ and ____________________."),
            ("A parrot is small than a bear.",
             "A parrot is ____________________ than a bear."),
            ("Both habitats is very important.",
             "Both habitats ____________________ very important for animals."),
        ],
    },
    41: {
        1: [
            ("Every animal have a life cycle.",
             "Every animal ____________________ a life cycle."),
            ("The larva eat leaves.",
             "The larva ____________________ leaves to grow bigger."),
            ("It become a pupa then.",
             "Next, it ____________________ a pupa."),
            ("First the adult, next the egg.",
             "First the ____________________, then the larva, then the pupa, finally the adult."),
            ("The adult have beautiful wings.",
             "The adult butterfly ____________________ beautiful wings."),
        ],
        2: [
            ("First, the frog lay eggs.",
             "First, the frog ____________________ eggs in water."),
            ("Next, the larva hatch.",
             "Next, the tiny tadpole ____________________ from the egg."),
            ("The tadpole grow legs.",
             "The tadpole ____________________ legs and becomes a froglet."),
            ("Finally, it become adult.",
             "Finally, it ____________________ an adult frog."),
            ("The cycle stop.",
             "The cycle ____________________ — it always repeats."),
        ],
        3: [
            ("Both animals lays eggs.",
             "Both animals ____________________ eggs to reproduce."),
            ("First, it lay an egg.",
             "First, the adult butterfly ____________________ an egg on a leaf."),
            ("Next, the larvas hatch.",
             "Next, the tiny ____________________ hatch from the eggs."),
            ("Unlike frog, butterfly has a pupa.",
             "Unlike a frog, a butterfly goes through a ____________________ stage."),
            ("Final, they are adults.",
             "____________________, they become adult butterflies."),
        ],
    },
    42: {
        1: [
            ("The water cycle stop.",
             "The water cycle ____________________ — it repeats continuously."),
            ("The sun heat the water.",
             "The sun ____________________ the water and starts evaporation."),
            ("Water become vapor.",
             "Water ____________________ vapor and rises into the air."),
            ("The clouds makes precipitation.",
             "The clouds ____________________ precipitation when they are too heavy."),
            ("The water collect in oceans.",
             "The water ____________________ in rivers, lakes, and oceans."),
        ],
        2: [
            ("First, the water evaporate.",
             "First, the water ____________________ and rises as vapor."),
            ("Next, the vapor form clouds.",
             "Next, the vapor ____________________ clouds through condensation."),
            ("Then, precipitation fall down.",
             "Then, precipitation ____________________ as rain or snow."),
            ("Finally, water collect in lakes.",
             "Finally, water ____________________ in rivers and lakes."),
            ("The water cycle never stop.",
             "The water cycle never ____________________ — it is continuous."),
        ],
        3: [
            ("The sun heat the deep ocean.",
             "The sun ____________________ the ocean and causes evaporation."),
            ("Vapor go up into the sky.",
             "Vapor ____________________ up into the sky and forms clouds."),
            ("Cloud forms from condensation.",
             "____________________ form when water vapor cools and condenses."),
            ("Rain fall down quickly.",
             "Rain ____________________ from clouds as precipitation."),
            ("The cycle never stop.",
             "The cycle never ____________________ — water always flows."),
        ],
    },
}

# ─────────────────────────────────────────────────────────────────────────────
# Transform functions
# ─────────────────────────────────────────────────────────────────────────────
def fix_part1(content):
    """Replace first line (story title) with dictation blank. Add Sub-total."""
    new = list(content)
    # Replace first line if it looks like a title (short, no blanks)
    if new and '________' not in new[0] and not new[0].startswith('Stage'):
        new[0] = 'Title: ________________________________________'
    # Add sub-total at end if missing
    if not any('Sub-total' in line for line in new):
        new.append('[ Sub-total: ___ / 6 ]')
    return new


def fix_part5(content, week_num, sess_num):
    """Rewrite PART 5 with numbered format: N. 'error.' → Mistake: ___ | Correction: ___"""
    import re as _re

    # Skip if already in correct numbered format (first non-blank line is "1. '...")
    for l in content:
        stripped = l.strip()
        if stripped:
            if _re.match(r"^\d+\.\s+'", stripped):
                # Already numbered; just ensure Sub-total exists
                if any('Sub-total' in x for x in content):
                    return list(content)
                n = sum(1 for x in content if _re.match(r"^\d+\.\s+'", x.strip()))
                return list(content) + ['[ Sub-total: ___ / %d ]' % n]
            break

    # Strip "Type A: ", "Type A (xxx): ", "Type A (xxx): ... →" prefixes from error sentences
    _TYPE_PREFIX = _re.compile(r'^Type\s+[A-Z]\s*(?:\([^)]+\))?\s*:\s*', _re.I)
    # Strip trailing " → ...", " -> ...", " →", " ->" from error sentences
    _TRAIL_ARROW = _re.compile(r'\s*-?>?\s*_*\s*$')

    def _clean_error(s):
        s = _TYPE_PREFIX.sub('', s).strip()
        # Remove trailing arrow + underscores (e.g. "error. → ____")
        s = _re.sub(r'\s+[-→>]+\s*_*\s*$', '', s).strip()
        return s

    data = PART5_DATA.get(week_num, {}).get(sess_num)
    if not data:
        # Fallback: parse existing content and number it
        new = []
        i = 0
        n = 0
        while i < len(content):
            line = content[i].strip()
            if line.startswith('[') or 'Sub-total' in line:
                # Skip old sub-total lines
                i += 1
                continue
            # Line with inline arrow: "error → blank" or "Type A: error → blank"
            if _re.search(r'\s+[-→>]+\s', line):
                arrow_match = _re.split(r'\s+[-→>]+\s', line, 1)
                err = _clean_error(arrow_match[0])
                if err:
                    n += 1
                    new.append("%d. '%s'" % (n, err))
                    new.append('→ Mistake: ____________________ | Correction: ________________________________________')
                i += 1
            # Line with trailing arrow (no blank on same line)
            elif _re.search(r'\s*[-→>]+\s*$', line):
                err = _clean_error(_re.sub(r'\s*[-→>]+\s*$', '', line))
                if err:
                    n += 1
                    new.append("%d. '%s'" % (n, err))
                    new.append('→ Mistake: ____________________ | Correction: ________________________________________')
                i += 1
            # Line followed by next line starting with → or ->
            elif i + 1 < len(content) and _re.match(r'\s*[-→>]', content[i + 1].strip()):
                err = _clean_error(line)
                if err:
                    n += 1
                    new.append("%d. '%s'" % (n, err))
                    new.append('→ Mistake: ____________________ | Correction: ________________________________________')
                i += 2
            else:
                i += 1
        new.append('[ Sub-total: ___ / %d ]' % n)
        return new

    new = []
    for i, (error, correction) in enumerate(data, 1):
        new.append("%d. '%s'" % (i, error))
        new.append('→ Mistake: ____________________ | Correction: %s' % correction)
    new.append('[ Sub-total: ___ / %d ]' % len(data))
    return new



def fix_part6(content):
    """Number Extended Task items and add Sub-total."""
    new = []
    task_item_count = 0
    in_task = False
    has_extended_task = any('Extended Task' in l for l in content)

    for line in content:
        stripped = line.strip()
        # Detect start of Extended Task
        if 'Extended Task' in stripped:
            new.append(line)
            in_task = True
        elif in_task and '________' in stripped and not stripped.startswith('[') and not stripped.startswith('→'):
            # This is a sentence frame to number
            task_item_count += 1
            # Only add number if not already numbered
            if not stripped[0].isdigit():
                new.append('%d. %s' % (task_item_count, stripped))
            else:
                new.append(line)
        else:
            new.append(line)

    if not any('Sub-total' in line for line in content):
        if task_item_count > 0:
            denom = task_item_count
        elif not has_extended_task:
            # Early-week PART 6: count blank question lines as the denominator
            denom = sum(1 for l in content if '___' in l and not l.strip().startswith('['))
            if denom == 0:
                denom = 2
        else:
            denom = 2
        new.append('[ Sub-total: ___ / %d ]' % denom)
    return new


def fix_part7(content):
    """Number all production items and add Sub-total."""
    new = []
    n = 0
    for line in content:
        stripped = line.strip()
        if not stripped:
            new.append(line)
            continue
        # Skip lines that are already numbered, or are sub-totals / checkboxes
        if stripped[0].isdigit() or stripped.startswith('[') or stripped.startswith('☐'):
            new.append(line)
        else:
            n += 1
            new.append('%d. %s' % (n, stripped))
    if not any('Sub-total' in line for line in content):
        new.append('[ Sub-total: ___ / %d ]' % n)
    return new


def fix_part8(content):
    """Add Sub-total at end of PART 8 if missing."""
    if any('Sub-total' in line for line in content):
        return list(content)
    # Count sentence slots
    n_sentences = sum(1 for line in content if 'My sentence' in line)
    if n_sentences == 0:
        n_sentences = sum(1 for line in content
                          if '________________' in line and 'sentence' not in line.lower())
    if n_sentences == 0:
        n_sentences = 3
    new = list(content)
    new.append('[ Sub-total: ___ / %d ]' % n_sentences)
    return new


# ─────────────────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────────────────
def _find_and_fix_part(sess, part_prefix, fix_fn, *args):
    for p in sess['parts']:
        if p['title'].startswith(part_prefix):
            p['content'] = fix_fn(p['content'], *args)
            return True
    return False


def load_week(week_num):
    path = LESSONS_DIRS[0] / ('W%d.json' % week_num)
    return json.loads(path.read_text(encoding='utf-8'))


def save_week(week_num, data):
    payload = json.dumps(data, ensure_ascii=False, indent=2)
    for d in LESSONS_DIRS:
        path = d / ('W%d.json' % week_num)
        if path.exists():
            path.write_text(payload, encoding='utf-8')


def fix_sessions(sessions_list, week_num):
    """Apply all PART fixes to a sessions list."""
    for sess in sessions_list:
        sn = sess['session']
        _find_and_fix_part(sess, 'PART 1', fix_part1)
        _find_and_fix_part(sess, 'PART 5', fix_part5, week_num, sn)
        _find_and_fix_part(sess, 'PART 6', fix_part6)
        _find_and_fix_part(sess, 'PART 7', fix_part7)
        _find_and_fix_part(sess, 'PART 8', fix_part8)


# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────
import sys

def main():
    weeks = list(range(37, 43))
    if len(sys.argv) > 1:
        arg = sys.argv[1]
        if '-' in arg:
            a, b = arg.split('-')
            weeks = list(range(int(a), int(b) + 1))
        else:
            weeks = [int(arg)]

    for wk in weeks:
        print('── W%d ──────────────────────────' % wk)
        data = load_week(wk)
        for key in ('sessions', 'sessions_5', 'sessions_2'):
            if key in data and isinstance(data[key], list):
                fix_sessions(data[key], wk)
        save_week(wk, data)

        # Quick verification
        for sess in data['sessions']:
            sn = sess['session']
            for p in sess['parts']:
                for pn in ['PART 1', 'PART 5', 'PART 6', 'PART 7', 'PART 8']:
                    if p['title'].startswith(pn):
                        has_sub  = any('Sub-total' in l for l in p['content'])
                        if pn == 'PART 6':
                            has_et = any('Extended Task' in l for l in p['content'])
                            has_num = (any(l.strip()[:2] in ['1.','2.','3.'] for l in p['content'])
                                       if has_et else True)
                        elif pn in ['PART 5', 'PART 7']:
                            has_num  = any(l.strip()[:2] in ['1.','2.','3.'] for l in p['content'])
                        else:
                            has_num = True
                        p1_blank = p['content'][0] == 'Title: ________________________________________' if pn == 'PART 1' else True
                        ok = has_sub and has_num and p1_blank
                        print('  S%d %s: dictation=%s numbered=%s subtotal=%s %s' % (
                            sn, pn, p1_blank, has_num, has_sub, '✓' if ok else '✗'))
        print()

    print('Done. Run: python3 pipeline/validate_lesson_plan.py --all')

if __name__ == '__main__':
    main()
