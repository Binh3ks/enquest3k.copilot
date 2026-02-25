#!/usr/bin/env python3
"""Fix the GENERIC STORY MODE in tutorPrompts.js:
1. Fix studentTurns to be phase-relative (turnCount - phaseStart)
2. Add proper phase transition to next phase's first question
3. Remove confusing WRONG/RIGHT examples that match student responses
"""

with open('src/services/ai_tutor/tutorPrompts.js', 'r') as f:
    content = f.read()

# Find the old block start and end
START_MARKER = 'NEXT QUESTION YOU MUST ASK (based on conversation turns)'
END_MARKER = 'STEP-BY-STEP INSTRUCTION:'

start_idx = content.find(START_MARKER)
end_idx = content.find(END_MARKER, start_idx)

if start_idx == -1:
    print('ERROR: START_MARKER not found')
    exit(1)
if end_idx == -1:
    print('ERROR: END_MARKER not found')
    exit(1)

# Go back to start of that line
line_start = content.rfind('\n', 0, start_idx) + 1
print(f'Replacing lines from {line_start} to {end_idx}')
print(f'Block to replace (first 200 chars): {repr(content[line_start:line_start+200])}')

old_block = content[line_start:end_idx]
print(f'\nOld block length: {len(old_block)}')

new_block = """    🔢 NEXT QUESTION YOU MUST ASK NOW:
    ${(() => {
      // Phase-relative index: turnCount minus the phase start turn number
      const [phaseStart] = (currentPhase?.turns || '1-20').split('-').map(Number);
      const questionIndex = Math.max(0, turnCount - phaseStart);
      const questionsInPhase = currentPhase?.phase_questions?.length || 0;
      
      if (questionIndex < questionsInPhase) {
        const currentQuestion = currentPhase?.phase_questions?.[questionIndex];
        if (currentQuestion && typeof currentQuestion === 'object' && currentQuestion.template) {
          return `🚨 COPY THIS EXACT TEXT (phase ${currentPhase?.phase_name}, question #${questionIndex + 1}):\\n${currentQuestion.template}\\n🎯 USE THESE HINTS: [${currentQuestion.hints?.join(', ') || 'none'}]`;
        }
        return `🚨 COPY THIS EXACT TEXT (question #${questionIndex + 1}):\\n${currentQuestion || 'No question available'}`;
      } else {
        // Current phase exhausted — move to next phase
        const currentPhaseIdx = (mission.story_arc || []).findIndex(p => p === currentPhase);
        const nextPhase = mission.story_arc?.[currentPhaseIdx + 1];
        const firstQ = nextPhase?.phase_questions?.[0];
        if (firstQ && typeof firstQ === 'object' && firstQ.template) {
          return `[PHASE COMPLETE → NOW STARTING: ${nextPhase.phase_name}]\\n🚨 COPY THIS EXACT TEXT (first question of new phase):\\n${firstQ.template}\\n🎯 USE THESE HINTS: [${firstQ.hints?.join(', ') || 'none'}]`;
        }
        if (firstQ) {
          return `[PHASE COMPLETE → NOW STARTING: ${nextPhase?.phase_name || 'final phase'}]\\n🚨 COPY THIS EXACT TEXT:\\n${firstQ}`;
        }
        return '[ALL PHASES COMPLETE! Say a short goodbye + what student learned. NO new questions.]';
      }
    })()}
    
    🚨🚨🚨 COPY THE TEXT FROM "🚨 COPY THIS EXACT TEXT" ABOVE WORD-FOR-WORD! 🚨🚨🚨
    DO NOT improvise, paraphrase, or shorten.
    INCLUDE the "Say: X or Y" scaffolding if the template has it.
    
    """

content = content[:line_start] + new_block + content[end_idx:]

with open('src/services/ai_tutor/tutorPrompts.js', 'w') as f:
    f.write(content)

print('Done! Replacement applied.')
print(f'New block length: {len(new_block)}')
