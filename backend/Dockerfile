# Stage 1: Dependencies
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev


# Stage 2: Minimal Alpine Runtime
FROM alpine:3.22

WORKDIR /app

RUN apk add --no-cache nodejs

COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY server.js ./

EXPOSE 4000

CMD ["node", "server.js"]