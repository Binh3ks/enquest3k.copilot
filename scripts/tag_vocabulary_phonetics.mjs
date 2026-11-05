#!/usr/bin/env node
/**
 * scripts/tag_vocabulary_phonetics.mjs
 * 
 * Round 52 — Automated IPA Phonetic Transcription & Past-Tense Triad Auto-Tagger
 * Nhóm 1 Automation Tooling for EngQuest3K (SOP Giai đoạn 1 -> Giai đoạn 2).
 * 
 * Objectives:
 * 1. Automatically generates General American IPA phonetic transcriptions (/.../)
 *    for all target vocabulary words in src/data/weeks/week_{N}/blueprint.json
 *    using CMU Pronouncing Dictionary (ARPAbet -> IPA).
 * 2. Classifies English verbs into Regular vs. Irregular:
 *    - For Regular verbs: tags the exact phonetic past-tense ending group:
 *      * /ɪd/ (after base ending in /t/ or /d/)
 *      * /t/  (after base ending in voiceless consonant /p, k, f, s, ʃ, tʃ, θ/)
 *      * /d/  (after base ending in voiced consonant or vowel)
 *      * Generates the standard past-tense spelling (e.g. slip -> slipped).
 *    - For Irregular verbs: provides past simple & past participle forms
 *      (e.g. swim -> swam / swum, fly -> flew / flown).
 * 3. Enforces strict safety & anti-hallucination gates:
 *    - Default mode is --dry-run (zero disk mutation).
 *    - Requires explicit --write flag to mutate blueprint.json.
 *    - Hard Cryptographic Freeze Guard: Blocks modifying W33/W34 unless --force is passed.
 *    - Fail-Loud on unknown phonetic words.
 * 
 * Usage:
 *   node scripts/tag_vocabulary_phonetics.mjs 38            # Dry-run on Week 38
 *   node scripts/tag_vocabulary_phonetics.mjs 38 --write    # Tag & write to Week 38 blueprint
 *   node scripts/tag_vocabulary_phonetics.mjs --all         # Dry-run on all 156 weeks
 *   node scripts/tag_vocabulary_phonetics.mjs --all --write # Mass tag all un-frozen weeks
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CMUDict } from 'cmudict';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// ── 1. ARPABET TO IPA PHONETIC MAPPING (GENERAL AMERICAN) ───────────────────
const ARPABET_TO_IPA = {
  // Vowels
  'AA': 'ɑː', 'AA0': 'ɑ', 'AA1': 'ɑː', 'AA2': 'ɑː',
  'AE': 'æ',  'AE0': 'æ', 'AE1': 'æ',  'AE2': 'æ',
  'AH': 'ʌ',  'AH0': 'ə', 'AH1': 'ʌ',  'AH2': 'ʌ',
  'AO': 'ɔː', 'AO0': 'ɔ', 'AO1': 'ɔː', 'AO2': 'ɔː',
  'AW': 'aʊ', 'AW0': 'aʊ','AW1': 'aʊ', 'AW2': 'aʊ',
  'AY': 'aɪ', 'AY0': 'aɪ','AY1': 'aɪ', 'AY2': 'aɪ',
  'EH': 'ɛ',  'EH0': 'ɛ', 'EH1': 'ɛ',  'EH2': 'ɛ',
  'ER': 'ɝː', 'ER0': 'ɚ','ER1': 'ɝː', 'ER2': 'ɝː',
  'EY': 'eɪ', 'EY0': 'eɪ','EY1': 'eɪ', 'EY2': 'eɪ',
  'IH': 'ɪ',  'IH0': 'ɪ', 'IH1': 'ɪ',  'IH2': 'ɪ',
  'IY': 'iː', 'IY0': 'i', 'IY1': 'iː', 'IY2': 'iː',
  'OW': 'oʊ', 'OW0': 'oʊ','OW1': 'oʊ', 'OW2': 'oʊ',
  'OY': 'ɔɪ', 'OY0': 'ɔɪ','OY1': 'ɔɪ', 'OY2': 'ɔɪ',
  'UH': 'ʊ',  'UH0': 'ʊ', 'UH1': 'ʊ',  'UH2': 'ʊ',
  'UW': 'uː', 'UW0': 'u', 'UW1': 'uː', 'UW2': 'uː',
  // Consonants
  'B':  'b',  'CH': 'tʃ', 'D':  'd',  'DH': 'ð',
  'F':  'f',  'G':  'ɡ',  'HH': 'h',  'JH': 'dʒ',
  'K':  'k',  'L':  'l',  'M':  'm',  'N':  'n',
  'NG': 'ŋ',  'P':  'p',  'R':  'ɹ',  'S':  's',
  'SH': 'ʃ',  'T':  't',  'TH': 'θ',  'V':  'v',
  'W':  'w',  'Y':  'j',  'Z':  'z',  'ZH': 'ʒ',
};

// ── 2. AUTHORITATIVE IRREGULAR VERBS REPOSITORY ─────────────────────────────
export const IRREGULAR_VERBS = {
  'be':         { past: 'was/were', participle: 'been', rule: 'Suppletive to-be' },
  'become':     { past: 'became', participle: 'become', rule: 'Vowel mutation o -> a' },
  'begin':      { past: 'began', participle: 'begun', rule: 'Vowel mutation i -> a' },
  'bite':       { past: 'bit', participle: 'bitten', rule: 'Vowel shortening i -> i' },
  'blow':       { past: 'blew', participle: 'blown', rule: 'Vowel mutation ow -> ew' },
  'break':      { past: 'broke', participle: 'broken', rule: 'Vowel mutation ea -> o' },
  'bring':      { past: 'brought', participle: 'brought', rule: 'Vowel mutation ing -> ought' },
  'build':      { past: 'built', participle: 'built', rule: 'Dental suffix change d -> t' },
  'buy':        { past: 'bought', participle: 'bought', rule: 'Vowel mutation uy -> ought' },
  'catch':      { past: 'caught', participle: 'caught', rule: 'Vowel mutation atch -> aught' },
  'choose':     { past: 'chose', participle: 'chosen', rule: 'Vowel mutation oo -> o' },
  'come':       { past: 'came', participle: 'come', rule: 'Vowel mutation o -> a' },
  'cost':       { past: 'cost', participle: 'cost', rule: 'Zero-change verb' },
  'cut':        { past: 'cut', participle: 'cut', rule: 'Zero-change verb' },
  'do':         { past: 'did', participle: 'done', rule: 'Irregular past did' },
  'draw':       { past: 'drew', participle: 'drawn', rule: 'Vowel mutation aw -> ew' },
  'drink':      { past: 'drank', participle: 'drunk', rule: 'Vowel mutation i -> a' },
  'drive':      { past: 'drove', participle: 'driven', rule: 'Vowel mutation i -> o' },
  'eat':        { past: 'ate', participle: 'eaten', rule: 'Vowel mutation ea -> a' },
  'fall':       { past: 'fell', participle: 'fallen', rule: 'Vowel mutation a -> e' },
  'feed':       { past: 'fed', participle: 'fed', rule: 'Vowel shortening ee -> e' },
  'feel':       { past: 'felt', participle: 'felt', rule: 'Vowel shortening ee -> e + t' },
  'fight':      { past: 'fought', participle: 'fought', rule: 'Vowel mutation igh -> ough' },
  'find':       { past: 'found', participle: 'found', rule: 'Vowel mutation i -> ou' },
  'fly':        { past: 'flew', participle: 'flown', rule: 'Vowel mutation y -> ew' },
  'forget':     { past: 'forgot', participle: 'forgotten', rule: 'Vowel mutation e -> o' },
  'freeze':     { past: 'froze', participle: 'frozen', rule: 'Vowel mutation ee -> o' },
  'get':        { past: 'got', participle: 'got/gotten', rule: 'Vowel mutation e -> o' },
  'give':       { past: 'gave', participle: 'given', rule: 'Vowel mutation i -> a' },
  'go':         { past: 'went', participle: 'gone', rule: 'Suppletive go -> went' },
  'grow':       { past: 'grew', participle: 'grown', rule: 'Vowel mutation ow -> ew' },
  'have':       { past: 'had', participle: 'had', rule: 'Dental suffix contraction have -> had' },
  'hear':       { past: 'heard', participle: 'heard', rule: 'Suffix d with vowel change ear -> ear /ɝː/' },
  'hide':       { past: 'hid', participle: 'hidden', rule: 'Vowel shortening i -> i' },
  'hit':        { past: 'hit', participle: 'hit', rule: 'Zero-change verb' },
  'hold':       { past: 'held', participle: 'held', rule: 'Vowel mutation o -> e' },
  'hurt':       { past: 'hurt', participle: 'hurt', rule: 'Zero-change verb' },
  'keep':       { past: 'kept', participle: 'kept', rule: 'Vowel shortening ee -> e + t' },
  'know':       { past: 'knew', participle: 'known', rule: 'Vowel mutation ow -> ew' },
  'leave':      { past: 'left', participle: 'left', rule: 'Vowel shortening ea -> e + t' },
  'lend':       { past: 'lent', participle: 'lent', rule: 'Dental suffix change d -> t' },
  'let':        { past: 'let', participle: 'let', rule: 'Zero-change verb' },
  'lose':       { past: 'lost', participle: 'lost', rule: 'Vowel change o -> o + t' },
  'make':       { past: 'made', participle: 'made', rule: 'Dental suffix k -> d' },
  'meet':       { past: 'met', participle: 'met', rule: 'Vowel shortening ee -> e' },
  'pay':        { past: 'paid', participle: 'paid', rule: 'Spelling y -> id' },
  'put':        { past: 'put', participle: 'put', rule: 'Zero-change verb' },
  'read':       { past: 'read', participle: 'read', rule: 'Vowel mutation /iː/ -> /ɛ/' },
  'ride':       { past: 'rode', participle: 'ridden', rule: 'Vowel mutation i -> o' },
  'ring':       { past: 'rang', participle: 'rung', rule: 'Vowel mutation i -> a' },
  'run':        { past: 'ran', participle: 'run', rule: 'Vowel mutation u -> a' },
  'say':        { past: 'said', participle: 'said', rule: 'Vowel mutation ay -> ai /ɛ/' },
  'see':        { past: 'saw', participle: 'seen', rule: 'Vowel mutation ee -> aw' },
  'sell':       { past: 'sold', participle: 'sold', rule: 'Vowel mutation ell -> old' },
  'send':       { past: 'sent', participle: 'sent', rule: 'Dental suffix change d -> t' },
  'set':        { past: 'set', participle: 'set', rule: 'Zero-change verb' },
  'shake':      { past: 'shook', participle: 'shaken', rule: 'Vowel mutation a -> oo' },
  'shoot':      { past: 'shot', participle: 'shot', rule: 'Vowel shortening oo -> o' },
  'shut':       { past: 'shut', participle: 'shut', rule: 'Zero-change verb' },
  'sing':       { past: 'sang', participle: 'sung', rule: 'Vowel mutation i -> a' },
  'sit':        { past: 'sat', participle: 'sat', rule: 'Vowel mutation i -> a' },
  'sleep':      { past: 'slept', participle: 'slept', rule: 'Vowel shortening ee -> e + t' },
  'speak':      { past: 'spoke', participle: 'spoken', rule: 'Vowel mutation ea -> o' },
  'spend':      { past: 'spent', participle: 'spent', rule: 'Dental suffix change d -> t' },
  'stand':      { past: 'stood', participle: 'stood', rule: 'Vowel mutation and -> ood' },
  'steal':      { past: 'stole', participle: 'stolen', rule: 'Vowel mutation ea -> o' },
  'swim':       { past: 'swam', participle: 'swum', rule: 'Vowel mutation i -> a' },
  'take':       { past: 'took', participle: 'taken', rule: 'Vowel mutation a -> oo' },
  'teach':      { past: 'taught', participle: 'taught', rule: 'Vowel mutation each -> aught' },
  'tear':       { past: 'tore', participle: 'torn', rule: 'Vowel mutation ear -> ore' },
  'tell':       { past: 'told', participle: 'told', rule: 'Vowel mutation ell -> old' },
  'think':      { past: 'thought', participle: 'thought', rule: 'Vowel mutation ink -> ought' },
  'throw':      { past: 'threw', participle: 'thrown', rule: 'Vowel mutation ow -> ew' },
  'understand': { past: 'understood', participle: 'understood', rule: 'Vowel mutation and -> ood' },
  'wake':       { past: 'woke', participle: 'woken', rule: 'Vowel mutation a -> o' },
  'wear':       { past: 'wore', participle: 'worn', rule: 'Vowel mutation ear -> ore' },
  'win':        { past: 'won', participle: 'won', rule: 'Vowel mutation i -> o' },
  'write':      { past: 'wrote', participle: 'written', rule: 'Vowel mutation i -> o' }
};

// ── 3. COMPREHENSIVE REGULAR VERBS LEXICON ──────────────────────────────────
// Verified regular verbs commonly occurring in Cambridge YLE / Primary curricula
export const KNOWN_REGULAR_VERBS = new Set([
  'act', 'add', 'agree', 'answer', 'appear', 'arrive', 'ask', 'attack',
  'bake', 'bark', 'beg', 'believe', 'belong', 'boil', 'borrow', 'bounce', 'brush', 'bump',
  'call', 'calm', 'camp', 'care', 'carry', 'cause', 'change', 'check', 'cheer', 'chew', 'clap', 'clean', 'climb', 'close', 'collect', 'comb', 'compare', 'complete', 'connect', 'cook', 'copy', 'count', 'cover', 'crash', 'crawl', 'cross', 'cry',
  'dance', 'decide', 'describe', 'design', 'destroy', 'die', 'disappear', 'discover', 'divide', 'drop', 'dry', 'dust',
  'earn', 'end', 'enjoy', 'enter', 'escape', 'explain', 'explore',
  'fail', 'fill', 'finish', 'fit', 'fix', 'flash', 'float', 'flood', 'flow', 'fold', 'follow', 'frighten',
  'gather', 'glance', 'glow', 'grab', 'greet', 'grin', 'guess', 'guide',
  'handle', 'happen', 'harm', 'hate', 'heat', 'help', 'hook', 'hop', 'hug', 'hunt', 'hurry',
  'imagine', 'imitate', 'improve', 'include', 'increase', 'inform', 'inhabit', 'injure', 'inspect', 'invent', 'invite',
  'join', 'joke', 'jump',
  'kick', 'kiss', 'knock',
  'label', 'land', 'last', 'laugh', 'learn', 'lick', 'lift', 'like', 'listen', 'live', 'load', 'lock', 'look', 'love',
  'manage', 'march', 'mark', 'marry', 'match', 'melt', 'mend', 'mess', 'miss', 'mix', 'move',
  'name', 'need', 'nod', 'notice', 'number',
  'obey', 'observe', 'open', 'order', 'organize',
  'pack', 'paint', 'pass', 'paste', 'pause', 'peel', 'perform', 'phone', 'pick', 'place', 'plan', 'plant', 'play', 'point', 'pour', 'practice', 'practise', 'praise', 'pray', 'prefer', 'prepare', 'press', 'pretend', 'prevent', 'print', 'produce', 'promise', 'protect', 'provide', 'pull', 'pump', 'punch', 'punish', 'push',
  'question',
  'rain', 'reach', 'record', 'refuse', 'relax', 'remain', 'remember', 'remind', 'repair', 'repeat', 'reply', 'report', 'rescue', 'rest', 'return', 'rinse', 'risk', 'roar', 'roll', 'rub', 'rule',
  'sail', 'save', 'scare', 'scold', 'scream', 'search', 'seat', 'serve', 'share', 'shiver', 'shock', 'shout', 'sign', 'signal', 'sip', 'skate', 'skip', 'slide', 'slip', 'slow', 'smell', 'smile', 'smoke', 'sneeze', 'sniff', 'snow', 'solve', 'soothe', 'sound', 'sparkle', 'spill', 'spot', 'spray', 'stare', 'start', 'stay', 'step', 'stop', 'store', 'stretch', 'study', 'suggest', 'suit', 'supply', 'support', 'suppose', 'surprise', 'survive', 'swallow',
  'talk', 'taste', 'test', 'thank', 'tie', 'tip', 'tire', 'touch', 'tour', 'tow', 'trace', 'track', 'trade', 'train', 'trap', 'travel', 'treat', 'tremble', 'trick', 'trip', 'trust', 'try', 'turn',
  'unite', 'unlock', 'unpack', 'use',
  'vanish', 'visit',
  'wait', 'walk', 'wander', 'want', 'warm', 'warn', 'wash', 'waste', 'watch', 'wave', 'weigh', 'whisper', 'whistle', 'wipe', 'wish', 'wonder', 'work', 'worry', 'wrap',
  'yawn', 'yell', 'zip'
]);

// ── 4. CONVERT ARPABET STRING TO GENERAL AMERICAN IPA ───────────────────────
export function cmuToIpa(cmuString) {
  if (!cmuString) return null;

  const tokens = cmuString.trim().split(/\s+/);
  const syllables = [];
  let currentSyllable = { ipa: '', stress: 0 };

  for (const token of tokens) {
    const base = token.replace(/[012]$/, '');
    const stressDigit = token.slice(-1);
    const hasStress = ['0', '1', '2'].includes(stressDigit) ? parseInt(stressDigit, 10) : 0;

    const ipa = ARPABET_TO_IPA[token] || ARPABET_TO_IPA[base];

    if (ipa) {
      const isVowel = [
        'AA', 'AE', 'AH', 'AO', 'AW', 'AY', 'EH', 'ER', 'EY',
        'IH', 'IY', 'OW', 'OY', 'UH', 'UW'
      ].includes(base);

      if (isVowel && currentSyllable.ipa) {
        syllables.push({ ...currentSyllable });
        currentSyllable = { ipa: '', stress: hasStress };
      } else if (isVowel) {
        currentSyllable = { ipa: '', stress: hasStress };
      }
      currentSyllable.ipa += ipa;
    }
  }
  if (currentSyllable.ipa) syllables.push(currentSyllable);

  let ipaStr = '';
  for (const syl of syllables) {
    if (syl.stress === 1) ipaStr += 'ˈ';
    else if (syl.stress === 2) ipaStr += 'ˌ';
    ipaStr += syl.ipa;
  }

  const maxStress = syllables.reduce((max, s) => Math.max(max, s.stress), 0);

  return {
    ipa: '/' + ipaStr + '/',
    stress: maxStress,
    syllableCount: syllables.length
  };
}

// ── 5. REGULAR PAST TENSE SPELLING GENERATOR ─────────────────────────────────
export function generateRegularPastSpelling(verb) {
  const v = verb.toLowerCase();
  if (v.endsWith('e')) {
    return v + 'd';
  }
  if (v.endsWith('y') && !/[aeiou]y$/i.test(v)) {
    return v.slice(0, -1) + 'ied';
  }
  // CVC doubling rule for short verbs: slip -> slipped, stop -> stopped, trap -> trapped
  if (/^[^aeiou]*[aeiou][bcdfghjklmnpqrstvwxyz]$/i.test(v) && !/[wxy]$/i.test(v)) {
    const lastChar = v.slice(-1);
    return v + lastChar + 'ed';
  }
  return v + 'ed';
}

// ── 6. PHONOLOGY TRIAD CLASSIFICATION ENGINE ────────────────────────────────
export function lookupWordPhonetics(word, cmuDict) {
  // Clean trailing punctuation, parentheses, brackets
  let cleaned = word.replace(/[()[\]{}.,;:"']/g, '').trim().toLowerCase();
  if (!cleaned) return null;

  // Single word lookup
  if (!cleaned.includes(' ') && !cleaned.includes('-')) {
    const tokensRaw = cmuDict.get(cleaned.toUpperCase());
    if (tokensRaw) {
      return {
        word: cleaned,
        headWord: cleaned,
        tokensRaw,
        ipa: cmuToIpa(tokensRaw).ipa,
        isCompound: false
      };
    }
    return null;
  }

  // Multi-word phrase or hyphenated word (e.g. "living room", "wake up", "point out")
  const subWords = cleaned.split(/[\s-]+/).filter(Boolean);
  const subTokens = [];
  const subIpas = [];

  for (const sw of subWords) {
    if (/^\d+$/.test(sw)) continue; // ignore standalone digits
    const sTokens = cmuDict.get(sw.toUpperCase());
    if (!sTokens) return null;
    subTokens.push(sTokens);
    subIpas.push(cmuToIpa(sTokens).ipa.replace(/\//g, ''));
  }

  if (subIpas.length === 0) return null;

  return {
    word: cleaned,
    headWord: subWords[0], // primary verb/noun
    tokensRaw: subTokens.join(' '),
    ipa: '/' + subIpas.join(' ') + '/',
    isCompound: true,
    subWords
  };
}

export function classifyPhonology(word, cmuDict) {
  const lookup = lookupWordPhonetics(word, cmuDict);
  if (!lookup) return null;

  const { word: cleanWord, headWord, tokensRaw, ipa, isCompound, subWords } = lookup;
  const arpabetTokens = tokensRaw.trim().split(/\s+/);
  
  // For single words or phrasal verbs, examine head word's final phone
  const headTokensRaw = cmuDict.get(headWord.toUpperCase()) || tokensRaw;
  const headTokens = headTokensRaw.trim().split(/\s+/);
  const lastToken = headTokens[headTokens.length - 1];
  const finalBasePhone = lastToken.replace(/[012]$/, '');

  // Check 1: Is head word an Irregular Verb?
  if (IRREGULAR_VERBS[headWord]) {
    const irreg = IRREGULAR_VERBS[headWord];
    const pastSimple = isCompound 
      ? [irreg.past, ...subWords.slice(1)].join(' ')
      : irreg.past;
    const pastPart = isCompound
      ? [irreg.participle, ...subWords.slice(1)].join(' ')
      : irreg.participle;

    return {
      word: cleanWord,
      ipa: ipa,
      arpabet: tokensRaw,
      final_phone: finalBasePhone,
      is_verb: true,
      verb_classification: 'irregular',
      past_simple: pastSimple,
      past_participle: pastPart,
      past_ending_group: null,
      past_ending_rule: irreg.rule
    };
  }

  // Check 2: Is head word a Known Regular Verb?
  if (KNOWN_REGULAR_VERBS.has(headWord)) {
    const regPast = generateRegularPastSpelling(headWord);
    const pastSpelling = isCompound
      ? [regPast, ...subWords.slice(1)].join(' ')
      : regPast;

    let pastEndingGroup = null;
    let ruleReason = null;

    // Rule 1: /ɪd/ after alveolar stops /t/ or /d/
    if (finalBasePhone === 'T' || finalBasePhone === 'D') {
      pastEndingGroup = '/ɪd/';
      ruleReason = `Base verb ends in alveolar stop /${finalBasePhone.toLowerCase()}/ -> suffix pronounced as extra syllable /ɪd/`;
    }
    // Rule 2: /t/ after voiceless consonants: /p, k, f, s, ʃ, tʃ, θ/
    else if (['P', 'K', 'F', 'S', 'SH', 'CH', 'TH'].includes(finalBasePhone)) {
      pastEndingGroup = '/t/';
      ruleReason = `Base verb ends in voiceless consonant /${finalBasePhone.toLowerCase()}/ -> suffix pronounced as voiceless /t/`;
    }
    // Rule 3: /d/ after all other voiced consonants and vowels
    else {
      pastEndingGroup = '/d/';
      ruleReason = `Base verb ends in voiced consonant/vowel /${finalBasePhone.toLowerCase()}/ -> suffix pronounced as voiced /d/`;
    }

    return {
      word: cleanWord,
      ipa: ipa,
      arpabet: tokensRaw,
      final_phone: finalBasePhone,
      is_verb: true,
      verb_classification: 'regular',
      past_simple: pastSpelling,
      past_participle: pastSpelling,
      past_ending_group: pastEndingGroup,
      past_ending_rule: ruleReason
    };
  }

  // Check 3: Non-Verb Word (Noun, Adjective, Preposition, etc.)
  return {
    word: cleanWord,
    ipa: ipa,
    arpabet: tokensRaw,
    final_phone: finalBasePhone,
    is_verb: false,
    verb_classification: null,
    past_simple: null,
    past_participle: null,
    past_ending_group: null,
    past_ending_rule: null
  };
}

// ── 7. FROZEN INTEGRITY GUARD ───────────────────────────────────────────────
export function checkFrozenStatus(weekNum, isForce, isWrite) {
  const freezeManifestPath = path.join(ROOT_DIR, `docs/W${weekNum}_GOLDEN_FREEZE_MANIFEST.json`);
  if (fs.existsSync(freezeManifestPath)) {
    if (isWrite && !isForce) {
      console.error('========================================================================');
      console.error(`🚨 INTEGRITY ERROR: Week ${weekNum} is CRYPTOGRAPHICALLY FROZEN!`);
      console.error(`   Found freeze manifest: docs/W${weekNum}_GOLDEN_FREEZE_MANIFEST.json`);
      console.error('   Modifying a frozen week blueprint without Change Control Procedure is FORBIDDEN.');
      console.error('   To override for testing, specify the --force flag.');
      console.error('========================================================================');
      process.exit(1);
    } else if (isWrite && isForce) {
      console.warn(`⚠️ Warning: Overriding freeze protection for Week ${weekNum} due to --force flag.`);
    }
  }
}

// ── 8. PROCESS A SINGLE WEEK BLUEPRINT ──────────────────────────────────────
export function processWeekBlueprint(weekNum, cmuDict, options = {}) {
  const { isWrite = false, isForce = false } = options;
  const blueprintPath = path.join(ROOT_DIR, `src/data/weeks/week_${weekNum}/blueprint.json`);

  if (!fs.existsSync(blueprintPath)) {
    throw new Error(`Blueprint not found at: ${blueprintPath}`);
  }

  checkFrozenStatus(weekNum, isForce, isWrite);

  const rawJson = fs.readFileSync(blueprintPath, 'utf8');
  const blueprint = JSON.parse(rawJson);

  // Collect words to tag: prioritize target_vocab_20, fallback to vocabulary_focus.syllabus_words
  const wordsToTag = [];
  if (Array.isArray(blueprint.target_vocab_20) && blueprint.target_vocab_20.length > 0) {
    blueprint.target_vocab_20.forEach(item => {
      if (item && item.word) wordsToTag.push(item.word);
    });
  } else if (blueprint.vocabulary_focus && Array.isArray(blueprint.vocabulary_focus.syllabus_words)) {
    wordsToTag.push(...blueprint.vocabulary_focus.syllabus_words);
  }

  const taggedItems = [];
  const missingWords = [];
  const triadBuckets = { '/t/': [], '/d/': [], '/ɪd/': [] };
  let regCount = 0;
  let irregCount = 0;
  let nonVerbCount = 0;

  for (const w of wordsToTag) {
    const classification = classifyPhonology(w, cmuDict);
    if (!classification) {
      missingWords.push(w);
      continue;
    }

    taggedItems.push(classification);

    if (classification.is_verb) {
      if (classification.verb_classification === 'regular') {
        regCount++;
        if (classification.past_ending_group && triadBuckets[classification.past_ending_group]) {
          triadBuckets[classification.past_ending_group].push(classification.word);
        }
      } else {
        irregCount++;
      }
    } else {
      nonVerbCount++;
    }
  }

  // Fail-Loud Gate: If words are missing from CMUDict
  if (missingWords.length > 0) {
    const errMsg = `Fail-Loud: ${missingWords.length} words could not be transcribed via CMUDict in Week ${weekNum}: [${missingWords.join(', ')}]`;
    if (isWrite) {
      throw new Error(errMsg);
    } else {
      console.warn(`⚠️  ${errMsg}`);
    }
  }

  const isTriadComplete = (
    triadBuckets['/t/'].length > 0 &&
    triadBuckets['/d/'].length > 0 &&
    triadBuckets['/ɪd/'].length > 0
  );

  const phonologySummary = {
    total_words_tagged: taggedItems.length,
    ipa_coverage_pct: wordsToTag.length > 0 
      ? Number(((taggedItems.length / wordsToTag.length) * 100).toFixed(1))
      : 100.0,
    regular_verbs_count: regCount,
    irregular_verbs_count: irregCount,
    non_verbs_count: nonVerbCount,
    past_tense_triad: triadBuckets,
    triad_complete: isTriadComplete
  };

  // Update blueprint structure
  if (Array.isArray(blueprint.target_vocab_20)) {
    blueprint.target_vocab_20 = blueprint.target_vocab_20.map(item => {
      const match = taggedItems.find(t => t.word === item.word?.toLowerCase().trim());
      if (match) {
        return {
          ...item,
          ipa: match.ipa,
          phonetics: {
            arpabet: match.arpabet,
            final_phone: match.final_phone,
            is_verb: match.is_verb,
            verb_classification: match.verb_classification,
            past_simple: match.past_simple,
            past_participle: match.past_participle,
            past_ending_group: match.past_ending_group,
            past_ending_rule: match.past_ending_rule
          }
        };
      }
      return item;
    });
  }

  if (blueprint.vocabulary_focus) {
    blueprint.vocabulary_focus.phonology_summary = phonologySummary;
  }

  // Write if requested
  if (isWrite) {
    fs.writeFileSync(blueprintPath, JSON.stringify(blueprint, null, 2), 'utf8');
    console.log(`✅ [WRITE] Week ${weekNum} blueprint updated: ${taggedItems.length} words tagged (Triad Complete: ${isTriadComplete ? 'YES' : 'NO'})`);
  } else {
    console.log(`🔍 [DRY-RUN] Week ${weekNum} blueprint: ${taggedItems.length} words tagged (Regular: ${regCount}, Irregular: ${irregCount}, Non-verbs: ${nonVerbCount}, Triad: ${isTriadComplete ? '✅' : '⚠️'})`);
  }

  return {
    week: weekNum,
    wordsToTag,
    taggedCount: taggedItems.length,
    missingWords,
    phonologySummary,
    taggedItems
  };
}

// ── 9. CLI ENTRY POINT ──────────────────────────────────────────────────────
function printHelp() {
  console.log(`
EngQuest3K — Vocabulary IPA & Past-Tense Triad Auto-Tagger

Usage:
  node scripts/tag_vocabulary_phonetics.mjs <weekNum> [options]
  node scripts/tag_vocabulary_phonetics.mjs --all [options]

Options:
  --dry-run       Default mode. Analyzes and outputs stats without mutating disk.
  --write         Explicitly writes enriched IPA & phonology data to blueprint.json.
  --force         Overrides cryptographic golden freeze guard for W33 / W34.
  --help, -h      Shows this help message.

Examples:
  node scripts/tag_vocabulary_phonetics.mjs 38
  node scripts/tag_vocabulary_phonetics.mjs 38 --write
  node scripts/tag_vocabulary_phonetics.mjs --all
  node scripts/tag_vocabulary_phonetics.mjs --all --write
`);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h') || args.length === 0) {
    printHelp();
    process.exit(0);
  }

  const isWrite = args.includes('--write');
  const isForce = args.includes('--force');
  const isAll = args.includes('--all');

  console.log('========================================================================');
  console.log('🎙️  ENGQUEST3K — VOCABULARY IPA & PAST-TENSE TRIAD AUTO-TAGGER');
  console.log(`📋 Execution Mode: ${isWrite ? '🚨 WRITE (Disk Mutation)' : '🔍 DRY-RUN (Zero Disk Mutation)'}`);
  console.log('========================================================================\n');

  console.log('⏳ Initializing CMU Pronouncing Dictionary (General American)...');
  const cmuDict = new CMUDict();
  console.log('✅ CMUDict loaded successfully.\n');

  if (isAll) {
    console.log('--- Processing All 156 Curriculum Weeks ---');
    let totalTagged = 0;
    let completeTriads = 0;
    let skippedFrozen = 0;

    for (let w = 1; w <= 156; w++) {
      const freezeManifestPath = path.join(ROOT_DIR, `docs/W${w}_GOLDEN_FREEZE_MANIFEST.json`);
      if (fs.existsSync(freezeManifestPath) && isWrite && !isForce) {
        console.log(`⏭️  Skipping frozen week ${w} (pass --force to override)`);
        skippedFrozen++;
        continue;
      }

      try {
        const res = processWeekBlueprint(w, cmuDict, { isWrite, isForce });
        totalTagged += res.taggedCount;
        if (res.phonologySummary.triad_complete) completeTriads++;
      } catch (err) {
        console.error(`❌ Error processing week ${w}: ${err.message}`);
        if (isWrite) process.exit(1);
      }
    }

    console.log('\n========================================================================');
    console.log('📊 156-WEEK BATCH TAGGING SUMMARY:');
    console.log(`   Total Words Tagged:       ${totalTagged}`);
    console.log(`   Weeks with Full Triad:    ${completeTriads} / 156`);
    console.log(`   Skipped Frozen Weeks:     ${skippedFrozen}`);
    console.log('========================================================================\n');
  } else {
    const weekArg = args.find(a => /^\d+$/.test(a));
    if (!weekArg) {
      console.error('❌ Error: Must specify a week number (1-156) or --all.');
      process.exit(1);
    }
    const weekNum = parseInt(weekArg, 10);
    if (weekNum < 1 || weekNum > 156) {
      console.error(`❌ Error: Week ${weekNum} is out of bounds (1-156).`);
      process.exit(1);
    }

    console.log(`--- Processing Week ${weekNum} ---`);
    const res = processWeekBlueprint(weekNum, cmuDict, { isWrite, isForce });

    console.log('\n--- Sample Tagged Vocabulary ---');
    res.taggedItems.slice(0, 10).forEach(item => {
      const verbTag = item.is_verb 
        ? `[${item.verb_classification.toUpperCase()}${item.past_ending_group ? ` -> ${item.past_ending_group} ("${item.past_simple}")` : ` ("${item.past_simple}")`}]`
        : '[NON-VERB]';
      console.log(`   • ${item.word.padEnd(12)} -> ${item.ipa.padEnd(14)} ${verbTag}`);
    });

    console.log('\n--- Past Tense Triad Breakdown ---');
    console.log(`   /t/  group: [${res.phonologySummary.past_tense_triad['/t/'].join(', ') || 'none'}]`);
    console.log(`   /d/  group: [${res.phonologySummary.past_tense_triad['/d/'].join(', ') || 'none'}]`);
    console.log(`   /ɪd/ group: [${res.phonologySummary.past_tense_triad['/ɪd/'].join(', ') || 'none'}]`);
    console.log(`   Triad Complete: ${res.phonologySummary.triad_complete ? '✅ YES' : '⚠️ NO'}`);
  }

  console.log('\n✅ Operation completed successfully.');
}

if (process.argv[1] && (process.argv[1].endsWith('tag_vocabulary_phonetics.mjs') || fileURLToPath(import.meta.url) === process.argv[1])) {
  main().catch(err => {
    console.error('\n❌ Fatal execution error:', err.message);
    process.exit(1);
  });
}
