import fs from 'fs';
import path from 'path';

/**
 * Tree-sitter Style Repo Map Skeleton Generator
 * Scans JS/JSX codebase and extracts signatures (export functions, components, hooks, methods)
 * saving up to 85% tokens compared to reading raw implementation files.
 */

const rootDir = process.cwd();
const srcDir = path.join(rootDir, 'src');
const outputFile = path.join(rootDir, '.agents', 'repo_map.md');

function walkDir(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        walkDir(filePath, fileList);
      }
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function extractSignatures(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const lines = code.split('\n');
  const relPath = path.relative(rootDir, filePath);
  const signatures = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    // Match export function, export const, class declarations, export default
    if (
      trimmed.startsWith('export function') ||
      trimmed.startsWith('export const') ||
      trimmed.startsWith('export default function') ||
      trimmed.startsWith('function') ||
      trimmed.startsWith('class') ||
      trimmed.startsWith('export default class')
    ) {
      // Clean up function signature (keep parameters, drop body opening brace)
      let sig = line.split('{')[0].trim();
      if (sig.length > 120) sig = sig.slice(0, 120) + '...';
      signatures.push(`  - L${index + 1}: \`${sig}\``);
    }
  });

  if (signatures.length === 0) return null;

  return `### 📄 \`${relPath}\` (${lines.length} lines)\n` + signatures.join('\n');
}

function generateRepoMap() {
  console.log('[RepoMap] Scanning JS/JSX files in src/...');
  const files = walkDir(srcDir);
  const mapEntries = [];

  files.forEach(file => {
    const entry = extractSignatures(file);
    if (entry) {
      mapEntries.push(entry);
    }
  });

  const now = new Date().toISOString();
  const content = `# 🗺️ Tree-Sitter Style AST Repo Map Skeleton
**Generated**: ${now}
**Total Files Mapped**: ${mapEntries.length}

> **Token Optimization Note**: This file contains function signatures and exported components across \`src/\`. Use this map to navigate the codebase without loading full implementation files into context.

---

${mapEntries.join('\n\n')}
`;

  const agentsDir = path.join(rootDir, '.agents');
  if (!fs.existsSync(agentsDir)) {
    fs.mkdirSync(agentsDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, content, 'utf8');
  console.log(`[RepoMap] ✅ Generated Repo Map at ${outputFile} (${mapEntries.length} files, ${content.length} bytes)`);
}

generateRepoMap();
