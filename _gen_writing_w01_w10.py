#!/usr/bin/env python3
"""
Generator: Writing.js for W01–W10 (Easy + Advanced)
Principle:
- Easy:  shorter model sentence (fewer sentences, simple structure),
         each frame = 1 simple sentence, blank = single word
- Advanced: longer model (more sentences, uses and/but/because/so),
            each frame = 1 sentence but blank = whole phrase/clause
Run: python3 _gen_writing_w01_w10.py
"""
import os, json

EASY_BASE = 'src/data/weeks_easy'
ADV_BASE  = 'src/data/weeks'

def write_js(base, week_num, data):
    path = os.path.join(base, f'week_{week_num:02d}', 'writing.js')
    os.makedirs(os.path.dirname(path), exist_ok=True)
    frames_json = json.dumps(data['frames'], ensure_ascii=False, indent=4)
    words_json  = json.dumps(data['words'],  ensure_ascii=False, indent=4)
    kw_json     = json.dumps(data['kw'],     ensure_ascii=False)
    js = f"""export default {{
  title: {json.dumps(data['title'])},
  min_words: {data['min_words']},
  model_sentence: {json.dumps(data['model'])},
  instruction_en: {json.dumps(data['ins_en'])},
  instruction_vi: {json.dumps(data['ins_vi'])},
  prompt_en: {json.dumps(data['prm_en'])},
  prompt_vi: {json.dumps(data['prm_vi'])},
  keywords: {kw_json},
  topic_talk_prompt: {json.dumps(data['talk'])},
  sentence_frames: {frames_json},
  hints: {{
    vocabulary_bank: {{
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: {json.dumps(data['stage'])},
      words: {words_json}
    }}
  }}
}};
"""
    with open(path, 'w', encoding='utf-8') as f:
        f.write(js)
    print(f"  ✓ {path}")


def w(word, vi='', d=False):
    return {"word": word, "vi": vi, "distractor": d}

def frame(template, *answers):
    return {"template": template, "answers": list(answers)}


# ══════════════════════════════════════════════════════════════════════════════
# WEEK 01 – Hello, World! / Identity
# ══════════════════════════════════════════════════════════════════════════════

EASY_01 = dict(
    title="Hello, World!",
    stage="high", min_words=20,
    # 4 short simple sentences — Easy students build from single words
    model="My name is Alex. I am eight years old. I am a student. I feel happy at school.",
    ins_en="Write about yourself!",
    ins_vi="Viết về bản thân bạn!",
    prm_en="What is your name? How old are you? How do you feel at school?",
    prm_vi="Tên bạn là gì? Bạn bao nhiêu tuổi? Bạn cảm thấy thế nào ở trường?",
    kw=["name","old","student","happy","school"],
    talk="Tell me about yourself!",
    frames=[
        frame("My name is ___.", "Alex"),
        frame("I am ___ years old.", "eight"),
        frame("I am a ___.", "student"),
        frame("I feel ___ at school.", "happy"),
    ],
    words=[
        w("Alex","",False), w("eight","tám",False), w("student","học sinh",False), w("happy","vui",False),
        w("sad","buồn",True), w("teacher","giáo viên",True), w("ten","mười — sai tuổi",True),
    ],
)

ADV_01 = dict(
    title="Hello, World!",
    stage="high", min_words=35,
    # 6 sentences — more details, uses "and", "because"
    model="My name is Alex and I am eight years old. I am a student at Green Hill School. My teacher is Ms. Johnson and she is very kind. I have many friends in my class. My favourite subject is English because I love reading stories. I feel excited and happy every day at school.",
    ins_en="Write about yourself and your school in full sentences!",
    ins_vi="Viết về bản thân và trường học bằng câu đầy đủ!",
    prm_en="What is your name and age? What is your school and teacher like? What do you love? How do you feel?",
    prm_vi="Tên và tuổi? Trường và thầy/cô thế nào? Bạn thích gì? Cảm thấy thế nào?",
    kw=["name","student","teacher","kind","subject","English","excited"],
    talk="Tell me about yourself and your school!",
    frames=[
        frame("My name is ___ and I am ___ years old.", "Alex", "eight"),
        frame("I am a student at ___ School.", "Green Hill"),
        frame("My teacher is ___ and she is ___.", "Ms. Johnson", "very kind"),
        frame("My favourite subject is ___ because I love ___.", "English", "reading stories"),
        frame("I feel ___ and ___ every day at school.", "excited", "happy"),
    ],
    words=[
        w("Alex","",False), w("eight","tám",False),
        w("Green Hill","",False), w("Ms. Johnson","",False), w("very kind","rất tốt bụng",False),
        w("English","môn tiếng Anh",False), w("reading stories","đọc truyện",False),
        w("excited","hào hứng",False), w("happy","vui",False),
        w("very strict","rất nghiêm khắc",True), w("maths","toán — sai môn",True), w("bored and tired","chán và mệt",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 02 – My Family Squad
# ══════════════════════════════════════════════════════════════════════════════

EASY_02 = dict(
    title="My Family Squad",
    stage="high", min_words=20,
    # 4 sentences — one per family member, simple "is" pattern
    model="This is my mother. She is kind. This is my father. He is strong.",
    ins_en="Write about your family!",
    ins_vi="Viết về gia đình của bạn!",
    prm_en="Who is in your family? What are they like?",
    prm_vi="Ai ở trong gia đình bạn? Họ thế nào?",
    kw=["mother","father","kind","strong","family"],
    talk="Tell me about your family!",
    frames=[
        frame("This is my ___.", "mother"),
        frame("She is ___.", "kind"),
        frame("This is my ___.", "father"),
        frame("He is ___.", "strong"),
    ],
    words=[
        w("mother","mẹ",False), w("kind","tốt bụng",False),
        w("father","bố",False), w("strong","mạnh mẽ",False),
        w("sister","chị/em gái",True), w("mean","xấu tính",True), w("weak","yếu",True),
    ],
)

ADV_02 = dict(
    title="My Family Squad",
    stage="high", min_words=40,
    # 6 sentences — describes each person with compound details
    model="I have a wonderful family. My mother is a teacher and she is very kind and patient. My father is a doctor and he works very hard every day. My older sister is funny and she always makes me laugh. My little brother is only three years old but he is already very smart. We love each other and we do everything together.",
    ins_en="Describe each family member in detail!",
    ins_vi="Mô tả từng thành viên gia đình chi tiết!",
    prm_en="What does each person do? What are they like? What do you do together?",
    prm_vi="Mỗi người làm gì? Họ thế nào? Cả nhà làm gì cùng nhau?",
    kw=["wonderful","teacher","patient","doctor","funny","laugh","smart","together"],
    talk="Tell me about each person in your family!",
    frames=[
        frame("My mother is ___ and she is ___ and ___.", "a teacher", "very kind", "patient"),
        frame("My father is ___ and he works ___ every day.", "a doctor", "very hard"),
        frame("My older sister is ___ and she always ___.", "funny", "makes me laugh"),
        frame("My little brother is only ___ but he is already ___.", "three years old", "very smart"),
        frame("We ___ each other and do ___ together.", "love", "everything"),
    ],
    words=[
        w("a teacher","giáo viên",False), w("very kind","rất tốt bụng",False), w("patient","kiên nhẫn",False),
        w("a doctor","bác sĩ",False), w("very hard","rất chăm chỉ",False),
        w("funny","hài hước",False), w("makes me laugh","khiến tôi cười",False),
        w("three years old","ba tuổi",False), w("very smart","rất thông minh",False),
        w("love","yêu thương",False), w("everything","mọi thứ",False),
        w("very mean","rất xấu tính",True), w("never talks to me","không bao giờ nói chuyện",True), w("ignores everyone","phớt lờ mọi người",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 03 – The Mirror Game / Appearance
# ══════════════════════════════════════════════════════════════════════════════

EASY_03 = dict(
    title="The Mirror Game",
    stage="high", min_words=20,
    # 4 sentences — simple is/has pattern
    model="My friend is tall. She has long hair. Her hair is black. She has big eyes.",
    ins_en="Describe your friend's appearance!",
    ins_vi="Mô tả ngoại hình của bạn bè!",
    prm_en="Is your friend tall or short? What does their hair look like? What colour are their eyes?",
    prm_vi="Bạn của bạn cao hay thấp? Tóc họ thế nào? Mắt màu gì?",
    kw=["tall","hair","long","black","eyes","big"],
    talk="Describe what your friend looks like!",
    frames=[
        frame("My friend is ___.", "tall"),
        frame("She has ___ hair.", "long"),
        frame("Her hair is ___.", "black"),
        frame("She has ___ eyes.", "big"),
    ],
    words=[
        w("tall","cao",False), w("long","dài",False), w("black","đen",False), w("big","to",False),
        w("short","thấp",True), w("blonde","vàng",True), w("tiny","rất nhỏ",True),
    ],
)

ADV_03 = dict(
    title="The Mirror Game",
    stage="high", min_words=40,
    # 6 sentences — compound descriptions with is/has contrast
    model="My best friend is Tom and he is tall with short curly hair. His hair is dark brown and his eyes are bright green. He wears round glasses because he cannot see well without them. He always wears a red cap and a blue jacket to school. He is slim but very strong because he trains every day. Everyone recognises him because he looks so unique and cool.",
    ins_en="Describe your best friend from head to toe!",
    ins_vi="Mô tả người bạn thân từ đầu đến chân!",
    prm_en="What does your friend look like? What do they wear? What makes them look unique?",
    prm_vi="Bạn của bạn trông thế nào? Họ mặc gì? Điều gì làm họ nổi bật?",
    kw=["curly","dark brown","bright green","glasses","slim","unique","recognises"],
    talk="Describe your best friend's appearance in full detail!",
    frames=[
        frame("My best friend is ___ and he is ___ with ___.", "Tom", "tall", "short curly hair"),
        frame("His hair is ___ and his eyes are ___.", "dark brown", "bright green"),
        frame("He wears ___ because he cannot see well without them.", "round glasses"),
        frame("He is ___ but very ___ because he trains every day.", "slim", "strong"),
        frame("Everyone recognises him because he looks so ___ and ___.", "unique", "cool"),
    ],
    words=[
        w("Tom","",False), w("tall","cao",False), w("short curly hair","tóc ngắn xoăn",False),
        w("dark brown","nâu đậm",False), w("bright green","xanh lá sáng",False),
        w("round glasses","kính tròn",False),
        w("slim","gầy gò/thon",False), w("strong","mạnh mẽ",False),
        w("unique","độc đáo",False), w("cool","ngầu",False),
        w("very short","rất thấp",True), w("blonde and straight","vàng và thẳng",True), w("strange and weird","kỳ lạ",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 04 – My Happy Jar / Personality & Hobbies
# ══════════════════════════════════════════════════════════════════════════════

EASY_04 = dict(
    title="My Happy Jar",
    stage="high", min_words=20,
    # 4 sentences — simple "I like" + feeling
    model="I like playing. I like drawing. I like reading. I feel happy when I draw.",
    ins_en="Write about things you like doing!",
    ins_vi="Viết về những việc bạn thích làm!",
    prm_en="What do you like doing? How do you feel when you do it?",
    prm_vi="Bạn thích làm gì? Bạn cảm thấy thế nào khi làm điều đó?",
    kw=["playing","drawing","reading","happy"],
    talk="What do you like doing? How does it make you feel?",
    frames=[
        frame("I like ___.", "playing"),
        frame("I also like ___.", "drawing"),
        frame("I love ___, too.", "reading"),
        frame("I feel ___ when I draw.", "happy"),
    ],
    words=[
        w("playing","chơi",False), w("drawing","vẽ",False), w("reading","đọc",False), w("happy","vui",False),
        w("sleeping","ngủ",True), w("sad","buồn",True), w("cooking","nấu ăn",True),
    ],
)

ADV_04 = dict(
    title="My Happy Jar",
    stage="high", min_words=40,
    # 6 sentences — "I like V-ing" expanded with because/when/and
    model="I am a friendly and curious person who loves exploring new things. I like playing football with my friends because it makes me feel free and energetic. I also love drawing animals because I can use my imagination and create my own world. When I read story books, I feel calm and excited at the same time. My favourite thing to do on weekends is playing board games with my family because we laugh and talk together. I think hobbies make us happier and smarter every day.",
    ins_en="Write about your personality and hobbies using because and when!",
    ins_vi="Viết về tính cách và sở thích bằng because và when!",
    prm_en="What are you like? What do you love doing and why? How do hobbies make you feel?",
    prm_vi="Bạn là người thế nào? Bạn thích làm gì và tại sao? Sở thích khiến bạn cảm thấy thế nào?",
    kw=["curious","exploring","energetic","imagination","calm","hobbies","smarter"],
    talk="Tell me about your personality and what you love doing!",
    frames=[
        frame("I like ___ because it makes me feel ___ and ___.", "playing football with my friends", "free", "energetic"),
        frame("I also love ___ because I can use my ___ and create my own world.", "drawing animals", "imagination"),
        frame("When I ___, I feel ___ and ___ at the same time.", "read story books", "calm", "excited"),
        frame("My favourite thing on weekends is ___ because we ___ and ___ together.", "playing board games with my family", "laugh", "talk"),
        frame("I think hobbies make us ___ and ___ every day.", "happier", "smarter"),
    ],
    words=[
        w("playing football with my friends","đá bóng với bạn bè",False),
        w("free","tự do",False), w("energetic","tràn đầy năng lượng",False),
        w("drawing animals","vẽ động vật",False), w("imagination","trí tưởng tượng",False),
        w("read story books","đọc truyện",False), w("calm","bình yên",False), w("excited","hào hứng",False),
        w("playing board games with my family","chơi trò chơi cờ cùng gia đình",False),
        w("laugh","cười",False), w("talk","nói chuyện",False),
        w("happier","vui hơn",False), w("smarter","thông minh hơn",False),
        w("staying home alone","ở nhà một mình",True), w("bored and lazy","chán và lười",True), w("dumber","ngu hơn",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 05 – The Mystery House / Rooms & Furniture
# ══════════════════════════════════════════════════════════════════════════════

EASY_05 = dict(
    title="The Mystery House",
    stage="high", min_words=20,
    # 4 sentences — simple "There is/are" and "I have"
    model="My house has a bedroom and a kitchen. I have a bed in my bedroom. There is a big table in the kitchen. I like my house.",
    ins_en="Write about your house!",
    ins_vi="Viết về ngôi nhà của bạn!",
    prm_en="What rooms does your house have? What is in each room?",
    prm_vi="Nhà bạn có những phòng nào? Mỗi phòng có gì?",
    kw=["bedroom","kitchen","bed","table","house"],
    talk="Describe your house and rooms!",
    frames=[
        frame("My house has a ___ and a ___.", "bedroom", "kitchen"),
        frame("I have a ___ in my bedroom.", "bed"),
        frame("There is a big ___ in the kitchen.", "table"),
        frame("I ___ my house.", "like"),
    ],
    words=[
        w("bedroom","phòng ngủ",False), w("kitchen","nhà bếp",False),
        w("bed","giường",False), w("table","bàn",False), w("like","thích",False),
        w("garage","nhà để xe",True), w("sofa","ghế sofa",True), w("hate","ghét",True),
    ],
)

ADV_05 = dict(
    title="The Mystery House",
    stage="high", min_words=40,
    # 6 sentences — There is/are + compound descriptions + location phrases
    model="I live in a comfortable house with my family. Our house has four rooms: a living room, a kitchen, a bathroom, and two bedrooms. In the living room, there is a big sofa and a colourful bookshelf full of story books. My bedroom is my favourite room because it is cosy and quiet. There is a large window in my bedroom so I can see the garden outside. I love sitting by the window and reading before bed.",
    ins_en="Describe your house room by room with full details!",
    ins_vi="Mô tả từng phòng trong nhà bạn với đầy đủ chi tiết!",
    prm_en="What rooms are there? What is in each room? Which room is your favourite and why?",
    prm_vi="Có những phòng nào? Mỗi phòng có gì? Phòng yêu thích của bạn là gì và tại sao?",
    kw=["comfortable","living room","bookshelf","cosy","quiet","window","garden"],
    talk="Describe your house and your favourite room!",
    frames=[
        frame("Our house has four rooms: ___, ___, ___, and ___.", "a living room", "a kitchen", "a bathroom", "two bedrooms"),
        frame("In the living room, there is ___ and ___.", "a big sofa", "a colourful bookshelf full of story books"),
        frame("My bedroom is my favourite room because it is ___ and ___.", "cosy", "quiet"),
        frame("There is ___ in my bedroom so I can see ___.", "a large window", "the garden outside"),
        frame("I love ___ and ___ before bed.", "sitting by the window", "reading"),
    ],
    words=[
        w("a living room","phòng khách",False), w("a kitchen","nhà bếp",False),
        w("a bathroom","phòng tắm",False), w("two bedrooms","hai phòng ngủ",False),
        w("a big sofa","ghế sofa lớn",False), w("a colourful bookshelf full of story books","kệ sách đầy màu sắc",False),
        w("cosy","ấm cúng",False), w("quiet","yên tĩnh",False),
        w("a large window","cửa sổ lớn",False), w("the garden outside","khu vườn bên ngoài",False),
        w("sitting by the window","ngồi bên cửa sổ",False), w("reading","đọc sách",False),
        w("a garage and a pool","nhà xe và bể bơi",True), w("noisy and crowded","ồn ào và đông đúc",True), w("a broken door","cửa bị hỏng",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 06 – Finding the Treasure / Prepositions
# ══════════════════════════════════════════════════════════════════════════════

EASY_06 = dict(
    title="Finding the Treasure",
    stage="high", min_words=20,
    # 4 sentences — preposition practice: under/on/in/behind
    model="My friend hides a box. I look under the bed. I look on the chair. I find the box!",
    ins_en="Write about your treasure hunt!",
    ins_vi="Viết về cuộc tìm kho báu của bạn!",
    prm_en="Where did you look? Where did you find it?",
    prm_vi="Bạn tìm ở đâu? Bạn tìm thấy ở đâu?",
    kw=["hides","box","under","on","find"],
    talk="Tell me about your treasure hunt!",
    frames=[
        frame("My friend ___ a box.", "hides"),
        frame("I look ___ the bed.", "under"),
        frame("I look ___ the chair.", "on"),
        frame("I ___ the box!", "find"),
    ],
    words=[
        w("hides","giấu",False), w("under","dưới",False), w("on","trên",False), w("find","tìm thấy",False),
        w("gives","đưa",True), w("above","phía trên xa",True), w("lose","đánh mất",True),
    ],
)

ADV_06 = dict(
    title="Finding the Treasure",
    stage="high", min_words=40,
    # 6 sentences — sequence + prepositions + compound clauses
    model="My friends and I decided to play a treasure hunt at home on Saturday afternoon. First, my friend Lily hid a small treasure box somewhere in the house and gave us a clue. I searched under the bed and behind the bookshelf but I could not find it. Then I looked inside the kitchen cupboard and I finally spotted it on the top shelf. I jumped with excitement and shouted because I was so happy to find it first. We all laughed and decided to play again because it was so much fun.",
    ins_en="Write about your treasure hunt using sequence words and prepositions!",
    ins_vi="Viết về cuộc tìm kho báu dùng từ nối và giới từ chỉ nơi chốn!",
    prm_en="Where did you search? What happened step by step? How did you feel when you found it?",
    prm_vi="Bạn tìm ở đâu? Chuyện gì xảy ra từng bước? Bạn cảm thấy thế nào khi tìm thấy?",
    kw=["treasure","hid","clue","searched","cupboard","spotted","excitement","shouted"],
    talk="Tell me the full story of your treasure hunt!",
    frames=[
        frame("First, ___ hid ___ and gave us a ___.", "my friend Lily", "a small treasure box", "clue"),
        frame("I searched ___ and ___ but I could not find it.", "under the bed", "behind the bookshelf"),
        frame("Then I looked ___ and finally spotted it ___.", "inside the kitchen cupboard", "on the top shelf"),
        frame("I jumped with ___ and shouted because I was so ___ to find it first.", "excitement", "happy"),
        frame("We all laughed and decided to ___ because it was so much ___.", "play again", "fun"),
    ],
    words=[
        w("my friend Lily","bạn tôi tên Lily",False), w("a small treasure box","một hộp kho báu nhỏ",False), w("clue","gợi ý/manh mối",False),
        w("under the bed","dưới gầm giường",False), w("behind the bookshelf","sau kệ sách",False),
        w("inside the kitchen cupboard","trong tủ bếp",False), w("on the top shelf","trên ngăn cao nhất",False),
        w("excitement","sự hào hứng",False), w("happy","vui",False),
        w("play again","chơi lại",False), w("fun","vui",False),
        w("on the ceiling","trên trần nhà",True), w("boredom","sự chán nản",True), w("stop forever","dừng mãi mãi",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 07 – Inside My Backpack / School Supplies
# ══════════════════════════════════════════════════════════════════════════════

EASY_07 = dict(
    title="Inside My Backpack",
    stage="high", min_words=20,
    # 4 sentences — "There is/are" for school items
    model="There is a pencil in my bag. There are three books in my bag. I also have a lunch box. My bag is blue.",
    ins_en="Write about what is in your school bag!",
    ins_vi="Viết về những gì có trong cặp của bạn!",
    prm_en="What do you have in your bag? What colour is your bag?",
    prm_vi="Bạn có gì trong cặp? Cặp màu gì?",
    kw=["pencil","books","lunch box","blue","bag"],
    talk="What is inside your school bag?",
    frames=[
        frame("There is a ___ in my bag.", "pencil"),
        frame("There are ___ books in my bag.", "three"),
        frame("I also have a ___.", "lunch box"),
        frame("My bag is ___.", "blue"),
    ],
    words=[
        w("pencil","bút chì",False), w("three","ba",False), w("lunch box","hộp cơm",False), w("blue","xanh dương",False),
        w("eraser","cục tẩy",True), w("red","đỏ",True), w("toy","đồ chơi",True),
    ],
)

ADV_07 = dict(
    title="Inside My Backpack",
    stage="high", min_words=40,
    # 6 sentences — more items, adjectives, compound lists
    model="Every morning I pack my school bag very carefully so that I do not forget anything important. In my backpack there is a notebook, a textbook, and a pencil case with coloured pencils and an eraser inside. I also carry a water bottle and a healthy snack because I get hungry between lessons. My bag is dark blue and it has a small pocket at the front for my bus card and my library card. It is quite heavy but I do not mind because I love being organised and ready for school. Being prepared makes me feel confident every day.",
    ins_en="Describe everything in your school bag and why you carry it!",
    ins_vi="Mô tả mọi thứ trong cặp và tại sao bạn mang chúng!",
    prm_en="What is in your bag? Why do you carry each item? How does being prepared make you feel?",
    prm_vi="Cặp có gì? Tại sao mang từng đồ vật? Chuẩn bị tốt khiến bạn cảm thấy thế nào?",
    kw=["carefully","notebook","textbook","pencil case","eraser","organised","confident","prepared"],
    talk="Tell me everything that is in your school bag and why!",
    frames=[
        frame("In my backpack there is ___, ___, and ___ with ___ and an eraser inside.", "a notebook", "a textbook", "a pencil case", "coloured pencils"),
        frame("I also carry ___ and ___ because I get hungry between lessons.", "a water bottle", "a healthy snack"),
        frame("My bag is ___ and it has ___ for my ___ and ___.", "dark blue", "a small pocket at the front", "bus card", "library card"),
        frame("It is quite ___ but I do not mind because I love being ___ and ready.", "heavy", "organised"),
        frame("Being prepared makes me feel ___ every day.", "confident"),
    ],
    words=[
        w("a notebook","một cuốn vở",False), w("a textbook","một cuốn sách giáo khoa",False),
        w("a pencil case","hộp bút",False), w("coloured pencils","bút chì màu",False),
        w("a water bottle","bình nước",False), w("a healthy snack","đồ ăn nhẹ lành mạnh",False),
        w("dark blue","xanh đậm",False), w("a small pocket at the front","túi nhỏ phía trước",False),
        w("bus card","thẻ xe buýt",False), w("library card","thẻ thư viện",False),
        w("heavy","nặng",False), w("organised","ngăn nắp",False), w("confident","tự tin",False),
        w("a television","ti vi — không phải đồ học",True), w("very light and empty","rất nhẹ và trống rỗng",True), w("nervous","lo lắng",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 08 – My Busy Classroom / Count & Describe
# ══════════════════════════════════════════════════════════════════════════════

EASY_08 = dict(
    title="My Classroom",
    stage="high", min_words=20,
    # 4 sentences — simple counting + adjectives
    model="My classroom is big. There are twenty desks. There are many books on the shelf. I love my classroom.",
    ins_en="Write about your classroom!",
    ins_vi="Viết về lớp học của bạn!",
    prm_en="What is in your classroom? How many things are there? How do you feel?",
    prm_vi="Lớp học của bạn có gì? Có bao nhiêu thứ? Bạn cảm thấy thế nào?",
    kw=["classroom","big","desks","books","shelf","love"],
    talk="What is your classroom like?",
    frames=[
        frame("My classroom is ___.", "big"),
        frame("There are ___ desks.", "twenty"),
        frame("There are ___ books on the shelf.", "many"),
        frame("I ___ my classroom.", "love"),
    ],
    words=[
        w("big","to lớn",False), w("twenty","hai mươi",False), w("many","nhiều",False), w("love","yêu thích",False),
        w("tiny","rất nhỏ",True), w("zero","không có — sai",True), w("hate","ghét",True),
    ],
)

ADV_08 = dict(
    title="My Busy Classroom",
    stage="high", min_words=40,
    # 6 sentences — describe classroom with numbers, colours, compound adjectives
    model="My classroom is very bright and cheerful because the walls are covered with colourful posters and student artwork. There are exactly twenty-eight students in my class and we all sit at wooden desks arranged in four rows. On the front wall there is a large whiteboard and two interactive screens that the teacher uses every day. Along the back wall there is a tall bookshelf with over a hundred books organised by subject and reading level. Our classroom also has a reading corner with soft cushions where we can sit and read quietly during free time. I feel proud of our classroom because we all help to keep it neat and tidy.",
    ins_en="Describe your busy classroom with numbers, colours, and reasons!",
    ins_vi="Mô tả lớp học của bạn với số đếm, màu sắc và lý do!",
    prm_en="What does your classroom look like? How many of each thing? Why do you feel proud?",
    prm_vi="Lớp học trông thế nào? Có bao nhiêu thứ mỗi loại? Tại sao bạn tự hào?",
    kw=["bright","cheerful","arranged","whiteboard","interactive","bookshelf","cushions","tidy"],
    talk="Give me a full detailed description of your classroom!",
    frames=[
        frame("My classroom is ___ and ___ because the walls are covered with ___ and ___.", "very bright", "cheerful", "colourful posters", "student artwork"),
        frame("There are exactly ___ students and we sit at ___ arranged in ___.", "twenty-eight", "wooden desks", "four rows"),
        frame("On the front wall there is ___ and ___ that the teacher uses every day.", "a large whiteboard", "two interactive screens"),
        frame("Along the back wall there is ___ with ___ organised by subject.", "a tall bookshelf", "over a hundred books"),
        frame("I feel ___ of our classroom because we all help to keep it ___.", "proud", "neat and tidy"),
    ],
    words=[
        w("very bright","rất sáng",False), w("cheerful","vui tươi",False),
        w("colourful posters","áp phích đầy màu sắc",False), w("student artwork","tranh vẽ của học sinh",False),
        w("twenty-eight","hai mươi tám",False), w("wooden desks","bàn gỗ",False), w("four rows","bốn hàng",False),
        w("a large whiteboard","bảng trắng lớn",False), w("two interactive screens","hai màn hình tương tác",False),
        w("a tall bookshelf","kệ sách cao",False), w("over a hundred books","hơn một trăm cuốn sách",False),
        w("proud","tự hào",False), w("neat and tidy","gọn gàng và sạch sẽ",False),
        w("very dark and gloomy","rất tối và ảm đạm",True), w("zero students","không có học sinh",True), w("ashamed","xấu hổ",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 09 – My City / Present Simple Description
# ══════════════════════════════════════════════════════════════════════════════

EASY_09 = dict(
    title="My City",
    stage="medium", min_words=25,
    # 4 sentences — simple present: I live / I see / People go
    model="I live in a big city. The city is busy and noisy. I see tall buildings every day. People go to work and school.",
    ins_en="Write about your city!",
    ins_vi="Viết về thành phố của bạn!",
    prm_en="Where do you live? What is it like? What do you see?",
    prm_vi="Bạn sống ở đâu? Nơi đó như thế nào? Bạn nhìn thấy gì?",
    kw=["city","busy","noisy","buildings","people","work","school"],
    talk="Tell me about your city!",
    frames=[
        frame("I live in a ___ city.", "big"),
        frame("The city is ___ and ___.", "busy", "noisy"),
        frame("I see ___ buildings every day.", "tall"),
        frame("People go to ___ and ___.", "work", "school"),
    ],
    words=[
        w("big","to lớn",False), w("busy","bận rộn",False), w("noisy","ồn ào",False),
        w("tall","cao",False), w("work","làm việc",False), w("school","trường học",False),
        w("tiny","rất nhỏ",True), w("peaceful","bình yên",True), w("silent","im lặng — sai ngữ cảnh",True),
    ],
)

ADV_09 = dict(
    title="My City",
    stage="medium", min_words=45,
    # 7 sentences — compare, give reasons, use so/because/and/but
    model="I live in Ho Chi Minh City, which is one of the largest and most exciting cities in Vietnam. The streets are always busy and noisy because millions of people live and work here every day. I can see tall modern skyscrapers next to old French colonial buildings, and I think that mix makes the city look very interesting. There are huge shopping centres, busy markets, and beautiful parks spread all across the city. However, the traffic can be very heavy during rush hour so many people ride motorbikes to move faster. I love my city because there is always something new to discover and explore. Living here makes me feel proud and excited about the future.",
    ins_en="Write a detailed description of your city with comparisons and reasons!",
    ins_vi="Viết mô tả chi tiết về thành phố của bạn với so sánh và lý do!",
    prm_en="What makes your city special? What are the good and bad things? How does living there make you feel?",
    prm_vi="Điều gì làm thành phố của bạn đặc biệt? Điều tốt và xấu là gì? Sống ở đó khiến bạn cảm thấy thế nào?",
    kw=["skyscrapers","colonial","shopping centres","traffic","rush hour","discover","explore"],
    talk="Describe your city — what is great about it and what is not so great?",
    frames=[
        frame("The streets are always ___ and ___ because millions of people ___ and ___ here.", "busy", "noisy", "live", "work"),
        frame("I can see ___ next to ___, and I think that mix makes the city look ___.", "tall modern skyscrapers", "old French colonial buildings", "very interesting"),
        frame("There are ___, ___, and ___ spread all across the city.", "huge shopping centres", "busy markets", "beautiful parks"),
        frame("However, the traffic can be ___ during rush hour so many people ___ to move faster.", "very heavy", "ride motorbikes"),
        frame("I love my city because there is always ___ to discover and explore.", "something new"),
        frame("Living here makes me feel ___ and ___ about the future.", "proud", "excited"),
    ],
    words=[
        w("busy","bận rộn",False), w("noisy","ồn ào",False), w("live","sinh sống",False), w("work","làm việc",False),
        w("tall modern skyscrapers","những tòa nhà chọc trời hiện đại",False),
        w("old French colonial buildings","những tòa nhà thực dân Pháp cũ",False),
        w("very interesting","rất thú vị",False),
        w("huge shopping centres","các trung tâm thương mại lớn",False),
        w("busy markets","các chợ nhộn nhịp",False), w("beautiful parks","những công viên đẹp",False),
        w("very heavy","rất nặng nề/đông đúc",False), w("ride motorbikes","đi xe máy",False),
        w("something new","điều gì đó mới mẻ",False),
        w("proud","tự hào",False), w("excited","hào hứng",False),
        w("quiet and empty","yên tĩnh và trống vắng",True), w("nothing to do","không có gì để làm",True), w("bored","chán",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 10 – City and Farm / Compare & Contrast
# ══════════════════════════════════════════════════════════════════════════════

EASY_10 = dict(
    title="City and Farm",
    stage="medium", min_words=25,
    # 4 sentences — simple contrast: city X but farm Y
    model="The city is noisy but the farm is quiet. The city is dirty but the farm is clean. I see cows on the farm. I like the farm.",
    ins_en="Compare the city and the farm!",
    ins_vi="So sánh thành phố và nông trại!",
    prm_en="What is different about the city and the farm? Which do you prefer?",
    prm_vi="Thành phố và nông trại khác nhau thế nào? Bạn thích cái nào hơn?",
    kw=["noisy","quiet","dirty","clean","farm","cows"],
    talk="Do you prefer the city or the farm? Tell me why!",
    frames=[
        frame("The city is ___ but the farm is ___.", "noisy", "quiet"),
        frame("The city is ___ but the farm is ___.", "dirty", "clean"),
        frame("I see ___ on the farm.", "cows"),
        frame("I like the ___.", "farm"),
    ],
    words=[
        w("noisy","ồn ào",False), w("quiet","yên tĩnh",False),
        w("dirty","bẩn",False), w("clean","sạch",False), w("cows","bò",False), w("farm","nông trại",False),
        w("silent","im lặng",True), w("tidy","gọn gàng",True), w("city","thành phố",True),
    ],
)

ADV_10 = dict(
    title="City vs Farm",
    stage="medium", min_words=45,
    # 7 sentences — systematic comparison with because/although/however
    model="The city and the farm are very different places to live, and both have their own advantages and disadvantages. The city is exciting and modern because there are many shops, schools, restaurants, and entertainment centres. However, the city is also very noisy and crowded, and the air can be polluted because of heavy traffic. The farm, on the other hand, is peaceful and green with fresh air and wide open spaces. Although the farm is quiet and there is less to do, I think it is a healthier place to live. I would choose to live on the farm during the summer holidays because I love animals and nature. But I also need the city for school and learning, so the best solution might be to experience both.",
    ins_en="Write a full compare and contrast text about city and farm life!",
    ins_vi="Viết bài so sánh và đối chiếu đầy đủ về thành phố và nông trại!",
    prm_en="What are the advantages and disadvantages of each? Which would you choose and why?",
    prm_vi="Ưu và nhược điểm của mỗi nơi là gì? Bạn chọn nơi nào và tại sao?",
    kw=["advantages","disadvantages","polluted","entertainment","peaceful","solution","experience"],
    talk="Compare city life and farm life — which is better and why?",
    frames=[
        frame("The city is ___ and ___ because there are many shops, schools, and ___ centres.", "exciting", "modern", "entertainment"),
        frame("However, the city is also ___ and ___, and the air can be ___ because of heavy traffic.", "very noisy", "crowded", "polluted"),
        frame("The farm, on the other hand, is ___ and ___ with fresh air and ___.", "peaceful", "green", "wide open spaces"),
        frame("Although the farm is ___ and there is less to do, I think it is a ___ place to live.", "quiet", "healthier"),
        frame("I would choose ___ during the summer because I love ___ and ___.", "to live on the farm", "animals", "nature"),
        frame("The best solution might be to ___ both.", "experience"),
    ],
    words=[
        w("exciting","thú vị",False), w("modern","hiện đại",False), w("entertainment","giải trí",False),
        w("very noisy","rất ồn ào",False), w("crowded","đông đúc",False), w("polluted","ô nhiễm",False),
        w("peaceful","bình yên",False), w("green","xanh tươi",False), w("wide open spaces","không gian rộng mở",False),
        w("quiet","yên tĩnh",False), w("healthier","lành mạnh hơn",False),
        w("to live on the farm","sống ở nông trại",False), w("animals","động vật",False), w("nature","thiên nhiên",False),
        w("experience","trải nghiệm",False),
        w("dangerous","nguy hiểm",True), w("boring and useless","nhàm chán và vô ích",True), w("avoid","tránh xa",True),
    ],
)


# ══════════════════════════════════════════════════════════════════════════════
# RUN
# ══════════════════════════════════════════════════════════════════════════════

WEEKS = {
    1:  (EASY_01, ADV_01),
    2:  (EASY_02, ADV_02),
    3:  (EASY_03, ADV_03),
    4:  (EASY_04, ADV_04),
    5:  (EASY_05, ADV_05),
    6:  (EASY_06, ADV_06),
    7:  (EASY_07, ADV_07),
    8:  (EASY_08, ADV_08),
    9:  (EASY_09, ADV_09),
    10: (EASY_10, ADV_10),
}

if __name__ == '__main__':
    for week_num, (easy, adv) in WEEKS.items():
        print(f"W{week_num:02d}:")
        write_js(EASY_BASE, week_num, easy)
        write_js(ADV_BASE,  week_num, adv)
    print("\n✅ W01–W10 done.")
