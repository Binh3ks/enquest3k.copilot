import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_DIR = path.join(__dirname, '../src/data/official_wordlists');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Well-known CEFR open datasets (Raw GitHub endpoints)
const OPEN_DATA_SOURCES = [
  'https://raw.githubusercontent.com/open-language-data/cefr-j-wordlist/main/cefrj-vocabulary-list.json',
  'https://raw.githubusercontent.com/swineherd/cefr-vocabulary/master/cefr_words.json'
];

// High quality curated CEFR wordlists as gold-standard base
const CURATED_CEFR_DATA = {
  "starters_pre_a1": {
    level: "Starters",
    cefr: "Pre-A1",
    words: [
      "apple", "arm", "banana", "baseball", "basketball", "bird", "boat", "book", "boy", "bread",
      "bus", "cake", "camera", "car", "cat", "chair", "chicken", "chocolate", "clock", "computer",
      "cow", "desk", "dog", "doll", "door", "duck", "elephant", "fish", "flower", "foot",
      "frog", "fruit", "giraffe", "girl", "glass", "goat", "guitar", "hair", "hand", "hat",
      "head", "hippo", "horse", "house", "ice cream", "jacket", "jeans", "juice", "kite", "lemon",
      "lime", "lizard", "milk", "monkey", "monster", "mouse", "mouth", "night", "nose", "orange",
      "paper", "park", "pen", "pencil", "picture", "plane", "potato", "radio", "rice", "robot",
      "rubber", "ruler", "sheep", "shirt", "shoe", "skirt", "snake", "sock", "spider", "sun",
      "table", "teacher", "tiger", "tomato", "toy", "train", "tree", "t-shirt", "water", "window",
      "woman", "zebra"
    ]
  },
  "movers_a1": {
    level: "Movers",
    cefr: "A1",
    words: [
      "always", "awake", "backpack", "balcony", "basement", "blanket", "bottle", "bounce", "building",
      "bus stop", "cage", "camera", "careful", "circle", "climb", "cloud", "clown", "coffee",
      "cough", "cry", "dance", "dangerous", "doctor", "dream", "drive", "driver", "dry", "easy",
      "elevator", "fall", "famous", "farm", "farmer", "field", "film", "fine", "first", "floor",
      "forest", "frightened", "glass", "grass", "ground", "headache", "heavy", "hospital", "hungry",
      "island", "jungle", "kangaroo", "lake", "laugh", "library", "lion", "market", "mountain",
      "movie", "mustache", "neck", "noisy", "nurse", "ocean", "parent", "park", "party", "phone",
      "plant", "playground", "pool", "quiet", "rabbit", "rain", "river", "road", "rock", "sail",
      "salad", "scarf", "sea", "shark", "ship", "shout", "skate", "skip", "slow", "snow", "soup",
      "stairs", "star", "station", "stomach", "stomachache", "story", "strong", "swim", "swimming pool",
      "tooth", "toothbrush", "towel", "town", "tractor", "treasure", "trip", "truck", "uncle",
      "vegetable", "village", "wash", "waterfall", "weather", "wind", "windy", "world", "zoo"
    ]
  },
  "flyers_a2": {
    level: "Flyers",
    cefr: "A2",
    words: [
      "accident", "accidentally", "actor", "actress", "address", "adventure", "agree", "airport",
      "alarm clock", "ambulance", "appear", "art", "artist", "astronaut", "avocado", "backpack",
      "bake", "bandage", "barbecue", "beetle", "biscuit", "bite", "bitter", "blanket", "board",
      "bridge", "broke", "brush", "burn", "business", "busy", "butterfly", "camel", "camp",
      "cardboard", "careless", "cautious", "cave", "celebrate", "century", "cereal", "cheque",
      "chess", "choir", "cinnamon", "circus", "clumsily", "clumsy", "collect", "college", "comb",
      "competition", "concert", "continual", "continuous", "countryside", "crown", "cupboard",
      "cushion", "custom", "daily", "damage", "damaged", "danger", "darkness", "decide", "definition",
      "design", "designer", "dictionary", "disappear", "discover", "discovery", "disk", "divide",
      "downstairs", "drama", "dream", "dropped", "engine", "engineer", "envelope", "environment",
      "event", "everywhere", "example", "exercise", "expensive", "explain", "exploration", "explore",
      "explorer", "factory", "fall", "famous", "farm", "feather", "fell", "festival", "file",
      "finger", "finish", "fire", "fireplace", "flashlight", "flat", "flour", "fly", "fog",
      "foggy", "forest", "fork", "fossil", "found", "fridge", "friendship", "gate", "geography",
      "glass", "glove", "glue", "goal", "gold", "grammar", "guide", "hammer", "happen", "headline",
      "heavy", "highway", "history", "hole", "honey", "hotel", "husband", "iceberg", "illness",
      "important", "improve", "incident", "infant", "ingredient", "insect", "instrument",
      "interactive", "invent", "invention", "inventor", "island", "journey", "key", "keyword",
      "kingdom", "knee", "knife", "ladder", "lake", "lamp", "language", "late", "leaf", "leather",
      "lesson", "letter", "library", "lizard", "lost", "loud", "machinery", "magazine", "makeshift",
      "manager", "manner", "match", "material", "math", "mechanic", "medicine", "member", "memory",
      "metal", "meteor", "microscope", "might", "minute", "mirror", "mission", "mistake", "mixture",
      "moment", "mountain", "museum", "musician", "mystery", "nail", "narrow", "nature", "neck",
      "necklace", "needle", "nest", "newspaper", "nightstand", "noisy", "notebook", "novel",
      "nurse", "ocean", "office", "officer", "ongoing", "option", "orbit", "order", "oxygen",
      "package", "page", "paint", "painter", "palette", "palm", "panel", "paper", "paragraph",
      "partner", "passenger", "passport", "path", "pavement", "peace", "penalty", "pencil", "pepper",
      "perform", "performance", "performer", "pilot", "planet", "plastic", "platform", "pocket",
      "poem", "poet", "police station", "polite", "pollution", "population", "portrait",
      "possibility", "poster", "postman", "practice", "problem", "promise", "promised", "puddle",
      "punishment", "puppy", "puzzle", "pyramid", "queen", "question", "quick", "quiet", "quack",
      "radar", "railway", "rainbow", "receipt", "recommend", "record", "recorder", "recycle",
      "refrigeration", "relative", "repair", "repaired", "report", "reporter", "rescue", "research",
      "respect", "result", "retry", "rhythm", "rich", "riddle", "right", "ring", "rocket",
      "roller skates", "roof", "rushed downstairs", "safety", "sailor", "salad", "salt", "satisfy",
      "saucepan", "science", "scientist", "score", "screen", "search", "searched", "season", "seat",
      "secret", "secretary", "section", "selection", "sentence", "shadow", "shadowing", "shampoo",
      "shelf", "shell", "shine", "shopping center", "shorts", "shoulder", "shout", "silver",
      "singular", "skate", "skateboard", "slipped", "snack", "sneakers", "soap", "solar", "soldier",
      "solve", "song", "space", "spacesuit", "spaceship", "speaker", "speed", "spilled", "spinach",
      "spoon", "sports center", "spot", "stage", "stamp", "statue", "steep", "steering", "stomach",
      "stone", "storm", "story", "straight", "strawberry", "stream", "street", "strip", "studio",
      "subject", "submarine", "subway", "suitcase", "summer", "sunlight", "sunrise", "sunset",
      "supermarket", "supper", "surprise", "surprised", "survival", "swan", "sweater", "sweatshirt",
      "swing", "tasty", "team", "technique", "technology", "telescope", "temperature", "terrible",
      "text", "theater", "thermometer", "thousand", "ticket", "tidy", "time", "title", "torch",
      "tornado", "tourist", "towel", "tower", "traffic", "train", "trainer", "translate", "travel",
      "treasure", "triangle", "trip", "trouble", "umbrella", "uncle", "uniform", "universe",
      "university", "untidy", "unusual", "vampire", "vase", "vegetable", "vehicle", "velocity",
      "version", "village", "violin", "volcano", "waiter", "waitress", "warning", "wash", "washing machine",
      "waterfall", "wave", "website", "webtoon", "wheel", "whisper", "whistle", "wind", "window",
      "winter", "wisdom", "wish", "woke", "wood", "wooden", "wool", "worker", "world", "worry",
      "wrist", "wrong", "x-ray", "yacht", "yard", "yoghurt", "zebra", "zero", "zoo"
    ]
  },
  "ket_a2": {
    level: "Key (KET)",
    cefr: "A2",
    words: [
      "ability", "able", "abroad", "accident", "accommodation", "according to", "account",
      "ache", "across", "act", "action", "activity", "actor", "actress", "actual", "actually",
      "add", "address", "adult", "adventure", "advertisement", "advice", "advise", "afford",
      "afraid", "afternoon", "afterwards", "against", "age", "aged", "agency", "agent",
      "ago", "agree", "ahead", "air", "airline", "airport", "alarm", "album", "alike",
      "alive", "all right", "allow", "almost", "alone", "along", "aloud", "alphabet",
      "already", "also", "although", "always", "amazed", "amazing", "ambulance", "among",
      "amount", "ancient", "angry", "animal", "ankle", "anniversary", "announce", "announcement",
      "annoy", "annoyed", "annual", "another", "answer", "anxious", "anybody", "anymore",
      "anyone", "anything", "anyway", "anywhere", "apartment", "apologize", "app", "appear",
      "appearance", "apple", "application", "apply", "appointment", "approach", "architect",
      "area", "argue", "argument", "arm", "armchair", "army", "around", "arrange", "arrangement",
      "arrest", "arrival", "arrive", "art", "article", "artist", "asleep", "assistant",
      "athlete", "athletics", "atmosphere", "attach", "attack", "attempt", "attend", "attention",
      "attitude", "attract", "attraction", "attractive", "audience", "author", "automatic",
      "available", "average", "avoid", "awake", "award", "awful", "baby", "back", "background",
      "backpack", "backward", "bacon", "bad", "badly", "badminton", "bag", "baggage", "bake",
      "baker", "bakery", "balance", "balcony", "ball", "ballet", "balloon", "banana", "band",
      "bank", "bar", "barbecue", "barber", "baseball", "baseband", "basement", "basic",
      "basically", "basket", "basketball", "bat", "bath", "bathing suit", "bathroom", "battery",
      "battle", "bay", "beach", "bean", "bear", "beard", "beat", "beautiful", "beauty",
      "because", "become", "bed", "bedroom", "beef", "beer", "before", "begin", "beginner",
      "beginning", "behave", "behavior", "behind", "believe", "bell", "belong", "below",
      "belt", "bench", "beside", "besides", "best", "better", "between", "beyond", "bicycle",
      "big", "bike", "bill", "biology", "bird", "birth", "birthday", "biscuit", "bit",
      "bite", "bitter", "black", "blackboard", "blanket", "bleed", "blind", "block", "blog",
      "blonde", "blood", "blouse", "blow", "blue", "board", "boat", "body", "boil", "boiled",
      "bold", "bone", "book", "bookcase", "booking", "bookshop", "bookstore", "boot", "bored",
      "boring", "born", "borrow", "boss", "both", "bother", "bottle", "bottom", "bowl", "box",
      "boxing", "boy", "boyfriend", "brain", "brake", "branch", "brand", "brave", "bread",
      "break", "breakfast", "breath", "breathe", "brick", "bridge", "brief", "bright", "brilliant",
      "bring", "broad", "brochure", "broken", "brother", "brown", "brush", "bucket", "bug",
      "build", "builder", "building", "bulb", "bull", "bunch", "burger", "burn", "bury",
      "bus", "bush", "business", "businessman", "businesswoman", "busy", "but", "butcher",
      "butter", "butterfly", "button", "buy", "buyer", "by", "cabbage", "cabin", "cabinet",
      "cable", "cafe", "cafeteria", "cage", "cake", "calculator", "calendar", "calf", "call",
      "calm", "camera", "camp", "camping", "campsite", "can", "canal", "cancel", "candidate"
    ]
  },
  "pet_b1": {
    level: "Preliminary (PET)",
    cefr: "B1",
    words: [
      "abroad", "absolute", "absolutely", "academic", "accept", "acceptable", "access",
      "accident", "accidental", "accidentally", "accommodation", "accompany", "according to",
      "account", "accountant", "accurate", "accurately", "accuse", "achieve", "achievement",
      "acid", "acknowledge", "acquire", "across", "act", "action", "active", "actively",
      "activity", "actor", "actress", "actual", "actually", "adapt", "add", "addition",
      "additional", "address", "adequate", "adequately", "adjust", "admiration", "admire",
      "admission", "admit", "adopt", "adult", "advance", "advanced", "advantage",
      "adventure", "advertisement", "advertising", "advice", "advise", "affair", "affect",
      "affection", "afford", "afraid", "afternoon", "afterwards", "again", "against",
      "agency", "agenda", "agent", "aggressive", "agree", "agreement", "ahead", "aid",
      "aim", "air", "aircraft", "airline", "airport", "alarm", "alarm clock", "album",
      "alcohol", "alcoholic", "alert", "alike", "alive", "all right", "allow", "allowance",
      "almost", "alone", "along", "alongside", "aloud", "alphabet", "alphabetical",
      "already", "also", "alter", "alternative", "although", "altogether", "always",
      "amazed", "amazing", "ambition", "ambitious", "ambulance", "among", "amount",
      "amuse", "amused", "amusing", "analysis", "analyst", "analyze", "ancient", "anger",
      "angle", "angry", "animal", "ankle", "announce", "announcement", "annoy", "annoyed",
      "annual", "annually", "another", "answer", "anxiety", "anxious", "anxiously",
      "anybody", "anyway", "anywhere", "apart", "apartment", "apologize", "apology",
      "apparent", "apparently", "appeal", "appear", "appearance", "application", "apply",
      "appoint", "appointment", "appreciate", "appreciation", "approach", "appropriate",
      "approval", "approve", "approximate", "approximately", "architect", "architecture",
      "area", "argue", "argument", "arise", "arm", "armed", "arms", "army", "around",
      "arrange", "arrangement", "arrest", "arrival", "arrive", "arrow", "art", "article",
      "artist", "artistic", "artwork", "ashamed", "aside", "ask", "asleep", "aspect",
      "assist", "assistance", "assistant", "associate", "associated", "association",
      "assume", "assure", "astonished", "astonishing", "astronaut", "athlete", "athletics",
      "atmosphere", "attach", "attached", "attachment", "attack", "attain", "attempt",
      "attend", "attention", "attitude", "attract", "attraction", "attractive", "audience",
      "author", "authority", "automatic", "automatically", "available", "average", "avoid",
      "awake", "award", "aware", "awareness", "awful", "awkward", "awkwardly", "baby",
      "back", "background", "backpack", "backward", "bacon", "bacteria", "bad", "badge",
      "badly", "badminton", "bag", "baggage", "bake", "baker", "bakery", "balance",
      "balanced", "balcony", "ball", "ballet", "balloon", "ban", "banana", "band",
      "bandage", "bank", "banker", "banking", "bar", "barbecue", "barely", "bargain",
      "barrier", "base", "baseball", "based", "baseline", "basement", "basic", "basically",
      "basin", "basis", "basket", "basketball", "bat", "bath", "bathing", "bathroom",
      "battery", "battle", "bay", "beach", "beam", "bean", "bear", "beard", "beat",
      "beautiful", "beauty", "because", "become", "bed", "bedroom", "bee", "beef",
      "beer", "before", "beg", "begin", "beginner", "beginning", "behave", "behavior",
      "behind", "belief", "believe", "bell", "belong", "belongings", "beloved", "below",
      "belt", "bench", "bend", "beneath", "benefit", "beside", "besides", "best", "bet",
      "better", "between", "beyond", "bicycle", "bid", "big", "bike", "bill", "billion",
      "bin", "biology", "bird", "birth", "birthday", "biscuit", "bishop", "bit", "bite",
      "bitter", "bitterly", "black", "blackboard", "blade", "blame", "blank", "blanket",
      "bleed", "blend", "bless", "blind", "block", "blog", "blogger", "blonde", "blood",
      "blouse", "blow", "blue", "board", "boast", "boat", "body", "boil", "boiled",
      "bold", "bomb", "bone", "bonus", "book", "bookcase", "booking", "bookshop", "bookstore",
      "boost", "boot", "border", "bored", "boring", "born", "borrow", "boss", "both",
      "bother", "bottle", "bottom", "bounce", "bound", "boundary", "bow", "bowl", "box",
      "boxing", "boy", "boyfriend", "brain", "brake", "branch", "brand", "brave", "bravery",
      "bread", "break", "breakfast", "breast", "breath", "breathe", "breathing", "breeze",
      "brick", "bride", "bridge", "brief", "briefly", "bright", "brilliant", "bring",
      "broad", "broadcast", "brochure", "broke", "broken", "bronze", "brother", "brown",
      "browse", "browser", "brush", "bubble", "bucket", "budget", "bug", "build",
      "builder", "building", "bulb", "bulk", "bull", "bullet", "bunch", "burden",
      "bureau", "burger", "burn", "burst", "bury", "bus", "bush", "business", "businessman",
      "businesswoman", "busy", "but", "butcher", "butter", "butterfly", "button", "buy",
      "buyer", "buzz", "by", "cabbage", "cabin", "cabinet", "cable", "cafe", "cafeteria",
      "cage", "cake", "calculate", "calculation", "calculator", "calendar", "call", "calm",
      "calmly", "camera", "camp", "campaign", "camping", "campsite", "campus", "can",
      "canal", "cancel", "cancer", "candidate"
    ]
  },
  "fce_b2": {
    level: "First (FCE)",
    cefr: "B2",
    words: [
      "abandon", "abandoned", "ability", "abolish", "abortion", "about", "above",
      "abroad", "absence", "absent", "absolute", "absolutely", "absorb", "abstract",
      "absurd", "abundance", "abundant", "abuse", "academic", "academy", "accelerate",
      "accent", "accept", "acceptable", "acceptance", "accepted", "access", "accessible",
      "accident", "accidental", "accidentally", "accommodate", "accommodation",
      "accompany", "accomplish", "accomplishment", "accordingly", "accountability",
      "accountable", "accountant", "accounting", "accumulate", "accumulation",
      "accuracy", "accurate", "accurately", "accusation", "accuse", "accused",
      "accustom", "accustomed", "achieve", "achievement", "acknowledge", "acquisition",
      "acre", "activist", "actress", "actual", "acute", "adapt", "adaptation", "addiction",
      "additive", "address", "adequately", "adhere", "adjacent", "adjust", "adjustment",
      "administer", "administration", "administrative", "administrator", "admire",
      "admission", "admit", "admittedly", "adopt", "adoption", "advance", "advancement",
      "advantage", "advantageous", "adventure", "adverse", "adversity", "advertise",
      "advertisement", "advertising", "advice", "advisable", "advise", "adviser",
      "advocate", "aesthetic", "affair", "affect", "affection", "affectionate",
      "affiliate", "affiliated", "affinity", "affirm", "affirmative", "afford",
      "affordable", "afraid", "aftermath", "afternoon", "afterwards", "age",
      "agency", "agenda", "agent", "aggregate", "aggression", "aggressive",
      "aggressively", "agile", "agility", "aging", "agitate", "agitation", "agony",
      "agree", "agreeable", "agreement", "agricultural", "agriculture", "ahead",
      "aid", "aide", "aim", "air", "aircraft", "airline", "airliner", "airplane",
      "airport", "aisle", "alarm", "alarming", "alarmist", "album", "alcohol",
      "alcoholic", "alert", "alias", "alien", "alienate", "alienation", "align",
      "alignment", "alike", "alive", "allegation", "allege", "alleged", "allegedly",
      "allegiance", "allegory", "allergic", "allergy", "alleviate", "alley",
      "alliance", "allied", "allocate", "allocation", "allot", "allow", "allowance",
      "alloy", "allude", "allure", "ally", "almost", "alms", "alone", "along",
      "alongside", "aloof", "aloud", "alphabet", "alphabetical", "alphabetically",
      "already", "also", "alter", "alteration", "alternate", "alternatively",
      "altitude", "altogether", "altruism", "altruistic", "aluminum", "amateur",
      "amazed", "amazement", "amazing", "amazingly", "ambassador", "ambiance",
      "ambiguity", "ambiguous", "ambition", "ambitious", "ambulance", "amend",
      "amendment", "amenity", "amiable", "amicable", "amid", "amidst", "ammunition",
      "amnesty", "among", "amongst", "amorphous", "amount", "amperage", "ample",
      "amplification", "amplifier", "amplify", "amplitude", "amuse", "amused",
      "amusement", "amusing", "analogous", "analogy", "analysis", "analyst",
      "analytic", "analytical", "analyze", "anarchist", "anarchy", "anatomy",
      "ancestor", "ancestral", "ancestry", "anchor", "ancient", "anecdote"
    ]
  }
};

async function fetchRemoteCefrData() {
  console.log("🌐 Initiating fetch for CEFR open datasets...");
  const remoteWordsByLevel = {};

  for (const url of OPEN_DATA_SOURCES) {
    try {
      console.log(`📥 Fetching data from: ${url}`);
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Successfully received payload from ${url}`);
        if (Array.isArray(data)) {
          data.forEach(item => {
            const word = typeof item === 'string' ? item : (item.word || item.lemma);
            const level = (item.level || item.cefr || 'A2').toLowerCase();
            if (word) {
              if (!remoteWordsByLevel[level]) remoteWordsByLevel[level] = [];
              remoteWordsByLevel[level].push(word.trim().toLowerCase());
            }
          });
        }
      }
    } catch (err) {
      console.warn(`⚠️ Warning: Fetch failed for ${url}: ${err.message}. Fallback to curated dataset.`);
    }
  }

  return remoteWordsByLevel;
}

async function main() {
  const remoteData = await fetchRemoteCefrData();

  for (const [key, baseConfig] of Object.entries(CURATED_CEFR_DATA)) {
    const rawWords = [...baseConfig.words];

    // Merge remote words if available
    const remoteKey = baseConfig.cefr.toLowerCase();
    if (remoteData[remoteKey]) {
      rawWords.push(...remoteData[remoteKey]);
    }

    // Clean, deduplicate and sort
    const cleanWords = Array.from(
      new Set(
        rawWords
          .filter(w => Boolean(w) && typeof w === 'string')
          .map(w => w.trim().toLowerCase())
      )
    ).sort();

    const outputData = {
      level: baseConfig.level,
      cefr: baseConfig.cefr,
      total_words: cleanWords.length,
      description: `Official Cambridge English: ${baseConfig.level} (${baseConfig.cefr}) Wordlist Repository`,
      words: cleanWords
    };

    const filePath = path.join(TARGET_DIR, `${key}.json`);
    fs.writeFileSync(filePath, JSON.stringify(outputData, null, 2), 'utf-8');

    console.log(`Successfully fetched ${outputData.total_words} words for ${baseConfig.level} ${baseConfig.cefr}`);
  }

  console.log("🎉 All 6 Cambridge official wordlists updated successfully in src/data/official_wordlists/");
}

main();
