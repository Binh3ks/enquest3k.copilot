// Week 33 STEM Story: Corridor Safety & School Care
export default {
  id: "w33_read",
  week: 33,
  title: "Corridor Safety & School Care",
  title_vi: "An Toàn Hành Lang & Chăm Sóc Trường Học",
  cover_image: "/images/week33/read_cover_w33.jpg",
  audio_url: "/audio/week33/read_full.mp3",
  content_en: "Jake was walking carefully down the school corridor after science class. Suddenly, a boy running fast slipped on the wet floor and fell down heavily. He hurt his knee and lost his balance completely. Jake stopped immediately to help his friend stay calm. He called the school nurse right away. The nurse arrived quickly with a clean bandage and a cold pack to treat the cut. Everyone felt relieved and praised Jake for following safety rules. The headmaster reminded all students never to run in corridors.",
  content_vi: "Jake đang đi bộ cẩn thận xuống hành lang trường học sau giờ học khoa học. Đột nhiên, một cậu bé đang chạy nhanh bị trượt chân trên sàn nhà ướt và ngã nặng. Cậu ấy bị thương ở đầu gối và mất thăng bằng hoàn toàn. Jake dừng lại ngay lập tức để giúp bạn mình giữ bình tĩnh. Cậu ấy gọi y tế nhà trường ngay lập tức. Cô y tá đến nhanh chóng với một chiếc băng cá nhân sạch và một túi chườm lạnh để điều trị vết cắt. Mọi người đều cảm thấy nhẹ nhõm và khen ngợi Jake vì đã tuân thủ các quy tắc an toàn. Thầy hiệu trưởng nhắc nhở tất cả học sinh không bao giờ được chạy trong hành lang.",
  story_scenes: [
    {
      scene_id: "scene_1",
      title_en: "Scene 1: Walking Down the Corridor",
      description_en: "Jake was walking carefully down the school corridor after science class.",
      image_url: "/images/week33/webtoon_scene_1.png",
      lexical_chunks: [
        { word: "corridor", chunk: "school corridor", x: 45, y: 55 },
        { word: "carefully", chunk: "walking carefully", x: 25, y: 40 }
      ]
    },
    {
      scene_id: "scene_2",
      title_en: "Scene 2: Running Fast Past the Lab",
      description_en: "A boy ran very fast past the science laboratory classroom door.",
      image_url: "/images/week33/webtoon_scene_2.png",
      lexical_chunks: [
        { word: "running", chunk: "running fast", x: 50, y: 50 },
        { word: "laboratory", chunk: "science laboratory", x: 20, y: 40 }
      ]
    },
    {
      scene_id: "scene_3",
      title_en: "Scene 3: Slipping on the Wet Floor",
      description_en: "Suddenly, he slipped on a wet floor puddle and flew into the air with papers falling.",
      image_url: "/images/week33/webtoon_scene_3.png",
      lexical_chunks: [
        { word: "slipped", chunk: "slipped on the wet floor", x: 50, y: 60 },
        { word: "fell", chunk: "fell down heavily", x: 60, y: 70 }
      ]
    },
    {
      scene_id: "scene_4",
      title_en: "Scene 4: Calling the Nurse for Help",
      description_en: "Jake stopped immediately and walked quickly to call the school nurse for help.",
      image_url: "/images/week33/webtoon_scene_4.png",
      lexical_chunks: [
        { word: "hurt", chunk: "hurt his knee", x: 45, y: 65 },
        { word: "called", chunk: "called for help", x: 30, y: 50 }
      ]
    },
    {
      scene_id: "scene_5",
      title_en: "Scene 5: Nurse Applying Bandage & Relief",
      description_en: "The school nurse arrived quickly and applied a clean bandage to his injured knee on a bench.",
      image_url: "/images/week33/webtoon_scene_5.png",
      lexical_chunks: [
        { word: "nurse", chunk: "school nurse", x: 60, y: 45 },
        { word: "bandage", chunk: "clean bandage", x: 40, y: 60 }
      ]
    }
  ],
  story_title_options: {
    question_en: "Now choose the best title for the story:",
    question_vi: "Bây giờ hãy chọn tiêu đề hay nhất cho câu chuyện:",
    options: [
      { id: "opt_a", text: "Tom's Clumsy Morning", is_correct: false, explanation: "Incorrect: This story is about Jake in the school corridor, not Tom at home." },
      { id: "opt_b", text: "Corridor Safety & Quick Action", is_correct: true, explanation: "Correct! The story describes corridor safety, Jake's quick action, and first aid treatment." },
      { id: "opt_c", text: "Playing Soccer in Science Class", is_correct: false, explanation: "Incorrect: Soccer is not played in the science class." }
    ]
  }
};

