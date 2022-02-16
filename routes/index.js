const router = require('express').Router();
const auth = require('../middlewares/auth');
const moviesRoutes = require('./movies');
const usersRoutes = require('./users');
const appRoutes = require('./app');
const NotFoundError = require('../errors/NotFoundError');

router.use('/', appRoutes);
router.use('/', auth);
router.use('/', usersRoutes);
router.use('/', moviesRoutes);
router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
