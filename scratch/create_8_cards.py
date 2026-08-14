import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

os.makedirs('public/images/week33/cards', exist_ok=True)

# Helper function to generate clean 3D graphic card with 3D gradient background, object icon graphic, and crisp badge
def render_3d_card(filename, title, emoji_symbol, bg_color1, bg_color2, accent_color):
    w, h = 600, 600
    img = Image.new('RGB', (w, h), bg_color1)
    draw = ImageDraw.Draw(img)
    
    # Draw radial/linear gradient background
    for y in range(h):
        r = int(bg_color1[0] + (bg_color2[0] - bg_color1[0]) * y / h)
        g = int(bg_color1[1] + (bg_color2[1] - bg_color1[1]) * y / h)
        b = int(bg_color1[2] + (bg_color2[2] - bg_color1[2]) * y / h)
        draw.line([(0, y), (w, y)], fill=(r, g, b))
    
    # Draw 3D glossy central card container
    margin = 40
    card_rect = [margin, margin, w - margin, h - margin]
    draw.rounded_rectangle(card_rect, radius=36, fill=(255, 255, 255, 235), outline=accent_color, width=6)
    
    # Draw inner 3D shadow circle
    center_x, center_y = w // 2, h // 2 - 30
    radius = 160
    draw.ellipse([center_x - radius, center_y - radius, center_x + radius, center_y + radius], fill=(240, 243, 248), outline=(220, 225, 235), width=4)
    
    # Render crisp emoji symbol in center if font available, or draw high quality shape
    try:
        # Load system font for large emoji / text
        font = ImageFont.truetype("/System/Library/Fonts/Apple Color Emoji.ttc", 130)
        draw.text((center_x - 65, center_y - 75), emoji_symbol, font=font, embedded_color=True)
    except Exception as e:
        # Fallback text rendering
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 90)
        draw.text((center_x - 50, center_y - 50), emoji_symbol, fill=(30, 41, 59), font=font)
        
    # Draw label pill banner at bottom
    banner_w, banner_h = 440, 70
    banner_rect = [center_x - banner_w//2, h - 130, center_x + banner_w//2, h - 60]
    draw.rounded_rectangle(banner_rect, radius=20, fill=accent_color)
    
    try:
        font_title = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 32)
    except:
        font_title = ImageFont.load_default()
        
    bbox = draw.textbbox((0, 0), title, font=font_title)
    tw = bbox[2] - bbox[1]
    draw.text((center_x - tw//2, h - 112), title, fill=(255, 255, 255), font=font_title)
    
    out_path = os.path.join('public/images/week33', filename)
    img.save(out_path, 'JPEG', quality=95)
    print(f"Rendered card: {out_path}")

# Render the 8 distinct cards
render_3d_card('card_clean_bandage.jpg', 'Clean Bandage', '🩹', (255, 241, 242), (254, 205, 211), (225, 29, 72))
render_3d_card('card_cold_pack.jpg', 'Cold Pack', '🧊', (236, 254, 255), (165, 243, 252), (8, 145, 178))
render_3d_card('card_science_notebook.jpg', 'Science Notebook', '📓', (238, 242, 255), (199, 210, 254), (79, 70, 229))
render_3d_card('card_orange_juice.jpg', 'Orange Juice', '🍹', (255, 251, 235), (253, 230, 138), (217, 119, 6))
render_3d_card('card_alarm_clock.jpg', 'Alarm Clock', '⏰', (250, 245, 255), (233, 213, 255), (147, 51, 234))

# 3 Distractors
render_3d_card('card_backpack.jpg', 'School Backpack', '🎒', (240, 253, 244), (187, 247, 208), (22, 163, 74))
render_3d_card('card_water_bottle.jpg', 'Water Bottle', '🍾', (240, 249, 255), (186, 230, 253), (2, 132, 199))
render_3d_card('card_first_aid_kit.jpg', 'First Aid Kit', '🧰', (254, 242, 242), (254, 202, 202), (220, 38, 38))

