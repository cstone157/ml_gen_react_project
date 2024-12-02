// controllers/productController.js
// Import Product model
const Product = require('../models/productModel');
const Supply = require('../models/supplyModel');

// Create product
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: 'Error creating product' });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('supplies.supply');
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ message: 'Error getting products' });
    }
};

// Get product by id
exports.getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id).populate('supplies.supply');
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.status(200).json(product);
        }
    } catch (err) {
        res.status(400).json({ message: 'Error getting product' });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.status(200).json(product);
        }
    } catch (err) {
        res.status(400).json({ message: 'Error updating product' });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting product' });
    }
};

// Add supply to product
exports.addSupplyToProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const supplyId = req.body.supply;
        const quantityRequired = req.body.quantityRequired;
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            const supply = await Supply.findById(supplyId);
            if (!supply) {
                res.status(404).json({ message: 'Supply not found' });
            } else {
                product.supplies.push({ supply: supplyId, quantityRequired: quantityRequired });
                await product.save();
                res.status(200).json(product);
            }
        }
    } catch (err) {
        res.status(400).json({ message: 'Error adding supply to product' });
    }
};

// Remove supply from product
exports.removeSupplyFromProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const supplyId = req.body.supply;
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            const index = product.supplies.findIndex(supply => supply.supply.toString() === supplyId);
            if (index === -1) {
                res.status(404).json({ message: 'Supply not found in product' });
            } else {
                product.supplies.splice(index, 1);
                await product.save();
                res.status(200).json(product);
            }
        }
    } catch (err) {
        res.status(400).json({ message: 'Error removing supply from product' });
    }
};
