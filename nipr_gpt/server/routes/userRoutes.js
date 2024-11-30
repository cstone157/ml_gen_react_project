// Import express
const express = require('express');
const router = express.Router();

// Import user controller
const userController = require('../controllers/userController');

// Create user
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.getUsers);

// Get user by id
router.get('/:id', userController.getUserById);

// Update user
router.put('/:id', userController.updateUser);

// Delete user
router.delete('/:id', userController.deleteUser);

// Export user routes
module.exports = router;
