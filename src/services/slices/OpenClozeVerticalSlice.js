/**
 * EngQuest3K Golden Vertical Slice: Hub 1 Open Cloze (R&W Part 4)
 * Milestone 2 Refactoring: Delegates to GenericVerticalSliceOrchestrator
 */

import {
  OpenClozeAdapter,
  executeGenericVerticalSlice
} from './GenericVerticalSliceOrchestrator.js';

export function configureOpenClozeTask(interactiveStoryData) {
  return OpenClozeAdapter.configureTask(interactiveStoryData);
}

export function scoreOpenClozeAttempt(taskConfig, userAnswers) {
  return OpenClozeAdapter.scoreAttempt(taskConfig, userAnswers);
}

export async function executeOpenClozeVerticalSlice({
  weekData,
  userAnswers = {},
  learnerId = 'learner_default_01',
  timeSpentSeconds = 45
}) {
  const rawStory = weekData?.readingHub?.interactive_story || weekData?.interactive_story || {};
  const weekNum = weekData?.weekId || weekData?.week || 33;

  return executeGenericVerticalSlice({
    adapter: OpenClozeAdapter,
    rawData: rawStory,
    weekData,
    userAnswers,
    learnerId,
    contentIdOverride: `w${weekNum}_interactive_story`,
    timeSpentSeconds
  });
}

export default {
  configureOpenClozeTask,
  scoreOpenClozeAttempt,
  executeOpenClozeVerticalSlice
};
