/**
 * syllabusAnalyzer.js — LLM-driven syllabus → search queries + conversational expressions
 *
 * Instead of hardcoded TOPIC_PHRASES, this module:
 * 1. Feeds the LLM the weekly syllabus metadata
 * 2. Dynamically generates 3 YouTube search queries
 * 3. Generates 5 high-frequency conversational expressions for the topic
 */

const { callLLM } = require('./llmClient.cjs');

const SYSTEM_PROMPT = `You are an ESL curriculum specialist for Vietnamese K-12 students (A1-B1).
You help find YouTube videos that match weekly English lessons.

Your job:
1. Analyze the syllabus metadata (topic, grammar, vocabulary, reading chunks).
2. Generate YouTube search queries that will find SHORT (< 5 min) dialogue-based
   ESL videos featuring the target vocabulary and grammar.
3. Generate 5 natural conversational expressions that a student would actually
   hear in a video about this topic. These are NOT syllabus phrases — they are
   what real English speakers say in everyday conversations about this topic.

RULES:
- Search queries must use simple, natural English — no grammar jargon.
- Exclude compilations, songs, dances, nursery rhymes.
- DO NOT use the word "short" in queries — YouTube interprets it as Shorts.
- DO NOT use parentheses, boolean operators, or special characters.
- Conversational expressions must be REAL phrases (e.g., "Where are you from?"
   not "Elementary school student studies science").
- Output MUST be valid JSON.
- Do NOT include character names from the syllabus in queries.`;

function buildPrompt(syllabusMeta, weekTitle) {
  return `Analyze this English lesson syllabus and generate search queries + conversational expressions.

LESSON METADATA:
- Topic: "${syllabusMeta.topic || weekTitle}"
- Grammar Focus: "${syllabusMeta.grammarFocus || 'none'}"
- Target Vocabulary: ${JSON.stringify(syllabusMeta.vocabWords.slice(0, 9))}
- Reading Chunks: ${JSON.stringify(syllabusMeta.readChunks.slice(0, 8))}

Generate exactly this JSON structure:
{
  "search_queries": [
    "query1 — optimized for YouTube search",
    "query2 — alternative angle",
    "query3 — fallback broad query"
  ],
  "conversational_expressions": [
    "expression1 — natural phrase for this topic",
    "expression2 — natural phrase for this topic",
    "expression3 — natural phrase for this topic",
    "expression4 — natural phrase for this topic",
    "expression5 — natural phrase for this topic"
  ],
  "topic_summary": "one-line summary of what this week teaches"
}`;
}

/**
 * Analyze syllabus and return LLM-generated queries + expressions
 * @param {Object} syllabusMeta - { topic, grammarFocus, vocabWords, readChunks }
 * @param {string} weekTitle - fallback title
 * @returns {Promise<{searchQueries: string[], expressions: string[], topicSummary: string}>}
 */
async function analyzeSyllabus(syllabusMeta, weekTitle) {
  const prompt = buildPrompt(syllabusMeta, weekTitle);

  const rawResponse = await callLLM(prompt, SYSTEM_PROMPT);

  // Parse JSON from response (handle markdown code blocks)
  let parsed;
  try {
    // Try direct JSON parse first
    parsed = JSON.parse(rawResponse);
  } catch (e) {
    // Try extracting JSON from markdown code block
    const jsonMatch = rawResponse.match(/```json\s*([\s\S]*?)```/);
    if (jsonMatch) {
      parsed = JSON.parse(jsonMatch[1].trim());
    } else {
      // Try finding any JSON object in the response
      const objMatch = rawResponse.match(/\{[\s\S]*\}/);
      if (objMatch) {
        parsed = JSON.parse(objMatch[0]);
      } else {
        throw new Error(`Failed to parse LLM response as JSON:\n${rawResponse.slice(0, 500)}`);
      }
    }
  }

  return {
    searchQueries: parsed.search_queries || [],
    expressions: parsed.conversational_expressions || [],
    topicSummary: parsed.topic_summary || syllabusMeta.topic || weekTitle,
  };
}

module.exports = { analyzeSyllabus };
