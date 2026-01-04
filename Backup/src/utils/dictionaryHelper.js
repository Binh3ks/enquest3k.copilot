import dictionaryBase from '../data/dictionary.json';

// Hàm chuẩn hóa để so sánh (bỏ dấu, lowercase)
const normalize = (str) => str.toLowerCase().trim().replace(/[.,!?;:"'’]/g, '');

export const getSmartDictionary = (weekData) => {
  // Nếu dictionaryBase không phải mảng (phòng lỗi), gán mảng rỗng
  let combinedDict = Array.isArray(dictionaryBase) ? [...dictionaryBase] : [];

  // Nếu có dữ liệu tuần học, tự động trích xuất từ vựng để thêm vào
  if (weekData) {
      // 1. Lấy từ New Words (Vocab)
      if (weekData.stations?.new_words?.vocab) {
          const vocabList = weekData.stations.new_words.vocab.map(v => ({
              word: v.word,
              type: "vocab", 
              meaning: v.definition_vi, 
              meaning_en: v.definition_en,
              pronounce: v.pronunciation,
              example: v.example
          }));
          combinedDict = [...combinedDict, ...vocabList];
      }

      // 2. Lấy từ Word Power (Academic)
      if (weekData.stations?.word_power?.words) {
          const powerList = weekData.stations.word_power.words.map(w => ({
              word: w.word,
              type: "academic",
              meaning: w.definition_en, // Word Power thường dùng nghĩa Anh-Anh
              pronounce: w.pronunciation,
              example: w.example || w.model_sentence
          }));
          combinedDict = [...combinedDict, ...powerList];
      }
  }

  // Khử trùng lặp (ưu tiên từ mới nhất)
  const uniqueDict = [];
  const map = new Map();
  
  // Duyệt ngược để lấy cái mới nhất (từ tuần học) đè lên cái cũ
  for (const item of combinedDict.reverse()) {
      if (item && item.word && !map.has(normalize(item.word))) {
          map.set(normalize(item.word), true);
          uniqueDict.push(item);
      }
  }
  
  return uniqueDict.reverse();
};
