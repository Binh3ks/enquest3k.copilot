/**
 * Week 22 Game Data - Easy Mode (GameHub)
 * Theme: The Time Detective - Case Interview Vocabulary
 * Grammar: Past Simple Questions with Did
 */

export const week22GamesEasy = {
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
    instructions_easy: 'Say the detective word, add a short phrase, then make a simple sentence.',
    instructions_advanced: 'Say the detective word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the detective word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['Nova is a ___', 'The ___ helped'],
    frames_advanced: ['Nova opened the ___ yesterday', 'The suspect answered the ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'detective': ['detective', 'time detective', 'Nova is a detective', 'Nova is a time detective who asks questions.'],
      'case': ['case', 'new case', 'Nova has a case', 'Nova opened a new case today.'],
      'notebook': ['notebook', 'Nova notebook', 'Nova has a notebook', 'Nova wrote every clue in her notebook.'],
      'interview': ['interview', 'case interview', 'Nova started the interview', 'Nova started the interview with one question.'],
      'question': ['question', 'clear question', 'Nova asked a question', 'Nova asked the suspect one clear question.'],
      'clearly': ['clearly', 'answered clearly', 'The suspect answered clearly', 'The suspect answered clearly and Nova smiled.'],
      'answer': ['answer', 'good answer', 'The suspect gave an answer', 'The suspect gave a good answer to each question.'],
      'suspect': ['suspect', 'main suspect', 'Max is the suspect', 'Max is the suspect and Nova asked him many questions.'],
      'report': ['report', 'short report', 'Nova wrote a report', 'Nova wrote a short report at the end of the interview.'],
      'clue': ['clue', 'good clue', 'Nova found a clue', 'Nova found a good clue and wrote it in her notebook.']
    },
    distractor_map: {
      'detective': ['student', 'cook', 'driver'],
      'case': ['game', 'lunch', 'letter'],
      'notebook': ['TV', 'cup', 'shoe']
    },
    frame_map: {
      'detective': ['Nova is a detective.'],
      'case': ['Nova opened a case.'],
      'clue': ['Nova found a clue.']
    },
    sentence_hints_map: {
      'detective': ['Nova is a detective.', 'She is a time detective.', 'The detective asks questions.'],
      'case': ['Nova has a case.', 'She opened the case.', 'The case is solved.'],
      'notebook': ['Nova has a notebook.', 'She wrote in her notebook.', 'The notebook has clues.'],
      'interview': ['Nova started the interview.', 'The interview had questions.', 'She finished the interview.'],
      'question': ['Nova asked a question.', 'It was a clear question.', 'She asked one question.'],
      'clearly': ['The suspect answered clearly.', 'Nova spoke clearly.', 'Say it clearly.'],
      'answer': ['The suspect gave an answer.', 'The answer was good.', 'Nova wrote the answer.'],
      'suspect': ['Max is the suspect.', 'The suspect answered.', 'Nova asked the suspect.'],
      'report': ['Nova wrote a report.', 'The report had clues.', 'She finished the report.'],
      'clue': ['Nova found a clue.', 'The clue helped Nova.', 'Each answer was a clue.']
    },
    definitions: {
      'detective': 'A person who finds answers by asking questions.',
      'case': 'A mystery or problem to solve.',
      'notebook': 'A small book you write notes in.',
      'interview': 'A meeting where someone asks questions.',
      'question': 'Something you ask to get information.',
      'clearly': 'In a way that is easy to understand.',
      'answer': 'What you say when asked a question.',
      'suspect': 'A person the detective wants to ask questions.',
      'report': 'A written record of facts and findings.',
      'clue': 'A fact that helps you find the answer.'
    },
    emoji_map: {
      'detective': '🔍',
      'case': '📁',
      'notebook': '📓',
      'interview': '🎤',
      'question': '❓',
      'clearly': '✅',
      'answer': '💬',
      'suspect': '🕵️',
      'report': '📋',
      'clue': '🔎'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a detective sentence.',
    instructions_advanced: 'Unscramble the words to make a detective sentence.',
    sentences_easy: [
      { scrambled: ['Nova', 'is', 'a', 'detective'], answer: 'Nova is a detective.' },
      { scrambled: ['She', 'has', 'a', 'notebook'], answer: 'She has a notebook.' },
      { scrambled: ['Nova', 'asked', 'a', 'question'], answer: 'Nova asked a question.' },
      { scrambled: ['The', 'suspect', 'gave', 'an', 'answer'], answer: 'The suspect gave an answer.' },
      { scrambled: ['Nova', 'found', 'a', 'clue'], answer: 'Nova found a clue.' },
      { scrambled: ['She', 'wrote', 'a', 'report'], answer: 'She wrote a report.' },
      { scrambled: ['Nova', 'opened', 'her', 'notebook'], answer: 'Nova opened her notebook.' },
      { scrambled: ['The', 'suspect', 'answered', 'clearly'], answer: 'The suspect answered clearly.' },
      { scrambled: ['Nova', 'started', 'the', 'interview'], answer: 'Nova started the interview.' },
      { scrambled: ['She', 'solved', 'the', 'case'], answer: 'She solved the case.' }
    ],
    sentences_advanced: [
      { scrambled: ['Nova', 'opened', 'her', 'notebook', 'yesterday'], answer: 'Nova opened her notebook yesterday.', base_words: ['nova', 'opened', 'her', 'notebook', 'yesterday'], time_phrases: ['yesterday', 'last night'], location_phrases: ['at the agency', 'in her office'] },
      { scrambled: ['The', 'suspect', 'answered', 'clearly'], answer: 'The suspect answered clearly.', base_words: ['the', 'suspect', 'answered', 'clearly'], time_phrases: ['yesterday', 'last night'], location_phrases: ['in the interview', 'to Nova'] },
      { scrambled: ['Nova', 'asked', 'a', 'clear', 'question'], answer: 'Nova asked a clear question.', base_words: ['nova', 'asked', 'a', 'clear', 'question'], time_phrases: ['yesterday', 'last night'], location_phrases: ['in the interview', 'to the suspect'] },
      { scrambled: ['She', 'wrote', 'every', 'clue', 'in', 'her', 'notebook'], answer: 'She wrote every clue in her notebook.', base_words: ['she', 'wrote', 'every', 'clue', 'in', 'her', 'notebook'], time_phrases: ['yesterday', 'during the interview'], location_phrases: ['in her notebook', 'for the case'] },
      { scrambled: ['Nova', 'finished', 'her', 'report', 'last', 'night'], answer: 'Nova finished her report last night.', base_words: ['nova', 'finished', 'her', 'report', 'last', 'night'], time_phrases: ['last night', 'yesterday'], location_phrases: ['at the agency', 'in her office'] },
      { scrambled: ['The', 'detective', 'asked', 'the', 'suspect', 'a', 'question'], answer: 'The detective asked the suspect a question.', base_words: ['the', 'detective', 'asked', 'the', 'suspect', 'a', 'question'], time_phrases: ['yesterday', 'last night'], location_phrases: ['in the interview', 'clearly'] },
      { scrambled: ['Nova', 'recorded', 'every', 'answer', 'as', 'a', 'clue'], answer: 'Nova recorded every answer as a clue.', base_words: ['nova', 'recorded', 'every', 'answer', 'as', 'a', 'clue'], time_phrases: ['yesterday', 'during the interview'], location_phrases: ['in her notebook', 'for the report'] },
      { scrambled: ['The', 'case', 'was', 'solved', 'last', 'week'], answer: 'The case was solved last week.', base_words: ['the', 'case', 'was', 'solved', 'last', 'week'], time_phrases: ['last week', 'yesterday'], location_phrases: ['by Nova', 'at the agency'] },
      { scrambled: ['Nova', 'started', 'the', 'interview', 'yesterday'], answer: 'Nova started the interview yesterday.', base_words: ['nova', 'started', 'the', 'interview', 'yesterday'], time_phrases: ['yesterday', 'last night'], location_phrases: ['at the office', 'with the suspect'] },
      { scrambled: ['The', 'suspect', 'gave', 'Nova', 'a', 'clue'], answer: 'The suspect gave Nova a clue.', base_words: ['the', 'suspect', 'gave', 'nova', 'a', 'clue'], time_phrases: ['yesterday', 'last night'], location_phrases: ['during the interview', 'clearly'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the detective context.',
    instructions_advanced: 'Ask a question that matches the detective context.',
    contexts_easy: [
      {
        id: 'w22_easy_nova_clue',
        task_type: 'find_question',
        topic: 'detective case',
        intro: 'Nova found a clue. Ask what she found.',
        acceptedQuestions: ['What did Nova find?', 'Did Nova find a clue?', 'What did she find?'],
        answer: 'Nova found a clue.',
        question_hints: ['What did Nova find?', 'Did Nova find a clue?'],
        required_question_words: ['what', 'did'],
        required_keywords: ['find', 'clue'],
        hints: { words: ['what', 'did', 'nova', 'find'], tricky: ['where', 'who'] }
      },
      {
        id: 'w22_easy_suspect_answer',
        task_type: 'find_question',
        topic: 'detective interview',
        intro: 'The suspect answered clearly. Ask how the suspect answered.',
        acceptedQuestions: ['How did the suspect answer?', 'Did the suspect answer clearly?'],
        answer: 'The suspect answered clearly.',
        question_hints: ['How did the suspect answer?', 'Did the suspect answer clearly?'],
        required_question_words: ['did', 'how'],
        required_keywords: ['suspect', 'answer'],
        hints: { words: ['did', 'the', 'suspect', 'answer'], tricky: ['what', 'who'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w22_easy_adv_notebook',
        task_type: 'find_question',
        topic: 'detective notebook',
        intro: 'Nova wrote a clue in her notebook. Ask what Nova wrote.',
        acceptedQuestions: ['What did Nova write?', 'Did Nova write a clue?', 'What did she write in her notebook?'],
        answer: 'Nova wrote a clue in her notebook.',
        question_hints: ['What did Nova write?', 'Did Nova write a clue?'],
        required_question_words: ['what', 'did'],
        required_keywords: ['write', 'clue'],
        hints: { words: ['what', 'did', 'nova', 'write'], tricky: ['where', 'who'] }
      }
    ]
  }
};

export default week22GamesEasy;
