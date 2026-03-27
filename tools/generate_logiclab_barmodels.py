#!/usr/bin/env python3
"""Generate Singapore Math bar model images from week singapore_math.js files.

Usage:
  python3 tools/generate_logiclab_barmodels.py 22
  python3 tools/generate_logiclab_barmodels.py 22 --skip-existing
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
W, H = 1600, 900
FONT = "/System/Library/Fonts/Supplemental/Arial.ttf"

PALETTE = {
    "bg": (255, 255, 255),
    "ink": (20, 20, 20),
    "whole": (126, 87, 194),
    "left": (66, 165, 245),
    "right": (255, 167, 38),
    "extra": (76, 175, 80),
}


def fnt(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT, size)


def fit_font(draw: ImageDraw.ImageDraw, text: str, max_w: int, max_size: int, min_size: int = 24):
    for s in range(max_size, min_size - 1, -2):
        font = fnt(s)
        bb = draw.textbbox((0, 0), text, font=font)
        if bb[2] - bb[0] <= max_w:
            return font
    return fnt(min_size)


def draw_center(draw: ImageDraw.ImageDraw, box, text: str, max_size=54, fill=PALETTE["ink"]):
    x0, y0, x1, y1 = box
    font = fit_font(draw, text, max((x1 - x0) - 16, 20), max_size)
    bb = draw.textbbox((0, 0), text, font=font)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    x = x0 + ((x1 - x0) - tw) // 2
    y = y0 + ((y1 - y0) - th) // 2
    draw.text((x, y), text, fill=fill, font=font)


def draw_bar(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int, color, text: str):
    draw.rectangle((x, y, x + w, y + h), fill=color, outline="black", width=4)
    draw_center(draw, (x, y, x + w, y + h), text, max_size=44, fill=(255, 255, 255))


def numbers(text: str):
    return [int(n) for n in re.findall(r"\d+", text)]


def parse_unit(answer0: str) -> str:
    s = answer0.strip().lower()
    if not s:
        return "units"
    s = re.sub(r"^[0-9\s.,]+", "", s).strip()
    return s if s else "units"


def parse_problems(file_path: Path):
    raw = file_path.read_text(encoding="utf-8")
    types = re.findall(r'type:\s*"([^"]+)"', raw)
    questions = re.findall(r'question_en:\s*"([^"]+)"', raw)
    bars = re.findall(r'bar_model:\s*"([^"]+)"', raw)
    answers0 = re.findall(r'answer:\s*\[\s*"([^"]+)"', raw)

    count = min(len(types), len(questions), len(bars), len(answers0))
    out = []
    for i in range(count):
        out.append(
            {
                "type": types[i],
                "question": questions[i],
                "bar_model": bars[i],
                "answer0": answers0[i],
            }
        )
    return out


def draw_part_whole(problem, target: Path):
    nums = numbers(problem["question"])[:2] or [3, 4]
    if len(nums) < 2:
        nums = [nums[0], max(2, nums[0] - 1)]
    a, b = nums[0], nums[1]
    total = max(a + b, 1)
    unit = parse_unit(problem["answer0"])

    img = Image.new("RGB", (W, H), PALETTE["bg"])
    d = ImageDraw.Draw(img)

    x, y_top, y_bottom = 90, 150, 430
    h = 130
    max_w = 1280
    wa = int(max_w * a / total)
    wb = max_w - wa

    draw_bar(d, x, y_top, max_w, h, PALETTE["whole"], f"Total: ? {unit}")
    draw_bar(d, x, y_bottom, wa, h, PALETTE["left"], f"Part A: {a}")
    draw_bar(d, x + wa, y_bottom, wb, h, PALETTE["right"], f"Part B: {b}")

    img.save(target, "JPEG", quality=95)


def draw_comparison(problem, target: Path):
    nums = numbers(problem["question"])[:2] or [8, 5]
    if len(nums) < 2:
        nums = [nums[0], max(1, nums[0] - 2)]
    a, b = max(nums[0], nums[1]), min(nums[0], nums[1])

    img = Image.new("RGB", (W, H), PALETTE["bg"])
    d = ImageDraw.Draw(img)

    x, y1, y2 = 90, 180, 430
    h = 130
    max_w = 1280
    wa = int(max_w * a / max(a, 1))
    wb = int(max_w * b / max(a, 1))

    draw_bar(d, x, y1, wa, h, PALETTE["left"], f"A: {a}")
    draw_bar(d, x, y2, wb, h, PALETTE["right"], f"B: {b}")

    gap_start = x + wb + 8
    gap_end = x + wa
    gy = y2 + h // 2
    d.line((gap_start, gy, gap_end, gy), fill="black", width=5)
    d.line((gap_start, gy - 20, gap_start, gy + 20), fill="black", width=4)
    d.line((gap_end, gy - 20, gap_end, gy + 20), fill="black", width=4)
    draw_center(d, (gap_start, gy + 25, gap_end, gy + 90), "Difference: ?", 40)

    img.save(target, "JPEG", quality=95)


def draw_missing(problem, target: Path):
    nums = numbers(problem["question"])[:2] or [12, 5]
    if len(nums) < 2:
        nums = [nums[0], max(1, nums[0] // 2)]
    whole, known = max(nums[0], nums[1]), min(nums[0], nums[1])
    known = min(known, whole - 1) if whole > 1 else known

    img = Image.new("RGB", (W, H), PALETTE["bg"])
    d = ImageDraw.Draw(img)

    x, y1, y2 = 90, 150, 430
    h = 130
    w = 1280
    wk = int(w * known / max(whole, 1))
    wu = w - wk

    draw_bar(d, x, y1, w, h, PALETTE["whole"], f"Whole: {whole}")
    draw_bar(d, x, y2, wk, h, PALETTE["left"], f"Known: {known}")
    d.rectangle((x + wk, y2, x + wk + wu, y2 + h), fill=(245, 245, 245), outline="black", width=4)
    draw_center(d, (x + wk, y2, x + wk + wu, y2 + h), "Missing: ?", 42)

    img.save(target, "JPEG", quality=95)


def draw_groups(problem, target: Path):
    nums = numbers(problem["question"])[:2] or [3, 4]
    if len(nums) < 2:
        nums = [nums[0], max(2, nums[0])]
    groups = max(2, min(nums[0], 12))
    each = max(1, nums[1])

    img = Image.new("RGB", (W, H), PALETTE["bg"])
    d = ImageDraw.Draw(img)

    x0, x1, y0, y1 = 90, 1510, 250, 430
    seg = (x1 - x0) / groups
    for i in range(groups):
        sx0 = int(x0 + i * seg)
        sx1 = int(x0 + (i + 1) * seg)
        c = PALETTE["left"] if i % 2 == 0 else PALETTE["right"]
        d.rectangle((sx0, y0, sx1, y1), fill=c, outline="black", width=3)
        draw_center(d, (sx0, y0, sx1, y1), str(each), 34, fill=(255, 255, 255))

    by = y1 + 65
    d.line((x0, by, x1, by), fill="black", width=5)
    d.line((x0, by - 20, x0, by + 20), fill="black", width=4)
    d.line((x1, by - 20, x1, by + 20), fill="black", width=4)
    draw_center(d, (x0, by + 24, x1, by + 95), "Total: ?", 48)

    img.save(target, "JPEG", quality=95)


def draw_before_after(problem, target: Path):
    nums = numbers(problem["question"])[:2] or [2026, 200]
    if len(nums) < 2:
        nums = [nums[0], max(1, nums[0] // 10)]
    start, change = nums[0], nums[1]

    img = Image.new("RGB", (W, H), PALETTE["bg"])
    d = ImageDraw.Draw(img)

    x, y = 120, 370
    w1, h = 980, 140
    w2 = 300

    draw_bar(d, x, y, w1, h, PALETTE["left"], f"Start: {start}")
    d.rectangle((x + w1, y, x + w1 + w2, y + h), fill=(245, 245, 245), outline="black", width=4)
    draw_center(d, (x + w1, y, x + w1 + w2, y + h), "Result: ?", 38)

    draw_center(d, (x + 320, y - 95, x + 860, y - 20), f"Change: {change}", 44)

    img.save(target, "JPEG", quality=95)


def draw_problem(problem, out_path: Path):
    kind = problem["type"].strip()
    if kind == "comparison":
        draw_comparison(problem, out_path)
    elif kind == "missing_part":
        draw_missing(problem, out_path)
    elif kind == "groups":
        draw_groups(problem, out_path)
    elif kind == "before_after":
        draw_before_after(problem, out_path)
    else:
        draw_part_whole(problem, out_path)


def mode_file(week: int, mode: str) -> Path:
    if mode == "advanced":
        return ROOT / f"src/data/weeks/week_{week:02d}/singapore_math.js"
    return ROOT / f"src/data/weeks_easy/week_{week:02d}/singapore_math.js"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("week", type=int)
    ap.add_argument("--skip-existing", action="store_true")
    args = ap.parse_args()

    week = args.week
    generated = 0
    skipped = 0

    for mode in ("advanced", "easy"):
        sm_path = mode_file(week, mode)
        if not sm_path.exists():
            print(f"SKIP {mode}: {sm_path} not found")
            continue

        problems = parse_problems(sm_path)
        if not problems:
            print(f"SKIP {mode}: no problems parsed from {sm_path}")
            continue

        for p in problems:
            rel = p["bar_model"].strip()
            if not rel.startswith("/images/"):
                print(f"SKIP invalid bar_model path: {rel}")
                continue

            out_path = ROOT / "public" / rel.lstrip("/")
            out_path.parent.mkdir(parents=True, exist_ok=True)

            if args.skip_existing and out_path.exists():
                skipped += 1
                continue

            draw_problem(p, out_path)
            generated += 1

    print(f"Generated: {generated} bar-model images")
    print(f"Skipped: {skipped} existing images")


if __name__ == "__main__":
    main()
