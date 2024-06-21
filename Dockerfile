# Use the official image as a parent image
FROM node:19

# Set the working directory
WORKDIR /app

# Copy the local files to the container's workspace
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start:dev"]
