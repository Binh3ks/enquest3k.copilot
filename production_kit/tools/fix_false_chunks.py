#!/usr/bin/env python3
"""
Audit helper for false chunks in W1-W35 read.js, explore.js, dictation.js, shadowing.js.

Default mode is DRY RUN and now separates:
1. auto-unbold-safe cases
2. rewrite-needed cases (single-word, too-broad, or chunk should be replaced)

Use --apply to actually unbold only the auto-safe cases.
Rewrite-needed cases are reported and must be fixed manually or with a
sentence-aware rewrite tool.
"""
import re
import pathlib
import sys


ADJ_PROFESSION = {
    'friendly pilot', 'kind farmer', 'friendly doctor', 'nice scientist',
    'kind chef', 'friendly artist', 'kind teacher', 'good teacher',
    'clever engineer', 'clever scientist', 'clever dentist',
    'great cook', 'busy doctor', 'tired father', 'nice artist',
    'good engineer', 'good artist', 'clever pilot', 'nice dentist',
    'friendly doctor', 'kind doctor', 'good doctor',
    'kind engineer', 'kind scientist', 'friendly engineer',
    'friendly dentist', 'great teacher',
}

GENERIC_VPREP = {
    'went to', 'went over', 'went on', 'came to', 'came out',
    'flew to', 'flew over', 'flew past', 'flew up', 'flew home', 'flew back',
    'sat on', 'stood at', 'stopped at', 'waved at', 'looked at',
    'jumped out', 'swam alongside', 'swam beside', 'got on',
    'gave her', 'gave him', 'gave it', 'gave them',
    'showed her', 'showed them', 'showed him', 'showed it',
    'told her', 'told him', 'told it', 'told them',
    'told her about', 'told her mum', 'told him about',
    'helped her', 'helped him', 'helped them',
    'asked her', 'asked him', 'asked them', 'asked me',
    'told us', 'helped us', 'gave us', 'showed us',
    'called out', 'kept going', 'kept playing', 'stopped the taxi',
    'helped carry', 'felt proud of', 'said with', 'said with a big smile',
    'said with a smile', 'said kindly', 'said warmly', 'said proudly',
    'said loudly', 'said together', 'felt sorry for', 'came to swim',
    'flew a long way', 'broke with', 'broke and made', 'walked slowly and safely',
    'walked slowly and an toàn',
}

VERB_ADV = {
    'began suddenly', 'cheered loudly', 'said loudly', 'said together',
    'said with a big smile', 'said with a smile', 'said kindly',
    'said warmly', 'said proudly', 'felt very cheerful', 'felt surprised',
    'spoke very slowly', 'ran out of petrol',
}

FREE_PHRASES = {
    'painting by the lake', 'by the lake', 'by the river',
    'in the afternoon', 'in the evening', 'in the morning',
    'on the way', 'on the way back', 'at the end', 'at the beginning',
    'at night', 'on the fence', 'in the corner',
    'on the table', 'on the floor', 'on the board',
    'in the garden', 'in the kitchen', 'in the bedroom', 'in the park',
}

VERB_PRONOUN = {
    'gave it', 'gave her', 'gave him', 'gave them',
    'showed it', 'showed her', 'showed him', 'showed them',
    'told it', 'told her', 'told him', 'told them',
    'told her about', 'told her mum', 'told him about',
    'helped her', 'helped him', 'helped them',
    'asked her', 'asked him', 'asked them', 'asked me',
    'told us', 'helped us', 'gave us', 'showed us',
    'remember this', 'remember this adventure',
    'forgot this', 'shared with', 'caught with',
}

THE_NOUN = re.compile(r'^the\s+[a-z]+\s*$', re.IGNORECASE)
SINGLE_WORD = re.compile(r'^[a-z]+\s*$', re.IGNORECASE)
GENERIC_VERBS = {
    'made', 'brought', 'took', 'got', 'gave', 'saw', 'found',
    'kept', 'put', 'set', 'ran', 'drove', 'rode', 'walked',
    'painted', 'showed', 'spread', 'felt', 'looked',
    'caught', 'cut', 'drew', 'built', 'chose',
}


def classify(chunk):
    """Return (action, reason). action in {'rewrite_needed', 'auto_unbold', 'keep'}"""
    c = chunk.strip()
    cl = c.lower()
    if not cl:
        return 'keep', None

    if SINGLE_WORD.match(cl):
        return 'rewrite_needed', 'single-word bold'

    if THE_NOUN.match(cl):
        return 'auto_unbold', 'the+Noun pattern'

    for bad in ADJ_PROFESSION:
        if cl == bad or cl.startswith(bad + ' ') or cl.endswith(' ' + bad):
            return 'rewrite_needed', f'adj+profession: "{bad}"'

    for bad in VERB_PRONOUN:
        if cl == bad or cl.startswith(bad + ' ') or cl.endswith(' ' + bad):
            return 'auto_unbold', f'verb+pronoun: "{bad}"'

    words = cl.split()
    if len(words) <= 3:
        for bad in GENERIC_VPREP:
            if cl == bad or cl.startswith(bad + ' ') or cl.endswith(' ' + bad):
                return 'rewrite_needed', f'generic V+Prep: "{bad}"'

    for bad in VERB_ADV:
        if bad in cl:
            return 'rewrite_needed', f'verb+adverb: "{bad}"'

    if cl in FREE_PHRASES:
        return 'auto_unbold', f'free grammatical phrase: "{cl}"'

    if len(words) == 3 and words[0] in GENERIC_VERBS and words[1] in ('a', 'the', 'his', 'her', 'my', 'your', 'our', 'their'):
        return 'rewrite_needed', f'V+Det+Noun grammatical (not a chunk): "{cl}"'

    if cl.startswith('remember this ') or cl.startswith('forgot this '):
        return 'auto_unbold', 'wh-clause fragment'

    if len(words) == 2:
        verb, noun = words[0], words[1]
        generic_verbs_v2 = {
            'drank', 'drink', 'drinks', 'ate', 'eat', 'eats',
            'took', 'take', 'takes', 'bought', 'buy', 'buys',
            'wrote', 'write', 'writes', 'cooked', 'cook', 'cooks',
            'poured', 'pour', 'pours', 'felt', 'feel', 'feels',
        }
        generic_nouns = {
            'lemonade', 'juice', 'water', 'milk', 'tea', 'coffee',
            'food', 'rice', 'soup', 'sandwich', 'cookies', 'cake',
            'book', 'story', 'letter', 'card', 'page',
            'paint', 'ink', 'sand', 'paper', 'tree', 'seed',
            'music', 'song', 'noise', 'sound',
        }
        if verb in generic_verbs_v2 and noun in generic_nouns:
            return 'rewrite_needed', f'V+generic Noun (not a collocation): "{cl}"'

    return 'keep', None


def fix_file(path, dry_run=True):
    p = pathlib.Path(path)
    if not p.exists():
        return 0, [], []

    content = p.read_text()
    chunks_in_file = re.findall(r'\*\*([^*]+)\*\*', content)
    auto_unbolded = []
    rewrite_needed = []
    new_content = content

    for chunk in chunks_in_file:
        action, reason = classify(chunk)
        if action == 'auto_unbold':
            old = f'**{chunk}**'
            new = chunk
            if old in new_content:
                new_content = new_content.replace(old, new, 1)
                auto_unbolded.append((chunk, reason))
        elif action == 'rewrite_needed':
            rewrite_needed.append((chunk, reason))

    if not dry_run and new_content != content:
        p.write_text(new_content)

    return len(auto_unbolded), auto_unbolded, rewrite_needed


def main():
    dry_run = '--apply' not in sys.argv
    explore_only = '--explore-only' in sys.argv
    read_only = '--read-only' in sys.argv
    scan_all = '--all' in sys.argv
    args = [a for a in sys.argv[1:] if not a.startswith('--')]

    if scan_all:
        weeks = list(range(1, 36))
    elif args:
        weeks = [int(w) for w in args]
    else:
        weeks = list(range(28, 36))

    stations = []
    if not explore_only:
        stations.extend(['read', 'dictation', 'shadowing'])
    if not read_only:
        stations.append('explore')

    if dry_run:
        print('DRY RUN - no changes will be made. Use --apply to actually unbold only auto-safe cases.')
    else:
        print('APPLYING auto-safe unbold changes...')
    print()

    total_auto = 0
    total_rewrite = 0
    for w in weeks:
        for mode in ['weeks', 'weeks_easy']:
            for station in stations:
                p = f'src/data/{mode}/week_{w:02d}/{station}.js'
                count, auto_unbolded, rewrite_needed = fix_file(p, dry_run=dry_run)
                if count > 0 or rewrite_needed:
                    total_auto += count
                    total_rewrite += len(rewrite_needed)
                    print(f'W{w:02d} {mode:11s} {station:11s}: auto_unbold={count}, rewrite_needed={len(rewrite_needed)}')
                    for chunk, reason in auto_unbolded[:5]:
                        print(f'    - auto_unbold: "{chunk}" ({reason})')
                    for chunk, reason in rewrite_needed[:5]:
                        print(f'    - rewrite_needed: "{chunk}" ({reason})')
                    hidden = max(0, count + len(rewrite_needed) - 10)
                    if hidden:
                        print(f'    ... and {hidden} more')

    print()
    print(f'Total auto-unbold: {total_auto}')
    print(f'Total rewrite-needed: {total_rewrite}')

    if dry_run:
        print('Run with --apply to unbold only auto-safe cases. Rewrite-needed items must be fixed separately.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
