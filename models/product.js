const { Schema, model } = require('mongoose');

const productSchema = Schema({
    name: {
        type: String,
        required: [true, 'Nombre requerido'],
        unique: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    description: {
        type: String,
    },
    stock: {
        type: Number,
        default: 0,
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

productSchema.methods.toJSON = function () {
    const { __v, isActive, ...product } = this.toObject();
    return product;
};

module.exports = model('Product', productSchema);
