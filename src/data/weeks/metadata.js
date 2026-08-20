// Week metadata - W33+ only (W01-32 archived at v1-w01-w32-final-20260820)
export const weekTitles = {
  33: { title_en: "Corridor Safety & School Care", title_vi: "An Toàn Hành Lang & Chăm Sóc Trường Học", cefr_level: "A2 Flyers", cambridge_prep: "YLE Flyers" },
  34: { title_en: "The Lion and the Mouse", title_vi: "Sư Tử và Chuột — Truyện Ngụ Ngôn", cefr_level: "A2 Flyers", cambridge_prep: "YLE Flyers" },
  35: { title_en: "The Best Day Ever", title_vi: "Ngày Tuyệt Vời Nhất — Kể Lại Kỷ Niệm Cá Nhân", cefr_level: "A2 Flyers", cambridge_prep: "YLE Flyers" },
  36: { title_en: "My Adventure Book", title_vi: "Sách Phiêu Lưu Của Em — Dự Án 3", cefr_level: "A2 Flyers", cambridge_prep: "YLE Flyers" },
  37: { title_en: "Living vs. Non-Living", title_vi: "Vật Sống & Không Sống — CLIL Unit 6", cefr_level: "A2 Flyers", cambridge_prep: "YLE Flyers" },
};

export const getWeekTitle = (weekId, lang = 'en') => {
  const meta = weekTitles[weekId];
  if (meta) {
    return lang === 'vi' ? meta.title_vi : meta.title_en;
  }
  return lang === 'vi' ? `Tuần ${weekId}` : `Week ${weekId}`;
};
