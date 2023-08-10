const router = require('express').Router();
const rateLimit = require('express-rate-limit');

const { register, login } = require('../controllers/user');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const userRouter = require('./user');
const movieRouter = require('./movie');
const { registerValidation, loginValidation } = require('../middlewares/validation');

//* * ограничитель запросов */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Слишком много запросов, пожалуйста попробуйте позже',
});

//* * роуты не требующие авторизации */
router.post('/signup', authLimiter, registerValidation, register);
router.post('/signin', authLimiter, loginValidation, login);

//* * авторизация */
router.use(auth);

//* * роуты, которым авторизация нужна */
router.use('/users', userRouter);
router.use('/movies', movieRouter);

//* * Обработчик несуществующих маршрутов */
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена.'));
});

module.exports = router;
