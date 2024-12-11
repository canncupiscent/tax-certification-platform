# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create production image
FROM node:18-alpine

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Create directory for persistent data
RUN mkdir -p /app/data
VOLUME /app/data

# Install SQLite for data persistence
RUN apk add --no-cache sqlite

# Copy database initialization script
COPY scripts/init-db.sh /app/scripts/init-db.sh
RUN chmod +x /app/scripts/init-db.sh

# Copy startup script
COPY scripts/startup.sh /startup.sh
RUN chmod +x /startup.sh

# Copy version check script
COPY scripts/version-check.sh /app/scripts/version-check.sh
RUN chmod +x /app/scripts/version-check.sh

EXPOSE 3000

CMD ["/startup.sh"]