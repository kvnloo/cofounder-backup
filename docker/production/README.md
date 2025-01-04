# Production Environment Guide

## Directory Structure

```
production/
├── Dockerfile.dashboard    # Production dashboard build
├── Dockerfile.api         # Production API server build
├── docker-compose.yml     # Production orchestration
├── .env.example          # Production environment template
└── README.md             # This file
```

## Deployment Guide

### Prerequisites

- Docker and Docker Compose installed
- Domain names configured
- SSL certificates ready
- Production API keys
- Adequate server resources

### Initial Setup

1. **Environment Configuration**
```bash
# Copy environment template
cp .env.example .env

# Edit production environment variables
nano .env
```

2. **SSL Certificates**
```bash
# Create SSL directory
mkdir -p /path/to/ssl

# Copy SSL certificates
cp /path/to/certificates/fullchain.pem /path/to/ssl/
cp /path/to/certificates/privkey.pem /path/to/ssl/
```

3. **Start Services**
```bash
# Build and start all services
docker-compose up -d --build
```

## Production Services

### Core Services

1. **Dashboard**
   - Optimized production build
   - SSL enabled
   - Rate limiting
   - Error monitoring

2. **API Server**
   - Production-grade security
   - Performance optimized
   - Detailed logging
   - Health monitoring

### Infrastructure

3. **PostgreSQL**
   - Data persistence
   - Regular backups
   - Performance tuning
   - Security hardening

4. **Redis**
   - Session management
   - Caching layer
   - Persistence enabled
   - Password protection

## Environment Variables

### Required Variables
```env
# API Keys
OPENAI_API_KEY=your_openai_api_key
COFOUNDER_API_KEY=your_cofounder_api_key

# Security
JWT_SECRET=strong_production_secret
POSTGRES_PASSWORD=secure_database_password
REDIS_PASSWORD=secure_redis_password

# Domain Configuration
API_URL=https://api.yourdomain.com
DASHBOARD_URL=https://dashboard.yourdomain.com

# SSL Paths
SSL_CERT_PATH=/path/to/ssl/fullchain.pem
SSL_KEY_PATH=/path/to/ssl/privkey.pem
```

### Optional Variables
```env
# Performance Tuning
POSTGRES_MAX_CONNECTIONS=100
REDIS_MAXMEMORY=2gb
NODE_ENV=production
```

## Security Measures

### SSL/TLS Configuration
- HTTPS enforced
- Strong SSL configuration
- Regular certificate renewal
- HTTP/2 enabled

### Database Security
- Strong passwords
- Network isolation
- Regular security updates
- Access control

### Application Security
- Rate limiting
- CORS restrictions
- XSS protection
- CSRF protection

## Monitoring & Maintenance

### Health Checks
```bash
# Check service status
docker-compose ps

# View service logs
docker-compose logs -f [service_name]

# Monitor resources
docker stats
```

### Backup Procedures

1. **Database Backup**
```bash
# Create backup
docker-compose exec postgres pg_dump -U postgres db_name > backup.sql

# Automated daily backup
0 0 * * * docker-compose exec postgres pg_dump -U postgres db_name > /backups/backup_$(date +\%Y\%m\%d).sql
```

2. **Volume Backup**
```bash
# Backup volumes
docker run --rm -v cofounder_postgres_data:/data -v /backup:/backup alpine tar czf /backup/postgres_data.tar.gz /data
```

### Updates & Maintenance

1. **Update Services**
```bash
# Pull latest images
docker-compose pull

# Update and restart
docker-compose up -d --build
```

2. **Database Maintenance**
```bash
# Run vacuum
docker-compose exec postgres vacuumdb -U postgres -d db_name --analyze
```

## Scaling & Performance

### Resource Allocation
```yaml
# docker-compose.yml example
services:
  api:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
```

### Load Balancing
- Use multiple API instances
- Configure nginx load balancer
- Enable horizontal scaling

## Disaster Recovery

### Backup Strategy
- Daily database backups
- Volume snapshots
- Configuration backups
- Automated backup testing

### Recovery Procedures
```bash
# Restore database
cat backup.sql | docker-compose exec -T postgres psql -U postgres db_name

# Restore volumes
docker run --rm -v cofounder_postgres_data:/data -v /backup:/backup alpine tar xzf /backup/postgres_data.tar.gz
```

## Best Practices

1. **Security**
   - Regular security audits
   - Keep systems updated
   - Monitor for vulnerabilities
   - Use secure configurations

2. **Performance**
   - Regular monitoring
   - Performance tuning
   - Resource optimization
   - Cache management

3. **Maintenance**
   - Scheduled updates
   - Regular backups
   - Health monitoring
   - Documentation updates

4. **Scaling**
   - Monitor resource usage
   - Plan for growth
   - Regular load testing
   - Performance benchmarks

## OpenAI-Ollama Fallback Information

### Architecture Overview

#### OpenAI Proxy Service with Ollama Fallback
Production-grade service providing reliable AI capabilities with automatic failover:

- **Primary Service**: OpenAI API
- **Fallback Service**: Ollama (local inference)
- **Default Model**: Qwen 2.5 0.5B
- **High Availability**: Automatic fallback on any OpenAI issues
- **Health Monitoring**: Built-in health checks and status reporting

##### Features
- Zero-downtime automatic fallback
- Periodic availability checks (every 60 seconds)
- Intelligent error handling and recovery
- Request timeout protection
- Detailed logging for monitoring
- Compatible with OpenAI API format

##### Configuration
```env
# Required Environment Variables
OPENAI_API_KEY=sk-...  # Optional: OpenAI API key
OLLAMA_API_URL=http://ollama:11434/v1
OPENAI_PROXY_PORT=3001

# Optional Configurations
NODE_ENV=production
LOG_LEVEL=info
```

##### Health Monitoring
- Endpoint: `/health`
- Docker health checks: 30s interval, 10s timeout
- Automatic container restart on failures
- Status metrics available via HTTP endpoint

##### Security Considerations
- API key storage in secure environment variables
- Internal Docker network isolation
- Rate limiting and timeout protection
- Error message sanitization

#### Ollama Service
Local model inference service for reliable fallback:

##### Configuration
```env
# Required Settings
OLLAMA_PORT=11434
OLLAMA_MODELS=qwen2.5:0.5b,all-minilm
OLLAMA_ARCH=amd64

# Optional Settings
OLLAMA_ORIGINS=your-domain.com
OLLAMA_HOST=0.0.0.0
```

##### Health Checks
- 30s interval checks on `/api/tags`
- 40s startup grace period
- Automatic recovery and model reloading

## Deployment

1. Configure environment:
   ```bash
   cp .env.example .env
   # Edit .env with production values
   ```

2. SSL/TLS setup (recommended):
   ```bash
   # Update nginx configuration
   # Add SSL certificates
   ```

3. Deploy services:
   ```bash
   docker-compose up -d
   ```

4. Verify deployment:
   ```bash
   # Check service health
   curl https://your-domain.com/health
   
   # Test AI endpoint
   curl https://your-domain.com/v1/chat/completions \
     -H "Content-Type: application/json" \
     -d '{
       "model": "gpt-3.5-turbo",
       "messages": [{"role": "user", "content": "Test message"}]
     }'
   ```

## Monitoring and Maintenance

### Health Checks
Monitor service health:
```bash
# Overall health
curl https://your-domain.com/health

# Container status
docker-compose ps

# Service logs
docker-compose logs -f openai-proxy
docker-compose logs -f ollama
```

### Model Updates
Update Ollama models:
```bash
# Pull latest models
docker-compose exec ollama ollama pull qwen2.5:0.5b
docker-compose exec ollama ollama pull all-minilm
```

### Backup and Recovery
```bash
# Backup Ollama models
docker run --rm -v ollama_data:/data -v $(pwd)/backup:/backup \
  alpine tar czf /backup/ollama_models.tar.gz /data

# Restore from backup
docker run --rm -v ollama_data:/data -v $(pwd)/backup:/backup \
  alpine tar xzf /backup/ollama_models.tar.gz -C /
```

## Troubleshooting

### Common Issues

1. **OpenAI Connectivity**
   - Check `/health` endpoint for OpenAI status
   - Verify API key validity
   - Monitor rate limits and quotas
   - Service automatically falls back to Ollama

2. **Ollama Performance**
   - Monitor GPU utilization
   - Check model loading status
   - Verify resource allocation
   - Review container logs

3. **Network Issues**
   - Check Docker network connectivity
   - Verify SSL/TLS configuration
   - Monitor proxy settings
   - Review firewall rules
