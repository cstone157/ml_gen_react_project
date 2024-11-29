const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://root:password@localhost:27017/supply-chain-api?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true });

const suppliesRouter = require('./routes/supplies');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');

app.use(cors());
app.use(express.json());
app.use('/supplies', suppliesRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
