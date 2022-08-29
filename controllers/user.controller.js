const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const userGet = async (req, res) => {
    const { offset = 0, limit = 10 } = req.query;
    const userActiveQuery = { isActive: true };
    const [total, users] = await Promise.all([
        User.countDocuments(userActiveQuery),
        User.find(userActiveQuery).skip(Number(offset)).limit(Number(limit)),
    ]);
    res.status(200).json({
        total,
        users,
    });
};

const userPost = async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();
    res.status(200).json(user);
};

const userPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, email, ...data } = req.body;
    if (password) {
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, data);
    res.status(200).json(user);
};

const userDelete = async (req, res) => {
    const { id } = req.params;
    const userInactiveQuery = { isActive: false };
    const user = await User.findByIdAndUpdate(id, userInactiveQuery);
    const authUser = req.authUser;
    res.status(200).json({ user, authUser });
};

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
};
