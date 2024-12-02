// Import required modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://root:password@localhost:27017/mydatabase?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Import routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
const supplyRoutes = require('./routes/supplyRoutes');
app.use('/api/supplies', supplyRoutes);
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Start server
const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
