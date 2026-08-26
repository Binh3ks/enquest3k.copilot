import numpy as np
from PIL import Image, ImageDraw, ImageFilter

# 1. Load Scene A
img_a = Image.open('public/images/week34/w34_diff_scene_a.jpg').convert('RGB')
w, h = img_a.size
img_b = img_a.copy()
draw = ImageDraw.Draw(img_b)

# (1) Flower on tree trunk: recolor pink -> bright yellow at ~ (79%, 50%) -> (948, 448)
cx1, cy1 = int(0.79 * w), int(0.50 * h)
r1 = 35
# Draw yellow flower petals with orange center
draw.ellipse([cx1 - 25, cy1 - 25, cx1 + 25, cy1 + 25], fill=(255, 215, 0), outline=(230, 180, 0), width=2)
draw.ellipse([cx1 - 10, cy1 - 10, cx1 + 10, cy1 + 10], fill=(255, 140, 0))

# (2) Butterfly on rock: inpaint with rock grey-green texture at ~ (18%, 60%) -> (216, 538)
cx2, cy2 = int(0.18 * w), int(0.60 * h)
# Sample texture from adjacent rock (cx2, cy2 + 40)
rock_patch = img_a.crop((cx2 - 30, cy2 + 30, cx2 + 30, cy2 + 90))
rock_patch = rock_patch.filter(ImageFilter.GaussianBlur(radius=1.5))
img_b.paste(rock_patch, (cx2 - 30, cy2 - 30))

# (3) Sun top-left: draw fluffy white cloud over it at ~ (15%, 10%) -> (180, 90)
cx3, cy3 = int(0.15 * w), int(0.10 * h)
draw.ellipse([cx3 - 45, cy3 - 25, cx3 + 25, cy3 + 25], fill=(245, 248, 255), outline=(220, 230, 245), width=2)
draw.ellipse([cx3 - 20, cy3 - 40, cx3 + 50, cy3 + 20], fill=(245, 248, 255), outline=(220, 230, 245), width=2)
draw.ellipse([cx3 + 10, cy3 - 25, cx3 + 65, cy3 + 25], fill=(245, 248, 255), outline=(220, 230, 245), width=2)
draw.ellipse([cx3 - 25, cy3 - 10, cx3 + 45, cy3 + 28], fill=(255, 255, 255))

# (4) Mouse tail: draw curled pink tail at ~ (27%, 72%) -> (324, 645)
cx4, cy4 = int(0.27 * w), int(0.72 * h)
# Cover old tail area with grass/ground patch nearby
ground_patch = img_a.crop((cx4 - 20, cy4 + 25, cx4 + 20, cy4 + 65))
img_b.paste(ground_patch, (cx4 - 20, cy4 - 20))
# Draw curled pink tail pointing down
draw.arc([cx4 - 15, cy4 - 15, cx4 + 15, cy4 + 20], start=0, end=270, fill=(255, 160, 180), width=5)

# Save with 100 quality
img_b.save('public/images/week34/w34_diff_scene_b.jpg', 'JPEG', quality=98)
print("Saved w34_diff_scene_b.jpg")

# 2. Pixel diff validation
arr_a = np.array(img_a, dtype=np.int16)
arr_b = np.array(img_b, dtype=np.int16)
diff = np.sum(np.abs(arr_a - arr_b), axis=2)
diff_mask = diff > 30

# Count connected components / cluster check
from scipy.ndimage import label, center_of_mass
try:
    labeled, num_features = label(diff_mask)
    print(f"Detected {num_features} difference clusters")
    centers = center_of_mass(diff_mask, labeled, range(1, num_features + 1))
    for i, (cy, cx) in enumerate(centers):
        size = np.sum(labeled == (i + 1))
        print(f"Cluster {i+1}: centroid ({cx/w*100:.1f}%, {cy/h*100:.1f}%), size={size} px")
except Exception as e:
    print("Scipy not installed, basic check done")
