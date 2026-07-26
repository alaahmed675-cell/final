# Stage 2: Production runtime
FROM node:22-alpine

WORKDIR /app

# Update Alpine security packages
RUN apk update && apk upgrade

# Update npm itself to patch vulnerabilities bundled in the base image
RUN npm install -g npm@latest

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