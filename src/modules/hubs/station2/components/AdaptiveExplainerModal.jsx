import React from 'react';
import { BookOpen, X, CheckCircle } from 'lucide-react';

const GRAMMAR_HINTS = {
  past_continuous_when_while: {
    title: 'Mẹo Ngữ Pháp: Past Continuous + When / While',
    rule: 'Dùng "While" cho hành động kéo dài (quá khứ tiếp diễn - was/were + V-ing). Dùng "When" cho hành động cắt ngang (quá khứ đơn).',
    example: 'While I was reading, the phone rang. (Hoặc: The phone rang while I was reading.)'
  },
  clauses_of_reason: {
    title: 'Mẹo Ngữ Pháp: Từ Nối Chỉ Lý Do (Because & So)',
    rule: '"Because" đứng trước nguyên nhân (Lý do). "So" đứng trước kết quả.',
    example: 'We brought torches because the cave was dark. (Vì hang tối nên mang đuốc).'
  },
  connectors: {
    title: 'Mẹo Ngữ Pháp: Từ Nối Đối Lập (Although / However)',
    rule: '"Although" mở đầu mệnh đề phụ chỉ sự nhượng bộ (Dù cho...). Nếu "Although" đứng đầu câu, cần có dấu phẩy (,) ngăn cách hai mệnh đề.',
    example: 'Although the path was steep, we kept walking.'
  }
};

export function AdaptiveExplainerModal({ grammarTag, onClose }) {
  const hintInfo = GRAMMAR_HINTS[grammarTag] || {
    title: 'Mẹo Ngữ Pháp Hỗ Trợ',
    rule: 'Hãy chú ý vị trí từ nối và trật tự Chủ ngữ + Động từ trong câu.',
    example: 'Ví dụ: While I was sleeping, my alarm rang.'
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-amber-500/80 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Adaptive Hint — Học lại mẹo</span>
              <h3 className="text-lg font-extrabold">{hintInfo.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="my-6 space-y-4">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <h4 className="text-xs text-slate-400 font-bold uppercase mb-1">Quy tắc vàng:</h4>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">{hintInfo.rule}</p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/30">
            <h4 className="text-xs text-amber-400 font-bold uppercase mb-1">Ví dụ mẫu:</h4>
            <p className="text-sm text-amber-100 font-semibold italic">{hintInfo.example}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-2xl text-base transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <CheckCircle size={18} /> Tôi đã hiểu! Thử lại ngay
        </button>
      </div>
    </div>
  );
}
