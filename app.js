require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const { celebrate, errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');

const { login, logout, createUser } = require('./controllers/users');
const router = require('./routes');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleErrors = require('./utils/errors');
const { signUp, signIn } = require('./utils/routerValidations');

const {
  PORT,
  MONGODB_URL,
  NODE_ENV,
  allowedCors,
} = require('./env');

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

const app = express();

/**
 * CORS
 */
let corsOptions;
if (NODE_ENV === 'production') {
  console.log('Production CORS');
  corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedCors.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true,
  };
} else {
  // Allow all Corrs for local develop
  console.log('All CORS allowed');
  corsOptions = {
    origin: '*',
    methods: '*',
    credentials: true,
  };
}

app.use(cors(corsOptions));

/**
 * Middlewares
 */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

/**
 * Routes
 */

app.post('/signup', celebrate(signUp), createUser);
app.post('/signin', celebrate(signIn), login);
app.get('/signout', logout);
app.use(auth);
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
