import { Model } from 'mongoose';

export interface User {
  userId: number;
  username: string;
  password: string;
  fullName: FullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Address;
  orders?: Order[];
}

export interface FullName {
  firstName: string;
  lastName: string;
}

export interface Address {
  street: string;
  city: string;
  country: string;
}

export interface Order {
  productName: string;
  price: number;
  quantity: number;
}

export interface UserModel extends Model<User> {
  user: User;
}
