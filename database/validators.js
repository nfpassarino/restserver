const { Role, User, Category, Product } = require('../models');

const isValidRole = async (role = '') => {
    const isExistRole = await Role.findOne({ role });
    if (!isExistRole)
        throw new Error(
            `El rol ${role} no se encuentra registrado en la base de datos`
        );
    return true;
};

const isValidUserEmail = async (email = '') => {
    const isUsedEmail = await User.findOne({ email });
    if (isUsedEmail)
        throw new Error(`El correo ${email} ya se encuentra registrado`);
    return true;
};

const isValidUserId = async (id = '') => {
    const user = await User.findById(id);
    if (!user || !user.isActive)
        throw new Error(`El id ${id} no se encuentra registrado`);
    return true;
};

const isValidCategoryId = async (id = '') => {
    const category = await Category.findById(id);
    if (!category || !category.isActive)
        throw new Error(`El id ${id} no se encuentra registrado`);
    return true;
};

const isValidProductId = async (id = '') => {
    const product = await Product.findById(id);
    if (!product || !product.isActive)
        throw new Error(`El id ${id} no se encuentra registrado`);
    return true;
};

const isValidCollection = async (validCollections = [], collection = '') => {
    const isValid = validCollections.includes(collection);
    if (!isValid) throw new Error(`Colección ${collection} no permitida`);
    return true;
};

module.exports = {
    isValidRole,
    isValidUserEmail,
    isValidUserId,
    isValidCategoryId,
    isValidProductId,
    isValidCollection,
};
