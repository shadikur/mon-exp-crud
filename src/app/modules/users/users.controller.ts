import { Request, Response } from 'express';
import { UserSchema } from './users.zod';
import { UserModel } from './users.model';

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

    // Create the user in the database
    const user = new UserModel(userData);
    await user.save();

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
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single user by ID
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const user = await UserModel.findOne(
      { userId },
      {
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
      },
    );
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
    const users = await UserModel.find(
      {},
      {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    );

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

export const userController = {
  createUser,
  getSingleUser,
  getAllUsers,
};
