import { readFileSync, writeFileSync } from 'fs';

const dict = JSON.parse(readFileSync('src/data/dictionary.json', 'utf8'));

const fixes = {
  answers: { meaning: 'trả lời', example: 'She answers all the questions correctly.' },
  anything: { meaning: 'bất cứ thứ gì', example: 'Did you see anything in the forest?' },
  arrives: { meaning: 'đến nơi', example: 'Luna arrives at the forest path.' },
  asking: { meaning: 'hỏi', example: 'She is asking her dad about the birds.' },
  community: { meaning: 'cộng đồng', example: 'Our community planted trees in the park.' },
  confidence: { meaning: 'sự tự tin', example: 'She spoke with confidence in class.' },
  copies: { meaning: 'sao chép', example: 'He copies the sentence into his notebook.' },
  describes: { meaning: 'mô tả', example: 'She describes the forest walk in her essay.' },
  further: { meaning: 'xa hơn', example: 'The waterfall was further down the path.' },
  including: { meaning: 'bao gồm', example: 'She used all her senses, including smell.' },
  messages: { meaning: 'tin nhắn', example: 'She sends messages to her friends.' },
  neighbors: { meaning: 'hàng xóm', example: 'Our neighbors have a big garden.' },
  object: { meaning: 'vật thể / đồ vật', example: 'She felt a strange object under the leaves.' },
  planned: { meaning: 'đã lên kế hoạch', example: 'They planned the forest walk together.' },
  reads: { meaning: 'đọc', example: 'She reads about the five senses.' },
  really: { meaning: 'thật sự', example: 'The forest was really beautiful.' },
  relaxes: { meaning: 'thư giãn', example: 'She relaxes after the long walk.' },
  safely: { meaning: 'một cách an toàn', example: 'They walked safely through the forest.' },
  sketching: { meaning: 'phác thảo', example: 'She is sketching the bird she saw.' },
  talks: { meaning: 'nói chuyện', example: 'She talks about the forest with her dad.' },
  trying: { meaning: 'đang cố gắng', example: 'She is trying to hear a bird sing.' },
  unusual: { meaning: 'không bình thường', example: 'That was an unusual sound in the forest.' },
  values: { meaning: 'giá trị', example: 'Our school values kindness and respect.' }
};

let updated = 0;
for (const entry of dict) {
  if (fixes[entry.word]) {
    if (!entry.meaning || entry.meaning === '') { entry.meaning = fixes[entry.word].meaning; updated++; }
    if (!entry.example || entry.example === '') { entry.example = fixes[entry.word].example; updated++; }
  }
}

writeFileSync('src/data/dictionary.json', JSON.stringify(dict, null, 2));
console.log('Updated', updated, 'fields');
