
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

# Copy application files
COPY package*.json ./
COPY server.js ./

EXPOSE 4000

CMD ["npm", "start"]