const { Schema, model } = require('mongoose');

const roleSchema = Schema({
    role: {
        type: String,
        required: [true, 'Rol requerido'],
    },
});

module.exports = model('Role', roleSchema);
