const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Allow requests from the Frontend URL (or all if not specified)
const corsOptions = {
    origin: process.env.FRONTEND_URL || '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// API Routes
app.use('/api', require('./routes/api'));

// Root Endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Etmaam API is running 🚀' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
