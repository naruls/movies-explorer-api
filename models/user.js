const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const {
  emailError,
  emailPasswordError,
} = require('../const/const');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxLength: 30,
    role: { type: String, default: 'Ваше имя' },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: emailError,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) { //eslint-disable-line
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(emailPasswordError));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(emailPasswordError));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
