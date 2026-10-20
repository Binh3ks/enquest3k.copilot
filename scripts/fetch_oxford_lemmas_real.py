import json
import re
import urllib.request
import urllib.error
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor
import os
import glob

# 1. Load batch 1 data
with open("docs/agent_artifacts/f7d3_batch1.json") as f:
    batch1 = json.load(f)

# Explicit lemma map
lemma_map = {
    "heard": "hear", "children": "child", "joined": "join",
    "was": "be", "is": "be", "fell": "fall", "made": "make",
    "had": "have", "has": "have", "cats": "cat", "hours": "hour",
    "babies": "baby", "friends": "friend", "frogs": "frog",
    "won": "win", "students": "student", "took": "take",
    "needs": "need", "farmers": "farmer", "seeds": "seed",
    "flowers": "flower", "does": "do", "keeps": "keep",
    "looks": "look", "older": "old", "sisters": "sister",
    "trees": "tree", "walls": "wall", "waters": "water",
    "works": "work", "woke": "wake", "asks": "ask",
    "brothers": "brother", "clouds": "cloud", "beds": "bed",
    "dried": "dry"
}

all_tokens = []
unique_tokens = set()

for r in batch1:
    for c in r["cards"]:
        tokens = re.findall(r"[a-zA-Z]+", c["text"].lower())
        for t in tokens:
            all_tokens.append(t)
            unique_tokens.add(t)

lemmas = sorted(list(set(lemma_map.get(t, t) for t in unique_tokens)))

print(f"Total token occurrences: {len(all_tokens)}")
print(f"Unique tokens (word types): {len(unique_tokens)}")
print(f"Unique lemmas to fetch: {len(lemmas)}")

# 2. Fetch Oxford entries
def fetch_oxford(lemma):
    headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)"}
    # Try _1 first, then bare
    urls = [
        f"https://www.oxfordlearnersdictionaries.com/definition/english/{lemma}_1",
        f"https://www.oxfordlearnersdictionaries.com/definition/english/{lemma}"
    ]
    
    last_err = None
    for url in urls:
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=8) as resp:
                html = resp.read().decode("utf-8")
                pos_m = re.search(r"class=\"pos\"[^>]*>([^<]+)<", html) or re.search(r"pos\">([^<]+)<", html)
                pos = pos_m.group(1).strip() if pos_m else "N/A"
                
                lvl_m = re.search(r"class=\"ox3ksym_([a-z0-9]+)\"", html) or re.search(r"data-ox500=\"([a-z0-9]+)\"", html)
                level = lvl_m.group(1).upper() if lvl_m else "NOT_IN_OXFORD3000"
                
                ts = datetime.utcnow().isoformat() + "Z"
                return {
                    "word": lemma,
                    "url": url,
                    "pos": pos,
                    "level": level,
                    "timestamp": ts,
                    "status": "FETCH_SUCCESS"
                }
        except urllib.error.HTTPError as e:
            if e.code == 404:
                continue
            last_err = str(e)
        except Exception as e:
            last_err = str(e)
            
    ts = datetime.utcnow().isoformat() + "Z"
    return {
        "word": lemma,
        "url": urls[0],
        "pos": "N/A",
        "level": "NOT_IN_OXFORD3000",
        "timestamp": ts,
        "status": f"ERROR: {last_err or '404'}"
    }

print("\nStarting concurrent Oxford fetching (ThreadPool 6 workers)...")
results = []
with ThreadPoolExecutor(max_workers=6) as executor:
    for res in executor.map(fetch_oxford, lemmas):
        results.append(res)
        print(f"  [{res['word']}] -> {res['pos']} | {res['level']} | {res['url']}")

os.makedirs("docs/agent_artifacts", exist_ok=True)
with open("docs/agent_artifacts/oxford_scraped_lemmas.json", "w") as f:
    json.dump(results, f, indent=2)

print("\nSaved docs/agent_artifacts/oxford_scraped_lemmas.json")

# 3. Scan with official_wordlists
wordlists = {}
for p in glob.glob("src/data/official_wordlists/*.json"):
    name = os.path.basename(p).replace(".json", "")
    with open(p) as f:
        data = json.load(f)
        words = data.get("words", []) if isinstance(data, dict) else data
        s = set()
        for item in words:
            w_str = item if isinstance(item, str) else item.get("word", "")
            for tok in w_str.lower().split():
                clean = re.sub(r"[^a-z]", "", tok)
                if clean: s.add(clean)
        wordlists[name] = s

official_scan = []
for lemma in lemmas:
    tier = None
    if lemma in wordlists.get("starters_pre_a1", set()):
        tier = "Pre-A1 (Starters)"
    elif lemma in wordlists.get("movers_a1", set()):
        tier = "A1 (Movers)"
    elif lemma in wordlists.get("flyers_a2", set()):
        tier = "A2 (Flyers)"
    elif lemma in wordlists.get("ket_a2", set()):
        tier = "A2 (KET)"
    else:
        tier = "NOT_IN_LIST"
        
    official_scan.append({
        "word": lemma,
        "tier": tier
    })

with open("docs/agent_artifacts/official_wordlists_scanned.json", "w") as f:
    json.dump(official_scan, f, indent=2)

print("Saved docs/agent_artifacts/official_wordlists_scanned.json")
