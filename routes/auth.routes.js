const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { login, googleSignIn } = require('../controllers/auth.controller');

const router = Router();

router.post(
    '/login',
    [
        check('email', 'Correo no válido').isEmail(),
        check('password', 'Contraseña obligatoria').not().isEmpty(),
        check('password', 'Debe tener más de 6 caracteres').isLength({
            min: 6,
        }),
        validateFields,
    ],
    login
);

router.post(
    '/google',
    [
        check('id_token', 'Se necesita un id_token').not().isEmpty(),
        validateFields,
    ],
    googleSignIn
);

module.exports = router;
