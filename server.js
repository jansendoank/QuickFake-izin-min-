const express = require('express');
const multer = require('multer');
const path = require('path');
const proxy = require('../proxy');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Menyajikan file statis (index.html)
app.use(express.static(path.join(__dirname, '../')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route utama untuk memproses semua endpoint
app.post('/api/generate', upload.any(), async (req, res) => {
    try {
        const result = await proxy.handleRequest(req.body, req.files);
        res.json({ success: true, imageUrl: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server QuickFake jalan di http://localhost:${PORT}`));

module.exports = app;
