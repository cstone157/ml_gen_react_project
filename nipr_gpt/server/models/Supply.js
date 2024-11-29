const mongoose = require('mongoose');

const SupplySchema = new mongoose.Schema({
  name: String,
  costPerSupply: Number,
  currentNumberInStock: Number
});

const Supply = mongoose.model('Supply', SupplySchema);

module.exports = Supply;
