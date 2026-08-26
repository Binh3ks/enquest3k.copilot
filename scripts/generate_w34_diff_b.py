#!/usr/bin/env python3
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from pathlib import Path

img_a_path = Path("public/images/week34/w34_diff_scene_a.jpg")
img_b_path = Path("public/images/week34/w34_diff_scene_b.jpg")

img_a = Image.open(img_a_path).convert("RGB")
w, h = img_a.size

img_b = img_a.copy()
draw_b = ImageDraw.Draw(img_b)

# 1. Edit d1: Mouse tail (around x=80%, y=19%) -> flip/bend tail downwards
# Box around (80%, 19%):
cx1, cy1 = int(w * 0.80), int(h * 0.19)
r1 = int(min(w, h) * 0.05)
# Inpaint existing tail background
bg_color1 = img_a.getpixel((cx1 + r1, cy1))
draw_b.ellipse([cx1 - r1, cy1 - r1, cx1 + r1, cy1 + r1], fill=bg_color1)
# Draw downward curved tail
tail_points = [(cx1 - 10, cy1 - 20), (cx1 + 10, cy1 + 10), (cx1 + 25, cy1 + 30)]
draw_b.line(tail_points, fill="#a16207", width=6)

# 2. Edit d2: Tree flower (around x=26%, y=20%) -> pink to yellow
cx2, cy2 = int(w * 0.26), int(h * 0.20)
r2 = int(min(w, h) * 0.05)
# Draw yellow flower petals over the pink flower
draw_b.ellipse([cx2 - r2, cy2 - r2, cx2 + r2, cy2 + r2], fill="#facc15", outline="#eab308", width=4)
draw_b.ellipse([cx2 - r2//2, cy2 - r2//2, cx2 + r2//2, cy2 + r2//2], fill="#ea580c")

# 3. Edit d3: Butterfly on rock (around x=56%, y=68%) -> remove butterfly (blend rock texture)
cx3, cy3 = int(w * 0.56), int(h * 0.68)
r3 = int(min(w, h) * 0.055)
# Sample rock color near butterfly
rock_color = img_a.getpixel((cx3 - r3 - 10, cy3))
draw_b.ellipse([cx3 - r3, cy3 - r3, cx3 + r3, cy3 + r3], fill=rock_color, outline="#475569", width=2)
# Draw subtle rock texture lines
draw_b.line([(cx3 - r3 + 10, cy3), (cx3 + r3 - 10, cy3 + 10)], fill="#334155", width=3)

# 4. Edit d4: Sun in sky (around x=82%, y=73%) -> cloud over sun
cx4, cy4 = int(w * 0.82), int(h * 0.73)
r4 = int(min(w, h) * 0.06)
# Draw fluffy white/gray cloud over sun
draw_b.ellipse([cx4 - r4, cy4 - r4//2, cx4 + r4, cy4 + r4//2], fill="#e2e8f0", outline="#cbd5e1", width=3)
draw_b.ellipse([cx4 - r4//2, cy4 - r4, cx4 + r4//2, cy4 + r4//3], fill="#f8fafc")
draw_b.ellipse([cx4 - r4 + 10, cy4 - r4//3, cx4, cy4 + r4//2], fill="#e2e8f0")

# Save Scene B
img_b.save(img_b_path, "JPEG", quality=95)
print(f"✅ Generated clean w34_diff_scene_b.jpg with exactly 4 edits!")
