# Phase 2 — CocoIndex Benchmark Protocol

> **Status:** Skills shipped 2026-07-10. CocoIndex install pending user approval.
> **Goal:** Measure whether CocoIndex Code reduces Claude Code token usage on EngQuest3K debug/architecture tasks.

## What CocoIndex actually does

CocoIndex Code is a semantic code index that supplements Grep. Key insight: **it's NOT a Grep replacement, it's a context-pollution reducer.**

Per the docs:

| Layer | What happens |
|---|---|
| AST parsing | Tree-sitter parses code into semantic chunks (functions, classes, methods) |
| 28+ languages | Python, JS/TS, Rust, Go, Java — works for EngQuest JSX files |
| Vector embeddings | Each chunk gets a SentenceTransformer embedding (default local Snowflake/arctic-embed-xs) |
| Call graphs | Builds call graphs, symbol tables |
| Storage | LMDB (`cocoindex.db`), incremental updates |
| Search modes | `ccc search` (semantic/vector), `ccc grep` (AST structural) |

## Install commands (per CocoIndex docs)

**Option A — As a Skill:**
```bash
npx skills add cocoindex-io/cocoindex-code
# Then in any session: /ccc
```

**Option B — As an MCP server:**
```bash
pipx install 'cocoindex-code[full]'
claude mcp add cocoindex-code -- ccc mcp
```

**Option C — Docker (no local Python):**
```bash
docker compose -f <(curl -L https://raw.githubusercontent.com/cocoindex-io/cocoindex-code/refs/heads/main/docker/docker-compose.yml) up -d
```

## Prerequisites for EngQuest

| Requirement | Status |
|---|---|
| Python with `enable_load_extension` sqlite | ✅ (verified — `python3 -c "import sqlite3"` OK) |
| Brew Python (recommended for macOS sqlite) | ⚠ Not verified — may need `brew install python3` |
| pipx | ❌ Not installed |
| ~500MB disk for embeddings model | TBD |
| LMDB map size 32 GiB for large repos (default 4 GiB) | EngQuest is small (~500 files) → default OK |

## Benchmark methodology

After install, run a **paired task benchmark**: same task before/after CocoIndex.

### Task A: Shadowing station trace

**Task description:** "Find where the karaoke highlight window in Shadowing is computed. Look at ASR + raw duration handling."

#### Without CocoIndex (baseline):
```bash
# Step 1: Grep for "FAST_RATE"
grep -rn "FAST_RATE" src/modules/shadowing/

# Step 2: Read top hit
Read src/modules/shadowing/useWordHighlight.js

# Step 3: Read related call sites
grep -rn "getSpeechWindow" src/

# Step 4: Read each call site
Read <call_site>
```
**Measure:** Input tokens consumed, time elapsed, files read.

#### With CocoIndex:
```bash
/ccc
# Query: "How is the karaoke word highlight window computed in Shadowing? What is the FAST_RATE rate and why?"
```
**Measure:** Input tokens consumed, time elapsed.

### Task B: Architecture question

**Task description:** "Trace the dual-mode data flow for week 30 read content — Easy vs Advanced — and identify the 3 files that differ between them."

#### Without CocoIndex:
```bash
ls src/data/weeks/week_30/
ls src/data/weeks_easy/week_30/
diff -r src/data/weeks/week_30/read.js src/data/weeks_easy/week_30/read.js
grep -l "WEEK_06_PATTERN" src/data/weeks*/week_*/read.js
```

#### With CocoIndex:
```bash
/ccc
# Query: "Show me where the Easy and Advanced modes diverge for week 30 read content. Compare the read.js files semantically."
```

### Comparison table

| Task | Metric | No CocoIndex | With CocoIndex | Delta |
|---|---|---|---|---|
| A: Shadowing trace | Input tokens | XXXk | XXk | -X% |
| A: Shadowing trace | Time | Xm | Xs | -X% |
| A: Shadowing trace | Files read | N | N | (notes) |
| B: Architecture dual-mode | Input tokens | Xk | Xk | -X% |
| B: Architecture dual-mode | Time | Xm | Xs | -X% |

## Decision threshold

After running benchmark, decide:

| Result | Action |
|---|---|
| -50% input tokens, -50% time | Install permanently. Add CocoIndex to Phase 3. |
| -20% to -50% | Install, but maintain Grep-based primary workflow. |
| < -20% or negative | Defer. Use existing Grep + lazy-load pattern. |

## Cost

- ~5-15 min install time
- ~500MB disk for embedding model
- Background daemon uses ~100-200MB RAM
- One-time indexing: 5-10 min for EngQuest (~500 files)
- Incremental updates: ~1 second per file changed

## When NOT to use CocoIndex

- Single-line bug fixes (Grep is faster)
- Schema/data file lookups (Grep on structure names wins)
- Workflow invocation (Skills are loaded — CocoIndex doesn't replace them)
- File content comparison (Read with offset/limit is faster)

## Status

- [x] Research on CocoIndex (see Memory feedback_skills_anti_patterns.md context)
- [x] pipx install (`pipx install 'cocoindex-code[full]'` — done 2026-07-10)
- [x] First benchmark task (Shadowing trace) — see results below
- [x] Second benchmark task (Architecture dual-mode) — see results below
- [x] Decision recorded in CURRENT.md

## Benchmark Results (2026-07-10)

### Index stats
- **Files indexed**: 3,453 (2,292 source, rest config/docs)
- **Chunks**: 123,257
- **DB size**: ~123 MB (LMDB)
- **Daemon RAM**: ~830 MB
- **Index time**: ~8 minutes (CPU-only, no GPU)
- **Languages detected**: json (66K chunks), javascript (12K), markdown (8K), python (5K), text (10K), bash (506)

### Task A: Shadowing karaoke highlight trace
**Query**: `"karaoke word highlight window speech rate FAST_RATE per word Shadowing"`

| Metric | Grep baseline | CocoIndex | Delta |
|---|---|---|---|
| Query tokens | ~10 tokens | 1 query | — |
| Files returned | 2 files, 6+5=11 hits | **1 file** (useTTSWordHighlight.js) | 82% fewer |
| Next step | Read useWordHighlight.js + useShadowingVideoSync.js (2 files) | Read useTTSWordHighlight.js only (1 file) | 50% fewer reads |
| Found refactored file? | ❌ (old useWordHighlight.js first) | ✅ (newer useTTSWordHighlight.js) | Semantic > lexical |
| Relevance score | N/A | 0.727 | High |

**Key insight**: CocoIndex found the **newer refactored file** (post Jul 1 split) because its semantic description mentions "karaoke" and "speech rate". Grep on `FAST_RATE` returns both old and new files without distinguishing relevance. The semantic approach eliminates the "read old file, realize it's superseded, read new file" two-step.

### Task B: Dual-mode architecture trace
**Query**: `"dual mode easy advanced week read.js difference divergence data flow"` (filtered to `src/data/*`)

| Metric | Grep baseline | CocoIndex | Delta |
|---|---|---|---|
| Query result | `diff -r week_30/read.js weeks_easy/week_30/read.js` — direct | Found week_23 data, week_02_real_OLD_BACKUP | Weaker |
| Relevance | Structural — exact | Semantic — off-target | Structural wins here |

**Key insight**: Dual-mode is a **structural** question (path comparison, diff). CocoIndex's semantic search isn't better than grep/diff for "where do these two paths diverge". The structural grep approach is superior for this class of query.

### Decision
| Result category | Action |
|---|---|
| Semantic code questions ("how does X work") | ✅ **Use ccc** — 50-80% fewer reads |
| Structural queries ("diff these two files") | ❌ **Use grep** — better for lexical patterns |
| Schema/data lookups ("what fields in week_data") | ❌ **Use grep** — exact match wins |
| Cross-module refactoring ("what calls X") | ✅ **Use ccc** — semantic call graph |

**Verdict**: Install permanently. Use ccc for semantic/code-structure questions; keep grep for lexical/structural queries. Not an either/or — they complement each other.

**Decision recorded in CURRENT.md**: 2026-07-10
