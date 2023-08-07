const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Ошибка авторизации'));
  }
  //* * извлекаем токен */
  const token = authorization.replace('Bearer ', '');
  let payload;

  //* * верификация токена */
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    next(new UnauthorizedError('Ошибка авторизации'));
  }
  //* * записываем пейлоуд в объект запроса */
  req.user = payload;
  next(); //* * пропускаем запрос дальше */
};

module.exports = auth;
