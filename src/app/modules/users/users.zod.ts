import { z } from 'zod';
//import { FullName, Address, Order, User } from './users.interface';

export const FullNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

export const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

export const OrderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const UserSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: FullNameSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressSchema,
  orders: z.array(OrderSchema),
});

export default UserSchema;
