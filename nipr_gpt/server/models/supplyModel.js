// models/supplyModel.js
// Import mongoose
const mongoose = require('mongoose');

// Define supply schema
const supplySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    inStock: { type: Number, required: true, min: 0 },
    cost: { type: Number, required: true, min: 0 }
});

// Export supply model
module.exports = mongoose.model('Supply', supplySchema);
