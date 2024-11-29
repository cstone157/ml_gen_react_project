const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const products = await Product.find().exec();
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).exec();
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

router.post('/', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

router.put('/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

router.delete('/:id', async (req, res) => {
  await Product.findByIdAndRemove(req.params.id);
  res.json({ message: 'Product deleted' });
});

module.exports = router;
