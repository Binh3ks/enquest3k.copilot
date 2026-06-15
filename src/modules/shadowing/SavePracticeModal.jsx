import React from 'react';
import { X, Save } from 'lucide-react';

/**
 * SavePracticeModal — "Save your practice" confirmation before auto-record all sentences.
 * Mirrors shadowingenglish.com's "Save your practice" modal.
 */
export default function SavePracticeModal({ isOpen, onClose, onConfirm, isVi }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-center pt-6">
          <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
            <Save className="w-7 h-7 text-amber-600" />
          </div>
        </div>

        <div className="p-6 text-center">
          <h3 className="text-xl font-black text-slate-800 mb-3">
            {isVi ? 'Lưu bài luyện tập' : 'Save your practice'}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            {isVi
              ? 'Mic tự động bật cho mỗi câu và bản ghi sẽ được tải lên sau câu cuối cùng. Link chia sẻ sẽ hiện trong popup hoàn thành.'
              : 'The mic turns on automatically for every sentence and your recordings are uploaded after the last one. A share link will appear in the completion popup.'}
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-700">
            <span className="font-bold">{isVi ? 'Chỉ cần đọc theo' : 'Just read along'}</span>
            {' — '}
            {isVi
              ? 'ghi âm tự động. Link hiện khi câu cuối xong.'
              : 'recording is automatic. The link appears once the last sentence is done.'}
          </div>
        </div>

        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
          >
            {isVi ? 'Hủy' : 'Cancel'}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-md"
          >
            {isVi ? 'Bắt đầu lưu' : 'Got it, start saving'}
          </button>
        </div>
      </div>
    </div>
  );
}
