require('dotenv').config();

const {
  PORT = 3000,
  MONGODB_URL = 'mongodb://localhost:27017/bitfilmsdb',
  NODE_ENV = 'default_node_env',
  JWT_SECRET = 'default_production_secret',
  JWT_DEV = 'default_dev_secret',
} = process.env;

const allowedCors = [
  'https://movies.ashmelkov.nomoredomainsicu.ru', // TODO: может поменяться имя в будущем
  'https://api.movies.ashmelkov.nomoredomainsicu.ru', // TODO: может поменяться имя в будущем
];

module.exports = {
  PORT,
  MONGODB_URL,
  NODE_ENV,
  JWT_SECRET,
  JWT_DEV,
  allowedCors,
};
