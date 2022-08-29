const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
    const isExistRole = await Role.findOne({ role });
    if (!isExistRole)
        throw new Error(
            `El rol ${role} no se encuentra registrado en la base de datos`
        );
};

const isValidEmail = async (email = '') => {
    const isUsedEmail = await User.findOne({ email });
    if (isUsedEmail)
        throw new Error(`El correo ${email} ya se encuentra registrado`);
};

const isValidId = async (id = '') => {
    const isExistId = await User.findById(id);
    if (!isExistId) throw new Error(`El id ${id} no se encuentra registrado`);
};

module.exports = {
    isValidRole,
    isValidEmail,
    isValidId,
};
