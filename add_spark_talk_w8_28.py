#!/usr/bin/env python3
"""Add spark_talk arrays to week_08 through week_28 real.js files."""
import re, os

WEEKS = {
    8: {
        "title": "The Busy Classroom (Plural)",
        "cards": [
            {
                "id": "spark_my_classroom",
                "emoji": "🏫",
                "title": "My Busy Classroom",
                "bridge": "In the story, the classroom was full of things — books, pencils, chairs everywhere! 📚",
                "seed_question": "How many things can you see in YOUR classroom right now? Tell me!",
                "scaffold_frames": ["There are ___ ___s", "I can see ___ books", "My classroom has ___"],
                "vocab_focus": ["book", "pencil", "chair", "desk", "bag"],
                "turns": 8,
            },
            {
                "id": "spark_count_my_things",
                "emoji": "🔢",
                "title": "Count My Things",
                "bridge": "We counted everything in the story classroom — 20 books, 15 pencils, 10 bags! 🎒",
                "seed_question": "Count YOUR school things! How many pens, books, and bags do you have?",
                "scaffold_frames": ["I have ___ ___s", "There are ___ ___s in my bag", "My favourite thing is ___"],
                "vocab_focus": ["one", "two", "three", "many", "some"],
                "turns": 8,
            },
        ],
    },
    9: {
        "title": "City Sounds & Sights (Adjectives)",
        "cards": [
            {
                "id": "spark_my_city",
                "emoji": "🌆",
                "title": "My City",
                "bridge": "In the story, we walked through a noisy, colourful, exciting city! 🏙️",
                "seed_question": "Tell me about YOUR city or town! What is it like?",
                "scaffold_frames": ["My city is ___", "I can see ___", "My favourite place in my city is ___"],
                "vocab_focus": ["big", "small", "noisy", "quiet", "beautiful"],
                "turns": 8,
            },
            {
                "id": "spark_city_or_country",
                "emoji": "🌾",
                "title": "City or Countryside?",
                "bridge": "The city was loud and busy, but the countryside was quiet and green — so different! 🌿",
                "seed_question": "Where do YOU live? Is it busy or quiet? Tell me what it looks like!",
                "scaffold_frames": ["I live in a ___ place", "Near my house there is ___", "I like/don't like it because ___"],
                "vocab_focus": ["city", "town", "village", "busy", "peaceful"],
                "turns": 8,
            },
        ],
    },
    10: {
        "title": "The Farm Adventure (Contrast)",
        "cards": [
            {
                "id": "spark_my_food",
                "emoji": "🥕",
                "title": "My Favourite Food",
                "bridge": "On the farm, the animals gave us milk, eggs, vegetables — so much delicious food! 🐄",
                "seed_question": "What food do YOU eat every day? Tell me what you love and what you don't like!",
                "scaffold_frames": ["I love ___", "I don't like ___", "Every day I eat ___"],
                "vocab_focus": ["fruit", "vegetable", "meat", "rice", "egg"],
                "turns": 8,
            },
            {
                "id": "spark_compare_two",
                "emoji": "⚖️",
                "title": "Compare Two Things",
                "bridge": "The farm was big and slow, but the city was small and fast — they were total opposites! 🔄",
                "seed_question": "Tell me about TWO things you like and compare them! Which one do you prefer and why?",
                "scaffold_frames": ["___ is ___ but ___ is ___", "I prefer ___ because ___", "___ is better than ___"],
                "vocab_focus": ["bigger", "smaller", "faster", "better", "nicer"],
                "turns": 8,
            },
        ],
    },
    11: {
        "title": "Weekend Fun Spots (Places)",
        "cards": [
            {
                "id": "spark_my_fav_place",
                "emoji": "🎪",
                "title": "My Favourite Weekend Place",
                "bridge": "The characters visited the park, the zoo, and the cinema on weekends — so much fun! 🎡",
                "seed_question": "What is YOUR favourite place to go on weekends? Tell me all about it!",
                "scaffold_frames": ["I love going to ___", "At the ___ I can ___", "It is ___ and ___"],
                "vocab_focus": ["park", "cinema", "mall", "beach", "market"],
                "turns": 8,
            },
            {
                "id": "spark_last_weekend",
                "emoji": "📅",
                "title": "My Last Weekend",
                "bridge": "The characters had an amazing weekend — swimming, eating, exploring new places! 🌟",
                "seed_question": "What did YOU do last weekend? Tell me everything from morning to night!",
                "scaffold_frames": ["On Saturday I ___", "I went to ___", "It was ___ because ___"],
                "vocab_focus": ["went", "played", "ate", "visited", "enjoyed"],
                "turns": 8,
            },
        ],
    },
    12: {
        "title": "The Talent Show",
        "cards": [
            {
                "id": "spark_my_talent",
                "emoji": "🎤",
                "title": "My Hidden Talent",
                "bridge": "Everyone in the talent show had a special skill — singing, magic, dancing, cooking! ✨",
                "seed_question": "What is YOUR talent? What can you do really well? Tell me!",
                "scaffold_frames": ["I can ___", "I am good at ___", "My special talent is ___"],
                "vocab_focus": ["sing", "draw", "dance", "cook", "play"],
                "turns": 8,
            },
            {
                "id": "spark_amazing_person",
                "emoji": "🏆",
                "title": "Someone Amazing",
                "bridge": "The talent show winner had a hidden talent nobody knew about — what a surprise! 🎊",
                "seed_question": "Tell me about someone YOU know who has an amazing talent! What can they do?",
                "scaffold_frames": ["My ___ can ___", "They are very good at ___", "I think they are ___ because ___"],
                "vocab_focus": ["friend", "brother", "sister", "teacher", "can"],
                "turns": 8,
            },
        ],
    },
    13: {
        "title": "Daily Routines",
        "cards": [
            {
                "id": "spark_my_morning",
                "emoji": "⏰",
                "title": "My Morning Routine",
                "bridge": "Every morning, the character woke up, brushed teeth, ate breakfast, and rushed to school! 🌅",
                "seed_question": "Tell me YOUR morning routine! What do you do every morning step by step?",
                "scaffold_frames": ["First I ___", "Then I ___", "Finally I ___"],
                "vocab_focus": ["wake up", "brush", "eat", "get dressed", "go to school"],
                "turns": 8,
            },
            {
                "id": "spark_perfect_day",
                "emoji": "🌙",
                "title": "My Perfect Day",
                "bridge": "Saturday was the character's favourite day — no school, just fun all day long! 🎉",
                "seed_question": "What does YOUR perfect day look like? Tell me everything — morning, afternoon, and night!",
                "scaffold_frames": ["In the morning I ___", "In the afternoon I ___", "At night I ___"],
                "vocab_focus": ["sleep", "play", "watch", "eat", "relax"],
                "turns": 8,
            },
        ],
    },
    14: {
        "title": "Welcome to My World",
        "cards": [
            {
                "id": "spark_my_world",
                "emoji": "🌍",
                "title": "Welcome to My World",
                "bridge": "The character invited everyone into their world — their home, friends, food, and adventures! 🚪",
                "seed_question": "Welcome me into YOUR world! Tell me about your life — what makes it special?",
                "scaffold_frames": ["In my world there is ___", "My favourite thing is ___", "I live with ___"],
                "vocab_focus": ["family", "home", "friend", "school", "favourite"],
                "turns": 10,
            },
            {
                "id": "spark_my_neighbourhood",
                "emoji": "🏘️",
                "title": "My Neighbourhood",
                "bridge": "The neighbourhood in the story had a park, a school, a market, and friendly neighbours! 🌳",
                "seed_question": "What is YOUR neighbourhood like? Tell me what you can find near your home!",
                "scaffold_frames": ["Near my house there is ___", "My street has ___", "I like my neighbourhood because ___"],
                "vocab_focus": ["park", "shop", "school", "road", "neighbour"],
                "turns": 8,
            },
        ],
    },
    15: {
        "title": "The Busy Park (Actions Now)",
        "cards": [
            {
                "id": "spark_right_now",
                "emoji": "🌳",
                "title": "Right Now!",
                "bridge": "Look at the park — everyone is running, jumping, eating, laughing all at once! 🏃",
                "seed_question": "What are YOU doing right now? What can you see around you? Tell me everything!",
                "scaffold_frames": ["I am ___ing", "I can see ___", "Next to me there is ___"],
                "vocab_focus": ["sitting", "holding", "looking", "thinking", "watching"],
                "turns": 8,
            },
            {
                "id": "spark_action_reporter",
                "emoji": "📡",
                "title": "Action Reporter",
                "bridge": "Our reporter described EVERYTHING happening in the park — live and on camera! 🎙️",
                "seed_question": "Be my reporter! Describe what is happening in YOUR room or house right now!",
                "scaffold_frames": ["In this room, ___ is ___ing", "I can see ___", "Right now, ___ is ___"],
                "vocab_focus": ["running", "sitting", "playing", "eating", "working"],
                "turns": 8,
            },
        ],
    },
    16: {
        "title": "Sports Commentary",
        "cards": [
            {
                "id": "spark_my_sport",
                "emoji": "⚽",
                "title": "My Favourite Sport",
                "bridge": "The commentator described every kick, jump, and goal in the most exciting match! 🏟️",
                "seed_question": "What sport do YOU love? Tell me how to play it and why you like it!",
                "scaffold_frames": ["My favourite sport is ___", "You need to ___", "I love it because ___"],
                "vocab_focus": ["run", "kick", "throw", "team", "win"],
                "turns": 8,
            },
            {
                "id": "spark_sports_star",
                "emoji": "🥇",
                "title": "My Sports Star",
                "bridge": "The crowd cheered for the fastest, strongest, bravest player in the whole game! 🌟",
                "seed_question": "Tell me about YOUR favourite sports star! What can they do? Why do you love them?",
                "scaffold_frames": ["My favourite player is ___", "They can ___", "I admire them because ___"],
                "vocab_focus": ["fast", "strong", "talented", "famous", "champion"],
                "turns": 8,
            },
        ],
    },
    17: {
        "title": "Weather & Clothes",
        "cards": [
            {
                "id": "spark_todays_weather",
                "emoji": "☀️",
                "title": "Today's Weather",
                "bridge": "The characters had to pick the right clothes for rain, sunshine, and even snow! 🌦️",
                "seed_question": "What is the weather like TODAY where you are? What are you wearing? Tell me!",
                "scaffold_frames": ["Today it is ___", "I am wearing ___", "The weather is ___ so I need ___"],
                "vocab_focus": ["sunny", "rainy", "cloudy", "hot", "cold"],
                "turns": 8,
            },
            {
                "id": "spark_my_outfit",
                "emoji": "👗",
                "title": "My Favourite Outfit",
                "bridge": "The fashion show had beautiful outfits for every season and every type of weather! 👔",
                "seed_question": "Describe YOUR favourite outfit to me! What does it look like and when do you wear it?",
                "scaffold_frames": ["My favourite outfit is ___", "It is ___", "I wear it when ___"],
                "vocab_focus": ["shirt", "shoes", "jacket", "colour", "warm"],
                "turns": 8,
            },
        ],
    },
    18: {
        "title": "The Live Reporter",
        "cards": [
            {
                "id": "spark_breaking_news",
                "emoji": "📺",
                "title": "Breaking News!",
                "bridge": "The reporter went live from the school, describing everything happening around them! 🎥",
                "seed_question": "Imagine YOU are a live reporter at YOUR school right now. What do you see and hear?",
                "scaffold_frames": ["I am standing in ___", "Right now I can see ___", "Behind me, ___ is ___ing"],
                "vocab_focus": ["right now", "here", "I can see", "people are", "it is"],
                "turns": 8,
            },
            {
                "id": "spark_behind_me",
                "emoji": "🎙️",
                "title": "What's Behind Me?",
                "bridge": "The reporter showed viewers the exciting things happening right behind them! 📡",
                "seed_question": "Stand somewhere interesting. What is happening BEHIND you right now? Report it to me!",
                "scaffold_frames": ["Behind me there is ___", "___ is ___ing", "I can hear ___"],
                "vocab_focus": ["behind", "next to", "I can see", "there is", "happening"],
                "turns": 8,
            },
        ],
    },
    19: {
        "title": "When I Was Small",
        "cards": [
            {
                "id": "spark_baby_me",
                "emoji": "👶",
                "title": "Baby Me",
                "bridge": "The character found an old photo album full of memories from when they were little! 📷",
                "seed_question": "What do YOU remember from when you were small? Tell me your favourite memory!",
                "scaffold_frames": ["When I was small, I ___", "I remember ___", "I used to ___"],
                "vocab_focus": ["remember", "when", "small", "before", "used to"],
                "turns": 8,
            },
            {
                "id": "spark_best_birthday",
                "emoji": "🎂",
                "title": "My Best Birthday",
                "bridge": "They remembered the best birthday party ever — cake, balloons, dancing, and laughter! 🎉",
                "seed_question": "Tell me about YOUR favourite birthday! What happened? Who was there?",
                "scaffold_frames": ["On my birthday I ___", "I got ___", "My best birthday was when ___"],
                "vocab_focus": ["birthday", "cake", "present", "friends", "celebrate"],
                "turns": 8,
            },
        ],
    },
    20: {
        "title": "The Old Town Mystery",
        "cards": [
            {
                "id": "spark_old_vs_now",
                "emoji": "🏚️",
                "title": "Old vs Now",
                "bridge": "The old town looked so different before — different buildings, people, and a slower life! 🕰️",
                "seed_question": "How has YOUR neighbourhood or city changed? Tell me about old vs new!",
                "scaffold_frames": ["Before there was ___", "Now there is ___", "It changed because ___"],
                "vocab_focus": ["before", "now", "changed", "old", "new"],
                "turns": 8,
            },
            {
                "id": "spark_my_mystery",
                "emoji": "🔍",
                "title": "A Mystery in My Life",
                "bridge": "Someone found a mysterious box in the old building — what secrets were hidden inside? 📦",
                "seed_question": "Tell me about something mysterious or surprising that happened to YOU!",
                "scaffold_frames": ["One day I ___", "I was surprised when ___", "I found/saw ___"],
                "vocab_focus": ["mysterious", "surprise", "found", "strange", "happened"],
                "turns": 8,
            },
        ],
    },
    21: {
        "title": "Yesterday",
        "cards": [
            {
                "id": "spark_my_yesterday",
                "emoji": "📖",
                "title": "My Yesterday",
                "bridge": "We told the full story of a very busy, very special yesterday — from morning to bedtime! ⏰",
                "seed_question": "Tell me about YOUR yesterday! What happened from when you woke up to when you slept?",
                "scaffold_frames": ["Yesterday I ___", "In the morning I ___", "At night I ___"],
                "vocab_focus": ["yesterday", "woke up", "ate", "went", "came home"],
                "turns": 10,
            },
            {
                "id": "spark_unexpected_day",
                "emoji": "😱",
                "title": "My Most Unexpected Day",
                "bridge": "Yesterday, something completely unexpected happened — nobody could have guessed it! 🎲",
                "seed_question": "Tell me about a day when something completely UNEXPECTED happened to you!",
                "scaffold_frames": ["One day ___", "I was ___ing when ___", "I was so surprised because ___"],
                "vocab_focus": ["suddenly", "then", "surprised", "unexpected", "amazing"],
                "turns": 8,
            },
        ],
    },
    22: {
        "title": "The Time Detective",
        "cards": [
            {
                "id": "spark_guess_my_day",
                "emoji": "🕵️",
                "title": "Guess My Day",
                "bridge": "The detective asked smart questions to figure out exactly what happened and when! 🔎",
                "seed_question": "I am the detective! Answer my questions and I will figure out what you did yesterday!",
                "scaffold_frames": ["I woke up at ___", "I went to ___", "I was with ___"],
                "vocab_focus": ["when", "where", "who", "what", "how long"],
                "turns": 10,
            },
            {
                "id": "spark_best_week_ever",
                "emoji": "📆",
                "title": "My Best Week Ever",
                "bridge": "The detective discovered that last week was the BEST week of the character's whole life! 🌟",
                "seed_question": "Tell me about YOUR best week ever! What made it so incredibly special?",
                "scaffold_frames": ["My best week was when ___", "Every day we ___", "The best part was ___"],
                "vocab_focus": ["best", "special", "amazing", "we", "together"],
                "turns": 8,
            },
        ],
    },
    23: {
        "title": "The Art Class",
        "cards": [
            {
                "id": "spark_my_drawing",
                "emoji": "🎨",
                "title": "My Drawing",
                "bridge": "The art class made a beautiful painting of the thing they loved most in the world! 🖌️",
                "seed_question": "Tell me about a drawing or artwork YOU made! What did you create and what does it show?",
                "scaffold_frames": ["I drew/made ___", "In my picture there is ___", "I chose this because ___"],
                "vocab_focus": ["colour", "draw", "paint", "shape", "beautiful"],
                "turns": 8,
            },
            {
                "id": "spark_art_critic",
                "emoji": "🖼️",
                "title": "Art Critic",
                "bridge": "The art critic described every painting — the colours, shapes, feelings, and stories! 🎭",
                "seed_question": "Look around YOUR room. Describe something beautiful or interesting you can see!",
                "scaffold_frames": ["I can see ___", "It is ___ and ___", "I like it because ___"],
                "vocab_focus": ["colourful", "interesting", "beautiful", "I think", "it looks like"],
                "turns": 8,
            },
        ],
    },
    24: {
        "title": "Feelings in the Past",
        "cards": [
            {
                "id": "spark_so_happy",
                "emoji": "😊",
                "title": "I Was So Happy!",
                "bridge": "The character felt so many emotions — excited, scared, proud, and finally relieved! 🌈",
                "seed_question": "Tell me about a time you felt REALLY happy! What happened? Why were you so happy?",
                "scaffold_frames": ["I felt happy when ___", "I was ___ because ___", "I remember feeling ___"],
                "vocab_focus": ["happy", "excited", "proud", "relieved", "felt"],
                "turns": 8,
            },
            {
                "id": "spark_biggest_surprise",
                "emoji": "😮",
                "title": "My Biggest Surprise",
                "bridge": "The surprise made the character laugh, cry, and jump all at the same time! 🎊",
                "seed_question": "Tell me about the BIGGEST surprise of your life! How did you feel?",
                "scaffold_frames": ["I was surprised when ___", "I felt ___", "I couldn't believe ___"],
                "vocab_focus": ["surprised", "shocked", "excited", "emotional", "incredible"],
                "turns": 8,
            },
        ],
    },
    25: {
        "title": "The Sequence Challenge",
        "cards": [
            {
                "id": "spark_my_howto",
                "emoji": "📝",
                "title": "How To...",
                "bridge": "The characters explained step by step how to make a sandwich, tie shoes, and fly a kite! 🪁",
                "seed_question": "Teach me how to do something! Use: First... Then... Finally... What are the steps?",
                "scaffold_frames": ["First you ___", "Then you ___", "Finally you ___"],
                "vocab_focus": ["first", "then", "next", "after that", "finally"],
                "turns": 8,
            },
            {
                "id": "spark_my_story_sequence",
                "emoji": "🎬",
                "title": "My Story (Beginning to End)",
                "bridge": "Every great story has a beginning, a middle, and an exciting end — just like ours! 📖",
                "seed_question": "Tell me a story with a beginning, middle, and end! It can be real or made up!",
                "scaffold_frames": ["First, ___", "Then, something happened —", "In the end, ___"],
                "vocab_focus": ["beginning", "middle", "end", "then", "finally"],
                "turns": 10,
            },
        ],
    },
    26: {
        "title": "My Weekend Comic Strip",
        "cards": [
            {
                "id": "spark_comic_hero",
                "emoji": "🦸",
                "title": "My Comic Hero",
                "bridge": "The weekend comic strip had a hero with a problem — and an epic solution! 💥",
                "seed_question": "YOU are the hero of a comic strip! What is your superpower? What problem do you solve?",
                "scaffold_frames": ["My superpower is ___", "The problem was ___", "I solved it by ___ing"],
                "vocab_focus": ["hero", "superpower", "problem", "solved", "saved"],
                "turns": 8,
            },
            {
                "id": "spark_weekend_comic",
                "emoji": "📰",
                "title": "My Weekend Comic Strip",
                "bridge": "The comic strip told one epic weekend story, panel by panel — so vivid and funny! 🎨",
                "seed_question": "Tell me your weekend like a comic strip! Panel 1... Panel 2... Panel 3...",
                "scaffold_frames": ["Panel 1: I ___", "Panel 2: Then ___", "Panel 3: Finally ___"],
                "vocab_focus": ["first", "next", "then", "suddenly", "the end"],
                "turns": 8,
            },
        ],
    },
    28: {
        "title": "The Tortoise and the Hare",
        "cards": [
            {
                "id": "spark_tortoise_or_hare",
                "emoji": "🐢",
                "title": "Tortoise or Hare?",
                "bridge": "The hare ran fast but gave up — the tortoise was slow but never stopped. Slow wins! 🏅",
                "seed_question": "Are YOU more like the tortoise or the hare in real life? Tell me why!",
                "scaffold_frames": ["I am more like the ___", "I am ___ at ___", "I think slow/fast is better because ___"],
                "vocab_focus": ["slow", "fast", "patient", "determined", "win"],
                "turns": 8,
            },
            {
                "id": "spark_my_life_lesson",
                "emoji": "🌟",
                "title": "My Best Life Lesson",
                "bridge": "Every fable teaches a lesson. This one said: never give up, no matter how slow you are! 💪",
                "seed_question": "What is the best lesson YOU have ever learned? Tell me the story of how you learned it!",
                "scaffold_frames": ["I learned that ___", "One time ___", "Now I know ___"],
                "vocab_focus": ["lesson", "learned", "mistake", "try again", "important"],
                "turns": 10,
            },
        ],
    },
}

def make_spark_talk_js(cards):
    """Generate JavaScript spark_talk array literal from Python card dicts."""
    lines = ["  // 💬 SPARK TALK: AI-driven personal expression, bridged from the week's story",
             "  spark_talk: ["]
    for i, c in enumerate(cards):
        comma = "" if i == len(cards) - 1 else ""
        frames_js = ", ".join(f"'{f}'" for f in c["scaffold_frames"])
        vocab_js = ", ".join(f"'{v}'" for v in c["vocab_focus"])
        lines.append("    {")
        lines.append(f"      id: '{c['id']}',")
        lines.append(f"      emoji: '{c['emoji']}',")
        lines.append(f"      title: '{c['title']}',")
        lines.append(f"      bridge: '{c['bridge']}',")
        lines.append(f"      seed_question: '{c['seed_question']}',")
        lines.append(f"      scaffold_frames: [{frames_js}],")
        lines.append(f"      vocab_focus: [{vocab_js}],")
        lines.append(f"      turns: {c['turns']},")
        lines.append("    },")
    lines.append("  ],")
    lines.append("")
    return "\n".join(lines)


BASE = "/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks"

for week_num, data in WEEKS.items():
    fname = os.path.join(BASE, f"week_{week_num:02d}_real.js")
    if not os.path.exists(fname):
        print(f"SKIP (not found): {fname}")
        continue

    with open(fname, "r", encoding="utf-8") as f:
        content = f.read()

    if "spark_talk:" in content:
        print(f"SKIP (already has spark_talk): week_{week_num:02d}")
        continue

    # Find '  conversation_cards: [' and insert spark_talk before it
    marker = "  conversation_cards: ["
    idx = content.find(marker)
    if idx == -1:
        print(f"WARNING: no conversation_cards found in week_{week_num:02d}")
        continue

    spark_js = make_spark_talk_js(data["cards"])
    new_content = content[:idx] + spark_js + "\n" + content[idx:]

    with open(fname, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"OK: week_{week_num:02d} — {data['title']}")

print("\nDone!")
