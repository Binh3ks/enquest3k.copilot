/**
 * TURN MANAGER - Story Mission State Machine
 * 
 * Manages conversation state for Story Missions to ensure:
 * 1. No repeated questions
 * 2. Student name remembered
 * 3. Deterministic step progression
 * 4. Natural conversation flow
 */

import { resetFollowUpTracking } from './utils/responseGuard.js';

/**
 * Canonicalize a question to a consistent key for comparison
 * This prevents asking the same question in different forms
 */
function canonicalizeQuestion(question) {
  if (!question) return '';
  
  let normalized = question.toLowerCase().trim();
  
  // Remove punctuation
  normalized = normalized.replace(/[?.!,]/g, '');
  
  // Normalize common variations
  const patterns = [
    // Name variations
    { pattern: /what(?:'?s| is) your name/, canonical: 'name' },
    { pattern: /(?:tell me )?your name/, canonical: 'name' },
    
    // Age variations
    { pattern: /how old (?:are )?you/, canonical: 'age' },
    { pattern: /what(?:'?s| is) your age/, canonical: 'age' },
    
    // Student status
    { pattern: /are you (?:a )?student/, canonical: 'student' },
    
    // Feelings
    { pattern: /how (?:are|do) you feel/, canonical: 'feeling' },
    { pattern: /are you (?:happy|excited|nervous)/, canonical: 'feeling' },
    
    // Backpack (Mission 2)
    { pattern: /do you have (?:a )?backpack/, canonical: 'has_backpack' },
    { pattern: /what color (?:is )?(?:your )?backpack/, canonical: 'backpack_color' },
    { pattern: /(?:what(?:'?s| is) )?in (?:your )?backpack/, canonical: 'backpack_contents' },
    { pattern: /do you have (?:any )?books/, canonical: 'has_books' },
    { pattern: /do you have (?:a )?notebook/, canonical: 'has_notebook' },
    { pattern: /do you like (?:your )?backpack/, canonical: 'like_backpack' },
    { pattern: /(?:is )?(?:your )?backpack (?:heavy|light)/, canonical: 'backpack_weight' },
    { pattern: /(?:is )?(?:your )?backpack (?:new|old)/, canonical: 'backpack_age' },
    
    // Teacher (Mission 3)
    { pattern: /(?:is )?(?:your )?teacher (?:nice|kind)/, canonical: 'teacher_nice' },
    { pattern: /(?:is )?(?:your )?teacher funny/, canonical: 'teacher_funny' },
    { pattern: /do you like (?:your )?teacher/, canonical: 'like_teacher' },
    { pattern: /what(?:'?s| is) (?:your )?teacher(?:'?s| ) name/, canonical: 'teacher_name' },
    { pattern: /(?:is )?(?:your )?school big/, canonical: 'school_size' },
    { pattern: /do you like (?:your )?school/, canonical: 'like_school' },
    { pattern: /(?:is )?(?:your )?classroom (?:nice|big)/, canonical: 'classroom' },
  ];
  
  for (const { pattern, canonical } of patterns) {
    if (pattern.test(normalized)) {
      return canonical;
    }
  }
  
  // Fallback: return first 5 words as key
  const words = normalized.split(/\s+/).slice(0, 5).join(' ');
  return words || normalized;
}

/**
 * Detect if student message is asking a question
 */
function isStudentQuestion(message) {
  if (!message) return false;
  
  const msg = message.trim().toLowerCase();
  
  // Check for question mark - most reliable indicator
  if (msg.includes('?')) return true;
  
  // 🚨 CRITICAL: Exclude common ANSWER patterns that start with Wh-words
  // "when I win" = answer to "when do you feel excited?"
  // "when I play" = answer
  // "why I like it" = answer
  const answerPatterns = [
    /^when (i|he|she|we|they|my|his|her)/, // "when I win", "when my mom"
    /^why (i|he|she|we|they|my|his|her)/, // "why I like it"
    /^where (i|he|she|we|they|my|his|her)/, // "where I live"
    /^how (i|he|she|we|they|my|his|her)/, // "how I do it"
    /^what (i|he|she|we|they|my|his|her)/, // "what I like"
    /^because/, // "because I like it"
    /^(yes|no|maybe|ok|okay)[,.]?\s/, // One-word + continuation
    /^i (think|feel|like|want|need)/, // Statement starters
  ];
  
  if (answerPatterns.some(pattern => pattern.test(msg))) {
    return false; // It's an answer, not a question
  }
  
  // Check for TRUE question patterns (interrogative structure)
  const questionPatterns = [
    /^(what|where|who|why|which|whose)(\s+is|\s+are|\s+was|\s+were|\s+do|\s+does|\s+did|\s+can|\s+will|\s+would|\s+should)/, // "what is", "why do"
    /^(when|how)\s+(is|are|was|were|do|does|did|can|will|would|should|long|far|many|much|old)/, // "when is", "how long"
    /^(do|does|did|can|could|will|would|should|may|might)\s+you/, // "do you like"
    /^(are|is|was|were|have|has|had)\s+you/, // "are you happy"
    /^(tell|show|explain)\s+me/, // "tell me about"
  ];
  
  return questionPatterns.some(pattern => pattern.test(msg));
}

/**
 * 🎯 MASTER ARTIFACT: Mission-specific deterministic step lists
 * Each mission has its own ordered stepKey sequence with CANONICAL questions
 * 
 * Week 1: School theme (missions 1-3)
 * Week 2: Family theme (missions 1-3) - Detected by mission title
 */
function getMissionSteps(missionId, missionTitle) {
  // 🔥 Detect Week 2 by mission title
  const isWeek2Family = missionTitle && (
    missionTitle.includes('Family') || 
    missionTitle.includes('Mother') || 
    missionTitle.includes('Father') || 
    missionTitle.toLowerCase().includes('team') || 
    missionTitle.includes('Love')
  );
  
  const steps = {
    // === WEEK 1: SCHOOL THEME ===
    1: [ // Mission 1: Self-Introduction (First Day at School) - 12-15 turns
      { key: 'name', question: 'What is your name?', hints: ['My', 'name', 'is', 'I', 'am'] },
      { key: 'age', question: 'How old are you?', hints: ['I', 'am', 'years', 'old', 'eight', 'seven'] },
      { key: 'student', question: 'Are you a student?', hints: ['Yes', 'I', 'am', 'a', 'student', 'No'] },
      { key: 'school_name', question: 'What is your school name?', hints: ['My', 'school', 'is', 'name'] },
      { key: 'feelings', question: 'How do you feel today?', hints: ['I', 'am', 'happy', 'excited', 'nervous'] },
      { key: 'like_school', question: 'Do you like school?', hints: ['Yes', 'I', 'like', 'school', 'No'] },
      { key: 'favorite_thing', question: 'What do you like at school?', hints: ['I', 'like', 'playing', 'learning', 'reading'] },
      { key: 'grade', question: 'What grade are you in?', hints: ['I', 'am', 'in', 'grade', 'one', 'two'] },
      { key: 'friends', question: 'Do you have friends?', hints: ['Yes', 'I', 'have', 'friends', 'many'] },
      { key: 'friend_names', question: 'What are your friends names?', hints: ['My', 'friend', 'is', 'name'] },
      { key: 'play_with_friends', question: 'What do you play with friends?', hints: ['We', 'play', 'games', 'ball', 'together'] },
      { key: 'first_day', question: 'Is this your first day?', hints: ['Yes', 'this', 'is', 'my', 'first', 'day'] },
      { key: 'goodbye', question: null, hints: [] }
    ],
    2: null, // Mission 2: REMOVED hardcoded backpack objectives - now loads from week_05_real.js
    3: [ // Mission 3: Teacher & School - 12-15 turns
      { key: 'teacher_name', question: "What is your teacher's name?", hints: ['My', 'teacher', 'name', 'is', 'Ms', 'Mr'] },
      { key: 'teacher_nice', question: 'Is your teacher nice?', hints: ['Yes', 'my', 'teacher', 'is', 'nice'] },
      { key: 'teacher_kind', question: 'Is your teacher kind?', hints: ['Yes', 'my', 'teacher', 'is', 'kind'] },
      { key: 'teacher_funny', question: 'Is your teacher funny?', hints: ['Yes', 'my', 'teacher', 'is', 'funny'] },
      { key: 'like_teacher', question: 'Do you like your teacher?', hints: ['Yes', 'I', 'like', 'my', 'teacher'] },
      { key: 'favorite_subject', question: 'What is your favorite subject?', hints: ['My', 'favorite', 'is', 'math', 'English', 'art'] },
      { key: 'classroom', question: 'Is your classroom big?', hints: ['Yes', 'my', 'classroom', 'is', 'big', 'No'] },
      { key: 'classmates', question: 'Do you have many classmates?', hints: ['Yes', 'I', 'have', 'many', 'classmates'] },
      { key: 'class_rules', question: 'What do you do in class?', hints: ['I', 'listen', 'read', 'write', 'learn'] },
      { key: 'help_teacher', question: 'Do you help your teacher?', hints: ['Yes', 'I', 'help', 'my', 'teacher'] },
      { key: 'say_thanks', question: 'Do you say thank you to your teacher?', hints: ['Yes', 'I', 'say', 'thank', 'you'] },
      { key: 'happy_school', question: 'Are you happy at school?', hints: ['Yes', 'I', 'am', 'happy', 'at', 'school'] },
      { key: 'goodbye', question: null, hints: [] }
    ],
    
    // === WEEK 2: FAMILY THEME ===
    'family_1': [ // Week 2 Mission 1: Meet the Family Squad (12-15 turns)
      { key: 'family_members', question: 'Who lives in your home?', hints: ['My', 'mother', 'father', 'brother', 'sister'] },
      { key: 'have_mother', question: 'Do you have a mother?', hints: ['Yes', 'I', 'have', 'a', 'mother'] },
      { key: 'tell_mother', question: 'Tell me about your mother', hints: ['My', 'mother', 'is', 'nice', 'kind'] },
      { key: 'mother_do', question: 'What does your mother do?', hints: ['She', 'cooks', 'works', 'helps', 'cleans'] },
      { key: 'have_father', question: 'Do you have a father?', hints: ['Yes', 'I', 'have', 'a', 'father'] },
      { key: 'tell_father', question: 'Tell me about your father', hints: ['My', 'father', 'is', 'strong', 'kind'] },
      { key: 'father_do', question: 'What does your father do?', hints: ['He', 'works', 'plays', 'helps', 'fixes'] },
      { key: 'siblings', question: 'Do you have brothers or sisters?', hints: ['Yes', 'I', 'have', 'a', 'brother', 'sister', 'No'] },
      { key: 'sibling_play', question: 'What do you play together?', hints: ['We', 'play', 'games', 'toys', 'ball'] },
      { key: 'family_size', question: 'How many people are in your family?', hints: ['I', 'have', 'four', 'five', 'people'] },
      { key: 'happy_family', question: 'Is your family happy?', hints: ['Yes', 'my', 'family', 'is', 'happy'] },
      { key: 'love_family', question: 'Do you love your family?', hints: ['Yes', 'I', 'love', 'my', 'family'] },
      { key: 'goodbye', question: null, hints: [] }
    ],
    'family_2': [ // Week 2 Mission 2: My Mother's Day (12-15 turns) - MOTHER FOCUS ONLY
      { key: 'mother_morning', question: 'What does your mother do in the morning?', hints: ['She', 'wakes', 'cooks', 'works', 'cleans'] },
      { key: 'mother_breakfast', question: 'Does your mother cook breakfast?', hints: ['Yes', 'she', 'cooks', 'breakfast', 'eggs', 'rice'] },
      { key: 'mother_busy', question: 'Is your mother busy?', hints: ['Yes', 'she', 'is', 'busy', 'works'] },
      { key: 'mother_work', question: 'Where does your mother work?', hints: ['She', 'works', 'at', 'home', 'office'] },
      { key: 'mother_afternoon', question: 'What does your mother do in the afternoon?', hints: ['She', 'cleans', 'cooks', 'helps', 'rests'] },
      { key: 'mother_helps_you', question: 'Does your mother help you?', hints: ['Yes', 'she', 'helps', 'me', 'with', 'homework'] },
      { key: 'mother_dinner', question: 'Does your mother cook dinner?', hints: ['Yes', 'she', 'cooks', 'dinner', 'rice'] },
      { key: 'mother_evening', question: 'What does your mother do in the evening?', hints: ['She', 'watches', 'TV', 'rests', 'talks'] },
      { key: 'mother_tired', question: 'Is your mother tired?', hints: ['Yes', 'she', 'is', 'tired', 'sometimes'] },
      { key: 'help_mother', question: 'Do you help your mother?', hints: ['Yes', 'I', 'help', 'my', 'mother'] },
      { key: 'mother_happy', question: 'Is your mother happy?', hints: ['Yes', 'she', 'is', 'happy', 'smiles'] },
      { key: 'love_mother', question: 'Do you love your mother?', hints: ['Yes', 'I', 'love', 'my', 'mother'] },
      { key: 'goodbye', question: null, hints: [] }
    ],
    'family_3': [ // Week 2 Mission 3: My Father's Strength (12-15 turns) - FATHER FOCUS ONLY
      { key: 'father_morning', question: 'What does your father do in the morning?', hints: ['He', 'wakes', 'works', 'eats', 'drives'] },
      { key: 'father_work', question: 'Where does your father work?', hints: ['He', 'works', 'at', 'office', 'company'] },
      { key: 'father_strong', question: 'Is your father strong?', hints: ['Yes', 'he', 'is', 'strong', 'very'] },
      { key: 'father_helps', question: 'Does your father help at home?', hints: ['Yes', 'he', 'helps', 'at', 'home'] },
      { key: 'father_fix', question: 'What does your father fix?', hints: ['He', 'fixes', 'toys', 'things', 'doors'] },
      { key: 'father_play', question: 'Does your father play with you?', hints: ['Yes', 'he', 'plays', 'with', 'me'] },
      { key: 'father_game', question: 'What games do you play together?', hints: ['We', 'play', 'ball', 'games', 'toys'] },
      { key: 'father_evening', question: 'What does your father do in the evening?', hints: ['He', 'watches', 'TV', 'rests', 'talks'] },
      { key: 'father_funny', question: 'Is your father funny?', hints: ['Yes', 'he', 'is', 'funny', 'jokes'] },
      { key: 'help_father', question: 'Do you help your father?', hints: ['Yes', 'I', 'help', 'my', 'father'] },
      { key: 'father_proud', question: 'Is your father proud of you?', hints: ['Yes', 'he', 'is', 'proud', 'happy'] },
      { key: 'love_father', question: 'Do you love your father?', hints: ['Yes', 'I', 'love', 'my', 'father'] },
      { key: 'goodbye', question: null, hints: [] }
    ],
    
    // === WEEK 3: APPEARANCE / MIRROR GAME THEME ===
    'mirror_1': [ // Week 3 Mission 1: Looking in the Mirror (12-15 turns)
      { key: 'see_mirror', question: 'What do you see in the mirror?', hints: ['I', 'see', 'me', 'myself', 'my', 'face'] },
      { key: 'am_tall', question: 'Are you tall or short?', hints: ['I', 'am', 'tall', 'short'] },
      { key: 'hair_color', question: 'What color is your hair?', hints: ['My', 'hair', 'is', 'black', 'brown'] },
      { key: 'hair_long', question: 'Is your hair long or short?', hints: ['My', 'hair', 'is', 'long', 'short'] },
      { key: 'have_eyes', question: 'What color are your eyes?', hints: ['My', 'eyes', 'are', 'brown', 'black'] },
      { key: 'have_smile', question: 'Do you have a smile?', hints: ['Yes', 'I', 'have', 'a', 'smile'] },
      { key: 'face_round', question: 'Is your face round?', hints: ['Yes', 'my', 'face', 'is', 'round'] },
      { key: 'like_hair', question: 'Do you like your hair?', hints: ['Yes', 'I', 'like', 'my', 'hair'] },
      { key: 'like_face', question: 'Do you like your face?', hints: ['Yes', 'I', 'like', 'my', 'face'] },
      { key: 'happy_me', question: 'Are you happy with how you look?', hints: ['Yes', 'I', 'am', 'happy'] },
      { key: 'special', question: 'What is special about you?', hints: ['My', 'smile', 'eyes', 'hair', 'face'] },
      { key: 'beautiful', question: 'Are you beautiful?', hints: ['Yes', 'I', 'am', 'beautiful'] },
      { key: 'goodbye', question: null, hints: [] }
    ],
    'mirror_2': [ // Week 3 Mission 2: My Friend Tom (12-15 turns)
      { key: 'friend_name', question: 'What is your friend\'s name?', hints: ['His', 'name', 'is', 'Tom', 'friend'] },
      { key: 'friend_tall', question: 'Is your friend tall or short?', hints: ['He', 'is', 'tall', 'short'] },
      { key: 'friend_hair', question: 'What color is his hair?', hints: ['His', 'hair', 'is', 'black', 'brown'] },
      { key: 'friend_curly', question: 'Is his hair curly or straight?', hints: ['His', 'hair', 'is', 'curly', 'straight'] },
      { key: 'friend_eyes', question: 'What color are his eyes?', hints: ['His', 'eyes', 'are', 'brown', 'black'] },
      { key: 'friend_glasses', question: 'Does he have glasses?', hints: ['Yes', 'he', 'has', 'glasses', 'No'] },
      { key: 'friend_smile', question: 'Does he have a big smile?', hints: ['Yes', 'he', 'has', 'a', 'smile'] },
      { key: 'friend_kind', question: 'Is he kind?', hints: ['Yes', 'he', 'is', 'kind'] },
      { key: 'friend_funny', question: 'Is he funny?', hints: ['Yes', 'he', 'is', 'funny'] },
      { key: 'like_friend', question: 'Do you like your friend?', hints: ['Yes', 'I', 'like', 'my', 'friend'] },
      { key: 'play_together', question: 'Do you play together?', hints: ['Yes', 'we', 'play', 'together'] },
      { key: 'best_friend', question: 'Is he your best friend?', hints: ['Yes', 'he', 'is', 'my', 'best', 'friend'] },
      { key: 'goodbye', question: null, hints: [] }
    ],
    'mirror_3': [ // Week 3 Mission 3: My Family Portraits (12-15 turns)
      { key: 'family_photo', question: 'Do you have a family photo?', hints: ['Yes', 'I', 'have', 'a', 'photo'] },
      { key: 'mother_look', question: 'What does your mother look like?', hints: ['She', 'is', 'tall', 'has', 'hair'] },
      { key: 'mother_hair', question: 'What is your mother\'s hair like?', hints: ['Her', 'hair', 'is', 'long', 'black'] },
      { key: 'father_look', question: 'What does your father look like?', hints: ['He', 'is', 'tall', 'has', 'hair'] },
      { key: 'father_tall', question: 'Is your father tall?', hints: ['Yes', 'he', 'is', 'tall'] },
      { key: 'sibling_look', question: 'What does your brother or sister look like?', hints: ['He', 'She', 'is', 'short', 'tall'] },
      { key: 'sibling_hair', question: 'What is their hair like?', hints: ['His', 'Her', 'hair', 'is', 'curly', 'straight'] },
      { key: 'who_tall', question: 'Who is the tallest in your family?', hints: ['My', 'father', 'mother', 'is', 'tallest'] },
      { key: 'who_short', question: 'Who is the shortest?', hints: ['I', 'am', 'My', 'brother', 'sister'] },
      { key: 'look_like', question: 'Who do you look like?', hints: ['I', 'look', 'like', 'my', 'mother', 'father'] },
      { key: 'family_smile', question: 'Does your family smile?', hints: ['Yes', 'we', 'smile', 'together'] },
      { key: 'love_family', question: 'Do you love your family?', hints: ['Yes', 'I', 'love', 'my', 'family'] },
      { key: 'goodbye', question: null, hints: [] }
    ],
    
    // === WEEK 4: EMOTIONS & LIKES THEME (Happy Jar) ===
    'emotions_1': [ // Week 4 Mission 1: My Happy Feelings (7+ turns - matches week_04_real.js minimum_turns: 7)
      { key: 'feeling_today', question: 'How are you feeling today?', hints: ['I', 'am', 'happy', 'good', 'excited'] },
      { key: 'like_activity', question: 'What do you like to do?', hints: ['I', 'like', 'playing', 'reading', 'drawing'] },
      { key: 'like_playing', question: 'Do you like playing games?', hints: ['Yes', 'I', 'like', 'playing', 'games'] },
      { key: 'like_reading', question: 'Do you like reading books?', hints: ['Yes', 'I', 'like', 'reading', 'books'] },
      { key: 'favorite_activity', question: 'What is your favorite thing to do?', hints: ['My', 'favorite', 'is', 'playing', 'reading'] },
      { key: 'makes_happy', question: 'What makes you happy?', hints: ['Playing', 'reading', 'makes', 'me', 'happy'] },
      { key: 'feel_excited', question: 'When do you feel excited?', hints: ['I', 'feel', 'excited', 'when', 'playing'] },
      { key: 'goodbye', question: null, hints: [] }
    ],
    'emotions_2': [ // Week 4 Mission 2: My Favorite Activities (6+ turns)
      { key: 'favorite_activity', question: 'What is your favorite thing to do?', hints: ['My', 'favorite', 'is', 'playing', 'reading'] },
      { key: 'why_like_it', question: 'Why do you like that?', hints: ['It', 'is', 'fun', 'I', 'enjoy'] },
      { key: 'like_singing', question: 'Do you like singing?', hints: ['Yes', 'I', 'like', 'singing', 'songs'] },
      { key: 'like_dancing', question: 'Do you like dancing?', hints: ['Yes', 'I', 'like', 'dancing', 'music'] },
      { key: 'do_often', question: 'Do you do it often?', hints: ['Yes', 'I', 'do', 'it', 'often'] },
      { key: 'do_together', question: 'Who do you do it with?', hints: ['I', 'do', 'it', 'with', 'friends'] },
      { key: 'goodbye', question: null, hints: [] }
    ],
    'emotions_3': [ // Week 4 Mission 3: What Makes Me Excited (6+ turns)
      { key: 'feel_excited_when', question: 'When do you feel excited?', hints: ['I', 'feel', 'excited', 'when', 'playing'] },
      { key: 'favorite_game', question: 'What is your favorite game?', hints: ['My', 'favorite', 'game', 'is', 'ball'] },
      { key: 'play_where', question: 'Where do you play?', hints: ['I', 'play', 'at', 'home', 'school'] },
      { key: 'play_who', question: 'Who do you play with?', hints: ['I', 'play', 'with', 'friends', 'family'] },
      { key: 'make_me_smile', question: 'What makes you smile?', hints: ['My', 'friends', 'games', 'make', 'me', 'smile'] },
      { key: 'happy_moments', question: 'What are your happy moments?', hints: ['When', 'I', 'play', 'with', 'friends'] },
      { key: 'goodbye', question: null, hints: [] }
    ]
  };
  
  // 🔥 Detect Week 3 by mission title (Mirror Game / Appearance theme)
  const isWeek3Mirror = missionTitle && (
    missionTitle.includes('Mirror') || 
    missionTitle.includes('Tom') || 
    missionTitle.includes('Portraits') || 
    missionTitle.includes('Appearance') ||
    missionTitle.toLowerCase().includes('looking')
  );
  
  // 🔥 Detect Week 4 by mission title (Happy Jar / Emotions theme)
  const isWeek4Emotions = missionTitle && (
    missionTitle.includes('Happy') || 
    missionTitle.includes('Feelings') || 
    missionTitle.includes('Emotions') ||
    missionTitle.includes('Activities') ||
    missionTitle.toLowerCase().includes('jar') ||
    missionTitle.toLowerCase().includes('favorite')
  );
  
  // 🔥 Route to correct steps based on week detection
  if (isWeek4Emotions) {
    const emotionsKey = `emotions_${missionId}`;
    console.log(`🎯 TurnManager: Detected Week 4 Emotions Mission ${missionId} | Using ${emotionsKey} steps`);
    return steps[emotionsKey] || steps['emotions_1'];
  }
  
  if (isWeek3Mirror) {
    const mirrorKey = `mirror_${missionId}`;
    console.log(`🎯 TurnManager: Detected Week 3 Mirror Mission ${missionId} | Using ${mirrorKey} steps`);
    return steps[mirrorKey] || steps['mirror_1'];
  }
  
  if (isWeek2Family) {
    const familyKey = `family_${missionId}`;
    console.log(`🎯 TurnManager: Detected Week 2 Family Mission ${missionId} | Using ${familyKey} steps`);
    return steps[familyKey] || steps['family_1'];
  }
  
  // Default: Week 1 school missions
  // 🔥 Return empty array if steps[missionId] is null (story mode only)
  if (steps[missionId] === null) return [];
  return steps[missionId] || steps[1];
}

/**
 * Turn Manager Class
 * Maintains state for a Story Mission conversation
 */
export class TurnManager {
  constructor(missionId, missionTitle, objectives = null, missionData = null) {
    // 🔥 CRITICAL: Enforce numeric missionId (hard error on NaN/undefined)
    const numericId = Number(missionId);
    if (isNaN(numericId) || numericId === 0) {
      const error = `❌ FATAL: TurnManager missionId must be valid number, got: ${missionId} (type: ${typeof missionId})`;
      console.error(error);
      throw new Error(error);
    }
    
    this.missionId = numericId;
    this.missionTitle = missionTitle;
    this.studentName = null;
    this.turnCount = 0; // 🔥 NEW: Track total turns for hard cap
    this.completedObjectives = []; // 🔥 NEW: Track completed objectives
    
    // 🔥 MINIMUM TURNS ENFORCEMENT (from week_XX_real.js)
    this.minimumTurns = missionData?.minimum_turns || 10; // Default 10 turns minimum (V28 standard)
    this.maximumTurns = missionData?.maximum_turns || 15; // Hard cap at 15 (V28 standard)
    console.log(`🎯 TurnManager: Mission ${numericId} | Min turns: ${this.minimumTurns} | Max turns: ${this.maximumTurns}`);
    
    // Support both old step-based and new objective-based data
    if (objectives && objectives.length > 0) {
      // 🔥 NEW: Objective-driven mode
      this.objectives = objectives;
      this.currentObjectiveIndex = 0;
      this.mode = 'objective';
      console.log('🎯 TurnManager: Objective-driven mode - Mission', numericId);
      console.log('📋 Objectives:', objectives.map(o => o.stepKey || o.id).join(' → '));
    } else {
      // Legacy: Step-based mode
      this.askedStepKeys = [];
      this.lastAskedStepKey = null;
      this.currentStepIndex = 0;
      this.missionSteps = getMissionSteps(numericId, missionTitle);
      this.mode = 'step';
      console.log('🎯 TurnManager: Step-based mode - Mission', numericId, '| Title:', missionTitle);
      console.log('📋 Mission steps:', this.missionSteps.map(s => s.key).join(' → '));
    }
    
    this.conversationHistory = [];
  }
  
  /**
   * Update student name from message
   */
  captureStudentName(message) {
    if (!message) return;
    
    const msg = message.toLowerCase().trim();
    
    // Pattern: "my name is X"
    let match = msg.match(/my name is (\w+)/i);
    if (match) {
      this.studentName = this.capitalize(match[1]);
      return;
    }
    
    // Pattern: "I'm X" or "I am X" (but not "I am happy")
    match = msg.match(/i(?:'m| am) (\w+)/i);
    if (match && !['a', 'the', 'very', 'so', 'happy', 'sad', 'excited', 'student'].includes(match[1].toLowerCase())) {
      this.studentName = this.capitalize(match[1]);
      return;
    }
    
    // Pattern: "call me X"
    match = msg.match(/call me (\w+)/i);
    if (match) {
      this.studentName = this.capitalize(match[1]);
    }
  }
  
  capitalize(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  
  /**
   * Mark a step key as asked
   */
  markStepAsked(stepKey) {
    if (stepKey && stepKey !== 'goodbye' && !this.askedStepKeys.includes(stepKey)) {
      this.askedStepKeys.push(stepKey);
      this.lastAskedStepKey = stepKey;
      console.log('📝 TurnManager: Marked step as asked:', stepKey, '| Total asked:', this.askedStepKeys.length);
    }
  }
  
  /**
   * 🎯 MASTER ARTIFACT: Get canonical question for current stepKey
   * This ensures question text is deterministic and never varies
   */
  getCanonicalQuestion(stepKey) {
    const step = this.missionSteps.find(s => s.key === stepKey);
    return step ? step.question : null;
  }
  
  /**
   * Check if a step has been asked already
   */
  wasStepAsked(stepKey) {
    return this.askedStepKeys.includes(stepKey);
  }
  
  /**
   * Get next mission step (skip already asked)
   * 🔥 LEGACY MODE ONLY - Use getCurrentObjective() for objective mode
   */
  getNextStep() {
    // 🔥 Objective mode doesn't use steps
    if (this.mode === 'objective') {
      return null;
    }
    
    console.log('🔍 TurnManager: Finding next step | currentIndex:', this.currentStepIndex, '| askedStepKeys:', this.askedStepKeys);
    
    // 🔥 CRITICAL: Skip already-asked steps
    for (let i = this.currentStepIndex; i < this.missionSteps.length; i++) {
      const step = this.missionSteps[i];
      
      // Always return goodbye step when reached
      if (step.key === 'goodbye') {
        console.log('🏁 TurnManager: Reached goodbye step');
        return step;
      }
      
      // Skip if already asked
      if (this.askedStepKeys.includes(step.key)) {
        console.log('⏭️ TurnManager: Skipping already-asked step:', step.key, '(index', i, ')');
        continue;
      }
      
      // Found unasked step
      console.log('✅ TurnManager: Next step found:', step.key, '(index', i, ')');
      this.currentStepIndex = i; // Update current index
      return step;
    }
    
    // All steps asked - return closing
    console.log('🏁 TurnManager: All steps asked, returning closing');
    return this.missionSteps[this.missionSteps.length - 1];
  }
  
  /**
   * 🔥 NEW: Determine if student answered or asked a question
   */
  getUserStatus(userMessage) {
    if (!userMessage || userMessage.trim().length === 0) {
      console.log('⚠️ getUserStatus: Empty message → unknown');
      return 'unknown';
    }
    
    if (isStudentQuestion(userMessage)) { // 🔥 Use standalone function, not this.
      console.log('❓ getUserStatus: Detected question → questioned');
      return 'questioned'; // Student asked → Parking mode
    }
    
    console.log('✅ getUserStatus: Normal reply → answered');
    return 'answered'; // Student replied → Move forward
  }

  /**
   * 🔥 NEW: Get current objective (for objective-driven mode)
   */
  getCurrentObjective() {
    if (this.mode !== 'objective') return null;
    return this.objectives[this.currentObjectiveIndex] || null;
  }

  /**
   * 🔥 NEW: Get question variant for current objective
   * Uses seed-based selection for deterministic randomness
   */
  getQuestionVariant() {
    const objective = this.getCurrentObjective();
    if (!objective) return null;
    
    // Check if objective has question_variants
    if (!objective.question_variants || objective.question_variants.length === 0) {
      // Fallback to canonical_question
      return {
        question: objective.canonical_question || "Tell me more.",
        hints: objective.hints || ["I", "am", "my", "is"]
      };
    }
    
    // Generate seed for deterministic selection
    // Use missionId + objectiveKey + attempt number
    const attempt = this.getMissionAttempt();
    const seed = `${this.missionId}_${objective.stepKey || objective.id}_${attempt}`;
    const hash = this.hashSeed(seed);
    const index = hash % objective.question_variants.length;
    
    const selected = objective.question_variants[index];
    console.log(`🎲 Selected variant ${index + 1}/${objective.question_variants.length} for ${objective.stepKey}`);
    
    return selected;
  }

  /**
   * 🔥 NEW: Get ACK variant for current objective
   */
  getAckVariant() {
    const objective = this.getCurrentObjective();
    if (!objective) return "Nice!";
    
    const ackVariants = objective.ack_variants || objective.ack_options || ["Nice!", "Great!", "Wonderful!"];
    
    // Use turnCount for variety within same objective
    const seed = `${this.missionId}_${objective.stepKey || objective.id}_ack_${this.turnCount}`;
    const hash = this.hashSeed(seed);
    const index = hash % ackVariants.length;
    
    return ackVariants[index];
  }

  /**
   * 🔥 NEW: Simple hash function for seed-based selection
   */
  hashSeed(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  /**
   * 🔥 NEW: Get attempt number from localStorage
   */
  getMissionAttempt() {
    try {
      const key = `mission_${this.missionId}_attempt`;
      const attempt = parseInt(localStorage.getItem(key) || '0');
      return attempt;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Process a turn and decide next action
   */
  processTurn(userMessage, isQuestion = false) {
    this.turnCount++; // 🔥 Increment turn counter
    
    console.log('🎯 TurnManager: Processing turn', this.turnCount, '| Student question?', isQuestion);
    
    // Capture student name if present
    if (userMessage) {
      this.captureStudentName(userMessage);
    }
    
    // 🔥 LAW 4: 15-TURN HARD CAP
    if (this.turnCount >= 15) {
      console.log('🚨 Hard cap reached (15 turns) - forcing goodbye');
      if (this.mode === 'objective') {
        this.currentObjectiveIndex = this.objectives.findIndex(o => o.id === 'goodbye' || o.type === 'termination');
        if (this.currentObjectiveIndex === -1) {
          this.currentObjectiveIndex = this.objectives.length - 1;
        }
        return {
          type: 'goodbye',
          objective: this.objectives[this.currentObjectiveIndex],
          studentName: this.studentName,
          userStatus: 'hardcap'
        };
      } else {
        // Legacy mode
        const goodbyeIndex = this.missionSteps.findIndex(s => s.key === 'goodbye');
        this.currentStepIndex = goodbyeIndex >= 0 ? goodbyeIndex : this.missionSteps.length - 1;
        return {
          type: 'goodbye',
          studentName: this.studentName
        };
      }
    }
    
    // 🔥 OBJECTIVE-DRIVEN MODE
    if (this.mode === 'objective') {
      return this.processObjectiveTurn(userMessage, isQuestion);
    }
    
    // Legacy step-based mode
    console.log('🎯 TurnManager: Processing turn (legacy) | Student question?', isQuestion, '| Current index:', this.currentStepIndex);
    // 🔥 FIXED: Do NOT advance index here - let getNextStep() find the next unanswered step
    // The index will update when getNextStep() finds an unasked step
    if (userMessage && userMessage.trim().length > 0 && this.lastAskedStepKey) {
      console.log('👉 TurnManager: Student replied to:', this.lastAskedStepKey);
      // getNextStep() will find the next unasked step automatically
    }
    
    const nextStep = this.getNextStep();
    
    if (isQuestion) {
      // Student asked a question - answer then steer to next step
      console.log('❓ TurnManager: Student question detected, will answer and steer to:', nextStep.key);
      return {
        type: 'answer_and_steer',
        nextStep: nextStep,
        studentName: this.studentName
      };
    }
    
    if (nextStep.key === 'goodbye') {
      console.log('🔚 TurnManager: Goodbye turn');
      return {
        type: 'goodbye',
        studentName: this.studentName
      };
    }
    
    // Normal turn - ask next step
    console.log('💬 TurnManager: Normal turn, asking step:', nextStep.key);
    this.markStepAsked(nextStep.key); // 🔥 Mark BEFORE returning
    
    return {
      type: 'ask_next',
      nextStep: nextStep,
      studentName: this.studentName
    };
  }

  /**
   * 🔥 NEW: Process objective-driven turn
   */
  processObjectiveTurn(userMessage, isQuestion) {
    const userStatus = this.getUserStatus(userMessage);
    const currentObjective = this.getCurrentObjective();
    
    console.log('\n🔥🔥🔥 ===== PROCESSING OBJECTIVE TURN =====');
    console.log('Turn Count:', this.turnCount);
    console.log('User Message:', userMessage);
    console.log('User Status:', userStatus);
    console.log('Current Objective Index:', this.currentObjectiveIndex);
    console.log('Current Objective:', currentObjective?.stepKey || currentObjective?.id);
    console.log('Completed Objectives:', this.completedObjectives);
    console.log('🔥🔥🔥 =====================================\n');
    
    if (!currentObjective) {
      console.log('🚨 No current objective - ending conversation');
      return {
        type: 'goodbye',
        objective: null,
        studentName: this.studentName,
        userStatus: 'no_objective'
      };
    }
    
    const objectiveId = currentObjective.stepKey || currentObjective.id;
    console.log('🎯 Objective Turn:', objectiveId, '| User Status:', userStatus);
    
    // LAW 2: DETERMINISTIC FINISH - Goodbye is goodbye
    if (currentObjective.type === 'termination' || objectiveId === 'goodbye') {
      console.log('🎯 Termination objective reached → DONE');
      return {
        type: 'goodbye',
        objective: currentObjective,
        studentName: this.studentName,
        userStatus
      };
    }
    
    // 🎯 INVITATION OBJECTIVES: Special handling for student questions
    if (currentObjective.type === 'invitation') {
      console.log('💬 Invitation objective detected:', objectiveId);
      
      // Check if student declined or said "no"
      const lowerMessage = userMessage.toLowerCase().trim();
      const declineWords = ['no', 'nope', 'nothing', 'not now', 'no question'];
      const declined = declineWords.some(word => lowerMessage.includes(word));
      
      if (declined || userStatus === 'answered') {
        console.log('✅ Student declined or answered → Advance to next objective');
        this.completedObjectives.push(objectiveId);
        this.currentObjectiveIndex++;
        
        const nextObjective = this.getCurrentObjective();
        console.log('📍 NEXT OBJECTIVE:', nextObjective?.stepKey || nextObjective?.id || 'NONE');
        
        return {
          type: 'next_objective',
          objective: nextObjective,
          studentName: this.studentName,
          userStatus: 'answered',
          wasInvitation: true
        };
      }
      
      if (userStatus === 'questioned') {
        console.log('❓ Student asked question → Answer and advance to next objective');
        this.completedObjectives.push(objectiveId);
        this.currentObjectiveIndex++;
        
        const nextObjective = this.getCurrentObjective();
        console.log('📍 AFTER ANSWERING → NEXT OBJECTIVE:', nextObjective?.stepKey || nextObjective?.id || 'NONE');
        
        return {
          type: 'answer_student_question_and_advance',
          objective: nextObjective,
          studentName: this.studentName,
          studentQuestion: userMessage,
          userStatus: 'questioned',
          wasInvitation: true
        };
      }
    }
    
    // PARKING MODE: Student asked a question (normal objectives)
    if (userStatus === 'questioned') {
      console.log('🎯 Student asked question → Parking mode (stay at objective)', objectiveId);
      return {
        type: 'answer_and_steer',
        objective: currentObjective,
        studentName: this.studentName,
        studentQuestion: userMessage,
        userStatus,
        isParkingMode: true
      };
    }
    
    // ADVANCE: Student answered
    if (userStatus === 'answered') {
      console.log('🎯 Student answered → Mark objective complete:', objectiveId);
      console.log('📊 BEFORE ADVANCE: Index =', this.currentObjectiveIndex, '| Completed =', this.completedObjectives.length);
      
      this.completedObjectives.push(objectiveId);
      this.currentObjectiveIndex++;
      
      console.log('📊 AFTER ADVANCE: Index =', this.currentObjectiveIndex, '| Completed =', this.completedObjectives.length);
      
      let nextObjective = this.getCurrentObjective();
      console.log('📍 NEXT OBJECTIVE:', nextObjective?.stepKey || nextObjective?.id || 'NONE');
      
      // 🔥 INTELLIGENT SKIP: Check if student answer already covers next objective
      // ⚠️ DISABLE for missions with question_variants (Week 4 style) - we want ALL questions asked
      // Check if EITHER current or next objective has question_variants (indicates structured mission)
      const currentHasVariants = currentObjective?.question_variants && currentObjective.question_variants.length > 0;
      const nextHasVariants = nextObjective?.question_variants && nextObjective.question_variants.length > 0;
      const hasQuestionVariants = currentHasVariants || nextHasVariants;
      
      console.log('🔍 Variant check: Current has?', currentHasVariants, '| Next has?', nextHasVariants, '| Skip disabled?', hasQuestionVariants);
      
      if (nextObjective && userMessage && !hasQuestionVariants) {
        const nextQuestion = nextObjective.canonical_question || nextObjective.goal || '';
        const lowerMessage = userMessage.toLowerCase().trim();
        const nextQuestionLower = nextQuestion.toLowerCase();
        
        console.log('🧠 Smart Check: Next question =', `"${nextQuestion}"`, '| Student said =', `"${userMessage}"`);
        
        // Extract key content words from next question (remove question words)
        const questionWords = nextQuestionLower
          .replace(/^(do you|are you|is|what|where|who|how|can|does)\s+/gi, '')
          .replace(/\?/g, '')
          .split(/\s+/)
          .filter(w => w.length > 2 && !['you', 'your', 'the', 'like', 'have'].includes(w));
        
        console.log('🔍 Question keywords:', questionWords);
        
        // Check if student's answer contains key words from next question
        let keywordMatches = 0;
        for (const keyword of questionWords) {
          if (lowerMessage.includes(keyword)) {
            keywordMatches++;
            console.log(`✅ Match found: "${keyword}" in student answer`);
          }
        }
        
        // Semantic overlap detection
        const alreadyAnswered = 
          // SPECIFIC: If next asks "Do you like playing games?" and student said "playing games" or "games"
          (nextQuestionLower.includes('playing') && nextQuestionLower.includes('games') && 
           (lowerMessage.includes('playing') || lowerMessage.includes('games') || lowerMessage.includes('game'))) ||
          
          // SPECIFIC: If next asks "Do you like reading?" and student said "reading" or "read"
          (nextQuestionLower.includes('reading') && (lowerMessage.includes('reading') || lowerMessage.includes('read'))) ||
          
          // GENERIC: If next asks "Do you like X?" and student mentioned X
          (nextQuestionLower.includes('do you like') && keywordMatches > 0) ||
          
          // GENERIC: If student answer contains 50%+ of question keywords
          (questionWords.length > 0 && keywordMatches >= Math.ceil(questionWords.length * 0.5)) ||
          
          // GENERIC: If next asks "What is your Y?" and student mentioned Y
          (nextQuestionLower.includes('what') && 
           nextQuestionLower.includes('favorite') && 
           (lowerMessage.includes('favorite') || lowerMessage.includes('like'))) ||
          
          // GENERIC: Student gave detailed answer that contains target keywords
          (nextObjective.target_keywords?.some(kw => lowerMessage.includes(kw.toLowerCase())) && lowerMessage.split(' ').length > 3);
        
        if (alreadyAnswered) {
          console.log('⚡️ INTELLIGENT SKIP: Student answer already covers next objective!');
          console.log('   → Skipping:', nextObjective.stepKey || nextObjective.id);
          console.log('   → Reason: Semantic overlap detected');
          this.completedObjectives.push(nextObjective.stepKey || nextObjective.id);
          this.currentObjectiveIndex++;
          nextObjective = this.getCurrentObjective();
          console.log('📍 SKIPPED TO:', nextObjective?.stepKey || nextObjective?.id || 'NONE');
        } else {
          console.log('❌ No overlap - will ask next question as planned');
        }
      }
      
      // 🔥 MINIMUM TURNS ENFORCEMENT
      // If we reached goodbye but haven't met minimum turns, extend conversation
      // ⚠️ DISABLE for question_variants missions (Week 4 style) - structured missions don't need extension
      if (nextObjective && (nextObjective.type === 'termination' || nextObjective.stepKey === 'goodbye' || nextObjective.id === 'goodbye')) {
        if (this.turnCount < this.minimumTurns && !hasQuestionVariants) {
          console.log(`⚠️ Minimum turns not met (${this.turnCount}/${this.minimumTurns}) - extending conversation`);
          // Go back one objective and ask a follow-up question
          this.currentObjectiveIndex--;
          const extendObjective = this.getCurrentObjective();
          return {
            type: 'continue',
            objective: extendObjective,
            previousObjective: currentObjective,
            studentName: this.studentName,
            userStatus,
            isExtension: true, // Signal to prompt to ask follow-up/deeper question
            turnsRemaining: this.minimumTurns - this.turnCount
          };
        } else if (hasQuestionVariants) {
          console.log('✅ Question variants mission - skipping minimum turns check, proceeding to goodbye');
        }
      }
      
      if (!nextObjective) {
        console.log('🚨 No next objective - ending conversation');
        return {
          type: 'goodbye',
          objective: null,
          studentName: this.studentName,
          userStatus: 'no_next_objective'
        };
      }
      
      const nextObjectiveId = nextObjective.stepKey || nextObjective.id;
      console.log('🎯 Advanced to next objective:', nextObjectiveId);
      return {
        type: 'next_objective',
        objective: nextObjective,
        previousObjective: currentObjective,
        studentName: this.studentName,
        userStatus
      };
    }
    
    // Fallback - stay at current objective (don't advance)
    console.log('⚠️ Unknown user status:', userStatus, '- STAYING at current objective');
    return {
      type: 'continue',
      objective: currentObjective, // STAY at current, don't advance
      previousObjective: null, // No previous since we didn't advance
      studentName: this.studentName,
      userStatus
    };
  }
  
  /**
   * Get state for debugging
   */
  getState() {
    if (this.mode === 'objective') {
      return {
        mode: 'objective',
        missionId: this.missionId,
        missionTitle: this.missionTitle,
        studentName: this.studentName,
        currentObjectiveIndex: this.currentObjectiveIndex,
        completedObjectives: [...this.completedObjectives],
        totalObjectives: this.objectives.length,
        turnCount: this.turnCount
      };
    }
    
    // Legacy mode
    return {
      mode: 'step',
      missionId: this.missionId,
      missionTitle: this.missionTitle,
      studentName: this.studentName,
      currentStepIndex: this.currentStepIndex,
      askedStepKeys: [...this.askedStepKeys], // 🔥 Array copy
      lastAskedStepKey: this.lastAskedStepKey,
      totalSteps: this.missionSteps.length
    };
  }
  
  /**
   * Get full state for LLM prompt injection
   */
  getFullState() {
    if (this.mode === 'objective') {
      const currentObjective = this.getCurrentObjective();
      return {
        mode: 'objective',
        missionId: this.missionId,
        missionTitle: this.missionTitle,
        studentName: this.studentName,
        currentObjective: currentObjective,
        currentObjectiveIndex: this.currentObjectiveIndex,
        completedObjectives: [...this.completedObjectives],
        totalObjectives: this.objectives.length,
        turnCount: this.turnCount,
        turnsRemaining: 15 - this.turnCount,
        isGoodbye: currentObjective?.type === 'termination' || currentObjective?.id === 'goodbye',
        allObjectives: this.objectives.map(o => ({ id: o.id, goal: o.goal }))
      };
    }
    
    // Legacy mode
    const nextStep = this.getNextStep();
    return {
      mode: 'step',
      missionId: this.missionId,
      missionTitle: this.missionTitle,
      studentName: this.studentName,
      askedStepKeys: [...this.askedStepKeys], // 🔥 Array copy
      currentStepIndex: this.currentStepIndex,
      totalSteps: this.missionSteps.length,
      turnsRemaining: this.missionSteps.length - this.currentStepIndex - 1,
      lastAskedStepKey: this.lastAskedStepKey,
      nextStepKey: nextStep?.key,
      nextStepQuestion: nextStep?.question,
      isGoodbye: nextStep?.key === 'goodbye',
      allSteps: this.missionSteps.map(s => ({ key: s.key, question: s.question }))
    };
  }
}

/**
 * 🔥 ONE BRAIN: Singleton registry (prevents duplicate instances)
 */
const turnManagerRegistry = new Map(); // key: missionId (numeric)

/**
 * Register a TurnManager instance (throws if duplicate)
 */
export function registerTurnManager(turnManager) {
  const id = turnManager.missionId;
  
  if (turnManagerRegistry.has(id)) {
    console.log('♻️ TurnManager: Reusing existing manager for mission', id);
    return turnManagerRegistry.get(id);
  }
  
  turnManagerRegistry.set(id, turnManager);
  console.log('✅ TurnManager: Registered new manager for mission', id);
  return turnManager;
}

/**
 * Get TurnManager by missionId (returns null if not registered)
 */
export function getTurnManager(missionId) {
  const numericId = Number(missionId);
  if (isNaN(numericId)) {
    console.error('❌ getTurnManager: Invalid missionId', missionId);
    return null;
  }
  return turnManagerRegistry.get(numericId) || null;
}

/**
 * Reset TurnManager for a mission
 */
export function resetTurnManager(missionId) {
  const numericId = Number(missionId);
  turnManagerRegistry.delete(numericId);
  
  // 🔥 FIX: Also clear follow-up question tracking
  resetFollowUpTracking(numericId);
  
  console.log('🔄 TurnManager: Reset for mission', numericId);
}

/**
 * Export utilities for use elsewhere
 */
export { canonicalizeQuestion, isStudentQuestion, getMissionSteps };
