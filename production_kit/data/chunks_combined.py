"""Auto-combined Layer 3 collocation dictionary.
Loads from:
  - chunks_a1_b1.py (main curated list, 1098+ entries)
  - extra_collocations.py (phrasal verbs, 1971 entries)
  - learned_whitelist.json (from Layer 4 self-learning)
"""
import sys, pathlib, json

def _load(name, attr):
    sys.path.insert(0, str(pathlib.Path(__file__).parent))
    spec = __import__('importlib.util').util.spec_from_file_location(name, str(pathlib.Path(__file__).parent / f"{name}.py"))
    mod = __import__('importlib.util').util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return getattr(mod, attr)

CHUNKS_MAIN = _load('chunks_a1_b1', 'CHUNKS_A1_B1')
CHUNKS_EXTRA = _load('extra_collocations', 'CHUNKS_EXTRA')
LEARNED_PATH = pathlib.Path(__file__).parent / 'learned_whitelist.json'
LEARNED = set(json.loads(LEARNED_PATH.read_text())) if LEARNED_PATH.exists() else set()

CHUNKS_ALL = CHUNKS_MAIN | CHUNKS_EXTRA | LEARNED
print(f"Layer 3 combined: {len(CHUNKS_MAIN)} main + {len(CHUNKS_EXTRA)} extra + {len(LEARNED)} learned = {len(CHUNKS_ALL)} total", file=__import__('sys').stderr)
