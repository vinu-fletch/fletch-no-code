// app.js
const express = require('express');
const partnerRoutes = require('./routes/partnerRoutes');
require('dotenv').config();

const app = express();

app.use(express.json()); // Parse JSON request bodies
// Enable all cors requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/partners', partnerRoutes); // Use the partner routes

module.exports = app;