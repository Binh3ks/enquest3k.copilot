import fs from 'fs';
import path from 'path';

const root = process.cwd();

// 1. Update WorldDiscoveryHub.jsx JSX text segments
const worldPath = path.join(root, 'src', 'modules', 'cambridge_suite', 'WorldDiscoveryHub.jsx');
let worldContent = fs.readFileSync(worldPath, 'utf8');

// Replace the hardcoded Tom's alarm clock JSX paragraph in WorldDiscoveryHub.jsx
const oldJsxPattern = /\{renderParsedText\("Tom \*\*woke up in a hurry\*\* today\. First, he \*\*felt extremely clumsy\*\* when he "\)\}[\s\S]*?\{renderParsedText\(", he \*\*spilled a glass of juice\*\* over his English notebook! Fortunately, his sister Mia helped him \*\*cleaned up the mess\*\*\. After that, Tom "\)\}/;

const newJsxContent = `{renderParsedText("Jake was walking **carefully down the school corridor** today. Suddenly, a classmate running fast ")}{' '}
                {interactiveStory.mode === 'open_cloze' ? (
                  <input
                    type="text"
                    value={storyAnswers[1] || ''}
                    onChange={(e) => setStoryAnswers((prev) => ({ ...prev, 1: e.target.value }))}
                    placeholder={interactiveStory.hints?.[1] || "____"}
                    className="w-48 px-3 py-1.5 mx-1 rounded-xl border-2 border-indigo-400 bg-white text-indigo-950 font-black text-center text-base sm:text-lg focus:ring-4 focus:ring-indigo-200 focus:outline-none shadow-inner placeholder:text-slate-400 placeholder:italic placeholder:text-sm"
                  />
                ) : (
                  <button
                    onClick={() => setSelectedGapId(1)}
                    className={\`px-4 py-1.5 mx-1 rounded-xl border-2 font-black text-lg sm:text-xl transition-all \${
                      selectedGapId === 1
                        ? 'bg-indigo-600 text-white font-black ring-4 ring-indigo-200'
                        : storyAnswers[1]
                        ? 'bg-indigo-100 text-indigo-900 border-indigo-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                    }\`}
                  >
                    {storyAnswers[1] || \`[ \${interactiveStory.hints?.[1] || 'Blank 1'} ]\`}
                  </button>
                )}{' '}
                {renderParsedText(" on the wet slippery tiles and ")}{' '}
                {interactiveStory.mode === 'open_cloze' ? (
                  <input
                    type="text"
                    value={storyAnswers[2] || ''}
                    onChange={(e) => setStoryAnswers((prev) => ({ ...prev, 2: e.target.value }))}
                    placeholder={interactiveStory.hints?.[2] || "____"}
                    className="w-48 px-3 py-1.5 mx-1 rounded-xl border-2 border-indigo-400 bg-white text-indigo-950 font-black text-center text-base sm:text-lg focus:ring-4 focus:ring-indigo-200 focus:outline-none shadow-inner placeholder:text-slate-400 placeholder:italic placeholder:text-sm"
                  />
                ) : (
                  <button
                    onClick={() => setSelectedGapId(2)}
                    className={\`px-4 py-1.5 mx-1 rounded-xl border-2 font-black text-lg sm:text-xl transition-all \${
                      selectedGapId === 2
                        ? 'bg-indigo-600 text-white font-black ring-4 ring-indigo-200'
                        : storyAnswers[2]
                        ? 'bg-indigo-100 text-indigo-900 border-indigo-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                    }\`}
                  >
                    {storyAnswers[2] || \`[ \${interactiveStory.hints?.[2] || 'Blank 2'} ]\`}
                  </button>
                )}
                {renderParsedText(" heavily near the science room. ")}{' '}
                {interactiveStory.mode === 'open_cloze' ? (
                  <input
                    type="text"
                    value={storyAnswers[3] || ''}
                    onChange={(e) => setStoryAnswers((prev) => ({ ...prev, 3: e.target.value }))}
                    placeholder={interactiveStory.hints?.[3] || "____"}
                    className="w-48 px-3 py-1.5 mx-1 rounded-xl border-2 border-indigo-400 bg-white text-indigo-950 font-black text-center text-base sm:text-lg focus:ring-4 focus:ring-indigo-200 focus:outline-none shadow-inner placeholder:text-slate-400 placeholder:italic placeholder:text-sm"
                  />
                ) : (
                  <button
                    onClick={() => setSelectedGapId(3)}
                    className={\`px-4 py-1.5 mx-1 rounded-xl border-2 font-black text-lg sm:text-xl transition-all \${
                      selectedGapId === 3
                        ? 'bg-indigo-600 text-white font-black ring-4 ring-indigo-200'
                        : storyAnswers[3]
                        ? 'bg-indigo-100 text-indigo-900 border-indigo-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                    }\`}
                  >
                    {storyAnswers[3] || \`[ \${interactiveStory.hints?.[3] || 'Blank 3'} ]\`}
                  </button>
                )}{' '}
                {renderParsedText(", Jake stopped immediately and ")}{' '}
                {interactiveStory.mode === 'open_cloze' ? (
                  <input
                    type="text"
                    value={storyAnswers[4] || ''}
                    onChange={(e) => setStoryAnswers((prev) => ({ ...prev, 4: e.target.value }))}
                    placeholder={interactiveStory.hints?.[4] || "____"}
                    className="w-48 px-3 py-1.5 mx-1 rounded-xl border-2 border-indigo-400 bg-white text-indigo-950 font-black text-center text-base sm:text-lg focus:ring-4 focus:ring-indigo-200 focus:outline-none shadow-inner placeholder:text-slate-400 placeholder:italic placeholder:text-sm"
                  />
                ) : (
                  <button
                    onClick={() => setSelectedGapId(4)}
                    className={\`px-4 py-1.5 mx-1 rounded-xl border-2 font-black text-lg sm:text-xl transition-all \${
                      selectedGapId === 4
                        ? 'bg-indigo-600 text-white font-black ring-4 ring-indigo-200'
                        : storyAnswers[4]
                        ? 'bg-indigo-100 text-indigo-900 border-indigo-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                    }\`}
                  >
                    {storyAnswers[4] || \`[ \${interactiveStory.hints?.[4] || 'Blank 4'} ]\`}
                  </button>
                )}{' '}
                {renderParsedText(" the school nurse for medical help. The nurse arrived quickly with a ")}`;

worldContent = worldContent.replace(oldJsxPattern, newJsxContent);
fs.writeFileSync(worldPath, worldContent, 'utf8');

// 2. Update FlashArena.jsx set1 and set2
const flashPath = path.join(root, 'src', 'modules', 'hubs', 'station2', 'LearnMode', 'FlashArena.jsx');
let flashContent = fs.readFileSync(flashPath, 'utf8');

const newVocabSets = `const WEEK33_VOCAB_SETS = {
  set1_nouns_adj: [
    { id: "na01", en: "corridor", vi: "hành lang" },
    { id: "na02", en: "bandage", vi: "băng cá nhân" },
    { id: "na03", en: "nurse", vi: "y tế / y tá" },
    { id: "na04", en: "cold pack", vi: "túi chườm lạnh" },
    { id: "na05", en: "relieved", vi: "nhẹ nhõm" },
    { id: "na06", en: "praised", vi: "khen ngợi" },
    { id: "na07", en: "carefully", vi: "cẩn thận" },
    { id: "na08", en: "immediately", vi: "ngay lập tức" },
    { id: "na09", en: "truce", vi: "hòa bình / ngưng chiến" },
    { id: "na10", en: "olympic", vi: "thế vận hội" }
  ],
  set2_verbs: [
    { id: "v01", en: "slipped", vi: "đã trượt chân" },
    { id: "v02", en: "fell down", vi: "đã ngã xuống" },
    { id: "v03", en: "called", vi: "đã gọi trợ giúp" },
    { id: "v04", en: "treated", vi: "đã sơ cứu" },
    { id: "v05", en: "applied", vi: "đã băng bó" },
    { id: "v06", en: "reminded", vi: "đã nhắc nhở" },
    { id: "v07", en: "followed", vi: "đã tuân thủ" },
    { id: "v08", en: "helped", vi: "đã giúp đỡ" },
    { id: "v09", en: "stopped", vi: "đã dừng lại" },
    { id: "v10", en: "praised", vi: "đã khen ngợi" }
  ],`;

flashContent = flashContent.replace(/const WEEK33_VOCAB_SETS = \{\s*set1_nouns_adj: \[\s*[\s\S]*?\n  \],\s*set2_verbs: \[\s*[\s\S]*?\n  \],/, newVocabSets);
fs.writeFileSync(flashPath, flashContent, 'utf8');

console.log('🎉 Successfully fixed JSX story templates in WorldDiscoveryHub and FlashArena vocab sets!');
