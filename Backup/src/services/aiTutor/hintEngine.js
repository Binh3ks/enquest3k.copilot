/**
 * HINT ENGINE - Scene-Aware Contextual Hints
 * Generates hints based on current conversation context, not random vocab
 */

/**
 * Derive intent from teacher prompt
 */
export function deriveIntent(teacherPrompt) {
  const prompt = teacherPrompt.toLowerCase();
  
  // Check for specific patterns
  if (prompt.includes('what is your name') || prompt.includes("what's your name")) {
    return 'answer_name';
  }
  
  if (prompt.includes('are you a student') || prompt.includes('are you')) {
    return 'confirm_identity';
  }
  
  if (prompt.includes('where is') || prompt.includes('where are')) {
    // Determine if student asks or answers
    if (prompt.includes('your')) {
      return 'state_location';  // Teacher asks, student answers
    } else {
      return 'ask_location';  // Student asks
    }
  }
  
  if (prompt.includes('cannot find') || prompt.includes("can't find") || prompt.includes('lost')) {
    return 'state_cannot_find';
  }
  
  if (prompt.includes('what is in') || prompt.includes('what do you have')) {
    return 'state_contents';
  }
  
  if (prompt.includes('help')) {
    return 'request_help';
  }
  
  // Default: general response
  return 'general_response';
}

/**
 * Get scene state for mission beat
 */
export function getSceneState(mission, beatId) {
  const beat = mission.beats?.find(b => b.beatId === beatId) || mission.beats?.[0];
  
  // Determine scene from mission
  let scene = 'school';
  let allowedLocations = ['school', 'classroom'];
  
  if (mission.id.includes('LIBRARY')) {
    scene = 'library';
    allowedLocations = ['library', 'desk', 'bag', 'backpack', 'table'];
  } else if (mission.id.includes('BACKPACK')) {
    scene = 'classroom';
    allowedLocations = ['classroom', 'library', 'desk', 'bag'];
  }
  
  return {
    missionId: mission.id,
    turnIndex: beatId,
    scene,
    requiredObjects: beat?.requiredVocab || [],
    optionalObjects: mission.targetVocabulary?.filter(v => !v.mustUse).map(v => v.word) || [],
    allowedLocations
  };
}

/**
 * Build hint pack based on intent and scene
 */
export function buildHintPack(intent, sceneState, context) {
  const { requiredObjects, allowedLocations } = sceneState;
  
  switch (intent) {
    case 'answer_name':
      return {
        intent,
        targetPatternId: 'name_statement',
        chips: ['My', 'name', 'is', context.learnerName || 'Alex'],
        starter: 'My name is ___',
        model: `My name is ${context.learnerName || 'Alex'}.`
      };
      
    case 'confirm_identity':
      return {
        intent,
        targetPatternId: 'yes_identity',
        chips: ['Yes', 'I', 'am', 'a', 'student'],
        starter: 'Yes, I am a ___',
        model: 'Yes, I am a student.'
      };
      
    case 'state_cannot_find': {
      const object = requiredObjects[0] || 'backpack';
      return {
        intent,
        targetPatternId: 'cannot_find',
        chips: ['I', 'cannot', 'find', 'my', object],
        starter: 'I cannot find my ___',
        model: `I cannot find my ${object}.`
      };
    }
      
    case 'state_location': {
      const item = requiredObjects[0] || 'book';
      const location = allowedLocations[0] || 'library';
      return {
        intent,
        targetPatternId: 'item_location',
        chips: ['My', item, 'is', 'in', 'my', location],
        starter: 'My ___ is in ___',
        model: `My ${item} is in my ${location}.`
      };
    }
      
    case 'ask_location': {
      const searchItem = requiredObjects[0] || 'backpack';
      return {
        intent,
        targetPatternId: 'where_question',
        chips: ['Where', 'is', 'my', searchItem],
        starter: 'Where is my ___?',
        model: `Where is my ${searchItem}?`
      };
    }
      
    case 'state_contents': {
      const items = requiredObjects.slice(0, 2) || ['book', 'notebook'];
      return {
        intent,
        targetPatternId: 'have_items',
        chips: ['My', ...items, 'are', 'in'],
        starter: 'My ___ and ___ are in ___',
        model: `My ${items.join(' and ')} are in my backpack.`
      };
    }
      
    case 'request_help':
      return {
        intent,
        targetPatternId: 'request_help',
        chips: ['Can', 'you', 'help', 'me'],
        starter: 'Can you help me?',
        model: 'Can you help me?'
      };
      
    default: {
      // General response - use first required vocab
      const word = requiredObjects[0] || 'student';
      return {
        intent: 'general_response',
        targetPatternId: 'general',
        chips: ['I', 'am', 'a', word],
        starter: 'I am ___',
        model: `I am a ${word}.`
      };
    }
  }
}

/**
 * Validate hint pack against scene (guard)
 */
export function hintContextGuard(hintPack, sceneState) {
  const violations = [];
  
  // Check required objects appear in chips
  for (const obj of sceneState.requiredObjects) {
    if (!hintPack.chips.some(chip => chip.toLowerCase() === obj.toLowerCase())) {
      violations.push({
        type: 'OBJECT_MISMATCH',
        message: `Required object "${obj}" not in hints`
      });
    }
  }
  
  // Check locations are in allowed list
  const locationWords = ['library', 'classroom', 'desk', 'bag', 'backpack', 'table'];
  const chipLocations = hintPack.chips.filter(chip => 
    locationWords.includes(chip.toLowerCase())
  );
  
  for (const loc of chipLocations) {
    if (!sceneState.allowedLocations.includes(loc.toLowerCase())) {
      violations.push({
        type: 'SCENE_MISMATCH',
        message: `Location "${loc}" not allowed in scene "${sceneState.scene}"`
      });
    }
  }
  
  return {
    ok: violations.length === 0,
    violations
  };
}

/**
 * Get contextual hints for current beat
 * Main entry point
 */
export function getHints(mission, beat, context) {
  // 1. Get scene state
  const sceneState = getSceneState(mission, beat.beatId);
  
  // 2. Derive intent from teacher prompt
  const intent = deriveIntent(beat.aiPrompt);
  
  // 3. Build hint pack
  const hintPack = buildHintPack(intent, sceneState, context);
  
  // 4. Validate
  const validation = hintContextGuard(hintPack, sceneState);
  
  if (!validation.ok) {
    console.warn('[HintEngine] Validation failed:', validation.violations);
    // Use fallback hints from beat definition
    return beat.hints || [];
  }
  
  // 5. Return chips
  return hintPack.chips;
}
