/**
 * Week 16 Game Data - Advanced Mode (GameHub)
 * Theme: Sports Commentary - Present Continuous
 */

export const week16GamesAdvanced = {
  vocabulary: [
    'kick', 'throw', 'catch', 'run', 'jump',
    'score', 'team', 'goal', 'energy', 'motion',
    'pass', 'hit', 'cheer'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'kick', 'throw', 'catch', 'run', 'jump',
      'score', 'team', 'goal', 'energy', 'motion',
      'pass', 'hit', 'cheer'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['I am ___ the ball', 'We are ___ together'],
    frames_advanced: ['The players are ___ during the game', 'Athletes are ___ on the field'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'kick': ['kick', 'kicking', 'I am kicking', 'I am kicking the ball toward the goal with force'],
      'throw': ['throw', 'throwing', 'He is throwing', 'He is throwing the ball to his teammate across the field'],
      'catch': ['catch', 'catching', 'She is catching', 'She is catching the ball with both hands skillfully'],
      'run': ['run', 'running', 'They are running', 'They are running very fast across the soccer field'],
      'jump': ['jump', 'jumping', 'The player is jumping', 'The player is jumping high to catch the ball'],
      'score': ['score', 'scoring', 'We are scoring', 'We are scoring a goal and celebrating with the team'],
      'team': ['team', 'our team', 'playing as a team', 'We are playing as a team and supporting each other'],
      'goal': ['goal', 'the goal', 'toward the goal', 'The striker is running toward the goal with the ball'],
      'energy': ['energy', 'full of energy', 'We have energy', 'We have energy and are playing with excitement'],
      'motion': ['motion', 'in motion', 'The ball is in motion', 'The ball is in motion as it flies through the air'],
      'pass': ['pass', 'passing', 'I am passing', 'I am passing the ball quickly to my teammate'],
      'hit': ['hit', 'hitting', 'She is hitting', 'She is hitting the ball hard with the bat'],
      'cheer': ['cheer', 'cheering', 'Fans are cheering', 'Fans are cheering loudly for their favorite team']
    },
    distractor_map: {
      'kick': ['long hair', 'blue eyes', 'happy smile'],
      'throw': ['curly hair', 'tall boy', 'round face'],
      'catch': ['short girl', 'big glasses', 'pretty face'],
      'run': ['black hair', 'small eyes', 'nice smile'],
      'jump': ['straight hair', 'brown eyes', 'cute face']
    },
    frame_map: {
      'kick': ['The player is kicking the ball toward the goal.'],
      'throw': ['He is throwing the ball to his teammate.'],
      'run': ['They are running across the field.']
    },
    sentence_hints_map: {
      'kick': ['The player is kicking the ball hard.', 'She is kicking toward the goal.', 'He is kicking with force.'],
      'throw': ['He is throwing the ball quickly.', 'She is throwing to her teammate.', 'They are throwing the ball high.'],
      'catch': ['She is catching the ball skillfully.', 'He is catching with both hands.', 'The player is catching perfectly.'],
      'run': ['They are running very fast.', 'She is running toward the goal.', 'He is running across the field.'],
      'jump': ['The player is jumping high.', 'She is jumping to catch the ball.', 'He is jumping with energy.'],
      'score': ['We are scoring a goal together.', 'The team is scoring points.', 'He is scoring for the team.'],
      'team': ['Our team is playing well.', 'The team is working together.', 'My team is practicing hard.'],
      'goal': ['The striker is running toward the goal.', 'She is aiming at the goal.', 'He is shooting toward the goal.'],
      'energy': ['We have energy today.', 'The players have full energy.', 'She is playing with energy.'],
      'motion': ['The ball is in motion.', 'Players are in constant motion.', 'Everything is in motion on the field.'],
      'pass': ['I am passing the ball quickly.', 'She is passing to her teammate.', 'They are passing the ball well.'],
      'hit': ['She is hitting the ball hard.', 'He is hitting with the bat.', 'The player is hitting accurately.'],
      'cheer': ['Fans are cheering loudly.', 'The crowd is cheering for their team.', 'We are cheering with excitement.']
    },
    definitions: {
      'kick': 'Hit with foot.',
      'throw': 'Send through air.',
      'catch': 'Grab flying object.',
      'run': 'Move fast on feet.',
      'jump': 'Push off ground.',
      'score': 'Get points.',
      'team': 'Group playing together.',
      'goal': 'Target to score.',
      'energy': 'Power to move.',
      'motion': 'Moving action.',
      'pass': 'Give to teammate.',
      'hit': 'Strike with force.',
      'cheer': 'Shout support.'
    },
    emoji_map: {
      'kick': '⚽',
      'throw': '🤾',
      'catch': '🧤',
      'run': '🏃',
      'jump': '🦘',
      'score': '🎯',
      'team': '👥',
      'goal': '🥅',
      'energy': '⚡',
      'motion': '💨',
      'pass': '🔄',
      'hit': '🏏',
      'cheer': '📣'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a sentence.',
    instructions_advanced: 'Unscramble the words to make a sentence.',
    sentences_easy: [
      { scrambled: ['I', 'am', 'kicking'], answer: 'I am kicking.' },
      { scrambled: ['He', 'is', 'throwing'], answer: 'He is throwing.' },
      { scrambled: ['She', 'is', 'catching'], answer: 'She is catching.' },
      { scrambled: ['We', 'are', 'running'], answer: 'We are running.' },
      { scrambled: ['They', 'are', 'jumping'], answer: 'They are jumping.' },
      { scrambled: ['I', 'am', 'scoring'], answer: 'I am scoring.' },
      { scrambled: ['We', 'are', 'a', 'team'], answer: 'We are a team.' },
      { scrambled: ['I', 'see', 'the', 'goal'], answer: 'I see the goal.' },
      { scrambled: ['I', 'have', 'energy'], answer: 'I have energy.' },
      { scrambled: ['They', 'are', 'cheering'], answer: 'They are cheering.' }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'am', 'kicking', 'the', 'ball', 'hard'], answer: 'I am kicking the ball hard.', base_words: ['i', 'am', 'kicking', 'the', 'ball', 'hard'], time_phrases: ['now', 'right now', 'at this moment'], location_phrases: ['on the field', 'toward the goal', 'with force'] },
      { scrambled: ['He', 'is', 'throwing', 'the', 'ball', 'to', 'his', 'teammate'], answer: 'He is throwing the ball to his teammate.', base_words: ['he', 'is', 'throwing', 'the', 'ball', 'to', 'his', 'teammate'], time_phrases: ['now', 'quickly', 'right now'], location_phrases: ['across the field', 'to his teammate', 'during the game'] },
      { scrambled: ['She', 'is', 'catching', 'the', 'ball', 'skillfully'], answer: 'She is catching the ball skillfully.', base_words: ['she', 'is', 'catching', 'the', 'ball', 'skillfully'], time_phrases: ['now', 'right now', 'at this moment'], location_phrases: ['with both hands', 'in the game', 'perfectly'] },
      { scrambled: ['They', 'are', 'running', 'very', 'fast'], answer: 'They are running very fast.', base_words: ['they', 'are', 'running', 'very', 'fast'], time_phrases: ['now', 'right now', 'at this moment'], location_phrases: ['across the field', 'on the track', 'toward the finish line'] },
      { scrambled: ['The', 'player', 'is', 'jumping', 'high', 'to', 'catch'], answer: 'The player is jumping high to catch.', base_words: ['the', 'player', 'is', 'jumping', 'high', 'to', 'catch'], time_phrases: ['now', 'right now', 'at this moment'], location_phrases: ['in the air', 'during the game', 'to catch the ball'] },
      { scrambled: ['We', 'are', 'scoring', 'a', 'goal', 'together'], answer: 'We are scoring a goal together.', base_words: ['we', 'are', 'scoring', 'a', 'goal', 'together'], time_phrases: ['now', 'right now', 'at this moment'], location_phrases: ['as a team', 'in the game', 'with excitement'] },
      { scrambled: ['Our', 'team', 'is', 'playing', 'very', 'well'], answer: 'Our team is playing very well.', base_words: ['our', 'team', 'is', 'playing', 'very', 'well'], time_phrases: ['today', 'right now', 'in this game'], location_phrases: ['on the field', 'together', 'with energy'] },
      { scrambled: ['The', 'striker', 'is', 'running', 'toward', 'the', 'goal'], answer: 'The striker is running toward the goal.', base_words: ['the', 'striker', 'is', 'running', 'toward', 'the', 'goal'], time_phrases: ['now', 'quickly', 'right now'], location_phrases: ['toward the goal', 'with the ball', 'at full speed'] },
      { scrambled: ['I', 'am', 'passing', 'the', 'ball', 'quickly'], answer: 'I am passing the ball quickly.', base_words: ['i', 'am', 'passing', 'the', 'ball', 'quickly'], time_phrases: ['now', 'right now', 'at this moment'], location_phrases: ['to my teammate', 'during the play', 'across the field'] },
      { scrambled: ['Fans', 'are', 'cheering', 'loudly', 'for', 'their', 'team'], answer: 'Fans are cheering loudly for their team.', base_words: ['fans', 'are', 'cheering', 'loudly', 'for', 'their', 'team'], time_phrases: ['now', 'right now', 'during the game'], location_phrases: ['in the stadium', 'from the stands', 'with excitement'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w16_doing_what',
        task_type: 'find_question',
        topic: 'sports',
        intro: 'I am kicking the ball. Ask me what I am doing.',
        acceptedQuestions: ['What are you doing?', 'Are you kicking?', 'What are you kicking?'],
        answer: 'I am kicking the ball.',
        question_hints: ['What are you doing?', 'Are you kicking?'],
        required_question_words: ['what', 'are'],
        required_keywords: ['doing', 'you'],
        hints: { words: ['what', 'are', 'you', 'doing'], tricky: ['where', 'who'] }
      },
      {
        id: 'w16_playing_where',
        task_type: 'find_question',
        topic: 'sports',
        intro: 'My team is playing on the field. Ask me where my team is playing.',
        acceptedQuestions: ['Where is your team playing?', 'Where are they playing?'],
        answer: 'My team is playing on the field.',
        question_hints: ['Where is your team playing?'],
        required_question_words: ['where'],
        required_keywords: ['playing'],
        hints: { words: ['where', 'is', 'your', 'team', 'playing'], tricky: ['what', 'who'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w16_adv_doing_what',
        task_type: 'find_question',
        topic: 'sports',
        intro: 'The players are running toward the goal. Ask what the players are doing.',
        acceptedQuestions: ['What are the players doing?', 'What are they doing?'],
        answer: 'The players are running toward the goal.',
        question_hints: ['What are the players doing?'],
        required_question_words: ['what', 'are'],
        required_keywords: ['doing', 'players'],
        hints: { words: ['what', 'are', 'the', 'players', 'doing'], tricky: ['where', 'who'] }
      }
    ]
  }
};

export default week16GamesAdvanced;
