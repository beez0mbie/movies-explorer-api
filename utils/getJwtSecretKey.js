const { NODE_ENV, JWT_SECRET, JWT_DEV } = require('../env');

const getJwtSecretKey = () => {
  console.log('NODE_ENV', NODE_ENV);
  return (NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV);
};

module.exports = getJwtSecretKey;
