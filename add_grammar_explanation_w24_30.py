"""
add_grammar_explanation_w24_30.py
Injects grammar_explanation block into W24-W30 advanced + W25-W30 easy grammar files.
"""

ERRORS = []

def inject(fpath, block, tag):
    """Insert grammar_explanation as first key inside export default { ... }"""
    try:
        content = open(fpath, encoding='utf-8').read()
        marker = 'export default {'
        if marker not in content:
            ERRORS.append(f'MARKER NOT FOUND [{tag}] {fpath}')
            return
        if 'grammar_explanation' in content:
            print(f'  ⏭  SKIP (already has grammar_explanation): {tag}')
            return
        # Insert right after 'export default {'
        new_content = content.replace(marker, marker + '\n' + block, 1)
        open(fpath, 'w', encoding='utf-8').write(new_content)
        print(f'  ✅ {tag}')
    except Exception as e:
        ERRORS.append(f'ERROR [{tag}]: {e}')

ADV = 'src/data/weeks'
EAS = 'src/data/weeks_easy'

# ─── W24 ADVANCED ────────────────────────────────────────────────────────────
inject(f'{ADV}/week_24/grammar.js', '''  grammar_explanation: {
    title_en: "Was / Were + Adjectives",
    title_vi: "Was / Were + Tính từ (Quá Khứ)",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "Use WAS with I / He / She / It",
        rule_vi: "Dùng WAS với I / He / She / It",
        example_en: "I was scared. She was excited. He was tired.",
        example_vi: "Tôi đã sợ. Cô ấy đã hào hứng. Anh ấy đã mệt."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "Use WERE with You / We / They",
        rule_vi: "Dùng WERE với You / We / They",
        example_en: "You were hungry. We were bored. They were surprised.",
        example_vi: "Bạn đã đói. Chúng tôi đã chán. Họ đã ngạc nhiên."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "Negative: was not (wasn't) / were not (weren't)",
        rule_vi: "Phủ định: was not (wasn't) / were not (weren't)",
        example_en: "I wasn't angry. She wasn't worried. They weren't upset.",
        example_vi: "Tôi không tức. Cô ấy không lo lắng. Họ không buồn."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "Question: Was / Were + subject + adjective?",
        rule_vi: "Câu hỏi: Was / Were + chủ ngữ + tính từ?",
        example_en: "Was she scared? Were they excited? Was he calm?",
        example_vi: "Cô ấy có sợ không? Họ có hào hứng không? Anh ấy có bình tĩnh không?"
      }
    ]
  },
''', 'W24 adv')

# ─── W25 ADVANCED ────────────────────────────────────────────────────────────
inject(f'{ADV}/week_25/grammar.js', '''  grammar_explanation: {
    title_en: "Sequence Connectors: First, Next, Then, Finally",
    title_vi: "Từ nối trình tự: First, Next, Then, Finally",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "FIRST — the very first action in a sequence",
        rule_vi: "FIRST — hành động đầu tiên trong trình tự",
        example_en: "First, I got two slices of bread.",
        example_vi: "Đầu tiên, tôi lấy hai lát bánh mì."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "NEXT — the action right after the first",
        rule_vi: "NEXT — hành động ngay sau hành động đầu tiên",
        example_en: "Next, I spread jam on one slice.",
        example_vi: "Tiếp theo, tôi phết mứt lên một lát."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "THEN — middle steps in the sequence",
        rule_vi: "THEN — các bước ở giữa trình tự",
        example_en: "Then, I pressed the two slices together.",
        example_vi: "Sau đó, tôi ép hai lát bánh lại với nhau."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "FINALLY — the last action, showing the sequence is complete",
        rule_vi: "FINALLY — hành động cuối cùng, kết thúc trình tự",
        example_en: "Finally, I cut the sandwich and put it on a plate.",
        example_vi: "Cuối cùng, tôi cắt bánh sandwich và đặt lên đĩa."
      }
    ]
  },
''', 'W25 adv')

# ─── W26 ADVANCED ────────────────────────────────────────────────────────────
inject(f'{ADV}/week_26/grammar.js', '''  grammar_explanation: {
    title_en: "Past Simple: Regular Verbs (-ed) & Was / Were",
    title_vi: "Quá Khứ Đơn: Động từ có quy tắc (-ed) & Was / Were",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "Add -ed to regular verbs: walk → walked, play → played",
        rule_vi: "Thêm -ed vào động từ có quy tắc: walk → walked, play → played",
        example_en: "Leo visited the park. Max played with his ball.",
        example_vi: "Leo đã thăm công viên. Max đã chơi với bóng của mình."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "Spelling rules: smile → smiled (+-d) | clap → clapped (double) | play → played",
        rule_vi: "Chính tả: smile → smiled (+-d) | clap → clapped (nhân đôi) | play → played",
        example_en: "She smiled happily. He clapped his hands.",
        example_vi: "Cô ấy đã mỉm cười hạnh phúc. Anh ấy đã vỗ tay."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "WAS with I / He / She / It",
        rule_vi: "WAS với I / He / She / It",
        example_en: "Leo was happy. It was a great day.",
        example_vi: "Leo đã vui. Đó là một ngày tuyệt vời."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "WERE with You / We / They",
        rule_vi: "WERE với You / We / They",
        example_en: "They were excited. We were tired but happy.",
        example_vi: "Họ đã hào hứng. Chúng tôi đã mệt nhưng vui."
      }
    ]
  },
''', 'W26 adv')

# ─── W27 ADVANCED ────────────────────────────────────────────────────────────
inject(f'{ADV}/week_27/grammar.js', '''  grammar_explanation: {
    title_en: "Present Simple for Facts: It grows, It needs",
    title_vi: "Hiện Tại Đơn cho sự thật: It grows, It needs",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "Present Simple states facts that are always true",
        rule_vi: "Hiện Tại Đơn dùng để nêu sự thật luôn đúng",
        example_en: "A seed grows into a plant. Plants need water and sunlight.",
        example_vi: "Hạt giống lớn lên thành cây. Cây cần nước và ánh sáng."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "He / She / It → add -s or -es to the verb",
        rule_vi: "He / She / It → thêm -s hoặc -es vào động từ",
        example_en: "It grows. It needs water. The stem reaches for sunlight.",
        example_vi: "Nó lớn. Nó cần nước. Thân cây vươn về phía ánh sáng."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "I / You / We / They → no -s added to the verb",
        rule_vi: "I / You / We / They → không thêm -s vào động từ",
        example_en: "They grow in sunlight. Leaves make food. Roots absorb water.",
        example_vi: "Chúng lớn trong ánh sáng. Lá tạo ra thức ăn. Rễ hấp thụ nước."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "Use sequence words: First, Next, After that, Finally",
        rule_vi: "Dùng từ trình tự: First, Next, After that, Finally",
        example_en: "First, a seed is planted. Then, it sprouts. Finally, it blooms.",
        example_vi: "Đầu tiên, hạt được gieo. Sau đó, nó nảy mầm. Cuối cùng, nó nở hoa."
      }
    ]
  },
''', 'W27 adv')

# ─── W28 ADVANCED ────────────────────────────────────────────────────────────
inject(f'{ADV}/week_28/grammar.js', '''  grammar_explanation: {
    title_en: "Past Simple: Regular & Irregular Verbs",
    title_vi: "Quá Khứ Đơn: Động từ có quy tắc & bất quy tắc",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "Past Simple talks about finished actions in the past",
        rule_vi: "Quá Khứ Đơn nói về hành động đã kết thúc trong quá khứ",
        example_en: "The hare ran very fast. The tortoise walked slowly.",
        example_vi: "Con thỏ đã chạy rất nhanh. Con rùa đã đi chậm rãi."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "REGULAR: add -ed → boast→boasted, cheer→cheered, walk→walked",
        rule_vi: "CÓ QUY TẮC: thêm -ed → boast→boasted, cheer→cheered",
        example_en: "The hare boasted. All the animals cheered.",
        example_vi: "Con thỏ đã khoe khoang. Tất cả các con vật đã cổ vũ."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "IRREGULAR: run→ran, sleep→slept, win→won (no -ed!)",
        rule_vi: "BẤT QUY TẮC: run→ran, sleep→slept, win→won (không thêm -ed!)",
        example_en: "The hare slept. The tortoise won the race.",
        example_vi: "Con thỏ đã ngủ. Con rùa đã thắng cuộc đua."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "NEGATIVE: did not (didn't) + base verb",
        rule_vi: "PHỦ ĐỊNH: did not (didn't) + động từ nguyên mẫu",
        example_en: "He didn't stop to rest. She didn't give up.",
        example_vi: "Anh ấy đã không dừng lại để nghỉ. Cô ấy đã không bỏ cuộc."
      }
    ]
  },
''', 'W28 adv')

# ─── W29 ADVANCED ────────────────────────────────────────────────────────────
inject(f'{ADV}/week_29/grammar.js', '''  grammar_explanation: {
    title_en: "Past Simple: Irregular Verbs 1 — go, run, come, fly",
    title_vi: "Quá Khứ Đơn: Động từ bất quy tắc 1 — go, run, come, fly",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "Irregular verbs do NOT use -ed in Past Simple",
        rule_vi: "Động từ bất quy tắc KHÔNG dùng -ed ở Quá Khứ Đơn",
        example_en: "go → went | run → ran | come → came | fly → flew",
        example_vi: "go → went | run → ran | come → came | fly → flew"
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "go → went (movement to a place)",
        rule_vi: "go → went (di chuyển đến một nơi)",
        example_en: "We went to the airport. She went to the gate alone.",
        example_vi: "Chúng tôi đã đến sân bay. Cô ấy đã đi đến cổng một mình."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "run → ran | come → came | fly → flew",
        rule_vi: "run → ran | come → came | fly → flew",
        example_en: "Dad ran to the gate. Mum came with the luggage. We flew for one hour.",
        example_vi: "Bố đã chạy đến cổng. Mẹ đã đến với hành lý. Chúng tôi đã bay một tiếng."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "NEGATIVE: didn't + BASE VERB (not the past form!)",
        rule_vi: "PHỦ ĐỊNH: didn't + ĐỘNG TỪ GỐC (không dùng dạng quá khứ!)",
        example_en: "He didn't go. (NOT: didn't went) She didn't fly. (NOT: didn't flew)",
        example_vi: "Anh ấy đã không đi. (KHÔNG: didn't went) Cô ấy đã không bay."
      }
    ]
  },
''', 'W29 adv')

# ─── W30 ADVANCED ────────────────────────────────────────────────────────────
inject(f'{ADV}/week_30/grammar.js', '''  grammar_explanation: {
    title_en: "Past Simple: Irregular Verbs 2 — eat, drink, buy, give",
    title_vi: "Quá Khứ Đơn: Động từ bất quy tắc 2 — eat, drink, buy, give",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "Consumption verbs change completely: eat→ate, drink→drank, buy→bought, give→gave",
        rule_vi: "Động từ tiêu thụ thay đổi hoàn toàn: eat→ate, drink→drank, buy→bought, give→gave",
        example_en: "They ate sandwiches. Luna drank juice. Mum bought fruits.",
        example_vi: "Họ đã ăn bánh sandwich. Luna đã uống nước ép. Mẹ đã mua trái cây."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "eat → ate | drink → drank",
        rule_vi: "eat → ate | drink → drank",
        example_en: "They ate watermelon after the meal. Luna drank cold apple juice.",
        example_vi: "Họ đã ăn dưa hấu sau bữa ăn. Luna đã uống nước táo lạnh."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "buy → bought | give → gave",
        rule_vi: "buy → bought | give → gave",
        example_en: "Mum bought fruits at the supermarket. Luna gave some cookies to her friends.",
        example_vi: "Mẹ đã mua trái cây ở siêu thị. Luna đã tặng bánh quy cho bạn bè."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "NEGATIVE: didn't + BASE VERB | QUESTION: Did + subject + BASE VERB?",
        rule_vi: "PHỦ ĐỊNH: didn't + động từ gốc | CÂU HỎI: Did + chủ ngữ + động từ gốc?",
        example_en: "She didn't eat. Did they drink? Did she buy anything?",
        example_vi: "Cô ấy đã không ăn. Họ có uống không? Cô ấy có mua gì không?"
      }
    ]
  },
''', 'W30 adv')

# ─── W25 EASY ────────────────────────────────────────────────────────────────
inject(f'{EAS}/week_25/grammar.js', '''  grammar_explanation: {
    title_en: "Sequence Words: First, Next, Then, Finally",
    title_vi: "Từ trình tự: First, Next, Then, Finally",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "FIRST = the first step (at the beginning)",
        rule_vi: "FIRST = bước đầu tiên",
        example_en: "First, I washed my hands.",
        example_vi: "Đầu tiên, tôi rửa tay."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "NEXT = the second step",
        rule_vi: "NEXT = bước thứ hai",
        example_en: "Next, I spread jam on the bread.",
        example_vi: "Tiếp theo, tôi phết mứt lên bánh mì."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "THEN = a step in the middle",
        rule_vi: "THEN = một bước ở giữa",
        example_en: "Then, I put the two slices together.",
        example_vi: "Sau đó, tôi ghép hai lát bánh lại."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "FINALLY = the last step (at the end)",
        rule_vi: "FINALLY = bước cuối cùng",
        example_en: "Finally, I ate my sandwich.",
        example_vi: "Cuối cùng, tôi ăn bánh sandwich."
      }
    ]
  },
''', 'W25 easy')

# ─── W26 EASY ────────────────────────────────────────────────────────────────
inject(f'{EAS}/week_26/grammar.js', '''  grammar_explanation: {
    title_en: "Past Simple: was, were, and -ed verbs",
    title_vi: "Quá Khứ Đơn: was, were và động từ -ed",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "WAS — use with I, He, She, It in the past",
        rule_vi: "WAS — dùng với I, He, She, It trong quá khứ",
        example_en: "Leo was happy. It was a great day.",
        example_vi: "Leo đã vui. Đó là một ngày tuyệt vời."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "WERE — use with We, You, They in the past",
        rule_vi: "WERE — dùng với We, You, They trong quá khứ",
        example_en: "They were tired. We were happy.",
        example_vi: "Họ đã mệt. Chúng tôi đã vui."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "REGULAR VERBS + -ED — add -ed to tell about the past",
        rule_vi: "ĐỘNG TỪ CÓ QUY TẮC + -ED — thêm -ed để nói về quá khứ",
        example_en: "Leo drew the panels. He coloured them in.",
        example_vi: "Leo đã vẽ các ô truyện. Anh ấy đã tô màu chúng."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "SEQUENCE WORDS: First, Then, After that, Finally",
        rule_vi: "TỪ TRÌNH TỰ: First, Then, After that, Finally",
        example_en: "First, Leo wrote the title. Then, he drew the panels.",
        example_vi: "Đầu tiên, Leo viết tiêu đề. Sau đó, anh ấy vẽ các ô."
      }
    ]
  },
''', 'W26 easy')

# ─── W27 EASY ────────────────────────────────────────────────────────────────
inject(f'{EAS}/week_27/grammar.js', '''  grammar_explanation: {
    title_en: "Present Simple for Facts: it grows, it needs",
    title_vi: "Hiện Tại Đơn cho sự thật: it grows, it needs",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "FACTS — use Present Simple for things that are always true",
        rule_vi: "SỰ THẬT — dùng Hiện Tại Đơn cho điều luôn đúng",
        example_en: "A plant grows. A seed needs water.",
        example_vi: "Cây lớn lên. Hạt giống cần nước."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "HE / SHE / IT — add -S to the verb",
        rule_vi: "HE / SHE / IT — thêm -S vào động từ",
        example_en: "It grows. It needs. The root absorbs water.",
        example_vi: "Nó lớn. Nó cần. Rễ hấp thụ nước."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "I / YOU / WE / THEY — no -S on the verb",
        rule_vi: "I / YOU / WE / THEY — không thêm -S vào động từ",
        example_en: "We grow plants. They need sunlight.",
        example_vi: "Chúng tôi trồng cây. Chúng cần ánh sáng mặt trời."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "SEQUENCE WORDS to order natural steps",
        rule_vi: "TỪ TRÌNH TỰ để sắp xếp các bước tự nhiên",
        example_en: "First, a seed is planted. Then, it sprouts. Finally, it blooms.",
        example_vi: "Đầu tiên, hạt được gieo. Sau đó, nó nảy mầm. Cuối cùng, nó nở hoa."
      }
    ]
  },
''', 'W27 easy')

# ─── W28 EASY ────────────────────────────────────────────────────────────────
inject(f'{EAS}/week_28/grammar.js', '''  grammar_explanation: {
    title_en: "Past Simple: Regular and Irregular Verbs",
    title_vi: "Quá Khứ Đơn: Động từ có quy tắc và bất quy tắc",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "PAST SIMPLE — use it for things that happened in the past",
        rule_vi: "QUÁ KHỨ ĐƠN — dùng cho những gì đã xảy ra trong quá khứ",
        example_en: "The hare ran fast. The tortoise walked slowly.",
        example_vi: "Con thỏ đã chạy nhanh. Con rùa đã đi chậm rãi."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "REGULAR — add -ED: cheer→cheered, laugh→laughed",
        rule_vi: "CÓ QUY TẮC — thêm -ED: cheer→cheered, laugh→laughed",
        example_en: "The animals cheered. The hare laughed.",
        example_vi: "Các con vật đã cổ vũ. Con thỏ đã cười."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "IRREGULAR — spelling changes: run→ran, sleep→slept, win→won",
        rule_vi: "BẤT QUY TẮC — thay đổi chính tả: run→ran, sleep→slept, win→won",
        example_en: "The hare slept. The tortoise won the race.",
        example_vi: "Con thỏ đã ngủ. Con rùa đã thắng cuộc đua."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "NEGATIVE — DID NOT (didn't) + base verb",
        rule_vi: "PHỦ ĐỊNH — DID NOT (didn't) + động từ gốc",
        example_en: "He didn't stop. She didn't give up.",
        example_vi: "Anh ấy đã không dừng. Cô ấy đã không bỏ cuộc."
      }
    ]
  },
''', 'W28 easy')

# ─── W29 EASY ────────────────────────────────────────────────────────────────
inject(f'{EAS}/week_29/grammar.js', '''  grammar_explanation: {
    title_en: "Past Simple: go→went, run→ran, come→came, fly→flew",
    title_vi: "Quá Khứ Đơn: go→went, run→ran, come→came, fly→flew",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "PAST SIMPLE — use for things that happened in the past",
        rule_vi: "QUÁ KHỨ ĐƠN — dùng cho những gì đã xảy ra",
        example_en: "We went. Dad ran. Mum came. We flew.",
        example_vi: "Chúng tôi đã đi. Bố đã chạy. Mẹ đã đến. Chúng tôi đã bay."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "go → went (NOT goed!)",
        rule_vi: "go → went (KHÔNG phải goed!)",
        example_en: "We went to the airport by taxi.",
        example_vi: "Chúng tôi đã đến sân bay bằng taxi."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "run → ran (NOT runned!)",
        rule_vi: "run → ran (KHÔNG phải runned!)",
        example_en: "Dad ran to the gate because we were late.",
        example_vi: "Bố đã chạy đến cổng vì chúng tôi trễ."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "come → came | fly → flew (NOT comed or flyed!)",
        rule_vi: "come → came | fly → flew (KHÔNG phải comed hoặc flyed!)",
        example_en: "Mum came with the bags. We flew in a plane.",
        example_vi: "Mẹ đã đến với hành lý. Chúng tôi đã bay trên máy bay."
      }
    ]
  },
''', 'W29 easy')

# ─── W30 EASY ────────────────────────────────────────────────────────────────
inject(f'{EAS}/week_30/grammar.js', '''  grammar_explanation: {
    title_en: "Past Simple: eat→ate, drink→drank, buy→bought, give→gave",
    title_vi: "Quá Khứ Đơn: eat→ate, drink→drank, buy→bought, give→gave",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "PAST SIMPLE — use for things that happened in the past",
        rule_vi: "QUÁ KHỨ ĐƠN — dùng cho những gì đã xảy ra",
        example_en: "They ate. Luna drank. Mum bought. Luna gave.",
        example_vi: "Họ đã ăn. Luna đã uống. Mẹ đã mua. Luna đã tặng."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "eat → ate (NOT eated!)",
        rule_vi: "eat → ate (KHÔNG phải eated!)",
        example_en: "They ate sandwiches at the picnic.",
        example_vi: "Họ đã ăn bánh sandwich tại buổi dã ngoại."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "drink → drank (NOT drinked!)",
        rule_vi: "drink → drank (KHÔNG phải drinked!)",
        example_en: "Luna drank cold apple juice.",
        example_vi: "Luna đã uống nước táo lạnh."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "buy → bought | give → gave (NOT buyed or gived!)",
        rule_vi: "buy → bought | give → gave (KHÔNG phải buyed hoặc gived!)",
        example_en: "Mum bought fruits. Luna gave some cookies to her friends.",
        example_vi: "Mẹ đã mua trái cây. Luna đã tặng bánh quy cho bạn bè."
      }
    ]
  },
''', 'W30 easy')

# ─── REPORT ──────────────────────────────────────────────────────────────────
print(f'\n{"─"*50}')
if ERRORS:
    print(f'❌ {len(ERRORS)} errors:')
    for e in ERRORS:
        print(f'  {e}')
else:
    print('🎉 All done!')
