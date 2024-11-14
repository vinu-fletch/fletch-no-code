
const express = require('express');
const partnerRoutes = require('./routes/partnerRoutes');
const { toCamelCase } = require('./utils/caseConversion'); 

require('dotenv').config();

const app = express();

app.use(express.json()); 

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/partners', partnerRoutes); 


app.use((req, res, next) => {
  const oldJson = res.json.bind(res);
  res.json = (data) => {
    data = toCamelCase(data);
    return oldJson(data);
  };
  next();
});

module.exports = app;