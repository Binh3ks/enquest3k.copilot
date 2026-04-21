export default {
  title: "My School Supplies",
  min_words: 40,
  model_sentence: "There is a backpack on my desk. In my backpack, there is a book, a notebook, and a pen. There is a pencil case in my backpack too. In my pencil case, there is a ruler, an eraser, and a marker. There is a computer in my classroom. There is a whiteboard near the teacher's desk. There is a teacher in the classroom. I like my school supplies very much!",
  instruction_en: "Use: There is a... in my bag. / It is (colour). / I use it to...",
  instruction_vi: "Dùng: There is a... in my bag. / It is (colour). / I use it to...",
  prompt_en: "What is in your school bag? Describe at least 5 items. Is there a book? A pencil case? A ruler? What colour are they? What do you use them for?",
  prompt_vi: "Trong cặp sách có gì? Mô tả ít nhất 5 đồ vật. Có sách không? Hộp bút không? Thước không? Chúng màu gì? Dùng để làm gì?",
  keywords: ["backpack", "pen", "book", "notebook", "ruler", "eraser", "pencil case", "there is", "whiteboard", "computer", "teacher", "classroom"],
  sentence_frames: [{"template":"In my bag, there is a ___ and a ___."},{"template":"There is also a ___. It is ___."},{"template":"I use my ___ to ___."},{"template":"My favourite thing in my bag is my ___ because ___."}],
};
