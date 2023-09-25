const mongoose = require('mongoose');
const validator = require('validator');
const { validateMessage } = require('../constants/messages');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: validateMessage.notEmail,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      minlength: [2, validateMessage.minLength],
      maxlength: [30, validateMessage.maxLength],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
