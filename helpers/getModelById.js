const { User, Product } = require('../models');

const getModelById = async (collection = '', id = '') => {
    let model;
    switch (collection) {
        case 'Usuarios':
            model = await User.findById(id);
            if (!model)
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`,
                });
            break;
        case 'Productos':
            model = await Product.findById(id);
            if (!model)
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`,
                });
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }
};

module.exports = {
    getModelById,
};
