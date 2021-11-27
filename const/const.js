const mongodbMovies = 'mongodb://localhost:27017/moviesdb';
const crashTestError = 'Сервер сейчас упадёт';
const validationConstError = 'Переданы некорректные данные при создании фильма';
const notFoundConstError = 'Фильм с указанным _id не найдена';
const forbiddenConstError = 'Нельзя уладить чужую фильм';

const notFoundConstUserError = 'Нет пользователя с таким id';
const castConstGetUserError = 'Некорректный id';
const validationConstUserError = 'Переданы некорректные данные при обновлении профиля';
const castConstUpdateUserError = 'Переданы некорректные данные при обновлении профиля';
const mongoConstUserError = 'Такой Email уже занят';
const loginReply = 'Авторизация прошла успешно';
const loginConstUserError = 'Неверный логин либо пароль';

const loginAuthError = 'Необходимо авторизироваться';

const handlerError = 'На сервере произошла ошибка';

const urlError = 'Некорректный Url';

const emailError = 'Введён некорректный email';
const emailPasswordError = 'Неправильные почта или пароль';

const defunctError = 'Ресурс не найден';

module.exports = {
  mongodbMovies,
  crashTestError,
  validationConstError,
  notFoundConstError,
  forbiddenConstError,
  notFoundConstUserError,
  castConstGetUserError,
  validationConstUserError,
  castConstUpdateUserError,
  mongoConstUserError,
  loginReply,
  loginConstUserError,
  loginAuthError,
  handlerError,
  urlError,
  emailError,
  emailPasswordError,
  defunctError,
};
