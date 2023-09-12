const bcrypt = require('bcryptjs');
//* * импортируем модель пользователя */
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { createJwtToken } = require('../helpers/jwt');
const {
  registerSuccesMessage,
  registerErrorMessage,
  emailUsedMessage,
  wrongDataMessage,
  userNotFound,
  updateProfileErrMessage,
  userAlreadyExist,
} = require('../helpers/config');

//* * Регистрация, POST-запрос на URL /users */
const register = (req, res, next) => {
  const { name, email, password } = req.body;

  //* * хэшируем пароль при отправке в БД + сложность соли */
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then(() => res.status(201).send({ message: registerSuccesMessage }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(registerErrorMessage));
      } else if (err.code === 11000) {
        next(new ConflictError(emailUsedMessage));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .orFail(new UnauthorizedError(wrongDataMessage))
    .then((user) => bcrypt.compare(password, user.password).then((isValidPassword) => {
      if (!isValidPassword) {
        throw new UnauthorizedError(wrongDataMessage);
      }

      const token = createJwtToken(user._id);

      return res.status(200).send({ token });
    }))
    .catch((err) => next(err));
};

//* * сработает при GET-запросе на URL /users */
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

//* * GET-запрос на URL /users/me */
const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(userNotFound))
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => next(err));
};

//* * PATCH-запрос на URL /users/me */
const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    // Передадим объект опций:
    {
      new: true,
      runValidators: true,
    },
  )
    // обработчик then получит на вход обновлённую запись
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(updateProfileErrMessage));
      } else if (err.code === 11000) {
        next(new ConflictError(userAlreadyExist));
      } else {
        next(err);
      }
    });
};

module.exports = {
  login,
  getUsers,
  getUserInfo,
  register,
  updateUser,
};
