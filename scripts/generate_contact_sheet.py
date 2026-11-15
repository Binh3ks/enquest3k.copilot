#!/usr/bin/env python3
"""
scripts/generate_contact_sheet.py — Creates a high-resolution visual contact sheet
combining all authentic Story Writer 3D Pixar images generated for W39 and W41.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

def make_contact_sheet():
    images_info = [
        ("W39 Scene 1: Visiting Nature Reserve", Path("public/images/week39/writing_panel_1.png")),
        ("W39 Scene 2: Sandy Desert Zone", Path("public/images/week39/writing_panel_2.png")),
        ("W39 Scene 3: Rainforest Canopy Zone", Path("public/images/week39/writing_panel_3.png")),
        ("W39 Scene 4: Polar & Ocean Exploration", Path("public/images/week39/writing_panel_4.png")),
        ("W41 Scene 1: Finding the Egg", Path("public/images/week41/writing_panel_1.png")),
        ("W41 Scene 2: The Feeding Caterpillar", Path("public/images/week41/writing_panel_2.png")),
        ("W41 Scene 3: The Hanging Chrysalis", Path("public/images/week41/writing_panel_3.png"))
    ]

    thumb_w, thumb_h = 480, 360
    label_h = 40
    padding = 24
    cols = 4
    rows = 2

    sheet_w = cols * thumb_w + (cols + 1) * padding
    sheet_h = rows * (thumb_h + label_h) + (rows + 1) * padding + 80 # +80 for header banner

    sheet = Image.new("RGB", (sheet_w, sheet_h), color=(15, 23, 42)) # Slate 900
    draw = ImageDraw.Draw(sheet)

    # Header
    draw.text((padding, 20), "ROUND 103 — CONTACT SHEET: AUTHENTIC 3D PIXAR MEDIA (W39 & W41)", fill=(255, 255, 255))
    draw.text((padding, 45), "Generated via Google CloudCode Pipeline | Consistent Characters & S3 Cambridge Format", fill=(148, 163, 184))

    for idx, (label, img_path) in enumerate(images_info):
        r = idx // cols
        c = idx % cols
        x = padding + c * (thumb_w + padding)
        y = 90 + padding + r * (thumb_h + label_h + padding)

        if img_path.exists():
            with Image.open(img_path) as im:
                im_rgb = im.convert("RGB")
                im_thumb = im_rgb.resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
                sheet.paste(im_thumb, (x, y))
        else:
            draw.rectangle([x, y, x + thumb_w, y + thumb_h], fill=(30, 41, 59), outline=(71, 85, 105))
            draw.text((x + 20, y + thumb_h // 2), f"Missing: {img_path.name}", fill=(239, 68, 68))

        # Border around thumb
        draw.rectangle([x, y, x + thumb_w, y + thumb_h], outline=(99, 102, 241), width=2)

        # Label pill below
        draw.rectangle([x, y + thumb_h, x + thumb_w, y + thumb_h + label_h], fill=(30, 41, 59))
        draw.text((x + 10, y + thumb_h + 10), label, fill=(248, 250, 252))

    out_path = Path("docs/agent_artifacts/contact_sheet_round103.png")
    out_path.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(out_path, format="PNG")
    print(f"✓ Contact sheet saved: {out_path} ({out_path.stat().st_size} bytes)")

if __name__ == "__main__":
    make_contact_sheet()
