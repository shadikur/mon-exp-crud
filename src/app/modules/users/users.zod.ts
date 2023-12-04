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
  userId: z.number().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  fullName: FullNameSchema.optional(),
  age: z.number().optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).optional(),
  address: AddressSchema.optional(),
  orders: z.array(OrderSchema).optional(),
});

export default UserSchema;
