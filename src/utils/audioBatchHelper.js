import weekIndex from '../data/weeks/index';

// Helper: Làm sạch text để TTS đọc chuẩn
const cleanText = (text) => {
  if (!text) return "";
  return text.replace(/\*\*/g, "").replace(/\[.*?\]/g, "").trim();
};

export const generateAudioBatchScript = (weekId) => {
  const weekItem = weekIndex.find(w => w.id === parseInt(weekId));
  if (!weekItem) return `echo "Week ${weekId} not found!"`;

  let script = `echo "--- START BATCH GENERATION FOR WEEK ${weekId} (BOTH MODES) ---"\n`;
  script += `mkdir -p public/audio/week${weekId}\n`;
  script += `mkdir -p public/audio/week${weekId}_easy\n\n`; // Tạo cả thư mục Easy

  // Hàm sinh lệnh cho 1 tuần cụ thể (Advanced hoặc Easy)
  const generateCommandsForData = (data, folderName) => {
    let cmds = `echo ">>> Generating for: ${folderName}"\n`;
    
    // 1. Read & Explore
    if (data.stations?.read_explore) {
      const text = cleanText(data.stations.read_explore.content_en);
      if (text) {
        cmds += `python3 tools/generate_audio.py "${text}" "public/audio/${folderName}/read_explore_main.mp3"\n`;
      }
    }

    // 2. Explore (Mới: Thế giới/Khoa học)
    if (data.stations?.explore) {
      const text = cleanText(data.stations.explore.content_en);
      if (text) {
        cmds += `python3 tools/generate_audio.py "${text}" "public/audio/${folderName}/explore_main.mp3"\n`;
      }
    }

    // 3. New Words
    if (data.stations?.new_words?.vocab) {
      data.stations.new_words.vocab.forEach(w => {
        cmds += `python3 tools/generate_audio.py "${w.word}" "public/audio/${folderName}/vocab_${w.word}.mp3"\n`;
        cmds += `python3 tools/generate_audio.py "${w.definition_en}" "public/audio/${folderName}/vocab_def_${w.word}.mp3"\n`;
        if (w.example) cmds += `python3 tools/generate_audio.py "${w.example}" "public/audio/${folderName}/vocab_ex_${w.word}.mp3"\n`;
        if (w.collocation) cmds += `python3 tools/generate_audio.py "${w.collocation}" "public/audio/${folderName}/vocab_coll_${w.word}.mp3"\n`;
      });
    }

    // 4. Dictation
    if (data.stations?.dictation?.sentences) {
      data.stations.dictation.sentences.forEach((s, i) => {
        cmds += `python3 tools/generate_audio.py "${s.text}" "public/audio/${folderName}/dictation_${i+1}.mp3"\n`;
      });
    }

    // 5. Shadowing
    if (data.stations?.shadowing?.script) {
      data.stations.shadowing.script.forEach((s, i) => {
        cmds += `python3 tools/generate_audio.py "${s.text}" "public/audio/${folderName}/shadowing_${i+1}.mp3"\n`;
      });
    }

    // 6. Logic Lab (Math)
    if (data.stations?.logic_lab?.puzzles) {
      data.stations.logic_lab.puzzles.forEach(p => {
        if (p.question_en) {
           cmds += `python3 tools/generate_audio.py "${p.question_en}" "public/audio/${folderName}/logic_${p.id}.mp3"\n`;
        }
      });
    }

    // 7. Word Power
    if (data.stations?.word_power?.words) {
      data.stations.word_power.words.forEach(w => {
        cmds += `python3 tools/generate_audio.py "${w.word}" "public/audio/${folderName}/power_word_${w.word}.mp3"\n`;
        cmds += `python3 tools/generate_audio.py "${w.definition_en}" "public/audio/${folderName}/power_def_${w.word}.mp3"\n`;
        if (w.model_sentence) cmds += `python3 tools/generate_audio.py "${w.model_sentence}" "public/audio/${folderName}/power_ex_${w.word}.mp3"\n`;
        if (w.collocation) cmds += `python3 tools/generate_audio.py "${w.collocation}" "public/audio/${folderName}/power_coll_${w.word}.mp3"\n`;
      });
    }

    return cmds + "\n";
  };

  // Generate cho Advanced
  if (weekItem.data) {
    script += generateCommandsForData(weekItem.data, `week${weekId}`);
  }

  // Generate cho Easy (Nếu có)
  if (weekItem.dataEasy) {
    script += generateCommandsForData(weekItem.dataEasy, `week${weekId}_easy`);
  } else {
    script += `echo "No Easy data found for Week ${weekId}"\n`;
  }

  script += `echo "--- BATCH GENERATION COMPLETE ---"`;
  return script;
};
