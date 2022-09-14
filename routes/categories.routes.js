const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT, validateFields } = require('../middlewares');
const { isValidCategoryId } = require('../database/validators');
const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/categories.controller');

const router = Router();

// obtener todas las categorías :: public
router.get('/', getCategories);

// obtener una categoría por id :: public
router.get(
    '/:id',
    [
        check('id', 'ID no válido').isMongoId().custom(isValidCategoryId),
        validateFields,
    ],
    getCategory
);

// crear categoría :: private (auth user)
router.post(
    '/',
    [
        validateJWT,
        check('name', 'Nombre requerido').not().isEmpty(),
        validateFields,
    ],
    createCategory
);

// actualizar categoría :: private (auth user)
router.put(
    '/:id',
    [
        validateJWT,
        check('id', 'ID no válido').isMongoId().custom(isValidCategoryId),
        check('name', 'Nombre requerido').not().isEmpty(),
        validateFields,
    ],
    updateCategory
);

// eliminar categoría :: private (admin)
router.delete(
    '/:id',
    [
        validateJWT,
        check('id', 'ID no válido').isMongoId().custom(isValidCategoryId),
        validateFields,
    ],
    deleteCategory
);

module.exports = router;
