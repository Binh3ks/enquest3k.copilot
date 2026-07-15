#!/usr/bin/env python3
"""Generate Singapore Math diagram images from week singapore_math.js files.

Usage:
  python3 tools/generate_logiclab_barmodels.py 22
  python3 tools/generate_logiclab_barmodels.py 22 --skip-existing

Supported problem types → diagram:
  part_whole          → classic part-whole bar
  comparison          → two bars with difference arrow
  missing_part        → whole bar + known + unknown box
  groups              → N equal-segment bar
  before_after        → start bar + change label + result box
  fraction_bar        → segmented bar with coloured fraction
  rectangle_area      → labelled rectangle (shows area formula)
  rectangle_perimeter → labelled rectangle (shows perimeter formula)
  triangle_area       → right triangle with base & height
  circle_area         → circle with radius (shows area formula)
  circle_circumference→ circle with radius (shows  C formula)
  number_line         → number line with marked points
  clock_time          → analogue clock face (reads time from question)
  bar_chart           → simple 2-4 column chart for data problems
  coordinate_grid     → 2-quadrant coordinate grid
  pythagoras          → right triangle with a, b, c labelled
  no_diagram          → SKIPPED (bar_model path must be empty "")
"""

from __future__ import annotations

import argparse
import math
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
    "green": (56, 142, 60),
    "red": (229, 57, 53),
    "grey": (158, 158, 158),
    "light_blue": (179, 229, 252),
    "light_orange": (255, 224, 178),
    "light_green": (200, 230, 201),
    "light_purple": (225, 190, 231),
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
    q = problem["question"]
    answer0 = problem.get("answer0", "")
    nums = numbers(q)

    # Classify problem type from question structure:
    # ADDITION: two parts given → find total (bar shows Part A + Part B = Total:?)
    # SUBTRACTION: total given → find missing part (bar shows Total: known, Part B:?)
    # The question ending tells us the problem type most reliably.
    q_lower = q.lower()
    q_last = q_lower.rstrip("?.,!").split()[-3:]  # last 3 words of question
    q_last_str = " ".join(q_last)

    # Addition: question ends with "in total?" or "in all?" or "altogether?"
    is_addition = (
        q_lower.rstrip("?.,!").endswith("in total")
        or q_lower.rstrip("?.,!").endswith("in all")
        or q_lower.rstrip("?.,!").endswith("altogether")
        or q_lower.rstrip("?.,!").endswith("in total?")
        or q_lower.rstrip("?.,!").endswith("in all?")
    )

    # Subtraction: structural patterns in statement (total is KNOWN):
    # "in 2/3 trips" = total seeds across N trips, find remaining
    # "in N groups" = total items across N groups, find per-group or remaining
    # "more than" = comparison (difference)
    is_structural_sub = (
        re.search(r"in \d+ trips", q_lower) is not None
        or re.search(r"in \d+ groups", q_lower) is not None
        or "more than" in q_lower
    )

    # Subtraction: question asks for remaining/missing/given-away amount
    is_question_sub = (
        # Question-ending patterns
        "left" in q_last_str            # "how many left?" / "steps left."
        or "now" in q_last_str          # "how many now?" / "does she have now?"
        or "running" in q_last_str      # "how many were running?"
        # Question-body patterns (keyword appears anywhere in question)
        or "how many more" in q_lower   # "how many more steps?" / "how many more minutes?"
        or "how much more" in q_lower   # "how much more money?"
        or "still need to" in q_lower   # "how many still need to finish?"
        or "needed to finish" in q_lower # "how many needed to finish?"
        or ("give away" in q_lower and "away" in q_lower)  # "how many did he give away?"
        or ("gave away" in q_lower)     # "how many did he give away?"
        # Statement-body patterns (key phrase appears in statement, not question)
        or ("steps left" in q_lower)    # "had 8 steps left. How many steps did he take?"
    )

    is_subtraction = is_structural_sub or is_question_sub

    if len(nums) >= 2:
        if is_addition:
            # Addition: two parts given, find total
            # Bar model: top = "Total: ?" (unknown), bottom = Part A + Part B
            part_a = nums[0]
            part_b = nums[1]
            total_val = part_a + part_b
            known_val = part_a
        elif is_subtraction:
            # Subtraction: total is given, one part known, find missing part
            unique = sorted(set(nums), reverse=True)
            total_val = unique[0]
            candidates = [n for n in unique[1:] if n >= 10]
            known_val = candidates[0] if candidates else (unique[1] if len(unique) > 1 else 1)
            part_a = known_val
            part_b = None  # unknown
        else:
            # Fallback: two parts → find total (addition)
            part_a = nums[0]
            part_b = nums[1] if len(nums) > 1 else 0
            total_val = part_a + part_b
            known_val = part_a
    else:
        part_a, part_b = 10, 4
        total_val, known_val = 10, 4

    unit = parse_unit(answer0)

    img = Image.new("RGB", (W, H), PALETTE["bg"])
    d = ImageDraw.Draw(img)

    x, y_top, y_bottom = 90, 150, 430
    h = 130
    max_w = 1280

    if is_addition or (not is_subtraction and not is_structural_sub and part_b is not None):
        # ADDITION: top bar = Total:? (unknown), bottom = Part A + Part B
        total_w = max(part_a + part_b, 1)
        wa = int(max_w * part_a / total_w)
        wb = max_w - wa
        draw_bar(d, x, y_top, max_w, h, PALETTE["whole"], f"Total: ? {unit}")
        draw_bar(d, x, y_bottom, wa, h, PALETTE["left"], f"Part A: {part_a}")
        draw_bar(d, x + wa, y_bottom, wb, h, PALETTE["right"], f"Part B: {part_b}")
    else:
        # SUBTRACTION: top bar = Total: known, bottom = known + ?
        total_w = max(total_val + known_val, 1)
        wa = int(max_w * known_val / total_w)
        wb = max_w - wa
        draw_bar(d, x, y_top, max_w, h, PALETTE["whole"], f"Total: {total_val} {unit}")
        draw_bar(d, x, y_bottom, wa, h, PALETTE["left"], f"Part A: {known_val}")
        draw_bar(d, x + wa, y_bottom, wb, h, PALETTE["right"], f"Part B: ?")

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
    q = problem.get("question", "")
    nums = numbers(q)[:2] or [2026, 200]
    if len(nums) < 2:
        nums = [nums[0], max(1, nums[0] // 10)]
    num1, num2 = nums[0], nums[1]
    answer0 = problem.get("answer0", "")
    ans_nums = numbers(answer0)

    # Determine what is unknown:
    # "how many did X have at first?" → start unknown, result=num2, change=num1
    # "how many left?" → result unknown, start=num1, change=num2
    # "how many given/ate/used?" → change unknown, start=num1, result=num2
    q_lower = q.lower()
    is_find_start = any(kw in q_lower for kw in [
        "at first", "had some", "collected some", "ate some",
        "took some", "bought some", "found some", "gave some"
    ])
    is_find_change = any(kw in q_lower for kw in [
        "how many did he take", "how many did she take", "how many did it take",
        "how many did jake take", "how many did luna take",
        "how many did he eat", "how many did she eat",
        "how many did he give", "how many did she give",
        "how many did he use", "how many did she use",
        "how many did he buy", "how many did she buy",
        "how many did he find", "how many did she find",
        "how many steps did he take", "how many stickers did he give",
    ])

    img = Image.new("RGB", (W, H), PALETTE["bg"])
    d = ImageDraw.Draw(img)

    x, y = 120, 370
    w1, h = 980, 140
    w2 = 300

    if is_find_start and ans_nums:
        # Start unknown: show result, change, start=?
        result_val = num2
        change_val = num1
        start_val = ans_nums[0]
        draw_bar(d, x, y, w2, h, PALETTE["whole"], "Start: ?")
        d.rectangle((x + w2, y, x + w2 + w1, y + h), fill=(245, 245, 245), outline="black", width=4)
        draw_center(d, (x + w2, y, x + w2 + w1, y + h), f"Result: {result_val}", 38)
        draw_center(d, (x + 320, y - 95, x + 860, y - 20), f"Change: {change_val}", 44)
    elif is_find_change:
        # Change unknown: show start, result, change=?
        start_val = num1
        result_val = num2
        draw_bar(d, x, y, w2, h, PALETTE["left"], f"Start: {start_val}")
        d.rectangle((x + w2, y, x + w2 + w1, y + h), fill=(245, 245, 245), outline="black", width=4)
        draw_center(d, (x + w2, y, x + w2 + w1, y + h), f"Result: {result_val}", 38)
        draw_center(d, (x + 320, y - 95, x + 860, y - 20), "Change: ?", 44)
    else:
        # Result unknown: show start, change, result=?
        start_val = num1
        change_val = num2
        if ans_nums:
            result_val = ans_nums[0]
            draw_bar(d, x, y, w1, h, PALETTE["left"], f"Start: {start_val}")
            d.rectangle((x + w1, y, x + w1 + w2, y + h), fill=(245, 245, 245), outline="black", width=4)
            draw_center(d, (x + w1, y, x + w1 + w2, y + h), f"Result: {result_val}", 38)
        else:
            draw_bar(d, x, y, w1, h, PALETTE["left"], f"Start: {start_val}")
            d.rectangle((x + w1, y, x + w1 + w2, y + h), fill=(245, 245, 245), outline="black", width=4)
            draw_center(d, (x + w1, y, x + w1 + w2, y + h), "Result: ?", 38)
        draw_center(d, (x + 320, y - 95, x + 860, y - 20), f"Change: {change_val}", 44)

    img.save(target, "JPEG", quality=95)


# ─── NEW DIAGRAM TYPES ─────────────────────────────────────────────────────

def draw_fraction_bar(problem, target: Path):
    """Segmented bar with coloured numerator portion."""
    # Try to parse e.g. "3/4" or "1/3" or "half"
    q = problem["question"]
    m = re.search(r"(\d+)\s*/\s*(\d+)", q)
    if m:
        numer, denom = int(m.group(1)), int(m.group(2))
    else:
        numer, denom = 1, 2  # default half

    numer = max(1, min(numer, denom))
    img = Image.new("RGB", (W, H), PALETTE["bg"])
    d = ImageDraw.Draw(img)

    x0, y0, total_w, bh = 200, 340, 1200, 160
    seg = total_w // denom

    for i in range(denom):
        sx = x0 + i * seg
        fill = PALETTE["left"] if i < numer else (220, 220, 220)
        d.rectangle((sx, y0, sx + seg, y0 + bh), fill=fill, outline=PALETTE["ink"], width=4)

    # Labels
    draw_center(d, (x0, y0, x0 + numer * seg, y0 + bh),
                f"{numer}/{denom}", 52, fill=(255, 255, 255))
    draw_center(d, (x0 + numer * seg, y0, x0 + total_w, y0 + bh),
                "rest", 40, fill=PALETTE["ink"])

    frac_label = f"{numer}/{denom} is shaded"
    lbl_font = fnt(48)
    bb = d.textbbox((0, 0), frac_label, font=lbl_font)
    d.text(((W - (bb[2] - bb[0])) // 2, y0 + bh + 60), frac_label,
           fill=PALETTE["ink"], font=lbl_font)

    img.save(target, "JPEG", quality=95)


def draw_rectangle(problem, target: Path, show="area"):
    """Labelled rectangle — shows area or perimeter formula."""
    nums = numbers(problem["question"])[:2] or [6, 4]
    if len(nums) < 2:
        nums = [nums[0], max(2, nums[0] // 2)]
    length, width = max(nums), min(nums)
    unit = parse_unit(problem["answer0"]) or "cm"
    # strip digits/² from unit
    unit = re.sub(r"[0-9²]", "", unit).strip() or "cm"

    img = Image.new("RGB", (W, H), PALETTE["bg"])
    d = ImageDraw.Draw(img)

    rx0, ry0, rx1, ry1 = 300, 220, 1300, 680
    d.rectangle((rx0, ry0, rx1, ry1), fill=PALETTE["light_blue"],
                outline=PALETTE["ink"], width=6)

    # Dimension labels
    top_label = f"{length} {unit}"
    side_label = f"{width} {unit}"
    lbl = fnt(54)
    bb = d.textbbox((0, 0), top_label, font=lbl)
    d.text(((rx0 + rx1 - (bb[2] - bb[0])) // 2, ry0 - 75), top_label,
           fill=PALETTE["ink"], font=lbl)
    bb2 = d.textbbox((0, 0), side_label, font=lbl)
    d.text((rx0 - bb2[2] - 20, (ry0 + ry1 - (bb2[3] - bb2[1])) // 2),
           side_label, fill=PALETTE["ink"], font=lbl)

    # Formula inside
    if show == "area":
        formula = f"Area = {length} × {width} = ?"
    else:
        formula = f"P = 2×({length}+{width}) = ?"
    draw_center(d, (rx0, ry0, rx1, ry1), formula, 54)

    img.save(target, "JPEG", quality=95)


def draw_triangle(problem, target: Path):
    """Right triangle with base and height labelled."""
    nums = numbers(problem["question"])[:2] or [8, 6]
    if len(nums) < 2:
        nums = [nums[0], max(2, nums[0] // 2)]
    base, height = max(nums), min(nums)
    unit = parse_unit(problem["answer0"]) or "cm"
    unit = re.sub(r"[0-9²]", "", unit).strip() or "cm"

    img = Image.new("RGB", (W, H), PALETTE["bg"])
    d = ImageDraw.Draw(img)

    # Triangle vertices: right angle at bottom-left
    ax, ay = 250, 720   # right-angle vertex
    bx, by = 1350, 720  # base end
    cx, cy = 250, 150   # top

    d.polygon([(ax, ay), (bx, by), (cx, cy)],
              fill=PALETTE["light_green"], outline=PALETTE["ink"])
    # Re-draw outline thicker
    for pts in [(ax, ay, bx, by), (bx, by, cx, cy), (cx, cy, ax, ay)]:
        d.line(pts, fill=PALETTE["ink"], width=6)

    # Right angle mark
    ra = 35
    d.rectangle((ax, ay - ra, ax + ra, ay), outline=PALETTE["ink"], width=4)

    lbl = fnt(52)
    # Base label
    bb = d.textbbox((0, 0), f"base = {base} {unit}", font=lbl)
    d.text(((ax + bx - (bb[2] - bb[0])) // 2, ay + 30),
           f"base = {base} {unit}", fill=PALETTE["ink"], font=lbl)
    # Height label
    bb2 = d.textbbox((0, 0), f"h = {height} {unit}", font=lbl)
    d.text((ax - bb2[2] - bb2[0] - 30, (ay + cy) // 2),
           f"h = {height} {unit}", fill=PALETTE["ink"], font=lbl)
    # Formula
    formula = f"Area = ½ × {base} × {height} = ?"
    draw_center(d, (450, 500, 1400, 680), formula, 50)

    img.save(target, "JPEG", quality=95)


def draw_circle(problem, target: Path, show="area"):
    """Circle with radius/diameter labelled."""
    nums = numbers(problem["question"])[:1] or [7]
    radius = nums[0]
    unit = parse_unit(problem["answer0"]) or "cm"
    unit = re.sub(r"[0-9²]", "", unit).strip() or "cm"

    img = Image.new("RGB", (W, H), PALETTE["bg"])
    d = ImageDraw.Draw(img)

    cx, cy, r = W // 2, H // 2, 300
    d.ellipse((cx - r, cy - r, cx + r, cy + r),
              fill=PALETTE["light_purple"], outline=PALETTE["ink"], width=6)

    # Radius line
    d.line((cx, cy, cx + r, cy), fill=PALETTE["ink"], width=5)
    lbl = fnt(50)
    d.text((cx + r // 2 - 30, cy + 20), f"r = {radius} {unit}",
           fill=PALETTE["ink"], font=lbl)
    # Centre dot
    d.ellipse((cx - 10, cy - 10, cx + 10, cy + 10), fill=PALETTE["ink"])

    if show == "area":
        formula = f"Area = π × r² = π × {radius}² = ?"
    else:
        formula = f"C = 2 × π × r = 2 × π × {radius} = ?"
    draw_center(d, (0, cy + r + 30, W, H - 20), formula, 50)

    img.save(target, "JPEG", quality=95)


def draw_number_line(problem, target: Path):
    """Number line with key values marked."""
    nums = sorted(set(numbers(problem["question"])[:4]))
    if not nums:
        nums = [0, 5, 10]
    lo, hi = nums[0], nums[-1]
    spread = max(hi - lo, 1)
    # Add some padding
    lo_draw = lo - spread // 5
    hi_draw = hi + spread // 5

    img = Image.new("RGB", (W, H), PALETTE["bg"])
    d = ImageDraw.Draw(img)

    lx, rx, y = 120, 1480, H // 2
    d.line((lx, y, rx, y), fill=PALETTE["ink"], width=6)
    # Arrowheads
    d.polygon([(rx, y), (rx - 30, y - 18), (rx - 30, y + 18)], fill=PALETTE["ink"])
    d.polygon([(lx, y), (lx + 30, y - 18), (lx + 30, y + 18)], fill=PALETTE["ink"])

    span = hi_draw - lo_draw or 1

    def x_pos(v):
        return int(lx + (v - lo_draw) / span * (rx - lx))

    lbl = fnt(46)
    for v in nums:
        xv = x_pos(v)
        d.line((xv, y - 25, xv, y + 25), fill=PALETTE["ink"], width=5)
        bb = d.textbbox((0, 0), str(v), font=lbl)
        d.text((xv - (bb[2] - bb[0]) // 2, y + 40), str(v),
               fill=PALETTE["ink"], font=lbl)

    # Mark question mark at answer position if there's a gap
    if len(nums) == 2:
        mid = (nums[0] + nums[1]) // 2
        xm = x_pos(mid)
        d.ellipse((xm - 20, y - 20, xm + 20, y + 20),
                  fill=PALETTE["right"], outline=PALETTE["ink"], width=4)
        qfnt = fnt(54)
        d.text((xm - 15, y - 75), "?", fill=PALETTE["right"], font=qfnt)

    img.save(target, "JPEG", quality=95)


def draw_clock(problem, target: Path):
    """Analogue clock face — reads time from question (HH:MM or 'N o'clock')."""
    q = problem["question"]
    hour, minute = 3, 0
    # "N o'clock"
    m = re.search(r"(\d{1,2})\s+o['\u2019]clock", q, re.I)
    if m:
        hour = int(m.group(1)) % 12
    else:
        # HH:MM
        m2 = re.search(r"(\d{1,2}):(\d{2})", q)
        if m2:
            hour, minute = int(m2.group(1)) % 12, int(m2.group(2))

    img = Image.new("RGB", (W, H), PALETTE["bg"])
    d = ImageDraw.Draw(img)

    cx, cy, r = W // 2, H // 2 - 30, 330
    # Face
    d.ellipse((cx - r, cy - r, cx + r, cy + r),
              fill=(245, 245, 245), outline=PALETTE["ink"], width=8)

    # Hour marks
    lbl = fnt(40)
    for h in range(1, 13):
        ang = math.radians(h * 30 - 90)
        xm = int(cx + (r - 55) * math.cos(ang))
        ym = int(cy + (r - 55) * math.sin(ang))
        bb = d.textbbox((0, 0), str(h), font=lbl)
        d.text((xm - (bb[2] - bb[0]) // 2, ym - (bb[3] - bb[1]) // 2),
               str(h), fill=PALETTE["ink"], font=lbl)

    # Hands
    m_ang = math.radians(minute * 6 - 90)
    h_ang = math.radians((hour + minute / 60) * 30 - 90)
    # Minute hand
    d.line((cx, cy,
            int(cx + (r - 80) * math.cos(m_ang)),
            int(cy + (r - 80) * math.sin(m_ang))),
           fill=PALETTE["left"], width=10)
    # Hour hand
    d.line((cx, cy,
            int(cx + (r - 140) * math.cos(h_ang)),
            int(cy + (r - 140) * math.sin(h_ang))),
           fill=PALETTE["ink"], width=14)
    # Centre dot
    d.ellipse((cx - 14, cy - 14, cx + 14, cy + 14), fill=PALETTE["ink"])

    # Time label
    time_str = f"{hour or 12}:{minute:02d}"
    draw_center(d, (0, cy + r + 30, W, H - 10), f"Time: {time_str}", 56)

    img.save(target, "JPEG", quality=95)


def draw_bar_chart(problem, target: Path):
    """Simple bar chart (2–4 bars) parsed from question numbers."""
    nums = numbers(problem["question"])
    if not nums:
        nums = [8, 5, 12]
    bars = nums[:4]
    max_val = max(bars)

    img = Image.new("RGB", (W, H), PALETTE["bg"])
    d = ImageDraw.Draw(img)

    chart_x0, chart_y0, chart_x1, chart_y1 = 200, 100, 1400, 720
    bar_colors = [PALETTE["left"], PALETTE["right"], PALETTE["extra"], PALETTE["whole"]]

    n = len(bars)
    bar_w = (chart_x1 - chart_x0) // (n * 2)
    gap = bar_w

    # Axes
    d.line((chart_x0, chart_y1, chart_x1, chart_y1), fill=PALETTE["ink"], width=5)
    d.line((chart_x0, chart_y0, chart_x0, chart_y1), fill=PALETTE["ink"], width=5)

    lbl = fnt(44)
    for i, val in enumerate(bars):
        bx = chart_x0 + gap + i * (bar_w + gap)
        bar_h = int((val / max_val) * (chart_y1 - chart_y0 - 40))
        by0 = chart_y1 - bar_h
        d.rectangle((bx, by0, bx + bar_w, chart_y1),
                     fill=bar_colors[i % 4], outline=PALETTE["ink"], width=3)
        # Value on top
        bb = d.textbbox((0, 0), str(val), font=lbl)
        d.text((bx + (bar_w - (bb[2] - bb[0])) // 2, by0 - 55),
               str(val), fill=PALETTE["ink"], font=lbl)
        # Category label (A, B, C…)
        cat = chr(65 + i)
        bb2 = d.textbbox((0, 0), cat, font=lbl)
        d.text((bx + (bar_w - (bb2[2] - bb2[0])) // 2, chart_y1 + 20),
               cat, fill=PALETTE["ink"], font=lbl)

    draw_center(d, (0, chart_y1 + 80, W, H - 10), "Which bar is tallest? What is the total?", 42)

    img.save(target, "JPEG", quality=95)


def draw_coordinate_grid(problem, target: Path):
    """Simple 2-quadrant coordinate grid, x-axis −5 to 10, y-axis −5 to 10."""
    img = Image.new("RGB", (W, H), PALETTE["bg"])
    d = ImageDraw.Draw(img)

    # Grid bounds
    x_min, x_max = -5, 10
    y_min, y_max = -5, 10

    pad_l, pad_r, pad_t, pad_b = 160, 80, 80, 120
    gw = W - pad_l - pad_r
    gh = H - pad_t - pad_b

    def to_px(x, y):
        px = int(pad_l + (x - x_min) / (x_max - x_min) * gw)
        py = int(pad_t + (y_max - y) / (y_max - y_min) * gh)
        return px, py

    # Grid lines
    for x in range(x_min, x_max + 1):
        px, _ = to_px(x, 0)
        _, py0 = to_px(0, y_max)
        _, py1 = to_px(0, y_min)
        d.line((px, py0, px, py1), fill=(200, 200, 200), width=2)
    for y in range(y_min, y_max + 1):
        _, py = to_px(0, y)
        px0, _ = to_px(x_min, 0)
        px1, _ = to_px(x_max, 0)
        d.line((px0, py, px1, py), fill=(200, 200, 200), width=2)

    # Axes
    ox, oy = to_px(0, 0)
    px_xmax, _ = to_px(x_max, 0)
    px_xmin, _ = to_px(x_min, 0)
    _, py_ymax = to_px(0, y_max)
    _, py_ymin = to_px(0, y_min)
    d.line((px_xmin, oy, px_xmax, oy), fill=PALETTE["ink"], width=4)
    d.line((ox, py_ymin, ox, py_ymax), fill=PALETTE["ink"], width=4)

    # Tick labels
    lbl = fnt(34)
    for x in range(x_min, x_max + 1):
        if x == 0:
            continue
        px, _ = to_px(x, 0)
        bb = d.textbbox((0, 0), str(x), font=lbl)
        d.text((px - (bb[2] - bb[0]) // 2, oy + 12), str(x),
               fill=PALETTE["ink"], font=lbl)
    for y in range(y_min, y_max + 1):
        if y == 0:
            continue
        _, py = to_px(0, y)
        bb = d.textbbox((0, 0), str(y), font=lbl)
        d.text((ox + 10, py - (bb[3] - bb[1]) // 2), str(y),
               fill=PALETTE["ink"], font=lbl)

    # Axis labels
    x_lbl = fnt(40)
    d.text((W - 60, oy - 20), "x", fill=PALETTE["ink"], font=x_lbl)
    d.text((ox + 15, 30), "y", fill=PALETTE["ink"], font=x_lbl)
    # Origin
    d.text((ox + 10, oy + 10), "O", fill=PALETTE["ink"], font=lbl)

    img.save(target, "JPEG", quality=95)


def draw_pythagoras(problem, target: Path):
    """Right triangle with sides a, b, c and Pythagoras formula."""
    nums = numbers(problem["question"])[:3]
    while len(nums) < 2:
        nums.append(nums[-1] + 3 if nums else 3)
    a, b = nums[0], nums[1]
    c_label = nums[2] if len(nums) > 2 else "?"

    img = Image.new("RGB", (W, H), PALETTE["bg"])
    d = ImageDraw.Draw(img)

    # Right-angle at bottom-left
    ax, ay = 200, 730
    bx, by = 1400, 730
    cx, cy = 200, 150

    d.polygon([(ax, ay), (bx, by), (cx, cy)],
              fill=PALETTE["light_orange"], outline=PALETTE["ink"])
    for start, end in [(ax, ay, bx, by), (bx, by, cx, cy), (cx, cy, ax, ay)]:
        d.line((start, end), fill=PALETTE["ink"], width=7)

    # Right angle mark
    ra = 38
    d.rectangle((ax, ay - ra, ax + ra, ay), outline=PALETTE["ink"], width=5)

    lbl = fnt(52)
    # b — horizontal base
    bb = d.textbbox((0, 0), f"b = {b}", font=lbl)
    d.text(((ax + bx - (bb[2] - bb[0])) // 2, ay + 35),
           f"b = {b}", fill=PALETTE["ink"], font=lbl)
    # a — vertical side
    bb2 = d.textbbox((0, 0), f"a = {a}", font=lbl)
    d.text((ax - bb2[2] - 30, (ay + cy) // 2),
           f"a = {a}", fill=PALETTE["ink"], font=lbl)
    # c — hypotenuse (mid-point of hypotenuse slanted)
    mx, my = (bx + cx) // 2 + 60, (by + cy) // 2
    d.text((mx, my), f"c = {c_label}", fill=PALETTE["red"], font=lbl)

    formula = f"c² = a² + b²  →  c² = {a}² + {b}²  →  c = ?"
    draw_center(d, (0, H - 130, W, H - 20), formula, 48)

    img.save(target, "JPEG", quality=95)


# ─── ROUTING ───────────────────────────────────────────────────────────────

def draw_problem(problem, out_path: Path):
    kind = problem["type"].strip().lower()

    # Skip if no diagram requested
    bar = problem.get("bar_model", "").strip()
    if kind == "no_diagram" or bar == "":
        return  # caller will not increment generated count

    if kind == "comparison":
        draw_comparison(problem, out_path)
    elif kind == "missing_part":
        draw_missing(problem, out_path)
    elif kind == "groups":
        draw_groups(problem, out_path)
    elif kind == "before_after":
        draw_before_after(problem, out_path)
    elif kind == "fraction_bar":
        draw_fraction_bar(problem, out_path)
    elif kind in ("rectangle_area", "rectangle_perimeter"):
        draw_rectangle(problem, out_path, show="area" if kind == "rectangle_area" else "perimeter")
    elif kind == "triangle_area":
        draw_triangle(problem, out_path)
    elif kind in ("circle_area", "circle_circumference"):
        draw_circle(problem, out_path, show="area" if kind == "circle_area" else "circumference")
    elif kind == "number_line":
        draw_number_line(problem, out_path)
    elif kind == "clock_time":
        draw_clock(problem, out_path)
    elif kind == "bar_chart":
        draw_bar_chart(problem, out_path)
    elif kind == "coordinate_grid":
        draw_coordinate_grid(problem, out_path)
    elif kind == "pythagoras":
        draw_pythagoras(problem, out_path)
    else:
        # Default: part_whole covers addition, subtraction, part_whole
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
