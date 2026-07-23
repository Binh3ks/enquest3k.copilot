#!/usr/bin/env python3
"""
audit_w1_w35.py — Global data audit for W1-W35 transcript JSON files.

Scans all shadowing.js videoId mappings and checks each transcript JSON
against the Golden Schema defined in PIPELINE_RULES.md.

Classification:
  GREEN  — Has segments[] with words[] containing physical L3 start/end
  YELLOW — Has transcript text but missing words[] or uses synthetic timing
  RED    — Missing file, corrupted JSON, or no transcript data

Output: AUDIT_REPORT_W1_W35.md
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WEEKS_DIR = ROOT / "src" / "data" / "weeks"
SENTENCES_DIR = ROOT / "src" / "data" / "video_transcripts_by_id" / "sentences"
EASY_DIR = ROOT / "src" / "data" / "weeks_easy"
REPORT_PATH = ROOT / "AUDIT_REPORT_W1_W35.md"


def extract_video_id_from_shadowing(shadowing_path: Path) -> str | None:
    """Extract videoId from a shadowing.js file."""
    if not shadowing_path.exists():
        return None
    content = shadowing_path.read_text()
    match = re.search(r'videoId:\s*["\']([^"\']+)["\']', content)
    return match.group(1) if match else None


def audit_transcript(video_id: str) -> dict:
    """Audit a single transcript JSON against the Golden Schema."""
    json_path = SENTENCES_DIR / f"{video_id}.json"

    if not json_path.exists():
        return {"status": "RED", "reason": "File not found", "path": str(json_path)}

    try:
        data = json.loads(json_path.read_text())
    except json.JSONDecodeError as e:
        return {"status": "RED", "reason": f"Corrupted JSON: {e}", "path": str(json_path)}

    # Check for segments array
    segments = data.get("segments", [])
    if not segments:
        return {"status": "RED", "reason": "No segments[] array", "path": str(json_path)}

    # Check each segment for L3 words[]
    total_words = 0
    segments_with_words = 0
    segments_with_valid_l3 = 0
    has_speaker = False

    for seg in segments:
        words = seg.get("words", [])
        if words:
            segments_with_words += 1
            total_words += len(words)
            # Check if words have physical start/end (not synthetic)
            first_word = words[0]
            if "start" in first_word and "end" in first_word:
                # Check if timestamps are physically plausible (not all identical)
                starts = [w["start"] for w in words]
                ends = [w["end"] for w in words]
                if len(set(starts)) > 1 or len(set(ends)) > 1:
                    segments_with_valid_l3 += 1
        if seg.get("speaker"):
            has_speaker = True

    # Classification logic
    if segments_with_valid_l3 == len(segments) and total_words > 0:
        status = "GREEN"
        reason = f"All {len(segments)} segments have valid L3 words[] ({total_words} words)"
    elif segments_with_words > 0:
        status = "YELLOW"
        reason = (
            f"{segments_with_words}/{len(segments)} segments have words[], "
            f"but only {segments_with_valid_l3} have valid physical L3 timestamps "
            f"({total_words} total words)"
        )
    else:
        status = "RED"
        reason = f"No segments have words[] arrays"

    # Check alignment metadata
    alignment = data.get("alignment", {})
    engine = alignment.get("engine", "unknown")

    return {
        "status": status,
        "reason": reason,
        "path": str(json_path),
        "segments": len(segments),
        "total_words": total_words,
        "segments_with_l3": segments_with_valid_l3,
        "has_speaker": has_speaker,
        "engine": engine,
        "duration": alignment.get("totalDuration", 0),
    }


def main():
    results = []

    # Scan weeks 1-35
    for week_num in range(1, 36):
        week_dir = WEEKS_DIR / f"week_{week_num:02d}"
        shadowing_path = week_dir / "shadowing.js"

        video_id = extract_video_id_from_shadowing(shadowing_path)

        if not video_id:
            results.append({
                "week": week_num,
                "video_id": None,
                "status": "RED",
                "reason": "No videoId in shadowing.js",
                "segments": 0,
                "total_words": 0,
                "engine": "n/a",
            })
            continue

        audit = audit_transcript(video_id)
        results.append({
            "week": week_num,
            "video_id": video_id,
            **audit,
        })

    # Count categories
    green = [r for r in results if r["status"] == "GREEN"]
    yellow = [r for r in results if r["status"] == "YELLOW"]
    red = [r for r in results if r["status"] == "RED"]

    # Generate report
    report = []
    report.append("# AUDIT_REPORT_W1_W35.md")
    report.append("")
    report.append(f"> Generated: 2026-07-22")
    report.append(f"> Pipeline: Deepgram Nova-2 (frozen)")
    report.append(f"> Rules: PIPELINE_RULES.md")
    report.append("")
    report.append("---")
    report.append("")
    report.append("## Summary")
    report.append("")
    report.append(f"| Category | Count | Description |")
    report.append(f"|----------|-------|-------------|")
    report.append(f"| 🟢 GREEN | {len(green)} | All segments have physical L3 `words[]` |")
    report.append(f"| 🟡 YELLOW | {len(yellow)} | Has transcript text but missing/guesswork L3 |")
    report.append(f"| 🔴 RED | {len(red)} | Missing file, corrupted, or no transcript |")
    report.append(f"| **Total** | **{len(results)}** | |")
    report.append("")

    # Queue for Phase 3
    queue = yellow + red
    report.append("---")
    report.append("")
    report.append("## Phase 3 Queue (weeks needing re-run)")
    report.append("")
    if queue:
        report.append("These weeks must be re-run through `force_align_transcript.py`:")
        report.append("")
        report.append("| Week | Video ID | Status | Issue |")
        report.append("|------|----------|--------|-------|")
        for r in queue:
            vid = r.get("video_id", "none")
            reason = r.get("reason", "unknown")[:80]
            report.append(f"| W{r['week']:02d} | `{vid}` | {r['status']} | {reason} |")
    else:
        report.append("No weeks need re-running — all GREEN.")
    report.append("")

    # Detailed GREEN list
    report.append("---")
    report.append("")
    report.append("## 🟢 GREEN (Pass)")
    report.append("")
    if green:
        report.append("| Week | Video ID | Segments | Words | Engine |")
        report.append("|------|----------|----------|-------|--------|")
        for r in green:
            report.append(
                f"| W{r['week']:02d} | `{r['video_id']}` | "
                f"{r.get('segments', 0)} | {r.get('total_words', 0)} | "
                f"{r.get('engine', '?')} |"
            )
    else:
        report.append("No GREEN weeks.")
    report.append("")

    # Detailed YELLOW list
    report.append("---")
    report.append("")
    report.append("## 🟡 YELLOW (Warning)")
    report.append("")
    if yellow:
        report.append("| Week | Video ID | Segments | Words | L3 Valid | Engine |")
        report.append("|------|----------|----------|-------|----------|--------|")
        for r in yellow:
            report.append(
                f"| W{r['week']:02d} | `{r.get('video_id', '?')}` | "
                f"{r.get('segments', 0)} | {r.get('total_words', 0)} | "
                f"{r.get('segments_with_l3', 0)} | {r.get('engine', '?')} |"
            )
    else:
        report.append("No YELLOW weeks.")
    report.append("")

    # Detailed RED list
    report.append("---")
    report.append("")
    report.append("## 🔴 RED (Fail)")
    report.append("")
    if red:
        report.append("| Week | Video ID | Reason |")
        report.append("|------|----------|--------|")
        for r in red:
            vid = r.get("video_id", "none") or "none"
            report.append(f"| W{r['week']:02d} | `{vid}` | {r.get('reason', 'unknown')} |")
    else:
        report.append("No RED weeks.")
    report.append("")

    # Write report
    report_text = "\n".join(report)
    REPORT_PATH.write_text(report_text)
    print(f"Report written to: {REPORT_PATH}")
    print(f"\nSummary: {len(green)} GREEN, {len(yellow)} YELLOW, {len(red)} RED")
    print(f"Phase 3 queue: {len(queue)} weeks")


if __name__ == "__main__":
    main()
