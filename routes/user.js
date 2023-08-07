const router = require('express').Router();

const { getUserInfo, getUsers, updateUser } = require('../controllers/user');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.patch('/me', updateUser);

module.exports = router;
