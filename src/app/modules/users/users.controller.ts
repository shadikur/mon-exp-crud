import { Request, Response } from 'express';
import { OrderSchema, UserSchema } from './users.zod';
import { UserModel } from './users.model';
import { UserServices } from './users.services';

// Create a new user
const createUser = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const parseResult = UserSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res
        .status(400)
        .json({ message: 'Invalid request data', errors: parseResult.error });
    }

    const userData = parseResult.data;

    // Ensure userId is defined
    if (userData.userId === undefined) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    // Check if the user already exists
    if (await UserServices.checkExistingUser(userData.userId)) {
      return res.status(409).json({
        success: false,
        message: 'User already exists',
        error: {
          code: 409,
          description: 'User already exists!',
        },
      });
    }

    // Create the user in the database
    const user = await UserServices.createUserOnDB(userData);

    // Prepare the response, omitting the password field
    const response = {
      userId: user.userId,
      username: user.username,
      fullName: user.fullName,
      age: user.age,
      email: user.email,
      isActive: user.isActive,
      hobbies: user.hobbies,
      address: user.address,
    };

    // Send the response
    return res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single user by ID
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await UserServices.getSingleUserFromDB(userId);

    // If the user is not found, return a 404
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    // Send the successful response
    return res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: {
        code: 500,
        description: error || 'Internal Server Error',
      },
    });
  }
};

// Get all users

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserServices.getAllUsersFromDB();
    // Check if users array is empty
    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No users found',
        error: {
          code: 404,
          description: 'No users found',
        },
      });
    }

    // Send the successful response
    return res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: {
        code: 500,
        description: error || 'Internal Server Error',
      },
    });
  }
};

// Update a user by ID
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    // Validate the request body
    const parseResult = UserSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res
        .status(400)
        .json({ message: 'Invalid request data', errors: parseResult.error });
    }

    const userData = parseResult.data;

    // Check if the user exists
    if (!(await UserServices.checkExistingUser(userId))) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    // Update the user in the database
    const updatedUser = await UserServices.updateUserOnDB(userId, userData);

    // Send the successful response
    return res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: {
        code: 500,
        description: error || 'Internal Server Error',
      },
    });
  }
};

// Delete a user by ID
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    // Check if the user exists
    if (!(await UserServices.checkExistingUser(userId))) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    // Delete the user from the database
    await UserModel.deleteOne({ userId });

    // Send a success response
    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: {
        code: 500,
        description: error || 'Internal Server Error',
      },
    });
  }
};

//  Create a new order for a user
const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    // Validate the request body
    const parseResult = OrderSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res
        .status(400)
        .json({ message: 'Invalid request data', errors: parseResult.error });
    }

    const orderData = parseResult.data;

    // Check if the user exists
    if (!(await UserServices.checkExistingUser(userId))) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    // Create the order in the database
    await UserServices.createOrderOnDB(userId, orderData);

    // Send the successful response
    return res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Get all orders for a user
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    // Find the user by userId
    const user = await UserServices.getAllOrdersFromDB(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    // If the user is found but has no orders
    if (user?.orders?.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No orders found for this user',
        error: {
          code: 404,
          description: 'No orders found!',
        },
      });
    }

    // Send back the user's orders
    return res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: user.orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: {
        code: 500,
        description: error || 'Internal Server Error',
      },
    });
  }
};

// Get the total price of all orders for a user
const getTotalOrderAmount = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    const result = await UserModel.aggregate([
      { $match: { userId } },
      { $unwind: '$orders' },
      {
        $group: {
          _id: '$userId',
          totalPrice: {
            $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
          },
        },
      },
    ]);

    //console.log(result);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found or no orders for this user',
        error: {
          code: 404,
          description: 'User not found or no orders',
        },
      });
    }

    const { totalPrice } = result[0];

    return res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: {
        code: 500,
        description: error || 'Internal Server Error',
      },
    });
  }
};

export const userController = {
  createUser,
  getSingleUser,
  getAllUsers,
  updateUser,
  deleteUser,
  createOrder,
  getAllOrders,
  getTotalOrderAmount,
};
