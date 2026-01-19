/**
 * PARSER FOR CLAUDE CHAT OUTPUT
 * Parses 15 files from Claude Chat response
 * 
 * Expected format:
 * === FILE: vocab.js ===
 * [code]
 * === END FILE ===
 */

/**
 * Parse files from Claude Chat output
 * @param {string} input - Raw text from Claude Chat
 * @returns {Object} - Parsed files object
 */
export function parseClaudeOutput(input) {
  const files = {};
  
  // Remove markdown code blocks if present
  let cleanInput = input
    .replace(/```javascript\n/g, '')
    .replace(/```js\n/g, '')
    .replace(/```\n/g, '')
    .replace(/```/g, '');
  
  // Split by file separator
  const filePattern = /=== FILE: (.+?) ===\n([\s\S]*?)(?:=== END FILE ===|$)/g;
  let match;
  
  while ((match = filePattern.exec(cleanInput)) !== null) {
    const filename = match[1].trim();
    const content = match[2].trim();
    
    files[filename] = content;
    console.log(`✅ Parsed: ${filename} (${content.length} chars)`);
  }
  
  return files;
}

/**
 * Validate parsed files
 * @param {Object} files - Parsed files object
 * @returns {Object} - Validation result
 */
export function validateParsedFiles(files) {
  const required = [
    'vocab.js',
    'read.js',
    'grammar.js',
    'ask_ai.js',
    'logic.js',
    'dictation.js',
    'shadowing.js',
    'writing.js',
    'explore.js',
    'word_power.js',
    'daily_watch.js',
    'word_match.js',
    'mindmap.js',
    'index.js',
    'week_03_real.js'
  ];
  
  const result = {
    valid: true,
    found: Object.keys(files).length,
    required: required.length,
    missing: [],
    extra: []
  };
  
  // Check missing files
  required.forEach(file => {
    if (!files[file]) {
      result.missing.push(file);
      result.valid = false;
    }
  });
  
  // Check extra files
  Object.keys(files).forEach(file => {
    if (!required.includes(file)) {
      result.extra.push(file);
    }
  });
  
  return result;
}

/**
 * Extract file metadata (for logging)
 * @param {string} content - File content
 * @returns {Object} - Metadata
 */
export function extractMetadata(content) {
  const meta = {
    hasExport: /export default/.test(content),
    lines: content.split('\n').length,
    size: content.length,
    hasComments: /\/\//.test(content) || /\/\*/.test(content)
  };
  
  return meta;
}

/**
 * Example usage
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Parser ready. Import this module to parse Claude Chat output.');
  console.log('');
  console.log('Example:');
  console.log('  import { parseClaudeOutput } from "./parse_claude_output.js";');
  console.log('  const files = parseClaudeOutput(claudeResponse);');
  console.log('  console.log(files);');
}
