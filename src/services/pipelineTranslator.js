/**
 * Pipeline Translation & Data Transformation Utility for Cambridge Suite.
 * Automates content expansion, Webtoon storytelling conversion, and Cambridge Exam Check Mode mapping.
 */

export const pipelineTranslator = {
  /**
   * Expand target 10 core irregular verbs into 20 full vocabulary items (ESL Standard)
   */
  expandVocabList(coreWords = []) {
    // 10 Core Irregular Verbs Group 5 (The Accident File)
    const expanded = [
      { id: 'v01', word: 'broke', type: 'verb_past', definition_en: 'Damaged something into pieces by accident.', definition_vi: 'đã làm vỡ / làm gãy', phonetic: '/broʊk/' },
      { id: 'v02', word: 'fell', type: 'verb_past', definition_en: 'Dropped down to the ground suddenly.', definition_vi: 'đã ngã / đã rơi', phonetic: '/fɛl/' },
      { id: 'v03', word: 'lost', type: 'verb_past', definition_en: 'Could not find something owned.', definition_vi: 'đã làm mất', phonetic: '/lɔːst/' },
      { id: 'v04', word: 'found', type: 'verb_past', definition_en: 'Discovered something after looking for it.', definition_vi: 'đã tìm thấy', phonetic: '/faʊnd/' },
      { id: 'v05', word: 'mistake', type: 'noun', definition_en: 'An action that is incorrect or unwise.', definition_vi: 'sai lầm / lỗi sai', phonetic: '/mɪˈsteɪk/' },
      { id: 'v06', word: 'hurt', type: 'verb_past', definition_en: 'Felt pain or caused injury.', definition_vi: 'đã làm đau / bị đau', phonetic: '/hɜːrt/' },
      { id: 'v07', word: 'spilled', type: 'verb_past', definition_en: 'Flowed over the edge of a container by accident.', definition_vi: 'đã làm đổ nước', phonetic: '/spɪld/' },
      { id: 'v08', word: 'tore', type: 'verb_past', definition_en: 'Pulled something apart into pieces.', definition_vi: 'đã xé rách', phonetic: '/tɔːr/' },
      { id: 'v09', word: 'slipped', type: 'verb_past', definition_en: 'Slid accidentally on a wet surface.', definition_vi: 'đã trượt chân', phonetic: '/slɪpt/' },
      { id: 'v10', word: 'forgot', type: 'verb_past', definition_en: 'Failed to remember something.', definition_vi: 'đã quên', phonetic: '/fərˈɡɑːt/' },
      // 10 Extended Vocabulary Items for Context Enrichment
      { id: 'v11', word: 'dropped', type: 'verb_past', definition_en: 'Let something fall down accidentally.', definition_vi: 'đã đánh rơi', phonetic: '/drɑːpt/' },
      { id: 'v12', word: 'damaged', type: 'adjective', definition_en: 'Hurt or broken in condition.', definition_vi: 'bị hư hại', phonetic: '/ˈdæm.ɪdʒd/' },
      { id: 'v13', word: 'apologized', type: 'verb_past', definition_en: 'Said sorry for a mistake made.', definition_vi: 'đã xin lỗi', phonetic: '/əˈpɑː.lə.dʒaɪzd/' },
      { id: 'v14', word: 'clumsy', type: 'adjective', definition_en: 'Moving or doing things in a careless way.', definition_vi: 'vụng về', phonetic: '/ˈklʌm.zi/' },
      { id: 'v15', word: 'bandage', type: 'noun', definition_en: 'A strip of cloth to cover an injury.', definition_vi: 'băng cá nhân / băng gạc', phonetic: '/ˈbæn.dɪdʒ/' },
      { id: 'v16', word: 'careful', type: 'adjective', definition_en: 'Giving attention to avoid accidents.', definition_vi: 'cẩn thận', phonetic: '/ˈker.fəl/' },
      { id: 'v17', word: 'puddle', type: 'noun', definition_en: 'A small pool of liquid on the ground.', definition_vi: 'vũng nước', phonetic: '/ˈpʌd.əl/' },
      { id: 'v18', word: 'repaired', type: 'verb_past', definition_en: 'Fixed something that was broken.', definition_vi: 'đã sửa chữa', phonetic: '/rɪˈperd/' },
      { id: 'v19', word: 'caution', type: 'noun', definition_en: 'Great care taken to avoid danger.', definition_vi: 'sự cẩn trọng', phonetic: '/ˈkɔː.ʃən/' },
      { id: 'v20', word: 'unfortunate', type: 'adjective', definition_en: 'Having bad luck or unpleasing events.', definition_vi: 'không may mắn', phonetic: '/ʌnˈfɔːr.tʃə.nət/' }
    ];

    return expanded;
  },

  /**
   * Convert Webtoon story frame into 3D Picture Story Prompt for Writing Studio
   */
  webtoonTo3DPictureStory(storyFrames = []) {
    return storyFrames.map((frame, index) => ({
      panel_id: `panel_${index + 1}`,
      title_en: `Panel ${index + 1}: ${frame.title_en || 'Scene'}`,
      title_vi: `Cảnh ${index + 1}: ${frame.title_vi || 'Diễn biến'}`,
      image_prompt: `Cute 3D render of ${frame.scene_description || 'a boy in a room'}, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image.`,
      image_url: frame.image_url || `/images/week33/panel_${index + 1}.webp`
    }));
  },

  /**
   * Map Content Bank item to Cambridge MCQ Exam Format
   */
  mapToCheckModeFormat(contentItem) {
    return {
      content_id: contentItem.content_id,
      exam_reference: contentItem.exam_reference || { exam: 'Flyers', part: 'Reading Part 2', cefr_level: 'A2' },
      question_type: 'MCQ',
      question_text: contentItem.raw_content?.text || 'Select the correct grammatical sentence:',
      options: contentItem.answer_key?.valid_structures?.map((tokens, idx) => ({
        label: String.fromCharCode(65 + idx),
        text: tokens.join(' ').replace(/\s+([.,!?:;])/g, '$1')
      })) || []
    };
  }
};
