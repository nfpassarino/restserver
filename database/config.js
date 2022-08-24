const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('DB conectada');
    } catch (err) {
        throw new Error('Error inicializando la base de datos\n' + err);
    }
};

module.exports = {
    dbConnection,
};
