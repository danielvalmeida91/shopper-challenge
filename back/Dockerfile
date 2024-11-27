FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package manager files first to leverage caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files into the container
COPY . .

# Change directory to where your application source resides
WORKDIR /app/src

# Expose the backend port
EXPOSE 8080

# Command to run your backend
CMD ["yarn", "start"]
