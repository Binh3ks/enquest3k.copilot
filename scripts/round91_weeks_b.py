"""
scripts/round91_weeks_b.py
Pedagogical Data Definitions for Task B: W40, W42, W44
"""

W40_DATA = {
    "week": 40,
    "theme": "Beast Battle (Comparisons)",
    "title_vi": "Cuộc chiến Quái thú",
    "grammar_focus": "Comparatives (-er than): faster, stronger, bigger",
    "vocab": [
        {"id": 1, "word": "teeth", "pos": "n", "ipa": "/tiːθ/", "definition_en": "Hard white parts in mouth that bite food.", "definition_vi": "răng", "example_en": "The hungry tiger showed its sharp white teeth.", "example_vi": "Chú hổ đói nhe hàm răng trắng sắc nhọn của mình."},
        {"id": 2, "word": "claws", "pos": "n", "ipa": "/klɔːz/", "definition_en": "Sharp curved nails on animal paws.", "definition_vi": "móng vuốt", "example_en": "Grizzly bears use their long claws to catch salmon.", "example_vi": "Gấu xám dùng những móng vuốt dài để bắt cá hồi."},
        {"id": 3, "word": "fur", "pos": "n", "ipa": "/fɜːr/", "definition_en": "The thick soft hair covering an animal.", "definition_vi": "bộ lông", "example_en": "The spotted leopard has thick fur to stay warm.", "example_vi": "Báo hoa mai có bộ lông dày để giữ ấm."},
        {"id": 4, "word": "skin", "pos": "n", "ipa": "/skɪn/", "definition_en": "The outer natural cover of animal body.", "definition_vi": "da", "example_en": "Crocodiles have thick tough skin to protect themselves.", "example_vi": "Cá sấu có lớp da dày dai để tự bảo vệ."},
        {"id": 5, "word": "heavy", "pos": "adj", "ipa": "/ˈhevi/", "definition_en": "Having great weight and hard to lift.", "definition_vi": "nặng", "example_en": "A grizzly bear is much heavier than a forest wolf.", "example_vi": "Một chú gấu xám nặng hơn nhiều so với sói rừng."},
        {"id": 6, "word": "light", "pos": "adj", "ipa": "/laɪt/", "definition_en": "Having little physical weight.", "definition_vi": "nhẹ", "example_en": "Small birds have light bones so they can fly easily.", "example_vi": "Chim nhỏ có xương nhẹ để bay dễ dàng."},
        {"id": 7, "word": "predator", "pos": "n", "ipa": "/ˈpredətər/", "definition_en": "An animal that hunts other animals for food.", "definition_vi": "thú săn mồi", "example_en": "The African lion is a famous predator on grassy plains.", "example_vi": "Sư tử châu Phi là thú săn mồi nổi tiếng trên đồng cỏ."},
        {"id": 8, "word": "stronger", "pos": "adj", "ipa": "/ˈstrɔːŋɡər/", "definition_en": "Having more muscular power and body force.", "definition_vi": "khỏe hơn", "example_en": "The male tiger is stronger than the agile leopard.", "example_vi": "Hổ đực khỏe hơn so với báo hoa mai nhanh nhẹn."},
        {"id": 9, "word": "faster", "pos": "adj", "ipa": "/ˈfæstər/", "definition_en": "Moving with greater speed than another.", "definition_vi": "nhanh hơn", "example_en": "The swift cheetah runs faster than any wild predator.", "example_vi": "Báo săn nhanh nhẹn chạy nhanh hơn bất kỳ thú săn mồi nào."},
        {"id": 10, "word": "sharp", "pos": "adj", "ipa": "/ʃɑːrp/", "definition_en": "Having a fine edge that cuts easily.", "definition_vi": "sắc nhọn", "example_en": "Hunting eagles have sharp talons to grab slippery fish.", "example_vi": "Đại bàng săn mồi có móng vuốt sắc để chộp cá trơn."},
        {"id": 11, "word": "stripe", "pos": "n", "ipa": "/straɪp/", "definition_en": "A long narrow band of color on coat.", "definition_vi": "sọc vằn", "example_en": "Each tiger carries a unique pattern of dark stripes.", "example_vi": "Mỗi con hổ mang một kiểu sọc tối màu độc nhất."},
        {"id": 12, "word": "spot", "pos": "n", "ipa": "/spɑːt/", "definition_en": "A small round mark of different color.", "definition_vi": "đốm", "example_en": "The young leopard has dark spots on its yellow fur.", "example_vi": "Báo hoa mai non có các đốm đen trên bộ lông vàng."},
        {"id": 13, "word": "powerful", "pos": "adj", "ipa": "/ˈpaʊərfəl/", "definition_en": "Having great strength and natural energy.", "definition_vi": "hùng mạnh", "example_en": "Lions have powerful jaws that can hold heavy prey.", "example_vi": "Sư tử có bộ hàm mạnh mẽ giữ được con mồi nặng."},
        {"id": 14, "word": "leopard", "pos": "n", "ipa": "/ˈlepərd/", "definition_en": "A large spotted cat that climbs trees.", "definition_vi": "báo hoa mai", "example_en": "The clever leopard pulled its food up into a tree.", "example_vi": "Con báo hoa mai thông minh kéo thức ăn lên cây."},
        {"id": 15, "word": "grizzly", "pos": "n", "ipa": "/ˈɡrɪzli/", "definition_en": "A large brown bear from northern forests.", "definition_vi": "gấu xám", "example_en": "The big grizzly walked slowly along the river bank.", "example_vi": "Con gấu xám to lớn bước đi chậm rãi dọc bờ sông."},
        {"id": 16, "word": "muscle", "pos": "n", "ipa": "/ˈmʌsəl/", "definition_en": "Body tissue that creates force and movement.", "definition_vi": "cơ bắp", "example_en": "Running builds strong leg muscles in active wild cats.", "example_vi": "Chạy nhảy giúp phát triển cơ chân ở các loài mèo rừng."},
        {"id": 17, "word": "compare", "pos": "v", "ipa": "/kəmˈper/", "definition_en": "To look at differences in size and weight.", "definition_vi": "so sánh", "example_en": "Students compare the body weights of different hunters.", "example_vi": "Học sinh so sánh trọng lượng cơ thể của các loài săn mồi."},
        {"id": 18, "word": "jaw", "pos": "n", "ipa": "/dʒɔː/", "definition_en": "The mouth bone structure holding the teeth.", "definition_vi": "hàm", "example_en": "The crocodile snapped its large jaw shut in water.", "example_vi": "Con cá sấu ngoạm mạnh bộ hàm to trong nước."},
        {"id": 19, "word": "weigh", "pos": "v", "ipa": "/weɪ/", "definition_en": "To measure the heaviness of something.", "definition_vi": "cân nặng", "example_en": "Adult tigers can weigh over two hundred kilograms.", "example_vi": "Hổ trưởng thành có thể nặng hơn hai trăm ki-lô-gam."},
        {"id": 20, "word": "swift", "pos": "adj", "ipa": "/swɪft/", "definition_en": "Moving very fast and smoothly.", "definition_vi": "nhanh nhẹn", "example_en": "The swift cheetah darted across the golden savanna plain.", "example_vi": "Con báo săn nhanh nhẹn lao qua đồng cỏ savanna vàng óng."}
    ],
    "clil": {
        "title_en": "Predators of the Wild World",
        "title_vi": "Các loài Thú Săn Mồi trong Thế Giới Tự Nhiên",
        "content_en": "In nature, scientists compare different animals to see who is faster and stronger. The cheetah is a swift predator with golden fur and black spots. It has light bones and strong leg muscles that help it sprint across the plain. In contrast, the tiger is much heavier and has powerful jaws with sharp white teeth. Each tiger has dark stripes on its thick skin. A grizzly bear has long claws that help it dig and climb. Male bears can weigh three hundred kilograms! Both leopards and bears rely on their strength to stay safe in the wild.",
        "glossary": [
            {"word": "predator", "definition_en": "An animal that hunts other animals", "definition_vi": "thú săn mồi"},
            {"word": "stronger", "definition_en": "Having more physical power", "definition_vi": "khỏe hơn"},
            {"word": "faster", "definition_en": "Moving with greater speed", "definition_vi": "nhanh hơn"},
            {"word": "claws", "definition_en": "Sharp curved nails on paws", "definition_vi": "móng vuốt"},
            {"word": "compare", "definition_en": "To examine differences", "definition_vi": "so sánh"}
        ],
        "check_questions": [
            {"id": 1, "question_en": "Which animal is described as faster and swift?", "options": ["The cheetah", "The grizzly bear", "The crocodile"], "answer": "The cheetah"},
            {"id": 2, "question_en": "What helps the grizzly bear dig and climb?", "options": ["Long claws", "Spotted fur", "Light bones"], "answer": "Long claws"},
            {"id": 3, "question_en": "Why do male tigers weigh more than leopards?", "options": ["They have heavier bodies and muscles", "They have wings", "They live in trees"], "answer": "They have heavier bodies and muscles"}
        ]
    },
    "story": [
        {"scene": 1, "title": "At the Natural History Museum", "narration_en": "Oliver and Sophia walked into the predator gallery on Friday afternoon.", "narration_vi": "Oliver và Sophia bước vào phòng trưng bày thú săn mồi vào chiều thứ Sáu.", "dialogue": [{"speaker": "Oliver", "text": "Look at that huge Siberian tiger skeleton!"}, {"speaker": "Sophia", "text": "Its teeth look sharper than a knife!"}]},
        {"scene": 2, "title": "Comparing Weight Scales", "narration_en": "They stepped onto an interactive scale that compared animal weights.", "narration_vi": "Họ bước lên chiếc cân tương tác so sánh trọng lượng động vật.", "dialogue": [{"speaker": "Oliver", "text": "A grizzly bear can weigh three hundred kilograms!"}, {"speaker": "Sophia", "text": "That is heavier than five grown men combined!"}]},
        {"scene": 3, "title": "The Speed Simulator", "narration_en": "Next, they tried the running track to test predator speeds.", "narration_vi": "Tiếp theo, họ thử đường chạy để kiểm tra tốc độ săn mồi.", "dialogue": [{"speaker": "Oliver", "text": "Can you run faster than a spotted leopard?"}, {"speaker": "Sophia", "text": "No, leopards run much faster than humans!"}]},
        {"scene": 4, "title": "Claws and Muscles", "narration_en": "Sophia examined casts of bear claws and lion jaw muscles.", "narration_vi": "Sophia quan sát khuôn đúc móng vuốt gấu và cơ hàm sư tử.", "dialogue": [{"speaker": "Sophia", "text": "These claws are curved to grip slippery salmon."}, {"speaker": "Oliver", "text": "And the lion's powerful jaw can crush hard bones."}]},
        {"scene": 5, "title": "The Beast Battle Quiz", "narration_en": "At the museum exit, they completed the beast battle comparison challenge.", "narration_vi": "Tại lối ra bảo tàng, họ hoàn thành thử thách so sánh quái thú.", "dialogue": [{"speaker": "Oliver", "text": "We scored fifteen points on animal comparisons!"}, {"speaker": "Sophia", "text": "Every predator has special strengths to survive!"}]}
    ],
    "shadowing": [
        {"id": 1, "text": "The tiger has sharper teeth than the leopard.", "ipa": "/ðə ˈtaɪɡər hæz ˈʃɑːrpər tiːθ ðæn ðə ˈlepərd./"},
        {"id": 2, "text": "Cheetahs run faster than lions across the savanna.", "ipa": "/ˈtʃiːtəz rʌn ˈfæstər ðæn ˈlaɪənz əˈkrɔːs ðə səˈvænə./"},
        {"id": 3, "text": "A grizzly bear is much heavier than a wolf.", "ipa": "/ə ˈɡrɪzli ber ɪz mʌtʃ ˈheviər ðæn ə wʊlf./"},
        {"id": 4, "text": "The leopard has dark spots on its golden fur.", "ipa": "/ðə ˈlepərd hæz dɑːrk spɑːts ɑːn ɪts ˈɡoʊldən fɜːr./"},
        {"id": 5, "text": "Lions have powerful jaws and strong neck muscles.", "ipa": "/ˈlaɪənz hæv ˈpaʊərfəl dʒɔːz ænd strɔːŋ nek ˈmʌsəlz./"},
        {"id": 6, "text": "Scientists compare animal speed and body strength.", "ipa": "/ˈsaɪəntɪsts kəmˈper ˈænɪməl spiːd ænd ˈbɑːdi strɛŋkθ./"},
        {"id": 7, "text": "The swift cheetah catches prey with great speed.", "ipa": "/ðə swɪft ˈtʃiːtə ˈkætʃɪz preɪ wɪð ɡreɪt spiːd./"},
        {"id": 8, "text": "Tough skin protects wild animals from sharp thorns.", "ipa": "/tʌf skɪn prəˈtekts waɪld ˈænɪməlz frʌm ʃɑːrp θɔːrnz./"}
    ],
    "cambridge_rw": {
        "part1": {
            "word_bank": ["teeth", "claws", "fur", "predator", "muscle", "leopard", "grizzly", "stripe", "jaw", "swift"],
            "definitions": [
                {"id": 1, "description": "Sharp curved nails on the paws of hunting animals.", "word": "claws"},
                {"id": 2, "description": "The thick soft hair covering an animal's body.", "word": "fur"},
                {"id": 3, "description": "An animal that hunts and catches other creatures for food.", "word": "predator"},
                {"id": 4, "description": "Hard white parts in the mouth used to bite food.", "word": "teeth"},
                {"id": 5, "description": "A large wild cat with dark spots that climbs trees.", "word": "leopard"}
            ]
        },
        "part2": {
            "title": "Oliver & Sophia at the Predator Exhibit",
            "turns": [
                {"speaker": "Oliver", "statement": "Sophia, look at the tiger's teeth!", "options": ["They look very sharp!", "It is blue.", "Yesterday morning."], "answer": "They look very sharp!"},
                {"speaker": "Sophia", "statement": "Do you think a cheetah is stronger than a tiger?", "options": ["No, the tiger is much stronger.", "Yes, it has wings.", "At five o'clock."], "answer": "No, the tiger is much stronger."},
                {"speaker": "Oliver", "statement": "How heavy can a grizzly bear be?", "options": ["It can weigh three hundred kilograms.", "It is walking home.", "In the kitchen."], "answer": "It can weigh three hundred kilograms."},
                {"speaker": "Sophia", "statement": "Which animal runs faster across the open grass?", "options": ["The cheetah runs faster than all others.", "I like apples.", "Tomorrow afternoon."], "answer": "The cheetah runs faster than all others."},
                {"speaker": "Oliver", "statement": "Shall we try the beast battle computer quiz next?", "options": ["Yes, let's start the quiz now!", "No, I am asleep.", "Because it was raining."], "answer": "Yes, let's start the quiz now!"}
            ],
            "exchanges": [
                {"speaker": "Oliver", "text": "Sophia, look at the tiger's teeth!"},
                {"speaker": "Sophia", "text": "They look very sharp!"},
                {"speaker": "Oliver", "text": "Do you think a cheetah is stronger than a tiger?"},
                {"speaker": "Sophia", "text": "No, the tiger is much stronger."}
            ]
        },
        "part6": {
            "title": "A Day in the Big Cat Reserve",
            "instructions": "Read the diary and write one word in each gap.",
            "text_template": "Yesterday we visited the wildlife park. We saw a tiger that was much {1} than a leopard. The cheetah was the {2} runner in the reserve. The keeper gave meat to the bear with very long {3}. The lion had powerful {4} to chew food. We enjoyed learning how to {5} different wild animals.",
            "answers": {"1": "bigger", "2": "fastest", "3": "claws", "4": "teeth", "5": "compare"}
        }
    },
    "writing": {
        "title": "The Big Cat Comparison Challenge",
        "prompt_en": "Look at the three pictures comparing predators. Write a story about two rangers tracking animal footprints. Write 20 or more words.",
        "prompt_vi": "Nhìn 3 bức tranh so sánh thú săn mồi. Kể câu chuyện về 2 kiểm lâm theo dõi dấu chân động vật (từ 20 từ trở lên).",
        "min_sentences": 3,
        "min_words": 20,
        "max_words": 80,
        "model_sentence": "Ranger Tom and Maya walked along the river bank. First, they noticed heavy bear tracks with deep claw marks in the mud. Next, they saw swift cheetah footprints near the open savanna. In the end, they recorded that the grizzly bear was much heavier than the cheetah.",
        "word_bank": ["predator", "claws", "heavy", "faster", "stronger", "fur", "teeth", "compare"],
        "sentence_frames": [
            "First, the rangers noticed ___ tracks in the mud.",
            "Next, they saw that the tiger was ___ than the leopard.",
            "Finally, they agreed that each predator was ___ in its habitat."
        ],
        "panels": [
            {"panel": 1, "description": "Rangers find deep claw footprints in the soft mud."},
            {"panel": 2, "description": "They compare the size of tiger tracks with cheetah tracks."},
            {"panel": 3, "description": "They write notes in their wildlife journal about predator weights."}
        ]
    },
    "speaking": {
        "talkshow_prompt": {
            "topic": "Animal Comparisons",
            "question": "Which wild animal do you think is the strongest, and why?",
            "model_response": "I think the Siberian tiger is the strongest predator because it has powerful muscles and heavy bones! It can weigh over two hundred kilograms and hunt in deep snow. While cheetahs run faster, tigers are much stronger and have sharper teeth!"
        },
        "info_exchange_cards": {
            "table_a": {
                "title": "Marcus's Siberian Tiger Card",
                "subtitle": "Candidate Question Card",
                "person": "Marcus",
                "fields": [
                    {"id": "f1", "cue_prompt": "how heavy / tiger?", "cue_word": "how heavy", "is_missing": True, "acceptable_questions": ["How heavy is the tiger?", "How much does the tiger weigh?"], "nova_reply": "The male Siberian tiger weighs three hundred kilograms."},
                    {"id": "f2", "cue_prompt": "what color / stripes?", "cue_word": "color", "is_missing": True, "acceptable_questions": ["What color are its stripes?", "What color are the stripes?"], "nova_reply": "Its stripes are dark brown and black."},
                    {"id": "f3", "cue_prompt": "where / live?", "cue_word": "where", "is_missing": False, "card_value": "Russian cold pine forests", "examiner_question": "Where does the Siberian tiger live?"},
                    {"id": "f4", "cue_prompt": "how fast / run?", "cue_word": "speed", "is_missing": False, "card_value": "60 km per hour", "examiner_question": "How fast can the tiger run?"},
                    {"id": "f5", "cue_prompt": "what / eat?", "cue_word": "food", "is_missing": False, "card_value": "deer and wild boars", "examiner_question": "What does the tiger eat?"}
                ]
            },
            "table_b": {
                "title": "Sophia's African Cheetah Card",
                "subtitle": "Candidate Answer Card",
                "person": "Sophia",
                "fields": [
                    {"id": "fb1", "cue_prompt": "how heavy / cheetah?", "cue_word": "weight", "is_missing": False, "card_value": "60 kilograms", "examiner_question": "How heavy is the cheetah?"},
                    {"id": "fb2", "cue_prompt": "what / on fur?", "cue_word": "coat", "is_missing": False, "card_value": "small round black spots", "examiner_question": "What is on the cheetah's fur?"},
                    {"id": "fb3", "cue_prompt": "where / live?", "cue_word": "habitat", "is_missing": True, "acceptable_questions": ["Where does the cheetah live?", "What is its habitat?"], "nova_reply": "The cheetah lives in open African grasslands."},
                    {"id": "fb4", "cue_prompt": "how fast / run?", "cue_word": "speed", "is_missing": True, "acceptable_questions": ["How fast can the cheetah run?", "What is its top speed?"], "nova_reply": "It can run up to one hundred and ten kilometers per hour."},
                    {"id": "fb5", "cue_prompt": "what / eat?", "cue_word": "prey", "is_missing": True, "acceptable_questions": ["What does the cheetah eat?", "What is its food?"], "nova_reply": "The cheetah hunts small gazelles and hares."}
                ]
            }
        }
    },
    "math_problems": [
        {
            "id": 1,
            "type": "comparison",
            "title": "Tiger and Cheetah Body Weight Comparison",
            "problemText": "A male Siberian tiger weighs 300 kilograms. A cheetah weighs 60 kilograms. How many kilograms heavier is the tiger than the cheetah?",
            "question": "A male Siberian tiger weighs 300 kilograms. A cheetah weighs 60 kilograms. How many kilograms heavier is the tiger than the cheetah?",
            "correctAnswer": 240,
            "target_answer": 240,
            "unit": "kg",
            "hintText": "Subtract the cheetah's weight (60 kg) from the tiger's weight (300 kg).",
            "steps": ["Tiger weight: 300 kg.", "Cheetah weight: 60 kg.", "Difference: 300 - 60 = 240 kg heavier."],
            "modelData": {
                "type": "comparison",
                "bars": [
                    {"label": "Tiger", "value": 300, "color": "#e67e22"},
                    {"label": "Cheetah", "value": 60, "color": "#f1c40f"}
                ],
                "difference": 240,
                "differenceLabel": "Difference: 240 kg"
            }
        },
        {
            "id": 2,
            "type": "comparison",
            "title": "Predator Sprint Speed Comparison",
            "problemText": "A sprinting cheetah can reach a top speed of 110 kilometers per hour. A lion can run at 80 kilometers per hour. How many kilometers per hour faster is the cheetah than the lion?",
            "question": "A sprinting cheetah can reach a top speed of 110 kilometers per hour. A lion can run at 80 kilometers per hour. How many kilometers per hour faster is the cheetah than the lion?",
            "correctAnswer": 30,
            "target_answer": 30,
            "unit": "km/h",
            "hintText": "Subtract 80 km/h from 110 km/h.",
            "steps": ["Cheetah speed: 110 km/h.", "Lion speed: 80 km/h.", "110 - 80 = 30 km/h faster."],
            "modelData": {
                "type": "comparison",
                "bars": [
                    {"label": "Cheetah", "value": 110, "color": "#f39c12"},
                    {"label": "Lion", "value": 80, "color": "#d35400"}
                ],
                "difference": 30,
                "differenceLabel": "Difference: 30 km/h"
            }
        },
        {
            "id": 3,
            "type": "part_whole",
            "title": "Wildlife Reserve Big Cat Census",
            "problemText": "A wildlife reserve protects 48 lions in the eastern valley and 36 tigers in the western hills. How many big cat predators are protected in the reserve altogether?",
            "question": "A wildlife reserve protects 48 lions in the eastern valley and 36 tigers in the western hills. How many big cat predators are protected in the reserve altogether?",
            "correctAnswer": 84,
            "target_answer": 84,
            "unit": "big cats",
            "hintText": "Add the lions (48) and tigers (36) together.",
            "steps": ["Lions in eastern valley: 48.", "Tigers in western hills: 36.", "Total big cats: 48 + 36 = 84."],
            "modelData": {
                "type": "part_whole",
                "bars": [
                    {"label": "Lions", "value": 48, "color": "#e67e22"},
                    {"label": "Tigers", "value": 36, "color": "#d35400"}
                ],
                "total": 84,
                "totalLabel": "Total: 84 big cats"
            }
        },
        {
            "id": 4,
            "type": "comparison",
            "title": "Grizzly and Black Bear Weight",
            "problemText": "A large grizzly bear weighs 280 kilograms at the start of autumn. A black bear weighs 130 kilograms. How many kilograms heavier is the grizzly bear than the black bear?",
            "question": "A large grizzly bear weighs 280 kilograms at the start of autumn. A black bear weighs 130 kilograms. How many kilograms heavier is the grizzly bear than the black bear?",
            "correctAnswer": 150,
            "target_answer": 150,
            "unit": "kg",
            "hintText": "Subtract the black bear weight (130) from the grizzly weight (280).",
            "steps": ["Grizzly weight: 280 kg.", "Black bear weight: 130 kg.", "Difference: 280 - 130 = 150 kg."],
            "modelData": {
                "type": "comparison",
                "bars": [
                    {"label": "Grizzly", "value": 280, "color": "#795548"},
                    {"label": "Black Bear", "value": 130, "color": "#424242"}
                ],
                "difference": 150,
                "differenceLabel": "Difference: 150 kg"
            }
        },
        {
            "id": 5,
            "type": "before_after",
            "title": "Wolf Pack Valley Tracking",
            "problemText": "A wolf pack had 25 wolves roaming together in the snow valley. During the afternoon hunt, 8 wolves crossed the river to the ridge. How many wolves remained in the valley?",
            "question": "A wolf pack had 25 wolves roaming together in the snow valley. During the afternoon hunt, 8 wolves crossed the river to the ridge. How many wolves remained in the valley?",
            "correctAnswer": 17,
            "target_answer": 17,
            "unit": "wolves",
            "hintText": "Subtract the 8 wolves that crossed the river from the 25 total wolves.",
            "steps": ["Total pack members: 25 wolves.", "Wolves crossing river: 8.", "Remaining wolves: 25 - 8 = 17 wolves."],
            "modelData": {
                "type": "before_after",
                "bars": [
                    {"label": "Initial Pack", "value": 25, "color": "#607d8b"},
                    {"label": "Crossed River", "value": 8, "color": "#90a4ae"},
                    {"label": "Remaining", "value": 17, "color": "#37474f"}
                ],
                "finalValue": 17,
                "label": "Remaining: 17 wolves"
            }
        }
    ],
    "action_lab": [
        {
            "stage": 1,
            "title": "Predator Feature Matching",
            "instruction": "Match each physical hunting tool to its specialized animal.",
            "items": [
                {"label": "Sharp Retractable Claws", "target": "Leopard"},
                {"label": "Spotted Camouflage Fur", "target": "Cheetah"},
                {"label": "Heavy Crushing Jaw", "target": "Grizzly Bear"}
            ]
        },
        {
            "stage": 2,
            "title": "Speed vs Power Comparison",
            "instruction": "Sort predators into speed specialists or strength specialists.",
            "items": [
                {"label": "Lightweight Cheetah", "target": "Speed Specialist"},
                {"label": "Heavy Siberian Tiger", "target": "Strength Specialist"},
                {"label": "Muscular Grizzly", "target": "Strength Specialist"}
            ]
        },
        {
            "stage": 3,
            "title": "Habitat Adaptations",
            "instruction": "Place each hunter into its natural ecosystem.",
            "items": [
                {"label": "Striped Tiger", "target": "Dense Jungle"},
                {"label": "Spotted Cheetah", "target": "Open Savanna"},
                {"label": "Thick-Furred Bear", "target": "Pine Mountain"}
            ]
        }
    ],
    "grammar_drills": [
        {"sentence": "The male tiger is ___ than the spotted leopard.", "options": ["stronger", "strong", "strongest"], "answer": "stronger", "explanation": "Use comparative -er with 'than' to compare two animals."},
        {"sentence": "Cheetahs can run ___ than heavy grizzly bears.", "options": ["faster", "fast", "fastest"], "answer": "faster", "explanation": "Use comparative 'faster' when comparing two speeds."},
        {"sentence": "A polar bear is much ___ than an arctic fox.", "options": ["heavier", "heavy", "heaviest"], "answer": "heavier", "explanation": "Change -y to -ier for comparative 'heavier'."},
        {"sentence": "Eagles have ___ talons than songbirds.", "options": ["sharper", "sharp", "sharpest"], "answer": "sharper", "explanation": "Use comparative 'sharper' with two items."},
        {"sentence": "Elephants are ___ than wild savanna lions.", "options": ["bigger", "big", "biggest"], "answer": "bigger", "explanation": "Double the consonant 'g' in comparative 'bigger'."}
    ]
}

W42_DATA = {
    "week": 42,
    "theme": "The Water Journey (Cycle)",
    "title_vi": "Hành trình của Nước",
    "grammar_focus": "Review Sequencing + Present Tense",
    "vocab": [
        {"id": 1, "word": "sun", "pos": "n", "ipa": "/sʌn/", "definition_en": "The bright star warming planet Earth.", "definition_vi": "mặt trời", "example_en": "The warm sun shines down on the ocean.", "example_vi": "Mặt trời ấm áp chiếu sáng xuống đại dương."},
        {"id": 2, "word": "cloud", "pos": "n", "ipa": "/klaʊd/", "definition_en": "A white shape of water drops in air.", "definition_vi": "mây", "example_en": "Dark rain clouds gathered before the morning storm.", "example_vi": "Mây mưa đen kịt tụ lại trước cơn bão sáng."},
        {"id": 3, "word": "rain", "pos": "n", "ipa": "/reɪn/", "definition_en": "Water drops falling from sky to ground.", "definition_vi": "mưa", "example_en": "Gentle rain falls softly on the green valley.", "example_vi": "Cơn mưa dịu dàng rơi êm ả xuống thung lũng xanh."},
        {"id": 4, "word": "river", "pos": "n", "ipa": "/ˈrɪvər/", "definition_en": "A natural stream of water flowing to sea.", "definition_vi": "dòng sông", "example_en": "The river carries fresh water to the ocean.", "example_vi": "Dòng sông mang nước ngọt ra đại dương."},
        {"id": 5, "word": "ocean", "pos": "n", "ipa": "/ˈoʊʃən/", "definition_en": "The huge body of salt water on Earth.", "definition_vi": "đại dương", "example_en": "Blue whales swim across the wide deep ocean.", "example_vi": "Cá voi xanh bơi qua đại dương sâu rộng."},
        {"id": 6, "word": "evaporation", "pos": "n", "ipa": "/ɪˌvæpəˈreɪʃən/", "definition_en": "Process of water warming into vapor.", "definition_vi": "sự bốc hơi", "example_en": "Solar heat causes quick evaporation from open puddles.", "example_vi": "Nhiệt mặt trời gây bốc hơi nhanh từ vũng nước."},
        {"id": 7, "word": "go up", "pos": "phr v", "ipa": "/ɡoʊ ʌp/", "definition_en": "To move higher toward the sky.", "definition_vi": "bốc lên, đi lên", "example_en": "Warm water vapors go up into cool air.", "example_vi": "Hơi nước ấm bốc lên vào tầng không khí mát."},
        {"id": 8, "word": "come down", "pos": "phr v", "ipa": "/kʌm daʊn/", "definition_en": "To fall lower toward the ground.", "definition_vi": "rơi xuống", "example_en": "Cool raindrops come down on the thirsty soil.", "example_vi": "Những giọt mưa mát lành rơi xuống vùng đất khô."},
        {"id": 9, "word": "vapor", "pos": "n", "ipa": "/ˈveɪpər/", "definition_en": "Water in form of an invisible gas.", "definition_vi": "hơi nước", "example_en": "Rising water vapor cools as it reaches high.", "example_vi": "Hơi nước bốc lên nguội dần khi lên cao."},
        {"id": 10, "word": "drop", "pos": "n", "ipa": "/drɑːp/", "definition_en": "A small round amount of liquid.", "definition_vi": "giọt nước", "example_en": "Each tiny drop of rain joins the stream.", "example_vi": "Mỗi giọt mưa nhỏ hòa vào dòng suối."},
        {"id": 11, "word": "cycle", "pos": "n", "ipa": "/ˈsaɪkəl/", "definition_en": "A series of repeating nature events.", "definition_vi": "chu trình", "example_en": "The water cycle repeats continuously on our planet.", "example_vi": "Chu trình nước lặp lại liên tục trên hành tinh."},
        {"id": 12, "word": "stream", "pos": "n", "ipa": "/striːm/", "definition_en": "A small narrow flowing river.", "definition_vi": "con suối", "example_en": "Trout swim in the cool mountain forest stream.", "example_vi": "Cá hồi bơi trong dòng suối rừng núi mát mẻ."},
        {"id": 13, "word": "flow", "pos": "v", "ipa": "/floʊ/", "definition_en": "To move steadily like a liquid river.", "definition_vi": "chảy", "example_en": "Clear rivers flow smoothly toward the sunny lake.", "example_vi": "Dòng sông trong lành chảy êm đềm về hồ nắng."},
        {"id": 14, "word": "puddle", "pos": "n", "ipa": "/ˈpʌdəl/", "definition_en": "A small pool of water on the ground.", "definition_vi": "vũng nước", "example_en": "Children jumped over the muddy rainwater puddle.", "example_vi": "Trẻ em nhảy qua vũng nước mưa đầy bùn."},
        {"id": 15, "word": "rise", "pos": "v", "ipa": "/raɪz/", "definition_en": "To move upward into higher space.", "definition_vi": "dâng lên, bốc lên", "example_en": "Warm air bubbles rise above heated ocean waters.", "example_vi": "Bọt khí ấm dâng lên trên mặt nước biển nóng."},
        {"id": 16, "word": "cool", "pos": "v", "ipa": "/kuːl/", "definition_en": "To lose warmth and become colder.", "definition_vi": "làm mát, nguội đi", "example_en": "Rising vapors cool and form fluffy white clouds.", "example_vi": "Hơi nước bốc lên nguội dần tạo thành mây trắng."},
        {"id": 17, "word": "sky", "pos": "n", "ipa": "/skaɪ/", "definition_en": "The open space high above the ground.", "definition_vi": "bầu trời", "example_en": "Flocks of birds fly across the morning sky.", "example_vi": "Đàn chim bay qua bầu trời buổi sáng."},
        {"id": 18, "word": "lake", "pos": "n", "ipa": "/leɪk/", "definition_en": "A large body of water bordered by land.", "definition_vi": "hồ nước", "example_en": "Boats sailed across the calm mountain lake.", "example_vi": "Những chiếc thuyền buồm lướt trên hồ núi phẳng lặng."},
        {"id": 19, "word": "surface", "pos": "n", "ipa": "/ˈsɜːrfɪs/", "definition_en": "The flat top boundary of a body of water.", "definition_vi": "bề mặt", "example_en": "Water evaporates from the warm lake surface.", "example_vi": "Nước bốc hơi từ bề mặt hồ ấm áp."},
        {"id": 20, "word": "heat", "pos": "n", "ipa": "/hiːt/", "definition_en": "Warmth and thermal energy from the sun.", "definition_vi": "nhiệt năng", "example_en": "Solar heat warms the ocean water every day.", "example_vi": "Nhiệt mặt trời sưởi ấm nước biển mỗi ngày."}
    ],
    "clil": {
        "title_en": "The Endless Journey of Water",
        "title_vi": "Hành trình Bất tận của Nước",
        "content_en": "Water on Earth moves in a continuous cycle that never stops. The sun delivers heat to the surface of the ocean and lake. This warmth causes evaporation, and invisible water vapor begins to rise. As tiny vapors go up into the sky, they cool down and form a puffy cloud. Inside the cloud, each small drop joins others until they become heavy. Then drops come down as cool rain! Rainwater lands in puddles and forest streams, which flow into a wide river. Finally, the river returns to the ocean, and the journey begins again.",
        "glossary": [
            {"word": "cycle", "definition_en": "A series of repeating events", "definition_vi": "chu trình"},
            {"word": "evaporation", "definition_en": "Liquid turning into invisible vapor", "definition_vi": "sự bốc hơi"},
            {"word": "vapor", "definition_en": "Water in gaseous state", "definition_vi": "hơi nước"},
            {"word": "surface", "definition_en": "The top layer of water", "definition_vi": "bề mặt"},
            {"word": "stream", "definition_en": "A small narrow river", "definition_vi": "con suối"}
        ],
        "check_questions": [
            {"id": 1, "question_en": "What powers the water cycle on Earth?", "options": ["The sun and its heat", "Moonlight", "Car engines"], "answer": "The sun and its heat"},
            {"id": 2, "question_en": "What happens when rising water vapor cools in the sky?", "options": ["It forms clouds", "It turns to stone", "It disappears forever"], "answer": "It forms clouds"},
            {"id": 3, "question_en": "Where do rainwater streams flow after falling?", "options": ["Into rivers and the ocean", "Into space", "Under buildings only"], "answer": "Into rivers and the ocean"}
        ]
    },
    "story": [
        {"scene": 1, "title": "A Rainy Morning by the Lake", "narration_en": "Lucas watched drops of water tapping against his window pane.", "narration_vi": "Lucas ngắm nhìn những giọt nước gõ vào ô cửa sổ.", "dialogue": [{"speaker": "Lucas", "text": "Look at all the rain filling the garden puddles!"}, {"speaker": "Emma", "text": "Where does all this rainwater come from?"}]},
        {"scene": 2, "title": "The Sun Comes Out", "narration_en": "By noon, the clouds parted and bright sunlight warmed the soil.", "narration_vi": "Đến trưa, mây tan và ánh nắng ấm áp sưởi ấm mặt đất.", "dialogue": [{"speaker": "Emma", "text": "The garden puddles are shrinking quickly!"}, {"speaker": "Lucas", "text": "That is evaporation happening right before our eyes."}]},
        {"scene": 3, "title": "Rising Into the Sky", "narration_en": "Their teacher explained how warm vapor rises into the blue sky.", "narration_vi": "Thầy giáo giải thích cách hơi nước ấm bốc lên bầu trời xanh.", "dialogue": [{"speaker": "Lucas", "text": "Does the vapor stay warm up high?"}, {"speaker": "Emma", "text": "No, it cools down and gathers into thick clouds."}]},
        {"scene": 4, "title": "The Mountain Stream Journey", "narration_en": "On Saturday, their class hiked along a rushing mountain stream.", "narration_vi": "Vào thứ Bảy, cả lớp đi bộ dọc con suối núi chảy xiết.", "dialogue": [{"speaker": "Emma", "text": "This clear stream flows down into the wide river."}, {"speaker": "Lucas", "text": "And the river carries it all the way to the ocean!"}]},
        {"scene": 5, "title": "Completing the Water Cycle", "narration_en": "They drew a colorful chart showing the complete nature loop.", "narration_vi": "Họ vẽ biểu đồ nhiều màu sắc thể hiện chu trình hoàn chỉnh.", "dialogue": [{"speaker": "Lucas", "text": "Water never disappears; it just keeps cycling!"}, {"speaker": "Emma", "text": "It is an endless journey around our planet!"}]}
    ],
    "shadowing": [
        {"id": 1, "text": "The bright sun warms water on the ocean surface.", "ipa": "/ðə braɪt sʌn wɔːrmz ˈwɔːtər ɑːn ðə ˈoʊʃən ˈsɜːrfɪs./"},
        {"id": 2, "text": "Warm vapors go up high into the open sky.", "ipa": "/wɔːrm ˈveɪpərz ɡoʊ ʌp haɪ ˈɪntuː ðə ˈoʊpən skaɪ./"},
        {"id": 3, "text": "Water droplets cool down to form puffy clouds.", "ipa": "/ˈwɔːtər ˈdrɑːplɪts kuːl daʊn tuː fɔːrm ˈpʌfi klaʊdz./"},
        {"id": 4, "text": "Heavy raindrops come down softly on the lake.", "ipa": "/ˈhevi ˈreɪndrɑːps kʌm daʊn ˈsɔːftli ɑːn ðə leɪk./"},
        {"id": 5, "text": "Clear forest streams flow quickly into the river.", "ipa": "/klɪr ˈfɔːrɪst striːmz floʊ ˈkwɪkli ˈɪntuː ðə ˈrɪvər./"},
        {"id": 6, "text": "Rain fills shallow puddles along the garden path.", "ipa": "/reɪn fɪlz ˈʃæloʊ ˈpʌdəlz əˈlɔːŋ ðə ˈɡɑːrdən pæθ./"},
        {"id": 7, "text": "The water cycle repeats every season on Earth.", "ipa": "/ðə ˈwɔːtər ˈsaɪkəl rɪˈpiːts ˈevri ˈsiːzən ɑːn ɜːrθ./"},
        {"id": 8, "text": "Solar heat powers evaporation across every ocean.", "ipa": "/ˈsoʊlər hiːt ˈpaʊərz ɪˌvæpəˈreɪʃən əˈkrɔːs ˈevri ˈoʊʃən./"}
    ],
    "cambridge_rw": {
        "part1": {
            "word_bank": ["sun", "cloud", "rain", "river", "ocean", "vapor", "cycle", "stream", "puddle", "lake"],
            "definitions": [
                {"id": 1, "description": "A very large body of salt water covering most of Earth.", "word": "ocean"},
                {"id": 2, "description": "Water drops that fall from gray clouds to the ground.", "word": "rain"},
                {"id": 3, "description": "Water in the form of an invisible gas in the air.", "word": "vapor"},
                {"id": 4, "description": "A small narrow stream of flowing water in nature.", "word": "stream"},
                {"id": 5, "description": "A series of natural events that repeats continuously.", "word": "cycle"}
            ]
        },
        "part2": {
            "title": "Lucas & Emma Discussing the Water Cycle",
            "turns": [
                {"speaker": "Lucas", "statement": "Where does all this garden rainwater go?", "options": ["It flows into the stream.", "In my backpack.", "At seven o'clock."], "answer": "It flows into the stream."},
                {"speaker": "Emma", "statement": "Why do puddles dry up so fast in the afternoon?", "options": ["Because the sun heats the water.", "Yes, it is Tuesday.", "Under the chair."], "answer": "Because the sun heats the water."},
                {"speaker": "Lucas", "statement": "What happens when warm water vapor rises high?", "options": ["It cools and forms clouds.", "It eats apples.", "Last weekend."], "answer": "It cools and forms clouds."},
                {"speaker": "Emma", "statement": "Does the river carry this water back to the ocean?", "options": ["Yes, it flows all the way to the sea.", "No, it is blue.", "I have three pencils."], "answer": "Yes, it flows all the way to the sea."},
                {"speaker": "Lucas", "statement": "Shall we finish our water cycle diagram now?", "options": ["Yes, let's color the rain clouds!", "Because I was tired.", "Tomorrow morning."], "answer": "Yes, let's color the rain clouds!"}
            ],
            "exchanges": [
                {"speaker": "Lucas", "text": "Where does all this garden rainwater go?"},
                {"speaker": "Emma", "text": "It flows into the stream."}
            ]
        },
        "part6": {
            "title": "A Raindrop's Big Adventure",
            "instructions": "Read the story and write one word in each gap.",
            "text_template": "First, the bright sun warmed the lake {1}. Next, water vapor began to {2} up into the sky. High in the cold air, vapors formed a fluffy {3}. Soon, heavy drops of {4} fell down on the forest. Finally, water flowed through a small {5} back to the lake.",
            "answers": {"1": "surface", "2": "go", "3": "cloud", "4": "rain", "5": "stream"}
        }
    },
    "writing": {
        "title": "Tracking a Raindrop Story",
        "prompt_en": "Look at the three pictures of the water journey. Write a story about a raindrop traveling from the cloud to the ocean. Write 20 or more words.",
        "prompt_vi": "Nhìn 3 bức tranh về hành trình của nước. Kể câu chuyện về một giọt nước từ đám mây ra đại dương (từ 20 từ trở lên).",
        "min_sentences": 3,
        "min_words": 20,
        "max_words": 80,
        "model_sentence": "A tiny raindrop fell from a gray cloud on Monday morning. First, it landed inside a forest puddle on the hillside. Next, it flowed into a rapid mountain stream with other droplets. In the end, the stream joined a wide river that carried the drop to the ocean.",
        "word_bank": ["cloud", "rain", "stream", "river", "ocean", "flow", "drop", "sun"],
        "sentence_frames": [
            "First, cool rain fell from a gray ___.",
            "Next, water gathered in a forest ___.",
            "Finally, the river carried the water to the ___."
        ],
        "panels": [
            {"panel": 1, "description": "Rain falling from dark clouds onto mountain trees."},
            {"panel": 2, "description": "Water flowing through a rocky woodland stream."},
            {"panel": 3, "description": "The river emptying fresh water into the sunny ocean."}
        ]
    },
    "speaking": {
        "talkshow_prompt": {
            "topic": "The Water Cycle",
            "question": "Can you explain how rain forms in the sky?",
            "model_response": "First, the sun warms water on the ocean surface, causing evaporation! As warm water vapor rises high into the sky, it cools down and turns into clouds. When the water droplets become heavy, they fall down as rain!"
        },
        "info_exchange_cards": {
            "table_a": {
                "title": "Lucas's Mountain Lake Study",
                "subtitle": "Candidate Question Card",
                "person": "Lucas",
                "fields": [
                    {"id": "fa1", "cue_prompt": "how deep / lake?", "cue_word": "depth", "is_missing": True, "acceptable_questions": ["How deep is the lake?", "What is the lake depth?"], "nova_reply": "The mountain lake is eighty-five meters deep."},
                    {"id": "fa2", "cue_prompt": "water / warm or cool?", "cue_word": "temperature", "is_missing": True, "acceptable_questions": ["Is the water warm or cool?", "What is the water temperature?"], "nova_reply": "The water is cool and clear."},
                    {"id": "fa3", "cue_prompt": "where / stream flow?", "cue_word": "flow", "is_missing": False, "card_value": "into the Pine River", "examiner_question": "Where does the mountain stream flow?"},
                    {"id": "fa4", "cue_prompt": "how much / rain / weekly?", "cue_word": "rainfall", "is_missing": False, "card_value": "forty millimeters", "examiner_question": "How much rain falls weekly?"},
                    {"id": "fa5", "cue_prompt": "what / animals / live there?", "cue_word": "wildlife", "is_missing": False, "card_value": "trout and otters", "examiner_question": "What animals live near the lake?"}
                ]
            },
            "table_b": {
                "title": "Emma's Cloud Experiment Card",
                "subtitle": "Candidate Answer Card",
                "person": "Emma",
                "fields": [
                    {"id": "fb1", "cue_prompt": "how much / water / beaker?", "cue_word": "volume", "is_missing": False, "card_value": "one hundred milliliters", "examiner_question": "How much water is in the beaker?"},
                    {"id": "fb2", "cue_prompt": "what temperature / vapor form?", "cue_word": "heat", "is_missing": False, "card_value": "fifty degrees Celsius", "examiner_question": "At what temperature does vapor form?"},
                    {"id": "fb3", "cue_prompt": "where / experiment take place?", "cue_word": "location", "is_missing": True, "acceptable_questions": ["Where did the experiment take place?", "Where was the lab?"], "nova_reply": "It took place in the school science laboratory."},
                    {"id": "fb4", "cue_prompt": "how long / evaporation take?", "cue_word": "time", "is_missing": True, "acceptable_questions": ["How long did evaporation take?", "What was the time?"], "nova_reply": "It took twenty-five minutes under the lamp."},
                    {"id": "fb5", "cue_prompt": "what color / drops?", "cue_word": "color", "is_missing": True, "acceptable_questions": ["What color were the drops?", "Were the drops clear?"], "nova_reply": "The drops were completely clear and pure."}
                ]
            }
        }
    },
    "math_problems": [
        {
            "id": 1,
            "type": "part_whole",
            "title": "Rainwater Tank Collection",
            "problemText": "A school garden rainwater tank collected 45 liters of rain on Monday and 55 liters on Tuesday. How many liters of rainwater did the tank collect in total?",
            "question": "A school garden rainwater tank collected 45 liters of rain on Monday and 55 liters on Tuesday. How many liters of rainwater did the tank collect in total?",
            "correctAnswer": 100,
            "target_answer": 100,
            "unit": "liters",
            "hintText": "Add Monday's rainfall (45 L) and Tuesday's rainfall (55 L).",
            "steps": ["Monday rainfall: 45 liters.", "Tuesday rainfall: 55 liters.", "Total collection: 45 + 55 = 100 liters."],
            "modelData": {
                "type": "part_whole",
                "bars": [
                    {"label": "Monday", "value": 45, "color": "#3498db"},
                    {"label": "Tuesday", "value": 55, "color": "#2980b9"}
                ],
                "total": 100,
                "totalLabel": "Total: 100 liters"
            }
        },
        {
            "id": 2,
            "type": "comparison",
            "title": "Reservoir Lake and Garden Pond Depth",
            "problemText": "A reservoir lake is 85 meters deep. A shallow garden pond is 15 meters deep. How many meters deeper is the reservoir lake than the garden pond?",
            "question": "A reservoir lake is 85 meters deep. A shallow garden pond is 15 meters deep. How many meters deeper is the reservoir lake than the garden pond?",
            "correctAnswer": 70,
            "target_answer": 70,
            "unit": "meters",
            "hintText": "Subtract the pond depth (15 m) from the lake depth (85 m).",
            "steps": ["Lake depth: 85 meters.", "Pond depth: 15 meters.", "Difference: 85 - 15 = 70 meters deeper."],
            "modelData": {
                "type": "comparison",
                "bars": [
                    {"label": "Lake", "value": 85, "color": "#1abc9c"},
                    {"label": "Pond", "value": 15, "color": "#16a085"}
                ],
                "difference": 70,
                "differenceLabel": "Difference: 70 meters"
            }
        },
        {
            "id": 3,
            "type": "part_whole",
            "title": "Cloud Experiment Beaker Water",
            "problemText": "In a science class cloud experiment, Beaker A condensed 64 milliliters of water and Beaker B condensed 36 milliliters. How many milliliters of water condensed altogether?",
            "question": "In a science class cloud experiment, Beaker A condensed 64 milliliters of water and Beaker B condensed 36 milliliters. How many milliliters of water condensed altogether?",
            "correctAnswer": 100,
            "target_answer": 100,
            "unit": "ml",
            "hintText": "Add 64 ml and 36 ml together.",
            "steps": ["Beaker A condensation: 64 ml.", "Beaker B condensation: 36 ml.", "Total: 64 + 36 = 100 ml."],
            "modelData": {
                "type": "part_whole",
                "bars": [
                    {"label": "Beaker A", "value": 64, "color": "#34495e"},
                    {"label": "Beaker B", "value": 36, "color": "#2c3e50"}
                ],
                "total": 100,
                "totalLabel": "Total: 100 ml"
            }
        },
        {
            "id": 4,
            "type": "comparison",
            "title": "Mountain River and Stream Length",
            "problemText": "The Pine River flows 95 kilometers from the highlands to the ocean. The valley stream flows for 38 kilometers. How many kilometers longer is the Pine River than the valley stream?",
            "question": "The Pine River flows 95 kilometers from the highlands to the ocean. The valley stream flows for 38 kilometers. How many kilometers longer is the Pine River than the valley stream?",
            "correctAnswer": 57,
            "target_answer": 57,
            "unit": "km",
            "hintText": "Subtract 38 km from 95 km.",
            "steps": ["River length: 95 km.", "Stream length: 38 km.", "Difference: 95 - 38 = 57 km longer."],
            "modelData": {
                "type": "comparison",
                "bars": [
                    {"label": "Pine River", "value": 95, "color": "#2980b9"},
                    {"label": "Stream", "value": 38, "color": "#7f8c8d"}
                ],
                "difference": 57,
                "differenceLabel": "Difference: 57 km"
            }
        },
        {
            "id": 5,
            "type": "before_after",
            "title": "Solar Evaporation Basin Water",
            "problemText": "A solar basin held 120 liters of water at sunrise. Under the hot noon sun, 35 liters evaporated into the atmosphere. How many liters of water remained in the basin at sunset?",
            "question": "A solar basin held 120 liters of water at sunrise. Under the hot noon sun, 35 liters evaporated into the atmosphere. How many liters of water remained in the basin at sunset?",
            "correctAnswer": 85,
            "target_answer": 85,
            "unit": "liters",
            "hintText": "Subtract the evaporated water (35 L) from the initial volume (120 L).",
            "steps": ["Initial volume: 120 liters.", "Evaporated water: 35 liters.", "Remaining: 120 - 35 = 85 liters."],
            "modelData": {
                "type": "before_after",
                "bars": [
                    {"label": "Initial Basin", "value": 120, "color": "#3498db"},
                    {"label": "Evaporated", "value": 35, "color": "#e74c3c"},
                    {"label": "Remaining", "value": 85, "color": "#2ecc71"}
                ],
                "finalValue": 85,
                "label": "Remaining: 85 liters"
            }
        }
    ],
    "action_lab": [
        {
            "stage": 1,
            "title": "Solar Evaporation Stage",
            "instruction": "Identify how heat turns liquid into vapor.",
            "items": [
                {"label": "Liquid Water Basin", "target": "Ocean Surface"},
                {"label": "Solar Thermal Heat", "target": "Energy Source"},
                {"label": "Rising Water Vapor", "target": "Evaporation"}
            ]
        },
        {
            "stage": 2,
            "title": "Cloud Condensation Stage",
            "instruction": "Sequence how vapors cool to form water droplets.",
            "items": [
                {"label": "Cool High Atmosphere", "target": "Chilling Zone"},
                {"label": "Gathering Droplets", "target": "Cloud Formation"},
                {"label": "Heavy Cloud Layer", "target": "Precipitation Ready"}
            ]
        },
        {
            "stage": 3,
            "title": "Precipitation and Collection",
            "instruction": "Guide raindrops from sky back to ocean basin.",
            "items": [
                {"label": "Falling Raindrops", "target": "Precipitation"},
                {"label": "Mountain Stream", "target": "Runoff Flow"},
                {"label": "Coastal Estuary", "target": "Ocean Return"}
            ]
        }
    ],
    "grammar_drills": [
        {"sentence": "First, the warm sun ___ water on the lake surface.", "options": ["heats", "heat", "heating"], "answer": "heats", "explanation": "Use 3rd person singular present tense 'heats' with singular subject 'sun'."},
        {"sentence": "Next, invisible water vapors ___ high into the sky.", "options": ["rise", "rises", "rising"], "answer": "rise", "explanation": "Use plural verb 'rise' with plural subject 'vapors'."},
        {"sentence": "Then, cool air ___ the vapors into puffy clouds.", "options": ["turns", "turn", "turning"], "answer": "turns", "explanation": "Use 3rd person singular 'turns' with 'cool air'."},
        {"sentence": "Finally, raindrops ___ down onto the mountain forest.", "options": ["fall", "falls", "falling"], "answer": "fall", "explanation": "Use plural verb 'fall' with 'raindrops'."},
        {"sentence": "The river ___ fresh water back into the deep ocean.", "options": ["carries", "carry", "carrying"], "answer": "carries", "explanation": "Use 3rd person singular 'carries' with 'the river'."}
    ]
}

W44_DATA = {
    "week": 44,
    "theme": "The Cookie Monster (Subtraction Language)",
    "title_vi": "Quái vật Bánh quy - Ngôn ngữ Phép trừ",
    "grammar_focus": "Take away, Left, Minus",
    "vocab": [
        {"id": 1, "word": "minus", "pos": "prep", "ipa": "/ˈmaɪnəs/", "definition_en": "Word showing subtraction of a number.", "definition_vi": "trừ đi", "example_en": "Ten crunchy cookies minus four cookies equals six.", "example_vi": "Mười chiếc bánh quy giòn trừ bốn cái bằng sáu."},
        {"id": 2, "word": "subtract", "pos": "v", "ipa": "/səbˈtrækt/", "definition_en": "To take away one number from another.", "definition_vi": "làm phép trừ", "example_en": "We subtract small numbers to find what remains.", "example_vi": "Chúng ta trừ các số nhỏ để tìm phần còn lại."},
        {"id": 3, "word": "take away", "pos": "phr v", "ipa": "/teɪk əˈweɪ/", "definition_en": "To remove an amount from a group.", "definition_vi": "lấy bớt đi", "example_en": "Please take away two warm cookies from the tray.", "example_vi": "Làm ơn lấy bớt hai chiếc bánh quy ấm khỏi khay."},
        {"id": 4, "word": "how many left", "pos": "phr", "ipa": "/haʊ ˈmeni left/", "definition_en": "Asking for the remaining quantity.", "definition_vi": "còn lại bao nhiêu", "example_en": "How many left after the hungry children ate lunch?", "example_vi": "Còn lại bao nhiêu sau khi những đứa trẻ đói ăn trưa?"},
        {"id": 5, "word": "lose", "pos": "v", "ipa": "/luːz/", "definition_en": "To have less by misplacing pieces.", "definition_vi": "làm mất, mất đi", "example_en": "Be careful not to lose any cookie tokens.", "example_vi": "Cẩn thận đừng làm mất đồng xu bánh quy nào."},
        {"id": 6, "word": "cookie", "pos": "n", "ipa": "/ˈkʊki/", "definition_en": "A sweet small flat baked treat.", "definition_vi": "bánh quy", "example_en": "Grandma baked sweet chocolate chip cookies today.", "example_vi": "Hôm nay bà nướng bánh quy sô-cô-la ngọt ngào."},
        {"id": 7, "word": "baker", "pos": "n", "ipa": "/ˈbeɪkər/", "definition_en": "A person who bakes bread and cakes.", "definition_vi": "thợ làm bánh", "example_en": "The friendly baker opened the bakery at dawn.", "example_vi": "Người thợ bánh thân thiện mở cửa tiệm lúc bình minh."},
        {"id": 8, "word": "tray", "pos": "n", "ipa": "/treɪ/", "definition_en": "A flat metal plate for baking food.", "definition_vi": "khay nướng", "example_en": "The baker placed a metal tray into the oven.", "example_vi": "Người thợ đặt khay kim loại vào lò nướng."},
        {"id": 9, "word": "oven", "pos": "n", "ipa": "/ˈʌvən/", "definition_en": "An enclosed space for heating food.", "definition_vi": "lò nướng", "example_en": "Fresh cookies bake inside the warm kitchen oven.", "example_vi": "Bánh quy thơm lừng nướng trong lò bếp ấm."},
        {"id": 10, "word": "jar", "pos": "n", "ipa": "/dʒɑːr/", "definition_en": "A glass container with a wide lid.", "definition_vi": "hũ thủy tinh", "example_en": "Mom keeps ginger cookies in a tall glass jar.", "example_vi": "Mẹ cất bánh quy gừng trong hũ thủy tinh cao."},
        {"id": 11, "word": "eat", "pos": "v", "ipa": "/iːt/", "definition_en": "To put food in mouth and chew it.", "definition_vi": "ăn", "example_en": "The hungry children eat crunchy cookies after school.", "example_vi": "Những đứa trẻ đói ăn bánh quy giòn sau giờ học."},
        {"id": 12, "word": "share", "pos": "v", "ipa": "/ʃer/", "definition_en": "To divide food equally with others.", "definition_vi": "chia sẻ", "example_en": "Good friends share their afternoon snacks happily.", "example_vi": "Bạn tốt chia sẻ đồ ăn vặt buổi chiều vui vẻ."},
        {"id": 13, "word": "give", "pos": "v", "ipa": "/ɡɪv/", "definition_en": "To hand something over to another.", "definition_vi": "cho, tặng", "example_en": "I give three oatmeal cookies to my sister.", "example_vi": "Tôi cho em gái ba chiếc bánh quy yến mạch."},
        {"id": 14, "word": "snack", "pos": "n", "ipa": "/snæk/", "definition_en": "A small portion of food between meals.", "definition_vi": "bữa ăn nhẹ", "example_en": "Cookies and milk make a delicious afternoon snack.", "example_vi": "Bánh quy và sữa làm thành bữa ăn nhẹ ngon miệng."},
        {"id": 15, "word": "crumb", "pos": "n", "ipa": "/krʌm/", "definition_en": "A tiny piece that breaks off bread.", "definition_vi": "vụn bánh", "example_en": "Little birds pecked at sweet cookie crumbs outside.", "example_vi": "Những chú chim nhỏ mổ vụn bánh quy ngọt bên ngoài."},
        {"id": 16, "word": "count", "pos": "v", "ipa": "/kaʊnt/", "definition_en": "To find the total number of things.", "definition_vi": "đếm", "example_en": "Let us count the remaining cookies in the jar.", "example_vi": "Chúng ta hãy đếm số bánh quy còn lại trong hũ."},
        {"id": 17, "word": "batch", "pos": "n", "ipa": "/bætʃ/", "definition_en": "A quantity of food baked at one time.", "definition_vi": "mẻ bánh", "example_en": "The baker finished a fresh batch of butter cookies.", "example_vi": "Người thợ bánh hoàn thành một mẻ bánh bơ tươi mới."},
        {"id": 18, "word": "hungry", "pos": "adj", "ipa": "/ˈhʌŋɡri/", "definition_en": "Feeling a strong physical need for food.", "definition_vi": "đói bụng", "example_en": "The hungry monster wanted to eat all the cookies.", "example_vi": "Con quái vật đói bụng muốn ăn hết bánh quy."},
        {"id": 19, "word": "recipe", "pos": "n", "ipa": "/ˈresəpi/", "definition_en": "A set of cooking directions for meals.", "definition_vi": "công thức nấu ăn", "example_en": "Follow this simple recipe to bake crunchy treats.", "example_vi": "Làm theo công thức đơn giản này để nướng bánh giòn."},
        {"id": 20, "word": "difference", "pos": "n", "ipa": "/ˈdɪfərəns/", "definition_en": "The result of taking away one number.", "definition_vi": "hiệu số", "example_en": "The difference between ten and seven is three.", "example_vi": "Hiệu số giữa mười và bảy là ba."}
    ],
    "clil": {
        "title_en": "The Language of Taking Away",
        "title_vi": "Ngôn ngữ của Phép Trừ và Lấy Bớt",
        "content_en": "In the bakery kitchen, arithmetic helps us track sweet treats! When a baker bakes a batch of forty cookies on a metal tray in the oven, everyone is hungry. If hungry friends eat fifteen cookies for an afternoon snack, we use subtraction to find how many left. To solve this, we subtract fifteen from forty, or say forty minus fifteen. When you take away fifteen items, the difference is twenty-five cookies remaining in the glass jar. Next time you share baked cookies or give treats to a friend, count carefully so you do not lose any pieces!",
        "glossary": [
            {"word": "subtract", "definition_en": "To take away a number", "definition_vi": "trừ đi"},
            {"word": "minus", "definition_en": "Subtraction symbol or word", "definition_vi": "dấu trừ"},
            {"word": "difference", "definition_en": "The result of subtraction", "definition_vi": "hiệu số"},
            {"word": "take away", "definition_en": "To remove from a group", "definition_vi": "lấy bớt đi"},
            {"word": "batch", "definition_en": "Items baked at one time", "definition_vi": "mẻ bánh"}
        ],
        "check_questions": [
            {"id": 1, "question_en": "What math operation helps us find how many cookies are left?", "options": ["Subtraction", "Multiplication", "Division"], "answer": "Subtraction"},
            {"id": 2, "question_en": "If you bake 40 cookies and eat 15, how many remain?", "options": ["25 cookies", "55 cookies", "10 cookies"], "answer": "25 cookies"},
            {"id": 3, "question_en": "What word means the result of a subtraction problem?", "options": ["The difference", "The sum", "The product"], "answer": "The difference"}
        ]
    },
    "story": [
        {"scene": 1, "title": "Baking Day at Grandma's House", "narration_en": "Ben and Mia tied on aprons to bake chocolate cookies.", "narration_vi": "Ben và Mia đeo tạp dề để nướng bánh quy sô-cô-la.", "dialogue": [{"speaker": "Ben", "text": "Grandma has a special recipe for butter cookies!"}, {"speaker": "Mia", "text": "Let's bake a huge batch of thirty cookies!"}]},
        {"scene": 2, "title": "The Cookie Monster Arrives", "narration_en": "As the warm tray cooled, their pet dog Buster sniffed the kitchen.", "narration_vi": "Khi khay bánh nguội, chú chó Buster đánh hơi gian bếp.", "dialogue": [{"speaker": "Ben", "text": "Buster is looking at the tray like a cookie monster!"}, {"speaker": "Mia", "text": "Quick, put them inside the tall glass jar!"}]},
        {"scene": 3, "title": "Sharing with Friends", "narration_en": "After school, their neighborhood friends knocked on the door.", "narration_vi": "Sau giờ học, những người bạn hàng xóm gõ cửa.", "dialogue": [{"speaker": "Ben", "text": "We started with thirty cookies in the jar."}, {"speaker": "Mia", "text": "Let us take away twelve cookies to share with everyone!"}]},
        {"scene": 4, "title": "How Many Left?", "narration_en": "Mia counted the cookies that remained in the glass jar.", "narration_vi": "Mia đếm số bánh quy còn lại trong hũ thủy tinh.", "dialogue": [{"speaker": "Mia", "text": "Thirty minus twelve leaves eighteen cookies!"}, {"speaker": "Ben", "text": "The difference is eighteen sweet treats!"}]},
        {"scene": 5, "title": "Enjoying the Afternoon Snack", "narration_en": "Everyone sat on the porch eating cookies with cold milk.", "narration_vi": "Mọi người ngồi ngoài hiên ăn bánh quy cùng sữa lạnh.", "dialogue": [{"speaker": "Mia", "text": "Math helps us share food fairly with friends."}, {"speaker": "Ben", "text": "And nobody has to lose their fair share!"}]}
    ],
    "shadowing": [
        {"id": 1, "text": "The baker took twenty cookies out of the oven.", "ipa": "/ðə ˈbeɪkər tʊk ˈtwenti ˈkʊkiz aʊt ʌv ðə ˈʌvən./"},
        {"id": 2, "text": "Subtract five cookies to find how many left.", "ipa": "/səbˈtrækt faɪv ˈkʊkiz tuː faɪnd haʊ ˈmeni left./"},
        {"id": 3, "text": "Fifty minus twenty equals thirty sweet treats.", "ipa": "/ˈfɪfti ˈmaɪnəs ˈtwenti ˈiːkwəlz ˈθɜːrti swiːt triːts./"},
        {"id": 4, "text": "Good friends share their afternoon snack happily.", "ipa": "/ɡʊd frendz ʃer ðer ˌæftərˈnuːn snæk ˈhæpɪli./"},
        {"id": 5, "text": "Please do not lose any pieces of the puzzle.", "ipa": "/pliːz duː nɑːt luːz ˈeni ˈpiːsɪz ʌv ðə ˈpʌzəl./"},
        {"id": 6, "text": "The difference between forty and ten is thirty.", "ipa": "/ðə ˈdɪfərəns bɪˈtwiːn ˈfɔːrti ænd ten ɪz ˈθɜːrti./"},
        {"id": 7, "text": "Take away eight cookies from the metal tray.", "ipa": "/teɪk əˈweɪ eɪt ˈkʊkiz frʌm ðə ˈmetəl treɪ./"},
        {"id": 8, "text": "We count remaining treats inside the glass jar.", "ipa": "/wiː kaʊnt rɪˈmeɪnɪŋ triːts ɪnˈsaɪd ðə ɡlæs dʒɑːr./"}
    ],
    "cambridge_rw": {
        "part1": {
            "word_bank": ["minus", "subtract", "cookie", "baker", "oven", "jar", "snack", "crumb", "recipe", "difference"],
            "definitions": [
                {"id": 1, "description": "A person whose job is baking fresh bread and cakes.", "word": "baker"},
                {"id": 2, "description": "A sweet small flat baked treat made with flour and sugar.", "word": "cookie"},
                {"id": 3, "description": "An enclosed kitchen space used for heating and baking food.", "word": "oven"},
                {"id": 4, "description": "A glass container with a wide lid used for storing food.", "word": "jar"},
                {"id": 5, "description": "The number that remains after subtracting one amount.", "word": "difference"}
            ]
        },
        "part2": {
            "title": "Ben & Mia in the Bakery Kitchen",
            "turns": [
                {"speaker": "Ben", "statement": "How many cookies did Grandma bake today?", "options": ["She baked thirty chocolate cookies.", "In the garden.", "Blue and red."], "answer": "She baked thirty chocolate cookies."},
                {"speaker": "Mia", "statement": "If we take away twelve, how many are left?", "options": ["There are eighteen cookies left.", "Next Tuesday.", "Yes, please."], "answer": "There are eighteen cookies left."},
                {"speaker": "Ben", "statement": "Shall we put the remaining cookies in the jar?", "options": ["Yes, put them in the glass jar now.", "It was raining.", "I have two shoes."], "answer": "Yes, put them in the glass jar now."},
                {"speaker": "Mia", "statement": "Can we share five cookies with our friends?", "options": ["Sure, let us give them five treats.", "Because it is loud.", "Tomorrow morning."], "answer": "Sure, let us give them five treats."},
                {"speaker": "Ben", "statement": "Did Buster eat any crumbs from the floor?", "options": ["Yes, he cleaned up all the crumbs!", "No, it is eight.", "On the wall."], "answer": "Yes, he cleaned up all the crumbs!"}
            ],
            "exchanges": [
                {"speaker": "Ben", "text": "How many cookies did Grandma bake today?"},
                {"speaker": "Mia", "text": "She baked thirty chocolate cookies."}
            ]
        },
        "part6": {
            "title": "Baking Treats with Grandma",
            "instructions": "Read the diary and write one word in each gap.",
            "text_template": "Yesterday we helped the {1} bake thirty fresh cookies. We took {2} ten cookies for an afternoon snack. Then we used subtraction to find how {3} left. Thirty {4} ten equals twenty. Finally, we put the cookies inside a glass {5} to keep them crunchy.",
            "answers": {"1": "baker", "2": "away", "3": "many", "4": "minus", "5": "jar"}
        }
    },
    "writing": {
        "title": "The Bakery Cookie Mystery",
        "prompt_en": "Look at the three pictures of the bakery. Write a story about two bakers counting cookies. Write 20 or more words.",
        "prompt_vi": "Nhìn 3 bức tranh tiệm bánh. Kể câu chuyện về 2 thợ bánh đếm bánh quy (từ 20 từ trở lên).",
        "min_sentences": 3,
        "min_words": 20,
        "max_words": 80,
        "model_sentence": "Baker Leo baked forty butter cookies on a metal tray. First, hungry customers arrived and bought twenty cookies. Next, Leo used subtraction to find that twenty cookies were left in the glass jar. In the end, he shared the remaining cookies with his helpers.",
        "word_bank": ["baker", "cookie", "subtract", "minus", "take away", "tray", "jar", "snack"],
        "sentence_frames": [
            "First, the baker placed fresh cookies on the ___.",
            "Next, hungry children decided to take away ___ cookies.",
            "Finally, they counted how many cookies were ___ in the jar."
        ],
        "panels": [
            {"panel": 1, "description": "The baker taking a hot tray of forty cookies out of the oven."},
            {"panel": 2, "description": "Customers buying fifteen cookies from the bakery counter."},
            {"panel": 3, "description": "The baker storing the remaining twenty-five cookies in a glass jar."}
        ]
    },
    "speaking": {
        "talkshow_prompt": {
            "topic": "Subtraction and Sharing",
            "question": "Why is subtraction useful when sharing snacks with friends?",
            "model_response": "Subtraction is very useful because it helps us count how many snacks are left! If we start with twenty cookies and share eight with friends, subtraction shows that twelve cookies remain in the jar. It keeps everything fair!"
        },
        "info_exchange_cards": {
            "table_a": {
                "title": "Ben's Cookie Bake Sale Card",
                "subtitle": "Candidate Question Card",
                "person": "Ben",
                "fields": [
                    {"id": "fa1", "cue_prompt": "how many / cookies / baked?", "cue_word": "total", "is_missing": True, "acceptable_questions": ["How many cookies were baked?", "How many cookies did you bake?"], "nova_reply": "We baked seventy-two cookies on large trays."},
                    {"id": "fa2", "cue_prompt": "how many / sold?", "cue_word": "sold", "is_missing": True, "acceptable_questions": ["How many cookies were sold?", "How many did you sell?"], "nova_reply": "We sold twenty-eight cookies to morning visitors."},
                    {"id": "fa3", "cue_prompt": "how many / left?", "cue_word": "remaining", "is_missing": False, "card_value": "forty-four cookies left", "examiner_question": "How many cookies were left in the jar?"},
                    {"id": "fa4", "cue_prompt": "what / flavor / cookies?", "cue_word": "flavor", "is_missing": False, "card_value": "chocolate chip and butter", "examiner_question": "What flavor were the cookies?"},
                    {"id": "fa5", "cue_prompt": "what time / bake sale / end?", "cue_word": "time", "is_missing": False, "card_value": "four o'clock in the afternoon", "examiner_question": "What time did the bake sale end?"}
                ]
            },
            "table_b": {
                "title": "Mia's Cookie Monster Party Card",
                "subtitle": "Candidate Answer Card",
                "person": "Mia",
                "fields": [
                    {"id": "fb1", "cue_prompt": "how many / guests / arrived?", "cue_word": "guests", "is_missing": False, "card_value": "fifteen party guests", "examiner_question": "How many guests arrived at the party?"},
                    {"id": "fb2", "cue_prompt": "how many / cookies / eaten?", "cue_word": "eaten", "is_missing": False, "card_value": "thirty-five cookies eaten", "examiner_question": "How many cookies were eaten?"},
                    {"id": "fb3", "cue_prompt": "where / party / held?", "cue_word": "place", "is_missing": True, "acceptable_questions": ["Where was the party held?", "Where did the party take place?"], "nova_reply": "The party was held in Grandma's sunny backyard."},
                    {"id": "fb4", "cue_prompt": "how many / cookies / left?", "cue_word": "left", "is_missing": True, "acceptable_questions": ["How many cookies were left?", "How many treats remained?"], "nova_reply": "There were twenty-five cookies left in the big jar."},
                    {"id": "fb5", "cue_prompt": "what / game / played?", "cue_word": "game", "is_missing": True, "acceptable_questions": ["What game did you play?", "What game was played?"], "nova_reply": "We played a fun cookie monster counting game."}
                ]
            }
        }
    },
    "math_problems": [
        {
            "id": 1,
            "type": "before_after",
            "title": "Bakery Tray Cookie Subtraction",
            "problemText": "A baker baked 72 cookies on metal trays. Children at the bakery snack bar ate 28 cookies. How many cookies were left on the trays?",
            "question": "A baker baked 72 cookies on metal trays. Children at the bakery snack bar ate 28 cookies. How many cookies were left on the trays?",
            "correctAnswer": 44,
            "target_answer": 44,
            "unit": "cookies",
            "hintText": "Subtract the 28 cookies eaten from the 72 initial cookies.",
            "steps": ["Initial baked cookies: 72.", "Cookies eaten: 28.", "Cookies left: 72 - 28 = 44 cookies."],
            "modelData": {
                "type": "before_after",
                "bars": [
                    {"label": "Baked Total", "value": 72, "color": "#d35400"},
                    {"label": "Eaten", "value": 28, "color": "#c0392b"},
                    {"label": "Remaining", "value": 44, "color": "#27ae60"}
                ],
                "finalValue": 44,
                "label": "Remaining: 44 cookies"
            }
        },
        {
            "id": 2,
            "type": "comparison",
            "title": "Chocolate and Vanilla Cookie Jar Comparison",
            "problemText": "A large jar holds 85 chocolate cookies. A smaller jar holds 50 vanilla cookies. How many more chocolate cookies are there than vanilla cookies?",
            "question": "A large jar holds 85 chocolate cookies. A smaller jar holds 50 vanilla cookies. How many more chocolate cookies are there than vanilla cookies?",
            "correctAnswer": 35,
            "target_answer": 35,
            "unit": "cookies",
            "hintText": "Subtract 50 vanilla cookies from 85 chocolate cookies.",
            "steps": ["Chocolate jar: 85 cookies.", "Vanilla jar: 50 cookies.", "Difference: 85 - 50 = 35 cookies."],
            "modelData": {
                "type": "comparison",
                "bars": [
                    {"label": "Chocolate", "value": 85, "color": "#795548"},
                    {"label": "Vanilla", "value": 50, "color": "#f1c40f"}
                ],
                "difference": 35,
                "differenceLabel": "Difference: 35 cookies"
            }
        },
        {
            "id": 3,
            "type": "before_after",
            "title": "Morning Bake Sale Cookie Sales",
            "problemText": "The school bake sale started with 96 oatmeal cookies. Morning customers bought and took away 42 cookies. How many oatmeal cookies remained for the afternoon?",
            "question": "The school bake sale started with 96 oatmeal cookies. Morning customers bought and took away 42 cookies. How many oatmeal cookies remained for the afternoon?",
            "correctAnswer": 54,
            "target_answer": 54,
            "unit": "cookies",
            "hintText": "Subtract 42 from 96.",
            "steps": ["Initial cookies: 96.", "Cookies taken away: 42.", "Remaining: 96 - 42 = 54 cookies."],
            "modelData": {
                "type": "before_after",
                "bars": [
                    {"label": "Initial Batch", "value": 96, "color": "#e67e22"},
                    {"label": "Sold", "value": 42, "color": "#e74c3c"},
                    {"label": "Remaining", "value": 54, "color": "#2ecc71"}
                ],
                "finalValue": 54,
                "label": "Remaining: 54 cookies"
            }
        },
        {
            "id": 4,
            "type": "comparison",
            "title": "Large and Small Baking Tray Capacity",
            "problemText": "A large commercial baking tray holds 65 butter cookies. A small home tray holds 25 cookies. What is the difference in cookie capacity between the two trays?",
            "question": "A large commercial baking tray holds 65 butter cookies. A small home tray holds 25 cookies. What is the difference in cookie capacity between the two trays?",
            "correctAnswer": 40,
            "target_answer": 40,
            "unit": "cookies",
            "hintText": "Subtract 25 from 65.",
            "steps": ["Large tray capacity: 65.", "Small tray capacity: 25.", "Difference: 65 - 25 = 40 cookies."],
            "modelData": {
                "type": "comparison",
                "bars": [
                    {"label": "Large Tray", "value": 65, "color": "#95a5a6"},
                    {"label": "Small Tray", "value": 25, "color": "#bdc3c7"}
                ],
                "difference": 40,
                "differenceLabel": "Difference: 40 cookies"
            }
        },
        {
            "id": 5,
            "type": "before_after",
            "title": "Bakery Cookie Stock Take Away",
            "problemText": "The bakery had 100 ginger cookies in stock. The afternoon catering order took away 65 cookies. How many ginger cookies were left in the bakery?",
            "question": "The bakery had 100 ginger cookies in stock. The afternoon catering order took away 65 cookies. How many ginger cookies were left in the bakery?",
            "correctAnswer": 35,
            "target_answer": 35,
            "unit": "cookies",
            "hintText": "Subtract 65 from 100.",
            "steps": ["Initial stock: 100 cookies.", "Catering order took away: 65.", "Cookies left: 100 - 65 = 35 cookies."],
            "modelData": {
                "type": "before_after",
                "bars": [
                    {"label": "Total Stock", "value": 100, "color": "#d35400"},
                    {"label": "Took Away", "value": 65, "color": "#c0392b"},
                    {"label": "Left", "value": 35, "color": "#27ae60"}
                ],
                "finalValue": 35,
                "label": "Left: 35 cookies"
            }
        }
    ],
    "action_lab": [
        {
            "stage": 1,
            "title": "Subtraction Language Modeling",
            "instruction": "Match each math phrase to its meaning.",
            "items": [
                {"label": "Take away 5", "target": "Remove 5 items"},
                {"label": "Minus symbol (-)", "target": "Subtraction operation"},
                {"label": "How many left", "target": "Remaining amount"}
            ]
        },
        {
            "stage": 2,
            "title": "Tray to Jar Inventory",
            "instruction": "Sort cookies into initial batch, eaten snack, and remaining jar.",
            "items": [
                {"label": "Tray of 72 Fresh Cookies", "target": "Initial Batch"},
                {"label": "Plate of 28 Eaten Snacks", "target": "Subtracted Portion"},
                {"label": "Jar of 44 Saved Cookies", "target": "Remaining Inventory"}
            ]
        },
        {
            "stage": 3,
            "title": "Fair Cookie Sharing Lab",
            "instruction": "Calculate remaining cookies after equal friend shares.",
            "items": [
                {"label": "30 Cookies Minus 10", "target": "20 Left"},
                {"label": "50 Cookies Minus 25", "target": "25 Left"},
                {"label": "100 Cookies Minus 65", "target": "35 Left"}
            ]
        }
    ],
    "grammar_drills": [
        {"sentence": "Ten cookies ___ four cookies leaves six cookies.", "options": ["minus", "plus", "times"], "answer": "minus", "explanation": "Use 'minus' to indicate subtraction in arithmetic sentences."},
        {"sentence": "Please ___ two cookies from the warm tray.", "options": ["take away", "take over", "take up"], "answer": "take away", "explanation": "Phrasal verb 'take away' means remove from a group."},
        {"sentence": "If we eat three apples, how many are ___?", "options": ["left", "leave", "leaving"], "answer": "left", "explanation": "'Left' is used to ask about remaining quantity."},
        {"sentence": "The baker ___ the fresh batch of chocolate cookies.", "options": ["shares", "share", "sharing"], "answer": "shares", "explanation": "Use 3rd person singular present tense 'shares'."},
        {"sentence": "We ___ fifteen from forty to find the difference.", "options": ["subtract", "subtracts", "subtracting"], "answer": "subtract", "explanation": "Use base verb 'subtract' with plural subject 'we'."}
    ]
}

ROUND91_WEEKS_B = {
    40: W40_DATA,
    42: W42_DATA,
    44: W44_DATA
}

