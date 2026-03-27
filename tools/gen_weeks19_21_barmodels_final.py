from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

W, H = 1280, 720
OUT_BASE = Path("public/images")
FONT_PATH = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BIG = ImageFont.truetype(FONT_PATH, 44)
FONT_MED = ImageFont.truetype(FONT_PATH, 34)
FONT_SMALL = ImageFont.truetype(FONT_PATH, 26)

PALETTE = {
    "blue": (61, 133, 242),
    "orange": (245, 151, 63),
    "green": (87, 176, 98),
    "purple": (142, 99, 214),
    "teal": (64, 171, 165),
    "yellow": (240, 196, 75),
    "red": (220, 86, 84),
    "gray": (236, 240, 246),
}


def centered_text(draw, box, text, font, fill=(20, 20, 20)):
    x0, y0, x1, y1 = box
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    x = x0 + (x1 - x0 - tw) // 2
    y = y0 + (y1 - y0 - th) // 2
    draw.text((x, y), text, font=font, fill=fill)


def draw_bar(draw, x, y, w, h, color, text, text_fill=(255, 255, 255), font=FONT_MED):
    draw.rectangle((x, y, x + w, y + h), fill=color, outline="black", width=3)
    centered_text(draw, (x, y, x + w, y + h), text, font, fill=text_fill)


def draw_comparison(img_name, folder, top_label, top_val, bot_label, bot_val, q_label):
    img = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(img)

    x = 120
    y_top = 190
    h = 92
    y_bot = 360
    scale = 86
    top_w = int(top_val * scale)
    bot_w = int(bot_val * scale)

    draw_bar(d, x, y_top, top_w, h, PALETTE["blue"], top_label)
    draw_bar(d, x, y_bot, bot_w, h, PALETTE["orange"], bot_label)

    x0 = x + bot_w
    x1 = x + top_w
    by = y_bot + h // 2
    d.line((x0 + 10, by, x1, by), fill="black", width=4)
    d.line((x0 + 10, by - 24, x0 + 10, by + 24), fill="black", width=4)
    d.line((x1, by - 24, x1, by + 24), fill="black", width=4)
    d.text((x0 + 30, by + 34), q_label, font=FONT_BIG, fill=(20, 20, 20))

    (OUT_BASE / folder).mkdir(parents=True, exist_ok=True)
    img.save(OUT_BASE / folder / img_name, "JPEG", quality=95)


def draw_part_whole(img_name, folder, left_label, left_val, right_label, right_val, total_label="Total: ?"):
    img = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(img)

    x = 120
    y_top = 170
    y_bot = 360
    h = 92
    scale = 72
    left_w = int(left_val * scale)
    right_w = int(right_val * scale)
    total_w = left_w + right_w

    draw_bar(d, x, y_top, total_w, h, PALETTE["purple"], total_label)
    draw_bar(d, x, y_bot, left_w, h, PALETTE["green"], left_label)
    draw_bar(d, x + left_w, y_bot, right_w, h, PALETTE["teal"], right_label)

    d.line((x, y_top + h + 35, x + total_w, y_top + h + 35), fill="black", width=4)
    d.line((x, y_top + h + 18, x, y_top + h + 53), fill="black", width=4)
    d.line((x + total_w, y_top + h + 18, x + total_w, y_top + h + 53), fill="black", width=4)

    (OUT_BASE / folder).mkdir(parents=True, exist_ok=True)
    img.save(OUT_BASE / folder / img_name, "JPEG", quality=95)


def draw_part_whole_missing(img_name, folder, whole_label, known_label, known_val, unknown_label, whole_val):
    img = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(img)

    x = 120
    y_top = 170
    y_bot = 360
    h = 92
    scale = 64
    whole_w = int(whole_val * scale)
    known_w = int(known_val * scale)
    unknown_w = max(220, whole_w - known_w)

    draw_bar(d, x, y_top, whole_w, h, PALETTE["purple"], whole_label)
    draw_bar(d, x, y_bot, known_w, h, PALETTE["green"], known_label)
    d.rectangle((x + known_w, y_bot, x + known_w + unknown_w, y_bot + h), fill="white", outline="black", width=3)
    centered_text(d, (x + known_w, y_bot, x + known_w + unknown_w, y_bot + h), unknown_label, FONT_MED)

    d.line((x, y_top + h + 35, x + whole_w, y_top + h + 35), fill="black", width=4)
    d.line((x, y_top + h + 18, x, y_top + h + 53), fill="black", width=4)
    d.line((x + whole_w, y_top + h + 18, x + whole_w, y_top + h + 53), fill="black", width=4)

    (OUT_BASE / folder).mkdir(parents=True, exist_ok=True)
    img.save(OUT_BASE / folder / img_name, "JPEG", quality=95)


def draw_multiplication(img_name, folder, groups, each_text, total_label):
    img = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(img)

    x0 = 80
    x1 = 1200
    y0 = 230
    y1 = 350
    seg_w = (x1 - x0) / groups

    for i in range(groups):
        sx0 = int(x0 + i * seg_w)
        sx1 = int(x0 + (i + 1) * seg_w)
        color = PALETTE["blue"] if i % 2 == 0 else PALETTE["teal"]
        d.rectangle((sx0, y0, sx1, y1), fill=color, outline="black", width=2)
        if groups <= 10:
            centered_text(d, (sx0, y0, sx1, y1), each_text, FONT_SMALL, fill=(255, 255, 255))
        else:
            centered_text(d, (sx0, y0, sx1, y1), each_text.split()[0], FONT_SMALL, fill=(255, 255, 255))

    d.line((x0, y1 + 55, x1, y1 + 55), fill="black", width=4)
    d.line((x0, y1 + 35, x0, y1 + 75), fill="black", width=4)
    d.line((x1, y1 + 35, x1, y1 + 75), fill="black", width=4)
    centered_text(d, (x0, y1 + 82, x1, y1 + 160), total_label, FONT_BIG)

    (OUT_BASE / folder).mkdir(parents=True, exist_ok=True)
    img.save(OUT_BASE / folder / img_name, "JPEG", quality=95)


def draw_equal_half(img_name, folder):
    img = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(img)

    x = 180
    y = 230
    h = 100
    total_w = 900

    draw_bar(d, x, y, total_w, h, PALETTE["purple"], "Total trees: 12")
    y2 = 390
    half = total_w // 2
    draw_bar(d, x, y2, half, h, PALETTE["green"], "Near river: ?")
    draw_bar(d, x + half, y2, half, h, PALETTE["gray"], "Other trees: 6", text_fill=(20, 20, 20))

    (OUT_BASE / folder).mkdir(parents=True, exist_ok=True)
    img.save(OUT_BASE / folder / img_name, "JPEG", quality=95)


def main():
    # Week 19 easy
    draw_comparison("barmodel_w19_easy_p1_v5.jpg", "week19", "Now: 7 years old", 7, "Then: 3 years old", 3, "Years passed: ?")
    draw_comparison("barmodel_w19_easy_p2_v5.jpg", "week19", "Now: 80 cm", 8, "Baby: 50 cm", 5, "Growth: ? cm")
    draw_multiplication("barmodel_w19_easy_p3_v5.jpg", "week19", 10, "2 photos", "Total: ?")
    draw_part_whole("barmodel_w19_easy_p4_v5.jpg", "week19", "Mom: 5 photos", 5, "Dad: 4 photos", 4)
    draw_comparison("barmodel_w19_easy_p5_v5.jpg", "week19", "Me: 5 years old", 5, "Brother: 3 years old", 3, "Older by: ?")

    # Week 19 advanced
    draw_comparison("barmodel_w19_adv_p1_v2.jpg", "week19", "Now: 8 years old", 8, "Then: 3 years old", 3, "Years passed: ?")
    draw_comparison("barmodel_w19_adv_p2_v2.jpg", "week19", "Now: 120 cm", 12, "Baby: 50 cm", 5, "Growth: ? cm")
    draw_multiplication("barmodel_w19_adv_p3_v2.jpg", "week19", 20, "3 photos", "Total: ?")
    draw_part_whole("barmodel_w19_adv_p4_v2.jpg", "week19", "Mom: 8 photos", 8, "Dad: 7 photos", 7)
    draw_comparison("barmodel_w19_adv_p5_v2.jpg", "week19", "Me: 5 years old", 5, "Brother: 3 years old", 3, "Older by: ?")

    # Week 20 easy
    draw_part_whole_missing("barmodel_w20_easy_p1_v3.jpg", "week20", "Before: 8 trees", "Cut down: 3", 3, "Left: ?", 8)
    draw_part_whole("barmodel_w20_easy_p2_v3.jpg", "week20", "Old buildings: 5", 5, "New buildings: 4", 4)
    draw_comparison("barmodel_w20_easy_p3_v3.jpg", "week20", "New bridge: 35 m", 7, "Old bridge: 20 m", 4, "Longer by: ?")
    draw_multiplication("barmodel_w20_easy_p4_v3.jpg", "week20", 6, "4 people", "Total: ?")
    draw_equal_half("barmodel_w20_easy_p5_v3.jpg", "week20")

    # Week 20 advanced
    draw_part_whole("barmodel_w20_adv_p1_v2.jpg", "week20", "Old buildings: 15", 15, "New buildings: 8", 8)
    draw_comparison("barmodel_w20_adv_p2_v2.jpg", "week20", "New bridge: 75 m", 15, "Old bridge: 30 m", 6, "Longer by: ?")
    draw_multiplication("barmodel_w20_adv_p3_v2.jpg", "week20", 4, "12 stalls", "Total: ?")
    draw_part_whole_missing("barmodel_w20_adv_p4_v2.jpg", "week20", "Total: 24 buildings", "Saved: 9", 9, "Demolished: ?", 24)
    draw_multiplication("barmodel_w20_adv_p5_v2.jpg", "week20", 2, "6 trees", "Total: ?")

    # Week 21 easy
    draw_part_whole("barmodel_w21_easy_p1_v2.jpg", "week21", "Circles: 3", 3, "Squares: 4", 4)
    draw_comparison("barmodel_w21_easy_p2_v2.jpg", "week21", "Anna: 8 pages", 8, "Ben: 5 pages", 5, "More: ?")
    draw_part_whole("barmodel_w21_easy_p3_v2.jpg", "week21", "Morning: 2 dishes", 2, "Evening: 3 dishes", 3)
    draw_part_whole("barmodel_w21_easy_p4_v2.jpg", "week21", "Park: 4 blocks", 4, "Shop: 2 blocks", 2)
    draw_comparison("barmodel_w21_easy_p5_v2.jpg", "week21", "Me: 9 min", 9, "Sister: 6 min", 6, "More: ?")

    # Week 21 advanced
    draw_part_whole("barmodel_w21_adv_p1_v2.jpg", "week21", "Circles: 4", 4, "Rectangles: 3", 3)
    draw_comparison("barmodel_w21_adv_p2_v2.jpg", "week21", "Squares: 8", 8, "Triangles: 5", 5, "More: ?")
    draw_part_whole("barmodel_w21_adv_p3_v2.jpg", "week21", "Circle plates: 4", 4, "Square platters: 3", 3)
    draw_part_whole("barmodel_w21_adv_p4_v2.jpg", "week21", "Triangle leaves: 5", 5, "Round stones: 4", 4)
    draw_comparison("barmodel_w21_adv_p5_v2.jpg", "week21", "Circles: 9", 9, "Rectangles: 6", 6, "More: ?")

    print("Generated 30 bar model images for weeks 19-21.")


if __name__ == "__main__":
    main()
