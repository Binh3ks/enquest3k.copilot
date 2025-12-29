import fs from 'fs';
import path from 'path';
import https from 'https';
const DATA_DIR = './src/data/weeks'; const PUBLIC_IMG_DIR = './public/images';
const download = (url, dest) => new Promise((res, rej) => {
    https.get(url, r => { r.pipe(fs.createWriteStream(dest)).on('finish', ()=>res(true)); }).on('error', rej);
});
const run = async () => {
    for(const f of fs.readdirSync(DATA_DIR).filter(n=>n.startsWith('week_'))) {
        let c = fs.readFileSync(path.join(DATA_DIR, f), 'utf-8');
        for(const m of c.matchAll(/(image_url:\s*["'])(https?:\/\/[^"']+) दुसरी(["'])/g)) {
            const name = path.basename(m[2]).split('?')[0].replace(/[^a-z0-9.]/gi,'_');
            const w = `week${f.match(/\d+/)[0]}`;
            if(!fs.existsSync(path.join(PUBLIC_IMG_DIR, w))) fs.mkdirSync(path.join(PUBLIC_IMG_DIR, w), {recursive:true});
            try { await download(m[2], path.join(PUBLIC_IMG_DIR, w, name)); } catch{}
            c = c.replace(m[2], `/images/${w}/${name}`);
        }
        fs.writeFileSync(path.join(DATA_DIR, f), c);
    }
};
run();
