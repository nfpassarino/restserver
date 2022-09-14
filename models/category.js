const { Schema, model } = require('mongoose');

const categorySchema = Schema({
    name: {
        type: String,
        required: [true, 'Nombre requerido'],
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

categorySchema.methods.toJSON = function () {
    const { __v, isActive, ...category } = this.toObject();
    return category;
};

module.exports = model('Category', categorySchema);
