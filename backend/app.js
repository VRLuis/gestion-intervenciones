const express = require('express');
const cors = require('cors');
const database = require('./db/database');
const apiRoutes = require('./routes/index');
require('./db/init');

const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use('/api', apiRoutes)

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));