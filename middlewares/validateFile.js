const validateFile = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).send('No hay archivos a subir');
    }
    next();
};

module.exports = {
    validateFile,
};
