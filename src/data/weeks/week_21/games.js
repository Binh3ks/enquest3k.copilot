/**
 * Week 21 Game Data - Advanced Mode (GameHub)
 * Theme: Time Detective Agency - Yesterday's Diary
 * Grammar: Past Simple Regular Verbs (-ed)
 */

export const week21GamesAdvanced = {
 vocabulary: [
 'walked', 'looked', 'cooked', 'played', 'watched',
 'cleaned', 'helped', 'talked', 'listened', 'opened'
 ],
 show_tell: {
 steps: 3,
 word_list: [
 'walked', 'looked', 'cooked', 'played', 'watched',
 'cleaned', 'helped', 'talked', 'listened', 'opened'
 ],
 instructions_easy: 'Say the past verb clearly, then add who did it, then make a full sentence.',
 instructions_advanced: 'Use the past verb in a sentence about yesterday.',
 step_instructions: {
 1: 'Step 1: say the past verb clearly.',
 2: 'Step 2: add who did the action.',
 3: 'Step 3: make a full past tense sentence.'
 },
 frames_easy: ['Yesterday I ___', 'She ___ last night'],
 frames_advanced: ['Yesterday I ___ to school', 'After school I ___'],
 details_easy: [],
 details_advanced: [],
 detail_map: {
 'walked': ['walked', 'walked to school', 'I walked', 'Yesterday I walked to school with my friend.'],
 'looked': ['looked', 'looked at', 'I looked', 'Last night I looked at the bright stars in the sky.'],
 'cooked': ['cooked', 'cooked dinner', 'Mom cooked', 'My mom cooked rice and vegetables for dinner last night.'],
 'played': ['played', 'played soccer', 'I played', 'I played soccer with my classmates at break time.'],
 'watched': ['watched', 'watched TV', 'I watched', 'I watched my favorite TV show for thirty minutes.'],
 'cleaned': ['cleaned', 'cleaned room', 'I cleaned', 'I cleaned my room after school and organized my desk.'],
 'helped': ['helped', 'helped mom', 'I helped', 'I helped my mother set the table before dinner.'],
 'talked': ['talked', 'talked to', 'We talked', 'We talked about our homework on the way to school.'],
 'listened': ['listened', 'listened carefully', 'I listened', 'I listened to the teacher and wrote notes in my book.'],
 'opened': ['opened', 'opened the door', 'I opened', 'I opened the door and welcomed my grandmother inside.']
 },
 distractor_map: {
 'walked': ['ran quickly', 'took the bus', 'drove a car'],
 'looked': ['closed eyes', 'turned away', 'slept'],
 'cooked': ['ordered food', 'bought snacks', 'ate out'],
 'played': ['sat quietly', 'slept at school', 'read a book'],
 'watched': ['turned off TV', 'closed laptop', 'went to sleep']
 },
 frame_map: {
 'walked': ['I walked to school yesterday.'],
 'cooked': ['Mom cooked dinner last night.'],
 'played': ['I played soccer at break time.']
 },
 sentence_hints_map: {
 'walked': ['I walked to school.', 'She walked home.', 'We walked together.'],
 'looked': ['I looked at the stars.', 'He looked out the window.', 'She looked at her book.'],
 'cooked': ['Mom cooked dinner.', 'Dad cooked rice.', 'She cooked vegetables.'],
 'played': ['I played soccer.', 'We played outside.', 'He played with his friends.'],
 'watched': ['I watched TV.', 'She watched cartoons.', 'He watched for thirty minutes.'],
 'cleaned': ['I cleaned my room.', 'She cleaned the table.', 'He cleaned the floor.'],
 'helped': ['I helped mom.', 'She helped me.', 'He helped his sister.'],
 'talked': ['We talked about homework.', 'She talked to her friend.', 'I talked on the phone.'],
 'listened': ['I listened carefully.', 'She listened to music.', 'He listened to the teacher.'],
 'opened': ['I opened the door.', 'She opened the window.', 'He opened his notebook.']
 }
 },

 make_sentence: {
 instructions_easy: 'Unscramble the words to make a past tense sentence.',
 instructions_advanced: 'Unscramble the words to make a past tense sentence.',
 sentences_easy: [
 { scrambled: ['I', 'walked', 'to', 'school'], answer: 'I walked to school.' },
 { scrambled: ['She', 'cooked', 'dinner'], answer: 'She cooked dinner.' },
 { scrambled: ['He', 'played', 'soccer'], answer: 'He played soccer.' },
 { scrambled: ['We', 'cleaned', 'the', 'room'], answer: 'We cleaned the room.' },
 { scrambled: ['I', 'watched', 'TV'], answer: 'I watched TV.' },
 { scrambled: ['She', 'helped', 'mom'], answer: 'She helped mom.' },
 { scrambled: ['He', 'talked', 'to', 'me'], answer: 'He talked to me.' },
 { scrambled: ['I', 'listened', 'carefully'], answer: 'I listened carefully.' },
 { scrambled: ['She', 'opened', 'the', 'door'], answer: 'She opened the door.' },
 { scrambled: ['He', 'looked', 'at', 'the', 'stars'], answer: 'He looked at the stars.' }
 ],
 sentences_advanced: [
 { scrambled: ['I', 'walked', 'to', 'school', 'yesterday', 'morning'], answer: 'I walked to school yesterday morning.', base_words: ['i', 'walked', 'to', 'school', 'yesterday', 'morning'], time_phrases: ['yesterday', 'last night', 'this morning'], location_phrases: ['to school', 'with my friend', 'along the road'] },
 { scrambled: ['Mom', 'cooked', 'rice', 'and', 'vegetables', 'last', 'night'], answer: 'Mom cooked rice and vegetables last night.', base_words: ['mom', 'cooked', 'rice', 'and', 'vegetables', 'last', 'night'], time_phrases: ['last night', 'yesterday', 'in the evening'], location_phrases: ['in the kitchen', 'for dinner', 'for the family'] },
 { scrambled: ['I', 'played', 'soccer', 'with', 'my', 'classmates'], answer: 'I played soccer with my classmates.', base_words: ['i', 'played', 'soccer', 'with', 'my', 'classmates'], time_phrases: ['yesterday', 'at break time', 'after school'], location_phrases: ['on the field', 'with my classmates', 'at school'] },
 { scrambled: ['She', 'cleaned', 'her', 'room', 'after', 'school'], answer: 'She cleaned her room after school.', base_words: ['she', 'cleaned', 'her', 'room', 'after', 'school'], time_phrases: ['after school', 'yesterday', 'last evening'], location_phrases: ['her room', 'the whole house', 'the living room'] },
 { scrambled: ['He', 'watched', 'his', 'favorite', 'TV', 'show'], answer: 'He watched his favorite TV show.', base_words: ['he', 'watched', 'his', 'favorite', 'tv', 'show'], time_phrases: ['yesterday', 'last night', 'in the evening'], location_phrases: ['at home', 'in the living room', 'for thirty minutes'] },
 { scrambled: ['I', 'helped', 'my', 'mother', 'set', 'the', 'table'], answer: 'I helped my mother set the table.', base_words: ['i', 'helped', 'my', 'mother', 'set', 'the', 'table'], time_phrases: ['yesterday', 'before dinner', 'last night'], location_phrases: ['in the kitchen', 'at home', 'before dinner'] },
 { scrambled: ['We', 'talked', 'about', 'our', 'homework', 'together'], answer: 'We talked about our homework together.', base_words: ['we', 'talked', 'about', 'our', 'homework', 'together'], time_phrases: ['yesterday', 'after school', 'on the way home'], location_phrases: ['on the way to school', 'in the classroom', 'together'] },
 { scrambled: ['I', 'listened', 'to', 'the', 'teacher', 'carefully'], answer: 'I listened to the teacher carefully.', base_words: ['i', 'listened', 'to', 'the', 'teacher', 'carefully'], time_phrases: ['yesterday', 'in class', 'this morning'], location_phrases: ['in the classroom', 'during the lesson', 'at school'] },
 { scrambled: ['She', 'opened', 'the', 'door', 'and', 'smiled'], answer: 'She opened the door and smiled.', base_words: ['she', 'opened', 'the', 'door', 'and', 'smiled'], time_phrases: ['yesterday', 'last night', 'when I arrived'], location_phrases: ['at the entrance', 'happily', 'for her grandmother'] },
 { scrambled: ['He', 'looked', 'at', 'the', 'bright', 'stars'], answer: 'He looked at the bright stars.', base_words: ['he', 'looked', 'at', 'the', 'bright', 'stars'], time_phrases: ['last night', 'yesterday evening', 'before bed'], location_phrases: ['in the sky', 'from his window', 'outside'] }
 ]
 },
 ask_me: {
 instructions_easy: 'Ask a question that matches the context.',
 instructions_advanced: 'Ask a question that matches the context.',
 contexts_easy: [
 {
 id: 'w21_did_what',
 task_type: 'find_question',
 topic: 'past actions',
 intro: 'I walked to school yesterday. Ask me what I did yesterday.',
 acceptedQuestions: ['What did you do yesterday?', 'Did you walk to school?', 'Where did you walk?'],
 answer: 'I walked to school yesterday.',
 question_hints: ['What did you do yesterday?', 'Did you walk to school?'],
 required_question_words: ['did', 'you'],
 required_keywords: ['yesterday', 'walk'],
 hints: { words: ['what', 'did', 'you', 'do', 'yesterday'], tricky: ['are', 'have'] }
 },
 {
 id: 'w21_who_cooked',
 task_type: 'find_question',
 topic: 'past actions',
 intro: 'Mom cooked dinner last night. Ask who cooked dinner.',
 acceptedQuestions: ['Who cooked dinner?', 'Who cooked last night?', 'Did mom cook dinner?'],
 answer: 'Mom cooked dinner last night.',
 question_hints: ['Who cooked dinner?', 'Did mom cook?'],
 required_question_words: ['who', 'cook'],
 required_keywords: ['dinner', 'cooked'],
 hints: { words: ['who', 'cooked', 'dinner', 'last', 'night'], tricky: ['what', 'where'] }
 }
 ],
 contexts_advanced: [
 {
 id: 'w21_adv_diary',
 task_type: 'find_question',
 topic: 'past actions',
 intro: 'I cleaned my room after school yesterday. Ask what I did after school.',
 acceptedQuestions: ['What did you do after school?', 'What did you do yesterday after school?'],
 answer: 'I cleaned my room after school yesterday.',
 question_hints: ['What did you do after school?'],
 required_question_words: ['what', 'did', 'you'],
 required_keywords: ['after', 'school'],
 hints: { words: ['what', 'did', 'you', 'do', 'after', 'school'], tricky: ['where', 'when'] }
      }
    ]
  }
};

export default week21GamesAdvanced;
