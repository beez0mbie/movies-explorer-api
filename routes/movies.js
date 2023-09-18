const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { movieIdKey, postMovie } = require('../utils/routerValidations');

router.get('/', getMovies);
router.post('/', celebrate(postMovie), createMovie);
router.delete('/:movieId', celebrate(movieIdKey), deleteMovie);

module.exports = router;
