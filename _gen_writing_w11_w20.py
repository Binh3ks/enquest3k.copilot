#!/usr/bin/env python3
"""
Generator: Writing.js for W11–W20 (Easy + Advanced)
Principle:
- Easy:  shorter model, 4 simple sentences, word-level blanks
- Advanced: longer model (6-7 sentences), phrase/clause blanks, uses and/but/because/so/when
Run: python3 _gen_writing_w11_w20.py
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
# WEEK 11 – My Favourite Weekend Place / Park
# ══════════════════════════════════════════════════════════════════════════════

EASY_11 = dict(
    title="My Favourite Weekend Place",
    stage="medium", min_words=25,
    model="My favourite place is the park. I go there with my family. We play and walk together. I love the park.",
    ins_en="Write about your favourite place on the weekend!",
    ins_vi="Viết về nơi yêu thích vào cuối tuần!",
    prm_en="Where do you like to go? Who do you go with? What do you do there?",
    prm_vi="Bạn thích đi đâu? Đi với ai? Bạn làm gì ở đó?",
    kw=["park","family","play","walk","love"],
    talk="What is your favourite weekend place and why?",
    frames=[
        frame("My favourite place is ___.", "the park"),
        frame("I go there with my ___.", "family"),
        frame("We ___ and ___ together.", "play", "walk"),
        frame("I ___ the park.", "love"),
    ],
    words=[
        w("the park","công viên",False), w("family","gia đình",False),
        w("play","chơi",False), w("walk","đi bộ",False), w("love","yêu thích",False),
        w("the library","thư viện",True), w("alone","một mình",True), w("hate","ghét",True),
    ],
)

ADV_11 = dict(
    title="My Favourite Weekend Place",
    stage="medium", min_words=45,
    model="My favourite place to visit on the weekend is the large park near my house, and I go there almost every Saturday morning. The park has a beautiful lake, tall shady trees, and a wide path where people jog, cycle, and walk their dogs. I usually go with my parents and my younger sister because we all enjoy spending time outdoors together. We bring a picnic blanket and some sandwiches and then we find a quiet spot near the lake to sit and relax. My sister loves to feed the ducks while I fly my kite and my parents chat and read. By the time we go home in the afternoon, we all feel refreshed and happy.",
    ins_en="Write about your favourite weekend place with lots of details!",
    ins_vi="Viết về nơi yêu thích cuối tuần với nhiều chi tiết!",
    prm_en="Where is it? What is there? Who goes with you? What do you all do?",
    prm_vi="Nơi đó ở đâu? Ở đó có gì? Ai đi cùng bạn? Cả nhà làm gì?",
    kw=["lake","shady","jog","picnic","blanket","refreshed","ducks","kite"],
    talk="Describe your favourite weekend place from start to finish!",
    frames=[
        frame("The park has ___, ___, and ___ where people jog, cycle, and walk their dogs.", "a beautiful lake", "tall shady trees", "a wide path"),
        frame("I usually go with ___ because we all enjoy ___.", "my parents and my younger sister", "spending time outdoors together"),
        frame("We bring ___ and ___ and then find a quiet spot near the lake to ___.", "a picnic blanket", "some sandwiches", "sit and relax"),
        frame("My sister loves to ___ while I ___ and my parents ___.", "feed the ducks", "fly my kite", "chat and read"),
        frame("By the time we go home, we all feel ___ and ___.", "refreshed", "happy"),
    ],
    words=[
        w("a beautiful lake","một hồ đẹp",False), w("tall shady trees","cây cao có bóng mát",False), w("a wide path","con đường rộng",False),
        w("my parents and my younger sister","bố mẹ và em gái",False), w("spending time outdoors together","cùng dành thời gian ngoài trời",False),
        w("a picnic blanket","tấm chăn dã ngoại",False), w("some sandwiches","một vài bánh sandwich",False), w("sit and relax","ngồi và thư giãn",False),
        w("feed the ducks","cho vịt ăn",False), w("fly my kite","thả diều",False), w("chat and read","nói chuyện và đọc sách",False),
        w("refreshed","sảng khoái",False), w("happy","vui",False),
        w("a noisy construction site","công trường ồn ào",True), w("bored and tired","chán và mệt",True), w("argue and fight","cãi nhau và đánh nhau",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 12 – The Talent Show / Can & Can't
# ══════════════════════════════════════════════════════════════════════════════

EASY_12 = dict(
    title="My Talents",
    stage="medium", min_words=25,
    model="I can sing. I can draw pictures. I cannot swim yet. I want to learn.",
    ins_en="Write about what you can and cannot do!",
    ins_vi="Viết về những gì bạn có thể và chưa làm được!",
    prm_en="What can you do? What can't you do yet? What do you want to learn?",
    prm_vi="Bạn có thể làm gì? Chưa làm được gì? Bạn muốn học gì?",
    kw=["sing","draw","swim","learn","yet"],
    talk="What can you do? What do you want to learn?",
    frames=[
        frame("I can ___.", "sing"),
        frame("I can also ___ pictures.", "draw"),
        frame("I cannot ___ yet.", "swim"),
        frame("I want to ___.", "learn"),
    ],
    words=[
        w("sing","hát",False), w("draw","vẽ",False), w("swim","bơi",False), w("learn","học",False),
        w("fly","bay",True), w("already","rồi — sai nghĩa với yet",True), w("forget","quên",True),
    ],
)

ADV_12 = dict(
    title="The Talent Show",
    stage="medium", min_words=45,
    model="I have several talents that I am proud of and I would love to perform them in a talent show one day. I can sing clearly and loudly because I have practised every morning for two years. I can also draw very detailed pictures of animals and nature, and my art teacher says I have a gift. However, I cannot dance well yet because my legs get confused when I try to follow the beat. I also cannot speak French yet, but I am planning to start lessons next term because I think it is a beautiful language. My dream is to stand on a big stage one day and perform for a large audience who will cheer and clap for me.",
    ins_en="Write about your talents and things you want to learn using can, cannot, and because!",
    ins_vi="Viết về tài năng và điều muốn học bằng can, cannot và because!",
    prm_en="What can you do well? What can't you do yet? What is your dream?",
    prm_vi="Bạn làm tốt gì? Chưa làm được gì? Giấc mơ của bạn là gì?",
    kw=["talents","perform","practised","detailed","confused","beat","audience","cheer"],
    talk="What are your talents and what do you dream of performing?",
    frames=[
        frame("I can ___ because I have ___ every morning for two years.", "sing clearly and loudly", "practised"),
        frame("I can also ___ and my art teacher says I have a ___.", "draw very detailed pictures of animals", "gift"),
        frame("However, I cannot ___ yet because my legs get confused when I try to follow ___.", "dance well", "the beat"),
        frame("I cannot speak ___ yet, but I am planning to ___ next term because it is ___.", "French", "start lessons", "a beautiful language"),
        frame("My dream is to stand on ___ and perform for ___ who will ___ and ___ for me.", "a big stage", "a large audience", "cheer", "clap"),
    ],
    words=[
        w("sing clearly and loudly","hát rõ và to",False), w("practised","đã luyện tập",False),
        w("draw very detailed pictures of animals","vẽ tranh động vật rất chi tiết",False), w("gift","tài năng/thiên phú",False),
        w("dance well","nhảy tốt",False), w("the beat","nhịp điệu",False),
        w("French","tiếng Pháp",False), w("start lessons","bắt đầu học",False), w("a beautiful language","một ngôn ngữ đẹp",False),
        w("a big stage","một sân khấu lớn",False), w("a large audience","khán giả đông đảo",False),
        w("cheer","cổ vũ",False), w("clap","vỗ tay",False),
        w("shout and boo","la ó",True), w("an empty room","phòng trống",True), w("a terrible singer","người hát tệ",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 13 – My Daily Routine / Present Simple + Sequence
# ══════════════════════════════════════════════════════════════════════════════

EASY_13 = dict(
    title="My Day",
    stage="medium", min_words=25,
    model="I wake up at seven. I brush my teeth. I eat breakfast. Then I go to school.",
    ins_en="Write about your morning routine!",
    ins_vi="Viết về thói quen buổi sáng của bạn!",
    prm_en="What do you do in the morning? What order do you do things in?",
    prm_vi="Bạn làm gì vào buổi sáng? Bạn làm theo thứ tự nào?",
    kw=["wake","brush","teeth","breakfast","school"],
    talk="Tell me about your morning step by step!",
    frames=[
        frame("I wake up at ___.", "seven"),
        frame("I ___ my teeth.", "brush"),
        frame("I eat ___.", "breakfast"),
        frame("Then I go to ___.", "school"),
    ],
    words=[
        w("seven","bảy giờ",False), w("brush","đánh",False),
        w("breakfast","bữa sáng",False), w("school","trường",False),
        w("midnight","nửa đêm",True), w("comb","chải — không phải răng",True), w("dinner","bữa tối",True),
    ],
)

ADV_13 = dict(
    title="Write About Your Daily Routine",
    stage="medium", min_words=45,
    model="I have a very organised daily routine that helps me stay healthy and ready for school every day. I wake up at six thirty and immediately wash my face and brush my teeth so that I feel fresh and awake. Then I have a nutritious breakfast with my family, which usually includes eggs, toast, and a glass of fresh orange juice. After breakfast, I pack my school bag, put on my uniform, and leave the house by seven fifteen. At school I study hard and I always pay attention in class because I want to do well in my lessons. In the evening, I finish my homework first before I watch television or play with my toys. I go to bed at nine o'clock so that I get enough sleep and feel ready for the next day.",
    ins_en="Write about your full daily routine from morning to night using sequence words!",
    ins_vi="Viết về thói quen cả ngày từ sáng đến tối dùng từ nối trình tự!",
    prm_en="What is your routine from waking up to going to bed? Use First, Then, After, Finally!",
    prm_vi="Thói quen của bạn từ khi thức dậy đến khi ngủ? Dùng First, Then, After, Finally!",
    kw=["organised","nutritious","uniform","attention","homework","television","routine"],
    talk="Walk me through your whole day from morning to night!",
    frames=[
        frame("I wake up at ___ and immediately ___ and ___ so that I feel fresh and awake.", "six thirty", "wash my face", "brush my teeth"),
        frame("Then I have ___ with my family, which usually includes ___, ___, and ___.", "a nutritious breakfast", "eggs", "toast", "a glass of fresh orange juice"),
        frame("After breakfast, I ___, put on my ___, and leave the house by ___.", "pack my school bag", "uniform", "seven fifteen"),
        frame("In the evening, I finish ___ first before I ___ or play with my toys.", "my homework", "watch television"),
        frame("I go to bed at ___ so that I get enough ___ and feel ready for the next day.", "nine o'clock", "sleep"),
    ],
    words=[
        w("six thirty","sáu giờ rưỡi",False), w("wash my face","rửa mặt",False), w("brush my teeth","đánh răng",False),
        w("a nutritious breakfast","bữa sáng bổ dưỡng",False),
        w("eggs","trứng",False), w("toast","bánh mì nướng",False), w("a glass of fresh orange juice","một ly nước cam tươi",False),
        w("pack my school bag","đóng gói cặp sách",False), w("uniform","đồng phục",False), w("seven fifteen","bảy giờ mười lăm",False),
        w("my homework","bài tập về nhà",False), w("watch television","xem ti vi",False),
        w("nine o'clock","chín giờ",False), w("sleep","giấc ngủ",False),
        w("midnight","nửa đêm",True), w("junk food","thức ăn không lành mạnh",True), w("stay up all night","thức suốt đêm",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 14 – My World / Presentation Day
# ══════════════════════════════════════════════════════════════════════════════

EASY_14 = dict(
    title="My World",
    stage="medium", min_words=25,
    model="My name is Emma. I have a wonderful family. I live near the park. I feel happy every day.",
    ins_en="Write about your world — your family, home, and feelings!",
    ins_vi="Viết về thế giới của bạn — gia đình, nhà và cảm xúc!",
    prm_en="What is your name? What is your family like? Where do you live? How do you feel?",
    prm_vi="Tên bạn là gì? Gia đình thế nào? Bạn sống ở đâu? Cảm thấy thế nào?",
    kw=["Emma","wonderful","family","park","happy"],
    talk="Tell me about your world!",
    frames=[
        frame("My name is ___.", "Emma"),
        frame("I have a ___ family.", "wonderful"),
        frame("I live near the ___.", "park"),
        frame("I feel ___ every day.", "happy"),
    ],
    words=[
        w("Emma","",False), w("wonderful","tuyệt vời",False),
        w("park","công viên",False), w("happy","vui",False),
        w("terrible","tệ hại",True), w("library","thư viện",True), w("sad","buồn",True),
    ],
)

ADV_14 = dict(
    title="My Presentation Day",
    stage="medium", min_words=45,
    model="Today is my presentation day and I am both nervous and excited at the same time. I have prepared a poster about my world, which includes information about my family, my home, and the things I love most. My family is the most important part of my world because they support me and make me feel safe every day. I live in a comfortable flat near a park, and I love that I can hear birds singing from my window every morning. My favourite hobbies are drawing and reading because they help me relax and use my imagination. I am going to show my poster to the class and explain every section clearly so that my classmates can understand my world. I hope my presentation makes everyone smile.",
    ins_en="Write about your world as if presenting it to your class!",
    ins_vi="Viết về thế giới của bạn như thể đang thuyết trình trước lớp!",
    prm_en="What is your world like? How will you present it? What do you want people to understand?",
    prm_vi="Thế giới của bạn thế nào? Bạn sẽ thuyết trình thế nào? Bạn muốn mọi người hiểu điều gì?",
    kw=["presentation","nervous","poster","support","comfortable","imagination","classmates","section"],
    talk="Describe your world as a presentation to your class!",
    frames=[
        frame("Today is ___ and I am both ___ and ___ at the same time.", "my presentation day", "nervous", "excited"),
        frame("I have prepared ___ about my world, which includes ___, ___, and ___.", "a poster", "my family", "my home", "the things I love most"),
        frame("My family is the most important part because they ___ and make me feel ___ every day.", "support me", "safe"),
        frame("I live in ___ near a park, and I love that I can hear ___ every morning.", "a comfortable flat", "birds singing from my window"),
        frame("I am going to ___ and explain every section ___ so that my classmates can understand.", "show my poster to the class", "clearly"),
    ],
    words=[
        w("my presentation day","ngày thuyết trình của tôi",False),
        w("nervous","hồi hộp",False), w("excited","hào hứng",False),
        w("a poster","một áp phích",False), w("my family","gia đình tôi",False),
        w("my home","ngôi nhà của tôi",False), w("the things I love most","những điều tôi yêu thích nhất",False),
        w("support me","ủng hộ tôi",False), w("safe","an toàn",False),
        w("a comfortable flat","một căn hộ thoải mái",False), w("birds singing from my window","tiếng chim hót từ cửa sổ",False),
        w("show my poster to the class","trình bày áp phích trước lớp",False), w("clearly","rõ ràng",False),
        w("a terrible disaster","một thảm họa tệ hại",True), w("bored and uninterested","chán và không hứng thú",True), w("nervous and confused","lo lắng và bối rối",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 15 – My Park Visit / Present Continuous
# ══════════════════════════════════════════════════════════════════════════════

EASY_15 = dict(
    title="Write About My Park Day",
    stage="medium", min_words=25,
    model="The park is fun today. I am walking with my mum. My dad is jogging. A boy is running with his dog.",
    ins_en="Write about what people are doing in the park right now!",
    ins_vi="Viết về những gì mọi người đang làm trong công viên ngay lúc này!",
    prm_en="What is happening in the park? What are different people doing?",
    prm_vi="Chuyện gì đang xảy ra trong công viên? Mọi người đang làm gì?",
    kw=["fun","walking","mum","jogging","running","dog"],
    talk="Describe what you see happening in the park right now!",
    frames=[
        frame("The park is ___ today.", "fun"),
        frame("I am ___ with my mum.", "walking"),
        frame("My dad is ___.", "jogging"),
        frame("A boy is ___ with his dog.", "running"),
    ],
    words=[
        w("fun","thú vị",False), w("walking","đi bộ",False), w("jogging","chạy bộ",False), w("running","chạy",False),
        w("boring","chán",True), w("swimming","bơi lội",True), w("sleeping","đang ngủ",True),
    ],
)

ADV_15 = dict(
    title="Write About Your Park Visit",
    stage="medium", min_words=45,
    model="I am visiting the busy park near my school with my class today and everyone is doing something different. Some children are playing football on the grass while others are sitting under the trees and drawing pictures. A group of older people are doing morning exercises near the fountain, and they look very energetic and happy. Two little girls are feeding the ducks beside the small pond, and the ducks are splashing and quacking loudly. My teacher is standing at the entrance and taking photos of all of us because she wants to remember this special trip. I am sitting on a bench and writing in my notebook because I want to describe everything I see.",
    ins_en="Describe a lively park scene using present continuous for everyone!",
    ins_vi="Mô tả cảnh công viên sôi động bằng thì hiện tại tiếp diễn!",
    prm_en="What is everyone doing? Use is/are + -ing for each person or group!",
    prm_vi="Mọi người đang làm gì? Dùng is/are + -ing cho từng người hoặc nhóm!",
    kw=["fountain","energetic","splashing","quacking","entrance","bench","notebook"],
    talk="Describe the park scene — what is everyone doing right now?",
    frames=[
        frame("Some children are ___ while others are ___ and ___.", "playing football on the grass", "sitting under the trees", "drawing pictures"),
        frame("A group of older people are ___ near the fountain, and they look ___ and ___.", "doing morning exercises", "very energetic", "happy"),
        frame("Two little girls are ___ beside the pond, and the ducks are ___ and ___ loudly.", "feeding the ducks", "splashing", "quacking"),
        frame("My teacher is ___ because she wants to ___ this special trip.", "standing at the entrance and taking photos", "remember"),
        frame("I am ___ and ___ because I want to describe everything I see.", "sitting on a bench", "writing in my notebook"),
    ],
    words=[
        w("playing football on the grass","đá bóng trên bãi cỏ",False),
        w("sitting under the trees","ngồi dưới bóng cây",False), w("drawing pictures","vẽ tranh",False),
        w("doing morning exercises","tập thể dục buổi sáng",False), w("very energetic","rất tràn đầy năng lượng",False), w("happy","vui",False),
        w("feeding the ducks","cho vịt ăn",False), w("splashing","vẫy nước",False), w("quacking","kêu quạc quạc",False),
        w("standing at the entrance and taking photos","đứng ở cổng và chụp ảnh",False), w("remember","nhớ lại",False),
        w("sitting on a bench","ngồi trên ghế",False), w("writing in my notebook","viết vào cuốn sổ",False),
        w("sleeping on the bench","đang ngủ trên ghế",True), w("very bored and sad","rất chán và buồn",True), w("forget","quên",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 16 – My Favourite Sport / Present Continuous + Enthusiasm
# ══════════════════════════════════════════════════════════════════════════════

EASY_16 = dict(
    title="My Favourite Sport",
    stage="medium", min_words=25,
    model="I love football. I am kicking the ball. My team is running fast. We are scoring a goal!",
    ins_en="Write about your favourite sport!",
    ins_vi="Viết về môn thể thao yêu thích của bạn!",
    prm_en="What sport do you love? What are you doing? How does it feel?",
    prm_vi="Bạn yêu thích môn thể thao nào? Bạn đang làm gì? Cảm thấy thế nào?",
    kw=["football","kicking","ball","running","scoring","goal"],
    talk="Tell me about your favourite sport!",
    frames=[
        frame("I love ___.", "football"),
        frame("I am ___ the ball.", "kicking"),
        frame("My team is running ___.", "fast"),
        frame("We are scoring a ___!", "goal"),
    ],
    words=[
        w("football","bóng đá",False), w("kicking","đá",False), w("fast","nhanh",False), w("goal","bàn thắng",False),
        w("catching","bắt — không phải đá bóng",True), w("slowly","chậm rãi",True), w("point","điểm — không phải goal",True),
    ],
)

ADV_16 = dict(
    title="My Favourite Sport",
    stage="medium", min_words=45,
    model="My favourite sport is football and I have been playing it since I was five years old. Every Saturday morning, my team and I train on the field behind our school for two hours, and our coach pushes us to run faster and pass the ball more accurately. Playing football is physically demanding because we have to sprint, dribble, defend, and shoot, but I love every second of it. My favourite position is striker because I love the feeling of scoring a goal and hearing my teammates cheer and celebrate. Football has also taught me about teamwork, discipline, and never giving up even when the score is not in our favour. I dream of playing for a professional team one day and making my family proud.",
    ins_en="Write about your favourite sport with training, skills, and dreams!",
    ins_vi="Viết về môn thể thao yêu thích với tập luyện, kỹ năng và ước mơ!",
    prm_en="How long have you played? What is training like? What have you learned? What is your dream?",
    prm_vi="Bạn đã chơi bao lâu? Tập luyện như thế nào? Bạn học được gì? Ước mơ của bạn là gì?",
    kw=["training","coach","accurately","demanding","sprint","dribble","discipline","professional"],
    talk="Tell me everything about your favourite sport — from training to your biggest dream!",
    frames=[
        frame("Every Saturday, my team and I ___ for two hours and our coach pushes us to ___ and ___ more accurately.", "train on the field", "run faster", "pass the ball"),
        frame("Playing football is ___ because we have to ___, ___, defend, and shoot.", "physically demanding", "sprint", "dribble"),
        frame("My favourite position is ___ because I love the feeling of ___ and hearing my teammates ___.", "striker", "scoring a goal", "cheer"),
        frame("Football has taught me about ___, ___, and never ___ even when the score is not in our favour.", "teamwork", "discipline", "giving up"),
        frame("I dream of ___ one day and making my ___ proud.", "playing for a professional team", "family"),
    ],
    words=[
        w("train on the field","tập luyện trên sân",False), w("run faster","chạy nhanh hơn",False), w("pass the ball","chuyền bóng",False),
        w("physically demanding","đòi hỏi thể lực",False), w("sprint","chạy nước rút",False), w("dribble","dắt bóng",False),
        w("striker","tiền đạo",False), w("scoring a goal","ghi bàn thắng",False), w("cheer","cổ vũ",False),
        w("teamwork","tinh thần đồng đội",False), w("discipline","kỷ luật",False), w("giving up","bỏ cuộc",False),
        w("playing for a professional team","chơi cho đội chuyên nghiệp",False), w("family","gia đình",False),
        w("watching TV all day","xem ti vi cả ngày",True), w("physically easy","nhẹ nhàng về thể chất",True), w("quitting","bỏ cuộc sớm",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 17 – My Weather Day / Present Continuous + Weather
# ══════════════════════════════════════════════════════════════════════════════

EASY_17 = dict(
    title="My Weather Day",
    stage="medium", min_words=25,
    model="It is raining today. I am wearing my coat. I am carrying my umbrella. I still feel happy.",
    ins_en="Write about a rainy day and what you are doing!",
    ins_vi="Viết về một ngày mưa và những gì bạn đang làm!",
    prm_en="What is the weather like? What are you wearing? How do you feel?",
    prm_vi="Thời tiết thế nào? Bạn đang mặc gì? Cảm thấy thế nào?",
    kw=["raining","wearing","coat","umbrella","happy"],
    talk="Describe a rainy day — what are you wearing and how do you feel?",
    frames=[
        frame("It is ___ today.", "raining"),
        frame("I am wearing my ___.", "coat"),
        frame("I am carrying my ___.", "umbrella"),
        frame("I still feel ___.", "happy"),
    ],
    words=[
        w("raining","mưa",False), w("coat","áo khoác",False), w("umbrella","ô/dù",False), w("happy","vui",False),
        w("sunny","nắng — không phải hôm nay",True), w("sandals","dép — không phải mưa",True), w("sad","buồn",True),
    ],
)

ADV_17 = dict(
    title="My Weather Day",
    stage="medium", min_words=45,
    model="The weather today is extremely cold and rainy, so I have dressed in many layers to keep myself warm and dry. I am wearing a thick woollen jumper, a waterproof jacket, and my warmest boots because the temperature has dropped to only twelve degrees. I am also carrying a large umbrella because the rain is coming down very heavily and the wind is blowing it sideways. Despite the terrible weather, I am still going to school because I have an important test today that I have been preparing for all week. When I arrive at school, I will hang my wet jacket on the hook and change into my dry school shoes. I actually enjoy rainy days because the sound of rain on the roof makes me feel cosy and focused while I study.",
    ins_en="Describe a cold and rainy day in full detail — what you're wearing, doing, and feeling!",
    ins_vi="Mô tả chi tiết một ngày lạnh mưa — mặc gì, làm gì và cảm xúc!",
    prm_en="What is the weather like? What are you wearing and why? How does the weather make you feel?",
    prm_vi="Thời tiết thế nào? Mặc gì và tại sao? Thời tiết khiến bạn cảm thấy thế nào?",
    kw=["layers","woollen","waterproof","temperature","degrees","sideways","cosy","focused"],
    talk="Describe a cold and rainy day in full detail!",
    frames=[
        frame("I am wearing ___, ___, and ___ because the temperature has dropped to ___.", "a thick woollen jumper", "a waterproof jacket", "my warmest boots", "only twelve degrees"),
        frame("I am also carrying ___ because the rain is coming down ___ and the wind is ___.", "a large umbrella", "very heavily", "blowing it sideways"),
        frame("Despite the terrible weather, I am still going to school because I have ___ that I have been preparing for ___.", "an important test today", "all week"),
        frame("When I arrive, I will ___ and change into ___.", "hang my wet jacket on the hook", "my dry school shoes"),
        frame("I actually enjoy ___ because the sound of rain makes me feel ___ and ___ while I study.", "rainy days", "cosy", "focused"),
    ],
    words=[
        w("a thick woollen jumper","áo len dày",False), w("a waterproof jacket","áo khoác chống nước",False),
        w("my warmest boots","đôi bốt ấm nhất",False), w("only twelve degrees","chỉ mười hai độ",False),
        w("a large umbrella","chiếc ô lớn",False), w("very heavily","rất nặng/mạnh",False), w("blowing it sideways","thổi nghiêng",False),
        w("an important test today","bài kiểm tra quan trọng hôm nay",False), w("all week","cả tuần",False),
        w("hang my wet jacket on the hook","treo áo ướt lên móc",False), w("my dry school shoes","giày học khô",False),
        w("rainy days","những ngày mưa",False), w("cosy","ấm cúng",False), w("focused","tập trung",False),
        w("a light summer dress","váy hè nhẹ — sai mùa",True), w("very lightly","rất nhẹ — sai thời tiết",True), w("distracted","phân tâm",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 18 – My Live Report / Present Continuous Broadcast
# ══════════════════════════════════════════════════════════════════════════════

EASY_18 = dict(
    title="My Home News Report",
    stage="medium", min_words=25,
    model="Hello! This is live news from my home. I am sitting at my desk. My mum is cooking in the kitchen. My dad is reading a book.",
    ins_en="Write a live news report from your home!",
    ins_vi="Viết một bản tin trực tiếp từ nhà của bạn!",
    prm_en="What is happening at home right now? What is each person doing?",
    prm_vi="Chuyện gì đang xảy ra ở nhà lúc này? Mỗi người đang làm gì?",
    kw=["news","sitting","desk","mum","cooking","dad","reading"],
    talk="Report the news from your home right now!",
    frames=[
        frame("This is live ___ from my home.", "news"),
        frame("I am ___ at my desk.", "sitting"),
        frame("My mum is ___ in the kitchen.", "cooking"),
        frame("My dad is ___ a book.", "reading"),
    ],
    words=[
        w("news","tin tức",False), w("sitting","đang ngồi",False), w("cooking","đang nấu ăn",False), w("reading","đang đọc",False),
        w("old stories","tin cũ — sai",True), w("flying","đang bay",True), w("sleeping","đang ngủ — không phải đọc sách",True),
    ],
)

ADV_18 = dict(
    title="My Live Report",
    stage="medium", min_words=45,
    model="Good evening and welcome to a special live broadcast coming to you directly from my house at number twelve Pine Street! I am your reporter and I am standing in the living room right now, which is very busy this evening because my whole family is here. My mother is preparing dinner in the kitchen and the wonderful smell of soup and rice is drifting through the whole house. My father is sitting at the dining table and going through some work papers while my little sister is playing on the floor with her building blocks. My grandmother is sitting in her favourite armchair near the window and knitting a red scarf. Meanwhile, I am here reporting all of this important news and trying very hard not to eat all the soup before dinner is ready!",
    ins_en="Write a funny live news broadcast from inside your home using present continuous!",
    ins_vi="Viết bản tin trực tiếp hài hước từ trong nhà dùng thì hiện tại tiếp diễn!",
    prm_en="Where are you broadcasting from? What is each person doing right now?",
    prm_vi="Bạn đang phát sóng từ đâu? Mỗi người đang làm gì lúc này?",
    kw=["broadcast","reporter","drifting","dining table","building blocks","armchair","knitting","scarf"],
    talk="Give a live broadcast from inside your house — what is everyone doing?",
    frames=[
        frame("My mother is ___ in the kitchen and the wonderful smell of ___ is drifting through the house.", "preparing dinner", "soup and rice"),
        frame("My father is ___ and ___ while my little sister is ___.", "sitting at the dining table", "going through some work papers", "playing on the floor with her building blocks"),
        frame("My grandmother is ___ near the window and ___.", "sitting in her favourite armchair", "knitting a red scarf"),
        frame("Meanwhile, I am ___ and trying very hard not to ___ before dinner is ready!", "here reporting all of this", "eat all the soup"),
    ],
    words=[
        w("preparing dinner","đang chuẩn bị bữa tối",False), w("soup and rice","canh và cơm",False),
        w("sitting at the dining table","đang ngồi ở bàn ăn",False),
        w("going through some work papers","đang xem qua giấy tờ công việc",False),
        w("playing on the floor with her building blocks","đang chơi khối xây dựng trên sàn",False),
        w("sitting in her favourite armchair","đang ngồi trên ghế bành yêu thích",False),
        w("knitting a red scarf","đang đan một chiếc khăn đỏ",False),
        w("here reporting all of this","đang tường thuật tất cả điều này",False),
        w("eat all the soup","ăn hết canh",False),
        w("sleeping on the sofa","đang ngủ trên sofa",True), w("watching cartoons","đang xem hoạt hình",True), w("throwing food","ném thức ăn",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 19 – When I Was Small / Past Simple: was/were + looked
# ══════════════════════════════════════════════════════════════════════════════

EASY_19 = dict(
    title="When I Was Small",
    stage="medium-low", min_words=28,
    model="I was a baby in this photo. I was very small. My face was round. My eyes were big. I was a noisy baby!",
    ins_en="Write about when you were a baby!",
    ins_vi="Viết về khi bạn còn là em bé!",
    prm_en="What did you look like? What were you like as a baby?",
    prm_vi="Bạn trông thế nào? Bạn như thế nào khi còn nhỏ?",
    kw=["baby","small","round","big","noisy"],
    talk="Tell me what you were like when you were a baby!",
    frames=[
        frame("I was a ___ in this photo.", "baby"),
        frame("I was very ___.", "small"),
        frame("My face was ___.", "round"),
        frame("My eyes were ___.", "big"),
        frame("I was a ___ baby!", "noisy"),
    ],
    words=[
        w("baby","em bé",False), w("small","nhỏ",False),
        w("round","tròn",False), w("big","to",False), w("noisy","ồn ào",False),
        w("tall","cao — không phải baby",True), w("square","vuông",True), w("silent","im lặng",True),
    ],
)

ADV_19 = dict(
    title="When I Was Small",
    stage="medium-low", min_words=48,
    model="When I look at old photos from when I was a baby, I can see how much I have changed over the years. I was a very small and chubby baby with a round face, big dark eyes, and very little hair on my head. My mother says I was an extremely noisy baby because I cried all the time, especially at night, and the only thing that could make me stop was music. I could not walk or talk yet, but I could already smile and recognise the faces of the people I loved. According to my dad, I was always reaching for things I could not have, and I tried to climb out of my cot when I was only nine months old! Looking at those photos makes me laugh and feel grateful for how far I have come.",
    ins_en="Write about what you were like as a baby using was, were, and could!",
    ins_vi="Viết về lúc còn nhỏ dùng was, were và could!",
    prm_en="What did you look like? What were you like? What could or couldn't you do?",
    prm_vi="Bạn trông thế nào? Bạn như thế nào? Bạn có thể hoặc không thể làm gì?",
    kw=["chubby","extremely","recognise","reaching","cot","grateful","changed"],
    talk="Describe yourself as a baby — what did you look like and what were you like?",
    frames=[
        frame("I was a very ___ and ___ baby with a ___ face and ___.", "small", "chubby", "round", "big dark eyes"),
        frame("My mother says I was ___ because I cried all the time, and the only thing that could stop me was ___.", "an extremely noisy baby", "music"),
        frame("I could not ___ or ___ yet, but I could already ___ and ___ the faces of people I loved.", "walk", "talk", "smile", "recognise"),
        frame("According to my dad, I was always ___ and tried to ___ when I was only nine months old.", "reaching for things", "climb out of my cot"),
        frame("Looking at those photos makes me ___ and feel ___ for how far I have come.", "laugh", "grateful"),
    ],
    words=[
        w("small","nhỏ",False), w("chubby","mũm mĩm",False), w("round","tròn",False), w("big dark eyes","đôi mắt to đen",False),
        w("an extremely noisy baby","một em bé rất ồn ào",False), w("music","âm nhạc",False),
        w("walk","đi bộ",False), w("talk","nói chuyện",False), w("smile","mỉm cười",False), w("recognise","nhận ra",False),
        w("reaching for things","vươn tay lấy đồ vật",False), w("climb out of my cot","trèo ra khỏi nôi",False),
        w("laugh","cười",False), w("grateful","biết ơn",False),
        w("very tall","rất cao — sai với baby",True), w("completely silent","hoàn toàn im lặng",True), w("ashamed","xấu hổ",True),
    ],
)

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 20 – My Neighbourhood / Past: was/were + there was/were
# ══════════════════════════════════════════════════════════════════════════════

EASY_20 = dict(
    title="My Neighbourhood",
    stage="medium-low", min_words=28,
    model="I live near a river. There was an old market near my house. There were big trees on the road. The neighbourhood was quiet and green.",
    ins_en="Write about your neighbourhood — now and in the past!",
    ins_vi="Viết về khu phố của bạn — hiện tại và trong quá khứ!",
    prm_en="What is near your house? What was there before? How was it different?",
    prm_vi="Gần nhà bạn có gì? Trước đây có gì? Nó khác nhau như thế nào?",
    kw=["river","market","trees","road","quiet","green"],
    talk="Describe your neighbourhood — past and present!",
    frames=[
        frame("I live near a ___.", "river"),
        frame("There was an old ___ near my house.", "market"),
        frame("There were big ___ on the road.", "trees"),
        frame("The neighbourhood was ___ and ___.", "quiet", "green"),
    ],
    words=[
        w("river","sông",False), w("market","chợ",False), w("trees","cây",False),
        w("quiet","yên tĩnh",False), w("green","xanh mát",False),
        w("mountain","núi",True), w("factory","nhà máy",True), w("noisy","ồn ào",True),
    ],
)

ADV_20 = dict(
    title="The Old Town",
    stage="medium-low", min_words=48,
    model="My neighbourhood has changed a great deal over the past ten years, and sometimes I find it hard to recognise the streets I grew up on. When I was young, there was a small and lively market near the river where local people came every morning to buy fresh vegetables, fish, and fruit. There were tall old trees lining both sides of the main road, and their branches formed a beautiful green canopy that kept everything cool and shady. There was also a wooden bridge over the river that children loved to run across and look down at the water below. However, most of those old trees were cut down to make way for a new road, and the wooden bridge was replaced by a wider concrete one. The market was moved to a large indoor centre further away, and now our street feels very different. I miss the way the old neighbourhood looked and felt.",
    ins_en="Write about how your neighbourhood has changed over time using was, were, and however!",
    ins_vi="Viết về sự thay đổi của khu phố theo thời gian dùng was, were và however!",
    prm_en="What was your neighbourhood like before? What has changed? How do you feel about it?",
    prm_vi="Khu phố trước đây thế nào? Điều gì đã thay đổi? Bạn cảm thấy thế nào về điều đó?",
    kw=["recognise","lively","canopy","shady","concrete","replaced","indoor","miss"],
    talk="Describe how your neighbourhood has changed — past vs present!",
    frames=[
        frame("There was ___ near the river where people came to buy ___, ___, and ___.", "a small and lively market", "fresh vegetables", "fish", "fruit"),
        frame("There were ___ lining the road, and their branches formed ___ that kept everything ___.", "tall old trees", "a beautiful green canopy", "cool and shady"),
        frame("There was also ___ over the river that children loved to ___ and look at the water below.", "a wooden bridge", "run across"),
        frame("Most of those old trees were ___ to make way for ___, and the wooden bridge was replaced by ___.", "cut down", "a new road", "a wider concrete one"),
        frame("The market was ___ to a large indoor centre, and now our street feels ___.", "moved", "very different"),
    ],
    words=[
        w("a small and lively market","một khu chợ nhỏ và sôi động",False),
        w("fresh vegetables","rau tươi",False), w("fish","cá",False), w("fruit","trái cây",False),
        w("tall old trees","những cây cổ thụ cao",False), w("a beautiful green canopy","một tán cây xanh đẹp",False), w("cool and shady","mát mẻ và bóng râm",False),
        w("a wooden bridge","cây cầu gỗ",False), w("run across","chạy qua",False),
        w("cut down","bị chặt hạ",False), w("a new road","một con đường mới",False), w("a wider concrete one","một cái rộng hơn bằng bê tông",False),
        w("moved","di dời",False), w("very different","rất khác biệt",False),
        w("a new supermarket","siêu thị mới — không liên quan",True), w("unchanged","không thay đổi",True), w("exactly the same","y hệt như cũ",True),
    ],
)


# ══════════════════════════════════════════════════════════════════════════════
# RUN
# ══════════════════════════════════════════════════════════════════════════════

WEEKS = {
    11: (EASY_11, ADV_11),
    12: (EASY_12, ADV_12),
    13: (EASY_13, ADV_13),
    14: (EASY_14, ADV_14),
    15: (EASY_15, ADV_15),
    16: (EASY_16, ADV_16),
    17: (EASY_17, ADV_17),
    18: (EASY_18, ADV_18),
    19: (EASY_19, ADV_19),
    20: (EASY_20, ADV_20),
}

if __name__ == '__main__':
    for week_num, (easy, adv) in WEEKS.items():
        print(f"W{week_num:02d}:")
        write_js(EASY_BASE, week_num, easy)
        write_js(ADV_BASE,  week_num, adv)
    print("\n✅ W11–W20 done.")
