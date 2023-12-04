### Mongoose Express CRUD Mastery

## Base URL

https://api.mylab.shadikur.com/

Note: This application deplyoed into a docker container and running on a DigitalOcean droplet in the cloud. So, it may take a few seconds to load the application.

## Description

This is a simple CRUD application that allows the user to create, read, update, and delete a list of items. The application uses the Mongoose ODM to interact with a MongoDB database.

### Routes with examples

# Create a User

--- POST [/api/users](https://api.mylab.shadikur.com/api/users)

```json
{
  "userId": 25,
  "username": "john_doe",
  "password": "test",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "age": 30,
  "email": "john.doe@example.com",
  "isActive": true,
  "hobbies": ["reading", "traveling"],
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "country": "USA"
  }
}
```

# Get All Users

--- GET [/api/users](https://api.mylab.shadikur.com/api/users)

# Get a User

--- GET [/api/users/:id](https://api.mylab.shadikur.com/api/users/21)

# Update a User

--- PUT [/api/users/:id](https://api.mylab.shadikur.com/api/users/21)

```json
{
  "userId": 21,
  "username": "john_doe",
  "password": "test",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "age": 30,
  "email": "another@email.com",
  "isActive": true,
  "hobbies": ["reading", "traveling"],
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "country": "USA"
  }
}
```

# Delete a User

--- DELETE [/api/users/:id](https://api.mylab.shadikur.com/api/users/21)

# Get All Orders for a User

--- GET [/api/users/:id/orders](https://api.mylab.shadikur.com/api/users/9/orders)

# Get Total Price of All Orders for a User

--- GET [/api/users/:id/orders/total-price](https://api.mylab.shadikur.com/api/users/9/orders/total-price)

# Create Order for a User

--- POST [/api/users/:id/orders](https://api.mylab.shadikur.com/api/users/9/orders)

```json
{
  "productName": "Test",
  "price": 14.5,
  "quantity": 5
}
```

## Technologies Used

- Node.js
- Express
- Mongoose
- Digital Ocean & Docker (Node 18.4.2-Alpine)
- MongoDB Atlas
- Bcrypt

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Update the `MONGO_CONN` & `PORT` in the `.env` file to point to your MongoDB database
4. Run `npm run start:dev` to start the application

## Usage

Routes and their descriptions with demo data can be found in the Apollo readme file. Click the link below to view the readme file.

[Apollo Readme](https://github.com/Apollo-Level2-Web-Dev/L2-B2-assignment-2/blob/main/README.md)
