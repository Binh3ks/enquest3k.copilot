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
  8: { title_en: "Week 8", title_vi: "Tuần 8" },
  9: { title_en: "Week 9", title_vi: "Tuần 9" },
  10: { title_en: "Week 10", title_vi: "Tuần 10" },
  11: { title_en: "Week 11", title_vi: "Tuần 11" },
  12: { title_en: "Week 12", title_vi: "Tuần 12" },
  13: { title_en: "Week 13", title_vi: "Tuần 13" },
  14: { title_en: "Week 14", title_vi: "Tuần 14" },
  15: { title_en: "Week 15", title_vi: "Tuần 15" },
  16: { title_en: "Week 16", title_vi: "Tuần 16" },
  17: { title_en: "Week 17", title_vi: "Tuần 17" },
  18: { title_en: "Week 18", title_vi: "Tuần 18" },
  19: { title_en: "My Baby Album", title_vi: "Album Bé Yêu" },
  20: { title_en: "Week 20", title_vi: "Tuần 20" },
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
