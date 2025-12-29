import React, { useState, useEffect, useRef } from 'react';
import { Volume2, X, Book, Image as ImageIcon, BookOpen } from 'lucide-react';

const FloatingDictionary = () => {
  const [selection, setSelection] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dictionary, setDictionary] = useState({});
  const popupRef = useRef(null);

  // 1. Load dữ liệu từ điển toàn cục khi App khởi chạy
  useEffect(() => {
    fetch('/dictionary.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
          console.log("Dictionary loaded:", Object.keys(data).length, "words");
          setDictionary(data);
      })
      .catch(err => {
        console.warn("Dictionary not available, continuing without it:", err.message);
        setDictionary({});
      });
  }, []);

  // 2. Lắng nghe sự kiện bôi đen (Mouse Up)
  useEffect(() => {
    const handleMouseUp = () => {
      const selectedText = window.getSelection().toString().trim();
      
      // Chỉ tra cứu nếu từ không quá dài và không quá ngắn
      if (selectedText && selectedText.length > 1 && selectedText.length < 30 && selectedText.split(' ').length < 4) {
        // Làm sạch từ (bỏ dấu câu)
        const cleanWord = selectedText.toLowerCase().replace(/[^a-z0-9 ]/g, '');
        
        // Tra cứu trong từ điển (Ưu tiên khớp chính xác)
        // Nếu không thấy thì vẫn hiện Popup nhưng không có nghĩa tiếng Việt (để tra Google/Cambridge)
        const definition = dictionary[cleanWord];

        const range = window.getSelection().getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // Tính vị trí hiện Popup (ngay trên đầu từ được chọn)
        setPosition({ 
          x: rect.left + (rect.width / 2), 
          y: rect.top + window.scrollY - 10 
        });
        
        setSelection({ 
            word: selectedText, // Giữ nguyên chữ hoa/thường để hiển thị đẹp
            cleanWord: cleanWord,
            definition: definition || "Tra cứu thêm bên dưới..." // Fallback text
        });
      }
    };

    // Ẩn Popup khi click ra ngoài
    const handleMouseDown = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
            setSelection(null);
            window.getSelection().removeAllRanges(); // Bỏ bôi đen luôn cho gọn
        }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [dictionary]);

  // 3. Hàm đọc (TTS) - Dùng Web Speech API chuẩn trình duyệt
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Ngắt câu cũ nếu đang đọc dở
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // Giọng Anh-Mỹ
      utterance.rate = 0.9; // Tốc độ vừa phải cho trẻ em
      // Cố gắng chọn giọng nữ dễ nghe nếu có
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Samantha"));
      if (preferredVoice) utterance.voice = preferredVoice;
      
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Browser does not support TTS");
    }
  };

  if (!selection) return null;

  // Link tra cứu ngoài
  const cambridgeUrl = `https://dictionary.cambridge.org/dictionary/english-vietnamese/${selection.cleanWord}`;
  const labanUrl = `https://dict.laban.vn/find?type=1&query=${selection.cleanWord}`;
  const googleImagesUrl = `https://www.google.com/search?tbm=isch&q=${selection.cleanWord}`;

  return (
    <div 
      ref={popupRef}
      className="fixed z-[9999] bg-white rounded-xl shadow-2xl border border-indigo-100 p-4 flex flex-col gap-3 min-w-[280px] animate-in zoom-in-95 duration-200"
      style={{ top: position.y, left: position.x, transform: 'translate(-50%, -100%)', marginTop: '-12px' }}
    >
      {/* Mũi tên chỉ xuống */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-indigo-100 rotate-45"></div>

      {/* Header: Từ vựng + Loa */}
      <div className="flex justify-between items-start">
        <div>
            <h4 className="text-xl font-black text-indigo-700 capitalize">{selection.word}</h4>
            <p className="text-sm text-slate-600 font-medium mt-1">{selection.definition}</p>
        </div>
        <div className="flex gap-1">
            <button 
                onClick={() => speak(selection.word)}
                className="p-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-90"
                title="Nghe phát âm"
            >
                <Volume2 size={20} />
            </button>
            <button onClick={() => setSelection(null)} className="p-2 text-slate-300 hover:text-rose-500"><X size={18}/></button>
        </div>
      </div>
      
      <div className="h-[1px] bg-slate-100 w-full"></div>

      {/* Footer: Tra cứu thêm */}
      <div className="flex flex-col gap-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tra cứu chi tiết:</p>
          <div className="grid grid-cols-2 gap-2">
              <a href={cambridgeUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm">
                  <BookOpen size={14}/> Cambridge
              </a>
              <a href={googleImagesUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-bold transition-colors shadow-sm">
                  <ImageIcon size={14}/> Hình ảnh
              </a>
          </div>
          <a href={labanUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-1.5 text-[10px] font-bold text-slate-400 hover:text-indigo-500 transition-colors">
              <Book size={12}/> Tra thêm trên Laban.vn
          </a>
      </div>
    </div>
  );
};

export default FloatingDictionary;
