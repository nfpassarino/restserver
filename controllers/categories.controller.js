const { Category } = require('../models');

const getCategories = async (req, res) => {
    const { offset = 0, limit = 10 } = req.query;
    const categoryActiveQuery = { isActive: true };
    const [total, categories] = await Promise.all([
        Category.countDocuments(categoryActiveQuery),
        Category.find(categoryActiveQuery)
            .populate('user', 'name')
            .skip(Number(offset))
            .limit(Number(limit)),
    ]);
    res.status(200).json({
        total,
        categories,
    });
};

const getCategory = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id).populate('user', 'name');
    res.status(200).json(category);
};

const createCategory = async (req, res) => {
    try {
        const name = req.body.name.toUpperCase();
        const categoryDB = await Category.findOne({ name });
        if (categoryDB) {
            return res.status(400).json({
                msg: `Ya existe la categoría ${name}`,
            });
        }
        const data = {
            name,
            user: req.authUser._id,
        };
        const category = new Category(data);
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({
            msg: 'Error creando categoría',
        });
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const name = req.body.name.toUpperCase();
    const data = {
        name,
        user: req.authUser._id,
    };
    const category = await Category.findByIdAndUpdate(id, data, {
        new: true,
    }).populate('user', 'name');
    res.status(200).json(category);
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const data = {
        isActive: false,
        user: req.authUser._id,
    };
    const category = await Category.findByIdAndUpdate(id, data, {
        new: true,
    }).populate('user', 'name');
    res.status(200).json(category);
};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};
