const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  sellCost: Number,
  timeToBuild: Number,
  requiredSupplies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Supply' }]
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
