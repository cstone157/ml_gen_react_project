const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  deadline: Date,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  supplies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Supply' }]
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
