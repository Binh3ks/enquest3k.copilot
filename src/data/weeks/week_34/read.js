// Week 34 Main Story — The Lion and the Mouse (Aesop Fable & Animal Cooperation)
export const readData = {
  week: 34,
  title: "The Lion and the Mouse",
  title_vi: "Sư Tử và Chuột — Truyện Ngụ Ngôn",
  content_en: "One warm afternoon, a huge lion was sleeping under a shady tree in the green forest. While he was sleeping, a tiny mouse ran across his big front paw. The lion woke up and caught the little mouse with his sharp claws. 'Please do not eat me!' cried the scared mouse. 'If you let me go, I promise I will help you one day.' The lion was kind, so he lifted his paw and let the mouse go free. A few days later, hunters placed a strong rope net between two trees. While the lion was walking down the path, he stepped into the trap! The heavy net pulled tight around him. The lion roared loudly for help. The tiny mouse heard the roar and ran quickly to help. Using his sharp teeth, the mouse chewed through the thick ropes until the net broke open. The lion was freed safely. From that day on, they were best friends.",
  text_en: "One warm afternoon, a huge lion was sleeping under a shady tree in the green forest. While he was sleeping, a tiny mouse ran across his big front paw. The lion woke up and caught the little mouse with his sharp claws. 'Please do not eat me!' cried the scared mouse. 'If you let me go, I promise I will help you one day.' The lion was kind, so he lifted his paw and let the mouse go free. A few days later, hunters placed a strong rope net between two trees. While the lion was walking down the path, he stepped into the trap! The heavy net pulled tight around him. The lion roared loudly for help. The tiny mouse heard the roar and ran quickly to help. Using his sharp teeth, the mouse chewed through the thick ropes until the net broke open. The lion was freed safely. From that day on, they were best friends.",
  content_vi: "Một buổi chiều ấm áp, một chú sư tử to lớn đang ngủ dưới gốc cây râm mát trong khu rừng xanh. Trong khi sư tử ngủ, một chú chuột nhỏ chạy ngang qua bàn chân trước to lớn của cậu ấy. Sư tử thức giấc và bắt lấy chú chuột nhỏ bằng những chiếc móng vuốt sắc. 'Xin đừng ăn thịt tôi!' chú chuột sợ hãi kêu lên. 'Nếu anh thả tôi đi, tôi hứa sẽ giúp anh một ngày nào đó.' Sư tử tốt bụng nên đã nhấc chân và thả chuột tự do. Vài ngày sau, những người thợ săn giăng một tấm lưới thừng chắc chắn giữa hai cái cây. Trong khi sư tử đi trên đường mòn, cậu ấy bước vào cái bẫy! Tấm lưới dày thắt chặt quanh người. Sư tử gầm lớn kêu cứu. Chú chuột nhỏ nghe tiếng gầm và chạy nhanh đến giúp. Dùng răng sắc nhọn, chuột gặm đứt những sợi dây thừng dày cho đến khi lưới rách toạc. Sư tử được giải thoát an toàn. Từ ngày đó, họ trở thành bạn thân nhất.",
  text_vi: "Một buổi chiều ấm áp, một chú sư tử to lớn đang ngủ dưới gốc cây râm mát trong khu rừng xanh. Trong khi sư tử ngủ, một chú chuột nhỏ chạy ngang qua bàn chân trước to lớn của cậu ấy. Sư tử thức giấc và bắt lấy chú chuột nhỏ bằng những chiếc móng vuốt sắc. 'Xin đừng ăn thịt tôi!' chú chuột sợ hãi kêu lên. 'Nếu anh thả tôi đi, tôi hứa sẽ giúp anh một ngày nào đó.' Sư tử tốt bụng nên đã nhấc chân và thả chuột tự do. Vài ngày sau, những người thợ săn giăng một tấm lưới thừng chắc chắn giữa hai cái cây. Trong khi sư tử đi trên đường mòn, cậu ấy bước vào cái bẫy! Tấm lưới dày thắt chặt quanh người. Sư tử gầm lớn kêu cứu. Chú chuột nhỏ nghe tiếng gầm và chạy nhanh đến giúp. Dùng răng sắc nhọn, chuột gặm đứt những sợi dây thừng dày cho đến khi lưới rách toạc. Sư tử được giải thoát an toàn. Từ ngày đó, họ trở thành bạn thân nhất.",

  story_scenes: [
    {
      id: 1,
      scene_number: 1,
      scene_id: "scene_1",
      title: "Panel 1: Sleeping Under the Shady Tree",
      title_en: "Panel 1: Sleeping Under the Shady Tree",
      description: "A **huge lion** was **sleeping peacefully** when a **tiny mouse** ran across his front paw.",
      description_en: "A **huge lion** was **sleeping peacefully** when a **tiny mouse** ran across his front paw.",
      image_url: "/images/week34/webtoon_scene_1.png",
      lexical_chunks: [
        { word: "huge lion", chunk: "a huge lion sleeping peacefully", x: 45, y: 50 },
        { word: "tiny mouse", chunk: "a tiny mouse running across", x: 28, y: 72 },
        { word: "shady tree", chunk: "under a green shady tree", x: 70, y: 35 }
      ]
    },
    {
      id: 2,
      scene_number: 2,
      scene_id: "scene_2",
      title: "Panel 2: Caught by the Big Paw",
      title_en: "Panel 2: Caught by the Big Paw",
      description: "The lion **woke up angrily** and **caught the little mouse** with his **sharp claws**.",
      description_en: "The lion **woke up angrily** and **caught the little mouse** with his **sharp claws**.",
      image_url: "/images/week34/webtoon_scene_2.png",
      lexical_chunks: [
        { word: "woke up", chunk: "woke up angrily from sleep", x: 48, y: 38 },
        { word: "caught", chunk: "caught the little mouse", x: 35, y: 65 },
        { word: "sharp claws", chunk: "heavy paw with sharp claws", x: 68, y: 58 }
      ]
    },
    {
      id: 3,
      scene_number: 3,
      scene_id: "scene_3",
      title: "Panel 3: The Promise & Kindness",
      title_en: "Panel 3: The Promise & Kindness",
      description: "The scared mouse **made a promise**, and the lion **laughed out loud** and **let him go**.",
      description_en: "The scared mouse **made a promise**, and the lion **laughed out loud** and **let him go**.",
      image_url: "/images/week34/webtoon_scene_3.png",
      lexical_chunks: [
        { word: "promise", chunk: "made a brave promise to help", x: 30, y: 68 },
        { word: "laughed", chunk: "laughed out loud happily", x: 55, y: 42 },
        { word: "let go", chunk: "lifted paw and let him go", x: 72, y: 62 }
      ]
    },
    {
      id: 4,
      scene_number: 4,
      scene_id: "scene_4",
      title: "Panel 4: Trapped in the Rope Net",
      title_en: "Panel 4: Trapped in the Rope Net",
      description: "Hunters **trapped the lion** in a **heavy rope net**, and he **roared loudly** for help.",
      description_en: "Hunters **trapped the lion** in a **heavy rope net**, and he **roared loudly** for help.",
      image_url: "/images/week34/webtoon_scene_4.png",
      lexical_chunks: [
        { word: "trapped", chunk: "trapped in a hidden trap", x: 50, y: 52 },
        { word: "heavy net", chunk: "strong rope net between trees", x: 68, y: 40 },
        { word: "roared", chunk: "roared loudly for help", x: 32, y: 38 }
      ]
    },
    {
      id: 5,
      scene_number: 5,
      scene_id: "scene_5",
      title: "Panel 5: Chewing the Ropes & Best Friends",
      title_en: "Panel 5: Chewing the Ropes & Best Friends",
      description: "The mouse **chewed the ropes** with **sharp teeth**, and they **became best friends**.",
      description_en: "The mouse **chewed the ropes** with **sharp teeth**, and they **became best friends**.",
      image_url: "/images/week34/webtoon_scene_5.png",
      lexical_chunks: [
        { word: "chewed", chunk: "chewed through thick ropes", x: 38, y: 66 },
        { word: "sharp teeth", chunk: "using tiny sharp teeth", x: 52, y: 54 },
        { word: "best friends", chunk: "became best friends forever", x: 70, y: 45 }
      ]
    }
  ],

  comprehension_questions: [
    {
      id: 1,
      question_en: "What was the lion doing when the tiny mouse ran across his paw?",
      options: ["He was sleeping under a shady tree", "He was chasing a forest deer", "He was drinking at the river"],
      answer: "He was sleeping under a shady tree"
    },
    {
      id: 2,
      question_en: "Why did the lion laugh when the mouse made a promise?",
      options: ["He thought a tiny mouse could never help a big lion", "He was playing a fun forest game", "The mouse told a funny riddle"],
      answer: "He thought a tiny mouse could never help a big lion"
    },
    {
      id: 3,
      question_en: "How did the hunters trap the lion in the forest?",
      options: ["They placed a strong rope net between trees", "They dug a deep pit on the path", "They built a heavy wooden cage"],
      answer: "They placed a strong rope net between trees"
    },
    {
      id: 4,
      question_en: "How did the tiny mouse free the lion from the trap?",
      options: ["He chewed through the thick ropes with sharp teeth", "He asked other lions for help", "He pulled the ropes with his paws"],
      answer: "He chewed through the thick ropes with sharp teeth"
    }
  ],

  critical_thinking: {
    question_en: "Why should we never underestimate smaller friends who offer to help?",
    hint_en: "Even the smallest friend can have special abilities that can save or help big friends in unexpected ways."
  }
};

export default readData;
