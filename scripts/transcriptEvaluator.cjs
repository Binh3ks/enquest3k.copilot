/**
 * transcriptEvaluator.js — LLM-driven semantic evaluation of video transcripts
 *
 * Instead of counting exact string matches for chunks, this module:
 * 1. Feeds the LLM the video transcript + syllabus goals
 * 2. Asks it to evaluate semantic alignment (0-100 score)
 * 3. Returns structured relevance data
 */

const { callLLM } = require('./llmClient.cjs');

const SYSTEM_PROMPT = `You are an ESL content evaluator for Vietnamese K-12 students (A1-B1).
You evaluate whether a YouTube video transcript is suitable for an English learning lesson.

IMPORTANT CONTEXT: You are evaluating REAL YouTube videos, not ideal textbook content.
A natural 3-5 minute ESL dialogue will NEVER contain 100% of a textbook's vocabulary list.
Your job is to find videos that are GOOD ENOUGH for classroom use, not perfect matches.

SCORING CRITERIA (0-100):

1. Vocabulary Relevance (0-30 points):
   The target vocabulary list is a TEXTBOOK INVENTION. In real ESL videos:
   - 0-10 pts: 0-1 target words found, topic completely unrelated
   - 11-20 pts: 2-3 target words found, OR topic is related but words don't appear
   - 21-30 pts: 4+ target words found, OR strong semantic alignment with topic
   EXAMPLES:
   - "school" topic: video about "classroom", "teacher", "book", "student" = GOOD (semantic alignment)
   - "family" topic: video about "mom", "dad", "brother", "sister" = GOOD (semantic alignment)
   - "sports" topic: video about "football", "basketball", "running" = GOOD (semantic alignment)
   DO NOT require exact word matches. Semantic alignment with the TOPIC matters more.

2. Grammar Alignment (0-20 points):
   - Does the transcript use the target grammar structures naturally?
   - For "verb to be": look for "I am", "you are", "he is", "we are" etc.
   - If grammar appears even once in natural dialogue = full points
   - If grammar is absent but dialogue is natural = still give 10+ points

3. Conversational Authenticity (0-20 points):
   - Is this natural dialogue between real people?
   - Does it sound like something kids would actually hear?
   - Robotic/scripted content = low score (5-10 pts)
   - Natural back-and-forth = high score (15-20 pts)

4. Age Appropriateness (0-15 points):
   - Content suitable for 6-12 year old Vietnamese students?
   - Topics like jobs, dating, politics = low score (0-5 pts)
   - Topics like school, family, daily routine = high score (12-15 pts)

5. Transcript Quality (0-15 points):
   - Punctuated, well-structured, easy to read
   - Auto-generated captions with errors = low score (5 pts)
   - Manually created captions = high score (12-15 pts)

VERDICT RULES:
- PASS if score >= 50 AND the video is pedagogically useful for this topic
- FAIL if score < 50 OR content is completely off-topic
- A score of 50-65 = "usable but not ideal"
- A score of 65-80 = "good match"
- A score of 80+ = "excellent match"

BE GENEROUS: A video with 3+ vocab words, natural grammar, and authentic dialogue
should almost always PASS, even if it doesn't contain every target word.

Output MUST be valid JSON.`;

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

EVALUATION RULES:
1. Check if transcript words are SEMANTICALLY RELATED to the topic
2. Check if transcript uses the target grammar structures
3. Check if dialogue is authentic and age-appropriate
4. Check transcript quality

SCORING GUIDELINES:
- Vocabulary: 3+ words from topic = good (20/30), 5+ = great (25/30)
- Grammar: Used naturally = full points (20/20)
- Conversation: Natural flow = high points (up to 20/20)
- Age: School/family/daily routine = high (up to 15/15)
- Quality: Punctuated captions = high (up to 15/15)

VERDICT:
- PASS if total score >= 50 AND the video is pedagogically useful
- FAIL only if score < 50 OR completely off-topic

Return this JSON:
{
  "score": 0-100,
  "verdict": "PASS" or "FAIL",
  "vocabulary_match": {
    "matched_words": ["list of target words found in transcript"],
    "count": 0,
    "percentage": "e.g. 33%",
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

  // Log raw response for debugging
  console.log(`    🤖 LLM eval raw (first 500): ${rawResponse.slice(0, 500)}`);

  // Parse JSON from response — multiple fallback strategies
  let parsed;
  try {
    parsed = JSON.parse(rawResponse);
  } catch (e) {
    // Try extracting from markdown code block
    const jsonMatch = rawResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      try {
        parsed = JSON.parse(jsonMatch[1].trim());
      } catch (e2) {
        // Try cleaning common JSON issues (trailing commas, unescaped quotes)
        const cleaned = jsonMatch[1].trim()
          .replace(/,\s*}/g, '}')
          .replace(/,\s*]/g, ']')
          .replace(/"/g, '"')
          .replace(/\\"/g, '"');
        try { parsed = JSON.parse(cleaned); } catch (e3) { /* continue */ }
      }
    }
    if (!parsed) {
      // Try finding any JSON object in the response
      const objMatch = rawResponse.match(/\{[\s\S]*\}/);
      if (objMatch) {
        try {
          const cleaned = objMatch[0]
            .replace(/,\s*}/g, '}')
            .replace(/,\s*]/g, ']');
          parsed = JSON.parse(cleaned);
        } catch (e4) { /* continue */ }
      }
    }
    if (!parsed) {
      // Final fallback: extract score + verdict from raw text via regex
      const scoreMatch = rawResponse.match(/"score"\s*:\s*(\d+)/);
      const verdictMatch = rawResponse.match(/"verdict"\s*:\s*"(PASS|FAIL)"/);
      const reasonMatch = rawResponse.match(/"reason"\s*:\s*"([^"]+)"/);
      if (scoreMatch && verdictMatch) {
        parsed = {
          score: parseInt(scoreMatch[1]),
          verdict: verdictMatch[1],
          reason: reasonMatch ? reasonMatch[1] : 'Parsed from text',
          vocabulary_match: { matched_words: [], count: 0, score: 0 },
          grammar_match: { matched_structures: [], score: 0 },
          conversational_quality: { is_natural_dialogue: true, score: 0 },
          age_appropriate: true,
          age_score: 0,
          transcript_quality: { has_punctuation: true, is_readable: true, score: 0 }
        };
        console.log(`    🤖 Regex fallback: score=${parsed.score} verdict=${parsed.verdict}`);
      } else {
        console.log(`  ⚠️  Failed to parse LLM evaluation, defaulting to FAIL`);
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
