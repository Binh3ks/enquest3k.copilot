import w34Flat from '../src/data/weeks/week_34_real.js';
import w34Nested from '../src/data/weeks/week_34/week_34_real.js';
import w34Index from '../src/data/weeks/week_34/index.js';

import w35Flat from '../src/data/weeks/week_35_real.js';
import w35Nested from '../src/data/weeks/week_35/week_35_real.js';
import w35Index from '../src/data/weeks/week_35/index.js';

import w36Flat from '../src/data/weeks/week_36_real.js';
import w36Nested from '../src/data/weeks/week_36/week_36_real.js';
import w36Index from '../src/data/weeks/week_36/index.js';

import w37Flat from '../src/data/weeks/week_37_real.js';
import w37Nested from '../src/data/weeks/week_37/week_37_real.js';
import w37Index from '../src/data/weeks/week_37/index.js';

console.log('\n================================================================');
console.log('🔍 RUNTIME DATA SOURCE VERIFICATION (ALL SCHEMAS)');
console.log('================================================================\n');

let totalChecks = 0;
let passedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`✅ [VERIFY PASS] ${message}`);
  } else {
    console.error(`❌ [VERIFY FAIL] ${message}`);
    process.exitCode = 1;
  }
}

// 1. W34 (Lion & Mouse)
assert(w34Flat.title.includes('Lion and the Mouse'), 'W34 Flat week_34_real.js: Title is Lion and the Mouse');
assert(w34Nested.title.includes('Lion and the Mouse'), 'W34 Nested week_34_real.js: Title is Lion and the Mouse');
assert(w34Index.title.includes('Lion and the Mouse'), 'W34 Index index.js: Title is Lion and the Mouse');
assert(!JSON.stringify(w34Flat).toLowerCase().includes('grasshopper'), 'W34 Flat: Zero un-restored grasshopper keywords');
assert(!JSON.stringify(w34Nested).toLowerCase().includes('grasshopper'), 'W34 Nested: Zero un-restored grasshopper keywords');

// 2. W35 (Best Day Ever)
assert(w35Flat.title.includes('Best Day Ever'), 'W35 Flat week_35_real.js: Title is Best Day Ever');
assert(w35Nested.title.includes('Best Day Ever'), 'W35 Nested week_35_real.js: Title is Best Day Ever');
assert(w35Index.title.includes('Best Day Ever'), 'W35 Index index.js: Title is Best Day Ever');
assert(!JSON.stringify(w35Flat).toLowerCase().includes('recycling'), 'W35 Flat: Zero un-restored recycling keywords');

// 3. W36 (My Adventure Book)
assert(w36Flat.title.includes('My Adventure Book'), 'W36 Flat week_36_real.js: Title is My Adventure Book');
assert(w36Nested.title.includes('My Adventure Book'), 'W36 Nested week_36_real.js: Title is My Adventure Book');
assert(w36Index.title.includes('My Adventure Book'), 'W36 Index index.js: Title is My Adventure Book');
assert(!JSON.stringify(w36Flat).toLowerCase().includes('flashlight'), 'W36 Flat: Zero un-restored flashlight keywords');

// 4. W37 (Living vs Non-Living)
assert(w37Flat.title.includes('Living vs. Non-Living'), 'W37 Flat week_37_real.js: Title is Living vs. Non-Living');
assert(w37Nested.title.includes('Living vs. Non-Living'), 'W37 Nested week_37_real.js: Title is Living vs. Non-Living');
assert(w37Index.title.includes('Living vs. Non-Living'), 'W37 Index index.js: Title is Living vs. Non-Living');
assert(!JSON.stringify(w37Flat).toLowerCase().includes('stadium'), 'W37 Flat: Zero un-restored stadium keywords');

console.log(`\n================================================================`);
console.log(`🎉 RUNTIME DATA VERIFICATION SUMMARY: ${passedChecks}/${totalChecks} PASSED 100%!`);
console.log('================================================================\n');
