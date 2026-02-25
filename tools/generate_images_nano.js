import fs from 'fs';
import path from 'path';

// === PROMPT EXPORT MODE ===
// Đọc image_url từ data files và tạo prompt theo đúng format gốc

// Utility: Extract filename from image_url path
function extractFilename(imageUrl) {
    return path.basename(imageUrl);
}

// Utility: Build prompt based on word/phrase
function buildPrompt(word, definition, type, weekNum = null) {
    if (type === 'vocab') {
        switch (word) {
            // Week 6 vocab
            case 'box':
                return `Cute 3D render of a colorful toy storage box, slightly open, Pixar animation style, vibrant colors, soft studio lighting, high resolution, clean simple background.`;
            case 'desk':
                return `Cute 3D render of a wooden desk with books and a pencil cup, sunlight from window, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'floor':
                return `Cute 3D render of a clean tiled floor, a colorful ball and toy car, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'wall':
                return `Cute 3D render of a pastel-colored wall with a framed picture and a window, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'window':
                return `Cute 3D render of a window with curtains, sunlight streaming through, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'door':
                return `Cute 3D render of a wooden door slightly open, child peeking out playfully, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'hide':
                return `Cute 3D character of a child playfully hiding behind a big plush curtain, Pixar style, vibrant colors, studio lighting, clean background.`;
            case 'seek':
                return `Cute 3D render of a child holding a large magnifying glass, searching for clues, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'treasure':
                return `Cute 3D render of a wooden chest overflowing with gold coins and colorful gems, sparkling, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'hunt':
                return `Cute 3D render of a child with a map and binoculars, searching for treasure, clues and footprints, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'ball':
                return `Cute 3D render of a round toy you play with, Pixar animation style, vibrant colors, soft studio lighting, high resolution, clean simple background.`;
            case 'toy':
                return `Cute 3D render of something you play with, Pixar animation style, vibrant colors, soft studio lighting, high resolution, clean simple background.`;
            
            // Week 7 ADVANCED vocab
            case 'whiteboard':
                return `Cute 3D render of a classroom whiteboard with colorful markers and eraser, child writing ABC, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'teacher':
                return `Cute 3D render of a friendly teacher character holding a book, glasses and warm smile, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'computer':
                return `Cute 3D render of a modern desktop computer with colorful screen, keyboard and mouse, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'pen':
                return `Cute 3D render of a blue ballpoint pen, shiny and new, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'ruler':
                return `Cute 3D render of a transparent plastic ruler with colorful markings, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'eraser':
                return `Cute 3D render of a pink rubber eraser with pencil shavings nearby, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'book':
                return `Cute 3D render of a colorful children's book slightly open, magical glow coming from pages, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'notebook':
                return `Cute 3D render of a spiral-bound notebook with colorful cover, pencil resting on top, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'pencil case':
                return `Cute 3D render of a colorful pencil case with zipper, pencils and crayons peeking out, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'backpack':
                return `Cute 3D render of a bright school backpack with straps and pockets, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            
            // Week 7 EASY vocab
            case 'pencil':
                return `Cute 3D render of a yellow wooden pencil with pink eraser top, sharpened point, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'crayon':
                return `Cute 3D render of colorful crayons in a pile, wax texture visible, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'scissors':
                return `Cute 3D render of child-safe scissors with rounded tips, colorful handles, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'glue':
                return `Cute 3D render of a white glue bottle with orange cap, craft supplies nearby, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'paper':
                return `Cute 3D render of white paper sheets with colorful drawings, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'marker':
                return `Cute 3D render of colorful permanent markers with caps, vibrant colors showing, Pixar style, soft studio lighting, clean background.`;
            case 'lunch box':
                return `Cute 3D render of a colorful lunch box with sandwich and fruit inside, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'water bottle':
                return `Cute 3D render of a transparent water bottle with colorful cap, water droplets on surface, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'school bag':
                return `Cute 3D render of a small colorful school bag with front pocket, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'folder':
                return `Cute 3D render of a colorful folder with papers inside, organized and neat, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            
            default:
                return `Cute 3D render of ${definition}, Pixar animation style, vibrant colors, soft studio lighting, high resolution, clean simple background.`;
        }
    }
    if (type === 'wordpower') {
        switch (word) {
            // Week 6 word power
            case 'under the table':
                return `Cute 3D render, low angle view from the floor, toy under a wooden table, table legs surrounding, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'in the box':
                return `Cute 3D render, isometric view, open cardboard box, toy sitting deep inside, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'next to the door':
                return `Cute 3D render of a chair placed right beside a wooden door, both objects clearly visible, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'under the bed':
                return `Cute 3D render of under the bed, Pixar animation style, vibrant colors, soft studio lighting, clean background.`;
            case 'in the bag':
                return `Cute 3D render of in the bag, Pixar animation style, vibrant colors, soft studio lighting, clean background.`;
            case 'on the desk':
                return `Cute 3D render of on the desk, Pixar animation style, vibrant colors, soft studio lighting, clean background.`;
            
            // Week 7 ADVANCED word power
            case 'pack your bag':
                return `Cute 3D render of a child packing books and pencils into a colorful backpack, organized supplies on table, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'raise your hand':
                return `Cute 3D render of a happy child sitting at desk raising hand enthusiastically, classroom setting, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'take notes':
                return `Cute 3D render of a child writing in a notebook with pencil, concentrated expression, colorful supplies nearby, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            
            // Week 7 EASY word power
            case 'color pictures':
                return `Cute 3D render of a child coloring pictures with crayons, colorful artwork on paper, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'cut paper':
                return `Cute 3D render of child-safe scissors cutting colorful paper, paper shapes scattered, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            case 'drink water':
                return `Cute 3D render of a happy child drinking water from a colorful bottle, refreshing moment, Pixar style, vibrant colors, soft studio lighting, clean background.`;
            
            default:
                return `Cute 3D render of ${word}, Pixar animation style, vibrant colors, soft studio lighting, clean background.`;
        }
    }
    if (type === 'read_cover') {
        // Week-specific covers - update based on week theme
        if (weekNum === '7') {
            return `3D illustration of two happy children looking at school supplies in a colorful backpack, books and pencils glowing, Pixar style, vibrant colors, soft studio lighting, clean background.`;
        }
        return `3D illustration of two happy children reading a glowing treasure map book together, magical atmosphere, Pixar style, vibrant colors, soft studio lighting, clean background.`;
    }
    if (type === 'explore_cover') {
        if (weekNum === '7') {
            return `3D illustration of children exploring a classroom with magnifying glass, discovering school supplies, happy curious faces, Pixar style, vibrant colors, soft studio lighting, clean background.`;
        }
        return `3D illustration of children exploring with magnifying glass, happy faces, Pixar style, vibrant colors, soft studio lighting, clean background.`;
    }
    return `Cute 3D render of ${definition}, Pixar animation style, vibrant colors, soft studio lighting, high resolution, clean simple background.`;
}

async function exportPromptsForWeek(weekNum, isEasy = false) {
    let lines = [];
    let idx = 1;
    const weekPadded = weekNum.toString().padStart(2, '0'); // Ensure 01, 02, etc.
    const weekDir = path.join('src', isEasy ? 'data/weeks_easy' : 'data/weeks', `week_${weekPadded}`);
    
    // Vocab
    const vocabPath = path.join(weekDir, 'vocab.js');
    if (fs.existsSync(vocabPath)) {
        console.log(`📖 Reading vocab from: ${vocabPath}`);
        const module = await import(path.resolve(vocabPath));
        const vocabData = module.default.vocab;
        console.log(`   Found ${vocabData.length} vocab items`);
        for (const v of vocabData) {
            const filename = extractFilename(v.image_url);
            const prompt = buildPrompt(v.word, v.definition_en, 'vocab', weekNum);
            lines.push(`${idx}. Hãy tạo các hình ảnh 3D sống động sau đây. Filename: ${filename}. ${prompt}`);
            idx++;
        }
    } else {
        console.log(`⚠️  Vocab file not found: ${vocabPath}`);
    }
    
    // Word Power
    const wpPath = path.join(weekDir, 'word_power.js');
    if (fs.existsSync(wpPath)) {
        console.log(`📖 Reading word power from: ${wpPath}`);
        const module = await import(path.resolve(wpPath));
        const wpData = module.default.words;
        console.log(`   Found ${wpData.length} word power items`);
        for (const w of wpData) {
            const filename = extractFilename(w.image_url);
            const prompt = buildPrompt(w.word, w.definition_en, 'wordpower', weekNum);
            lines.push(`${idx}. Hãy tạo các hình ảnh 3D sống động sau đây. Filename: ${filename}. ${prompt}`);
            idx++;
        }
    } else {
        console.log(`⚠️  Word power file not found: ${wpPath}`);
    }
    
    // Covers
    const readCover = isEasy ? `read_cover_w${weekNum}.jpg` : `read_cover_w${weekNum}.jpg`;
    const exploreCover = isEasy ? `explore_cover_w${weekNum}.jpg` : `explore_cover_w${weekNum}.jpg`;
    
    lines.push(`${idx}. Hãy tạo các hình ảnh 3D sống động sau đây. Filename: ${readCover}. ${buildPrompt('', '', 'read_cover', weekNum)}`);
    idx++;
    lines.push(`${idx}. Hãy tạo các hình ảnh 3D sống động sau đây. Filename: ${exploreCover}. ${buildPrompt('', '', 'explore_cover', weekNum)}`);
    
    // Write to file — output to public/images/Prompts/ for Nano Banana workflow
    const outDir = path.join('public', 'images', 'Prompts');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const outPath = path.join(outDir, `week_${weekNum}${isEasy ? '_easy' : ''}_image_prompts.txt`);
    fs.writeFileSync(outPath, lines.join('\n'), 'utf-8');
    console.log(`✅ Exported prompts for week ${weekNum}${isEasy ? ' (easy)' : ''} to ${outPath}`);
}

async function main() {
    const weekNum = process.argv[2];
    if (!weekNum) {
        console.error('Vui lòng truyền số tuần (vd: node tools/generate_images_nano.js 06)');
        process.exit(1);
    }
    await exportPromptsForWeek(weekNum, false); // advanced
    await exportPromptsForWeek(weekNum, true);  // easy
}

main();
