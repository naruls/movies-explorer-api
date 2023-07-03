const mongoose = require('mongoose');
const validator = require('validator');

const {
  urlError,
} = require('../const/const');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 3000,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: urlError,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: urlError,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: urlError,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
});

module.exports = mongoose.model('movie', movieSchema);
