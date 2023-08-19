const router = require('express').Router();

const { Login, User } = require('../middlewares/validator');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const users = require('./users');
const movies = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

const {
  defunctError,
} = require('../const/const');

router.post('/signin', Login, login);
router.post('/signup', User, createUser);

router.use(auth);

router.use('/', users);

router.use('/', movies);

router.all('*', (req, res, next) => {
  next(new NotFoundError(defunctError));
});

module.exports = router;
