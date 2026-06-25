const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get('/api/files', (req, res) => {
  const assetsDir = path.join(__dirname, 'assets');
  if (!fs.existsSync(assetsDir)) {
    return res.json([]);
  }
  
  fs.readdir(assetsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read directory' });
    }
    const validFiles = files.filter(f => !f.startsWith('.'));
    res.json(validFiles);
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
