#!/usr/bin/env python3
import os
import shutil
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W33_DIR = Path("public/images/week33")
W34_DIR = Path("public/images/week34")

def create_card_graphic(title, subtitle, icon_type, color_theme, output_jpg, output_png):
    w, h = 1024, 1024
    img = Image.new("RGB", (w, h), color=color_theme["bg"])
    draw = ImageDraw.Draw(img)
    
    # Gradient background
    for y in range(h):
        ratio = y / h
        r = int(color_theme["top"][0] * (1 - ratio) + color_theme["bottom"][0] * ratio)
        g = int(color_theme["top"][1] * (1 - ratio) + color_theme["bottom"][1] * ratio)
        b = int(color_theme["top"][2] * (1 - ratio) + color_theme["bottom"][2] * ratio)
        draw.line([(0, y), (w, y)], fill=(r, g, b))
        
    # Card container border & glow
    draw.rounded_rectangle([40, 40, w - 40, h - 40], radius=48, outline=color_theme["accent"], width=8)
    draw.rounded_rectangle([60, 60, w - 60, h - 60], radius=40, outline=(255, 255, 255, 120), width=3)
    
    # Central visual badge
    center_x, center_y = w // 2, h // 2 - 40
    badge_radius = 260
    draw.ellipse([center_x - badge_radius, center_y - badge_radius, center_x + badge_radius, center_y + badge_radius], 
                 fill=color_theme["badge_bg"], outline=color_theme["badge_outline"], width=12)
    draw.ellipse([center_x - badge_radius + 20, center_y - badge_radius + 20, center_x + badge_radius - 20, center_y + badge_radius - 20], 
                 fill=color_theme["badge_inner"])
                 
    # Draw characteristic visual features based on icon_type
    if icon_type == "handrail":
        # Draw stairs and handrail
        for i in range(5):
            sx = center_x - 180 + i * 70
            sy = center_y + 120 - i * 60
            draw.rectangle([sx, sy, sx + 80, center_y + 160], fill="#64748b", outline="#334155", width=4)
        # Railing
        draw.line([(center_x - 160, center_y + 40), (center_x + 160, center_y - 120)], fill="#f8fafc", width=22)
        draw.line([(center_x - 160, center_y + 40), (center_x + 160, center_y - 120)], fill="#38bdf8", width=12)
        for i in range(4):
            rx = center_x - 120 + i * 80
            ry = center_y + 10 - i * 50
            draw.line([(rx, ry), (rx, ry + 70)], fill="#94a3b8", width=10)
            
    elif icon_type == "warning_sign":
        # Yellow triangle caution sign
        p1 = (center_x, center_y - 150)
        p2 = (center_x - 170, center_y + 130)
        p3 = (center_x + 170, center_y + 130)
        draw.polygon([p1, p2, p3], fill="#facc15", outline="#ca8a04", width=14)
        draw.polygon([(center_x, center_y - 120), (center_x - 140, center_y + 110), (center_x + 140, center_y + 110)], fill="#fde047")
        # Exclamation
        draw.rounded_rectangle([center_x - 14, center_y - 60, center_x + 14, center_y + 30], radius=8, fill="#0f172a")
        draw.ellipse([center_x - 14, center_y + 50, center_x + 14, center_y + 78], fill="#0f172a")
        
    elif icon_type == "goggles":
        # Laboratory protective goggles
        draw.rounded_rectangle([center_x - 180, center_y - 70, center_x + 180, center_y + 70], radius=50, fill="#38bdf8", outline="#0284c7", width=10)
        draw.rounded_rectangle([center_x - 150, center_y - 45, center_x - 20, center_y + 45], radius=35, fill="#e0f2fe", outline="#bae6fd", width=6)
        draw.rounded_rectangle([center_x + 20, center_y - 45, center_x + 150, center_y + 45], radius=35, fill="#e0f2fe", outline="#bae6fd", width=6)
        # Strap
        draw.line([(center_x - 240, center_y), (center_x - 180, center_y)], fill="#0f172a", width=16)
        draw.line([(center_x + 180, center_y), (center_x + 240, center_y)], fill="#0f172a", width=16)
        
    elif icon_type == "mop":
        # Cleaning mop & bucket
        draw.rounded_rectangle([center_x - 110, center_y, center_x + 110, center_y + 150], radius=30, fill="#eab308", outline="#ca8a04", width=8)
        draw.line([(center_x, center_y - 180), (center_x - 20, center_y + 40)], fill="#94a3b8", width=18)
        draw.line([(center_x, center_y - 180), (center_x - 20, center_y + 40)], fill="#f1f5f9", width=10)
        # Mop head
        for s in range(-6, 7):
            draw.line([(center_x - 20, center_y + 40), (center_x - 20 + s * 14, center_y + 110)], fill="#f8fafc", width=8)

    # Save PNG and JPG
    img.save(output_png, "PNG")
    img.save(output_jpg, "JPEG", quality=92)
    print(f"  ✨ Generated custom graphic for {output_jpg.name}")

def main():
    W33_DIR.mkdir(parents=True, exist_ok=True)
    W34_DIR.mkdir(parents=True, exist_ok=True)
    
    # Card definitions for Week 33
    # A: School Handrail (custom)
    create_card_graphic(
        "School Handrail", "Staircase", "handrail",
        {"bg": "#0f172a", "top": (15, 23, 42), "bottom": (30, 41, 59), "accent": "#38bdf8", "badge_bg": "#1e293b", "badge_outline": "#38bdf8", "badge_inner": "#0f172a"},
        W33_DIR / "card_a.jpg", W33_DIR / "card_a.png"
    )
    
    # B: Warning Sign (custom)
    create_card_graphic(
        "Warning Sign", "Corridor Floor", "warning_sign",
        {"bg": "#422006", "top": (66, 32, 6), "bottom": (113, 63, 18), "accent": "#facc15", "badge_bg": "#713f12", "badge_outline": "#facc15", "badge_inner": "#451a03"},
        W33_DIR / "card_b.jpg", W33_DIR / "card_b.png"
    )
    
    # C: First-Aid Kit (use high-def authentic card_first_aid_kit)
    if (W33_DIR / "card_first_aid_kit.jpg").exists():
        shutil.copyfile(W33_DIR / "card_first_aid_kit.jpg", W33_DIR / "card_c.jpg")
        shutil.copyfile(W33_DIR / "card_first_aid_kit.png", W33_DIR / "card_c.png")
        print("  ✅ Copied authentic card_c from card_first_aid_kit")
        
    # D: Cold Pack (use high-def authentic card_cold_pack)
    if (W33_DIR / "card_cold_pack.jpg").exists():
        shutil.copyfile(W33_DIR / "card_cold_pack.jpg", W33_DIR / "card_d.jpg")
        shutil.copyfile(W33_DIR / "card_cold_pack.png", W33_DIR / "card_d.png")
        print("  ✅ Copied authentic card_d from card_cold_pack")
        
    # E: Clean Bandage (use high-def authentic card_clean_bandage)
    if (W33_DIR / "card_clean_bandage.jpg").exists():
        shutil.copyfile(W33_DIR / "card_clean_bandage.jpg", W33_DIR / "card_e.jpg")
        shutil.copyfile(W33_DIR / "card_clean_bandage.png", W33_DIR / "card_e.png")
        print("  ✅ Copied authentic card_e from card_clean_bandage")
        
    # F: Science Goggles (custom)
    create_card_graphic(
        "Science Goggles", "Science Room", "goggles",
        {"bg": "#064e3b", "top": (6, 78, 59), "bottom": (6, 95, 70), "accent": "#34d399", "badge_bg": "#065f46", "badge_outline": "#34d399", "badge_inner": "#022c22"},
        W33_DIR / "card_f.jpg", W33_DIR / "card_f.png"
    )
    
    # G: School Backpack (use high-def authentic card_backpack)
    if (W33_DIR / "card_backpack.jpg").exists():
        shutil.copyfile(W33_DIR / "card_backpack.jpg", W33_DIR / "card_g.jpg")
        shutil.copyfile(W33_DIR / "card_backpack.png", W33_DIR / "card_g.png")
        print("  ✅ Copied authentic card_g from card_backpack")
        
    # H: Cleaning Mop (custom)
    create_card_graphic(
        "Cleaning Mop", "Utility Closet", "mop",
        {"bg": "#1e1b4b", "top": (30, 27, 75), "bottom": (49, 46, 129), "accent": "#818cf8", "badge_bg": "#312e81", "badge_outline": "#818cf8", "badge_inner": "#1e1b4b"},
        W33_DIR / "card_h.jpg", W33_DIR / "card_h.png"
    )
    
    # Week 34 Cards (.jpg and .png for all 8 cards)
    for l in "abcdefgh":
        jpg_p = W34_DIR / f"card_{l}.jpg"
        png_p = W34_DIR / f"card_{l}.png"
        if jpg_p.exists() and not png_p.exists():
            img = Image.open(jpg_p)
            img.save(png_p, "PNG")
            print(f"  ✅ W34: Saved {png_p.name}")
        elif png_p.exists() and not jpg_p.exists():
            img = Image.open(png_p).convert("RGB")
            img.save(jpg_p, "JPEG", quality=92)
            print(f"  ✅ W34: Saved {jpg_p.name}")
            
    # Week 34 L4 Example: mossy_rocks.jpg & mossy_rocks.png
    mossy_jpg = W34_DIR / "mossy_rocks.jpg"
    mossy_png = W34_DIR / "mossy_rocks.png"
    # Create green mossy rocks graphic
    w, h = 1024, 1024
    img = Image.new("RGB", (w, h), color="#064e3b")
    draw = ImageDraw.Draw(img)
    for y in range(h):
        ratio = y / h
        draw.line([(0, y), (w, y)], fill=(int(6 + ratio * 20), int(78 + ratio * 30), int(59 + ratio * 20)))
    draw.ellipse([200, 350, 824, 750], fill="#052e16", outline="#22c55e", width=10)
    # Draw rocks and stream
    draw.ellipse([250, 450, 520, 680], fill="#475569", outline="#64748b", width=8)
    draw.ellipse([280, 470, 480, 620], fill="#15803d") # moss on rock 1
    draw.ellipse([500, 420, 780, 660], fill="#334155", outline="#64748b", width=8)
    draw.ellipse([530, 440, 740, 580], fill="#16a34a") # moss on rock 2
    # Water stream ripples
    draw.arc([150, 650, 874, 850], start=20, end=160, fill="#38bdf8", width=12)
    draw.arc([220, 700, 804, 890], start=30, end=150, fill="#7dd3fc", width=8)
    img.save(mossy_png, "PNG")
    img.save(mossy_jpg, "JPEG", quality=92)
    print("  ✅ W34: Saved mossy_rocks.jpg and mossy_rocks.png")

if __name__ == "__main__":
    main()
