import re, os

weeks_dir = os.path.join(os.path.dirname(__file__), 'src/data/weeks')
weeks = ['01','02','03','04','05','06','07']

for w in weeks:
    path = os.path.join(weeks_dir, 'week_' + w + '_real.js')
    with open(path) as f:
        c = f.read()

    print('\n' + '='*55)
    print('WEEK ' + w + ' AUDIT')
    print('='*55)

    gp = re.search(r'grammar_pattern\s*:\s*"([^"]+)"', c)
    print('grammar_pattern: ' + (gp.group(1) if gp else 'MISSING'))

    ge = re.search(r'grammar_examples\s*:\s*\[([^\]]+)\]', c, re.DOTALL)
    ge_count = len(re.findall(r'"[^"]+"', ge.group(1))) if ge else 0
    print('grammar_examples count: ' + str(ge_count))

    tw = re.findall(r'\bword\s*:\s*"[^"]+"', c)
    print('target_vocab word entries: ' + str(len(tw)))

    fk = bool(re.search(r'freetalk_knowledge\s*:', c))
    fk_topics = re.findall(r'topic_key\s*:\s*"[^"]+"', c)
    print('freetalk_knowledge: ' + ('YES' if fk else 'MISSING') + ' (' + str(len(fk_topics)) + ' topics)')

    mcs = re.findall(r'mission_context\s*:\s*`([^`]+)`', c, re.DOTALL)
    for i, mc in enumerate(mcs, 1):
        has_v = 'target vocab' in mc.lower() or 'vocabulary' in mc.lower()
        print('  mission_' + str(i) + ' context_len=' + str(len(mc)) + ' has_vocab=' + str(has_v))

    for key in ['v28_format_notes','word_power','global_vocab','nova_instructions','extended_vocab_reference','story_missions','story_character']:
        flag = key in c
        print(('  [Y] ' if flag else '  [N] ') + key)

    plain_missions = bool(re.search(r'^\s{2}missions\s*:', c, re.MULTILINE))
    print(('  [Y] ' if plain_missions else '  [N] ') + 'missions (plain — inconsistent naming)')

    cb = re.search(r'conversation_cards\s*:\s*\[(.*)\]\s*[,}]', c, re.DOTALL)
    if cb:
        blk = cb.group(1)
        n_cards = len(re.findall(r'id\s*:\s*"', blk))
        n_options = len(re.findall(r'options\s*:\s*\[', blk))
        n_fill = len(re.findall(r'fill_blank\s*:', blk))
        n_accept = len(re.findall(r'accept(?:_words)?\s*:', blk))
        n_compl = len(re.findall(r'completion_message\s*:', blk))
        print('conv_cards: ' + str(n_cards) + ' cards | options=' + str(n_options) + ' fill_blank=' + str(n_fill) + ' accept=' + str(n_accept) + ' completion_msgs=' + str(n_compl))
    else:
        print('conv_cards: MISSING')

print('\n\nFINAL SCORING (higher=better candidate for golden standard):')
print('Criteria: story_missions+story_character+global_vocab+fill_blank diversity+exchange count')
scores = {
    'W01': 'story_missions=Y story_character=N global_vocab=Y word_power=Y nova_instructions=Y fill_blank=4',
    'W02': 'story_missions=N story_character=N global_vocab=N word_power=N fill_blank=2',
    'W03': 'story_missions=N story_character=N global_vocab=N word_power=N fill_blank=6 v28=Y',
    'W04': 'story_missions=Y story_character=Y global_vocab=Y fill_blank=1',
    'W05': 'story_missions=Y story_character=Y global_vocab=Y fill_blank=7',
    'W06': 'story_missions=Y story_character=Y global_vocab=Y fill_blank=1',
    'W07': 'story_missions=Y story_character=Y global_vocab=Y fill_blank=3',
}
for k,v in scores.items():
    print('  ' + k + ': ' + v)
