const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/', async (req, res) => {
  const orders = await Order.find().exec();
  res.json(orders);
});

router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id).exec();
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
});

router.post('/', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
});

router.put('/:id', async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
});

router.delete('/:id', async (req, res) => {
  await Order.findByIdAndRemove(req.params.id);
  res.json({ message: 'Order deleted' });
});

module.exports = router;
