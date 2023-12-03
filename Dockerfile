
# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Install TypeScript
RUN npm install -g typescript @types/bcrypt @types/express @types/jsonwebtoken @types/mongoose @types/node @types/validator

# Build the application
RUN npm run build

# Expose port 5000
EXPOSE 5050

# Run the application
CMD ["node", "dist/server.js"]
