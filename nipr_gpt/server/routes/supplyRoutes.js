// routes/supplyRoutes.js
const express = require('express');
const router = express.Router();

const supplyController = require('../controllers/supplyController');

// Create supply
router.post('/', supplyController.createSupply);

// Get all supplies
router.get('/', supplyController.getSupplies);

// Get supply by id
router.get('/:id', supplyController.getSupplyById);

// Update supply
router.put('/:id', supplyController.updateSupply);

// Delete supply
router.delete('/:id', supplyController.deleteSupply);

module.exports = router;
