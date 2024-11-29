const express = require('express');
const router = express.Router();
const Supply = require('../models/Supply');

router.get('/', async (req, res) => {
  const supplies = await Supply.find().exec();
  res.json(supplies);
});

router.get('/:id', async (req, res) => {
  const supply = await Supply.findById(req.params.id).exec();
  if (!supply) {
    return res.status(404).json({ message: 'Supply not found' });
  }
  res.json(supply);
});

router.post('/', async (req, res) => {
  const supply = new Supply(req.body);
  await supply.save();
  res.json(supply);
});

router.put('/:id', async (req, res) => {
  const supply = await Supply.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!supply) {
    return res.status(404).json({ message: 'Supply not found' });
  }
  res.json(supply);
});

router.delete('/:id', async (req, res) => {
  await Supply.findByIdAndRemove(req.params.id);
  res.json({ message: 'Supply deleted' });
});

module.exports = router;
