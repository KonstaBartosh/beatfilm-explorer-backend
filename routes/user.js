const router = require('express').Router();

const { getUserInfo, getUsers, updateUser } = require('../controllers/user');
const { validateUpdateUser } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.patch('/me', validateUpdateUser, updateUser);

module.exports = router;
