const UnauthorizedError = require('../errors/UnauthorizedError');
const { verifyJwtToken } = require('../helpers/jwt');

const authErrorMessage = 'При авторизации произошла ошибка. Переданный токен некорректен';
const authWronToken = 'При авторизации произошла ошибка. Токен не передан или передан не в том формате';

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(authWronToken));
  }
  //* * извлекаем токен */
  const token = authorization.replace('Bearer ', '');
  let payload;

  //* * верификация токена */
  try {
    payload = verifyJwtToken(token);
  } catch (err) {
    next(new UnauthorizedError(authErrorMessage));
  }
  //* * записываем пейлоуд в объект запроса */
  req.user = payload;
  //* * пропускаем запрос дальше */
  next();
};

module.exports = auth;
