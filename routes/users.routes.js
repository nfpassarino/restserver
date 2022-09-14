const { Router } = require('express');
const { check } = require('express-validator');
const {
    validateFields,
    validateJWT,
    hasRole,
} = require('../middlewares/index');
const {
    getUsers,
    updateUser,
    createUser,
    deleteUser,
} = require('../controllers/users.controller');

const {
    isValidRole,
    isValidUserEmail,
    isValidUserId,
} = require('../database/validators');

const router = Router();

router.get('/', getUsers);
router.post(
    '/',
    [
        check('name', 'Nombre obligatorio').not().isEmpty(),
        check('password', 'Contraseña obligatoria').not().isEmpty(),
        check('password', 'Debe tener más de 6 letras').isLength({ min: 6 }),
        check('email', 'Email no válido').isEmail().custom(isValidUserEmail),
        //check('role', 'Rol inválido').isIn('ADMIN_ROLE', 'USER_ROLE'),
        check('role').custom(isValidRole),
        validateFields,
    ],
    createUser
);
router.put(
    '/:id',
    [
        check('id', 'ID no válido').isMongoId().custom(isValidUserId),
        check('password', 'Debe tener más de 6 letras').isLength({ min: 6 }),
        check('role').custom(isValidRole),
        validateFields,
    ],
    updateUser
);
router.delete(
    '/:id',
    [
        validateJWT,
        hasRole('ADMIN_ROLE'),
        check('id', 'ID no válido').isMongoId().custom(isValidUserId),
        validateFields,
    ],
    deleteUser
);

module.exports = router;
