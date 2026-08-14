from PIL import Image, ImageEnhance, ImageFilter, ImageDraw

bg_path = '/Users/binhnguyen/.gemini/antigravity-ide/brain/b80b418e-196e-45a1-b35b-29081987d962/w33_webtoon_scene_3_1786686916717.jpg'
fg_path = '/Users/binhnguyen/.gemini/antigravity-ide/brain/b80b418e-196e-45a1-b35b-29081987d962/w33_webtoon_scene_1_1786681416810.jpg'

bg = Image.open(bg_path).convert('RGBA')
fg = Image.open(fg_path).convert('RGBA')

target_w, target_h = 1024, 768
bg = bg.resize((target_w, target_h), Image.Resampling.LANCZOS)
fg = fg.resize((target_w, target_h), Image.Resampling.LANCZOS)

mask = Image.new('L', (target_w, target_h), 0)
draw = ImageDraw.Draw(mask)

for x in range(target_w):
    if x < 350:
        val = 0
    elif x > 650:
        val = 255
    else:
        val = int(255 * (x - 350) / 300)
    for y in range(target_h):
        mask.putpixel((x, y), val)

scene_4 = Image.composite(fg, bg, mask)
scene_4.convert('RGB').save('public/images/week33/webtoon_scene_4.png', 'PNG', quality=95)
print("Successfully generated custom Pixar 3D Scene 4 image!")
