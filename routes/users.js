const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  updateUser,
  getUser,
} = require('../controllers/users');
const { userPatch } = require('../utils/routerValidations');

router.get('/me', getUser);
router.patch('/me', celebrate(userPatch), updateUser);

module.exports = router;
