const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  movieNotFoundMessage,
  deleteFilmPermissionError,
  invalidDataError,
} = require('../helpers/config');

const createMovie = (req, res, next) => {
  const { _id } = req.user;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: _id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(invalidDataError));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie
    .find({ owner: userId })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

const deleteMovie = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .orFail(new NotFoundError(movieNotFoundMessage))
    .then((movie) => {
      if (req.user._id === movie.owner.toString()) {
        // Пользователь является владельцем карточки, можно удалить
        return movie.deleteOne();
      }
      throw new ForbiddenError(deleteFilmPermissionError);
    })
    .then((removedMovie) => res.send(removedMovie))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(invalidDataError));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
