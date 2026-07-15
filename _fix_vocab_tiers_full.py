"""
Fix vocab_tiers for W29-W36 to exactly match W28 golden standard.

W28 structure (18 DICTS, ZERO strings):
  [0-7]  8 story word dicts  (full Word/Vietnamese/Collocation/Memory Trick)
  [8-15] 8 Tier2 Cambridge preview word dicts (Memory Trick="—", Collocation=example sentence)
  [16]   grammar dict: each field = one verb conjugation pair  e.g. {"Word":"run→ran", "Vietnamese":"sleep→slept", ...}
  [17]   grammar dict: negative/question forms of the same verbs
"""
import json, os

BASE = os.path.dirname(os.path.abspath(__file__))

# ─────────────────────────────────────────────────────────────────────────────
# COMPLETE vocab_tiers for each week  (18 dicts each)
# ─────────────────────────────────────────────────────────────────────────────

VOCAB = {

# ── W29  Adventures & Travel  (go→went, come→came, run→ran, fly→flew) ────────
29: [
  # STORY WORDS  [0-7]
  {"Word":"went","Vietnamese":"đã đi","Key Collocation(s)":"went on a trip / went to the beach","Memory Trick":"W-E-N-T: We Enjoy New Trips"},
  {"Word":"came","Vietnamese":"đã đến","Key Collocation(s)":"came back home / came to school","Memory Trick":"C-A-M-E: Change O to A → COME→CAME"},
  {"Word":"ran","Vietnamese":"đã chạy","Key Collocation(s)":"ran fast / ran to the finish","Memory Trick":"R-A-N: Change U to A → RUN→RAN"},
  {"Word":"flew","Vietnamese":"đã bay","Key Collocation(s)":"flew in an airplane / flew over mountains","Memory Trick":"F-L-E-W: Change Y to EW → FLY→FLEW"},
  {"Word":"trip","Vietnamese":"chuyến đi","Key Collocation(s)":"go on a trip / take a trip","Memory Trick":"T-R-I-P: Travel Requires Incredible Planning"},
  {"Word":"beach","Vietnamese":"bãi biển","Key Collocation(s)":"went to the beach / played on the beach","Memory Trick":"B-E-A-C-H: Best Escapes Are Cool Here"},
  {"Word":"mountain","Vietnamese":"ngọn núi","Key Collocation(s)":"climbed a mountain / went up the mountain","Memory Trick":"M-O-U-N-T: Many Ounces Under Nearby Trees"},
  {"Word":"airplane","Vietnamese":"máy bay","Key Collocation(s)":"flew in an airplane / took an airplane","Memory Trick":"AIR + PLANE: It flies through the AIR like a PLANE"},
  # TIER 2 CAMBRIDGE PREVIEW WORDS  [8-15]
  {"Word":"holiday","Vietnamese":"kỳ nghỉ","Key Collocation(s)":"We went on a holiday to the mountains.","Memory Trick":"—"},
  {"Word":"adventure","Vietnamese":"cuộc phiêu lưu","Key Collocation(s)":"Max went on an amazing adventure.","Memory Trick":"—"},
  {"Word":"map","Vietnamese":"bản đồ","Key Collocation(s)":"She used a map to find the way.","Memory Trick":"—"},
  {"Word":"tent","Vietnamese":"lều trại","Key Collocation(s)":"They slept in a tent under the stars.","Memory Trick":"—"},
  {"Word":"bridge","Vietnamese":"cây cầu","Key Collocation(s)":"We ran across the bridge.","Memory Trick":"—"},
  {"Word":"river","Vietnamese":"con sông","Key Collocation(s)":"Luna swam in the cool river.","Memory Trick":"—"},
  {"Word":"village","Vietnamese":"ngôi làng","Key Collocation(s)":"They came to a small village in the hills.","Memory Trick":"—"},
  {"Word":"guide","Vietnamese":"người hướng dẫn","Key Collocation(s)":"The guide showed us the mountain path.","Memory Trick":"—"},
  # GRAMMAR DICT ROWS  [16-17]
  {"Word":"go → went","Vietnamese":"come → came","Key Collocation(s)":"run → ran","Memory Trick":"fly → flew"},
  {"Word":"I didn't go","Vietnamese":"She didn't come","Key Collocation(s)":"Did you run?","Memory Trick":"Did they fly? (question = Did + subject + base form)"},
],

# ── W30  Picnic Day  (eat→ate, drink→drank, have→had) ───────────────────────
30: [
  # STORY WORDS  [0-7]
  {"Word":"ate","Vietnamese":"ăn (QK)","Key Collocation(s)":"ate a sandwich / ate at the picnic","Memory Trick":"EAT → ATE: swap the A and T, drop the E"},
  {"Word":"drank","Vietnamese":"uống (QK)","Key Collocation(s)":"drank juice / drank cold water","Memory Trick":"DRINK → DRANK: change I to A"},
  {"Word":"had","Vietnamese":"có / ăn (QK)","Key Collocation(s)":"had a picnic / had breakfast","Memory Trick":"HAVE → HAD: drop the VE, add D"},
  {"Word":"picnic","Vietnamese":"dã ngoại","Key Collocation(s)":"go on a picnic / have a picnic","Memory Trick":"P-I-C-N-I-C: People In Country, Nature Is Cool"},
  {"Word":"sandwich","Vietnamese":"bánh mì kẹp","Key Collocation(s)":"eat a sandwich / make a sandwich","Memory Trick":"S-A-N-D: Something Appetising, Nutritious, Delicious"},
  {"Word":"juice","Vietnamese":"nước ép","Key Collocation(s)":"drink juice / a glass of juice","Memory Trick":"J-U-I-C-E: Just Use Ice, Cold Energy"},
  {"Word":"fruit","Vietnamese":"trái cây","Key Collocation(s)":"eat fresh fruit / a piece of fruit","Memory Trick":"F-R-U-I-T: Fresh, Round, Unique, Incredible Taste"},
  {"Word":"hungry","Vietnamese":"đói bụng","Key Collocation(s)":"felt hungry / were very hungry","Memory Trick":"H-U-N-G-R-Y: Having Unusual Need, Gut Rumbles — Yikes!"},
  # TIER 2 CAMBRIDGE PREVIEW WORDS  [8-15]
  {"Word":"thirsty","Vietnamese":"khát nước","Key Collocation(s)":"They felt thirsty after running.","Memory Trick":"—"},
  {"Word":"delicious","Vietnamese":"ngon miệng","Key Collocation(s)":"The cake was delicious.","Memory Trick":"—"},
  {"Word":"basket","Vietnamese":"cái giỏ","Key Collocation(s)":"She carried a basket full of fruit.","Memory Trick":"—"},
  {"Word":"blanket","Vietnamese":"tấm chăn / khăn trải","Key Collocation(s)":"They sat on a blanket in the park.","Memory Trick":"—"},
  {"Word":"snack","Vietnamese":"đồ ăn vặt","Key Collocation(s)":"He ate a snack between lessons.","Memory Trick":"—"},
  {"Word":"dessert","Vietnamese":"tráng miệng","Key Collocation(s)":"We had ice cream for dessert.","Memory Trick":"—"},
  {"Word":"meal","Vietnamese":"bữa ăn","Key Collocation(s)":"It was the best meal we had all week.","Memory Trick":"—"},
  {"Word":"lunchbox","Vietnamese":"hộp cơm / bento","Key Collocation(s)":"Max packed his lunchbox for the picnic.","Memory Trick":"—"},
  # GRAMMAR DICT ROWS  [16-17]
  {"Word":"eat → ate","Vietnamese":"drink → drank","Key Collocation(s)":"have → had","Memory Trick":"buy → bought"},
  {"Word":"I didn't eat","Vietnamese":"She didn't drink","Key Collocation(s)":"Did you have?","Memory Trick":"What did he eat? (question = Did + subject + base form)"},
],

# ── W31  Forest Senses  (see→saw, hear→heard, feel→felt, smell→smelt) ────────
31: [
  # STORY WORDS  [0-7]
  {"Word":"saw","Vietnamese":"đã thấy","Key Collocation(s)":"saw a bird / saw the forest","Memory Trick":"S-A-W: SEE + change E to A → saw"},
  {"Word":"heard","Vietnamese":"đã nghe","Key Collocation(s)":"heard a sound / heard the wind","Memory Trick":"H-E-A-R-D: HEAR + add D at the end"},
  {"Word":"felt","Vietnamese":"đã cảm thấy","Key Collocation(s)":"felt cold / felt a breeze","Memory Trick":"F-E-L-T: FEEL → drop one E, add T"},
  {"Word":"smelt","Vietnamese":"đã ngửi thấy","Key Collocation(s)":"smelt flowers / smelt something sweet","Memory Trick":"S-M-E-L-T: SMELL → drop one L, add T"},
  {"Word":"forest","Vietnamese":"khu rừng","Key Collocation(s)":"walked in the forest / a deep forest","Memory Trick":"F-O-R-E-S-T: Full Of Really Exciting Secret Trees"},
  {"Word":"path","Vietnamese":"con đường mòn","Key Collocation(s)":"walked along the path / followed the path","Memory Trick":"P-A-T-H: People Always Travel Here"},
  {"Word":"shadow","Vietnamese":"cái bóng / bóng tối","Key Collocation(s)":"saw a shadow / a tall shadow","Memory Trick":"SHADOW: Something Has A Dark Outline Waiting"},
  {"Word":"breeze","Vietnamese":"làn gió nhẹ","Key Collocation(s)":"felt a cool breeze / a gentle breeze","Memory Trick":"B-R-E-E-Z-E: Breezes Refresh Everyone, Zapping Energy"},
  # TIER 2 CAMBRIDGE PREVIEW WORDS  [8-15]
  {"Word":"branch","Vietnamese":"cành cây","Key Collocation(s)":"A bird sat on the branch.","Memory Trick":"—"},
  {"Word":"nature","Vietnamese":"thiên nhiên","Key Collocation(s)":"We walked in nature all morning.","Memory Trick":"—"},
  {"Word":"rustling","Vietnamese":"tiếng xào xạc","Key Collocation(s)":"She heard a rustling sound in the bushes.","Memory Trick":"—"},
  {"Word":"leaf","Vietnamese":"chiếc lá","Key Collocation(s)":"He picked up a red leaf from the ground.","Memory Trick":"—"},
  {"Word":"mushroom","Vietnamese":"cây nấm","Key Collocation(s)":"They found a mushroom near the path.","Memory Trick":"—"},
  {"Word":"pond","Vietnamese":"cái ao","Key Collocation(s)":"We saw frogs sitting by the pond.","Memory Trick":"—"},
  {"Word":"stream","Vietnamese":"con suối","Key Collocation(s)":"Luna heard the stream flowing through the forest.","Memory Trick":"—"},
  {"Word":"cave","Vietnamese":"hang động","Key Collocation(s)":"The fox ran into a dark cave.","Memory Trick":"—"},
  # GRAMMAR DICT ROWS  [16-17]
  {"Word":"see → saw","Vietnamese":"hear → heard","Key Collocation(s)":"feel → felt","Memory Trick":"smell → smelt"},
  {"Word":"I didn't see","Vietnamese":"She didn't hear","Key Collocation(s)":"Did you feel?","Memory Trick":"What did she smell? (question = Did + subject + base form)"},
],

# ── W32  Chores & Routines  (do→did, make→made, have→had, take→took) ─────────
32: [
  # STORY WORDS  [0-7]
  {"Word":"did","Vietnamese":"làm (QK)","Key Collocation(s)":"did homework / did the chores","Memory Trick":"DO → DID: add ID — I Did it!"},
  {"Word":"made","Vietnamese":"làm / tạo (QK)","Key Collocation(s)":"made the bed / made breakfast","Memory Trick":"MAKE → MADE: change K to D"},
  {"Word":"had","Vietnamese":"có / ăn (QK)","Key Collocation(s)":"had a shower / had breakfast","Memory Trick":"HAVE → HAD: change VE to D"},
  {"Word":"took","Vietnamese":"lấy / chụp (QK)","Key Collocation(s)":"took a photo / took a shower","Memory Trick":"TAKE → TOOK: change A to OO"},
  {"Word":"homework","Vietnamese":"bài tập về nhà","Key Collocation(s)":"do homework / finish homework","Memory Trick":"HOME + WORK: work you do at HOME"},
  {"Word":"chores","Vietnamese":"việc nhà","Key Collocation(s)":"do chores / household chores","Memory Trick":"C-H-O-R-E-S: Children Helping Others, Rooms Eventually Sparkle"},
  {"Word":"mess","Vietnamese":"bừa bộn","Key Collocation(s)":"make a mess / clean up the mess","Memory Trick":"M-E-S-S: Many Extra Silly Spots"},
  {"Word":"breakfast","Vietnamese":"bữa sáng","Key Collocation(s)":"have breakfast / make breakfast","Memory Trick":"BREAK + FAST: breaking the overnight fast (no eating while you sleep!)"},
  # TIER 2 CAMBRIDGE PREVIEW WORDS  [8-15]
  {"Word":"photo","Vietnamese":"tấm ảnh","Key Collocation(s)":"He took a photo of the class.","Memory Trick":"—"},
  {"Word":"shower","Vietnamese":"tắm (vòi hoa sen)","Key Collocation(s)":"She had a shower before school.","Memory Trick":"—"},
  {"Word":"shelf","Vietnamese":"cái kệ","Key Collocation(s)":"Max put the books on the shelf.","Memory Trick":"—"},
  {"Word":"towel","Vietnamese":"khăn tắm","Key Collocation(s)":"She dried her hands with a towel.","Memory Trick":"—"},
  {"Word":"mirror","Vietnamese":"gương","Key Collocation(s)":"He looked in the mirror and smiled.","Memory Trick":"—"},
  {"Word":"plate","Vietnamese":"cái đĩa","Key Collocation(s)":"Luna washed the plates after dinner.","Memory Trick":"—"},
  {"Word":"cup","Vietnamese":"tách / ly","Key Collocation(s)":"He left a dirty cup on the table.","Memory Trick":"—"},
  {"Word":"tidy","Vietnamese":"gọn gàng / dọn dẹp","Key Collocation(s)":"She tidied her room before bed.","Memory Trick":"—"},
  # GRAMMAR DICT ROWS  [16-17]
  {"Word":"do → did","Vietnamese":"make → made","Key Collocation(s)":"have → had","Memory Trick":"take → took"},
  {"Word":"I didn't do","Vietnamese":"She didn't make","Key Collocation(s)":"Did you have?","Memory Trick":"What did he take? (question = Did + subject + base form)"},
],

# ── W33  Accidents & Safety  (break→broke, fall→fell, lose→lost, find→found) ─
33: [
  # STORY WORDS  [0-7]
  {"Word":"broke","Vietnamese":"làm vỡ (QK)","Key Collocation(s)":"broke a glass / broke the toy","Memory Trick":"BREAK → BROKE: change EA to O"},
  {"Word":"fell","Vietnamese":"ngã / rơi (QK)","Key Collocation(s)":"fell down / fell off the chair","Memory Trick":"FALL → FELL: change A to E"},
  {"Word":"lost","Vietnamese":"làm mất (QK)","Key Collocation(s)":"lost my bag / lost the key","Memory Trick":"LOSE → LOST: change SE to ST"},
  {"Word":"found","Vietnamese":"tìm thấy (QK)","Key Collocation(s)":"found the key / found a clue","Memory Trick":"FIND → FOUND: change I to OU"},
  {"Word":"accident","Vietnamese":"tai nạn","Key Collocation(s)":"have an accident / a small accident","Memory Trick":"A-C-C-I-D-E-N-T: A Clumsy Cat Isn't Doing Everything Neatly Today"},
  {"Word":"mistake","Vietnamese":"lỗi lầm","Key Collocation(s)":"make a mistake / learn from a mistake","Memory Trick":"M-I-S-T-A-K-E: Many Intelligent Students Try And Keep Evolving"},
  {"Word":"careful","Vietnamese":"cẩn thận","Key Collocation(s)":"be careful / careful with scissors","Memory Trick":"CARE + FUL = full of care!"},
  {"Word":"clumsy","Vietnamese":"vụng về","Key Collocation(s)":"a clumsy day / clumsy hands","Memory Trick":"C-L-U-M-S-Y: Cats Like Us Make Such Yowls"},
  # TIER 2 CAMBRIDGE PREVIEW WORDS  [8-15]
  {"Word":"fix","Vietnamese":"sửa chữa","Key Collocation(s)":"He fixed the broken toy.","Memory Trick":"—"},
  {"Word":"sorry","Vietnamese":"xin lỗi","Key Collocation(s)":"She said sorry for the accident.","Memory Trick":"—"},
  {"Word":"nurse","Vietnamese":"y tá","Key Collocation(s)":"The nurse put a bandage on his knee.","Memory Trick":"—"},
  {"Word":"bandage","Vietnamese":"băng gạc","Key Collocation(s)":"She wrapped a bandage around her arm.","Memory Trick":"—"},
  {"Word":"helmet","Vietnamese":"mũ bảo hiểm","Key Collocation(s)":"Always wear a helmet when you ride a bike.","Memory Trick":"—"},
  {"Word":"pavement","Vietnamese":"vỉa hè","Key Collocation(s)":"He slipped on the wet pavement.","Memory Trick":"—"},
  {"Word":"hospital","Vietnamese":"bệnh viện","Key Collocation(s)":"They took her to hospital after she fell.","Memory Trick":"—"},
  {"Word":"ladder","Vietnamese":"cái thang","Key Collocation(s)":"Be careful on the ladder — it is slippery!","Memory Trick":"—"},
  # GRAMMAR DICT ROWS  [16-17]
  {"Word":"break → broke","Vietnamese":"fall → fell","Key Collocation(s)":"lose → lost","Memory Trick":"find → found"},
  {"Word":"I didn't break","Vietnamese":"She didn't fall","Key Collocation(s)":"Did you lose?","Memory Trick":"Where did she find it? (question = Did + subject + base form)"},
],

# ── W34  The Lion and the Mouse  (run→ran, win→won, catch→caught, say→said) ──
34: [
  # STORY WORDS  [0-7]
  {"Word":"ran","Vietnamese":"chạy (QK)","Key Collocation(s)":"ran away / ran towards","Memory Trick":"RUN → RAN: change U to A"},
  {"Word":"woke","Vietnamese":"thức dậy (QK)","Key Collocation(s)":"woke up / woke the lion","Memory Trick":"WAKE → WOKE: change A to O"},
  {"Word":"said","Vietnamese":"nói (QK)","Key Collocation(s)":"said thank you / said sorry","Memory Trick":"SAY → SAID: change Y to ID"},
  {"Word":"came","Vietnamese":"đến (QK)","Key Collocation(s)":"came to help / came back","Memory Trick":"COME → CAME: change O to A"},
  {"Word":"caught","Vietnamese":"bắt (QK)","Key Collocation(s)":"caught in a net / caught the mouse","Memory Trick":"CATCH → CAUGHT: -ATCH to -AUGHT (silent GH)"},
  {"Word":"lion","Vietnamese":"sư tử","Key Collocation(s)":"a roaring lion / the lion ran","Memory Trick":"L-I-O-N: Large, Impressive, Outstanding, Noble"},
  {"Word":"mouse","Vietnamese":"con chuột","Key Collocation(s)":"a tiny mouse / the brave mouse","Memory Trick":"M-O-U-S-E: Many Old Umbrellas Sheltering Everybody"},
  {"Word":"net","Vietnamese":"cái lưới","Key Collocation(s)":"trapped in a net / cut the net","Memory Trick":"N-E-T: Never Escape Traps — unless you're a mouse!"},
  # TIER 2 CAMBRIDGE PREVIEW WORDS  [8-15]
  {"Word":"fable","Vietnamese":"truyện ngụ ngôn","Key Collocation(s)":"This story is a famous fable.","Memory Trick":"—"},
  {"Word":"hunter","Vietnamese":"thợ săn","Key Collocation(s)":"The hunter set a trap in the forest.","Memory Trick":"—"},
  {"Word":"strength","Vietnamese":"sức mạnh","Key Collocation(s)":"The lion used his strength to struggle.","Memory Trick":"—"},
  {"Word":"paw","Vietnamese":"bàn chân thú / móng vuốt","Key Collocation(s)":"The lion raised his paw to catch the mouse.","Memory Trick":"—"},
  {"Word":"roar","Vietnamese":"tiếng gầm","Key Collocation(s)":"The lion gave a loud roar.","Memory Trick":"—"},
  {"Word":"thread","Vietnamese":"sợi chỉ / sợi dây","Key Collocation(s)":"The mouse gnawed through each thread of the net.","Memory Trick":"—"},
  {"Word":"freedom","Vietnamese":"sự tự do","Key Collocation(s)":"At last, the lion had his freedom.","Memory Trick":"—"},
  {"Word":"trap","Vietnamese":"cái bẫy","Key Collocation(s)":"The hunters set a trap near the river.","Memory Trick":"—"},
  # GRAMMAR DICT ROWS  [16-17]
  {"Word":"run → ran","Vietnamese":"win → won","Key Collocation(s)":"catch → caught","Memory Trick":"say → said"},
  {"Word":"I didn't run","Vietnamese":"He didn't win","Key Collocation(s)":"Did they catch?","Memory Trick":"What did she say? (question = Did + subject + base form)"},
],

# ── W35  My Best Day  (go→went, see→saw, feel→felt, make→made, give→gave) ────
35: [
  # STORY WORDS  [0-7]
  {"Word":"went","Vietnamese":"đã đi","Key Collocation(s)":"went to the beach / went to the zoo","Memory Trick":"W-E-N-T: We Enjoy New Trips"},
  {"Word":"saw","Vietnamese":"đã thấy","Key Collocation(s)":"saw a giraffe / saw the coral reef","Memory Trick":"S-A-W: SEE → change E to A"},
  {"Word":"felt","Vietnamese":"đã cảm thấy","Key Collocation(s)":"felt happy / felt the breeze","Memory Trick":"F-E-L-T: FEEL → drop one E, add T"},
  {"Word":"made","Vietnamese":"đã làm / tạo ra","Key Collocation(s)":"made a sandcastle / made a kite","Memory Trick":"M-A-D-E: My Art Displays Effort"},
  {"Word":"gave","Vietnamese":"đã cho / tặng","Key Collocation(s)":"gave a gift / gave flowers","Memory Trick":"G-A-V-E: GIVE → change I to A"},
  {"Word":"beach","Vietnamese":"bãi biển","Key Collocation(s)":"played at the beach / went to the beach","Memory Trick":"B-E-A-C-H: Best Escapes Are Cool Here"},
  {"Word":"zoo","Vietnamese":"vườn thú","Key Collocation(s)":"visited the zoo / animals at the zoo","Memory Trick":"Z-O-O: Zebras, Ostriches, Orangutans!"},
  {"Word":"park","Vietnamese":"công viên","Key Collocation(s)":"ran in the park / sat in the park","Memory Trick":"P-A-R-K: Plants And Recreation, Kids love it!"},
  # TIER 2 CAMBRIDGE PREVIEW WORDS  [8-15]
  {"Word":"kite","Vietnamese":"cái diều","Key Collocation(s)":"Max flew a kite in the park.","Memory Trick":"—"},
  {"Word":"coral","Vietnamese":"san hô","Key Collocation(s)":"She saw colourful coral under the sea.","Memory Trick":"—"},
  {"Word":"shell","Vietnamese":"vỏ sò / mai","Key Collocation(s)":"He found a pretty shell on the beach.","Memory Trick":"—"},
  {"Word":"giraffe","Vietnamese":"hươu cao cổ","Key Collocation(s)":"We saw a tall giraffe at the zoo.","Memory Trick":"—"},
  {"Word":"penguin","Vietnamese":"chim cánh cụt","Key Collocation(s)":"She felt excited when she saw the penguins.","Memory Trick":"—"},
  {"Word":"dolphin","Vietnamese":"cá heo","Key Collocation(s)":"They saw a dolphin jump out of the water.","Memory Trick":"—"},
  {"Word":"sandcastle","Vietnamese":"lâu đài cát","Key Collocation(s)":"He made a big sandcastle on the beach.","Memory Trick":"—"},
  {"Word":"bucket","Vietnamese":"cái xô","Key Collocation(s)":"She used a bucket and spade to dig.","Memory Trick":"—"},
  # GRAMMAR DICT ROWS  [16-17]
  {"Word":"go → went","Vietnamese":"see → saw","Key Collocation(s)":"feel → felt","Memory Trick":"make → made"},
  {"Word":"give → gave","Vietnamese":"I didn't go / see / feel","Key Collocation(s)":"She didn't make / give","Memory Trick":"Did you go? / What did you see? (Did + subject + base form)"},
],

# ── W36  Case Closed! Story Review  ─────────────────────────────────────────
36: [
  # STORY WORDS  [0-7]
  {"Word":"went","Vietnamese":"đã đi","Key Collocation(s)":"went to the forest / went on an adventure","Memory Trick":"W-E-N-T: We Enjoy New Trips"},
  {"Word":"saw","Vietnamese":"đã thấy","Key Collocation(s)":"saw the lion / saw beautiful coral","Memory Trick":"S-A-W: SEE → change E to A"},
  {"Word":"lost","Vietnamese":"đã đánh mất","Key Collocation(s)":"lost the key / got lost in the forest","Memory Trick":"L-O-S-T: Look Out, Something's Taken away"},
  {"Word":"found","Vietnamese":"đã tìm thấy","Key Collocation(s)":"found the clue / found a path home","Memory Trick":"F-O-U-N-D: Finally Obtained, Unexpected Nice Discovery"},
  {"Word":"felt","Vietnamese":"đã cảm thấy","Key Collocation(s)":"felt nervous / felt proud at the end","Memory Trick":"F-E-L-T: FEEL → drop one E, add T"},
  {"Word":"adventure","Vietnamese":"cuộc phiêu lưu","Key Collocation(s)":"went on an adventure / a thrilling adventure","Memory Trick":"A-D-V-E-N-T-U-R-E: A Daring Voyage, Exciting, Never Too Usual, Rather Exciting"},
  {"Word":"story","Vietnamese":"câu chuyện","Key Collocation(s)":"told a story / write a story","Memory Trick":"S-T-O-R-Y: Something Told Or Read, Yet exciting!"},
  {"Word":"page","Vietnamese":"trang giấy","Key Collocation(s)":"turn the page / read every page","Memory Trick":"P-A-G-E: Paper Always Gives Excitement"},
  # TIER 2 CAMBRIDGE PREVIEW WORDS  [8-15]
  {"Word":"narrator","Vietnamese":"người kể chuyện","Key Collocation(s)":"The narrator told the whole story.","Memory Trick":"—"},
  {"Word":"audience","Vietnamese":"khán giả / người nghe","Key Collocation(s)":"The audience listened carefully.","Memory Trick":"—"},
  {"Word":"sequence","Vietnamese":"thứ tự / trình tự","Key Collocation(s)":"She used sequence words like First and Then.","Memory Trick":"—"},
  {"Word":"chapter","Vietnamese":"chương sách","Key Collocation(s)":"They read the first chapter together.","Memory Trick":"—"},
  {"Word":"clue","Vietnamese":"manh mối / gợi ý","Key Collocation(s)":"Max found a clue under the tree.","Memory Trick":"—"},
  {"Word":"cover","Vietnamese":"bìa sách","Key Collocation(s)":"The cover of the book showed a lion.","Memory Trick":"—"},
  {"Word":"title","Vietnamese":"tên sách / tiêu đề","Key Collocation(s)":"The title of the story was 'Case Closed'.","Memory Trick":"—"},
  {"Word":"author","Vietnamese":"tác giả","Key Collocation(s)":"The author wrote the story in two days.","Memory Trick":"—"},
  # GRAMMAR DICT ROWS  [16-17]
  {"Word":"went / saw / heard / ran","Vietnamese":"felt / lost / found / gave","Key Collocation(s)":"was / were (past of 'be')","Memory Trick":"didn't + BASE FORM = any past negative"},
  {"Word":"First… / Then…","Vietnamese":"Next… / After that…","Key Collocation(s)":"Finally…","Memory Trick":"Sequence words connect story events in order"},
],

}


# ─────────────────────────────────────────────────────────────────────────────
# APPLY FIXES
# ─────────────────────────────────────────────────────────────────────────────
def apply(week_num):
    new_vocab = VOCAB[week_num]
    assert len(new_vocab) == 18, f"W{week_num}: expected 18 items, got {len(new_vocab)}"
    assert all(isinstance(v, dict) for v in new_vocab), f"W{week_num}: all items must be dicts"

    for path_rel in [
        f'mcp-server/data/lessons/W{week_num}.json',
        f'public/data/lessons/W{week_num}.json',
    ]:
        path = os.path.join(BASE, path_rel)
        w = json.load(open(path, encoding='utf-8'))
        old = len(w.get('vocab_tiers', []))
        w['vocab_tiers'] = new_vocab
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(w, f, ensure_ascii=False, indent=2)
        print(f'  {path_rel}: vocab_tiers {old} → 18 ✓')


print('=' * 60)
print('Fixing vocab_tiers W29-W36 to match W28 golden standard')
print('Target: 18 dicts (8 story + 8 Tier2 Cambridge + 2 grammar dicts)')
print('=' * 60)

for n in range(29, 37):
    print(f'\nW{n}:')
    apply(n)

# Update lessonPlans.json
print('\nUpdating public/data/lessonPlans.json...')
plans_path = os.path.join(BASE, 'public/data/lessonPlans.json')
lp = json.load(open(plans_path, encoding='utf-8'))
for n in range(29, 37):
    lp[str(n)] = json.load(open(os.path.join(BASE, f'public/data/lessons/W{n}.json'), encoding='utf-8'))
    print(f'  key={n} updated')
with open(plans_path, 'w', encoding='utf-8') as f:
    json.dump(lp, f, ensure_ascii=False, indent=2)

print('\nDone. Verifying...')
for n in range(28, 37):
    w = json.load(open(os.path.join(BASE, f'mcp-server/data/lessons/W{n}.json')))
    vt = w['vocab_tiers']
    dicts = sum(1 for v in vt if isinstance(v, dict))
    strs  = sum(1 for v in vt if isinstance(v, str))
    words = [v['Word'] for v in vt if isinstance(v, dict)]
    ok = '✓' if len(vt)==18 and strs==0 else '✗ ERROR'
    print(f'  W{n}: total={len(vt)} dicts={dicts} strings={strs} {ok}')
    if strs:
        print(f'       !! Strings found – fix needed')
