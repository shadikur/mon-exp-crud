// // Check if a user exists by ID (used in the update and delete methods)
// TODO

import { UserModel } from './users.model';

const checkExistingUser = async (userId: number) => {
  const existingUser = await UserModel.findOne({ userId });
  if (existingUser) {
    return true;
  }
};

export const UserServices = {
  checkExistingUser,
};
