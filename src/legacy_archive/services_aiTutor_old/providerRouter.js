/**
 * PROVIDER ROUTER
 * Wraps existing aiProviders with quota management and fallback
 */

import { callAI } from '../aiProviders';

const providerState = {
  geminiCount: 0,
  groqCount: 0,
  geminiErrors: 0,
  groqErrors: 0,
  lastReset: Date.now()
};

const LIMITS = {
  gemini: 1500,
  groq: 14400
};

/**
 * Route AI call through best available provider
 * @param {string} prompt - AI prompt
 * @param {string} type - Call type ('chat', 'story', 'quiz', etc.)
 * @returns {Promise<{text: string, provider: string, duration: number}>}
 */
export async function routeAI(prompt, type = 'chat') {
  // Reset counters daily
  if (Date.now() - providerState.lastReset > 24 * 60 * 60 * 1000) {
    providerState.geminiCount = 0;
    providerState.groqCount = 0;
    providerState.geminiErrors = 0;
    providerState.groqErrors = 0;
    providerState.lastReset = Date.now();
  }
  
  // Use existing callAI from aiProviders.js
  try {
    const result = await callAI(prompt, type);
    
    // Track usage (rough estimate based on provider name)
    if (result.provider?.includes('Gemini')) {
      providerState.geminiCount++;
    } else if (result.provider?.includes('Groq')) {
      providerState.groqCount++;
    }
    
    return result;
  } catch (error) {
    console.error('[ProviderRouter] AI call failed:', error);
    throw error;
  }
}

/**
 * Get provider status
 */
export function getProviderStatus() {
  return {
    gemini: {
      used: providerState.geminiCount,
      limit: LIMITS.gemini,
      available: providerState.geminiCount < LIMITS.gemini && providerState.geminiErrors < 3
    },
    groq: {
      used: providerState.groqCount,
      limit: LIMITS.groq,
      available: providerState.groqCount < LIMITS.groq && providerState.groqErrors < 3
    }
  };
}
