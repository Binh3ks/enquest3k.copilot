import weekIndex from '../data/weeks/index';

// Hàm helper để lấy ngẫu nhiên N phần tử
const getRandomItems = (arr, n) => {
    if (!arr || arr.length === 0) return [];
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
};

export const generateSmartReview = (currentWeekId = 1) => {
    // CHÍNH SÁCH MỚI: Tuần 1 không có Review.
    if (currentWeekId <= 1) return [];

    let pastWeeksData = [];
    
    // Lấy data các tuần QUÁ KHỨ (nhỏ hơn currentWeekId)
    pastWeeksData = weekIndex
        .filter(w => w.id < currentWeekId && w.data)
        .map(w => w.data);

    if (pastWeeksData.length === 0) return [];

    let reviewTasks = [];

    pastWeeksData.forEach(week => {
        const weekId = week.weekId;
        const stations = week.stations;

        // A. TỪ VỰNG (VOCAB)
        if (stations.new_words && stations.new_words.vocab) {
            // Lấy tối đa 5 từ để trộn
            const randomVocabs = getRandomItems(stations.new_words.vocab, 5);
            randomVocabs.forEach(v => {
                let taskDisplay = "";
                let answerKey = "";
                let typeDisplay = "Word Recall";

                if (v.collocation) {
                    const regex = new RegExp(v.word, "gi");
                    taskDisplay = v.collocation.replace(regex, "_____");
                    answerKey = v.word; 
                    typeDisplay = "Collocation Fill";
                } else {
                    taskDisplay = v.definition_vi ? `Nghĩa: "${v.definition_vi}"` : `Def: "${v.definition_en}"`;
                    answerKey = v.word;
                    typeDisplay = "Vocab Recall";
                }

                reviewTasks.push({
                    id: `w${weekId}_v_${v.id}`,
                    week: weekId,
                    type: 'Word',
                    subType: typeDisplay,
                    task: taskDisplay,
                    answer: answerKey,
                    checkType: 'text',
                    hint: v.definition_en,
                    audioUrl: v.audio_word || null,
                    content: `Week ${weekId}: ${v.word}`
                });
            });
        }

        // B. NGỮ PHÁP (GRAMMAR)
        if (stations.grammar && stations.grammar.exercises) {
            const validExercises = stations.grammar.exercises.filter(e => e.type === 'fill' || e.type === 'mc');
            // Lấy tối đa 3 câu để trộn
            const randomGrammar = getRandomItems(validExercises, 3);
            
            randomGrammar.forEach(g => {
                const ans = Array.isArray(g.answer) ? g.answer[0] : g.answer;
                reviewTasks.push({
                    id: `w${weekId}_g_${g.id}`,
                    week: weekId,
                    type: 'Grammar',
                    subType: 'Grammar Fill',
                    task: g.question, 
                    answer: ans,
                    checkType: 'text',
                    hint: g.hint,
                    audioUrl: null,
                    content: `Week ${weekId}: Grammar Q${g.id}`
                });
            });
        }
    });

    // LỌC NGẪU NHIÊN ĐỂ ĐỦ 8 CÂU (5 VOCAB + 3 GRAMMAR)
    const vocabItems = reviewTasks.filter(t => t.type === 'Word');
    const grammarItems = reviewTasks.filter(t => t.type === 'Grammar');

    const selectedVocab = getRandomItems(vocabItems, 5); 
    const selectedGrammar = getRandomItems(grammarItems, 3); 

    return [...selectedVocab, ...selectedGrammar].sort(() => 0.5 - Math.random());
};
