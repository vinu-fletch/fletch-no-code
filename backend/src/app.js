// app.js
const express = require('express');
const partnerRoutes = require('./routes/partnerRoutes');
const { toCamelCase } = require('./utils/caseConversion'); // Import the utility function

require('dotenv').config();

const app = express();

app.use(express.json()); // Parse JSON request bodies
// Enable all cors requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/partners', partnerRoutes); // Use the partner routes

// Middleware to camelCase all response bodies
app.use((req, res, next) => {
  const oldJson = res.json.bind(res);
  res.json = (data) => {
    data = toCamelCase(data);
    return oldJson(data);
  };
  next();
});

module.exports = app;