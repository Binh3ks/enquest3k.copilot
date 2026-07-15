from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

W, H = 1600, 900
OUT_BASE = Path("public/images")
FONT_PATH = "/System/Library/Fonts/Supplemental/Arial.ttf"

PALETTE = {
    "top": (58, 120, 230),
    "bottom": (245, 152, 66),
    "whole": (121, 94, 208),
    "left": (72, 172, 95),
    "right": (74, 171, 165),
    "light": (238, 242, 248),
    "ink": (20, 20, 20),
}


def font(size: int):
    return ImageFont.truetype(FONT_PATH, size)


def fit_font(draw: ImageDraw.ImageDraw, text: str, max_width: int, max_size: int, min_size: int = 34):
    for size in range(max_size, min_size - 1, -2):
        f = font(size)
        bbox = draw.textbbox((0, 0), text, font=f)
        if bbox[2] - bbox[0] <= max_width:
            return f
    return font(min_size)


def center_text(draw: ImageDraw.ImageDraw, box, text: str, max_size=64, fill=PALETTE["ink"], min_size=34):
    x0, y0, x1, y1 = box
    f = fit_font(draw, text, (x1 - x0) - 20, max_size, min_size=min_size)
    bbox = draw.textbbox((0, 0), text, font=f)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    x = x0 + ((x1 - x0) - tw) // 2
    y = y0 + ((y1 - y0) - th) // 2
    draw.text((x, y), text, font=f, fill=fill)


def draw_bar(draw: ImageDraw.ImageDraw, x, y, w, h, color, label, text_fill=(255, 255, 255), max_size=64, min_size=34):
    draw.rectangle((x, y, x + w, y + h), fill=color, outline="black", width=4)
    center_text(draw, (x, y, x + w, y + h), label, max_size=max_size, fill=text_fill, min_size=min_size)


def save(img: Image.Image, folder: str, filename: str):
    out = OUT_BASE / folder
    out.mkdir(parents=True, exist_ok=True)
    img.save(out / filename, "JPEG", quality=95)


def draw_comparison(spec):
    img = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(img)

    x = 90
    y_top = 150
    y_bot = 430
    bh = 140
    target_w = 1280
    max_val = max(spec["top_val"], spec["bot_val"])
    top_w = int(target_w * (spec["top_val"] / max_val))
    bot_w = int(target_w * (spec["bot_val"] / max_val))
    top_w = max(560, top_w)
    bot_w = max(420, bot_w)

    draw_bar(d, x, y_top, top_w, bh, PALETTE["top"], spec["top_text"])
    draw_bar(d, x, y_bot, bot_w, bh, PALETTE["bottom"], spec["bot_text"])

    x0 = x + bot_w + 12
    x1 = x + top_w
    yb = y_bot + bh // 2
    d.line((x0, yb, x1, yb), fill="black", width=5)
    d.line((x0, yb - 30, x0, yb + 30), fill="black", width=5)
    d.line((x1, yb - 30, x1, yb + 30), fill="black", width=5)

    qf = fit_font(d, spec["q_text"], 560, 70, 40)
    d.text((x0 + 30, yb + 42), spec["q_text"], font=qf, fill=PALETTE["ink"])
    save(img, spec["folder"], spec["filename"])


def draw_part_whole(spec):
    img = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(img)

    x = 90
    y_top = 140
    y_bot = 430
    bh = 140
    total_w = 1280
    total_val = spec["left_val"] + spec["right_val"]
    lw = int(total_w * (spec["left_val"] / total_val))
    rw = total_w - lw
    tw = total_w

    draw_bar(d, x, y_top, tw, bh, PALETTE["whole"], spec.get("total_text", "Total: ?"), max_size=72, min_size=44)
    draw_bar(d, x, y_bot, lw, bh, PALETTE["left"], spec["left_text"], max_size=64, min_size=34)
    draw_bar(d, x + lw, y_bot, rw, bh, PALETTE["right"], spec["right_text"], max_size=64, min_size=34)

    d.line((x, y_top + bh + 42, x + tw, y_top + bh + 42), fill="black", width=5)
    d.line((x, y_top + bh + 20, x, y_top + bh + 64), fill="black", width=5)
    d.line((x + tw, y_top + bh + 20, x + tw, y_top + bh + 64), fill="black", width=5)
    save(img, spec["folder"], spec["filename"])


def draw_missing(spec):
    img = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(img)

    x = 90
    y_top = 140
    y_bot = 430
    bh = 140
    whole_w = 1280
    known_w = int(whole_w * (spec["known_val"] / spec["whole_val"]))
    unknown_w = whole_w - known_w
    known_w = max(420, known_w)
    unknown_w = max(280, unknown_w)
    whole_w = known_w + unknown_w

    draw_bar(d, x, y_top, whole_w, bh, PALETTE["whole"], spec["whole_text"], max_size=72, min_size=44)
    draw_bar(d, x, y_bot, known_w, bh, PALETTE["left"], spec["known_text"], max_size=64, min_size=34)
    d.rectangle((x + known_w, y_bot, x + known_w + unknown_w, y_bot + bh), fill="white", outline="black", width=4)
    center_text(d, (x + known_w, y_bot, x + known_w + unknown_w, y_bot + bh), spec["unknown_text"], max_size=64, min_size=40)

    d.line((x, y_top + bh + 42, x + whole_w, y_top + bh + 42), fill="black", width=5)
    d.line((x, y_top + bh + 20, x, y_top + bh + 64), fill="black", width=5)
    d.line((x + whole_w, y_top + bh + 20, x + whole_w, y_top + bh + 64), fill="black", width=5)
    save(img, spec["folder"], spec["filename"])


def draw_multiplication(spec):
    img = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(img)

    x0, x1 = 90, 1510
    groups = spec["groups"]
    each_label = spec["each_text"]

    if groups <= 10:
        y0, y1 = 250, 430
        seg = (x1 - x0) / groups
        for i in range(groups):
            sx0 = int(x0 + i * seg)
            sx1 = int(x0 + (i + 1) * seg)
            color = PALETTE["top"] if i % 2 == 0 else PALETTE["right"]
            d.rectangle((sx0, y0, sx1, y1), fill=color, outline="black", width=3)
            center_text(d, (sx0, y0, sx1, y1), each_label, max_size=52, fill=(255, 255, 255), min_size=30)
    else:
        # Two-row layout for readability when there are many groups.
        per_row = groups // 2
        y0a, y1a = 200, 340
        y0b, y1b = 380, 520
        seg = (x1 - x0) / per_row
        for row, (yy0, yy1) in enumerate(((y0a, y1a), (y0b, y1b))):
            for i in range(per_row):
                idx = row * per_row + i
                sx0 = int(x0 + i * seg)
                sx1 = int(x0 + (i + 1) * seg)
                color = PALETTE["top"] if idx % 2 == 0 else PALETTE["right"]
                d.rectangle((sx0, yy0, sx1, yy1), fill=color, outline="black", width=3)
                center_text(d, (sx0, yy0, sx1, yy1), each_label, max_size=44, fill=(255, 255, 255), min_size=28)
        y1 = y1b

    yb = y1 + 65
    d.line((x0, yb, x1, yb), fill="black", width=5)
    d.line((x0, yb - 25, x0, yb + 25), fill="black", width=5)
    d.line((x1, yb - 25, x1, yb + 25), fill="black", width=5)
    center_text(d, (x0, yb + 30, x1, yb + 130), spec["total_text"], max_size=72, min_size=44)
    save(img, spec["folder"], spec["filename"])


def draw_equal_half(spec):
    img = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(img)

    x = 90
    y_top = 160
    y_bot = 430
    bh = 140
    total_w = 1280
    half = total_w // 2

    draw_bar(d, x, y_top, total_w, bh, PALETTE["whole"], spec["whole_text"], max_size=72, min_size=44)
    draw_bar(d, x, y_bot, half, bh, PALETTE["left"], spec["unknown_text"], max_size=64, min_size=40)
    draw_bar(d, x + half, y_bot, half, bh, PALETTE["light"], spec["known_text"], text_fill=PALETTE["ink"], max_size=64, min_size=34)
    save(img, spec["folder"], spec["filename"])


def specs():
    s = []

    # Week 16 easy v2
    s += [
        {"kind": "part_whole", "folder": "week16", "filename": "barmodel_w16_easy_p1_v3.jpg", "left_text": "Red balls: 3", "left_val": 3, "right_text": "Blue balls: 2", "right_val": 2},
        {"kind": "comparison", "folder": "week16", "filename": "barmodel_w16_easy_p2_v3.jpg", "top_text": "Tom: 6 goals", "top_val": 6, "bot_text": "Lisa: 4 goals", "bot_val": 4, "q_text": "Difference: ?"},
        {"kind": "missing", "folder": "week16", "filename": "barmodel_w16_easy_p3_v3.jpg", "whole_text": "Total: 8 players", "whole_val": 8, "known_text": "Have: 5 players", "known_val": 5, "unknown_text": "Need: ?"},
        {"kind": "part_whole", "folder": "week16", "filename": "barmodel_w16_easy_p4_v3.jpg", "left_text": "1st Half: 2 goals", "left_val": 2, "right_text": "2nd Half: 3 goals", "right_val": 3},
        {"kind": "comparison", "folder": "week16", "filename": "barmodel_w16_easy_p5_v3.jpg", "top_text": "Red team: 9 points", "top_val": 9, "bot_text": "Blue team: 7 points", "bot_val": 7, "q_text": "Difference: ?"},
    ]

    # Week 16 adv v2
    s += [
        {"kind": "part_whole", "folder": "week16", "filename": "barmodel_w16_adv_p1_v3.jpg", "left_text": "Team A: 5 players", "left_val": 5, "right_text": "Team B: 6 players", "right_val": 6},
        {"kind": "comparison", "folder": "week16", "filename": "barmodel_w16_adv_p2_v3.jpg", "top_text": "Tom: 8 goals", "top_val": 8, "bot_text": "Lisa: 5 goals", "bot_val": 5, "q_text": "More: ?"},
        {"kind": "missing", "folder": "week16", "filename": "barmodel_w16_adv_p3_v3.jpg", "whole_text": "Need: 11 players", "whole_val": 11, "known_text": "Have: 7 players", "known_val": 7, "unknown_text": "Missing: ?"},
        {"kind": "part_whole", "folder": "week16", "filename": "barmodel_w16_adv_p4_v3.jpg", "left_text": "1st Half: 3 goals", "left_val": 3, "right_text": "2nd Half: 2 goals", "right_val": 2},
        {"kind": "comparison", "folder": "week16", "filename": "barmodel_w16_adv_p5_v3.jpg", "top_text": "Red team: 12 points", "top_val": 12, "bot_text": "Blue team: 9 points", "bot_val": 9, "q_text": "More: ?"},
    ]

    # Week 17 easy v2
    s += [
        {"kind": "part_whole", "folder": "week17", "filename": "barmodel_w17_easy_p1_v3.jpg", "left_text": "Lily: 2 umbrellas", "left_val": 2, "right_text": "Mom: 3 umbrellas", "right_val": 3},
        {"kind": "comparison", "folder": "week17", "filename": "barmodel_w17_easy_p2_v3.jpg", "top_text": "Week 2: 6 days", "top_val": 6, "bot_text": "Week 1: 4 days", "bot_val": 4, "q_text": "More: ?"},
        {"kind": "missing", "folder": "week17", "filename": "barmodel_w17_easy_p3_v3.jpg", "whole_text": "Total: 5 coats", "whole_val": 5, "known_text": "Blue coats: 3", "known_val": 3, "unknown_text": "Red coats: ?"},
        {"kind": "part_whole", "folder": "week17", "filename": "barmodel_w17_easy_p4_v3.jpg", "left_text": "Tim: 2 hats", "left_val": 2, "right_text": "Sister: 1 hat", "right_val": 1},
        {"kind": "comparison", "folder": "week17", "filename": "barmodel_w17_easy_p5_v3.jpg", "top_text": "Class A: 7 boots", "top_val": 7, "bot_text": "Class B: 4 boots", "bot_val": 4, "q_text": "Fewer: ?"},
    ]

    # Week 17 adv v2
    s += [
        {"kind": "part_whole", "folder": "week17", "filename": "barmodel_w17_adv_p1_v3.jpg", "left_text": "Umbrellas: 3", "left_val": 3, "right_text": "Coats: 4", "right_val": 4},
        {"kind": "comparison", "folder": "week17", "filename": "barmodel_w17_adv_p2_v3.jpg", "top_text": "January: 8 days", "top_val": 8, "bot_text": "February: 5 days", "bot_val": 5, "q_text": "More: ?"},
        {"kind": "missing", "folder": "week17", "filename": "barmodel_w17_adv_p3_v3.jpg", "whole_text": "Need: 20 umbrellas", "whole_val": 20, "known_text": "Have: 13 umbrellas", "known_val": 13, "unknown_text": "Need more: ?"},
        {"kind": "part_whole", "folder": "week17", "filename": "barmodel_w17_adv_p4_v3.jpg", "left_text": "Monday: 4 cm", "left_val": 4, "right_text": "Tuesday: 6 cm", "right_val": 6},
        {"kind": "comparison", "folder": "week17", "filename": "barmodel_w17_adv_p5_v3.jpg", "top_text": "City A: 15 days", "top_val": 15, "bot_text": "City B: 9 days", "bot_val": 9, "q_text": "More: ?"},
    ]

    # Week 18 easy v2
    s += [
        {"kind": "part_whole", "folder": "week18", "filename": "barmodel_w18_easy_p1_v3.jpg", "left_text": "Alex: 2 mics", "left_val": 2, "right_text": "Mom: 3 mics", "right_val": 3},
        {"kind": "comparison", "folder": "week18", "filename": "barmodel_w18_easy_p2_v3.jpg", "top_text": "Alex: 8 reports", "top_val": 8, "bot_text": "Friend: 5 reports", "bot_val": 5, "q_text": "More: ?"},
        {"kind": "missing", "folder": "week18", "filename": "barmodel_w18_easy_p3_v3.jpg", "whole_text": "Total: 12 seats", "whole_val": 12, "known_text": "Sitting: 7", "known_val": 7, "unknown_text": "Empty: ?"},
        {"kind": "part_whole", "folder": "week18", "filename": "barmodel_w18_easy_p4_v3.jpg", "left_text": "Monday: 4 people", "left_val": 4, "right_text": "Tuesday: 6 people", "right_val": 6},
        {"kind": "comparison", "folder": "week18", "filename": "barmodel_w18_easy_p5_v3.jpg", "top_text": "Last week: 9 videos", "top_val": 9, "bot_text": "This week: 6 videos", "bot_val": 6, "q_text": "More: ?"},
    ]

    # Week 18 adv v2
    s += [
        {"kind": "part_whole", "folder": "week18", "filename": "barmodel_w18_adv_p1_v3.jpg", "left_text": "Alex: 4 mics", "left_val": 4, "right_text": "Teacher: 3 mics", "right_val": 3},
        {"kind": "comparison", "folder": "week18", "filename": "barmodel_w18_adv_p2_v3.jpg", "top_text": "Room 5: 10 reports", "top_val": 10, "bot_text": "Room 6: 6 reports", "bot_val": 6, "q_text": "More: ?"},
        {"kind": "missing", "folder": "week18", "filename": "barmodel_w18_adv_p3_v3.jpg", "whole_text": "Need: 18 chairs", "whole_val": 18, "known_text": "Have: 11 chairs", "known_val": 11, "unknown_text": "Need more: ?"},
        {"kind": "part_whole", "folder": "week18", "filename": "barmodel_w18_adv_p4_v3.jpg", "left_text": "Monday: 5 reporters", "left_val": 5, "right_text": "Tuesday: 7 reporters", "right_val": 7},
        {"kind": "comparison", "folder": "week18", "filename": "barmodel_w18_adv_p5_v3.jpg", "top_text": "Reporter A: 9 interviews", "top_val": 9, "bot_text": "Reporter B: 5 interviews", "bot_val": 5, "q_text": "More: ?"},
    ]

    # Week 19 easy v6
    s += [
        {"kind": "comparison", "folder": "week19", "filename": "barmodel_w19_easy_p1_v7.jpg", "top_text": "Now: 7 years old", "top_val": 7, "bot_text": "Then: 3 years old", "bot_val": 3, "q_text": "Years passed: ?"},
        {"kind": "comparison", "folder": "week19", "filename": "barmodel_w19_easy_p2_v7.jpg", "top_text": "Now: 80 cm", "top_val": 8, "bot_text": "Baby: 50 cm", "bot_val": 5, "q_text": "Growth: ? cm"},
        {"kind": "multiplication", "folder": "week19", "filename": "barmodel_w19_easy_p3_v7.jpg", "groups": 10, "each_text": "2 photos", "total_text": "Total: ?"},
        {"kind": "part_whole", "folder": "week19", "filename": "barmodel_w19_easy_p4_v7.jpg", "left_text": "Mom: 5 photos", "left_val": 5, "right_text": "Dad: 4 photos", "right_val": 4},
        {"kind": "comparison", "folder": "week19", "filename": "barmodel_w19_easy_p5_v7.jpg", "top_text": "Me: 5 years old", "top_val": 5, "bot_text": "Brother: 3 years old", "bot_val": 3, "q_text": "Older by: ?"},
    ]

    # Week 19 adv v3
    s += [
        {"kind": "comparison", "folder": "week19", "filename": "barmodel_w19_adv_p1_v4.jpg", "top_text": "Now: 8 years old", "top_val": 8, "bot_text": "Then: 3 years old", "bot_val": 3, "q_text": "Years passed: ?"},
        {"kind": "comparison", "folder": "week19", "filename": "barmodel_w19_adv_p2_v4.jpg", "top_text": "Now: 120 cm", "top_val": 12, "bot_text": "Baby: 50 cm", "bot_val": 5, "q_text": "Growth: ? cm"},
        {"kind": "multiplication", "folder": "week19", "filename": "barmodel_w19_adv_p3_v4.jpg", "groups": 20, "each_text": "3 photos", "total_text": "Total: ?"},
        {"kind": "part_whole", "folder": "week19", "filename": "barmodel_w19_adv_p4_v4.jpg", "left_text": "Mom: 8 photos", "left_val": 8, "right_text": "Dad: 7 photos", "right_val": 7},
        {"kind": "comparison", "folder": "week19", "filename": "barmodel_w19_adv_p5_v4.jpg", "top_text": "Me: 5 years old", "top_val": 5, "bot_text": "Brother: 3 years old", "bot_val": 3, "q_text": "Older by: ?"},
    ]

    # Week 20 easy v4
    s += [
        {"kind": "missing", "folder": "week20", "filename": "barmodel_w20_easy_p1_v5.jpg", "whole_text": "Before: 8 trees", "whole_val": 8, "known_text": "Cut down: 3", "known_val": 3, "unknown_text": "Left: ?"},
        {"kind": "part_whole", "folder": "week20", "filename": "barmodel_w20_easy_p2_v5.jpg", "left_text": "Old buildings: 5", "left_val": 5, "right_text": "New buildings: 4", "right_val": 4},
        {"kind": "comparison", "folder": "week20", "filename": "barmodel_w20_easy_p3_v5.jpg", "top_text": "New bridge: 35 m", "top_val": 7, "bot_text": "Old bridge: 20 m", "bot_val": 4, "q_text": "Longer by: ?"},
        {"kind": "multiplication", "folder": "week20", "filename": "barmodel_w20_easy_p4_v5.jpg", "groups": 6, "each_text": "4 people", "total_text": "Total: ?"},
        {"kind": "equal_half", "folder": "week20", "filename": "barmodel_w20_easy_p5_v5.jpg", "whole_text": "Total trees: 12", "known_text": "Other trees: 6", "unknown_text": "Near river: ?"},
    ]

    # Week 20 adv v3
    s += [
        {"kind": "part_whole", "folder": "week20", "filename": "barmodel_w20_adv_p1_v4.jpg", "left_text": "Old buildings: 15", "left_val": 15, "right_text": "New buildings: 8", "right_val": 8},
        {"kind": "comparison", "folder": "week20", "filename": "barmodel_w20_adv_p2_v4.jpg", "top_text": "New bridge: 75 m", "top_val": 15, "bot_text": "Old bridge: 30 m", "bot_val": 6, "q_text": "Longer by: ?"},
        {"kind": "multiplication", "folder": "week20", "filename": "barmodel_w20_adv_p3_v4.jpg", "groups": 4, "each_text": "12 stalls", "total_text": "Total: ?"},
        {"kind": "missing", "folder": "week20", "filename": "barmodel_w20_adv_p4_v4.jpg", "whole_text": "Total: 24 buildings", "whole_val": 24, "known_text": "Saved: 9", "known_val": 9, "unknown_text": "Demolished: ?"},
        {"kind": "multiplication", "folder": "week20", "filename": "barmodel_w20_adv_p5_v4.jpg", "groups": 2, "each_text": "6 trees", "total_text": "Total: ?"},
    ]

    # Week 21 easy v3
    s += [
        {"kind": "part_whole", "folder": "week21", "filename": "barmodel_w21_easy_p1_v4.jpg", "left_text": "Circles: 3", "left_val": 3, "right_text": "Squares: 4", "right_val": 4},
        {"kind": "comparison", "folder": "week21", "filename": "barmodel_w21_easy_p2_v4.jpg", "top_text": "Anna: 8 pages", "top_val": 8, "bot_text": "Ben: 5 pages", "bot_val": 5, "q_text": "More: ?"},
        {"kind": "part_whole", "folder": "week21", "filename": "barmodel_w21_easy_p3_v4.jpg", "left_text": "Morning: 2 dishes", "left_val": 2, "right_text": "Evening: 3 dishes", "right_val": 3},
        {"kind": "part_whole", "folder": "week21", "filename": "barmodel_w21_easy_p4_v4.jpg", "left_text": "Park: 4 blocks", "left_val": 4, "right_text": "Shop: 2 blocks", "right_val": 2},
        {"kind": "comparison", "folder": "week21", "filename": "barmodel_w21_easy_p5_v4.jpg", "top_text": "Me: 9 min", "top_val": 9, "bot_text": "Sister: 6 min", "bot_val": 6, "q_text": "More: ?"},
    ]

    # Week 21 adv v3
    s += [
        {"kind": "part_whole", "folder": "week21", "filename": "barmodel_w21_adv_p1_v4.jpg", "left_text": "Circles: 4", "left_val": 4, "right_text": "Rectangles: 3", "right_val": 3},
        {"kind": "comparison", "folder": "week21", "filename": "barmodel_w21_adv_p2_v4.jpg", "top_text": "Squares: 8", "top_val": 8, "bot_text": "Triangles: 5", "bot_val": 5, "q_text": "More: ?"},
        {"kind": "part_whole", "folder": "week21", "filename": "barmodel_w21_adv_p3_v4.jpg", "left_text": "Circle plates: 4", "left_val": 4, "right_text": "Square platters: 3", "right_val": 3},
        {"kind": "part_whole", "folder": "week21", "filename": "barmodel_w21_adv_p4_v4.jpg", "left_text": "Triangle leaves: 5", "left_val": 5, "right_text": "Round stones: 4", "right_val": 4},
        {"kind": "comparison", "folder": "week21", "filename": "barmodel_w21_adv_p5_v4.jpg", "top_text": "Circles: 9", "top_val": 9, "bot_text": "Rectangles: 6", "bot_val": 6, "q_text": "More: ?"},
    ]

    return s


def main():
    all_specs = specs()
    for spec in all_specs:
        kind = spec["kind"]
        if kind == "comparison":
            draw_comparison(spec)
        elif kind == "part_whole":
            draw_part_whole(spec)
        elif kind == "missing":
            draw_missing(spec)
        elif kind == "multiplication":
            draw_multiplication(spec)
        elif kind == "equal_half":
            draw_equal_half(spec)
        else:
            raise ValueError(f"Unsupported kind: {kind}")

    print(f"Generated {len(all_specs)} bar model images for weeks 16-21.")


if __name__ == "__main__":
    main()
