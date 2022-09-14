const generateJWT = require('../helpers/generateJWT');
const bcryptjs = require('bcryptjs');
const { User } = require('../models');
const { verifyGoogleToken } = require('../helpers/verifyGoogleToken');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // verifica email o si usuario está activo
        const user = await User.findOne({ email });
        if (!user || !user.isActive) {
            return res.status(400).json({
                msg: 'Correo no registrado',
            });
        }
        // verifica contraseña
        const isValidPassword = bcryptjs.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta',
            });
        }
        // genera JWT
        const token = await generateJWT(user.id);
        res.status(200).json({
            msg: 'Login OK',
            user,
            token,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: 'Login ERROR',
        });
    }
};

const googleSignIn = async (req, res) => {
    const { id_token } = req.body;
    try {
        const { name, img, email } = await verifyGoogleToken(id_token);
        let user = await User.findOne({ email });
        if (!user) {
            const data = {
                name,
                email,
                password: 'signInWithGoogle',
                img,
                role: 'USER_ROLE',
                isGoogleAuth: true,
            };
            user = new User(data);
            await user.save();
        }
        if (!user.isActive) {
            return res.status(401).json({
                msg: 'Usuario eliminado',
            });
        }
        const token = await generateJWT(user.id);
        res.status(200).json({
            msg: 'Login OK',
            user,
            token,
        });
    } catch (err) {
        res.status(400).json({
            msg: 'Token de google no válido',
        });
    }
};

module.exports = {
    login,
    googleSignIn,
};
