# RUNTIME DEPENDENCY GRAPH — Blueprint → Runtime → Agent → Production

> **Version:** 1.0 — 2026-07-14
> **Status:** FROZEN

---

## 0. Notation

```
═══ read dependency (information flows down)
─── execution dependency (process flows down)
══════════════════════════════════════════════════════════
```

**Key distinction:**
- **Read dependency** (═══): A reads from B. B's content informs A's decisions. B may change; A adapts.
- **Execution dependency** (───): A executes B. B's output is consumed. B must complete before A starts.

---

## 1. Complete Dependency Graph

```
Blueprint V5
║═════════════════════════════════════════════════════════════╗
║   read dependency                                          ║
╠═════════════════════════════════════════════════════════════╣
║                                                             ║
╠── RUNTIME INDEX ────────────────────────────────────────────╣
║       │                                                     ║
║       ├── CORE RUNTIME ═════════════════════════════════════╣
║       │       ║ read: PRODUCTION_NEVER_RULES.md             ║
║       │       ║ read: REPOSITORY_MAP.md                     ║
║       │       ║═════════════════════════════════════════════╣
║       │       ║   ↓ informs paths, files, exports           ║
║       │       ║═════════════════════════════════════════════╣
║       │       │                                             ║
║       │       ├═══ PRODUCTION RUNTIME ══════════════════════╣
║       │       │   ║ read: CORE (paths/files)                ║
║       │       │   ║ read: Blueprint (week plan)             ║
║       │       │   ║═════════════════════════════════════════╣
║       │       │   ║                                         ║
║       │       │   ├── Week Builder Skill (SKILL.md)         ║
║       │       │   │   │                                     ║
║       │       │   │   ├── BƯỚC -1: Preflight ──► CHECK 1-6 ║
║       │       │   │   ├── BƯỚC 0: Clone ────────► W36 data ║
║       │       │   │   ├── BƯỚC 1-2: Videos ─────► MEDIA    ║
║       │       │   │   ├── BƯỚC 3-4: Content ────► LANGUAGE  ║
║       │       │   │   ├── BƯỚC 5: Validate ─────► VALIDATE  ║
║       │       │   │   ├── BƯỚC 6-8: Media ──────► MEDIA     ║
║       │       │   │   ├── BƯỚC 9-10: Build/Test  (manual)  ║
║       │       │   │   └── BƯỚC 11: Commit        (git)     ║
║       │       │   │                                         ║
║       │       │   ├── Checkpoint System (CP0-CP9)           ║
║       │       │   └── Error Recovery (3-cycle max)          ║
║       │       │                                             ║
║       │       ├═══ LANGUAGE RUNTIME ════════════════════════╣
║       │       │   ║ read: CORE (paths)                      ║
║       │       │   ║ read: Blueprint §VII.b (chunk rules)    ║
║       │       │   ║═════════════════════════════════════════╣
║       │       │   ║                                         ║
║       │       │   ├── vocab.js ─────────────────────────────╣
║       │       │   │   ├── word_match (reads vocab.js)       ║
║       │       │   │   ├── word_power (from vocab phrases)   ║
║       │       │   │   ├── ask_ai (target_vocab subset)      ║
║       │       │   │   ├── AI Tutor (target_vocab subset)    ║
║       │       │   │   └── shadowing_ipa (per-word IPA)      ║
║       │       │   │                                         ║
║       │       │   ├── read.js ══════════════════════════════╣
║       │       │   │   ├── dictation (verbatim content_en)   ║
║       │       │   │   ├── shadowing (verbatim content_en)   ║
║       │       │   │   ├── explore (similar topic)           ║
║       │       │   │   └── AI Tutor (chunk_focus)            ║
║       │       │   │                                         ║
║       │       │   ├── grammar.js ═══════════════════════════╣
║       │       │   │   └── AI Tutor (grammar_focus)          ║
║       │       │   │                                         ║
║       │       │   └── writing.js (picture_mode.image_prompt)║
║       │       │                                             ║
║       │       ├═══ MEDIA RUNTIME ═══════════════════════════╣
║       │       │   ║ read: CORE (paths)                      ║
║       │       │   ║ read: SECURITY (API keys)               ║
║       │       │   ║═════════════════════════════════════════╣
║       │       │   ║                                         ║
║       │       │   ├── Image Pipeline ───────────────────────╣
║       │       │   │   ├── write prompts (Agent) ────────────╣
║       │       │   │   ├── human creates images (external) ──╣
║       │       │   │   └── orchestrator uploads to R2        ║
║       │       │   │                                         ║
║       │       │   ├── Audio Pipeline ───────────────────────╣
║       │       │   │   ├── text-hash change detector         ║
║       │       │   │   ├── Deepgram Worker (on-demand)       ║
║       │       │   │   └── R2 cache                          ║
║       │       │   │                                         ║
║       │       │   ├── Video Pipeline ───────────────────────╣
║       │       │   │   ├── YouTube Data API search           ║
║       │       │   │   ├── 60-channel whitelist ranking     ║
║       │       │   │   └── thumbnail validation (HTTP 200)   ║
║       │       │   │                                         ║
║       │       │   └── Shadowing Transcript Pipeline ────────╣
║       │       │       ├── Stage 1: fetch (ASR)              ║
║       │       │       ├── Stage 2: clean (regex + curated)  ║
║       │       │       └── Stage 3: split (per-video JSON)   ║
║       │       │                                             ║
║       │       ├═══ REPAIR RUNTIME ══════════════════════════╣
║       │       │   ║ read: CORE (paths)                      ║
║       │       │   ║ read: LANGUAGE (station schemas)        ║
║       │       │   ║ read: MEDIA (transcript pipeline)       ║
║       │       │   ║═════════════════════════════════════════╣
║       │       │   ║                                         ║
║       │       │   └── Shadowing Repair (W1-W35 only)       ║
║       │       │       ├── transcript repair                 ║
║       │       │       ├── IPA repair                        ║
║       │       │       └── timing validation                 ║
║       │       │                                             ║
║       │       ├═══ SECURITY RUNTIME ════════════════════════╣
║       │       │   ║ read: .env files                        ║
║       │       │   ║═════════════════════════════════════════╣
║       │       │   ║                                         ║
║       │       │   └── credentials for:                      ║
║       │       │       ├── Deepgram API                      ║
║       │       │       ├── R2 (audio + images)               ║
║       │       │       ├── YouTube Data API                  ║
║       │       │       ├── LLM providers                     ║
║       │       │       └── Cloudflare Workers                ║
║       │       │                                             ║
║       │       ├═══ VALIDATION RUNTIME ══════════════════════╣
║       │       │   ║ read: CORE (paths)                      ║
║       │       │   ║ read: LANGUAGE (schemas)                ║
║       │       │   ║═════════════════════════════════════════╣
║       │       │   ║                                         ║
║       │       │   └── 7 validators (80+ checks)            ║
║       │       │       ├── preflight_check (6 checks)        ║
║       │       │       ├── bug_prevention (13 patterns)      ║
║       │       │       ├── code_quality_gate (48+ checks)    ║
║       │       │       ├── sgmath_types (5 valid types)      ║
║       │       │       ├── validate_barmodels                ║
║       │       │       ├── validate_video_thumbnails         ║
║       │       │       ├── content_lint                      ║
║       │       │       └── dict_lint                         ║
║       │       │                                             ║
║       │       └═══ EVOLUTION RUNTIME ═══════════════════════╣
║       │               ║ read: Blueprint V5 (changes)        ║
║       │               ║═════════════════════════════════════╣
║       │               ║                                     ║
║       │               └── triggers:                          ║
║       │                   ├── Blueprint → Runtime update    ║
║       │                   ├── Schema migration              ║
║       │                   ├── Version bumping               ║
║       │                   └── New Runtime creation          ║
║       │                                                     ║
║       └── AGENT LAYER ═════════════════════════════════════╣
║               ║ read: Runtimes + Specs                      ║
║               ║═════════════════════════════════════════════╣
║               ║                                             ║
║               ├── content-writer (Sonnet) ──────────────────╣
║               │   └── produces: week data files             ║
║               │                                             ║
║               ├── quality-reviewer (Sonnet) ────────────────╣
║               │   └── runs: validators                      ║
║               │                                             ║
║               └── code-debugger (Opus) ─────────────────────╣
║                       └── fixes: runtime bugs               ║
║                                                             ║
╚═════════════════════════════════════════════════════════════╝
```

---

## 2. Read Dependency Summary

| A reads from | Direction | Impact |
|---|---|---|
| Blueprint → PRODUCTION | Blueprint informs week topic/grammar | Weekly |
| Blueprint → LANGUAGE | Blueprint defines station schema | Per Blueprint version |
| CORE → all Runtimes | CORE defines paths, files, exports | Once per Runtime |
| LANGUAGE → MEDIA | Language defines what media is needed | Per week |
| LANGUAGE → VALIDATION | Language defines what to validate | Per week |
| SECURITY → MEDIA | Security provides API keys for media gen | Permanent |
| REPAIR → LANGUAGE | Repair validates against station schemas | Per repair batch |

---

## 3. Execution Dependency Summary

| A executes B | Direction | Must complete before A |
|---|---|---|
| PRODUCTION → BƯỚC -1 | Preflight runs first | Everything |
| PRODUCTION → BƯỚC 0 | Clone before content | BƯỚC 4 |
| PRODUCTION → BƯỚC 5 | Validate before commit | BƯỚC 11 |
| VALIDATION → code_quality_gate | Gate runs | commit |
| MEDIA → image_pipeline | Images generated | R2 upload |
| MEDIA → audio_pipeline | Audio on-demand | first user play |
| REPAIR → transcript cleanup | Clean before split | split |

---

## 4. Circular Dependencies (NONE ALLOWED)

The Runtime Architecture must have no circular dependencies:
- If A depends on B, B must not depend on A (read or execution).
- EVOLUTION may *trigger* changes in other Runtimes, but does not depend on their output.

**Known near-circular dependency:**
- LANGUAGE defines station schemas → VALIDATION validates against them → VALIDATION passes/fails → LANGUAGE changes to pass. **Resolution:** This is a feedback loop, not a circular dependency. Runtime Architect mediates.

---

## 5. Runtime Versioning

Each Runtime has a version number. Version bumps propagate upward:

```
CORE 1.0 (frozen 2026-07-14)
  │
  ├── PRODUCTION 1.0 (frozen 2026-07-14)
  │   ├── LANGUAGE 1.0 (frozen 2026-07-14)
  │   ├── MEDIA 1.0 (frozen 2026-07-14)
  │   ├── VALIDATION 1.0 (frozen 2026-07-14)
  │   └── REPAIR 1.0 (frozen 2026-07-14)
  ├── SECURITY 1.0 (frozen 2026-07-14)
  └── EVOLUTION 1.0 (frozen 2026-07-14)
```

When any Runtime version bumps, downstream Runtimes are notified (see RUNTIME_GOVERNANCE.md §4).

---

*Version: 1.0 — Frozen 2026-07-14*
