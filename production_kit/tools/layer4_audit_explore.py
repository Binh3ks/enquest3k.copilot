#!/usr/bin/env python3
"""
Re-bold explore.js for W10-W35 using Gemini Layer 4.

Many explore.js files were over-stripped during earlier auto-fix
rounds. This script:
1. Reads each explore.js content_en
2. Calls Gemini to suggest which chunks should be bolded
3. Applies the bolds

Rate limit: 4.5s/req (Gemini free tier 15 RPM).
"""
import os
import re
import sys
import json
import time
import pathlib

from pydantic import BaseModel, Field
from google import genai
from google.genai import types


class ReBoldPlan(BaseModel):
    bold_chunks: list[str] = Field(
        description=(
            "List of 5-10 multi-word chunks/collocations from the sentence "
            "that should be bolded because they are real ESL collocations "
            "(verb+object, adj+noun, phrasal verb, fixed expression, etc.). "
            "Use the exact text from the sentence."
        )
    )
    rationale: str = Field(description="One-sentence reason.")


def make_client():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        sys.exit("ERROR: GEMINI_API_KEY not set")
    return genai.Client(api_key=api_key)


def get_content_en(p):
    s = pathlib.Path(p).read_text()
    m = re.search(r'content_en:\s*(["`])((?:\\.|(?!\1).)*)\1', s, re.DOTALL)
    if not m:
        return None, s
    return m.group(2), s


def already_bolded(content):
    return re.findall(r'\*\*([^*]+)\*\*', content)


def apply_bolds(text, bolds):
    for chunk in bolds:
        chunk_esc = re.escape(chunk)
        # Replace ONLY if not already bolded
        if f'**{chunk}**' in text:
            continue
        # Use word-boundary-ish: just do plain replace with cap on count
        new_text, n = re.subn(r'(?<!\*\*)' + chunk_esc + r'(?!\*\*)',
                             f'**{chunk}**', text, count=1)
        if n > 0:
            text = new_text
    return text


def collect_explore_files(weeks=None):
    if not weeks:
        weeks = list(range(10, 36))
    files = []
    for w in weeks:
        for mode in ['weeks', 'weeks_easy']:
            p = f"src/data/{mode}/week_{w:02d}/explore.js"
            pp = pathlib.Path(p)
            if pp.exists():
                files.append(pp)
    return files


def main():
    weeks = sys.argv[1:]
    if weeks:
        weeks = [int(w) for w in weeks]
    else:
        weeks = list(range(10, 36))

    files = collect_explore_files(weeks)
    print(f"Processing {len(files)} explore.js files (W{weeks[0]}-W{weeks[-1]})")
    print()

    client = make_client()

    summary = []
    for i, p in enumerate(files, 1):
        rel = p.relative_to(pathlib.Path.cwd()) if pathlib.Path.cwd() in p.parents else p
        content, full_text = get_content_en(str(p))
        if not content:
            continue
        existing = set(already_bolded(content))
        if len(existing) >= 5:
            print(f"  [{i:2d}/{len(files)}] SKIP (already {len(existing)} bolds): {rel}")
            continue
        t0 = time.time()
        try:
            resp = client.models.generate_content(
                model="gemini-flash-latest",
                contents=(
                    f"Passage: \"{content[:2000]}\"\n\n"
                    f"List 5-10 multi-word chunks/collocations from this passage that should be "
                    f"bolded (they are real ESL chunks like verb+object, adj+noun, phrasal verb, "
                    f"or fixed expression). Output the EXACT text from the passage."
                ),
                config=types.GenerateContentConfig(
                    system_instruction=(
                        "You are an ESL expert. Return the exact text of the most "
                        "useful collocations to bold in the given passage."
                    ),
                    response_mime_type="application/json",
                    response_schema=ReBoldPlan,
                    temperature=0.0,
                ),
            )
            plan = ReBoldPlan.model_validate_json(resp.text)
            bolds = [b for b in plan.bold_chunks if b.strip() and b not in existing]
        except Exception as e:
            print(f"  [{i:2d}/{len(files)}] ERROR: {rel} - {e}")
            continue

        # Apply bolds
        if bolds:
            new_content = apply_bolds(content, bolds)
            if new_content != content:
                # Replace content_en in full file
                new_full = full_text.replace(content, new_content, 1)
                p.write_text(new_full)
                print(f"  [{i:2d}/{len(files)}] ADDED {len(bolds):2d} bolds: {rel}")
            else:
                print(f"  [{i:2d}/{len(files)}] NO-OP: {rel}")
        else:
            print(f"  [{i:2d}/{len(files)}] EMPTY: {rel}")

        summary.append({'file': str(rel), 'added': bolds})

        elapsed = time.time() - t0
        if i < len(files):
            time.sleep(max(4.5 - elapsed, 0.1))

    out = pathlib.Path('/tmp/explore_rebolds.jsonl')
    out.write_text('\n'.join(json.dumps(s, ensure_ascii=False) for s in summary))
    print(f"\nSummary written to {out}")
    return 0


if __name__ == '__main__':
    sys.exit(main())
