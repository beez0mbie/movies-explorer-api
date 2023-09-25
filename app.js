require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');

const router = require('./routes');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleErrors = require('./utils/errors');
const rateLimiter = require('./utils/rateLimiter');
const corsOptions = require('./utils/cors');

const {
  PORT,
  MONGODB_URL,
} = require('./env');

/**
 * MONGODB
 */

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`Connected to ${MONGODB_URL}`);
  })
  .catch(
    (err) => new Error(`Impossible connect to DB ${err.name}: ${err.message}`),
  );

/**
 * APP
 */

const app = express();

/**
 * CORS
 */

app.use(cors(corsOptions));

/**
 * Middlewares
 */

app.use(rateLimiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

/**
 * Routes
 */

app.use(router);

/**
 * Errors handlers
 */

app.use(errorLogger);
app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  // _next обязательно нужно указать 4 параметр что бы ошибки заработали
  handleErrors(err, res);
});

/**
 * Run Server
 */

app.listen(PORT, () => {
  console.log(`Movie Api listening on port ${PORT}`);
});
