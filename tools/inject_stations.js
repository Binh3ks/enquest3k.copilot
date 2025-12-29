const fs = require('fs');
const path = require('path');

const weeks = [19, 20, 21];
const basePaths = ['src/data/weeks', 'src/data/weeks_easy'];

weeks.forEach(id => {
    basePaths.forEach(base => {
        const filePath = path.join(base, `week_${id}`, 'index.js');
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            // Kiểm tra xem đã có game_hub chưa
            if (!content.includes('game_hub')) {
                // Thêm vào object stations
                content = content.replace(
                    /stations: \{([\s\S]*?)\}/,
                    (match, p1) => `stations: {${p1.trim()},\n      game_hub: {}, \n      self_regulation: {}\n    }`
                );
                fs.writeFileSync(filePath, content);
                console.log(`✅ Updated Stations for ${filePath}`);
            }
        }
    });
});
