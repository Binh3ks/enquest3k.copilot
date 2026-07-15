#!/usr/bin/env python3
"""
Layer 4: LLM Judge using Cerebras Inference (OpenAI-compatible).

For every UNVERIFIED chunk from Layer 1+2+3, call Cerebras LLM
with Pydantic schema (via instructor) to decide whether the
chunk is a valid ESL collocation for A1-B1, or a false chunk
that should be unbolded / rephrased.

Usage:
    export CEREBRAS_API_KEY="csk-..."
    python3 layer4_llm_judge.py --all
    python3 layer4_llm_judge.py 5
    python3 layer4_llm_judge.py --all --apply   # also strip false-chunk bolds

Output JSONL to stdout.
"""
import os
import re
import sys
import json
import time
import pathlib
from typing import Literal

from pydantic import BaseModel, Field
import instructor
from openai import OpenAI


class ChunkVerdict(BaseModel):
    is_valid_chunk: bool = Field(
        description=(
            "True if the bold phrase is a real chunk/collocation that native "
            "English speakers use as a single unit. False if it is just a "
            "free grammatical combination that should be unbolded or rewritten."
        )
    )
    category: Literal[
        "phrasal-verb", "verb-noun", "adj-noun", "noun-noun",
        "prep-phrase", "fixed-expression", "functional",
        "free-grammatical-phrase", "false-chunk", "other",
    ] = Field(
        description=(
            "What category does this bold phrase fall into?"
        )
    )
    explanation: str = Field(
        description="One-sentence reason in English. Max 200 chars."
    )
    suggested_fix: str = Field(
        description=(
            "If invalid, suggest how to rewrite or which sub-chunks to keep. "
            "Empty string if valid."
        )
    )


# System prompt — keep it short
SYSTEM_PROMPT = (
    "You are an ESL expert. Judge whether the bolded phrase in the "
    "sentence is a real lexical chunk/collocation that native speakers use "
    "as a fixed unit. Return JSON."
)


def make_client():
    api_key = os.environ.get("CEREBRAS_API_KEY")
    if not api_key:
        sys.exit(
            "ERROR: CEREBRAS_API_KEY env var not set.\n"
            "  Get a free key: https://cloud.cerebras.ai/\n"
            "  Free tier: 1M tokens/day, ~30 RPM."
        )
    return instructor.from_openai(
        OpenAI(
            base_url="https://api.cerebras.ai/v1",
            api_key=api_key,
        )
    )


def get_sentence_containing(content_en, bold_chunk):
    """Find the sentence in content_en that contains the bold phrase."""
    plain = content_en.replace("**", "")
    # Split on sentence-end punctuation
    sentences = re.split(r"(?<=[.!?])\s+", plain)
    for s in sentences:
        # Strip bold markers for matching
        test = s
        if bold_chunk in test:
            return s.strip()
    # Fallback: return first 200 chars
    return content_en[:300]


def audit_bold(client, sentence, bold_phrase, model="gpt-oss-120b"):
    """Send a chunk to Cerebras for verdict."""
    user_prompt = (
        f"Sentence: \"{sentence}\"\n"
        f"Bold phrase: \"{bold_phrase}\"\n\n"
        f"Is '{bold_phrase}' a real ESL chunk/collocation? "
        f"Native speakers should use it as a single unit. "
        f"If not, suggest the smallest valid sub-chunks to keep bolded."
    )
    try:
        resp = client.chat.completions.create(
            model=model,
            response_model=ChunkVerdict,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.0,
        )
        return resp
    except Exception as e:
        return ChunkVerdict(
            is_valid_chunk=True,
            category="other",
            explanation=f"LLM error: {str(e)[:200]}",
            suggested_fix="",
        )


def collect_unverified(weeks=None, scan_all=False):
    """Run Layer 1+2+3, return unverified chunks with sentence context."""
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
                        sentence = get_sentence_containing(content, chunk)
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

    print("Connecting to Cerebras Inference...")
    client = make_client()

    print("Sending to LLM Judge (sequential, ~1 req/sec to respect rate limits)...")
    print()

    verdicts = []
    for i, item in enumerate(pending, 1):
        v = audit_bold(client, item['sentence'], item['chunk'])
        item['verdict'] = v.model_dump()
        verdicts.append(item)
        status_str = "VALID" if v.is_valid_chunk else "INVALID"
        print(f"  [{i:3d}/{len(pending)}] {status_str:7s} | "
              f"{item['file']}: '{item['chunk']}'")
        if not v.is_valid_chunk and v.suggested_fix:
            print(f"             -> fix: {v.suggested_fix}")
        time.sleep(0.5)  # respect Cerebras RPM

    # Output JSONL
    print()
    print("=== JSONL output ===")
    for v in verdicts:
        print(json.dumps(v, ensure_ascii=False))

    # Summary
    n_valid = sum(1 for v in verdicts if v['verdict']['is_valid_chunk'])
    n_invalid = len(verdicts) - n_valid
    print()
    print(f"=== Summary ===")
    print(f"  VALID:   {n_valid}")
    print(f"  INVALID: {n_invalid}  (false chunks)")
    print(f"  TOTAL:   {len(verdicts)}")

    if apply_fixes and n_invalid > 0:
        print()
        print("Applying fixes (removing bold from INVALID chunks)...")
        fixes = [v for v in verdicts if not v['verdict']['is_valid_chunk']]
        for item in fixes:
            p = pathlib.Path(item['file'])
            text = p.read_text()
            old = f"**{item['chunk']}**"
            new = item['chunk']
            new_text = text.replace(old, new, 1)
            if new_text != text:
                p.write_text(new_text)
                print(f"  Fixed: {p} -> removed bold from '{item['chunk']}'")
            else:
                print(f"  WARN: could not find '{old}' in {p}")
        print()
        print("Done. Run 'npm run build' to verify.")

    return 0


if __name__ == '__main__':
    sys.exit(main())
