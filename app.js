require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const routes = require('./routes/index');

// Порт
const { PORT = 3000 } = process.env;

const app = express();

const corsOptions = {
  origin: [
    'http://movies-hancorg.nomoredomains.xyz',
    'https://movies-hancorg.nomoredomains.xyz',
    'localhost:3000',
    'http://localhost:3000',
    'https://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Accept'],
  credentials: true,
};

app.options('*', cors(corsOptions));

mongoose.connect('mongodb://127.0.0.1:27017/moviesdb');

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/', routes);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
