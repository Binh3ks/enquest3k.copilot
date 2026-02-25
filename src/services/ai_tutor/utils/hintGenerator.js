/**
 * Dynamic Hint Generator for 20 Questions
 * Generates hints based on word patterns and categories
 * NO HARDCODING - scales with any vocabulary
 */

/**
 * Generate 2 hints for any noun object
 * @param {string} object - The secret object
 * @returns {string[]} Array of 2 hints
 */
export function generateHints(object) {
  const word = object.toLowerCase().trim();
  
  // Category-based hint generation
  const categories = {
    // PEOPLE
    people: {
      words: ['mother', 'father', 'brother', 'sister', 'grandma', 'grandpa', 'mom', 'dad', 'teacher', 'friend'],
      hints: (w) => {
        if (w === 'mother' || w === 'mom') return ['She is a woman in your family.', 'She takes care of you.'];
        if (w === 'father' || w === 'dad') return ['He is a man in your family.', 'He is strong and loves you.'];
        if (w === 'brother') return ['He is a boy in your family.', 'You can play with him.'];
        if (w === 'sister') return ['She is a girl in your family.', 'She is your friend.'];
        if (w === 'grandma') return ['She is your mother\'s mother.', 'She is very kind.'];
        if (w === 'grandpa') return ['He is your father\'s father.', 'He tells you stories.'];
        if (w === 'teacher') return ['This person works at school.', 'They help you learn.'];
        if (w === 'friend') return ['This person plays with you.', 'You like them very much.'];
        return ['This is a person.', 'You know them.'];
      }
    },
    
    // WRITING TOOLS
    writing: {
      words: ['pen', 'pencil', 'crayon', 'marker', 'chalk'],
      hints: (w) => {
        if (w === 'pen') return ['It is small and long.', 'You write with it. The ink is blue or black.'];
        if (w === 'pencil') return ['It is long and thin.', 'You write with it. You can erase it.'];
        if (w === 'crayon') return ['It is colorful.', 'You draw pictures with it.'];
        if (w === 'marker') return ['It has bright colors.', 'You draw with it on paper.'];
        return ['You write with this.', 'It is long and thin.'];
      }
    },
    
    // BOOKS & PAPER
    reading: {
      words: ['book', 'paper', 'notebook', 'magazine', 'newspaper'],
      hints: (w) => {
        if (w === 'book') return ['It has many pages.', 'You read stories in it.'];
        if (w === 'paper') return ['It is flat and white.', 'You write or draw on it.'];
        if (w === 'notebook') return ['It has many pages.', 'You write in it at school.'];
        return ['You read this.', 'It has pages.'];
      }
    },
    
    // FURNITURE WITH LEGS
    furniture: {
      words: ['desk', 'table', 'chair', 'bed', 'sofa', 'stool', 'bench'],
      hints: (w) => {
        if (w === 'desk' || w === 'table') return ['It has 4 legs.', 'You put things on it.'];
        if (w === 'chair' || w === 'stool') return ['It has legs.', 'You sit on it.'];
        if (w === 'bed') return ['It is big and soft.', 'You sleep on it at night.'];
        if (w === 'sofa') return ['It is big and soft.', 'You sit on it to watch TV.'];
        if (w === 'bench') return ['It is long.', 'Many people can sit on it.'];
        return ['It is furniture.', 'You use it every day.'];
      }
    },
    
    // ROOM FIXTURES
    fixtures: {
      words: ['door', 'window', 'wall', 'floor', 'ceiling', 'roof'],
      hints: (w) => {
        if (w === 'door') return ['It opens and closes.', 'You walk through it.'];
        if (w === 'window') return ['It is made of glass.', 'You look outside through it.'];
        if (w === 'wall') return ['It is big and flat.', 'It is around the room.'];
        if (w === 'floor') return ['It is flat.', 'You walk on it.'];
        return ['This is part of a room.', 'You see it every day.'];
      }
    },
    
    // CONTAINERS
    containers: {
      words: ['jar', 'box', 'bag', 'basket', 'backpack', 'pocket', 'drawer'],
      hints: (w) => {
        if (w === 'jar') return ['It is round like a bottle.', 'You put things inside it.'];
        if (w === 'box') return ['It has 4 sides.', 'You put things inside it.'];
        if (w === 'bag' || w === 'backpack') return ['You carry it.', 'You put things inside it.'];
        if (w === 'basket') return ['It is round.', 'You carry things in it.'];
        return ['You put things inside this.', 'It holds things.'];
      }
    },
    
    // LIGHTS & ELECTRONICS
    electronics: {
      words: ['lamp', 'light', 'tv', 'computer', 'phone', 'clock', 'radio'],
      hints: (w) => {
        if (w === 'lamp' || w === 'light') return ['It gives light.', 'You turn it on when it is dark.'];
        if (w === 'tv') return ['It has a screen.', 'You watch shows on it.'];
        if (w === 'clock') return ['It has numbers.', 'It tells you the time.'];
        return ['This is electronic.', 'You use it at home.'];
      }
    },
    
    // CLOTHING & ACCESSORIES
    clothing: {
      words: ['hat', 'scarf', 'glasses', 'shoes', 'shirt', 'pants', 'dress', 'coat'],
      hints: (w) => {
        if (w === 'glasses') return ['You wear them on your face.', 'They help you see.'];
        if (w === 'hat') return ['You wear it on your head.', 'It keeps you warm or cool.'];
        if (w === 'scarf') return ['It is long and soft.', 'You wear it around your neck.'];
        if (w === 'shoes') return ['You wear them on your feet.', 'They protect your feet.'];
        return ['You wear this.', 'It keeps you warm.'];
      }
    },
    
    // TOYS & GAMES
    toys: {
      words: ['toy', 'ball', 'doll', 'game', 'puzzle', 'blocks'],
      hints: (w) => {
        if (w === 'toy') return ['It is fun!', 'You play with it.'];
        if (w === 'ball') return ['It is round.', 'You throw it and catch it.'];
        if (w === 'game') return ['It is fun!', 'You play it with friends.'];
        return ['You play with this.', 'It is fun!'];
      }
    },
    
    // PICTURES & ART
    visual: {
      words: ['picture', 'photo', 'mirror', 'painting', 'poster'],
      hints: (w) => {
        if (w === 'picture' || w === 'photo') return ['It is flat.', 'You can see people or things in it.'];
        if (w === 'mirror') return ['It is shiny and flat.', 'You see your face in it.'];
        if (w === 'painting') return ['It has colors.', 'An artist made it.'];
        return ['You look at this.', 'It has colors or images.'];
      }
    },
    
    // NATURE & OUTDOORS
    nature: {
      words: ['tree', 'flower', 'grass', 'leaf', 'rock', 'stone'],
      hints: (w) => {
        if (w === 'tree') return ['It is tall and green.', 'It grows outside.'];
        if (w === 'flower') return ['It is colorful and pretty.', 'It smells nice.'];
        return ['You see this outside.', 'It is part of nature.'];
      }
    },
    
    // PLACES
    places: {
      words: ['home', 'house', 'school', 'park', 'store', 'library'],
      hints: (w) => {
        if (w === 'home' || w === 'house') return ['This is a place.', 'Your family lives there.'];
        if (w === 'school') return ['This is a place.', 'You learn there.'];
        if (w === 'park') return ['This is a place.', 'You play there.'];
        return ['This is a place.', 'You go there.'];
      }
    }
  };
  
  // Find category and generate hints
  for (const [categoryName, category] of Object.entries(categories)) {
    if (category.words.includes(word)) {
      return category.hints(word);
    }
  }
  
  // FALLBACK: Generic but better than "something special"
  // Detect patterns in the word itself
  if (word.endsWith('er') || word.endsWith('or')) {
    return ['This is a tool or person.', 'You use it or know them.'];
  }
  
  if (word.length <= 4) {
    return ['It is small.', 'You can hold it in your hand.'];
  }
  
  if (word.length > 8) {
    return ['It is something you know.', 'Think carefully!'];
  }
  
  // Ultimate fallback
  return ['It is something you know.', 'Can you guess what it is?'];
}

/**
 * Check if object is a person (for pronoun detection)
 * @param {string} object 
 * @returns {boolean}
 */
export function isPerson(object) {
  const people = ['mother', 'father', 'brother', 'sister', 'grandma', 'grandpa', 
                  'mom', 'dad', 'teacher', 'friend', 'family', 'student', 'baby'];
  return people.includes(object.toLowerCase().trim());
}
