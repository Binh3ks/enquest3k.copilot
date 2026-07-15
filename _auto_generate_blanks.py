#!/usr/bin/env python3
"""
AUTO-GENERATE sentence_frames + vocabulary_bank from model_sentence

LOGIC:
1. Parse model_sentence into sentences
2. Identify content words (verbs, nouns, adjectives, adverbs)
3. Create blanks based on scaffolding_stage percentage
4. Generate vocabulary_bank from blanked words
5. Easy mode: single words
6. Advanced mode: phrases (2-4 words)
"""

import re
import json

# Simple POS tagger (content words to blank)
CONTENT_WORDS = {
    # Common verbs
    'verbs': ['walked', 'played', 'watched', 'cooked', 'helped', 'went', 'ate', 'got', 'came', 'saw', 'had', 'made', 'took', 'gave', 'felt', 'was', 'were', 'is', 'are', 'visited', 'returned', 'woke', 'liked', 'loved', 'enjoyed', 'ran', 'swam', 'read', 'wrote', 'drew', 'sang', 'danced', 'jumped', 'climbed', 'rode', 'flew', 'slept', 'studied', 'cleaned', 'finished', 'talked', 'listened', 'started', 'opened', 'looked', 'washed', 'brushed', 'said', 'checked', 'did', 'relaxed', 'laughed'],
    # Skip these words (function words)
    'skip': ['the', 'a', 'an', 'to', 'for', 'in', 'on', 'at', 'with', 'by', 'from', 'of', 'and', 'or', 'but', 'so', 'because', 'if', 'when', 'while', 'before', 'after', 'very', 'really', 'quite', 'my', 'your', 'his', 'her', 'our', 'their', 'I', 'you', 'he', 'she', 'we', 'they', 'it']
}

def is_content_word(word):
    """Check if word should be blanked"""
    w = word.lower().strip('.,!?;:')
    
    # Skip function words
    if w in CONTENT_WORDS['skip']:
        return False
    
    # Skip very short words (likely function words)
    if len(w) <= 2:
        return False
    
    # Content words: verbs, nouns, adjectives, adverbs (3+ chars)
    return True

def parse_sentences(model_sentence):
    """Split model_sentence into individual sentences"""
    # Split by period, exclamation, question mark
    sentences = re.split(r'[.!?]+', model_sentence)
    sentences = [s.strip() for s in sentences if s.strip()]
    return sentences

def generate_blanks_easy(sentence, blank_percentage=0.5):
    """
    Generate blanks for EASY mode (single words)
    blank_percentage: 0.3 (HIGH) to 0.7 (MINIMAL)
    """
    words = sentence.split()
    total_words = len(words)
    
    # Calculate how many blanks needed
    target_blanks = max(1, int(total_words * blank_percentage))
    
    # Find content words
    content_indices = []
    for i, word in enumerate(words):
        if is_content_word(word):
            content_indices.append(i)
    
    # If not enough content words, take what we have
    if len(content_indices) < target_blanks:
        target_blanks = len(content_indices)
    
    # Distribute blanks evenly across sentence
    if target_blanks == 0:
        return sentence, []
    
    step = len(content_indices) // target_blanks
    selected_indices = [content_indices[i * step] for i in range(target_blanks)]
    
    # Create template with blanks
    blanked_words = []
    template_words = []
    for i, word in enumerate(words):
        if i in selected_indices:
            # Remove punctuation for vocabulary
            clean_word = word.strip('.,!?;:')
            blanked_words.append(clean_word)
            # Keep punctuation after blank
            punct = re.search(r'[.,!?;:]+$', word)
            if punct:
                template_words.append('___' + punct.group())
            else:
                template_words.append('___')
        else:
            template_words.append(word)
    
    template = ' '.join(template_words)
    return template, blanked_words

def generate_blanks_advanced(sentence, blank_percentage=0.5):
    """
    Generate blanks for ADVANCED mode (phrases/clauses)
    Blank 2-4 words together
    """
    words = sentence.split()
    total_words = len(words)
    
    # Calculate how many phrase blanks needed
    target_blanks = max(1, int(total_words * blank_percentage / 3))  # Divide by 3 since each blank is ~3 words
    
    # Find content word clusters (phrases)
    phrases = []
    i = 0
    while i < len(words):
        if is_content_word(words[i]):
            # Start a phrase
            phrase_start = i
            phrase_words = [words[i]]
            i += 1
            # Collect next 1-3 words
            while i < len(words) and len(phrase_words) < 4:
                phrase_words.append(words[i])
                i += 1
                # Stop if we hit a major punctuation
                if words[i-1].rstrip('.,!?;:') != words[i-1]:
                    break
            phrases.append((phrase_start, ' '.join(phrase_words)))
        else:
            i += 1
    
    # Select phrases to blank
    if len(phrases) < target_blanks:
        target_blanks = len(phrases)
    
    if target_blanks == 0:
        return sentence, []
    
    step = max(1, len(phrases) // target_blanks)
    selected_phrases = [phrases[i * step] for i in range(target_blanks)]
    
    # Create template (more complex with phrase blanks)
    # For simplicity, just return sentence with fewer blanks
    # In practice, this needs more sophisticated parsing
    
    blanked_phrases = [p[1] for p in selected_phrases]
    # Simplified: return same as easy for now
    return generate_blanks_easy(sentence, blank_percentage * 0.6)  # Fewer blanks for phrases

def generate_week_content(model_sentence, title, scaffolding_stage='low', mode='easy'):
    """
    Generate complete writing.js content
    """
    sentences = parse_sentences(model_sentence)
    
    # Determine blank percentage based on scaffolding_stage
    blank_percentages = {
        'high': 0.3,      # W1-8: 30% blanks (easiest)
        'medium': 0.4,    # W9-18: 40% blanks
        'medium-low': 0.5,  # W19-25: 50% blanks
        'low': 0.6,       # W26-31: 60% blanks
        'minimal': 0.7    # W32+: 70% blanks (hardest)
    }
    
    blank_pct = blank_percentages.get(scaffolding_stage, 0.5)
    
    # Generate templates and collect vocabulary
    sentence_frames = []
    all_blanked_words = []
    
    for sentence in sentences:
        if mode == 'easy':
            template, blanked_words = generate_blanks_easy(sentence, blank_pct)
        else:
            template, blanked_words = generate_blanks_advanced(sentence, blank_pct)
        
        if '___' in template:  # Only add if has blanks
            sentence_frames.append({"template": template})
            all_blanked_words.extend(blanked_words)
    
    # Generate vocabulary bank
    vocabulary = []
    for word in set(all_blanked_words):  # Unique words only
        vocabulary.append({
            "word": word,
            "vi": "",  # TODO: Add translation
            "distractor": False
        })
    
    # Add some distractors (10-15% of total)
    # TODO: Add semantic distractors
    
    return {
        "sentence_frames": sentence_frames,
        "vocabulary": vocabulary,
        "total_sentences": len(sentences),
        "total_blanks": len(all_blanked_words),
        "unique_words": len(vocabulary)
    }

# Test with W21
if __name__ == '__main__':
    model_sentence = "Yesterday was great and happy for me. I walked to school in the morning and talked to my friends in class. I listened to my teacher and played a game at break time. After school, I helped my mom at home. She cooked dinner, and I washed my hands before eating. In the evening, I watched TV, cleaned my desk, and finished my homework. Before sleeping, I looked at the stars and started a new story. It was a wonderful day!"
    
    print("=" * 80)
    print("AUTO-GENERATE BLANKS TEST - W21 Easy")
    print("=" * 80)
    
    result = generate_week_content(model_sentence, "My Yesterday", scaffolding_stage='medium-low', mode='easy')
    
    print(f"\nTotal sentences: {result['total_sentences']}")
    print(f"Total blanks: {result['total_blanks']}")
    print(f"Unique vocabulary: {result['unique_words']}")
    print(f"\nSentence frames:")
    for i, frame in enumerate(result['sentence_frames'], 1):
        print(f"{i}. {frame['template']}")
    
    print(f"\nVocabulary bank ({len(result['vocabulary'])} words):")
    for v in result['vocabulary'][:20]:  # Show first 20
        print(f"  - {v['word']}")
