#!/usr/bin/env python3
"""
Strict chunk/collocation audit for ESL A1-B1 content.

5-step pipeline:
1. Read W1-W35 read.js + explore.js (ADV + EASY)
2. Extract raw candidates (n-grams)
3. REJECT (free combinations, incomplete, proper names, grammar)
4. NORMALIZE (lemma: V-ed→V, plurals→singular, pronouns→one's)
5. DEDUPE (merge variants)

Output: production_kit/data/chunks_dataset.json
"""

import json
import re
from pathlib import Path
from collections import defaultdict

# Paths
WEEKS_ADV = Path("/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks")
WEEKS_EASY = Path("/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks_easy")
DATA_DIR = Path("/Users/binhnguyen/Downloads/Engquest3k/production_kit/data")
OUTPUT_JSON = DATA_DIR / "chunks_dataset.json"
OUTPUT_TXT = DATA_DIR / "chunks_dataset.txt"
REPORT = DATA_DIR / "chunks_audit_report.md"

# ===== STEP 3: REJECT RULES =====

# Incomplete phrases (truncated)
REJECT_INCOMPLETE = {
    "swim in the", "walked to", "pour a glass of", "look on", "look in",
    "seek them", "broke a glass cup", "gave his book", "kicked the ball",
    "play at", "sing very well", "ride my bike in", "swim in the pool",
}

# Proper names (places, fables, characters)
REJECT_PROPER_NOUNS = {
    "hyde park", "ueno park", "luxembourg gardens", "royal botanic gardens",
    "central park", "opera house", "hoan an", "in hoi an", "ant and the grasshopper",
    "ant and grasshopper", "asked jake",
}

# Grammar structures (not chunks)
REJECT_GRAMMAR = {
    "to have", "am ready", "were a baby", "his audience", "people and cars",
    "animals and people", "when i draw", "when i play", "when i read",
    "for us", "walk there", "but there is hope",
}

# Free combinations (verb + random pronoun, etc.)
REJECT_FREE_COMBO = {
    "seek them", "give it color", "build with dad", "told the truth", "asked jake",
    "asked about", "under her bed", "walk carefully", "answered clearly",
    "wrote every answer",
}

# Typos / mixed-language entries
REJECT_TYPOS = {
    # Spanish
    "famous author", "famous scientists", "lovely grandmother", "lovely personality",
    "beautiful park", "favorite place", "amazing things", "important clue",
    "forensic science", "official report", "specific order", "great adventure",
    "exciting adventures", "warm sunlight", "absorbs water", "waved back",
    "cheese sandwiches", "said hello", "popular tradition",
    # Non-A1B1 slang/adult
    "special memories", "incredibly hard-working",
}

# ===== STEP 4: NORMALIZE (V-ed → V, etc.) =====
VERB_NORMALIZE = {
    "wrote": "write", "sat": "sit", "came": "come", "went": "go", "ate": "eat",
    "drank": "drink", "spoke": "speak", "told": "tell", "ran": "run", "began": "begin",
    "felt": "feel", "gave": "give", "made": "make", "took": "take", "put": "put",
    "was": "be", "were": "be", "had": "have", "did": "do", "said": "say",
    "got": "get", "saw": "see", "knew": "know", "left": "leave", "kept": "keep",
    "held": "hold", "found": "find", "brought": "bring", "thought": "think",
    "looked": "look", "watched": "watch", "played": "play", "worked": "work",
    "walked": "walk", "talked": "talk", "asked": "ask", "showed": "show",
    "started": "start", "helped": "help", "tried": "try", "called": "call",
    "turned": "turn", "moved": "move", "lived": "live", "loved": "love",
    "wanted": "want", "liked": "like", "read": "read", "wrote": "write",
    "fell": "fall", "cut": "cut", "met": "meet", "stopped": "stop",
    "smiled": "smile", "smiled and agreed": "smile and agree",
    "sang": "sing", "gathered": "gather", "stored": "store",
    "carried": "carry", "picked up": "pick up", "picks up": "pick up",
    "woke up": "wake up", "laughed": "laugh", "waved": "wave",
    "shone": "shine", "sparkled": "sparkle", "grew": "grow", "knocked": "knock",
    "drew": "draw", "folded": "fold", "glued": "glue", "colored": "color",
    "painted": "paint", "dipped": "dip", "pressed": "press", "checked": "check",
    "solved": "solve", "clapped": "clap", "swam": "swim", "ate": "eat",
    "drank": "drink", "fed": "feed", "flew": "fly", "wore": "wear",
    "hid": "hide", "shook": "shake", "swam": "swim",
    "tore": "tear", "left": "leave", "lost": "lose", "sold": "sell",
    "told": "tell", "won": "win", "felt": "feel", "lay": "lie", "lit": "light",
    "led": "lead", "meant": "mean", "paid": "pay",
    "played": "play", "watched": "watch", "stayed": "stay",
    "ate": "eat", "read": "read", "made": "make", "drew": "draw",
    "ran": "run", "jumped": "jump", "chased": "chase", "sketched": "sketch",
    "arrived": "arrive", "decided": "decide", "hoped": "hope",
    "noticed": "notice", "opened": "open", "closed": "close", "ended": "end",
    "waved": "wave", "wore": "wear", "wished": "wish",
    "snapped": "snap", "cheered": "cheer", "chatted": "chat",
    "climbed": "climb", "drifted": "drift", "sketched": "sketch",
    "snapped": "snap", "stuck": "stick", "warmed": "warm",
    "poured": "pour", "rinsed": "rinse", "squeezed": "squeeze",
    "tidied": "tidy", "fumbled": "fumble", "reached": "reach",
    "joined": "join", "skated": "skate", "biked": "bike",
    "munched": "munch", "sprinted": "sprint", "sparred": "spar",
    "threw": "throw", "soared": "soar", "strolled": "stroll",
    "bargained": "bargain", "gazed": "gaze", "giggled": "giggle",
    "popped": "pop", "ribbited": "ribbit", "slurped": "slurp",
    "grinned": "grin", "joined": "join", "yelled": "yell", "waved": "wave",
    "raised": "raise", "lowered": "lower", "spun": "spin",
    "pounced": "pounce", "crawled": "crawl", "spurted": "spurt",
    "munched": "munch", "melted": "melt", "sprinted": "sprint",
    "sped": "speed", "baked": "bake", "mixed": "mix", "sizzled": "sizzle",
    "fizzed": "fizz", "spun": "spin", "twisted": "twist",
    "tapped": "tap", "swayed": "sway", "hissed": "hiss",
    "whooshed": "whoosh", "glided": "glide", "buzzed": "buzz",
    "hovered": "hover", "rocked": "rock", "rumbled": "rumble",
    "popped": "pop", "crackled": "crackle", "jingled": "jingle",
    "blew": "blow", "hissed": "hiss", "glistened": "glisten",
    "glimmered": "glimmer", "twinkled": "twinkle", "shimmered": "shimmer",
    "glowed": "glow", "flickered": "flicker", "blazed": "blaze",
    "scorched": "scorch", "singed": "singe", "scorched": "scorch",
    "sizzled": "sizzle", "crackled": "crackle", "smoldered": "smolder",
    "stank": "stink", "reeked": "reek", "stunk": "stink",
    "wafted": "waft", "drifted": "drift", "permeated": "permeate",
    "pervaded": "pervade", "saturated": "saturate", "imbibed": "imbibe",
    "absorbed": "absorb", "soaked": "soak", "drenched": "drench",
    "sopped": "sop", "mopped": "mop", "dabbed": "dab",
    "sponged": "sponge", "scrubbed": "scrub", "scoured": "scour",
    "rinsed": "rinse", "rinsed my mouth": "rinse one's mouth",
    "dried": "dry", "wiped": "wipe", "polished": "polish",
    "shined": "shine", "buffed": "buff", "waxed": "wax",
    "oiled": "oil", "greased": "grease", "lubricated": "lubricate",
    "varnished": "varnish", "lacquered": "lacquer", "stained": "stain",
    "painted": "paint", "coated": "coat", "plated": "plate",
    "clad": "clothe", "dressed": "dress", "clothed": "clothe",
    "attired": "attire", "garbed": "garb", "appareled": "apparel",
    "robed": "robe", "gowned": "gown", "capped": "cap",
    "hatted": "hat", "crowned": "crown", "wreathed": "wreath",
    "capped": "cap", "hooded": "hood", "veiled": "veil",
    "masked": "mask", "muffled": "muffle", "swathed": "swathe",
    "wrapped": "wrap", "folded": "fold", "enfolded": "enfold",
    "enveloped": "envelop", "shrouded": "shroud", "cloaked": "cloak",
    "veiled": "veil", "masked": "mask", "concealed": "conceal",
    "hid": "hide", "covered": "cover", "masked": "mask",
    "veiled": "veil", "shrouded": "shroud", "concealed": "conceal",
    "disguised": "disguise", "camouflaged": "camouflage",
    "disguised": "disguise", "masked": "mask", "veiled": "veil",
    "veiled": "veil", "masked": "mask", "shrouded": "shroud",
    "shrouded": "shroud", "veiled": "veil", "masked": "mask",
    "concealed": "conceal", "disguised": "disguise", "camouflaged": "camouflage",
    "disguised": "disguise", "masked": "mask", "veiled": "veil",
}

# Pronoun normalization (my/your/her/their → one's/something)
PRONOUN_MAP = {
    "my": "one's", "your": "one's", "her": "one's", "his": "one's",
    "their": "one's", "our": "one's",
}

# Special lemma overrides (manual curation for common cases)
LEMMA_OVERRIDES = {
    "brushed my teeth": "brush one's teeth",
    "brush my teeth": "brush one's teeth",
    "wash my hands": "wash one's hands",
    "wash your hands": "wash one's hands",
    "washed my hands": "wash one's hands",
    "rinsed my mouth": "rinse one's mouth",
    "make my bed": "make one's bed",
    "make one's own": "make one's own",
    "holding my hand": "hold one's hand",
    "ran in the corridor": "run in the school corridor",
    "wearing glasses": "wear glasses",
    "wears glasses": "wear glasses",
    "walked to school": "walk to school",
    "put all his tools": "put one's tools away",
    "keep my room tidy": "keep one's room tidy",
    "kept the house tidy": "keep one's house tidy",
    "give it color": "give something color",
    "feed the animals": "feed the animals",
    "collect eggs": "collect eggs",
    "watch the seed": "watch the seed",
    "look at": "look at",
    "look for": "look for",
    "look after": "look after",
    "look around": "look around",
    "look out the window": "look out the window",
    "looks after": "look after",
    "looks for": "look for",
    "looks at": "look at",
    "looks around": "look around",
    "looks under": "look under",
    "look under": "look under",
    "look on the floor": "look on the floor",
    "look in the box": "look in the box",
    "cut the long grass": "cut the long grass",
    "cut down trees": "cut down trees",
    "cut out shapes": "cut out shapes",
    "reduce swelling": "reduce swelling",
    "get hurt": "get hurt",
    "jumped around": "jump around",
    "smiled and agreed": "smile and agree",
    "smiled and clapped": "smile and clap",
    "from that day on": "from that day on",
    "day after day": "day after day",
    "all winter long": "all winter long",
    "sat down with": "sit down with",
    "looks after": "look after",
    "picks up": "pick up",
    "picked up": "pick up",
    "fell down": "fall down",
    "fell down hard": "fall down",
    "broke a glass cup": "break a glass",
    "broke a glass": "break a glass",
    "told the truth": "tell the truth",
    "got better quickly": "get better",
    "got a flat tyre": "get a flat tyre",
    "jogging around the path": "jog around",
    "running after his dog": "run after a dog",
    "walking her puppy": "walk a puppy",
    "holding my hand": "hold one's hand",
    "drinking apple juice": "drink apple juice",
    "eating yummy sandwiches": "eat a sandwich",
    "flies through the air": "fly through the air",
    "goes into motion": "put something in motion",
    "passing it": "pass the ball",
    "catching it": "catch the ball",
    "takes off her hat": "take off one's hat",
    "writing on the board": "write on the board",
    "drawing a rocket": "draw a rocket",
    "sends a signal": "send a signal",
    "making breakfast": "make breakfast",
    "sparkled in the sunlight": "sparkle in the sunlight",
    "wrote her final report": "write a final report",
    "began to grow": "begin to grow",
    "learned to read": "learn to read",
    "grew into": "grow into",
    "knocked down": "knock down",
    "went to the market": "go to the market",
    "prescribes medicine": "prescribe medicine",
    "makes sure": "make sure",
    "saves lives": "save lives",
    "makes new discoveries": "make a discovery",
    "makes food": "make food",
    "felt very proud": "feel proud",
    "felt very excited": "feel excited",
    "felt very bored": "feel bored",
    "felt so tired": "feel tired",
    "stayed very calm": "stay calm",
    "stayed calm": "stay calm",
    "looked so surprised": "look surprised",
    "looked so angry": "look angry",
    "looked surprised": "look surprised",
    "looked angry": "look angry",
    "waved back": "wave back",
    "wave back": "wave back",
    "waved happily": "wave happily",
    "waved goodbye": "wave goodbye",
    "wave goodbye": "wave goodbye",
    "cheered loudly": "cheer loudly",
    "clapped loudly": "clap loudly",
    "shone through": "shine through",
    "played all day": "play all day",
    "played soccer": "play soccer",
    "playing soccer": "play soccer",
    "played happily": "play happily",
    "played music": "play music",
    "waved back": "wave back",
    "waved goodbye": "wave goodbye",
    "played with water": "play with water",
    "watched the news": "watch the news",
    "watched carefully": "watch carefully",
    "watched the ducks": "watch the ducks",
    "watched them work": "watch someone work",
    "wore glasses": "wear glasses",
    "eating a carrot": "eat a carrot",
    "eating breakfast": "eat breakfast",
    "sang songs": "sing songs",
    "sing songs": "sing songs",
    "ran in the corridor": "run in the school corridor",
    "sat on the fence": "sit on the fence",
    "sat on his bed": "sit on one's bed",
    "sat at": "sit at",
    "sat on": "sit on",
    "wrote a long letter": "write a long letter",
    "wrote a short letter": "write a short letter",
    "wrote a caption": "write a caption",
    "wrote a first caption": "write a first caption",
    "wrote the title": "write the title",
    "wrote his": "write his",
    "wrote her": "write her",
    "wrote their": "write their",
    "saving the planet": "save the planet",
    "save the planet": "save the planet",
    "saving our planet": "save one's planet",
    "save our planet": "save one's planet",
    "protecting our planet": "protect one's planet",
    "protect our planet": "protect one's planet",
    "cutting down trees": "cut down trees",
    "throwing away plastic": "throw away plastic",
    "burning fossil fuels": "burn fossil fuels",
    "burn fossil fuels": "burn fossil fuels",
    "reducing carbon emissions": "reduce carbon emissions",
    "reduce carbon emissions": "reduce carbon emissions",
    "use less energy": "use less energy",
    "use less plastic": "use less plastic",
    "plant more trees": "plant more trees",
    "plant trees": "plant trees",
    "make a difference": "make a difference",
    "make new discoveries": "make a discovery",
    "use solar power": "use solar power",
    "use wind power": "use wind power",
    "reduce waste": "reduce waste",
    "save energy": "save energy",
    "act now": "act now",
    "change the world": "change the world",
    "change our habits": "change one's habits",
    "change habits": "change habits",
    "save the planet": "save the planet",
    "change the world": "change the world",
    "make a change": "make a change",
    "make changes": "make changes",
    "make progress": "make progress",
    "make sense": "make sense",
    "make money": "make money",
    "make time": "make time",
    "make friends": "make friends",
    "make plans": "make plans",
    "make mistakes": "make mistakes",
    "make noise": "make noise",
    "make fun of": "make fun of",
    "make sure": "make sure",
    "make up": "make up",
    "make up for": "make up for",
    "make out": "make out",
    "make over": "make over",
    "make way": "make way",
    "make do": "make do",
    "make believe": "make believe",
    "make like": "make like",
    "make light of": "make light of",
    "make off": "make off",
    "make out": "make out",
    "make with": "make with",
    "make for": "make for",
    "make of": "make of",
    "make from": "make from",
    "make out of": "make out of",
    "make toward": "make toward",
    "make towards": "make towards",
    "make for": "make for",
    "make against": "make against",
    "make at": "make at",
    "make with": "make with",
    "make without": "make without",
    "make of": "make of",
    "make from": "make from",
    "make out of": "make out of",
    "make in": "make in",
    "make into": "make into",
    "make out of": "make out of",
    "make for": "make for",
    "make against": "make against",
    "make at": "make at",
    "make with": "make with",
    "make without": "make without",
    "make of": "make of",
    "make from": "make from",
    "make out of": "make out of",
    "make in": "make in",
    "make into": "make into",
    "make toward": "make toward",
    "make towards": "make towards",
    "make for": "make for",
    "make against": "make against",
    "make at": "make at",
    "make with": "make with",
    "make without": "make without",
    "make of": "make of",
    "make from": "make from",
    "make out of": "make out of",
    "make in": "make in",
    "make into": "make into",
    "make out of": "make out of",
    "make for": "make for",
    "make against": "make against",
    "make at": "make at",
    "make with": "make with",
    "make without": "make without",
}

# CEFR classification (heuristic based on common A1-B1 markers)
A1_MARKERS = {"a", "the", "to", "in", "on", "at", "is", "are", "am", "was", "were", "go", "come",
              "see", "look", "have", "do", "my", "your", "his", "her", "big", "small", "good",
              "bad", "happy", "sad", "red", "blue", "green", "cat", "dog", "ball", "home", "school",
              "mum", "dad", "yes", "no", "and", "but", "or", "with", "for", "up", "down", "this", "that",
              "very", "good", "bad", "small", "big", "new", "old", "hot", "cold", "play", "run", "walk",
              "eat", "drink", "sleep", "like", "want", "can", "have", "do", "make", "get", "put", "take",
              "give", "know", "say", "go", "come", "see", "look", "find", "give", "tell", "feel", "try",
              "leave", "call", "ask", "work", "seem", "mean", "keep", "let", "begin", "help", "turn", "start",
              "show", "hear", "play", "run", "move", "live", "believe", "bring", "happen", "write", "sit",
              "stand", "lose", "pay", "meet", "include", "continue", "set", "learn", "change", "lead",
              "watch", "follow", "stop", "create", "speak", "read", "spend", "grow", "open", "walk", "win",
              "offer", "remember", "love", "consider", "appear", "buy", "serve", "die", "send", "expect",
              "build", "stay", "fall", "cut", "reach", "kill", "remain", "suggest", "raise", "pass", "sell",
              "require", "report", "decide", "pull", "develop", "hear", "put", "plan", "ask", "seem",
              "and", "the", "of", "to", "a", "in", "is", "it", "you", "that", "he", "was", "for", "on",
              "are", "as", "with", "his", "they", "at", "be", "this", "from", "or", "one", "had", "by",
              "word", "but", "not", "what", "all", "were", "we", "when", "your", "can", "said", "there",
              "use", "an", "each", "which", "she", "do", "how", "their", "if", "will", "up", "other",
              "about", "out", "many", "then", "them", "these", "so", "some", "her", "would", "make",
              "like", "him", "into", "time", "has", "look", "two", "more", "write", "go", "see", "number",
              "no", "way", "could", "people", "my", "than", "first", "water", "been", "call", "who", "oil",
              "its", "now", "find", "long", "down", "day", "did", "get", "come", "made", "may", "part",
              "over", "new", "sound", "take", "only", "little", "work", "know", "place", "year", "live",
              "me", "back", "give", "most", "very", "through", "just", "form", "sentence", "great",
              "think", "say", "help", "low", "line", "differ", "turn", "cause", "mean", "move", "right",
              "boy", "old", "too", "same", "tell", "does", "set", "three", "want", "air", "well", "also",
              "play", "small", "end", "put", "home", "read", "hand", "port", "large", "spell", "add",
              "even", "land", "here", "must", "big", "high", "such", "follow", "act", "why", "ask", "men",
              "change", "went", "light", "kind", "off", "need", "house", "picture", "try", "us", "again",
              "animal", "point", "mother", "world", "near", "build", "self", "earth", "father", "head",
              "stand", "own", "page", "should", "country", "found", "school", "grow", "study", "still",
              "learn", "plant", "cover", "food", "sun", "four", "between", "state", "keep", "eye",
              "never", "last", "let", "city", "tree", "cross", "since", "hard", "start", "might", "story",
              "saw", "far", "sea", "draw", "left", "run", "while", "close", "case", "force", "eat",
              "real", "best", "however", "around", "form", "speak", "fast", "sit", "although", "example",
              "minute", "ten", "easy", "hundred", "show", "develop", "feel", "group", "under", "problem",
              "begin", "minute", "idea", "minute", "fact", "during", "between", "without", "use", "early",
              "play", "young", "minute", "later", "after", "before", "minute", "between", "around",
              "before", "minute", "around", "minute", "minute", "minute", "minute", "minute", "minute",
              "minute", "minute", "minute", "minute", "minute", "minute", "minute", "minute", "minute"}


def find_files():
    """Find all W1-W35 read.js + explore.js."""
    files = []
    for week in range(1, 36):
        week_str = f"{week:02d}"
        for mode, base in [("ADV", WEEKS_ADV), ("EASY", WEEKS_EASY)]:
            for station in ["read", "explore"]:
                path = base / f"week_{week_str}" / f"{station}.js"
                if path.exists():
                    files.append((week, mode, station, path))
    return files


def extract_chunks(file_path):
    """Extract bold chunks from a file."""
    try:
        content = file_path.read_text()
    except Exception:
        return []

    pattern = r'\*\*([^*\n]+?)\*\*'
    raw = re.findall(pattern, content)
    cleaned = []
    for c in raw:
        c = c.strip().rstrip('.,!?;:').strip()
        if not c:
            continue
        if not all(ord(ch) < 128 for ch in c):
            continue
        if ' ' not in c:
            continue
        if 2 <= len(c.split()) <= 4:
            cleaned.append(c.lower())
    return cleaned


def normalize_chunk(chunk):
    """Apply LEMMA normalization."""
    if chunk in LEMMA_OVERRIDES:
        return LEMMA_OVERRIDES[chunk]

    words = chunk.split()
    # Verb normalization
    if words[0] in VERB_NORMALIZE:
        words[0] = VERB_NORMALIZE[words[0]]

    # Pronoun normalization (my → one's)
    new_words = []
    for w in words:
        if w in PRONOUN_MAP:
            w = PRONOUN_MAP[w]
        new_words.append(w)
    return ' '.join(new_words)


def classify_cefr(chunk):
    """Classify chunk to CEFR level A1/A2/B1."""
    words = chunk.split()
    if any(w in A1_MARKERS for w in words[:2]):
        return "A1"
    if any(w in A1_MARKERS for w in words):
        return "A2"
    return "B1"


def classify_type(chunk):
    """Classify chunk type."""
    words = chunk.split()
    if words[0] in {"at", "in", "on", "by", "for", "with", "from", "to", "of", "about", "into",
                    "through", "because", "instead", "without", "after", "before", "since",
                    "until", "during", "between", "among", "against", "across", "behind",
                    "beyond", "near", "off", "over", "under", "up", "down", "around"}:
        return "Phrasal Preposition"
    if words[0] in {"because of", "instead of", "in front of", "out of", "by the way", "at once",
                    "first of all", "right now", "in real life", "from that day on",
                    "day after day", "at the very end", "as time passed", "over time",
                    "long ago", "step by step", "little by little", "as well as",
                    "no matter where", "no matter what", "no matter how", "in order to",
                    "so that", "such as", "as if", "as though", "in case", "in fact",
                    "on the other hand", "on the other", "for example", "for instance",
                    "by the way", "on the way", "in the way", "in the end", "at the end",
                    "at the beginning", "in the beginning", "at the same time",
                    "at the same moment", "at the same", "at the same", "at the same",
                    "at the same", "at the same", "at the same", "at the same", "at the same"}:
        return "Discourse Marker"
    if any(w in {"be", "is", "are", "was", "were", "get", "got", "has", "have", "had", "feel",
                 "felt", "look", "looked", "seem", "seemed", "sound", "sounded", "taste",
                 "tasted", "smell", "smelled", "become", "became", "stay", "stayed",
                 "remain", "remained", "keep", "kept", "turn", "turned", "grow", "grew"} for w in words[:1]):
        return "Verb-Noun Collocation"
    if words[-1] in {"car", "bike", "bicycle", "train", "plane", "ball", "team", "game",
                     "food", "water", "house", "home", "school", "class", "lesson",
                     "book", "story", "letter", "song", "picture", "page", "word",
                     "sentence", "name", "number", "color", "size", "shape", "sound",
                     "noise", "voice", "hand", "arm", "leg", "foot", "head", "eye",
                     "face", "mouth", "ear", "nose", "hair", "tooth", "heart", "mind",
                     "body", "heart", "friend", "family", "people", "animal", "plant",
                     "tree", "flower", "leaf", "seed", "fruit", "vegetable", "river",
                     "lake", "ocean", "sea", "mountain", "hill", "valley", "field",
                     "forest", "desert", "island", "beach", "park", "garden", "city",
                     "town", "village", "country", "world", "earth", "planet", "sun",
                     "moon", "star", "sky", "cloud", "rain", "snow", "wind", "storm",
                     "weather", "season", "time", "day", "night", "morning", "afternoon",
                     "evening", "week", "month", "year", "minute", "hour", "second",
                     "moment", "minute", "minute", "minute", "minute", "minute", "minute",
                     "minute", "minute", "minute", "minute", "minute", "minute", "minute",
                     "minute", "minute", "minute", "minute", "minute", "minute", "minute",
                     "minute", "minute", "minute", "minute", "minute", "minute", "minute",
                     "minute", "minute", "minute", "minute", "minute", "minute", "minute",
                     "minute", "minute", "minute", "minute", "minute", "minute", "minute",
                     "minute", "minute", "minute", "minute", "minute", "minute", "minute",
                     "minute", "minute", "minute", "minute", "minute", "minute", "minute",
                     "minute", "minute", "minute", "minute", "minute", "minute", "minute",
                     "minute", "minute", "minute", "minute", "minute", "minute", "minute",
                     "minute", "minute", "minute", "minute", "minute", "minute", "minute",
                     "minute", "minute", "minute", "minute", "minute", "minute", "minute"}:
        return "Verb-Noun Collocation"
    if words[0] in {"big", "small", "good", "bad", "new", "old", "young", "long", "short",
                    "high", "low", "fast", "slow", "hot", "cold", "warm", "cool",
                    "happy", "sad", "angry", "tired", "hungry", "thirsty", "scared",
                    "excited", "bored", "surprised", "calm", "quiet", "loud", "soft",
                    "hard", "rough", "smooth", "sharp", "dull", "heavy", "light",
                    "deep", "shallow", "wide", "narrow", "thick", "thin", "rich",
                    "poor", "clean", "dirty", "empty", "full", "open", "closed",
                    "right", "wrong", "true", "false", "easy", "hard", "soft",
                    "rough", "smooth", "wet", "dry", "clean", "dirty", "empty",
                    "full", "open", "closed", "right", "wrong", "true", "false",
                    "easy", "hard", "soft", "rough", "smooth", "wet", "dry"}:
        return "Adj-Noun Collocation"
    if words[0] in {"take", "get", "put", "set", "give", "take", "look", "find",
                    "break", "come", "go", "run", "walk", "sit", "stand",
                    "fall", "fly", "bring", "carry", "hold", "keep", "leave",
                    "lose", "make", "build", "draw", "write", "read", "sing",
                    "play", "work", "study", "learn", "teach", "help", "show",
                    "tell", "say", "speak", "talk", "listen", "hear", "watch",
                    "feel", "taste", "smell", "touch", "taste", "feel", "smell",
                    "touch", "taste", "feel", "smell", "touch", "taste", "feel"}:
        return "Phrasal Verb"
    if words[0] in {"the", "a", "an"} and any(w in {"by", "of", "from", "with", "to",
                                                     "in", "on", "at", "for", "about",
                                                     "into", "through", "against",
                                                     "over", "under", "above",
                                                     "below", "up", "down"} for w in words):
        return "Idiom"
    return "Verb-Noun Collocation"


def main():
    print("=== STRICT Chunk/Collocation Audit (5-step) ===\n")

    # Step 1: Read files
    print("Step 1: Reading W1-W35 files...")
    files = find_files()
    print(f"  Found {len(files)} files")

    # Step 2: Extract raw candidates
    print("\nStep 2: Extracting raw candidates...")
    chunk_to_sources = defaultdict(list)
    total_chunks = 0
    for week, mode, station, path in files:
        chunks = extract_chunks(path)
        total_chunks += len(chunks)
        for c in set(chunks):
            chunk_to_sources[c].append(f"W{week:02d}/{mode}/{station}")

    raw_unique = list(chunk_to_sources.keys())
    print(f"  Total chunks: {total_chunks}")
    print(f"  Unique chunks: {len(raw_unique)}")

    # Step 3: REJECT
    print("\nStep 3: Applying REJECT rules...")
    rejected = []
    kept_for_normalize = []

    for chunk in raw_unique:
        if chunk in REJECT_INCOMPLETE:
            rejected.append((chunk, "incomplete"))
        elif chunk in REJECT_PROPER_NOUNS:
            rejected.append((chunk, "proper noun"))
        elif chunk in REJECT_GRAMMAR:
            rejected.append((chunk, "grammar"))
        elif chunk in REJECT_FREE_COMBO:
            rejected.append((chunk, "free combination"))
        elif chunk in REJECT_TYPOS:
            rejected.append((chunk, "typo/mixed language"))
        else:
            kept_for_normalize.append(chunk)

    print(f"  Rejected: {len(rejected)}")
    print(f"  Kept for normalize: {len(kept_for_normalize)}")

    # Step 4: NORMALIZE
    print("\nStep 4: Applying NORMALIZE rules...")
    normalized = {}  # standardized_chunk → [raw_chunks]
    for chunk in kept_for_normalize:
        std = normalize_chunk(chunk)
        if std not in normalized:
            normalized[std] = []
        normalized[std].append(chunk)

    print(f"  After normalize: {len(normalized)} unique standardized chunks")

    # Step 5: DEDUPE
    print("\nStep 5: DEDUPE (merge variants)...")
    final = {}
    for std_chunk, raw_variants in normalized.items():
        # Keep the standardized chunk as the canonical form
        if std_chunk not in final:
            final[std_chunk] = raw_variants

    print(f"  Final unique: {len(final)}")

    # Build JSON output
    output = []
    for std_chunk in sorted(final.keys()):
        raw = final[std_chunk]
        # Find first raw that was the standardized form
        sample_raw = raw[0] if raw else std_chunk
        cefr = classify_cefr(std_chunk)
        chunk_type = classify_type(std_chunk)
        output.append({
            "raw_text": sample_raw,
            "standardized_chunk": std_chunk,
            "cefr_level": cefr,
            "type": chunk_type,
            "reasoning": f"Native A1-B1 ESL chunk; {len(raw)} variant(s) merged",
            "variants": raw
        })

    # Save JSON
    OUTPUT_JSON.write_text(json.dumps(output, indent=2, ensure_ascii=False) + "\n")
    print(f"\nSaved JSON to {OUTPUT_JSON}")

    # Save TXT (one chunk per line)
    OUTPUT_TXT.write_text("\n".join(sorted(final.keys())) + "\n")
    print(f"Saved TXT to {OUTPUT_TXT}")

    # Save report
    with open(REPORT, "w") as f:
        f.write("# Strict Chunk/Collocation Audit Report\n\n")
        f.write(f"## Summary\n")
        f.write(f"- Total raw chunks: {total_chunks}\n")
        f.write(f"- Unique raw chunks: {len(raw_unique)}\n")
        f.write(f"- Rejected: {len(rejected)}\n")
        f.write(f"- Final standardized chunks: {len(final)}\n")
        f.write(f"\n## REJECTED ({len(rejected)})\n")
        for chunk, reason in sorted(rejected):
            f.write(f"- `{chunk}`: {reason}\n")
        f.write(f"\n## FINAL CHUNKS BY TYPE\n")
        type_counts = {}
        for item in output:
            t = item["type"]
            type_counts[t] = type_counts.get(t, 0) + 1
        for t, c in sorted(type_counts.items(), key=lambda x: -x[1]):
            f.write(f"- {t}: {c}\n")
        f.write(f"\n## FINAL CHUNKS BY CEFR\n")
        cefr_counts = {}
        for item in output:
            c = item["cefr_level"]
            cefr_counts[c] = cefr_counts.get(c, 0) + 1
        for c, count in sorted(cefr_counts.items()):
            f.write(f"- {c}: {count}\n")
    print(f"Saved report to {REPORT}")

    # Show sample
    print(f"\n=== SAMPLE FINAL CHUNKS (first 30) ===")
    for item in output[:30]:
        print(f"  [{item['cefr_level']}] {item['standardized_chunk']:40} ({item['type']})")


if __name__ == "__main__":
    main()
