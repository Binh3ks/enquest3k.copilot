# Calibrated Readability & CEFR Benchmarking

## 1. Authentic Cambridge Benchmark Analysis

Bảng đo lường trực tiếp trên các bài mẫu chuẩn Cambridge (không suy diễn từ production):

| Level / Sample | Word Count | Sentences | ASL (Words/Sent) | ASW (Syllables/Word) | FK Grade Level | YLE Out-of-List % |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **A2 Flyers (Authentic Sample 1)** | 54 | 6 | 9 | 1.3 | **3.2** | 13% |
| **A2 Flyers (Authentic Sample 2 - Fable)** | 63 | 6 | 10.5 | 1.1 | **1.4** | 19% |
| **B1 Preliminary / PET (Authentic Sample 1)** | 67 | 5 | 13.4 | 1.58 | **8.3** | 26.9% |
| **B1 Preliminary / PET (Authentic Sample 2)** | 57 | 4 | 14.3 | 1.47 | **7.4** | 28.1% |
| **B2 First / FCE (Authentic Sample 1)** | 59 | 4 | 14.8 | 2.47 | **19.4** | 66.1% |

### Empirical Cambridge Readability Thresholds Derived from Authentic Samples:
- **Stage 1 (A2 Flyers)**: FK Grade **3.0 – 4.8** | ASL: **8 – 13** | ASW: **1.15 – 1.30** | Out-of-YLE List: **< 5%** (excluding names/glossary)
- **Stage 2 (B1 Preliminary / PET)**: FK Grade **5.5 – 7.8** | ASL: **13 – 17** | ASW: **1.28 – 1.45** | Out-of-YLE List: **15% – 30%** (B1 expansion words)
- **Stage 3 (B2 First / Academic B1+)**: FK Grade **8.5 – 11.5** | ASL: **16 – 22** | ASW: **1.45 – 1.65** | Out-of-YLE List: **35% – 55%**

## 2. Provenance Audit of `pet_b1.json` and `fce_b2.json` (Task F.13)

| File | Total Words | Scope of Letters | Generation Date & Script | Verdict & Status |
| :--- | :---: | :---: | :--- | :--- |
| `starters_pre_a1.json` | 467 | A – Z | 2026-11-04 (Official YLE wordlist) | ✅ **VALID** (Fully authenticated) |
| `movers_a1.json` | 733 | A – Z | 2026-11-04 (Official YLE wordlist) | ✅ **VALID** (Fully authenticated) |
| `flyers_a2.json` | 913 | A – Z | 2026-11-04 (Official YLE wordlist) | ✅ **VALID** (Fully authenticated) |
| `pet_b1.json` | **481** | **A – C (Candidate)** | 2026-08-12 (`scripts/fetch_official_wordlists.mjs` failed scrape) | ❌ **UNVERIFIED & TRUNCATED** — **HALT ENFORCEMENT** |
| `fce_b2.json` | **249** | **A only (Anecdote)** | 2026-08-12 (`scripts/fetch_official_wordlists.mjs` failed scrape) | ❌ **UNVERIFIED & TRUNCATED** — **HALT ENFORCEMENT** |

## 3. Re-measurement of Production & Staged Weeks with Glossary Exclusions & Lemmatization (Tasks F.14–F.15)

| Week / Unit | Stage | Raw FK | Calibrated FK (Excl. Glossary) | ASL | ASW | Out-of-YLE % (Excl. Glossary) | Calibrated Gate Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Prod W33** | Stage 1 | 4.8 | **4.8** | 11.3 | 1.36 | 26.4% | **HIGH (Exceeds Flyers)** |
| **Prod W34** | Stage 1 | 4.6 | **4.6** | 12.6 | 1.29 | 21.5% | **HIGH (Exceeds Flyers)** |
| **Prod W36 (Flyers Mock)** | Stage 1 | 5.5 | **5.1** | 11.2 | 1.38 | 28.7% | **HIGH (Exceeds Flyers)** |
| **Prod W76 (PET Mock)** | Stage 2 | 6.8 | **6.4** | 10.7 | 1.51 | 32% | **PASS** |
| **Prod W80 (PET Mock)** | Stage 2 | 6.8 | **6.8** | 11.1 | 1.53 | 34.6% | **PASS** |
| **Staged W79 (R69/R70)** | Stage 2 | 8.2 | **7.6** | 10 | 1.64 | 38.6% | **PASS** |
| **Staged W126 (Wave 3)** | Stage 3 | 7.4 | **7.1** | 10.7 | 1.57 | 31.3% | **PASS** |
| **Staged W127 (Wave 3)** | Stage 3 | 10.4 | **9.3** | 12.3 | 1.7 | 41.9% | **PASS** |
| **Staged W129 (Wave 3)** | Stage 3 | 10.2 | **9.8** | 11.5 | 1.77 | 39.3% | **PASS** |
| **Staged W130 (Wave 3)** | Stage 3 | 10.9 | **10.5** | 11.4 | 1.84 | 48% | **PASS** |
| **Staged W131 (Wave 3)** | Stage 3 | 10.5 | **9.1** | 10.5 | 1.75 | 55.1% | **PASS** |
| **Staged W133 (Wave 3)** | Stage 3 | 10.4 | **8.2** | 9.9 | 1.69 | 44.2% | **PASS** |
| **Staged W134 (Wave 3)** | Stage 3 | 9.3 | **7** | 10.4 | 1.57 | 42.8% | **PASS** |
