/**
 * EngQuest3K MOCK Assessment Engine (MOCK-01)
 * Evaluates Early Mini Diagnostic assessment tasks for W33-W37.
 * Output: Diagnostic Practice Score & EngQuest Flyers Diagnostic Practice
 */

import { classifyDiagnosticTag } from '../../contracts/DiagnosticTaxonomy.js';
import { evaluateMotivationEvent } from '../gamification/MotivationService.js';

export function evaluateMockAssessment({
  mockId = 'MOCK-01',
  learnerId = 'learner_default_01',
  readingWritingAnswers = {},
  listeningAnswers = {},
  speakingScorePct = 80,
  timeSpentSeconds = 1200
}) {
  let totalPointsEarned = 0;
  let maxPointsTotal = 0;
  const sectionResults = [];
  const diagnosticSummary = [];

  // Section 1: Reading & Writing (Early Diagnostic Parts)
  let rwCorrect = 0;
  let rwTotal = 0;

  Object.entries(readingWritingAnswers).forEach(([itemId, isCorrect]) => {
    rwTotal++;
    if (isCorrect) rwCorrect++;
    else {
      diagnosticSummary.push({
        itemId,
        section: 'Reading & Writing',
        tag: itemId.includes('cloze') ? 'cloze_context_mismatch' : 'vocab_chunk_miss',
        classification: classifyDiagnosticTag(itemId.includes('cloze') ? 'cloze_context_mismatch' : 'vocab_chunk_miss')
      });
    }
  });

  if (rwTotal === 0) { rwTotal = 25; rwCorrect = 20; }
  totalPointsEarned += rwCorrect;
  maxPointsTotal += rwTotal;

  const rwPct = Math.round((rwCorrect / rwTotal) * 100);
  const rwShields = Math.min(5, Math.max(1, Math.round((rwPct / 100) * 5)));

  sectionResults.push({
    name: 'Reading & Writing',
    scorePct: rwPct,
    shields: rwShields,
    correctCount: rwCorrect,
    totalCount: rwTotal
  });

  // Section 2: Listening (Early Diagnostic Parts)
  let listenCorrect = 0;
  let listenTotal = 0;

  Object.entries(listeningAnswers).forEach(([itemId, isCorrect]) => {
    listenTotal++;
    if (isCorrect) listenCorrect++;
    else {
      diagnosticSummary.push({
        itemId,
        section: 'Listening',
        tag: 'detail_comprehension_error',
        classification: classifyDiagnosticTag('detail_comprehension_error')
      });
    }
  });

  if (listenTotal === 0) { listenTotal = 25; listenCorrect = 20; }
  totalPointsEarned += listenCorrect;
  maxPointsTotal += listenTotal;

  const listenPct = Math.round((listenCorrect / listenTotal) * 100);
  const listenShields = Math.min(5, Math.max(1, Math.round((listenPct / 100) * 5)));

  sectionResults.push({
    name: 'Listening',
    scorePct: listenPct,
    shields: listenShields,
    correctCount: listenCorrect,
    totalCount: listenTotal
  });

  // Section 3: Speaking (Early Diagnostic Parts)
  const speakingShields = Math.min(5, Math.max(1, Math.round((speakingScorePct / 100) * 5)));
  sectionResults.push({
    name: 'Speaking',
    scorePct: speakingScorePct,
    shields: speakingShields,
    correctCount: Math.round((speakingScorePct / 100) * 10),
    totalCount: 10
  });

  // Overall Diagnostic Practice Score
  const totalShieldsEarned = rwShields + listenShields + speakingShields;
  const overallPct = Math.round(((rwPct + listenPct + speakingScorePct) / 300) * 100);

  // Minimal Completion Motivation (ZERO badges / ZERO flashy rewards)
  const mockMotivation = evaluateMotivationEvent({
    learnerId,
    contentId: mockId,
    activityType: 'mock_test',
    scorePct: overallPct
  });

  // Remediation Target Identification
  let remediationTarget = null;
  if (totalShieldsEarned < 12) {
    let weakestSection = sectionResults.reduce((min, sec) => sec.scorePct < min.scorePct ? sec : min, sectionResults[0]);
    remediationTarget = {
      targetHub: weakestSection.name === 'Reading & Writing' ? 'Hub 1: World Discovery' : weakestSection.name === 'Listening' ? 'Hub 1: World Discovery (Listening)' : 'Hub 4: Nova Talk Show',
      recommendedAction: `Focus on ${weakestSection.name} Recheck drills and target vocabulary review.`
    };
  }

  return {
    mockId,
    learnerId,
    practiceScorePct: overallPct,
    diagnosticPractice: {
      totalShieldsEarned,
      maxShieldsTotal: 15,
      label: 'EngQuest Flyers Diagnostic Practice',
      diagnosticScoreLabel: 'Diagnostic Practice Score',
      ratingText: totalShieldsEarned >= 13 ? 'High Performance' : totalShieldsEarned >= 10 ? 'Moderate Performance' : 'Needs Practice'
    },
    sections: sectionResults,
    diagnosticSummary,
    remediationTarget,
    mockMotivation
  };
}

export default {
  evaluateMockAssessment
};
