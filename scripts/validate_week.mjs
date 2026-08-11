import fs from 'fs';
import path from 'path';
import process from 'process';
import { pathToFileURL } from 'url';

const weekArg = process.argv[2] || '36';
const weekNum = parseInt(weekArg, 10);
const weekStr = weekNum < 10 ? `0${weekNum}` : `${weekNum}`;

if (isNaN(weekNum)) {
  console.error('❌ Error: Please provide a valid week number (e.g., node scripts/validate_week.mjs 36)');
  process.exit(1);
}

console.log(`\n================================================================`);
console.log(`🚀 DEEP FIELD VALIDATOR (16 MODULES) — WEEK ${weekNum}`);
console.log(`================================================================\n`);

const WEEKS_DIR = path.join(process.cwd(), 'src', 'data', 'weeks', `week_${weekStr}`);
let totalFailures = 0;

function reportModule(stt, name, passed, details = []) {
  const icon = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`[Module ${stt.toString().padStart(2, '0')}/16] ${name.padEnd(20, ' ')} : ${icon}`);
  if (details.length > 0) {
    details.forEach(d => console.log(`   └─ ${d}`));
  }
}

async function runValidation() {
  // Helper to dynamically import week data files
  async function loadModuleFile(filename) {
    const fileP = path.join(WEEKS_DIR, filename);
    if (!fs.existsSync(fileP)) return null;
    try {
      const mod = await import(pathToFileURL(fileP).href + `?t=${Date.now()}`);
      return mod.default || mod;
    } catch (e) {
      console.error(`Error loading ${filename}:`, e.message);
      return null;
    }
  }

  // ---------------------------------------------------------------------------
  // 1. Read & Explore (read.js)
  // ---------------------------------------------------------------------------
  {
    const data = await loadModuleFile('read.js');
    const details = [];
    let ok = true;
    if (!data) {
      ok = false;
      details.push('File read.js is missing');
    } else {
      if (!data.read_stem || !data.read_social) {
        ok = false;
        details.push('Must contain both read_stem and read_social sub-tabs');
      }
      ['read_stem', 'read_social'].forEach(tabKey => {
        const tab = data[tabKey];
        if (tab) {
          const title = tab.title_en || tab.title;
          const content = tab.content_en;
          if (!title || !tab.title_vi || !content || !tab.content_vi) {
            ok = false;
            details.push(`${tabKey} missing title_en/vi or content_en/vi`);
          }
          const qs = tab.questions || tab.comprehension_questions || [];
          if (!Array.isArray(qs) || qs.length < 4) {
            ok = false;
            details.push(`${tabKey} must have at least 4 MC questions`);
          } else {
            qs.forEach((q, idx) => {
              if (!q.options || !Array.isArray(q.options) || q.options.length < 3) {
                ok = false;
                details.push(`${tabKey} Q${idx + 1} missing options array`);
              }
            });
          }
          // Punctuation & Chunking check
          if (/\s+\./.test(content || '')) {
            ok = false;
            details.push(`${tabKey} contains space before dot (word .)`);
          }
          if (/\*\*[^*]*[.,!?]\*\*/.test(content || '')) {
            ok = false;
            details.push(`${tabKey} has punctuation inside bold tags **...**`);
          }
        }
      });
    }
    if (!ok) totalFailures++;
    reportModule(1, 'Read & Explore', ok, details);
  }

  // ---------------------------------------------------------------------------
  // 2. New Words (vocab.js)
  // ---------------------------------------------------------------------------
  {
    const data = await loadModuleFile('vocab.js');
    const details = [];
    let ok = true;
    const vocabList = Array.isArray(data) ? data : (data?.vocab || []);
    if (vocabList.length < 20) {
      ok = false;
      details.push(`Must contain 20 vocabulary items (found ${vocabList.length})`);
    } else {
      vocabList.forEach((v, i) => {
        if (!v.word || !v.definition_en || !v.definition_vi) {
          ok = false;
          details.push(`Vocab item #${i + 1} (${v.word || 'empty'}) missing word or definition_en/vi`);
        }
        // ESL English definition check
        if (/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(v.definition_en || '')) {
          ok = false;
          details.push(`Vocab item #${i + 1} (${v.word}) contains Vietnamese letters inside definition_en`);
        }
      });
    }
    if (!ok) totalFailures++;
    reportModule(2, 'New Words', ok, details);
  }

  // ---------------------------------------------------------------------------
  // 3. Grammar Station (grammar.js)
  // ---------------------------------------------------------------------------
  {
    const data = await loadModuleFile('grammar.js');
    const details = [];
    let ok = true;
    if (!data) {
      ok = false;
      details.push('File grammar.js is missing');
    } else {
      if (!data.grammar_explanation || !Array.isArray(data.grammar_explanation.rules)) {
        ok = false;
        details.push('Missing grammar_explanation.rules array');
      }
      const exercises = data.exercises || [];
      if (!Array.isArray(exercises) || exercises.length < 20) {
        ok = false;
        details.push(`Must contain 20 grammar exercises (found ${exercises.length})`);
      } else {
        exercises.forEach((ex, i) => {
          if (!ex.id || (!ex.question && !ex.sentence && !ex.prompt && !ex.question_en)) {
            ok = false;
            details.push(`Exercise #${i + 1} missing id or sentence/question text`);
          }
        });
      }
    }
    if (!ok) totalFailures++;
    reportModule(3, 'Grammar Station', ok, details);
  }

  // ---------------------------------------------------------------------------
  // 4. Word Match (word_match.js)
  // ---------------------------------------------------------------------------
  {
    const data = await loadModuleFile('word_match.js');
    const details = [];
    let ok = true;
    const vocabData = await loadModuleFile('vocab.js');
    const vList = Array.isArray(data) ? data : (data?.items || (Array.isArray(vocabData) ? vocabData : vocabData?.vocab || []));
    if (!vList || vList.length < 10) {
      ok = false;
      details.push('Word match requires at least 10 matching pairs');
    }
    if (!ok) totalFailures++;
    reportModule(4, 'Word Match', ok, details);
  }

  // ---------------------------------------------------------------------------
  // 5. Daily Watch (daily_watch.js)
  // ---------------------------------------------------------------------------
  {
    const data = await loadModuleFile('daily_watch.js');
    const details = [];
    let ok = true;
    const videos = Array.isArray(data) ? data : (data?.videos || []);
    if (videos.length < 5) {
      ok = false;
      details.push(`Must contain 5 videos (found ${videos.length})`);
    } else {
      videos.forEach((v, i) => {
        let ytid = v.videoId || v.youtube_id;
        if (!ytid && v.url) {
          const match = v.url.match(/(?:embed\/|v=|\/)([a-zA-Z0-9_-]{11})/);
          if (match) ytid = match[1];
        }
        if (!ytid || ytid.length !== 11) {
          ok = false;
          details.push(`Video #${i + 1} missing or invalid 11-char YouTube ID (${ytid})`);
        }
      });
    }
    if (!ok) totalFailures++;
    reportModule(5, 'Daily Watch', ok, details);
  }

  // ---------------------------------------------------------------------------
  // 6. Word Power (word_power.js)
  // ---------------------------------------------------------------------------
  {
    const data = await loadModuleFile('word_power.js');
    const details = [];
    let ok = true;
    if (!data) {
      ok = false;
      details.push('File word_power.js is missing');
    } else {
      const collocations = Array.isArray(data) ? data : (data.collocations || data.words || []);
      if (collocations.length < 10) {
        ok = false;
        details.push(`Must contain 10 action collocations (found ${collocations.length})`);
      } else {
        collocations.forEach((c, i) => {
          const w = c.word || c.phrase || c.collocation || '';
          if (!w.includes(' ')) {
            ok = false;
            details.push(`Collocation #${i + 1} "${w}" is a single word (must be a 2-4 word chunk)`);
          }
          if (!c.definition_en || !c.definition_vi) {
            ok = false;
            details.push(`Collocation #${i + 1} "${w}" missing definition_en or definition_vi`);
          }
        });
      }
    }
    if (!ok) totalFailures++;
    reportModule(6, 'Word Power', ok, details);
  }

  // ---------------------------------------------------------------------------
  // 7. Logic Lab (logic_science.js & singapore_math.js)
  // ---------------------------------------------------------------------------
  {
    const science = await loadModuleFile('logic_science.js');
    const math = await loadModuleFile('singapore_math.js');
    const details = [];
    let ok = true;
    if (!science && !math) {
      ok = false;
      details.push('Missing logic_science.js or singapore_math.js');
    } else {
      const sciList = Array.isArray(science) ? science : (science?.questions || science?.logic_science || []);
      const mathList = Array.isArray(math) ? math : (math?.problems || math?.singapore_math || []);
      if (sciList.length < 4) {
        ok = false;
        details.push(`Logic Science requires at least 4 questions (found ${sciList.length})`);
      }
      if (mathList.length < 5) {
        ok = false;
        details.push(`Singapore Math requires at least 5 bar model problems (found ${mathList.length})`);
      }
      // Check for raw LaTeX \text{
      const rawText = JSON.stringify({ science, math });
      if (/\\text\{/.test(rawText)) {
        ok = false;
        details.push('Contains raw LaTeX \\text{...} code (must use clean text formulas)');
      }
    }
    if (!ok) totalFailures++;
    reportModule(7, 'Logic Lab', ok, details);
  }

  // ---------------------------------------------------------------------------
  // 8. Mindmap / Idea Lab (mindmap.js)
  // ---------------------------------------------------------------------------
  {
    const data = await loadModuleFile('mindmap.js');
    const details = [];
    let ok = true;
    if (!data || !Array.isArray(data.centerStems) || data.centerStems.length < 6) {
      ok = false;
      details.push('Must contain 6 centerStems');
    } else {
      if (!data.branchLabels || typeof data.branchLabels !== 'object') {
        ok = false;
        details.push('Missing branchLabels object');
      } else {
        let branchCount = 0;
        data.centerStems.forEach((stem) => {
          const key = typeof stem === 'string' ? stem : (stem.text || stem.label || stem.title || stem.id);
          const branches = data.branchLabels[key] || data.branchLabels[stem.id] || [];
          branchCount += branches.length;
        });
        if (branchCount < 36) {
          ok = false;
          details.push(`Must contain 36 branches (6x6) (found ${branchCount})`);
        }
      }
    }
    if (!ok) totalFailures++;
    reportModule(8, 'Mindmap', ok, details);
  }

  // ---------------------------------------------------------------------------
  // 9. Ask AI (ask_ai.js)
  // ---------------------------------------------------------------------------
  {
    const data = await loadModuleFile('ask_ai.js');
    const details = [];
    let ok = true;
    const prompts = Array.isArray(data) ? data : (data?.prompts || data?.situations || []);
    if (prompts.length < 4) {
      ok = false;
      details.push(`Must contain at least 4 Ask AI prompts (found ${prompts.length})`);
    } else {
      prompts.forEach((p, i) => {
        const situation = p.situation_en || p.context_en || p.title_en;
        const promptText = p.prompt_en || p.sample_question_en || p.context_en;
        const suggested = p.suggested_question || p.sample_question_en || p.answer;
        if (!situation || !promptText || !suggested) {
          ok = false;
          details.push(`Prompt #${i + 1} missing situation_en, prompt_en, or suggested_question`);
        }
      });
    }
    if (!ok) totalFailures++;
    reportModule(9, 'Ask AI', ok, details);
  }

  // ---------------------------------------------------------------------------
  // 10. Dictation (dictation.js)
  // ---------------------------------------------------------------------------
  {
    const data = await loadModuleFile('dictation.js');
    const details = [];
    let ok = true;
    const sentences = Array.isArray(data) ? data : (data?.sentences || []);
    if (sentences.length < 10) {
      ok = false;
      details.push(`Must contain at least 10 dictation sentences (found ${sentences.length})`);
    } else {
      sentences.forEach((s, i) => {
        if (!s.text_en && !s.text && !s.sentence) {
          ok = false;
          details.push(`Sentence #${i + 1} missing text_en`);
        }
      });
    }
    if (!ok) totalFailures++;
    reportModule(10, 'Dictation', ok, details);
  }

  // ---------------------------------------------------------------------------
  // 11. Shadowing (shadowing.js)
  // ---------------------------------------------------------------------------
  {
    const data = await loadModuleFile('shadowing.js');
    const details = [];
    let ok = true;
    if (!data || !data.videoId) {
      ok = false;
      details.push('Missing videoId');
    } else {
      // If YouTube ID (11 chars), verify transcript JSON file. If TTS placeholder (e.g. shadowing_w36), verify sentences >= 10
      const isYt = data.videoId.length === 11 && !data.videoId.startsWith('shadowing_');
      if (isYt) {
        const transcriptP = path.join(process.cwd(), 'src', 'data', 'video_transcripts_by_id', 'sentences', `${data.videoId}.json`);
        if (!fs.existsSync(transcriptP)) {
          ok = false;
          details.push(`Deepgram transcript JSON file missing at src/data/video_transcripts_by_id/sentences/${data.videoId}.json`);
        }
      } else {
        const script = data.sentences || data.script || [];
        if (script.length < 10) {
          ok = false;
          details.push(`TTS Shadowing script requires at least 10 sentences (found ${script.length})`);
        }
      }
    }
    if (!ok) totalFailures++;
    reportModule(11, 'Shadowing', ok, details);
  }

  // ---------------------------------------------------------------------------
  // 12. Write & Speak (writing.js)
  // ---------------------------------------------------------------------------
  {
    const data = await loadModuleFile('writing.js');
    const details = [];
    let ok = true;
    if (!data) {
      ok = false;
      details.push('File writing.js is missing');
    } else {
      if (!Array.isArray(data.sentence_frames) || data.sentence_frames.length < 5) {
        ok = false;
        details.push('sentence_frames must be an array of at least 5 frames');
      } else {
        data.sentence_frames.forEach((sf, i) => {
          if (typeof sf === 'string') {
            ok = false;
            details.push(`sentence_frames #${i + 1} is a raw string (must be object { template: "___", answers: [...] })`);
          } else if (!sf.template) {
            ok = false;
            details.push(`sentence_frames #${i + 1} missing template property`);
          }
        });
      }
      const wb = data?.story_prompts?.picture_mode?.word_bank;
      if (!wb || !wb.action_verbs || !wb.cumulative_chunks || !wb.connectors || !wb.grammar_boosters) {
        ok = false;
        details.push('picture_mode.word_bank missing 4-color arrays (action_verbs, cumulative_chunks, connectors, grammar_boosters)');
      }
    }
    if (!ok) totalFailures++;
    reportModule(12, 'Write & Speak', ok, details);
  }

  // ---------------------------------------------------------------------------
  // 13. Explore (explore.js)
  // ---------------------------------------------------------------------------
  {
    const data = await loadModuleFile('explore.js');
    const details = [];
    let ok = true;
    if (!data || !data.content_en) {
      ok = false;
      details.push('File explore.js missing content_en');
    } else {
      const qs = data.check_questions || data.comprehension_questions || [];
      if (!Array.isArray(qs) || qs.length < 3) {
        ok = false;
        details.push('Must contain at least 3 comprehension questions');
      } else {
        qs.forEach((q, i) => {
          if (!q.options || !Array.isArray(q.options) || q.options.length < 3) {
            ok = false;
            details.push(`Question #${i + 1} missing MCQ options array (raw open essay inputs forbidden)`);
          }
        });
      }
    }
    if (!ok) totalFailures++;
    reportModule(13, 'Explore', ok, details);
  }

  // ---------------------------------------------------------------------------
  // 14. Game Hub (integrated data verification)
  // ---------------------------------------------------------------------------
  {
    const vocabData = await loadModuleFile('vocab.js');
    const readData = await loadModuleFile('read.js');
    const details = [];
    let ok = true;
    if (!vocabData || !readData) {
      ok = false;
      details.push('Game Hub requires valid vocab.js and read.js data sources');
    }
    if (!ok) totalFailures++;
    reportModule(14, 'Game Hub', ok, details);
  }

  // ---------------------------------------------------------------------------
  // 15. My Goals (SelfRegulation store verification)
  // ---------------------------------------------------------------------------
  {
    const details = [];
    let ok = true;
    const compP = path.join(process.cwd(), 'src', 'modules', 'self_regulation', 'SelfRegulation.jsx');
    if (!fs.existsSync(compP)) {
      ok = false;
      details.push('SelfRegulation.jsx component missing');
    }
    if (!ok) totalFailures++;
    reportModule(15, 'My Goals', ok, details);
  }

  // ---------------------------------------------------------------------------
  // 16. Weekly Review (ReviewDashboard store verification)
  // ---------------------------------------------------------------------------
  {
    const details = [];
    let ok = true;
    const compP = path.join(process.cwd(), 'src', 'modules', 'review', 'ReviewDashboard.jsx');
    if (!fs.existsSync(compP)) {
      ok = false;
      details.push('ReviewDashboard.jsx component missing');
    }
    if (!ok) totalFailures++;
    reportModule(16, 'Weekly Review', ok, details);
  }

  console.log(`\n================================================================`);
  if (totalFailures > 0) {
    console.error(`❌ DEEP FIELD VALIDATION FAILED FOR WEEK ${weekNum}! (${totalFailures} module failures)`);
    process.exit(1);
  } else {
    console.log(`🎉 ALL 16 MODULES PASSED DEEP FIELD VALIDATION 100% FOR WEEK ${weekNum}!`);
    console.log(`================================================================\n`);
    process.exit(0);
  }
}

runValidation().catch(err => {
  console.error('Fatal validator error:', err);
  process.exit(1);
});
