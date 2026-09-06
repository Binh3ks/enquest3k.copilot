/**
 * Master Syllabus Vocabulary Database for Past Weeks (W01–W32)
 * Aligned with docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md
 * and official Cambridge Starters (Pre-A1, W01-W16) & Movers (A1, W17-W32) wordlists.
 *
 * Used by SRS Spaced Repetition System to seed review pools when student is at Week 33+.
 */

export const PAST_WEEKS_SRS_VOCAB = [
  // ── Block A: Pre-A1 Starters (Weeks 01–16) ──
  { word: "friend", week: 1, definition: "bạn bè", phonetic: "/frend/", box: 3 },
  { word: "body", week: 1, definition: "cơ thể", phonetic: "/ˈbɒdi/", box: 2 },
  { word: "family", week: 2, definition: "gia đình", phonetic: "/ˈfæməli/", box: 3 },
  { word: "sister", week: 2, definition: "chị / em gái", phonetic: "/ˈsɪstə/", box: 2 },
  { word: "tall", week: 3, definition: "cao", phonetic: "/tɔːl/", box: 3 },
  { word: "curly", week: 3, definition: "xoăn (tóc)", phonetic: "/ˈkɜːli/", box: 2 },
  { word: "happy", week: 4, definition: "vui vẻ", phonetic: "/ˈhæpi/", box: 3 },
  { word: "smile", week: 4, definition: "mỉm cười", phonetic: "/smaɪl/", box: 2 },
  { word: "bedroom", week: 5, definition: "phòng ngủ", phonetic: "/ˈbedruːm/", box: 3 },
  { word: "kitchen", week: 5, definition: "nhà bếp", phonetic: "/ˈkɪtʃɪn/", box: 2 },
  { word: "pencil", week: 6, definition: "bút chì", phonetic: "/ˈpensl/", box: 3 },
  { word: "eraser", week: 6, definition: "cục tẩy", phonetic: "/ɪˈreɪzə/", box: 2 },
  { word: "street", week: 7, definition: "đường phố", phonetic: "/striːt/", box: 3 },
  { word: "between", week: 7, definition: "ở giữa", phonetic: "/bɪˈtwiːn/", box: 2 },
  { word: "student", week: 8, definition: "học sinh", phonetic: "/ˈstjuːdnt/", box: 3 },
  { word: "learn", week: 8, definition: "học tập", phonetic: "/lɜːn/", box: 2 },
  { word: "breakfast", week: 9, definition: "bữa sáng", phonetic: "/ˈbrekfəst/", box: 3 },
  { word: "routine", week: 9, definition: "thói quen hằng ngày", phonetic: "/ruːˈtiːn/", box: 2 },
  { word: "fruit", week: 10, definition: "trái cây", phonetic: "/fruːt/", box: 3 },
  { word: "vegetable", week: 10, definition: "rau củ", phonetic: "/ˈvedʒtəbl/", box: 2 },
  { word: "monkey", week: 11, definition: "con khỉ", phonetic: "/ˈmʌŋki/", box: 3 },
  { word: "elephant", week: 11, definition: "con voi", phonetic: "/ˈelɪfənt/", box: 2 },
  { word: "weather", week: 12, definition: "thời tiết", phonetic: "/ˈweðə/", box: 3 },
  { word: "cloudy", week: 12, definition: "nhiều mây", phonetic: "/ˈklaʊdi/", box: 2 },
  { word: "jacket", week: 13, definition: "áo khoác", phonetic: "/ˈdʒækɪt/", box: 3 },
  { word: "shoes", week: 13, definition: "đôi giày", phonetic: "/ʃuːz/", box: 2 },
  { word: "throw", week: 14, definition: "ném / quăng", phonetic: "/θrəʊ/", box: 3 },
  { word: "catch", week: 14, definition: "bắt lấy", phonetic: "/kætʃ/", box: 2 },
  { word: "playground", week: 15, definition: "sân chơi", phonetic: "/ˈpleɪɡraʊnd/", box: 3 },
  { word: "bench", week: 15, definition: "ghế dài công viên", phonetic: "/bentʃ/", box: 2 },
  { word: "champion", week: 16, definition: "quán quân / nhà vô địch", phonetic: "/ˈtʃæmpiən/", box: 3 },

  // ── Block B: A1 Movers (Weeks 17–32) ──
  { word: "guitar", week: 17, definition: "đàn ghi-ta", phonetic: "/ɡɪˈtɑː/", box: 2 },
  { word: "always", week: 17, definition: "luôn luôn", phonetic: "/ˈɔːlweɪz/", box: 3 },
  { word: "bicycle", week: 18, definition: "xe đạp", phonetic: "/ˈbaɪsɪkl/", box: 2 },
  { word: "station", week: 18, definition: "nhà ga / trạm", phonetic: "/ˈsteɪʃn/", box: 2 },
  { word: "building", week: 19, definition: "tòa nhà", phonetic: "/ˈbɪldɪŋ/", box: 2 },
  { word: "village", week: 19, definition: "ngôi làng", phonetic: "/ˈvɪlɪdʒ/", box: 2 },
  { word: "library", week: 20, definition: "thư viện", phonetic: "/ˈlaɪbrəri/", box: 2 },
  { word: "detective", week: 20, definition: "thám tử", phonetic: "/dɪˈtektɪv/", box: 1 },
  { word: "fossil", week: 21, definition: "hóa thạch", phonetic: "/ˈfɒsl/", box: 2 },
  { word: "ground", week: 21, definition: "mặt đất", phonetic: "/ɡraʊnd/", box: 2 },
  { word: "castle", week: 22, definition: "lâu đài", phonetic: "/ˈkɑːsl/", box: 2 },
  { word: "bridge", week: 22, definition: "cây cầu", phonetic: "/brɪdʒ/", box: 2 },
  { word: "kangaroo", week: 23, definition: "chuột túi", phonetic: "/ˌkæŋɡəˈruː/", box: 2 },
  { word: "cage", week: 23, definition: "chuồng / lồng", phonetic: "/keɪdʒ/", box: 2 },
  { word: "campfire", week: 24, definition: "lửa trại", phonetic: "/ˈkæmpfaɪə/", box: 2 },
  { word: "blanket", week: 24, definition: "chăn mền", phonetic: "/ˈblæŋkɪt/", box: 2 },
  { word: "island", week: 25, definition: "hòn đảo", phonetic: "/ˈaɪlənd/", box: 2 },
  { word: "treasure", week: 25, definition: "kho báu", phonetic: "/ˈtreʒə/", box: 2 },
  { word: "weekend", week: 26, definition: "cuối tuần", phonetic: "/ˌwiːkˈend/", box: 3 },
  { word: "journey", week: 26, definition: "chuyến hành trình", phonetic: "/ˈdʒɜːni/", box: 2 },
  { word: "rocket", week: 27, definition: "tên lửa", phonetic: "/ˈrɒkɪt/", box: 2 },
  { word: "planet", week: 27, definition: "hành tinh", phonetic: "/ˈplænɪt/", box: 2 },
  { word: "inventor", week: 28, definition: "nhà phát minh", phonetic: "/ɪnˈventə/", box: 2 },
  { word: "machine", week: 28, definition: "máy móc", phonetic: "/məˈʃiːn/", box: 2 },
  { word: "stomach", week: 29, definition: "dạ dày / bụng", phonetic: "/ˈstʌmək/", box: 2 },
  { word: "shoulder", week: 29, definition: "bờ vai", phonetic: "/ˈʃəʊldə/", box: 2 },
  { word: "hospital", week: 29, definition: "bệnh viện", phonetic: "/ˈhɒspɪtl/", box: 2 },
  { word: "bottle", week: 30, definition: "chai lọ", phonetic: "/ˈbɒtl/", box: 2 },
  { word: "recycle", week: 30, definition: "tái chế", phonetic: "/ˌriːˈsaɪkl/", box: 2 },
  { word: "clean", week: 30, definition: "dọn sạch / sạch sẽ", phonetic: "/kliːn/", box: 3 },
  { word: "puddle", week: 31, definition: "vũng nước", phonetic: "/ˈpʌdl/", box: 2 },
  { word: "storm", week: 31, definition: "cơn bão", phonetic: "/stɔːm/", box: 2 },
  { word: "danger", week: 31, definition: "sự nguy hiểm", phonetic: "/ˈdeɪndʒə/", box: 2 },
  { word: "rescue", week: 32, definition: "cứu hộ / giải cứu", phonetic: "/ˈreskjuː/", box: 2 },
  { word: "caution", week: 32, definition: "sự cẩn trọng", phonetic: "/ˈkɔːʃn/", box: 2 },
  { word: "emergency", week: 32, definition: "tình huống khẩn cấp", phonetic: "/iˈmɜːdʒənsi/", box: 1 }
];

export default PAST_WEEKS_SRS_VOCAB;
