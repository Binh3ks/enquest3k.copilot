/**
 * Checkpoint W36 — Mid A1+ Phase (YLE Movers prep)
 * Tests: Vocabulary (W27-36, topic-rich words), Grammar (present perfect, comparatives),
 *        Reading (informational text), Writing (opinion paragraph)
 */
export default {
  week: 36,
  title: "A1+ Checkpoint",
  badge: "⭐ Mover Pro",

  vocab_test: {
    pass_threshold: 0.75,
    questions: [
      { q: "The Amazon is the world's largest ___.", options: ["rainforest", "desert", "mountain", "ocean"], answer: "rainforest" },
      { q: "___ means to keep something safe from harm.", options: ["Protect", "Destroy", "Collect", "Ignore"], answer: "Protect" },
      { q: "The government made a new ___ to reduce pollution.", options: ["policy", "story", "disaster", "record"], answer: "policy" },
      { q: "Elephants are an ___ species — they may disappear.", options: ["endangered", "ordinary", "common", "popular"], answer: "endangered" },
      { q: "She ___ the evidence before making a conclusion.", options: ["analysed", "ignored", "destroyed", "invented"], answer: "analysed" },
      { q: "Rivers ___ into the sea.", options: ["flow", "grow", "freeze", "float"], answer: "flow" },
      { q: "The city has a large ___ of over 5 million people.", options: ["population", "elevation", "distance", "temperature"], answer: "population" },
      { q: "Scientists study ___ to understand how they behave.", options: ["ecosystems", "stories", "machines", "buildings"], answer: "ecosystems" },
      { q: "He made a ___ to help the environment.", options: ["commitment", "mistake", "request", "complaint"], answer: "commitment" },
      { q: "The ice caps are ___ due to climate change.", options: ["melting", "growing", "rising", "freezing"], answer: "melting" },
      { q: "___ energy comes from the sun.", options: ["Solar", "Wind", "Coal", "Gas"], answer: "Solar" },
      { q: "The town ___ after the flood.", options: ["recovered", "disappeared", "expanded", "froze"], answer: "recovered" },
      { q: "___ are small pieces of plastic that harm sea life.", options: ["Microplastics", "Minerals", "Nutrients", "Particles"], answer: "Microplastics" },
      { q: "She has a strong ___ for science.", options: ["passion", "doubt", "fear", "dislike"], answer: "passion" },
      { q: "The forest provides a ___ for many animals.", options: ["habitat", "product", "barrier", "climate"], answer: "habitat" },
      { q: "We must ___ our use of single-use plastic.", options: ["reduce", "increase", "celebrate", "create"], answer: "reduce" },
      { q: "He ___ a new theory about the stars.", options: ["proposed", "ignored", "destroyed", "questioned"], answer: "proposed" },
      { q: "The river ___ when the dam was built.", options: ["changed course", "disappeared", "grew bigger", "froze"], answer: "changed course" },
      { q: "___ means relating to living things and their environment.", options: ["Ecological", "Historical", "Physical", "Mechanical"], answer: "Ecological" },
      { q: "The scientist received a ___ for her research.", options: ["grant", "punishment", "complaint", "delay"], answer: "grant" },
    ],
  },

  grammar_test: {
    pass_threshold: 0.70,
    questions: [
      { q: "She ___ already finished her project.", options: ["has", "have", "had", "is"], answer: "has" },
      { q: "They ___ ever visited Japan.", options: ["have never", "has never", "never have", "never has"], answer: "have never" },
      { q: "Choose the correct sentence:", options: ["He has went to Paris.", "He has go to Paris.", "He has been to Paris.", "He have been to Paris."], answer: "He has been to Paris." },
      { q: "This mountain is ___ than that one.", options: ["tall", "taller", "tallest", "more tall"], answer: "taller" },
      { q: "She is the ___ student in the class.", options: ["smart", "smarter", "smartest", "more smart"], answer: "smartest" },
      { q: "Choose the correct sentence:", options: ["This is more better.", "This is gooder.", "This is more good.", "This is better."], answer: "This is better." },
      { q: "___ you ever eaten sushi?", options: ["Did", "Have", "Has", "Do"], answer: "Have" },
      { q: "Mount Everest is the ___ mountain in the world.", options: ["high", "higher", "highest", "most high"], answer: "highest" },
      { q: "I ___ lived here since I was born.", options: ["have", "has", "had", "am"], answer: "have" },
      { q: "The Nile is ___ than the Amazon.", options: ["long", "longer", "longest", "as long"], answer: "longer" },
      { q: "Choose the correct sentence:", options: ["She have seen that film.", "She has seen that film.", "She seen that film.", "She seeing that film."], answer: "She has seen that film." },
      { q: "He is ___ careful driver in the family.", options: ["a more", "the most", "a most", "more"], answer: "the most" },
      { q: "We ___ just arrived at the hotel.", options: ["have", "has", "had", "are"], answer: "have" },
      { q: "Today is ___ day of the year.", options: ["hot", "hotter", "the hottest", "more hot"], answer: "the hottest" },
      { q: "Choose the correct sentence:", options: ["She hasn't never lied.", "She have not lied.", "She has not lied.", "She not has lied."], answer: "She has not lied." },
    ],
  },

  reading: {
    pass_threshold: 0.70,
    passage: "Coral reefs are often called the 'rainforests of the sea' because they support an enormous variety of life. Although they cover less than 1% of the ocean floor, coral reefs provide a home for around 25% of all marine species. They also protect coastlines from storm damage by acting as a natural barrier. However, rising ocean temperatures caused by climate change are causing a process called 'coral bleaching', which turns the colourful coral white and can eventually kill it. Scientists and governments around the world are working to reduce carbon emissions and protect these vital ecosystems.",
    questions: [
      { q: "Why are coral reefs called the 'rainforests of the sea'?", options: ["They look like rainforests.", "They support a huge variety of life.", "They cover most of the ocean.", "They grow in warm rainforests."], answer: "They support a huge variety of life." },
      { q: "What percentage of marine species do coral reefs support?", options: ["1%", "10%", "25%", "50%"], answer: "25%" },
      { q: "How do coral reefs protect coastlines?", options: ["They clean the water.", "They act as a natural barrier.", "They absorb rainfall.", "They cool the ocean."], answer: "They act as a natural barrier." },
      { q: "What causes coral bleaching?", options: ["Pollution from ships", "Rising ocean temperatures", "Too much sunlight", "Storm damage"], answer: "Rising ocean temperatures" },
      { q: "What happens to coral during bleaching?", options: ["It grows faster.", "It turns white and may die.", "It moves to deeper water.", "It becomes more colourful."], answer: "It turns white and may die." },
      { q: "What are scientists and governments doing to help?", options: ["Building artificial reefs", "Reducing carbon emissions and protecting ecosystems", "Moving coral to cooler waters", "Banning fishing completely"], answer: "Reducing carbon emissions and protecting ecosystems" },
    ],
  },

  writing: {
    prompt: "Write a paragraph (5-6 sentences) giving your opinion on this statement: 'Everyone should do something to help the environment.' Give at least 2 reasons.",
    rubric_threshold: 7,
    min_words: 30,
    hint: "Use: I think/believe that..., One reason is..., Another reason is..., Therefore/In conclusion...",
  },
};
