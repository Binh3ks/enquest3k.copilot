#!/usr/bin/env python3
"""
Generator: Writing.js for W21–W31 (Easy + Advanced)
Principle:
- Easy:  shorter model, 4-5 simple sentences, word-level blanks
- Advanced: longer model (6-7 sentences), phrase/clause blanks, connectors
Stages:
  W21-W25: medium-low
  W26-W31: low
Run: python3 _gen_writing_w21_w31.py
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
# WEEK 21 – My Yesterday / Past Simple Regular Verbs
# ══════════════════════════════════════════════════════════════════════════════

EASY_21 = dict(
    title="My Yesterday",
    stage="medium-low", min_words=28,
    model="Yesterday I walked to school. I listened to my teacher. After school I helped my mum. In the evening I watched TV. Then I finished my homework.",
    ins_en="Write about what you did yesterday using past tense!",
    ins_vi="Viết về những gì bạn đã làm hôm qua bằng thì quá khứ!",
    prm_en="What did you do in the morning? After school? In the evening?",
    prm_vi="Buổi sáng bạn đã làm gì? Sau trường? Tối thì sao?",
    kw=["walked","listened","helped","watched","finished"],
    talk="What did you do yesterday — morning, afternoon, and evening?",
    frames=[
        frame("Yesterday I ___ to school.", "walked"),
        frame("I ___ to my teacher.", "listened"),
        frame("After school I ___ my mum.", "helped"),
        frame("In the evening I ___ TV.", "watched"),
        frame("Then I ___ my homework.", "finished"),
    ],
    words=[
        w("walked","đã đi bộ",False), w("listened","đã lắng nghe",False),
        w("helped","đã giúp",False), w("watched","đã xem",False), w("finished","đã hoàn thành",False),
        w("runs","chạy — sai thì",True), w("ignores","bỏ qua — sai",True), w("starts","bắt đầu — sai thì",True),
    ],
)

ADV_21 = dict(
    title="My Yesterday",
    stage="medium-low", min_words=45,
    model="Yesterday was a wonderful and busy day, and I want to tell you about all the things I did from morning to night. In the morning, I walked to school with my best friend and we talked about our favourite books on the way. In class, I listened carefully to my teacher and opened my notebook to write down the most important ideas. After school, I helped my mum in the kitchen because she was cooking a big pot of soup and rice for dinner, and the smell made me very hungry. In the evening, I cleaned my room, watched a short programme about animals, and then looked at the bright stars from my window. Before I went to bed, I finished all my homework and wrote three sentences in my diary. I felt proud, calm, and very happy at the end of the day.",
    ins_en="Write about your yesterday in full detail using past tense — morning to night!",
    ins_vi="Viết về hôm qua chi tiết bằng thì quá khứ — từ sáng đến tối!",
    prm_en="What did you do morning, afternoon, and evening? How did you feel at the end?",
    prm_vi="Bạn đã làm gì sáng, chiều, tối? Cuối ngày bạn cảm thấy thế nào?",
    kw=["walked","talked","listened","notebook","cleaned","programme","diary","proud"],
    talk="Tell me everything you did yesterday from morning to night!",
    frames=[
        frame("In the morning, I ___ to school with my best friend and we ___ about our favourite books.", "walked", "talked"),
        frame("In class, I ___ carefully to my teacher and ___ my notebook to write down important ideas.", "listened", "opened"),
        frame("After school, I ___ my mum because she was ___ a big pot of soup and rice.", "helped", "cooking"),
        frame("In the evening, I ___ my room, ___ a short programme, and then ___ at the bright stars.", "cleaned", "watched", "looked"),
        frame("Before I went to bed, I ___ all my homework and ___ three sentences in my diary.", "finished", "wrote"),
        frame("I felt ___, ___, and very ___ at the end of the day.", "proud", "calm", "happy"),
    ],
    words=[
        w("walked","đi bộ",False), w("talked","trò chuyện",False),
        w("listened","lắng nghe",False), w("opened","mở ra",False),
        w("helped","giúp đỡ",False), w("cooking","nấu ăn",False),
        w("cleaned","dọn dẹp",False), w("watched","xem",False), w("looked","nhìn",False),
        w("finished","hoàn thành",False), w("wrote","viết",False),
        w("proud","tự hào",False), w("calm","bình tĩnh",False), w("happy","vui",False),
        w("runs","chạy — sai thì",True), w("arguing","tranh cãi",True), w("stressed and tired","căng thẳng và mệt",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 22 – The Time Detective / Past Tense Questions
# ══════════════════════════════════════════════════════════════════════════════

EASY_22 = dict(
    title="The Time Detective",
    stage="medium-low", min_words=28,
    model="I am a time detective. I asked my friend questions. Did you walk to school? Did you eat breakfast? My friend answered yes to both.",
    ins_en="Write a time detective interview using past tense questions!",
    ins_vi="Viết một cuộc phỏng vấn thám tử thời gian bằng câu hỏi quá khứ!",
    prm_en="What questions did you ask? What did your friend answer?",
    prm_vi="Bạn đã hỏi gì? Bạn của bạn đã trả lời gì?",
    kw=["detective","asked","walk","breakfast","answered"],
    talk="Interview a friend using past tense questions!",
    frames=[
        frame("I am a time ___.", "detective"),
        frame("I ___ my friend questions.", "asked"),
        frame("Did you ___ to school?", "walk"),
        frame("Did you eat ___?", "breakfast"),
        frame("My friend ___ yes to both.", "answered"),
    ],
    words=[
        w("detective","thám tử",False), w("asked","đã hỏi",False),
        w("walk","đi bộ",False), w("breakfast","bữa sáng",False), w("answered","đã trả lời",False),
        w("superhero","siêu anh hùng",True), w("telling","đang nói",True), w("lunch","bữa trưa — không khớp",True),
    ],
)

ADV_22 = dict(
    title="The Time Detective Interview",
    stage="medium-low", min_words=45,
    model="Yesterday I pretended to be a time detective and I interviewed my friend about everything she did the day before. I had a clipboard and a pencil and I asked her questions in a very serious voice. Did you walk to school or did you come by bus? Did you talk to your teacher? Did you finish all your homework last night? My friend laughed at first but then she answered every question carefully and honestly. She said she walked to school, talked to three teachers, and finished her maths but not her reading. I wrote down all her answers in my detective notebook and then I made my official report: my friend had a normal but productive day, and the time detective was satisfied with the evidence.",
    ins_en="Write a time detective interview in full using past tense questions and answers!",
    ins_vi="Viết cuộc phỏng vấn thám tử thời gian đầy đủ bằng câu hỏi và trả lời quá khứ!",
    prm_en="What did you ask? How did your friend answer? What was your official report?",
    prm_vi="Bạn hỏi gì? Bạn của bạn trả lời thế nào? Báo cáo chính thức của bạn là gì?",
    kw=["detective","clipboard","seriously","honestly","productive","evidence","official","satisfied"],
    talk="Tell me about your time detective interview — what did you ask and what did you find out?",
    frames=[
        frame("I had ___ and asked my friend questions in a ___.", "a clipboard and a pencil", "very serious voice"),
        frame("Did you ___ or did you come by bus? Did you ___ to your teacher?", "walk to school", "talk"),
        frame("Did you ___ last night? My friend answered ___ and ___.", "finish all your homework", "carefully", "honestly"),
        frame("She said she ___, talked to three teachers, and finished ___ but not ___.", "walked to school", "her maths", "her reading"),
        frame("I wrote down all her answers and made my ___ report: she had a ___ but ___ day.", "official", "normal", "productive"),
    ],
    words=[
        w("a clipboard and a pencil","một tập kẹp giấy và bút chì",False), w("very serious voice","giọng rất nghiêm túc",False),
        w("walk to school","đi bộ đến trường",False), w("talk","nói chuyện",False),
        w("finish all your homework","hoàn thành hết bài tập về nhà",False), w("carefully","cẩn thận",False), w("honestly","thành thật",False),
        w("walked to school","đã đi bộ đến trường",False), w("her maths","bài toán",False), w("her reading","bài đọc",False),
        w("official","chính thức",False), w("normal","bình thường",False), w("productive","hiệu quả",False),
        w("a toy sword","một thanh kiếm đồ chơi",True), w("carelessly","bất cẩn",True), w("a terrible day","một ngày tệ hại",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 23 – My Art Class Story / Past Tense + Sequence
# ══════════════════════════════════════════════════════════════════════════════

EASY_23 = dict(
    title="My Art Class Story",
    stage="medium-low", min_words=28,
    model="Yesterday I had art class. First I picked up my brush. Then I dipped it in red paint. I painted a flower. It looked beautiful.",
    ins_en="Write a sequence story about your art class!",
    ins_vi="Viết một câu chuyện theo trình tự về giờ học mỹ thuật!",
    prm_en="What did you do first? Then? What did you make?",
    prm_vi="Đầu tiên bạn làm gì? Tiếp theo? Bạn làm ra gì?",
    kw=["art","picked","brush","dipped","paint","flower","beautiful"],
    talk="Tell me what you did in art class step by step!",
    frames=[
        frame("Yesterday I had ___ class.", "art"),
        frame("First I picked up my ___.", "brush"),
        frame("Then I dipped it in red ___.", "paint"),
        frame("I painted a ___.", "flower"),
        frame("It looked ___.", "beautiful"),
    ],
    words=[
        w("art","mỹ thuật",False), w("brush","cọ vẽ",False),
        w("paint","sơn/màu vẽ",False), w("flower","bông hoa",False), w("beautiful","đẹp",False),
        w("maths","toán — sai môn học",True), w("spoon","thìa — không phải cọ",True), w("terrible","tệ",True),
    ],
)

ADV_23 = dict(
    title="My Art Class Story",
    stage="medium-low", min_words=45,
    model="Yesterday morning I had the most exciting art class I have ever had, and I want to describe every step of what I made. First, my teacher placed a large white canvas on each desk and told us we were going to paint a garden scene with at least three different colours. I picked up my thickest brush, dipped it carefully into bright red pigment, and began to paint a large rose in the centre of my canvas. Next, I used a finer brush to add detailed green leaves and curving stems around the rose, which made it look more realistic. Then I mixed yellow and orange together to paint a golden sun in the top right corner, and I used a thin brush to add little white clouds floating beside it. After I finished painting, I stepped back and looked at my work and I felt a strong sense of pride because the garden scene was even more beautiful than I had imagined.",
    ins_en="Write a detailed step-by-step art class story using first, next, then, after!",
    ins_vi="Viết câu chuyện mỹ thuật chi tiết theo từng bước dùng first, next, then, after!",
    prm_en="What did you paint? What steps did you follow? How did you feel at the end?",
    prm_vi="Bạn vẽ gì? Bạn đã làm theo những bước nào? Cuối cùng bạn cảm thấy thế nào?",
    kw=["canvas","pigment","realistic","stems","curving","floating","pride","imagined"],
    talk="Describe your art class step by step — what did you make and how?",
    frames=[
        frame("My teacher placed ___ on each desk and told us we were going to paint ___.", "a large white canvas", "a garden scene"),
        frame("I picked up my ___, dipped it into ___, and began to ___ in the centre.", "thickest brush", "bright red pigment", "paint a large rose"),
        frame("Next, I used ___ to add ___ and ___ around the rose, which made it look more realistic.", "a finer brush", "detailed green leaves", "curving stems"),
        frame("Then I ___ and ___ together to paint a golden sun, and added ___ beside it.", "mixed yellow", "orange", "little white clouds"),
        frame("I felt ___ because the garden scene was even more ___ than I had ___.", "a strong sense of pride", "beautiful", "imagined"),
    ],
    words=[
        w("a large white canvas","một tấm vải trắng lớn",False), w("a garden scene","cảnh vườn hoa",False),
        w("thickest brush","cọ dày nhất",False), w("bright red pigment","màu đỏ sáng",False), w("paint a large rose","vẽ một bông hồng lớn",False),
        w("a finer brush","cọ mảnh hơn",False), w("detailed green leaves","lá xanh chi tiết",False), w("curving stems","thân cong",False),
        w("mixed yellow","trộn màu vàng",False), w("orange","màu cam",False), w("little white clouds","những đám mây nhỏ trắng",False),
        w("a strong sense of pride","cảm giác tự hào mạnh mẽ",False), w("beautiful","đẹp",False), w("imagined","tưởng tượng",False),
        w("a dirty eraser","tẩy bẩn",True), w("ugly and messy","xấu và bừa bộn",True), w("forgotten","quên mất",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 24 – My Emotional Day / Feeling Words + Because
# ══════════════════════════════════════════════════════════════════════════════

EASY_24 = dict(
    title="My Emotional Day",
    stage="medium-low", min_words=28,
    model="Yesterday I felt scared. I could not find my bag. Then I felt relieved. My mum helped me. I was proud at the end.",
    ins_en="Write about an emotional day using feeling words!",
    ins_vi="Viết về một ngày đầy cảm xúc bằng các từ cảm xúc!",
    prm_en="How did you feel? What happened? How did you feel at the end?",
    prm_vi="Bạn cảm thấy thế nào? Chuyện gì xảy ra? Cuối cùng bạn cảm thấy thế nào?",
    kw=["scared","bag","relieved","helped","proud"],
    talk="Tell me about a time you felt many different emotions in one day!",
    frames=[
        frame("Yesterday I felt ___.", "scared"),
        frame("I could not find my ___.", "bag"),
        frame("Then I felt ___.", "relieved"),
        frame("My mum ___ me.", "helped"),
        frame("I was ___ at the end.", "proud"),
    ],
    words=[
        w("scared","sợ hãi",False), w("bag","cặp sách",False),
        w("relieved","nhẹ nhõm",False), w("helped","đã giúp",False), w("proud","tự hào",False),
        w("bored","chán",True), w("homework","bài tập — không khớp",True), w("angry","tức giận",True),
    ],
)

ADV_24 = dict(
    title="My Emotional Day",
    stage="medium-low", min_words=45,
    model="Yesterday was one of the most emotional days I have had in a long time because I experienced so many different feelings from morning to night. In the morning I was very scared because I could not find my school bag anywhere, and I searched the whole house in a panic while my mum remained calm and told me to breathe slowly. When we finally found it under my bed, I felt enormous relief and I hugged my mum tightly because she had been so patient with me. At school I felt proud and confident because I scored the highest mark in our spelling test and my teacher praised me in front of the whole class. However, in the afternoon I felt a little disappointed because my team lost our football match, even though we had practised very hard all week. By the time I went home, I felt peaceful and grateful because, despite the ups and downs, it had been a truly memorable day.",
    ins_en="Write about an emotional day from morning to night using because and feeling words!",
    ins_vi="Viết về một ngày đầy cảm xúc từ sáng đến tối dùng because và từ cảm xúc!",
    prm_en="What happened? How did you feel and why? How did the day end?",
    prm_vi="Chuyện gì xảy ra? Bạn cảm thấy thế nào và tại sao? Ngày kết thúc thế nào?",
    kw=["panic","relief","praised","disappointed","practised","peaceful","grateful","memorable"],
    talk="Describe an emotional day — what feelings did you have and why?",
    frames=[
        frame("In the morning I was very ___ because I could not find ___ anywhere.", "scared", "my school bag"),
        frame("When we finally found it, I felt ___ and I hugged my mum because she had been so ___.", "enormous relief", "patient"),
        frame("At school I felt ___ because I scored ___ and my teacher ___ me in front of the class.", "proud and confident", "the highest mark", "praised"),
        frame("In the afternoon I felt ___ because my team ___ our football match.", "a little disappointed", "lost"),
        frame("By the time I went home, I felt ___ and ___ because it had been a ___ day.", "peaceful", "grateful", "truly memorable"),
    ],
    words=[
        w("scared","sợ hãi",False), w("my school bag","cặp sách của tôi",False),
        w("enormous relief","sự nhẹ nhõm to lớn",False), w("patient","kiên nhẫn",False),
        w("proud and confident","tự hào và tự tin",False), w("the highest mark","điểm cao nhất",False), w("praised","đã khen ngợi",False),
        w("a little disappointed","hơi thất vọng",False), w("lost","đã thua",False),
        w("peaceful","bình yên",False), w("grateful","biết ơn",False), w("truly memorable","thực sự đáng nhớ",False),
        w("confused and angry","bối rối và tức giận",True), w("won easily","đã thắng dễ dàng",True), w("a boring and forgettable","nhàm chán và không đáng nhớ",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 25 – My Step-by-Step Guide / How to + Sequence
# ══════════════════════════════════════════════════════════════════════════════

EASY_25 = dict(
    title="My Step-by-Step Guide",
    stage="medium-low", min_words=28,
    model="Here is how I make a sandwich. First I take two slices of bread. Next I spread butter on them. Then I add some ham. Finally I enjoy my sandwich!",
    ins_en="Write a step-by-step guide using First, Next, Then, Finally!",
    ins_vi="Viết một hướng dẫn từng bước dùng First, Next, Then, Finally!",
    prm_en="What is your guide about? What are the steps from first to finally?",
    prm_vi="Hướng dẫn của bạn về điều gì? Các bước từ đầu đến cuối là gì?",
    kw=["sandwich","slices","bread","butter","ham","enjoy"],
    talk="Give me a step-by-step guide for something you know how to do!",
    frames=[
        frame("First I take two ___ of bread.", "slices"),
        frame("Next I ___ butter on them.", "spread"),
        frame("Then I add some ___.", "ham"),
        frame("Finally I ___ my sandwich!", "enjoy"),
    ],
    words=[
        w("slices","lát",False), w("spread","phết",False), w("ham","giăm bông",False), w("enjoy","thưởng thức",False),
        w("bags","túi — không phải sandwich",True), w("pour","đổ — không phải bơ",True), w("hide","giấu — sai",True),
    ],
)

ADV_25 = dict(
    title="My Step-by-Step Guide",
    stage="medium-low", min_words=45,
    model="Here is my detailed step-by-step guide to making the perfect jam sandwich, which is my all-time favourite snack and very easy to prepare at home. First, you need to gather all your ingredients and equipment, including two thick slices of white or brown bread, a jar of strawberry jam, a clean butter knife, and a plate to work on. Next, lay both slices of bread flat on the plate and use the knife to spread a generous layer of jam evenly across one slice, making sure you reach all the edges so every bite is flavourful. Then press the two slices firmly together, jam side facing inward, so the sandwich holds its shape properly and does not fall apart. After that, use the knife to cut the sandwich in half diagonally, because diagonal cuts always make sandwiches look more appealing and professional. Finally, place your sandwich on a clean plate, pour yourself a cold glass of milk, and enjoy your perfect snack!",
    ins_en="Write a detailed step-by-step guide using First, Next, Then, After, Finally!",
    ins_vi="Viết hướng dẫn từng bước chi tiết dùng First, Next, Then, After, Finally!",
    prm_en="What are you guiding someone to do? What are all the detailed steps?",
    prm_vi="Bạn đang hướng dẫn ai làm gì? Tất cả các bước chi tiết là gì?",
    kw=["ingredients","equipment","generous","evenly","diagonally","appealing","professional","flavourful"],
    talk="Give me a really detailed step-by-step guide for your favourite thing to make!",
    frames=[
        frame("First, you need to gather all your ___, including ___, ___, ___, and ___.", "ingredients", "two thick slices of bread", "a jar of strawberry jam", "a butter knife", "a plate"),
        frame("Next, spread ___ across one slice, making sure you reach ___ so every bite is ___.", "a generous layer of jam", "all the edges", "flavourful"),
        frame("Then press the two slices ___ together, jam side ___, so the sandwich ___ properly.", "firmly", "facing inward", "holds its shape"),
        frame("After that, cut the sandwich in half ___ because diagonal cuts make it look more ___ and ___.", "diagonally", "appealing", "professional"),
        frame("Finally, place your sandwich on a ___, pour ___, and enjoy your perfect snack!", "clean plate", "a cold glass of milk"),
    ],
    words=[
        w("ingredients","nguyên liệu",False), w("two thick slices of bread","hai lát bánh mì dày",False),
        w("a jar of strawberry jam","một hũ mứt dâu tây",False), w("a butter knife","dao bơ",False), w("a plate","một cái đĩa",False),
        w("a generous layer of jam","một lớp mứt hào phóng",False), w("all the edges","tất cả các cạnh bánh",False), w("flavourful","đậm đà hương vị",False),
        w("firmly","chắc chắn",False), w("facing inward","mặt vào trong",False), w("holds its shape","giữ nguyên hình dạng",False),
        w("diagonally","theo đường chéo",False), w("appealing","hấp dẫn",False), w("professional","chuyên nghiệp",False),
        w("clean plate","đĩa sạch",False), w("a cold glass of milk","một ly sữa lạnh",False),
        w("a dirty sock","chiếc tất bẩn",True), w("sloppy and uneven","cẩu thả và không đều",True), w("a hot cup of coffee","cà phê nóng",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 26 – My Weekend Story / Past Tense Narrative Comic Strip
# ══════════════════════════════════════════════════════════════════════════════

EASY_26 = dict(
    title="My Weekend Story",
    stage="low", min_words=32,
    model="Last weekend my family went to the park. We packed some food. We walked along the trail. We saw a waterfall. We drove home feeling happy.",
    ins_en="Write your weekend story in order, like a comic strip!",
    ins_vi="Viết câu chuyện cuối tuần theo thứ tự như một dải truyện tranh!",
    prm_en="Where did you go? What did you do first? Then? At the end?",
    prm_vi="Bạn đã đi đâu? Đầu tiên làm gì? Tiếp theo? Cuối cùng thế nào?",
    kw=["weekend","park","packed","trail","waterfall","happy"],
    talk="Tell me about your last weekend like a four-panel story!",
    frames=[
        frame("Last weekend my family went to the ___.", "park"),
        frame("We ___ some food.", "packed"),
        frame("We walked along the ___.", "trail"),
        frame("We saw a ___.", "waterfall"),
        frame("We drove home feeling ___.", "happy"),
    ],
    words=[
        w("park","công viên",False), w("packed","đóng gói",False),
        w("trail","đường mòn",False), w("waterfall","thác nước",False), w("happy","vui",False),
        w("airport","sân bay",True), w("threw away","ném đi",True), w("bored","chán nản",True),
    ],
)

ADV_26 = dict(
    title="My Weekend Comic Strip",
    stage="low", min_words=48,
    model="Last weekend my family went on a wonderful trip to the nature park and it was one of the most enjoyable days we have had in months. First, we woke up early and packed a large picnic basket with homemade sandwiches, a bottle of cold juice, fresh apples, and a soft woollen blanket to sit on. Then we drove to the park and hiked along a shaded trail through tall pine trees, and the fresh air smelled wonderful after so many days indoors. After that, we reached a stunning waterfall at the end of the trail and took many photos together while the cold mist sprayed onto our faces. We spread our blanket near the waterfall and ate our picnic lunch there, and the sound of rushing water made everything taste better. Finally, we drove home as the sun was setting and the sky turned orange and pink. We were tired but grateful, and we all agreed it was a perfect family day.",
    ins_en="Write a weekend adventure story with four clear parts — like a comic strip!",
    ins_vi="Viết câu chuyện phiêu lưu cuối tuần với bốn phần rõ ràng như dải truyện tranh!",
    prm_en="Use First, Then, After that, Finally. Add lots of detail to each part!",
    prm_vi="Dùng First, Then, After that, Finally. Thêm nhiều chi tiết cho mỗi phần!",
    kw=["picnic","homemade","shaded","stunning","mist","sprayed","grateful","setting"],
    talk="Tell me your weekend story with four parts — First, Then, After that, Finally!",
    frames=[
        frame("First, we ___ and packed ___ with ___, ___, ___, and a woollen blanket.", "woke up early", "a large picnic basket", "sandwiches", "cold juice", "fresh apples"),
        frame("Then we ___ along a shaded trail through ___, and the air smelled ___.", "hiked", "tall pine trees", "wonderful"),
        frame("After that, we reached ___ and took many photos while the ___ sprayed onto our faces.", "a stunning waterfall", "cold mist"),
        frame("We spread our ___ and ate our picnic there, and the sound of ___ made everything taste better.", "blanket near the waterfall", "rushing water"),
        frame("Finally, we drove home as ___ and the sky turned ___. We were ___ but ___ and agreed it was a perfect day.", "the sun was setting", "orange and pink", "tired", "grateful"),
    ],
    words=[
        w("woke up early","thức dậy sớm",False), w("a large picnic basket","một giỏ dã ngoại lớn",False),
        w("sandwiches","bánh mì kẹp",False), w("cold juice","nước trái cây lạnh",False), w("fresh apples","táo tươi",False),
        w("hiked","đi bộ đường dài",False), w("tall pine trees","cây thông cao",False), w("wonderful","tuyệt vời",False),
        w("a stunning waterfall","một thác nước ngoạn mục",False), w("cold mist","sương lạnh",False),
        w("blanket near the waterfall","chăn gần thác nước",False), w("rushing water","tiếng nước chảy",False),
        w("the sun was setting","mặt trời đang lặn",False), w("orange and pink","cam và hồng",False),
        w("tired","mệt mỏi",False), w("grateful","biết ơn",False),
        w("stayed home and watched TV","ở nhà xem tivi",True), w("a bag of crisps","một túi khoai tây chiên",True), w("bored and annoyed","chán và khó chịu",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 27 – How a Seed Grows / Process + Passive (Simple)
# ══════════════════════════════════════════════════════════════════════════════

EASY_27 = dict(
    title="How a Seed Grows",
    stage="low", min_words=32,
    model="First a seed is planted in soil. It needs water and sunlight. Next a tiny shoot grows up. Then leaves appear. Finally a flower blooms.",
    ins_en="Describe how a seed grows step by step!",
    ins_vi="Mô tả cách một hạt giống mọc lên theo từng bước!",
    prm_en="What happens first? What does the seed need? What comes next?",
    prm_vi="Điều gì xảy ra đầu tiên? Hạt giống cần gì? Tiếp theo là gì?",
    kw=["seed","soil","water","sunlight","shoot","leaves","flower","blooms"],
    talk="Explain how a seed grows into a plant step by step!",
    frames=[
        frame("First a seed is ___ in soil.", "planted"),
        frame("It needs ___ and sunlight.", "water"),
        frame("Next a tiny ___ grows up.", "shoot"),
        frame("Then ___ appear.", "leaves"),
        frame("Finally a flower ___.", "blooms"),
    ],
    words=[
        w("planted","được trồng",False), w("water","nước",False),
        w("shoot","mầm cây",False), w("leaves","lá",False), w("blooms","nở hoa",False),
        w("thrown","bị ném",True), w("fire","lửa",True), w("falls","rụng xuống",True),
    ],
)

ADV_27 = dict(
    title="How a Seed Grows into a Plant",
    stage="low", min_words=48,
    model="The life cycle of a plant is one of nature's most fascinating processes and I am going to explain it step by step so you can understand exactly how a tiny seed becomes a beautiful flowering plant. First, a seed is carefully planted in warm and moist soil, where it is protected from cold temperatures and extreme weather until it is ready to germinate. The seed needs a combination of warmth, water, and oxygen to trigger the germination process, and once these conditions are right, the seed coat breaks open and a tiny white root pushes down into the soil. Next, a small green shoot pushes upward through the surface of the soil toward the sunlight, because all plants are drawn to light as their source of energy. Then, the shoot grows taller and produces its first pair of small green leaves, which begin to absorb sunlight through a process called photosynthesis. Finally, the plant matures, produces a bud, and eventually blooms into a beautiful flower that attracts bees and butterflies to spread its pollen.",
    ins_en="Write a detailed scientific explanation of how a seed grows using sequence words!",
    ins_vi="Viết giải thích khoa học chi tiết về cách hạt giống mọc dùng từ trình tự!",
    prm_en="What are all the stages? What does the seed need at each stage? Why?",
    prm_vi="Các giai đoạn là gì? Hạt cần gì ở mỗi giai đoạn? Tại sao?",
    kw=["germinate","germination","oxygen","trigger","photosynthesis","pollen","matures","bud"],
    talk="Explain the full life cycle of a plant from seed to flower in scientific detail!",
    frames=[
        frame("First, a seed is planted in ___ soil, where it is protected from ___ until it is ready to ___.", "warm and moist", "extreme weather", "germinate"),
        frame("The seed needs ___, ___, and ___ to trigger germination, and once ready the ___ breaks open.", "warmth", "water", "oxygen", "seed coat"),
        frame("Next, a small ___ pushes ___ through the soil toward the sunlight because plants are drawn to ___ as their energy source.", "green shoot", "upward", "light"),
        frame("Then the shoot grows taller and produces ___, which absorb sunlight through ___.", "its first pair of leaves", "photosynthesis"),
        frame("Finally, the plant ___, produces a ___, and eventually ___ into a beautiful flower that attracts ___ to spread pollen.", "matures", "bud", "blooms", "bees and butterflies"),
    ],
    words=[
        w("warm and moist","ấm và ẩm",False), w("extreme weather","thời tiết khắc nghiệt",False), w("germinate","nảy mầm",False),
        w("warmth","hơi ấm",False), w("water","nước",False), w("oxygen","oxy",False), w("seed coat","vỏ hạt",False),
        w("green shoot","mầm xanh",False), w("upward","lên trên",False), w("light","ánh sáng",False),
        w("its first pair of leaves","cặp lá đầu tiên",False), w("photosynthesis","quang hợp",False),
        w("matures","trưởng thành",False), w("bud","nụ",False), w("blooms","nở hoa",False), w("bees and butterflies","ong và bướm",False),
        w("freezing cold soil","đất lạnh cóng",True), w("darkness","bóng tối",True), w("dies","chết đi",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 28 – The Tortoise and the Hare / Retell + Past Tense
# ══════════════════════════════════════════════════════════════════════════════

EASY_28 = dict(
    title="Retell The Tortoise and the Hare",
    stage="low", min_words=32,
    model="Once the Hare and the Tortoise had a race. The Hare ran very fast. Then he stopped to rest. He fell asleep. The Tortoise walked slowly and won.",
    ins_en="Retell the story of the tortoise and the hare in your own words!",
    ins_vi="Kể lại câu chuyện Rùa và Thỏ bằng lời của bạn!",
    prm_en="Who were the characters? What happened? Who won and why?",
    prm_vi="Nhân vật là ai? Chuyện gì xảy ra? Ai thắng và tại sao?",
    kw=["hare","tortoise","race","rested","asleep","slowly","won"],
    talk="Retell the story of the tortoise and the hare!",
    frames=[
        frame("Once the ___ and the Tortoise had a race.", "Hare"),
        frame("The Hare ran very ___.", "fast"),
        frame("Then he stopped to ___.", "rest"),
        frame("He fell ___.", "asleep"),
        frame("The Tortoise walked ___ and won.", "slowly"),
    ],
    words=[
        w("Hare","Thỏ",False), w("fast","nhanh",False),
        w("rest","nghỉ ngơi",False), w("asleep","ngủ say",False), w("slowly","chậm rãi",False),
        w("Elephant","Voi — sai nhân vật",True), w("quietly","im lặng — không phải nhanh",True), w("exercise","tập thể dục — sai",True),
    ],
)

ADV_28 = dict(
    title="Retell The Tortoise and the Hare",
    stage="low", min_words=50,
    model="One bright morning in the forest, the boastful Hare was bragging loudly to all the animals about how fast he could run, and he declared that nobody could ever beat him in a race. The calm and steady Tortoise decided to challenge him, and all the forest animals gathered at the starting line to watch. When the race began, the Hare burst forward at top speed and disappeared around the corner in a cloud of dust. Feeling very confident that he had already won, the Hare decided to stop under a shady oak tree and take a short nap. However, while the Hare slept soundly, the Tortoise kept moving forward slowly and steadily, never stopping and never looking back. By the time the Hare woke up and sprinted to the finish line in a panic, the Tortoise had already crossed it and was being cheered by all the animals. The moral of the story is that slow and steady wins the race.",
    ins_en="Retell the fable in full using past tense and story phrases like one morning, however, by the time!",
    ins_vi="Kể lại truyện ngụ ngôn đầy đủ bằng thì quá khứ và cụm từ kể chuyện!",
    prm_en="What did the Hare do? What did the Tortoise do? What is the moral?",
    prm_vi="Thỏ đã làm gì? Rùa đã làm gì? Bài học là gì?",
    kw=["boastful","bragging","declared","steadily","burst","confidence","sprinted","moral"],
    talk="Retell the tortoise and the hare story with all the details!",
    frames=[
        frame("The boastful Hare was ___ loudly to all the animals and declared that nobody could ___ him.", "bragging", "beat"),
        frame("The calm Tortoise decided to ___ him, and all the animals gathered at ___ to watch.", "challenge", "the starting line"),
        frame("The Hare ___ at top speed and then stopped under a ___ to take ___.", "burst forward", "shady oak tree", "a short nap"),
        frame("While the Hare ___, the Tortoise kept moving ___ and ___, never stopping.", "slept soundly", "forward", "steadily"),
        frame("By the time the Hare ___ to the finish line, the Tortoise had already ___ and was being ___ by all the animals.", "sprinted", "crossed it", "cheered"),
        frame("The moral is that ___ and ___ wins the race.", "slow", "steady"),
    ],
    words=[
        w("bragging","khoe khoang",False), w("beat","đánh bại",False),
        w("challenge","thách thức",False), w("the starting line","vạch xuất phát",False),
        w("burst forward","lao về phía trước",False), w("shady oak tree","cây sồi có bóng mát",False), w("a short nap","một giấc ngủ ngắn",False),
        w("slept soundly","ngủ say",False), w("forward","về phía trước",False), w("steadily","đều đặn",False),
        w("sprinted","chạy nước rút",False), w("crossed it","đã về đích",False), w("cheered","cổ vũ",False),
        w("slow","chậm",False), w("steady","kiên định",False),
        w("complimenting","khen ngợi — sai nghĩa",True), w("a swimming pool","bể bơi",True), w("booed","la ó",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 29 – My Journey Story / Past Tense Narrative + Rich Detail
# ══════════════════════════════════════════════════════════════════════════════

EASY_29 = dict(
    title="My Journey Story",
    stage="low", min_words=32,
    model="Last weekend my family went on a journey. We woke up early. On the road we saw green valleys. We set up camp when we arrived. It was the best trip.",
    ins_en="Write your journey story with rich details!",
    ins_vi="Viết câu chuyện hành trình của bạn với chi tiết phong phú!",
    prm_en="Where did you go? What did you see? What happened when you arrived?",
    prm_vi="Bạn đi đâu? Bạn thấy gì? Điều gì xảy ra khi bạn đến nơi?",
    kw=["journey","woke","early","valleys","camp","arrived","best","trip"],
    talk="Tell me about an exciting journey you went on!",
    frames=[
        frame("Last weekend my family went on a ___.", "journey"),
        frame("We ___ up early.", "woke"),
        frame("On the road we saw green ___.", "valleys"),
        frame("We set up ___ when we arrived.", "camp"),
        frame("It was the best ___.", "trip"),
    ],
    words=[
        w("journey","hành trình",False), w("woke","thức dậy",False),
        w("valleys","thung lũng",False), w("camp","trại",False), w("trip","chuyến đi",False),
        w("argument","cuộc tranh cãi",True), w("slept in","ngủ muộn",True), w("buildings","những tòa nhà",True),
    ],
)

ADV_29 = dict(
    title="My Journey Story",
    stage="low", min_words=50,
    model="Last weekend my family went on the most exciting journey we have ever taken, and I want to tell you about every moment of that wonderful adventure. On the night before, we packed our bags very carefully, prepared our food, and went to bed early so that we would have energy for the long drive. We woke up before sunrise, loaded the car in the cool dark morning, and set off on the road just as the sky began to turn a beautiful shade of golden orange. As we drove through the winding mountain roads, I pressed my face against the window and stared at the deep green valleys below, the sparkling rivers, and the tall waterfalls tumbling down the rocky cliffs. When we finally arrived at our campsite after three hours of driving, we unloaded the car, set up our tents, and cooked a delicious dinner over an open fire as the stars began to appear overhead. That night, lying in my sleeping bag and listening to the sounds of the forest, I felt completely free and deeply happy.",
    ins_en="Write a rich and detailed journey story with vivid descriptions from start to finish!",
    ins_vi="Viết câu chuyện hành trình phong phú chi tiết với mô tả sinh động từ đầu đến cuối!",
    prm_en="What did you do before the journey? What did you see on the way? How did you feel at the end?",
    prm_vi="Bạn làm gì trước chuyến đi? Bạn thấy gì trên đường? Cuối cùng bạn cảm thấy thế nào?",
    kw=["sunrise","winding","sparkling","tumbling","cliffs","campsite","unloaded","tents"],
    talk="Tell me a detailed journey story — what happened before, during, and after?",
    frames=[
        frame("On the night before, we ___, prepared our food, and went to bed ___ so we would have ___ for the drive.", "packed our bags carefully", "early", "energy"),
        frame("We woke up before ___, loaded the car, and set off just as the sky turned ___.", "sunrise", "a beautiful shade of golden orange"),
        frame("As we drove, I stared at the ___ below, the ___ rivers, and ___ tumbling down the cliffs.", "deep green valleys", "sparkling", "tall waterfalls"),
        frame("When we arrived, we ___, set up our ___, and cooked ___ over an open fire.", "unloaded the car", "tents", "a delicious dinner"),
        frame("That night, lying in my sleeping bag and listening to ___, I felt ___ and deeply ___.", "the sounds of the forest", "completely free", "happy"),
    ],
    words=[
        w("packed our bags carefully","đóng gói hành lý cẩn thận",False), w("early","sớm",False), w("energy","năng lượng",False),
        w("sunrise","bình minh",False), w("a beautiful shade of golden orange","sắc cam vàng đẹp",False),
        w("deep green valleys","những thung lũng xanh sâu",False), w("sparkling","lấp lánh",False), w("tall waterfalls","những thác nước cao",False),
        w("unloaded the car","dỡ đồ khỏi xe",False), w("tents","lều trại",False), w("a delicious dinner","bữa tối ngon",False),
        w("the sounds of the forest","những âm thanh của rừng",False), w("completely free","hoàn toàn tự do",False), w("happy","hạnh phúc",False),
        w("stayed home","ở nhà",True), w("midnight","nửa đêm",True), w("crowded factories","những nhà máy đông đúc",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 30 – My Picnic Story / Past Tense + Rich Language
# ══════════════════════════════════════════════════════════════════════════════

EASY_30 = dict(
    title="My Picnic Story",
    stage="low", min_words=32,
    model="Last Sunday my family had a picnic in the park. Mum bought bread and fruit. We spread a blanket on the grass. We ate and laughed together. It was a happy day.",
    ins_en="Write a detailed picnic story with rich language!",
    ins_vi="Viết một câu chuyện dã ngoại chi tiết với ngôn ngữ phong phú!",
    prm_en="Where did you go? What did you bring? What did you do? How did it feel?",
    prm_vi="Bạn đi đâu? Bạn mang gì? Bạn làm gì? Cảm giác thế nào?",
    kw=["picnic","bought","bread","blanket","grass","laughed","happy"],
    talk="Tell me about a wonderful picnic you had!",
    frames=[
        frame("Last Sunday my family had a ___ in the park.", "picnic"),
        frame("Mum ___ bread and fruit.", "bought"),
        frame("We spread a ___ on the grass.", "blanket"),
        frame("We ate and ___ together.", "laughed"),
        frame("It was a ___ day.", "happy"),
    ],
    words=[
        w("picnic","dã ngoại",False), w("bought","đã mua",False),
        w("blanket","tấm chăn",False), w("laughed","đã cười",False), w("happy","vui",False),
        w("argument","cuộc cãi vã",True), w("sold","đã bán",True), w("cried","đã khóc",True),
    ],
)

ADV_30 = dict(
    title="My Picnic Story",
    stage="low", min_words=50,
    model="Last Sunday my family had the most wonderful outdoor picnic in the large park at the end of our street, and the warm sunny weather made everything feel absolutely perfect. My mum had spent Saturday afternoon preparing all the food, which included soft white bread rolls, slices of cheddar cheese, cold roast chicken, fresh grapes and strawberries, and a large bottle of homemade lemonade that she had chilled overnight. We found a perfect spot under a wide spreading oak tree near the duck pond and spread two large blankets on the cool soft grass. We spent the afternoon eating, chatting, and laughing at funny stories from when my parents were young, and my younger brother kept trying to steal extra strawberries when he thought nobody was looking. At one point, a group of sparrows flew down and pecked at our breadcrumbs, which made everyone laugh. As the sun began to set and the air grew cooler, we packed everything into our baskets and walked home slowly, full of good food and happy memories.",
    ins_en="Write a detailed picnic story from start to finish using vivid language!",
    ins_vi="Viết câu chuyện dã ngoại chi tiết từ đầu đến cuối bằng ngôn ngữ sinh động!",
    prm_en="What food did you bring? What happened during the picnic? How did the day end?",
    prm_vi="Bạn mang thức ăn gì? Chuyện gì xảy ra trong chuyến dã ngoại? Ngày kết thúc thế nào?",
    kw=["lemonade","chilled","spreading","breadcrumbs","sparrows","pecked","baskets","memories"],
    talk="Tell me everything about your perfect picnic day!",
    frames=[
        frame("My mum had prepared ___, including ___, ___, ___, and ___.", "all the food", "bread rolls", "cheddar cheese", "roast chicken", "homemade lemonade"),
        frame("We found ___ near the duck pond and spread ___ on the cool soft grass.", "a perfect spot under an oak tree", "two large blankets"),
        frame("We spent the afternoon ___, ___, and ___ at funny stories from when my parents were young.", "eating", "chatting", "laughing"),
        frame("My brother kept trying to ___ when he thought nobody was ___.", "steal extra strawberries", "looking"),
        frame("A group of ___ flew down and ___ at our breadcrumbs, which made everyone ___.", "sparrows", "pecked", "laugh"),
        frame("As the sun ___ and the air grew cooler, we ___ and walked home, full of ___ and happy memories.", "began to set", "packed everything", "good food"),
    ],
    words=[
        w("all the food","tất cả thức ăn",False), w("bread rolls","bánh mì cuộn",False), w("cheddar cheese","phô mai cheddar",False),
        w("roast chicken","gà nướng",False), w("homemade lemonade","nước chanh tự làm",False),
        w("a perfect spot under an oak tree","một chỗ hoàn hảo dưới cây sồi",False), w("two large blankets","hai tấm chăn lớn",False),
        w("eating","ăn uống",False), w("chatting","trò chuyện",False), w("laughing","cười",False),
        w("steal extra strawberries","lấy thêm dâu",False), w("looking","nhìn",False),
        w("sparrows","chim sẻ",False), w("pecked","mổ",False), w("laugh","cười",False),
        w("began to set","bắt đầu lặn",False), w("packed everything","đóng gói mọi thứ",False), w("good food","thức ăn ngon",False),
        w("instant noodles","mì ăn liền",True), w("an empty car park","bãi đỗ xe trống",True), w("complaining","phàn nàn",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 31 – My Sensory Walk / Past Tense + 5 Senses
# ══════════════════════════════════════════════════════════════════════════════

EASY_31 = dict(
    title="My Sensory Walk",
    stage="low", min_words=32,
    model="Last Saturday I went for a walk in the park. I saw orange leaves on the ground. I heard birds singing. I smelled fresh flowers. I felt the cool breeze.",
    ins_en="Write a sensory walk using saw, heard, smelled, and felt!",
    ins_vi="Viết một chuyến đi dùng saw, heard, smelled và felt!",
    prm_en="What did you see, hear, smell, and feel on your walk?",
    prm_vi="Bạn thấy, nghe, ngửi và cảm nhận gì trong chuyến đi bộ?",
    kw=["walk","leaves","birds","singing","flowers","breeze"],
    talk="Describe a walk using all five of your senses!",
    frames=[
        frame("I saw orange ___ on the ground.", "leaves"),
        frame("I heard ___ singing.", "birds"),
        frame("I smelled fresh ___.", "flowers"),
        frame("I felt the cool ___.", "breeze"),
    ],
    words=[
        w("leaves","lá",False), w("birds","chim",False),
        w("flowers","hoa",False), w("breeze","gió nhẹ",False),
        w("clouds","mây — không phải trên mặt đất",True), w("dogs","chó — không phải hát",True), w("heat","nóng bức — không phải mát",True),
    ],
)

ADV_31 = dict(
    title="My Sensory Walk",
    stage="low", min_words=50,
    model="Last Saturday afternoon my family and I went for a long and peaceful walk through the nature park near our house, and I made a point of paying attention to every single thing my senses noticed along the way. I saw a carpet of golden and amber leaves lying thickly on the ground beneath the tall oak trees, and sunlight filtered through the branches and made beautiful patterns of light and shadow on the path. I heard the cheerful chirping of small birds in the high branches, the distant sound of children laughing and playing, and the gentle trickle of water from a small stream that ran alongside the path. I smelled the rich earthy scent of damp soil and fallen leaves, the sweet fragrance of late wildflowers growing in patches beside the path, and the clean cold smell of the breeze coming down from the hills. I felt the cool and slightly sharp breeze on my cheeks and hands, the soft crunch of leaves beneath my boots, and the warmth of the sunlight on my face whenever I stepped into an open clearing. By the end of the walk, I felt deeply calm and connected to the natural world around me.",
    ins_en="Write a detailed sensory walk using all five senses with vivid language!",
    ins_vi="Viết bài đi bộ cảm giác chi tiết dùng cả năm giác quan với ngôn ngữ sinh động!",
    prm_en="What did you see, hear, smell, feel, and maybe taste? Use rich describing words!",
    prm_vi="Bạn thấy, nghe, ngửi, cảm và nếm gì? Dùng từ mô tả phong phú!",
    kw=["amber","filtered","chirping","trickle","damp","fragrance","clearing","connected"],
    talk="Describe a walk through all five senses — sight, sound, smell, touch, and taste!",
    frames=[
        frame("I saw ___ lying thickly on the ground, and sunlight ___ through the branches making ___ on the path.", "a carpet of golden amber leaves", "filtered", "patterns of light and shadow"),
        frame("I heard ___ in the branches, the ___ of children, and the ___ of water from a stream.", "the chirping of small birds", "distant sound", "gentle trickle"),
        frame("I smelled the ___ of damp soil, the ___ of wildflowers, and the ___ of the breeze from the hills.", "rich earthy scent", "sweet fragrance", "clean cold smell"),
        frame("I felt the ___ on my cheeks, the ___ beneath my boots, and the ___ on my face in open clearings.", "cool sharp breeze", "soft crunch of leaves", "warmth of sunlight"),
        frame("By the end of the walk, I felt deeply ___ and ___ to the ___ around me.", "calm", "connected", "natural world"),
    ],
    words=[
        w("a carpet of golden amber leaves","một thảm lá vàng hổ phách",False),
        w("filtered","lọc qua",False), w("patterns of light and shadow","những hoa văn ánh sáng và bóng tối",False),
        w("the chirping of small birds","tiếng hót của những chú chim nhỏ",False),
        w("distant sound","âm thanh xa xa",False), w("gentle trickle","tiếng chảy nhẹ nhàng",False),
        w("rich earthy scent","mùi đất thơm nồng",False), w("sweet fragrance","hương thơm ngọt ngào",False), w("clean cold smell","mùi lạnh trong lành",False),
        w("cool sharp breeze","làn gió mát lạnh",False), w("soft crunch of leaves","tiếng lá giòn giòn",False), w("warmth of sunlight","hơi ấm của ánh nắng",False),
        w("calm","bình yên",False), w("connected","gắn kết",False), w("natural world","thế giới tự nhiên",False),
        w("a pile of rubbish","đống rác",True), w("roaring traffic","tiếng xe cộ ầm ĩ",True), w("anxious and stressed","lo lắng và căng thẳng",True),
    ],
)


# ══════════════════════════════════════════════════════════════════════════════
# RUN
# ══════════════════════════════════════════════════════════════════════════════

WEEKS = {
    21: (EASY_21, ADV_21),
    22: (EASY_22, ADV_22),
    23: (EASY_23, ADV_23),
    24: (EASY_24, ADV_24),
    25: (EASY_25, ADV_25),
    26: (EASY_26, ADV_26),
    27: (EASY_27, ADV_27),
    28: (EASY_28, ADV_28),
    29: (EASY_29, ADV_29),
    30: (EASY_30, ADV_30),
    31: (EASY_31, ADV_31),
}

if __name__ == '__main__':
    for week_num, (easy, adv) in WEEKS.items():
        print(f"W{week_num:02d}:")
        write_js(EASY_BASE, week_num, easy)
        write_js(ADV_BASE,  week_num, adv)
    print("\n✅ W21–W31 done.")
