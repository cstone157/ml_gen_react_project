// controllers/supplyController.js
// Import Supply model
const Supply = require('../models/supplyModel');

// Create supply
exports.createSupply = async (req, res) => {
    try {
        const supply = new Supply(req.body);
        await supply.save();
        res.status(201).json(supply);
    } catch (err) {
        res.status(400).json({ message: 'Error creating supply' });
    }
};

// Get all supplies
exports.getSupplies = async (req, res) => {
    try {
        const supplies = await Supply.find();
        res.status(200).json(supplies);
    } catch (err) {
        res.status(400).json({ message: 'Error getting supplies' });
    }
};

// Get supply by id
exports.getSupplyById = async (req, res) => {
    try {
        const id = req.params.id;
        const supply = await Supply.findById(id);
        if (!supply) {
            res.status(404).json({ message: 'Supply not found' });
        } else {
            res.status(200).json(supply);
        }
    } catch (err) {
        res.status(400).json({ message: 'Error getting supply' });
    }
};

// Update supply
exports.updateSupply = async (req, res) => {
    try {
        const id = req.params.id;
        const supply = await Supply.findByIdAndUpdate(id, req.body, { new: true });
        if (!supply) {
            res.status(404).json({ message: 'Supply not found' });
        } else {
            res.status(200).json(supply);
        }
    } catch (err) {
        res.status(400).json({ message: 'Error updating supply' });
    }
};

// Delete supply
exports.deleteSupply = async (req, res) => {
    try {
        const id = req.params.id;
        await Supply.findByIdAndDelete(id);
        res.status(200).json({ message: 'Supply deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting supply' });
    }
};
