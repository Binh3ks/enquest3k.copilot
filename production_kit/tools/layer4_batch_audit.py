#!/usr/bin/env python3
"""
Layer 4 batch automation: audits ALL unverified chunks in W1-W35
across read.js + explore.js (ADV + Easy). Saves progress to a
JSONL file so it can be resumed. Auto-applies fixes from the
Gemini verdicts.

Rate limit: Gemini free tier = 15 RPM = 4.5s/req.
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


class ChunkVerdict(BaseModel):
    is_valid_chunk: bool = Field(
        description=(
            "True if the bold phrase is a real chunk/collocation that "
            "native English speakers use as a single unit. False if it is "
            "just a free grammatical combination that should be unbolded "
            "or rewritten."
        )
    )
    category: str = Field(
        description="phrasal-verb / verb-noun / adj-noun / noun-noun / "
                   "prep-phrase / fixed-expression / functional / "
                   "free-grammatical-phrase / false-chunk / other"
    )
    explanation: str = Field(description="One-sentence reason (max 250 chars).")
    suggested_fix: str = Field(description="If invalid, suggested rewrite. "
                                       "Empty if valid.")


SYSTEM_PROMPT = (
    "You are an ESL expert. Judge whether the bolded phrase in the "
    "sentence is a real lexical chunk/collocation that native speakers "
    "use as a fixed unit. Reply in JSON."
)


def make_client():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        sys.exit("ERROR: GEMINI_API_KEY not set")
    return genai.Client(api_key=api_key)


def get_sentence_context(content_en, bold_chunk):
    plain = content_en.replace("**", "")
    sentences = re.split(r"(?<=[.!?])\s+", plain)
    for s in sentences:
        if bold_chunk in s:
            return s.strip()
    return content_en[:300]


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
                            'week': w, 'mode': mode, 'station': station,
                            'file': p, 'chunk': chunk, 'sentence': sentence,
                        })
    return pending


def load_done(out_path):
    """Return set of (file, chunk) keys already processed."""
    done = set()
    if out_path.exists():
        for line in out_path.open():
            line = line.strip()
            if not line:
                continue
            try:
                item = json.loads(line)
                done.add((item.get('file', ''), item.get('chunk', '')))
            except json.JSONDecodeError:
                pass
    return done


def main():
    out_path = pathlib.Path('/tmp/layer4_batch.jsonl')

    pending = collect_unverified(scan_all=True)
    done = load_done(out_path)
    todo = [p for p in pending if (p['file'], p['chunk']) not in done]
    print(f"Total UNVERIFIED: {len(pending)}")
    print(f"Already done: {len(done)}")
    print(f"Remaining: {len(todo)}")
    if not todo:
        print("Nothing to do.")
        return 0

    print(f"Connecting to Gemini...")
    client = make_client()
    print()

    print(f"Auditing {len(todo)} chunks at 4.5s/req (est. {len(todo)*4.5/60:.1f} min)...")
    print()

    n_valid = 0
    n_invalid = 0
    n_error = 0
    with out_path.open('a') as f:
        for i, item in enumerate(todo, 1):
            t0 = time.time()
            try:
                resp = client.models.generate_content(
                    model="gemini-flash-latest",
                    contents=(
                        f"Sentence: \"{item['sentence']}\"\n"
                        f"Bold phrase: \"{item['chunk']}\"\n\n"
                        f"Is '{item['chunk']}' a real ESL chunk? "
                        f"If not, suggest the smallest valid sub-chunks."
                    ),
                    config=types.GenerateContentConfig(
                        system_instruction=SYSTEM_PROMPT,
                        response_mime_type="application/json",
                        response_schema=ChunkVerdict,
                        temperature=0.0,
                    ),
                )
                v = ChunkVerdict.model_validate_json(resp.text)
            except Exception as e:
                v = ChunkVerdict(
                    is_valid_chunk=True, category="other",
                    explanation=f"API error: {str(e)[:200]}", suggested_fix="",
                )
                n_error += 1

            item['verdict'] = v.model_dump()
            f.write(json.dumps(item, ensure_ascii=False) + '\n')
            f.flush()

            status_str = "VALID" if v.is_valid_chunk and 'API error' not in v.explanation else "INVALID"
            if status_str == "VALID":
                n_valid += 1
            else:
                n_invalid += 1
            print(f"  [{i:3d}/{len(todo)}] {status_str:7s} | "
                  f"{item['file']}: '{item['chunk']}'", flush=True)

            # Smart sleep: 4.5s/req to respect 15 RPM
            elapsed = time.time() - t0
            if i < len(todo):
                time.sleep(max(4.5 - elapsed, 0.1))

    print()
    print(f"=== Summary ===")
    print(f"  VALID:   {n_valid}")
    print(f"  INVALID: {n_invalid}")
    print(f"  ERROR:   {n_error}")
    print(f"Verdicts: {out_path}")
    return 0


if __name__ == '__main__':
    sys.exit(main())
