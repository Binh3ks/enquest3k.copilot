// Week metadata - titles only (no full data)
// This file is manually maintained or auto-generated
export const weekTitles = {
  1: { title_en: "The Young Scholar", title_vi: "Học Sinh Trẻ" },
  2: { title_en: "My Family Squad", title_vi: "Biệt Đội Gia Đình" },
  3: { title_en: "The Mirror Game", title_vi: "Trò chơi Soi gương" },
  4: { title_en: "My Happy Jar", title_vi: "Lọ Hạnh Phúc của Tôi" },
  5: { title_en: "The Mystery House", title_vi: "Ngôi nhà Bí ẩn" },
  6: { title_en: "Treasure Hunt at Home", title_vi: "Săn Kho Báu Tại Nhà" },
  7: { title_en: "Inside My Backpack", title_vi: "Trong Balo của tôi" },
  8: { title_en: "The Busy Classroom", title_vi: "Lớp học Bận rộn" },
  9: { title_en: "City Sounds & Sights", title_vi: "Âm thanh & Hình ảnh Thành phố" },
  10: { title_en: "The Farm Adventure", title_vi: "Cuộc phiêu lưu Nông trại" },
  11: { title_en: "Weekend Fun Spots (Places)", title_vi: "Các Địa Điểm Vui Chơi Cuối Tuần" },
  12: { title_en: "The Talent Show (Abilities)", title_vi: "Buổi Biểu Diễn Tài Năng" },
  13: { title_en: "The Daily Routine", title_vi: "Thói Quen Hàng Ngày" },
  14: { title_en: "Welcome to My World (Project Showcase)", title_vi: "Chào mừng đến Thế giới của Tôi" },
  15: { title_en: "The Busy Park (Actions Now)", title_vi: "Công viên Bận rộn" },
  16: { title_en: "Sports Commentary", title_vi: "Bình Luận Thể Thao" },
  17: { title_en: "Weather & Clothes", title_vi: "Thời Tiết & Trang Phục" },
  18: { title_en: "The Live Reporter", title_vi: "Phóng Viên Trực Tiếp" },
  19: { title_en: "When I Was Small", title_vi: "Khi Tôi Còn Nhỏ" },
  20: { title_en: "The Old Town", title_vi: "Thị Trấn Cũ" },
  21: { title_en: "Yesterday's Diary", title_vi: "Nhật Ký Hôm Qua" },
  22: { title_en: "The Time Detective", title_vi: "Tham Tu Thoi Gian" },
  23: { title_en: "The Art Class", title_vi: "Lop Hoc My Thuat" },
  24: { title_en: "Feelings in the Past", title_vi: "Cam Xuc Trong Qua Khu" },
  25: { title_en: "The Sequence Challenge", title_vi: "Thu Thach Trinh Tu" },
  26: { title_en: "My Weekend Comic Strip", title_vi: "Bo Truyen Tranh Cuoi Tuan Cua Toi" },
  // Add more as weeks are created
};

// Helper to get title with fallback
export const getWeekTitle = (weekId, lang = 'en') => {
  const meta = weekTitles[weekId];
  if (meta) {
    return lang === 'vi' ? meta.title_vi : meta.title_en;
  }
  return lang === 'vi' ? `Tuần ${weekId}` : `Week ${weekId}`;
};
