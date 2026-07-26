# Stage 1: Install production dependencies
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev


# Stage 2: Production runtime
FROM node:22-alpine

WORKDIR /app

# Update Alpine security packages
RUN apk update && apk upgrade

# Copy production dependencies
COPY --from=builder /app/node_modules ./node_modules

# Copy package files
COPY package*.json ./

# Copy application
COPY server.js ./

# Application port
EXPOSE 3000

# Start application
CMD ["npm", "start"]