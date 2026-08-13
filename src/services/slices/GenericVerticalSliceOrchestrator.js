/**
 * Generic Vertical Slice Orchestrator & Task Adapters
 * Milestone 5 Architecture Integration
 *
 * Demonstrates a single reusable orchestration pipeline supporting 4 interaction patterns
 * + Decoupled Motivation Event Layer (Stage 8).
 */

import { validateWeekContentSchema, DEFAULT_TASK_CONFIG } from '../../contracts/ContentSchemas.js';
import { classifyDiagnosticTag, ERROR_TAXONOMY } from '../../contracts/DiagnosticTaxonomy.js';
import { validateAttemptPayload, normalizeAttemptLogEntry } from '../../contracts/ProgressContracts.js';
import { learnerProgressService } from '../learnerProgressService.js';
import { evaluateMotivationEvent } from '../gamification/MotivationService.js';

/**
 * Task Adapter 1: Open Cloze Adapter
 */
export const OpenClozeAdapter = {
  taskType: 'open_cloze',
  configureTask(interactiveStoryData = {}) {
    const gaps = Array.isArray(interactiveStoryData.gaps) ? interactiveStoryData.gaps : [];
    return {
      taskType: 'open_cloze',
      title: interactiveStoryData.title || 'Interactive Story Open Cloze',
      passThresholdPct: 80,
      recheckItemLimit: 3,
      gapCount: gaps.length || DEFAULT_TASK_CONFIG.gapCount,
      gaps,
      wordBank: Array.isArray(interactiveStoryData.word_bank) ? interactiveStoryData.word_bank : []
    };
  },
  scoreAttempt(taskConfig, userAnswers = {}) {
    const gaps = taskConfig.gaps || [];
    let correctCount = 0;
    const itemDetails = [];

    gaps.forEach((g) => {
      const userAns = String(userAnswers[g.id] || '').toLowerCase().trim();
      const targetAns = String(g.target || '').toLowerCase().trim();
      const isCorrect = userAns === targetAns;

      if (isCorrect) correctCount += 1;

      itemDetails.push({
        itemId: g.id,
        userAns,
        targetAns,
        isCorrect,
        diagnosticTag: isCorrect ? null : 'cloze_context_mismatch'
      });
    });

    const totalItems = gaps.length || 1;
    const scorePct = Math.round((correctCount / totalItems) * 100);

    return {
      scorePct,
      correctCount,
      totalItems,
      itemDetails,
      isPassed: scorePct >= taskConfig.passThresholdPct
    };
  }
};

/**
 * Task Adapter 2: Choice Question Adapter (R&W Part 3)
 */
export const ChoiceQuestionAdapter = {
  taskType: 'choice_questions',
  configureTask(readingPart3Data = {}) {
    const questions = Array.isArray(readingPart3Data.questions) ? readingPart3Data.questions : [];
    return {
      taskType: 'choice_questions',
      title: readingPart3Data.title || 'Cambridge Flyers Reading Part 3',
      passThresholdPct: 70,
      recheckItemLimit: 3,
      questionCount: questions.length || 5,
      questions
    };
  },
  scoreAttempt(taskConfig, userAnswers = {}) {
    const questions = taskConfig.questions || [];
    let correctCount = 0;
    const itemDetails = [];

    questions.forEach((q) => {
      const userSelectedOpt = userAnswers[q.id];
      const selectedLabel = userSelectedOpt ? userSelectedOpt.label : null;
      const targetOpt = (q.options || []).find((o, idx) => o.isCorrect || idx === q.answerIndex);
      const targetLabel = targetOpt ? targetOpt.label : 'A';
      const isCorrect = selectedLabel === targetLabel;

      if (isCorrect) correctCount += 1;

      itemDetails.push({
        itemId: q.id,
        questionText: q.question,
        selectedLabel,
        targetLabel,
        isCorrect,
        diagnosticTag: isCorrect ? null : 'detail_comprehension_error'
      });
    });

    const totalItems = questions.length || 1;
    const scorePct = Math.round((correctCount / totalItems) * 100);

    return {
      scorePct,
      correctCount,
      totalItems,
      itemDetails,
      isPassed: scorePct >= taskConfig.passThresholdPct
    };
  }
};

/**
 * Task Adapter 3: Matching Pairs Adapter (Supports both Text Vocab & Listening Visual Matching)
 */
export const MatchingAdapter = {
  taskType: 'matching_pairs',
  configureTask(matchingData = {}) {
    const pairs = Array.isArray(matchingData.pairs)
      ? matchingData.pairs
      : Array.isArray(matchingData)
      ? matchingData
      : [];

    const isListeningTask = Boolean(matchingData.audioPrompt || matchingData.isListening);

    return {
      taskType: isListeningTask ? 'listening_visual_matching' : 'matching_pairs',
      title: matchingData.title || (isListeningTask ? 'Listening Visual Matching' : 'Vocabulary & Definition Matching'),
      audioPrompt: matchingData.audioPrompt || null,
      isListening: isListeningTask,
      passThresholdPct: 80,
      recheckItemLimit: 3,
      pairCount: pairs.length || 5,
      pairs
    };
  },
  scoreAttempt(taskConfig, userAnswers = {}) {
    const pairs = taskConfig.pairs || [];
    let correctCount = 0;
    const itemDetails = [];
    const isListening = taskConfig.isListening;

    pairs.forEach((p) => {
      const userMatchedRightId = userAnswers[p.id];
      const isCorrect = userMatchedRightId === p.id;

      if (isCorrect) correctCount += 1;

      itemDetails.push({
        itemId: p.id,
        leftText: p.leftText || p.word,
        rightText: p.rightText || p.definition_en || p.definition_vi,
        rightImage: p.rightImage || null,
        userMatchedRightId,
        isCorrect,
        diagnosticTag: isCorrect ? null : (isListening ? 'detail_comprehension_error' : 'vocab_chunk_miss')
      });
    });

    const totalItems = pairs.length || 1;
    const scorePct = Math.round((correctCount / totalItems) * 100);

    return {
      scorePct,
      correctCount,
      totalItems,
      itemDetails,
      isPassed: scorePct >= taskConfig.passThresholdPct
    };
  }
};

/**
 * Generic Reusable Vertical Slice Orchestrator
 * Executes the complete 8-stage learning, assessment, & motivation pipeline.
 */
export async function executeGenericVerticalSlice({
  adapter,
  rawData,
  weekData,
  userAnswers = {},
  learnerId = 'learner_default_01',
  contentIdOverride = null,
  timeSpentSeconds = 45,
  previousScorePct = null,
  currentStreak = 0
}) {
  if (!adapter || typeof adapter.configureTask !== 'function' || typeof adapter.scoreAttempt !== 'function') {
    throw new Error('Invalid Task Adapter supplied to GenericVerticalSliceOrchestrator');
  }

  // Stage 1: Content Schema Validation
  const schemaValidation = validateWeekContentSchema(weekData);

  // Stage 2: Task Configuration via Adapter
  const taskConfig = adapter.configureTask(rawData);

  // Stage 3: Answer Validation & Scoring via Adapter
  const scoreResult = adapter.scoreAttempt(taskConfig, userAnswers);

  // Stage 4: Diagnostic Error Classification (Knowledge vs Comprehension vs Execution)
  let primaryDiagnosticTag = null;
  let errorClassification = null;

  const failedItem = scoreResult.itemDetails.find((d) => !d.isCorrect);
  if (failedItem) {
    primaryDiagnosticTag = failedItem.diagnosticTag;
    errorClassification = classifyDiagnosticTag(primaryDiagnosticTag);
  }

  // Stage 5: Learner Progress Payload & Logging
  const weekNum = weekData?.weekId || weekData?.week || 33;
  const contentId = contentIdOverride || `w${weekNum}_${taskConfig.taskType || adapter.taskType}`;

  const rawPayload = {
    learnerId,
    contentId,
    mode: 'learn',
    result: scoreResult.isPassed ? 'correct' : 'incorrect',
    score: scoreResult.scorePct,
    hintUsed: false,
    diagnosticTag: primaryDiagnosticTag,
    timeSpentSeconds
  };

  const payloadValidation = validateAttemptPayload(rawPayload);
  const normalizedEntry = normalizeAttemptLogEntry(rawPayload);

  let progressRecord = null;
  if (payloadValidation.valid) {
    progressRecord = await learnerProgressService.logAttempt(rawPayload);
  }

  // Stage 6: Remediation Target Identification
  let remediationTarget = null;
  if (!scoreResult.isPassed) {
    let activityName = 'Interactive Story Cloze Hints';
    if (taskConfig.taskType === 'choice_questions') activityName = 'Comprehension Questions (Part 3)';
    if (taskConfig.taskType === 'matching_pairs') activityName = 'Vocabulary & Definition Matching';
    if (taskConfig.taskType === 'listening_visual_matching') activityName = 'Listening Part 3 Visual Matching';

    remediationTarget = {
      targetHub: taskConfig.taskType === 'listening_visual_matching' ? 'Hub 1: World Discovery (Listening)' : 'Hub 1: World Discovery',
      component: 'WorldDiscoveryHub.jsx',
      activity: activityName,
      recommendedAction: taskConfig.taskType === 'listening_visual_matching'
        ? 'Re-play audio prompt and verify visual picture targets A-H'
        : taskConfig.taskType === 'matching_pairs'
        ? 'Review target vocabulary definitions and IPA audio pronunciation'
        : taskConfig.taskType === 'choice_questions'
        ? 'Re-read narrative webtoon story text and verify key event details'
        : 'Review HoverWord tooltips and hint popovers for target vocabulary chunks'
    };
  }

  // Stage 7: Task-Configurable Recheck Drill Generation (up to recheckItemLimit)
  let recheckDrill = null;
  const limit = taskConfig.recheckItemLimit || 3;

  if (!scoreResult.isPassed && scoreResult.itemDetails.some((d) => !d.isCorrect)) {
    const failedItems = scoreResult.itemDetails.filter((d) => !d.isCorrect).slice(0, limit);
    recheckDrill = {
      drillId: `recheck_w${weekNum}_${taskConfig.taskType || adapter.taskType}`,
      title: `Targeted ${taskConfig.title} Recheck Drill`,
      items: failedItems.map((fi) => ({
        itemId: fi.itemId,
        diagnosticTag: fi.diagnosticTag,
        targetLabel: fi.targetLabel || fi.leftText || null,
        hint: taskConfig.taskType === 'listening_visual_matching'
          ? 'Re-play targeted audio segment for visual match'
          : 'Review target vocabulary definition and audio'
      }))
    };
  }

  // Stage 8: Motivation & Gamification Event Processing (Decoupled Layer)
  const motivationData = evaluateMotivationEvent({
    contentId,
    scorePct: scoreResult.scorePct,
    previousScorePct,
    isRecheckDrill: taskConfig.taskType?.includes('recheck') || false,
    currentStreak
  });

  return {
    stage1_schemaValidation: schemaValidation,
    stage2_taskConfig: taskConfig,
    stage3_scoreResult: scoreResult,
    stage4_errorClassification: errorClassification,
    stage5_progressLog: {
      payloadValidation,
      normalizedEntry,
      progressRecord
    },
    stage6_remediationTarget: remediationTarget,
    stage7_recheckDrill: recheckDrill,
    stage8_motivation: motivationData
  };
}

export default {
  OpenClozeAdapter,
  ChoiceQuestionAdapter,
  MatchingAdapter,
  executeGenericVerticalSlice
};
