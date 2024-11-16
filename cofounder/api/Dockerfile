# syntax=docker/dockerfile:1

# Development stage
FROM node:18-slim AS development
WORKDIR /usr/src/app

# Install build essentials, wget, and tini
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    wget \
    tini \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4200

# Use tini as entrypoint for proper signal handling
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["npm", "run", "start"]

# Production stage
FROM node:18-slim AS production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["node", "dist/server.js"]
