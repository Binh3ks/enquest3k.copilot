import w33 from '../src/data/weeks/week_33/index.js';
import w34 from '../src/data/weeks/week_34/index.js';

function extractPairsFromRetell(weekData, weekId) {
  const read = weekData?.reading_hub?.read_explore 
    || weekData?.stations?.read_explore 
    || weekData?.read_explore 
    || weekData?.readingHub?.read_explore;

  const retellQuestions = read?.retell_questions;
  const pairs = [];

  if (Array.isArray(retellQuestions) && retellQuestions.length > 0) {
    retellQuestions.forEach((rq, idx) => {
      const sentence = rq.sentence || '';
      const chips = rq.chips || [];
      
      // Target chunk: pick the best noun/prepositional phrase chunk from chips
      // Candidates: chips that appear in sentence
      let matchedChip = null;
      let matchIdx = -1;

      // Prefer chips that are not single words (more than 1 word) and appear after position 8
      for (const chip of chips) {
        const cIdx = sentence.toLowerCase().indexOf(chip.toLowerCase());
        if (cIdx > 8) {
          // If we already have a match, prefer a multi-word chip or later position
          if (!matchedChip || (chip.includes(' ') && !matchedChip.includes(' ')) || cIdx > matchIdx) {
            matchedChip = chip;
            matchIdx = cIdx;
          }
        }
      }

      // Fallback: any chip appearing in sentence
      if (!matchedChip) {
        for (const chip of chips) {
          const cIdx = sentence.toLowerCase().indexOf(chip.toLowerCase());
          if (cIdx > 5) {
            matchedChip = chip;
            matchIdx = cIdx;
            break;
          }
        }
      }

      if (matchedChip && matchIdx > 0) {
        let starter = sentence.substring(0, matchIdx).trim();
        let completion = sentence.substring(matchIdx, matchIdx + matchedChip.length).trim();
        
        // Include article if starter ends with 'the', 'a', 'an'
        // e.g. "Jake was walking carefully down the" -> starter: "Jake was walking carefully down", completion: "the school corridor"
        const artMatch = starter.match(/^(.*)\s+(the|a|an)$/i);
        if (artMatch) {
          starter = artMatch[1];
          completion = `${artMatch[2].toLowerCase()} ${completion}`;
        }

        // Clean trailing punctuation
        starter = starter.replace(/[,;:]$/, '').trim();
        completion = completion.replace(/[,;.!?]$/, '').trim();

        pairs.push({
          starter,
          completion
        });
      }
    });
  }

  // If we have 5 pairs, add a 6th pair from CLIL / Science Lab if available (e.g. W33)
  if (pairs.length === 5) {
    const clil = weekData?.reading_hub?.clil_article;
    if (clil && weekId === 33) {
      pairs.push({
        starter: 'Rubber shoe soles provide',
        completion: 'a strong grip'
      });
    } else if (weekId === 34) {
      pairs.push({
        starter: 'The mouse helped the lion out of',
        completion: 'the heavy net'
      });
    }
  }

  return pairs;
}

console.log('=== WEEK 33 EXTRACTED PAIRS ===');
const w33Pairs = extractPairsFromRetell(w33.weekData || w33, 33);
w33Pairs.forEach((p, i) => console.log(`${i+1}. "${p.starter} ... ?" -> [${p.completion}]`));

console.log('\n=== WEEK 34 EXTRACTED PAIRS ===');
const w34Pairs = extractPairsFromRetell(w34.weekData || w34, 34);
w34Pairs.forEach((p, i) => console.log(`${i+1}. "${p.starter} ... ?" -> [${p.completion}]`));
