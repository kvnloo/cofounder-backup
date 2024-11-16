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

# Copy package files
COPY package*.json ./

# Install dependencies with explicit Rollup installation
RUN npm install --ignore-scripts && \
    npm install @rollup/rollup-linux-x64-gnu --no-save && \
    npm rebuild

COPY . .

# Add host for Vite
ENV HOST=0.0.0.0
EXPOSE 5200

# Use tini as entrypoint for proper signal handling
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["npm", "run", "dev"]

# Production stage
FROM node:18-slim AS production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Serve production build
FROM nginx:alpine AS nginx
COPY --from=production /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]