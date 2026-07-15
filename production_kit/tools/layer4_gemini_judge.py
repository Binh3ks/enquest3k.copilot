#!/usr/bin/env python3
"""
Layer 4: LLM Judge using Google Gemini (gemini-2.0-flash).

For every UNVERIFIED chunk from Layer 1+2+3, call Gemini with
Pydantic schema (Structured Output) to decide whether the chunk
is a valid ESL collocation for A1-B1, or a false chunk that
should be unbolded.

Usage:
    export GEMINI_API_KEY="..."
    python3 layer4_gemini_judge.py --all
    python3 layer4_gemini_judge.py 30
    python3 layer4_gemini_judge.py --all --apply   # also strip false-chunk bolds

Rate limit: Google AI Studio free tier = 15 RPM (1 req / 4s).
We sleep 4s between requests to stay safe.
"""
import os
import re
import sys
import json
import time
import pathlib
from typing import Literal

from pydantic import BaseModel, Field
from google import genai
from google.genai import types


class ChunkVerdict(BaseModel):
    is_valid_chunk: bool = Field(
        description=(
            "True if the bold phrase is a real chunk/collocation that "
            "native English speakers use as a single unit. False if it is "
            "just a free grammatical combination that should be unbolded "
            "or rewritten."
        )
    )
    category: Literal[
        "phrasal-verb", "prepositional-verb", "verb-noun", "verb-adverb-collocation",
        "adj-noun", "noun-noun", "prep-phrase", "fixed-expression", "functional",
        "measurement", "place-name", "free-grammatical-phrase", "false-chunk", "other",
    ] = Field(
        description="What category does this bold phrase fall into?"
    )
    explanation: str = Field(
        description="One-sentence reason in English. Max 250 chars."
    )
    suggested_fix: str = Field(
        description=(
            "If invalid, suggest how to rewrite or which sub-chunks to "
            "keep. Empty string if valid."
        )
    )


SYSTEM_PROMPT = (
    "You are an ESL expert and lexicographer. Judge whether the bolded phrase in the "
    "sentence is a real lexical chunk/collocation that native speakers use as a fixed unit. "
    "A chunk can be: phrasal verb, prepositional verb, fixed expression, idiom, functional "
    "phrase, common collocation (verb+noun, adj+noun, noun+noun), measurement phrase, or "
    "named place. DO NOT reject a phrase only because it contains a preposition or adverb. "
    "Examples of VALID chunks: spread out, waved back, laughed at, bragged about, got on, "
    "got ahead of, take care of, each other, at home, every day, just like, from place to place, "
    "travel by car, ride a motorbike, take a taxi, finish line, fell asleep, shaded tree, "
    "forest animals, cheered loudly, Ueno Park, Hyde Park, Central Park, kilometres per hour. "
    "Examples of INVALID chunks: story book in my bag, build this bridge, ate the food, drank lemonade, "
    "friendly pilot, kind farmer, the dolphins. Reply in JSON only."
)


def make_client():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        sys.exit(
            "ERROR: GEMINI_API_KEY env var not set.\n"
            "  export GEMINI_API_KEY=\"your-key\""
        )
    return genai.Client(api_key=api_key)


def get_sentence_context(content_en, bold_chunk):
    plain = content_en.replace("**", "")
    sentences = re.split(r"(?<=[.!?])\s+", plain)
    for s in sentences:
        if bold_chunk in s:
            return s.strip()
    return content_en[:300]


def audit_bold(client, sentence, bold_phrase, model="gemini-flash-latest"):
    user_prompt = (
        f"Sentence: \"{sentence}\"\n"
        f"Bold phrase: \"{bold_phrase}\"\n\n"
        f"Is '{bold_phrase}' a real ESL chunk/collocation? "
        f"If not, suggest the smallest valid sub-chunks to keep."
    )
    try:
        response = client.models.generate_content(
            model=model,
            contents=user_prompt,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                response_mime_type="application/json",
                response_schema=ChunkVerdict,
                temperature=0.0,
            ),
        )
        return ChunkVerdict.model_validate_json(response.text)
    except Exception as e:
        return ChunkVerdict(
            is_valid_chunk=True,
            category="other",
            explanation=f"API error: {str(e)[:200]}",
            suggested_fix="",
        )


def collect_unverified(weeks=None, scan_all=False):
    sys.path.insert(0, str(pathlib.Path(__file__).parent))
    from validate_chunks import classify_chunk

    if scan_all:
        weeks = list(range(1, 36))
    elif weeks:
        weeks = [int(w) for w in weeks]
    else:
        weeks = list(range(28, 36))

    pending = []
    for w in weeks:
        for mode in ['weeks', 'weeks_easy']:
            for station in ['read', 'explore']:
                p = f"src/data/{mode}/week_{w:02d}/{station}.js"
                pp = pathlib.Path(p)
                if not pp.exists():
                    continue
                s = pp.read_text()
                m = re.search(r'content_en:\s*(["`])((?:\\.|(?!\1).)*)\1', s, re.DOTALL)
                if not m:
                    continue
                content = m.group(2)
                for chunk in re.findall(r'\*\*([^*]+)\*\*', content):
                    status, _ = classify_chunk(chunk)
                    if status == 'unverified':
                        sentence = get_sentence_context(content, chunk)
                        pending.append({
                            'week': w,
                            'mode': mode,
                            'station': station,
                            'file': p,
                            'chunk': chunk,
                            'sentence': sentence,
                        })
    return pending


def main():
    args = sys.argv[1:]
    apply_fixes = '--apply' in args
    args = [a for a in args if not a.startswith('--')]
    scan_all = '--all' in args

    if scan_all:
        weeks = list(range(1, 36))
    elif args:
        weeks = args
    else:
        weeks = list(range(28, 36))

    print("Collecting UNVERIFIED chunks from Layer 1+2+3...")
    pending = collect_unverified(weeks=weeks, scan_all=scan_all)
    print(f"  {len(pending)} chunks to audit")
    print()

    if not pending:
        print("No unverified chunks. Audit done!")
        return 0

    print("Connecting to Google Gemini...")
    client = make_client()

    print(f"Auditing {len(pending)} chunks via Gemini (~4s/req, ~{len(pending)*4//60} min)...")
    verdicts = []
    n_valid = 0
    n_invalid = 0
    n_error = 0
    for i, item in enumerate(pending, 1):
        v = audit_bold(client, item['sentence'], item['chunk'])
        item['verdict'] = v.model_dump()
        verdicts.append(item)
        if 'API error' in v.explanation:
            n_error += 1
            status_str = "ERROR"
        elif v.is_valid_chunk:
            n_valid += 1
            status_str = "VALID"
        else:
            n_invalid += 1
            status_str = "INVALID"
        print(f"  [{i:3d}/{len(pending)}] {status_str:7s} | "
              f"{item['file']}: '{item['chunk']}'")
        if not v.is_valid_chunk and v.suggested_fix and 'API error' not in v.explanation:
            print(f"             -> fix: {v.suggested_fix[:120]}")
        if i < len(pending):
            time.sleep(4.0)

    out_path = pathlib.Path('/tmp/layer4_verdicts.jsonl')
    with out_path.open('w') as f:
        for v in verdicts:
            f.write(json.dumps(v, ensure_ascii=False) + '\n')
    print(f"\nVerdicts written to {out_path}")

    print()
    print(f"=== Summary ===")
    print(f"  VALID:   {n_valid}")
    print(f"  INVALID: {n_invalid}  (false chunks)")
    print(f"  ERROR:   {n_error}")

    if apply_fixes and n_invalid > 0:
        print()
        print("Applying fixes (removing bold from INVALID chunks)...")
        fixes = [v for v in verdicts
                 if v['verdict']['is_valid_chunk'] is False
                 and 'API error' not in v['verdict']['explanation']]
        for item in fixes:
            p = pathlib.Path(item['file'])
            text = p.read_text()
            old = f"**{item['chunk']}**"
            new = item['chunk']
            if old in text:
                p.write_text(text.replace(old, new, 1))
                print(f"  Fixed: {p} -> '{item['chunk']}'")
        print()
        print("Done. Run 'npm run build' to verify.")

    return 0


if __name__ == '__main__':
    sys.exit(main())

import os
import re
import sys
import json
import time
import pathlib
from typing import Literal

from pydantic import BaseModel, Field
from google import genai
from google.genai import types


class ChunkVerdict(BaseModel):
    is_valid_chunk: bool = Field(
        description=(
            "True if the bold phrase is a real chunk/collocation that "
            "native English speakers use as a single unit. False if it is "
            "just a free grammatical combination that should be unbolded "
            "or rewritten."
        )
    )
    category: Literal[
        "phrasal-verb", "verb-noun", "adj-noun", "noun-noun",
        "prep-phrase", "fixed-expression", "functional",
        "free-grammatical-phrase", "false-chunk", "other",
    ] = Field(
        description="What category does this bold phrase fall into?"
    )
    explanation: str = Field(
        description="One-sentence reason in English. Max 250 chars."
    )
    suggested_fix: str = Field(
        description=(
            "If invalid, suggest how to rewrite or which sub-chunks to "
            "keep. Empty string if valid."
        )
    )


SYSTEM_PROMPT = (
    "You are an ESL expert. Judge whether the bolded phrase in the "
    "sentence is a real lexical chunk/collocation that native speakers "
    "use as a fixed unit. Reply in JSON."
)


def make_client():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        sys.exit(
            "ERROR: GEMINI_API_KEY env var not set.\n"
            "  export GEMINI_API_KEY=\"your-key\""
        )
    return genai.Client(api_key=api_key)


def get_sentence_context(content_en, bold_chunk):
    """Find the sentence in content_en that contains the bold phrase."""
    plain = content_en.replace("**", "")
    sentences = re.split(r"(?<=[.!?])\s+", plain)
    for s in sentences:
        if bold_chunk in s:
            return s.strip()
    return content_en[:300]


def audit_bold(client, sentence, bold_phrase, model="gemini-flash-latest"):
    user_prompt = (
        f"Sentence: \"{sentence}\"\n"
        f"Bold phrase: \"{bold_phrase}\"\n\n"
        f"Is '{bold_phrase}' a real ESL chunk/collocation? "
        f"If not, suggest the smallest valid sub-chunks to keep."
    )
    try:
        response = client.models.generate_content(
            model=model,
            contents=user_prompt,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                response_mime_type="application/json",
                response_schema=ChunkVerdict,
                temperature=0.0,
            ),
        )
        return ChunkVerdict.model_validate_json(response.text)
    except Exception as e:
        return ChunkVerdict(
            is_valid_chunk=True,
            category="other",
            explanation=f"API error: {str(e)[:200]}",
            suggested_fix="",
        )


def collect_unverified(weeks=None, scan_all=False):
    sys.path.insert(0, str(pathlib.Path(__file__).parent))
    from validate_chunks import classify_chunk

    if scan_all:
        weeks = list(range(1, 36))
    elif weeks:
        weeks = [int(w) for w in weeks]
    else:
        weeks = list(range(28, 36))

    pending = []
    for w in weeks:
        for mode in ['weeks', 'weeks_easy']:
            for station in ['read', 'explore']:
                p = f"src/data/{mode}/week_{w:02d}/{station}.js"
                pp = pathlib.Path(p)
                if not pp.exists():
                    continue
                s = pp.read_text()
                m = re.search(r'content_en:\s*(["`])((?:\\.|(?!\1).)*)\1', s, re.DOTALL)
                if not m:
                    continue
                content = m.group(2)
                for chunk in re.findall(r'\*\*([^*]+)\*\*', content):
                    status, _ = classify_chunk(chunk)
                    if status == 'unverified':
                        sentence = get_sentence_context(content, chunk)
                        pending.append({
                            'week': w,
                            'mode': mode,
                            'station': station,
                            'file': p,
                            'chunk': chunk,
                            'sentence': sentence,
                        })
    return pending


def main():
    args = sys.argv[1:]
    apply_fixes = '--apply' in args
    args = [a for a in args if not a.startswith('--')]
    scan_all = '--all' in args

    if scan_all:
        weeks = list(range(1, 36))
    elif args:
        weeks = args
    else:
        weeks = list(range(28, 36))

    print("Collecting UNVERIFIED chunks from Layer 1+2+3...")
    pending = collect_unverified(weeks=weeks, scan_all=scan_all)
    print(f"  {len(pending)} chunks to audit")
    print()

    if not pending:
        print("No unverified chunks. Audit done!")
        return 0

    print("Connecting to Google Gemini...")
    client = make_client()

    # Quick sanity test
    print("Running quick test (1 chunk)...")
    test_v = audit_bold(
        client,
        "I have a story book in my bag for easy reading.",
        "story book in my bag",
    )
    print(f"  Test verdict: valid={test_v.is_valid_chunk}, cat={test_v.category}")
    print(f"  Test explanation: {test_v.explanation}")
    if test_v.suggested_fix:
        print(f"  Test fix: {test_v.suggested_fix}")
    print()

    print(f"Auditing {len(pending)} chunks via Gemini (~4s/req, ~{len(pending)*4//60} min)...")
    verdicts = []
    n_valid = 0
    n_invalid = 0
    n_error = 0
    for i, item in enumerate(pending, 1):
        v = audit_bold(client, item['sentence'], item['chunk'])
        item['verdict'] = v.model_dump()
        verdicts.append(item)
        if 'API error' in v.explanation:
            n_error += 1
            status_str = "ERROR"
        elif v.is_valid_chunk:
            n_valid += 1
            status_str = "VALID"
        else:
            n_invalid += 1
            status_str = "INVALID"
        print(f"  [{i:3d}/{len(pending)}] {status_str:7s} | "
              f"{item['file']}: '{item['chunk']}'")
        if not v.is_valid_chunk and v.suggested_fix and 'API error' not in v.explanation:
            print(f"             -> fix: {v.suggested_fix[:120]}")
        # Rate limit: 15 RPM = 4s/req
        if i < len(pending):
            time.sleep(4.0)

    # Write JSONL
    out_path = pathlib.Path('/tmp/layer4_verdicts.jsonl')
    with out_path.open('w') as f:
        for v in verdicts:
            f.write(json.dumps(v, ensure_ascii=False) + '\n')
    print(f"\nVerdicts written to {out_path}")

    print()
    print(f"=== Summary ===")
    print(f"  VALID:   {n_valid}")
    print(f"  INVALID: {n_invalid}  (false chunks)")
    print(f"  ERROR:   {n_error}")
    print(f"  TOTAL:   {len(verdicts)}")

    if apply_fixes and n_invalid > 0:
        print()
        print("Applying fixes (removing bold from INVALID chunks)...")
        fixes = [v for v in verdicts
                 if v['verdict']['is_valid_chunk'] is False
                 and 'API error' not in v['verdict']['explanation']]
        for item in fixes:
            p = pathlib.Path(item['file'])
            text = p.read_text()
            old = f"**{item['chunk']}**"
            new = item['chunk']
            new_text = text.replace(old, new, 1)
            if new_text != text:
                p.write_text(new_text)
                print(f"  Fixed: {p} -> '{item['chunk']}'")
            else:
                print(f"  WARN: could not find '{old}' in {p}")
        print()
        print("Done. Run 'npm run build' to verify.")

    return 0


if __name__ == '__main__':
    sys.exit(main())
