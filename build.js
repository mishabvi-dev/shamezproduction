const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
let files = [];

if (fs.existsSync(assetsDir)) {
  files = fs.readdirSync(assetsDir).filter(f => !f.startsWith('.'));
}

fs.writeFileSync(path.join(__dirname, 'assets.json'), JSON.stringify(files));
console.log(`Build complete: Generated assets.json with ${files.length} files.`);
