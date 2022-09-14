const bcryptjs = require('bcryptjs');
const { User } = require('../models');

const getUsers = async (req, res) => {
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

const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();
    res.status(201).json(user);
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, email, ...data } = req.body;
    if (password) {
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(user);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const userInactiveQuery = { isActive: false };
    const user = await User.findByIdAndUpdate(id, userInactiveQuery, {
        new: true,
    });
    const authUser = req.authUser;
    res.status(200).json({ user, authUser });
};

module.exports = {
    getUsers,
    updateUser,
    createUser,
    deleteUser,
};
