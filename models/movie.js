const mongoose = require('mongoose');
const urlRegExp = require('../utils/urlRegExp');
const { validateMessage } = require('../constants/messages');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      minlength: 1,
    },
    director: {
      type: String,
      required: true,
      minlength: 1,
    },
    duration: {
      type: Number,
      required: true,
      minlength: 1,
    },
    year: {
      type: String,
      required: true,
      minlength: 1,
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (url) => urlRegExp.test(url),
        message: validateMessage.notUrl,
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (url) => urlRegExp.test(url),
        message: validateMessage.notUrl,
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (url) => urlRegExp.test(url),
        message: validateMessage.notUrl,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
      minlength: 1,
    },
    nameRU: {
      type: String,
      required: true,
      minlength: 1,
    },
    nameEN: {
      type: String,
      required: true,
      minlength: 1,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
