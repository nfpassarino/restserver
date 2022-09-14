const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT, validateFields } = require('../middlewares');
const { isValidProductId, isValidCategoryId } = require('../database/validators');
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/products.controller');

const router = Router();

// obtener todas productos :: public
router.get('/', getProducts);

// obtener un producto por id :: public
router.get(
    '/:id',
    [
        check('id', 'ID no válido').isMongoId().custom(isValidProductId),
        validateFields,
    ],
    getProduct
);

// crear producto :: private (auth user)
router.post(
    '/',
    [
        validateJWT,
        check('name', 'Nombre requerido').not().isEmpty(),
        check('category', 'Debe ser un id de Mongo').isMongoId().custom(isValidCategoryId),
        validateFields,
    ],
    createProduct
);

// actualizar producto :: private (auth user)
router.put(
    '/:id',
    [
        validateJWT,
        check('id', 'ID no válido').isMongoId().custom(isValidProductId),
        check('name', 'Nombre requerido').not().isEmpty(),
        validateFields,
    ],
    updateProduct
);

// eliminar producto :: private (admin)
router.delete(
    '/:id',
    [
        validateJWT,
        check('id', 'ID no válido').isMongoId().custom(isValidProductId),
        validateFields,
    ],
    deleteProduct
);

module.exports = router;
