const router = require('express').Router();

const { register, login } = require('../controllers/user');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const userRouter = require('./user');
const movieRouter = require('./movie');

//* * роуты не требующие авторизации */
router.post('/signup', register);
router.post('/signin', login);

//* * авторизация */
router.use(auth);

//* * роуты, которым авторизация нужна */
router.use('/users', userRouter);
router.use('/movies', movieRouter);

//* * Обработчик несуществующих маршрутов */
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
