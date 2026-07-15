"""
add_grammar_examples.py
Adds example_en / example_vi to every rule in grammar_explanation.rules
for W01-W20 advanced and W01-W15 easy.
"""
import re, sys

ERRORS = []

def rep(fpath, old, new, tag=''):
    try:
        content = open(fpath, encoding='utf-8').read()
        if old not in content:
            ERRORS.append(f'NOT FOUND [{tag}] in {fpath}')
            return
        if content.count(old) > 1:
            ERRORS.append(f'MULTI-MATCH [{tag}] in {fpath}')
            return
        open(fpath, 'w', encoding='utf-8').write(content.replace(old, new))
        print(f'  ✅ {tag}')
    except Exception as e:
        ERRORS.append(f'ERROR [{tag}] {fpath}: {e}')

# ─── ADVANCED ─────────────────────────────────────────────────────────────────

ADV = 'src/data/weeks'

# W01 advanced
w = f'{ADV}/week_01/grammar.js'
rep(w,
      '{ type: "rule", icon: "1️⃣", rule_en: "I + AM", rule_vi: "I + AM (Tôi + là)" }',
      '{ type: "rule", icon: "1️⃣", rule_en: "I + AM", rule_vi: "I + AM (Tôi + là)", example_en: "I am a student. I am happy.", example_vi: "Tôi là học sinh. Tôi vui." }',
      'W01 adv R1')
rep(w,
      '{ type: "rule", icon: "2️⃣", rule_en: "You / We / They + ARE", rule_vi: "You / We / They + ARE (Bạn / Chúng tôi / Họ + là)" }',
      '{ type: "rule", icon: "2️⃣", rule_en: "You / We / They + ARE", rule_vi: "You / We / They + ARE (Bạn / Chúng tôi / Họ + là)", example_en: "You are my friend. We are at school.", example_vi: "Bạn là bạn của tôi. Chúng tôi đang ở trường." }',
      'W01 adv R2')
rep(w,
      '{ type: "rule", icon: "3️⃣", rule_en: "He / She / It + IS", rule_vi: "He / She / It + IS (Anh ấy / Cô ấy / Nó + là)" }',
      '{ type: "rule", icon: "3️⃣", rule_en: "He / She / It + IS", rule_vi: "He / She / It + IS (Anh ấy / Cô ấy / Nó + là)", example_en: "She is my teacher. It is a book.", example_vi: "Cô ấy là giáo viên của tôi. Nó là một cuốn sách." }',
      'W01 adv R3')

# W02 advanced
w = f'{ADV}/week_02/grammar.js'
rep(w,
      '{ type: "rule", icon: "1️⃣", rule_en: "This is my + [family member]", rule_vi:',
      '{ type: "rule", icon: "1️⃣", rule_en: "This is my + [family member]", example_en: "This is my mother. This is my brother.", example_vi: "Đây là mẹ tôi. Đây là anh trai tôi.", rule_vi:',
      'W02 adv R1')
rep(w,
      '{ type: "rule", icon: "2️⃣", rule_en: "This is + [name]", rule_vi:',
      '{ type: "rule", icon: "2️⃣", rule_en: "This is + [name]", example_en: "This is Tom. This is Ms. Johnson.", example_vi: "Đây là Tom. Đây là cô Johnson.", rule_vi:',
      'W02 adv R2')
rep(w,
      '{ type: "rule", icon: "3️⃣", rule_en: "We are a team", rule_vi:',
      '{ type: "rule", icon: "3️⃣", rule_en: "We are a team", example_en: "We are a team. We help each other.", example_vi: "Chúng tôi là một đội. Chúng tôi giúp đỡ nhau.", rule_vi:',
      'W02 adv R3')

# W03 advanced
w = f'{ADV}/week_03/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'is' for qualities: She is tall\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'is' for qualities: She is tall\", example_en: \"She is tall. He is kind. My teacher is patient.\", example_vi: \"Cô ấy cao. Anh ấy tốt bụng. Giáo viên của tôi kiên nhẫn.\",",
      'W03 adv R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'has' for possession: She has long hair\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'has' for possession: She has long hair\", example_en: \"She has long hair. He has brown eyes. My friend has glasses.\", example_vi: \"Cô ấy có tóc dài. Anh ấy có mắt nâu. Bạn tôi đeo kính.\",",
      'W03 adv R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Negative: is not (isn't), does not have\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Negative: is not (isn't), does not have\", example_en: \"She is not short. He does not have curly hair.\", example_vi: \"Cô ấy không thấp. Anh ấy không có tóc xoăn.\",",
      'W03 adv R3')

# W04 advanced
w = f'{ADV}/week_04/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Add -ing to verbs after 'like': I like playing\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Add -ing to verbs after 'like': I like playing\", example_en: \"I like playing football. She likes drawing pictures.\", example_vi: \"Tôi thích chơi bóng đá. Cô ấy thích vẽ tranh.\",",
      'W04 adv R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Negative: I don't like + V-ing\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Negative: I don't like + V-ing\", example_en: \"I don't like waking up early. He doesn't like running.\", example_vi: \"Tôi không thích thức dậy sớm. Anh ấy không thích chạy.\",",
      'W04 adv R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Question: Do you like + V-ing?\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Question: Do you like + V-ing?\", example_en: \"Do you like reading? Do you like singing?\", example_vi: \"Bạn có thích đọc sách không? Bạn có thích hát không?\",",
      'W04 adv R3')

# W05 advanced
w = f'{ADV}/week_05/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'a' before consonant sounds: a sofa, a lamp\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'a' before consonant sounds: a sofa, a lamp\", example_en: \"There is a sofa in the living room. I see a lamp.\", example_vi: \"Có một chiếc sofa trong phòng khách. Tôi thấy một cây đèn.\",",
      'W05 adv R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'an' before vowel sounds: an apple, an egg\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'an' before vowel sounds: an apple, an egg\", example_en: \"There is an oven in the kitchen. I eat an orange.\", example_vi: \"Có một cái lò nướng trong bếp. Tôi ăn một quả cam.\",",
      'W05 adv R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Pattern: This is a/an [noun]\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Pattern: This is a/an [noun]\", example_en: \"This is a bedroom. This is an armchair.\", example_vi: \"Đây là một phòng ngủ. Đây là một chiếc ghế bành.\",",
      'W05 adv R3')

# W06 advanced
w = f'{ADV}/week_06/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'in' for inside: in the box, in the room\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'in' for inside: in the box, in the room\", example_en: \"The cat is in the box. My pen is in the bag.\", example_vi: \"Con mèo ở trong hộp. Bút của tôi ở trong túi.\",",
      'W06 adv R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'on' for on top: on the desk, on the floor\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'on' for on top: on the desk, on the floor\", example_en: \"The book is on the desk. The ball is on the floor.\", example_vi: \"Cuốn sách ở trên bàn. Quả bóng ở trên sàn.\",",
      'W06 adv R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Use 'under' for below: under the desk, under the chair\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Use 'under' for below: under the desk, under the chair\", example_en: \"The toy is under the chair. My bag is under the desk.\", example_vi: \"Đồ chơi ở dưới ghế. Túi của tôi ở dưới bàn.\",",
      'W06 adv R3')
rep(w,
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Use 'next to' for beside: next to the door, next to the window\",",
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Use 'next to' for beside: next to the door, next to the window\", example_en: \"The chair is next to the door. My desk is next to the window.\", example_vi: \"Ghế ở cạnh cửa. Bàn của tôi ở cạnh cửa sổ.\",",
      'W06 adv R4')

# W07 advanced
w = f'{ADV}/week_07/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'There is' to say something exists: There is a pen.\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'There is' to say something exists: There is a pen.\", example_en: \"There is a pencil in my bag. There is a ruler on the desk.\", example_vi: \"Có một cái bút chì trong túi của tôi. Có một cái thước trên bàn.\",",
      'W07 adv R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Pattern: There is + a/an + [noun]\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Pattern: There is + a/an + [noun]\", example_en: \"There is a book. There is an eraser.\", example_vi: \"Có một cuốn sách. Có một cái tẩy.\",",
      'W07 adv R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Question: Is there + a/an + [noun]? Answer: Yes, there is. / No, there isn't.\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Question: Is there + a/an + [noun]? Answer: Yes, there is. / No, there isn't.\", example_en: \"Is there a pen? Yes, there is. Is there an eraser? No, there isn't.\", example_vi: \"Có bút không? Có. Có tẩy không? Không có.\",",
      'W07 adv R3')

# W08 advanced
w = f'{ADV}/week_08/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'There are' for PLURAL (more than 1): There are 20 desks\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'There are' for PLURAL (more than 1): There are 20 desks\", example_en: \"There are 20 desks in my classroom. There are many students.\", example_vi: \"Có 20 cái bàn trong lớp học của tôi. Có nhiều học sinh.\",",
      'W08 adv R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Add -s to the noun: desk → desks, pencil → pencils, chair → chairs\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Add -s to the noun: desk → desks, pencil → pencils, chair → chairs\", example_en: \"There are pencils on the desk. There are chairs in the room.\", example_vi: \"Có những cái bút chì trên bàn. Có những chiếc ghế trong phòng.\",",
      'W08 adv R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Use 'There is' for ONE: There is a bag. Use 'There are' for MANY: There are bags\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Use 'There is' for ONE: There is a bag. Use 'There are' for MANY: There are bags\", example_en: \"There is a bag on the chair. There are bags on the floor.\", example_vi: \"Có một cái túi trên ghế. Có những cái túi trên sàn.\",",
      'W08 adv R3')
rep(w,
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"You can use numbers: There are 3 markers. Or use 'many': There are many students\",",
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"You can use numbers: There are 3 markers. Or use 'many': There are many students\", example_en: \"There are 3 markers on the board. There are many books in the library.\", example_vi: \"Có 3 cái bút lông trên bảng. Có nhiều sách trong thư viện.\",",
      'W08 adv R4')

# W09 advanced
w = f'{ADV}/week_09/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'It is a' before adjective + noun: It is a busy street\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'It is a' before adjective + noun: It is a busy street\", example_en: \"It is a busy street. It is a tall building.\", example_vi: \"Đó là một con đường bận rộn. Đó là một tòa nhà cao.\",",
      'W09 adv R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Adjectives describe nouns: noisy city, tall building\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Adjectives describe nouns: noisy city, tall building\", example_en: \"It is a noisy city. It is a modern building.\", example_vi: \"Đó là một thành phố ồn ào. Đó là một tòa nhà hiện đại.\",",
      'W09 adv R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Adjective comes BEFORE the noun: a modern car (NOT a car modern)\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Adjective comes BEFORE the noun: a modern car (NOT a car modern)\", example_en: \"a clean park (✓) — a park clean (✗). a quiet village (✓).\", example_vi: \"a clean park (✓) — a park clean (✗). a quiet village (✓).\",",
      'W09 adv R3')
rep(w,
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Use 'a' before consonant sounds: a busy street, a tall building\",",
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Use 'a' before consonant sounds: a busy street, a tall building\", example_en: \"It is a busy road. It is an empty street.\", example_vi: \"Đó là một con đường bận rộn. Đó là một con phố trống vắng.\",",
      'W09 adv R4')

# W10 advanced
w = f'{ADV}/week_10/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'but' to show difference: The city is noisy, but the farm is quiet.\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'but' to show difference: The city is noisy, but the farm is quiet.\", example_en: \"The city is noisy, but the farm is quiet. The road is busy, but the path is empty.\", example_vi: \"Thành phố ồn ào, nhưng nông trại thì yên tĩnh. Đường phố bận rộn, nhưng con đường mòn thì vắng.\",",
      'W10 adv R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Pattern: [Place] is [adjective], but [place] is [adjective]\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Pattern: [Place] is [adjective], but [place] is [adjective]\", example_en: \"The city is big, but the village is small. The park is clean, but the street is dirty.\", example_vi: \"Thành phố to, nhưng làng nhỏ. Công viên sạch, nhưng đường phố bẩn.\",",
      'W10 adv R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"'But' connects two opposite ideas in one sentence\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"'But' connects two opposite ideas in one sentence\", example_en: \"I like the city, but I love the farm. It is hot here, but it is cool there.\", example_vi: \"Tôi thích thành phố, nhưng tôi yêu nông trại. Ở đây nóng, nhưng ở đó mát.\",",
      'W10 adv R3')
rep(w,
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Use comma before 'but': The city is big, but the farm is small.\",",
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Use comma before 'but': The city is big, but the farm is small.\", example_en: \"The school is near, but the library is far. The market is busy, but the lake is peaceful.\", example_vi: \"Trường gần, nhưng thư viện xa. Chợ bận rộn, nhưng hồ thì yên bình.\",",
      'W10 adv R4')

# ─── W11-W20 advanced ──────────────────────────────────────────────────────────

# W11 advanced
w = f'{ADV}/week_11/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'at' with places: at the park, at school\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'at' with places: at the park, at school\", example_en: \"I play at the park. She studies at school.\", example_vi: \"Tôi chơi ở công viên. Cô ấy học ở trường.\",",
      'W11 adv R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'at' when you do something: I play at the park\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'at' when you do something: I play at the park\", example_en: \"I read at the library. We eat at the restaurant.\", example_vi: \"Tôi đọc sách ở thư viện. Chúng tôi ăn ở nhà hàng.\",",
      'W11 adv R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Pattern: I [action] at the [place]\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Pattern: I [action] at the [place]\", example_en: \"I swim at the pool. I study at the library.\", example_vi: \"Tôi bơi ở bể bơi. Tôi học ở thư viện.\",",
      'W11 adv R3')
rep(w,
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Example: I read at the library, I buy at the supermarket\",",
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Example: I read at the library, I buy at the supermarket\", example_en: \"I buy food at the supermarket. I see animals at the zoo.\", example_vi: \"Tôi mua thức ăn ở siêu thị. Tôi xem động vật ở sở thú.\",",
      'W11 adv R4')

# W12 advanced
w = f'{ADV}/week_12/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'I can' to talk about abilities: I can swim.\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'I can' to talk about abilities: I can swim.\", example_en: \"I can swim. She can sing. He can draw.\", example_vi: \"Tôi có thể bơi. Cô ấy có thể hát. Anh ấy có thể vẽ.\",",
      'W12 adv R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'I can't' (cannot) for things you cannot do: I can't fly.\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'I can't' (cannot) for things you cannot do: I can't fly.\", example_en: \"I can't fly. She can't run fast. He can't cook.\", example_vi: \"Tôi không thể bay. Cô ấy không thể chạy nhanh. Anh ấy không thể nấu ăn.\",",
      'W12 adv R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Use 'Can you...?' to ask about abilities: Can you dance?\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Use 'Can you...?' to ask about abilities: Can you dance?\", example_en: \"Can you dance? Can she play the piano? Can he cook?\", example_vi: \"Bạn có thể nhảy không? Cô ấy có thể chơi đàn piano không?\",",
      'W12 adv R3')
rep(w,
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"After 'can', always use base verb (not -ing or -s): He can run.\",",
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"After 'can', always use base verb (not -ing or -s): He can run.\", example_en: \"He can run (✓). He can runs (✗). She can singing (✗).\", example_vi: \"He can run (✓). He can runs (✗). She can singing (✗).\",",
      'W12 adv R4')

# W13 advanced
w = f'{ADV}/week_13/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use the base verb with I / you / we / they: I wake up, I eat breakfast\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use the base verb with I / you / we / they: I wake up, I eat breakfast\", example_en: \"I wake up at 6 o'clock. I eat breakfast every morning.\", example_vi: \"Tôi thức dậy lúc 6 giờ. Tôi ăn sáng mỗi buổi sáng.\",",
      'W13 adv R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Add -s or -es with he / she / it: She wakes up, He brushes his teeth\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Add -s or -es with he / she / it: She wakes up, He brushes his teeth\", example_en: \"She wakes up at 7. He brushes his teeth after breakfast.\", example_vi: \"Cô ấy thức dậy lúc 7 giờ. Anh ấy đánh răng sau bữa sáng.\",",
      'W13 adv R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Use 'go' + to for places: I go to school, She goes to bed\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Use 'go' + to for places: I go to school, She goes to bed\", example_en: \"I go to school at 7:30. She goes to bed at 9 o'clock.\", example_vi: \"Tôi đi học lúc 7:30. Cô ấy đi ngủ lúc 9 giờ.\",",
      'W13 adv R3')
rep(w,
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Use time words: at 7 o'clock, in the morning, every day\",",
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Use time words: at 7 o'clock, in the morning, every day\", example_en: \"I read at 8 o'clock. She exercises in the morning. He walks to school every day.\", example_vi: \"Tôi đọc sách lúc 8 giờ. Cô ấy tập thể dục vào buổi sáng. Anh ấy đi bộ đến trường mỗi ngày.\",",
      'W13 adv R4')

# W14 advanced
w = f'{ADV}/week_14/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Present Simple: I present, She introduces (add -s with he/she)\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Present Simple: I present, She introduces (add -s with he/she)\", example_en: \"I present my project. She introduces her family.\", example_vi: \"Tôi thuyết trình dự án của mình. Cô ấy giới thiệu gia đình.\",",
      'W14 adv R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Can/Can't: I can sing, He cannot draw (no -s after can)\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Can/Can't: I can sing, He cannot draw (no -s after can)\", example_en: \"I can sing a song. He cannot draw well. She can speak English.\", example_vi: \"Tôi có thể hát một bài hát. Anh ấy không thể vẽ tốt.\",",
      'W14 adv R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Possessives: my poster, your project, his family, her talent\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Possessives: my poster, your project, his family, her talent\", example_en: \"This is my poster. That is her talent. His family is big.\", example_vi: \"Đây là áp phích của tôi. Đó là tài năng của cô ấy. Gia đình anh ấy lớn.\",",
      'W14 adv R3')
rep(w,
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Describe abilities: I am good at..., I am confident, I am proud of...\",",
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Describe abilities: I am good at..., I am confident, I am proud of...\", example_en: \"I am good at singing. I am proud of my drawing. She is confident on stage.\", example_vi: \"Tôi giỏi hát. Tôi tự hào về bức tranh của mình. Cô ấy tự tin trên sân khấu.\",",
      'W14 adv R4')

# W15 advanced
w = f'{ADV}/week_15/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"I + am + V-ing: I am running in the park.\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"I + am + V-ing: I am running in the park.\", example_en: \"I am running in the park. I am eating lunch now.\", example_vi: \"Tôi đang chạy trong công viên. Tôi đang ăn trưa bây giờ.\",",
      'W15 adv R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"He/She/It + is + V-ing: She is eating ice cream.\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"He/She/It + is + V-ing: She is eating ice cream.\", example_en: \"She is eating ice cream. He is playing football.\", example_vi: \"Cô ấy đang ăn kem. Anh ấy đang chơi bóng đá.\",",
      'W15 adv R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"We/You/They + are + V-ing: They are playing soccer.\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"We/You/They + are + V-ing: They are playing soccer.\", example_en: \"They are playing soccer. We are watching a film.\", example_vi: \"Họ đang chơi bóng đá. Chúng tôi đang xem phim.\",",
      'W15 adv R3')
rep(w,
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Use Present Continuous for actions happening NOW.\",",
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Use Present Continuous for actions happening NOW.\", example_en: \"Look! She is dancing. Listen! He is singing right now.\", example_vi: \"Nhìn kìa! Cô ấy đang nhảy. Nghe kìa! Anh ấy đang hát ngay bây giờ.\",",
      'W15 adv R4')

# W16 advanced
w = f'{ADV}/week_16/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'am' with I: I am playing\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'am' with I: I am playing\", example_en: \"I am playing in the park. I am eating lunch.\", example_vi: \"Tôi đang chơi trong công viên. Tôi đang ăn trưa.\",",
      'W16 adv R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'is' with he/she/it: He is running\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'is' with he/she/it: He is running\", example_en: \"He is running fast. She is reading a book.\", example_vi: \"Anh ấy đang chạy nhanh. Cô ấy đang đọc sách.\",",
      'W16 adv R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Use 'are' with you/we/they: They are playing\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Use 'are' with you/we/they: They are playing\", example_en: \"They are playing football. We are watching TV.\", example_vi: \"Họ đang chơi bóng đá. Chúng tôi đang xem TV.\",",
      'W16 adv R3')
rep(w,
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Add -ing to verbs: play → playing, run → running\",",
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Add -ing to verbs: play → playing, run → running\", example_en: \"play → playing, run → running, swim → swimming, dance → dancing.\", example_vi: \"play → playing, run → running, swim → swimming, dance → dancing.\",",
      'W16 adv R4')

# W17 advanced
w = f'{ADV}/week_17/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'so' to connect the weather cause to the clothing effect.\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'so' to connect the weather cause to the clothing effect.\", example_en: \"It is cold, so I am wearing a coat. It is sunny, so I am wearing a hat.\", example_vi: \"Trời lạnh, vì vậy tôi đang mặc áo khoác. Trời nắng, vì vậy tôi đang đội mũ.\",",
      'W17 adv R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Pattern: It is [weather], so I am wearing [clothes].\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Pattern: It is [weather], so I am wearing [clothes].\", example_en: \"It is raining, so I am wearing a raincoat. It is windy, so I am wearing a scarf.\", example_vi: \"Trời mưa, vì vậy tôi đang mặc áo mưa. Trời có gió, vì vậy tôi đang quàng khăn.\",",
      'W17 adv R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"The weather part uses Present Simple: It is raining / It is cold.\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"The weather part uses Present Simple: It is raining / It is cold.\", example_en: \"It is hot today. It is snowing outside.\", example_vi: \"Hôm nay trời nóng. Bên ngoài đang có tuyết rơi.\",",
      'W17 adv R3')
rep(w,
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"The clothing part uses Present Continuous: I am wearing a coat.\",",
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"The clothing part uses Present Continuous: I am wearing a coat.\", example_en: \"I am wearing a coat. She is wearing boots. He is carrying an umbrella.\", example_vi: \"Tôi đang mặc áo khoác. Cô ấy đang đi ủng. Anh ấy đang mang ô.\",",
      'W17 adv R4')

# W18 advanced
w = f'{ADV}/week_18/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use am/is/are + verb-ing for actions happening RIGHT NOW.\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use am/is/are + verb-ing for actions happening RIGHT NOW.\", example_en: \"I am writing a report. She is filming the news.\", example_vi: \"Tôi đang viết báo cáo. Cô ấy đang quay tin tức.\",",
      'W18 adv R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"I am → am + verb-ing. He/She/It → is + verb-ing. We/You/They → are + verb-ing.\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"I am → am + verb-ing. He/She/It → is + verb-ing. We/You/They → are + verb-ing.\", example_en: \"I am reporting. He is filming. They are interviewing.\", example_vi: \"Tôi đang đưa tin. Anh ấy đang quay phim. Họ đang phỏng vấn.\",",
      'W18 adv R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Add -ing: report → reporting, film → filming, run → running (double last letter), describe → describing.\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Add -ing: report → reporting, film → filming, run → running (double last letter), describe → describing.\", example_en: \"She is describing the scene. He is running to the camera.\", example_vi: \"Cô ấy đang mô tả cảnh. Anh ấy đang chạy đến máy quay.\",",
      'W18 adv R3')
rep(w,
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Negative: He is NOT reporting. She is not filming.\",",
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Negative: He is NOT reporting. She is not filming.\", example_en: \"He is not reporting today. She is not filming the interview.\", example_vi: \"Anh ấy không đưa tin hôm nay. Cô ấy không quay phim buổi phỏng vấn.\",",
      'W18 adv R4')

# W19 advanced
w = f'{ADV}/week_19/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'was' with I/he/she/it: I was small\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'was' with I/he/she/it: I was small\", example_en: \"I was a baby. She was happy. It was cold.\", example_vi: \"Tôi là một em bé. Cô ấy đã vui vẻ. Trời lạnh.\",",
      'W19 adv R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'were' with you/we/they: They were young\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'were' with you/we/they: They were young\", example_en: \"They were young. We were at school. You were happy.\", example_vi: \"Họ còn trẻ. Chúng tôi đã ở trường. Bạn đã vui.\",",
      'W19 adv R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Use for past states, not actions: I was a baby\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Use for past states, not actions: I was a baby\", example_en: \"I was in Grade 1. She was my teacher. It was a great day.\", example_vi: \"Tôi đã học lớp 1. Cô ấy là giáo viên của tôi. Đó là một ngày tuyệt vời.\",",
      'W19 adv R3')
rep(w,
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Compare: I am big now. I was small before.\",",
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Compare: I am big now. I was small before.\", example_en: \"Now I am tall, but I was short before. Now she is fast, but she was slow before.\", example_vi: \"Bây giờ tôi cao, nhưng trước đây tôi thấp. Bây giờ cô ấy nhanh, nhưng trước đây cô ấy chậm.\",",
      'W19 adv R4')

# W20 advanced
w = f'{ADV}/week_20/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'There was' + singular: There was a market.\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'There was' + singular: There was a market.\", example_en: \"There was a market near our house. There was a big tree in the park.\", example_vi: \"Có một khu chợ gần nhà chúng tôi. Có một cây to trong công viên.\",",
      'W20 adv R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'There were' + plural: There were many trees.\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'There were' + plural: There were many trees.\", example_en: \"There were many trees here before. There were lots of children in the park.\", example_vi: \"Trước đây có nhiều cây ở đây. Có nhiều trẻ em trong công viên.\",",
      'W20 adv R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Use for things that existed in the past: There was a bridge here.\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Use for things that existed in the past: There was a bridge here.\", example_en: \"There was a bridge here 50 years ago. There were old buildings on this street.\", example_vi: \"Có một cây cầu ở đây 50 năm trước. Có những tòa nhà cũ trên con phố này.\",",
      'W20 adv R3')
rep(w,
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Negative: There was no market. / There were no trees.\",",
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Negative: There was no market. / There were no trees.\", example_en: \"There was no electricity before. There were no phones in the past.\", example_vi: \"Trước đây không có điện. Trong quá khứ không có điện thoại.\",",
      'W20 adv R4')

# ─── EASY W01-W15 ─────────────────────────────────────────────────────────────

EAS = 'src/data/weeks_easy'

# EASY W01
w = f'{EAS}/week_01/grammar.js'
rep(w,
      '{ type: "rule", icon: "1️⃣", rule_en: "I + AM", rule_vi: "I + AM (Tôi + là)" }',
      '{ type: "rule", icon: "1️⃣", rule_en: "I + AM", rule_vi: "I + AM (Tôi + là)", example_en: "I am Alex. I am happy.", example_vi: "Tôi là Alex. Tôi vui." }',
      'W01 easy R1')
rep(w,
      '{ type: "rule", icon: "2️⃣", rule_en: "You / We / They + ARE", rule_vi: "You / We / They + ARE (Bạn / Chúng tôi / Họ + là)" }',
      '{ type: "rule", icon: "2️⃣", rule_en: "You / We / They + ARE", rule_vi: "You / We / They + ARE (Bạn / Chúng tôi / Họ + là)", example_en: "You are my friend. They are students.", example_vi: "Bạn là bạn của tôi. Họ là học sinh." }',
      'W01 easy R2')
rep(w,
      '{ type: "rule", icon: "3️⃣", rule_en: "He / She / It + IS", rule_vi: "He / She / It + IS (Anh ấy / Cô ấy / Nó + là)" }',
      '{ type: "rule", icon: "3️⃣", rule_en: "He / She / It + IS", rule_vi: "He / She / It + IS (Anh ấy / Cô ấy / Nó + là)", example_en: "She is kind. It is a pen.", example_vi: "Cô ấy tốt bụng. Nó là một cái bút." }',
      'W01 easy R3')

# EASY W02
w = f'{EAS}/week_02/grammar.js'
rep(w,
      '{ type: "rule", icon: "1️⃣", rule_en: "This is my + [person]",',
      '{ type: "rule", icon: "1️⃣", rule_en: "This is my + [person]", example_en: "This is my mother. This is my father.", example_vi: "Đây là mẹ tôi. Đây là bố tôi.",',
      'W02 easy R1')
rep(w,
      '{ type: "rule", icon: "2️⃣", rule_en: "We are a team",',
      '{ type: "rule", icon: "2️⃣", rule_en: "We are a team", example_en: "We are a team. We love each other.", example_vi: "Chúng tôi là một đội. Chúng tôi yêu thương nhau.",',
      'W02 easy R2')
rep(w,
      '{ type: "rule", icon: "3️⃣", rule_en: "I love my family",',
      '{ type: "rule", icon: "3️⃣", rule_en: "I love my family", example_en: "I love my family. My family is happy.", example_vi: "Tôi yêu gia đình tôi. Gia đình tôi hạnh phúc.",',
      'W02 easy R3')

# EASY W03
w = f'{EAS}/week_03/grammar.js'
rep(w,
      '{ type: "rule", icon: "1️⃣", rule_en: "I am tall.",',
      '{ type: "rule", icon: "1️⃣", rule_en: "I am tall.", example_en: "I am tall. My friend is short.", example_vi: "Tôi cao. Bạn tôi thấp.",',
      'W03 easy R1')
rep(w,
      '{ type: "rule", icon: "2️⃣", rule_en: "I have long hair.",',
      '{ type: "rule", icon: "2️⃣", rule_en: "I have long hair.", example_en: "I have long hair. She has curly hair.", example_vi: "Tôi có tóc dài. Cô ấy có tóc xoăn.",',
      'W03 easy R2')
rep(w,
      '{ type: "rule", icon: "3️⃣", rule_en: "I am not short.",',
      '{ type: "rule", icon: "3️⃣", rule_en: "I am not short.", example_en: "I am not short. He is not tall.", example_vi: "Tôi không thấp. Anh ấy không cao.",',
      'W03 easy R3')

# EASY W04
w = f'{EAS}/week_04/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Add -ing to verbs after 'like': I like playing\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Add -ing to verbs after 'like': I like playing\", example_en: \"I like playing. I like drawing pictures.\", example_vi: \"Tôi thích chơi. Tôi thích vẽ tranh.\",",
      'W04 easy R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Negative: I don't like + V-ing\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Negative: I don't like + V-ing\", example_en: \"I don't like running. I don't like waking up early.\", example_vi: \"Tôi không thích chạy. Tôi không thích thức dậy sớm.\",",
      'W04 easy R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Question: Do you like + V-ing?\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Question: Do you like + V-ing?\", example_en: \"Do you like playing? Do you like reading?\", example_vi: \"Bạn có thích chơi không? Bạn có thích đọc sách không?\",",
      'W04 easy R3')

# EASY W05
w = f'{EAS}/week_05/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'a' before words: a bed, a chair\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'a' before words: a bed, a chair\", example_en: \"This is a bed. There is a chair in my room.\", example_vi: \"Đây là một chiếc giường. Có một chiếc ghế trong phòng tôi.\",",
      'W05 easy R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'an' before a, e, i, o, u: an apple\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'an' before a, e, i, o, u: an apple\", example_en: \"This is an apple. There is an egg on the table.\", example_vi: \"Đây là một quả táo. Có một quả trứng trên bàn.\",",
      'W05 easy R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Say: This is a/an...\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Say: This is a/an...\", example_en: \"This is a sofa. This is an armchair.\", example_vi: \"Đây là một chiếc ghế dài. Đây là một chiếc ghế bành.\",",
      'W05 easy R3')

# EASY W06
w = f'{EAS}/week_06/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'in' for inside: in the box, in the room\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'in' for inside: in the box, in the room\", example_en: \"The toy is in the box. The cat is in the room.\", example_vi: \"Đồ chơi ở trong hộp. Con mèo ở trong phòng.\",",
      'W06 easy R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'on' for on top: on the desk, on the floor\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'on' for on top: on the desk, on the floor\", example_en: \"The book is on the desk. The ball is on the floor.\", example_vi: \"Cuốn sách ở trên bàn. Quả bóng ở trên sàn.\",",
      'W06 easy R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Use 'under' for below: under the desk, under the chair\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Use 'under' for below: under the desk, under the chair\", example_en: \"My bag is under the desk. The cat is under the chair.\", example_vi: \"Túi của tôi ở dưới bàn. Con mèo ở dưới ghế.\",",
      'W06 easy R3')
rep(w,
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Use 'next to' for beside: next to the door, next to the window\",",
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Use 'next to' for beside: next to the door, next to the window\", example_en: \"The chair is next to the door. My toy is next to the window.\", example_vi: \"Ghế ở cạnh cửa. Đồ chơi của tôi ở cạnh cửa sổ.\",",
      'W06 easy R4')

# EASY W07
w = f'{EAS}/week_07/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'There is' for one thing: There is a pencil.\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'There is' for one thing: There is a pencil.\", example_en: \"There is a pencil in my bag. There is a crayon on the desk.\", example_vi: \"Có một cái bút chì trong túi của tôi. Có một cây bút màu trên bàn.\",",
      'W07 easy R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Pattern: There is + a + [thing]\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Pattern: There is + a + [thing]\", example_en: \"There is a pen. There is a ruler.\", example_vi: \"Có một cái bút. Có một cái thước.\",",
      'W07 easy R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Question: Is there a [thing]? Answer: Yes, there is. / No, there isn't.\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Question: Is there a [thing]? Answer: Yes, there is. / No, there isn't.\", example_en: \"Is there a pen? Yes, there is. Is there a ruler? No, there isn't.\", example_vi: \"Có bút không? Có. Có thước không? Không có.\",",
      'W07 easy R3')

# EASY W08
w = f'{EAS}/week_08/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"ONE thing: There IS a desk\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"ONE thing: There IS a desk\", example_en: \"There is a desk. There is a bag.\", example_vi: \"Có một cái bàn. Có một cái túi.\",",
      'W08 easy R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"MANY things: There ARE desks\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"MANY things: There ARE desks\", example_en: \"There are desks in the classroom. There are bags on the floor.\", example_vi: \"Có những cái bàn trong lớp học. Có những cái túi trên sàn.\",",
      'W08 easy R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Add -s: chair → chairs, bag → bags, desk → desks\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Add -s: chair → chairs, bag → bags, desk → desks\", example_en: \"There are 5 chairs. There are many bags.\", example_vi: \"Có 5 cái ghế. Có nhiều cái túi.\",",
      'W08 easy R3')
rep(w,
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Special: shelf → shelves\",",
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Special: shelf → shelves\", example_en: \"There are shelves in my classroom. There are books on the shelves.\", example_vi: \"Có những kệ sách trong lớp học của tôi. Có sách trên kệ.\",",
      'W08 easy R4')

# EASY W09
w = f'{EAS}/week_09/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'It is a' then adjective then noun\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'It is a' then adjective then noun\", example_en: \"It is a big city. It is a small village.\", example_vi: \"Đó là một thành phố lớn. Đó là một ngôi làng nhỏ.\",",
      'W09 easy R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Adjective describes the noun: noisy city, tall building\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Adjective describes the noun: noisy city, tall building\", example_en: \"It is a noisy city. It is a tall building.\", example_vi: \"Đó là một thành phố ồn ào. Đó là một tòa nhà cao.\",",
      'W09 easy R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Adjective comes BEFORE the noun\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Adjective comes BEFORE the noun\", example_en: \"a clean park (✓). a park clean (✗). a quiet street (✓).\", example_vi: \"a clean park (✓). a park clean (✗). a quiet street (✓).\",",
      'W09 easy R3')

# EASY W10
w = f'{EAS}/week_10/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'but' to show difference: The city is noisy, but the farm is quiet.\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'but' to show difference: The city is noisy, but the farm is quiet.\", example_en: \"The city is noisy, but the farm is quiet. The road is busy, but the path is empty.\", example_vi: \"Thành phố ồn ào, nhưng nông trại yên tĩnh. Đường bận rộn, nhưng con đường mòn vắng.\",",
      'W10 easy R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Pattern: [Place] is [adjective], but [place] is [adjective]\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Pattern: [Place] is [adjective], but [place] is [adjective]\", example_en: \"The city is big, but the village is small. The park is clean, but the street is dirty.\", example_vi: \"Thành phố lớn, nhưng làng nhỏ. Công viên sạch, nhưng đường bẩn.\",",
      'W10 easy R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"'But' connects two opposite ideas\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"'But' connects two opposite ideas\", example_en: \"It is hot here, but it is cool there. I like cats, but I don't like dogs.\", example_vi: \"Ở đây nóng, nhưng ở đó mát. Tôi thích mèo, nhưng không thích chó.\",",
      'W10 easy R3')
rep(w,
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"The city is big, but the farm is small.\",",
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"The city is big, but the farm is small.\", example_en: \"The city is big, but the farm is small. The school is near, but the library is far.\", example_vi: \"Thành phố lớn, nhưng nông trại nhỏ. Trường gần, nhưng thư viện xa.\",",
      'W10 easy R4')

# EASY W11
w = f'{EAS}/week_11/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'at' with places: at the park\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'at' with places: at the park\", example_en: \"I am at the park. She is at school.\", example_vi: \"Tôi đang ở công viên. Cô ấy đang ở trường.\",",
      'W11 easy R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Say: I play at the park\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Say: I play at the park\", example_en: \"I play at the park. We run at the park.\", example_vi: \"Tôi chơi ở công viên. Chúng tôi chạy ở công viên.\",",
      'W11 easy R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Say: I read at the library\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Say: I read at the library\", example_en: \"I read at the library. She reads at the library.\", example_vi: \"Tôi đọc sách ở thư viện. Cô ấy đọc sách ở thư viện.\",",
      'W11 easy R3')
rep(w,
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Say: I buy at the store\",",
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Say: I buy at the store\", example_en: \"I buy food at the store. Mum buys milk at the supermarket.\", example_vi: \"Tôi mua thức ăn ở cửa hàng. Mẹ mua sữa ở siêu thị.\",",
      'W11 easy R4')

# EASY W12
w = f'{EAS}/week_12/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'I can' to talk about abilities: I can swim.\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"Use 'I can' to talk about abilities: I can swim.\", example_en: \"I can swim. I can sing. She can draw.\", example_vi: \"Tôi có thể bơi. Tôi có thể hát. Cô ấy có thể vẽ.\",",
      'W12 easy R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'I can't' (cannot) for things you cannot do: I can't fly.\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"Use 'I can't' (cannot) for things you cannot do: I can't fly.\", example_en: \"I can't fly. I can't run fast. He can't cook.\", example_vi: \"Tôi không thể bay. Tôi không thể chạy nhanh. Anh ấy không thể nấu ăn.\",",
      'W12 easy R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Use 'Can you...?' to ask about abilities: Can you dance?\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"Use 'Can you...?' to ask about abilities: Can you dance?\", example_en: \"Can you dance? Can you sing? Can he jump?\", example_vi: \"Bạn có thể nhảy không? Bạn có thể hát không? Anh ấy có thể nhảy không?\",",
      'W12 easy R3')
rep(w,
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"After 'can', always use base verb (not -ing or -s): He can run.\",",
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"After 'can', always use base verb (not -ing or -s): He can run.\", example_en: \"He can run (✓). He can runs (✗). I can dancing (✗).\", example_vi: \"He can run (✓). He can runs (✗). I can dancing (✗).\",",
      'W12 easy R4')

# EASY W13
w = f'{EAS}/week_13/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"I wake up. I eat. I play.\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"I wake up. I eat. I play.\", example_en: \"I wake up at 6. I eat breakfast. I play after school.\", example_vi: \"Tôi thức dậy lúc 6 giờ. Tôi ăn sáng. Tôi chơi sau giờ học.\",",
      'W13 easy R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"She wakes up. He eats.\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"She wakes up. He eats.\", example_en: \"She wakes up early. He eats lunch at school.\", example_vi: \"Cô ấy thức dậy sớm. Anh ấy ăn trưa ở trường.\",",
      'W13 easy R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"I go to school. I go to bed.\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"I go to school. I go to bed.\", example_en: \"I go to school at 7. I go to bed at 9 o'clock.\", example_vi: \"Tôi đi học lúc 7 giờ. Tôi đi ngủ lúc 9 giờ.\",",
      'W13 easy R3')

# EASY W14
w = f'{EAS}/week_14/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"I can sing. I can draw.\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"I can sing. I can draw.\", example_en: \"I can sing a song. I can draw a picture. She can dance.\", example_vi: \"Tôi có thể hát một bài. Tôi có thể vẽ tranh. Cô ấy có thể nhảy.\",",
      'W14 easy R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"My name is Emma.\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"My name is Emma.\", example_en: \"My name is Emma. His name is Tom. Her name is Lily.\", example_vi: \"Tên tôi là Emma. Tên anh ấy là Tom. Tên cô ấy là Lily.\",",
      'W14 easy R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"I have a family.\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"I have a family.\", example_en: \"I have a family. I have a mother and a father. I have a bag.\", example_vi: \"Tôi có một gia đình. Tôi có bố và mẹ. Tôi có một cái túi.\",",
      'W14 easy R3')

# EASY W15
w = f'{EAS}/week_15/grammar.js'
rep(w,
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"I am running: I am running in the park.\",",
      "{ type: \"rule\", icon: \"1️⃣\", rule_en: \"I am running: I am running in the park.\", example_en: \"I am running in the park. I am eating lunch now.\", example_vi: \"Tôi đang chạy trong công viên. Tôi đang ăn trưa bây giờ.\",",
      'W15 easy R1')
rep(w,
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"He/She is playing: She is playing games.\",",
      "{ type: \"rule\", icon: \"2️⃣\", rule_en: \"He/She is playing: She is playing games.\", example_en: \"She is playing games. He is reading a book.\", example_vi: \"Cô ấy đang chơi game. Anh ấy đang đọc sách.\",",
      'W15 easy R2')
rep(w,
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"They are eating: They are eating snacks.\",",
      "{ type: \"rule\", icon: \"3️⃣\", rule_en: \"They are eating: They are eating snacks.\", example_en: \"They are eating snacks. We are watching a movie.\", example_vi: \"Họ đang ăn vặt. Chúng tôi đang xem phim.\",",
      'W15 easy R3')
rep(w,
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Use for actions happening NOW.\",",
      "{ type: \"rule\", icon: \"4️⃣\", rule_en: \"Use for actions happening NOW.\", example_en: \"Look! She is dancing now. Listen! He is singing!\", example_vi: \"Nhìn kìa! Cô ấy đang nhảy. Nghe kìa! Anh ấy đang hát!\",",
      'W15 easy R4')

# ─── REPORT ───────────────────────────────────────────────────────────────────

print(f'\n{"─"*50}')
if ERRORS:
    print(f'❌ {len(ERRORS)} errors:')
    for e in ERRORS:
        print(f'  {e}')
else:
    print('🎉 All replacements successful!')
