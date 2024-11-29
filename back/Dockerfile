FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package manager files first to leverage caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Install Prisma Client
RUN yarn add @prisma/client

# Copy the rest of the application files into the container
COPY . .

# Copy Prisma schema
COPY prisma/schema.prisma prisma/

# # Generate Prisma Client
RUN npx prisma generate

# Run migrations and seed
CMD ["sh", "-c", "npx prisma migrate dev && yarn dev"]