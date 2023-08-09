const router = require('express').Router();

const { createMovie, getMovies, deleteMovie } = require('../controllers/movie');
const { validateNewMovie } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', validateNewMovie, createMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
