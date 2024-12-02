// routes/productRoutes.js
const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

// Create product
router.post('/', productController.createProduct);

// Get all products
router.get('/', productController.getProducts);

// Get product by id
router.get('/:id', productController.getProductById);

// Update product
router.put('/:id', productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

// Add supply to product
router.post('/:id/supplies', productController.addSupplyToProduct);

// Remove supply from product
router.delete('/:id/supplies', productController.removeSupplyFromProduct);

module.exports = router;
