export default {
  questions: [
    {
      id: 1,
      question_en: "Detective Kim found these clues: a muddy footprint at the door, a wet umbrella in the corner, and an open window. What can we conclude?",
      question_vi: "Thám tử Kim tìm thấy những manh mối này: dấu chân bùn ở cửa, một chiếc ô ướt ở góc phòng và một cửa sổ mở. Chúng ta có thể kết luận gì?",
      options_en: [
        "A. Someone came in through the window in dry weather",
        "B. Someone came in through the door when it was raining outside",
        "C. Nobody entered the room",
        "D. The umbrella was already there before"
      ],
      options_vi: [
        "A. Ai đó vào qua cửa sổ khi thời tiết khô ráo",
        "B. Ai đó vào qua cửa khi trời đang mưa bên ngoài",
        "C. Không ai vào phòng đó",
        "D. Cái ô đã ở đó trước rồi"
      ],
      correct_answer: "B",
      explanation_en: "Muddy footprint at the DOOR (not the window) and a wet umbrella both suggest someone entered through the door during rainy weather.",
      explanation_vi: "Dấu chân bùn ở CỬA (không phải cửa sổ) và một chiếc ô ướt cho thấy ai đó đã vào qua cửa khi trời mưa.",
      audio_url: "/audio/week22/logic_q1.mp3"
    },
    {
      id: 2,
      question_en: "At a crime scene, Detective Kim found: warm food on a table, a jacket on a chair, and an open book. The person had NOT been home for 3 days. Which clue does NOT fit this fact?",
      question_vi: "Tại hiện trường, Thám tử Kim tìm thấy: đồ ăn còn ấm trên bàn, áo khoác trên ghế và sách đang mở. Người này KHÔNG ở nhà trong 3 ngày. Manh mối nào KHÔNG phù hợp với sự thật này?",
      options_en: [
        "A. The open book — books can stay open for days",
        "B. The jacket on the chair — normal when going out",
        "C. The warm food — food would be cold or rotten after 3 days",
        "D. All clues fit the fact"
      ],
      options_vi: [
        "A. Cuốn sách đang mở — sách có thể mở trong nhiều ngày",
        "B. Áo khoác trên ghế — bình thường khi ra ngoài",
        "C. Đồ ăn còn ấm — đồ ăn sẽ nguội hoặc thối sau 3 ngày",
        "D. Tất cả manh mối phù hợp"
      ],
      correct_answer: "C",
      explanation_en: "If someone has been away for 3 days, any food left out would be cold or rotten — NOT warm. Warm food is a strong clue that someone was home very recently, which contradicts the '3 days away' claim.",
      explanation_vi: "Nếu ai đó đã vắng nhà 3 ngày, bất kỳ đồ ăn nào để ngoài sẽ nguội hoặc thối — KHÔNG còn ấm. Đồ ăn còn ấm là manh mối mạnh cho thấy ai đó vừa ở nhà gần đây, điều này mâu thuẫn với tuyên bố 'vắng 3 ngày'.",
      audio_url: "/audio/week22/logic_q2.mp3"
    },
    {
      id: 3,
      question_en: "Detective Kim questioned 4 suspects. Two gave the same alibi. One said he was at home. One couldn't remember. How many suspects gave DIFFERENT answers?",
      question_vi: "Thám tử Kim thẩm vấn 4 nghi phạm. Hai người đưa ra bằng chứng ngoại phạm giống nhau. Một người nói là ở nhà. Một người không nhớ. Bao nhiêu nghi phạm đưa ra câu trả lời KHÁC NHAU?",
      options_en: [
        "A. 1 suspect",
        "B. 2 suspects",
        "C. 3 suspects",
        "D. 4 suspects"
      ],
      options_vi: [
        "A. 1 nghi phạm",
        "B. 2 nghi phạm",
        "C. 3 nghi phạm",
        "D. 4 nghi phạm"
      ],
      correct_answer: "C",
      explanation_en: "Two gave the SAME alibi (counts as 1 unique answer), one said he was home, one couldn't remember. That's 3 different answers from 4 suspects.",
      explanation_vi: "Hai người đưa ra bằng chứng GIỐNG NHAU (tính là 1 câu trả lời), một người nói ở nhà, một người không nhớ. Vậy có 3 câu trả lời khác nhau từ 4 nghi phạm.",
      audio_url: "/audio/week22/logic_q3.mp3"
    },
    {
      id: 4,
      question_en: "A crime happened at 6pm. Suspect A was seen at a restaurant at 5:45pm, which is 30 minutes away. Could Suspect A be the criminal?",
      question_vi: "Tội phạm xảy ra lúc 6 giờ chiều. Nghi phạm A được nhìn thấy tại nhà hàng lúc 5:45 chiều, cách nơi xảy ra tội phạm 30 phút. Nghi phạm A có thể là tội phạm không?",
      options_en: [
        "A. Yes, easily",
        "B. Possibly, if he ran very fast",
        "C. No, it is impossible",
        "D. We cannot tell without more clues"
      ],
      options_vi: [
        "A. Có, dễ dàng",
        "B. Có thể, nếu anh ta chạy rất nhanh",
        "C. Không, điều đó là không thể",
        "D. Chúng ta không thể biết nếu không có thêm manh mối"
      ],
      correct_answer: "C",
      explanation_en: "If Suspect A was at the restaurant at 5:45pm and it takes 30 minutes to travel, he could only arrive at the crime scene at 6:15pm — AFTER the crime. It is impossible.",
      explanation_vi: "Nếu nghi phạm A ở nhà hàng lúc 5:45 chiều và mất 30 phút di chuyển, anh ta chỉ có thể đến nơi xảy ra tội phạm lúc 6:15 chiều — SAU khi tội phạm xảy ra. Điều đó là không thể.",
      audio_url: "/audio/week22/logic_q4.mp3"
    },
    {
      id: 5,
      question_en: "Forensic scientists can identify people using fingerprints. Why is each person's fingerprint UNIQUE?",
      question_vi: "Các nhà khoa học pháp y có thể nhận dạng người qua dấu vân tay. Tại sao dấu vân tay của mỗi người là DUY NHẤT?",
      options_en: [
        "A. Fingerprints form randomly in the womb — no two people develop identical ridge patterns",
        "B. People press their fingers differently each time they touch something",
        "C. Fingerprints change shape every year",
        "D. Only criminals have unique fingerprints"
      ],
      options_vi: [
        "A. Dấu vân tay hình thành ngẫu nhiên trong bụng mẹ — không có hai người nào phát triển cùng kiểu đường vân",
        "B. Mọi người ấn ngón tay khác nhau mỗi lần chạm vào thứ gì đó",
        "C. Dấu vân tay thay đổi hình dạng mỗi năm",
        "D. Chỉ tội phạm mới có dấu vân tay độc đáo"
      ],
      correct_answer: "A",
      explanation_en: "Before birth, each person's fingerprints develop through a unique combination of genetics and random pressures in the womb. This means no two fingerprints — not even those of identical twins — are exactly alike.",
      explanation_vi: "Trước khi sinh, dấu vân tay của mỗi người phát triển qua sự kết hợp độc đáo của di truyền và áp lực ngẫu nhiên trong bụng mẹ. Điều này có nghĩa là không có hai dấu vân tay nào — kể cả của anh/chị/em sinh đôi — hoàn toàn giống nhau.",
      audio_url: "/audio/week22/logic_q5.mp3"
    }
  ]
};
