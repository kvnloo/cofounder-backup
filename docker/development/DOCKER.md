# Docker Development Guide

## Overview

This guide covers the Docker setup for both development and production environments of the Cofounder project.

## Project Structure

```
docker/
├── development/
│   ├── Dockerfile.dashboard    # Dashboard container
│   ├── Dockerfile.api         # API server container
│   ├── Dockerfile.boilerplate # Boilerplate service container
│   ├── Dockerfile.vite        # Vite dev server container
│   ├── Dockerfile.ollama      # Ollama service container
│   ├── docker-compose.yml     # Development orchestration
│   └── .env.example          # Development environment template
└── production/
    ├── Dockerfile.dashboard    # Production dashboard
    ├── Dockerfile.api         # Production API server
    ├── Dockerfile.ollama      # Production Ollama service
    └── docker-compose.yml     # Production orchestration
```

## Development Environment

### Components

1. **Dashboard (port 4200)**
   - Web interface for project management
   - Hot-reloading enabled
   - Built with Node.js

2. **API Server (port 3000)**
   - RESTful API service
   - Swagger documentation
   - Connected to PostgreSQL and Redis

3. **Boilerplate Service**
   - Template management
   - Project generation
   - Code scaffolding

4. **Vite Dev Server (port 5173)**
   - Development server for generated apps
   - Hot module replacement
   - Source maps enabled

5. **PostgreSQL (port 5432)**
   - Primary database
   - Persistent storage
   - Development credentials (configurable)

6. **Redis (port 6379)**
   - Caching layer
   - Session management
   - Optional password protection

7. **Adminer (port 8080)**
   - Database management
   - Table visualization
   - Query execution

8. **Ollama (port 11434)**
   - Local LLM service
   - GPU acceleration
   - Model management
   - Persistent model storage

### Environment Configuration

1. **Create Environment File**
```bash
cd docker/development
cp .env.example .env
```

2. **Required Variables**
```env
# Essential API Keys
OPENAI_API_KEY=your_openai_api_key
COFOUNDER_API_KEY=your_cofounder_api_key

# Security
JWT_SECRET=your_jwt_secret

# Ollama Configuration
OLLAMA_PORT=11434
OLLAMA_ARCH=amd64  # or arm64 for Apple Silicon
OLLAMA_MODELS=llama2  # Models to preload
```

3. **Optional Configurations**
```env
# Custom Ports
PORT=4200
API_PORT=3000
VITE_PORT=5173

# Database
POSTGRES_PASSWORD=custom_password
REDIS_PASSWORD=custom_password

# Resource Limits
POSTGRES_MEMORY_LIMIT=2g
REDIS_MEMORY_LIMIT=1g
```

### Starting Development Environment

1. **Start All Services**
```bash
cd docker/development
docker-compose up --build
```

2. **Start Specific Services**
```bash
# Dashboard only
docker-compose up dashboard

# API with dependencies
docker-compose up api postgres redis

# Database management
docker-compose up postgres adminer

# Ollama service
docker-compose up ollama
```

3. **View Logs**
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
```

### Development Workflow

1. **Code Changes**
   - Changes to source code are automatically detected
   - Services hot-reload when files change
   - No need to rebuild containers for code changes

2. **Database Changes**
   - Access Adminer at http://localhost:8080
   - Default credentials:
     - System: PostgreSQL
     - Server: postgres
     - Username: postgres
     - Password: postgres
     - Database: cofounder_dev

3. **Debugging**
   - API logs available through docker-compose logs
   - Swagger UI at http://localhost:3000/docs
   - Redis Commander at http://localhost:8081

### Common Tasks

1. **Reset Database**
```bash
docker-compose down -v
docker-compose up --build
```

2. **Update Dependencies**
```bash
# Rebuild specific service
docker-compose build --no-cache api
docker-compose up -d
```

3. **Clean Environment**
```bash
# Stop and remove containers
docker-compose down

# Remove volumes
docker-compose down -v

# Remove all unused images
docker system prune -a
```

## Troubleshooting

### Common Issues

1. **Port Conflicts**
   - Check if ports are already in use
   - Modify port mappings in .env file
   - Stop conflicting services

2. **Hot Reload Not Working**
   - Ensure CHOKIDAR_USEPOLLING=true in .env
   - Check volume mounts in docker-compose.yml
   - Verify file permissions

3. **Database Connection Issues**
   - Verify PostgreSQL is running: `docker-compose ps`
   - Check database credentials in .env
   - Ensure database port is accessible

4. **Performance Issues**
   - Monitor resource usage: `docker stats`
   - Adjust memory limits in .env
   - Clean up unused Docker resources

### Debug Commands

```bash
# Check container status
docker-compose ps

# View container resources
docker stats

# Check container logs
docker-compose logs -f [service_name]

# Enter container shell
docker-compose exec [service_name] sh

# Check network connectivity
docker-compose exec api ping postgres
```

## Best Practices

1. **Environment Variables**
   - Never commit .env files
   - Use .env.example as template
   - Document all environment variables

2. **Resource Management**
   - Set appropriate memory limits
   - Clean unused Docker resources
   - Monitor container health

3. **Development Workflow**
   - Use hot reload for development
   - Keep containers focused and minimal
   - Follow container best practices

4. **Security**
   - Change default passwords
   - Limit exposed ports
   - Use secure secrets in production
