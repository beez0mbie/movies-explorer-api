require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { celebrate } = require('celebrate');
const rateLimit = require('express-rate-limit');
const { login, logout, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const router = require('./routes');
const { signUp, signIn } = require('./utils/routerValidations');

const {
  PORT,
  MONGODB_URL,
  // allowedCors, // TODO: return for production
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

// TODO: return for production
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedCors.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
//   credentials: true,
// };

// Allower all Corrs for local develop
const corsOptionsForGitTest = {
  // git test faild with CORS thats why i used *
  origin: '*',
  methods: '*',
  credentials: true,
};

// TODO: return for production
// app.use(cors(corsOptions));

// Allower all Corrs for local develop // TODO: delete before production
app.use(cors(corsOptionsForGitTest));

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
// app.use(requestLogger); // TODO: Realize logging task

/**
 * Routes
 */

app.post('/signup', celebrate(signUp), createUser);
app.post('/signin', celebrate(signIn), login);
app.get('/logout', logout);
app.use(auth);
app.use(router);

/**
 * Errors handlers
 */

// app.use(errorLogger); // TODO: Realize logging task
// app.use(errors());
// // eslint-disable-next-line no-unused-vars, max-len
// app.use((err, _req, res, _next) => {
//   // _next обязательно нужно указать 4 параметр что бы ошибки заработали
//   handleErrors(err, res);
// });

/**
 * Run Server
 */

app.listen(PORT, () => {
  console.log(`Movie app listening on port ${PORT}`);
});
