/**
 * GameInstructionModal.jsx — Interactive How-To-Play Guide for Chronicles Mini-Games
 *
 * Provides clear, friendly bilingual (Vietnamese & English) gameplay instructions,
 * step-by-step guidance, and victory conditions for each challenge door.
 */

import React from 'react';
import { X, Sparkles, CheckCircle2, Trophy, Volume2, HelpCircle } from 'lucide-react';

const GAME_GUIDES = {
  arcane_bubble: {
    icon: '🔮',
    title: 'Bong Bóng Từ Vựng',
    titleEn: 'Arcane Bubble Pop',
    doorType: '🔵 Vocab Door',
    mission: 'Chạm vào đúng bong bóng chứa từ vựng được yêu cầu trước khi bóng bay mất khỏi màn hình!',
    steps: [
      {
        num: '1',
        label: 'Quan sát mục tiêu',
        desc: 'Nhìn vào khung "🎯 Target Word" trên cùng để biết từ vựng cần tìm.',
      },
      {
        num: '2',
        label: 'Nghe phát âm',
        desc: 'Bấm biểu tượng loa 🔊 bên cạnh từ vựng để nghe giọng phát âm chuẩn bản xứ.',
      },
      {
        num: '3',
        label: 'Bắt bong bóng',
        desc: 'Các bong bóng sẽ bay từ dưới lên. Chạm nhanh vào bong bóng có chữ khớp với mục tiêu.',
      },
      {
        num: '4',
        label: 'Tránh bấm sai',
        desc: 'Bấm sai bong bóng hoặc để bong bóng mục tiêu bay mất sẽ bị tính là một lỗi (✗).',
      },
    ],
    starsGuide: '1★: ≥4 câu đúng | 2★: ≥7 câu đúng | 3★: ≥9 câu đúng hoàn hảo',
  },
  spell_train: {
    icon: '🚂',
    title: 'Đoàn Tàu Ngữ Pháp',
    titleEn: 'Spell Train',
    doorType: '🟡 Grammar Door',
    mission: 'Sắp xếp các toa từ vựng theo đúng trật tự ngữ pháp để tạo thành câu hoàn chỉnh!',
    steps: [
      {
        num: '1',
        label: 'Đọc ngân hàng từ',
        desc: 'Quan sát các từ vựng đang xếp lộn xộn ở khung bên dưới.',
      },
      {
        num: '2',
        label: 'Ghép câu lên tàu',
        desc: 'Chạm lần lượt vào từng từ theo đúng trật tự câu (Chủ ngữ → Động từ → Tân ngữ...).',
      },
      {
        num: '3',
        label: 'Sửa lỗi nếu nhầm',
        desc: 'Nếu chọn nhầm từ, chạm trực tiếp vào từ đó trên đoàn tàu để gỡ từ xuống.',
      },
      {
        num: '4',
        label: 'Tự động kiểm tra',
        desc: 'Khi ghép đủ tất cả các từ, câu thần chú sẽ tự động được kiểm tra ngữ pháp.',
      },
    ],
    starsGuide: '1★: ≥2 câu đúng | 2★: ≥4 câu đúng | 3★: Đúng toàn bộ câu',
  },
  lexical_det: {
    icon: '🕵️‍♂️',
    title: 'Thám Tử Từ Vựng',
    titleEn: 'Lexical Detective (Odd One Out)',
    doorType: '🔴 Integration Door',
    mission: 'Phát hiện 1 từ "lạc quẻ" KHÔNG cùng nhóm chủ đề hoặc đặc điểm với 3 từ còn lại!',
    steps: [
      {
        num: '1',
        label: 'Đọc kỹ 4 thẻ bài',
        desc: 'Quan sát 4 thẻ từ vựng hiển thị trên bàn thám tử.',
      },
      {
        num: '2',
        label: 'Tìm quy luật chung',
        desc: 'Tìm điểm chung của 3 từ (ví dụ: cùng là bộ phận giày dép, cùng là lực vật lý, cùng loại từ...).',
      },
      {
        num: '3',
        label: 'Chọn từ khác biệt',
        desc: 'Chạm vào thẻ từ KHÔNG thuộc nhóm chung đó để phá án!',
      },
    ],
    starsGuide: '1★: ≥2 vòng đúng | 2★: ≥4 vòng đúng | 3★: ≥6 vòng đúng chuẩn xác',
  },
  crystal_match: {
    icon: '💎',
    title: 'Lật Thẻ Tinh Thể',
    titleEn: 'Crystal Memory Match',
    doorType: '🔵 Vocab Door',
    mission: 'Lật các cặp thẻ tinh thể tương ứng giữa Từ vựng tiếng Anh và Định nghĩa!',
    steps: [
      {
        num: '1',
        label: 'Lật thẻ đầu tiên',
        desc: 'Chạm vào 1 thẻ tinh thể úp để xem nội dung (Từ hoặc Định nghĩa).',
      },
      {
        num: '2',
        label: 'Tìm thẻ ghép đôi',
        desc: 'Chạm vào thẻ thứ 2. Nếu khớp nghĩa, cả 2 thẻ sẽ phát sáng vĩnh viễn.',
      },
      {
        num: '3',
        label: 'Ghi nhớ vị trí',
        desc: 'Nếu không khớp, 2 thẻ sẽ úp lại sau 1s. Hãy ghi nhớ vị trí để lật lại sau!',
      },
    ],
    starsGuide: '1★: Hoàn thành bảng | 2★: ≤7 lần lật sai | 3★: ≤3 lần lật sai',
  },
  rune_forge: {
    icon: '⚒️',
    title: 'Lò Rèn Cổ Tự',
    titleEn: 'Rune Forge',
    doorType: '🟡 Grammar Door',
    mission: 'Chọn viên đá cổ tự đúng để điền vào chỗ trống trong câu trước khi lò rèn tắt lửa!',
    steps: [
      {
        num: '1',
        label: 'Đọc câu văn khuyết',
        desc: 'Đọc câu hiển thị trên lò rèn, chú ý vị trí có dấu gạch dưới (_____).',
      },
      {
        num: '2',
        label: 'Chọn cổ tự phù hợp',
        desc: 'Chọn 1 trong 4 viên đá cổ tự bên dưới có từ phù hợp nhất về ngữ pháp và ý nghĩa.',
      },
      {
        num: '3',
        label: 'Bảo vệ khiên lò rèn',
        desc: 'Mỗi lần chọn sai sẽ làm nứt khiên lò rèn (-1 HP). Hãy cẩn thận!',
      },
    ],
    starsGuide: '1★: Sửa xong câu | 2★: Giữ ≥2 HP | 3★: Giữ trọn vẹn 3 HP khiên',
  },
  ancient_scroll: {
    icon: '📜',
    title: 'Cuộn Giấy Cổ',
    titleEn: 'Ancient Scroll Fill',
    doorType: '🔴 Integration Door',
    mission: 'Điền các từ vựng thích hợp vào các ô trống trên cuộn giấy tri thức cổ đại!',
    steps: [
      {
        num: '1',
        label: 'Chọn ô trống',
        desc: 'Chạm vào ô trống [_1_], [_2_]... trên cuộn giấy để kích hoạt ô đó.',
      },
      {
        num: '2',
        label: 'Đặt từ vào ô',
        desc: 'Chạm vào từ trong Ngân hàng từ (Word Bank) bên dưới để điền vào ô trống đã chọn.',
      },
      {
        num: '3',
        label: 'Nộp bài',
        desc: 'Khi điền đủ tất cả các ô, bấm nút "Submit / Nộp bài" để hoàn tất cuộn giấy.',
      },
    ],
    starsGuide: '1★: Đúng 1–2 ô | 2★: Đúng 3–4 ô | 3★: Đúng trọn vẹn 5/5 ô',
  },
};

export default function GameInstructionModal({
  gameType = 'arcane_bubble',
  isOpen = false,
  onClose,
  onStart,
  isIntro = false,
}) {
  if (!isOpen) return null;

  const guide = GAME_GUIDES[gameType] || GAME_GUIDES.arcane_bubble;

  const handleAction = () => {
    if (isIntro && onStart) {
      onStart();
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-7 text-white shadow-2xl text-left max-h-[90vh] overflow-y-auto">
        {/* Close button (only when viewing while playing) */}
        {!isIntro && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header */}
        <div className="flex items-center gap-4 mb-5 border-b border-indigo-500/20 pb-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-4xl shadow-inner shrink-0">
            {guide.icon}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-400/15 border border-indigo-400/30 text-indigo-300 text-[11px] font-bold uppercase tracking-wider mb-1">
              <span>{guide.doorType}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {guide.title}
            </h3>
            <p className="text-xs text-indigo-300 font-semibold">{guide.titleEn}</p>
          </div>
        </div>

        {/* Mission Box */}
        <div className="bg-amber-500/10 border border-amber-400/30 rounded-2xl p-3.5 mb-5 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-black text-amber-300 uppercase tracking-wider mb-0.5">
              Nhiệm vụ của bạn:
            </div>
            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
              {guide.mission}
            </p>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="mb-5">
          <div className="text-xs font-black text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Hướng dẫn từng bước (How to play):</span>
          </div>
          <div className="space-y-2.5">
            {guide.steps.map((step) => (
              <div
                key={step.num}
                className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {step.num}
                </div>
                <div>
                  <div className="text-xs font-bold text-white mb-0.5">{step.label}</div>
                  <div className="text-xs text-slate-300 leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stars Criteria */}
        <div className="bg-slate-800/80 border border-indigo-400/30 rounded-2xl p-3 mb-6 flex items-center gap-3">
          <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="text-xs text-slate-200">
            <strong className="text-amber-300">Tiêu chuẩn sao: </strong>
            {guide.starsGuide}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleAction}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-amber-500 hover:from-indigo-400 hover:to-amber-400 text-white font-black text-sm sm:text-base shadow-lg shadow-indigo-500/30 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <span>{isIntro ? '⚡ Đã hiểu, Bắt đầu chơi ngay!' : '✓ Đóng hướng dẫn & Tiếp tục'}</span>
        </button>
      </div>
    </div>
  );
}
