/**
 * DEBUG AUDIO - Kiểm tra cấu trúc vocab trong GameHub
 * 
 * Nếu audio_word undefined, có 2 khả năng:
 * 1. dataHooks không inject nó → mapVocab có lỗi
 * 2. GameHub lấy vocab từ địa điểm sai (không phải từ stations.new_words.vocab)
 */

// Thêm vào đầu GameHub.jsx, trong component:
// useEffect(() => {
//   if (vocabList.length > 0) {
//     console.log('[GameHub] Full vocab structure:', vocabList[0]);
//     console.log('[GameHub] Has audio_word?', vocabList[0].audio_word);
//     console.log('[GameHub] Expected path:', `/audio/week20_easy/vocab_${vocabList[0].word.replace(/\s+/g, '_').toLowerCase()}.mp3`);
//   }
// }, [vocabList]);

// Nếu audio_word hiện nhưng 404, có thể là:
// - File không tồn tại: check /public/audio/week20_easy/
// - Mode sai: Check localStorage.getItem('engquest_content_mode')

// Giải pháp nếu audio_word undefined:
// - Option 1: Tạo fallback - nếu audio_word undefined, tạo path bằng tay:
//   const audioUrl = currentWord.audio_word || `/audio/week${weekId}_easy/vocab_${currentWord.word.replace(/\s+/g, '_').toLowerCase()}.mp3`;
// 
// - Option 2: Kiểm tra xem GameHub nhận đúng data chứa audio_word hay không
//   (Kiểm tra xem data.global_vocab có = data.stations.new_words.vocab không)
