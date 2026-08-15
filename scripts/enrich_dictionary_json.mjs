import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const dictPath = path.join(rootDir, 'src/data/dictionary.json');

const dictionaryData = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

const existingWords = new Set(dictionaryData.map(e => (e.word || '').toLowerCase().trim()));

const newEntries = [
  { word: "trained", pronounce: "/treɪnd/", meaning: "đã được đào tạo / huấn luyện chuyên môn", example: "The school nurse is a trained medical professional.", type: "Adjective" },
  { word: "soft", pronounce: "/sɔːft/", meaning: "mềm mại / êm ái", example: "Use a soft cloth to clean the wound gently.", type: "Adjective" },
  { word: "piece", pronounce: "/piːs/", meaning: "mảnh / miếng / mẩu", example: "She placed a clean piece of bandage on his knee.", type: "Noun" },
  { word: "cloth", pronounce: "/klɔːθ/", meaning: "khăn vải / vải y tế", example: "The nurse wiped the cut with a clean cloth.", type: "Noun" },
  { word: "protect", pronounce: "/prəˈtekt/", meaning: "bảo vệ / che chắn", example: "Wear a bandage to protect the injury from dirt.", type: "Verb" },
  { word: "person", pronounce: "/ˈpɜːrsn/", meaning: "người / cá nhân", example: "Jake is a very responsible person.", type: "Noun" },
  { word: "charge", pronounce: "/tʃɑːrdʒ/", meaning: "phụ trách / quản lý (in charge)", example: "The headmaster is in charge of school safety.", type: "Noun" },
  { word: "managing", pronounce: "/ˈmænɪdʒɪŋ/", meaning: "quản lý / điều hành", example: "She is good at managing first aid supplies.", type: "Verb" },
  { word: "quiet", pronounce: "/ˈkwaɪət/", meaning: "yên tĩnh / lặng lẽ", example: "Please stay quiet in the school corridor.", type: "Adjective" },
  { word: "liquid", pronounce: "/ˈlɪkwɪd/", meaning: "chất lỏng / dung dịch", example: "Wipe up any spilled liquid on the floor immediately.", type: "Noun" },
  { word: "janitor", pronounce: "/ˈdʒænɪtər/", meaning: "người lao công / nhân viên vệ sinh trường học", example: "The janitor put up a yellow warning sign.", type: "Noun" },
  { word: "sterile", pronounce: "/ˈsterəl/", meaning: "vô trùng / tiệt trùng y tế", example: "Always use sterile gauze on open wounds.", type: "Adjective" },
  { word: "swelling", pronounce: "/ˈswelɪŋ/", meaning: "sự sưng tấy / sưng đau", example: "Apply a cold pack to reduce swelling.", type: "Noun" },
  { word: "hazard", pronounce: "/ˈhæzərd/", meaning: "mối nguy hiểm / rủi ro", example: "A wet floor is a dangerous safety hazard.", type: "Noun" },
  { word: "attentively", pronounce: "/əˈtentɪvli/", meaning: "một cách chăm chú / chú ý", example: "Students listened attentively to the safety instructions.", type: "Adverb" },
  { word: "praised", pronounce: "/preɪzd/", meaning: "được khen ngợi / tuyên dương", example: "Jake was praised by the principal for his quick action.", type: "Verb" },
  { word: "assembly", pronounce: "/əˈsembli/", meaning: "buổi chào cờ / tập trung toàn trường", example: "The principal announced the reward during Monday assembly.", type: "Noun" },
  { word: "responsibly", pronounce: "/rɪˈspɑːnsəbli/", meaning: "một cách có trách nhiệm", example: "Jake acted responsibly by calling the nurse immediately.", type: "Adverb" },
  { word: "puddle", pronounce: "/ˈpʌdl/", meaning: "vũng nước nhỏ trên sàn / đường", example: "Tom slipped on a water puddle in the corridor.", type: "Noun" },
  { word: "tiles", pronounce: "/taɪlz/", meaning: "gạch lát sàn / nền nhà", example: "The wet floor tiles were slippery.", type: "Noun" },
  { word: "hallway", pronounce: "/ˈhɔːlweɪ/", meaning: "hành lang trường học", example: "Do not run in the school hallway.", type: "Noun" },
  { word: "hallways", pronounce: "/ˈhɔːlweɪz/", meaning: "các hành lang trường học", example: "Keep all hallways clear of obstacles.", type: "Noun" },
  { word: "scraped", pronounce: "/skreɪpt/", meaning: "bị trầy xước nhẹ", example: "He scraped his knee when he fell down.", type: "Verb" },
  { word: "badly", pronounce: "/ˈbædli/", meaning: "mặt xấu / nghiêm trọng / bị thương nặng", example: "Luckily, his leg was not injured badly.", type: "Adverb" },
  { word: "suddenly", pronounce: "/ˈsʌdənli/", meaning: "bất ngờ / đột ngột", example: "Suddenly, a boy ran past the classroom door.", type: "Adverb" },
  { word: "immediately", pronounce: "/ɪˈmiːdiətli/", meaning: "ngay lập tức / tức thì", example: "Call the nurse immediately when someone gets hurt.", type: "Adverb" },
  { word: "gently", pronounce: "/ˈdʒentli/", meaning: "một cách nhẹ nhàng / êm ái", example: "The nurse gently cleaned the cut on his leg.", type: "Adverb" },
  { word: "praise", pronounce: "/preɪz/", meaning: "khen ngợi / tuyên dương", example: "Teachers praise students who follow safety rules.", type: "Verb" },
  { word: "reward", pronounce: "/rɪˈwɔːrd/", meaning: "phần thưởng / tuyên dương", example: "Jake received a safety badge as a reward.", type: "Noun" }
];

let added = 0;
newEntries.forEach(item => {
  const wLower = item.word.toLowerCase().trim();
  if (!existingWords.has(wLower)) {
    dictionaryData.push(item);
    existingWords.add(wLower);
    added++;
  }
});

fs.writeFileSync(dictPath, JSON.stringify(dictionaryData, null, 2), 'utf8');
console.log(`Successfully added ${added} new ESL entries to dictionary.json! Total items: ${dictionaryData.length}`);
