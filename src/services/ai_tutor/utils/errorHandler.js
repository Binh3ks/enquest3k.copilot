/**
 * Error Handler - Centralized Error Management
 * 
 * Provides retry logic, user-friendly error messages, and fallback responses
 * for AI Tutor system failures.
 * 
 * @module errorHandler
 * @version 1.0.0
 * @created 2026-01-06
 */

/**
 * User-friendly error messages for different error types
 */
export const ERROR_MESSAGES = {
  // Network errors
  network: "Connection problem. Please check your internet and try again.",
  timeout: "Response is taking too long. Let's try again.",
  offline: "You appear to be offline. Please check your connection.",
  
  // API errors
  api: "Nova is thinking hard... Please try again in a moment.",
  rate_limit: "Too many requests. Please wait a few seconds and try again.",
  api_key: "API configuration error. Please contact support.",
  quota_exceeded: "Daily limit reached. Please try again tomorrow.",
  
  // Parsing errors
  parse: "Something went wrong processing the response. Let's start fresh!",
  invalid_format: "Received unexpected response format. Trying again...",
  
  // Grammar guard errors
  grammar_violation: "Response didn't match curriculum. Regenerating...",
  
  // Generic errors
  unknown: "Oops! Something unexpected happened. Let's try again.",
  
  // Specific provider errors
  groq_error: "Fast AI provider unavailable. Switching to backup...",
  gemini_error: "Backup AI provider error. Please try again."
};

/**
 * Fallback responses when all retry attempts fail
 */
export const FALLBACK_RESPONSES = {
  story: {
    ai_response: "I see! Tell me more about your story.",
    pedagogy_note: 'Fallback: System error recovery',
    suggested_hints: ['I', 'like', 'my', 'is', 'am', 'have']
  },
  freetalk: {
    ai_response: "Cool! What do you want to talk about?",
    pedagogy_note: 'Fallback: System error recovery',
    suggested_hints: ['I', 'like', 'my', 'favorite', 'is', 'am']
  },
  pronunciation: {
    ai_response: "Let's try that again. Can you repeat after me?",
    pedagogy_note: 'Fallback: System error recovery',
    suggested_hints: []
  },
  quiz: {
    ai_response: "Let's try another question. Are you ready?",
    pedagogy_note: 'Fallback: System error recovery',
    suggested_hints: ['Yes', 'No', 'I', 'am', 'ready']
  },
  debate: {
    ai_response: "That's a good point! What else do you think about this?",
    pedagogy_note: 'Fallback: System error recovery',
    suggested_hints: ['I', 'think', 'because', 'my', 'opinion']
  }
};

/**
 * Sleep utility for retry delays
 * @private
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry function with exponential backoff
 * 
 * Retries a failed function with increasing delays:
 * - Attempt 1: 0ms (immediate)
 * - Attempt 2: 1000ms (1 second)
 * - Attempt 3: 2000ms (2 seconds)
 * - Attempt 4: 4000ms (4 seconds)
 * 
 * @param {Function} fn - Async function to retry
 * @param {number} maxRetries - Maximum number of retry attempts (default: 3)
 * @param {Object} options - Retry options
 * @param {number} options.baseDelay - Base delay in ms (default: 1000)
 * @param {number} options.maxDelay - Maximum delay in ms (default: 10000)
 * @param {Function} options.onRetry - Callback on each retry
 * @returns {Promise} Result of successful function call
 * 
 * @example
 * const result = await retryWithBackoff(
 *   () => sendToAI({ ... }),
 *   3,
 *   { onRetry: (attempt) => console.log(`Retry attempt ${attempt}`) }
 * );
 */
export async function retryWithBackoff(fn, maxRetries = 3, options = {}) {
  const {
    baseDelay = 1000,
    maxDelay = 10000,
    onRetry = null
  } = options;

  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Try executing the function
      const result = await fn();
      
      // Success! Return result
      if (attempt > 0) {
        console.log(`✅ errorHandler: Retry successful on attempt ${attempt + 1}`);
      }
      return result;
      
    } catch (error) {
      lastError = error;
      
      // If this was the last attempt, throw error
      if (attempt === maxRetries - 1) {
        console.error(`❌ errorHandler: All ${maxRetries} attempts failed`);
        throw error;
      }
      
      // Calculate exponential backoff delay
      const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
      
      console.warn(`⚠️ errorHandler: Attempt ${attempt + 1} failed. Retrying in ${delay}ms...`);
      console.warn(`Error: ${error.message}`);
      
      // Call onRetry callback if provided
      if (onRetry) {
        onRetry(attempt + 1, error, delay);
      }
      
      // Wait before retry
      await sleep(delay);
    }
  }

  // This should never be reached, but just in case
  throw lastError;
}

/**
 * Determine error type from error object
 * 
 * @param {Error} error - Error object
 * @returns {string} Error type key for ERROR_MESSAGES
 */
export function getErrorType(error) {
  if (!error) return 'unknown';
  
  const errorMessage = error.message?.toLowerCase() || '';
  const errorCode = error.code?.toLowerCase() || '';
  
  // Network errors
  if (errorCode === 'enotfound' || errorCode === 'econnrefused') return 'network';
  if (errorCode === 'etimedout' || errorMessage.includes('timeout')) return 'timeout';
  if (!navigator.onLine) return 'offline';
  
  // API errors
  if (error.response?.status === 429) return 'rate_limit';
  if (error.response?.status === 401 || error.response?.status === 403) return 'api_key';
  if (errorMessage.includes('quota') || errorMessage.includes('limit')) return 'quota_exceeded';
  if (error.response?.status >= 500) return 'api';
  
  // Parsing errors
  if (errorMessage.includes('json') || errorMessage.includes('parse')) return 'parse';
  if (errorMessage.includes('format') || errorMessage.includes('invalid')) return 'invalid_format';
  
  // Grammar guard errors
  if (errorMessage.includes('grammar') || errorMessage.includes('banned')) return 'grammar_violation';
  
  // Provider-specific errors
  if (errorMessage.includes('groq')) return 'groq_error';
  if (errorMessage.includes('gemini')) return 'gemini_error';
  
  return 'unknown';
}

/**
 * Get user-friendly error message
 * 
 * @param {Error} error - Error object
 * @returns {string} User-friendly error message
 */
export function getUserFriendlyMessage(error) {
  const errorType = getErrorType(error);
  return ERROR_MESSAGES[errorType] || ERROR_MESSAGES.unknown;
}

/**
 * Get fallback response for a given mode
 * 
 * @param {string} mode - Learning mode (story, freetalk, etc.)
 * @param {Error} error - Optional error object for logging
 * @returns {Object} Fallback response object
 */
export function getFallbackResponse(mode, error = null) {
  if (error) {
    console.error(`🚨 errorHandler: Using fallback for mode "${mode}"`, error);
  }
  
  return FALLBACK_RESPONSES[mode] || FALLBACK_RESPONSES.freetalk;
}

/**
 * Handle AI error with retry and fallback
 * 
 * Main error handling function that:
 * 1. Attempts retry with exponential backoff
 * 2. Returns fallback response if all retries fail
 * 3. Shows user-friendly error message
 * 
 * @param {Function} aiFn - AI function to execute
 * @param {string} mode - Learning mode
 * @param {Object} options - Options
 * @param {number} options.maxRetries - Max retry attempts (default: 2)
 * @param {Function} options.onError - Error callback
 * @returns {Promise<Object>} AI response or fallback
 * 
 * @example
 * const response = await handleAIError(
 *   () => sendToAI({ ... }),
 *   'story',
 *   { onError: (msg) => showToast(msg) }
 * );
 */
export async function handleAIError(aiFn, mode, options = {}) {
  const {
    maxRetries = 2,
    onError = null
  } = options;

  try {
    // Try with retry logic
    return await retryWithBackoff(aiFn, maxRetries, {
      onRetry: (attempt, error) => {
        const message = `Attempt ${attempt}/${maxRetries} failed. Retrying...`;
        console.warn(`⚠️ ${message}`, error);
        
        if (onError && attempt === 1) {
          // Only show error message on first retry
          onError(getUserFriendlyMessage(error));
        }
      }
    });
    
  } catch (error) {
    // All retries failed - use fallback
    console.error('❌ errorHandler: All retries exhausted, using fallback');
    
    if (onError) {
      onError(getUserFriendlyMessage(error));
    }
    
    return getFallbackResponse(mode, error);
  }
}

/**
 * Retry-specific AI call (wrapper for sendToAI)
 * 
 * @param {Function} sendToAI - AI router function
 * @param {Object} params - sendToAI parameters
 * @param {string} mode - Learning mode
 * @param {Object} options - Retry options
 * @returns {Promise<Object>} AI response
 */
export async function retryAICall(sendToAI, params, mode, options = {}) {
  return handleAIError(
    () => sendToAI(params),
    mode,
    options
  );
}

/**
 * Check if error is retryable
 * 
 * Some errors should not be retried (e.g., invalid API key)
 * 
 * @param {Error} error - Error object
 * @returns {boolean} True if error is retryable
 */
export function isRetryableError(error) {
  const errorType = getErrorType(error);
  
  // Non-retryable errors
  const nonRetryable = ['api_key', 'invalid_format'];
  
  return !nonRetryable.includes(errorType);
}

/**
 * Log error for debugging
 * 
 * @param {Error} error - Error object
 * @param {Object} context - Additional context
 */
export function logError(error, context = {}) {
  console.error('❌ AI Tutor Error:', {
    type: getErrorType(error),
    message: error.message,
    stack: error.stack,
    context
  });
}

/**
 * Export all utilities as default object
 */
export default {
  ERROR_MESSAGES,
  FALLBACK_RESPONSES,
  retryWithBackoff,
  getErrorType,
  getUserFriendlyMessage,
  getFallbackResponse,
  handleAIError,
  retryAICall,
  isRetryableError,
  logError
};
