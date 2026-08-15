const STORAGE_PROGRESS_KEY = 'engquest_learner_progress_v1';
const STORAGE_USER_ALIAS_KEY = 'engquest_persistent_learner_aliases_v1';
const STORAGE_PARENT_MAP_KEY = 'engquest_parent_identity_mappings_v1';

const ANIMAL_ALIASES = ['Sóc Nhanh Trí', 'Thỏ Sáng Tạo', 'Cáo Thám Hiểm', 'Gấu Siêu Trí', 'Cú Thông Thái', 'Hổ Dũng Cảm'];

/**
 * Generate or fetch deterministic persistent anonymous alias for a learner.
 * Guaranteed 100% persistent across sessions (NOT randomized per reload).
 */
function getOrCreatePersistentAlias(learnerId) {
  let aliases = {};
  try {
    const raw = localStorage.getItem(STORAGE_USER_ALIAS_KEY);
    if (raw) aliases = JSON.parse(raw);
  } catch (e) {
    console.error('Error reading aliases from localStorage', e);
  }

  if (aliases[learnerId]) {
    return aliases[learnerId];
  }

  // Create deterministic hash-based alias
  let hash = 0;
  for (let i = 0; i < learnerId.length; i++) {
    hash = (hash << 5) - hash + learnerId.charCodeAt(i);
    hash |= 0;
  }
  const animalIndex = Math.abs(hash) % ANIMAL_ALIASES.length;
  const numSuffix = (Math.abs(hash) % 899) + 100;
  const newAlias = `Bé ${ANIMAL_ALIASES[animalIndex]} #${numSuffix}`;

  aliases[learnerId] = newAlias;
  try {
    localStorage.setItem(STORAGE_USER_ALIAS_KEY, JSON.stringify(aliases));
  } catch (e) {
    console.error('Error saving alias to localStorage', e);
  }
  return newAlias;
}

/**
 * Initialize mock private parent-child identity mapping (stored in isolated local key).
 */
function initMockParentMapping(learnerId) {
  let parentMap = {};
  try {
    const raw = localStorage.getItem(STORAGE_PARENT_MAP_KEY);
    if (raw) parentMap = JSON.parse(raw);
  } catch (e) {
    console.error('Error reading parent map', e);
  }

  if (!parentMap[learnerId]) {
    parentMap[learnerId] = {
      learner_id: learnerId,
      real_child_name: 'Bé Nguyễn Minh Anh',
      anonymous_alias: getOrCreatePersistentAlias(learnerId),
      class_group: 'Class 3A - W33',
      parent_email: 'parent@engquest3k.edu.vn'
    };
    try {
      localStorage.setItem(STORAGE_PARENT_MAP_KEY, JSON.stringify(parentMap));
    } catch (e) {
      console.error('Error saving parent map', e);
    }
  }
}

export const learnerProgressService = {
  /**
   * Log attempt real-time according to Schema 1.3
   */
  async logAttempt({
    learnerId = 'learner_default_01',
    contentId,
    mode = 'learn',
    result,
    hintUsed = false,
    minorErrors = [],
    diagnosticTag = null,
    score = 0,
    timeSpentSeconds = 0
  }) {
    await new Promise((resolve) => setTimeout(resolve, 30));
    initMockParentMapping(learnerId);

    const newAttemptEntry = {
      timestamp: new Date().toISOString(),
      result, // 'correct' | 'incorrect' | 'minor_error'
      hint_used: hintUsed,
      minor_errors: minorErrors,
      diagnostic_tag: diagnosticTag
    };

    let allProgress = [];
    try {
      const raw = localStorage.getItem(STORAGE_PROGRESS_KEY);
      if (raw) allProgress = JSON.parse(raw);
    } catch (e) {
      allProgress = [];
    }

    let existingRecord = allProgress.find(
      (item) => item.learner_id === learnerId && item.content_id === contentId && item.mode === mode
    );

    if (existingRecord) {
      existingRecord.attempt_log.push(newAttemptEntry);
      existingRecord.final_score = Math.max(existingRecord.final_score || 0, score);
      existingRecord.time_spent_seconds += timeSpentSeconds;
    } else {
      existingRecord = {
        learner_id: learnerId,
        content_id: contentId,
        mode: mode,
        attempt_log: [newAttemptEntry],
        final_score: score,
        ai_score_raw: null,
        human_verified: false,
        time_spent_seconds: timeSpentSeconds
      };
      allProgress.push(existingRecord);
    }

    try {
      localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(allProgress));
      const xpAwarded = Math.round(score * 1.5);
      console.log(`[GAMIFICATION_SRS_DEBUG] Progress saved for activity: ${contentId} | Score: ${score} | XP Awarded: ${xpAwarded} | Mode: ${mode}`);
    } catch (e) {
      console.error('Failed to save progress', e);
    }

    return existingRecord;
  },

  /**
   * Get progress for a learner
   */
  async getLearnerProgress(learnerId = 'learner_default_01', mode = 'learn') {
    await new Promise((resolve) => setTimeout(resolve, 40));
    try {
      const raw = localStorage.getItem(STORAGE_PROGRESS_KEY);
      if (!raw) return [];
      const all = JSON.parse(raw);
      return all.filter((item) => item.learner_id === learnerId && item.mode === mode);
    } catch (e) {
      return [];
    }
  },

  /**
   * Get public group leaderboard (PII-Protected, displays ONLY persistent anonymous aliases)
   */
  async getGroupLeaderboard(groupId = 'class_3a_w33') {
    await new Promise((resolve) => setTimeout(resolve, 50));
    
    // Seed mock class entries if needed
    const mockLearners = [
      { id: 'learner_default_01', baseScore: 480 },
      { id: 'learner_02_kiet', baseScore: 420 },
      { id: 'learner_03_nhi', baseScore: 390 },
      { id: 'learner_04_lam', baseScore: 350 },
      { id: 'learner_05_bao', baseScore: 310 }
    ];

    return mockLearners.map((l, index) => ({
      rank: index + 1,
      anonymous_alias: getOrCreatePersistentAlias(l.id),
      avatar_badge: `badge_hero_${(index % 3) + 1}`,
      group_id: groupId,
      weekly_score: l.baseScore,
      streak_days: 5 - index
    }));
  },

  /**
   * Private Parent Dashboard Identity Resolver.
   * NOTE: Cô lập logic sẵn sàng cho auth (isolated by design). Hiện chưa tích hợp
   * hệ thống auth thực tế (do auth chưa tồn tại trong hệ thống), nhưng interface
   * này được tách biệt hoàn toàn khỏi các query leaderboard công khai để sẵn sàng
   * gắn token authentication thực trong tương lai.
   */
  async getPrivateParentIdentity(learnerId, parentAuthToken = 'mock_parent_token') {
    await new Promise((resolve) => setTimeout(resolve, 30));
    if (!parentAuthToken) {
      throw new Error('Unauthorized access: Parent authentication token required');
    }
    initMockParentMapping(learnerId);

    try {
      const raw = localStorage.getItem(STORAGE_PARENT_MAP_KEY);
      const parentMap = raw ? JSON.parse(raw) : {};
      return parentMap[learnerId] || null;
    } catch (e) {
      return null;
    }
  },

  /**
   * Reset progress (Sandbox mode helper)
   */
  async resetAllProgress() {
    localStorage.removeItem(STORAGE_PROGRESS_KEY);
    return true;
  },

  /**
   * Export complete device learner progress to structured JSON object.
   * STRICT PII-SAFE ARCHITECTURE: Zero real names, emails, or child identity stored in export file.
   */
  async exportLearnerProgressJSON(learnerId = 'learner_default_01') {
    await new Promise((resolve) => setTimeout(resolve, 30));
    initMockParentMapping(learnerId);

    const progressRecords = await this.getLearnerProgress(learnerId, 'learn');
    const checkRecords = await this.getLearnerProgress(learnerId, 'check');
    const parentMap = await this.getPrivateParentIdentity(learnerId);

    return {
      export_version: '1.0',
      exported_at: new Date().toISOString(),
      system: 'EngQuest3K Gamified Hub - Station 2',
      learner_profile: {
        learner_id: learnerId,
        anonymous_alias: getOrCreatePersistentAlias(learnerId),
        class_group: parentMap ? parentMap.class_group : 'Class 3A - W33'
      },
      summary_kpis: {
        total_learn_attempts: progressRecords.reduce((acc, r) => acc + r.attempt_log.length, 0),
        total_check_attempts: checkRecords.reduce((acc, r) => acc + r.attempt_log.length, 0),
        total_time_spent_seconds: [...progressRecords, ...checkRecords].reduce((acc, r) => acc + r.time_spent_seconds, 0)
      },
      progress_records: [...progressRecords, ...checkRecords]
    };
  },

  /**
   * Trigger automatic file download of exported JSON progress file
   */
  async downloadLearnerProgressJSON(learnerId = 'learner_default_01') {
    const data = await this.exportLearnerProgressJSON(learnerId);
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const dateSlug = new Date().toISOString().split('T')[0];
    const fileName = `engquest_progress_export_${learnerId}_${dateSlug}.json`;

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return { fileName, data };
  }
};
