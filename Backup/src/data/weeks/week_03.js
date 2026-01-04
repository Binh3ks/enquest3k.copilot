const weekData = {
  weekId: 3,
  weekTitle_en: "Observing Differences",
  weekTitle_vi: "Quan sát Sự khác biệt",
  grammar_focus: "Comparatives (Er/More)",
  global_vocab: [],
  stations: {
    read_explore: {
      title: "Animals Big and Small",
      image_url: "/images/week3/read_cover_w03.jpg",
      content_en: "I **observe** nature. I see many **differences**. An elephant is **bigger** than a dog. A mouse is **smaller** than a cat. A cheetah is **faster** than a turtle. A giraffe is **taller** than a horse. We **compare** animals by their **size** and **speed**. Every animal is unique.",
      content_vi: "Tôi quan sát thiên nhiên. Tôi thấy nhiều sự khác biệt. Một con voi thì to hơn một con chó. Một con chuột thì nhỏ hơn một con mèo. Một con báo thì nhanh hơn một con rùa. Một con hươu cao cổ thì cao hơn một con ngựa. Chúng ta so sánh động vật qua kích thước và tốc độ của chúng. Mỗi loài vật đều độc đáo.",
      audio_url: "/audio/week3/read_explore_main.mp3",
      comprehension_questions: [
        { id: 1, question_en: "Which animal is bigger?", answer: ["The elephant.", "An elephant."], hint_en: "An elephant is...", hint_vi: "Con voi thì..." },
        { id: 2, question_en: "Is a turtle faster than a cheetah?", answer: ["No, it is slower.", "No."], hint_en: "A cheetah is faster...", hint_vi: "Báo thì nhanh hơn..." },
        { id: 3, question_en: "How do we compare animals?", answer: ["By size and speed.", "Size and speed."], hint_en: "By their...", hint_vi: "Qua..." }
      ]
    },
    new_words: {
      vocab: [
        { id: 1, word: "compare", pronunciation: "/kəmˈpɛː/", definition_vi: "So sánh", definition_en: "Find differences.", example: "Compare the two pictures.", collocation: "compare with", image_url: "/images/week3/compare_w03.jpg", audio_word: "/audio/week3/vocab_compare.mp3", audio_def: "/audio/week3/vocab_def_compare.mp3", audio_coll: "/audio/week3/vocab_coll_compare.mp3" },
        { id: 2, word: "difference", pronunciation: "/ˈdɪf(ə)r(ə)ns/", definition_vi: "Sự khác biệt", definition_en: "Not same.", example: "Spot the difference.", collocation: "big difference", image_url: "/images/week3/difference_w03.jpg", audio_word: "/audio/week3/vocab_difference.mp3", audio_def: "/audio/week3/vocab_def_difference.mp3", audio_coll: "/audio/week3/vocab_coll_difference.mp3" },
        { id: 3, word: "feature", pronunciation: "/ˈfiːtʃə/", definition_vi: "Đặc điểm", definition_en: "Key part.", example: "A long neck is a feature.", collocation: "key feature", image_url: "/images/week3/feature_w03.jpg", audio_word: "/audio/week3/vocab_feature.mp3", audio_def: "/audio/week3/vocab_def_feature.mp3", audio_coll: "/audio/week3/vocab_coll_feature.mp3" },
        { id: 4, word: "size", pronunciation: "/sʌɪz/", definition_vi: "Kích thước", definition_en: "Big or small.", example: "Look at the size.", collocation: "large size", image_url: "/images/week3/size_w03.jpg", audio_word: "/audio/week3/vocab_size.mp3", audio_def: "/audio/week3/vocab_def_size.mp3", audio_coll: "/audio/week3/vocab_coll_size.mp3" },
        { id: 5, word: "heavy", pronunciation: "/ˈhɛvi/", definition_vi: "Nặng", definition_en: "Hard to lift.", example: "The rock is heavy.", collocation: "heavy object", image_url: "/images/week3/heavy_w03.jpg", audio_word: "/audio/week3/vocab_heavy.mp3", audio_def: "/audio/week3/vocab_def_heavy.mp3", audio_coll: "/audio/week3/vocab_coll_heavy.mp3" },
        { id: 6, word: "light", pronunciation: "/lʌɪt/", definition_vi: "Nhẹ", definition_en: "Easy to lift.", example: "A feather is light.", collocation: "light as air", image_url: "/images/week3/light_w03.jpg", audio_word: "/audio/week3/vocab_light.mp3", audio_def: "/audio/week3/vocab_def_light.mp3", audio_coll: "/audio/week3/vocab_coll_light.mp3" },
        { id: 7, word: "fast", pronunciation: "/fɑːst/", definition_vi: "Nhanh", definition_en: "Moving quickly.", example: "Cars are fast.", collocation: "run fast", image_url: "/images/week3/fast_w03.jpg", audio_word: "/audio/week3/vocab_fast.mp3", audio_def: "/audio/week3/vocab_def_fast.mp3", audio_coll: "/audio/week3/vocab_coll_fast.mp3" },
        { id: 8, word: "slow", pronunciation: "/sləʊ/", definition_vi: "Chậm", definition_en: "Not fast.", example: "Snails are slow.", collocation: "move slow", image_url: "/images/week3/slow_w03.jpg", audio_word: "/audio/week3/vocab_slow.mp3", audio_def: "/audio/week3/vocab_def_slow.mp3", audio_coll: "/audio/week3/vocab_coll_slow.mp3" },
        { id: 9, word: "strong", pronunciation: "/strɒŋ/", definition_vi: "Mạnh", definition_en: "Has power.", example: "Ants are strong.", collocation: "strong muscles", image_url: "/images/week3/strong_w03.jpg", audio_word: "/audio/week3/vocab_strong.mp3", audio_def: "/audio/week3/vocab_def_strong.mp3", audio_coll: "/audio/week3/vocab_coll_strong.mp3" },
        { id: 10, word: "weak", pronunciation: "/wiːk/", definition_vi: "Yếu", definition_en: "No power.", example: "The baby bird is weak.", collocation: "feel weak", image_url: "/images/week3/weak_w03.jpg", audio_word: "/audio/week3/vocab_weak.mp3", audio_def: "/audio/week3/vocab_def_weak.mp3", audio_coll: "/audio/week3/vocab_coll_weak.mp3" }
      ]
    },
    word_match: { pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    grammar: {
      grammar_explanation: {
        title_en: "Comparatives (Er/More)",
        title_vi: "So sánh hơn (Thêm đuôi -er)",
        rules: [
          { type: "rule", icon: "🐘", rule_en: "Short adj + **er** + than", rule_vi: "Tính từ ngắn + **er**", example: "Big -> **Bigger**" },
          { type: "rule", icon: "🐇", rule_en: "Ends in 'y' -> **ier**", rule_vi: "Kết thúc 'y' -> **ier**", example: "Heavy -> **Heavier**" },
          { type: "rule", icon: "🏎️", rule_en: "**More** + Long adj", rule_vi: "**More** + Tính từ dài", example: "Beautiful -> **More** beautiful" }
        ]
      },
      exercises: [
        { id: 1, type: "fill", question: "An elephant is _____ (big) than a dog.", answer: "bigger", hint: "Big -> Bigger" },
        { id: 2, type: "mc", question: "A turtle is _____ than a rabbit.", options: ["slower", "slow"], answer: "slower", hint: "Compare -> slower" },
        { id: 3, type: "fill", question: "This box is _____ (heavy) than that one.", answer: "heavier", hint: "y -> ier" },
        { id: 4, type: "unscramble", question: "Sort:", words: ["faster", "Cars", "bikes", "are", "than"], answer: "Cars are faster than bikes.", hint: "Cars are..." },
        { id: 5, type: "fill", question: "A mouse is _____ (small) than a cat.", answer: "smaller", hint: "Small -> Smaller" },
        // Expanded to 20
        { id: 6, type: "fill", question: "A giraffe is _____ (tall) than a horse.", answer: "taller", hint: "Tall -> Taller" },
        { id: 7, type: "unscramble", question: "Sort:", words: ["stronger", "I", "you", "am", "than"], answer: "I am stronger than you.", hint: "I am..." },
        { id: 8, type: "mc", question: "Summer is _____ than winter.", options: ["hotter", "hot"], answer: "hotter", hint: "Hot -> Hotter" },
        { id: 9, type: "fill", question: "My bag is _____ (light) than yours.", answer: "lighter", hint: "Light -> Lighter" },
        { id: 10, type: "fill", question: "The sun is _____ (bright) than the moon.", answer: "brighter", hint: "Bright -> Brighter" },
        { id: 11, type: "unscramble", question: "Sort:", words: ["is", "fast", "cheetah", "A", "very"], answer: "A cheetah is very fast.", hint: "A cheetah..." },
        { id: 12, type: "mc", question: "Gold is _____ than silver.", options: ["expensive", "more expensive"], answer: "more expensive", hint: "Long adjective -> more" },
        { id: 13, type: "fill", question: "A rock is _____ (hard) than a pillow.", answer: "harder", hint: "Hard -> Harder" },
        { id: 14, type: "fill", question: "She is _____ (happy) than him.", answer: "happier", hint: "y -> ier" },
        { id: 15, type: "unscramble", question: "Sort:", words: ["smaller", "Ants", "cats", "are", "than"], answer: "Ants are smaller than cats.", hint: "Ants are..." },
        { id: 16, type: "mc", question: "This book is _____ than that one.", options: ["interesting", "more interesting"], answer: "more interesting", hint: "Long adjective -> more" },
        { id: 17, type: "fill", question: "Make sentence: 'Dog / fast / cat'", answer: ["A dog is faster than a cat.", "the dog is faster than the cat."], customCheck: true, hint: "Use 'is' and 'than'" },
        { id: 18, type: "fill", question: "Winter is _____ (cold) than summer.", answer: "colder", hint: "Cold -> Colder" },
        { id: 19, type: "unscramble", question: "Sort:", words: ["is", "He", "than", "older", "me"], answer: "He is older than me.", hint: "He is..." },
        { id: 20, type: "fill", question: "Make sentence: 'Plane / fast / train'", answer: ["A plane is faster than a train.", "the plane is faster than the train."], customCheck: true, hint: "Use 'faster'" }
      ]
    },
    ask_ai: {
      prompts: [
        { id: 1, context_vi: "Hỏi xem con voi có to hơn con hổ không.", context_en: "Ask if an elephant is bigger than a tiger.", answer: ["Is an elephant bigger than a tiger?"], hint: "Is an elephant..." },
        { id: 2, context_vi: "Bạn muốn biết cái nào nhanh hơn: ô tô hay xe đạp.", context_en: "Ask which is faster: a car or a bike.", answer: ["Which is faster: a car or a bike?", "Is a car faster than a bike?"], hint: "Which is..." },
        // Expanded to 5
        { id: 3, context_vi: "Bạn muốn biết máy bay có nhanh hơn tàu hỏa không.", context_en: "Ask if a plane is faster than a train.", answer: ["Is a plane faster than a train?"], hint: "Is a plane..." },
        { id: 4, context_vi: "So sánh chiều cao của hai cái cây.", context_en: "Compare the height of two trees.", answer: ["Which tree is taller?", "Is this tree taller than that one?"], hint: "Which..." },
        { id: 5, context_vi: "Hỏi xem cái túi nào nặng hơn.", context_en: "Ask which bag is heavier.", answer: ["Which bag is heavier?"], hint: "Which..." }
      ]
    },
    explore: {
      title_en: "Unique Features", title_vi: "Đặc điểm độc đáo",
      image_url: "/images/week3/explore_cover_w03.jpg",
      content_en: "Every animal has special **features**. Birds have **wings** to fly. Fish have **fins** to swim. Elephants have long **trunks**. These features make them **different**. We observe these features to learn.",
      content_vi: "Mỗi loài vật có đặc điểm riêng. Chim có cánh để bay. Cá có vây để bơi. Voi có vòi dài. Những đặc điểm này làm chúng khác biệt.",
      audio_url: "/audio/week3/explore_main.mp3",
      check_questions: [
        { id: 1, question_en: "What do birds have?", answer: ["Wings.", "Birds have wings."], hint_en: "Wings." },
        { id: 2, question_en: "Why do fish have fins?", answer: ["To swim."], hint_en: "To..." }
      ],
      question: { text_en: "What is your favorite animal feature?", text_vi: "Đặc điểm động vật yêu thích của bạn là gì?", min_words: 5, model_answer: "I like wings because they can fly." }
    },
    logic_lab: {
      puzzles: [
        { id: 1, type: "logic", title_en: "Comparison", question_en: "A is taller than B. B is taller than C. Who is the shortest?", answer: ["C", "Person C"], target_number: 0, unit: "", audio_url: "/audio/week3/logic_1.mp3" },
        { id: 2, type: "math", title_en: "Weight Math", question_en: "Box A is 5kg. Box B is 2kg heavier. How heavy is Box B?", answer: ["7kg"], target_number: 7, unit: "kg", audio_url: "/audio/week3/logic_2.mp3" },
        { id: 3, type: "pattern", title_en: "Size Pattern", question_en: "Small, Medium, Large, Small, Medium... What next?", options: ["Large", "Small"], answer: "Large", target_number: 0, unit: "", audio_url: "/audio/week3/logic_3.mp3" },
        // Expanded to 5
        { id: 4, type: "math", title_en: "Height Difference", question_en: "The giraffe is 5m tall. The horse is 2m tall. What is the difference?", answer: ["3m"], target_number: 3, unit: "m", audio_url: "/audio/week3/logic_4.mp3" },
        { id: 5, type: "logic", title_en: "Heaviest Object", question_en: "A feather, a rock, and a paper. Which one is the heaviest?", answer: ["Rock", "A rock"], audio_url: "/audio/week3/logic_5.mp3" }
      ]
    },
    dictation: {
      sentences: [
        { id: 1, text: "An elephant is bigger than a dog.", meaning: "Voi to hơn chó.", audio_url: "/audio/week3/dictation_1.mp3" },
        { id: 2, text: "A cheetah is very fast.", meaning: "Báo đốm rất nhanh.", audio_url: "/audio/week3/dictation_2.mp3" },
        { id: 3, text: "Feathers are light.", meaning: "Lông vũ thì nhẹ.", audio_url: "/audio/week3/dictation_3.mp3" },
        { id: 4, text: "Rocks are heavy.", meaning: "Đá thì nặng.", audio_url: "/audio/week3/dictation_4.mp3" },
        { id: 5, text: "We compare sizes.", meaning: "Chúng ta so sánh kích thước.", audio_url: "/audio/week3/dictation_5.mp3" }
      ]
    },
    shadowing: {
      title: "Comparing Things",
      script: [
        { id: 1, text: "I observe nature and see many differences.", vi: "Tôi quan sát thiên nhiên và thấy nhiều sự khác biệt.", audio_url: "/audio/week3/shadowing_1.mp3" },
        { id: 2, text: "An elephant is bigger than a dog.", vi: "Voi thì to hơn chó.", audio_url: "/audio/week3/shadowing_2.mp3" },
        { id: 3, text: "A cheetah is faster than a turtle.", vi: "Báo thì nhanh hơn rùa.", audio_url: "/audio/week3/shadowing_3.mp3" },
        { id: 4, text: "We compare animals by their size and speed.", vi: "Chúng ta so sánh động vật qua kích thước và tốc độ.", audio_url: "/audio/week3/shadowing_4.mp3" },
        { id: 5, text: "Every animal is unique.", vi: "Mỗi loài vật đều độc đáo.", audio_url: "/audio/week3/shadowing_5.mp3" }
      ]
    },
    word_power: {
      words: [
        { id: 1, word: "feature", pronunciation: "/ˈfiːtʃə/", definition_en: "A distinctive attribute.", definition_vi: "Đặc điểm", example: "Big eyes are a feature.", collocation: "unique feature", cefr_level: "B1", image_url: "/images/week3/feature.jpg", audio_word: "/audio/week3/power_word_feature.mp3", audio_def: "/audio/week3/power_def_feature.mp3", audio_coll: "/audio/week3/power_coll_feature.mp3" },
        { id: 2, word: "difference", pronunciation: "/ˈdɪf(ə)r(ə)ns/", definition_en: "A point or way in which people or things are not the same.", definition_vi: "Sự khác biệt", example: "Spot the difference.", collocation: "major difference", cefr_level: "A2", image_url: "/images/week3/difference.jpg", audio_word: "/audio/week3/power_word_difference.mp3", audio_def: "/audio/week3/power_def_difference.mp3", audio_coll: "/audio/week3/power_coll_difference.mp3" },
        // Expanded to 3
        { id: 3, word: "similar", pronunciation: "/ˈsɪmɪlə/", definition_en: "Looking or being almost the same.", definition_vi: "Tương tự", example: "They look similar.", collocation: "very similar", cefr_level: "A2", image_url: "/images/week3/similar.jpg", audio_word: "/audio/week3/power_word_similar.mp3", audio_def: "/audio/week3/power_def_similar.mp3", audio_coll: "/audio/week3/power_coll_similar.mp3" }
      ]
    },
    daily_watch: {
      videos: [
        { id: 1, title: "Topic: Describing People - Physical appearance | Personality traits vocabulary #es (Easy English Channel)", videoId: "ow8gNA2mcso", duration: "3:00", sim_duration: 180 },
        { id: 2, title: "Grammar: Describing People | Adjectives To Describe People In English (Games4esl)", videoId: "w9wI5ZvZn6g", duration: "3:00", sim_duration: 180 },
        { id: 3, title: "Math: Is It Heavy or Light? | Jack Hartmann Measurement Song (Jack Hartmann Kids Music Channel)", videoId: "qUOQrXmfwDM", duration: "3:00", sim_duration: 180 },
        { id: 4, title: "Science: The Five Senses for Kids - Preschool Education (Smile and Learn - English)", videoId: "XUMiPK6LZBI", duration: "3:00", sim_duration: 180 },
        { id: 5, title: "Bonus: Big, Big, Big | Adjectives Song for Kids (Maple Leaf Learning)", videoId: "3JZi2oDvPs4", duration: "3:00", sim_duration: 180 }
      ],
      bonus_games: [
        { id: 1, title: "Comparatives Game", url: "https://www.gamestolearnenglish.com/comparatives/", description: "Compare items." },
        { id: 2, title: "Fast English", url: "https://www.gamestolearnenglish.com/fast-english/", description: "Match words." }
      ]
    },
    writing: {
      title: "Video Challenge: Compare Two Toys",
      prompt_en: "Show two toys. Compare them using 'bigger', 'smaller', 'faster'.",
      prompt_vi: "So sánh 2 món đồ chơi của bạn.",
      min_words: 15, keywords: ["than", "bigger", "smaller"]
    }
  }
};
export default weekData;
