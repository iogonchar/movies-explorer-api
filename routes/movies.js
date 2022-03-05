const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');

router.get('/movies', getMovies);

router.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(/^https?:\/\/(www\.)?[\dA-Za-z.-]+\.([a-z.]{2,6})(\/([\w]{1,}))*\/?/),
      trailerLink: Joi.string().required().pattern(/^https?:\/\/(www\.)?[\dA-Za-z.-]+\.([a-z.]{2,6})(\/([\w]{1,}))*\/?/),
      thumbnail: Joi.string().required().pattern(/^https?:\/\/(www\.)?[\dA-Za-z.-]+\.([a-z.]{2,6})(\/([\w]{1,}))*\/?/),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

router.delete(
  '/movies/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
