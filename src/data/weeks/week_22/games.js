/**
 * Week 22 Game Data - Advanced Mode (GameHub)
 * Theme: The Time Detective - Case Interview Vocabulary
 * Grammar: Past Simple Questions with Did
 */

export const week22GamesAdvanced = {
  vocabulary: [
    'detective', 'case', 'notebook', 'interview', 'question',
    'clearly', 'answer', 'suspect', 'report', 'clue'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'detective', 'case', 'notebook', 'interview', 'question',
      'clearly', 'answer', 'suspect', 'report', 'clue'
    ],
    instructions_easy: 'Say the detective word clearly, then add a phrase, then make a full detective sentence.',
    instructions_advanced: 'Use the word in a sentence about the time detective case.',
    step_instructions: {
      1: 'Step 1: say the detective word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence about the detective case.'
    },
    frames_easy: ['Nova is a ___', 'The ___ said'],
    frames_advanced: ['Detective Nova ___ the case', 'The suspect answered ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'detective': ['detective', 'time detective', 'Nova is a detective', 'Detective Nova is the best time detective in the whole agency.'],
      'case': ['case', 'detective case', 'Nova has a case', 'Detective Nova opened a new case and started asking questions about yesterday.'],
      'notebook': ['notebook', 'detective notebook', 'Nova has a notebook', 'Nova wrote every clue clearly in her detective notebook during the interview.'],
      'interview': ['interview', 'case interview', 'Nova started the interview', 'Detective Nova started the interview by asking the suspect one clear question.'],
      'question': ['question', 'clear question', 'Nova asked a question', 'Nova asked the suspect one clear question at a time and wrote every answer.'],
      'clearly': ['clearly', 'answered clearly', 'The suspect answered clearly', 'The suspect answered clearly and gave Nova her first important clue.'],
      'answer': ['answer', 'clear answer', 'The suspect gave an answer', 'Every answer the suspect gave was written in Nova notebook as a new clue.'],
      'suspect': ['suspect', 'main suspect', 'Max is the suspect', 'The suspect answered every question and helped Detective Nova close the case.'],
      'report': ['report', 'case report', 'Nova wrote a report', 'Nova finished her report after the interview and closed the case successfully.'],
      'clue': ['clue', 'important clue', 'Nova found a clue', 'Nova found an important clue in the suspect answer about last night.']
    },
    distractor_map: {
      'detective': ['student', 'teacher', 'doctor'],
      'case': ['diary', 'homework', 'letter'],
      'notebook': ['phone', 'TV remote', 'soccer ball'],
      'interview': ['football game', 'lunch break', 'school exam'],
      'question': ['story', 'picture', 'map']
    },
    frame_map: {
      'detective': ['Nova is a detective who asks questions.'],
      'case': ['Nova opened a new case yesterday.'],
      'clue': ['The suspect gave Nova an important clue.']
    },
    sentence_hints_map: {
      'detective': ['Nova is a detective.', 'She is the time detective.', 'Detective Nova asks questions.'],
      'case': ['Nova opened a case.', 'The case had a clue.', 'She solved the case.'],
      'notebook': ['Nova has a notebook.', 'She wrote in her notebook.', 'The clue was in the notebook.'],
      'interview': ['Nova started the interview.', 'The interview had questions.', 'She finished the interview.'],
      'question': ['Nova asked a question.', 'The question was clear.', 'She asked the first question.'],
      'clearly': ['The suspect answered clearly.', 'Nova spoke clearly.', 'He answered clearly.'],
      'answer': ['The suspect gave an answer.', 'The answer was a clue.', 'Nova wrote the answer.'],
      'suspect': ['Max is the suspect.', 'The suspect answered.', 'Nova interviewed the suspect.'],
      'report': ['Nova wrote a report.', 'The report had clues.', 'She finished the report.'],
      'clue': ['Nova found a clue.', 'The clue was in the notebook.', 'Each answer was a clue.']
    }
  },

  make_sentence: {
    instructions_easy: 'Unscramble the words to make a detective sentence.',
    instructions_advanced: 'Unscramble the words to make a detective case sentence.',
    sentences_easy: [
      { scrambled: ['Nova', 'has', 'a', 'notebook'], answer: 'Nova has a notebook.' },
      { scrambled: ['The', 'suspect', 'answered', 'clearly'], answer: 'The suspect answered clearly.' },
      { scrambled: ['Nova', 'opened', 'her', 'notebook'], answer: 'Nova opened her notebook.' },
      { scrambled: ['She', 'asked', 'a', 'question'], answer: 'She asked a question.' },
      { scrambled: ['Nova', 'found', 'a', 'clue'], answer: 'Nova found a clue.' },
      { scrambled: ['The', 'detective', 'wrote', 'a', 'report'], answer: 'The detective wrote a report.' },
      { scrambled: ['Nova', 'started', 'the', 'interview'], answer: 'Nova started the interview.' },
      { scrambled: ['The', 'suspect', 'gave', 'an', 'answer'], answer: 'The suspect gave an answer.' },
      { scrambled: ['Nova', 'solved', 'the', 'case'], answer: 'Nova solved the case.' },
      { scrambled: ['The', 'detective', 'asked', 'a', 'question'], answer: 'The detective asked a question.' }
    ],
    sentences_advanced: [
      { scrambled: ['Nova', 'opened', 'her', 'notebook', 'and', 'started', 'the', 'interview'], answer: 'Nova opened her notebook and started the interview.', base_words: ['nova', 'opened', 'her', 'notebook', 'and', 'started', 'the', 'interview'], time_phrases: ['yesterday', 'last night', 'this morning'], location_phrases: ['in the agency', 'at the office', 'in the room'] },
      { scrambled: ['The', 'suspect', 'answered', 'every', 'question', 'clearly'], answer: 'The suspect answered every question clearly.', base_words: ['the', 'suspect', 'answered', 'every', 'question', 'clearly'], time_phrases: ['yesterday', 'last night', 'during the interview'], location_phrases: ['in the interview room', 'at the agency', 'clearly and slowly'] },
      { scrambled: ['Detective', 'Nova', 'found', 'an', 'important', 'clue', 'in', 'the', 'case'], answer: 'Detective Nova found an important clue in the case.', base_words: ['detective', 'nova', 'found', 'an', 'important', 'clue', 'in', 'the', 'case'], time_phrases: ['yesterday', 'last week', 'after the interview'], location_phrases: ['in the case file', 'in the notebook', 'in the report'] },
      { scrambled: ['Nova', 'wrote', 'every', 'answer', 'in', 'her', 'notebook', 'as', 'a', 'clue'], answer: 'Nova wrote every answer in her notebook as a clue.', base_words: ['nova', 'wrote', 'every', 'answer', 'in', 'her', 'notebook', 'as', 'a', 'clue'], time_phrases: ['during the interview', 'yesterday', 'last night'], location_phrases: ['in her notebook', 'in the case file', 'on the report'] },
      { scrambled: ['The', 'suspect', 'gave', 'a', 'clear', 'answer', 'to', 'each', 'question'], answer: 'The suspect gave a clear answer to each question.', base_words: ['the', 'suspect', 'gave', 'a', 'clear', 'answer', 'to', 'each', 'question'], time_phrases: ['during the interview', 'yesterday', 'last night'], location_phrases: ['in the interview', 'to the detective', 'clearly and slowly'] },
      { scrambled: ['Nova', 'finished', 'her', 'report', 'and', 'closed', 'the', 'case'], answer: 'Nova finished her report and closed the case.', base_words: ['nova', 'finished', 'her', 'report', 'and', 'closed', 'the', 'case'], time_phrases: ['yesterday', 'last night', 'after the interview'], location_phrases: ['at the agency', 'in her office', 'successfully'] },
      { scrambled: ['Detective', 'Nova', 'asked', 'the', 'suspect', 'about', 'yesterday'], answer: 'Detective Nova asked the suspect about yesterday.', base_words: ['detective', 'nova', 'asked', 'the', 'suspect', 'about', 'yesterday'], time_phrases: ['yesterday', 'last week', 'in the morning'], location_phrases: ['in the interview room', 'at the agency', 'carefully'] },
      { scrambled: ['The', 'interview', 'helped', 'Nova', 'find', 'every', 'clue'], answer: 'The interview helped Nova find every clue.', base_words: ['the', 'interview', 'helped', 'nova', 'find', 'every', 'clue'], time_phrases: ['yesterday', 'last night', 'last week'], location_phrases: ['in the case file', 'about the suspect', 'for the report'] },
      { scrambled: ['Nova', 'wrote', 'a', 'clear', 'report', 'after', 'the', 'interview'], answer: 'Nova wrote a clear report after the interview.', base_words: ['nova', 'wrote', 'a', 'clear', 'report', 'after', 'the', 'interview'], time_phrases: ['after the interview', 'yesterday', 'last night'], location_phrases: ['at the agency', 'in her notebook', 'for the case'] },
      { scrambled: ['The', 'detective', 'asked', 'one', 'clear', 'question', 'at', 'a', 'time'], answer: 'The detective asked one clear question at a time.', base_words: ['the', 'detective', 'asked', 'one', 'clear', 'question', 'at', 'a', 'time'], time_phrases: ['during the interview', 'yesterday', 'last week'], location_phrases: ['at the agency', 'to the suspect', 'carefully'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the detective context.',
    instructions_advanced: 'Ask a detective question that matches the context.',
    contexts_easy: [
      {
        id: 'w22_nova_found_clue',
        task_type: 'find_question',
        topic: 'detective case',
        intro: 'Nova found a clue in the notebook. Ask what she found.',
        acceptedQuestions: ['What did Nova find?', 'Did Nova find a clue?', 'What did the detective find?'],
        answer: 'Nova found a clue in the notebook.',
        question_hints: ['What did Nova find?', 'Did Nova find a clue?'],
        required_question_words: ['did', 'what'],
        required_keywords: ['find', 'clue'],
        hints: { words: ['what', 'did', 'nova', 'find', 'clue'], tricky: ['where', 'when'] }
      },
      {
        id: 'w22_suspect_answered',
        task_type: 'find_question',
        topic: 'detective interview',
        intro: 'The suspect answered clearly. Ask how the suspect answered.',
        acceptedQuestions: ['Did the suspect answer clearly?', 'How did the suspect answer?', 'Did the suspect answer?'],
        answer: 'The suspect answered clearly.',
        question_hints: ['Did the suspect answer clearly?', 'How did the suspect answer?'],
        required_question_words: ['did', 'how'],
        required_keywords: ['suspect', 'answer'],
        hints: { words: ['did', 'the', 'suspect', 'answer', 'clearly'], tricky: ['what', 'who'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w22_adv_interview',
        task_type: 'find_question',
        topic: 'detective case interview',
        intro: 'Detective Nova asked the suspect about yesterday morning. Ask what Nova asked about.',
        acceptedQuestions: ['What did Detective Nova ask about?', 'What did Nova ask the suspect?', 'Did Nova ask about yesterday?'],
        answer: 'Detective Nova asked the suspect about yesterday morning.',
        question_hints: ['What did Detective Nova ask about?', 'Did Nova ask about yesterday?'],
        required_question_words: ['what', 'did'],
        required_keywords: ['ask', 'yesterday'],
        hints: { words: ['what', 'did', 'detective', 'nova', 'ask', 'about'], tricky: ['where', 'when'] }
      }
    ]
  }
};

export default week22GamesAdvanced;
