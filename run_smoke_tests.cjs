#!/usr/bin/env node

/**
 * PHASE 1.5 - TEST RUNNER
 * Run all AI Tutor smoke tests and generate report
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 PHASE 1.5: COMPREHENSIVE SMOKE TEST SUITE');
console.log('Testing ALL AI Tutor features\n');
console.log('='.repeat(60));

const tests = [
  {
    name: 'Word Chain Game',
    path: 'src/services/ai_tutor/__tests__/wordChain.full.test.js',
    expectedTests: 15
  },
  {
    name: 'Twenty Questions Game',
    path: 'src/services/ai_tutor/__tests__/games/twentyQuestions.smoke.test.js',
    expectedTests: 17
  },
  {
    name: 'Sentence Builder Game',
    path: 'src/services/ai_tutor/__tests__/games/sentenceBuilder.smoke.test.js',
    expectedTests: 14
  },
  {
    name: 'Story Mission',
    path: 'src/services/ai_tutor/__tests__/story/storyMission.smoke.test.js',
    expectedTests: 17
  },
  {
    name: 'Roleplay',
    path: 'src/services/ai_tutor/__tests__/roleplay/roleplay.smoke.test.js',
    expectedTests: 17
  },
  {
    name: 'Ask AI',
    path: 'src/services/ai_tutor/__tests__/askAI/askAI.smoke.test.js',
    expectedTests: 17
  }
];

let totalPassed = 0;
let totalFailed = 0;
let testResults = [];

tests.forEach((test, index) => {
  console.log(`\n📋 Test Suite ${index + 1}/${tests.length}: ${test.name}`);
  console.log('-'.repeat(60));
  
  try {
    const output = execSync(`node ${test.path}`, { 
      encoding: 'utf-8',
      stdio: 'pipe'
    });
    
    // Extract pass/fail counts from output
    const passMatch = output.match(/✅ Passed: (\d+)\/(\d+)/);
    const failMatch = output.match(/❌ Failed: (\d+)\/(\d+)/);
    
    if (passMatch && failMatch) {
      const passed = parseInt(passMatch[1]);
      const failed = parseInt(failMatch[1]);
      const total = parseInt(passMatch[2]);
      
      totalPassed += passed;
      totalFailed += failed;
      
      testResults.push({
        name: test.name,
        passed,
        failed,
        total,
        status: failed === 0 ? 'PASS' : 'FAIL'
      });
      
      console.log(`✅ ${test.name}: ${passed}/${total} tests passed`);
    }
  } catch (error) {
    console.log(`❌ ${test.name}: FAILED`);
    testResults.push({
      name: test.name,
      passed: 0,
      failed: test.expectedTests,
      total: test.expectedTests,
      status: 'FAIL',
      error: error.message
    });
    totalFailed += test.expectedTests;
  }
});

// Final Report
console.log('\n' + '='.repeat(60));
console.log('📊 PHASE 1.5 COMPREHENSIVE TEST REPORT');
console.log('='.repeat(60));

console.log('\n📋 Test Suite Results:\n');
testResults.forEach((result, index) => {
  const icon = result.status === 'PASS' ? '✅' : '❌';
  console.log(`${icon} ${index + 1}. ${result.name.padEnd(25)} ${result.passed}/${result.total} passed`);
});

console.log('\n' + '='.repeat(60));
console.log(`📊 OVERALL RESULTS:`);
console.log(`   Total Tests: ${totalPassed + totalFailed}`);
console.log(`   ✅ Passed: ${totalPassed}`);
console.log(`   ❌ Failed: ${totalFailed}`);
console.log(`   Success Rate: ${Math.round((totalPassed / (totalPassed + totalFailed)) * 100)}%`);
console.log('='.repeat(60));

if (totalFailed === 0) {
  console.log('\n🎉 ALL TESTS PASSED!');
  console.log('✅ All AI Tutor features validated');
  console.log('✅ Safe to proceed with gamePromptBuilder fix');
  console.log('\n📝 NEXT STEPS:');
  console.log('   1. Fix gamePromptBuilder.js Word Chain prompt');
  console.log('   2. Re-run this test suite');
  console.log('   3. Manual spot-check Week 1, 3, 5');
  console.log('\n🚀 Ready to continue? Run: npm run test:ai-tutor\n');
  process.exit(0);
} else {
  console.log('\n⚠️  SOME TESTS FAILED');
  console.log('❌ Fix issues before proceeding\n');
  process.exit(1);
}
