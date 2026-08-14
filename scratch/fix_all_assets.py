import os
from PIL import Image, ImageDraw, ImageFont

# 1. Fix Webtoon Scene 4: Copy single pure Pixar 3D scene (w33_writing_panel_2) directly
scene4_src = '/Users/binhnguyen/.gemini/antigravity-ide/brain/b80b418e-196e-45a1-b35b-29081987d962/w33_writing_panel_2_1786681342518.jpg'
img_s4 = Image.open(scene4_src).convert('RGB')
img_s4.save('public/images/week33/webtoon_scene_4.png', 'PNG', quality=95)
img_s4.save('public/images/week33/webtoon_scene_4.jpg', 'JPEG', quality=95)
print("Saved clean pure Scene 4 png & jpg!")

# 2. Render 8 Cards as RGB PNG and JPG files
cards_data = [
    ('card_clean_bandage', 'Clean Bandage', '🩹', (255, 241, 242), (254, 205, 211), (225, 29, 72)),
    ('card_cold_pack', 'Cold Pack', '🧊', (236, 254, 255), (165, 243, 252), (8, 145, 178)),
    ('card_science_notebook', 'Science Notebook', '📓', (238, 242, 255), (199, 210, 254), (79, 70, 229)),
    ('card_orange_juice', 'Orange Juice', '🍹', (255, 251, 235), (253, 230, 138), (217, 119, 6)),
    ('card_alarm_clock', 'Alarm Clock', '⏰', (250, 245, 255), (233, 213, 255), (147, 51, 234)),
    ('card_backpack', 'School Backpack', '🎒', (240, 253, 244), (187, 247, 208), (22, 163, 74)),
    ('card_water_bottle', 'Water Bottle', '🍾', (240, 249, 255), (186, 230, 253), (2, 132, 199)),
    ('card_first_aid_kit', 'First Aid Kit', '🧰', (254, 242, 242), (254, 202, 202), (220, 38, 38))
]

for filename, title, symbol, bg1, bg2, accent in cards_data:
    w, h = 600, 600
    img = Image.new('RGB', (w, h), bg1)
    draw = ImageDraw.Draw(img)
    
    # Gradient
    for y in range(h):
        r = int(bg1[0] + (bg2[0] - bg1[0]) * y / h)
        g = int(bg1[1] + (bg2[1] - bg1[1]) * y / h)
        b = int(bg1[2] + (bg2[2] - bg1[2]) * y / h)
        draw.line([(0, y), (w, y)], fill=(r, g, b))
        
    margin = 35
    draw.rounded_rectangle([margin, margin, w-margin, h-margin], radius=32, fill=(255, 255, 255), outline=accent, width=8)
    
    cx, cy = w//2, h//2 - 25
    draw.ellipse([cx-150, cy-150, cx+150, cy+150], fill=(245, 247, 250), outline=(226, 232, 240), width=4)
    
    # Try drawing emoji symbol using Apple Color Emoji
    try:
        font_emoji = ImageFont.truetype("/System/Library/Fonts/Apple Color Emoji.ttc", 140)
        draw.text((cx - 70, cy - 80), symbol, font=font_emoji, embedded_color=True)
    except Exception as e:
        font_emoji = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 100)
        draw.text((cx - 50, cy - 50), symbol, fill=(30, 41, 59), font=font_emoji)
        
    # Title Pill
    draw.rounded_rectangle([cx - 210, h - 130, cx + 210, h - 60], radius=18, fill=accent)
    try:
        font_title = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 30)
    except:
        font_title = ImageFont.load_default()
        
    bbox = draw.textbbox((0, 0), title, font=font_title)
    tw = bbox[2] - bbox[0]
    draw.text((cx - tw//2, h - 110), title, fill=(255, 255, 255), font=font_title)
    
    # Save both PNG and JPG formats to ensure 100% web browser compatibility
    png_path = f"public/images/week33/{filename}.png"
    jpg_path = f"public/images/week33/{filename}.jpg"
    img.save(png_path, 'PNG', quality=95)
    img.save(jpg_path, 'JPEG', quality=95)
    print(f"Generated {png_path} and {jpg_path}")

