export default {
  topic_talk_prompt: "Tell me about The Tortoise and the Hare! What happened in the race? What is the moral? Which transport is the fastest — a car, a train, or a ship?",
  prompts: [
    {
      id: 1,
      nova_says: "I just finished reading 'The Tortoise and the Hare'! The hare was very confident, but the tortoise won the race.",
      nova_says_vi: "Cô vừa đọc xong câu chuyện 'Con Rùa và Con Thỏ'! Con thỏ rất tự tin, nhưng con rùa đã thắng cuộc đua.",
      task_en: "Ask Nova WHAT happened in the race.",
      task_vi: "Hỏi cô Nova điều gì đã xảy ra trong cuộc đua.",
      question_word_bank: ["What", "Who", "Where", "How"],
      question_frame: "___ happened in the race?",
      answer: ["What happened in the race?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "The hare was so confident that he stopped to take a nap under a tree. He boasted: 'Nobody can overtake me!'",
      nova_says_vi: "Con thỏ tự tin đến mức dừng lại ngủ trưa dưới một gốc cây. Nó khoe khoang: 'Không ai có thể qua mặt tôi!'",
      task_en: "Ask Nova WHY the hare stopped for a nap.",
      task_vi: "Hỏi cô Nova tại sao con thỏ dừng lại ngủ trưa.",
      question_word_bank: ["Why", "When", "Where", "How"],
      question_frame: "___ did the hare stop for a nap?",
      answer: ["Why did the hare stop for a nap?"],
      hint_word: "Why",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "The tortoise was very determined. He walked slowly but steadily, and never stopped — not even once!",
      nova_says_vi: "Con rùa rất kiên định. Nó bước đi chậm nhưng đều đặn, và không bao giờ dừng lại — dù chỉ một lần!",
      task_en: "Ask Nova HOW the tortoise managed to win.",
      task_vi: "Hỏi cô Nova con rùa đã thắng bằng cách nào.",
      question_word_bank: ["How", "Why", "What", "When"],
      question_frame: "___ did the tortoise manage to win?",
      answer: ["How did the tortoise manage to win?"],
      hint_word: "How",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "The moral of this fable is: slow and steady wins the race. Being determined and cheer-ful is more important than being fast!",
      nova_says_vi: "Bài học đạo đức của câu chuyện ngụ ngôn này là: chậm mà chắc ắt thắng cuộc đua. Kiên định và lạc quan quan trọng hơn là nhanh!",
      task_en: "Ask Nova WHAT the moral of the story is.",
      task_vi: "Hỏi cô Nova bài học của câu chuyện là gì.",
      question_word_bank: ["What", "Why", "How", "Who"],
      question_frame: "___ is the moral of this story?",
      answer: ["What is the moral of this story?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "After the race, the tortoise went home by bicycle and the hare took a taxi. The animals all cheered for the tortoise!",
      nova_says_vi: "Sau cuộc đua, con rùa đi về nhà bằng xe đạp còn con thỏ bắt taxi. Tất cả các con vật đều hoan hô con rùa!",
      task_en: "Ask Nova HOW the tortoise went home after the race.",
      task_vi: "Hỏi cô Nova con rùa đi về nhà bằng cách nào sau cuộc đua.",
      question_word_bank: ["How", "What", "Where", "Who"],
      question_frame: "___ did the tortoise go home?",
      answer: ["How did the tortoise go home?"],
      hint_word: "How",
      audio_url: null
    },
    {
      id: 6,
      nova_says: "If I could use any transport in a race, I would choose a motorbike — it is the fastest on land! A ship would be the slowest on land!",
      nova_says_vi: "Nếu có thể dùng bất kỳ phương tiện nào trong cuộc đua, tôi sẽ chọn xe máy — nó là nhanh nhất trên đất liền! Con tàu sẽ là chậm nhất trên đất!",
      task_en: "Ask Nova WHICH transport she thinks is the fastest.",
      task_vi: "Hỏi cô Nova phương tiện nào cô ấy nghĩ là nhanh nhất.",
      question_word_bank: ["Which", "What", "How", "Why"],
      question_frame: "___ transport do you think is the fastest?",
      answer: ["Which transport do you think is the fastest?"],
      hint_word: "Which",
      audio_url: null
    }
  ]
};