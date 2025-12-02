const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/services
router.get('/services', async (req, res) => {
    try {
        // For now, return dummy data. Uncomment the line below when DB is ready.
        // const result = await db.query('SELECT * FROM services');
        // res.json(result.rows);

        res.json([
            { id: 1, title: 'Company Formation', description: 'Start your business in KSA' },
            { id: 2, title: 'Legal Consulting', description: 'Expert legal advice' }
        ]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/packages
router.get('/packages', async (req, res) => {
    try {
        res.json([
            { id: 'basic', name: 'Silver Package', price: 7500 },
            { id: 'pro', name: 'Gold Package', price: 13500 },
            { id: 'enterprise', name: 'Enterprise Package', price: 20000 }
        ]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/contact
router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        // console.log('Received contact form:', { name, email, message });
        // await db.query('INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)', [name, email, message]);
        res.json({ success: true, message: 'Message received' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
