# Chunk & Collocation Audit — Hybrid Architecture

## Problem
Auditing chunks/collocations in ESL content purely by rule-based
whitelists/blacklists is **fundamentally insufficient**:

1. **Whitelist cứng** (liệt kê cụm): không scale, mỗi bài có thể có
   hàng trăm chunks lạ.
2. **Blacklist cứng** (liệt kê cụm sai): chỉ bắt được một số pattern
   đã thấy trước, miss các lỗi mới.
3. **LLM thuần** (GPT-4o / Claude): không consistent, "bịa" chunks,
   tốn tiền, latency cao.
4. **NLP thuần** (SpaCy POS / dep): chỉ phân tích ngữ pháp, không biết
   cụm nào "thuận tai" native.

## Solution: Hybrid System

```
┌─────────────────────────────────────────────────────────────┐
│ INPUT: bài học mới (text)                                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │ Layer 1: BLACKLIST (cheap, fast)        │
        │  — Catches obvious false chunks         │
        │  — audit_false_chunks.py                │
        └─────────────────────────────────────────┘
                              │ (passes)
                              ▼
        ┌─────────────────────────────────────────┐
        │ Layer 2: PATTERN MATCHER (cheap, fast)  │
        │  — Recognizes structural patterns:      │
        │    * phrasal verb (V + particle)         │
        │    * binomial pair (A and B)             │
        │    * N + N compound                       │
        │    * Adj + N                              │
        │    * V + det + N (collocation)           │
        │    * V + Prep + N (phrasal + object)     │
        │    * V + Adv + Adj (feel very excited)   │
        │    * There is/are/was/were (existence)    │
        │    * functional phrase (When I, What…)   │
        │    * Preposition + N (locative)          │
        │  — validate_chunks.py (pattern logic)   │
        └─────────────────────────────────────────┘
                              │ (still UNVERIFIED)
                              ▼
        ┌─────────────────────────────────────────┐
        │ Layer 3: KB + CORPUS LOOKUP (medium)     │
        │  — Check whitelist collocation dict      │
        │  — Check corpus frequency (COCA / Ngram) │
        │  — Compute MI (Mutual Information) score │
        │  — Block if MI < threshold               │
        └─────────────────────────────────────────┘
                              │ (still UNVERIFIED)
                              ▼
        ┌─────────────────────────────────────────┐
        │ Layer 4: LLM JUDGE (expensive, accurate)│
        │  — Pydantic schema:                      │
        │    { is_natural: bool,                  │
        │      contains_miscollocation: bool,     │
        │      detected_chunks: list[str],        │
        │      explanation: str }                  │
        │  — Prompt: "Câu '{X}'. Cụm '{Y}' có      │
        │    phải chunk/collocations không? Nếu    │
        │    sai, sửa lại."                       │
        │  — Use Guardrails AI / LlamaGuard        │
        └─────────────────────────────────────────┘
                              │ (final verdict)
                              ▼
        ┌─────────────────────────────────────────┐
        │ OUTPUT: { is_natural, valid_chunks,     │
        │          miscollocations, suggestions }  │
        └─────────────────────────────────────────────────────────────┘
```

## Current Implementation (2026-06-03)

| Layer | Status | Tool | Size |
|---|---|---|---|
| 1 - Blacklist | ✅ Implemented | `audit_false_chunks.py` | 10 rules |
| 2 - Pattern | ✅ Implemented | `validate_chunks.py` (classify_chunk 3.1-3.31) | 30+ patterns |
| 3 - KB / Dictionary | ✅ Implemented + self-learning | `validate_chunks.py` + `data/chunks_a1_b1.py` (1098) + `data/extra_collocations.py` (1971 phrasal verbs) + `data/learned_whitelist.json` (auto-grown from Layer 4) | **2783+ chunks** |
| 4 - LLM Judge | ✅ Implemented (batch) | `layer4_gemini_judge.py` (single) + `layer4_batch_audit.py` (full W1-W35, 4.5s/req, 15 RPM) | — |

## How to run

```bash
# Layer 1 + 2 (current default)
python3 production_kit/tools/validate_chunks.py --all

# Show unverified (Layer 3 + 4 candidates)
python3 production_kit/tools/validate_chunks.py --all 2>&1 | grep "UNVERIFIED"

# Future: with LLM Judge
python3 production_kit/tools/validate_chunks.py --all --llm-judge
```

## Known limitations

- 252 bolds in W1-W35 (read.js + explore.js) currently fall
  through Layer 1+2+3 as UNVERIFIED. They need Layer 4 (LLM Judge)
  or human ESL expert review to be properly classified.
- This includes chunks like:
  - `get ready for school` (V + Adj + Prep + N)
  - `ask one question at a time` (V + Det + N + Prep + Det + N)
  - `first of all` (fixed transition — already in whitelist,
    but variant with capital 'F' may be missed)
  - `best day ever` (Adj + N + Adv — superlative construction)
  - `big brown eyes` (Adj + Adj + N — double modifier)
  - `very kind and patient` (Adv + Adj + and + Adj)
  - `so proud of my work` (Adv + Adj + Prep + Det + N)
  - `story book in my bag` (V + Det + N + Prep + Det + N)
- These are mostly VALID chunks, but the rule-based system
  cannot prove they are collocations without an LLM Judge
  (Layer 4) that can read the surrounding context.
- Recommend LLM Judge pass for all UNVERIFIED chunks before
  shipping content to students.

## Recommended next steps

1. **Install `anthropic` SDK** + add `ANTHROPIC_API_KEY` env var.
2. **Wire Layer 4 LLM Judge** in `validate_chunks.py`:
   ```python
   def llm_judge(chunk, sentence):
       # Use Pydantic schema
       from pydantic import BaseModel
       class ChunkVerdict(BaseModel):
           is_collocation: bool
           explanation: str
           suggestion: str | None
       # Call Claude API
       import anthropic
       client = anthropic.Anthropic()
       msg = client.messages.create(
           model="claude-sonnet-4-6",
           max_tokens=200,
           messages=[{
               "role": "user",
               "content": f"Chunk: '{chunk}' in sentence: '{sentence}'. Is this a valid ESL chunk/collocation for A1-B1? If not, suggest fix."
           }],
           tools=[{"name": "verdict", "input_schema": ChunkVerdict.model_json_schema()}],
       )
   ```
3. **Add LanguageTool** (open-source) for spell-check layer.
4. **CI/CD**: pre-commit hook + GitHub Action that runs all
   4 layers on PR.
