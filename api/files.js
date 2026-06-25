const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Use process.cwd() so it works correctly inside Vercel's serverless environment
  const assetsDir = path.join(process.cwd(), 'assets');
  if (!fs.existsSync(assetsDir)) {
    return res.status(200).json([]);
  }
  
  fs.readdir(assetsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read directory' });
    }
    const validFiles = files.filter(f => !f.startsWith('.'));
    res.status(200).json(validFiles);
  });
};
