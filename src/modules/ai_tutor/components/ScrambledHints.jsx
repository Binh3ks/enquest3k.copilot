import { useState, useEffect } from 'react';
import { Shuffle } from 'lucide-react';

const ScrambledHints = ({ currentQuestion, targetVocab = [], show = false }) => {
  const [shuffledHints, setShuffledHints] = useState([]);

  const generateScrambledHints = () => {
    if (!currentQuestion) return [];

    const hints = [];
    
    const answerPatterns = {
      "what is your name": ["my", "name", "is", "Alex"],
      "how old are you": ["I", "am", "seven", "years", "old"],
      "are you a student": ["yes", "I", "am", "a", "student"],
      "what do you have": ["I", "have", "a", "backpack"],
      "what color": ["it", "is", "blue", "and", "red"],
      "do you have a book": ["yes", "I", "have", "a", "book"],
      "what is your teacher like": ["my", "teacher", "is", "kind"],
      "do you like your school": ["yes", "I", "like", "my", "school"],
      "what does your classroom look like": ["my", "classroom", "is", "big"]
    };

    const question = currentQuestion.toLowerCase();
    let bestMatch = null;
    
    for (const [pattern, words] of Object.entries(answerPatterns)) {
      if (question.includes(pattern.split(' ')[0]) && question.includes(pattern.split(' ')[pattern.split(' ').length - 1])) {
        bestMatch = words;
        break;
      }
    }

    if (!bestMatch) {
      if (targetVocab.length > 0) {
        bestMatch = ["I", "am", "a", targetVocab[0]];
      } else {
        bestMatch = ["Hello", "I", "am", "Alex"];
      }
    }

    if (bestMatch) {
      const scrambled = [...bestMatch].sort(() => Math.random() - 0.5);
      hints.push({
        id: 1,
        scrambled,
        correct: bestMatch
      });
    }

    return hints;
  };

  useEffect(() => {
    const hints = generateScrambledHints();
    setShuffledHints(hints);
  }, [currentQuestion, targetVocab]);

  const handleWordClick = (hintId, wordIndex) => {
    console.log('Word clicked:', hintId, wordIndex);
  };

  if (!show || shuffledHints.length === 0) return null;

  return (
    <div className="px-6 py-3 bg-green-50 border-t border-green-200">
      <div className="flex items-center space-x-2 mb-3">
        <Shuffle size={16} className="text-green-600" />
        <span className="text-base font-medium text-green-700">Arrange these words to answer:</span>
      </div>
      
      {shuffledHints.map(hint => (
        <div key={hint.id} className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {hint.scrambled.map((word, index) => (
              <button
                key={`${word}-${index}`}
                onClick={() => handleWordClick(hint.id, index)}
                className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg text-base font-medium transition-colors border border-green-300 hover:border-green-400"
              >
                {word}
              </button>
            ))}
          </div>
          
          <div className="text-sm text-green-600 mt-2">
            Hint: Arrange to make "{hint.correct.join(' ')}"
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScrambledHints;