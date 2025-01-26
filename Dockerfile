# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy Prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Security setup
RUN apk add --no-cache dumb-init && \
    chown -R node:node /app
USER node

EXPOSE 3000

# Start command
CMD ["dumb-init", "sh", "-c", "DATABASE_URL=$DIRECT_URL npx prisma migrate deploy && node server.js"]