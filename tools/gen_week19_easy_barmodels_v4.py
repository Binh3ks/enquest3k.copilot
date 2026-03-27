from PIL import Image, ImageDraw, ImageFont

W, H = 1280, 720
FONT_PATH = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_LG = ImageFont.truetype(FONT_PATH, 30)
FONT_MD = ImageFont.truetype(FONT_PATH, 26)
OUT_DIR = "public/images/week19"


def centered(draw, text, box, fill=(20, 20, 20), font=None):
    if font is None:
        font = FONT_LG
    x0, y0, x1, y1 = box
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    x = x0 + (x1 - x0 - tw) // 2
    y = y0 + (y1 - y0 - th) // 2
    draw.text((x, y), text, fill=fill, font=font)


def save(img, name):
    img.save(f"{OUT_DIR}/{name}", "JPEG", quality=95)
    print(f"  Saved {name}")


# P1: 7 vs 3 -> diff (comparison model)
img = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(img)
ax, ay = 160, 200
top_w, bot_w, h = 760, 330, 80
d.rectangle((ax, ay, ax + top_w, ay + h), fill=(65, 130, 220), outline="black", width=3)
centered(d, "Now: 7 years old", (ax, ay, ax + top_w, ay + h), fill="white")
d.rectangle((ax, ay + 160, ax + bot_w, ay + 160 + h), fill=(237, 138, 52), outline="black", width=3)
centered(d, "Then: 3 years old", (ax, ay + 160, ax + bot_w, ay + 160 + h), fill="white")
bx = ax + bot_w + 20
d.line([(bx, ay + 160), (ax + top_w, ay + 160)], fill="black", width=3)
d.line([(bx, ay + 138), (bx, ay + 182)], fill="black", width=3)
d.line([(ax + top_w, ay + 138), (ax + top_w, ay + 182)], fill="black", width=3)
d.text((bx + 28, ay + 195), "Years passed: ?", fill="black", font=FONT_MD)
save(img, "barmodel_w19_easy_p1_v4.jpg")

# P2: 80 vs 50 -> diff (comparison model)
img = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(img)
ax, ay = 160, 200
top_w, bot_w, h = 820, 510, 80
d.rectangle((ax, ay, ax + top_w, ay + h), fill=(84, 167, 95), outline="black", width=3)
centered(d, "Now: 80 cm", (ax, ay, ax + top_w, ay + h), fill="white")
d.rectangle((ax, ay + 160, ax + bot_w, ay + 160 + h), fill=(225, 108, 163), outline="black", width=3)
centered(d, "Baby: 50 cm", (ax, ay + 160, ax + bot_w, ay + 160 + h), fill="white")
bx = ax + bot_w + 20
d.line([(bx, ay + 160), (ax + top_w, ay + 160)], fill="black", width=3)
d.line([(bx, ay + 138), (bx, ay + 182)], fill="black", width=3)
d.line([(ax + top_w, ay + 138), (ax + top_w, ay + 182)], fill="black", width=3)
d.text((bx + 28, ay + 195), "How much taller: ? cm", fill="black", font=FONT_MD)
save(img, "barmodel_w19_easy_p2_v4.jpg")

# P3: 10 pages x 2 photos (multiplication)
img = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(img)
x0, y0, x1, y1 = 100, 290, 1180, 390
seg_w = (x1 - x0) // 10
for i in range(10):
    sx0 = x0 + i * seg_w
    sx1 = x0 + (i + 1) * seg_w if i < 9 else x1
    color = (90, 160 + (i % 2) * 20, 220)
    d.rectangle((sx0, y0, sx1, y1), fill=color, outline="black", width=2)
    centered(d, "2", (sx0, y0, sx1, y1), fill="white", font=FONT_LG)
d.line([(x0, y1 + 45), (x1, y1 + 45)], fill="black", width=3)
d.line([(x0, y1 + 25), (x0, y1 + 65)], fill="black", width=3)
d.line([(x1, y1 + 25), (x1, y1 + 65)], fill="black", width=3)
d.text((540, y1 + 72), "Total photos: ?", fill="black", font=FONT_MD)
d.text((450, y0 - 44), "10 pages  x  2 photos each", fill="black", font=FONT_MD)
save(img, "barmodel_w19_easy_p3_v4.jpg")

# P4: 5 + 4 (part-whole model)
img = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(img)
x0, y0, x1, y1 = 160, 290, 1100, 390
split = x0 + int((x1 - x0) * 5 / 9)
d.rectangle((x0, y0, split, y1), fill=(65, 130, 220), outline="black", width=3)
centered(d, "Mom: 5 photos", (x0, y0, split, y1), fill="white")
d.rectangle((split, y0, x1, y1), fill=(237, 138, 52), outline="black", width=3)
centered(d, "Dad: 4 photos", (split, y0, x1, y1), fill="white")
d.line([(x0, y1 + 45), (x1, y1 + 45)], fill="black", width=3)
d.line([(x0, y1 + 25), (x0, y1 + 65)], fill="black", width=3)
d.line([(x1, y1 + 25), (x1, y1 + 65)], fill="black", width=3)
d.text((560, y1 + 72), "Total photos: ?", fill="black", font=FONT_MD)
save(img, "barmodel_w19_easy_p4_v4.jpg")

# P5: 5 vs 3 -> diff (comparison model)
img = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(img)
ax, ay = 160, 200
top_w, bot_w, h = 640, 390, 80
d.rectangle((ax, ay, ax + top_w, ay + h), fill=(128, 90, 190), outline="black", width=3)
centered(d, "Me: 5 years old", (ax, ay, ax + top_w, ay + h), fill="white")
d.rectangle((ax, ay + 160, ax + bot_w, ay + 160 + h), fill=(231, 195, 64), outline="black", width=3)
centered(d, "Brother: 3 years old", (ax, ay + 160, ax + bot_w, ay + 160 + h), fill="black")
bx = ax + bot_w + 20
d.line([(bx, ay + 160), (ax + top_w, ay + 160)], fill="black", width=3)
d.line([(bx, ay + 138), (bx, ay + 182)], fill="black", width=3)
d.line([(ax + top_w, ay + 138), (ax + top_w, ay + 182)], fill="black", width=3)
d.text((bx + 28, ay + 195), "How many years older: ?", fill="black", font=FONT_MD)
save(img, "barmodel_w19_easy_p5_v4.jpg")

print("Done! All 5 v4 bar models generated.")
