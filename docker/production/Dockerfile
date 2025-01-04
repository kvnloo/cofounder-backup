FROM node:22-alpine as builder

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache python3 make g++ git

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:22-alpine

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Expose port
EXPOSE 4200

# Start the application in production mode
CMD ["npm", "run", "start:prod"]
