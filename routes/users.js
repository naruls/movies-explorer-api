const user = require('express').Router();
const { Id, UpdateUser } = require('../middlewares/validator');
const {
  getUser,
  updateUser,
} = require('../controllers/users');

user.get('/users/me', Id, getUser);
user.patch('/users/me', UpdateUser, updateUser);

module.exports = user;
