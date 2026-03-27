from PIL import Image, ImageDraw, ImageFont

W, H = 1280, 720
FONT = ImageFont.load_default()
OUT_DIR = "public/images/week20"


def centered(draw, text, box, fill=(20, 20, 20)):
    x0, y0, x1, y1 = box
    tw = int(draw.textlength(text, font=FONT))
    th = 12
    x = x0 + (x1 - x0 - tw) // 2
    y = y0 + (y1 - y0 - th) // 2
    draw.text((x, y), text, fill=fill, font=FONT)


def save(img, name):
    img.save(f"{OUT_DIR}/{name}", "JPEG", quality=95)


# P1: 8 - 3
img = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(img)
d.text((40, 30), "Singapore Math Bar Model - Week 20 Easy P1", fill="black", font=FONT)
x0, y0, x1, y1 = 160, 280, 1120, 360
cut = x0 + int((x1 - x0) * 3 / 8)
d.rectangle((x0, y0, cut, y1), fill=(220, 80, 80), outline="black", width=2)
d.rectangle((cut, y0, x1, y1), fill=(120, 190, 120), outline="black", width=2)
centered(d, "Cut down: 3", (x0, y0, cut, y1), fill="white")
centered(d, "Left: ?", (cut, y0, x1, y1), fill="white")
d.text((x0, y1 + 20), "Total trees: 8", fill="black", font=FONT)
save(img, "barmodel_w20_easy_p1.jpg")

# P2: 5 + 4
img = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(img)
d.text((40, 30), "Singapore Math Bar Model - Week 20 Easy P2", fill="black", font=FONT)
x0, y0, x1, y1 = 160, 280, 1120, 360
split = x0 + int((x1 - x0) * 5 / 9)
d.rectangle((x0, y0, split, y1), fill=(150, 95, 45), outline="black", width=2)
d.rectangle((split, y0, x1, y1), fill=(65, 130, 220), outline="black", width=2)
centered(d, "Old buildings: 5", (x0, y0, split, y1), fill="white")
centered(d, "New buildings: 4", (split, y0, x1, y1), fill="white")
d.line((x0, y1 + 40, x1, y1 + 40), fill="black", width=3)
d.line((x0, y1 + 20, x0, y1 + 60), fill="black", width=3)
d.line((x1, y1 + 20, x1, y1 + 60), fill="black", width=3)
d.text((600, y1 + 58), "Total buildings: ?", fill="black", font=FONT)
save(img, "barmodel_w20_easy_p2.jpg")

# P3: 35 - 20
img = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(img)
d.text((40, 30), "Singapore Math Bar Model - Week 20 Easy P3", fill="black", font=FONT)
ax, ay = 180, 250
new_w, old_w = 860, 490
h = 70
d.rectangle((ax, ay, ax + new_w, ay + h), fill=(65, 130, 220), outline="black", width=2)
centered(d, "New bridge: 35 m", (ax, ay, ax + new_w, ay + h), fill="white")
d.rectangle((ax, ay + 140, ax + old_w, ay + 140 + h), fill=(150, 95, 45), outline="black", width=2)
centered(d, "Old bridge: 20 m", (ax, ay + 140, ax + old_w, ay + 140 + h), fill="white")
bx = ax + old_w + 20
d.line((bx, ay + 140, ax + new_w, ay + 140), fill="black", width=3)
d.line((bx, ay + 120, bx, ay + 160), fill="black", width=3)
d.line((ax + new_w, ay + 120, ax + new_w, ay + 160), fill="black", width=3)
d.text((bx + 40, ay + 168), "How much longer: ?", fill="black", font=FONT)
save(img, "barmodel_w20_easy_p3.jpg")

# P4: 6 x 4
img = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(img)
d.text((40, 30), "Singapore Math Bar Model - Week 20 Easy P4", fill="black", font=FONT)
x0, y0, x1, y1 = 120, 280, 1160, 360
group_w = (x1 - x0) // 6
colors = [
    (244, 181, 67),
    (126, 197, 111),
    (96, 160, 231),
    (241, 117, 117),
    (174, 141, 222),
    (89, 201, 198),
]
for i in range(6):
    gx0 = x0 + i * group_w
    gx1 = x0 + (i + 1) * group_w if i < 5 else x1
    d.rectangle((gx0, y0, gx1, y1), fill=colors[i], outline="black", width=2)
    centered(d, "4 people", (gx0, y0, gx1, y1), fill="white")
d.line((x0, y1 + 40, x1, y1 + 40), fill="black", width=3)
d.line((x0, y1 + 20, x0, y1 + 60), fill="black", width=3)
d.line((x1, y1 + 20, x1, y1 + 60), fill="black", width=3)
d.text((610, y1 + 58), "Total people: ?", fill="black", font=FONT)
d.text((120, y0 - 30), "6 stalls x 4 people each", fill="black", font=FONT)
save(img, "barmodel_w20_easy_p4.jpg")

# P5: 12 / 2
img = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(img)
d.text((40, 30), "Singapore Math Bar Model - Week 20 Easy P5", fill="black", font=FONT)
x0, y0, x1, y1 = 160, 280, 1120, 360
mid = (x0 + x1) // 2
d.rectangle((x0, y0, mid, y1), fill=(87, 175, 215), outline="black", width=2)
d.rectangle((mid, y0, x1, y1), fill=(119, 199, 132), outline="black", width=2)
centered(d, "Near river: ?", (x0, y0, mid, y1), fill="white")
centered(d, "Other half", (mid, y0, x1, y1), fill="white")
d.text((x0, y1 + 20), "Total trees: 12", fill="black", font=FONT)
d.text((x0, y1 + 45), "Half means 12 / 2", fill="black", font=FONT)
save(img, "barmodel_w20_easy_p5.jpg")

print("Generated week 20 easy bar models: p1-p5")
