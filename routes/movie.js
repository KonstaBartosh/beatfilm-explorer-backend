const router = require('express').Router();

const { createMovie, getMovies, deleteMovie } = require('../controllers/movie');
const { validateNewMovie, validateUSerId } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', validateNewMovie, createMovie);
router.delete('/:id', validateUSerId, deleteMovie);

module.exports = router;
