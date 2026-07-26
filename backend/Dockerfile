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

# Copy only production dependencies
COPY --from=builder /app/node_modules ./node_modules

# Copy application
COPY package*.json ./
COPY server.js ./

# Run as non-root user
USER node

EXPOSE 4000

CMD ["node", "server.js"]