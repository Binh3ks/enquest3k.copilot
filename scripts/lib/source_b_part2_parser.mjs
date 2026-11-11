/**
 * scripts/lib/source_b_part2_parser.mjs
 *
 * Shared read-only parser for Source B (docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt).
 * Enforces Part II Detailed Syllabus (from "PART II" onward) as the single source of truth,
 * handles multi-week cycle blocks (W79-80, W95-96, W129-132) cleanly before single-week
 * overrides, and preserves Part I overview ranges separately for Part I vs Part II forensic checks.
 */

import fs from 'fs';
import path from 'path';

export function stripBalancedOuterQuotes(s) {
  const t = (s || '').trim();
  const dqCount = (t.match(/"/g) || []).length;
  const sqCount = (t.match(/'/g) || []).length;
  if (t.startsWith('"') && t.endsWith('"') && dqCount === 2) {
    return t.slice(1, -1).trim();
  }
  if (t.startsWith("'") && t.endsWith("'") && sqCount === 2) {
    return t.slice(1, -1).trim();
  }
  return t;
}

export function cleanEnglishSegment(raw) {
  if (!raw) return null;
  let s = raw.replace(/[“”]/g, '"').trim();
  const mTuan = s.match(/\s*\(\s*Tuần\s+\d+(?:\s*[-–—]\s*\d+)?\s*:.*$/i);
  if (mTuan) {
    s = s.slice(0, mTuan.index).trim();
  }
  // Strip trailing parenthetical containing Vietnamese diacritics or standard bilingual tags
  const viParenRe = /\s*\([^()]*?(?:Tuần|Chủ đề|Kết quả|Hoạt động|Kỹ năng|Ngữ pháp|Toán|Mục tiêu|Giai đoạn|[àáảãạăằắẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬĐÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴ])[^()]*\)?\.?\s*$/i;
  while (viParenRe.test(s)) {
    s = s.replace(viParenRe, '').trim();
  }
  s = s.replace(/\s*\(\s*Toán\s*:[^()]*\)?\.?\s*$/i, '').trim();
  s = stripBalancedOuterQuotes(s);
  if (!s.endsWith('...')) s = s.replace(/\.\s*$/, '');
  return stripBalancedOuterQuotes(s).trim();
}

export function normalizeComparisonText(s) {
  return (s || '')
    .toLowerCase()
    .replace(/[“”"'`]/g, '')
    .replace(/[-–—/\\:,._()&!?]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isHeaderStopLine(line) {
  return (
    /^[•\t\s]*Week\s+\d+\s*:/i.test(line) ||
    /^[•\t\s]*Weeks?\s+\d+\s*[-–—]\s*\d+\s*:/i.test(line) ||
    /\bUNIT\s+\d+/i.test(line) ||
    /\bBLOCK\s+[A-Z]/i.test(line) ||
    /\bPROJECT CYCLE\s+\d+/i.test(line) ||
    /\bPHASE\s+[A-Z0-9]+/i.test(line) ||
    /^[•\t\s]*Phase\s+[A-C]\s*:/i.test(line)
  );
}

function parseDetailLines(lines, startIdx, obj) {
  const rawDetails = [];
  for (let j = startIdx; j < Math.min(lines.length, startIdx + 25); j++) {
    const l = lines[j];
    if (isHeaderStopLine(l)) break;
    if (!l.trim()) continue;
    rawDetails.push({ lineNum: j + 1, text: l.trim() });

    const mTopicMath = l.match(/^[•\t\s]*Topic\s*\(Math\)\s*:\s*(.+)/i);
    if (mTopicMath && !obj.mathTopic) {
      obj.mathTopic = cleanEnglishSegment(mTopicMath[1]);
      obj.mathTopicRaw = mTopicMath[1].trim();
      obj.mathLineNum = j + 1;
      continue;
    }

    const mOutcomeMath = l.match(/^[•\t\s]*(?:Key Learning Outcome|Activity)\s*\(Math\)\s*:\s*(.+)/i);
    if (mOutcomeMath && !obj.mathOutcome) {
      obj.mathOutcome = cleanEnglishSegment(mOutcomeMath[1]);
      obj.mathOutcomeRaw = mOutcomeMath[1].trim();
      obj.mathLineNum = obj.mathLineNum || (j + 1);
      continue;
    }

    const mMathFocus = l.match(/^[•\t\s]*Math\s+Focus\s*:\s*(.+)/i);
    if (mMathFocus && !obj.mathFocus) {
      obj.mathFocus = cleanEnglishSegment(mMathFocus[1]);
      if (!obj.mathTopic) {
        obj.mathTopic = obj.mathFocus;
        obj.mathTopicRaw = mMathFocus[1].trim();
        obj.mathLineNum = j + 1;
      }
      continue;
    }

    const mMathVocab = l.match(/^[•\t\s]*Math\s+Vocabulary\s*:\s*(.+)/i);
    if (mMathVocab && obj.mathWords.length === 0) {
      obj.mathLineNum = obj.mathLineNum || (j + 1);
      obj.mathVocabRaw = mMathVocab[1].trim();
      obj.mathWords = mMathVocab[1]
        .replace(/^Review\b[^()]*\(([^)]+)\)/i, '$1')
        .replace(/\([^)]*\)/g, '')
        .replace(/\.{3}|…/g, ',')
        .split(/[,;\/]/)
        .map(w => w.replace(/[.。“”"'\r\n]/g, '').trim().toLowerCase())
        .filter(w => w.length > 0 && !w.includes('->') && !w.startsWith('review'));
      continue;
    }

    const mTopic = l.match(/^[•\t\s]*(?:Topic(?:\s*\([^)]*\))?|Event)\s*:\s*(.+)/i);
    if (mTopic && !/\(Math\)/i.test(l) && !obj.topicEla) {
      obj.topicEla = cleanEnglishSegment(mTopic[1]);
      obj.topicRaw = mTopic[1].trim();
      obj.topicLineNum = j + 1;
      continue;
    }

    const mTask = l.match(/^[•\t\s]*Task\s*:\s*(.+)/i);
    if (mTask) {
      if (!obj.topicEla) {
        obj.topicEla = cleanEnglishSegment(mTask[1]);
        obj.topicRaw = mTask[1].trim();
        obj.topicLineNum = j + 1;
      } else if (!obj.outcomeEla) {
        obj.outcomeEla = cleanEnglishSegment(mTask[1]);
        obj.outcomeRaw = mTask[1].trim();
        obj.outcomeLineNum = j + 1;
      }
      continue;
    }

    const mGrammar = l.match(/^[•\t\s]*Grammar\s+(?:Focus(?:\s*\([^)]*\))?|Review)\s*:\s*(.+)/i);
    if (mGrammar && !obj.grammarFocus) {
      obj.grammarFocus = cleanEnglishSegment(mGrammar[1]);
      obj.grammarRaw = mGrammar[1].trim();
      obj.grammarLineNum = j + 1;
      continue;
    }

    const mVocab = l.match(/^[•\t\s]*Vocabulary\s+Focus\s*:\s*(.+)/i);
    if (mVocab && obj.vocabWords.length === 0) {
      obj.vocabLineNum = j + 1;
      obj.vocabRaw = mVocab[1].trim();
      obj.vocabWords = mVocab[1]
        .replace(/\([^)]*\)/g, '')
        .replace(/\.{3}|…/g, ',')
        .split(/[,;\/]/)
        .map(w => w.replace(/[.“”"'\r\n]/g, '').trim().toLowerCase())
        .filter(w => w.length > 0 && !w.includes('->') && !w.startsWith('review'));
      continue;
    }

    const mOutcome = l.match(/^[•\t\s]*(?:Key Learning Outcome(?:\s*\([^)]*\))?|Outcome|Activity(?:\s*\([^)]*\))?|Goal|Review Goal|Focus)\s*:\s*(.+)/i);
    if (mOutcome && !/\(Math\)/i.test(l) && !obj.outcomeEla) {
      obj.outcomeEla = cleanEnglishSegment(mOutcome[1]);
      obj.outcomeRaw = mOutcome[1].trim();
      obj.outcomeLineNum = j + 1;
      const mathPartMatch = obj.outcomeEla.match(/(?:^|\+\s*)(Math\b.+)$/i);
      if (mathPartMatch && !obj.mathTopic) {
        const mathClean = mathPartMatch[1].replace(/[.\s]+$/, '').trim();
        obj.mathTopic = mathClean;
        obj.mathTopicRaw = mathClean;
        obj.mathFocus = obj.mathFocus || mathClean;
        obj.mathLineNum = obj.mathLineNum || (j + 1);
      }
      continue;
    }

    const mSkill = l.match(/^[•\t\s]*(?:Writing\s+Skill\s+Focus|Skill\s+Focus(?:\s*\([^)]*\))?|Phonetics\s+Focus)\s*:\s*(.+)/i);
    if (mSkill && !obj.skillFocus) {
      obj.skillFocus = cleanEnglishSegment(mSkill[1]);
      obj.skillRaw = mSkill[1].trim();
      continue;
    }
  }
  obj.detailLines = rawDetails;
  obj.hasMath = Boolean(obj.mathTopic || obj.mathOutcome || obj.mathFocus || obj.mathWords.length > 0 || (obj.outcomeEla && /Math/i.test(obj.outcomeEla)));
}

export function parseSourceBPartII(sourceBPath) {
  const content = fs.readFileSync(sourceBPath, 'utf8');
  const lines = content.split('\n');
  const part2Idx = lines.findIndex(l => l.includes('PART II'));
  const startIdx = part2Idx >= 0 ? part2Idx : 0;

  const weeks = {};
  for (let w = 1; w <= 156; w++) {
    weeks[w] = {
      week: w,
      blockOrigin: null,
      headerLineNum: null,
      rawHeaderLine: null,
      unitHeader: null,
      cycleHeader: null,
      titleEn: null,
      topicEla: null,
      topicRaw: null,
      topicLineNum: null,
      outcomeEla: null,
      outcomeRaw: null,
      outcomeLineNum: null,
      skillFocus: null,
      skillRaw: null,
      grammarFocus: null,
      grammarRaw: null,
      grammarLineNum: null,
      vocabLineNum: null,
      vocabRaw: null,
      vocabWords: [],
      mathTopic: null,
      mathTopicRaw: null,
      mathLineNum: null,
      mathOutcome: null,
      mathOutcomeRaw: null,
      mathFocus: null,
      mathVocabRaw: null,
      mathWords: [],
      hasMath: false,
      detailLines: []
    };
  }

  let currentUnit = null;
  let currentCycle = null;

  // Pass 1: track Unit/Cycle context and multi-week cycle headers in Part II
  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i];
    if (/\b(?:UNIT|BLOCK)\s+/i.test(line)) currentUnit = line.trim();
    if (/\bPROJECT CYCLE\b/i.test(line)) currentCycle = line.trim();

    const mRange = line.match(/^[•\t\s]*Weeks?\s+(\d+)\s*[-–—]\s*(\d+)\s*:\s*(.+)/i);
    if (mRange) {
      const startW = parseInt(mRange[1], 10);
      const endW = parseInt(mRange[2], 10);
      if (startW >= 1 && endW <= 156 && !/Content\s*\(Unit/i.test(mRange[3])) {
        const titleEn = cleanEnglishSegment(mRange[3]);
        const shared = {
          blockOrigin: 'multi_week_cycle',
          rangeSpan: [startW, endW],
          headerLineNum: i + 1,
          rawHeaderLine: line.trim(),
          unitHeader: currentUnit,
          cycleHeader: currentCycle,
          titleEn,
          topicEla: null, topicRaw: null, topicLineNum: null,
          outcomeEla: null, outcomeRaw: null, outcomeLineNum: null,
          skillFocus: null, skillRaw: null,
          grammarFocus: null, grammarRaw: null, grammarLineNum: null,
          vocabLineNum: null, vocabRaw: null, vocabWords: [],
          mathTopic: null, mathTopicRaw: null, mathLineNum: null,
          mathOutcome: null, mathOutcomeRaw: null, mathFocus: null,
          mathVocabRaw: null, mathWords: [], hasMath: false, detailLines: []
        };
        parseDetailLines(lines, i + 1, shared);
        for (let w = startW; w <= endW; w++) {
          weeks[w] = {
            ...shared,
            week: w,
            vocabWords: [...shared.vocabWords],
            mathWords: [...shared.mathWords],
            detailLines: [...shared.detailLines]
          };
        }
      }
    }
  }

  // Pass 2: single-week headers override multi-week headers where explicitly authored
  currentUnit = null;
  currentCycle = null;
  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i];
    if (/\b(?:UNIT|BLOCK)\s+/i.test(line)) currentUnit = line.trim();
    if (/\bPROJECT CYCLE\b/i.test(line)) currentCycle = line.trim();

    const mSingle = line.match(/^[•\t\s]*Week\s+(\d+)\s*:\s*(.+)/i);
    if (mSingle) {
      const w = parseInt(mSingle[1], 10);
      if (w >= 1 && w <= 156) {
        const titleEn = cleanEnglishSegment(mSingle[2]);
        const entry = {
          week: w,
          blockOrigin: 'single_week',
          headerLineNum: i + 1,
          rawHeaderLine: line.trim(),
          unitHeader: currentUnit,
          cycleHeader: currentCycle,
          titleEn,
          topicEla: null, topicRaw: null, topicLineNum: null,
          outcomeEla: null, outcomeRaw: null, outcomeLineNum: null,
          skillFocus: null, skillRaw: null,
          grammarFocus: null, grammarRaw: null, grammarLineNum: null,
          vocabLineNum: null, vocabRaw: null, vocabWords: [],
          mathTopic: null, mathTopicRaw: null, mathLineNum: null,
          mathOutcome: null, mathOutcomeRaw: null, mathFocus: null,
          mathVocabRaw: null, mathWords: [], hasMath: false, detailLines: []
        };
        parseDetailLines(lines, i + 1, entry);
        // Special case: Weeks 93-94 Mini-Research Project puts shared Topic & Goal after Week 94
        if (w === 93 && !entry.topicEla && weeks[93]?.blockOrigin === 'multi_week_cycle') {
          // Will inspect W94 after Pass 2 if needed
        }
        weeks[w] = entry;
      }
    }
  }

  // For W93 specifically, lines 752-753 under W94 apply to W93-94 Mini-Research Project
  if (weeks[93] && !weeks[93].topicEla && weeks[94]?.topicEla && /Weeks 85-92/i.test(weeks[94].topicEla)) {
    weeks[93].topicEla = weeks[94].topicEla;
    weeks[93].outcomeEla = weeks[94].outcomeEla;
  }

  return { part2Line: startIdx + 1, lines, weeks };
}

export function parseSourceBPartIMap(sourceBPath) {
  const lines = fs.readFileSync(sourceBPath, 'utf8').split('\n');
  const part2Idx = lines.findIndex(l => l.includes('PART II'));
  const endIdx = part2Idx >= 0 ? part2Idx : 122;
  const part1Ranges = [];
  for (let i = 0; i < endIdx; i++) {
    const line = lines[i];
    const m = line.match(/Weeks?\s+(\d+)\s*[-–—]\s*(\d+)/i);
    if (m && /Project Cycle|Review|Consolidation|Capstone|Content|Project Work|Presentation/i.test(line)) {
      part1Ranges.push({
        lineNum: i + 1,
        start: parseInt(m[1], 10),
        end: parseInt(m[2], 10),
        text: line.trim()
      });
    }
  }
  return part1Ranges;
}

export function parseDigitalMapRows(mapPath) {
  const content = fs.readFileSync(mapPath, 'utf8');
  const lines = content.split('\n');
  const rows = {};
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(/^\|\s*\*\*W(\d+)\*\*\s*\|\s*(.+)$/);
    if (m) {
      const w = parseInt(m[1], 10);
      const parts = line.split('|').slice(1, -1).map(s => s.trim());
      if (parts.length >= 6) {
        const themeRaw = parts[1].replace(/^\*\*|\*\*$/g, '').trim();
        const cefrRaw = parts[2].replace(/^\*\*|\*\*$/g, '').trim();
        const clilRaw = parts[3].replace(/^\*\*|\*\*$/g, '').trim();
        const scaffRaw = parts[4].replace(/^\*\*|\*\*$/g, '').trim();
        const grammarRaw = parts[5].replace(/^\*\*|\*\*$/g, '').trim();
        rows[w] = {
          week: w,
          lineNum: i + 1,
          rawLine: line,
          themeRaw,
          cefrRaw,
          clilRaw,
          scaffRaw,
          grammarRaw,
          hasFullMock: /★\s*FULL\s*MOCK/i.test(cefrRaw) || /★\s*FULL\s*MOCK/i.test(grammarRaw),
          hasGraduationMarker: /★\s*GRADUATION/i.test(cefrRaw)
        };
      }
    }
  }
  return { content, lines, rows };
}
