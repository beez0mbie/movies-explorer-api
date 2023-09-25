const router = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/notFound');

const { login, logout, createUser } = require('../controllers/users');
const { signUp, signIn } = require('../utils/routerValidations');
const { resourceMessage } = require('../constants/messages');

router.post('/signup', celebrate(signUp), createUser);
router.post('/signin', celebrate(signIn), login);
router.get('/signout', logout);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError(resourceMessage.notFound));
});

module.exports = router;
