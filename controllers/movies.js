const mongoose = require('mongoose');
const MovieModel = require('../models/movie');
const NotFoundError = require('../errors/notFound');
const AuthenticationError = require('../errors/authenticationError');
const { movieMessage } = require('../constants/messages');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  MovieModel.find({
    owner,
  })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  MovieModel.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;
  MovieModel.findOne({ movieId, owner: new mongoose.Types.ObjectId(userId) })
    .orFail(new NotFoundError(movieMessage.notFound))
    .then((movie) => {
      if (movie.owner.toString() !== userId) {
        throw new AuthenticationError(movieMessage.notRightsToDelete);
      }
      return MovieModel.deleteOne({ _id: movie._id });
    })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
