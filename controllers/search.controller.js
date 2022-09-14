const { Category, Product, User } = require("../models");

const { ObjectId } = require("mongoose").Types;

const allowedCollections = ["categories", "products", "roles", "users"];

const search = (req, res) => {
    const { collection, query } = req.params;
    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${allowedCollections}`,
        });
    }
    switch (collection) {
        case "categories":
            searchCategories(query, res);
            break;
        case "products":
            searchProducts(query, res);
            break;
        case "users":
            searchUsers(query, res);
            break;
        default:
            res.status(500).json({
                msg: "Búsqueda no implementada",
            });
    }
    res.json({
        collection,
        query,
    });
};

const searchCategories = async (query, res) => {
    const isMongoId = ObjectId.isValid(query);
    if (isMongoId) {
        const category = await Category.findById(query);
        return res.json({
            results: category ? [category] : [],
        });
    }
    const regex = new RegExp(query, "i");
    const categories = await Category.find({
        $and: [{ name: regex }, { isActive: true }],
    });
    res.json({
        results: categories,
    });
};

const searchProducts = async (query, res) => {
    const isMongoId = ObjectId.isValid(query);
    if (isMongoId) {
        const product = await Product.findById(query);
        return res.json({
            results: product ? [product] : [],
        });
    }
    const regex = new RegExp(query, "i");
    const products = await Product.find({
        $or: [{ name: regex }, { description: regex }],
        $and: [{ isActive: true }],
    });
    res.json({
        results: products,
    });
};

const searchUsers = async (query, res) => {
    const isMongoId = ObjectId.isValid(query);
    if (isMongoId) {
        const user = await User.findById(query);
        return res.json({
            results: user ? [user] : [],
        });
    }
    const regex = new RegExp(query, "i");
    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ isActive: true }],
    });
    res.json({
        results: users,
    });
};

module.exports = {
    search,
};
