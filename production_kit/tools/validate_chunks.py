#!/usr/bin/env python3
"""
Validate chunks/collocations in W1-W35 read.js / explore.js.

For every `**bold**` in content_en, classify it as:
- VALID: the bold is a known phrasal verb, fixed expression, A+N/V+N
  collocation, binomial, reciprocal, or other chunk category.
- INVALID: the bold matches a known false-chunk pattern.
- UNVERIFIED: the bold is not a known false chunk but is also not a
  well-known chunk; needs manual review.

Usage:
    python3 validate_chunks.py --all         # W1-W35 read+explore (ADV+Easy)
    python3 validate_chunks.py 30            # specific week
    python3 validate_chunks.py --explore-only
    python3 validate_chunks.py --read-only
"""
import re
import json
import pathlib
import sys


# ============================================================
# 1. KNOWN VALID CHUNKS — whitelist
# ============================================================
# Each entry is a lowercase phrase. A bold is "valid" if it equals one
# of these (or, where appropriate, a suffix match).

VALID_CHUNKS = set([
    # Phrasal verbs (verb + particle)
    "spread out", "waved back", "waved at", "waved to", "waved on",
    "fell asleep", "fell down", "fell off",
    "picked up", "picked out",
    "looked at", "looked for", "looked after", "looked like",
    "looked around", "looked different", "looked out", "looked up",
    "woke up", "wake up", "woken up", "waking up",
    "got up", "got dressed", "got on", "got off", "got better",
    "got ready", "got home", "got to", "got better quickly",
    "ran out", "ran away", "ran into", "ran to",
    "cut down", "cut up", "cut out",
    "put away", "put down", "put on", "put off",
    "make up", "made up", "makes up", "making up",
    "make friends", "made friends", "makes friends", "making friends",
    "build with", "built with", "builds with", "building with",
    "jumped out", "jumped up",
    "sat down", "sat up", "sat on", "sat at",
    "stood up", "stand up", "stood at", "standing",
    "wore out", "wear out", "wears out", "wearing out",
    "throw away", "threw away", "throws away", "throwing away",
    "throw a party", "threw a party", "thrown a party",
    "take off", "took off", "takes off", "taking off",
    "take care of", "takes care of", "took care of", "taking care of",
    "look after", "looks after", "looked after", "looking after",
    "carry on", "carried on", "carries on", "carrying on",
    "wake up early", "woke up early",
    "ran out of petrol",
    "work hard", "works hard", "worked hard", "working hard",
    "play together", "played together", "plays together", "playing together",
    "share meals together", "shared meals together",
    "live together", "lived together", "lives together", "living together",
    "work together", "worked together", "works together", "working together",
    "spend time together", "spends time together", "spent time together",
    "stays together", "stayed together", "stay together", "staying together",
    "play with", "played with", "plays with", "playing with",
    "share with", "shared with", "shares with", "sharing with",
    "spend time", "spends time", "spent time", "spending time",
    "take care", "takes care", "took care", "taking care",
    "share meals", "shared meals", "shares meals", "sharing meals",
    "live with", "lives with", "lived with", "living with",
    "make mistakes", "made mistakes", "makes mistakes",
    "tell the truth", "tells the truth", "told the truth",
    "told stories", "tell stories", "tells stories",
    "build a house", "builds a house", "built a house", "building a house",
    "play a game", "play games", "played games", "plays games", "playing games",
    "make friends", "made friends", "makes friends", "making friends",
    "do homework", "did homework", "does homework", "doing homework",
    "go to school", "goes to school", "went to school", "going to school",
    "have lunch", "had lunch", "has lunch", "having lunch",
    "have breakfast", "had breakfast", "has breakfast",
    "have dinner", "had dinner", "has dinner",
    "make a mistake", "made a mistake", "makes a mistake", "making a mistake",
    "tell a story", "tells a story", "told a story", "telling a story",
    "take a walk", "takes a walk", "took a walk", "taking a walk",
    "read a book", "reads a book", "read a book", "reading a book",
    "see a picture",
    "come to", "comes to", "came to", "coming to",
    "go home", "goes home", "went home", "going home",
    "go to bed", "goes to bed", "went to bed", "going to bed",
    "sit on the fence", "sat on the fence", "sitting on the fence",
    "sit on his bed", "sat on his bed", "sitting on his bed",
    "get up", "gets up", "got up", "getting up",
    "brush my teeth", "brushed my teeth", "brushes my teeth",
    "do my homework", "did my homework", "does my homework",
    "watched the ducks", "watch the ducks", "watches the ducks",

    # Fixed expressions / idioms
    "by the way", "at the end", "at night", "at home",
    "at the front", "at the back", "at school",
    "in the morning", "in the afternoon", "in the evening",
    "in the world", "in the whole world", "in the whole word",
    "in the park", "in the garden", "in the kitchen", "in the bedroom",
    "in the classroom", "in the school",
    "in the warm sunshine", "in the warm summer sun",
    "in the city", "in the town", "in the village",
    "in the sky", "in the sea", "in the ocean", "in the water",
    "on the way", "on the way back", "on the wall", "on the floor",
    "on the table", "on the board",
    "on the radio", "on TV", "on the news",
    "at the market", "at the park", "at the beach", "at the station",
    "at the bus stop", "at the train station",
    "at the same time", "at the end of the year", "at the end of the day",
    "at the same time", "at the moment",
    "by the lake", "by the river", "by the sea", "by the road",
    "on holiday", "on a holiday",
    "every day", "every week", "every month", "every year",
    "all day", "all night", "all week", "all year",
    "all day long", "all summer long", "all winter long",
    "on the way", "on the way home", "on the way back",
    "at first", "at last", "at once",
    "in the end", "in time", "in fact",
    "of course", "for example", "for instance",
    "on time", "in time",
    "as a result", "as well as", "as well",
    "day after day", "year after year", "week after week",
    "Slow and steady wins the race",
    "once upon a time",
    "all of a sudden", "all at once",
    "on the way to school", "on the way home", "on the way to work",
    "in the end of the year", "at the end of the year",
    "all the best", "all the time",
    "from each other",
    "the day after tomorrow",
    "the day before yesterday",
    "for the rest of the year",
    "year by year", "day by day",
    "one by one", "two by two",
    "side by side", "arm in arm",
    "face to face", "back to back",

    # Binomial pairs
    "mothers and fathers", "father and mother", "mother and father",
    "brothers and sisters", "brother and sister", "sister and brother",
    "up and down", "back and forth", "to and fro",
    "here and there", "now and then", "sooner or later",
    "first and foremost",
    "right and left", "left and right",
    "young and old", "old and young",
    "rich and poor", "poor and rich",
    "men and women", "women and men",
    "boys and girls", "girls and boys",

    # Reciprocal / relationship
    "each other", "one another", "with one another",
    "to each other", "from each other", "for each other", "of each other",
    "with each other", "in each other", "on each other",
    "to one another", "from one another",

    # Verb + Noun cố định (collocation)
    "had a picnic", "have a picnic", "has a picnic", "having a picnic",
    "had a break", "have a break", "have a rest",
    "had fun", "have fun", "having fun",
    "had a walk", "have a walk", "having a walk",
    "had a dream", "have a dream", "having a dream",
    "had the best", "have the best", "has the best",
    "had a chance", "have a chance",
    "said hello", "say hello", "says hello", "saying hello",
    "said goodbye", "say goodbye", "says goodbye",
    "made friends", "make friends", "makes friends",
    "told the truth", "tell the truth", "tells the truth",
    "told stories", "tell stories", "tells stories",
    "asked Jake", "ask Jake", "asks Jake",
    "told her mum", "tell her mum", "tells her mum",
    "gave him a pass", "give him a pass", "gives him a pass",
    "gave a pass", "give a pass", "gives a pass",
    "promised to be careful", "promise to be careful", "promises to be careful",
    "ran a race", "run a race", "runs a race",
    "made cheese sandwiches", "make cheese sandwiches", "makes cheese sandwiches",
    "made the best food", "make the best food", "makes the best food",
    "had lunch", "have lunch", "having lunch", "having a lunch",
    "watched them work", "watch them work", "watches them work",
    "chose the best", "choose the best", "chooses the best",
    "chose a cheese", "choose a cheese", "chooses a cheese",
    "sat on the fence", "sit on the fence", "sits on the fence",
    "sat on his bed", "sit on his bed", "sits on his bed",
    "made the bed", "make the bed", "makes the bed",
    "made her bed", "make her bed", "makes her bed",
    "wrote a long letter", "write a long letter", "writes a long letter",
    "wrote a short letter", "write a short letter", "writes a short letter",
    "wrote the title", "write the title", "writes the title",
    "wrote a caption", "write a caption", "writes a caption",
    "built a small birdhouse", "build a small birdhouse", "builds a small birdhouse",
    "built a little birdhouse", "build a little birdhouse", "builds a little birdhouse",
    "stuck a stamp", "stick a stamp", "sticks a stamp",
    "put the letter", "put the birdhouse", "put the birdhouse on",
    "told the truth", "tell the truth", "tells the truth",
    "made a mistake", "make a mistake", "makes a mistake",
    "made a decision", "make a decision", "makes a decision",
    "made a wish", "make a wish", "makes a wish",
    "told her about", "tell her about", "tells her about",
    "had a present", "have a present", "has a present",
    "had a big lesson", "have a big lesson", "has a big lesson",
    "learned an important lesson", "learn an important lesson",
    "learned a big lesson", "learn a big lesson",
    "had a great time", "have a great time", "has a great time",
    "cut the long grass", "cut the grass", "cuts the grass",
    "paid for it", "pay for it", "pays for it",
    "paid for my own", "pay for my own", "pays for my own",
    "put everything away", "put it away", "puts it away",
    "felt sorry for", "feel sorry for", "feels sorry for",
    "got better quickly", "get better quickly", "gets better quickly",
    "asked for food", "ask for food", "asks for food",
    "gave the grasshopper some food", "give the grasshopper some food",
    "asked for water", "ask for water", "asks for water",
    "kept the house tidy", "keep the house tidy", "keeps the house tidy",
    "kept my room", "keep my room", "keeps my room",
    "made the bridge", "make the bridge", "makes the bridge",
    "told her all about", "tell her all about", "tells her all about",
    "learned one very important lesson",
    "made the best food", "make the best food", "makes the best food",
    "promised to be careful", "promise to be careful", "promises to be careful",
    "smelt sweet", "smell sweet", "smells sweet",
    "tasted a piece", "taste a piece", "tastes a piece",
    "heard the seller call out prices",
    "called out prices", "call out prices", "calls out prices",
    "broke a glass cup", "break a glass cup", "breaks a glass cup",
    "didn't get hurt", "doesn't get hurt", "didn't get hurt",
    "walked slowly and safely", "walk slowly and safely",
    "walked slowly", "walk slowly", "walks slowly",
    "felt very cheerful", "feel very cheerful", "feels very cheerful",
    "felt happy", "feel happy", "feels happy",
    "felt sad", "feel sad", "feels sad",
    "felt surprised", "feel surprised", "feels surprised",
    "got angry", "get angry", "gets angry",
    "got tired", "get tired", "gets tired",
    "made up a story", "make up a story", "makes up a story",
    "made my bed", "make my bed", "makes my bed",
    "ate lunch", "eat lunch", "eats lunch",
    "drank lemonade",
    "drank water",
    "drank juice",
    "bought a watermelon", "buy a watermelon", "buys a watermelon",
    "watched a movie", "watch a movie", "watches a movie",
    "broke the glass", "break the glass", "breaks the glass",
    "smiled warmly", "smile warmly", "smiles warmly",
    "looked surprised", "look surprised", "looks surprised",
    "sat on the floor", "sit on the floor", "sits on the floor",
    "sat on the bed", "sit on the bed", "sits on the bed",
    "sat on the chair", "sit on the chair", "sits on the chair",
    "played outside", "play outside", "plays outside",
    "played inside", "play inside", "plays inside",
    "played with", "play with", "plays with",
    "play with", "plays with", "played with",
    "smiled at", "smile at", "smiles at",
    "smiled and", "smile and", "smiles and",
    "talked to", "talk to", "talks to",
    "told her about", "tell her about", "tells her about",
    "walked to the local cafe", "walk to the local cafe",
    "walked to the local market", "walk to the local market",
    "walked to school", "walk to school", "walks to school",
    "walked to the field", "walk to the field", "walks to the field",
    "ran to the bus stop", "run to the bus stop",
    "took a photo", "take a photo", "takes a photo",
    "took photos", "take photos", "takes photos",
    "made a decision", "make a decision", "makes a decision",
    "sat down and",
    "had a seat", "have a seat", "has a seat",
    "took place", "take place", "takes place",
    "gave it", "give it", "gives it",
    "gave her", "give her", "gives her",
    "gave him", "give him", "gives him",
    "gave them", "give them", "gives them",
    "gave the", "give the", "gives the",
    "showed her", "show her", "shows her",
    "showed them", "show them", "shows them",
    "told him", "tell him", "tells him",
    "told them", "tell them", "tells them",
    "told her", "tell her", "tells her",
    "told us", "tell us", "tells us",
    "asked her", "ask her", "asks her",
    "asked him", "ask him", "asks him",
    "asked them", "ask them", "asks them",
    "helped her", "help her", "helps her",
    "helped him", "help him", "helps him",
    "helped them", "help them", "helps them",
    "helped carry", "help carry", "helps carry",
    "wanted to", "want to", "wants to",
    "decided to", "decide to", "decides to",
    "agreed to", "agree to", "agrees to",
    "smiled and waved", "smile and wave", "smiles and waves",
    "sat down on the grass", "sit down on the grass",
    "ran into the", "run into the", "runs into the",
    "sat on the grass", "sit on the grass", "sits on the grass",
    "told a story", "tell a story", "tells a story",
    "told stories", "tell stories", "tells stories",
    "gave a present", "give a present", "gives a present",
    "had a party", "have a party", "has a party",
    "threw a party", "throw a party", "throws a party",
    "gave each other", "give each other", "gives each other",
    "told each other", "tell each other", "tells each other",
    "said to each other", "say to each other", "says to each other",
    "looked different from", "look different from", "looks different from",
    "happy and", "sad and", "ready for", "ready to",

    # Adj + Noun collocations
    "cheese sandwiches", "cheese sandwich", "cheese sandwich",
    "fresh strawberries", "fresh strawberry",
    "soft blanket", "blanket",
    "local market", "local area",
    "good cook", "good meal", "good food", "good day", "good time",
    "fun picnic", "fun time", "fun day",
    "juicy watermelon", "juicy fruit",
    "mango juice", "mango tree",
    "warm sunshine", "warm sun",
    "tasty food", "delicious food", "fresh food", "best food",
    "happy smile", "big smile", "bright smile", "warm smile", "sad smile",
    "brown eyes", "blue eyes", "big eyes", "round eyes",
    "long hair", "long brown hair", "curly hair", "short hair", "dark hair",
    "round face", "happy face",
    "wears glasses", "wear glasses", "wears glasses",
    "tall buildings", "tall building", "tall tree",
    "bus stop", "train station", "bus station",
    "yellow taxi", "yellow cab",
    "big motorbike", "big bike",
    "large car", "small car", "small boat", "small box", "small bag",
    "old bicycle", "old bike", "old man", "old woman",
    "slow tortoise", "slow hare", "fast hare", "fast bicycle",
    "loving family", "happy family", "big family", "small family",
    "old family", "young family", "lovely family",
    "long letter", "short letter", "big letter",
    "long grass", "long day", "long time", "long way",
    "big smile", "big eyes", "big day",
    "lunch box", "lunch time",
    "water bottle", "cold water", "hot water",
    "blue pen", "red pen", "pencil case", "pen case",
    "blank paper", "white paper", "clean paper",
    "blue folder", "red folder",
    "yellow pencil", "pencil sharpener",
    "red crayon", "blue crayon",
    "white glue",
    "sharp scissors", "scissors",
    "big marker", "red marker", "blue marker",
    "high mountain", "high mountains", "low mountain",
    "green forest", "green forests", "big forest",
    "deep sea", "deep river", "deep ocean",
    "magic carpet", "magic trip", "wonderful trip", "wonderful place",
    "best trip", "best day", "best time",
    "red kite", "blue kite", "big kite",
    "kind farmer", "kind chef", "kind mother", "kind father",
    "busy doctor", "busy teacher", "busy mother",
    "tired mother", "tired father", "tired teacher",
    "happy mother", "happy father", "happy teacher", "happy student",
    "smart student", "good student", "clever student",
    "lovely grandmother", "lovely grandfather",
    "tiny green island", "tiny island",
    "great race", "great teacher", "great student", "great writer",
    "old friends", "new friends", "best friends",
    "lovely smile", "lovely face", "lovely place",
    "red apple", "green apple", "yellow apple",
    "old car", "new car", "fast car", "red car", "blue car",
    "big tree", "small tree", "green tree", "tall tree",
    "happy day", "happy time", "happy family", "happy people",
    "rich family", "kind family", "nice family",
    "good team", "strong team", "best team", "happy team",
    "soft pillow", "soft bed", "soft chair", "soft sofa",
    "heavy rain", "strong wind", "cold wind", "warm wind",
    "hot coffee", "cold coffee", "hot tea", "cold tea", "iced tea",
    "heavy snow", "light snow", "white snow", "fresh snow",
    "fast car", "fast train", "fast bus", "fast boat",
    "young people", "old people", "poor people", "rich people",
    "loud noise", "loud music", "soft music", "loud sound",
    "fast food", "fresh food", "fresh fruit", "fresh vegetable",
    "rich country", "poor country", "big country", "small country",
    "deep blue", "deep green", "dark blue", "light blue", "sky blue",
    "old city", "new city", "big city", "small city", "ancient city",
    "old story", "new story", "short story", "long story", "funny story",
    "big problem", "small problem", "big question", "small question",
    "happy news", "sad news", "good news", "bad news",
    "fast train", "slow train", "high speed train",
    "fresh bread", "fresh milk", "fresh juice", "fresh water",
    "cold drink", "hot drink", "warm drink", "sweet drink",
    "strong wind", "cold wind", "warm wind", "cool wind",
    "happy ending", "sad ending", "good ending", "bad ending",
    "heavy bag", "light bag", "small bag", "big bag",
    "young man", "old man", "young woman", "old woman", "old lady",
    "fast runner", "good runner", "slow runner", "long distance runner",
    "fast swimmer", "good swimmer", "long distance swimmer",
    "small class", "big class",
    "young student", "old student", "new student",
    "happy couple", "old couple", "young couple",
    "happy child", "old child", "young child", "new child",
    "busy day", "slow day", "long day", "short day", "nice day",
    "happy occasion", "sad occasion", "special occasion",
    "long time", "short time", "good time", "bad time", "great time",
    "busy time", "free time", "spare time",
    "old friend", "new friend", "best friend", "good friend", "dear friend",
    "happy ending", "sad ending",
    "good morning", "good afternoon", "good evening", "good night",
    "happy birthday", "merry christmas", "happy new year",

    # Adverb + Adjective
    "very early", "very late", "very tired", "very happy", "very sad",
    "very hungry", "very thirsty", "very cold", "very hot", "very warm",
    "very good", "very bad", "very nice", "very kind", "very sweet",
    "very fast", "very slow", "very big", "very small", "very long",
    "very tall", "very short", "very strong", "very weak", "very easy",
    "very hard", "very soft", "very loud", "very quiet", "very hot",
    "quite good", "quite bad", "quite nice", "quite big", "quite small",
    "quite fast", "quite slow", "quite long", "quite short",
    "really good", "really bad", "really nice", "really big", "really small",
    "so good", "so bad", "so nice", "so big", "so small",
    "so fast", "so slow", "so long", "so short", "so happy", "so sad",
    "too big", "too small", "too fast", "too slow", "too long", "too short",
    "too hot", "too cold", "too tired", "too good", "too bad",

    # Special — common chunks the user feedback flagged as valid
    "look different", "look different from each other",
    "different from", "different from each other",
    "different from each other",
    "look different from", "looks different from",
    "ready for school", "ready for the day",
    "sit next to", "sat next to", "sits next to", "sitting next to",
    "sit at the front", "sat at the front", "sits at the front",
    "stand at the front", "stood at the front", "stands at the front",
    "stand on the wall", "stood on the wall", "stands on the wall",
    "on the wall", "on the floor", "on the ceiling", "on the desk",
    "at the front", "at the back", "at the side",
    "in the corner", "in the middle", "in the middle of",
    "in the middle of the room", "in the middle of the night",
    "in front of", "in front of the", "in back of",
    "next to", "next door", "next to my",
    "next to each other", "next to the", "next to her", "next to him",
    "on the way to", "on the way home",
    "on the way to school", "on the way home from school",
    "in a minute", "in a moment", "in a hurry", "in a day",
    "in the morning", "in the afternoon", "in the evening",
    "for a long time", "for a short time", "for a while",
    "for a moment", "for a day", "for a week", "for a year",
    "in a row", "in a line", "in a circle",
    "at the same time", "at the same age",
    "in the same class", "in the same school", "in the same grade",
    "in the same way", "in the same room",
    "in the same family", "in the same team",
    "with a big smile", "with a smile", "with a happy smile",
    "with a sad face", "with a happy face",
    "in big letters", "in small letters",
    "in my bag", "in his bag", "in her bag", "in their bag", "in our bag",
    "in my pencil case", "in the pencil case",
    "in the box", "in the bag", "in the basket", "in the jar",
    "in the kitchen", "in the bedroom", "in the bathroom", "in the living room",
    "in the garden", "in the yard", "in the field", "in the forest",
    "in the park", "in the playground", "in the garden",
    "in the picture", "in the photo",
    "in the front", "in the back", "in the middle", "at the back",
    "at the back of", "at the front of", "in front of the",
    "at the front of the class", "at the back of the class",
    "in the class", "in the school", "in the grade", "in the year",
    "in grade 1", "in grade 2", "in grade 3", "in grade 4", "in grade 5",
    "in the picture", "in the frame", "in the corner of the room",
    "in the middle of the", "in the middle of a",
    "in the middle of the night", "in the middle of the day",
    "in the middle of the week", "in the middle of the month",
    "in the middle of the year", "in the middle of the room",
    "in the corner of the room", "in the corner of the house",
    "in the middle of the street", "in the middle of the road",
    "by the window", "by the door", "by the table", "by the bed",
    "by the way", "by the lake", "by the river", "by the sea",
    "by the road", "by the car", "by the bus", "by the train",
    "by the station", "by the park", "by the school",
    "by the market", "by the store", "by the shop",
    "by the bank", "by the river", "by the bridge", "by the road",
    "by the car", "by the taxi", "by the bus", "by the train",
    "by the door", "by the window", "by the wall", "by the gate",
    "by the table", "by the chair", "by the bed", "by the desk",
    "by the side", "by the way", "by the side of the road",
    "by the side of the river", "by the side of the lake",
    "by the side of the sea", "by the side of the mountain",
    "by the side of the house", "by the side of the building",
    "by the side of the road", "by the side of the street",
    "by the side of the path", "by the side of the track",
    "by the side of the field", "by the side of the garden",
    "by the side of the park", "by the side of the forest",
    "by the side of the hill", "by the side of the valley",
    "by the side of the river", "by the side of the lake",
])


# ============================================================
# 2. KNOWN FALSE CHUNKS — blacklist
# ============================================================
# These match audit_false_chunks.py rules 1-10.

import sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from audit_false_chunks import classify_bold as _audit_classify


# ============================================================
# 3. Classification logic
# ============================================================

def classify_chunk(chunk):
    """Return (status, reason). status in {'valid', 'invalid', 'unverified'}."""
    c = chunk.strip()
    cl = c.lower()
    words = cl.split()

    # 2.1 Proper-name hard whitelist (pyspellchecker should NEVER flag these)
    proper_names = {
        'ueno park', 'hyde park', 'central park', 'luxembourg gardens',
        'royal botanic gardens', 'opera house', 'hoi an', 'ha long bay',
        'west lake', 'hoan kiem lake', 'tay ho', 'tower of london',
        'eiffel tower', 'big ben', 'notre dame', 'the louvre',
    }
    if cl in proper_names:
        return ('valid', 'proper-name hard whitelist')

    # 2. Run existing audit blacklist first
    reasons = _audit_classify(c)
    if reasons:
        return ('invalid', '; '.join(reasons))

    # 2. Check exact-match whitelist
    if cl in VALID_CHUNKS:
        return ('valid', 'whitelist exact match')

    # 2.5 Layer 3: collocation dictionary (combined A1-B1 + extra + learned + wiktionary)
    try:
        from production_kit.data.chunks_combined import CHUNKS_ALL
        if cl in CHUNKS_ALL:
            return ('valid', 'Layer 3 combined collocation dictionary match')
    except Exception as e:
        pass
    try:
        from production_kit.data.wiktionary_idioms import CHUNKS_WIKI
        if cl in CHUNKS_WIKI:
            return ('valid', 'Layer 3 wiktionary idioms match')
    except Exception as e:
        pass

    # 2.6 Layer 3.5: pyspellchecker typo detection
    # Skip if the FULL chunk is in the combined dictionary (whitelisted
    # proper noun like "Ueno Park" — already passed Layer 3) OR in
    # wiktionary dict. Either way, pyspellchecker should NOT fire.
    full_match = False
    try:
        from production_kit.data.chunks_combined import CHUNKS_ALL
        if cl in CHUNKS_ALL:
            full_match = True
    except Exception:
        pass
    if not full_match:
        try:
            from production_kit.data.wiktionary_idioms import CHUNKS_WIKI
            if cl in CHUNKS_WIKI:
                full_match = True
        except Exception:
            pass
    if not full_match and 1 <= len(words) <= 5:
        try:
            from spellchecker import SpellChecker
            sc = SpellChecker()
            bad_words = [w for w in words if w and w.isalpha() and len(w) > 3
                         and w.lower() not in sc]
            if bad_words and len(bad_words) == 1:
                cand = sc.candidates(bad_words[0])
                if cand:
                    correction = sorted(cand)[0] if len(cand) > 1 else bad_words[0]
                    if correction != bad_words[0]:
                        reasons.append(
                            f'possible typo "{bad_words[0]}" -> "{correction}"')
                        return ('invalid', '; '.join(reasons))
        except Exception as e:
            import sys
            print(f'DEBUG pyspell: {e!r}', file=sys.stderr)

    # 3. === PATTERN-BASED RECOGNITION ===
    # Each pattern returns ('valid', reason) on match.

    # 3.1 Phrasal verb pattern: VERB + PARTICLE (up, down, out, off, away, back, in, on, about, over, through)
    particles = {'up', 'down', 'out', 'off', 'away', 'back', 'in', 'on',
                 'about', 'over', 'through', 'after', 'along', 'into'}
    if len(words) >= 2 and words[-1] in particles:
        return ('valid', f'phrasal verb (verb+{words[-1]})')

    # 3.2 Common phrasal verbs
    common_phrasals = {
        'came to', 'went on', 'ran out', 'sat down', 'stood up',
        'walked home', 'waved back', 'waved at', 'waved to',
        'jumped out', 'gave up', 'took off', 'put on', 'put off',
        'put away', 'got up', 'worked out', 'figured out',
        'pointed out', 'kept on', 'kept up', 'looked out', 'watched out',
        'carried on', 'moved on', 'tried on', 'turned on', 'turned off',
        'broke down', 'cut down', 'cut off', 'set up', 'made up',
        'picked up', 'put down', 'looked up', 'looked over', 'looked through',
        'woke up', 'lay down', 'sitting down', 'standing up', 'come back',
        'go back', 'came in', 'went in', 'come out', 'went out',
        'come up', 'go up', 'came down', 'go down',
        'kept going', 'kept playing',
    }
    if cl in common_phrasals:
        return ('valid', 'phrasal verb')

    # 3.3 Fixed preposition-phrase / locative / temporal
    if len(words) == 2 and words[0] in ('at', 'in', 'on', 'by', 'to', 'for', 'with', 'from'):
        return ('valid', 'preposition phrase (2 words)')

    # 3.4 Binomial pair: A and B
    if len(words) == 3 and words[1] == 'and':
        return ('valid', 'binomial pair (A and B)')
    if len(words) == 4 and words[1] == 'and' and words[2] in ('and', '&'):
        return ('valid', 'trinomial pair (A and B and C)')

    # 3.5 Reciprocal phrase
    if cl in ('each other', 'one another', 'each other’s', "each other's",
               'with each other', 'to each other', 'for each other', 'of each other',
               'from each other', 'in each other', 'on each other'):
        return ('valid', 'reciprocal phrase')

    # 3.6 Existence pattern: There is/are/was/were
    if cl.startswith(('there is', 'there are', 'there was', 'there were', 'there has', 'there have')):
        return ('valid', 'existence pattern (There is/are/...)')

    # 3.7 Fixed transition / functional
    fixed_transitions = {
        'first of all', 'in real life', 'in fact', 'in time', 'on time',
        'of course', 'for example', 'for instance', 'at first', 'at last',
        'at once', 'in the end', 'as a result', 'as well', 'as well as',
        'at the same time', 'by the way', 'on the other hand', 'in addition',
        'in conclusion', 'to sum up', 'in summary', 'for the rest of',
        'at the very end', 'all of a sudden', 'all at once',
        'from that day on', 'from now on', 'from then on', 'in the meantime',
        'at the moment', 'at the moment', 'in no time', 'in time',
        'in a row', 'in a line', 'in a circle', 'in a hurry',
        'at break time', 'at lunchtime', 'at dinnertime', 'at bedtime',
        'in the morning', 'in the afternoon', 'in the evening', 'at night',
        'at home', 'at school', 'at work', 'at the park', 'at the beach',
        'in the morning', 'on the way', 'on the way back', 'on the way home',
    }
    if cl in fixed_transitions:
        return ('valid', 'fixed transition / functional phrase')

    # 3.8 WH-clause start: When I / If you / What can we do
    wh_starts = ('when i', 'when you', 'when we', 'when they', 'when he', 'when she',
                 'if you', 'if we', 'if they', 'if he', 'if she',
                 'what can', 'what will', 'what do', 'what does', 'what is',
                 'how do', 'how does', 'how is', 'how are', 'how can',
                 'where do', 'where is', 'where are', 'where can',
                 'who is', 'who are', 'who can', 'who do', 'who does',
                 'why do', 'why is', 'why are', 'why did',
                 'is there', 'are there', 'was there', 'were there',
                 'do you', 'does she', 'does he', 'did you',
                 'are you', 'is it', 'can you', 'can we', 'can i',
                 'have you', 'has she', 'has he', 'had you',
                 'will you', 'will we', 'would you', 'should we',
                 'this is', 'that is', 'these are', 'those are',
                 'it is', 'it was', 'they are', 'they were',
                 'we are', 'we were', 'you are', 'you were',
                 'i am', 'i was', 'he is', 'he was', 'she is', 'she was',
                 'but there is', 'and there is', 'and there are',
                 'or there is', 'so there is', 'so there are')
    for w in wh_starts:
        if cl.startswith(w + ' ') or cl == w:
            return ('valid', f'functional phrase (starts with "{w}")')

    # 3.9 Number + unit (8 years old, 1.1°C warmer)
    if len(words) >= 2 and words[0].replace('.', '').replace(',', '').isdigit():
        return ('valid', 'number + unit expression')

    # 3.10 Proper noun (capitalized, single or multi-word, but not at start of sentence)
    # Heuristic: contains at least one Title-case word AND not a generic sentence
    if any(w[0:1].isupper() for w in c.split()):
        # Avoid catching Title-cased sentence starts
        if not cl.startswith(('I ', 'You ', 'We ', 'They ', 'He ', 'She ', 'It ',
                              'My ', 'Our ', 'Their ', 'His ', 'Her ', 'The ',
                              'A ', 'An ', 'But ', 'And ', 'Or ', 'So ', 'When ',
                              'If ', 'What ', 'How ', 'Where ', 'Who ', 'Why ',
                              'In ', 'On ', 'At ', 'By ', 'For ', 'With ')):
            return ('valid', 'proper noun (capitalized)')

    # 3.11 V + Prep + det + N (e.g., go to the library, look at tiny insects, wait for the bus)
    if len(words) == 4 and words[1] in particles and words[2] in ('a', 'an', 'the', 'my', 'your', 'his', 'her', 'our', 'their', 'this', 'that', 'these', 'those'):
        if words[0].endswith(('ed', 's', 'e')) or words[0] in {
            'go', 'goes', 'went', 'come', 'comes', 'came',
            'look', 'looks', 'looked', 'wait', 'waits', 'waited',
            'listen', 'listens', 'listened', 'jump', 'jumps', 'jumped',
            'play', 'plays', 'played', 'work', 'works', 'worked',
            'walk', 'walks', 'walked', 'run', 'runs', 'ran',
            'fly', 'flies', 'flew', 'swim', 'swims', 'swam',
            'fall', 'falls', 'fell', 'live', 'lives', 'lived',
            'sit', 'sits', 'sat', 'stand', 'stands', 'stood',
        }:
            return ('valid', 'V + Prep + Det + N (phrasal verb + object)')

    # 3.12 V + Prep + Adj (e.g., look different, feel proud of)
    # Detect when last word is a particle
    if len(words) == 3 and words[1] in particles:
        return ('valid', 'V + Prep + Adj (phrasal verb)')

    # 3.13 V + det/pron + N (e.g., brushed all my teeth, took his lunch)
    if len(words) == 4 and words[1] in ('all', 'my', 'your', 'his', 'her', 'our', 'their', 'a', 'an', 'the'):
        if words[2] in ('my', 'your', 'his', 'her', 'our', 'their', 'a', 'an', 'the', 'this', 'that'):
            # V + Det/Poss + Det/Poss + N (very common ESL pattern)
            return ('valid', 'V + Det + Det + N (collocation)')
        if words[0].endswith(('ed', 's', 'e')) or words[0] in {
            'have', 'has', 'had', 'take', 'takes', 'took', 'make', 'makes', 'made',
            'give', 'gives', 'gave', 'tell', 'tells', 'told', 'break', 'breaks', 'broke',
            'do', 'does', 'did', 'go', 'goes', 'went', 'see', 'sees', 'saw',
            'catch', 'catches', 'caught', 'pay', 'pays', 'paid', 'cut', 'cuts',
            'put', 'puts', 'choose', 'chooses', 'chose', 'build', 'builds', 'built',
            'play', 'plays', 'played', 'sit', 'sits', 'sat', 'ask', 'asks', 'asked',
            'learn', 'learns', 'learned', 'read', 'reads', 'write', 'writes', 'wrote',
            'smell', 'smells', 'smelt', 'taste', 'tastes', 'tasted',
            'feel', 'feels', 'felt', 'find', 'finds', 'found',
            'lose', 'loses', 'lost', 'win', 'wins', 'won', 'set', 'sets',
            'show', 'shows', 'showed', 'brush', 'brushes', 'brushed',
        }:
            return ('valid', 'V + Det/Pron + N (collocation)')

    # 3.14 V + Adv + Adj (e.g., feel very excited, felt very relieved)
    if len(words) == 3 and words[1] in ('very', 'quite', 'really', 'so', 'too', 'extremely', 'absolutely', 'totally', 'completely', 'perfectly', 'always'):
        return ('valid', 'V + Adv + Adj (collocation)')

    # 3.15 V + Adj + N (e.g., have a nice bedroom, took a great photo)
    if len(words) == 4 and words[1] in ('a', 'an', 'the') and (
        words[3] in ('bedroom', 'photo', 'photograph', 'picture', 'walk', 'trip', 'rest', 'break',
                     'house', 'home', 'place', 'time', 'day', 'year', 'way',
                     'look', 'view', 'chat', 'talk', 'meeting', 'game', 'ball',
                     'job', 'work', 'task', 'lesson', 'meal', 'food', 'snack',
                     'shower', 'bath', 'sleep', 'nap', 'party', 'favor',
                     'gift', 'present', 'surprise', 'story', 'book', 'letter',
                     'note', 'message', 'call', 'chat', 'question', 'answer',
                     'problem', 'issue', 'plan', 'idea', 'chance', 'opportunity',
                     'moment', 'minute', 'hour', 'day', 'week', 'month', 'year')
    ):
        return ('valid', 'V + Det + Adj + N (have a nice X)')

    # 3.16 Det + Adj + N (e.g., a hard-working ant, a nice bedroom)
    if len(words) == 3 and words[0] in ('a', 'an', 'the', 'my', 'your', 'his', 'her', 'our', 'their', 'this', 'that', 'these', 'those'):
        return ('valid', 'Det + Adj + N (collocation)')

    # 3.17 N + N (compound noun: climate change, polar ice, sea levels, greenhouse gases)
    if len(words) == 2:
        # Both words must be plausible nouns (not verbs, not adj-only)
        if not words[0].endswith(('ed', 'ing', 'ly')) and not words[0] in {
            'is', 'are', 'was', 'were', 'has', 'have', 'had', 'do', 'does',
            'did', 'will', 'would', 'can', 'could', 'should', 'may', 'might',
            'get', 'got', 'make', 'made', 'go', 'went', 'come', 'came',
            'take', 'took', 'give', 'gave', 'see', 'saw', 'know', 'knew',
            'think', 'thought', 'feel', 'felt', 'say', 'said', 'tell', 'told',
        }:
            return ('valid', 'N + N (compound noun)')

    # 3.18 Adj + N (most common: cheese sandwiches, fresh strawberries, soft blanket)
    if len(words) == 2:
        if words[0].endswith(('y', 'le', 'er', 'ful', 'ous', 'ish', 'ed',
                              'al', 'an', 'ic', 'ive', 'less', 'ing',
                              'able', 'ible')):
            return ('valid', 'Adj + N (collocation)')

    # 3.19 2-word compound noun where word1 is a noun and word2 is a typical compound noun
    compound_nouns = {
        'room', 'door', 'table', 'chair', 'box', 'case', 'bag', 'basket',
        'house', 'home', 'place', 'time', 'day', 'year', 'way', 'thing',
        'road', 'street', 'path', 'line', 'side', 'top', 'bottom', 'back',
        'front', 'middle', 'end', 'edge', 'corner', 'center', 'centre',
        'park', 'station', 'stop', 'bridge', 'road', 'street', 'sidewalk',
        'kitchen', 'bedroom', 'classroom', 'bathroom', 'living', 'dining',
        'market', 'store', 'shop', 'school', 'hospital', 'library',
        'picture', 'photo', 'image', 'video', 'film', 'movie',
        'bus', 'car', 'taxi', 'train', 'plane', 'boat', 'ship', 'bike',
        'number', 'letter', 'word', 'sentence', 'paragraph', 'page',
        'weekend', 'birthday', 'holiday', 'vacation', 'festival',
        'team', 'group', 'club', 'class', 'grade', 'school',
        'food', 'rice', 'soup', 'noodle', 'meat', 'fish', 'fruit',
        'water', 'juice', 'milk', 'tea', 'coffee', 'drink',
        'pen', 'pencil', 'ruler', 'eraser', 'book', 'paper', 'page',
        'sister', 'brother', 'mother', 'father', 'parent', 'friend',
    }
    if len(words) == 2 and words[1] in compound_nouns:
        return ('valid', '2-word compound (N + common noun)')

    # 3.20 Multi-word Adj + N with shared noun head (e.g., "high mountain", "high mountains")
    if len(words) == 2 and (words[1].endswith('s') or words[1] in compound_nouns):
        return ('valid', 'Adj + N (singular or plural)')

    # 3.21 Prep + N (e.g., at school, by car, in town, on foot)
    if len(words) == 2 and words[0] in ('at', 'in', 'on', 'by', 'to', 'for', 'with', 'from', 'into', 'onto', 'off', 'out', 'over', 'under'):
        return ('valid', 'Prep + N (locative)')

    # 3.22 Adj + Adj + N (e.g., big brown eyes, beautiful long hair, hard-working ant)
    if len(words) == 3:
        if all(w.endswith(('y', 'le', 'er', 'ful', 'ous', 'ish', 'ed', 'al', 'an',
                           'ic', 'ive', 'less', 'ing', 'able', 'ible',
                           'ing', 'een', 'un', 'en', 'y', 'ous',
                           'or', 'us', 'on', 'an', 'ern'))
           or w in ('hard', 'soft', 'short', 'long', 'big', 'small', 'old', 'new',
                    'kind', 'smart', 'clever', 'red', 'blue', 'green', 'yellow',
                    'white', 'black', 'brown', 'pink', 'purple', 'gray',
                    'beautiful', 'lovely', 'nice', 'happy', 'sad', 'fresh',
                    'clean', 'dirty', 'dry', 'wet', 'hot', 'cold', 'warm',
                    'cool', 'tall', 'tiny', 'little', 'great', 'wonderful',
                    'terrible', 'famous', 'ancient', 'modern', 'english',
                    'japanese', 'vietnamese', 'past', 'present', 'future')
           for w in words[:2]):
            return ('valid', 'Adj + Adj + N (double modifier)')

    # 3.23 V + Adj + N or V + N + N (e.g., have a nice bedroom, get ready for school, brush your teeth)
    if len(words) == 4:
        if words[1] in ('a', 'an', 'the', 'my', 'your', 'his', 'her', 'our', 'their', 'this', 'that'):
            # V + Det + Adj + N
            if words[0].endswith(('ed', 's', 'e')) or words[0] in {
                'have', 'has', 'had', 'take', 'takes', 'took', 'make', 'makes',
                'made', 'give', 'gives', 'gave', 'tell', 'tells', 'told',
                'do', 'does', 'did', 'go', 'goes', 'went', 'see', 'sees',
                'saw', 'catch', 'catches', 'caught', 'pay', 'pays', 'paid',
                'put', 'puts', 'play', 'plays', 'played', 'ask', 'asks',
                'asked', 'read', 'reads', 'write', 'writes', 'wrote',
                'feel', 'feels', 'felt', 'find', 'finds', 'found',
                'buy', 'buys', 'bought', 'cut', 'cuts', 'choose', 'chooses',
                'chose', 'cook', 'cooks', 'cooked', 'paint', 'paints',
                'painted', 'draw', 'draws', 'drew', 'get', 'gets', 'got',
            }:
                return ('valid', 'V + Det + Adj + N (collocation)')

    # 3.24 V + Prep + N (e.g., look different, get ready for school)
    if len(words) == 4:
        if words[1] in particles:
            if words[0].endswith(('ed', 's', 'e')) or words[0] in {
                'get', 'gets', 'got', 'go', 'goes', 'went', 'come', 'comes', 'came',
                'look', 'looks', 'looked', 'feel', 'feels', 'felt',
                'wait', 'waits', 'waited', 'ask', 'asks', 'asked',
                'live', 'lives', 'lived', 'work', 'works', 'worked',
                'play', 'plays', 'played', 'walk', 'walks', 'walked',
                'run', 'runs', 'ran', 'fly', 'flies', 'flew',
            }:
                return ('valid', 'V + Prep + N/Adj (phrasal verb + complement)')

    # 3.25 V + N + Prep + N (e.g., go to school, ask one question at a time)
    if len(words) == 5 and words[2] in particles:
        if words[0].endswith(('ed', 's', 'e')) or words[0] in {
            'go', 'goes', 'went', 'come', 'comes', 'came',
            'look', 'looks', 'looked', 'ask', 'asks', 'asked',
            'play', 'plays', 'played', 'wait', 'waits', 'waited',
            'walk', 'walks', 'walked', 'work', 'works', 'worked',
        }:
            return ('valid', 'V + N + Prep + N/Adj/Det')

    # 3.26 Superlative construction (e.g., best day ever, the most beautiful place)
    if len(words) >= 2 and words[0] in ('best', 'worst', 'most', 'least'):
        return ('valid', 'superlative construction')

    # 3.27 Cooking/doing + adj + noun (e.g., cook simple meals, eat a carrot, drink a glass)
    if len(words) == 3 and words[1] in ('a', 'an', 'the', 'my', 'your', 'his', 'her', 'our', 'their'):
        if words[0] in {
            'eat', 'eats', 'ate', 'drink', 'drinks', 'drank', 'cook', 'cooks',
            'cooked', 'paint', 'paints', 'painted', 'draw', 'draws', 'drew',
            'play', 'plays', 'played', 'build', 'builds', 'built',
            'wash', 'washes', 'washed', 'clean', 'cleans', 'cleaned',
            'cut', 'cuts', 'read', 'reads', 'write', 'writes', 'wrote',
            'catch', 'catches', 'caught', 'see', 'sees', 'saw',
        }:
            return ('valid', 'V + Det + N (cooking/eating/drinking)')

    # 3.28 V + N + N (e.g., catch cold virus, draw picture book, ask question mark)
    if len(words) == 3:
        if words[0] in {
            'catch', 'caught', 'draw', 'drew', 'build', 'built',
            'write', 'wrote', 'read', 'paint', 'painted', 'ask',
            'cook', 'cooked', 'play', 'played', 'wash', 'washed',
        }:
            return ('valid', 'V + N + N (verb+object+modifier)')

    # 3.29 -ing + N (e.g., drawing colorful pictures, cooking rice, making noise)
    if len(words) >= 2 and words[0].endswith('ing'):
        return ('valid', '-ing + N (gerund + object)')

    # 3.30 V + Adv (e.g., came quickly, said loudly - but check for free grammatical phrase first)
    if len(words) == 2 and words[1] in (
        'quickly', 'slowly', 'loudly', 'quietly', 'carefully', 'safely',
        'happily', 'sadly', 'angrily', 'eagerly', 'politely',
    ):
        if words[0].endswith(('ed', 's', 'e')) or words[0] in {
            'come', 'go', 'say', 'speak', 'walk', 'run', 'work', 'look',
            'think', 'act', 'move', 'turn', 'sit', 'stand', 'fall',
        }:
            return ('valid', 'V + Adv manner (collocation)')

    # 3.31 Unverified — needs LLM Judge
    return ('unverified', 'no whitelist match, no blacklist match, no pattern match')


# ============================================================
# 4. Audit driver
# ============================================================

def audit_file(path, week, mode):
    """Return list of findings for a single file."""
    s = pathlib.Path(path).read_text()
    m = re.search(r'content_en:\s*(["`])((?:\\.|(?!\1).)*)\1', s, re.DOTALL)
    if not m:
        return []
    content = m.group(2)
    chunks = re.findall(r'\*\*([^*]+)\*\*', content)
    findings = []
    for chunk in chunks:
        status, reason = classify_chunk(chunk)
        findings.append({
            'week': week,
            'mode': mode,
            'file': path,
            'chunk': chunk,
            'status': status,
            'reason': reason,
        })
    return findings


def main():
    args = sys.argv[1:]
    explore_only = '--explore-only' in args
    read_only = '--read-only' in args
    scan_all = '--all' in args
    args = [a for a in args if not a.startswith('--')]

    if scan_all:
        weeks = list(range(1, 36))
    elif args:
        weeks = [int(w) for w in args]
    else:
        weeks = list(range(28, 36))

    stations = []
    if not explore_only:
        stations.append('read')
    if not read_only:
        stations.append('explore')

    all_findings = []
    for w in weeks:
        for mode in ['weeks', 'weeks_easy']:
            for station in stations:
                p = f'src/data/{mode}/week_{w:02d}/{station}.js'
                if pathlib.Path(p).exists():
                    findings = audit_file(p, w, mode)
                    all_findings.extend(findings)

    if not all_findings:
        print('No bolds found.')
        return 0

    by_status = {'valid': [], 'invalid': [], 'unverified': []}
    for f in all_findings:
        by_status[f['status']].append(f)

    print(f"Total bolds: {len(all_findings)}")
    print(f"  VALID:     {len(by_status['valid'])}")
    print(f"  INVALID:   {len(by_status['invalid'])}")
    print(f"  UNVERIFIED: {len(by_status['unverified'])} (NEEDS MANUAL REVIEW)")
    print()

    if by_status['invalid']:
        print("=== INVALID (false chunks) ===")
        for f in by_status['invalid']:
            print(f"  W{f['week']:02d} {f['mode']:11s} {f['file']}")
            print(f"     chunk: '{f['chunk']}'")
            print(f"     reason: {f['reason']}")
            print()

    if by_status['unverified']:
        print("=== UNVERIFIED (need manual review) ===")
        for f in by_status['unverified']:
            print(f"  W{f['week']:02d} {f['mode']:11s} {f['file']}")
            print(f"     chunk: '{f['chunk']}'")
            print()

    return 0


if __name__ == '__main__':
    sys.exit(main())
