/**
 * transcriptEvaluator.js — Shadowing-specific LLM evaluation
 *
 * Evaluated videos must be TWO-WAY DIALOGUES suitable for role-play shadowing.
 * Monologues, documentaries, and narration are instant-rejected.
 */

const { callLLM } = require('./llmClient.cjs');

const SYSTEM_PROMPT = `You are an Expert ESL Curriculum Director specializing in K-12 language acquisition. Your task is to evaluate YouTube video transcripts to determine if they are highly suitable for a "Shadowing" (Listen & Repeat) role-play exercise.

You will be provided with:
1. Target Topic & Target Age Group
2. Target Grammar Focus
3. Target Vocabulary List
4. Video Transcript (with timestamps/sentences)

### CORE PHILOSOPHY
A great shadowing video is a NATURAL, TWO-WAY CONVERSATION. Students must shadow authentic back-and-forth dialogue (First and Second person: "I", "You"). They should NOT shadow a narrator, a documentary, a vlog monologue, or a list of textbook sentences.

### INSTANT REJECT CONDITIONS (FATAL FLAWS)
If ANY of the following are true, immediately set verdict to "FAIL" and score to 0:
1. THE MONOLOGUE TRAP: The transcript is mostly third-person description (e.g., "Students go to school. They eat lunch.") or a single person talking to the camera without interaction.
2. ADULT/OFF-TOPIC THEMES: The content contains inappropriate topics or complex adult scenarios (e.g., corporate job interviews, political debates) unsuitable for the Target Age Group.
3. INCOMPREHENSIBLE ASR: The transcript is a wall of text with missing punctuation, run-on sentences, or garbled words that would make sentence-by-sentence chunking impossible.

### EVALUATION RUBRIC (0 - 100 Points)

1. Format & Interaction (0 - 35 points) - THE MOST CRITICAL FACTOR
- 35 pts: Authentic two-way (or multi-speaker) dialogue. Clear question-and-answer patterns. Frequent use of "I" and "You". Natural conversational markers (greetings, fillers like "Oh", "Really?").
- 15 pts: Q&A format but feels heavily scripted or slightly robotic.
- 0 pts: Monologue, documentary, or presentation. (Triggers Instant Reject).

2. Vocabulary Integration (0 - 25 points) - BE REALISTIC
*DO NOT demand a 100% vocabulary match.* Authentic conversations rarely contain every word from a syllabus.
- 20-25 pts: Contains a reasonable portion (30-50%+) of the target vocabulary used in a natural, highly contextual way.
- 10-19 pts: Contains 1-2 target words, but the overall topic is highly relevant.
- 0 pts: Completely off-topic and zero target words.

3. Grammar Alignment (0 - 20 points)
- 15-20 pts: Naturally showcases the Target Grammar Focus (e.g., if focus is 'Verb to be', it has plenty of "Are you...?", "I am...").
- 5-14 pts: Grammar is present but not a prominent feature of the conversation.
- 0 pts: Grammar structure is missing entirely or too complex (e.g., using past perfect for an A1 present simple lesson).

4. Shadowing Suitability (0 - 20 points)
- 15-20 pts: Sentences are relatively short (5-15 words). The pacing allows for easy repeating. The punctuation in the transcript is logically placed.
- 0-14 pts: Contains massive, complex, compound sentences that would leave a student breathless when trying to repeat them.

### VERDICT RULES
- "PASS": Score is >= 75 AND it passes all Instant Reject conditions. This video is ready for production.
- "FAIL": Score is < 75 OR it hits an Instant Reject condition.

### OUTPUT FORMAT
You must output ONLY valid JSON in the following format:
{
  "score": <integer 0-100>,
  "verdict": "<PASS or FAIL>",
  "sub_scores": {
    "format_interaction": <int>,
    "vocabulary": <int>,
    "grammar": <int>,
    "shadowing_suitability": <int>
  },
  "vocabulary_match": {
    "matched_words": ["word1", "word2"],
    "percentage": "<string, e.g., '40%'>"
  },
  "reasoning": {
    "format_analysis": "<Briefly prove this is a dialogue, not a monologue>",
    "overall_justification": "<Explain the final verdict>"
  }
}`;

function buildEvaluationPrompt(transcript, syllabusMeta, weekTitle, videoTitle) {
  const truncatedTranscript = transcript.length > 3000
    ? transcript.slice(0, 3000) + '... [truncated]'
    : transcript;

  return `Evaluate this YouTube video transcript for a Shadowing (Listen & Repeat) role-play exercise.

TARGET CONTEXT:
- Topic: "${syllabusMeta.topic || weekTitle}"
- Grammar Focus: "${syllabusMeta.grammarFocus || 'none'}"
- Target Vocabulary: ${JSON.stringify(syllabusMeta.vocabWords || [])}
- Age Group: 6-12 year old Vietnamese students (A1 level)

VIDEO:
- Title: "${videoTitle}"

TRANSCRIPT:
${truncatedTranscript}

Apply the evaluation rubric and output ONLY valid JSON.`;
}

/**
 * Evaluate a transcript for Shadowing suitability using LLM
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
          .replace(/,\s*]/g, ']');
        try { parsed = JSON.parse(cleaned); } catch (e3) { /* continue */ }
      }
    }
    if (!parsed) {
      // Final fallback: extract score + verdict from raw text via regex
      const scoreMatch = rawResponse.match(/"score"\s*:\s*(\d+)/);
      const verdictMatch = rawResponse.match(/"verdict"\s*:\s*"(PASS|FAIL)"/);
      if (scoreMatch && verdictMatch) {
        parsed = {
          score: parseInt(scoreMatch[1]),
          verdict: verdictMatch[1],
          sub_scores: { format_interaction: 0, vocabulary: 0, grammar: 0, shadowing_suitability: 0 },
          vocabulary_match: { matched_words: [], percentage: '0%' },
          reasoning: { format_analysis: 'Regex fallback', overall_justification: 'Parsed from text' }
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
