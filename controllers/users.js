const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');
const ValidationError = require('../errors/ValidationError');
const MongoError = require('../errors/MongoError');
const LoginError = require('../errors/LoginError');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  notFoundConstUserError,
  castConstGetUserError,
  validationConstUserError,
  castConstUpdateUserError,
  mongoConstUserError,
  loginReply,
  loginConstUserError,
} = require('../const/const');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError(notFoundConstUserError))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError(castConstGetUserError));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id,
    { name, email },
    { new: true, runValidators: true })
    .orFail(() => new NotFoundError(notFoundConstUserError))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(validationConstUserError));
      } else if (err.name === 'CastError') {
        next(new CastError(castConstUpdateUserError));
      } else if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new MongoError(mongoConstUserError));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password, //eslint-disable-line
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then(() => res.status(200).send({
      data: {
        name,
        email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(validationConstUserError));
      } else if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new MongoError(mongoConstUserError));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('token', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    })
    .catch(() => {
      next(new LoginError(loginConstUserError));
    });
};
