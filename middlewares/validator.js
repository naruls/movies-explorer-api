const { celebrate, Joi } = require('celebrate');

const isUrl = require('validator/lib/isURL');

const {
  urlError,
} = require('../const/const');

const Url = (value) => {
  if (isUrl(value)) {
    return value;
  }
  throw new Error(urlError);
};

const Id = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
});

const UpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const Movie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(100),
    director: Joi.string().required().min(2).max(100),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required().min(2).max(3000),
    image: Joi.string().required().custom(Url),
    trailer: Joi.string().required().custom(Url),
    thumbnail: Joi.string().required().custom(Url),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(2).max(200),
    nameEN: Joi.string().required().min(2).max(200),
  }),
});

const Login = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
});

const User = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  Id,
  UpdateUser,
  Movie,
  Login,
  User,
};
