const { Router } = require('express');
const {
    userGet,
    userPut,
    userPost,
    userDelete,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', userGet);
router.post('/', userPost);
router.put('/:id', userPut);
router.delete('/', userDelete);

module.exports = router;
