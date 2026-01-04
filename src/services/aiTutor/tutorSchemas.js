/**
 * AI Response Parser V4 - Handles JSON from AI-Driven Flow
 */

export function parseResponse(rawText, mode) {
  const cleanText = rawText.trim();

  if (mode === "STORY_MISSION_JSON") {
    return parseStoryJson(cleanText);
  }

  if (mode === "story" || mode === "STORY_MISSION") {
    return parseLegacyStoryResponse(cleanText);
  }

  return parseChatResponse(cleanText);
}

/**
 * Parses the new JSON format from the AI for story missions.
 */
function parseStoryJson(text) {
  try {
    // Clean text: remove markdown, newlines, etc.
    const cleaned = text.replace(/```(?:json)?\s*/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    // Ensure all required fields exist, even if empty
    return {
      response_text: parsed.response_text || "I'm not sure what to say!",
      next_question: parsed.next_question || "",
      student_context_update: parsed.student_context_update || {},
      vocabulary_used: parsed.vocabulary_used || [],
    };
  } catch (error) {
    console.error("[TutorSchemas] Failed to parse story JSON:", error);
    console.error("[TutorSchemas] Raw AI Text:", text);
    // Return a safe, default structure on failure
    return {
      response_text: "I'm a little confused. Can you say that again?",
      next_question: "",
      student_context_update: {},
      vocabulary_used: [],
    };
  }
}

/**
 * Legacy parser for plain text story mission responses.
 */
function parseLegacyStoryResponse(text) {
  const cleaned = text.trim();
  const sentences = cleaned.split(/(?<=[.!?])\s+/).filter((s) => s.trim());

  if (sentences.length === 0) {
    return { story_beat: "", task: text };
  }

  const lastSentence = sentences[sentences.length - 1].trim();
  const isQuestion =
    lastSentence.includes("?") ||
    /\b(what|how|who|where|when|why|do you|are you|can you|is)\b/i.test(
      lastSentence
    );

  if (sentences.length === 1) {
    return isQuestion
      ? { story_beat: "", task: lastSentence }
      : { story_beat: lastSentence, task: "" };
  }

  if (isQuestion) {
    const acknowledgment = sentences.slice(0, -1).join(" ").trim();
    return { story_beat: acknowledgment, task: lastSentence };
  } else {
    return { story_beat: cleaned, task: "" };
  }
}

function parseChatResponse(text) {
  const lines = text.split("\\n").filter((l) => l.trim());
  const response = lines[0] || text;
  const followUp = lines.find((l) => l.includes("?")) || "Tell me more?";

  return {
    response,
    follow_up: followUp,
  };
}
