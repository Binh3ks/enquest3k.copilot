/**
 * scripts/test_monte_carlo_f2d3.mjs — Monte Carlo Simulation (2,000,000 runs) for F2D3
 * Validates N4 anti-guessing constraint:
 * 4 blanks, 8 stones total (4 targets + 4 distractors), 3 hearts.
 * Incorrect placement deducts 1 heart and returns stone to origin.
 * Game KO occurs when hearts reach 0.
 */

export function runMonteCarlo(N = 2000000) {
  const K = 4; // Blanks to fill
  const M = 8; // Total stones in pool
  const H = 3; // Hearts allowance

  // Model 1: Memoryless Guesser (Blind random selection)
  let memorylessWins = 0;
  for (let i = 0; i < N; i++) {
    let hearts = H;
    let blanksLeft = K;
    let pool = M;
    let won = true;

    while (blanksLeft > 0) {
      // Pick random stone from current remaining pool of stones
      const roll = Math.floor(Math.random() * pool);
      if (roll === 0) {
        // Correct stone placed into current target slot
        blanksLeft--;
        pool--;
      } else {
        // Wrong stone inserted -> penalty
        hearts--;
        if (hearts === 0) {
          won = false;
          break;
        }
      }
    }
    if (won && blanksLeft === 0) {
      memorylessWins++;
    }
  }

  // Model 2: Local Elimination Guesser
  // Because toast displays: "⚡ '${stone.word}' rejected by ancient seal!",
  // a guesser never repeats a rejected stone on the SAME slot during that slot's trial.
  let localElimWins = 0;
  for (let i = 0; i < N; i++) {
    let hearts = H;
    let blanksLeft = K;
    let optionsForSlot = M - (K - blanksLeft);
    let won = true;

    while (blanksLeft > 0) {
      const roll = Math.floor(Math.random() * optionsForSlot);
      if (roll === 0) {
        // Correct stone placed
        blanksLeft--;
        optionsForSlot = M - (K - blanksLeft);
      } else {
        hearts--;
        if (hearts === 0) {
          won = false;
          break;
        }
        // That stone is eliminated for this specific slot
        optionsForSlot--;
      }
    }
    if (won && blanksLeft === 0) {
      localElimWins++;
    }
  }

  console.log(`================================================================`);
  console.log(`🎲 MONTE CARLO SIMULATION REPORT: F2D3 ANCIENT SCROLL CLOZE`);
  console.log(`Runs: ${N.toLocaleString()} iterations`);
  console.log(`Parameters: Blanks=4, Stones=8, Hearts=3, Wrong-Guess Penalty=-1 Heart`);
  console.log(`----------------------------------------------------------------`);
  console.log(`Model 1: Memoryless Guesser (Pure Blind Random)`);
  console.log(`  Successful Runs: ${memorylessWins.toLocaleString()} / ${N.toLocaleString()}`);
  console.log(`  P_guess: ${(memorylessWins / N * 100).toFixed(4)}%`);
  console.log(`  Threshold (< 5.0%): ${memorylessWins / N < 0.05 ? "PASS ✅" : "FAIL ❌"}`);
  console.log(`----------------------------------------------------------------`);
  console.log(`Model 2: Local Elimination Guesser (Rejected stone eliminated for slot)`);
  console.log(`  Successful Runs: ${localElimWins.toLocaleString()} / ${N.toLocaleString()}`);
  console.log(`  P_guess: ${(localElimWins / N * 100).toFixed(4)}%`);
  console.log(`  Threshold (< 5.0%): ${localElimWins / N < 0.05 ? "PASS ✅" : "FAIL ❌"}`);
  console.log(`================================================================`);
}

runMonteCarlo(2000000);
