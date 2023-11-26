import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { User, FullName, Address, Order } from './users.interface';

const fullNameSchema = new Schema<FullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const addressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema = new Schema<Order>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<User>({
  userId: {
    type: Number,
    required: true,
    unique: true,
    message: 'User ID already exist!',
  },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: fullNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String }],
  address: { type: addressSchema, required: true },
  orders: [{ type: orderSchema }],
});

// hash the password before saving the user
userSchema.pre('save', async function (next) {
  const user = this as User & mongoose.Document;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

export const UserModel = mongoose.model<User>('User', userSchema);
