// models/productModel.js
// Import mongoose
const mongoose = require('mongoose');

// Define product schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    inStock: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, required: true, min: 0 },
    supplies: [
        {
            supply: { type: mongoose.Schema.Types.ObjectId, ref: 'Supply' },
            quantityRequired: { type: Number, required: true, min: 0 }
        }
    ]
});

// Export product model
module.exports = mongoose.model('Product', productSchema);
