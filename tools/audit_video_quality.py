#!/usr/bin/env python3
"""
audit_video_quality.py — Rule 4 Video Curation Audit for W01-W35.

Heuristic detection:
1. Grammar Mismatch: lesson tense ≠ video dominant tense
2. Chanting/Flashcard: low vocab richness + consecutive repeats
3. Too Short: <80 words for a shadowing video
"""

import json
import re
import sys
from pathlib import Path
from collections import Counter

ROOT = Path(__file__).resolve().parent.parent
SENTENCES = ROOT / "src/data/video_transcripts_by_id/sentences"
WEEKS = ROOT / "src/data/weeks"
REPORT = ROOT / "VIDEO_AUDIT_REPORT.md"

# ── Tense detection patterns ──────────────────────────────────────
PAST_IRREGULAR = re.compile(
    r'\b(?:was|were|had|did|went|saw|came|got|made|took|said|gave|found|knew|'
    r'thought|felt|ran|sat|let|cut|hit|read|wrote|brought|bought|caught|taught|'
    r'slept|woke|drove|rode|spoke|chose|wore|broke|threw|grew|flew|drew|'
    r'won|lost|left|met|told|heard|held|kept|stood|sent|spent|built|sang|'
    r'rang|drank|swam|began|became|forgot|hid|lay|meant|paid|'
    r'rose|set|shook|shot|showed|shut|spread|stole|struck|stuck|'
    r'swept|tore|woke)\b', re.IGNORECASE
)
PAST_ED = re.compile(r'\b\w+ed\b', re.IGNORECASE)

PRESENT_SIMPLE = re.compile(
    r'\b(?:is|are|am|do|does|have|has|go|goes|come|comes|play|plays|like|likes|'
    r'eat|eats|see|sees|make|makes|take|takes|give|gives|know|knows|think|thinks|'
    r'feel|feels|run|runs|sit|sits|want|wants|need|needs|'
    r'look|looks|use|uses|try|tries|help|helps|start|starts|work|works|live|lives|'
    r'talk|talks|walk|walks|read|reads|write|writes|open|opens|close|closes|'
    r'say|says|put|puts|get|gets|tell|tells|ask|asks|turn|turns|move|moves|'
    r'live|lives|believe|believes|seem|seems|love|loves|hate|hates|'
    r'call|calls|try|tries|need|needs|feel|feels|become|becomes|'
    r'leave|leaves|put|puts|mean|means|keep|keeps|let|lets|'
    r'begin|begins|show|shows|hear|hears|play|plays|run|runs|'
    r'move|moves|live|lives|believe|believes|bring|happen|write|provide|'
    r'sit|stand|lose|pay|meet|include|continue|set|learn|change|lead|'
    r'understand|watch|follow|stop|create|speak|read|spend|grow|open|'
    r'walk|win|offer|remember|love|consider|appear|buy|wait|serve|die|'
    r'send|expect|build|stay|fall|cut|reach|kill|remain|suggest|raise|'
    r'pass|sell|require|report|decide|pull)\b', re.IGNORECASE
)
MODALS = re.compile(r'\b(?:can|will|would|shall|should|may|might|must|could)\b', re.IGNORECASE)


def get_week_info():
    """Map weeks to video IDs and grammar focuses."""
    week_map = {}
    for w in range(1, 36):
        shadowing = WEEKS / f"week_{w:02d}/shadowing.js"
        if not shadowing.exists():
            continue
        content = shadowing.read_text()
        vid_match = re.search(r'videoId:\s*["\']([^"\']+)["\']', content)
        if not vid_match:
            continue
        vid = vid_match.group(1)
        grammar_path = WEEKS / f"week_{w:02d}/grammar.js"
        grammar = ""
        if grammar_path.exists():
            g = grammar_path.read_text()
            gm = re.search(r'title_en:\s*["\']([^"\']+)', g)
            grammar = gm.group(1) if gm else ""
        week_map[w] = {"video_id": vid, "grammar": grammar}
    return week_map


def analyze_week(w, info):
    """Analyze a single week's transcript for Rule 4 violations."""
    vid = info["video_id"]
    path = SENTENCES / f"{vid}.json"
    if not path.exists():
        return {"week": w, "grammar": info["grammar"], "status": "MISSING",
                "flags": ["No transcript file"]}

    data = json.loads(path.read_text())
    segs = data.get("segments", [])
    texts = [s["text"] for s in segs]
    all_words = " ".join(texts).lower().split()
    total_words = len(all_words)

    if total_words == 0:
        return {"week": w, "grammar": info["grammar"], "status": "EMPTY",
                "flags": ["Empty transcript"]}

    flags = []

    # 1. Vocabulary richness
    unique_words = set(all_words)
    vocab_richness = len(unique_words) / total_words

    # 2. Consecutive repeats
    max_consecutive = 0
    curr = 0
    for i in range(1, len(texts)):
        if texts[i].lower().strip() == texts[i - 1].lower().strip():
            curr += 1
            max_consecutive = max(max_consecutive, curr)
        else:
            curr = 0

    # 3. Tense detection
    text_joined = " ".join(all_words)
    past_count = len(PAST_IRREGULAR.findall(text_joined)) + len(PAST_ED.findall(text_joined))
    present_count = len(PRESENT_SIMPLE.findall(text_joined)) + len(MODALS.findall(text_joined))

    past_pct = past_count / total_words * 100
    present_pct = present_count / total_words * 100

    if past_pct > present_pct + 5:
        dominant_tense = "Past"
    elif present_pct > past_pct + 5:
        dominant_tense = "Present"
    else:
        dominant_tense = "Mixed"

    # ── Flagging rules ────────────────────────────────────────────

    # CHANTING: low vocab richness (<0.25) OR consecutive repeats (≥3)
    if vocab_richness < 0.25:
        flags.append(f"CHANTING: low vocab richness ({vocab_richness:.2f})")
    if max_consecutive >= 3:
        flags.append(f"CHANTING: {max_consecutive+1}x consecutive identical sentences")

    # GRAMMAR MISMATCH
    grammar_lower = info["grammar"].lower()
    if "present" in grammar_lower and dominant_tense == "Past" and past_pct > 15:
        flags.append(f"GRAMMAR MISMATCH: lesson=Present, video=Past ({past_pct:.0f}%)")
    if "past" in grammar_lower and dominant_tense == "Present" and present_pct > 15:
        flags.append(f"GRAMMAR MISMATCH: lesson=Past, video=Present ({present_pct:.0f}%)")

    # TOO SHORT
    if total_words < 80:
        flags.append(f"TOO SHORT: {total_words} words (need ≥80)")

    status = "FLAGGED" if flags else "PASS"

    return {
        "week": w,
        "grammar": info["grammar"],
        "video_id": vid,
        "total_words": total_words,
        "vocab_richness": round(vocab_richness, 2),
        "dominant_tense": dominant_tense,
        "past_pct": round(past_pct, 1),
        "present_pct": round(present_pct, 1),
        "status": status,
        "flags": flags,
    }


def generate_report(results):
    """Generate VIDEO_AUDIT_REPORT.md."""
    flagged = [r for r in results if r.get("status") == "FLAGGED"]
    passed = [r for r in results if r.get("status") == "PASS"]

    lines = [
        "# VIDEO_AUDIT_REPORT.md",
        "",
        "> Generated: 2026-07-22",
        "> Pipeline: Rule 4 Video Curation Audit (Heuristic)",
        "",
        "---",
        "",
        "## Summary",
        "",
        f"| Category | Count |",
        f"|----------|-------|",
        f"| ✅ PASS | {len(passed)} |",
        f"| ⚠️ FLAGGED | {len(flagged)} |",
        f"| Total | {len(results)} |",
        "",
    ]

    if flagged:
        lines.append("## ⚠️ FLAGGED WEEKS (Need Replacement)")
        lines.append("")
        lines.append("| Week | Grammar Focus | Words | Vocab Rich. | Tense | Reasons |")
        lines.append("|------|--------------|-------|-------------|-------|---------|")
        for r in flagged:
            reasons = "; ".join(r["flags"])
            lines.append(
                f"| W{r['week']:02d} | {r['grammar'][:35]} | "
                f"{r.get('total_words', 0)} | "
                f"{r.get('vocab_richness', 0):.2f} | "
                f"{r.get('dominant_tense', 'N/A')} | "
                f"{reasons} |"
            )
        lines.append("")

    lines.append("## ✅ PASSED WEEKS")
    lines.append("")
    lines.append("| Week | Grammar Focus | Words | Vocab Rich. | Tense |")
    lines.append("|------|--------------|-------|-------------|-------|")
    for r in passed:
        lines.append(
            f"| W{r['week']:02d} | {r['grammar'][:35]} | "
            f"{r.get('total_words', 0)} | "
            f"{r.get('vocab_richness', 0):.2f} | "
            f"{r.get('dominant_tense', 'N/A')} |"
        )
    lines.append("")

    # Detailed per-week
    lines.append("## Detailed Audit")
    lines.append("")
    for r in results:
        lines.append(f"### W{r['week']:02d} — {r['grammar']}")
        lines.append(f"- **Video ID:** `{r.get('video_id', 'N/A')}`")
        lines.append(f"- **Total Words:** {r.get('total_words', 0)}")
        lines.append(f"- **Vocab Richness:** {r.get('vocab_richness', 0):.2f}")
        lines.append(f"- **Dominant Tense:** {r.get('dominant_tense', 'N/A')}")
        lines.append(f"- **Status:** {r.get('status', 'N/A')}")
        for f in r.get("flags", []):
            lines.append(f"- ⚠️ **{f}**")
        lines.append("")

    REPORT.write_text("\n".join(lines))
    return flagged, passed


def main():
    week_map = get_week_info()
    results = []

    for w in range(1, 36):
        if w not in week_map:
            continue
        result = analyze_week(w, week_map[w])
        results.append(result)

    flagged, passed = generate_report(results)

    print(f"=== Rule 4 Video Curation Audit ===")
    print(f"Total: {len(results)} | PASS: {len(passed)} | FLAGGED: {len(flagged)}")
    print()
    if flagged:
        print("Flagged weeks:")
        for r in flagged:
            reasons = "; ".join(r["flags"])
            print(f"  W{r['week']:02d}: {reasons}")
    print()
    print(f"Report: {REPORT}")


if __name__ == "__main__":
    main()
