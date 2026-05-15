import re, os, glob

def get_all_image_refs(week_num):
    """Collect all unique /images/weekNN/*.jpg references from all JS files for this week."""
    refs = set()
    patterns = [
        f'src/data/weeks/week_{week_num:02d}/*.js',
        f'src/data/weeks_easy/week_{week_num:02d}/*.js',
    ]
    for pattern in patterns:
        for fpath in glob.glob(pattern):
            txt = open(fpath).read()
            found = re.findall(rf'/images/week{week_num}[^"]*\.(?:jpg|png|webp)', txt)
            refs.update(found)
    return refs

def get_existing_images(week_num):
    folder = f'public/images/week{week_num}'
    if not os.path.exists(folder):
        return set()
    return set(f'/images/week{week_num}/{f}' for f in os.listdir(folder)
               if f.endswith(('.jpg', '.png', '.webp')))

for w in [28, 29, 30, 31]:
    refs = get_all_image_refs(w)
    existing = get_existing_images(w)
    missing = sorted(refs - existing)
    extra = sorted(existing - refs)  # files that exist but nothing references

    print(f"\n{'='*60}")
    print(f"WEEK {w}")
    print(f"  Referenced: {len(refs)} unique images")
    print(f"  Existing  : {len(existing)} files in folder")
    print(f"  MISSING   : {len(missing)}")
    for m in missing:
        print(f"    ❌ {m}")
    if extra:
        print(f"  UNREFERENCED (exist but unused): {len(extra)}")
        for e in extra:
            print(f"    📦 {e}")
