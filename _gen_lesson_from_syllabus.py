#!/usr/bin/env python3
"""
_gen_lesson_from_syllabus.py
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generate complete lesson JSON for weeks W54–W156 from Syllabus V5.
Follows W28 golden-standard schema exactly.

Usage:
  python3 _gen_lesson_from_syllabus.py 54          # generate W54 only
  python3 _gen_lesson_from_syllabus.py 54 55 56    # specific weeks
  python3 _gen_lesson_from_syllabus.py 54-60       # range
  python3 _gen_lesson_from_syllabus.py --all       # W54–W156

Outputs (5 files per week — same as build_lesson_plans_from_docx.py):
  public/data/lessons/WN.json                    (front-end per-week file)
  mcp-server/data/lessons/WN.json                (API per-week file)
  public/data/lessonPlans.json                   (monolithic fallback)
  public/data/lessonPlans_index.json             (front-end index)
  mcp-server/data/lessonPlans_index.json         (API index)

Phase structure:
  Phase 1 (W1–W54):   Foundational Fluency — pure ELA
  Phase 2 (W55–W120): Academic Application — ELA + Math/Science
  Phase 3 (W121–W156): Advanced Synthesis & Debate
"""

import sys, re, json
from pathlib import Path
from textwrap import dedent

ROOT = Path(__file__).parent
SYLLABUS_PATH = ROOT / '_syllabus_v5_raw.txt'

PUBLIC_JSON = ROOT / 'public/data/lessonPlans.json'
PUBLIC_IDX  = ROOT / 'public/data/lessonPlans_index.json'
MCP_IDX     = ROOT / 'mcp-server/data/lessonPlans_index.json'
MCP_LESSONS = ROOT / 'mcp-server/data/lessons'
PUB_LESSONS = ROOT / 'public/data/lessons'

# ─────────────────────────────────────────────────────────────────────────────
# Phase / Block helpers
# ─────────────────────────────────────────────────────────────────────────────

def get_phase(week_num: int) -> int:
    if week_num <= 54:
        return 1
    elif week_num <= 120:
        return 2
    else:
        return 3


def get_block(week_num: int) -> str:
    """Determine curriculum block label for the week."""
    phase = get_phase(week_num)
    if phase == 1:
        # Phase 1: A(1-9), B(10-27/28-36), C(37-54)
        if week_num <= 9:
            return 'A'
        elif week_num <= 36:
            return 'B'
        else:
            return 'C'
    elif phase == 2:
        # Phase 2: D(55-66), E(67-78), F(79-90), G(91-102), H(103-120)
        offset = week_num - 55
        block_letters = 'DEFGH'
        idx = min(offset // 12, len(block_letters) - 1)
        return block_letters[idx]
    else:
        # Phase 3: I(121-132), J(133-144), K(145-156)
        offset = week_num - 121
        block_letters = 'IJK'
        idx = min(offset // 12, len(block_letters) - 1)
        return block_letters[idx]


def get_unit(week_num: int) -> int:
    """Compute unit number from week."""
    return (week_num - 1) // 3 + 1


# ─────────────────────────────────────────────────────────────────────────────
# Syllabus Parser
# ─────────────────────────────────────────────────────────────────────────────

class SyllabusParser:
    """Extract structured content for any week from _syllabus_v5_raw.txt."""

    def __init__(self, path: Path = SYLLABUS_PATH):
        self._text = path.read_text(encoding='utf-8')
        self._lines = self._text.split('\n')
        # Build index: week_num → (start_line, end_line)
        self._index = {}
        headers = [(i, int(m.group(1)), l.strip())
                   for i, l in enumerate(self._lines)
                   if (m := re.match(r'^\s*WEEK\s+(\d+)\s*:', l, re.I))]
        for pos, (idx, n, _) in enumerate(headers):
            next_start = headers[pos + 1][0] if pos + 1 < len(headers) else len(self._lines)
            self._index[n] = (idx, next_start)

    # ── raw extraction ────────────────────────────────────────────────────────

    def get_raw_lines(self, week_num: int) -> list[str]:
        if week_num not in self._index:
            return []
        start, end = self._index[week_num]
        # Cap at 200 lines to avoid runaway last-week sections that go to EOF
        raw = self._lines[start:min(end, start + 200)]
        # For the last week (or any week with appended overview tables),
        # stop before curriculum appendix sections
        appendix_re = re.compile(
            r'^\s*★\s+CAMBRIDGE INTEGRATION\s*—\s*Final|'
            r'^\s*\d+\.\d+\s+PROGRAM STATISTICS',
            re.I
        )
        for i, l in enumerate(raw):
            if i > 0 and appendix_re.match(l.strip()):
                return raw[:i]
        return raw

    def _section_text(self, raw: list[str], pattern: str) -> str:
        """Extract text from a section matching `pattern` until next section header."""
        sec_re = re.compile(pattern, re.I)
        next_sec_re = re.compile(
            r'^\s*\d+\.\d+\s+[A-Z]|'
            r'^\s*WEEK\s+\d+\s*:|'
            r'^\s*★\s+CAMBRIDGE|'
            r'^\s*▶|'
            r'^\s*Session\s+\d+\s*[:\-]|'
            r'^\s*SESSION\s+\d+\s*[:\-]',
            re.I
        )
        collecting = False
        result = []
        for line in raw:
            if sec_re.search(line):
                collecting = True
                continue
            if collecting:
                if next_sec_re.match(line) and result:
                    break
                result.append(line)
        return '\n'.join(l for l in result if l.strip()).strip()

    # ── structured data ───────────────────────────────────────────────────────

    def get_week(self, week_num: int) -> dict:
        """Return structured dict for week_num."""
        raw = self.get_raw_lines(week_num)
        if not raw:
            return {}

        title_line = raw[0].strip() if raw else f'Week {week_num}'
        # Remove "WEEK N: " prefix
        title = re.sub(r'^WEEK\s+\d+\s*:\s*', '', title_line, flags=re.I).strip()
        title_vi = raw[1].strip() if len(raw) > 1 and not re.match(r'^\s*\d+\.', raw[1]) else ''
        title_vi = re.sub(r'^Tu[aă]n\s+\d+\s*[:\-]\s*', '', title_vi, flags=re.I).strip()

        phase = get_phase(week_num)

        # ── Reading Input ──────────────────────────────────────────────────
        reading = self._extract_reading(raw)

        # ── Grammar Focus ──────────────────────────────────────────────────
        grammar = self._extract_grammar(raw)

        # ── Vocabulary ────────────────────────────────────────────────────
        vocab = self._extract_vocab(raw)

        # ── Writing Task ──────────────────────────────────────────────────
        writing = self._extract_writing(raw)

        # ── Math / STEM component (Phase 2+) ──────────────────────────────
        math = self._extract_math(raw) if phase >= 2 else {}

        # ── Spiral Review ─────────────────────────────────────────────────
        spiral = self._extract_spiral(raw)

        # ── Homework ──────────────────────────────────────────────────────
        homework = self._extract_homework(raw)

        # ── Cambridge integration ─────────────────────────────────────────
        cambridge = self._extract_cambridge(raw)

        return {
            'week': week_num,
            'phase': phase,
            'title': title,
            'title_vi': title_vi,
            'block': get_block(week_num),
            'unit': get_unit(week_num),
            'reading': reading,
            'grammar': grammar,
            'vocab': vocab,
            'writing': writing,
            'math': math,
            'spiral': spiral,
            'homework': homework,
            'cambridge': cambridge,
        }

    def _extract_reading(self, raw: list[str]) -> dict:
        """Extract reading input title and text.
        Handles Phase 1 (READING INPUT), Phase 2 (ELA COMPONENT/Reading Input),
        and Phase 3 (▶ N.1 CONCEPT / ▶ N.1 READING)."""
        reading_re = re.compile(r'READING\s+INPUT|Reading\s+Input', re.I)
        ela_re = re.compile(r'Reading\s+Input\s*\(\d+', re.I)
        # Phase 3 concept sections (▶ N.1 CONCEPT: / ▶ N.1 READING / N.1 CONCEPT without ▶)
        concept_re = re.compile(r'^(▶\s*)?\d+\.\d+\s+(?:CONCEPT|READING INPUT?)\s*[:\-]?', re.I)
        title = ''
        text_lines = []
        collecting = False
        stop_re = re.compile(
            r'^\s*(?:Grammar\s+Focus|★|\d+\.\d+\s+[A-Z]|GRAMMAR|Writing\s+Task|ELA\s+Vocabulary|Math\s+Vocabulary)',
            re.I
        )
        # Phase 3 stop: next N.2+ section (with or without ▶ prefix)
        stop_re3 = re.compile(r'^(▶\s*)?\d+\.\d+\s+(?!CONCEPT|READING)', re.I)
        for line in raw:
            stripped = line.strip()
            if reading_re.search(line) or ela_re.search(line) or concept_re.match(stripped):
                collecting = True
                # Try to extract title from same line "Title: X | ..."
                m = re.search(r'Title:\s*(.+?)(?:\s*\||\s*$)', line, re.I)
                if m:
                    title = m.group(1).strip()
                # Phase 3: concept title after the ▶ N.1 CONCEPT: prefix
                if concept_re.match(stripped):
                    rest = concept_re.sub('', stripped).strip().strip(':').strip()
                    if rest:
                        title = rest
                # Inline text on same line
                m2 = re.search(r'Text:\s*(.+)', line, re.I)
                if m2:
                    text_lines.append(m2.group(1).strip())
                continue
            if collecting:
                if stop_re.match(line) and text_lines:
                    break
                if stop_re3.match(stripped) and text_lines:
                    break
                # Extract title from "Title: X | ..." on a following line
                if not title and re.match(r'^Title\s*:', stripped, re.I):
                    m = re.search(r'Title:\s*(.+?)(?:\s*\||\s*$)', stripped, re.I)
                    if m:
                        title = m.group(1).strip()
                    continue
                # Skip Type: lines
                if re.match(r'^Type\s*:', stripped, re.I):
                    continue
                # Extract text from "Text: ..." line
                if re.match(r'^Text\s*:', stripped, re.I):
                    text_part = re.sub(r'^Text\s*:\s*', '', stripped, flags=re.I)
                    if text_part:
                        text_lines.append(text_part)
                    continue
                # Skip section-numbering lines like "55.1 ELA COMPONENT"
                if re.match(r'^\d+\.\d+\s+[A-Z]', stripped):
                    continue
                # Skip topic lines like "Topic: ..."
                if re.match(r'^Topic\s*:', stripped, re.I):
                    continue
                # Strip -> prefix for Phase 3 narrative lines
                stripped_arrow = re.sub(r'^->\s*', '', stripped)
                if stripped_arrow and not stripped.startswith('★') and not stripped.startswith('▶'):
                    text_lines.append(stripped_arrow)
        # Clean: remove unwanted lines
        cleaned = []
        for l in text_lines:
            if re.match(r'^(Title|Type|Text)\s*:', l, re.I):
                continue
            if '|' in l and re.search(r'\d+\s+words', l, re.I):
                continue  # e.g. "150 words | Type: ..."
            if re.match(r'^\d+\s+min\b', l, re.I):
                continue  # timing lines like "15 min"
            cleaned.append(l)
        # If title still empty but we have text, first text line is the title
        if not title and cleaned:
            title = cleaned[0]
            cleaned = cleaned[1:]
        return {
            'title': title or 'Reading Text',
            'text': '\n'.join(l for l in cleaned if l.strip()),
        }

    def _extract_grammar(self, raw: list[str]) -> dict:
        """Extract grammar focus section.
        Handles:
          Phase 1/2:  Grammar Focus: ...
          Phase 3:    ▶ N.2 GRAMMAR FOCUS:  (W130-W134)
                      N.2 GRAMMAR FOCUS:    (W121-W129, without ▶)
                      ▶ N.2 LANGUAGE FOCUS: (W135+)
        """
        grammar_re = re.compile(r'Grammar\s+Focus\s*[:\-]?|GRAMMAR\s+FOCUS\s*[:\-]?', re.I)
        # Phase 3 with or without ▶ prefix; optional section number; also LANGUAGE FOCUS and GRAMMAR TASKS/REVIEW
        grammar3_re = re.compile(
            r'^(▶\s*)?(?:\d+\.\d+\s+)?(GRAMMAR\s+(FOCUS|TASKS?|REVIEW)|LANGUAGE\s+FOCUS)\s*[:\-]?',
            re.I
        )
        pattern_re = re.compile(r'Pattern\s*[:\-]?', re.I)
        focus = ''
        pattern = ''
        examples = []
        collecting = False
        stop_re = re.compile(
            r'^\s*(?:ELA\s+Vocab|Writing\s+Task|★|\d+\.\d+\s+[A-Z]|\d+\.\d+\s+MATH|VOCABULARY)',
            re.I
        )
        # Phase 3: stop at next ▶ section that's not grammar/language, or next N.N section
        stop_re3 = re.compile(
            r'^▶\s*(?!(?:\d+\.\d+\s+)?(?:GRAMMAR|LANGUAGE\s+FOCUS))|'
            r'^\d+\.\d+\s+(?!GRAMMAR|LANGUAGE\s+FOCUS)[A-Z]',
            re.I
        )
        mode = None
        for line in raw:
            stripped = line.strip()
            if grammar_re.match(stripped) or grammar3_re.match(stripped):
                rest = re.sub(
                    r'(▶\s*)?(?:\d+\.\d+\s+)?(GRAMMAR\s+(FOCUS|TASKS?|REVIEW)|LANGUAGE\s+FOCUS)\s*[:\-]?\s*|'
                    r'(GRAMMAR\s+FOCUS|Grammar\s+Focus)\s*[:\-]?\s*',
                    '', stripped, flags=re.I
                ).strip()
                if rest:
                    focus = rest
                collecting = True
                mode = 'focus'
                continue
            if collecting:
                if stop_re.match(line):
                    break
                if stop_re3.match(stripped) and (examples or pattern):
                    break
                # Phase 3 patterns use "-> PATTERN NAME: ..." format
                if re.match(r'^->\s*(PATTERN|CONCESSION|STRONG\s+CLAIM|QUALIFYING|CAUSAL)', stripped, re.I):
                    ex = re.sub(r'^->\s*', '', stripped)
                    examples.append(ex[:100])
                    mode = 'examples'
                    continue
                if pattern_re.match(stripped):
                    mode = 'pattern'
                    rest = pattern_re.sub('', stripped, count=1).strip(' :-').strip()
                    if rest:
                        pattern += rest + ' '
                    continue
                if stripped and not stripped.startswith('★') and not stripped.startswith('▶'):
                    if mode == 'pattern':
                        pattern += stripped + ' '
                    elif mode == 'focus' and not focus:
                        focus = stripped
                    else:
                        examples.append(stripped[:100])
        # For Phase 3, focus may be built from examples
        if not focus and examples:
            focus = examples[0][:80]
            examples = examples[1:]
        return {
            'focus': focus.strip(),
            'pattern': pattern.strip(),
            'examples': examples[:6],
        }
    def _extract_vocab(self, raw: list[str]) -> list[str]:
        """Extract vocabulary words.
        Handles:
          Phase 1/2: explicit ELA Vocabulary: list
          Phase 3: ▶ VOCABULARY: / -> N. word (pos) — Vietnamese — sentence
        Falls back to UPPERCASE words from reading text."""
        vocab_re = re.compile(r'(?:ELA\s+)?Vocabulary\s*:?\s*$|VOCABULARY\s*:', re.I)
        # Phase 3: ▶ N.3 VOCABULARY: or ▶ VOCABULARY: or N.N VOCABULARY: (without ▶)
        vocab3_re = re.compile(r'^(▶\s*)?(?:\d+\.\d+\s+)?VOCABULARY\s*:', re.I)
        math_vocab_re = re.compile(r'Math\s+Vocabulary\s*:?\s*$', re.I)
        # Phase 3 word entry: "-> N. word (pos) — Vietnamese — sentence"
        word3_re = re.compile(r'^->\s*\d+\.\s*(.+?)\s*\(', re.I)
        words = []
        collecting = False
        stop_re = re.compile(
            r'^\s*(?:Writing\s+Task|★|\d+\.\d+\s+[A-Z]|Math\s+Vocab|SPIRAL|HOMEWORK)',
            re.I
        )
        stop_re3 = re.compile(r'^(▶\s*)?\d+\.\d+\s+(?!VOCABULARY)', re.I)
        for line in raw:
            stripped = line.strip()
            if vocab_re.match(stripped) or vocab3_re.match(stripped) or math_vocab_re.match(stripped):
                collecting = True
                continue
            if collecting:
                if stop_re.match(line):
                    break
                if stop_re3.match(stripped):
                    break
                # Phase 3: "-> N. word (pos) — Vietnamese — sentence"
                m3 = word3_re.match(stripped)
                if m3:
                    w = m3.group(1).strip()
                    if w and len(w) < 40:
                        words.append(w)
                    continue
                # Phase 1/2: comma- or newline-separated plain words
                if stripped and not stripped.startswith('★') and not stripped.startswith('▶') and not stripped.startswith('->'):
                    for w in re.split(r'[,;]', stripped):
                        w = w.strip().strip('•-123456789.() ').strip()
                        if w and 2 < len(w) < 40 and not w[0].isdigit():
                            words.append(w)
        # If no explicit list found, derive from UPPERCASE words in reading text
        if not words:
            full_text = ' '.join(l for l in raw if l.strip())
            uppercase_words = re.findall(r'\b([A-Z]{2,})\b', full_text)
            stopwords = {'ELA', 'MATH', 'STEM', 'CLIL', 'OK', 'CAMBRIDGE', 'THE',
                         'AND', 'FOR', 'NOT', 'ARE', 'WAS', 'BUT', 'PART', 'WEEK',
                         'SECTION', 'SESSION', 'READING', 'WRITING', 'SPEAKING',
                         'LISTENING', 'GRAMMAR', 'HOMEWORK', 'SPIRAL', 'REVIEW',
                         'INPUT', 'FOCUS', 'TASK', 'PRACTICE', 'CHECK', 'OVERVIEW',
                         'YES', 'NO', 'ALL', 'NEW', 'ONE', 'TWO', 'USE', 'SAY',
                         'STEP', 'NOTE', 'TIP', 'KEY', 'RULE'}
            seen = set()
            for w in uppercase_words:
                if w not in stopwords and w not in seen and len(w) >= 3:
                    words.append(w.capitalize())
                    seen.add(w)
                    if len(words) >= 10:
                        break
        return words[:15]  # max 15 vocab items

    def _extract_writing(self, raw: list[str]) -> dict:
        """Extract writing task.
        Handles Phase 1/2 (Writing Task:) and Phase 3 (▶ N.3 WRITING TASK:)."""
        writing_re = re.compile(r'Writing\s+Task|WRITING\s+TASK', re.I)
        writing3_re = re.compile(r'^▶\s*\d+\.\d+\s+WRITING\s+TASK\s*[:\-]?', re.I)
        title = 'Writing Task'
        sentences = []
        collecting = False
        stop_re = re.compile(
            r'^\s*(?:★|\d+\.\d+\s+[A-Z]|SPIRAL|HOMEWORK)',
            re.I
        )
        stop_re3 = re.compile(r'^▶\s*\d+\.\d+\s+(?!WRITING)', re.I)
        for line in raw:
            stripped = line.strip()
            if writing_re.search(stripped) or writing3_re.match(stripped):
                collecting = True
                rest = re.sub(r'(▶\s*\d+\.\d+\s+)?Writing\s+Task|WRITING\s+TASK', '', stripped, flags=re.I).strip(' :()')
                if rest:
                    title = rest
                continue
            if collecting:
                if stop_re.match(line):
                    break
                if stop_re3.match(stripped) and sentences:
                    break
                if stripped and not stripped.startswith('★') and not stripped.startswith('▶'):
                    # Phase 3: "-> STEP N: ..." format
                    step_m = re.match(r'^->\s*STEP\s+\d+\s*:\s*(.+)', stripped, re.I)
                    if step_m:
                        sentences.append(step_m.group(1).strip()[:150])
                        continue
                    # Strip -> prefix
                    stripped_arrow = re.sub(r'^->\s*', '', stripped)
                    m = re.match(r'^Sentence\s+\d+\s*[:\-]?\s*(.+)', stripped_arrow, re.I)
                    if m:
                        sentences.append(m.group(1).strip())
                    elif stripped_arrow and not re.match(r'^[A-Z\s]+\s*[:\-]', stripped_arrow):
                        sentences.append(stripped_arrow[:150])
        return {
            'title': title,
            'sentences': sentences[:10],
        }

    def _extract_math(self, raw: list[str]) -> dict:
        """Extract math/science component (Phase 2+)."""
        math_re = re.compile(r'\d+\.\d+\s+MATH\s+COMPONENT|MATH\s+COMPONENT|SCIENCE\s+COMPONENT', re.I)
        topic = ''
        text_lines = []
        problem = ''
        collecting = False
        stop_re = re.compile(
            r'^\s*(?:\d+\.\d+\s+[A-Z]|★|SPIRAL|HOMEWORK)',
            re.I
        )
        for line in raw:
            stripped = line.strip()
            if math_re.search(stripped):
                collecting = True
                m = re.search(r'Topic\s*[:\-]\s*(.+)', stripped, re.I)
                if m:
                    topic = m.group(1).strip()
                continue
            if collecting:
                if stop_re.match(line):
                    break
                if re.match(r'Topic\s*:', stripped, re.I):
                    topic = re.sub(r'Topic\s*:\s*', '', stripped, flags=re.I).strip()
                elif re.match(r'(?:Problem|Math\s+Word\s+Problem)\s*:', stripped, re.I):
                    problem = stripped
                elif stripped and not stripped.startswith('★') and not stripped.startswith('▶'):
                    text_lines.append(stripped)
        return {
            'topic': topic,
            'text': '\n'.join(text_lines[:15]),
            'problem': problem,
        }

    def _extract_spiral(self, raw: list[str]) -> str:
        """Extract spiral review content."""
        spiral_re = re.compile(r'SPIRAL\s+REVIEW|Spiral\s+Review', re.I)
        lines_out = []
        collecting = False
        stop_re = re.compile(
            r'^\s*(?:HOMEWORK|\d+\.\d+\s+[A-Z]|★\s+CAMBRIDGE)',
            re.I
        )
        for line in raw:
            if spiral_re.search(line):
                collecting = True
                continue
            if collecting:
                if stop_re.match(line):
                    break
                if line.strip() and not line.strip().startswith('★') and not line.strip().startswith('▶'):
                    lines_out.append(line.strip())
        return '\n'.join(lines_out[:10]).strip()

    def _extract_homework(self, raw: list[str]) -> str:
        """Extract homework section."""
        hw_re = re.compile(r'\d+\.\d+\s+HOMEWORK|^\s*HOMEWORK', re.I)
        lines_out = []
        collecting = False
        stop_re = re.compile(
            r'^\s*(?:\d+\.\d+\s+[A-Z]|★\s+CAMBRIDGE|WEEK\s+\d+\s*:)',
            re.I
        )
        for line in raw:
            if hw_re.search(line):
                collecting = True
                continue
            if collecting:
                if stop_re.match(line):
                    break
                stripped = line.strip()
                if stripped and not stripped.startswith('★') and not stripped.startswith('▶'):
                    lines_out.append(stripped)
        return '\n'.join(lines_out[:15]).strip()

    def _extract_cambridge(self, raw: list[str]) -> str:
        """Extract Cambridge integration notes."""
        cam_re = re.compile(r'★\s+CAMBRIDGE\s+INTEGRATION', re.I)
        lines_out = []
        collecting = False
        stop_re = re.compile(
            r'^\s*(?:\d+\.\d+\s+[A-Z]|WEEK\s+\d+\s*:)',
            re.I
        )
        for line in raw:
            if cam_re.search(line):
                collecting = True
                lines_out.append(line.strip())
                continue
            if collecting:
                if stop_re.match(line):
                    break
                lines_out.append(line.strip())
        return '\n'.join(l for l in lines_out[:20] if l).strip()


# ─────────────────────────────────────────────────────────────────────────────
# Lesson Builder — generates W28-schema JSON from syllabus data
# ─────────────────────────────────────────────────────────────────────────────

class LessonBuilder:
    """Build full lesson JSON following W28 golden standard."""

    # Speed note used in all teacher listening scripts
    SPEED_NOTE = (
        'Read aloud at a normal, clear pace (85 wpm). '
        'Pause 2–3 seconds between sentences. '
        'Read the full text twice before students answer questions.'
    )

    def build(self, week_data: dict) -> dict:
        n = week_data['week']
        phase = week_data['phase']
        title = week_data['title']
        title_vi = week_data.get('title_vi', '')
        block = week_data['block']
        reading = week_data.get('reading', {})
        grammar = week_data.get('grammar', {})
        vocab_words = week_data.get('vocab', [])
        writing = week_data.get('writing', {})
        math = week_data.get('math', {})
        spiral = week_data.get('spiral', '')
        homework = week_data.get('homework', '')
        cambridge = week_data.get('cambridge', '')

        reading_title = reading.get('title', 'Reading Text')
        reading_text = reading.get('text', '[★ FILL-IN: reading passage text]')
        grammar_focus = grammar.get('focus', '[★ FILL-IN: grammar focus]')
        grammar_pattern = grammar.get('pattern', '[★ FILL-IN: grammar pattern]')
        grammar_examples = grammar.get('examples', [])

        unit_theme = f'{title}'
        if title_vi:
            unit_theme += f' — {title_vi}'

        # Derive dictation sentences from reading text (first 3 sentences)
        dictation_sentences = self._extract_dictation(reading_text)

        # Build the 3 sessions
        sessions = [
            self._build_session(1, n, block, phase, reading_title, reading_text,
                                grammar_focus, grammar_pattern, grammar_examples,
                                vocab_words, writing, math, spiral, homework, cambridge),
            self._build_session(2, n, block, phase, reading_title, reading_text,
                                grammar_focus, grammar_pattern, grammar_examples,
                                vocab_words, writing, math, spiral, homework, cambridge),
            self._build_session(3, n, block, phase, reading_title, reading_text,
                                grammar_focus, grammar_pattern, grammar_examples,
                                vocab_words, writing, math, spiral, homework, cambridge),
        ]

        # Teacher contents (3 sessions)
        teacher_contents = [
            self._build_teacher_content(s, reading_text, dictation_sentences,
                                        grammar_focus, grammar_examples,
                                        math, vocab_words, phase)
            for s in [1, 2, 3]
        ]

        # quick_ref
        vocab_str = ', '.join(vocab_words[:8]) if vocab_words else '[★ FILL-IN: key vocabulary]'
        quick_ref = {
            'Week': str(n),
            'Block': block,
            'Phase': str(phase),
            'Theme': title,
            'Grammar Focus': grammar_focus,
            'Key Pattern': grammar_pattern or '[★ FILL-IN]',
            'Vocabulary': vocab_str,
            'Spiral Review': spiral[:100] if spiral else '[★ FILL-IN: spiral review topics]',
            'VC Word Targets': 'S1=95w (70%) S2=105w (65%) S3=115w (60%)',
            'FK Target': 'Grade 3 (FK 65–75)' if phase >= 2 else 'Grade 2 (FK 70–80)',
        }
        if phase >= 2 and math.get('topic'):
            quick_ref['Math/Science Topic'] = math['topic']

        return {
            'week': n,
            'unit_theme': unit_theme,
            'quick_ref': quick_ref,
            'methodology': self._build_methodology(n, phase, grammar_focus),
            'vocab_tiers': self._build_vocab_tiers(vocab_words, phase),
            'sessions': sessions,
            'sessions_2': [],
            'sessions_5': [],
            'answer_key': {},
            'answer_key_by_session': {},
            'task_cards': [],
            'task_cards_by_session': {},
            'games': [],
            'video_prompts': [],
            'teacher_contents': teacher_contents,
        }

    # ── Session builder ───────────────────────────────────────────────────────

    def _build_session(self, session_num: int, week_num: int, block: str, phase: int,
                       reading_title: str, reading_text: str,
                       grammar_focus: str, grammar_pattern: str, grammar_examples: list,
                       vocab_words: list, writing: dict, math: dict,
                       spiral: str, homework: str, cambridge: str) -> dict:

        n = week_num
        s = session_num

        # Session-level focus varies
        if session_num == 1:
            session_label = 'Session 1 — Reading & Grammar'
        elif session_num == 2:
            session_label = 'Session 2 — Practice & Skills'
            if phase >= 2 and math.get('topic'):
                session_label = f'Session 2 — {math["topic"]}'
        else:
            session_label = 'Session 3 — Production & Review'

        parts = []

        # ── Part 0: Header ─────────────────────────────────────────────────
        parts.append({
            'title': f'WEEK {n} | SESSION {s} | BLOCK {block}',
            'content': [
                'Name: ________________________________________ '
                'Date: ___________________________________'
            ],
        })

        # ── Spiral Review ──────────────────────────────────────────────────
        spiral_content = self._build_spiral_content(spiral, grammar_pattern, grammar_examples, session_num)
        parts.append({'title': 'SPIRAL REVIEW (5 min)', 'content': spiral_content})

        # ── Part 1: Reading Input ──────────────────────────────────────────
        reading_part = self._build_reading_part(
            reading_title, reading_text, grammar_focus, session_num, week_num
        )
        parts.append(reading_part)

        # ── Grammar Focus ──────────────────────────────────────────────────
        grammar_part = self._build_grammar_part(grammar_focus, grammar_pattern, grammar_examples, phase)
        parts.append(grammar_part)

        # ── Part 2: Vocabulary ─────────────────────────────────────────────
        vocab_part = self._build_vocab_part(vocab_words, session_num, phase)
        parts.append(vocab_part)

        # ── Part 3: Sentence Building ──────────────────────────────────────
        parts.append(self._build_sentence_building(grammar_pattern, grammar_examples, vocab_words, session_num))

        # ── Part 4: Listening Practice ─────────────────────────────────────
        parts.append(self._build_listening_part(reading_title, reading_text, session_num))

        # ── Part 5: Error Correction ───────────────────────────────────────
        parts.append(self._build_error_correction(grammar_focus, grammar_examples, session_num))

        # ── Part 6: STEM/CLIL or Math ─────────────────────────────────────
        parts.append(self._build_stem_part(math, phase, week_num, session_num))

        # ── Part 7: Quick Production Check ────────────────────────────────
        parts.append(self._build_quick_check(vocab_words, grammar_pattern, session_num))

        # ── Part 8: Portfolio ──────────────────────────────────────────────
        parts.append(self._build_portfolio(writing, reading_title, week_num, session_num))

        # ── Part 9: Homework ───────────────────────────────────────────────
        parts.append(self._build_homework_part(homework, week_num, session_num, vocab_words, grammar_pattern))

        return {
            'session': session_num,
            'session_label': session_label,
            'parts': parts,
        }

    # ── Part builders ─────────────────────────────────────────────────────────

    def _build_spiral_content(self, spiral: str, pattern: str, examples: list, s: int) -> list:
        content = []
        if spiral:
            for line in spiral.split('\n')[:4]:
                if line.strip():
                    content.append(line.strip())
        if not content:
            content.append(f'Translation drill: Write the English sentence.')
            content.append(f'Error Correction: Find the mistake.')
        if pattern:
            content.append(f'Quick recall: {pattern[:80]}')
        return content

    def _build_reading_part(self, reading_title: str, reading_text: str,
                            grammar_focus: str, session_num: int, week_num: int) -> dict:
        """Build PART 1: READING INPUT following W28 format with blue box + comprehension."""
        content = []

        # Blue box header (teacher reads aloud)
        content.append(f'📖 {reading_title}')
        content.append('')

        # The reading passage (split into lines)
        if reading_text:
            for para in reading_text.split('\n'):
                para = para.strip()
                if para:
                    content.append(para)
        else:
            content.append('[★ FILL-IN: reading passage text — 100-150 words]')

        content.append('')

        # Student section
        content.append('Title: ________')
        content.append('(↑ Re-read the story above to answer:)')
        content.append('')

        # Stage 1 — Global comprehension
        content.append('Stage 1 — Global:')
        content.append(f'  T / F: The text is about {reading_title.lower()}.')
        content.append(f'  T / F: [★ FILL-IN: second T/F statement]')
        content.append(f'  What is the main topic? ______')

        # Stage 2 — Detail
        content.append('')
        content.append('Stage 2 — Detail:')
        content.append('  [★ FILL-IN: Who/What question 1]')
        content.append('  → ____________')
        content.append('  [★ FILL-IN: How/Why question 2]')
        content.append('  → ____________')
        content.append('  Fill-in from text: _______________ is/was _______________.')

        # Stage 3B — Inference
        content.append('')
        content.append(f'Stage 3B — Inference: [★ FILL-IN: inference question about {reading_title}]')
        content.append('____________________________________________________________')
        content.append('[ Sub-total: ___ / 6 ]')

        return {
            'title': f'PART 1: READING INPUT  {reading_title}',
            'content': content,
        }

    def _build_grammar_part(self, grammar_focus: str, pattern: str, examples: list, phase: int) -> dict:
        """Build Grammar Focus following W28 format with rule box + Cambridge integration."""
        content = []
        content.append(f'📌 RULE: {grammar_focus}')
        content.append('')

        if pattern:
            content.append('Pattern:')
            for p in pattern.split('|'):
                p = p.strip()
                if p:
                    content.append(f'  {p}')
            content.append('')

        # Box-drawing table for grammar patterns
        content.append('┌──────────────────────────────────────────────┐')
        if examples:
            for ex in examples[:4]:
                content.append(f'│  {ex[:44]:<44}│')
        else:
            content.append(f'│  [★ FILL-IN: grammar example 1]             │')
            content.append(f'│  [★ FILL-IN: grammar example 2]             │')
        content.append('└──────────────────────────────────────────────┘')
        content.append('')

        content.append('★ CAMBRIDGE INTEGRATION:')
        content.append(f'  This grammar structure appears in Cambridge exams.')
        content.append(f'  Pattern: {pattern[:80] if pattern else "[★ FILL-IN]"}')
        content.append('')

        content.append('📌 PRACTICE:')
        content.append('  1. Complete: _________________________________')
        content.append('  2. Rewrite: _________________________________')
        content.append('  [ Sub-total: ___ / 4 ]')

        return {
            'title': f'GRAMMAR FOCUS — {grammar_focus[:60]}',
            'content': content,
        }

    def _build_vocab_part(self, vocab_words: list, session_num: int, phase: int) -> dict:
        """Build PART 2: VOCABULARY BUILDING."""
        content = []

        tier_label = 'TIER 1 STORY WORDS:' if phase == 1 else 'KEY VOCABULARY:'
        content.append(tier_label)

        words_to_show = vocab_words[:8] if vocab_words else [f'[★ FILL-IN word {i}]' for i in range(1, 9)]
        for i, word in enumerate(words_to_show, 1):
            # Check if word has Vietnamese in parentheses
            m = re.match(r'(.+?)\s*[(\[](.+?)[)\]]', word)
            eng = m.group(1).strip() if m else word
            vi = m.group(2).strip() if m else '(nghĩa)'

            content.append(f'{i}. {eng} {vi}')
            content.append(f'   → Write 3 times: ______________________   '
                           f'______________________   ______________________')
            content.append(f'   → Collocation: [★ FILL-IN]')
            content.append(f'   → Sentence: _________________________________')

        content.append('')
        content.append('[ Sub-total: ___ / 8 ]')

        return {
            'title': f'PART 2: VOCABULARY BUILDING — {", ".join(w.split("(")[0].strip() for w in vocab_words[:3]) if vocab_words else "[words]"}...',
            'content': content,
        }

    def _build_sentence_building(self, pattern: str, examples: list, vocab_words: list, session_num: int) -> dict:
        """Build PART 3: SENTENCE BUILDING with diverse exercises."""
        content = []

        content.append('L1 — Read the clue and write the word (10 items):')
        content.append('1. [★ FILL-IN: clue 1] → ____________________')
        content.append('2. [★ FILL-IN: clue 2] → ____________________')
        content.append('3. [★ FILL-IN: clue 3] → ____________________')
        content.append('4. [★ FILL-IN: clue 4] → ____________________')
        content.append('5. [★ FILL-IN: clue 5] → ____________________')
        content.append('')

        content.append('L2 — Complete the sentences using the grammar pattern:')
        if pattern:
            content.append(f'Pattern: {pattern[:80]}')
        content.append('1. _________________________________ because ___________________________.')
        content.append('2. _________________________________, so _______________________________.')
        content.append('3. Rewrite using the opposite connector: [★ FILL-IN sentence]')
        content.append('')

        content.append('L3 — Translation (English → Vietnamese meaning):')
        for i, w in enumerate((vocab_words or ['[word]'])[:5], 1):
            eng = w.split('(')[0].strip()
            content.append(f'{i}. {eng} → ____________________')
        content.append('')

        content.append('L4 — Write 1 original sentence using today\'s grammar pattern:')
        content.append('→ ____________________________________________________________')
        content.append('[ Sub-total: ___ / 10 ]')

        return {
            'title': 'PART 3: SENTENCE BUILDING (DIVERSE EXERCISES)',
            'content': content,
        }

    def _build_listening_part(self, reading_title: str, reading_text: str, session_num: int) -> dict:
        """Build PART 4: LISTENING PRACTICE — Cambridge Flyers format."""
        content = []

        content.append('A. Stage 1 — Global:')
        content.append(f'☐ The text is about {reading_title.lower()}.')
        content.append('☐ [★ FILL-IN: incorrect option]')
        content.append('☐ [★ FILL-IN: incorrect option]')
        content.append('')

        content.append('B. Stage 2 — Detail (circle the correct answer):')
        content.append('1. [★ FILL-IN: comprehension Q1]')
        content.append('   (a) [option A]  (b) [option B]  (c) [option C]  → ____________________')
        content.append('2. [★ FILL-IN: comprehension Q2]')
        content.append('   (a) [option A]  (b) [option B]  (c) [option C]  → ____________________')
        content.append('3. [★ FILL-IN: comprehension Q3]')
        content.append('   (a) [option A]  (b) [option B]  (c) [option C]  → ____________________')
        content.append('')

        content.append('C. Stage 3 — Inference:')
        content.append('[★ FILL-IN: inference question about the listening text]')
        content.append('→ ____________________________________________________________')
        content.append('[ Sub-total: ___ / 7 ]')

        return {
            'title': f'PART 4: LISTENING PRACTICE — Cambridge Flyers Listening format',
            'content': content,
        }

    def _build_error_correction(self, grammar_focus: str, examples: list, session_num: int) -> dict:
        """Build PART 5: ERROR CORRECTION."""
        content = []
        content.append('Find the hidden mistake and write the correction:')
        content.append('')
        content.append('1. \'[★ FILL-IN: sentence with grammar error 1]\'')
        content.append('   → Mistake: ____________________ | Correction: ____________________')
        content.append('2. \'[★ FILL-IN: sentence with grammar error 2]\'')
        content.append('   → Mistake: ____________________ | Correction: ____________________')
        content.append('3. \'[★ FILL-IN: sentence with grammar error 3]\'')
        content.append('   → Mistake: ____________________ | Correction: ____________________')
        content.append('[ Sub-total: ___ / 3 ]')

        return {
            'title': 'PART 5: ERROR CORRECTION (Find the hidden mistake)',
            'content': content,
        }

    def _build_stem_part(self, math: dict, phase: int, week_num: int, session_num: int) -> dict:
        """Build PART 6: STEM/CLIL or Math component."""
        content = []

        if phase >= 2 and math.get('text'):
            content.append(f'📐 MATH/SCIENCE: {math.get("topic", "[★ FILL-IN: topic]")}')
            content.append('')
            for line in math['text'].split('\n')[:8]:
                if line.strip():
                    content.append(line.strip())
            content.append('')
            if math.get('problem'):
                content.append(f'Word Problem: {math["problem"][:100]}')
            content.append('→ Show your working: ____________________')
            content.append('→ Answer: ____________________')
        else:
            content.append('[★ FILL-IN: STEM/CLIL connection topic]')
            content.append('Real-world connection: ____________________')
            content.append('1. [★ FILL-IN: STEM question 1] → ____________________')
            content.append('2. [★ FILL-IN: STEM question 2] → ____________________')

        content.append('[ Sub-total: ___ / 4 ]')

        stem_label = f'{math["topic"]}' if (phase >= 2 and math.get("topic")) else 'STEM/CLIL Connection'
        return {
            'title': f'PART 6: STEM/CLIL — {stem_label}',
            'content': content,
        }

    def _build_quick_check(self, vocab_words: list, pattern: str, session_num: int) -> dict:
        """Build PART 7: QUICK PRODUCTION CHECK."""
        content = []

        words = [w.split('(')[0].strip() for w in vocab_words[:6]] if vocab_words else ['[word1]', '[word2]']

        content.append(f'1. Write the English: [★ FILL-IN: Vietnamese word]  → ____________________')
        if len(words) >= 2:
            content.append(f'2. {words[0]} in a sentence: ____________________')
        content.append(f'3. Use the grammar pattern to write 1 sentence:')
        content.append(f'   {pattern[:60] if pattern else "[★ FILL-IN: grammar pattern]"}')
        content.append(f'   → ____________________')
        content.append(f'4. Translation: [★ FILL-IN: Vietnamese phrase] → ____________________')
        content.append(f'5. My best sentence this session:')
        content.append(f'   → ____________________________________________________________')
        content.append('[ Sub-total: ___ / 5 ]')

        return {
            'title': 'PART 7: QUICK PRODUCTION CHECK',
            'content': content,
        }

    def _build_portfolio(self, writing: dict, reading_title: str, week_num: int, session_num: int) -> dict:
        """Build PART 8: MY PORTFOLIO ENTRY."""
        content = []
        w_title = writing.get('title', 'Writing Task')
        sentences = writing.get('sentences', [])

        content.append(f'📝 {w_title}')
        content.append('')

        if sentences:
            for i, sent in enumerate(sentences[:7], 1):
                content.append(f'Sentence {i}: {sent}')
        else:
            for i in range(1, 6):
                content.append(f'Sentence {i}: [★ FILL-IN: guided sentence {i}]')

        content.append('')
        content.append('Extension: Write 1 additional original sentence using today\'s vocabulary:')
        content.append('→ ____________________________________________________________')
        content.append('[ Sub-total: ___ / 5 ]')

        return {
            'title': f'PART 8: MY PORTFOLIO ENTRY — PROJECT DRAFT  📝  Week {week_num} — Session {session_num}',
            'content': content,
        }

    def _build_homework_part(self, homework: str, week_num: int, session_num: int,
                             vocab_words: list, pattern: str) -> dict:
        """Build PART 9: HOMEWORK following W28 format."""
        content = []

        # Vocabulary homework
        content.append('Vocabulary (write 1 sentence for each word):')
        words = vocab_words[:6] if vocab_words else [f'[word {i}]' for i in range(1, 7)]
        for i, w in enumerate(words, 1):
            eng = w.split('(')[0].strip()
            content.append(f'{i}. {eng}:')
            content.append('   ____________________________________________________________')
        content.append('')

        # Grammar homework
        content.append('Grammar Practice:')
        content.append(f'Pattern: {pattern[:80] if pattern else "[★ FILL-IN grammar pattern]"}')
        content.append('1. Write 3 sentences using today\'s grammar pattern:')
        for i in range(1, 4):
            content.append(f'   {i}. ____________________________________________________________')
        content.append('')

        # Syllabus homework content
        if homework:
            content.append('From syllabus homework:')
            for line in homework.split('\n')[:8]:
                if line.strip():
                    content.append(f'  → {line.strip()}')
        else:
            content.append('Reading: Re-read today\'s passage and underline key words.')
            content.append('Cambridge: Complete Cambridge practice worksheet.')

        content.append('')
        content.append('[ Homework Sub-total: ___ / 10 ]')

        return {
            'title': f'PART 9: HOMEWORK — Week {week_num}, Session {session_num}',
            'content': content,
        }

    # ── Teacher contents ──────────────────────────────────────────────────────

    def _build_teacher_content(self, session_num: int, reading_text: str, dictation_sentences: list,
                                grammar_focus: str, grammar_examples: list,
                                math: dict, vocab_words: list, phase: int) -> dict:
        """Build teacher_contents entry for a session (W28 schema)."""

        # Listening script from reading text
        listening_text = reading_text if reading_text and '[★' not in reading_text else '[★ FILL-IN: listening script text]'

        # Dictation: 3 clear sentences from reading text
        dictation = dictation_sentences if dictation_sentences else [
            '[★ FILL-IN: dictation sentence 1]',
            '[★ FILL-IN: dictation sentence 2]',
            '[★ FILL-IN: dictation sentence 3]',
        ]

        # Speaking notes
        speaking_notes = self._build_speaking_notes(session_num, grammar_focus, vocab_words)

        # STEM/Math extension notes
        stem_ext = ''
        if phase >= 2 and math.get('text'):
            stem_ext = (
                f'MATH/SCIENCE Extension Notes (teacher only):\n\n'
                f'Topic: {math.get("topic", "[topic]")}\n\n'
                f'{math.get("text", "")[:300]}\n\n'
                f'Word Problem approach: Guide students step by step.\n'
                f'Answer: {math.get("problem", "[★ FILL-IN]")}'
            )
        else:
            stem_ext = (
                'STEM/CLIL Extension Notes (teacher only):\n\n'
                '[★ FILL-IN: STEM extension content for this session]'
            )

        # In-class speaking activities
        in_class = self._build_in_class_speaking(session_num, grammar_focus, grammar_examples, vocab_words)

        # VC answer key
        vc_key = ' '.join(f'[{i+1}] {w.split("(")[0].strip()}' for i, w in enumerate(vocab_words[:8])) \
                 if vocab_words else '[★ FILL-IN: answer key for VC exercise]'

        # Grammar notes
        grammar_notes = f'• Grammar: {grammar_focus}\n'
        if grammar_examples:
            for ex in grammar_examples[:3]:
                grammar_notes += f'• {ex}\n'
        else:
            grammar_notes += '• [★ FILL-IN: grammar notes for teacher]\n'

        return {
            'session': session_num,
            'listening_script': {
                'speed_note': self.SPEED_NOTE,
                'text': listening_text,
                'dictation': dictation,
            },
            'speaking_notes': speaking_notes,
            'stem_extension': stem_ext,
            'in_class_speaking': in_class,
            'vc_answer_key': vc_key,
            'grammar_notes': grammar_notes.strip(),
        }

    def _build_speaking_notes(self, session_num: int, grammar_focus: str, vocab_words: list) -> str:
        lines = [
            f'SPEAKING CHECKPOINT — Teacher Guidance (do NOT share with students):\n',
            f'Session {session_num}:',
        ]
        if session_num == 1:
            lines.append('Activity 1 — Pair Speaking: Students describe the reading passage to a partner.')
        elif session_num == 2:
            lines.append('Activity 1 — Grammar Drill: Students produce sentences using today\'s pattern.')
        else:
            lines.append('Activity 1 — Production: Students present their portfolio sentence.')
        lines.append(f'\nGrammar checkpoint: {grammar_focus[:80] if grammar_focus else "[★ FILL-IN]"}')
        lines.append('\nExpected output: Students can produce 2+ sentences using today\'s pattern.')
        lines.append('\n[★ FILL-IN: additional speaking guidance for Session ' + str(session_num) + ']')
        return '\n'.join(lines)

    def _build_in_class_speaking(self, session_num: int, grammar_focus: str,
                                  grammar_examples: list, vocab_words: list) -> str:
        lines = [
            f'IN-CLASS SPEAKING ACTIVITIES — Session {session_num} (teacher-led)\n',
            'Activity 1 — Warm-up (3 min):',
            f'  Ask: "What did we learn last session?" → students recall vocabulary.',
            '',
            'Activity 2 — Grammar production (5 min):',
            f'  Pattern: {grammar_focus[:60] if grammar_focus else "[★ FILL-IN]"}',
            '  Students take turns producing sentences with the pattern.',
            '',
            'Activity 3 — Pair work (5 min):',
            '  Student A asks, Student B answers using today\'s vocabulary.',
            '  Swap roles after 3 exchanges.',
            '',
            '[★ FILL-IN: additional in-class activities for Session ' + str(session_num) + ']',
        ]
        return '\n'.join(lines)

    # ── Metadata builders ─────────────────────────────────────────────────────

    def _build_methodology(self, week_num: int, phase: int, grammar_focus: str) -> list:
        return [
            {
                'title': '2.1 Core Principle: Implicit Grammar through Context',
                'content': [
                    f'Phase {phase} — Students encounter the grammar in authentic texts.',
                    f'Week {week_num} grammar focus: {grammar_focus}',
                    '[★ FILL-IN: methodology notes specific to this week\'s grammar]',
                ],
            }
        ]

    def _build_vocab_tiers(self, vocab_words: list, phase: int) -> list:
        tier_label = 'Tier 1' if phase == 1 else 'Tier 2'
        return [
            {
                'tier': tier_label,
                'words': [w.split('(')[0].strip() for w in vocab_words[:10]] if vocab_words else [],
                'note': f'[★ FILL-IN: vocabulary tier notes for Phase {phase}]',
            }
        ]

    # ── Utility ───────────────────────────────────────────────────────────────

    def _extract_dictation(self, text: str) -> list[str]:
        """Extract 3 clear sentences from reading text for dictation."""
        if not text or '[★' in text:
            return []
        # Split on '. ' or '.\n' and take first 3 complete sentences
        sentences = re.split(r'(?<=[.!?])\s+', text.strip())
        # Filter: keep sentences 10-80 chars
        good = [s.strip() for s in sentences if 10 <= len(s.strip()) <= 80]
        return good[:3]


# ─────────────────────────────────────────────────────────────────────────────
# Inject to 5 files (same as build_lesson_plans_from_docx.inject_week)
# ─────────────────────────────────────────────────────────────────────────────

def inject_lesson(week_num: int, data: dict) -> None:
    """Write week data to all 5 required output files."""
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

    # 4. mcp-server/data/lessons/WN.json
    MCP_LESSONS.mkdir(parents=True, exist_ok=True)
    with open(MCP_LESSONS / f'W{week_num}.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    # 5. public/data/lessons/WN.json
    PUB_LESSONS.mkdir(parents=True, exist_ok=True)
    with open(PUB_LESSONS / f'W{week_num}.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


# ─────────────────────────────────────────────────────────────────────────────
# Validation
# ─────────────────────────────────────────────────────────────────────────────

def validate_lesson(week_num: int, data: dict) -> list[str]:
    """Return list of warnings for a generated lesson."""
    warnings = []

    # Check sessions
    sessions = data.get('sessions', [])
    if len(sessions) != 3:
        warnings.append(f'Expected 3 sessions, got {len(sessions)}')

    # Check teacher_contents
    tc = data.get('teacher_contents', [])
    if len(tc) != 3:
        warnings.append(f'Expected 3 teacher_contents, got {len(tc)}')
    for t in tc:
        ls = t.get('listening_script', {})
        if not ls.get('text') or '[★' in ls.get('text', ''):
            warnings.append(f'Session {t["session"]}: listening_script.text needs fill-in')

    # Count TODO markers
    total_text = json.dumps(data, ensure_ascii=False)
    todos = total_text.count('[★ FILL-IN')
    if todos > 0:
        warnings.append(f'{todos} [★ FILL-IN] markers need manual completion')

    return warnings


# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────

def main():
    parser = SyllabusParser()
    builder = LessonBuilder()

    # Parse arguments
    args = sys.argv[1:]
    if not args:
        print('Usage: python3 _gen_lesson_from_syllabus.py <week> [week2 ...]')
        print('       python3 _gen_lesson_from_syllabus.py 54-60')
        print('       python3 _gen_lesson_from_syllabus.py --all')
        print('\nGenerates W54–W156 lesson JSONs from Syllabus V5.')
        print('For W28-W53, use build_lesson_plans_from_docx.py (has reference DOCX).')
        sys.exit(0)

    target_weeks: list[int] = []
    if '--all' in args:
        target_weeks = list(range(54, 157))
    else:
        for arg in args:
            if '-' in arg and not arg.startswith('-'):
                # Range: "54-60"
                parts = arg.split('-')
                if len(parts) == 2 and parts[0].isdigit() and parts[1].isdigit():
                    target_weeks.extend(range(int(parts[0]), int(parts[1]) + 1))
                else:
                    print(f'  ⚠️  Invalid range: {arg}')
            elif arg.isdigit():
                target_weeks.append(int(arg))

    if not target_weeks:
        print('ERROR: No valid week numbers provided.')
        sys.exit(1)

    # Warn if week already has JSON (will be overwritten)
    for n in target_weeks:
        if (PUB_LESSONS / f'W{n}.json').exists():
            print(f'  ⚠️  W{n}: existing JSON will be overwritten.')

    print(f'\n🏗  Generating {len(target_weeks)} week(s): {target_weeks[0]}–{target_weeks[-1]}'
          if len(target_weeks) > 1 else f'\n🏗  Generating W{target_weeks[0]}')
    print()

    results = {}
    for n in target_weeks:
        print(f'  Processing W{n}...', end=' ', flush=True)

        week_data = parser.get_week(n)
        if not week_data:
            print(f'❌ not found in syllabus')
            continue

        data = builder.build(week_data)
        results[n] = data

        warnings = validate_lesson(n, data)
        if warnings:
            todos = [w for w in warnings if 'FILL-IN' in w]
            other = [w for w in warnings if 'FILL-IN' not in w]
            status = '⚠️ ' + ', '.join(other) if other else '✅'
            todo_count = todos[0] if todos else ''
            print(f'{status} | {todo_count}')
        else:
            print('✅')

    if not results:
        print('\nNo weeks generated.')
        return

    print(f'\n📝 Injecting into 5 app JSON files...')
    for n, data in sorted(results.items()):
        inject_lesson(n, data)
        print(f'  W{n} → public/data/lessons/ + mcp-server/data/lessons/ + lessonPlans*.json')

    print(f'\n✅ Done! {len(results)} week(s) generated and injected.')
    print()
    print('📋 Next steps for each week:')
    print('  1. Open public/data/lessons/WN.json')
    print('  2. Search for [★ FILL-IN] and fill in the real content')
    print('  3. Key fill-ins: reading passage, T/F statements, comprehension questions,')
    print('     error correction sentences, STEM/CLIL questions, in-class activities')
    print('  4. Run: python3 _audit_all.py WN  to validate')
    print('  5. Commit: git add public/data/lessons/ mcp-server/data/lessons/')


if __name__ == '__main__':
    main()
