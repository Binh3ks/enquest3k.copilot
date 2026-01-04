import { useState, useEffect } from 'react';
import weekIndex from '../data/weeks/index'; 

// FIX: Thêm tham số forceEasyMode để ép buộc đúng mode từ Hook
const injectAudioUrls = (weekData, forceEasyMode = false) => {
  if (!weekData) return null;
  const weekId = weekData.weekId; 
  
  // FIX: Ưu tiên forceEasyMode từ logic của App, sau đó mới check trong file data
  const isEasy = forceEasyMode || weekData.isEasy === true;
  
  // FIX: Logic đường dẫn Audio chuẩn
  // Advanced: /audio/week18/filename.mp3
  // Easy:     /audio/week18_easy/filename.mp3
  const audioBase = isEasy ? `/audio/week${weekId}_easy` : `/audio/week${weekId}`; 
  const mkUrl = (filename) => `${audioBase}/${filename}`;

  // Helper cho Vocab - Replace spaces with underscores for audio filenames
  const mapVocab = (w, prefix) => {
    const wordForAudio = w.word.replace(/\s+/g, '_').toLowerCase();
    return {
      ...w,
      audio_word: mkUrl(`${prefix}_${wordForAudio}.mp3`),
      audio_def: mkUrl(`${prefix}_def_${wordForAudio}.mp3`),
      audio_sent: mkUrl(`${prefix}_ex_${wordForAudio}.mp3`),
      audio_coll: w.collocation ? mkUrl(`${prefix}_coll_${wordForAudio}.mp3`) : null,
      audio_url: mkUrl(`${prefix}_${wordForAudio}.mp3`) 
    };
  };

  // Helper cho List
  const mapList = (item, idx, prefix) => ({ 
      ...item, 
      audio_url: mkUrl(`${prefix}_${idx + 1}.mp3`) 
  });

  // 1. Read & Explore
  if (weekData.stations?.read_explore) {
      weekData.stations.read_explore.audio_url = mkUrl('read_explore_main.mp3');
  }
  
  // 2. Explore
  if (weekData.stations?.explore) {
      weekData.stations.explore.audio_url = mkUrl('explore_main.mp3');
  }

  // 3. New Words
  if (weekData.stations?.new_words?.vocab) {
      weekData.stations.new_words.vocab = weekData.stations.new_words.vocab.map(w => mapVocab(w, 'vocab'));
  }

  // 4. Word Power - Fix prefix from "power_" to "wordpower_"
  if (weekData.stations?.word_power?.words) {
      weekData.stations.word_power.words = weekData.stations.word_power.words.map(w => {
        const wordForAudio = w.word.replace(/\s+/g, '_').toLowerCase();
        return {
          ...w,
          audio_word: mkUrl(`wordpower_${wordForAudio}.mp3`),
          audio_def: mkUrl(`wordpower_def_${wordForAudio}.mp3`),
          audio_sent: mkUrl(`wordpower_ex_${wordForAudio}.mp3`),
          audio_coll: w.collocation ? mkUrl(`wordpower_coll_${wordForAudio}.mp3`) : null,
          audio_url: mkUrl(`wordpower_${wordForAudio}.mp3`)
        };
      });
  }

  // 5. Dictation
  if (weekData.stations?.dictation?.sentences) {
      weekData.stations.dictation.sentences = weekData.stations.dictation.sentences.map((s, idx) => mapList(s, idx, 'dictation'));
  }

  // 6. Shadowing
  if (weekData.stations?.shadowing?.script) {
      weekData.stations.shadowing.script = weekData.stations.shadowing.script.map((s, idx) => mapList(s, idx, 'shadowing'));
  }

  // 7. Logic Lab
  if (weekData.stations?.logic_lab?.puzzles) {
      weekData.stations.logic_lab.puzzles = weekData.stations.logic_lab.puzzles.map(p => ({
          ...p, 
          audio_url: mkUrl(`logic_${p.id}.mp3`)
      }));
  }

  // 7b. Ask AI - Add audio_url for prompts
  if (weekData.stations?.ask_ai?.prompts) {
      weekData.stations.ask_ai.prompts = weekData.stations.ask_ai.prompts.map(p => ({
          ...p,
          audio_url: mkUrl(`ask_ai_${p.id}.mp3`)
      }));
  }

  // 8. MindMap Speaking - Add audio_url mappings WITHOUT changing data structure
  // Keep centerStems and branchLabels as strings/arrays
  // Audio URLs will be generated on-demand by the component
  if (weekData.stations?.mindmap_speaking) {
      // Add parallel audio maps so components can access file URLs without
      // mutating the original data structure (which is expected to be strings).
      const mm = weekData.stations.mindmap_speaking;
      if (mm.centerStems && Array.isArray(mm.centerStems)) {
        weekData.stations.mindmap_speaking.centerStemAudio = mm.centerStems.map((s, idx) => mkUrl(`mindmap_stem_${idx + 1}.mp3`));
      }
      if (mm.branchLabels && typeof mm.branchLabels === 'object') {
        const branchAudioMap = {};
        let globalBranchIdx = 1;
        // Iterate through branches in same order as centerStems to ensure correct numbering
        for (const [stemKey, branches] of Object.entries(mm.branchLabels)) {
          if (Array.isArray(branches)) {
            branchAudioMap[stemKey] = branches.map((b) => {
              const audioUrl = mkUrl(`mindmap_branch_${globalBranchIdx}.mp3`);
              globalBranchIdx++;
              return audioUrl;
            });
          } else {
            branchAudioMap[stemKey] = [];
          }
        }
        weekData.stations.mindmap_speaking.branchLabelsAudio = branchAudioMap;
      }
  }

  return weekData;
};

export const useFetchWeekData = (weekId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const mode = localStorage.getItem('engquest_content_mode') || 'advanced';
    
    const timer = setTimeout(() => {
      const weekItem = weekIndex.find(w => w.id === +weekId);
      let rawData = null;
      let isEasyMode = false;
        
      if (weekItem) {
        if (mode === 'easy' && weekItem.dataEasy) {
          rawData = weekItem.dataEasy;
          isEasyMode = true;
          console.log(`[DataHooks] Loading Week ${weekId} in EASY mode`);
          console.log(`[DataHooks] Easy data title:`, weekItem.dataEasy?.weekTitle_en);
          console.log(`[DataHooks] Easy vocab[0]:`, weekItem.dataEasy?.stations?.new_words?.vocab?.[0]?.word);
        } else {
          rawData = weekItem.data;
          isEasyMode = false;
          console.log(`[DataHooks] Loading Week ${weekId} in ADVANCED mode`);
          console.log(`[DataHooks] Advanced data title:`, weekItem.data?.weekTitle_en);
          console.log(`[DataHooks] Advanced vocab[0]:`, weekItem.data?.stations?.new_words?.vocab?.[0]?.word);
        }
      }

      if (rawData) {
        // FIX: Truyền isEasyMode vào hàm inject để đảm bảo đường dẫn đúng
        const processedData = injectAudioUrls(JSON.parse(JSON.stringify(rawData)), isEasyMode);
        setData(processedData);
      } else {
        setData(null);
      }
      setLoading(false);
    }, 50);

    return () => clearTimeout(timer);
  }, [weekId]);

  return { data, loading };
};

export const useStationData = (stationKey, weekData) => weekData?.stations?.[stationKey];
