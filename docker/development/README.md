# Development Environment Guide

## Directory Structure

```
development/
├── Dockerfile.dashboard    # Dashboard container configuration
├── Dockerfile.api         # API server container configuration
├── Dockerfile.boilerplate # Boilerplate service configuration
├── Dockerfile.vite        # Vite dev server configuration
├── Dockerfile.openai-proxy  # OpenAI proxy service configuration
├── Dockerfile.ollama      # Ollama service configuration
├── docker-compose.yml     # Service orchestration
├── .env.example          # Environment variable template
└── README.md             # This file
```

## Quick Start

1. **Setup Environment**
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

2. **Start Services**
```bash
# Start all services
docker-compose up --build

# Or start specific services
docker-compose up dashboard api postgres openai-proxy ollama
```

## Available Services

### Core Services

1. **Dashboard (port 4200)**
   - Development URL: http://localhost:4200
   - Hot reload enabled
   - Source: `../../cofounder/dashboard`

2. **API Server (port 3000)**
   - Development URL: http://localhost:3000
   - Swagger docs: http://localhost:3000/docs
   - Source: `../../cofounder/api`

3. **Boilerplate Service**
   - Template management
   - Source: `../../cofounder/boilerplate`

4. **Vite Server (port 5173)**
   - Development URL: http://localhost:5173
   - Hot module replacement
   - Source: `../../apps`

5. **OpenAI Proxy Service (port 3001)**
   - Primary: OpenAI API (when available and configured)
   - Fallback: Ollama (local model inference)
   - Model: Qwen 2.5 0.5B (default fallback model)
   - Health monitoring endpoint

6. **Ollama Service (port 11434)**
   - Local model inference service running Qwen 2.5 0.5B

### Infrastructure Services

7. **PostgreSQL (port 5432)**
   - Default credentials:
     - Database: cofounder_dev
     - Username: postgres
     - Password: postgres

8. **Redis (port 6379)**
   - No authentication by default
   - Persistence enabled

9. **Adminer (port 8080)**
   - URL: http://localhost:8080
   - Database management interface

## Development Features

### Hot Reload
- Enabled for all development containers
- Uses volume mounts for live updates
- Configure with `CHOKIDAR_USEPOLLING` and `WATCHPACK_POLLING`

### Debug Mode
- Detailed logging enabled
- Source maps available
- API rate limits disabled

### Database Management
- GUI access via Adminer
- Direct PostgreSQL access
- Persistent data storage

## Environment Variables

### Required Variables
```env
OPENAI_API_KEY=your_openai_api_key
COFOUNDER_API_KEY=your_cofounder_api_key
JWT_SECRET=your_jwt_secret
```

### Optional Variables
```env
# Ports
PORT=4200
API_PORT=3000
VITE_PORT=5173
OPENAI_PROXY_PORT=3001
OLLAMA_PORT=11434

# Database
POSTGRES_PASSWORD=custom_password
REDIS_PASSWORD=custom_password

# Features
DEBUG_MODE=true
ENABLE_SWAGGER=true

# OpenAI Proxy
OLLAMA_API_URL=http://ollama:11434/v1  # Internal Docker network URL

# Ollama
OLLAMA_MODELS=qwen2.5:0.5b,all-minilm
OLLAMA_ARCH=amd64  # or arm64 for Apple Silicon
```

## Common Tasks

### Viewing Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
```

### Rebuilding Services
```bash
# Rebuild specific service
docker-compose up --build api

# Rebuild all services
docker-compose up --build
```

### Database Operations
```bash
# Access PostgreSQL CLI
docker-compose exec postgres psql -U postgres cofounder_dev

# Backup database
docker-compose exec postgres pg_dump -U postgres cofounder_dev > backup.sql
```

### Cleaning Up
```bash
# Stop services
docker-compose down

# Remove volumes
docker-compose down -v

# Full cleanup
docker-compose down -v --rmi all
```

## Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Check ports in use
   sudo lsof -i :<port_number>
   
   # Change port in .env
   PORT=4201  # Use alternative port
   ```

2. **Hot Reload Issues**
   - Ensure correct volume mounts
   - Check file permissions
   - Enable polling in .env

3. **Database Connection**
   - Verify PostgreSQL container is running
   - Check credentials in .env
   - Ensure ports are accessible

4. **OpenAI Connection Issues**
   - Check the health endpoint for current OpenAI availability
   - Verify your API key if OpenAI access is desired
   - The service will automatically fall back to Ollama if issues are detected

5. **Ollama Issues**
   - Ensure the Ollama service is running: `docker-compose ps`
   - Check if models are downloaded: `docker-compose logs ollama`
   - Verify GPU access if using GPU acceleration

## Best Practices

1. **Environment Variables**
   - Never commit .env file
   - Keep secrets secure
   - Use descriptive names

2. **Development Workflow**
   - Use feature branches
   - Test changes locally
   - Follow coding standards

3. **Resource Management**
   - Monitor container resources
   - Clean unused Docker resources
   - Use appropriate memory limits

4. **Security**
   - Change default passwords
   - Restrict port access
   - Keep dependencies updated
