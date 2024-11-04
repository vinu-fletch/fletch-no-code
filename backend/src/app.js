// app.js
const express = require('express');
const partnerRoutes = require('./routes/partnerRoutes');
require('dotenv').config();

const app = express();

app.use(express.json()); // Parse JSON request bodies
app.use('/partners', partnerRoutes); // Use the partner routes

module.exports = app;