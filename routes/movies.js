const movie = require('express').Router();
const { Movie, Id } = require('../middlewares/validator');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

movie.get('/movies', getMovies);
movie.post('/movies', Movie, createMovie);
movie.delete('/movies/:_id', Id, deleteMovie);

module.exports = movie;
