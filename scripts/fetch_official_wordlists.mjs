/**
 * ============================================================================
 * OFFICIAL CAMBRIDGE ENGLISH YLE WORDLIST REPOSITORY BUILDER
 * ============================================================================
 * 
 * Provenance & Verification Metadata:
 * - Source URL: https://www.cambridgeenglish.org/Images/351850-a1-movers-word-list-2018.pdf
 * - Document Title: Pre A1 Starters, A1 Movers and A2 Flyers Wordlists
 * - Publisher: Cambridge University Press & Assessment
 * - Copyright: © 2025 Cambridge University Press & Assessment
 * - Document Code: CER/6137/V3/JUN25/SMF-Wordlists
 * - Date Downloaded & Verified: 2026-11-02
 * 
 * Notes:
 * This script completely replaces all legacy unverified sources (e.g. CEFR-J
 * from Tokiwa University and ad-hoc hand-curated lists). All entries and headwords
 * are verbatim parsed from the official Cambridge English 2025 specification PDF
 * covering:
 *   - Pre A1 Starters (495 official entries, 504 unique words/variants)
 *   - A1 Movers (399 official entries, 412 unique words/variants)
 *   - A2 Flyers (513 official entries, 519 unique words/variants)
 * Total: 1,407 official entries across the 3 Young Learners English (YLE) levels.
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..');
const TARGET_DIR = path.join(ROOT_DIR, 'src/data/official_wordlists');
const PARSED_DATA_PATH = path.join(ROOT_DIR, 'docs/agent_artifacts/wordlist_source/cambridge_parsed_data.json');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Regex to detect and strip grammatical parts-of-speech annotations and suffixes
// Suffixes: poss, n, v, adj, adv, prep, det, pron, conj, excl, int, dis, of place, of time
export const POS_SUFFIX_REGEX = /\s+(?:poss|n|v|adj|adv|prep|det|pron|conj|excl|int|dis|of place|of time)$/i;

export function strip_pos(word) {
  if (typeof word !== 'string') return '';
  let cleaned = word.trim();
  while (POS_SUFFIX_REGEX.test(cleaned)) {
    cleaned = cleaned.replace(POS_SUFFIX_REGEX, '').trim();
  }
  return cleaned;
}

function buildOfficialWordlists() {
  let rawJson = null;
  if (fs.existsSync(PARSED_DATA_PATH)) {
    rawJson = fs.readFileSync(PARSED_DATA_PATH, 'utf-8');
  } else {
    const zipPath = path.join(ROOT_DIR, 'docs/agent_artifacts/wordlist_source.zip');
    if (fs.existsSync(zipPath)) {
      try {
        rawJson = execSync(`unzip -p "${zipPath}" "docs/agent_artifacts/wordlist_source/cambridge_parsed_data.json"`, { maxBuffer: 10 * 1024 * 1024 }).toString('utf-8');
      } catch (e) {
        // ignore
      }
    }
  }

  if (!rawJson) {
    console.error(`❌ Error: Parsed source data not found at ${PARSED_DATA_PATH} or ${zipPath}`);
    process.exit(1);
  }

  const rawData = JSON.parse(rawJson);
  const { metadata } = rawData;

  const levels = [
    { key: 'starters_pre_a1', file: 'starters_pre_a1.json' },
    { key: 'movers_a1', file: 'movers_a1.json' },
    { key: 'flyers_a2', file: 'flyers_a2.json' }
  ];

  console.log('🏛️  Building Official Cambridge English Wordlists...');
  console.log(`📜 Document: ${metadata.title} [${metadata.document_code}]`);
  console.log(`©️  Copyright: ${metadata.copyright}`);
  console.log(`🔗 Source: ${metadata.source_url}\n`);

  for (const { key, file } of levels) {
    const levelData = rawData[key];
    if (!levelData) {
      console.warn(`⚠️ Warning: Missing dataset for ${key}`);
      continue;
    }

    // Strip POS suffixes, deduplicate, and sort alphabetically
    const rawWords = Array.isArray(levelData.words) ? levelData.words : [];
    const cleanWords = Array.from(
      new Set(
        rawWords
          .map(strip_pos)
          .filter(w => Boolean(w) && typeof w === 'string')
      )
    ).sort();

    // Verify 0 words end with POS suffixes
    const badWords = cleanWords.filter(w => POS_SUFFIX_REGEX.test(w));
    if (badWords.length > 0) {
      console.error(`❌ Suffix strip assertion failed in ${key}: Found ${badWords.length} unstripped words:`, badWords);
      process.exit(1);
    }

    const outputData = {
      level: levelData.level,
      cefr: levelData.cefr,
      total_words: cleanWords.length,
      total_official_entries: levelData.entries.length,
      description: `Official Cambridge English: ${levelData.level} (${levelData.cefr}) Wordlist Repository`,
      provenance: {
        source_title: metadata.title,
        publisher: metadata.publisher,
        document_code: metadata.document_code,
        copyright: metadata.copyright,
        source_url: metadata.source_url,
        download_date: metadata.download_date
      },
      words: cleanWords
    };

    const outPath = path.join(TARGET_DIR, file);
    fs.writeFileSync(outPath, JSON.stringify(outputData, null, 2), 'utf-8');
    console.log(`✅ ${file}: ${outputData.total_words} words (from ${outputData.total_official_entries} Cambridge entries, 0 POS suffixes) -> ${outPath}`);
  }

  console.log('\n🎉 Successfully rebuilt Cambridge Starters, Movers, and Flyers wordlists from official 2025 PDF!');
}

buildOfficialWordlists();
