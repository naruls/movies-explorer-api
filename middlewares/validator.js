const { celebrate, Joi } = require('celebrate');

const result = new RegExp('^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?'); //eslint-disable-line

const Url = (value) => {
  if (result.test(value)) {
    return value;
  }
  throw new Error('Некорректный Url');
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
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required().min(2).max(1000),
    image: Joi.string().required().custom(Url),
    trailer: Joi.string().required().custom(Url),
    thumbnail: Joi.string().required().custom(Url),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(2).max(50),
    nameEN: Joi.string().required().min(2).max(50),
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
