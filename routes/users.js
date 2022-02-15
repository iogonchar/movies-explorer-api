const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { updateUser, getUser } = require('../controllers/users');

router.get('/users/me', getUser);

router.patch(
  'users/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);

module.exports = router;
