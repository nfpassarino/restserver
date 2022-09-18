const { Router } = require('express');
const { check } = require('express-validator');
const {
    uploadFiles,
    updateImage,
    getImage,
} = require('../controllers/uploads.controller');
const { isValidCollection } = require('../database/validators');
const { validateFields, validateFile } = require('../middlewares/');

const router = Router();

const validCollections = ['Usuarios', 'Productos'];

router.get(
    '/:collection/:id',
    [
        check('id', 'ID no válido').isMongoId(),
        check('collection').custom((c) =>
            isValidCollection(validCollections, c)
        ),
        validateFields,
    ],
    getImage
);

router.post('/', validateFile, uploadFiles);

router.put(
    '/:collection/:id',
    [
        validateFile,
        check('id', 'ID no válido').isMongoId(),
        check('collection').custom((c) =>
            isValidCollection(validCollections, c)
        ),
        validateFields,
    ],
    updateImage
);

module.exports = router;
