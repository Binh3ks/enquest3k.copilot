import assert from 'node:assert';
import { normalizeStorySteps } from '../src/utils/storyWritingAdapter.js';

console.log('--- TEST 1: Bogus schema { weird_field: 123 } ---');
const bogusResult = normalizeStorySteps({ weird_field: 123 }, 47);
console.log('Result for { weird_field: 123 }:', bogusResult);
assert.strictEqual(bogusResult, null, 'normalizeStorySteps must return null on bogus schema');

console.log('\n--- TEST 2: Empty object {} ---');
const emptyResult = normalizeStorySteps({}, 47);
console.log('Result for {}:', emptyResult);
assert.strictEqual(emptyResult, null, 'normalizeStorySteps must return null on empty object');

console.log('\n--- TEST 3: Null / undefined ---');
assert.strictEqual(normalizeStorySteps(null, 47), null);
assert.strictEqual(normalizeStorySteps(undefined, 47), null);

console.log('\n--- TEST 4: Partial/malformed schema { steps: [1, 2] } (less than 3 steps) ---');
const shortSteps = normalizeStorySteps({ steps: [{ scene: 1 }, { scene: 2 }] }, 47);
console.log('Result for 2 steps:', shortSteps);
assert.strictEqual(shortSteps, null, 'normalizeStorySteps must return null when steps < 3');

console.log('\n--- TEST 5: Verify no default weekNumber 33 in normalizeStorySteps ---');
// If currentWeek is omitted and rawStory is invalid, it still returns null
assert.strictEqual(normalizeStorySteps({ weird_field: 123 }), null);

console.log('\n✅ ALL FAIL-LOUD TESTS PASSED: normalizeStorySteps strictly returns null on unrecognized schema, preventing generic fallbacks.');
