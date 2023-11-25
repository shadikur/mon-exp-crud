import { Request, Response } from 'express';
import { UserSchema } from './users.zod';
import { UserModel } from './users.model';

export const createUser = async (req: Request, res: Response) => {
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

export const userController = {
  createUser,
};
