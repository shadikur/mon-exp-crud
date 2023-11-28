// // Check if a user exists by ID (used in the update and delete methods)
// TODO

import { UserModel } from './users.model';

const checkExistingUser = async (userId: number) => {
  const existingUser = await UserModel.findOne({ userId });
  if (existingUser) {
    return true;
  }
};

const createUserOnDB = async (user: object) => {
  const newUser = await UserModel.create(user);
  return newUser;
};

const getSingleUserFromDB = async (userId: number) => {
  const user = await UserModel.findOne(
    { userId },
    { password: 0, __v: 0, orders: 0 },
  );
  return user;
};

const getAllUsersFromDB = async () => {
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
  return users;
};

const updateUserOnDB = async (userId: number, user: object) => {
  const updatedUser = await UserModel.findOneAndUpdate({ userId }, user, {
    new: true,
  });
  return updatedUser;
};

const deleteUserFromDB = async (userId: number) => {
  await UserModel.deleteOne({ userId });
};

const createOrderOnDB = async (userId: number, order: object) => {
  const updatedUser = await UserModel.findOneAndUpdate(
    { userId },
    { $push: { orders: order } },
    { new: true },
  );
  return updatedUser;
};

const getAllOrdersFromDB = async (userId: number) => {
  const orders = await UserModel.findOne({ userId }, { orders: 1 });
  return orders;
};

export const UserServices = {
  checkExistingUser,
  createUserOnDB,
  getSingleUserFromDB,
  getAllUsersFromDB,
  updateUserOnDB,
  deleteUserFromDB,
  createOrderOnDB,
  getAllOrdersFromDB,
};
