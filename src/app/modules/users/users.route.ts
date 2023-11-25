import express from 'express';
import { userController } from './users.controller';

const router = express.Router();

// Endpoint to create a new user
router.post('/users', userController.createUser);

// // Endpoint to retrieve a specific user by ID
router.get('/users/:userId', userController.getSingleUser);

// // Endpoint to update a user by ID
// router.put('/users/:userId', userController.updateUser);

// // Endpoint to delete a user by ID
// router.delete('/users/:userId', userController.deleteUser);

// // Endpoint to retrieve a list of all users
router.get('/users', userController.getAllUsers);

// // Order management endpoints
// // Endpoint to create a new order
// router.put('/users/:userId/orders', userController.createOrder);

// // Endpoint to retrieve all orders for a user
// router.get('/users/:userId/orders', userController.getAllOrders);

// // Endpoint to calculate the total price of all orders for a user
// router.get(
//   '/users/:userId/orders/total-price',
//   userController.getTotalOrderAmount,
// );

export const UserRoutes = router;
