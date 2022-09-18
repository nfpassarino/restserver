const path = require('path');
const fs = require('fs');
const { uploadFile } = require('../helpers/uploadFile');

const { getCollectionModel } = require('../helpers/getModelById');

const uploadFiles = async (req, res) => {
    try {
        const filePath = await uploadFile(req.files);
        res.json({
            path: filePath,
        });
    } catch (msg) {
        res.status(400).json({ msg });
    }
};

const getImage = async (req, res) => {
    const { collection, id } = req.params;
    let model = await getModelById(collection, id);
    if (model.img) {
        const pathImg = path.join(
            __dirname,
            '../uploads',
            collection,
            model.img
        );
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg);
        }
    }
    res.json({ msg: 'Imagen no encontrada' });
};

const updateImage = async (req, res) => {
    const { collection, id } = req.params;
    let model = await getModelById(collection, id);
    // limpiar archivos anteriores
    if (model.img) {
        const pathImg = path.join(
            __dirname,
            '../uploads',
            collection,
            model.img
        );
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }
    }
    // subir nuevo archivo
    const name = await uploadFile(
        req.files,
        ['png', 'jpeg', 'jpg', 'gif'],
        collection
    );
    model.img = name;
    await model.save();
    res.json(model);
};

module.exports = {
    uploadFiles,
    getImage,
    updateImage,
};
