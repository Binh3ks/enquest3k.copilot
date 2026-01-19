#!/usr/bin/env node
/**
 * VALIDATION PIPELINE V2 - Spec-based validation
 * 
 * Usage: node tools/validate_week_v2.js <week_number>
 * Example: node tools/validate_week_v2.js 5
 * 
 * Purpose: Validate against SPEC file (4-layer architecture)
 * Ensures AI didn't hallucinate content
 * 
 * Exit codes:
 * 0 = All validations passed
 * 1 = Validation failed (errors found)
 */

const fs = require('fs');
const path = require('path');

class WeekValidatorV2 {
  constructor(weekNum) {
    this.weekNum = weekNum;
    this.weekId = parseInt(weekNum);
    this.errors = [];
    this.warnings = [];
  }
  
  // Load spec file
  loadSpec() {
    const specPath = path.join(
      __dirname, 
      '../SPECS', 
      `week_${String(this.weekId).padStart(2, '0')}_spec.json`
    );
    
    if (!fs.existsSync(specPath)) {
      throw new Error(`Spec file not found: ${specPath}\nRun: node MASS/tools/generate_spec.cjs ${this.weekNum}`);
    }
    
    this.spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
    return this;
  }
  
  // Load week data file
  loadWeekData() {
    const weekPath = path.join(
      __dirname,
      '../../src/data/weeks',
      `week_${String(this.weekId).padStart(2, '0')}_real.js`
    );
    
    if (!fs.existsSync(weekPath)) {
      throw new Error(`Week data file not found: ${weekPath}`);
    }
    
    // Read file content
    const content = fs.readFileSync(weekPath, 'utf8');
    
    // Extract the exported object (simple regex extraction)
    const match = content.match(/const\s+\w+\s*=\s*({[\s\S]*?});[\s\S]*export\s+default/);
    if (!match) {
      throw new Error('Cannot parse week data file - check export format');
    }
    
    // Safely evaluate (in production, use proper JS parser)
    try {
      this.weekData = eval(`(${match[1]})`);
    } catch (e) {
      throw new Error(`Cannot evaluate week data: ${e.message}`);
    }
    
    return this;
  }
  
  // ===== VALIDATION 1: METADATA =====
  validateMetadata() {
    console.log('🔍 Validating metadata...');
    
    if (this.weekData.week_id !== this.spec.week_id) {
      this.errors.push(`week_id mismatch: ${this.weekData.week_id} !== ${this.spec.week_id}`);
    }
    
    if (this.weekData.phase !== this.spec.phase) {
      this.errors.push(`phase mismatch: ${this.weekData.phase} !== ${this.spec.phase}`);
    }
    
    if (this.weekData.week_title_en !== this.spec.title_en) {
      this.errors.push(`title mismatch: "${this.weekData.week_title_en}" !== "${this.spec.title_en}"`);
    }
    
    console.log(this.errors.length === 0 ? '  ✅ Metadata valid' : `  ❌ ${this.errors.length} errors`);
  }
  
  // ===== VALIDATION 2: VOCABULARY =====
  validateVocabulary() {
    console.log('🔍 Validating vocabulary...');
    
    // Check count
    if (this.weekData.target_vocab.length !== this.spec.vocab_count) {
      this.errors.push(
        `Vocab count: ${this.weekData.target_vocab.length} !== ${this.spec.vocab_count}`
      );
    }
    
    // Check type (must be objects for Week 4+)
    this.weekData.target_vocab.forEach((v, i) => {
      if (typeof v !== 'object') {
        this.errors.push(`target_vocab[${i}] must be object, got: ${typeof v}`);
        return;
      }
      
      // Check required fields
      const required = ['word', 'pronunciation', 'definition_vi', 'definition_en', 'example', 'syllabus_context'];
      required.forEach(field => {
        if (!v[field]) {
          this.errors.push(`target_vocab[${i}] missing field: ${field}`);
        }
      });
      
      // Check word matches spec
      const specWord = this.spec.target_vocab_words[i];
      if (v.word !== specWord) {
        this.warnings.push(
          `target_vocab[${i}].word "${v.word}" doesn't match spec "${specWord}"`
        );
      }
    });
    
    console.log(this.errors.length === 0 ? '  ✅ Vocabulary valid' : `  ❌ ${this.errors.length} errors`);
  }
  
  // ===== VALIDATION 3: CEFR COMPLIANCE =====
  validateCEFR() {
    console.log('🔍 Validating CEFR compliance...');
    
    const cefrRules = this.spec.grammar_rules;
    const forbiddenGrammar = cefrRules.grammar_forbidden;
    
    // Check grammar examples
    this.weekData.grammar_examples.forEach((ex, i) => {
      // Check sentence length
      const wordCount = ex.split(' ').length;
      const [min, max] = cefrRules.sentence_length.split('-').map(s => parseInt(s.split(' ')[0]));
      
      if (wordCount < min || wordCount > max) {
        this.warnings.push(
          `grammar_examples[${i}] length ${wordCount} outside CEFR range ${min}-${max}: "${ex}"`
        );
      }
      
      // Check for forbidden grammar patterns (basic check)
      forbiddenGrammar.forEach(pattern => {
        const patterns = {
          'Past tense': /\b(was|were|went|did|had|ate|saw|came)\b/i,
          'Future will': /\bwill\b/i,
          'Future': /\bwill\b/i,
          'Conditionals': /\bif\b.*\b(would|could)\b/i,
          'Present Perfect': /\b(have|has)\s+(been|done|gone|seen)\b/i,
          'Modals': /\b(should|must|might|may)\b/i
        };
        
        if (patterns[pattern] && patterns[pattern].test(ex)) {
          this.errors.push(
            `grammar_examples[${i}] uses forbidden "${pattern}": "${ex}"`
          );
        }
      });
    });
    
    console.log(this.errors.length === 0 ? '  ✅ CEFR compliant' : `  ❌ ${this.errors.length} errors`);
  }
  
  // ===== VALIDATION 4: MISSION STRUCTURE =====
  validateMissionStructure() {
    console.log('🔍 Validating mission structure...');
    
    const specMissions = this.spec.story_missions;
    
    // Check mission count
    if (this.weekData.story_missions.length !== specMissions.count) {
      this.errors.push(
        `Mission count: ${this.weekData.story_missions.length} !== ${specMissions.count}`
      );
    }
    
    // Check each mission
    this.weekData.story_missions.forEach((mission, i) => {
      const expectedCount = specMissions.objectives_distribution[i];
      
      if (mission.objectives.length !== expectedCount) {
        this.errors.push(
          `Mission ${i+1}: ${mission.objectives.length} objectives !== expected ${expectedCount}`
        );
      }
      
      // Check format (canonical_question vs question_variants)
      mission.objectives.forEach((obj, j) => {
        if (specMissions.format === 'canonical_question') {
          if (!obj.canonical_question) {
            this.errors.push(
              `Mission ${i+1} Objective ${j+1}: Missing canonical_question`
            );
          }
          if (obj.question_variants) {
            this.errors.push(
              `Mission ${i+1} Objective ${j+1}: Should use canonical_question, not question_variants`
            );
          }
        } else if (specMissions.format === 'question_variants') {
          if (!obj.question_variants) {
            this.errors.push(
              `Mission ${i+1} Objective ${j+1}: Missing question_variants`
            );
          }
          if (obj.canonical_question) {
            this.errors.push(
              `Mission ${i+1} Objective ${j+1}: Should use question_variants, not canonical_question`
            );
          }
          
          // Check variants count
          if (obj.question_variants && obj.question_variants.length !== 3) {
            this.errors.push(
              `Mission ${i+1} Objective ${j+1}: Must have 3 question_variants, got ${obj.question_variants.length}`
            );
          }
        }
        
        // Check ack_options count
        if (obj.ack_options && obj.ack_options.length !== 3) {
          this.errors.push(
            `Mission ${i+1} Objective ${j+1}: Must have 3 ack_options, got ${obj.ack_options.length}`
          );
        }
      });
      
      // Check student invitations (Week 4+)
      if (specMissions.student_invitations && !mission.student_question_invitation) {
        this.errors.push(
          `Mission ${i+1}: Missing student_question_invitation`
        );
      }
    });
    
    console.log(this.errors.length === 0 ? '  ✅ Mission structure valid' : `  ❌ ${this.errors.length} errors`);
  }
  
  // ===== VALIDATION 5: CROSS-REFERENCES =====
  validateCrossReferences() {
    console.log('🔍 Validating cross-references...');
    
    const vocabWords = this.weekData.target_vocab.map(v => v.word);
    
    this.weekData.story_missions.forEach((mission, i) => {
      mission.objectives.forEach((obj, j) => {
        if (obj.target_keywords) {
          obj.target_keywords.forEach(keyword => {
            if (!vocabWords.includes(keyword)) {
              this.errors.push(
                `Mission ${i+1} Objective ${j+1}: keyword "${keyword}" not in target_vocab`
              );
            }
          });
        }
      });
    });
    
    console.log(this.errors.length === 0 ? '  ✅ Cross-references valid' : `  ❌ ${this.errors.length} errors`);
  }
  
  // ===== RUN ALL VALIDATIONS =====
  validate() {
    console.log(`\n🎯 Validating Week ${this.weekNum} (Spec-based)...\n`);
    
    try {
      this.loadSpec();
      this.loadWeekData();
      
      this.validateMetadata();
      this.validateVocabulary();
      this.validateCEFR();
      this.validateMissionStructure();
      this.validateCrossReferences();
      
      // Print summary
      console.log('\n' + '='.repeat(50));
      console.log(`📊 VALIDATION SUMMARY - Week ${this.weekNum}`);
      console.log('='.repeat(50));
      
      if (this.errors.length === 0 && this.warnings.length === 0) {
        console.log('✅ ALL CHECKS PASSED!');
        console.log('🎉 Week ' + this.weekNum + ' is ready to commit!');
        return true;
      }
      
      if (this.errors.length > 0) {
        console.log(`\n❌ ERRORS (${this.errors.length}):`);
        this.errors.forEach((err, i) => {
          console.log(`   ${i+1}. ${err}`);
        });
      }
      
      if (this.warnings.length > 0) {
        console.log(`\n⚠️  WARNINGS (${this.warnings.length}):`);
        this.warnings.forEach((warn, i) => {
          console.log(`   ${i+1}. ${warn}`);
        });
      }
      
      console.log('\n' + '='.repeat(50));
      
      return this.errors.length === 0;
      
    } catch (error) {
      console.error('💥 Validation failed:', error.message);
      return false;
    }
  }
}

// ===== CLI EXECUTION =====
if (require.main === module) {
  const weekNum = process.argv[2];
  
  if (!weekNum) {
    console.error("❌ Missing week number");
    console.log("Usage: node MASS/tools/validate_week_v2.cjs <week_number>");
    console.log("Example: node MASS/tools/validate_week_v2.cjs 5");
    process.exit(1);
  }
  
  const validator = new WeekValidatorV2(weekNum);
  const passed = validator.validate();
  
  process.exit(passed ? 0 : 1);
}

module.exports = WeekValidatorV2;
