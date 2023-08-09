const UnauthorizedError = require('../errors/UnauthorizedError');
const { verifyJwtToken } = require('../helpers/jwt');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Ошибка авторизации'));
  }
  //* * извлекаем токен */
  const token = authorization.replace('Bearer ', '');
  let payload;

  //* * верификация токена */
  try {
    payload = verifyJwtToken(token);
  } catch (err) {
    next(new UnauthorizedError('Ошибка авторизации'));
  }
  //* * записываем пейлоуд в объект запроса */
  req.user = payload;
  //* * пропускаем запрос дальше */
  next();
};

module.exports = auth;
