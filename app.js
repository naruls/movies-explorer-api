const express = require('express');
const cors = require('cors');

const options = {
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://projectnaruls.ru',
    'http://projectnaruls.ru'
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Accept'],
  credentials: true,
};

const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const limiterRate = require('./middlewares/limitRate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/routs');
const centralHandlerErr = require('./middlewares/centralHandlerErr');
require('dotenv').config();

const {
  mongodbMovies,
  crashTestError,
} = require('./const/const');

const app = express();

const { PORT = 3001 } = process.env;

mongoose.connect(mongodbMovies, {
});

app.use('*', cors(options));

app.use('/', express.json());

app.use(cookieParser());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(crashTestError);
  }, 0);
});

app.use(requestLogger);

app.use(helmet());

app.use(limiterRate);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(centralHandlerErr);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); //eslint-disable-line
});
