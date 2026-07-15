/**
 * backfill_meanings.mjs
 *
 * Fill in missing `meaning` (Vietnamese) for 1541 dictionary entries that
 * have no meaning but appear in reading content.
 *
 * Strategy (in order):
 *   1. Scan ALL vocab.js (ADV + Easy, W1-35) → build word→meaning map
 *   2. For each dict entry with no meaning:
 *      a. Try exact match in vocab map
 *      b. Try base form (lemmatize: strip s/es/ies/ing/ed/er/est)
 *      c. Use hardcoded table (common function words + frequent words)
 *   3. Save updated dictionary
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const DICT_PATH = resolve(ROOT, 'src/data/dictionary.json');
const dictionary = JSON.parse(readFileSync(DICT_PATH, 'utf-8'));

console.log('📖 Dictionary loaded:', dictionary.length, 'entries');
const noMeaning = dictionary.filter(e => !e.meaning || !e.meaning.trim());
console.log('   Missing meaning:', noMeaning.length, '\n');

// ─── Step 1: Scan ALL vocab.js files ─────────────────────────────────────────
const vocabMap = {}; // word.toLowerCase() → { meaning, example, pronounce }

const MAX_WEEK = 35;
for (let week = 1; week <= MAX_WEEK; week++) {
  const paths = [
    resolve(ROOT, `src/data/weeks/week_${String(week).padStart(2,'0')}/vocab.js`),
    resolve(ROOT, `src/data/weeks/week_${week}/vocab.js`),
    resolve(ROOT, `src/data/weeks_easy/week_${String(week).padStart(2,'0')}/vocab.js`),
    resolve(ROOT, `src/data/weeks_easy/week_${week}/vocab.js`),
    resolve(ROOT, `src/data/weeks/week_${week}.js`),
  ];
  
  for (const path of paths) {
    if (!existsSync(path)) continue;
    try {
      const mod = await import(pathToFileURL(path).href + `?t=${Date.now()}`);
      const data = mod.default;
      
      // Standard vocab.js: { vocab: [...] }
      const vocabList = data?.vocab || (Array.isArray(data) ? data : []);
      
      for (const item of vocabList) {
        const word = item.word?.toLowerCase();
        if (!word) continue;
        if (!vocabMap[word]) {
          vocabMap[word] = {
            meaning: item.definition_vi || item.meaning || '',
            example: item.example || '',
            pronounce: item.pronunciation || item.pronounce || '',
          };
        }
      }
    } catch (err) {
      // Skip
    }
  }
}

console.log(`📚 Vocab map built: ${Object.keys(vocabMap).length} words from vocab.js files\n`);

// ─── Lemmatizer helper ────────────────────────────────────────────────────────
function lemmatize(word) {
  const w = word.toLowerCase().replace(/['\u2019]s$/, ''); // strip possessive
  const candidates = [w];
  
  if (w.endsWith('ies') && w.length > 4) candidates.push(w.slice(0,-3)+'y');
  if (w.endsWith('ves') && w.length > 4) {
    candidates.push(w.slice(0,-3)+'f', w.slice(0,-3)+'fe');
  }
  if (w.endsWith('es') && w.length > 4) {
    candidates.push(w.slice(0,-2), w.slice(0,-1));
  }
  if (w.endsWith('s') && w.length > 3) candidates.push(w.slice(0,-1));
  if (w.endsWith('ing') && w.length > 5) {
    const s = w.slice(0,-3);
    candidates.push(s, s+'e');
    if (s.length >= 3 && s[s.length-1] === s[s.length-2]) candidates.push(s.slice(0,-1));
  }
  if (w.endsWith('ed') && w.length > 4) {
    const s = w.slice(0,-2);
    candidates.push(s, s+'e');
    if (s.length >= 3 && s[s.length-1] === s[s.length-2]) candidates.push(s.slice(0,-1));
  }
  if (w.endsWith('est') && w.length > 5) {
    candidates.push(w.slice(0,-3), w.slice(0,-4), w.slice(0,-3)+'y');
  }
  if (w.endsWith('er') && w.length > 4) {
    candidates.push(w.slice(0,-2), w.slice(0,-3), w.slice(0,-2)+'y');
  }
  if (w.endsWith('ily') && w.length > 5) candidates.push(w.slice(0,-3)+'y');
  if (w.endsWith('ly') && w.length > 4) candidates.push(w.slice(0,-2));
  
  return [...new Set(candidates)];
}

// ─── Step 2: Hardcoded vocabulary for function words & common words ───────────
// Words that rarely appear in curriculum vocab.js but are in reading texts
const HARDCODED = {
  // Articles / determiners
  'a': 'một', 'an': 'một', 'the': 'từ chỉ định', 'this': 'cái này', 'that': 'cái đó',
  'these': 'những cái này', 'those': 'những cái đó', 'some': 'một số', 'any': 'bất kỳ',
  'all': 'tất cả', 'each': 'mỗi', 'every': 'mỗi', 'both': 'cả hai', 'few': 'ít',
  'many': 'nhiều', 'much': 'nhiều', 'more': 'nhiều hơn', 'most': 'nhiều nhất',
  'other': 'khác', 'another': 'một cái khác', 'own': 'riêng',
  // Pronouns
  'i': 'tôi', 'you': 'bạn', 'he': 'anh ấy', 'she': 'cô ấy', 'it': 'nó',
  'we': 'chúng tôi', 'they': 'họ', 'me': 'tôi', 'him': 'anh ấy', 'her': 'cô ấy',
  'us': 'chúng tôi', 'them': 'họ', 'my': 'của tôi', 'your': 'của bạn',
  'his': 'của anh ấy', 'its': 'của nó', 'our': 'của chúng tôi', 'their': 'của họ',
  'myself': 'bản thân tôi', 'yourself': 'bản thân bạn', 'itself': 'bản thân nó',
  // Be verbs
  'is': 'là, thì', 'are': 'là, thì', 'am': 'là, thì', 'was': 'đã là, đã có',
  'were': 'đã là, đã có', 'be': 'là', 'been': 'đã là', 'being': 'đang là',
  // Have verbs
  'have': 'có', 'has': 'có', 'had': 'đã có', 'having': 'đang có',
  // Do verbs
  'do': 'làm', 'does': 'làm', 'did': 'đã làm', 'done': 'đã làm xong', 'doing': 'đang làm',
  // Common verbs
  'go': 'đi', 'goes': 'đi', 'went': 'đã đi', 'gone': 'đã đi', 'going': 'đang đi',
  'get': 'lấy, nhận được', 'gets': 'lấy', 'got': 'đã lấy', 'getting': 'đang lấy',
  'come': 'đến', 'comes': 'đến', 'came': 'đã đến', 'coming': 'đang đến',
  'give': 'cho', 'gives': 'cho', 'gave': 'đã cho', 'given': 'đã cho',
  'take': 'lấy, mang', 'takes': 'lấy', 'took': 'đã lấy', 'taken': 'đã lấy',
  'make': 'làm, tạo ra', 'makes': 'làm', 'made': 'đã làm', 'making': 'đang làm',
  'know': 'biết', 'knows': 'biết', 'knew': 'đã biết', 'known': 'được biết đến',
  'think': 'nghĩ', 'thinks': 'nghĩ', 'thought': 'đã nghĩ', 'thinking': 'đang nghĩ',
  'see': 'nhìn, thấy', 'sees': 'thấy', 'saw': 'đã thấy', 'seen': 'đã thấy',
  'look': 'nhìn', 'looks': 'nhìn', 'looked': 'đã nhìn', 'looking': 'đang nhìn',
  'want': 'muốn', 'wants': 'muốn', 'wanted': 'đã muốn', 'wanting': 'đang muốn',
  'use': 'dùng, sử dụng', 'uses': 'dùng', 'used': 'đã dùng', 'using': 'đang dùng',
  'find': 'tìm, thấy', 'finds': 'tìm', 'found': 'đã tìm thấy', 'finding': 'đang tìm',
  'tell': 'kể, nói', 'tells': 'nói', 'told': 'đã nói', 'telling': 'đang nói',
  'ask': 'hỏi', 'asks': 'hỏi', 'asked': 'đã hỏi', 'asking': 'đang hỏi',
  'seem': 'có vẻ', 'feel': 'cảm thấy', 'felt': 'đã cảm thấy', 'feeling': 'đang cảm thấy',
  'try': 'thử, cố gắng', 'tries': 'thử', 'tried': 'đã thử', 'trying': 'đang thử',
  'call': 'gọi', 'calls': 'gọi', 'called': 'gọi là, đã gọi', 'calling': 'đang gọi',
  'keep': 'giữ', 'keeps': 'giữ', 'kept': 'đã giữ', 'keeping': 'đang giữ',
  'let': 'để, cho phép', 'lets': 'cho phép', 'letting': 'đang để',
  'put': 'đặt, để', 'puts': 'đặt', 'putting': 'đang đặt',
  'mean': 'có nghĩa là', 'means': 'nghĩa là', 'meant': 'có nghĩa là', 'meaning': 'ý nghĩa',
  'show': 'chỉ, cho thấy', 'shows': 'cho thấy', 'showed': 'đã cho thấy', 'shown': 'đã chỉ ra',
  'leave': 'rời đi, để lại', 'leaves': 'rời đi', 'left': 'đã rời', 'leaving': 'đang rời',
  'hold': 'giữ, cầm', 'holds': 'giữ', 'held': 'đã giữ', 'holding': 'đang cầm',
  'turn': 'quay, rẽ', 'turns': 'quay', 'turned': 'đã quay', 'turning': 'đang quay',
  'start': 'bắt đầu', 'starts': 'bắt đầu', 'started': 'đã bắt đầu', 'starting': 'đang bắt đầu',
  'stop': 'dừng lại', 'stops': 'dừng', 'stopped': 'đã dừng', 'stopping': 'đang dừng',
  'bring': 'mang đến', 'brings': 'mang', 'brought': 'đã mang', 'bringing': 'đang mang',
  'open': 'mở', 'opens': 'mở', 'opened': 'đã mở', 'opening': 'đang mở',
  'close': 'đóng', 'closes': 'đóng', 'closed': 'đã đóng', 'closing': 'đang đóng',
  'watch': 'xem, theo dõi', 'watches': 'xem', 'watched': 'đã xem', 'watching': 'đang xem',
  'walk': 'đi bộ', 'walks': 'đi bộ', 'walked': 'đã đi bộ', 'walking': 'đang đi bộ',
  'run': 'chạy', 'runs': 'chạy', 'ran': 'đã chạy', 'running': 'đang chạy',
  'sit': 'ngồi', 'sits': 'ngồi', 'sat': 'đã ngồi', 'sitting': 'đang ngồi',
  'stand': 'đứng', 'stands': 'đứng', 'stood': 'đã đứng', 'standing': 'đang đứng',
  'write': 'viết', 'writes': 'viết', 'wrote': 'đã viết', 'written': 'đã viết', 'writing': 'đang viết',
  'read': 'đọc', 'reads': 'đọc', 'reading': 'đang đọc',
  'hear': 'nghe', 'hears': 'nghe', 'heard': 'đã nghe', 'hearing': 'đang nghe',
  'eat': 'ăn', 'eats': 'ăn', 'ate': 'đã ăn', 'eaten': 'đã ăn', 'eating': 'đang ăn',
  'sleep': 'ngủ', 'sleeps': 'ngủ', 'slept': 'đã ngủ', 'sleeping': 'đang ngủ',
  'live': 'sống, ở', 'lives': 'sống', 'lived': 'đã sống', 'living': 'đang sống',
  'play': 'chơi', 'plays': 'chơi', 'played': 'đã chơi', 'playing': 'đang chơi',
  'work': 'làm việc', 'works': 'làm việc', 'worked': 'đã làm', 'working': 'đang làm',
  'talk': 'nói chuyện', 'talks': 'nói', 'talked': 'đã nói', 'talking': 'đang nói',
  'help': 'giúp đỡ', 'helps': 'giúp', 'helped': 'đã giúp', 'helping': 'đang giúp',
  'move': 'di chuyển', 'moves': 'di chuyển', 'moved': 'đã di chuyển', 'moving': 'đang di chuyển',
  'love': 'yêu thích', 'loves': 'yêu', 'loved': 'đã yêu', 'loving': 'đang yêu',
  'like': 'thích', 'likes': 'thích', 'liked': 'đã thích', 'liking': 'đang thích',
  // Adverbs / function words
  'there': 'ở đó, có... ở đó', 'here': 'ở đây', 'now': 'bây giờ', 'then': 'sau đó, lúc đó',
  'when': 'khi nào, khi', 'where': 'ở đâu, nơi', 'how': 'như thế nào', 'why': 'tại sao',
  'what': 'cái gì', 'which': 'cái nào', 'who': 'ai', 'whom': 'ai (tân ngữ)',
  'too': 'cũng, quá', 'also': 'cũng, ngoài ra', 'just': 'chỉ, vừa', 'even': 'thậm chí',
  'still': 'vẫn còn', 'already': 'rồi, đã', 'yet': 'chưa, vẫn', 'soon': 'sớm',
  'always': 'luôn luôn', 'never': 'không bao giờ', 'often': 'thường xuyên',
  'sometimes': 'đôi khi', 'usually': 'thường', 'again': 'lại, một lần nữa',
  'back': 'quay lại, phía sau', 'away': 'đi, ra xa', 'out': 'ra ngoài', 'up': 'lên',
  'down': 'xuống', 'off': 'ra ngoài, tắt', 'together': 'cùng nhau',
  'around': 'xung quanh', 'inside': 'bên trong', 'outside': 'bên ngoài',
  'very': 'rất', 'quite': 'khá, cũng', 'really': 'thực sự', 'so': 'rất, vậy',
  'too': 'cũng, quá', 'enough': 'đủ', 'almost': 'gần như', 'only': 'chỉ',
  'about': 'về, khoảng', 'over': 'trên, hơn', 'under': 'dưới', 'through': 'qua',
  'before': 'trước', 'after': 'sau', 'during': 'trong khi, trong suốt',
  'until': 'cho đến khi', 'while': 'trong khi', 'since': 'từ khi, vì',
  'for': 'cho, vì', 'with': 'với', 'from': 'từ', 'into': 'vào trong',
  'onto': 'lên trên', 'upon': 'trên', 'toward': 'về phía', 'towards': 'về phía',
  'across': 'băng qua', 'along': 'dọc theo', 'near': 'gần', 'beside': 'bên cạnh',
  'between': 'giữa', 'among': 'trong số', 'behind': 'phía sau', 'beyond': 'ngoài',
  'above': 'trên, ở trên', 'below': 'dưới, ở dưới', 'next': 'tiếp theo, bên cạnh',
  // Conjunctions
  'and': 'và', 'or': 'hoặc', 'but': 'nhưng', 'if': 'nếu', 'because': 'vì, bởi vì',
  'so': 'vì vậy', 'that': 'rằng, cái đó', 'as': 'như, khi', 'than': 'hơn',
  'whether': 'dù, liệu có', 'though': 'mặc dù', 'although': 'mặc dù',
  // Common adjectives
  'good': 'tốt', 'great': 'tuyệt vời', 'big': 'to, lớn', 'small': 'nhỏ',
  'old': 'cũ, già', 'new': 'mới', 'young': 'trẻ', 'long': 'dài', 'little': 'nhỏ, ít',
  'right': 'đúng, bên phải', 'wrong': 'sai', 'same': 'giống nhau', 'different': 'khác',
  'next': 'tiếp theo', 'last': 'cuối cùng, trước đây', 'first': 'đầu tiên',
  'own': 'riêng của mình', 'sure': 'chắc chắn', 'free': 'tự do, miễn phí',
  'easy': 'dễ', 'hard': 'khó, cứng', 'important': 'quan trọng', 'open': 'mở',
  'special': 'đặc biệt', 'full': 'đầy', 'early': 'sớm', 'late': 'muộn, trễ',
  'high': 'cao', 'low': 'thấp', 'fast': 'nhanh', 'slow': 'chậm', 'short': 'ngắn',
  'wide': 'rộng', 'deep': 'sâu', 'far': 'xa', 'close': 'gần, đóng',
  'hot': 'nóng', 'cold': 'lạnh', 'warm': 'ấm', 'cool': 'mát, hay',
  'busy': 'bận rộn', 'ready': 'sẵn sàng', 'sure': 'chắc chắn', 'real': 'thật',
  'true': 'thật, đúng', 'false': 'sai, giả', 'fine': 'tốt, ổn', 'nice': 'đẹp, tốt',
  'clean': 'sạch', 'clear': 'rõ ràng', 'safe': 'an toàn', 'smart': 'thông minh',
  'brave': 'dũng cảm', 'kind': 'tốt bụng', 'quiet': 'yên tĩnh', 'loud': 'to tiếng',
  'funny': 'buồn cười', 'sad': 'buồn', 'angry': 'tức giận', 'afraid': 'sợ hãi',
  'tired': 'mệt mỏi', 'sick': 'bệnh', 'well': 'khỏe, tốt',
  // Time words
  'today': 'hôm nay', 'yesterday': 'hôm qua', 'tomorrow': 'ngày mai', 
  'morning': 'buổi sáng', 'afternoon': 'buổi chiều', 'evening': 'buổi tối',
  'night': 'ban đêm', 'day': 'ngày', 'week': 'tuần', 'month': 'tháng', 'year': 'năm',
  'hour': 'giờ', 'minute': 'phút', 'second': 'giây, thứ hai',
  'monday': 'thứ Hai', 'tuesday': 'thứ Ba', 'wednesday': 'thứ Tư',
  'thursday': 'thứ Năm', 'friday': 'thứ Sáu', 'saturday': 'thứ Bảy', 'sunday': 'Chủ nhật',
  // Common nouns
  'row': 'hàng, dãy', 'rows': 'các hàng', 'line': 'đường thẳng, hàng',
  'class': 'lớp học', 'school': 'trường học', 'home': 'nhà', 'room': 'phòng',
  'door': 'cửa', 'window': 'cửa sổ', 'floor': 'sàn', 'wall': 'tường', 'roof': 'mái nhà',
  'table': 'bàn', 'chair': 'ghế', 'box': 'hộp', 'book': 'sách', 'page': 'trang',
  'word': 'từ', 'name': 'tên', 'part': 'phần', 'place': 'địa điểm',
  'world': 'thế giới', 'city': 'thành phố', 'country': 'quốc gia, nông thôn',
  'street': 'đường phố', 'house': 'ngôi nhà', 'garden': 'khu vườn', 'park': 'công viên',
  'answer': 'câu trả lời', 'question': 'câu hỏi', 'story': 'câu chuyện', 'idea': 'ý tưởng',
  'problem': 'vấn đề', 'reason': 'lý do', 'way': 'cách, đường', 'side': 'phía',
  'number': 'số', 'things': 'đồ vật, mọi thứ', 'thing': 'đồ vật, điều',
  'people': 'mọi người', 'person': 'người', 'man': 'đàn ông', 'woman': 'phụ nữ',
  'boy': 'bé trai', 'girl': 'bé gái', 'child': 'đứa trẻ', 'children': 'trẻ em',
  'baby': 'em bé', 'parent': 'bố mẹ', 'mother': 'mẹ', 'father': 'bố',
  'sister': 'chị/em gái', 'brother': 'anh/em trai', 'friend': 'bạn bè',
  'teacher': 'giáo viên', 'student': 'học sinh',
  'hand': 'bàn tay', 'eye': 'mắt', 'head': 'đầu', 'face': 'khuôn mặt',
  'mouth': 'miệng', 'ear': 'tai', 'nose': 'mũi', 'arm': 'tay, cánh tay',
  'leg': 'chân', 'foot': 'bàn chân', 'body': 'cơ thể',
  'dog': 'chó', 'cat': 'mèo', 'bird': 'chim', 'fish': 'cá', 'animal': 'động vật',
  'tree': 'cây', 'flower': 'hoa', 'grass': 'cỏ', 'water': 'nước', 'food': 'thức ăn',
  'air': 'không khí', 'sky': 'bầu trời', 'sun': 'mặt trời', 'moon': 'mặt trăng',
  'star': 'ngôi sao', 'cloud': 'đám mây', 'rain': 'mưa',
  // Colors
  'red': 'màu đỏ', 'blue': 'màu xanh dương', 'green': 'màu xanh lá',
  'yellow': 'màu vàng', 'white': 'màu trắng', 'black': 'màu đen', 'brown': 'màu nâu',
  'pink': 'màu hồng', 'orange': 'màu cam, quả cam', 'purple': 'màu tím',
  // Numbers
  'one': 'một', 'two': 'hai', 'three': 'ba', 'four': 'bốn', 'five': 'năm',
  'ten': 'mười', 'hundred': 'trăm', 'thousand': 'nghìn',
  // Extras
  'oh': 'ồ, ôi', 'yes': 'có, vâng', 'no': 'không', 'ok': 'được', 'wow': 'ồ, ôi',
  'hello': 'xin chào', 'hi': 'chào', 'bye': 'tạm biệt', 'please': 'xin, làm ơn',
  'thank': 'cảm ơn', 'thanks': 'cảm ơn', 'sorry': 'xin lỗi', 'excuse': 'xin lỗi',
};

// ─── Step 3: Update dictionary entries ────────────────────────────────────────
let fromVocab = 0;
let fromLemma = 0;
let fromHardcoded = 0;
let stillMissing = 0;

for (const entry of dictionary) {
  if (entry.meaning && entry.meaning.trim()) continue; // Already has meaning
  
  const word = entry.word.toLowerCase();
  
  // Try vocab map (exact)
  if (vocabMap[word]?.meaning) {
    entry.meaning = vocabMap[word].meaning;
    if (!entry.pronounce && vocabMap[word].pronounce) entry.pronounce = vocabMap[word].pronounce;
    fromVocab++;
    continue;
  }
  
  // Try vocab map (base forms)
  const bases = lemmatize(word);
  let found = false;
  for (const base of bases) {
    if (base !== word && vocabMap[base]?.meaning) {
      entry.meaning = vocabMap[base].meaning;
      found = true;
      fromLemma++;
      break;
    }
  }
  if (found) continue;
  
  // Try hardcoded
  if (HARDCODED[word]) {
    entry.meaning = HARDCODED[word];
    fromHardcoded++;
    continue;
  }
  
  // Try hardcoded with base forms
  for (const base of bases) {
    if (base !== word && HARDCODED[base]) {
      entry.meaning = HARDCODED[base];
      fromHardcoded++;
      found = true;
      break;
    }
  }
  if (found) continue;
  
  stillMissing++;
}

console.log('✅ Result:');
console.log('   From vocab.js (exact):', fromVocab);
console.log('   From vocab.js (lemma):', fromLemma);
console.log('   From hardcoded list:', fromHardcoded);
console.log('   Still missing:', stillMissing, '\n');

// Show remaining missing
if (stillMissing > 0) {
  console.log('Still missing (first 50):');
  dictionary
    .filter(e => !e.meaning || !e.meaning.trim())
    .slice(0, 50)
    .forEach(e => console.log('  -', e.word));
}

// Save
writeFileSync(DICT_PATH, JSON.stringify(dictionary, null, 2), 'utf-8');
const size = (readFileSync(DICT_PATH).length / 1024).toFixed(1);
console.log(`\n💾 Saved: ${dictionary.length} entries, ${size} KB`);
