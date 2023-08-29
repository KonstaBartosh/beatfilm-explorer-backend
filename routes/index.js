const router = require('express').Router();

const { register, login } = require('../controllers/user');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const userRouter = require('./user');
const movieRouter = require('./movie');
const { registerValidation, loginValidation } = require('../middlewares/validation');
const authLimiter = require('../helpers/rate-limiter');

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
