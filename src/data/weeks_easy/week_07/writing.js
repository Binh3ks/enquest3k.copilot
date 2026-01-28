export default {
  prompts: [
    {
      id: 1,
      prompt_en: "What is in your school bag? Draw and describe it.",
      prompt_vi: "Có gì trong cặp sách của bạn? Vẽ và miêu tả.",
      min_words: 25,
      keywords: ["school bag", "pencil", "paper", "crayon", "lunch box", "there is"],
      sample_sentences: [
        "There is a pencil in my bag.",
        "There is paper too.",
        "I have a red crayon.",
        "My school bag is blue.",
        "I like my school bag."
      ]
    },
    {
      id: 2,
      prompt_en: "What do you like to draw with? Why?",
      prompt_vi: "Bạn thích vẽ bằng gì? Tại sao?",
      min_words: 25,
      keywords: ["draw", "crayon", "marker", "pencil", "color", "like"],
      sample_sentences: [
        "I like to draw with crayons.",
        "Crayons have many colors.",
        "There is a red crayon.",
        "There is a blue crayon too.",
        "I can draw pictures."
      ]
    },
    {
      id: 3,
      prompt_en: "What is in your lunch box today?",
      prompt_vi: "Hôm nay có gì trong hộp cơm của bạn?",
      min_words: 25,
      keywords: ["lunch box", "food", "eat", "water bottle", "there is"],
      sample_sentences: [
        "There is a sandwich in my lunch box.",
        "There is an apple too.",
        "I have a water bottle.",
        "I eat lunch at school.",
        "My lunch box is green."
      ]
    },
    {
      id: 4,
      prompt_en: "What do you need for art class? Make a list.",
      prompt_vi: "Bạn cần gì cho lớp vẽ? Làm danh sách.",
      min_words: 25,
      keywords: ["art", "crayon", "paper", "scissors", "glue", "marker", "need"],
      sample_sentences: [
        "I need paper for art class.",
        "There is scissors to cut.",
        "There is glue to stick.",
        "I have many crayons.",
        "Art class is fun!"
      ]
    },
    {
      id: 5,
      prompt_en: "You are packing your school bag. What do you put inside?",
      prompt_vi: "Bạn đang xếp cặp sách. Bạn cho gì vào?",
      min_words: 30,
      keywords: ["pack", "school bag", "pencil", "paper", "folder", "lunch box", "water bottle"],
      sample_sentences: [
        "I pack my school bag in the morning.",
        "There is a pencil inside.",
        "There is paper and a folder.",
        "I put in my lunch box.",
        "There is a water bottle too."
      ]
    }
  ]
};
