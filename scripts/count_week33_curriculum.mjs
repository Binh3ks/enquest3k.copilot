/**
 * scripts/count_week33_curriculum.mjs
 * Script duy nhất import weekData của week_33 và in ra bảng { hub, field, count }
 */
import weekData from '../src/data/weeks/week_33/index.js';

const rh = weekData.readingHub || weekData.reading_hub;
const lh = weekData.listeningHub || weekData.listening_hub;
const wh = weekData.writingHub || weekData.writing_hub;
const sh = weekData.speakingHub || weekData.speaking_hub;

function splitSentences(text) {
  if (!text || typeof text !== 'string') return [];
  return text
    .replace(/\r\n/g, '\n')
    .split(/(?<=[.!?])\s+|\n+/)
    .map(s => s.trim())
    .filter(s => s.length > 5 && /[a-zA-Z]/.test(s));
}

// Bảng các field theo đúng yêu cầu đề bài - 100% tính toán từ dữ liệu AST/object, không hardcode
const rows = [
  // 1. reading_hub
  {
    hub: 'reading_hub',
    field: 'story_scenes',
    count: (rh?.story_scenes || []).reduce((acc, s) => acc + splitSentences(s.description_en || s.description).length, 0),
    raw_item_count: rh?.story_scenes?.length ?? 0,
    unit: 'scenes (5 scenes, mỗi scene 1 câu mô tả)'
  },
  {
    hub: 'reading_hub',
    field: 'clil_article.content_en',
    count: splitSentences(rh?.clil_article?.content_en).length,
    raw_item_count: rh?.clil_article?.content_en ? 1 : 0,
    unit: '1 bài đọc (12 câu văn)'
  },
  {
    hub: 'reading_hub',
    field: 'clil_article.sentence_drills',
    count: rh?.clil_article?.sentence_drills?.length ?? 0,
    raw_item_count: rh?.clil_article?.sentence_drills?.length ?? 0,
    unit: 'câu bài tập ghép'
  },
  {
    hub: 'reading_hub',
    field: 'interactive_story',
    count: splitSentences(rh?.interactive_story?.text_template).length,
    raw_item_count: rh?.interactive_story?.gaps?.length ?? 0,
    unit: 'câu trong story template (5 gaps)'
  },
  {
    hub: 'reading_hub',
    field: 'check_mode_drills',
    count: rh?.check_mode_drills?.length ?? 0,
    raw_item_count: rh?.check_mode_drills?.length ?? 0,
    unit: 'câu drill trắc nghiệm'
  },
  {
    hub: 'reading_hub',
    field: 'reading_part3_story',
    count: splitSentences(rh?.reading_part3_story?.story_text).length,
    raw_item_count: rh?.reading_part3_story ? 1 : 0,
    unit: 'câu trong đoạn văn story_text'
  },
  {
    hub: 'reading_hub',
    field: 'rw_part_4',
    count: splitSentences(rh?.rw_part_4?.text_template).length,
    raw_item_count: rh?.rw_part_4?.questions?.length ?? rh?.rw_part_4?.blanks?.length ?? 0,
    unit: 'câu cloze template (11 câu, 10 blanks)'
  },

  // 2. listening_hub
  {
    hub: 'listening_hub',
    field: 'listening_p1',
    count: lh?.listening_p1?.dialogue_script?.length ?? 0,
    raw_item_count: lh?.listening_p1?.targets?.length ?? 0,
    unit: 'lượt thoại dialogue (6 target pins)'
  },
  {
    hub: 'listening_hub',
    field: 'listening_p2',
    count: lh?.listening_p2?.dialogue_script?.length ?? 0,
    raw_item_count: lh?.listening_p2?.fields?.length ?? 0,
    unit: 'lượt thoại dialogue (5 câu hỏi điền field)'
  },
  {
    hub: 'listening_hub',
    field: 'listening_p3',
    count: splitSentences(lh?.listening_p3?.passage_audio_script).length,
    raw_item_count: lh?.listening_p3?.items?.length ?? 0,
    unit: 'câu passage script (5 item ghép tranh)'
  },
  {
    hub: 'listening_hub',
    field: 'listening_p4',
    count: lh?.listening_p4?.questions?.length ?? 0,
    raw_item_count: lh?.listening_p4?.questions?.length ?? 0,
    unit: 'câu hỏi trắc nghiệm MCQ'
  },
  {
    hub: 'listening_hub',
    field: 'listening_p5',
    count: lh?.listening_p5?.instructions?.length ?? 0,
    raw_item_count: lh?.listening_p5?.instructions?.length ?? 0,
    unit: 'chỉ dẫn tô màu/viết'
  },

  // 3. writing_hub
  {
    hub: 'writing_hub',
    field: 'rw_part_1',
    count: wh?.rw_part_1?.definitions?.length ?? 0,
    raw_item_count: wh?.rw_part_1?.definitions?.length ?? 0,
    unit: 'câu định nghĩa từ vựng'
  },
  {
    hub: 'writing_hub',
    field: 'rw_part_2',
    count: (wh?.rw_part_2?.turns?.length ?? 0) + (wh?.rw_part_2?.answer_options?.length ?? 0),
    raw_item_count: wh?.rw_part_2?.turns?.length ?? 0,
    unit: 'câu thoại hỏi/đáp (5 lượt + 8 đáp án)'
  },
  {
    hub: 'writing_hub',
    field: 'rw_part_3',
    count: splitSentences(wh?.rw_part_3?.story_text).length,
    raw_item_count: wh?.rw_part_3?.blanks?.length ?? 0,
    unit: 'câu trong story_text (5 chỗ trống)'
  },
  {
    hub: 'writing_hub',
    field: 'rw_part_4',
    count: splitSentences(wh?.rw_part_4?.text_template).length,
    raw_item_count: wh?.rw_part_4?.blanks?.length ?? 0,
    unit: 'câu trong text_template (10 blanks)'
  },
  {
    hub: 'writing_hub',
    field: 'rw_part_5',
    count: (wh?.rw_part_5?.questions?.length ?? 0) + splitSentences(wh?.rw_part_5?.story_text).length,
    raw_item_count: wh?.rw_part_5?.questions?.length ?? 0,
    unit: 'câu (8 câu story_text + 7 câu hỏi)'
  },

  // 4. speaking_hub
  {
    hub: 'speaking_hub',
    field: 'info_exchange_cards',
    count: sh?.info_exchange_cards?.dialogue_script?.length ?? 0,
    raw_item_count: (sh?.info_exchange_cards?.table_a?.fields?.length ?? 0) + (sh?.info_exchange_cards?.table_b?.fields?.length ?? 0),
    unit: 'lượt thoại mẫu (10 cue card prompts)'
  },
  {
    hub: 'speaking_hub',
    field: 'personal_questions',
    count: sh?.personal_questions?.questions?.length ?? 0,
    raw_item_count: sh?.personal_questions?.questions?.length ?? 0,
    unit: 'câu hỏi phỏng vấn giám khảo'
  },
  {
    hub: 'speaking_hub',
    field: 'find_differences',
    count: (sh?.find_differences?.differences?.length ?? 0) * 2,
    raw_item_count: sh?.find_differences?.differences?.length ?? 0,
    unit: 'câu mô tả khác biệt (6 cặp)'
  }
];

// In ra bảng { hub, field, count } chính xác
const outputTable = rows.map(r => ({
  hub: r.hub,
  field: r.field,
  count: r.count
}));

console.log('=== RAW CONSOLE OUTPUT: BẢNG { hub, field, count } ===');
console.table(outputTable);

console.log('\n=== RAW CONSOLE OUTPUT: CHI TIẾT BẢN CHẤT DỮ LIỆU ===');
console.table(rows.map(r => ({
  hub: r.hub,
  field: r.field,
  sentence_count: r.count,
  item_count: r.raw_item_count,
  unit: r.unit
})));

const sumSentences = rows.reduce((acc, r) => acc + r.count, 0);
const sumItems = rows.reduce((acc, r) => acc + r.raw_item_count, 0);
console.log(`\nTỔNG SỐ CÂU THỰC TẾ: ${sumSentences} câu`);
console.log(`TỔNG SỐ ITEM / CÂU HỎI THỰC TẾ: ${sumItems} items`);
