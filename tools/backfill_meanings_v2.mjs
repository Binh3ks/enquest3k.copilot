/**
 * backfill_meanings_v2.mjs
 *
 * Comprehensive Vietnamese meanings for all content words.
 * Strategy:
 *   1. Load vocab.js meanings
 *   2. Look up in mega Vietnamese translation table (base forms)
 *   3. Apply lemmatizer so "acts"→"act", "running"→"run" etc. all resolve
 *   4. Skip proper nouns (names)
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const DICT_PATH = resolve(ROOT, 'src/data/dictionary.json');
const dictionary = JSON.parse(readFileSync(DICT_PATH, 'utf-8'));

// ─── Lemmatizer ────────────────────────────────────────────────────────────────
function lemmatize(word) {
  const w = word.toLowerCase().replace(/['\u2019]s$/, '');
  const c = [w];
  if (w.endsWith('ies') && w.length > 4) c.push(w.slice(0,-3)+'y');
  if (w.endsWith('ves') && w.length > 4) { c.push(w.slice(0,-3)+'f', w.slice(0,-3)+'fe'); }
  if (w.endsWith('es') && w.length > 4) { c.push(w.slice(0,-2), w.slice(0,-1)); }
  if (w.endsWith('s') && w.length > 3) c.push(w.slice(0,-1));
  if (w.endsWith('ing') && w.length > 5) {
    const s = w.slice(0,-3);
    c.push(s, s+'e');
    if (s.length >= 3 && s[s.length-1] === s[s.length-2]) c.push(s.slice(0,-1));
  }
  if (w.endsWith('ed') && w.length > 4) {
    const s = w.slice(0,-2);
    c.push(s, s+'e');
    if (s.length >= 3 && s[s.length-1] === s[s.length-2]) c.push(s.slice(0,-1));
  }
  if (w.endsWith('est') && w.length > 5) { c.push(w.slice(0,-3), w.slice(0,-4), w.slice(0,-3)+'y'); }
  if (w.endsWith('er') && w.length > 4)  { c.push(w.slice(0,-2), w.slice(0,-3), w.slice(0,-2)+'y'); }
  if (w.endsWith('ily') && w.length > 5) c.push(w.slice(0,-3)+'y');
  if (w.endsWith('ly') && w.length > 4)  c.push(w.slice(0,-2));
  return [...new Set(c)];
}

// ─── Comprehensive English→Vietnamese dictionary ────────────────────────────
// KEY: base form (lemma). Inflected forms resolved by lemmatizer.
const MEGA_DICT = {
  // A
  'a': 'một', 'abandon': 'từ bỏ', 'ability': 'khả năng', 'able': 'có khả năng',
  'about': 'về, khoảng', 'above': 'trên, ở trên', 'absorb': 'hấp thụ', 'act': 'hành động, diễn',
  'action': 'hành động', 'activity': 'hoạt động', 'actually': 'thực ra', 'add': 'thêm, cộng',
  'adult': 'người lớn', 'aeroplane': 'máy bay', 'affect': 'ảnh hưởng đến',
  'africa': 'châu Phi', 'after': 'sau', 'age': 'tuổi, thời đại', 'ago': 'trước đây',
  'agree': 'đồng ý', 'ahead': 'phía trước, tiến lên', 'air': 'không khí',
  'alive': 'còn sống', 'all': 'tất cả', 'allow': 'cho phép', 'almost': 'gần như',
  'alone': 'một mình', 'along': 'dọc theo', 'already': 'đã, rồi',
  'also': 'cũng, ngoài ra', 'always': 'luôn luôn', 'amaze': 'kinh ngạc, làm ngạc nhiên',
  'amazing': 'tuyệt vời, kinh ngạc', 'america': 'nước Mỹ, châu Mỹ',
  'amount': 'số lượng', 'ancestor': 'tổ tiên', 'ancient': 'cổ đại, xưa',
  'anger': 'tức giận', 'angry': 'tức giận', 'animal': 'động vật',
  'anymore': 'không còn nữa', 'anyone': 'bất kỳ ai', 'anything': 'bất cứ điều gì',
  'anywhere': 'bất cứ nơi nào', 'apartment': 'căn hộ', 'appear': 'xuất hiện',
  'apple': 'quả táo', 'appropriate': 'phù hợp', 'arrange': 'sắp xếp',
  'arrive': 'đến nơi', 'art': 'nghệ thuật', 'artist': 'nghệ sĩ', 'asia': 'châu Á',
  'asleep': 'đang ngủ', 'astronaut': 'phi hành gia', 'athlete': 'vận động viên',
  'author': 'tác giả',
  // B
  'back': 'phía sau, quay lại', 'balanced': 'cân bằng', 'banana': 'quả chuối',
  'bang': 'tiếng nổ, đập mạnh', 'bark': 'sủa, vỏ cây', 'bean': 'đậu',
  'beat': 'đập, đánh bại', 'become': 'trở thành', 'begin': 'bắt đầu',
  'beginning': 'sự bắt đầu, ban đầu', 'belong': 'thuộc về', 'bench': 'ghế dài',
  'best': 'tốt nhất', 'better': 'tốt hơn', 'bike': 'xe đạp', 'biscuit': 'bánh quy',
  'bite': 'cắn', 'blood': 'máu', 'bloom': 'nở hoa', 'blossom': 'hoa mùa xuân',
  'blow': 'thổi', 'bone': 'xương', 'border': 'biên giới', 'botanic': 'thực vật học',
  'bottle': 'chai', 'bottom': 'đáy, phía dưới', 'bounce': 'nảy', 'bow': 'cúi đầu',
  'brain': 'não bộ', 'brazil': 'nước Brazil', 'break': 'nghỉ, bẻ gãy', 'breeze': 'gió nhẹ',
  'bright': 'sáng, thông minh', 'brilliantly': 'xuất sắc', 'brilliant': 'xuất sắc, tuyệt vời',
  'broadcast': 'phát sóng', 'bubble': 'bong bóng', 'build': 'xây dựng',
  'bumpy': 'gồ ghề', 'butterfly': 'con bướm',
  // C
  'calcium': 'canxi', 'calligraphy': 'nghệ thuật thư pháp', 'cannot': 'không thể',
  'canvas': 'vải bố, tranh vẽ', 'capable': 'có khả năng', 'carbohydrate': 'tinh bột, chất bột đường',
  'card': 'thẻ, bưu thiếp', 'care': 'chăm sóc, quan tâm', 'careful': 'cẩn thận',
  'carry': 'mang, vận chuyển', 'carrot': 'cà rốt', 'cartoon': 'phim hoạt hình',
  'cart': 'xe đẩy', 'cave': 'hang động', 'celebrate': 'kỷ niệm, tổ chức',
  'center': 'trung tâm', 'central': 'trung tâm', 'cereal': 'ngũ cốc',
  'chain': 'chuỗi, dây xích', 'challenge': 'thử thách', 'champion': 'nhà vô địch',
  'change': 'thay đổi', 'chase': 'đuổi theo', 'check': 'kiểm tra',
  'cheese': 'phô mai', 'chemical': 'chất hóa học', 'cherry': 'quả anh đào',
  'chimpanzee': 'tinh tinh', 'choice': 'sự lựa chọn', 'choose': 'lựa chọn',
  'chore': 'việc nhà', 'circle': 'vòng tròn', 'clap': 'vỗ tay',
  'classical': 'cổ điển', 'classmate': 'bạn cùng lớp', 'clothes': 'quần áo',
  'code': 'mã, lập trình', 'coin': 'đồng tiền xu', 'collect': 'thu thập, sưu tầm',
  'color': 'màu sắc', 'colorful': 'đầy màu sắc', 'comfortable': 'thoải mái',
  'comic': 'truyện tranh', 'communicate': 'giao tiếp', 'communication': 'giao tiếp',
  'compare': 'so sánh', 'complete': 'hoàn thành, đầy đủ', 'composition': 'bài luận, tác phẩm',
  'concert': 'buổi hòa nhạc', 'condition': 'điều kiện', 'conduct': 'thực hiện, chỉ huy',
  'confuse': 'nhầm lẫn', 'connect': 'kết nối', 'connection': 'kết nối, liên kết',
  'contact': 'liên lạc', 'contain': 'chứa đựng', 'continue': 'tiếp tục',
  'cookie': 'bánh quy', 'corner': 'góc', 'correct': 'đúng, sửa',
  'count': 'đếm', 'course': 'môn học, tất nhiên', 'court': 'sân, tòa án',
  'cover': 'bao phủ, bìa sách', 'cozy': 'ấm cúng', 'crack': 'vết nứt, nổ',
  'crash': 'va chạm, sụp đổ', 'create': 'sáng tạo, tạo ra', 'creative': 'sáng tạo',
  'crime': 'tội phạm', 'criminal': 'tội phạm', 'cross': 'băng qua, tức giận',
  'crowd': 'đám đông', 'crusty': 'vỏ cứng, giòn', 'crystal': 'tinh thể',
  'culture': 'văn hóa', 'curtain': 'rèm cửa', 'curve': 'đường cong',
  'cycle': 'chu kỳ, đạp xe',
  // D
  'dad': 'bố', 'daily': 'hàng ngày', 'dairy': 'sản phẩm sữa', 'dangerous': 'nguy hiểm',
  'dark': 'tối, màu tối', 'data': 'dữ liệu', 'decide': 'quyết định',
  'deep': 'sâu', 'depend': 'phụ thuộc vào', 'depict': 'miêu tả, mô tả',
  'design': 'thiết kế', 'detail': 'chi tiết', 'develop': 'phát triển',
  'diary': 'nhật ký', 'different': 'khác nhau', 'difficult': 'khó khăn',
  'digestive': 'tiêu hóa', 'digest': 'tiêu hóa', 'dip': 'nhúng, chấm',
  'direct': 'trực tiếp, hướng dẫn', 'dirt': 'đất bẩn', 'dirty': 'bẩn',
  'disappear': 'biến mất', 'disaster': 'thảm họa', 'discover': 'khám phá',
  'discovery': 'khám phá, phát hiện', 'distance': 'khoảng cách', 'dna': 'ADN',
  'door': 'cửa', 'doorway': 'lối vào', 'dopamine': 'đô-pa-min',
  'dress': 'mặc quần áo, váy', 'draw': 'vẽ', 'drink': 'uống', 'drive': 'lái xe',
  'drop': 'giọt, nhỏ giọt', 'dry': 'khô', 'duck': 'vịt', 'dust': 'bụi',
  // E
  'eagle': 'chim đại bàng', 'early': 'sớm', 'earth': 'trái đất', 'easy': 'dễ dàng',
  'effort': 'nỗ lực', 'egg': 'quả trứng', 'elderly': 'người cao tuổi',
  'electric': 'điện', 'elementary': 'tiểu học, cơ bản', 'elephant': 'con voi',
  'emotion': 'cảm xúc', 'end': 'kết thúc, cuối', 'engine': 'động cơ',
  'engineer': 'kỹ sư', 'england': 'nước Anh', 'english': 'tiếng Anh',
  'enjoy': 'thích thú, tận hưởng', 'enter': 'bước vào, nhập', 'entry': 'lối vào, bài thi',
  'escape': 'thoát ra, trốn thoát', 'europe': 'châu Âu', 'event': 'sự kiện',
  'ever': 'bao giờ', 'every': 'mỗi', 'everyday': 'hàng ngày', 'everyone': 'mọi người',
  'everything': 'mọi thứ', 'everywhere': 'khắp nơi', 'evidence': 'bằng chứng',
  'evolution': 'tiến hóa', 'exact': 'chính xác', 'exactly': 'chính xác',
  'example': 'ví dụ', 'excellent': 'xuất sắc, tuyệt vời', 'except': 'ngoại trừ, trừ',
  'excitement': 'sự phấn khích', 'explain': 'giải thích',
  // F
  'factory': 'nhà máy', 'fair': 'công bằng', 'fall': 'ngã, mùa thu, rơi',
  'famous': 'nổi tiếng', 'farmer': 'nông dân', 'fat': 'béo, chất béo',
  'favourite': 'yêu thích', 'feed': 'cho ăn', 'feel': 'cảm thấy', 'feet': 'bàn chân (số nhiều)',
  'fibre': 'chất xơ', 'fifth': 'thứ năm', 'fight': 'đánh nhau, chiến đấu',
  'fill': 'đổ đầy, điền vào', 'final': 'cuối cùng', 'finally': 'cuối cùng',
  'fingerprint': 'dấu vân tay', 'finger': 'ngón tay', 'finland': 'Phần Lan',
  'flamenco': 'điệu nhảy Flamenco', 'flat': 'bằng phẳng, căn hộ',
  'float': 'nổi, trôi', 'flow': 'chảy', 'fly': 'bay', 'folk': 'dân gian',
  'follow': 'theo, theo dõi', 'football': 'bóng đá', 'footprint': 'dấu chân',
  'force': 'lực, ép buộc', 'forensic': 'giám định pháp y', 'forever': 'mãi mãi',
  'forget': 'quên', 'form': 'hình thức, biểu mẫu', 'format': 'định dạng',
  'forward': 'về phía trước', 'fox': 'con cáo', 'french': 'tiếng Pháp, người Pháp',
  'fresh': 'tươi, mát', 'frozen': 'đông lạnh', 'fruit': 'trái cây', 'fuel': 'nhiên liệu',
  'future': 'tương lai',
  // G
  'game': 'trò chơi', 'gas': 'khí, xăng', 'gate': 'cổng', 'gentle': 'nhẹ nhàng',
  'giant': 'khổng lồ', 'giggle': 'cười khúc khích', 'glass': 'kính, ly thủy tinh',
  'gold': 'vàng', 'grab': 'chộp lấy, nắm lấy', 'gracefully': 'duyên dáng',
  'grain': 'ngũ cốc, hạt', 'grandma': 'bà', 'grandmother': 'bà nội/ngoại',
  'graph': 'biểu đồ', 'gravity': 'trọng lực', 'grey': 'màu xám',
  'ground': 'mặt đất', 'group': 'nhóm', 'grow': 'phát triển, mọc', 'growth': 'sự phát triển',
  'guide': 'hướng dẫn, hướng dẫn viên', 'gym': 'phòng tập thể dục',
  // H
  'half': 'một nửa', 'hall': 'sảnh, hội trường', 'hamster': 'chuột hamster',
  'handle': 'xử lý, tay cầm', 'happy': 'vui vẻ, hạnh phúc', 'happen': 'xảy ra',
  'health': 'sức khỏe', 'healthy': 'khỏe mạnh', 'heart': 'trái tim',
  'heat': 'nhiệt, làm nóng', 'heavy': 'nặng', 'height': 'chiều cao',
  'hesitation': 'sự do dự', 'hide': 'ẩn nấp, giấu', 'hill': 'ngọn đồi',
  'himself': 'bản thân anh ấy', 'hobby': 'sở thích', 'hook': 'cái móc',
  'hope': 'hy vọng', 'horn': 'sừng, còi', 'horse': 'ngựa', 'hug': 'ôm',
  'huge': 'rất to, khổng lồ', 'human': 'con người',
  // I
  'illness': 'bệnh tật', 'image': 'hình ảnh', 'immediately': 'ngay lập tức',
  'impressive': 'ấn tượng', 'include': 'bao gồm', 'incredible': 'không thể tin được',
  'india': 'Ấn Độ', 'indonesia': 'Indonesia', 'information': 'thông tin',
  'ink': 'mực', 'innocent': 'vô tội, ngây thơ', 'insect': 'côn trùng',
  'instead': 'thay vào đó', 'instruction': 'hướng dẫn', 'interesting': 'thú vị',
  'international': 'quốc tế', 'invent': 'phát minh', 'investigate': 'điều tra',
  'invisible': 'vô hình', 'island': 'hòn đảo',
  // J
  'japan': 'Nhật Bản', 'japanese': 'tiếng Nhật, người Nhật', 'jar': 'cái lọ, bình',
  'job': 'công việc', 'journal': 'nhật ký, tạp chí', 'joy': 'niềm vui',
  // K
  'kenya': 'Kenya', 'kid': 'đứa trẻ', 'kilometre': 'kilomét', 'kingdom': 'vương quốc',
  'kite': 'con diều', 'knock': 'gõ, đập',
  // L
  'laboratory': 'phòng thí nghiệm', 'lake': 'hồ nước', 'land': 'đất, hạ cánh',
  'landscape': 'phong cảnh', 'lantern': 'đèn lồng', 'large': 'lớn, to',
  'later': 'sau này', 'layer': 'lớp', 'learn': 'học', 'leash': 'dây xích',
  'less': 'ít hơn', 'lie': 'nói dối, nằm', 'life': 'cuộc sống', 'light': 'ánh sáng, nhẹ',
  'line': 'đường, hàng', 'link': 'liên kết', 'lion': 'sư tử', 'liquid': 'chất lỏng',
  'list': 'danh sách', 'listen': 'lắng nghe', 'literally': 'theo nghĩa đen',
  'loaf': 'ổ bánh mì', 'local': 'địa phương', 'location': 'vị trí, địa điểm',
  'log': 'khúc gỗ, nhật ký', 'london': 'London', 'lotus': 'hoa sen',
  'luck': 'may mắn', 'lunchtime': 'giờ ăn trưa',
  // M
  'machine': 'máy móc', 'magic': 'phép thuật, kỳ diệu', 'magnify': 'phóng to',
  'manga': 'truyện tranh Nhật', 'math': 'toán học', 'matter': 'vấn đề, chất',
  'meal': 'bữa ăn', 'measure': 'đo lường', 'meat': 'thịt', 'meet': 'gặp',
  'melody': 'giai điệu', 'member': 'thành viên', 'message': 'tin nhắn',
  'metal': 'kim loại', 'method': 'phương pháp', 'microscope': 'kính hiển vi',
  'milk': 'sữa', 'million': 'triệu', 'mind': 'tâm trí', 'mineral': 'khoáng chất',
  'miss': 'nhớ, lỡ', 'mistake': 'lỗi lầm', 'mix': 'trộn', 'molar': 'răng hàm',
  'mom': 'mẹ', 'moment': 'khoảnh khắc', 'monkey': 'con khỉ', 'mountain': 'ngọn núi',
  'muddy': 'lầy lội', 'mum': 'mẹ', 'muscle': 'cơ bắp', 'music': 'âm nhạc',
  'musician': 'nhạc sĩ', 'must': 'phải',
  // N
  'narrow': 'hẹp', 'national': 'quốc gia, toàn quốc', 'natural': 'tự nhiên',
  'nature': 'thiên nhiên, bản chất', 'neat': 'gọn gàng', 'need': 'cần',
  'neighbour': 'hàng xóm', 'newspaper': 'tờ báo', 'nobody': 'không ai',
  'nod': 'gật đầu', 'noise': 'tiếng ồn', 'noodle': 'mì, bún',
  'normal': 'bình thường', 'note': 'ghi chú, nốt nhạc', 'nothing': 'không có gì',
  // O
  'observation': 'quan sát', 'obstacle': 'chướng ngại vật', 'ocean': 'đại dương',
  'office': 'văn phòng', 'once': 'một lần, ngày xưa', 'opera': 'vở opera, nhà hát',
  'organise': 'tổ chức', 'oxytocin': 'ô-xi-tô-xin',
  // P
  'pace': 'tốc độ, bước đi', 'pack': 'đóng gói, balo', 'packet': 'gói',
  'painting': 'bức tranh', 'paris': 'Paris', 'passion': 'niềm đam mê',
  'pasta': 'mì Ý', 'path': 'con đường', 'patient': 'bệnh nhân, kiên nhẫn',
  'pattern': 'mẫu, hoa văn', 'peanut': 'lạc, đậu phộng', 'perfect': 'hoàn hảo',
  'performance': 'buổi biểu diễn', 'personality': 'tính cách', 'pet': 'thú cưng',
  'photograph': 'ảnh chụp', 'piano': 'đàn piano', 'pick': 'chọn, hái',
  'piece': 'mảnh, miếng', 'pig': 'con lợn', 'plan': 'kế hoạch',
  'planet': 'hành tinh', 'plate': 'đĩa', 'player': 'người chơi',
  'police': 'cảnh sát', 'pond': 'ao', 'pool': 'hồ bơi', 'popular': 'phổ biến',
  'portrait': 'chân dung', 'pot': 'nồi, chậu', 'pound': 'đập, tiền bảng Anh',
  'powder': 'bột', 'power': 'sức mạnh, điện', 'powerful': 'mạnh mẽ',
  'practise': 'luyện tập', 'pray': 'cầu nguyện', 'precious': 'quý giá',
  'predator': 'động vật ăn thịt', 'predict': 'dự đoán', 'prepare': 'chuẩn bị',
  'presentation': 'bài thuyết trình', 'pride': 'tự hào, đàn sư tử',
  'primary': 'tiểu học, chính', 'print': 'in ấn', 'process': 'quá trình',
  'produce': 'sản xuất', 'professional': 'chuyên nghiệp', 'program': 'chương trình',
  'programmer': 'lập trình viên', 'protect': 'bảo vệ', 'protein': 'chất đạm',
  'prove': 'chứng minh', 'provide': 'cung cấp', 'psychologist': 'nhà tâm lý học',
  'public': 'công cộng, người dân', 'pull': 'kéo', 'puppy': 'chó con',
  'push': 'đẩy', 'puzzle': 'câu đố',
  // Q
  'quickly': 'nhanh chóng', 'quiet': 'yên tĩnh, lặng lẽ',
  // R
  'reach': 'với tới, đến được', 'recipe': 'công thức nấu ăn', 'record': 'ghi lại, kỷ lục',
  'recycle': 'tái chế', 'reflect': 'phản chiếu, suy ngẫm', 'regular': 'đều đặn, thường xuyên',
  'release': 'giải phóng, phát hành', 'remain': 'ở lại, còn lại', 'remember': 'nhớ',
  'remind': 'nhắc nhở', 'repair': 'sửa chữa', 'replace': 'thay thế',
  'researcher': 'nhà nghiên cứu', 'respond': 'phản hồi', 'response': 'phản hồi',
  'rest': 'nghỉ ngơi', 'result': 'kết quả', 'return': 'trở lại', 'rice': 'cơm, gạo',
  'rich': 'giàu có', 'rise': 'tăng lên, mọc', 'robot': 'người máy',
  'rocket': 'tên lửa', 'rock': 'đá, nhạc rock', 'rough': 'gồ ghề, thô',
  'royal': 'hoàng gia', 'rub': 'cọ, xoa', 'rule': 'quy tắc', 'rush': 'vội vàng',
  'row': 'hàng, dãy, chèo thuyền',
  // S
  'safety': 'sự an toàn', 'saliva': 'nước bọt', 'satellite': 'vệ tinh',
  'scale': 'cân, tỉ lệ', 'scary': 'đáng sợ', 'science': 'khoa học', 'screen': 'màn hình',
  'search': 'tìm kiếm', 'secret': 'bí mật', 'send': 'gửi', 'sense': 'giác quan, cảm nhận',
  'sentence': 'câu', 'series': 'chuỗi, series', 'set': 'bộ, đặt',
  'shape': 'hình dạng', 'shade': 'bóng mát, bóng', 'shady': 'bóng mát',
  'sheep': 'con cừu', 'sheet': 'tờ giấy, chăn', 'shell': 'vỏ sò, vỏ cứng',
  'shine': 'sáng rực, chiếu sáng', 'ship': 'tàu thuyền', 'shirt': 'áo sơ mi',
  'shoot': 'bắn, chụp ảnh', 'shop': 'cửa hàng, mua sắm', 'shoulder': 'vai',
  'shout': 'hét lên', 'signal': 'tín hiệu', 'simple': 'đơn giản',
  'single': 'đơn lẻ, độc thân', 'situation': 'tình huống', 'skateboard': 'ván trượt',
  'skin': 'da', 'skip': 'nhảy dây, bỏ qua', 'skyscraper': 'nhà chọc trời',
  'slide': 'trượt, con trượt', 'smell': 'mùi, ngửi', 'smooth': 'mịn màng, trơn tru',
  'snack': 'đồ ăn vặt', 'snow': 'tuyết', 'snowflake': 'bông tuyết',
  'soccer': 'bóng đá', 'soft': 'mềm mại', 'soften': 'làm mềm', 'solve': 'giải quyết',
  'someone': 'ai đó', 'something': 'điều gì đó', 'somewhere': 'đâu đó', 'song': 'bài hát',
  'sound': 'âm thanh', 'soup': 'canh, súp', 'space': 'không gian, vũ trụ',
  'spacecraft': 'tàu vũ trụ', 'spain': 'nước Tây Ban Nha', 'sparkle': 'lấp lánh',
  'speak': 'nói', 'specific': 'cụ thể', 'speech': 'bài phát biểu',
  'speed': 'tốc độ', 'spill': 'đổ tràn', 'spit': 'nhổ, nhổ ra',
  'splash': 'té nước', 'sport': 'thể thao', 'spot': 'điểm, đốm',
  'spring': 'mùa xuân, lò xo', 'squad': 'nhóm, đội', 'stage': 'sân khấu, giai đoạn',
  'station': 'nhà ga, trạm', 'stay': 'ở lại', 'steep': 'dốc', 'steel': 'thép',
  'stick': 'gậy, dán', 'stomach': 'dạ dày', 'stone': 'đá', 'storytelling': 'kể chuyện',
  'strawberry': 'dâu tây', 'strength': 'sức mạnh', 'stress': 'căng thẳng',
  'strip': 'dải, cởi ra', 'study': 'học tập, nghiên cứu', 'style': 'phong cách',
  'substance': 'chất, vật chất', 'summer': 'mùa hè', 'superpower': 'siêu năng lực',
  'supply': 'cung cấp, đồ dùng', 'support': 'ủng hộ, hỗ trợ', 'surface': 'bề mặt',
  'surprise': 'ngạc nhiên', 'surround': 'bao quanh', 'survive': 'sống sót',
  'sweet': 'ngọt ngào, kẹo', 'swing': 'đu đưa, xích đu', 'system': 'hệ thống',
  // T
  'tablet': 'máy tính bảng', 'tag': 'gắn thẻ, trò đuổi bắt', 'tale': 'câu chuyện',
  'task': 'nhiệm vụ', 'tasty': 'ngon miệng', 'taxi': 'taxi', 'tea': 'trà',
  'teach': 'dạy', 'teammate': 'đồng đội', 'teamwork': 'làm việc nhóm',
  'technique': 'kỹ thuật', 'technology': 'công nghệ', 'teenager': 'thiếu niên',
  'test': 'bài kiểm tra, thử nghiệm', 'theory': 'lý thuyết', 'third': 'thứ ba',
  'tidy': 'dọn dẹp, gọn gàng', 'tiny': 'rất nhỏ', 'tip': 'mẹo, đầu mút',
  'toast': 'bánh mì nướng', 'tokyo': 'Tokyo', 'top': 'đỉnh, trên cùng',
  'touch': 'chạm, xúc giác', 'tough': 'khó, cứng rắn', 'town': 'thị trấn',
  'track': 'theo dõi, đường ray', 'tradition': 'truyền thống', 'traditional': 'truyền thống',
  'train': 'tàu hỏa, luyện tập', 'transfer': 'chuyển giao', 'travel': 'du lịch, đi lại',
  'tray': 'cái khay', 'treat': 'đối xử, phần thưởng', 'trick': 'mẹo, lừa',
  'trip': 'chuyến đi', 'tropical': 'nhiệt đới', 'truly': 'thực sự', 'truth': 'sự thật',
  'tv': 'tivi', 'type': 'loại, gõ phím',
  // U
  'uncle': 'chú, bác', 'uncomfortable': 'không thoải mái', 'understand': 'hiểu',
  'unfair': 'không công bằng', 'unique': 'độc đáo', 'united': 'thống nhất',
  'unpack': 'giải mã, mở hàng', 'urban': 'thành thị',
  // V
  'vapor': 'hơi nước', 'vegetable': 'rau củ', 'verb': 'động từ',
  'vietnam': 'Việt Nam', 'view': 'tầm nhìn, xem', 'visit': 'thăm viếng',
  'visitor': 'khách thăm', 'vitamin': 'vitamin', 'voice': 'giọng nói', 'visual': 'hình ảnh, thị giác',
  // W
  'wake': 'tỉnh dậy', 'warmth': 'hơi ấm', 'wash': 'rửa', 'wave': 'sóng, vẫy tay',
  'wear': 'mặc, đeo', 'weather': 'thời tiết', 'weight': 'cân nặng, trọng lượng',
  'welcome': 'chào đón', 'wet': 'ướt', 'wheel': 'bánh xe', 'whisper': 'thì thầm',
  'whole': 'toàn bộ', 'wild': 'hoang dã', 'win': 'chiến thắng', 'wind': 'gió',
  'wing': 'cánh', 'wonder': 'kỳ diệu, thắc mắc', 'wonderful': 'tuyệt vời',
  'wood': 'gỗ', 'wooden': 'làm bằng gỗ', 'worry': 'lo lắng',
  // Y-Z
  'yummy': 'ngon tuyệt',
  // Proper nouns (minimal)
  'alex': 'Tên người: Alex', 'amy': 'Tên người: Amy', 'ben': 'Tên người: Ben',
  'emma': 'Tên người: Emma', 'jack': 'Tên người: Jack', 'jane': 'Tên người: Jane',
  'leo': 'Tên người: Leo', 'lily': 'Tên người: Lily/Hoa loa kèn',
  'lisa': 'Tên người: Lisa', 'luna': 'Tên người: Luna', 'max': 'Tên người: Max',
  'maya': 'Tên người: Maya', 'mia': 'Tên người: Mia', 'mike': 'Tên người: Mike',
  'nova': 'Tên người: Nova', 'rachel': 'Tên người: Rachel', 'sam': 'Tên người: Sam',
  'sara': 'Tên người: Sara',
  // Irregular past tense forms
  'became': 'đã trở thành', 'began': 'đã bắt đầu', 'built': 'đã xây dựng',
  'chose': 'đã chọn', 'drew': 'đã vẽ', 'flew': 'đã bay', 'forgot': 'đã quên',
  'grew': 'đã mọc, đã lớn', 'grown': 'đã trưởng thành', 'lay': 'đặt, nằm',
  'lost': 'đã mất, bị lạc', 'spoke': 'đã nói', 'woke': 'đã thức dậy',
  'won': 'đã chiến thắng', 'cried': 'đã khóc', 'tidied': 'đã dọn dẹp',
  'studied': 'đã học', 'managed': 'đã xoay sở', 'said': 'đã nói',
  'pressed': 'đã nhấn, ép', 'flips': 'lật, quay lại',
  // Common words not yet covered
  'adaptation': 'sự thích nghi', 'against': 'chống lại, đối nghịch',
  'algorithm': 'thuật toán', 'beagle': 'chó Beagle', 'beep': 'tiếng bíp',
  'cheetah': 'báo gêpa', 'dear': 'yêu quý, thưa', 'doraemon': 'Doraemon',
  'droplet': 'giọt nhỏ', 'dusty': 'đầy bụi', 'emotional': 'đầy cảm xúc',
  'favorite': 'yêu thích', 'file': 'tập tin, hồ sơ', 'fourth': 'thứ tư',
  'goodnight': 'chúc ngủ ngon', 'hidden': 'ẩn, giấu', 'investigation': 'cuộc điều tra',
  'lounge': 'phòng khách, phòng chờ', 'main': 'chính, chủ yếu',
  'maybe': 'có lẽ', 'meanwhile': 'trong lúc đó', 'meteorologist': 'nhà khí tượng học',
  'multiple': 'nhiều, bội số', 'nearby': 'gần đây', 'neuroscience': 'khoa học thần kinh',
  'nine': 'số chín', 'official': 'chính thức', 'overconfident': 'quá tự tin',
  'per': 'mỗi, theo', 'plane': 'máy bay, phẳng', 'planner': 'người lập kế hoạch',
  'presenter': 'người trình bày, MC', 'programme': 'chương trình', 'properly': 'đúng cách',
  'province': 'tỉnh', 'rainy': 'mưa nhiều', 'say': 'nói', 'saying': 'câu nói, tục ngữ',
  'several': 'một vài', 'shiny': 'bóng sáng, lấp lánh', 'simply': 'đơn giản là',
  'such': 'như vậy, rất', 'themselves': 'bản thân họ', 'thirty': 'ba mươi',
  'times': 'lần, nhân', 'tools': 'công cụ, dụng cụ', 'twenty': 'hai mươi',
  'underneath': 'bên dưới', 'upward': 'hướng lên trên', 'useful': 'hữu ích',
  'vietnamese': 'tiếng Việt, người Việt', 'wait': 'chờ đợi', 'whoosh': 'tiếng gió vụt qua',
  'will': 'sẽ, ý chí', 'without': 'không có', 'witness': 'nhân chứng',
  'woodblock': 'khắc gỗ', 'downward': 'hướng xuống dưới',
  // Contractions
  "couldn't": 'không thể', "doesn't": 'không', "don't": 'không', 
  "i'm": 'tôi là, tôi đang', "i've": 'tôi đã', "they're": 'họ là, họ đang',
  // Hyphenated compounds
  'check-in': 'làm thủ tục', 'fight-or-flight': 'phản ứng chiến-hay-chạy',
  'high-speed': 'tốc độ cao', 'lantern-lit': 'thắp đèn lồng',
  // Proper nouns / places
  'hanoi': 'Hà Nội', 'usa': 'Hoa Kỳ', 'darwin': 'Darwin', 'goodall': 'Goodall',
  'locard': 'Locard', 'luxembourg': 'Luxembourg', 'galapagos': 'quần đảo Galapagos',
  'ueno': 'Ueno', 'york': 'York', 'wright': 'Wright', 'hyde': 'Hyde',
  'greenwood': 'Greenwood', 'hms': 'HMS (tàu Hoàng gia Anh)',
  'ikea': 'IKEA', 'edmond': 'Edmond', 'charles': 'Charles', 'charlie': 'Charlie',
  'johnson': 'Johnson', 'lee': 'Lee', 'david': 'David',
  'chen': 'Chen', 'ms': 'cô/bà', 'tim': 'Tim', 'tom': 'Tom', 'sarah': 'Sarah',
  // Vietnamese names / words in English context
  'hoa': 'Hoa', 'chi': 'Chi', 'minh': 'Minh', 'nam': 'Nam', 'nang': 'Nẵng',
  'ninh': 'Ninh', 'linh': 'Linh', 'tra': 'Trà', 'truyen': 'truyện', 'tranh': 'tranh',
  'sen': 'Sen', 'miso': 'miso (súp Nhật)', 'fude-bako': 'hộp bút lông (Nhật)',
  // Misc
  'lot': 'nhiều, rất nhiều', 'lots': 'rất nhiều', 'ing': '(hậu tố -ing)', 'mmm': 'ừm',
  'nations': 'các quốc gia', 'nine': 'chín',
};

// ─── Process ──────────────────────────────────────────────────────────────────
let updated = 0;
let skipped = 0;

for (const entry of dictionary) {
  if (entry.meaning && entry.meaning.trim()) { skipped++; continue; }
  
  const word = entry.word.toLowerCase();
  const bases = lemmatize(word);
  
  let found = false;
  for (const base of bases) {
    if (MEGA_DICT[base]) {
      entry.meaning = MEGA_DICT[base];
      found = true;
      updated++;
      break;
    }
  }
  
  if (!found) {
    // Try removing common compounds: "someone's" → "someone"
    const clean = word.replace(/['\u2019]s$/, '').replace(/[^a-z]/g, '');
    if (MEGA_DICT[clean]) {
      entry.meaning = MEGA_DICT[clean];
      updated++;
    }
  }
}

const stillMissing = dictionary.filter(e => !e.meaning || !e.meaning.trim());
console.log(`✅ Updated: ${updated}`);
console.log(`⏭  Already had meaning: ${skipped}`);
console.log(`❌ Still missing: ${stillMissing.length}`);

if (stillMissing.length > 0) {
  console.log('\nStill missing:');
  stillMissing.forEach(e => console.log('  -', e.word));
}

writeFileSync(DICT_PATH, JSON.stringify(dictionary, null, 2), 'utf-8');
const size = (readFileSync(DICT_PATH).length / 1024).toFixed(1);
console.log(`\n💾 Saved: ${dictionary.length} entries, ${size} KB`);
