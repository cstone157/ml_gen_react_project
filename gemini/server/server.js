const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3000;

// MongoDB Connection (replace with your connection string)
mongoose.connect('mongodb://admin:pass@localhost:27017/mydatabase?authSource=admin', {
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Schemas
const supplySchema = new mongoose.Schema({
  name: String,
  costPerItem: Number,
  inStock: Number,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  inStock: Number,
  supplies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Supply' }],
});

const orderSchema = new mongoose.Schema({
  purchaserName: String,
  totalBill: Number,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

const Supply = mongoose.model('Supply', supplySchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

// Enable CORS for all origins (Insecure for Production!)
app.use(cors());

app.use(bodyParser.json());

// API Routes (Example - Expand for full CRUD)

//Supplies
app.get('/supplies', async (req, res) => {
    try {
      const supplies = await Supply.find({});
      res.json(supplies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.post('/supplies', async (req, res) => {
  try {
    const supply = new Supply(req.body);
    await supply.save();
    res.status(201).json(supply);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//Products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({}).populate('supplies');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find({}).populate('products');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});