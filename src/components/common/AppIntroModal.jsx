import React, { useState, useEffect } from 'react';
import { X, BookOpen, Star, Award, Users, Sparkles, ChevronRight, Check } from 'lucide-react';

const STORAGE_KEY = 'engquest_intro_seen_v1';

const FEATURES = [
  { emoji: '📚', title: '156 Tuần học theo chuẩn Cambridge', desc: 'Từ Pre-A1 → C1. Mỗi tuần đủ 4 kỹ năng: Nghe, Nói, Đọc, Viết. Lộ trình rõ ràng, không học lan man.' },
  { emoji: '🤖', title: 'AI Tutor Nova — gia sư riêng 24/7', desc: 'Trò chuyện, luyện phát âm, sửa bài viết. Nova học cùng con, không phán xét, không giới hạn câu hỏi.' },
  { emoji: '🧠', title: 'Spaced Repetition System (SRS)', desc: 'Hệ thống khoa học nhất để ghi nhớ từ vựng lâu dài. Tự động ôn đúng lúc não bộ sắp quên.' },
  { emoji: '🎮', title: 'Game Hub + Logic Lab', desc: 'Học qua trò chơi, toán Singapore và khoa học. Tư duy bằng tiếng Anh từ sớm — không chỉ dịch từ.' },
  { emoji: '📊', title: 'Báo cáo cho phụ huynh & GV', desc: 'Theo dõi tiến độ thực tế: từ vựng, kỹ năng viết, chuỗi học. Dữ liệu thật, không ước tính.' },
  { emoji: '🎙️', title: 'Shadowing & Pronunciation', desc: 'Phương pháp luyện phát âm của diễn viên lồng tiếng. Tai nghe chuẩn hơn, nói tự nhiên hơn.' },
];

const CREDENTIALS = [
  '30 năm kinh nghiệm dạy và nghiên cứu ESL',
  'Phiên dịch viên cabin hàng đầu Việt Nam',
  'Là công trình cả đời, trực tiếp viết toàn bộ 156 tuần nội dung',
  'Xây dựng theo chuẩn Cambridge & phương pháp ESL tiên tiến nhất',
];

export default function AppIntroModal() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0); // 0 = welcome, 1 = features, 2 = credentials

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      // Short delay so app renders first
      const t = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        {/* Close */}
        <button onClick={dismiss} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
          <X size={18} />
        </button>

        {/* Page 0 — Welcome */}
        {page === 0 && (
          <>
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white text-center">
              <div className="text-5xl mb-3">🎓</div>
              <h1 className="text-2xl font-black mb-2 leading-tight">Chào mừng đến<br/>EngQuest 3K</h1>
              <p className="text-indigo-100 text-sm font-medium">Nền tảng học tiếng Anh toàn diện<br/>theo chuẩn Cambridge cho học sinh Việt Nam</p>
              <div className="mt-4 inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-2">
                <Star size={14} className="text-amber-300" />
                <span className="text-xs font-black">14 ngày dùng thử MIỄN PHÍ</span>
                <Star size={14} className="text-amber-300" />
              </div>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              <p className="text-slate-600 text-sm leading-relaxed text-center mb-6">
                EngQuest 3K là ứng dụng học tiếng Anh <strong>duy nhất tại Việt Nam</strong> được xây dựng hoàn toàn bởi một chuyên gia ESL có 30 năm kinh nghiệm — theo đúng chuẩn quốc tế.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '📐', label: 'Chuẩn Cambridge' },
                  { icon: '🏆', label: '156 tuần lộ trình' },
                  { icon: '🤖', label: 'AI Tutor Nova' },
                  { icon: '👨‍👩‍👧', label: 'Dashboard Phụ huynh' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2 bg-indigo-50 rounded-xl px-3 py-2">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-xs font-black text-indigo-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 pt-0 flex gap-3">
              <button onClick={dismiss} className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-500 font-bold text-sm hover:border-slate-300 transition-colors">
                Bỏ qua
              </button>
              <button onClick={() => setPage(1)} className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm transition-colors flex items-center justify-center gap-2">
                Tìm hiểu thêm <ChevronRight size={16} />
              </button>
            </div>
          </>
        )}

        {/* Page 1 — Features */}
        {page === 1 && (
          <>
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-5 text-white">
              <p className="text-xs font-black uppercase tracking-widest text-violet-200 mb-1">Tính năng nổi bật</p>
              <h2 className="text-xl font-black">Tất cả trong một ứng dụng</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {FEATURES.map(f => (
                <div key={f.title} className="flex gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{f.emoji}</span>
                  <div>
                    <p className="text-sm font-black text-slate-700 mb-0.5">{f.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 flex gap-3 border-t border-slate-100">
              <button onClick={() => setPage(0)} className="px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-500 font-bold text-sm">
                ← Quay lại
              </button>
              <button onClick={() => setPage(2)} className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm transition-colors flex items-center justify-center gap-2">
                Về người xây dựng <ChevronRight size={16} />
              </button>
            </div>
          </>
        )}

        {/* Page 2 — Credentials */}
        {page === 2 && (
          <>
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 px-6 py-5 text-white">
              <p className="text-xs font-black uppercase tracking-widest text-amber-100 mb-1">Được xây dựng bởi</p>
              <h2 className="text-xl font-black leading-snug">Chuyên gia ESL hàng đầu<br/>Việt Nam</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="flex items-start gap-4 mb-5 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Award size={26} className="text-white" />
                </div>
                <div>
                  <p className="font-black text-slate-800 text-base">Owner — Chuyên gia ESL</p>
                  <p className="text-xs text-slate-500 mt-0.5">Phiên dịch viên cabin · Nhà nghiên cứu ngôn ngữ</p>
                </div>
              </div>
              <div className="space-y-2.5 mb-5">
                {CREDENTIALS.map(c => (
                  <div key={c} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <Check size={11} className="text-white" />
                    </div>
                    <p className="text-sm text-slate-700 font-medium leading-snug">{c}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-2xl p-4 border border-indigo-100">
                <p className="text-xs font-black text-indigo-600 uppercase mb-2 flex items-center gap-1.5">
                  <Sparkles size={12} /> Cam kết chất lượng
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Mỗi bài học, mỗi câu từ, mỗi tính năng trong EngQuest 3K đều được tôi trực tiếp kiểm duyệt và xây dựng theo phương pháp giảng dạy tiếng Anh <strong>tiên tiến nhất thế giới</strong>.
                </p>
              </div>
            </div>
            <div className="p-4 flex gap-3 border-t border-slate-100">
              <button onClick={() => setPage(1)} className="px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-500 font-bold text-sm">
                ← Quay lại
              </button>
              <button onClick={dismiss} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 text-white font-black text-sm transition-opacity flex items-center justify-center gap-2">
                Bắt đầu học ngay! 🚀
              </button>
            </div>
          </>
        )}

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 pb-3">
          {[0, 1, 2].map(i => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i === page ? 'w-6 bg-indigo-500' : 'w-1.5 bg-slate-200'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
