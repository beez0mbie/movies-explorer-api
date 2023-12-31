const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const NotFoundError = require('../errors/notFound');
const AuthorizationError = require('../errors/authorizationError');
const getJwtSecretKey = require('../utils/getJwtSecretKey');
const {
  userMessage, authMessage,
} = require('../constants/messages');

const login = (req, res, next) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .select('+password')
    .orFail(new AuthorizationError(userMessage.notAllowedPasswordOfEmail))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new AuthorizationError(userMessage.notAllowedPasswordOfEmail);
        }
        const token = jwt.sign(
          { _id: user._id },
          getJwtSecretKey(),
        );
        res.cookie('jwt', token, {
          maxAge: 3600000 * 24 * 365,
          httpOnly: true,
        }).send({ message: authMessage.jwtSend });
      }))
    .catch(next);
};

const logout = (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: authMessage.jwtDeleted });
  } catch (err) {
    next(err);
  }
};

const getUser = (req, res, next) => {
  const userId = req.user._id;
  UserModel.findById(userId)
    .orFail(new NotFoundError(userMessage.notFound))
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => UserModel.create({ ...req.body, password: hash }))
    .then((user) => {
      const userResponse = user.toObject();
      delete userResponse.password;
      res.status(201).send(userResponse);
    })
    .catch(next);
};

const updateUser = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name: req.body.name, email: req.body.email },
      {
        new: true,
        runValidators: true,
      },
    ).orFail(new NotFoundError(userMessage.notFound));
    res.send(updatedUser);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  getUser,
  createUser,
  updateUser,
  logout,
};
