const express = require('express');
const multer = require('multer');
const cors = require('cors');
const proxy = require('./proxy'); // Panggil proxy.js dengan path sejajar

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Aktifkan CORS untuk mencegah blokir di Vercel
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route utama untuk memproses semua endpoint Vercel
app.post('/api/generate', upload.any(), async (req, res) => {
    try {
        const result = await proxy.handleRequest(req.body, req.files);
        res.status(200).json({ success: true, imageUrl: result });
    } catch (error) {
        console.error("Backend Error:", error.message); // Log error untuk dicek di dashboard Vercel
        res.status(500).json({ success: false, message: error.message });
    }
});

// Wajib gunakan module.exports agar Vercel mengenali ini sebagai Serverless Function
module.exports = app;
