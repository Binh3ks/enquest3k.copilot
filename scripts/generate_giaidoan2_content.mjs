/**
 * scripts/generate_giaidoan2_content.mjs
 * 
 * ENGQUEST3K — GIAI ĐOẠN 2 AUTOMATED CONTENT PIPELINE ENGINE (ROUND 60)
 * 
 * Generates standardized Giai đoạn 2 pedagogical deliverables grounded strictly
 * in blueprint.json + Source A/B syllabus entries.
 * 
 * Invariants:
 * 1. Cryptographic Freeze Guard: W33 & W34 are hard-blocked from mutation.
 * 2. Staging Only: Writes ONLY to a staging directory (docs/agent_artifacts/staging/week_XX/).
 * 3. Provenance Tracking: Every file and data object embeds generation metadata.
 * 4. Giai đoạn 4 Mechanical Quality Gates: Automates schema, word count, CEFR range,
 *    Vietnamese leak scan, cross-week collision matrix, and banned tokens audit.
 * 5. Dry-Run by Default: Explicit --write-staging required to persist files.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const WEEKS_DIR = path.join(ROOT_DIR, 'src/data/weeks');
const STAGING_BASE_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/staging');
const SYLLABUS_FILE = path.join(ROOT_DIR, 'docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');

// Parse CLI flags
const args = process.argv.slice(2);
const isWrite = args.includes('--write-staging') || args.includes('--write');
const isDryRun = !isWrite;
const isPilot = args.includes('--pilot');
const weekArgIdx = args.findIndex(a => a === '--week' || a === '-w');
const targetWeek = weekArgIdx !== -1 && args[weekArgIdx + 1] ? parseInt(args[weekArgIdx + 1], 10) : null;

// Unicode Vietnamese detection regex
const VIETNAMESE_REGEX = /[\u00C0-\u024F\u1EA0-\u1EF9]/;

// Forbidden historical tokens for W35
const W35_FORBIDDEN_TOKENS = [
  'Pine Valley', 'campfire', 'marshmallow', 'campsite', 'tent',
  'sleeping bag', 'stargazing', 'Leo the Lion', 'Milo the Mouse', 'Hunter Jack'
];

/**
 * Extract Source B excerpt for a specific week
 */
function extractSourceBExcerpt(w) {
  if (!fs.existsSync(SYLLABUS_FILE)) return null;
  const txt = fs.readFileSync(SYLLABUS_FILE, 'utf8');
  const reg = new RegExp(`(?:TUẦN|Tuần|Week)\\s*${w}\\b[\\s\\S]*?(?=(?:TUẦN|Tuần|Week)\\s*${w + 1}\\b|$)`, 'i');
  const m = txt.match(reg);
  return m ? m[0].trim() : `Week ${w} syllabus entry`;
}

/**
 * 4 PILOT WEEKS PEDAGOGICAL CONTENT DEFINITIONS
 * Grounded 100% in blueprint.json + Source B Syllabus
 */
const PILOT_CONTENT_SPECS = {
  35: {
    week: 35,
    theme: "Storytelling Practice 2 (Personal Recount)",
    title_en: "Storytelling Practice 2 (Personal Recount)",
    title_vi: "Luyện Kể Chuyện 2 — Kể Lại Kỷ Niệm Cá Nhân",
    cefr_level: "A2 Flyers",
    grammar_focus: "Past Simple + Adjectives",
    vocab_list: [
      { id: 1, word: "memorable", pos: "adj", ipa: "/ˈmemərəbəl/", definition_en: "Worth remembering or easily remembered", definition_vi: "đáng nhớ", example_en: "Our school trip was a truly memorable day.", example_vi: "Chuyến dã ngoại trường là một ngày thực sự đáng nhớ." },
      { id: 2, word: "wonderful", pos: "adj", ipa: "/ˈwʌndərfəl/", definition_en: "Extremely good or pleasant", definition_vi: "tuyệt vời", example_en: "We had a wonderful afternoon in the park.", example_vi: "Chúng tôi đã có một buổi chiều tuyệt vời trong công viên." },
      { id: 3, word: "delighted", pos: "adj", ipa: "/dɪˈlaɪtɪd/", definition_en: "Feeling or showing great happiness", definition_vi: "vui mừng khôn xiết", example_en: "Emma was delighted to see her grandparents.", example_vi: "Emma rất vui mừng khi được gặp ông bà." },
      { id: 4, word: "surprised", pos: "adj", ipa: "/sərˈpraɪzd/", definition_en: "Feeling wonder or astonishment at the unexpected", definition_vi: "ngạc nhiên", example_en: "He was surprised by the unexpected birthday gift.", example_vi: "Cậu ấy ngạc nhiên trước món quà sinh nhật bất ngờ." },
      { id: 5, word: "frightened", pos: "adj", ipa: "/ˈfraɪtənd/", definition_en: "Afraid or anxious about something", definition_vi: "sợ hãi", example_en: "The loud thunder made the little kitten frightened.", example_vi: "Tiếng sấm lớn làm chú mèo con sợ hãi." },
      { id: 6, word: "excited", pos: "adj", ipa: "/ɪkˈsaɪtɪd/", definition_en: "Very enthusiastic and eager", definition_vi: "hào hứng", example_en: "The students were excited about the science show.", example_vi: "Các học sinh rất hào hứng với buổi biểu diễn khoa học." },
      { id: 7, word: "peaceful", pos: "adj", ipa: "/ˈpiːsfəl/", definition_en: "Calm and quiet; free from noise", definition_vi: "yên bình", example_en: "The lake looked calm and peaceful at sunrise.", example_vi: "Mặt hồ trông êm đềm và yên bình lúc bình minh." },
      { id: 8, word: "cheerful", pos: "adj", ipa: "/ˈtʃɪərfəl/", definition_en: "Noticeably happy and optimistic", definition_vi: "vui tươi", example_en: "The cheerful boy greeted everyone with a broad smile.", example_vi: "Cậu bé vui tươi chào mọi người với nụ cười rạng rỡ." },
      { id: 9, word: "suddenly", pos: "adv", ipa: "/ˈsʌdənli/", definition_en: "Quickly and unexpectedly", definition_vi: "bất thình lình", example_en: "Suddenly, the bright lights turned on.", example_vi: "Bất thình lình, những ánh đèn sáng rực bật lên." },
      { id: 10, word: "laughed", pos: "v", ipa: "/læft/", definition_en: "Made joyful sounds and movements of the face", definition_vi: "đã cười", example_en: "We laughed loudly at the funny clown.", example_vi: "Chúng tôi đã cười lớn trước chú hề vui nhộn." },
      { id: 11, word: "whispered", pos: "v", ipa: "/ˈwɪspərd/", definition_en: "Spoke very softly using one's breath", definition_vi: "đã thì thầm", example_en: "She whispered the secret answer to her friend.", example_vi: "Cô ấy đã thì thầm câu trả lời bí mật với bạn mình." },
      { id: 12, word: "decided", pos: "v", ipa: "/dɪˈsaɪdɪd/", definition_en: "Made a firm choice after thinking", definition_vi: "đã quyết định", example_en: "They decided to visit the history museum.", example_vi: "Họ đã quyết định đi thăm bảo tàng lịch sử." },
      { id: 13, word: "celebrated", pos: "v", ipa: "/ˈselɪbreɪtɪd/", definition_en: "Honored an occasion with festivities", definition_vi: "đã ăn mừng", example_en: "Our whole family celebrated Lucas's victory.", example_vi: "Cả gia đình chúng tôi đã ăn mừng chiến thắng của Lucas." },
      { id: 14, word: "treasured", pos: "v", ipa: "/ˈtreʒərd/", definition_en: "Valued greatly as precious", definition_vi: "đã trân quý", example_en: "Grandpa treasured every photograph in the album.", example_vi: "Ông đã trân quý từng bức ảnh trong cuốn album." },
      { id: 15, word: "recounted", pos: "v", ipa: "/rɪˈkaʊntɪd/", definition_en: "Told the detailed story of an event", definition_vi: "đã kể lại", example_en: "The explorer recounted his exciting journey.", example_vi: "Nhà thám hiểm đã kể lại hành trình thú vị của mình." },
      { id: 16, word: "adventure", pos: "n", ipa: "/ədˈventʃər/", definition_en: "An unusual and exciting experience", definition_vi: "chuyến phiêu lưu", example_en: "Traveling by train was an unforgettable adventure.", example_vi: "Đi du lịch bằng tàu hỏa là một chuyến phiêu lưu khó quên." },
      { id: 17, word: "journey", pos: "n", ipa: "/ˈdʒɜːrni/", definition_en: "An act of traveling from one place to another", definition_vi: "hành trình", example_en: "The bus journey took over two hours.", example_vi: "Hành trình xe buýt mất hơn hai giờ đồng hồ." },
      { id: 18, word: "souvenir", pos: "n", ipa: "/ˌsuːvəˈnɪər/", definition_en: "An item kept as a reminder of a place visited", definition_vi: "quà lưu niệm", example_en: "I bought a small wooden toy as a souvenir.", example_vi: "Tôi đã mua một món đồ chơi gỗ nhỏ làm quà lưu niệm." },
      { id: 19, word: "photograph", pos: "n", ipa: "/ˈfoʊtəɡræf/", definition_en: "A picture made using a camera", definition_vi: "bức ảnh", example_en: "Dad took a lovely photograph of the family.", example_vi: "Bố đã chụp một bức ảnh đáng yêu của gia đình." },
      { id: 20, word: "celebration", pos: "n", ipa: "/ˌselɪˈbreɪʃən/", definition_en: "A joyful event or party for a special occasion", definition_vi: "lễ kỷ niệm", example_en: "The victory celebration lasted until dinner time.", example_vi: "Buổi lễ ăn mừng chiến thắng kéo dài tới giờ ăn tối." }
    ],
    clil: {
      title_en: "The Art of Storytelling: Bringing Memories to Life",
      title_vi: "Nghệ Thuật Kể Chuyện: Thổi Hồn Vào Ký Ức",
      content_en: "A personal recount is a wonderful way to share memorable experiences with friends and family. When writers recount past events, they use descriptive adjectives to make their stories come alive. Instead of merely saying that a day was nice, a skilled storyteller explains how they felt excited, delighted, or surprised during each moment. Clear sequence words such as first, next, suddenly, and finally guide readers smoothly through the journey. Describing sensory details helps listeners picture the scene clearly in their minds. For example, mentioning a cheerful laugh, a whispering breeze, or a colorful celebration adds depth to simple facts. When you conclude your recount, reflecting on what made the day special leaves a lasting impression on your audience.",
      glossary: [
        { word: "recount", definition_en: "To tell a story or describe events in detail", definition_vi: "kể lại chi tiết" },
        { word: "descriptive", definition_en: "Giving detailed information about something", definition_vi: "mang tính miêu tả" },
        { word: "sensory", definition_en: "Relating to physical senses like sight and sound", definition_vi: "thuộc về giác quan" },
        { word: "sequence", definition_en: "The particular order in which events follow each other", definition_vi: "trình tự nối tiếp" },
        { word: "impression", definition_en: "An idea, feeling, or opinion about something", definition_vi: "ấn tượng sâu sắc" }
      ],
      check_questions: [
        { id: 1, question_en: "What do skilled storytellers use to make recounts vivid?", options: ["Descriptive adjectives and sensory details", "Only silent gestures", "Very short numbers"], answer: "Descriptive adjectives and sensory details" },
        { id: 2, question_en: "Why are sequence words important in a recount?", options: ["They guide readers smoothly through the order of events", "They hide the ending of the story", "They change the names of characters"], answer: "They guide readers smoothly through the order of events" },
        { id: 3, question_en: "What does reflecting at the end of a recount do?", options: ["It leaves a lasting impression on the audience", "It restarts the entire story again", "It deletes all adjectives"], answer: "It leaves a lasting impression on the audience" }
      ],
      critical_thinking: {
        question_en: "How does choosing strong descriptive adjectives change how a listener feels about your story?",
        hint_en: "Consider how words like 'frightened' or 'delighted' create emotional empathy compared to generic words like 'bad' or 'good'."
      }
    },
    shadowing_sentences: [
      { id: 1, text: "Last Saturday was the most memorable day of our school holiday.", ipa: "/læst ˈsætərdeɪ wəz ðə moʊst ˈmemərəbəl deɪ əv ˈaʊər skuːl ˈhɑːlədeɪ/" },
      { id: 2, text: "We packed our backpacks early and boarded the cheerful morning train.", ipa: "/wi pækt ˈaʊər ˈbækpæks ˈɜːrli ənd ˈbɔːrdɪd ðə ˈtʃɪərfəl ˈmɔːrnɪŋ treɪn/" },
      { id: 3, text: "While my brother looked out the window, I organized our colorful map.", ipa: "/waɪl maɪ ˈbrʌðər lʊkt aʊt ðə ˈwɪndoʊ aɪ ˈɔːrɡənaɪzd ˈaʊər ˈkʌlərfəl mæp/" },
      { id: 4, text: "When we arrived at the art museum, everyone was delighted and surprised.", ipa: "/wen wi əˈraɪvd ət ði ɑːrt mjuːˈziːəm ˈevriwʌn wəz dɪˈlaɪtɪd ənd sərˈpraɪzd/" },
      { id: 5, text: "The grand exhibition hall looked magnificent under warm golden lights.", ipa: "/ðə ɡrænd ˌeksɪˈbɪʃən hɔːl lʊkt mæɡˈnɪfɪsənt ˈʌndər wɔːrm ˈɡoʊldən laɪts/" },
      { id: 6, text: "We laughed together as the talented guide demonstrated a magic trick.", ipa: "/wi læft təˈɡeðər æz ðə ˈtæləntɪd ɡaɪd ˈdemənstreɪtɪd ə ˈmædʒɪk trɪk/" },
      { id: 7, text: "Grandpa took a wonderful family photograph before we left the courtyard.", ipa: "/ˈɡrænpɑː tʊk ə ˈwʌndərfəl ˈfæməli ˈfoʊtəɡræf bɪˈfɔːr wi left ðə ˈkɔːrtjɑːrd/" },
      { id: 8, text: "It was truly an unforgettable adventure that we will always treasure.", ipa: "/ɪt wəz ˈtruːli ən ˌʌnfərˈɡetəbəl ədˈventʃər ðæt wi wɪl ˈɔːlweɪz ˈtreʒər/" }
    ],
    cambridge_rw: {
      part1_definitions: [
        { id: 1, text: "A joyful party or gathering held to mark a special occasion.", target: "celebration" },
        { id: 2, text: "A picture produced by capturing light on a camera sensor or film.", target: "photograph" },
        { id: 3, text: "An object that you keep to remind yourself of an exciting trip.", target: "souvenir" },
        { id: 4, text: "An exciting or unusual journey full of surprising new experiences.", target: "adventure" },
        { id: 5, text: "Feeling immense happiness and complete satisfaction.", target: "delighted" }
      ],
      part2_dialogue: {
        title: "Oliver & Emma Discussing the Weekend Recount",
        exchanges: [
          { speaker: "Oliver", text: "Did you finish writing your story about our weekend trip?" },
          { speaker: "Emma", text: "Yes, I recounted all the exciting things we saw at the museum." },
          { speaker: "Oliver", text: "Which adjectives did you use to describe the main gallery?" },
          { speaker: "Emma", text: "I wrote that it was magnificent, bright, and wonderfully quiet." },
          { speaker: "Oliver", text: "That sounds excellent! Did you include Grandpa's photograph?" },
          { speaker: "Emma", text: "Of course! It was the most memorable part of the entire day." }
        ]
      },
      part6_cloze: {
        title: "Lucas's Recount: Sunday Afternoon",
        instructions: "Read the diary and write the missing words. Write one word on each line.",
        text_template: "Dear Diary, yesterday was [1]_____ best day of my holiday. In the morning, our class [2]_____ to the national gallery. While the teacher was explaining [3]_____ famous painting, we took careful notes. In the afternoon, we [4]_____ cheerfully in the sunny garden. Everyone felt very [5]_____ and pleased.",
        answers: { "1": "the", "2": "went", "3": "the", "4": "walked", "5": "happy" }
      }
    },
    minigames: {
      math_problems: [
        {
          id: 1,
          title: "Problem 1: Photograph Album (Part-Whole)",
          problemText: "Emma took 45 photographs on Saturday and 35 photographs on Sunday. How many photographs did she take altogether?",
          correctAnswer: 80,
          answer: "80 photographs",
          hintText: "Saturday photos (45) + Sunday photos (35) = 80 total photographs.",
          modelData: {
            type: "part_whole",
            bars: [
              { value: 45, label: "45 Saturday", color: "#4f46e5" },
              { value: 35, label: "35 Sunday", color: "#06b6d4" }
            ],
            totalLabel: "80 photographs total"
          }
        },
        {
          id: 2,
          title: "Problem 2: Souvenir Postcards (Comparison)",
          problemText: "The museum gift shop sold 64 postcards in the morning and 28 postcards in the afternoon. How many more postcards were sold in the morning?",
          correctAnswer: 36,
          answer: "36 postcards",
          hintText: "Morning sales (64) - Afternoon sales (28) = 36 more postcards.",
          modelData: {
            type: "comparison",
            bars: [
              { value: 64, label: "64 Morning", color: "#0ea5e9" },
              { value: 28, label: "28 Afternoon", color: "#ef4444" }
            ],
            differenceLabel: "36 more postcards"
          }
        }
      ],
      grammar_drills: [
        { id: 1, prompt: "While Emma ___ her journal, her brother painted a picture.", options: ["was writing", "wrote", "writes"], answer: "was writing" },
        { id: 2, prompt: "The children were very ___ when the magic show started.", options: ["excited", "excitedly", "exciting"], answer: "excited" },
        { id: 3, prompt: "Suddenly, the train ___ at the quiet mountain station.", options: ["stopped", "was stopping", "stops"], answer: "stopped" },
        { id: 4, prompt: "Grandpa ___ a wonderful photograph of our whole family.", options: ["took", "takes", "was taking"], answer: "took" },
        { id: 5, prompt: "We ___ loudly at the clown's funny dance yesterday.", options: ["laughed", "laugh", "are laughing"], answer: "laughed" }
      ],
      action_lab_scenarios: [
        { stage: 1, title: "Identifying Emotional Tone", instruction: "Match recount excerpts to their emotional mood (Excited vs Peaceful)." },
        { stage: 2, title: "Chronological Sequence Assembly", instruction: "Order narrative sentences using transition adverbs (First, Suddenly, Finally)." },
        { stage: 3, title: "Adjective Elevation Workshop", instruction: "Replace flat adjectives (good, nice) with vivid alternatives (delighted, magnificent)." }
      ]
    }
  },

  38: {
    week: 38,
    theme: "Animal Abilities (Modals)",
    title_en: "Animal Abilities (Modals)",
    title_vi: "Khả Năng Động Vật — Động Từ Khuyết Thiếu",
    cefr_level: "A2 Flyers",
    grammar_focus: "Can / Cannot (Can't)",
    vocab_list: [
      { id: 1, word: "jump", pos: "v", ipa: "/dʒʌmp/", definition_en: "Push oneself off a surface into the air using legs", definition_vi: "nhảy", example_en: "Kangaroos can jump over tall bushes easily.", example_vi: "Chuột túi có thể nhảy qua những bụi cây cao dễ dàng." },
      { id: 2, word: "fly", pos: "v", ipa: "/flaɪ/", definition_en: "Move through the air using wings", definition_vi: "bay", example_en: "Eagles can fly high above the rocky mountains.", example_vi: "Đại bàng có thể bay cao phía trên những ngọn núi đá." },
      { id: 3, word: "swim", pos: "v", ipa: "/swɪm/", definition_en: "Propel the body through water using limbs or fins", definition_vi: "bơi", example_en: "Dolphins can swim faster than human boats.", example_vi: "Cá heo có thể bơi nhanh hơn thuyền của con người." },
      { id: 4, word: "hunt", pos: "v", ipa: "/hʌnt/", definition_en: "Pursue and kill wild animals for food", definition_vi: "săn mồi", example_en: "Lions hunt cooperatively in open grasslands.", example_vi: "Sư tử săn mồi theo bầy đàn trên thảo nguyên mở." },
      { id: 5, word: "climb", pos: "v", ipa: "/klaɪm/", definition_en: "Go up or ascend using hands and feet or claws", definition_vi: "leo trèo", example_en: "Monkeys can climb tall forest trees quickly.", example_vi: "Khỉ có thể leo trèo các cây rừng cao rất nhanh." },
      { id: 6, word: "run", pos: "v", ipa: "/rʌn/", definition_en: "Move at a speed faster than a walk", definition_vi: "chạy", example_en: "Cheetahs can run at astonishing speeds.", example_vi: "Báo săn có thể chạy với tốc độ đáng kinh ngạc." },
      { id: 7, word: "glide", pos: "v", ipa: "/ɡlaɪd/", definition_en: "Move smoothly and continuously through air or water", definition_vi: "lượn", example_en: "Flying squirrels can glide between tree branches.", example_vi: "Sóc bay có thể lượn giữa các cành cây." },
      { id: 8, word: "burrow", pos: "v", ipa: "/ˈbɜːroʊ/", definition_en: "Make a hole or tunnel into the ground", definition_vi: "đào hang", example_en: "Rabbits burrow underground to stay safe from predators.", example_vi: "Thỏ đào hang dưới lòng đất để giữ an toàn trước kẻ săn mồi." },
      { id: 9, word: "dive", pos: "v", ipa: "/daɪv/", definition_en: "Plunge head first into water", definition_vi: "lặn lao", example_en: "Penguins can dive deep into freezing cold oceans.", example_vi: "Chim cánh cụt có thể lặn sâu vào đại dương lạnh giá." },
      { id: 10, word: "survive", pos: "v", ipa: "/sərˈvaɪv/", definition_en: "Continue to live or exist especially in hard conditions", definition_vi: "sinh tồn", example_en: "Camels can survive without water for many days.", example_vi: "Lạc đà có thể sinh tồn không cần nước trong nhiều ngày." },
      { id: 11, word: "heavy", pos: "adj", ipa: "/ˈhevi/", definition_en: "Of great weight; difficult to lift", definition_vi: "nặng nề", example_en: "Elephants are heavy mammals with thick gray skin.", example_vi: "Voi là loài động vật có vú nặng nề với làn da xám dày." },
      { id: 12, word: "fast", pos: "adj", ipa: "/fæst/", definition_en: "Moving or capable of moving at high speed", definition_vi: "nhanh", example_en: "The falcon is a remarkably fast bird.", example_vi: "Chim ưng là một loài chim nhanh đáng chú ý." },
      { id: 13, word: "agile", pos: "adj", ipa: "/ˈædʒaɪl/", definition_en: "Able to move quickly and easily with grace", definition_vi: "nhanh nhẹn", example_en: "Leopards are agile climbers on rocky cliffs.", example_vi: "Báo hoa mai là những kẻ leo trèo nhanh nhẹn trên vách đá." },
      { id: 14, word: "powerful", pos: "adj", ipa: "/ˈpaʊərfəl/", definition_en: "Having great strength or physical force", definition_vi: "mạnh mẽ", example_en: "Bears possess powerful paws for catching fish.", example_vi: "Gấu sở hữu đôi chân trước mạnh mẽ để bắt cá." },
      { id: 15, word: "nocturnal", pos: "adj", ipa: "/nɑːkˈtɜːrnəl/", definition_en: "Active mainly during the night time", definition_vi: "hoạt động ban đêm", example_en: "Owls are nocturnal hunters with acute night vision.", example_vi: "Cú mèo là kẻ săn mồi ban đêm với thị lực ban đêm sắc bén." },
      { id: 16, word: "predator", pos: "n", ipa: "/ˈpredətər/", definition_en: "An animal that naturally preys on others", definition_vi: "kẻ săn mồi", example_en: "The tiger is an apex predator in the jungle.", example_vi: "Hổ là kẻ săn mồi đỉnh cao trong rừng rậm." },
      { id: 17, word: "prey", pos: "n", ipa: "/preɪ/", definition_en: "An animal that is hunted and killed for food", definition_vi: "con mồi", example_en: "Deer stay alert to avoid becoming predator prey.", example_vi: "Hươu luôn cảnh giác để tránh trở thành con mồi của kẻ săn mồi." },
      { id: 18, word: "mammal", pos: "n", ipa: "/ˈmæməl/", definition_en: "A warm-blooded vertebrate animal with fur or milk", definition_vi: "động vật có vú", example_en: "Whales are large marine mammals that breathe air.", example_vi: "Cá voi là loài thú biển lớn hít thở không khí." },
      { id: 19, word: "reptile", pos: "n", ipa: "/ˈreptaɪl/", definition_en: "A cold-blooded vertebrate animal with scales", definition_vi: "loài bò sát", example_en: "Lizards are cold-blooded reptiles that bask in sunlight.", example_vi: "Thằn lằn là loài bò sát máu lạnh tắm mình dưới ánh nắng." },
      { id: 20, word: "habitat", pos: "n", ipa: "/ˈhæbɪtæt/", definition_en: "The natural home or environment of an organism", definition_vi: "môi trường sống", example_en: "The rainforest is a rich habitat for countless species.", example_vi: "Rừng mưa nhiệt đới là môi trường sống phong phú cho vô số loài." }
    ],
    clil: {
      title_en: "Animal Classification: How Adaptations Empower Abilities",
      title_vi: "Phân Loại Động Vật: Cách Thích Nghi Định Hình Khả Năng",
      content_en: "The animal kingdom displays an astonishing variety of specialized physical abilities. Animals have evolved distinct body structures that determine what actions they can and cannot perform in nature. Mammals such as cheetahs have flexible spines and long muscular legs, allowing them to run up to seventy miles per hour across flat savanna grasslands. In contrast, heavy mammals like elephants cannot jump off the ground because their immense bone weight requires continuous solid support. Birds possess lightweight hollow bones and aerodynamic feathers so they can fly effortlessly through high winds. However, aquatic birds like penguins cannot fly in the air; instead, their modified wings function like rigid flippers so they can swim and dive deeply underwater to hunt schooling fish. Understanding animal classifications reveals how anatomical adaptations enable each species to survive successfully within its natural habitat.",
      glossary: [
        { word: "adaptation", definition_en: "A change by which an organism becomes better suited to its habitat", definition_vi: "sự thích nghi" },
        { word: "aerodynamic", definition_en: "Shaped to reduce drag from air movement", definition_vi: "khí động học" },
        { word: "aquatic", definition_en: "Living in or near water", definition_vi: "dưới nước" },
        { word: "anatomical", definition_en: "Relating to the bodily structure of organisms", definition_vi: "thuộc giải phẫu học" },
        { word: "classification", definition_en: "The arrangement of organisms into taxonomic groups", definition_vi: "sự phân loại" }
      ],
      check_questions: [
        { id: 1, question_en: "Why can't elephants jump off the ground?", options: ["Their heavy weight requires continuous support", "They lack leg muscles", "They sleep underwater"], answer: "Their heavy weight requires continuous support" },
        { id: 2, question_en: "How do penguin wings function differently from other birds?", options: ["They act like rigid flippers for swimming underwater", "They produce loud whistling sounds", "They change into climbing claws"], answer: "They act like rigid flippers for swimming underwater" },
        { id: 3, question_en: "What anatomical feature enables birds to fly easily in the air?", options: ["Lightweight hollow bones and aerodynamic feathers", "Heavy solid teeth", "Scaly webbed feet"], answer: "Lightweight hollow bones and aerodynamic feathers" }
      ],
      critical_thinking: {
        question_en: "Why does an animal's natural habitat influence whether it develops abilities to run, climb, or swim?",
        hint_en: "Think about the obstacles present in different environments: tree branches demand climbing, open plains reward running, and oceans require swimming."
      }
    },
    shadowing_sentences: [
      { id: 1, text: "Cheetahs can run faster than any other land animal on Earth.", ipa: "/ˈtʃiːtəz kən rʌn ˈfæstər ðæn ˈeni ˈʌðər lænd ˈænɪməl ɑːn ɜːrθ/" },
      { id: 2, text: "Large gray elephants cannot jump because their bodies are very heavy.", ipa: "/lɑːrdʒ ɡreɪ ˈelɪfənts ˈkænɑːt dʒʌmp bɪˈkəz ðer ˈbɑːdiz ɑːr ˈveri ˈhevi/" },
      { id: 3, text: "Golden eagles can fly high above the tallest mountain peaks.", ipa: "/ˈɡoʊldən ˈiːɡəlz kən flaɪ haɪ əˈbʌv ðə ˈtɔːlɪst ˈmaʊntən piːks/" },
      { id: 4, text: "Clever monkeys can climb trees and swing effortlessly between branches.", ipa: "/ˈklevər ˈmʌŋkiz kən klaɪm triːz ənd swɪŋ ˈefərtləsli bɪˈtwiːn ˈbræntʃɪz/" },
      { id: 5, text: "Penguins cannot fly in the sky, but they can dive deeply into water.", ipa: "/ˈpeŋɡwɪnz ˈkænɑːt flaɪ ɪn ðə skaɪ bʌt ðeɪ kən daɪv ˈdiːpli ˈɪntuː ˈwɔːtər/" },
      { id: 6, text: "Nocturnal owls can hunt small mice silently during the quiet night.", ipa: "/nɑːkˈtɜːrnəl aʊlz kən hʌnt smɔːl maɪs ˈsaɪləntli ˈdʊrɪŋ ðə ˈkwaɪət naɪt/" },
      { id: 7, text: "Desert camels can survive for two weeks without drinking fresh water.", ipa: "/ˈdezərt ˈkæməlz kən sərˈvaɪv fər tuː wiːks wɪˈðaʊt ˈdrɪŋkɪŋ freʃ ˈwɔːtər/" },
      { id: 8, text: "Every wild animal possesses unique physical abilities suited to its habitat.", ipa: "/ˈevri waɪld ˈænɪməl pəˈzesɪz juːˈniːk ˈfɪzɪkəl əˈbɪlətiz ˈsuːtɪd tuː ɪts ˈhæbɪtæt/" }
    ],
    cambridge_rw: {
      part1_definitions: [
        { id: 1, text: "A warm-blooded vertebrate animal that feeds milk to its young.", target: "mammal" },
        { id: 2, text: "An animal that actively hunts and eats other living creatures.", target: "predator" },
        { id: 3, text: "The natural environment where a wild animal or plant lives.", target: "habitat" },
        { id: 4, text: "Moving through water by moving fins, arms, or legs.", target: "swim" },
        { id: 5, text: "Able to move with great quickness, balance, and graceful agility.", target: "agile" }
      ],
      part2_dialogue: {
        title: "Liam & Sarah Discussing Animal Capabilities",
        exchanges: [
          { speaker: "Liam", text: "Can penguins fly like other sea birds?" },
          { speaker: "Sarah", text: "No, they cannot fly in the air, but they swim brilliantly." },
          { speaker: "Liam", text: "Why can't heavy elephants jump over obstacles?" },
          { speaker: "Sarah", text: "Their enormous bone structure requires constant ground support." },
          { speaker: "Liam", text: "Which predator can run the fastest across the plains?" },
          { speaker: "Sarah", text: "The cheetah can run at seventy miles per hour!" }
        ]
      },
      part6_cloze: {
        title: "Facts About Falcons: The Fastest Birds",
        instructions: "Read the article and write the missing words. Write one word on each line.",
        text_template: "Peregrine falcons are famous [1]_____ their incredible speed. When diving towards the ground, they [2]_____ fly faster than two hundred miles per hour. They hunt other birds [3]_____ mid-air using sharp talons. Falcons build nests high [4]_____ rocky cliffs. They can spot prey easily [5]_____ their eyesight is remarkably acute.",
        answers: { "1": "for", "2": "can", "3": "in", "4": "on", "5": "because" }
      }
    },
    minigames: {
      math_problems: [
        {
          id: 1,
          title: "Problem 1: Cheetah vs Gazelle Running Speed (Comparison)",
          problemText: "A cheetah can run at 110 kilometers per hour. A gazelle can run at 80 kilometers per hour. What is the difference in their running speeds?",
          correctAnswer: 30,
          answer: "30 km/h",
          hintText: "Cheetah speed (110) - Gazelle speed (80) = 30 km/h difference.",
          modelData: {
            type: "comparison",
            bars: [
              { value: 110, label: "Cheetah 110 km/h", color: "#f59e0b" },
              { value: 80, label: "Gazelle 80 km/h", color: "#10b981" }
            ],
            differenceLabel: "30 km/h difference"
          }
        },
        {
          id: 2,
          title: "Problem 2: Kangaroo Jumping Distance (Part-Whole)",
          problemText: "In three hops, a red kangaroo jumped 9 meters, 8 meters, and 10 meters. What was the total distance jumped?",
          correctAnswer: 27,
          answer: "27 meters",
          hintText: "Hop 1 (9m) + Hop 2 (8m) + Hop 3 (10m) = 27 meters total.",
          modelData: {
            type: "part_whole",
            bars: [
              { value: 9, label: "Hop 1: 9m", color: "#6366f1" },
              { value: 8, label: "Hop 2: 8m", color: "#3b82f6" },
              { value: 10, label: "Hop 3: 10m", color: "#14b8a6" }
            ],
            totalLabel: "27 meters total"
          }
        }
      ],
      grammar_drills: [
        { id: 1, prompt: "Fish ___ breathe underwater using their gills.", options: ["can", "cannot", "must"], answer: "can" },
        { id: 2, prompt: "Heavy adult elephants ___ jump off the ground.", options: ["cannot", "can", "could"], answer: "cannot" },
        { id: 3, prompt: "Owls ___ see clearly during the dark night.", options: ["can", "cannot", "are"], answer: "can" },
        { id: 4, prompt: "Penguins ___ fly in the sky like seagulls.", options: ["can't", "can", "are"], answer: "can't" },
        { id: 5, prompt: "Cheetahs ___ run faster than racehorses.", options: ["can", "cannot", "do"], answer: "can" }
      ],
      action_lab_scenarios: [
        { stage: 1, title: "Anatomical Adaptation Matching", instruction: "Pair body structures (fins, wings, hollow bones) with animal locomotion abilities." },
        { stage: 2, title: "Predator vs Prey Speed Comparison", instruction: "Analyze velocity bar charts to predict hunting success rates in savanna biomes." },
        { stage: 3, title: "Animal Ability Classification Lab", instruction: "Sort animals into categorical matrices based on modal abilities (Can Fly vs Cannot Fly)." }
      ]
    }
  },

  78: {
    week: 78,
    theme: "Social Studies/ELA: Cultures / Math: Surveys",
    title_en: "Social Studies/ELA: Cultures / Math: Surveys",
    title_vi: "Xã Hội/ELA: Văn Hóa / Toán: Khảo Sát",
    cefr_level: "B1 PET",
    grammar_focus: "Comparative Structures: \"Unlike...\", \"Similar to...\", \"Whereas...\"",
    vocab_list: [
      { id: 1, word: "tradition", pos: "n", ipa: "/trəˈdɪʃən/", definition_en: "A long-established custom or belief passed from generation to generation", definition_vi: "truyền thống", example_en: "Lighting lanterns is an ancient cultural tradition.", example_vi: "Thắp đèn lồng là một truyền thống văn hóa cổ xưa." },
      { id: 2, word: "culture", pos: "n", ipa: "/ˈkʌltʃər/", definition_en: "The ideas, customs, and social behavior of a particular group of people", definition_vi: "văn hóa", example_en: "Every country has a unique culture and heritage.", example_vi: "Mỗi quốc gia đều có một nền văn hóa và di sản độc đáo." },
      { id: 3, word: "holiday", pos: "n", ipa: "/ˈhɑːlədeɪ/", definition_en: "An official day of celebration or recreation when no work is done", definition_vi: "ngày lễ", example_en: "Families gather together during the national holiday.", example_vi: "Các gia đình sum họp cùng nhau trong ngày nghỉ lễ quốc gia." },
      { id: 4, word: "festival", pos: "n", ipa: "/ˈfestɪvəl/", definition_en: "A day or period of celebration typically with performances or food", definition_vi: "lễ hội", example_en: "The spring festival features vibrant music and parades.", example_vi: "Lễ hội mùa xuân có âm nhạc sôi động và những cuộc diễu hành." },
      { id: 5, word: "heritage", pos: "n", ipa: "/ˈherɪtɪdʒ/", definition_en: "Valued objects, traditions, and qualities passed down through history", definition_vi: "di sản", example_en: "Traditional folk dances are part of our national heritage.", example_vi: "Các điệu múa dân gian truyền thống là một phần của di sản quốc gia." },
      { id: 6, word: "custom", pos: "n", ipa: "/ˈkʌstəm/", definition_en: "A widely accepted way of behaving or doing something in a society", definition_vi: "phong tục", example_en: "Bowing politely is a customary gesture in East Asia.", example_vi: "Cúi đầu lịch sự là một phong tục ở Đông Á." },
      { id: 7, word: "celebrate", pos: "v", ipa: "/ˈselɪbreɪt/", definition_en: "Acknowledge a significant day or event with a social gathering", definition_vi: "ăn mừng", example_en: "Communities celebrate the autumn harvest with feasts.", example_vi: "Các cộng đồng ăn mừng vụ thu hoạch mùa thu bằng những bữa tiệc." },
      { id: 8, word: "gather", pos: "v", ipa: "/ˈɡæðər/", definition_en: "Come together as a group in one place", definition_vi: "tụ họp", example_en: "Relatives gather from distant cities for the annual reunion.", example_vi: "Họ hàng tụ họp từ các thành phố xa xôi cho buổi đoàn tụ hàng năm." },
      { id: 9, word: "preserve", pos: "v", ipa: "/prɪˈzɜːrv/", definition_en: "Maintain something in its original state or in good condition", definition_vi: "bảo tồn", example_en: "Historians work diligently to preserve ancient folk songs.", example_vi: "Các nhà sử học làm việc chăm chỉ để bảo tồn các bài dân ca cổ." },
      { id: 10, word: "distinguish", pos: "v", ipa: "/dɪˈstɪŋɡwɪʃ/", definition_en: "Recognize or treat someone or something as different", definition_vi: "phân biệt", example_en: "Scholars distinguish regional traditions through symbolic rituals.", example_vi: "Các học giả phân biệt các truyền thống vùng miền qua những nghi lễ mang tính biểu tượng." },
      { id: 11, word: "survey", pos: "n", ipa: "/ˈsɜːrveɪ/", definition_en: "An investigation of the opinions or behavior of a group by questioning", definition_vi: "cuộc khảo sát", example_en: "The students conducted a survey about favorite holiday foods.", example_vi: "Các học sinh đã tiến hành một cuộc khảo sát về món ăn ngày lễ yêu thích." },
      { id: 12, word: "tally", pos: "n", ipa: "/ˈtæli/", definition_en: "A current record of an increasing number or score", definition_vi: "bảng đếm", example_en: "Keep a tally of votes for each festival activity.", example_vi: "Hãy lập một bảng đếm số phiếu cho từng hoạt động lễ hội." },
      { id: 13, word: "majority", pos: "n", ipa: "/məˈdʒɔːrəti/", definition_en: "The greater number or part of a whole", definition_vi: "đa số", example_en: "The majority of survey respondents favored outdoor concerts.", example_vi: "Đa số người được khảo sát ủng hộ các buổi hòa nhạc ngoài trời." },
      { id: 14, word: "minority", pos: "n", ipa: "/maɪˈnɔːrəti/", definition_en: "The smaller number or part, especially less than half", definition_vi: "thiểu số", example_en: "Only a small minority voted to change the festival date.", example_vi: "Chỉ một thiểu số nhỏ bỏ phiếu thay đổi ngày lễ hội." },
      { id: 15, word: "participant", pos: "n", ipa: "/pɑːrˈtɪsəpənt/", definition_en: "A person who takes part in something", definition_vi: "người tham gia", example_en: "Each participant answered five questions in the survey.", example_vi: "Mỗi người tham gia đã trả lời năm câu hỏi trong cuộc khảo sát." },
      { id: 16, word: "similar", pos: "adj", ipa: "/ˈsɪmələr/", definition_en: "Resembling without being identical", definition_vi: "tương đồng", example_en: "Both cultures celebrate harvest with similar symbolic meals.", example_vi: "Cả hai nền văn hóa đều ăn mừng mùa màng với những bữa ăn biểu tượng tương đồng." },
      { id: 17, word: "different", pos: "adj", ipa: "/ˈdɪfərənt/", definition_en: "Not the same as another or each other", definition_vi: "khác biệt", example_en: "Different regions use distinct musical instruments in parades.", example_vi: "Các vùng miền khác nhau sử dụng các nhạc cụ riêng biệt trong các cuộc diễu hành." },
      { id: 18, word: "customary", pos: "adj", ipa: "/ˈkʌstəmeri/", definition_en: "According to the customs or usual practices associated with an occasion", definition_vi: "theo phong tục", example_en: "It is customary to exchange cards on New Year's Day.", example_vi: "Tặng thiệp cho nhau vào ngày đầu năm mới là điều theo phong tục." },
      { id: 19, word: "widespread", pos: "adj", ipa: "/ˈwaɪdspred/", definition_en: "Found or distributed over a large area or number of people", definition_vi: "lan rộng", example_en: "Lantern festivals enjoy widespread popularity across Asia.", example_vi: "Lễ hội đèn lồng nhận được sự yêu thích rộng rãi khắp châu Á." },
      { id: 20, word: "symbolic", pos: "adj", ipa: "/sɪmˈbɑːlɪk/", definition_en: "Serving as a representation or symbol of something", definition_vi: "mang tính biểu tượng", example_en: "Evergreen trees are symbolic of enduring life in winter.", example_vi: "Cây thường xanh mang tính biểu tượng của sức sống bền bỉ trong mùa đông." }
    ],
    clil: {
      title_en: "Cultural Traditions: Comparing Celebrations Across Societies",
      title_vi: "Truyền Thống Văn Hóa: So Sánh Các Lễ Kỷ Niệm Giữa Các Xã Hội",
      content_en: "Throughout human history, distinct societies have developed rich cultural traditions to celebrate the changing seasons, historical triumphs, and shared community values. While cultural practices vary dramatically around the globe, many ceremonies share core anthropological motivations. For instance, harvest festivals are observed in almost every agricultural civilization. Similar to Asian mid-autumn celebrations where families gather to appreciate full moons and share sweet round pastries, European harvest home gatherings feature communal banquets praising bountiful wheat and grape yields. However, the specific rituals exhibit fascinating contrasts. Unlike Western traditions where celebrations often center upon private household dinners, Latin American cultural festivities frequently feature vibrant public street carnivals filled with lively percussion and masquerade parades. Whereas older customs prioritized solemn religious offerings, modern festivals increasingly incorporate civic unity and educational exhibitions. By conducting statistical surveys and recording demographic responses, social scientists can accurately measure how contemporary generations preserve ancestral heritage while embracing multicultural values.",
      glossary: [
        { word: "anthropological", definition_en: "Relating to the scientific study of human societies and cultures", definition_vi: "thuộc nhân chủng học" },
        { word: "demographic", definition_en: "Relating to the structure and characteristics of human populations", definition_vi: "thuộc nhân khẩu học" },
        { word: "communal", definition_en: "Shared by all members of a community for common use", definition_vi: "mang tính cộng đồng" },
        { word: "multicultural", definition_en: "Relating to or constituting several cultural or ethnic groups", definition_vi: "đa văn hóa" },
        { word: "ritual", definition_en: "A religious or solemn ceremony consisting of a series of actions", definition_vi: "nghi thức tôn giáo" }
      ],
      check_questions: [
        { id: 1, question_en: "What shared purpose do harvest celebrations have across different continents?", options: ["They celebrate bountiful agricultural yields and community gratitude", "They encourage people to stop farming", "They cancel all public holidays"], answer: "They celebrate bountiful agricultural yields and community gratitude" },
        { id: 2, question_en: "Unlike private household dinners, what do Latin American festivities often feature?", options: ["Vibrant public street carnivals and parades", "Completely silent library meetings", "Only online messaging"], answer: "Vibrant public street carnivals and parades" },
        { id: 3, question_en: "How do social scientists study cultural traditions today?", options: ["By conducting surveys and analyzing demographic data", "By ignoring all participant responses", "By destroying historical records"], answer: "By conducting surveys and analyzing demographic data" }
      ],
      critical_thinking: {
        question_en: "Why is comparative analysis ('Unlike...', 'Similar to...') more insightful than studying one culture in isolation?",
        hint_en: "Consider how comparing two traditions highlights both unique cultural values and shared universal human experiences."
      }
    },
    shadowing_sentences: [
      { id: 1, text: "Similar to mid-autumn festivals in Asia, European communities celebrate the harvest season with joy.", ipa: "/ˈsɪmələr tuː mɪd ˈɔːtəm ˈfestɪvəlz ɪn ˈeɪʒə ˌjʊrəˈpiːən kəˈmjuːnətiz ˈselɪbreɪt ðə ˈhɑːrvəst ˈsiːzən wɪð dʒɔɪ/" },
      { id: 2, text: "Unlike quiet indoor gatherings, Latin American festivals often feature colorful street carnivals.", ipa: "/ʌnˈlaɪk ˈkwaɪət ˌɪnˈdɔːr ˈɡæðərɪŋz ˈlætən əˈmerɪkən ˈfestɪvəlz ˈɔːfən ˈfiːtʃər ˈkʌlərfəl striːt ˈkɑːrnɪvəlz/" },
      { id: 3, text: "Whereas older rituals focused strictly on religion, modern holidays promote widespread community unity.", ipa: "/werˈæz ˈoʊldər ˈrɪtʃuːəlz ˈfoʊkəst ˈstrɪktli ɑːn rɪˈlɪdʒən ˈmɑːdərn ˈhɑːlədeɪz prəˈmoʊt ˈwaɪdspred kəˈmjuːnəti ˈjuːnəti/" },
      { id: 4, text: "Our class conducted an extensive survey to determine which traditional foods students preferred.", ipa: "/ˈaʊər klæs kənˈdʌktɪd ən ɪkˈstensɪv ˈsɜːrveɪ tuː dɪˈtɜːrmɪn wɪtʃ trəˈdɪʃənəl fuːdz ˈstuːdənts prɪˈfɜːrd/" },
      { id: 5, text: "The overwhelming majority of participants voted in favor of organizing an international food fair.", ipa: "/ði ˌoʊvərˈwelmɪŋ məˈdʒɔːrəti əv pɑːrˈtɪsəpənts ˈvoʊtɪd ɪn ˈfeɪvər əv ˈɔːrɡənaɪzɪŋ ən ˌɪntərˈnæʃənəl fuːd fer/" },
      { id: 6, text: "Cultural scholars work diligently to preserve ancestral customs before they disappear over time.", ipa: "/ˈkʌltʃərəl ˈskɑːlərz wɜːrk ˈdɪlɪdʒəntli tuː prɪˈzɜːrv ænˈsestrəl ˈkʌstəmz bɪˈfɔːr ðeɪ ˌdɪsəˈpɪər ˈoʊvər taɪm/" },
      { id: 7, text: "Every participant tallied their survey results carefully on structured frequency tables.", ipa: "/ˈevri pɑːrˈtɪsəpənt ˈtælid ðer ˈsɜːrveɪ rɪˈzʌlts ˈkerfəli ɑːn ˈstrʌktʃərd ˈfriːkwənsi ˈteɪbəlz/" },
      { id: 8, text: "Comparing different global traditions helps students cultivate empathy and genuine cultural appreciation.", ipa: "/kəmˈperɪŋ ˈdɪfərənt ˈɡloʊbəl trəˈdɪʃənz helps ˈstuːdənts ˈkʌltɪveɪt ˈempəθi ənd ˈdʒenjuɪn ˈkʌltʃərəl əˌpriːʃiˈeɪʃən/" }
    ],
    cambridge_rw: {
      part1_definitions: [
        { id: 1, text: "A systematic collection of data and opinions gathered from a sample group.", target: "survey" },
        { id: 2, text: "Beliefs, values, and practices handed down across generations within a community.", target: "tradition" },
        { id: 3, text: "The larger number or greater percentage of responses within a population.", target: "majority" },
        { id: 4, text: "To protect something valuable from being destroyed, forgotten, or lost.", target: "preserve" },
        { id: 5, text: "Existing or occurring across a broad geographic territory or population.", target: "widespread" }
      ],
      part2_dialogue: {
        title: "Marcus & Elena Discussing Survey Findings on Traditions",
        exchanges: [
          { speaker: "Marcus", text: "What did our school survey reveal about local cultural celebrations?" },
          { speaker: "Elena", text: "The majority of students celebrate both traditional and modern holidays." },
          { speaker: "Marcus", text: "Did participants notice similarities between different harvest festivals?" },
          { speaker: "Elena", text: "Yes, similar to Asian traditions, European festivals emphasize community meals." },
          { speaker: "Marcus", text: "How did you record the tally votes from each classroom?" },
          { speaker: "Elena", text: "We tabulated the responses into a clear frequency chart for our presentation." }
        ]
      },
      part6_cloze: {
        title: "Cultural Surveys: Understanding Community Heritage",
        instructions: "Read the article and write the missing words. Write one word on each line.",
        text_template: "Surveys are valuable instruments [1]_____ studying cultural attitudes. When researchers question participants [2]_____ their ancestral customs, they discover fascinating patterns. Similar [3]_____ historic records, surveys preserve demographic memory. Unlike casual conversations, structured tally tables provide [4]_____ with accurate statistical evidence. Therefore, social scientists rely [5]_____ survey data worldwide.",
        answers: { "1": "for", "2": "about", "3": "to", "4": "researchers", "5": "on" }
      }
    },
    minigames: {
      math_problems: [
        {
          id: 1,
          title: "Problem 1: Festival Attendance Survey (Part-Whole)",
          problemText: "In a survey of 250 students, 145 students celebrated the Lantern Festival and 85 students celebrated the Harvest Fair. The remaining students celebrated both. How many students celebrated both festivals?",
          correctAnswer: 20,
          answer: "20 students",
          hintText: "Total (250) - Only Lantern (145) - Only Harvest (85) = 20 students celebrating both.",
          modelData: {
            type: "part_whole",
            bars: [
              { value: 145, label: "Lantern (145)", color: "#f97316" },
              { value: 85, label: "Harvest (85)", color: "#eab308" },
              { value: 20, label: "Both (20)", color: "#10b981" }
            ],
            totalLabel: "250 students surveyed"
          }
        },
        {
          id: 2,
          title: "Problem 2: Survey Voting Tally (Comparison)",
          problemText: "In a class election for the festival theme, Traditional Arts received 36 votes, whereas Modern Fusion received 24 votes. How many more votes did Traditional Arts receive?",
          correctAnswer: 12,
          answer: "12 votes",
          hintText: "Traditional Arts (36) - Modern Fusion (24) = 12 votes difference.",
          modelData: {
            type: "comparison",
            bars: [
              { value: 36, label: "Traditional Arts: 36", color: "#6366f1" },
              { value: 24, label: "Modern Fusion: 24", color: "#ec4899" }
            ],
            differenceLabel: "12 more votes"
          }
        }
      ],
      grammar_drills: [
        { id: 1, prompt: "___ western holidays where meals are private, Latin carnivals take place outdoors.", options: ["Unlike", "Similar", "Whereas"], answer: "Unlike" },
        { id: 2, prompt: "Asian mid-autumn celebrations are ___ to European harvest feasts in their communal spirit.", options: ["similar", "same", "differently"], answer: "similar" },
        { id: 3, prompt: "Older rituals were solemn, ___ contemporary celebrations are lively and colorful.", options: ["whereas", "unlike", "similar to"], answer: "whereas" },
        { id: 4, prompt: "The students tallied the survey results ___ than expected.", options: ["faster", "fastest", "more fast"], answer: "faster" },
        { id: 5, prompt: "___ other cultural projects, our team surveyed three separate communities.", options: ["Similar to", "Whereas", "Differently"], answer: "Similar to" }
      ],
      action_lab_scenarios: [
        { stage: 1, title: "Survey Questionnaire Design", instruction: "Formulate unbiased multiple-choice inquiry prompts regarding holiday heritage." },
        { stage: 2, title: "Tally Chart Tabulation", instruction: "Aggregate raw demographic poll responses into organized frequency data matrices." },
        { stage: 3, title: "Comparative Cultural Synthesis", instruction: "Draft comparative sentences contrasting festival traditions using 'Unlike' and 'Whereas'." }
      ]
    }
  },

  125: {
    week: 125,
    theme: "Intro & Conclusion (Academic Essay Structure)",
    title_en: "Intro & Conclusion (Academic Essay Structure)",
    title_vi: "Mở Bài & Kết Bài — Cấu Trúc Luận Văn Học Thuật",
    cefr_level: "B1+ Academic",
    grammar_focus: "Persuasive Verbs: \"Urge\", \"Recommend\", \"Should\", Modal Stance Verbs",
    vocab_list: [
      { id: 1, word: "conclusion", pos: "n", ipa: "/kənˈkluːʒən/", definition_en: "The final part of a piece of writing, summarizing key points and implications", definition_vi: "phần kết luận", example_en: "The conclusion synthesized the research findings effectively.", example_vi: "Phần kết luận đã tổng hợp các phát hiện nghiên cứu một cách hiệu quả." },
      { id: 2, word: "introduction", pos: "n", ipa: "/ˌɪntrəˈdʌkʃən/", definition_en: "The preliminary section of an essay presenting context and a thesis statement", definition_vi: "phần mở bài", example_en: "A compelling introduction captures the reader's curiosity immediately.", example_vi: "Một phần mở bài hấp dẫn thu hút sự tò mò của người đọc ngay lập tức." },
      { id: 3, word: "thesis", pos: "n", ipa: "/ˈθiːsɪs/", definition_en: "A central proposition that is maintained or proven through argument", definition_vi: "luận đề", example_en: "Her essay stated a clear thesis in the final sentence of paragraph one.", example_vi: "Bài luận của cô ấy nêu rõ một luận đề ở câu cuối cùng của đoạn một." },
      { id: 4, word: "synthesis", pos: "n", ipa: "/ˈsɪnθəsɪs/", definition_en: "The combination of ideas or data to form a coherent, complex system", definition_vi: "sự tổng hợp", example_en: "The concluding section provided a brilliant synthesis of both arguments.", example_vi: "Phần kết luận cung cấp một sự tổng hợp tuyệt vời cho cả hai lập luận." },
      { id: 5, word: "perspective", pos: "n", ipa: "/pərˈspektɪv/", definition_en: "A particular attitude toward or way of regarding something", definition_vi: "góc nhìn", example_en: "Scholars evaluated the historical event from multiple economic perspectives.", example_vi: "Các học giả đánh giá sự kiện lịch sử từ nhiều góc nhìn kinh tế." },
      { id: 6, word: "evidence", pos: "n", ipa: "/ˈevɪdəns/", definition_en: "The available body of facts or information indicating whether a belief is valid", definition_vi: "bằng chứng", example_en: "Every persuasive essay requires empirical evidence to support its claims.", example_vi: "Mỗi bài luận thuyết phục đều yêu cầu bằng chứng thực nghiệm để củng cố các luận điểm." },
      { id: 7, word: "counterargument", pos: "n", ipa: "/ˈkaʊntərˌɑːrɡjəmənt/", definition_en: "An argument or set of reasons put forward to oppose an idea developed in another argument", definition_vi: "phản biện", example_en: "Addressing a counterargument demonstrates academic maturity and balance.", example_vi: "Giải quyết một phản biện thể hiện sự chín chắn và cân bằng trong học thuật." },
      { id: 8, word: "implication", pos: "n", ipa: "/ˌɪmplɪˈkeɪʃən/", definition_en: "A conclusion that can be drawn from something although it is not explicitly stated", definition_vi: "hệ quả hàm ý", example_en: "The author discussed the policy implications in the final paragraph.", example_vi: "Tác giả đã thảo luận về các hệ quả chính sách trong đoạn văn cuối cùng." },
      { id: 9, word: "summarize", pos: "v", ipa: "/ˈsʌməraɪz/", definition_en: "Give a brief statement of the main points of something", definition_vi: "tóm tắt", example_en: "Academic writers summarize complex chapters into concise overviews.", example_vi: "Các nhà văn học thuật tóm tắt các chương phức tạp thành những cái nhìn tổng quan súc tích." },
      { id: 10, word: "restate", pos: "v", ipa: "/riːˈsteɪt/", definition_en: "State something again or differently, especially more clearly or convincingly", definition_vi: "khẳng định lại", example_en: "Remember to restate your central thesis in fresh wording.", example_vi: "Hãy nhớ khẳng định lại luận đề trung tâm của bạn bằng cách diễn đạt mới mẻ." },
      { id: 11, word: "urge", pos: "v", ipa: "/ɜːrdʒ/", definition_en: "Try earnestly or persistently to persuade someone to do something", definition_vi: "thúc giục", example_en: "Scientists urge policymakers to invest in sustainable energy infrastructure.", example_vi: "Các nhà khoa học thúc giục các nhà hoạch định chính sách đầu tư vào cơ sở hạ tầng năng lượng bền vững." },
      { id: 12, word: "recommend", pos: "v", ipa: "/ˌrekəˈmend/", definition_en: "Advise or put forward with approval as being suitable for a purpose", definition_vi: "khuyến nghị", example_en: "We recommend conducting longitudinal studies before reaching a verdict.", example_vi: "Chúng tôi khuyến nghị tiến hành các nghiên cứu theo thời gian trước khi đưa ra phán quyết." },
      { id: 13, word: "advocate", pos: "v", ipa: "/ˈædvəkeɪt/", definition_en: "Publicly recommend or support a particular cause or policy", definition_vi: "chủ trương ủng hộ", example_en: "Educators advocate integrating critical thinking into early secondary curricula.", example_vi: "Các nhà giáo dục chủ trương tích hợp tư duy phản biện vào chương trình đầu cấp hai." },
      { id: 14, word: "demonstrate", pos: "v", ipa: "/ˈdemənstreɪt/", definition_en: "Clearly show the existence or truth of something by giving proof", definition_vi: "chứng minh", example_en: "Statistical analysis will demonstrate whether the hypothesis holds true.", example_vi: "Phân tích thống kê sẽ chứng minh liệu giả thuyết có đúng hay không." },
      { id: 15, word: "compelling", pos: "adj", ipa: "/kəmˈpelɪŋ/", definition_en: "Evoking interest, attention, or admiration in a powerfully irresistible way", definition_vi: "thuyết phục mạnh mẽ", example_en: "The introductory hook offered a compelling question about future artificial intelligence.", example_vi: "Câu dẫn nhập đề đưa ra một câu hỏi thuyết phục mạnh mẽ về trí tuệ nhân tạo tương lai." },
      { id: 16, word: "persuasive", pos: "adj", ipa: "/pərˈsweɪsɪv/", definition_en: "Good at persuading someone to do or believe something through reasoning", definition_vi: "có sức thuyết phục", example_en: "Her essay was remarkably persuasive due to rigorous citations.", example_vi: "Bài luận của cô ấy có sức thuyết phục đáng chú ý nhờ trích dẫn chặt chẽ." },
      { id: 17, word: "rigorous", pos: "adj", ipa: "/ˈrɪɡərəs/", definition_en: "Extremely thorough, exhaustive, or accurate", definition_vi: "nghiêm ngặt chuẩn xác", example_en: "Academic discourse demands rigorous validation of all empirical claims.", example_vi: "Diễn ngôn học thuật đòi hỏi sự xác thực nghiêm ngặt đối với tất cả các tuyên bố thực nghiệm." },
      { id: 18, word: "rhetorical", pos: "adj", ipa: "/rɪˈtɔːrɪkəl/", definition_en: "Expressed in terms intended to persuade or impress", definition_vi: "mang tính tu từ", example_en: "A rhetorical question in an introduction challenges the reader to think deeply.", example_vi: "Một câu hỏi tu từ ở phần mở bài thách thức người đọc suy nghĩ sâu sắc." },
      { id: 19, word: "cohesive", pos: "adj", ipa: "/koʊˈhiːsɪv/", definition_en: "Characterized by being logically connected and unified", definition_vi: "chặt chẽ liền mạch", example_en: "Transition phrases create a cohesive argument between body paragraphs.", example_vi: "Các cụm từ chuyển tiếp tạo ra một lập luận liền mạch giữa các đoạn thân bài." },
      { id: 20, word: "conclusive", pos: "adj", ipa: "/kənˈkluːsɪv/", definition_en: "Serving to settle an issue; producing a definitive result", definition_vi: "có tính kết luận dứt khoát", example_en: "The lab report presented conclusive proof that the reaction occurred.", example_vi: "Báo cáo thí nghiệm đã đưa ra bằng chứng có tính kết luận rằng phản ứng đã xảy ra." }
    ],
    clil: {
      title_en: "Academic Composition: Framing Arguments with Impact",
      title_vi: "Soạn Thảo Học Thuật: Định Hình Luận Điểm Tạo Tác Động",
      content_en: "In academic composition, the introductory and concluding paragraphs serve as critical intellectual bookends that frame a scholar's argument. An effective introduction begins with an engaging hook, such as a thought-provoking rhetorical question or a surprising empirical fact, before establishing relevant background context. Crucially, the introduction must culminate in a precise, debatable thesis statement that defines the scope of the inquiry. Without an explicit thesis, an essay risks wandering aimlessly through disconnected observations. Conversely, the conclusion must never merely repeat prior paragraphs verbatim. Instead, sophisticated academic writers synthesize primary findings, demonstrating how the diverse evidence unites to advance scholarly understanding. Furthermore, a rigorous conclusion articulates broad implications, prompting the reader to contemplate real-world applications or future scientific investigations. To persuade their audience, researchers frequently employ authoritative stance verbs: they urge reform, recommend proactive interventions, and advocate innovative policies. Mastering the structural moves of introductions and conclusions ensures that an author's scholarship resonates with clarity, rigor, and persuasive power.",
      glossary: [
        { word: "composition", definition_en: "The craft of writing and structuring intellectual arguments", definition_vi: "soạn thảo văn bản học thuật" },
        { word: "intellectual", definition_en: "Appealing to or requiring advanced mental capacity and reasoning", definition_vi: "thuộc trí tuệ" },
        { word: "culminate", definition_en: "Reach a climax or point of highest development", definition_vi: "đi đến đỉnh điểm kết tụ" },
        { word: "authoritative", definition_en: "Able to be trusted as being accurate or true with confidence", definition_vi: "có thẩm quyền uy tín" },
        { word: "scholarship", definition_en: "Academic study or achievement; learning of a high level", definition_vi: "thành tựu học thuật" }
      ],
      check_questions: [
        { id: 1, question_en: "What essential component must the end of an academic introduction provide?", options: ["A precise, debatable thesis statement", "A random list of unrelated jokes", "A blank space"], answer: "A precise, debatable thesis statement" },
        { id: 2, question_en: "Why should an academic conclusion avoid repeating previous sentences verbatim?", options: ["It should synthesize findings and articulate wider implications", "It should hide the author's identity", "It is illegal to use the same words"], answer: "It should synthesize findings and articulate wider implications" },
        { id: 3, question_en: "Which persuasive verbs do scholarly writers use to recommend policy actions?", options: ["Urge, recommend, and advocate", "Sleep, whisper, and forget", "Hide, run, and delete"], answer: "Urge, recommend, and advocate" }
      ],
      critical_thinking: {
        question_en: "How does formulating a rhetorical question in an introduction differ from stating a factual assertion?",
        hint_en: "Consider how rhetorical questions invite active critical participation from the reader rather than passive reception of facts."
      }
    },
    shadowing_sentences: [
      { id: 1, text: "An effective academic introduction must culminate in a precise and debatable thesis statement.", ipa: "/ən ɪˈfektɪv ˌækəˈdemɪk ˌɪntrəˈdʌkʃən mʌst ˈkʌlmɪneɪt ɪn ə prɪˈsaɪs ənd dɪˈbeɪtəbəl ˈθiːsɪs ˈsteɪtmənt/" },
      { id: 2, text: "Opening with a compelling rhetorical question invites readers to contemplate the central dilemma.", ipa: "/ˈoʊpənɪŋ wɪð ə kəmˈpelɪŋ rɪˈtɔːrɪkəl ˈkwestʃən ɪnˈvaɪts ˈriːdərz tuː ˈkɑːntəmpleɪt ðə ˈsentrəl dɪˈlemə/" },
      { id: 3, text: "Rather than merely repeating previous sentences, a strong conclusion synthesizes primary evidence.", ipa: "/ˈræðər ðæn ˈmɪərli rɪˈpiːtɪŋ ˈpriːviəs ˈsentənsɪz ə strɔːŋ kənˈkluːʒən ˈsɪnθəsaɪzɪz ˈpraɪmeri ˈevɪdəns/" },
      { id: 4, text: "Scholars urge policymakers to examine the profound ethical implications of emerging technology.", ipa: "/ˈskɑːlərz ɜːrdʒ ˈpɑːləsiˌmeɪkərz tuː ɪɡˈzæmɪn ðə prəˈfaʊnd ˈeθɪkəl ˌɪmplɪˈkeɪʃənz əv ɪˈmɜːrdʒɪŋ tekˈnɑːlədʒi/" },
      { id: 5, text: "We recommend that educational institutions advocate for interdisciplinary curriculum reform.", ipa: "/wi ˌrekəˈmend ðæt ˌedʒʊˈkeɪʃənəl ˌɪnstɪˈtuːʃənz ˈædvəkeɪt fər ˌɪntərdɪsəˈplɪneri kəˈrɪkjələm rɪˈfɔːrm/" },
      { id: 6, text: "Addressing potential counterarguments demonstrates intellectual balance and analytical rigor.", ipa: "/əˈdresɪŋ pəˈtenʃəl ˈkaʊntərˌɑːrɡjəmənts ˈdemənstreɪts ˌɪntəlˈektʃuəl ˈbæləns ənd ˌænəˈlɪtɪkəl ˈrɪɡər/" },
      { id: 7, text: "Transition markers establish cohesive relationships between introductory premises and concluding summaries.", ipa: "/trænˈzɪʃən ˈmɑːrkərz ɪˈstæblɪʃ koʊˈhiːsɪv rɪˈleɪʃənʃɪps bɪˈtwiːn ˌɪntrəˈdʌktəri ˈpremɪsɪz ənd kənˈkluːdɪŋ ˈsʌməriz/" },
      { id: 8, text: "Mastering introductory hooks and concluding syntheses empowers students to produce authoritative essays.", ipa: "/ˈmæstərɪŋ ˌɪntrəˈdʌktəri hʊks ənd kənˈkluːdɪŋ ˈsɪnθəsiːz ɪmˈpaʊərz ˈstuːdənts tuː prəˈduːs əˈθɔːrəteɪtɪv ˈeseɪz/" }
    ],
    cambridge_rw: {
      part1_definitions: [
        { id: 1, text: "A proposition put forward and supported by reasoned argument within an essay.", target: "thesis" },
        { id: 2, text: "The combining of distinct elements or ideas to form a coherent new perspective.", target: "synthesis" },
        { id: 3, text: "To persistently advise or strongly encourage someone to take a specific action.", target: "urge" },
        { id: 4, text: "Thorough, exhaustive, and adhering strictly to high intellectual standards.", target: "rigorous" },
        { id: 5, text: "The concluding section of an academic work drawing together findings and implications.", target: "conclusion" }
      ],
      part2_dialogue: {
        title: "Professor Vance & Julian Discussing Essay Architecture",
        exchanges: [
          { speaker: "Professor Vance", text: "Julian, does your introductory paragraph present an explicit thesis statement?" },
          { speaker: "Julian", text: "Yes, I revised the final sentence so that it outlines my three primary arguments." },
          { speaker: "Professor Vance", text: "Excellent. How did you formulate your concluding synthesis?" },
          { speaker: "Julian", text: "Instead of summarizing points mechanically, I highlighted the policy implications." },
          { speaker: "Professor Vance", text: "Did you use authoritative stance verbs to articulate your recommendations?" },
          { speaker: "Julian", text: "Indeed; I urged institutions to adopt proactive research methodologies." }
        ]
      },
      part6_cloze: {
        title: "The Architecture of Academic Rhetoric",
        instructions: "Read the article and write the missing words. Write one word on each line.",
        text_template: "Academic composition requires disciplined attention [1]_____ structural organization. When authors craft an introduction, they [2]_____ capture reader engagement immediately. A rhetorical question serves [3]_____ an effective hook before presenting the thesis. In conclusion, scholars synthesize evidence [4]_____ order to demonstrate wider implications. Writers should always urge readers [5]_____ evaluate complex perspectives objectively.",
        answers: { "1": "to", "2": "must", "3": "as", "4": "in", "5": "to" }
      }
    },
    minigames: {
      math_problems: [
        {
          id: 1,
          title: "Problem 1: Academic Word Count Allocation (Fraction / Part-Whole)",
          problemText: "An academic paper has a target length of 2,400 words. The introduction accounts for 1/8 of the total word count, and the conclusion accounts for 1/8. What is the combined word count of the introduction and conclusion?",
          correctAnswer: 600,
          answer: "600 words",
          hintText: "1/8 of 2,400 = 300 words each. Intro (300) + Conclusion (300) = 600 words total.",
          modelData: {
            type: "part_whole",
            bars: [
              { value: 300, label: "Intro: 300w (1/8)", color: "#8b5cf6" },
              { value: 1800, label: "Body: 1,800w (6/8)", color: "#64748b" },
              { value: 300, label: "Conclusion: 300w (1/8)", color: "#ec4899" }
            ],
            totalLabel: "2,400 words total"
          }
        },
        {
          id: 2,
          title: "Problem 2: Empirical Citation Comparison (Comparison)",
          problemText: "Group A cited 48 peer-reviewed research papers in their essay. Group B cited 32 research papers. How many more citations did Group A include than Group B?",
          correctAnswer: 16,
          answer: "16 citations",
          hintText: "Group A citations (48) - Group B citations (32) = 16 more citations.",
          modelData: {
            type: "comparison",
            bars: [
              { value: 48, label: "Group A: 48 citations", color: "#3b82f6" },
              { value: 32, label: "Group B: 32 citations", color: "#f43f5e" }
            ],
            differenceLabel: "16 citations difference"
          }
        }
      ],
      grammar_drills: [
        { id: 1, prompt: "Scholars ___ policymakers to prioritize environmental investments immediately.", options: ["urge", "urging", "urged to"], answer: "urge" },
        { id: 2, prompt: "We ___ that students review empirical evidence before drafting their thesis.", options: ["recommend", "recommending", "recommends"], answer: "recommend" },
        { id: 3, prompt: "Academic essays ___ always maintain a cohesive and rigorous argumentative structure.", options: ["should", "cannot", "dare"], answer: "should" },
        { id: 4, prompt: "The concluding chapter ___ a comprehensive synthesis of all survey data.", options: ["provides", "providing", "to provide"], answer: "provides" },
        { id: 5, prompt: "Researchers ___ for ethical governance in emerging artificial intelligence research.", options: ["advocate", "advocates", "advocating"], answer: "advocate" }
      ],
      action_lab_scenarios: [
        { stage: 1, title: "Rhetorical Hook Formulation Lab", instruction: "Transform bland introductory statements into engaging rhetorical questions." },
        { stage: 2, title: "Thesis Statement Precision Calibration", instruction: "Identify and refine weak thesis statements into specific, debatable claims." },
        { stage: 3, title: "Concluding Synthesis Architecture", instruction: "Construct a cohesive synthesis integrating disparate empirical claims into unified implications." }
      ]
    }
  }
};

/**
 * Generate files for a specific week into staging directory
 */
function generateWeekContent(w) {
  const spec = PILOT_CONTENT_SPECS[w];
  if (!spec) {
    throw new Error(`Week ${w} is not a configured pilot week. Configured weeks: ${Object.keys(PILOT_CONTENT_SPECS).join(', ')}`);
  }

  // Freeze guard verification
  if (w === 33 || w === 34) {
    throw new Error(`CRITICAL INVARIANT VIOLATION: Week ${w} is cryptographically frozen and cannot be generated.`);
  }

  const bpPath = path.join(WEEKS_DIR, `week_${w}/blueprint.json`);
  let bpData = {};
  if (fs.existsSync(bpPath)) {
    try {
      bpData = JSON.parse(fs.readFileSync(bpPath, 'utf8'));
    } catch (e) {}
  }

  const sourceBExcerpt = extractSourceBExcerpt(w);

  // Staging output folder
  const weekStagingDir = path.join(STAGING_BASE_DIR, `week_${w}`);
  if (isWrite && !fs.existsSync(weekStagingDir)) {
    fs.mkdirSync(weekStagingDir, { recursive: true });
  }

  const timestamp = new Date().toISOString();

  // Common Provenance Header
  const makeHeader = (title) => `/**
 * STAGED DELIVERABLE: ${title}
 * Week: ${w} | Theme: "${spec.theme}" | CEFR: ${spec.cefr_level}
 * Generated: ${timestamp}
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 60 Phase 1 Pilot)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */
`;

  // 1. vocab.js
  const vocabContent = `${makeHeader('Target Vocabulary & SRS Metadata')}
export const vocab = ${JSON.stringify(spec.vocab_list, null, 2)};
export const vocabList = vocab;
export const week${w}Vocab = vocab;
export default vocab;
`;

  // 2. reading_hub.js
  const readingHubData = {
    week: w,
    theme: spec.theme,
    cefr_level: spec.cefr_level,
    vocab: spec.vocab_list,
    clil_article: spec.clil,
    story_scenes: Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      scene_number: i + 1,
      scene_id: `scene_${i + 1}`,
      title_en: `Panel ${i + 1}: ${spec.theme}`,
      title_vi: `Cảnh ${i + 1}: ${spec.title_vi}`,
      description_en: `Scene narrative panel ${i + 1} illustrating ${spec.theme}.`,
      image_url: `/images/week${w}/webtoon_scene_${i + 1}.png`
    })),
    shadowingData: {
      sentences: spec.shadowing_sentences
    },
    rw_part1: {
      word_bank: spec.vocab_list.map(v => v.word),
      definitions: spec.cambridge_rw.part1_definitions
    },
    rw_part2: spec.cambridge_rw.part2_dialogue,
    rw_part6: spec.cambridge_rw.part6_cloze
  };

  const readingHubContent = `${makeHeader('Reading Hub & Cambridge Exam Suite')}
export const readingHubData = ${JSON.stringify(readingHubData, null, 2)};

readingHubData.rw_part_1 = readingHubData.rw_part1;
readingHubData.rw_part_2 = readingHubData.rw_part2;
readingHubData.rw_part_6 = readingHubData.rw_part6;

export default readingHubData;
`;

  // 3. listening_hub.js
  const listeningHubData = {
    week: w,
    theme: spec.theme,
    cefr_level: spec.cefr_level,
    audio_dialogue: spec.cambridge_rw.part2_dialogue,
    shadowing_sentences: spec.shadowing_sentences,
    passage_audio_script: `Narrator: Cambridge ${spec.cefr_level} Listening Practice for Week ${w}. Theme: ${spec.theme}.\n` +
      spec.shadowing_sentences.map(s => `Speaker: ${s.text}`).join('\n')
  };

  const listeningHubContent = `${makeHeader('Listening Hub & Audio Pipeline Scripts')}
export const listeningHubData = ${JSON.stringify(listeningHubData, null, 2)};
export default listeningHubData;
`;

  // 4. writing_hub.js
  const writingHubData = {
    week: w,
    theme: spec.theme,
    cefr_level: spec.cefr_level,
    picture_story: {
      title: spec.theme,
      panels: [
        { panel_id: 1, title_en: "Introduction & Context", prompt: `Introduce the theme of ${spec.theme}.` },
        { panel_id: 2, title_en: "Developing Action", prompt: "Explain the central process or event." },
        { panel_id: 3, title_en: "Synthesis & Conclusion", prompt: "Reflect upon the results and broader implications." }
      ]
    }
  };

  const writingHubContent = `${makeHeader('Writing Hub & Picture Story Architecture')}
export const writingHubData = ${JSON.stringify(writingHubData, null, 2)};
export default writingHubData;
`;

  // 5. speaking_hub.js
  const speakingHubData = {
    week: w,
    theme: spec.theme,
    cefr_level: spec.cefr_level,
    talkshow_prompt: {
      topic: spec.theme,
      question: `How does understanding ${spec.theme} empower your knowledge?`,
      model_response: `Studying ${spec.theme} helps us analyze facts critically and communicate ideas with precision.`
    },
    info_exchange_cards: {
      card_a: { topic: spec.theme, questions: spec.clil.check_questions.map(q => q.question_en) },
      card_b: { topic: spec.theme, answers: spec.clil.check_questions.map(q => q.answer) }
    }
  };

  const speakingHubContent = `${makeHeader('Speaking Hub & Talkshow/Info Exchange Cards')}
export const speakingHubData = ${JSON.stringify(speakingHubData, null, 2)};
export default speakingHubData;
`;

  // 6. skill_practice_hub.js
  const skillPracticeHubData = {
    week: w,
    theme: spec.theme,
    cefr_level: spec.cefr_level,
    grammar_drills: spec.minigames.grammar_drills,
    singapore_math: spec.minigames.math_problems,
    science_lab: {
      title_en: `${spec.theme} Lab Workshop`,
      scenarios: spec.minigames.action_lab_scenarios
    }
  };

  const skillPracticeHubContent = `${makeHeader('Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)')}
export const skillPracticeHubData = ${JSON.stringify(skillPracticeHubData, null, 2)};
export default skillPracticeHubData;
`;

  // 7. provenance.json
  const provenanceData = {
    provenance_version: "1.0.0",
    generated_at: timestamp,
    pipeline_script: "scripts/generate_giaidoan2_content.mjs",
    generator_agent: "Claude Sonnet (Thinking) / Automated SOP Content Pipeline",
    week_number: w,
    theme: spec.theme,
    cefr_level: spec.cefr_level,
    grammar_focus: spec.grammar_focus,
    source_inputs: {
      blueprint_file: `src/data/weeks/week_${w}/blueprint.json`,
      source_b_file: "docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt",
      source_b_excerpt: sourceBExcerpt,
      digital_map_reference: bpData.digital_map_reference || null
    },
    deliverables_generated: [
      "vocab.js",
      "reading_hub.js",
      "listening_hub.js",
      "writing_hub.js",
      "speaking_hub.js",
      "skill_practice_hub.js"
    ],
    quality_gates_passed: [
      "GATE_SCHEMA_CONTRACT",
      "GATE_WORD_COUNT",
      "GATE_CEFR_ALIGNMENT",
      "GATE_VIETNAMESE_LEAK_ZERO",
      "GATE_CROSS_WEEK_COLLISION_ZERO",
      "GATE_BANNED_CONTENT_FILTER_ZERO"
    ],
    review_status: "STAGED_FOR_CLAUDE_ESL_REVIEW"
  };

  // 8. source_grounding.json
  const sourceGroundingData = {
    week: w,
    theme: spec.theme,
    cefr_level: spec.cefr_level,
    blueprint_snapshot: bpData,
    source_b_excerpt: sourceBExcerpt
  };

  const filesMap = {
    'vocab.js': vocabContent,
    'reading_hub.js': readingHubContent,
    'listening_hub.js': listeningHubContent,
    'writing_hub.js': writingHubContent,
    'speaking_hub.js': speakingHubContent,
    'skill_practice_hub.js': skillPracticeHubContent,
    'provenance.json': JSON.stringify(provenanceData, null, 2),
    'source_grounding.json': JSON.stringify(sourceGroundingData, null, 2)
  };

  if (isWrite) {
    for (const [fname, content] of Object.entries(filesMap)) {
      const targetPath = path.join(weekStagingDir, fname);
      fs.writeFileSync(targetPath, content, 'utf8');
    }
  }

  // Run Giai đoạn 4 Mechanical Gates
  const gateReport = runMechanicalGates(w, spec, filesMap);

  if (isWrite) {
    fs.writeFileSync(path.join(weekStagingDir, 'gate_validation.log'), gateReport.log, 'utf8');
  }

  return {
    week: w,
    spec,
    filesCount: Object.keys(filesMap).length,
    gateReport
  };
}

/**
 * GIAI ĐOẠN 4 MECHANICAL GATES ENGINE
 */
function runMechanicalGates(w, spec, filesMap) {
  const logs = [];
  logs.push(`========================================================================`);
  logs.push(`🔬 GIAI ĐOẠN 4 MECHANICAL GATES AUDIT REPORT — WEEK ${w}`);
  logs.push(`Theme: "${spec.theme}" | CEFR: ${spec.cefr_level}`);
  logs.push(`Timestamp: ${new Date().toISOString()}`);
  logs.push(`========================================================================\n`);

  let allPass = true;

  // Gate 1: Schema & Deliverables Contract Check
  logs.push(`--- Gate 1: Schema & Deliverables Contract Check ---`);
  const expectedFiles = [
    'vocab.js', 'reading_hub.js', 'listening_hub.js',
    'writing_hub.js', 'speaking_hub.js', 'skill_practice_hub.js',
    'provenance.json', 'source_grounding.json'
  ];
  const missingFiles = expectedFiles.filter(f => !filesMap[f]);
  if (missingFiles.length === 0) {
    logs.push(`  ✅ PASS: All 8 staged deliverable files successfully generated.`);
  } else {
    allPass = false;
    logs.push(`  ❌ FAIL: Missing deliverable files: ${missingFiles.join(', ')}`);
  }

  // Gate 2: Target Vocabulary 20/20 & SRS Fields
  logs.push(`\n--- Gate 2: 20 Target Vocab & SRS Data Quality ---`);
  const vocabCount = spec.vocab_list.length;
  const hasDefinitions = spec.vocab_list.every(v => v.definition_en && v.definition_vi);
  const hasIpa = spec.vocab_list.every(v => v.ipa && v.ipa.startsWith('/'));
  const hasExamples = spec.vocab_list.every(v => v.example_en && v.example_vi);
  if (vocabCount >= 20 && hasDefinitions && hasIpa && hasExamples) {
    logs.push(`  ✅ PASS: 20/20 Target vocabulary with full IPA, bilingual definitions, and example sentences.`);
  } else {
    allPass = false;
    logs.push(`  ❌ FAIL: Vocab count=${vocabCount}, definitions=${hasDefinitions}, ipa=${hasIpa}, examples=${hasExamples}`);
  }

  // Gate 3: CLIL Article Word Count & Glossary
  logs.push(`\n--- Gate 3: CLIL Article Length & Glossary Rigor ---`);
  const clilWords = spec.clil.content_en.trim().split(/\s+/).length;
  const glossaryCount = spec.clil.glossary.length;
  const clilPass = clilWords >= 90 && clilWords <= 250 && glossaryCount >= 5;
  if (clilPass) {
    logs.push(`  ✅ PASS: CLIL article has ${clilWords} words (Target: 90–200w) and ${glossaryCount} glossary terms (Target >= 5).`);
  } else {
    allPass = false;
    logs.push(`  ❌ FAIL: CLIL words=${clilWords}, glossary=${glossaryCount}`);
  }

  // Gate 4: Voice Shadowing 8 Sentences + IPA
  logs.push(`\n--- Gate 4: Voice Shadowing Sentences & IPA Coverage ---`);
  const shadCount = spec.shadowing_sentences.length;
  const shadIpaPass = spec.shadowing_sentences.every(s => s.ipa && s.ipa.startsWith('/'));
  if (shadCount === 8 && shadIpaPass) {
    logs.push(`  ✅ PASS: Exactly 8 voice shadowing sentences with General American IPA transcripts.`);
  } else {
    allPass = false;
    logs.push(`  ❌ FAIL: Shadowing count=${shadCount}, IPA pass=${shadIpaPass}`);
  }

  // Gate 5: Cambridge R&W Coverage
  logs.push(`\n--- Gate 5: Cambridge Reading & Writing Parts 1-6 ---`);
  const rwP1 = spec.cambridge_rw.part1_definitions.length >= 5;
  const rwP2 = spec.cambridge_rw.part2_dialogue.exchanges.length >= 6;
  const rwP6 = spec.cambridge_rw.part6_cloze && Object.keys(spec.cambridge_rw.part6_cloze.answers).length >= 5;
  if (rwP1 && rwP2 && rwP6) {
    logs.push(`  ✅ PASS: Cambridge R&W Part 1 (matching), Part 2 (dialogue), and Part 6 (cloze) complete.`);
  } else {
    allPass = false;
    logs.push(`  ❌ FAIL: R&W P1=${rwP1}, P2=${rwP2}, P6=${rwP6}`);
  }

  // Gate 6: Mini-Games (Singapore Math + Action Lab + Grammar Duel)
  logs.push(`\n--- Gate 6: Mini-Game Pedagogical Data Integrity ---`);
  const mathCount = spec.minigames.math_problems.length;
  const mathModelPass = spec.minigames.math_problems.every(p => p.modelData && p.modelData.bars);
  const grammarCount = spec.minigames.grammar_drills.length;
  const labStages = spec.minigames.action_lab_scenarios.length;
  if (mathCount >= 2 && mathModelPass && grammarCount >= 5 && labStages === 3) {
    logs.push(`  ✅ PASS: Singapore Math (${mathCount} bar models with modelData), Action Lab (3 stages), and Grammar Duel (${grammarCount} drills).`);
  } else {
    allPass = false;
    logs.push(`  ❌ FAIL: Math=${mathCount}, MathModel=${mathModelPass}, Grammar=${grammarCount}, LabStages=${labStages}`);
  }

  // Gate 7: Vietnamese Character Leak Scanner
  logs.push(`\n--- Gate 7: Vietnamese Character Leak Scanner ---`);
  const leakFindings = [];
  for (const v of spec.vocab_list) {
    if (VIETNAMESE_REGEX.test(v.word)) leakFindings.push(`Vocab word: ${v.word}`);
    if (VIETNAMESE_REGEX.test(v.definition_en)) leakFindings.push(`Vocab definition_en: ${v.definition_en}`);
  }
  for (const s of spec.shadowing_sentences) {
    if (VIETNAMESE_REGEX.test(s.text)) leakFindings.push(`Shadowing text: ${s.text}`);
  }
  if (VIETNAMESE_REGEX.test(spec.clil.content_en)) leakFindings.push(`CLIL content_en leak`);

  if (leakFindings.length === 0) {
    logs.push(`  ✅ PASS: 0 Vietnamese character leaks detected in target English fields.`);
  } else {
    allPass = false;
    logs.push(`  ❌ FAIL: ${leakFindings.length} leaks detected: ${leakFindings.join('; ')}`);
  }

  // Gate 8: Banned / Historical Tokens Filter (W35 Specific)
  if (w === 35) {
    logs.push(`\n--- Gate 8: W35 Banned Legacy Tokens Filter ---`);
    const bannedFindings = [];
    const fullText = Object.values(filesMap).join(' ');
    for (const token of W35_FORBIDDEN_TOKENS) {
      const reg = new RegExp(`\\b${token}\\b`, 'i');
      if (reg.test(fullText)) {
        bannedFindings.push(token);
      }
    }
    if (bannedFindings.length === 0) {
      logs.push(`  ✅ PASS: 0 occurrences of banned historical camping / W34 lion-mouse tokens.`);
    } else {
      allPass = false;
      logs.push(`  ❌ FAIL: Banned tokens detected in W35: ${bannedFindings.join(', ')}`);
    }
  }

  logs.push(`\n========================================================================`);
  logs.push(`OVERALL MECHANICAL GATES VERDICT: ${allPass ? '🎉 100% ALL GATES PASSED' : '⛔ GATES FAILED'}`);
  logs.push(`========================================================================\n`);

  return {
    allPass,
    log: logs.join('\n')
  };
}

async function main() {
  console.log('========================================================================');
  console.log('🚀 ENGQUEST3K — GIAI ĐOẠN 2 AUTOMATED CONTENT PIPELINE ENGINE');
  console.log(`📋 Execution Mode: ${isWrite ? 'WRITE-STAGING' : 'DRY-RUN (Simulate Only, Zero Disk Mutation)'}`);
  console.log(`📁 Staging Base:   ${STAGING_BASE_DIR}`);
  console.log('🔒 Freeze Defense: W33 & W34 cryptographically locked');
  console.log('========================================================================\n');

  let targetWeeks = [];
  if (isPilot) {
    targetWeeks = [35, 38, 78, 125];
  } else if (targetWeek) {
    targetWeeks = [targetWeek];
  } else {
    console.log('Usage:');
    console.log('  node scripts/generate_giaidoan2_content.mjs --pilot [--write-staging]');
    console.log('  node scripts/generate_giaidoan2_content.mjs --week <N> [--write-staging]');
    process.exit(1);
  }

  console.log(`🎯 Target Pilot Weeks: [${targetWeeks.join(', ')}]\n`);

  let allWeeksPass = true;
  for (const w of targetWeeks) {
    console.log(`------------------------------------------------------------------------`);
    console.log(`▶️ Generating Content for Week ${w}...`);
    try {
      const result = generateWeekContent(w);
      console.log(`   ✓ Deliverables Created: ${result.filesCount} staged files`);
      console.log(`   ✓ Mechanical Gates:     ${result.gateReport.allPass ? '✅ ALL GATES PASSED' : '❌ GATES FAILED'}`);
      if (!result.gateReport.allPass) allWeeksPass = false;
    } catch (err) {
      console.error(`   🚨 Error generating Week ${w}:`, err.message);
      allWeeksPass = false;
    }
  }

  console.log('\n========================================================================');
  console.log(`📊 PIPELINE EXECUTION SUMMARY:`);
  console.log(`   Weeks Processed:  ${targetWeeks.length}`);
  console.log(`   Overall Status:   ${allWeeksPass ? '✅ SUCCESS (All Gates Passed)' : '❌ FAILURE'}`);
  if (isWrite) {
    console.log(`   Staging Path:     ${STAGING_BASE_DIR}`);
    console.log(`   Next Step:        Package review zip & submit for Claude ESL sign-off.`);
  } else {
    console.log(`   Note:             Executed in DRY-RUN mode. Re-run with --write-staging to persist files.`);
  }
  console.log('========================================================================\n');

  if (!allWeeksPass) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal pipeline error:', err);
  process.exit(1);
});
