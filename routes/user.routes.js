const { Router } = require('express');
const { check } = require('express-validator');
const {
    validateFields,
    validateJWT,
    hasRole,
} = require('../middlewares/index');
const {
    userGet,
    userPut,
    userPost,
    userDelete,
} = require('../controllers/user.controller');

const {
    isValidRole,
    isValidEmail,
    isValidId,
} = require('../database/validators');

const router = Router();

router.get('/', userGet);
router.post(
    '/',
    [
        check('name', 'Nombre obligatorio').not().isEmpty(),
        check('password', 'Contraseña obligatoria').not().isEmpty(),
        check('password', 'Debe tener más de 6 letras').isLength({ min: 6 }),
        check('email', 'Email no válido').isEmail().custom(isValidEmail),
        //check('role', 'Rol inválido').isIn('ADMIN_ROLE', 'USER_ROLE'),
        check('role').custom(isValidRole),
        validateFields,
    ],
    userPost
);
router.put(
    '/:id',
    [
        check('id', 'ID no válido').isMongoId().custom(isValidId),
        check('password', 'Debe tener más de 6 letras').isLength({ min: 6 }),
        check('role').custom(isValidRole),
        validateFields,
    ],
    userPut
);
router.delete(
    '/:id',
    [
        validateJWT,
        hasRole('ADMIN_ROLE'),
        check('id', 'ID no válido').isMongoId().custom(isValidId),
        validateFields,
    ],
    userDelete
);

module.exports = router;
