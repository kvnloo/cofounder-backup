FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache python3 make g++ git

# Copy package files
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

# Expose ports
EXPOSE 4200 5173

# Start the application in development mode
CMD ["npm", "run", "start"]
