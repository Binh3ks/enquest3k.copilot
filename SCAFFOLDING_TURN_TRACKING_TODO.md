# Scaffolding Turn Tracking Implementation TODO

## Current Status
✅ **COMPLETED:**
- Week 4 scenarios refactored with scaffolding fade definitions
- roleplayPromptBuilder.js updated to include scaffolding instructions
- Template system created with scaffolding support
- Turn limit reduced from 20 → 10

⏳ **PARTIALLY IMPLEMENTED:**
- Scaffolding instructions included in AI prompt
- AI can self-manage turns based on conversation history
- Default `currentTurn = 1` in generateDynamicRoleplayPrompt()

## Remaining Work

### High Priority: Dynamic Turn Tracking
**Problem:** Currently, `currentTurn` is hardcoded to 1. AI relies on self-counting from conversation history, which may be inconsistent.

**Solution:** Pass actual `turnCount` from FreeTalkTab → tutorPrompts → freeTalkModes → buildRoleplayPrompt → generateDynamicRoleplayPrompt

**Implementation Steps:**
1. **FreeTalkTab.jsx:** 
   - Already has `turnCount` state
   - Pass into API call options: `{ ...options, currentTurn: turnCount }`

2. **tutorPrompts.js (buildModePrompt):**
   - Extract `currentTurn` from options
   - Pass to buildRoleplayMode() call

3. **freeTalkModes.js (buildRoleplayMode):**
   - Accept `currentTurn` parameter
   - Pass to buildRoleplayPrompt(roleId, weekData, currentTurn)

4. **roleplayPromptBuilder.js (buildRoleplayPrompt):**
   - Accept optional `currentTurn` parameter
   - Pass to generateDynamicRoleplayPrompt(scenario, currentTurn)

5. **Test scaffolding fade:**
   - Verify turn 1-3: Full sentence frames
   - Verify turn 4-7: No frames, still OR choices
   - Verify turn 8-10: Open questions with hints

### Code Locations
```javascript
// 1. FreeTalkTab.jsx (~line 400-500, API call section)
const apiOptions = {
  ...baseOptions,
  currentTurn: turnCount  // ADD THIS
};

// 2. tutorPrompts.js buildModePrompt() (~line 1259)
function buildModePrompt(mode, context, userInput, options) {
  const currentTurn = options?.currentTurn || 1;
  // Pass to buildRoleplayMode if mode === 'playing_roleplay'
}

// 3. freeTalkModes.js buildRoleplayMode() (~line 490)
export function buildRoleplayMode(context, currentTurn = 1) {
  const roleplayPrompt = buildRoleplayPrompt(roleId, weekData, currentTurn);
}

// 4. roleplayPromptBuilder.js buildRoleplayPrompt() (~line 21)
export function buildRoleplayPrompt(scenarioId, weekData, currentTurn = 1) {
  const aiPrompt = generateDynamicRoleplayPrompt(scenario, currentTurn);
}

// Already done: generateDynamicRoleplayPrompt(scenario, currentTurn = 1)
```

### Testing Checklist
- [ ] Turn 1: AI uses heavy scaffolding (full sentence frames)
- [ ] Turn 3: Still heavy scaffolding
- [ ] Turn 4: Medium scaffolding (OR choices, no frames)
- [ ] Turn 7: Still medium scaffolding
- [ ] Turn 8: Light scaffolding (open + hints)
- [ ] Turn 10: Still light, then conversation ends
- [ ] Verify jar progress tracking (if happiness_jar scenario)
- [ ] Verify no question repetition

## Alternative: AI Self-Management (Current State)
**How it works now:**
- AI receives scaffolding instructions with all 3 levels
- AI must count turns from conversation history
- Less precise but simpler implementation

**Pros:**
- No code changes to data flow
- Works immediately
- AI can adapt based on context

**Cons:**
- AI may miscount turns
- Less precise scaffolding transitions
- Harder to debug turn-specific issues

## Recommendation
**Phase 1 (Current):** Use AI self-management for initial testing
**Phase 2 (Next Sprint):** Implement dynamic turn tracking for precision

If scaffolding works well with AI self-management, Phase 2 can be delayed.

## Related Files
- `/Users/binhnguyen/Downloads/Engquest3k/src/modules/ai_tutor/tabs/FreeTalkTab.jsx`
- `/Users/binhnguyen/Downloads/Engquest3k/src/services/ai_tutor/tutorPrompts.js`
- `/Users/binhnguyen/Downloads/Engquest3k/src/services/ai_tutor/freeTalkModes.js`
- `/Users/binhnguyen/Downloads/Engquest3k/src/services/ai_tutor/roleplayPromptBuilder.js`
- `/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks/week_04_real.js`

## Priority
**Medium-High** - Current implementation functional but can be improved.

---
Created: 2026-02-11
Last Updated: 2026-02-11
Status: Documented, awaiting implementation
