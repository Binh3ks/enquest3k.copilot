import json, os

exec(open('parse_w1_24.py').read().replace('print(', '#print('))

out_dir = 'mcp-server/data/lessons'
for wk, data in new_weeks.items():
    fpath = os.path.join(out_dir, f'W{wk}.json')
    with open(fpath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
print(f"Written {len(new_weeks)} files: {sorted(int(k) for k in new_weeks)}")

# Update public/data/lessonPlans.json
with open('public/data/lessonPlans.json', 'r', encoding='utf-8') as f:
    existing = json.load(f)
merged = {**new_weeks, **existing}
merged_sorted = {str(k): merged[str(k)] for k in sorted(int(x) for x in merged.keys())}
with open('public/data/lessonPlans.json', 'w', encoding='utf-8') as f:
    json.dump(merged_sorted, f, ensure_ascii=False, indent=2)
print(f"public/data/lessonPlans.json: {len(merged_sorted)} weeks")

# Update both index files
for idx_path in ['mcp-server/data/lessonPlans_index.json', 'public/data/lessonPlans_index.json']:
    with open(idx_path, 'r', encoding='utf-8') as f:
        idx = json.load(f)
    for wk, data in new_weeks.items():
        idx[wk] = {"week": int(wk), "unit_theme": data.get("unit_theme", "")}
    idx_sorted = {str(k): idx[str(k)] for k in sorted(int(x) for x in idx.keys())}
    with open(idx_path, 'w', encoding='utf-8') as f:
        json.dump(idx_sorted, f, ensure_ascii=False, indent=2)
    print(f"{idx_path}: {len(idx_sorted)} weeks")

print("Done!")
