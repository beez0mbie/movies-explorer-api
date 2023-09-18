const MovieModel = require('../models/movie');
const NotFoundError = require('../errors/notFound');
const AuthenticationError = require('../errors/authenticationError');

const getMovies = (req, res, next) => MovieModel.find({})
  .then((movies) => res.send(movies))
  .catch(next);

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
  MovieModel.findOne({ movieId })
    .orFail(new NotFoundError('Фильма с таким ID не существует в базе'))
    .then((movie) => {
      if (movie.owner.toString() !== userId) {
        throw new AuthenticationError('Нет прав удалить данный фильм');
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
