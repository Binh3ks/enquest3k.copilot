import assert from 'node:assert';
import { MAX_RELEASED_WEEK, isWeekReleased, canBypassRelease, STAFF_ROLES } from '../src/config/releaseConfig.js';

console.log('========================================================================');
console.log('🧪 UNIT TEST: releaseConfig.js (MAX_RELEASED_WEEK, isWeekReleased, canBypassRelease)');
console.log('========================================================================\n');

// 1. MAX_RELEASED_WEEK constant check
assert.strictEqual(MAX_RELEASED_WEEK, 34, 'MAX_RELEASED_WEEK must equal 34');
console.log(`✅ MAX_RELEASED_WEEK is ${MAX_RELEASED_WEEK}`);

// 2. Released weeks (1..34) -> true
for (let w = 1; w <= 34; w++) {
  assert.strictEqual(isWeekReleased(w), true, `Week ${w} (number) should be released`);
  assert.strictEqual(isWeekReleased(String(w)), true, `Week "${w}" (string) should be released`);
}
console.log('✅ Weeks 1..34 (both number & string) return true');

// 3. Unreleased weeks (35..156) -> false
for (let w = 35; w <= 156; w++) {
  assert.strictEqual(isWeekReleased(w), false, `Week ${w} (number) should be unreleased`);
  assert.strictEqual(isWeekReleased(String(w)), false, `Week "${w}" (string) should be unreleased`);
}
console.log('✅ Weeks 35..156 (both number & string) return false');

// 4. Invalid / non-numeric / edge cases -> false
const invalidInputs = [0, -1, -33, NaN, null, undefined, '', 'abc', 'week35', {}, []];
for (const input of invalidInputs) {
  assert.strictEqual(isWeekReleased(input), false, `Input ${JSON.stringify(input)} should return false`);
}
console.log('✅ Invalid / non-numeric inputs return false');

// 5. canBypassRelease Predicate Tests (Round 139)
console.log('\n--- canBypassRelease Security & Bypass Verification ---');

// 5.1 Owner role -> true
assert.strictEqual(canBypassRelease({ role: 'owner' }), true, 'Role owner must bypass');
console.log('✅ canBypassRelease({ role: "owner" }) === true');

// 5.2 STAFF_ROLES -> true
for (const staffRole of STAFF_ROLES) {
  assert.strictEqual(canBypassRelease({ role: staffRole }), true, `Staff role "${staffRole}" must bypass`);
}
console.log(`✅ All STAFF_ROLES (${STAFF_ROLES.join(', ')}) bypass successfully`);

// 5.3 Boolean true argument -> true
assert.strictEqual(canBypassRelease(true), true, 'Boolean true argument must bypass');
console.log('✅ canBypassRelease(true) === true');

// 5.4 CRITICAL SECURITY TEST: displayName 'Bình' or email containing 'binh' with role 'student' MUST NOT BYPASS!
const studentNamedBinh = { role: 'student', displayName: 'Bình', email: 'binh@example.com' };
assert.strictEqual(canBypassRelease(studentNamedBinh), false, 'Student named Bình must NOT bypass release guard');
const studentEmailBinh = { role: 'student', displayName: 'Alex', email: 'binhkhoi08@gmail.com' };
assert.strictEqual(canBypassRelease(studentEmailBinh), false, 'Student with email containing binh must NOT bypass release guard');
console.log('✅ CRITICAL PASS: Students with displayName="Bình" or email containing "binh" are strictly BLOCKED');

// 5.5 Regular students & anonymous/null users -> false
assert.strictEqual(canBypassRelease({ role: 'student', displayName: 'Regular Student' }), false, 'Regular student must NOT bypass');
assert.strictEqual(canBypassRelease(null), false, 'null user must NOT bypass');
assert.strictEqual(canBypassRelease(undefined), false, 'undefined user must NOT bypass');
assert.strictEqual(canBypassRelease({}), false, 'empty user object must NOT bypass');
console.log('✅ canBypassRelease returns false for student, null, undefined, empty user');

// 5.6 localStorage arcade_owner_bypass simulation
const mockStorage = new Map();
global.window = {};
global.localStorage = {
  getItem: (k) => mockStorage.get(k) || null,
  setItem: (k, v) => mockStorage.set(k, String(v)),
  removeItem: (k) => mockStorage.delete(k)
};

mockStorage.set('arcade_owner_bypass', 'true');
assert.strictEqual(canBypassRelease({ role: 'student' }), true, 'arcade_owner_bypass="true" grants client-side soft bypass');
console.log('✅ localStorage arcade_owner_bypass="true" grants soft bypass as designed');

mockStorage.set('arcade_owner_bypass', 'false');
assert.strictEqual(canBypassRelease({ role: 'student' }), false, 'arcade_owner_bypass="false" does not bypass');
mockStorage.delete('arcade_owner_bypass');
assert.strictEqual(canBypassRelease({ role: 'student' }), false, 'No arcade_owner_bypass does not bypass');
console.log('✅ localStorage flag cleanup verified (false / absent = blocked)');

delete global.window;
delete global.localStorage;

console.log('\n========================================================================');
console.log('🎉 ALL TESTS PASSED (releaseConfig.test.js)');
console.log('========================================================================');
