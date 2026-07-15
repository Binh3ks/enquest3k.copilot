#!/usr/bin/env python3
"""
Audit tool: detect false chunks/collocations in read.js / explore.js
across W1-W35 (ADV + Easy).

A bold `**...**` is a FALSE chunk if it matches any of:
1. Adjective + Profession (unnatural)
2. "the" + Noun (article+noun, not chunk)
3. Verb + Pronoun (gave it/her/them, etc.)
4. Generic Verb + Preposition (went to, came to, flew to, etc.)
5. Verb + Adverb (began suddenly, cheered loudly, etc.)
6. Free grammatical phrase (painting by the lake)
7. Verb + Det + Noun grammatical (made cheese sandwiches)
8. Single-word bold in read.js (forbidden W28+)
9. Wh-clause fragment (remember this X)

A bold `**...**` is a FALSE chunk if it matches any of:
1. Adjective + Profession (unnatural)
2. "the" + Noun (article+noun, not chunk)
3. Verb + Pronoun (gave it/her/them, etc.)
4. Generic Verb + Preposition (went to, came to, flew to, etc.)
5. Verb + Adverb (began suddenly, cheered loudly, etc.)
6. Free grammatical phrase (painting by the lake, put everything)
7. Verb + Adjective + Noun construction (brought fresh X, made cheese X)
   -> the real chunk is just "fresh X" or "cheese X"
8. Single-word bold (forbidden W28+)
9. Wh-clause fragment (remember this X)
10. Verb + generic Noun (e.g. drank lemonade, ate food, read book) —
    the verb takes many possible nouns without sounding unnatural
    (collocation requires that swapping the noun sounds awkward)
    PHrasal verbs (verb+particle) are NOT flagged here, e.g.
    spread out, waved back, fell asleep, picked up, looked at.

Chunks/collocations (the KEEP list):
- Adj + Noun: cheese sandwiches, fresh strawberries, soft blanket,
  local market, hard-working ant, long letter, lovely grandmother
- Verb + Noun cố định: had a picnic, had fun, had the best, said hello,
  told the truth, told her mum, watched the ducks, broke a glass cup
- Phrasal verbs (Verb + Particle): fell asleep, picked up, looked at,
  spread out, waved back, got dressed, sat down, ran out, ran away,
  cut down, put away, put down, get up, get dressed, wake up
- Fixed expressions: Slow and steady wins the race, all winter long,
  on the way, at the end, day after day, year after year

Outputs JSON: per-week per-file list of false chunks with reason.
"""
import re
import json
import pathlib
import sys

# Known false-chunk patterns (substring match, lowercased)
ADJ_PROFESSION = {
    'friendly pilot', 'kind farmer', 'friendly doctor', 'nice scientist',
    'kind chef', 'friendly artist', 'kind teacher', 'good teacher',
    'clever engineer', 'clever scientist', 'clever dentist',
    'great cook', 'busy doctor', 'tired father', 'nice artist',
    'good engineer', 'good artist', 'clever pilot', 'nice dentist',
}

GENERIC_VPREP = {
    'went to', 'went over', 'went on', 'came to', 'came out',
    'flew to', 'flew over', 'flew past', 'flew up', 'flew home', 'flew back',
    'sat on', 'stood at', 'stopped at', 'waved at', 'looked at',
    'jumped out', 'swam alongside', 'swam beside', 'got on', 'gave her', 'gave him',
    'gave it', 'gave them', 'showed her', 'showed them', 'showed him',
    'told her', 'told him', 'told her about', 'helped her', 'helped him',
    'called out', 'kept going', 'kept playing', 'stopped the taxi',
    'helped carry', 'felt proud of', 'said with', 'said with a big smile',
    'said with a smile', 'said kindly', 'said warmly', 'said proudly',
    'said loudly', 'said together', 'felt sorry for', 'came to swim',
    'flew a long way',
}

VERB_ADV = {
    'began suddenly', 'cheered loudly', 'said loudly', 'said together',
    'said with a big smile', 'said with a smile', 'said kindly',
    'said warmly', 'said proudly', 'broke with', 'broke and made',
    'felt very cheerful', 'felt surprised', 'spoke very slowly',
    'walked slowly and safely', 'walked slowly and an toàn',
    'ran out of petrol',
}

# Free grammatical phrase - contains a generic prepositional phrase that's not a chunk
FREE_PHRASES = {
    'painting by the lake', 'by the lake', 'by the river',
    'put everything', 'in the afternoon', 'in the evening', 'in the morning',
    'on the way', 'on the way back', 'at the end', 'at the beginning',
    'at night', 'all summer long',
    'in the warm sunshine', 'on the fence', 'in the corner',
    'on the table', 'on the floor', 'on the board',
}

# Verb + Pronoun patterns (must not be chunks)
VERB_PRONOUN = {
    'gave it', 'gave her', 'gave him', 'gave them',
    'showed it', 'showed her', 'showed him', 'showed them',
    'told it', 'told her', 'told him', 'told them',
    'told her about', 'told her mum', 'told him about',
    'helped her', 'helped him', 'helped them',
    'asked her', 'asked him', 'asked them', 'asked me',
    'told us', 'helped us', 'gave us', 'showed us',
    'remember this', 'remember this adventure',
    'forgot this', 'shared with',
}

# "the" + Noun (article + noun, never a chunk)
THE_NOUN = re.compile(r'^the\s+[a-z]+\s*$', re.IGNORECASE)

# Single word bold
SINGLE_WORD = re.compile(r'^[a-z]+\s*$', re.IGNORECASE)


def classify_bold(chunk):
    """Return list of reasons why this chunk is invalid (empty list = valid)."""
    c = chunk.strip()
    cl = c.lower()
    reasons = []

    # 1. Single word (forbidden W28+)
    if SINGLE_WORD.match(cl):
        reasons.append('single-word bold (forbidden W28+)')
        return reasons  # no need to check further

    # 2. "the" + Noun
    if THE_NOUN.match(cl):
        reasons.append('the+Noun pattern (not a chunk)')
        return reasons

    # 3. Adj + Profession (banned list)
    for bad in ADJ_PROFESSION:
        if bad in cl:
            reasons.append(f'adj+profession: "{bad}"')
            return reasons

    # 4. Verb + Pronoun
    for bad in VERB_PRONOUN:
        if bad in cl and len(cl.split()) <= 4:
            reasons.append(f'verb+pronoun: "{bad}"')
            return reasons

    # 5. Generic V+Prep (only if chunk is exactly 2-3 words)
    words = cl.split()
    if len(words) <= 3:
        for bad in GENERIC_VPREP:
            if cl == bad or cl.startswith(bad + ' ') or cl.endswith(' ' + bad):
                reasons.append(f'generic V+Prep: "{bad}"')
                return reasons

    # 6. Verb + Adverb
    for bad in VERB_ADV:
        if bad in cl:
            reasons.append(f'verb+adverb: "{bad}"')
            return reasons

    # 7. Free grammatical phrase
    for bad in FREE_PHRASES:
        if bad == cl:
            reasons.append(f'free grammatical phrase: "{bad}"')
            return reasons

    # 8. Verb + Adj + Noun (verb+det+noun grammatical, not a real chunk)
    # Pattern: <verb> <adj/det> <noun> where the verb is a generic motion/action verb
    if len(words) == 3:
        # Generic verbs that don't form chunks when followed by det+noun
        generic_verbs = {
            'made', 'brought', 'took', 'got', 'gave', 'saw', 'found',
            'kept', 'put', 'set', 'ran', 'drove', 'rode', 'walked',
            'painted', 'showed', 'spread', 'felt', 'looked',
        }
        if words[0] in generic_verbs and words[1] in ('a', 'the', 'his', 'her', 'my', 'your', 'our', 'their'):
            reasons.append(f'V+Det+Noun grammatical (not a chunk): "{cl}"')
            return reasons

    # 9. Wh-clause fragment
    if cl.startswith('remember this ') or cl.startswith('forgot this '):
        reasons.append('wh-clause fragment')
        return reasons

    # 10. Verb + generic Noun (e.g. drank lemonade, ate food, read book)
    # The verb takes many possible nouns without sounding unnatural, so
    # this is NOT a collocation. Phrasal verbs (verb + particle) are
    # exempt because they're idiomatic chunks.
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
            reasons.append(f'V+generic Noun (not a collocation): "{cl}"')
            return reasons

    return reasons


def extract_bold_chunks(content_en):
    """Return list of (chunk_text, char_offset) tuples from content_en."""
    return re.findall(r'\*\*([^*]+)\*\*', content_en)


def audit_file(path, week, mode):
    """Return list of false-chunk findings for a single file."""
    s = pathlib.Path(path).read_text()
    m = re.search(r'content_en:\s*(["`])((?:\\.|(?!\1).)*)\1', s, re.DOTALL)
    if not m:
        return []
    content = m.group(2)
    chunks = extract_bold_chunks(content)
    findings = []
    for chunk in chunks:
        reasons = classify_bold(chunk)
        if reasons:
            findings.append({
                'week': week,
                'mode': mode,
                'file': path,
                'chunk': chunk,
                'reasons': reasons,
            })
    return findings


def main():
    args = sys.argv[1:]
    explore_only = '--explore-only' in args
    read_only = '--read-only' in args
    scan_all = '--all' in args
    args = [a for a in args if not a.startswith('--')]

    if scan_all:
        weeks = list(range(1, 36))
    elif args:
        weeks = [int(w) for w in args]
    else:
        weeks = list(range(28, 36))

    stations = []
    if not explore_only:
        stations.append('read')
    if not read_only:
        stations.append('explore')

    all_findings = []
    for w in weeks:
        for mode in ['weeks', 'weeks_easy']:
            for station in stations:
                p = f'src/data/{mode}/week_{w:02d}/{station}.js'
                if pathlib.Path(p).exists():
                    findings = audit_file(p, w, mode)
                    all_findings.extend(findings)

    if not all_findings:
        print('No false chunks found.')
        return 0

    print(f'Found {len(all_findings)} false-chunk issues:')
    print()
    for f in all_findings:
        print(f"  W{f['week']:02d} {f['mode']:11s} {f['file']}")
        print(f"     chunk: '{f['chunk']}'")
        for r in f['reasons']:
            print(f"     reason: {r}")
        print()

    # Also output as JSON for tooling
    print('--- JSON ---')
    print(json.dumps(all_findings, indent=2, ensure_ascii=False))
    return 1


if __name__ == '__main__':
    sys.exit(main())
