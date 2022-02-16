const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const createMovie = (req, res, next) => {
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

  Movie.create({
    owner: req.user._id,
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
  })
    .catch(() => {
      throw new BadRequestError('Переданные данные не прошли валидацию');
    })
    .then((movie) => res.status(200).send(movie))
    .catch(next);
};

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail(() => {
      throw new NotFoundError('Ни одного фильма не найдено');
    })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Фильм с указанным id не найден'))
    .then((movie) => {
      if (req.user._id.toString() === movie.owner.toString()) {
        return movie.remove()
          .then(() => res.status(200).send({ message: 'Фильм удалён' }));
      }
      throw new ForbiddenError('Недостаточно прав для удаления фильма');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Невалидный id фильма');
      }
      next(err);
    });
};

module.exports = { createMovie, getMovies, deleteMovie };
