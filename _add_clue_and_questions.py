#!/usr/bin/env python3
"""
Add clue_statement to all comprehension questions in read.js files.
Also generate extra questions per week (from story) for weeks with < 10 questions.
Handles both easy and advanced modes.
Skips OLD/BACKUP directories.
"""
import os, re, glob, json

BASE = '/Users/binhnguyen/Downloads/Engquest3k/src/data'

# ── Conjugation helpers ───────────────────────────────────────────────────────

CONJ3 = {
    'be': 'is', 'have': 'has', 'do': 'does', 'go': 'goes', 'know': 'knows',
    'visit': 'visits', 'live': 'lives', 'like': 'likes', 'love': 'loves',
    'make': 'makes', 'take': 'takes', 'see': 'sees', 'eat': 'eats',
    'play': 'plays', 'read': 'reads', 'sleep': 'sleeps', 'write': 'writes',
    'sing': 'sings', 'dance': 'dances', 'run': 'runs', 'walk': 'walks',
    'help': 'helps', 'look': 'looks', 'feel': 'feels', 'want': 'wants',
    'talk': 'talks', 'say': 'says', 'hear': 'hears', 'think': 'thinks',
    'call': 'calls', 'draw': 'draws', 'start': 'starts', 'work': 'works',
    'buy': 'buys', 'find': 'finds', 'sit': 'sits', 'smile': 'smiles',
    'laugh': 'laughs', 'wear': 'wears', 'teach': 'teaches', 'show': 'shows',
    'use': 'uses', 'come': 'comes', 'become': 'becomes', 'give': 'gives',
    'bring': 'brings', 'swim': 'swims', 'ride': 'rides', 'put': 'puts',
    'stand': 'stands', 'open': 'opens', 'close': 'closes', 'enjoy': 'enjoys',
    'need': 'needs', 'miss': 'misses', 'match': 'matches', 'catch': 'catches',
    'watch': 'watches', 'reach': 'reaches', 'touch': 'touches',
    'finish': 'finishes', 'wish': 'wishes', 'push': 'pushes',
    'try': 'tries', 'carry': 'carries', 'worry': 'worries', 'fly': 'flies',
    'cry': 'cries', 'study': 'studies', 'reply': 'replies',
    'pass': 'passes', 'fix': 'fixes', 'mix': 'mixes',
}
DECONJ = {v: k for k, v in CONJ3.items()}

def conj3(verb):
    v = verb.lower()
    if v in CONJ3: return CONJ3[v]
    if re.search(r'(ss|sh|ch|x|o)$', v): return v + 'es'
    if re.search(r'[^aeiou]y$', v): return v[:-1] + 'ies'
    return v + 's'

def deconj(verb):
    v = verb.lower()
    if v in DECONJ: return DECONJ[v]
    if v.endswith('ies'): return v[:-3] + 'y'
    if v.endswith('oes'): return v[:-2]
    if v.endswith('ses') or v.endswith('shes') or v.endswith('ches') or v.endswith('xes'):
        return v[:-2]
    if v.endswith('s') and len(v) > 3: return v[:-1]
    return v

def cap(s):
    if not s: return s
    return s[0].upper() + s[1:]

YES_SET = {'yes', 'yeah', 'yep', 'yes she does', 'yes he does', 'yes they do',
           'yes it does', 'yes i do', 'yes we do', 'yes they are', 'yes he is',
           'yes she is', 'yes it is', 'yes, they are', 'yes, she does'}

def is_yes(a):
    return a.lower().strip().startswith('yes')

YES_NO_SHORT = {'yes', 'no', 'yeah', 'nope', 'sure', 'right', 'correct', 'true', 'false'}

_SUBJ_PRONOUNS = {'i','we','you','he','she','they','it'}
_OBJ_PRONOUNS = {'me','him','her','them','us','it'}
_POSSESSIVES = {'my','his','her','its','our','their','your'}
_EXCL_ADJ = {'a','an','the','in','at','on','my','his','her','not','ours','mine','yours','theirs','hers','his','home','here','there','up','down','off','away'}

def pick_best(answers):
    if not answers: return ''
    return sorted(answers, key=lambda a: (
        1 if a.lower().strip() in YES_NO_SHORT else 0,
        -len(a)
    ))[0]

# ── Clue statement generation ────────────────────────────────────────────────

# Words that are typically nouns/adjectives, not verbs, in a subject position
_NONVERBS = {
    'name', 'hair', 'eyes', 'face', 'room', 'house', 'school', 'teacher',
    'mother', 'father', 'friend', 'family', 'town', 'city', 'country',
    'color', 'colour', 'food', 'water', 'book', 'bag', 'chair', 'desk',
    'day', 'year', 'time', 'place', 'way', 'word', 'story', 'class',
    'job', 'job', 'work', 'sport', 'hobby', 'music', 'art', 'park',
    'people', 'animal', 'plant', 'thing', 'word', 'sound', 'light',
}

_MODALS = {'can','could','will','would','shall','should','may','might','must',
           'ought','need','dare'}

# words that shouldn't be subjects in "[S] is [adj]" extraction
_NONSUBJ_WORDS = {'today','tomorrow','yesterday','this','that','these','those',
                  'everyone','everything','nothing','nobody','someone','something',
                  'anyone','anybody','anywhere','everywhere','nowhere'}

# Comprehensive finite verb detector — catches 3rd-person present, past, aux verbs
_FINITE_VERB_RE = re.compile(
    r'\b(is|are|was|were|has|have|had|does|do|did|can|will|shall|may|might|'
    r'see[s]?|look[s]?|feel[s]?|think[s]?|know[s]?|say[s]?|hear[s]?|'
    r'go[e]?s?|like[s]?|love[s]?|want[s]?|need[s]?|make[s]?|take[s]?|'
    r'come[s]?|give[s]?|find[s]?|keep[s]?|show[s]?|tell[s]?|'
    r'wear[s]?|sit[s]?|stand[s]?|run[s]?|walk[s]?|help[s]?|'
    r'play[s]?|read[s]?|write[s]?|eat[s]?|sleep[s]?|smile[s]?|'
    r'laugh[s]?|sing[s]?|dance[s]?|draw[s]?|work[s]?|live[s]?|'
    r'visit[s]?|enjoy[s]?|learn[s]?|call[s]?|start[s]?|ride[s]?|'
    r'swim[s]?|jump[s]?|climb[s]?|paint[s]?|cook[s]?|clean[s]?|'
    r'sit[s]?|meet[s]?|miss[es]?|carry|carries|bring[s]?|buy[s]?|'
    r'open[s]?|close[s]?|put[s]?|turn[s]?|check[s]?|wait[s]?|'
    r'watch[es]?|catch[es]?|match[es]?|touch[es]?|reach[es]?)\b',
    re.IGNORECASE
)

def is_real_verb(v):
    """Return True if v looks like a conjugated/base-form English verb."""
    vl = v.lower()
    return vl in CONJ3 or vl in DECONJ or bool(_FINITE_VERB_RE.fullmatch(vl))

_FUNC_WORDS = {'to','in','on','at','for','by','with','of','from','about','into',
               'out','up','down','after','before','over','under','off','through',
               'a','an','the','and','or','but','so','yet','nor','not'}

def _best_subj_verb(ql, aux_word, pat1, pat2):
    """Try 1-word subject pattern first; fall back to 2-word if verb isn't real.
    Returns match or None."""
    m1 = re.match(pat1, ql)
    if m1:
        v = m1.group(3)
        if is_real_verb(v):
            return m1  # 1-word subject with real verb
    return re.match(pat2, ql) if pat2 else m1

def _extract_subj_verb_rest(q, verb_low):
    """Extract subject/verb/rest from original question preserving capitalization."""
    prefix_m = re.match(r'^(?:what\s+\w+\s+|what\s+)(?:does|did|do)\s+', q, re.I)
    if not prefix_m:
        return None, None, None
    after = q[prefix_m.end():]
    vm = re.search(r'(?<!\w)' + re.escape(verb_low) + r'(?!\w)', after.lower())
    if not vm:
        return None, None, None
    subj = after[:vm.start()].strip()
    verb = after[vm.start():vm.end()]
    rest = after[vm.end():].strip()
    return subj, verb, rest


def make_clue_statement(q_en, best_answer):
    """Convert question + best answer → declarative statement."""
    q = q_en.strip().rstrip('?')
    a = best_answer.strip()
    al = a[0].lower() + a[1:] if a else a  # lowercase-first for mid-sentence embedding
    ql = q.lower()

    # If the answer already looks like a full clause, use it directly.
    # Detect: starts with subject pronoun, OR contains a finite verb form.
    words_a = a.split()
    if words_a and words_a[0].lower() in ('i', 'he', 'she', 'it', 'they', 'we', 'you'):
        return f'{cap(a)}.'
    if _FINITE_VERB_RE.search(a):
        return f'{cap(a)}.'

    # What is/are/was/were [X] → [X] is/are/was/were [a]
    m = re.match(r'^what (is|are|was|were) (.+)$', ql)
    if m:
        aux = m.group(1)
        # Extract subj preserving original capitalization
        orig_m = re.match(r'(?i)^what (?:is|are|was|were) (.+)$', q)
        subj = orig_m.group(1) if orig_m else m.group(2)
        # "what is in/on [X]" → "There is/are [a] in/on [X]"
        loc_m = re.match(r'^(in|on|at) (.+)$', subj.lower())
        if loc_m:
            prep, place = loc_m.group(1), subj[len(loc_m.group(1))+1:]
            return f'There {"is" if aux == "is" else "are"} {al} {prep} {place}.'
        return f'{cap(subj)} {aux} {al}.'

    # Who is/was/are [pred] → [a] is/was [pred]
    m = re.match(r'^who (is|are|was|were) (.+)$', ql)
    if m:
        aux = m.group(1)
        orig_m = re.match(r'(?i)^who (?:is|are|was|were) (.+)$', q)
        pred = orig_m.group(1) if orig_m else m.group(2)
        return f'{cap(a)} {aux} {pred}.'

    # Who [V] [rest] → [a] [V] [rest] (but only if answer doesn't already contain the verb)
    m = re.match(r'^who (\w+s?) (.+)$', ql)
    if m:
        verb, rest = m.group(1), m.group(2)
        orig_m = re.match(r'(?i)^who (\w+s?) (.+)$', q)
        rest_orig = orig_m.group(2) if orig_m else rest
        # If answer already contains the verb, use answer as-is
        if verb.lower() in a.lower().split():
            return f'{cap(a)}.'
        return f'{cap(a)} {verb} {rest_orig}.'

    # What do/does [S] use for [X] → [S] uses [a] for [X]
    m = re.match(r"^what (do|does) ((?:(?:the|a|an) )?[\w']+(?:\s[\w']+)?) use (.+)$", ql)
    if m:
        aux, subj, rest = m.group(1), m.group(2), m.group(3).strip()
        v = 'uses' if aux == 'does' else 'use'
        return f'{cap(subj)} {v} {a} {rest}.'

    # What does/did [S] do [rest] → [S] [a] [rest]
    # (1-word subject first, since "do" pattern has fixed verb)
    m = re.match(r"^what (does|did) ((?:(?:the|a|an) )?[\w']+(?:\s[\w']+)?) do\s*(.*)$", ql)
    if m:
        aux, subj, rest = m.group(1), m.group(2), m.group(3).strip()
        a_clean = a.lower()
        # If answer already starts with subject pronoun, use as-is
        if a_clean.startswith(('he ', 'she ', 'they ', 'i ', 'we ', 'it ', subj.lower())):
            return f'{cap(a)}{(" " + rest) if rest and not a_clean.endswith(rest) else ""}.'
        return f'{cap(subj)} {a}{(" " + rest) if rest else ""}.'

    # What does/did [S] [V] [rest] → [S] [Vs] [a/rest+a depending on rest]
    # Try 1-word subject first to avoid greedy 2-word match swallowing the verb
    _PAT1_WHAT = r"^what (does|did) ((?:(?:the|a|an) )?[\w']+) (\w+)\s*(.*)$"
    _PAT2_WHAT = r"^what (does|did) ((?:(?:the|a|an) )?[\w']+(?:\s[\w']+)?) (\w+)\s*(.*)$"
    m = _best_subj_verb(ql, None, _PAT1_WHAT, _PAT2_WHAT)
    if m:
        aux = m.group(1)
        verb_low = m.group(3).lower()
        subj, verb, rest = _extract_subj_verb_rest(q, verb_low)
        if subj is None:
            subj, verb, rest = m.group(2), m.group(3), m.group(4).strip()
        v_c = conj3(verb) if aux == 'does' else verb
        # If rest starts with "to [verb]", put answer AFTER rest (e.g. "wants to become a scientist")
        if rest.lower().startswith('to ') and len(rest.split()) >= 2 and is_real_verb(rest.split()[1]):
            return f'{cap(subj)} {v_c} {rest} {al}.'
        return f'{cap(subj)} {v_c} {al}{(" " + rest) if rest else ""}.'

    # What do I/we/they [V] [rest] → I/we/they [V] [a] [rest]
    m = re.match(r'^what do (i|we|they|you) (\w+)\s*(.*)$', ql)
    if m:
        subj, verb, rest = m.group(1), m.group(2), m.group(3).strip()
        return f'{cap(subj)} {verb} {al}{(" " + rest) if rest else ""}.'

    # Where does/did [S] [V] [rest] → [S] [Vs] [a] [rest]
    m = re.match(r"^where (does|did|do) ((?:(?:the|a|an) )?[\w']+(?:\s[\w']+)?|i|we|they) (\w+)\s*(.*)$", ql)
    if m:
        aux, subj, verb, rest = m.group(1), m.group(2), m.group(3), m.group(4).strip()
        v_c = conj3(verb) if aux == 'does' else verb
        return f'{cap(subj)} {v_c} {al}{(" " + rest) if rest else ""}.'

    # Where is/are [S] → [S] is [a]
    m = re.match(r'^where (is|are) (.+)$', ql)
    if m:
        aux, subj = m.group(1), m.group(2)
        return f'{cap(subj)} {aux} {al}.'

    # When does/did [S] [V] [rest] → [S] [Vs] [rest] [a]
    m = re.match(r"^when (does|did|do) ((?:(?:the|a|an) )?[\w']+(?:\s[\w']+)?|i|we|they) (\w+)\s*(.*)$", ql)
    if m:
        aux, subj, verb, rest = m.group(1), m.group(2), m.group(3), m.group(4).strip()
        v_c = conj3(verb) if aux == 'does' else verb
        return f'{cap(subj)} {v_c}{(" " + rest) if rest else ""} {al}.'

    # Why does/did [S] [V] [rest] → [S] [Vs] because [a]
    m = re.match(r"^why (does|did|do) ((?:(?:the|a|an) )?[\w']+(?:\s[\w']+)?|i|we|they) (\w+)\s*(.*)$", ql)
    if m:
        aux, subj, verb, rest = m.group(1), m.group(2), m.group(3), m.group(4).strip()
        v_c = conj3(verb) if aux == 'does' else verb
        reason = al if al.startswith('because') else 'because ' + al
        return f'{cap(subj)} {v_c}{(" " + rest) if rest else ""} {reason}.'

    # How does/do [S] feel/look [rest] → [S] feels [a]
    m = re.match(r"^how (does|do|is) ((?:(?:the|a|an) )?[\w']+(?:\s[\w']+)?|i|we|they) (feel|look|seem)\s*(.*)$", ql)
    if m:
        subj, verb = m.group(2), m.group(3)
        return f'{cap(subj)} {conj3(verb)} {al}.'

    # Does [S] [V] [rest] → [S] [Vs] [rest] (yes) / [S] doesn't [V] [rest] (no)
    m = re.match(r"^does ((?:(?:the|a|an) )?[\w']+(?:\s[\w']+)?) (\w+)\s*(.*)$", ql)
    if m:
        subj, verb, rest = m.group(1), m.group(2), m.group(3).strip()
        if is_yes(a):
            return f'{cap(subj)} {conj3(verb)}{(" " + rest) if rest else ""}.'
        else:
            return f'{cap(subj)} does not {verb}{(" " + rest) if rest else ""}.'

    # Do [S] [V] [rest] → [S] [V] [rest]
    m = re.match(r"^do ((?:(?:the|a|an) )?[\w']+(?:\s[\w']+)?|i|we|they) (\w+)\s*(.*)$", ql)
    if m:
        subj, verb, rest = m.group(1), m.group(2), m.group(3).strip()
        if is_yes(a):
            return f'{cap(subj)} {verb}{(" " + rest) if rest else ""}.'
        else:
            return f'{cap(subj)} do not {verb}{(" " + rest) if rest else ""}.'

    # Did [S] [V] [rest] → [S] [V-ed] [rest] → simplified: [S] [V] [a]
    m = re.match(r"^did ((?:(?:the|a|an) )?[\w']+(?:\s[\w']+)?) (\w+)\s*(.*)$", ql)
    if m:
        subj, verb, rest = m.group(1), m.group(2), m.group(3).strip()
        if is_yes(a):
            return f'{cap(subj)} {verb}{(" " + rest) if rest else ""}.'
        else:
            return f'{cap(subj)} did not {verb}{(" " + rest) if rest else ""}.'

    # Is/Are [S] [pred] → [S] is/are [pred]
    m = re.match(r'^(is|are) (\w[\w\s\']*?) ([\w\s]+)$', ql)
    if m:
        aux, subj, pred = m.group(1), m.group(2).strip(), m.group(3).strip()
        if is_yes(a):
            return f'{cap(subj)} {aux} {pred}.'
        else:
            return f'{cap(subj)} is not {pred}.'

    # Am I [adj] → I am/am not [adj]
    m = re.match(r'^am i (.+)$', ql)
    if m:
        pred = m.group(1).strip()
        if is_yes(a):
            return f'I am {pred}.'
        else:
            # Use a different answer from the list if available
            return f'I am not {pred}.'

    # How many [X] [does/do S have/...] → [S] has [a] [X]
    m = re.match(r"^how many ([\w\s]+) (does|do) ((?:(?:the|a|an) )?[\w']+(?:\s[\w']+)?) (\w+)(.*)$", ql)
    if m:
        noun, aux, subj, verb, rest = m.group(1), m.group(2), m.group(3), m.group(4), m.group(5).strip()
        v_c = conj3(verb) if aux == 'does' else verb
        return f'{cap(subj)} {v_c} {al} {noun}.'

    # What [noun] does [S] [V] → [S] [Vs] [a] [noun]
    # Use 1-word subject first to prevent greedy match eating the verb
    _PAT1_WNOUN = r"^what (\w+) (does|did|do) ((?:(?:the|a|an) )?[\w']+) (\w+)\s*(.*)$"
    _PAT2_WNOUN = r"^what (\w+) (does|did|do) ((?:(?:the|a|an) )?[\w']+(?:\s[\w']+)?) (\w+)\s*(.*)$"
    m1 = re.match(_PAT1_WNOUN, ql)
    m = m1 if (m1 and is_real_verb(m1.group(4))) else re.match(_PAT2_WNOUN, ql)
    if m:
        noun, aux, verb_low = m.group(1), m.group(2), m.group(4).lower()
        subj, verb, rest = _extract_subj_verb_rest(q, verb_low)
        if subj is None:
            subj, verb, rest = m.group(3), m.group(4), m.group(5).strip()
        v_c = conj3(verb) if aux == 'does' else verb
        # "What time does [S] [V] [rest]?" — time answer goes AFTER the rest clause
        if noun.lower() in ('time', 'day', 'year', 'grade', 'floor', 'floor') and rest:
            prep = 'on' if noun.lower() in ('day',) else 'in' if noun.lower() in ('year','grade') else 'at'
            return f'{cap(subj)} {v_c} {rest} {prep} {al}.'
        # If rest starts with "to [verb]", put answer AFTER rest
        if rest.lower().startswith('to ') and len(rest.split()) >= 2 and is_real_verb(rest.split()[1]):
            return f'{cap(subj)} {v_c} {rest} {al}.'
        return f'{cap(subj)} {v_c} {al}{(" " + rest) if rest else ""}.'

    # Fallback: use answer as statement
    return f'{cap(a)}.'


# ── Story sentence → extra Q+A+statement ────────────────────────────────────

def clean_story(content_en):
    """Strip ** markers, split into sentences."""
    clean = re.sub(r'\*\*([^*]+)\*\*', r'\1', content_en)
    sents = re.split(r'(?<=[.!?])\s+', clean)
    return [s.strip().rstrip('.!?') for s in sents if 6 <= len(s.strip()) <= 100]

def sentence_to_qa(sent, existing_ans_lower, used_starters):
    """Try to generate Q+A+statement from a story sentence. Returns dict or None."""
    s = sent.strip()
    sl = s.lower().rstrip('.!?,;')
    words = sl.split()
    if len(words) < 3 or len(words) > 16: return None

    def ans_ok(ans):
        a = ans.lower().strip()
        return a not in existing_ans_lower and a not in YES_NO_SHORT and len(a) > 1

    # Pattern: "[S] is [adj] [for/on/...]" / "The [S] is [adj]"
    m = re.match(r'^(?:the |a |an )?([\w\']+) (is|are) ([\w]+)$', sl)
    if m:
        subj, aux, adj = m.group(1), m.group(2), m.group(3)
        if (subj not in _SUBJ_PRONOUNS and subj not in _NONSUBJ_WORDS and
                adj not in _EXCL_ADJ and not re.search(r'(ing|ed)$', adj) and ans_ok(adj)):
            starter = f'What is the {subj} like'
            if starter not in used_starters:
                used_starters.add(starter)
                return {
                    'question_en': f'What is the {subj} like?',
                    'answer': [adj, f'The {subj} is {adj}'],
                    'clue_statement': f'The {subj} is {adj}.',
                    'hint_en': f'Think about the {subj}...',
                    'hint_vi': f'Nghĩ về {subj}...',
                }

    # Pattern: "There is/are [X] in/on [Y]"
    m = re.match(r'^there (is|are) ([\w\s]+?) (in|on|at) (the |a |an )?([\w\s]+)$', sl)
    if m:
        aux, obj, prep, art, place = m.group(1), m.group(2).strip(), m.group(3), m.group(4) or '', m.group(5).strip()
        # Strip leading adverbs/discourse words from obj (e.g. "also markers" → "markers")
        _OBJ_LEAD_STRIP = {'also', 'just', 'still', 'even', 'only', 'really', 'so'}
        obj_words = obj.split()
        if obj_words and obj_words[0].lower() in _OBJ_LEAD_STRIP:
            obj = ' '.join(obj_words[1:]).strip()
        if ans_ok(obj):
            starter = f'What is in {place}'
            if starter not in used_starters:
                used_starters.add(starter)
                # Avoid double articles: don't prepend art if obj already starts with one
                art_prefix = '' if re.match(r'^(a |an |the )', obj) else art
                # Don't add "the" if place already starts with a possessive/pronoun/proper ref
                _POSS_STARTS = {'my', 'his', 'her', 'its', 'our', 'your', 'their',
                                'this', 'that', 'these', 'those'}
                place_first = place.split()[0].lower() if place.split() else ''
                place_prefix = '' if place_first in _POSS_STARTS else 'the '
                # Always use "What is in [place]?" (idiomatic) regardless of source aux
                # but keep aux for clue statement to match source grammar
                return {
                    'question_en': f'What is {prep} {place_prefix}{place}?',
                    'answer': [obj, f'{art_prefix}{obj}', f'There {aux} {obj}'],
                    'clue_statement': f'There {aux} {art_prefix}{obj} {prep} {place_prefix}{place}.',
                    'hint_en': f'Look {prep} {place_prefix}{place}...',
                    'hint_vi': f'Nhìn vào {place}...',
                }

    # Pattern: "[S] V(s) at/in/on [place]" (not "to" — too ambiguous with infinitives)
    m = re.match(r'^(?:the |a |an )?([\w\']+) (\w+) (at|in|on) (the |a |an )?([\w\s]+)$', sl)
    if m:
        subj, verb, prep, place_art, place = m.group(1), m.group(2), m.group(3), m.group(4) or '', m.group(5).strip()
        _DO_SUBJS = {'i', 'you', 'we', 'they'}
        # If subj is a bare common noun (e.g. "teacher", "student"), add "the" as stmt prefix
        _COMMON_NOUNS = {'teacher', 'student', 'teacher\'s', 'principal', 'nurse', 'doctor',
                         'boy', 'girl', 'child', 'parent', 'mom', 'dad'}
        subj_needs_art = subj.lower() in _COMMON_NOUNS and not subj[0].isupper()
        if (verb not in ('is', 'are', 'am', 'was', 'were', 'be') and
                is_real_verb(verb) and
                verb.lower() not in _MODALS and
                subj not in ('my', 'his', 'her', 'its', 'our', 'their', 'this', 'that') and
                ans_ok(place) and place.split()[0] not in _POSSESSIVES and place.split()[0] not in _OBJ_PRONOUNS):
            base = deconj(verb)
            aux = 'do' if subj in _DO_SUBJS else 'does'
            subj_q = 'The ' + subj if subj_needs_art else ('I' if subj == 'i' else subj)
            subj_stmt = 'The ' + subj if subj_needs_art else cap(subj)
            starter = f'Where {aux} {subj_q} {base}' if not subj_needs_art else f'Where does {subj_q} {base}'
            if starter not in used_starters:
                used_starters.add(starter)
                aux_q = 'does' if subj_needs_art else aux
                return {
                    'question_en': f'Where {aux_q} {subj_q} {base}?',
                    'answer': [place, f'{prep} {place_art}{place}'.strip()],
                    'clue_statement': f'{subj_stmt} {verb} {prep} {place_art}{place}.',
                    'hint_en': 'A place...',
                    'hint_vi': 'Một nơi...',
                }

    _ADVERB_STARTERS = {'here', 'there', 'now', 'then', 'today', 'yesterday', 'tomorrow',
                        'always', 'never', 'often', 'sometimes', 'usually', 'every',
                        'here,', 'outside', 'inside', 'together', 'home', 'away',
                        'fast', 'slowly', 'quickly', 'hard', 'early', 'late', 'soon',
                        'well', 'badly', 'right', 'back', 'already', 'still', 'just',
                        'very', 'too', 'so', 'quite', 'really', 'also', 'only', 'even',
                        # prepositions (signals "V + prep-phrase", no direct object)
                        'in', 'on', 'at', 'to', 'near', 'by', 'from', 'into', 'onto',
                        'under', 'over', 'above', 'below', 'beside', 'behind', 'between',
                        'through', 'across', 'around', 'along', 'toward', 'up', 'down',
                        # conjunctions / subordinators — signals a clause, not an object
                        'when', 'where', 'how', 'why', 'that', 'which', 'who', 'what',
                        'after', 'before', 'because', 'if', 'while', 'until', 'once',
                        'since', 'although', 'though', 'as', 'whether', 'unless'}
    # Pattern: "[S] V(s) a/an/the [object]"
    m = re.match(r'^((?:the |a |an )?)([\'\w]+) (\w+) (a |an |the |)([\w][\w\s]{1,20})$', sl)
    if m:
        subj_art, subj, verb, art, obj = m.group(1), m.group(2), m.group(3), m.group(4), m.group(5).strip()
        # Exclude: possessive/pronoun subjects, 'be' verbs, known nouns-as-verbs,
        # objects starting with a verb or adverb
        obj_first = obj.split()[0] if obj.split() else ''
        if (subj not in ('my', 'his', 'her', 'its', 'our', 'their', 'this', 'that',
                         'a', 'an', 'the', 'i', 'we', 'you', 'they', 'it', 'he', 'she') and
                subj not in _NONSUBJ_WORDS and
                verb not in ('is', 'are', 'am', 'was', 'were', 'be', 'been') and
                verb.lower() not in _NONVERBS and
                verb.lower() not in _MODALS and
                is_real_verb(verb) and
                obj_first not in ('is', 'are', 'was', 'were', 'am', 'be') and
                obj_first not in _ADVERB_STARTERS and
                obj_first not in _OBJ_PRONOUNS and
                len(obj.split()) <= 4 and ans_ok(obj)):
            base = deconj(verb)
            starter = f'What does {subj_art}{subj} {base}'
            if starter not in used_starters:
                used_starters.add(starter)
                return {
                    'question_en': f'What does {subj_art}{subj} {base}?',
                    'answer': [obj, f'{art}{obj}'.strip()],
                    'clue_statement': f'{cap(subj_art)}{cap(subj) if not subj_art else subj} {verb} {art}{obj}.',
                    'hint_en': f'Think about what {subj_art}{subj} {base}s...',
                    'hint_vi': f'Nghĩ về {subj_art}{subj}...',
                }

    # Pattern: "My/His/Her [noun] V(s) [object]" — possessive subject
    m = re.match(r'^(my|our|his|her|their) ([\w\']+) (\w+) (a |an |the )?([\w][\w\s]{1,20})$', sl)
    if m:
        poss, noun, verb, art, obj = m.group(1), m.group(2), m.group(3), m.group(4) or '', m.group(5).strip()
        obj_first = obj.split()[0] if obj.split() else ''
        _PRONOUN_OBJ = {'me','him','her','them','us','it'}
        if (verb not in ('is','are','am','was','were','be','has','have','had') and
                is_real_verb(verb) and
                obj_first not in _ADVERB_STARTERS and
                obj_first not in _PRONOUN_OBJ and
                len(obj.split()) <= 4 and ans_ok(obj)):
            base = deconj(verb)
            subj_q = f'{poss} {noun}'
            starter = f'What does {subj_q} {base}'
            if starter not in used_starters:
                used_starters.add(starter)
                return {
                    'question_en': f'What does {subj_q} {base}?',
                    'answer': [obj, f'{art}{obj}'.strip()],
                    'clue_statement': f'{cap(poss)} {noun} {verb} {art}{obj}.',
                    'hint_en': f'Think about what {subj_q} {base}s...',
                    'hint_vi': f'Nghĩ về {noun}...',
                }

    # Pattern: "My/His/Her [noun] is [adj] and [verb]s [obj]" — compound predicate
    m = re.match(r'^(my|our|his|her|their) ([\w\']+) (is|are) ([\w]+) and (\w+) ([\w\s]{1,20})$', sl)
    if m:
        poss, noun, aux, adj, verb2, obj = (m.group(1), m.group(2), m.group(3),
                                             m.group(4), m.group(5), m.group(6).strip())
        adj_orig = s[s.lower().rfind(adj):s.lower().rfind(adj)+len(adj)]
        obj_first = obj.split()[0]
        _PRONOUN_OBJ = {'me','him','her','them','us','it'}
        if (not adj_orig[0].isupper() and adj not in ('a','an','the','not') and
                is_real_verb(verb2) and obj_first not in _PRONOUN_OBJ):
            starter = f'What is {poss} {noun} like'
            if starter not in used_starters:
                used_starters.add(starter)
                return {
                    'question_en': f'What is {poss} {noun} like?',
                    'answer': [adj, f'{cap(poss)} {noun} is {adj}'],
                    'clue_statement': f'{cap(poss)} {noun} {aux} {adj} and {verb2} {obj}.',
                    'hint_en': 'A describing word...',
                    'hint_vi': 'Một từ miêu tả...',
                }

    # Pattern: "My/His/Her [noun] is [adj]" → "What is [possessive] [noun] like?"
    m = re.match(r'^(my|our|his|her|their) ([\w\']+) (is|are) ([\w]+)$', sl)
    if m:
        poss, noun, aux, adj = m.group(1), m.group(2), m.group(3), m.group(4)
        # Exclude proper nouns (capitalized in original), function words, and adverbs
        adj_orig = s[s.lower().rfind(adj):s.lower().rfind(adj)+len(adj)]
        if (adj not in ('a','an','the','in','at','on','my','his','her','not') and
                not adj_orig[0].isupper() and
                adj not in _EXCL_ADJ and
                not re.search(r'(ing|ed)$', adj) and
                ans_ok(adj)):
            starter = f'What is {poss} {noun} like'
            if starter not in used_starters:
                used_starters.add(starter)
                return {
                    'question_en': f'What is {poss} {noun} like?',
                    'answer': [adj, f'{cap(poss)} {noun} is {adj}'],
                    'clue_statement': f'{cap(poss)} {noun} {aux} {adj}.',
                    'hint_en': 'A describing word...',
                    'hint_vi': 'Một từ miêu tả...',
                }

    # Pattern: "[Subject] is [name]" (name detection: capitalized) — case-insensitive prefix
    _NAME_ROLES = {'name','teacher','friend','sister','brother','mother','father','mom','dad','dog','cat','pet','book'}
    m = re.match(r'^(?:[Mm]y|[Hh]is|[Hh]er|[Tt]he) ([\w\s]+?) is ([A-Z][a-z]\w*)$', s)
    if m:
        role, name = m.group(1).strip(), m.group(2)
        if role.lower() not in _NAME_ROLES and ans_ok(name):
            starter = f'Who is {role}'
            if starter not in used_starters:
                used_starters.add(starter)
                return {
                    'question_en': f'Who is {role}?',
                    'answer': [name, f'His {role} is {name}', f'Her {role} is {name}'],
                    'clue_statement': f'{cap(role).capitalize()} is {name}.',
                    'hint_en': f"It starts with '{name[0]}'...",
                    'hint_vi': f"Bắt đầu bằng '{name[0]}'...",
                }

    # Pattern: "I/He/She am/is a [noun]..." → "What is [S]?" — role/description
    m = re.match(r'^(he|she|the \w+) (is|are) (?:a |an )([\w]+)', sl)
    if m:
        subj_l, aux, role = m.group(1), m.group(2), m.group(3)
        subj_q = cap(subj_l)
        if role not in ('good','great','nice','bad','small','big','tall','short') and ans_ok(role):
            starter = f'What is {subj_l}'
            if starter not in used_starters:
                used_starters.add(starter)
                return {
                    'question_en': f'What is {subj_q}?',
                    'answer': [f'a {role}', role, f'{subj_q} is a {role}'],
                    'clue_statement': f'{subj_q} {aux} a {role}.',
                    'hint_en': f'A type of person...',
                    'hint_vi': 'Một loại người...',
                }

    # Pattern: "[S] teaches/teaches [list]" → "What does [S] teach?"
    # (comma list — take first item)
    m = re.match(r'^(?:the |a |an )?([\w\']+) (teach[es]*) ([\w\s,]+)$', sl)
    if m:
        subj, verb, obj_raw = m.group(1), m.group(2), m.group(3)
        obj = obj_raw.split(',')[0].strip()  # take first subject
        if subj not in ('my','his','her','its','our','their','i','we','you','they','he','she','it') and ans_ok(obj):
            base = deconj(verb)
            starter = f'What does {subj} teach'
            if starter not in used_starters:
                used_starters.add(starter)
                return {
                    'question_en': f'What does {subj} teach?',
                    'answer': [obj, obj_raw.strip()],
                    'clue_statement': f'{cap(subj)} {verb} {obj_raw.strip()}.',
                    'hint_en': 'A school subject...',
                    'hint_vi': 'Một môn học...',
                }

    # Pattern: "There are [N] [noun(s)]" → "How many [nouns] are there?"
    m = re.match(r'^there (is|are) (\w+) ([\w\s]+)$', sl)
    if m:
        aux, count, noun_phrase = m.group(1), m.group(2), m.group(3).strip()
        if re.match(r'^\d+$', count) or count in ('many','few','some','several','two','three','four','five','six','seven','eight','nine','ten','twenty','thirty'):
            if ans_ok(count) and ans_ok(noun_phrase):
                starter = f'How many {noun_phrase} are there'
                if starter not in used_starters:
                    used_starters.add(starter)
                    return {
                        'question_en': f'How many {noun_phrase} are there?',
                        'answer': [count, f'There are {count} {noun_phrase}'],
                        'clue_statement': f'There {aux} {count} {noun_phrase}.',
                        'hint_en': 'A number...',
                        'hint_vi': 'Một con số...',
                    }

    # Pattern: "I am in [Grade/Year N]" or "I am [N] years old"
    m = re.match(r'^i am in ([\w\s]+)$', sl)
    if m:
        where = m.group(1).strip()
        if ans_ok(where):
            starter = 'What grade is'
            if starter not in used_starters:
                used_starters.add(starter)
                return {
                    'question_en': 'What grade is the student in?',
                    'answer': [where, f'In {where}'],
                    'clue_statement': f'The student is in {where}.',
                    'hint_en': 'A school year...',
                    'hint_vi': 'Một năm học...',
                }

    # Pattern: "[S] V(s) [adv/adj] when/because [clause]" — skip (clause objects)
    # Pattern: "[S] is [adj] and [adj]" → "What is [S] like?"
    m = re.match(r'^(?:the |a |an )?([\w\']+) (is|are|was|were) ([\w]+) and ([\w]+)$', sl)
    if m:
        subj, aux, adj1, adj2 = m.group(1), m.group(2), m.group(3), m.group(4)
        combo = f'{adj1} and {adj2}'
        if (subj not in _SUBJ_PRONOUNS and subj not in _NONSUBJ_WORDS and ans_ok(combo) and
                adj1 not in _EXCL_ADJ and not re.search(r'(ing|ed)$', adj1)):
            starter = f'What is {subj} like'
            if starter not in used_starters:
                used_starters.add(starter)
                return {
                    'question_en': f'What is {subj} like?',
                    'answer': [combo, f'{cap(subj)} is {combo}'],
                    'clue_statement': f'{cap(subj)} is {combo}.',
                    'hint_en': f'Two describing words...',
                    'hint_vi': 'Hai từ miêu tả...',
                }

    # Pattern: "[S] has/have [obj]" — "What does [S] have?"
    m = re.match(r'^(?:the |a |an )?([\w\']+) (has|have) (a |an |the )?([\w][\w\s]{1,20})$', sl)
    if m:
        subj, verb, art, obj = m.group(1), m.group(2), m.group(3) or '', m.group(4).strip()
        obj_first = obj.split()[0]
        if (subj not in ('my','his','her','its','our','their','this','that','i','we','you','they','it','he','she') and
                obj_first not in _ADVERB_STARTERS and obj_first not in _OBJ_PRONOUNS and
                not (len(obj.split()) == 1 and re.search(r'(ed|ing)$', obj_first)) and
                len(obj.split()) <= 4 and ans_ok(obj)):
            aux = 'does' if verb == 'has' else 'do'
            base = 'have'
            starter = f'What does {subj} have'
            if starter not in used_starters:
                used_starters.add(starter)
                return {
                    'question_en': f'What does {subj} have?',
                    'answer': [obj, f'{art}{obj}'.strip()],
                    'clue_statement': f'{cap(subj)} {verb} {art}{obj}.',
                    'hint_en': f'Think about what {subj} has...',
                    'hint_vi': f'Nghĩ về {subj}...',
                }

    return None


# ── JS file manipulation ─────────────────────────────────────────────────────

def add_clue_statements_to_text(text):
    """Add clue_statement to every question block in JS text that lacks one."""
    parts = re.split(r'(?=(?<!\w)question_en\s*:)', text)
    result = [parts[0]]
    modified = False

    for part in parts[1:]:
        # Already has clue_statement before hint_en in this block?
        # Find where hint_en is in this part
        hint_pos = part.find('hint_en')
        if hint_pos > 0:
            segment_before_hint = part[:hint_pos]
            if 'clue_statement' in segment_before_hint:
                result.append(part)
                continue

        # Extract question_en
        q_m = re.search(r'question_en\s*:\s*"([^"]*)"', part)
        # Extract answer array
        a_m = re.search(r'answer\s*:\s*\[([^\]]*)\]', part, re.DOTALL)

        if q_m and a_m and 'hint_en' in part:
            q_en = q_m.group(1)
            answers = re.findall(r'"([^"]*)"', a_m.group(1))
            best = pick_best(answers) if answers else ''
            if best:
                stmt = make_clue_statement(q_en, best)
                # Escape single quotes and backslashes only
                stmt = stmt.replace('\\', '\\\\').replace('"', '\\"')
                # Detect format: multi-line (newline before hint_en) or single-line
                hint_m = re.search(r'\n(\s*)hint_en', part)
                if hint_m:
                    indent = hint_m.group(1)
                    part = re.sub(
                        r'(\n\s*hint_en)',
                        f'\n{indent}clue_statement: "{stmt}",\\1',
                        part, count=1
                    )
                else:
                    # Single-line: insert before hint_en
                    part = re.sub(
                        r'(hint_en)',
                        f'clue_statement: "{stmt}", \\1',
                        part, count=1
                    )
                modified = True

        result.append(part)

    return ''.join(result), modified


def append_extra_questions_to_text(text, new_qs, existing_count):
    """Append new question objects to the comprehension_questions array."""
    if not new_qs:
        return text, False

    # Find closing ] of comprehension_questions array
    cq_start = text.find('comprehension_questions')
    if cq_start < 0:
        return text, False
    bracket_start = text.find('[', cq_start)
    if bracket_start < 0:
        return text, False

    # Find matching ]
    depth = 0
    bracket_end = -1
    for i in range(bracket_start, len(text)):
        if text[i] == '[': depth += 1
        elif text[i] == ']':
            depth -= 1
            if depth == 0:
                bracket_end = i
                break
    if bracket_end < 0:
        return text, False

    # Detect indentation of existing questions
    array_inner = text[bracket_start+1:bracket_end]
    indent_m = re.search(r'\n(\s+)\{', array_inner)
    indent = indent_m.group(1) if indent_m else '    '

    # Build new question JS strings
    new_js_parts = []
    for q in new_qs:
        q_id = existing_count + len(new_js_parts) + 1
        ans_list = ', '.join(f'"{a}"' for a in q['answer'])
        stmt = q['clue_statement'].replace('"', '\\"')
        hint_en = q['hint_en'].replace('"', '\\"')
        hint_vi = q.get('hint_vi', 'Gợi ý...').replace('"', '\\"')
        block = (
            f'\n{indent}{{\n'
            f'{indent}  id: {q_id},\n'
            f'{indent}  question_en: "{q["question_en"]}",\n'
            f'{indent}  answer: [{ans_list}],\n'
            f'{indent}  clue_statement: "{stmt}",\n'
            f'{indent}  hint_en: "{hint_en}",\n'
            f'{indent}  hint_vi: "{hint_vi}"\n'
            f'{indent}}}'
        )
        new_js_parts.append(block)

    # Insert before the closing ]
    # Add comma after last existing question if needed
    before = text[:bracket_end]
    after = text[bracket_end:]
    # Ensure last entry has trailing comma
    before = re.sub(r'(\})\s*$', r'\1,', before.rstrip())
    inserted = before + ','.join(new_js_parts) + '\n' + (' ' * (len(indent)-2)) + after
    return inserted, True


# ── File processing ───────────────────────────────────────────────────────────

def process_file(filepath):
    text = open(filepath).read()
    if 'comprehension_questions' not in text:
        return 0, 0

    # Step 1: Add clue_statements to existing questions
    new_text, clue_modified = add_clue_statements_to_text(text)

    # Step 2: Count existing questions
    existing_q_count = len(re.findall(r'question_en\s*:', new_text))

    # Step 3: Generate extra questions if < 10
    extra_count = 0
    if existing_q_count < 10:
        needed = 10 - existing_q_count

        # Extract story content
        content_m = re.search(r'content_en\s*:\s*"((?:[^"\\]|\\.)*)"', new_text)
        if content_m:
            content_en = content_m.group(1).replace('\\n', ' ').replace('\\"', '"')
            sentences = clean_story(content_en)

            # Gather existing answers for deduplication
            existing_ans = re.findall(r'answer\s*:\s*\[([^\]]*)\]', new_text, re.DOTALL)
            existing_ans_lower = set()
            for ea in existing_ans:
                for a in re.findall(r'"([^"]*)"', ea):
                    existing_ans_lower.add(a.lower().strip())

            used_starters = set()
            new_qs = []
            for sent in sentences:
                if len(new_qs) >= needed:
                    break
                q = sentence_to_qa(sent, existing_ans_lower, used_starters)
                if q:
                    new_qs.append(q)
                    for a in q['answer']:
                        existing_ans_lower.add(a.lower().strip())

            if new_qs:
                new_text, _ = append_extra_questions_to_text(new_text, new_qs, existing_q_count)
                extra_count = len(new_qs)

    if clue_modified or extra_count > 0:
        with open(filepath, 'w') as f:
            f.write(new_text)

    return 1 if clue_modified else 0, extra_count


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    patterns = [
        f'{BASE}/weeks_easy/*/read.js',
        f'{BASE}/weeks/*/read.js',
    ]

    total_clue = 0
    total_extra = 0
    skipped = 0
    files_done = []

    for pat in patterns:
        for fp in sorted(glob.glob(pat)):
            # Skip OLD/BACKUP dirs
            folder = os.path.dirname(fp)
            folder_name = os.path.basename(folder)
            if 'OLD' in folder_name or 'BACKUP' in folder_name:
                skipped += 1
                continue

            clue_added, extra = process_file(fp)
            rel = fp.replace(BASE + '/', '')
            files_done.append((rel, clue_added, extra))
            total_clue += clue_added
            total_extra += extra

    print(f'\n{"File":<50} {"Clues":>6} {"Extra Qs":>9}')
    print('-' * 68)
    for rel, c, e in files_done:
        print(f'{rel:<50} {"✓" if c else "-":>6} {e if e else "-":>9}')

    print(f'\n✓ Files processed: {len(files_done)} (skipped {skipped} OLD/BACKUP)')
    print(f'✓ Files with clue_statements added: {total_clue}')
    print(f'✓ Extra questions generated: {total_extra} total across files')


if __name__ == '__main__':
    main()
