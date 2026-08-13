import { useState, useEffect } from 'react';
import weekIndex, { loadWeekData } from '../data/weeks/index'; 
import { VoiceService } from '../services/voiceService';

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
    // 🔥 FIX: Add mode-aware ID to prevent conflicts between easy/advanced modes
    const modePrefix = isEasy ? 'ez_' : 'adv_';
    return {
      ...w,
      id: `${modePrefix}${w.id}`, // Change id from "1" to "ez_1" or "adv_1"
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

  // 6. Shadowing — audio_url intentionally NOT injected here.
  // TTS uses hash-based R2 paths (keyed by text content), not fixed index-based paths.
  // Injecting audio_url would cause stale R2 audio to play when text has been updated.

  // 7. Logic Lab
  if (weekData.stations?.logic_lab?.puzzles) {
      const modePrefix = isEasy ? 'ez_' : 'adv_';
      weekData.stations.logic_lab.puzzles = weekData.stations.logic_lab.puzzles.map(p => ({
          ...p,
          id: `${modePrefix}${p.id}`, // Add mode prefix to puzzle IDs
          audio_url: mkUrl(`logic_${p.id}.mp3`)
      }));
  }

  // 7b. Ask AI - audio_url now points to correct R2 files (regenerated Feb 2026
  // with Deepgram using answer text, not context_en).
  // Use: python3 tools/generate_audio_deepgram.py <week> --station ask_ai --upload
  if (weekData.stations?.ask_ai?.prompts) {
      weekData.stations.ask_ai.prompts = weekData.stations.ask_ai.prompts.map((p, idx) => {
        const id = p.id || (idx + 1);
        return {
          ...p,
          id,
          audio_url: mkUrl(`ask_ai_${id}.mp3`)
        };
      });
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

export const useFetchWeekData = (weekId, learningMode = 'advanced') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create a cache key that includes the learning mode
  const cacheKey = `week_${weekId}_${learningMode}`;

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const isEasy = learningMode === 'easy';
        console.log(`[DataHooks] Fetching Week ${weekId} in ${isEasy ? 'EASY' : 'ADVANCED'} mode`);

        // ⚡ Dynamic import - only load requested week
        const rawData = await loadWeekData(weekId, isEasy);

        if (isMounted) {
          if (rawData) {
            console.log(`[DataHooks] Loaded data title:`, rawData?.weekTitle_en || rawData?.title);

            
            // Deep copy before processing to avoid mutation issues
            const deepClonedData = JSON.parse(JSON.stringify(rawData));
            
            // Inject audio URLs
            const processedData = injectAudioUrls(deepClonedData, isEasy);
            setData(processedData);

            // 🚀 Automatically pre-generate ALL Google Cloud TTS cache for the entire week!
            VoiceService.prefetchEntireWeek(weekId, learningMode).catch(() => {});
          } else {
            console.warn(`[DataHooks] Week ${weekId} data not found for ${learningMode} mode.`);
            setData(null);
            setError(`Data for week ${weekId} (${learningMode}) not found.`);
          }
        }
      } catch (err) {
        console.error(`[DataHooks] Error loading week ${weekId} (${learningMode}):`, err);
        if (isMounted) {
          setError(err.message);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [weekId, learningMode]); // Rerun effect when weekId or learningMode changes

  return { data, loading, error };
};

export const useStationData = (stationKey, weekData) => weekData?.stations?.[stationKey];
