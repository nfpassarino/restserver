const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req, res, next) => {
    const token = req.header('auth');
    if (!token)
        return res.status(401).json({
            msg: 'No se encuentra token en la petición',
        });
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const authUser = await User.findById(uid);
        if (!authUser || !authUser.isActive)
            return res.status(401).json({
                msg: 'Token no válido',
            });
        req.authUser = authUser;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: 'Token no válido',
        });
    }
};

module.exports = {
    validateJWT,
};
