#!/usr/bin/env python3
"""
FULL SpaCy-based audit across all W1-W35 read.js/explore.js in BOTH modes.

For each file:
  1. Extract content_en
  2. Lemmatize + normalize possessives (my/his/her/their/our/your -> one's)
  3. Compare against curated chunk database
  4. Detect:
     - Single-word bolds (forbidden)
     - Multi-word bolds that should be the FULL idiom but got split
       (e.g., "slow and steady wins" + "the race" instead of "slow and steady wins the race")
     - False-positive bolds (grammatical, generic, etc.)
     - Valid chunks NOT yet bolded
  5. Output a structured report per file
"""
import re, json, spacy, sys
from collections import defaultdict
from pathlib import Path

nlp = spacy.load('en_core_web_sm')

# Curated A1-B1 multi-word database (per user spec + what we use)
CURATED_CHUNKS = {
    "once upon a time": "Idiom",
    "brag about": "Phrasal Verb",
    "win the race": "Collocation",
    "laugh at": "Phrasal Verb",
    "one day": "Time Chunk",
    "one morning": "Time Chunk",
    "one evening": "Time Chunk",
    "one night": "Time Chunk",
    "slow and steady wins the race": "Proverb",
    "slow and steady": "Proverb",
    "slow hare": "Collocation",
    "slow tortoise": "Collocation",
    "get on": "Phrasal Verb",
    "get off": "Phrasal Verb",
    "get ahead of": "Phrasal Verb",
    "get tired": "Functional Pattern",
    "fall asleep": "Collocation",
    "shady tree": "Collocation",
    "keep on": "Phrasal Verb",
    "keep going": "Phrasal Verb",
    "give up": "Phrasal Verb",
    "finish line": "Compound Noun",
    "forest animal": "Collocation",
    "wake up": "Phrasal Verb",
    "cheer loudly": "Collocation",
    "look different": "Functional Pattern",
    "from each other": "Reciprocal",
    "clean and fresh": "Collocation",
    "good for the environment": "Collocation",
    "mode of transport": "Collocation",
    "from place to place": "Functional Pattern",
    "learn about": "Phrasal Verb",
    "types of transport": "Collocation",
    "travel by car": "Collocation",
    "ride a motorbike": "Collocation",
    "every day": "Time Chunk",
    "every morning": "Time Chunk",
    "many people": "Collocation",
    "at once": "Time Chunk",
    "every morning": "Time Chunk",
    "longer journeys": "Collocation",
    "great choice": "Collocation",
    "steel rails": "Collocation",
    "carry hundreds of passengers": "Collocation",
    "carry thousands of passengers": "Collocation",
    "kilometres per hour": "Unit",
    "without your own vehicle": "Collocation",
    "take a taxi": "Collocation",
    "taxi driver": "Compound Noun",
    "every room": "Collocation",
    "very tall": "Collocation",
    "for my age": "Collocation",
    "happy smile": "Collocation",
    "wears glasses": "Collocation",
    "look different from each other": "Functional Pattern",
    "good friends": "Collocation",
    "good friend": "Collocation",
    "best friends": "Collocation",
    "best friend": "Collocation",
}

# Patterns that look like chunks but are actually free combinations
# (they should NOT be bolded or are too generic)
FREE_COMBINATIONS = {
    "very big", "very small", "very good", "very bad", "very well",
    "very fast", "very slow", "very far", "very near", "very much",
    "very many", "very little", "very few", "very often", "very early",
    "very late", "very quick",
    "big deal", "big deal", "big fan", "big dream", "big help",
    "many things", "many places", "many years", "many times",
    "many children", "many students", "many friends",
    "some children", "some students", "some friends", "some people",
    "some things", "some places", "some days", "some times", "some food",
    "some water", "some money",
    "good morning", "good afternoon", "good evening", "good night",
    "good day", "good week", "good month", "good year", "good luck",
    "good job", "good work", "good question", "good idea", "good answer",
    "good choice", "good decision", "good news", "good information",
    "good advice", "good experience", "good book", "good story",
    "good song", "good music", "good poem", "good game", "good sport",
    "good food", "good meal", "good drink", "good weather", "good times",
    "good memories", "good lesson", "good plan", "good strategy",
    "good response", "good reaction", "good feeling", "good mood",
    "good energy", "good health", "good start", "good ending",
    "good result", "good example", "good parent", "good mother",
    "good father", "good son", "good daughter", "good brother", "good sister",
    "good neighbour",
    "best teacher", "best student", "best person", "best place",
    "best time", "best day", "best book", "best story", "best song",
    "best food", "best gift", "best idea", "best plan", "best way",
    "first day", "first time", "first grade", "first week", "first month",
    "first year", "first step", "first thing",
    "next day", "next time", "next week", "next month", "next year",
    "next step", "next place", "next door", "next to",
    "last day", "last time", "last week", "last month", "last year",
    "last night", "last place", "last step", "last thing",
    "this day", "this time", "this week", "this month", "this year",
    "this morning", "this afternoon", "this evening", "this place", "this way",
    "two days", "two weeks", "two months", "two years", "two hours",
    "two minutes", "two times", "two kids", "two children", "two friends",
    "two people",
    "three days", "three weeks", "three months", "three years",
    "three times", "three kids", "three children", "three friends", "three people",
    "three things",
    "few days", "few weeks", "few months", "few years", "few hours",
    "few minutes", "few times", "few people", "few friends", "few students",
    "few children", "few things", "few books", "few words",
    "lot of fun", "lot of food", "lot of work", "lot of water",
    "lot of time", "lot of money", "lot of energy", "lot of love",
    "lot of people", "lot of friends", "lot of things", "lot of stuff",
    "long time", "long day", "long way", "long walk", "long journey",
    "long trip", "long flight", "long drive", "long story", "long letter",
    "long message", "long time ago", "long time no see", "long before",
    "long after", "long since",
    "short time", "short day", "short way", "short walk", "short journey",
    "short trip", "short flight", "short drive", "short story", "short message",
    "short letter", "short while", "short cut",
    "tall building", "tall tree", "tall man", "tall woman", "tall person",
    "tall girl", "tall boy",
    "young child", "young boy", "young girl", "young man", "young woman",
    "young people", "young student", "young teacher",
    "old man", "old woman", "old people", "old teacher", "old friend",
    "old friends", "old house", "old car", "old book", "old story",
    "old tree", "old school", "old city", "old town", "old village",
    "old country",
    "new friend", "new house", "new car", "new job", "new baby",
    "new school", "new class", "new teacher", "new student", "new year",
    "new month", "new week", "new day", "new life", "new book",
    "new story", "new song", "new game", "new movie", "new idea",
    "new plan", "new project", "new goal", "new word", "new words",
    "new language", "new place", "new city", "new country", "new home",
    "new bridge", "new road", "new buildings", "new town",
    "sunny day", "sunny morning", "sunny afternoon", "sunny weather",
    "sunny beach", "sunny park", "sunny garden", "sunny sky",
    "rainy day", "rainy morning", "rainy afternoon", "rainy weather", "rainy season",
    "cold day", "cold morning", "cold afternoon", "cold weather", "cold water",
    "cold drink", "cold food",
    "hot day", "hot morning", "hot afternoon", "hot weather", "hot water",
    "hot drink", "hot food",
    "busy day", "busy week", "busy morning", "busy afternoon",
    "quiet day", "quiet night", "quiet morning", "quiet afternoon",
    "nice day", "nice morning", "nice afternoon", "nice person",
    "nice place", "nice smile", "nice meal", "nice food",
    "great day", "great time", "great moment", "great job", "great idea",
    "great place",
    "wonderful day", "wonderful time", "wonderful place", "wonderful trip",
    "wonderful story",
    "amazing day", "amazing time", "amazing place", "amazing gift",
    "amazing abilities",
    "lovely day", "lovely time", "lovely place", "lovely smile",
    "lovely person", "lovely friend", "lovely family", "lovely house",
    "lovely garden",
    "beautiful day", "beautiful time", "beautiful place", "beautiful smile",
    "beautiful person", "beautiful friend", "beautiful family",
    "beautiful flower", "beautiful tree", "beautiful garden", "beautiful view",
    "fun day", "fun time", "fun moment", "fun memory", "fun activity",
    "fun game", "fun sport", "fun thing", "fun place", "fun person", "fun class",
    "funny story", "funny joke", "funny person", "funny friend",
    "clever idea", "clever person", "clever student", "clever boy", "clever girl",
    "clever child",
    "kind person", "kind friend", "kind neighbour", "kind teacher",
    "kind smile", "kind voice", "kind word", "kind help", "kind act",
    "happy family", "happy time", "happy day", "happy person",
    "happy child", "happy moment", "happy memory", "happy ending",
    "happy smile", "happy face", "happy heart", "happy smile",
    "high school", "middle school", "elementary school", "primary school",
    "school year", "school day", "school week", "school trip",
    "school supplies", "school bag", "school books", "school bus",
    "school uniform", "school lunch", "school friend", "school mate",
    "school mate", "schoolmate", "school library", "school work",
    "school event", "school activity", "school holiday", "school vacation",
    "go to school", "go home", "go to bed", "go to work",
    "go to the park", "go to the store", "go to the market",
    "go to the library", "go to the beach", "go to the zoo",
    "go away", "go back", "go out", "go outside", "go in", "go up", "go down",
    "go forward",
    "come back", "come home", "come in", "come out", "come here",
    "come over", "come on", "come up", "come down", "come forward",
    "look up", "look down", "look around", "look out", "look at",
    "look for", "look like", "look after", "look into", "look over",
    "look through", "look back",
    "take care", "take care of", "take a look", "take a break",
    "take a rest", "take a walk", "take a seat", "take a shower",
    "take a photo", "take a picture", "take photos", "take time",
    "take your time", "take part", "take part in", "take place",
    "take over", "take off", "take out", "take away",
    "give up", "give in", "give away", "give back", "give out", "give off",
    "make sure", "make up", "make friends", "make a wish",
    "make a decision", "make a choice", "make a plan", "make a list",
    "make a cake", "make a difference", "make a change", "make a mistake",
    "make sense",
    "have a good day", "have a great day", "have a nice day",
    "have a wonderful day", "have a happy day",
    "have a good time", "have a great time", "have a nice time",
    "have a wonderful time", "have a happy time", "have fun",
    "have lunch", "have dinner", "have breakfast", "have a snack",
    "have a drink", "have a plan", "have an idea", "have a dream",
    "have a question", "have a problem", "have a thought", "have a goal",
    "do homework", "do housework", "do the dishes", "do the laundry",
    "do a good job", "do your best", "do well", "do better",
    "wake up", "wake up early", "wake up late",
    "put on", "put away", "put down", "put in", "put out",
    "turn on", "turn off", "turn around",
    "try again", "try hard", "try to",
    "work together", "work hard", "work on", "work out", "work well",
    "play together", "play with", "play games", "play a game",
    "live together",
    "study hard", "study together", "study english", "study math",
    "learn english", "learn math", "speak english", "speak vietnamese",
    "tell me", "tell us", "tell a story", "tell stories",
    "ask me", "ask him", "ask her", "ask them", "ask a question",
    "help me", "help us", "help them", "help her", "help him",
    "wash my hands", "wash your hands", "brush my teeth", "brush your teeth",
    "feed the dog", "feed the cat",
    "plant trees", "plant flowers", "plant a tree", "plant a flower",
    "open the door", "close the door", "open the window", "close the window",
    "watch tv", "watch the news",
    "see the doctor", "see the dentist",
    "eat breakfast", "eat lunch", "eat dinner", "eat food",
    "drink water",
    "read a book", "read books", "write a story", "write a letter",
    "sing a song", "sing songs",
    "draw a picture", "draw pictures", "paint a picture",
    "at school", "at home", "at work", "at night", "at the park",
    "at the store", "at the market", "at the beach", "at the zoo",
    "at the library", "at the table", "at the door", "at the window",
    "at the front", "at the back", "at the end", "at the beginning",
    "at the top", "at the bottom", "at the same time",
    "at least", "at most", "at first", "at last", "at once",
    "in the morning", "in the afternoon", "in the evening", "in the night",
    "in the city", "in the town", "in the village", "in the country",
    "in the kitchen", "in the bedroom", "in the classroom",
    "in the garden", "in the park", "in the library", "in the market",
    "in the house", "in the car", "in the world", "in the sky",
    "in the sea", "in the water", "in the air",
    "in front of", "in back of", "in the middle of",
    "on the wall", "on the floor", "on the table", "on the chair",
    "on the bed", "on the board", "on the ground", "on the left",
    "on the right", "on the side", "on the way", "on the way home",
    "on the way back", "on top of",
    "by the lake", "by the river", "by the sea", "by the window",
    "by the door", "by the table", "by the bed", "by the chair",
    "by the way", "by hand",
    "for example", "for instance", "for sure", "for a long time",
    "for a while", "for a moment", "for a day", "for a week",
    "in fact", "in general", "in particular", "in detail", "in summary",
    "in addition", "in conclusion", "in brief",
    "as a result", "as well as", "as well", "as soon as", "as long as",
    "as far as", "as if", "as though", "as much as", "as many as",
    "such as", "so that", "so much", "so many", "so far", "so long",
    "no longer", "not yet", "not only", "not just",
    "in time", "on time",
    "a little", "a few", "a lot", "a bit", "a bit of",
    "a piece of", "a cup of", "a glass of", "a bottle of", "a bowl of",
    "a plate of", "a bag of", "a box of", "a basket of",
    "a group of", "a team of", "a family of",
    "a kind of", "a sort of", "a type of",
    "a number of", "a pair of", "a set of",
}

def lemmatize_with_possessive(text):
    doc = nlp(text.lower())
    out = []
    for t in doc:
        if t.pos_ == 'PRON' and t.morph.get('Poss') == ['Yes']:
            out.append("one's")
        else:
            out.append(t.lemma_)
    return ' '.join(out)

def audit_file(path):
    """Return audit findings for one file's content_en."""
    src = path.read_text()
    m = re.search(r"content_en:\s*([`'\"])([\s\S]*?)\1", src)
    if not m:
        return None
    body = m.group(2)
    quote = m.group(1)

    findings = {
        'file': str(path),
        'single_word_bolds': [],
        'split_chunks': [],
        'false_positive_bolds': [],
        'missed_chunks': [],
        'good_bolds': [],
    }

    # 1) Find all bolds
    bolds = list(re.finditer(r'\*\*([^*\n]+?)\*\*', body))
    bold_texts = []
    for bm in bolds:
        phrase = bm.group(1).strip()
        if not phrase:
            continue
        bold_texts.append((phrase, bm.start()))

    # 2) Detect single-word bolds
    for phrase, pos in bold_texts:
        if len(phrase.split()) == 1:
            findings['single_word_bolds'].append((phrase, pos))

    # 3) Lemmatize content WITHOUT bold markers
    plain = re.sub(r'\*\*([^*\n]+?)\*\*', ' ', body)
    plain = re.sub(r'\s+([,.!?])', r'\1', plain)
    lemmatized = lemmatize_with_possessive(plain)

    # 4) Detect chunks NOT yet bolded (in CURATED_CHUNKS)
    seen_in_bold = set(p.lower().strip() for p, _ in bold_texts)
    for chunk, kind in CURATED_CHUNKS.items():
        # skip if we already bolded it (or any prefix of it)
        if chunk in seen_in_bold:
            continue
        # check lemmatized form
        pat = re.compile(r'\b' + re.escape(chunk) + r'\b')
        n = len(pat.findall(lemmatized))
        if n > 0:
            findings['missed_chunks'].append((chunk, n))

    # 5) Detect split chunks: e.g., "**slow and steady wins**" + "**the race**"
    #     in same sentence
    for i, (p1, _) in enumerate(bold_texts):
        for j, (p2, pos2) in enumerate(bold_texts[i+1:], start=i+1):
            # If the two bolds are adjacent in text and form a known chunk
            combined = f"{p1} {p2}".strip().lower()
            if combined in CURATED_CHUNKS:
                findings['split_chunks'].append((p1, p2, combined, CURATED_CHUNKS[combined]))

    # 6) Detect false-positive bolds (in FREE_COMBINATIONS)
    for phrase, pos in bold_texts:
        if phrase.lower().strip() in FREE_COMBINATIONS:
            findings['false_positive_bolds'].append((phrase, pos))

    # 7) Record good bolds
    for phrase, pos in bold_texts:
        if phrase.lower().strip() in CURATED_CHUNKS and \
           phrase.lower().strip() not in FREE_COMBINATIONS and \
           len(phrase.split()) > 1:
            findings['good_bolds'].append((phrase, CURATED_CHUNKS[phrase.lower().strip()]))

    return findings

# Run audit on all files
WEEKS = [Path('src/data/weeks'), Path('src/data/weeks_easy')]
files = []
for w in range(1, 36):
    for base in WEEKS:
        for st in ['read', 'explore']:
            p = base / f'week_{w:02d}' / f'{st}.js'
            if p.exists() and '_OLD' not in str(p) and 'BACKUP' not in str(p):
                files.append(p)

print(f'Auditing {len(files)} files...\n')

all_findings = []
total_single = 0
total_split = 0
total_false = 0
total_missed = 0
total_good = 0

for fp in files:
    f = audit_file(fp)
    if not f:
        continue
    all_findings.append(f)
    total_single += len(f['single_word_bolds'])
    total_split += len(f['split_chunks'])
    total_false += len(f['false_positive_bolds'])
    total_missed += len(f['missed_chunks'])
    total_good += len(f['good_bolds'])

print(f'=== TOTAL STATS ===')
print(f'single-word bolds (forbidden):       {total_single}')
print(f'split chunks (should merge):         {total_split}')
print(f'false-positive bolds (should unbold): {total_false}')
print(f'missed valid chunks:                 {total_missed}')
print(f'good bolds (validated):              {total_good}')

# Files with most issues
print(f'\n=== TOP FILES WITH SPLIT CHUNKS ===')
for f in all_findings:
    if f['split_chunks']:
        print(f"  {f['file']}: {f['split_chunks'][:3]}")

print(f'\n=== TOP FILES WITH MISSED CHUNKS ===')
for f in all_findings:
    if f['missed_chunks']:
        sample = ', '.join(c[:30] for c, _ in f['missed_chunks'][:3])
        print(f"  {f['file']}: {len(f['missed_chunks'])} missed: {sample}")

print(f'\n=== TOP FILES WITH FALSE-POSITIVE BOLDS ===')
for f in all_findings:
    if f['false_positive_bolds']:
        sample = ', '.join(c[:30] for c, _ in f['false_positive_bolds'][:3])
        print(f"  {f['file']}: {len(f['false_positive_bolds'])} false: {sample}")

# Save report
report = []
for f in all_findings:
    if f['split_chunks'] or f['missed_chunks'] or f['false_positive_bolds'] or f['single_word_bolds']:
        report.append(f)

with open('/tmp/full_audit_report.json', 'w') as f:
    json.dump({
        'summary': {
            'total_files_audited': len(files),
            'files_with_issues': len(report),
            'total_single_word': total_single,
            'total_split': total_split,
            'total_false_positive': total_false,
            'total_missed': total_missed,
            'total_good': total_good,
        },
        'files_with_issues': report,
    }, f, indent=2, ensure_ascii=False)
print(f'\nReport saved: /tmp/full_audit_report.json')
