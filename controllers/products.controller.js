const { Product } = require('../models');

const getProducts = async (req, res) => {
    const { offset = 0, limit = 10 } = req.query;
    const productActiveQuery = { isActive: true };
    const [total, products] = await Promise.all([
        Product.countDocuments(productActiveQuery),
        Product.find(productActiveQuery)
            .populate('user', 'name')
            .skip(Number(offset))
            .limit(Number(limit)),
    ]);
    res.status(200).json({
        total,
        products,
    });
};

const getProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('user', 'name');
    res.status(200).json(product);
};

const createProduct = async (req, res) => {
    try {
        const { name, price, category, description, stock } = req.body;
        const productDB = await Product.findOne({ name });
        if (productDB) {
            return res.status(400).json({
                msg: `Ya existe el producto ${name}`,
            });
        }
        const data = {
            name,
            price,
            category,
            description,
            stock,
            user: req.authUser._id,
        };
        const product = new Product(data);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({
            msg: 'Error creando producto',
        });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {isActive, user, ...data} = req.body;
    data.user = req.authUser._id;
    const product = await Product.findByIdAndUpdate(id, data, {
        new: true,
    }).populate('user', 'name');
    res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const data = {
        isActive: false,
        user: req.authUser._id,
    };
    const product = await Product.findByIdAndUpdate(id, data, {
        new: true,
    }).populate('user', 'name');
    res.status(200).json(product);
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
