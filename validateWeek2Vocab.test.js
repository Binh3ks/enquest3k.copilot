/**
 * Test Script for Vocab Validator
 * 
 * Run this to validate Week 2 roleplay scenarios vocabulary
 * Usage: node validateWeek2Vocab.test.js
 */

import week1RealData from '../src/data/weeks/week_01_real.js';
import week2RealData from '../src/data/weeks/week_02_real.js';
import { validateWeekRoleplays, logValidationReport } from '../src/services/ai_tutor/utils/vocabValidator.js';

console.log('🔍 Starting Vocab Validation Test...\n');

// Test Week 2 roleplays
const allWeeksData = [week1RealData, week2RealData];
const validationResult = validateWeekRoleplays(week2RealData, 2, allWeeksData);

// Log detailed report
logValidationReport(validationResult);

// Exit with error code if validation failed
if (!validationResult.valid) {
  console.error('❌ Validation failed! Fix invalid vocabulary before deploying.');
  process.exit(1);
} else {
  console.log('✅ All vocabulary validated successfully!');
  process.exit(0);
}
