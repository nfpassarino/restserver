const hasRole = (...roles) => {
    return (req, res, next) => {
        if (!req.authUser) {
            return res.status(500).json({
                msg: 'Se verifica rol sin validar el token antes',
            });
        }
        const { role } = req.authUser;
        if (!roles.includes(role)) {
            return res.status(401).json({
                msg: `Se requiere uno de estos roles: ${roles}`,
            });
        }

        next();
    };
};

module.exports = {
    hasRole,
};
