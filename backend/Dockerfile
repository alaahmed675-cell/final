# Stage 1: Install production dependencies
FROM node:current-alpine3.24 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev


FROM gcr.io/distroless/nodejs22-debian12

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY server.js ./

EXPOSE 4000

CMD ["server.js"]