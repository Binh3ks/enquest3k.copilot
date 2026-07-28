/**
 * transcriptEvaluator.js — LLM-driven semantic evaluation of video transcripts
 *
 * Instead of counting exact string matches for chunks, this module:
 * 1. Feeds the LLM the video transcript + syllabus goals
 * 2. Asks it to evaluate semantic alignment (0-100 score)
 * 3. Returns structured relevance data
 */

const { callLLM } = require('./llmClient');

const SYSTEM_PROMPT = `You are an ESL content evaluator for Vietnamese K-12 students (A1-B1).
You evaluate whether a YouTube video transcript is suitable for an English learning lesson.

SCORING CRITERIA (0-100):
- Vocabulary relevance (0-30): Does the transcript use words from the target vocabulary?
- Grammar alignment (0-20): Does the transcript naturally use the target grammar structures?
- Conversational authenticity (0-20): Is this natural dialogue or scripted/robotic?
- Age appropriateness (0-15): Is the content appropriate for young learners?
- Transcript quality (0-15): Is it punctuated, well-structured, easy to read?

HARD REQUIREMENTS (automatic reject if ANY fail):
- Transcript must contain at least 3 target vocabulary words
- Transcript must be in English
- Transcript must have clear sentence boundaries

Output MUST be valid JSON.
Be strict — most YouTube videos are NOT suitable for classroom use.`;

function buildEvaluationPrompt(transcript, syllabusMeta, weekTitle, videoTitle) {
  // Truncate transcript to ~2000 chars to fit context
  const truncatedTranscript = transcript.length > 2000
    ? transcript.slice(0, 2000) + '... [truncated]'
    : transcript;

  return `Evaluate this YouTube video transcript for an English lesson.

LESSON CONTEXT:
- Week Topic: "${syllabusMeta.topic || weekTitle}"
- Grammar Focus: "${syllabusMeta.grammarFocus || 'none'}"
- Target Vocabulary: ${JSON.stringify(syllabusMeta.vocabWords || [])}
- Target Conversational Phrases: ${JSON.stringify(syllabusMeta.conversationalExpressions || [])}

VIDEO:
- Title: "${videoTitle}"

TRANSCRIPT:
${truncatedTranscript}

Evaluate and return this JSON:
{
  "score": 0-100,
  "verdict": "PASS" or "FAIL",
  "vocabulary_match": {
    "matched_words": ["list of target words found in transcript"],
    "count": 0,
    "score": 0-30
  },
  "grammar_match": {
    "matched_structures": ["list of grammar patterns found"],
    "score": 0-20
  },
  "conversational_quality": {
    "is_natural_dialogue": true/false,
    "score": 0-20
  },
  "age_appropriate": true/false,
  "age_score": 0-15,
  "transcript_quality": {
    "has_punctuation": true/false,
    "is_readable": true/false,
    "score": 0-15
  },
  "reason": "one sentence explaining the verdict"
}`;
}

/**
 * Evaluate a transcript against syllabus goals using LLM
 * @param {string} transcript - The full transcript text
 * @param {Object} syllabusMeta - { topic, grammarFocus, vocabWords, conversationalExpressions }
 * @param {string} weekTitle - fallback title
 * @param {string} videoTitle - YouTube video title
 * @returns {Promise<{score: number, verdict: string, details: Object}>}
 */
async function evaluateTranscript(transcript, syllabusMeta, weekTitle, videoTitle) {
  const prompt = buildEvaluationPrompt(transcript, syllabusMeta, weekTitle, videoTitle);

  const rawResponse = await callLLM(prompt, SYSTEM_PROMPT);

  // Parse JSON from response
  let parsed;
  try {
    parsed = JSON.parse(rawResponse);
  } catch (e) {
    const jsonMatch = rawResponse.match(/```json\s*([\s\S]*?)```/);
    if (jsonMatch) {
      parsed = JSON.parse(jsonMatch[1].trim());
    } else {
      const objMatch = rawResponse.match(/\{[\s\S]*\}/);
      if (objMatch) {
        parsed = JSON.parse(objMatch[0]);
      } else {
        console.log(`  ⚠️  Failed to parse evaluation response, defaulting to FAIL`);
        return { score: 0, verdict: 'FAIL', details: { reason: 'Parse error' } };
      }
    }
  }

  return {
    score: parsed.score || 0,
    verdict: parsed.verdict || 'FAIL',
    details: parsed,
  };
}

module.exports = { evaluateTranscript };
