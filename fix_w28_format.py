#!/usr/bin/env python3
"""
fix_w28_format.py
Transform W29-W36 lesson plan JSON to exactly match W28's golden-standard format.

Structural differences found across weeks:
  W29:       Vocab embedded in PART 1 (needs split); parts 2-8 → 3-9; emoji header
  W30,32-34: Already 11 parts + PART 2 VOCAB; needs [ALL] cleaned; header merged
  W31,W35:   10 parts S1/S2, 9 parts S3 (missing PART 2 S3); needs [O] cleaned; no Spiral
  W36:       11/11/10 parts; PART 2/4 titles have content merged; no Spiral for S3

All weeks need:
  - quick_ref: "Unit / Theme" → "Theme"; Block cleanup
  - task_cards_by_session: s1→1, s2→2, s3→3
  - sessions_2 + sessions_5: rebuilt from transformed sessions

Usage:
  python3 fix_w28_format.py              # all W29-W36
  python3 fix_w28_format.py 29           # single week
  python3 fix_w28_format.py 29 30 31     # specific weeks
"""

import sys, json, re, copy
from pathlib import Path

ROOT = Path(__file__).parent
PUBLIC_JSON  = ROOT / 'public/data/lessonPlans.json'
PUBLIC_IDX   = ROOT / 'public/data/lessonPlans_index.json'
MCP_IDX      = ROOT / 'mcp-server/data/lessonPlans_index.json'
MCP_LESSONS  = ROOT / 'mcp-server/data/lessons'
PUB_LESSONS  = ROOT / 'public/data/lessons'

# ── Helpers ───────────────────────────────────────────────────────────────────

EMOJI_RE = re.compile(
    r'^[\U0001F300-\U0001FAFF\u2600-\u27BF\uFE0F\u200D\u20E3\s]+',
    re.UNICODE
)

LISTENING_SUBTITLES = {
    1: 'Cambridge Flyers Listening format',
    2: 'Cambridge Flyers Listening Part 3 (matching)',
    3: 'Cambridge Flyers Listening Part 1 (Multiple Choice + T/F)',
}

def clean_title(title):
    """Remove [ALL], [O], (Station C...), (Whole-class pause...) and trailing noise."""
    t = title
    # Remove bracketed suffixes like [ALL], [O], [Y], [O] (...)
    t = re.sub(r'\s*\[(?:ALL|O|Y|O-ALL)\].*$', '', t, flags=re.I)
    # Remove parenthetical noise suffixes
    t = re.sub(r'\s*\((?:Whole-class pause|Station C|teacher reads|Write your answer)[^)]*\).*$', '', t, flags=re.I)
    # Remove time annotations like "(40 mins)", "(80 mins)", "(25–30 min)"
    t = re.sub(r'\s*\(\d[0-9–\-]+ min[^)]*\)\s*$', '', t)
    # Remove emoji prefix
    t = EMOJI_RE.sub('', t).strip()
    return t.strip()


def extract_story_title(part1_content):
    """Extract story/reading title from PART 1 content[0]."""
    if not part1_content:
        return ''
    line = part1_content[0]
    # "A. Reading: Max's Magic Trip" → "Max's Magic Trip"
    m = re.match(r'A\.\s*Reading:\s*(.+)', line, re.I)
    if m:
        return m.group(1).strip()
    # "Max's Magic Trip Last summer..." — title before a newline marker? Just use full line.
    # Don't include the full story text
    if len(line) < 80 and not line.startswith('Stage'):
        return line.strip()
    return ''


def extract_stem_topic(part_content):
    """Extract STEM/CLIL topic from content[0] of the STEM part (only if it's clearly a topic line)."""
    if not part_content:
        return ''
    line = part_content[0]
    # These prefixes indicate exercise content, not a topic title
    BAD_STARTS = ('The diagram', 'The cover', 'To show', 'When I', 'A.', 'B.', 'Stage',
                  'Inquiry', 'Look at', 'Read', 'Watch', 'The ____', 'Crabs', 'Today')
    if any(line.startswith(s) for s in BAD_STARTS):
        return ''
    return line.strip()


STEM_STOP_PATTERN = re.compile(
    r'\s+(?:Read\s+this|Read:\s|Watch\s|What\s+[Dd]o|What\s+is|How\s+do|Why\s+do|'
    r'Crabs|Paper\s+Boats|Drawing|Sharing|Caring|Look\s+at)',
    re.I
)

def clean_stem_topic(raw):
    """Trim exercise/example text appended after the real STEM topic name."""
    m = STEM_STOP_PATTERN.search(raw)
    if m:
        topic = raw[:m.start()].strip().rstrip(':;,')
    elif len(raw) > 50:
        topic = raw[:50].rsplit(' ', 1)[0].rstrip(':;,')
    else:
        topic = raw.rstrip(':;,')
    return topic


def extract_portfolio_topic(part_content):
    """Extract topic from portfolio part content[0]."""
    if not part_content:
        return ''
    line = part_content[0]
    # "📝 Week 29 — Session 1 | Topic: The Magic Trip"
    m = re.search(r'Topic:\s*(.+?)(?:\s+Today|\s+My\s|\s+Write|\s+Draft|\s+☐|\s+Page\s|\.|$)', line, re.I)
    if m:
        return m.group(1).strip()
    return ''


def extract_portfolio_topic_from_title(title):
    """Extract topic from a portfolio part TITLE (may have merged content)."""
    m = re.search(r'Topic:\s*(.+?)(?:\s+Today|\s+My\s+sentence|\s+Write|\s+Draft|\s+☐|\s+Page\s|\.|$)', title, re.I)
    return m.group(1).strip() if m else ''


def extract_session_num_from_portfolio(part_content):
    """Extract real session number from portfolio content."""
    if not part_content:
        return None
    line = part_content[0]
    m = re.search(r'Session\s+(\d)', line, re.I)
    return int(m.group(1)) if m else None


def make_vocab_title(vocab_tiers, session_num):
    """Generate W28-style PART 2 VOCABULARY BUILDING title."""
    tier1 = [v for v in vocab_tiers if not v.get('Memory Trick', '').startswith('Definition:')]
    tier2 = [v for v in vocab_tiers if v.get('Memory Trick', '').startswith('Definition:')]
    n1 = len(tier1)
    n2 = len(tier2)
    t2_suffix = ' + Cambridge Words (Tier 2)' if n2 > 0 else ''

    if session_num == 1:
        sample = ', '.join([v['Word'] for v in tier1[:4]])
        preview = ' + Cambridge Preview (Tier 2)' if n2 > 0 else ''
        return 'PART 2: VOCABULARY BUILDING \u2014 Story Words: %s%s' % (sample, preview)
    elif session_num == 2:
        return 'PART 2: VOCABULARY BUILDING \u2014 Deep review story words%s' % (
            ' + Cambridge words (Tier 2 complete set)' if n2 > 0 else '')
    else:
        return 'PART 2: VOCABULARY BUILDING \u2014 Mastery Level: ALL %d story words%s' % (
            n1, ' + ALL %d Cambridge words' % n2 if n2 > 0 else '')


def make_part1_title(story_title):
    """Generate PART 1 title matching W28 format."""
    if story_title:
        return 'PART 1: READING INPUT  ' + story_title
    return 'PART 1: READING INPUT'


def make_part4_title(session_num):
    return 'PART 4: LISTENING PRACTICE \u2014 ' + LISTENING_SUBTITLES.get(session_num, 'Cambridge Flyers Listening format')


def make_part5_title(session_num, total=3):
    if session_num == total:
        return 'PART 5: ERROR CORRECTION (Mixed types \u2014 grammar + vocabulary + story facts)'
    return 'PART 5: ERROR CORRECTION (Find the hidden mistake \u2014 story + grammar)'


def make_part6_title(stem_topic):
    if stem_topic:
        return 'PART 6: STEM/CLIL \u2014 ' + stem_topic
    return 'PART 6: STEM/CLIL CONNECTION'


def make_part8_title(week_num, session_num, topic, total=3):
    draft_suffix = ' \u2014 FINAL' if session_num == total else ''
    topic_part = ' | Topic: ' + topic if topic else ''
    return 'PART 8: MY PORTFOLIO ENTRY \u2014 PROJECT DRAFT (PART %d%s)  \U0001F4DD  Week %d \u2014 Session %d%s' % (
        session_num, draft_suffix, week_num, session_num, topic_part)


def make_part9_title(week_num, session_num):
    return 'PART 9: HOMEWORK \u2014 Week %d, Session %d' % (week_num, session_num)


# ── Per-week session transformer ──────────────────────────────────────────────

def transform_parts(parts, week_num, session_num, vocab_tiers, already_has_part2=True):
    """
    Transform a session's parts list to W28 format.
    
    For W29 (already_has_part2=False): split PART 1, renumber all subsequent parts.
    For other weeks: clean titles, fix numbering, fix PART 2 title.
    
    Returns new parts list.
    """
    if not parts:
        return parts
    new_parts = []
    
    # [0] Header title cleanup
    header = copy.deepcopy(parts[0])
    t = header.get('title', '')
    t = EMOJI_RE.sub('', t)  # remove emoji
    t = re.sub(r'(\|\s*BLOCK\s+[A-Z])\s+Name:.*$', r'\1', t)  # remove merged content
    t = t.strip()
    header['title'] = t
    new_parts.append(header)
    
    # Remaining parts index (starts at 1)
    remaining = list(parts[1:])
    
    # Identify the starting index for PART 1
    # Some weeks have SPIRAL REVIEW at [1], others jump to PART 1 directly
    part_start = 0
    spiral_part = None
    if remaining and re.search(r'SPIRAL\s+REVIEW', remaining[0].get('title', ''), re.I):
        spiral_part = copy.deepcopy(remaining[0])
        spiral_part['title'] = 'SPIRAL REVIEW (5 min)'
        part_start = 1
    
    if spiral_part:
        new_parts.append(spiral_part)
    
    actual_parts = remaining[part_start:]  # PART 1, PART 2, ...

    # ── Detect MATH/ELA variant weeks (W43-W48 style) ────────────────────────
    # These weeks use a non-standard structure (MATH COMPONENT + ELA COMPONENT).
    # Pass-through: clean [ALL]/[O]/[Y] from titles only, don't rename/remap PARTs.
    MATH_WEEK_INDICATORS = re.compile(r'MATH\s+COMPONENT|ELA\s+COMPONENT|READING\s+MATH', re.I)
    is_math_variant = any(MATH_WEEK_INDICATORS.search(p.get('title', '')) for p in actual_parts)

    if is_math_variant:
        for p in actual_parts:
            p = copy.deepcopy(p)
            t = clean_title(p.get('title', ''))
            # Only strip [ALL], [O], [Y] noise — don't rename
            t = re.sub(r'\s*\[(ALL|O|Y|O-ALL)\]', '', t).strip()
            p['title'] = t
            new_parts.append(p)
        return new_parts

    # W29: Split PART 1 at "B. Vocabulary Building"
    if not already_has_part2 and actual_parts:
        p1_orig = actual_parts[0]
        content = p1_orig.get('content', [])
        split_idx = None
        for i, line in enumerate(content):
            if re.match(r'B\.\s*Vocab', line, re.I):
                split_idx = i
                break
        
        if split_idx is not None:
            # Create PART 1 (reading only)
            reading_lines = content[:split_idx]
            story_title = extract_story_title(reading_lines)
            p1_new = copy.deepcopy(p1_orig)
            p1_new['title'] = make_part1_title(story_title)
            p1_new['content'] = reading_lines
            # Create PART 2 (vocab building)
            vocab_lines = content[split_idx + 1:]  # skip "B. Vocabulary Building" header line itself
            p2_new = {
                'title': make_vocab_title(vocab_tiers, session_num),
                'content': vocab_lines,
            }
            actual_parts = [p1_new, p2_new] + list(actual_parts[1:])
        else:
            # No split found — just fix PART 1 title
            p1 = copy.deepcopy(actual_parts[0])
            story_title = extract_story_title(p1.get('content', []))
            p1['title'] = make_part1_title(story_title)
            actual_parts[0] = p1
    
    # Build a name-indexed lookup for the remaining parts.
    # Lookup by canonical PART number (1-9) — robust against missing parts.
    # Strategy: scan actual_parts titles and assign to part_map[N].
    PART_PAT = re.compile(r'PART\s+(\d+)\s*:', re.I)
    STEM_PAT  = re.compile(r'STEM/CLIL|CLIL|PART\s+6\s*:', re.I)
    QPC_PAT   = re.compile(r'QUICK\s+PROD|PRODUCTION\s+CHECK', re.I)
    LISTEN_PAT = re.compile(r'LISTEN', re.I)
    ERROR_PAT  = re.compile(r'ERROR\s+CORR', re.I)
    VOCAB_PAT  = re.compile(r'VOCAB', re.I)
    PORTF_PAT  = re.compile(r'PORTFOLIO', re.I)
    HW_PAT     = re.compile(r'HOMEWORK|HOME.?WORK', re.I)
    READ_PAT   = re.compile(r'READING\s+INPUT', re.I)
    SENT_PAT   = re.compile(r'SENTENCE\s+BUILD|GRAMMAR', re.I)
    SPIRAL_PAT = re.compile(r'SPIRAL', re.I)

    def _guess_part_num(title):
        """Guess canonical PART number from title heuristic.
        
        Uses keyword content (not the explicit PART N number) to determine
        the golden-schema slot, so that DOCX variants using 8 vs 9 PART numbering
        both map correctly:
          PART 8: HOMEWORK  →  golden slot 9 (PART 9)
          PART 7: PORTFOLIO →  golden slot 8 (PART 8)
        """
        t = title.upper()
        # HOMEWORK is always slot 9 regardless of DOCX numbering
        if HW_PAT.search(t):   return 9
        if PORTF_PAT.search(t): return 8
        if QPC_PAT.search(t):   return 7
        if STEM_PAT.search(t):  return 6
        if ERROR_PAT.search(t): return 5
        if LISTEN_PAT.search(t): return 4
        if SENT_PAT.search(t) or re.search(r'GRAMMAR', t): return 3
        if VOCAB_PAT.search(t): return 2
        if READ_PAT.search(t):  return 1
        if SPIRAL_PAT.search(t): return 0
        # Last fallback: use explicit PART N number
        m = PART_PAT.search(title)
        if m:
            return int(m.group(1))
        return -1
        return -1

    part_map = {}
    for ap in actual_parts:
        pn = _guess_part_num(ap.get('title', ''))
        if pn not in part_map:
            part_map[pn] = copy.deepcopy(ap)

    # Determine if this is a "second half" session (starts with PART 4+)
    is_second_half = (
        actual_parts
        and _guess_part_num(actual_parts[0].get('title', '')) >= 4
        and not READ_PAT.search(actual_parts[0].get('title', ''))
    )

    if is_second_half:
        for ap in actual_parts:
            p = copy.deepcopy(ap)
            pn = _guess_part_num(p.get('title', ''))
            if pn >= 4:
                p['title'] = _fix_second_half_part_title(p, pn, week_num, session_num, vocab_tiers, len(actual_parts))
                new_parts.append(p)
        return new_parts

    # ── Full session: fix all 9 PART titles ──────────────────────────────────

    # PART 1: Reading Input
    p1 = part_map.get(1)
    if p1:
        story_title = extract_story_title(p1.get('content', []))
        if not story_title:
            raw_t = clean_title(p1.get('title', ''))
            m = re.match(r'PART\s+1:\s*READING\s+INPUT\s+(.*)', raw_t, re.I)
            if m:
                extra = m.group(1).strip()
                if extra and not extra.startswith('('):
                    story_from_title = extra.split(' Last ')[0].split(' Hello')[0].split(' Max ')[0].split(' Today')[0].strip()
                    story_title = story_from_title if story_from_title else extra[:50]
        p1['title'] = make_part1_title(story_title)
        new_parts.append(p1)

    # PART 2: Vocabulary Building
    p2 = part_map.get(2)
    if p2:
        p2['title'] = make_vocab_title(vocab_tiers, session_num)
        new_parts.append(p2)
    else:
        # Missing PART 2 — insert placeholder (W31/W35/W36 S3, or old weeks missing it)
        vocab_content = ['Vocabulary Review — all %d story words and Cambridge words studied this week.' % len(vocab_tiers)]
        for v in vocab_tiers:
            vocab_content.append('☐ %s (%s) — %s' % (v['Word'], v['Vietnamese'], v.get('Key Collocation(s)', '')))
        new_parts.append({'title': make_vocab_title(vocab_tiers, session_num), 'content': vocab_content})

    # PART 3: Sentence Building
    p3 = part_map.get(3)
    if p3:
        p3['title'] = 'PART 3: SENTENCE BUILDING (DIVERSE EXERCISES)'
        new_parts.append(p3)

    # PART 4: Listening Practice
    p4 = part_map.get(4)
    if p4:
        title = p4.get('title', '')
        merged = re.search(r'LISTENING PRACTICE\s+(.+)', title)
        if merged and merged.group(1).strip():
            p4['content'] = [merged.group(1).strip()] + list(p4.get('content', []))
        p4['title'] = make_part4_title(session_num)
        new_parts.append(p4)

    # PART 5: Error Correction
    p5 = part_map.get(5)
    if p5:
        p5['title'] = make_part5_title(session_num)
        new_parts.append(p5)

    # PART 6: STEM/CLIL
    p6 = part_map.get(6)
    if p6:
        cur_title = clean_title(p6.get('title', ''))
        m = re.search(r'STEM/CLIL(?:\s+CONNECTION)?\s*[\u2014\-]+\s*(.+)', cur_title, re.I)
        if m:
            stem_topic = clean_stem_topic(m.group(1).strip())
        else:
            stem_topic = extract_stem_topic(p6.get('content', []))
        p6['title'] = make_part6_title(stem_topic)
        new_parts.append(p6)

    # PART 7: Quick Production Check
    p7 = part_map.get(7)
    if p7:
        cur_title = clean_title(p7.get('title', ''))
        mastery = ' \u2014 Mastery' if 'mastery' in cur_title.lower() else ''
        p7['title'] = 'PART 7: QUICK PRODUCTION CHECK' + mastery
        new_parts.append(p7)

    # PART 8: Portfolio Entry
    p8 = part_map.get(8)
    if p8:
        cur_title = p8.get('title', '')
        content = p8.get('content', [])
        topic = extract_portfolio_topic(content) or extract_portfolio_topic_from_title(cur_title)
        p8['title'] = make_part8_title(week_num, session_num, topic)
        new_parts.append(p8)

    # PART 9: Homework
    p9 = part_map.get(9)
    if p9:
        p9['title'] = make_part9_title(week_num, session_num)
        new_parts.append(p9)

    return new_parts


def _fix_second_half_part_title(p, part_num, week_num, session_num, vocab_tiers, total_parts):
    """Fix title for second-half session parts (PART 4 onwards in sessions_5)."""
    t = p.get('title', '')
    if part_num == 4:
        return make_part4_title(session_num)
    elif part_num == 5:
        return make_part5_title(session_num)
    elif part_num == 6:
        cur = clean_title(t)
        m = re.search(r'STEM/CLIL(?:\s+CONNECTION)?\s*[\u2014\-]+\s*(.+)', cur, re.I)
        stem_topic = clean_stem_topic(m.group(1).strip()) if m else extract_stem_topic(p.get('content', []))
        return make_part6_title(stem_topic)
    elif part_num == 7:
        mastery = ' \u2014 Mastery' if 'mastery' in t.lower() else ''
        return 'PART 7: QUICK PRODUCTION CHECK' + mastery
    elif part_num == 8:
        content = p.get('content', [])
        topic = extract_portfolio_topic(content) or extract_portfolio_topic_from_title(t)
        return make_part8_title(week_num, session_num, topic)
    elif part_num == 9:
        return make_part9_title(week_num, session_num)
    return clean_title(t)


def get_real_session_num(session_obj, week_num):
    """
    For sessions_5 sub-sessions, determine the real session number (1, 2, or 3).
    Looks at header title or portfolio content.
    """
    parts = session_obj.get('parts', [])
    # Check header title: "WEEK N | SESSION 1 | BLOCK B"
    if parts:
        m = re.search(r'SESSION\s+(\d)', parts[0].get('title', ''))
        if m:
            return int(m.group(1))
    # Look for portfolio part
    for p in parts:
        if re.search(r'PORTFOLIO', p.get('title', ''), re.I):
            sn = extract_session_num_from_portfolio(p.get('content', []))
            if sn:
                return sn
    return None


SLOT_LABELS = [
    'Slot 1 — Activate / Khởi động — Spiral, Reading & Vocab S1',
    'Slot 2 — Drill / Luyện tập — Listening, Error Correction & Writing S1',
    'Slot 3 — Bridge / Kết nối — Spiral, Reading & Vocab S2',
    'Slot 4 — Challenge / Thử thách — Listening, Error Correction & Writing S2',
    'Slot 5 — Perform / Biểu diễn — Error Correction, Writing & Task Cards S3',
]

def rebuild_sessions_5(sessions):
    """
    Rebuild sessions_5 from the transformed sessions array.
    W28 layout: S1=first_half(S1), S2=second_half(S1), S3=first_half(S2), S4=second_half(S2), S5=second_half(S3)
    Split between PART 3 (Grammar) and PART 4 (Listening).
    Uses W28-style "Slot N — Role" labels to avoid naming collision with teacher_contents Session 1/2/3.
    """
    def split_session(session):
        parts = session.get('parts', [])
        first = []
        second = []
        in_second = False
        for p in parts:
            if not in_second and re.match(r'PART\s+4:', p.get('title', '')):
                in_second = True
            if in_second:
                second.append(p)
            else:
                first.append(p)
        return first, second
    
    result = []
    slot = 1
    for i, sess in enumerate(sessions):
        first, second = split_session(sess)
        if i < 2:  # Sessions 1 and 2: add both halves
            result.append({'session': slot, 'session_label': SLOT_LABELS[slot - 1], 'parts': first})
            slot += 1
            result.append({'session': slot, 'session_label': SLOT_LABELS[slot - 1], 'parts': second})
            slot += 1
        else:  # Session 3: only add second half (slot 5 = day 5)
            result.append({'session': slot, 'session_label': SLOT_LABELS[slot - 1], 'parts': second})
            slot += 1
    return result


# ── Main transform ─────────────────────────────────────────────────────────────

def transform_week(week_num, week_data):
    """Apply all W28-format transformations to one week's data dict."""
    
    # 1. quick_ref cleanup
    qr = week_data.get('quick_ref', {})
    if 'Unit / Theme' in qr:
        qr['Theme'] = qr.pop('Unit / Theme')
    if 'Block' in qr:
        qr['Block'] = re.sub(r'\s*\(.*', '', qr['Block']).strip()
    
    # 2. task_cards_by_session: s1→1, s2→2, s3→3
    tcs = week_data.get('task_cards_by_session', {})
    if any(k.startswith('s') for k in tcs):
        new_tcs = {}
        for k, v in tcs.items():
            new_key = k[1:] if re.match(r'^s\d$', k) else k
            new_tcs[new_key] = v
        week_data['task_cards_by_session'] = new_tcs
    
    # 3. Determine per-week flags
    # W29 needs vocab split; W30/32/33/34 have [ALL]; W31/35 have [O]; W36 has merged titles
    vocab_tiers = week_data.get('vocab_tiers', [])
    
    # Detect structure type from first session's PART 1
    first_session_parts = week_data.get('sessions', [{}])[0].get('parts', [])
    
    # Find PART 1 (usually at index 2 for weeks with spiral, or index 1 for W31/W35)
    p1_idx = None
    for idx, p in enumerate(first_session_parts):
        if re.match(r'PART\s+1:', p.get('title', ''), re.I):
            p1_idx = idx
            break
    
    # Check if PART 2 VOCABULARY BUILDING already exists
    already_has_part2 = any(
        re.search(r'PART\s+2:.*VOCAB', p.get('title', ''), re.I)
        for p in first_session_parts
    )
    
    print('  W%d: p1_idx=%s already_has_part2=%s vocab_split_needed=%s' % (
        week_num, p1_idx, already_has_part2, not already_has_part2))
    
    # 4. Transform main sessions
    new_sessions = []
    for sn_idx, session in enumerate(week_data.get('sessions', [])):
        session_num = session.get('session', sn_idx + 1)
        new_parts = transform_parts(
            session['parts'], week_num, session_num, vocab_tiers,
            already_has_part2=already_has_part2
        )
        new_session = dict(session)
        new_session['parts'] = new_parts
        new_sessions.append(new_session)
    week_data['sessions'] = new_sessions
    
    # 5. Rebuild sessions_2 (first 2 sessions for 2-slot schedule)
    week_data['sessions_2'] = copy.deepcopy(new_sessions[:2])
    
    # 6. Rebuild sessions_5 from transformed sessions
    week_data['sessions_5'] = rebuild_sessions_5(copy.deepcopy(new_sessions))
    
    return week_data


# ── Inject to all 5 files ──────────────────────────────────────────────────────

def inject_week(week_num, data):
    key = str(week_num)
    
    # 1. public/data/lessonPlans.json
    with open(PUBLIC_JSON, encoding='utf-8') as f:
        all_data = json.load(f)
    all_data[key] = data
    with open(PUBLIC_JSON, 'w', encoding='utf-8') as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)
    
    # 2. public/data/lessonPlans_index.json
    with open(PUBLIC_IDX, encoding='utf-8') as f:
        pub_idx = json.load(f)
    pub_idx[key] = {'week': week_num, 'unit_theme': data['unit_theme']}
    with open(PUBLIC_IDX, 'w', encoding='utf-8') as f:
        json.dump(pub_idx, f, ensure_ascii=False, indent=2)
    
    # 3. mcp-server/data/lessonPlans_index.json
    with open(MCP_IDX, encoding='utf-8') as f:
        mcp_idx = json.load(f)
    mcp_idx[key] = {'week': week_num, 'unit_theme': data['unit_theme']}
    with open(MCP_IDX, 'w', encoding='utf-8') as f:
        json.dump(mcp_idx, f, ensure_ascii=False, indent=2)
    
    # 4. public/data/lessons/W{N}.json
    pub_file = PUB_LESSONS / ('W%d.json' % week_num)
    with open(pub_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    # 5. mcp-server/data/lessons/W{N}.json
    mcp_file = MCP_LESSONS / ('W%d.json' % week_num)
    with open(mcp_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print('  W%d → 5 files updated' % week_num)


# ── Validation ────────────────────────────────────────────────────────────────

def validate_week(week_num, data):
    """Quick structural validation against W28 standard."""
    errors = []
    
    # quick_ref
    qr = data.get('quick_ref', {})
    if 'Theme' not in qr:
        errors.append('quick_ref missing "Theme"')
    if 'Unit / Theme' in qr:
        errors.append('quick_ref still has "Unit / Theme"')
    
    # task_cards_by_session
    tcs = data.get('task_cards_by_session', {})
    if any(k.startswith('s') for k in tcs):
        errors.append('task_cards_by_session has old s1/s2/s3 keys')
    
    # sessions
    for session in data.get('sessions', []):
        sn = session['session']
        parts = session.get('parts', [])
        titles = [p.get('title', '') for p in parts]
        
        # Check PART 2 VOCAB exists
        if not any(re.match(r'PART\s+2:.*VOCAB', t, re.I) for t in titles):
            errors.append('S%d: missing PART 2: VOCABULARY BUILDING' % sn)
        
        # Check PART 4 LISTENING exists
        if not any(re.match(r'PART\s+4:.*LISTEN', t, re.I) for t in titles):
            errors.append('S%d: missing PART 4: LISTENING' % sn)
        
        # Check PART 8 PORTFOLIO exists
        if not any(re.match(r'PART\s+8:', t, re.I) for t in titles):
            errors.append('S%d: missing PART 8: PORTFOLIO' % sn)
        
        # Check PART 9 HOMEWORK exists
        if not any(re.match(r'PART\s+9:', t, re.I) for t in titles):
            errors.append('S%d: missing PART 9: HOMEWORK' % sn)
        
        # Check for stray [ALL] or [O]
        for t in titles:
            if '[ALL]' in t or '[O]' in t:
                errors.append('S%d: title still has [ALL]/[O]: "%s"' % (sn, t[:60]))
                break
    
    # sessions_5
    if len(data.get('sessions_5', [])) != 5:
        errors.append('sessions_5 has %d entries (expected 5)' % len(data.get('sessions_5', [])))
    
    if errors:
        print('  W%d WARN: %s' % (week_num, '; '.join(errors)))
    else:
        sessions = data.get('sessions', [])
        parts_per_session = [len(s.get('parts', [])) for s in sessions]
        print('  W%d \u2713 \u2014 "%s" \u2014 sessions %s parts each' % (
            week_num, data.get('unit_theme', '')[:40], parts_per_session))


# ── CLI entry point ───────────────────────────────────────────────────────────

def main():
    weeks = [int(x) for x in sys.argv[1:]] if len(sys.argv) > 1 else list(range(29, 37))
    
    print('Processing weeks: %s' % weeks)
    print()
    
    for week_num in weeks:
        pub_file = PUB_LESSONS / ('W%d.json' % week_num)
        if not pub_file.exists():
            print('  W%d: file not found, skipping' % week_num)
            continue
        
        print('Transforming W%d...' % week_num)
        with open(pub_file, encoding='utf-8') as f:
            data = json.load(f)
        
        data = transform_week(week_num, data)
        inject_week(week_num, data)
    
    print()
    print('=== Validation ===')
    for week_num in weeks:
        pub_file = PUB_LESSONS / ('W%d.json' % week_num)
        if pub_file.exists():
            with open(pub_file, encoding='utf-8') as f:
                data = json.load(f)
            validate_week(week_num, data)


if __name__ == '__main__':
    main()
