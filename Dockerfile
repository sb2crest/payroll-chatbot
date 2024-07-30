# Step 1: Build the React app
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . ./

# Expose port 80
EXPOSE 3000

# Start Nginx
CMD ["npm", "start"]
