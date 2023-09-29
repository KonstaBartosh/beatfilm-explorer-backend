require('dotenv').config();

const {
  NODE_ENV, JWT_SECRET, DB_HOST, PORT,
} = process.env;

const DEV_SECRET = 'SECRETSECRETSECRET';
const DEV_DB_HOST = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const DEV_PORT = 3000;

const DB = NODE_ENV === 'production' && DB_HOST
  ? DB_HOST : DEV_DB_HOST;

const SERVER_PORT = NODE_ENV === 'production'
&& PORT ? PORT : DEV_PORT;

const SECRET_STRING = NODE_ENV === 'production'
&& JWT_SECRET ? JWT_SECRET : DEV_SECRET;

//* * сообщения об ошибках */
const registerSuccesMessage = 'Пользователь успешно зарегестрирован.';
const registerErrorMessage = 'При регистрации пользователя произошла ошибка.';
const emailUsedMessage = 'Пользователь с таким email уже существует.';
const wrongDataMessage = 'Неправильные почта или пароль';
const userNotFound = 'Пользователь не найден';
const updateProfileErrMessage = 'При обновлении профиля произошла ошибка';
const userAlreadyExist = 'Пользователь с таким email уже существует.';
const invalidDataError = 'Переданы некорректные данные';
const movieNotFoundMessage = 'Фильм не найден';
const deleteFilmPermissionError = 'Недостаточно прав для удаления фильма';
const authorizationTokenInvalidError = 'При авторизации произошла ошибка. Переданный токен некорректен';
const authorizationTokenFormatError = 'При авторизации произошла ошибка. Токен не передан или передан не в том формате';
const tooManyRequestsMessage = 'Слишком много запросов, пожалуйста попробуйте позже';
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
const LINK_REGEX = /^(http|https):\/\/(?:www\.)?[a-zA-Z0-9._~\-:?#[\]@!$&'()*+,/;=]{2,256}\.[a-zA-Z0-9./?#-]{2,}$/;

module.exports = {
  DB,
  SERVER_PORT,
  SECRET_STRING,
  EMAIL_REGEX,
  LINK_REGEX,
  registerSuccesMessage,
  registerErrorMessage,
  emailUsedMessage,
  wrongDataMessage,
  userNotFound,
  updateProfileErrMessage,
  userAlreadyExist,
  invalidDataError,
  movieNotFoundMessage,
  deleteFilmPermissionError,
  authorizationTokenInvalidError,
  authorizationTokenFormatError,
  tooManyRequestsMessage,
};
