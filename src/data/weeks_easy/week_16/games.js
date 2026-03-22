/**
 * Week 16 Game Data - Easy Mode (GameHub)
 * Theme: Sports Commentary - Present Continuous
 * Tier 1 Vocabulary - Simple, Personal Context
 */

export const week16GamesEasy = {
  vocabulary: [
    'kick', 'throw', 'catch', 'run', 'jump',
    'score', 'team', 'goal', 'energy', 'cheer'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'kick', 'throw', 'catch', 'run', 'jump',
      'score', 'team', 'goal', 'energy', 'cheer'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['I am ___ the ball', 'We are ___ together'],
    frames_advanced: ['I am ___ with my friends', 'My team is ___ in the game'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'kick': ['kick', 'kicking', 'I am kicking', 'I am kicking the ball to my friend'],
      'throw': ['throw', 'throwing', 'I am throwing', 'I am throwing the ball to my mom'],
      'catch': ['catch', 'catching', 'I am catching', 'I am catching the ball with my hands'],
      'run': ['run', 'running', 'I am running', 'I am running fast in the sports game'],
      'jump': ['jump', 'jumping', 'I am jumping', 'I am jumping high to catch the ball'],
      'score': ['score', 'scoring', 'We are scoring', 'We are scoring a goal and we are happy'],
      'team': ['team', 'my team', 'playing with my team', 'I am playing with my team on the field'],
      'goal': ['goal', 'the goal', 'kicking to the goal', 'I am kicking the ball to the goal'],
      'energy': ['energy', 'have energy', 'I have energy', 'I have energy to play sports with my friends'],
      'cheer': ['cheer', 'cheering', 'We are cheering', 'We are cheering for our team loudly']
    },
    distractor_map: {
      'kick': ['hair', 'eyes', 'smile'],
      'throw': ['tall', 'short', 'face'],
      'run': ['glasses', 'curly', 'long']
    },
    frame_map: {
      'kick': ['I am kicking the ball.'],
      'throw': ['He is throwing the ball.'],
      'run': ['We are running fast.']
    },
    sentence_hints_map: {
      'kick': ['I am kicking the ball.', 'She is kicking hard.', 'He is kicking the goal.'],
      'throw': ['He is throwing the ball.', 'She is throwing high.', 'I am throwing fast.'],
      'catch': ['She is catching the ball.', 'He is catching well.', 'I am catching it.'],
      'run': ['We are running fast.', 'She is running far.', 'They are running now.'],
      'jump': ['The player is jumping.', 'She is jumping high.', 'He is jumping up.'],
      'score': ['We are scoring!', 'I am scoring a goal.', 'The team is scoring.'],
      'team': ['My team is good.', 'Our team is playing.', 'The team is winning.'],
      'goal': ['I see the goal.', 'The goal is there.', 'He runs to the goal.'],
      'energy': ['I have energy.', 'We have energy.', 'She has energy.'],
      'cheer': ['They are cheering.', 'Fans are cheering.', 'We are cheering.']
    },
    definitions: {
      'kick': 'Hit with foot.',
      'throw': 'Toss in air.',
      'catch': 'Grab it.',
      'run': 'Move fast.',
      'jump': 'Go up.',
      'score': 'Get points.',
      'team': 'Group playing.',
      'goal': 'Place to score.',
      'energy': 'Power.',
      'cheer': 'Yell support.'
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
      'cheer': '📣'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a sentence.',
    instructions_advanced: 'Unscramble the words to make a sentence.',
    sentences_easy: [
      { scrambled: ['I', 'am', 'kicking'], answer: 'I am kicking.' },
      { scrambled: ['I', 'am', 'throwing'], answer: 'I am throwing.' },
      { scrambled: ['I', 'am', 'catching'], answer: 'I am catching.' },
      { scrambled: ['I', 'am', 'running'], answer: 'I am running.' },
      { scrambled: ['I', 'am', 'jumping'], answer: 'I am jumping.' },
      { scrambled: ['We', 'are', 'scoring'], answer: 'We are scoring.' },
      { scrambled: ['I', 'love', 'my', 'team'], answer: 'I love my team.' },
      { scrambled: ['I', 'see', 'the', 'goal'], answer: 'I see the goal.' },
      { scrambled: ['I', 'have', 'energy'], answer: 'I have energy.' },
      { scrambled: ['We', 'are', 'cheering'], answer: 'We are cheering.' }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'am', 'kicking', 'the', 'ball'], answer: 'I am kicking the ball.', base_words: ['i', 'am', 'kicking', 'the', 'ball'], time_phrases: ['now', 'right now'], location_phrases: ['to my friend', 'on the field', 'in the game'] },
      { scrambled: ['I', 'am', 'throwing', 'the', 'ball', 'to', 'mom'], answer: 'I am throwing the ball to mom.', base_words: ['i', 'am', 'throwing', 'the', 'ball', 'to', 'mom'], time_phrases: ['now', 'right now'], location_phrases: ['to mom', 'at home', 'in the park'] },
      { scrambled: ['I', 'am', 'catching', 'the', 'ball'], answer: 'I am catching the ball.', base_words: ['i', 'am', 'catching', 'the', 'ball'], time_phrases: ['now', 'right now'], location_phrases: ['with my hands', 'in the game', 'from my friend'] },
      { scrambled: ['I', 'am', 'running', 'very', 'fast'], answer: 'I am running very fast.', base_words: ['i', 'am', 'running', 'very', 'fast'], time_phrases: ['now', 'right now'], location_phrases: ['in the game', 'on the field', 'with my friends'] },
      { scrambled: ['I', 'am', 'jumping', 'very', 'high'], answer: 'I am jumping very high.', base_words: ['i', 'am', 'jumping', 'very', 'high'], time_phrases: ['now', 'right now'], location_phrases: ['to catch', 'in the game', 'with excitement'] },
      { scrambled: ['We', 'are', 'scoring', 'a', 'goal'], answer: 'We are scoring a goal.', base_words: ['we', 'are', 'scoring', 'a', 'goal'], time_phrases: ['now', 'right now'], location_phrases: ['together', 'in the game', 'and we are happy'] },
      { scrambled: ['My', 'team', 'is', 'playing', 'soccer'], answer: 'My team is playing soccer.', base_words: ['my', 'team', 'is', 'playing', 'soccer'], time_phrases: ['now', 'today'], location_phrases: ['on the field', 'together', 'in the game'] },
      { scrambled: ['I', 'am', 'kicking', 'to', 'the', 'goal'], answer: 'I am kicking to the goal.', base_words: ['i', 'am', 'kicking', 'to', 'the', 'goal'], time_phrases: ['now', 'right now'], location_phrases: ['to the goal', 'in the game', 'with the ball'] },
      { scrambled: ['I', 'have', 'energy', 'to', 'play'], answer: 'I have energy to play.', base_words: ['i', 'have', 'energy', 'to', 'play'], time_phrases: ['now', 'today'], location_phrases: ['to play', 'with my friends', 'in sports'] },
      { scrambled: ['We', 'are', 'cheering', 'for', 'our', 'team'], answer: 'We are cheering for our team.', base_words: ['we', 'are', 'cheering', 'for', 'our', 'team'], time_phrases: ['now', 'right now'], location_phrases: ['for our team', 'loudly', 'together'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w16_easy_doing_what',
        task_type: 'find_question',
        topic: 'sports',
        intro: 'I am kicking the ball. Ask me what I am doing.',
        acceptedQuestions: ['What are you doing?', 'Are you kicking?'],
        answer: 'I am kicking the ball.',
        question_hints: ['What are you doing?'],
        required_question_words: ['what', 'are'],
        required_keywords: ['doing', 'you'],
        hints: { words: ['what', 'are', 'you', 'doing'], tricky: ['where', 'who'] }
      },
      {
        id: 'w16_easy_who_playing',
        task_type: 'find_question',
        topic: 'sports',
        intro: 'My friends are playing with me. Ask who is playing with me.',
        acceptedQuestions: ['Who is playing with you?', 'Who is playing?'],
        answer: 'My friends are playing with me.',
        question_hints: ['Who is playing with you?'],
        required_question_words: ['who'],
        required_keywords: ['playing'],
        hints: { words: ['who', 'is', 'playing', 'with', 'you'], tricky: ['what', 'where'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w16_easy_adv_doing_what',
        task_type: 'find_question',
        topic: 'sports',
        intro: 'I am running in the game. Ask what I am doing.',
        acceptedQuestions: ['What are you doing?', 'What are you doing in the game?'],
        answer: 'I am running in the game.',
        question_hints: ['What are you doing?'],
        required_question_words: ['what', 'are'],
        required_keywords: ['doing', 'you'],
        hints: { words: ['what', 'are', 'you', 'doing'], tricky: ['where', 'who'] }
      }
    ]
  }
};

export default week16GamesEasy;
