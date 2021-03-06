const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const httpStatus = require('http-status');
const app = express();
const {
  errorF
} = require('./utils/message');
const routes = require('./routes');
app.set('trust proxy', 1);
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());

app.use((error, _req, res, next) => {
  if (error instanceof SyntaxError) {
    errorF(error.message, error, httpStatus.BAD_REQUEST, res, next);
  } else {
    next();
  }
});

app.use('/api', routes);

// Routes to test the API
app.get('/', (_req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄👨‍🔧🐱‍🚀✌'
  });
});

// Error handling not found
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND);
  const errorMessage = {
    message: `🔍 - Not Found - ${req.originalUrl}`
  };
  res.json(errorMessage);
  next();
});

module.exports = app;