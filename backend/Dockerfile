# Stage 1: Install production dependencies
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev


# Stage 2: Minimal production runtime
FROM gcr.io/distroless/nodejs22-debian12

WORKDIR /app

# Copy production dependencies
COPY --from=builder /app/node_modules ./node_modules

# Copy application files
COPY package*.json ./
COPY server.js ./

# Run as non-root user
USER nonroot

EXPOSE 4000

CMD ["server.js"]