from PIL import Image, ImageDraw, ImageFont

W, H = 1280, 720
FONT = ImageFont.load_default()
OUT_DIR = "public/images/week19"


def centered(draw, text, box, fill=(20, 20, 20)):
    x0, y0, x1, y1 = box
    tw = int(draw.textlength(text, font=FONT))
    th = 12
    x = x0 + (x1 - x0 - tw) // 2
    y = y0 + (y1 - y0 - th) // 2
    draw.text((x, y), text, fill=fill, font=FONT)


def save(img, name):
    img.save(f"{OUT_DIR}/{name}", "JPEG", quality=95)


# P1: 7 vs 3 -> diff
img = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(img)
ax, ay = 180, 220
top_w, bot_w, h = 760, 330, 70
d.rectangle((ax, ay, ax + top_w, ay + h), fill=(65, 130, 220), outline="black", width=2)
centered(d, "Now: 7 years old", (ax, ay, ax + top_w, ay + h), fill="white")
d.rectangle((ax, ay + 150, ax + bot_w, ay + 150 + h), fill=(237, 138, 52), outline="black", width=2)
centered(d, "Then: 3 years old", (ax, ay + 150, ax + bot_w, ay + 150 + h), fill="white")
bx = ax + bot_w + 20
d.line((bx, ay + 150, ax + top_w, ay + 150), fill="black", width=3)
d.line((bx, ay + 128, bx, ay + 172), fill="black", width=3)
d.line((ax + top_w, ay + 128, ax + top_w, ay + 172), fill="black", width=3)
d.text((bx + 28, ay + 180), "Years passed: ?", fill="black", font=FONT)
save(img, "barmodel_w19_easy_p1_v3.jpg")

# P2: 80 vs 50 -> diff
img = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(img)
ax, ay = 180, 220
top_w, bot_w, h = 820, 510, 70
d.rectangle((ax, ay, ax + top_w, ay + h), fill=(84, 167, 95), outline="black", width=2)
centered(d, "Now: 80 cm", (ax, ay, ax + top_w, ay + h), fill="white")
d.rectangle((ax, ay + 150, ax + bot_w, ay + 150 + h), fill=(225, 108, 163), outline="black", width=2)
centered(d, "Baby: 50 cm", (ax, ay + 150, ax + bot_w, ay + 150 + h), fill="white")
bx = ax + bot_w + 20
d.line((bx, ay + 150, ax + top_w, ay + 150), fill="black", width=3)
d.line((bx, ay + 128, bx, ay + 172), fill="black", width=3)
d.line((ax + top_w, ay + 128, ax + top_w, ay + 172), fill="black", width=3)
d.text((bx + 28, ay + 180), "How much taller: ? cm", fill="black", font=FONT)
save(img, "barmodel_w19_easy_p2_v3.jpg")

# P3: 10 x 2
img = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(img)
x0, y0, x1, y1 = 120, 290, 1160, 370
seg_w = (x1 - x0) // 10
for i in range(10):
    sx0 = x0 + i * seg_w
    sx1 = x0 + (i + 1) * seg_w if i < 9 else x1
    color = (90, 160 + (i % 2) * 20, 220)
    d.rectangle((sx0, y0, sx1, y1), fill=color, outline="black", width=2)
    centered(d, "2 photos", (sx0, y0, sx1, y1), fill="white")
d.line((x0, y1 + 40, x1, y1 + 40), fill="black", width=3)
d.line((x0, y1 + 20, x0, y1 + 60), fill="black", width=3)
d.line((x1, y1 + 20, x1, y1 + 60), fill="black", width=3)
d.text((610, y1 + 58), "Total photos: ?", fill="black", font=FONT)
d.text((540, y0 - 30), "10 pages x 2 photos", fill="black", font=FONT)
save(img, "barmodel_w19_easy_p3_v3.jpg")

# P4: 5 + 4
img = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(img)
x0, y0, x1, y1 = 180, 290, 1100, 370
split = x0 + int((x1 - x0) * 5 / 9)
d.rectangle((x0, y0, split, y1), fill=(65, 130, 220), outline="black", width=2)
centered(d, "Mom: 5 photos", (x0, y0, split, y1), fill="white")
d.rectangle((split, y0, x1, y1), fill=(237, 138, 52), outline="black", width=2)
centered(d, "Dad: 4 photos", (split, y0, x1, y1), fill="white")
d.line((x0, y1 + 40, x1, y1 + 40), fill="black", width=3)
d.line((x0, y1 + 20, x0, y1 + 60), fill="black", width=3)
d.line((x1, y1 + 20, x1, y1 + 60), fill="black", width=3)
d.text((610, y1 + 58), "Total photos: ?", fill="black", font=FONT)
save(img, "barmodel_w19_easy_p4_v3.jpg")

# P5: 5 vs 3 -> diff
img = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(img)
ax, ay = 180, 220
top_w, bot_w, h = 640, 390, 70
d.rectangle((ax, ay, ax + top_w, ay + h), fill=(128, 90, 190), outline="black", width=2)
centered(d, "Me: 5 years old", (ax, ay, ax + top_w, ay + h), fill="white")
d.rectangle((ax, ay + 150, ax + bot_w, ay + 150 + h), fill=(231, 195, 64), outline="black", width=2)
centered(d, "Brother: 3 years old", (ax, ay + 150, ax + bot_w, ay + 150 + h), fill="black")
bx = ax + bot_w + 20
d.line((bx, ay + 150, ax + top_w, ay + 150), fill="black", width=3)
d.line((bx, ay + 128, bx, ay + 172), fill="black", width=3)
d.line((ax + top_w, ay + 128, ax + top_w, ay + 172), fill="black", width=3)
d.text((bx + 28, ay + 180), "How many years older: ?", fill="black", font=FONT)
save(img, "barmodel_w19_easy_p5_v3.jpg")

print("Generated week19 easy bar models v3: p1-p5")
