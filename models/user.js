const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Nombre requerido'],
    },
    mail: {
        type: String,
        required: [true, 'Email requerido'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Contraseña requerida'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'Rol requerido'],
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isGoogleAuth: {
        type: Boolean,
        default: false,
    },
});

userSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
};

module.exports = model('User', userSchema);
