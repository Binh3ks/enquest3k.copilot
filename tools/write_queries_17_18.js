import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const w17 = {
  weekId: 17,
  theme: "Weather & Clothes",
  grammar_focus: "Cause and Effect: It is [weather], so I am wearing [clothes].",
  videos: [
    {
      id: 1, purpose: "GRAMMAR",
      priority_search: "English Singsing because so cause effect adjectives ESL for kids",
      backup_search: "because so cause effect adjectives song ESL kids cartoons"
    },
    {
      id: 2, purpose: "GRAMMAR",
      priority_search: "English Singsing present continuous I am wearing what are you wearing ESL for kids",
      backup_search: "present continuous I am wearing clothes ESL kids song cartoons"
    },
    {
      id: 3, purpose: "STORY",
      priority_search: "Little Fox weather clothes story level 1 ESL for kids",
      backup_search: "Vooks weather seasons story read aloud cartoons for kids"
    },
    {
      id: 4, purpose: "VOCABULARY",
      priority_search: "Little Fox weather song ESL for kids",
      backup_search: "weather vocabulary song ESL kids cartoons"
    },
    {
      id: 5, purpose: "SCIENCE",
      priority_search: "SciShow Kids weather sunny rainy cloudy seasons for kids",
      backup_search: "weather seasons science for kids National Geographic Kids"
    }
  ],
  topic: "Weather Reporter - describing weather and dressing",
  science: "weather sunny rainy cloudy snowy hot cold clothes jacket umbrella"
};

const w18 = {
  weekId: 18,
  theme: "The Live Reporter",
  grammar_focus: "Present Continuous: I am reporting / She is filming / They are watching.",
  videos: [
    {
      id: 1, purpose: "GRAMMAR",
      priority_search: "English Singsing present continuous am is are doing ESL for kids",
      backup_search: "present continuous am is are doing grammar song ESL kids cartoons"
    },
    {
      id: 2, purpose: "GRAMMAR",
      priority_search: "English Singsing present continuous what are you doing she is he is ESL for kids",
      backup_search: "present continuous what are you doing she is running he is eating ESL kids song"
    },
    {
      id: 3, purpose: "STORY",
      priority_search: "Little Fox what is happening actions story level 1 ESL for kids",
      backup_search: "Vooks action verbs story read aloud cartoons for kids"
    },
    {
      id: 4, purpose: "VOCABULARY",
      priority_search: "Little Fox action verbs vocabulary song ESL for kids",
      backup_search: "action verbs vocabulary song ESL kids cartoons Dream English"
    },
    {
      id: 5, purpose: "SCIENCE",
      priority_search: "SciShow Kids how does a camera microphone work for kids",
      backup_search: "how do cameras work science for kids National Geographic Kids"
    }
  ],
  topic: "Live News Reporter - describing current events",
  science: "reporter camera filming watching microphone broadcasting news"
};

fs.writeFileSync(path.join(ROOT, 'src/data/weeks/week_17/video_queries.json'), JSON.stringify(w17, null, 2));
fs.writeFileSync(path.join(ROOT, 'src/data/weeks/week_18/video_queries.json'), JSON.stringify(w18, null, 2));
console.log('Written W17 and W18 video_queries.json');
