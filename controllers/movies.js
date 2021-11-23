const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find(req.user._id)
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};


module.exports.createMovie = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Movie.create({ owner, ...req.body })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const id = req.params._id;
  Movie.findById(id)
    .orFail(() => new NotFoundError('Карточка с указанным _id не найдена'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        next(new ForbiddenError('Нельзя уладить чужую карточку'));
      } else {
        Movie.deleteOne(movie)
          .then(() => res.send({ data: movie }));
      }
    })
    .catch(next);
};
