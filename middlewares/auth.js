const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorizationError');
const getJwtSecretKey = require('../utils/getJwtSecretKey');
const { authMessage } = require('../constants/messages');

const auth = (req, res, next) => {
  let payload;

  try {
    const token = req.cookies.jwt;
    payload = jwt.verify(token, getJwtSecretKey());
  } catch (err) {
    next(new AuthorizationError(authMessage.authNeeded));
    return;
  }

  req.user = payload;
  next();
};

module.exports = auth;
