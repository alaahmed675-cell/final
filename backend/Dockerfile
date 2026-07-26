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

# Remove npm/npx/yarn/corepack build tooling — not needed at runtime,
# and this removes the CVEs bundled inside npm's own dependencies
RUN rm -rf /usr/local/lib/node_modules/npm \
           /usr/local/lib/node_modules/corepack \
           /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack \
           /opt/yarn-v1.22.22

# Application port
EXPOSE 3000

# Start application directly with node — no npm needed at runtime
CMD ["node", "server.js"]