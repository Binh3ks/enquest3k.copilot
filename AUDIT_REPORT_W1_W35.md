# AUDIT_REPORT_W1_W35.md

> Generated: 2026-07-22
> Pipeline: Deepgram Nova-2 (frozen)
> Rules: PIPELINE_RULES.md

---

## Summary

| Category | Count | Description |
|----------|-------|-------------|
| 🟢 GREEN | 0 | All segments have physical L3 `words[]` |
| 🟡 YELLOW | 1 | Has transcript text but missing/guesswork L3 |
| 🔴 RED | 34 | Missing file, corrupted, or no transcript |
| **Total** | **35** | |

---

## Phase 3 Queue (weeks needing re-run)

These weeks must be re-run through `force_align_transcript.py`:

| Week | Video ID | Status | Issue |
|------|----------|--------|-------|
| W11 | `curo8LPPA5Y` | YELLOW | 82/82 segments have words[], but only 78 have valid physical L3 timestamps (610  |
| W01 | `8wZi38lF28E` | RED | No segments have words[] arrays |
| W02 | `FHaObkHEkHQ` | RED | No segments have words[] arrays |
| W03 | `zT5IiE9m9oY` | RED | No segments have words[] arrays |
| W04 | `BXWNhq-lPD8` | RED | No segments have words[] arrays |
| W05 | `O07X1XLK4tM` | RED | No segments have words[] arrays |
| W06 | `Uv55rB8RTIs` | RED | File not found |
| W07 | `vb4ZF3pYtuw` | RED | No segments have words[] arrays |
| W08 | `d7hYjIV4AF0` | RED | No segments have words[] arrays |
| W09 | `jWY6N9QXmEY` | RED | No segments have words[] arrays |
| W10 | `t1tSx5cI9eg` | RED | No segments have words[] arrays |
| W12 | `4c6FyuetSVo` | RED | No segments have words[] arrays |
| W13 | `ico9ztlb46k` | RED | No segments have words[] arrays |
| W14 | `vGiVWmh_17s` | RED | File not found |
| W15 | `N1o4oOXLOZc` | RED | No segments have words[] arrays |
| W16 | `tgUSHk6JaTY` | RED | No segments have words[] arrays |
| W17 | `P9abGg_gF1s` | RED | No segments have words[] arrays |
| W18 | `MNQMpFVrMOs` | RED | No segments have words[] arrays |
| W19 | `wy398w9QcB4` | RED | No segments have words[] arrays |
| W20 | `qwjfQNQsRRI` | RED | No segments have words[] arrays |
| W21 | `tGWiowdjnHk` | RED | No segments have words[] arrays |
| W22 | `kTf0V4HyFtM` | RED | File not found |
| W23 | `pcWBtzTnpb8` | RED | No segments have words[] arrays |
| W24 | `LlC-Trk54Zg` | RED | No segments have words[] arrays |
| W25 | `RP1AL2DU6vQ` | RED | File not found |
| W26 | `OdNv-J31Kk8` | RED | No segments have words[] arrays |
| W27 | `D3h-1mBjYdY` | RED | No segments have words[] arrays |
| W28 | `tftSHIh8enw` | RED | No segments have words[] arrays |
| W29 | `aSdnkKnL6Ys` | RED | No segments have words[] arrays |
| W30 | `aqMpREQdnCY` | RED | No segments have words[] arrays |
| W31 | `LNajQTnZviQ` | RED | No segments have words[] arrays |
| W32 | `qD1pnquN_DM` | RED | No segments have words[] arrays |
| W33 | `gWOqA3pUaTk` | RED | No segments have words[] arrays |
| W34 | `XPZXpuoIndo` | RED | No segments have words[] arrays |
| W35 | `X2YgM1Zw4_E` | RED | No segments have words[] arrays |

---

## 🟢 GREEN (Pass)

No GREEN weeks.

---

## 🟡 YELLOW (Warning)

| Week | Video ID | Segments | Words | L3 Valid | Engine |
|------|----------|----------|-------|----------|--------|
| W11 | `curo8LPPA5Y` | 82 | 610 | 78 | deepgram-nova-2 |

---

## 🔴 RED (Fail)

| Week | Video ID | Reason |
|------|----------|--------|
| W01 | `8wZi38lF28E` | No segments have words[] arrays |
| W02 | `FHaObkHEkHQ` | No segments have words[] arrays |
| W03 | `zT5IiE9m9oY` | No segments have words[] arrays |
| W04 | `BXWNhq-lPD8` | No segments have words[] arrays |
| W05 | `O07X1XLK4tM` | No segments have words[] arrays |
| W06 | `Uv55rB8RTIs` | File not found |
| W07 | `vb4ZF3pYtuw` | No segments have words[] arrays |
| W08 | `d7hYjIV4AF0` | No segments have words[] arrays |
| W09 | `jWY6N9QXmEY` | No segments have words[] arrays |
| W10 | `t1tSx5cI9eg` | No segments have words[] arrays |
| W12 | `4c6FyuetSVo` | No segments have words[] arrays |
| W13 | `ico9ztlb46k` | No segments have words[] arrays |
| W14 | `vGiVWmh_17s` | File not found |
| W15 | `N1o4oOXLOZc` | No segments have words[] arrays |
| W16 | `tgUSHk6JaTY` | No segments have words[] arrays |
| W17 | `P9abGg_gF1s` | No segments have words[] arrays |
| W18 | `MNQMpFVrMOs` | No segments have words[] arrays |
| W19 | `wy398w9QcB4` | No segments have words[] arrays |
| W20 | `qwjfQNQsRRI` | No segments have words[] arrays |
| W21 | `tGWiowdjnHk` | No segments have words[] arrays |
| W22 | `kTf0V4HyFtM` | File not found |
| W23 | `pcWBtzTnpb8` | No segments have words[] arrays |
| W24 | `LlC-Trk54Zg` | No segments have words[] arrays |
| W25 | `RP1AL2DU6vQ` | File not found |
| W26 | `OdNv-J31Kk8` | No segments have words[] arrays |
| W27 | `D3h-1mBjYdY` | No segments have words[] arrays |
| W28 | `tftSHIh8enw` | No segments have words[] arrays |
| W29 | `aSdnkKnL6Ys` | No segments have words[] arrays |
| W30 | `aqMpREQdnCY` | No segments have words[] arrays |
| W31 | `LNajQTnZviQ` | No segments have words[] arrays |
| W32 | `qD1pnquN_DM` | No segments have words[] arrays |
| W33 | `gWOqA3pUaTk` | No segments have words[] arrays |
| W34 | `XPZXpuoIndo` | No segments have words[] arrays |
| W35 | `X2YgM1Zw4_E` | No segments have words[] arrays |
