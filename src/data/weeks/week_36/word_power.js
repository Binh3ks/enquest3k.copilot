// WEEK 36: Word Power Station — Advanced Mode

const wordPowerList = [
  { id: "wp1", word: "Apply Archimedes Principle", definition_en: "to use the physics law of fluid buoyancy", definition_vi: "áp dụng nguyên lý Archimedes", example: "Leo applied Archimedes principle to float the 150 kg chest.", collocation_en: "buoyancy / water displacement", image_url: "/images/week36/wp1_archimedes.jpg" },
  { id: "wp2", word: "Displace Seawater", definition_en: "to push ocean water out of the way to create upward force", definition_vi: "dịch chuyển nước biển", example: "The air bags displaced 150 litres of seawater.", collocation_en: "upward lift / ocean physics", image_url: "/images/week36/wp2_displace.jpg" },
  { id: "wp3", word: "Achieve Neutral Buoyancy", definition_en: "to balance gravity and upward buoyant force perfectly", definition_vi: "đạt trạng thái cân bằng lực nổi", example: "They achieved neutral buoyancy to lift the heavy object.", collocation_en: "underwater floatation / physics balance", image_url: "/images/week36/wp3_buoyancy.jpg" },
  { id: "wp4", word: "Embark on a Journey", definition_en: "to start an important or adventurous expedition", definition_vi: "bắt đầu chuyến hành trình", example: "Marco Polo embarked on a 24-year journey across Asia.", collocation_en: "Silk Road / expedition", image_url: "/images/week36/wp4_journey.jpg" },
  { id: "wp5", word: "Serve as a Diplomat", definition_en: "to work as an official representative between nations", definition_vi: "làm việc như một nhà ngoại giao", example: "Marco Polo served as a diplomat for Kublai Khan.", collocation_en: "international trust / governance", image_url: "/images/week36/wp5_diplomat.jpg" },
  { id: "wp6", word: "Withstand Extreme Pressure", definition_en: "to resist immense deep-sea force without collapsing", definition_vi: "chịu đựng áp suất cực hạn", example: "Titanium submersibles withstand extreme deep-sea pressure.", collocation_en: "deep ocean / titanium hull", image_url: "/images/week36/wp6_pressure.jpg" },
  { id: "wp7", word: "Discover Ancient Artifacts", definition_en: "to find historical objects preserved underwater or in ruins", definition_vi: "phát hiện cổ vật lịch sử", example: "Explorers discovered ancient artifacts inside the cavern.", collocation_en: "gold compass / archaeology", image_url: "/images/week36/wp7_artifacts.jpg" },
  { id: "wp8", word: "Explore Deep Ocean Trenches", definition_en: "to investigate the deepest valleys on the ocean floor", definition_vi: "khám phá rãnh đại dương sâu", example: "Scientists explore deep ocean trenches using submersibles.", collocation_en: "Mariana Trench / Challenger Deep", image_url: "/images/week36/wp8_trenches.jpg" }
];

export default {
  words: wordPowerList,
  phrases: wordPowerList,
  collocations: wordPowerList
};
