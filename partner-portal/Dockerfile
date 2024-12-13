# Step 1: Use an official Node.js runtime as a parent image
FROM node:18-alpine AS builder

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json/yarn.lock to install dependencies
COPY package.json yarn.lock* package-lock.json* ./ 

# Install dependencies
RUN npm install --frozen-lockfile

# Step 4: Copy the rest of the application files
COPY . .

# Step 5: Build the application
RUN npm run build

# Step 6: Use a lightweight image to serve the app
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Copy build files and necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Install only production dependencies
RUN npm install --production

# Set environment variables
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3001

# Command to run the app
CMD ["npm", "start"]
