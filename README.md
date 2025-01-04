![cofounder-og-black](https://github.com/user-attachments/assets/b4e51f02-59e4-4540-ac14-e1f40e20a658)

# Cofounder | Early alpha release

* project - [cofounder.openinterface.ai](https://cofounder.openinterface.ai)
* 👋 [@n_raidenai](https://x.com/n_raidenai)

**cofounder**
- full stack generative web apps ; backend + db + stateful web apps
- gen ui rooted in app architecture, with ai-guided mockup designer & modular design systems

---

# Early Alpha : Unstable ⚠️

The following points are very emphasized :

- This is an **EARLY, UNSTABLE, PREVIEW RELEASE** of the project. ⚠️ Until v1 is released, it is expected to break often. 
- **It consumes a lot of tokens**. If you are on a tokens budget, wait until v1 is released.
- Again, this is an early, unstable release. A first test run. An early preview of the project's ideas. Far from completion. Open-source iterative development. Work in progress. Unstable early alpha release. [etc]

### **If any of these might be issues for you, even in the slightest way, wait until v1 is released ! Do not try the current release !**

To help you guide your decision on whether or not to try the current release , here is a guide

| Situation                                                                                             | Recommendation         |
|------------------------------------------------------------------------------------------------------|------------------------|
| I'm not sure if this tool release is mature yet, maybe it will not work as intended and I may spend millions of tokens for nothing | Do not use it yet      |
| I am very excited about this tool, I hope it is perfectly production-ready, because if it's not, I will make commentary about `I spent X amount on OpenAI API calls` | Do not use it yet      |
| I am not interested in code. I want to type words into a box and have my project completed; I do not want messy broken unfinished code | Do not use it yet      |
| I love exploring experimental tools but I am on the fence. It's going to break halfway and leave me sad | Do not use it yet      |
| Who should even try it at this point?                                                                | Nobody. Do not use it yet |
| But I really want to use it for some esoteric reason having read all the above.                       | Do not use it yet either |


---

https://github.com/user-attachments/assets/cfd09250-d21e-49fc-a29b-fa0c661abfc0

https://github.com/user-attachments/assets/c055f9c4-6bc0-4b11-ba8f-cc9f149387fa

---

## Important

**Early alpha release ; earlier than expected by few weeks**

Still not merged with key target features of the project, notably :
- project iteration modules for all dimensions of generated projects
- admin interface for event streams and (deeper) project iterations
- integrate the full genUI plugin :
  * generative design systems
  * deploy finetuned models & serve from api.cofounder
- local, browser-based dev env for the entire project scope
- add { react-native , flutter , other web frameworks }
- validations & swarm code review and autofix
- code optimization
- [...]

be patient :)

---

# Self-Hosting Guide

## System Requirements

- Node.js v22 (required)
- NPM package manager
- OpenAI API key
- Cofounder.openinterface.ai key (recommended for designer/layoutv1 and swarm/external-apis features)

## Installation

1. Install via NPX:
```sh
npx @openinterface/cofounder
```

2. The installer will:
   - Prompt for API keys configuration
   - Set up required directories
   - Install dependencies
   - Start the local API server
   - Open the web dashboard at http://localhost:4200

## Project Structure

```
./cofounder/
├── api/            # Local API server
│   └── system/
│       └── structure/
│           ├── nodes/     # Node configurations
│           └── sequences/ # Process definitions
├── boilerplate/    # Project templates
└── dashboard/      # Web interface
```

## Configuration

### API Keys
Store your API keys securely when prompted during installation:
- OpenAI API key (required)
- Cofounder.openinterface.ai key (recommended)

### Performance Tuning

The system's concurrency and performance can be configured in the node configuration files:
```yaml
# ./cofounder/api/system/structure/nodes/op/llm.yaml
nodes:
 op:LLM::GEN:
  queue:
   concurrency: 2  # Adjust based on your API limits
```

### Environment Configuration

Both development and production environments use `.env` files for configuration. Example files are provided:

1. Development Environment:
```sh
cd docker/development
cp .env.example .env
```

Required variables for development:
- `OPENAI_API_KEY`: Your OpenAI API key
- `COFOUNDER_API_KEY`: Your Cofounder API key
- `JWT_SECRET`: Secret for JWT token generation

2. Production Environment:
```sh
cd docker/production
cp .env.example .env
```

Additional required variables for production:
- All development variables
- `API_URL`: Your production API URL
- `DASHBOARD_URL`: Your production dashboard URL
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`: Production database credentials
- `SSL_CERT_PATH`, `SSL_KEY_PATH`: Paths to SSL certificates (if using HTTPS)

### Environment Variables Reference

#### Common Variables
- `NODE_ENV`: Environment mode (development/production)
- `PORT`: Dashboard port (default: 4200)
- `API_PORT`: API server port (default: 3000)
- `VITE_PORT`: Vite dev server port (development only, default: 5173)

#### API Keys
- `OPENAI_API_KEY`: OpenAI API key
- `COFOUNDER_API_KEY`: Cofounder API key

#### Database Configuration
- `DB_HOST`: Database host
- `DB_PORT`: Database port (default: 5432)
- `DB_NAME`: Database name
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password

#### Cache Configuration
- `REDIS_HOST`: Redis host
- `REDIS_PORT`: Redis port (default: 6379)

#### Security
- `JWT_SECRET`: Secret for JWT tokens
- `CORS_ORIGIN`: Allowed CORS origin

#### Production Only
- `SSL_CERT_PATH`: Path to SSL certificate
- `SSL_KEY_PATH`: Path to SSL private key

### Development Environment Components

The development environment is fully containerized with the following services:

```
services/
├── dashboard     # Web dashboard (port 4200)
├── api          # API server (port 3000)
├── boilerplate  # Project templates
├── vite         # Vite dev server (port 5173)
├── postgres     # PostgreSQL database (port 5432)
├── redis        # Redis cache (port 6379)
└── adminer      # Database management (port 8080)
```

#### Component Details

1. **Dashboard (port 4200)**
   - Web interface for project management
   - Hot-reloading enabled
   - Connected to API server

2. **API Server (port 3000)**
   - Core backend service
   - Handles project generation and management
   - Connected to PostgreSQL and Redis

3. **Boilerplate Service**
   - Manages project templates
   - Provides base code structures
   - Integrated with API server

4. **Vite Dev Server (port 5173)**
   - Serves generated applications
   - Development server with hot reload
   - Mounts apps directory

5. **PostgreSQL (port 5432)**
   - Main database
   - Persistent storage
   - Accessible via Adminer

6. **Redis (port 6379)**
   - Caching layer
   - Session management
   - Persistent storage

7. **Adminer (port 8080)**
   - Database management interface
   - Connected to PostgreSQL
   - Easy data visualization

### Development Quick Start

1. Start all services:
```sh
cd docker/development
docker-compose up --build
```

2. Access the services:
- Dashboard: http://localhost:4200
- API Documentation: http://localhost:3000/docs
- Generated Apps: http://localhost:5173
- Database Admin: http://localhost:8080

3. View logs for specific service:
```sh
docker-compose logs -f [service_name]
# Example: docker-compose logs -f api
```

4. Rebuild specific service:
```sh
docker-compose up --build [service_name]
# Example: docker-compose up --build dashboard
```

### Docker Development

For detailed Docker setup and configuration, please see our [Docker Development Guide](docker/DOCKER.md).

Quick start with Docker:

```bash
# Clone repository
git clone <repository-url>
cd cofounder

# Setup development environment
cd docker/development
cp .env.example .env
# Edit .env with your configuration

# Start services
docker-compose up --build
```

Available services:
- Dashboard: http://localhost:4200
- API: http://localhost:3000
- Generated Apps: http://localhost:5173
- Database Admin: http://localhost:8080

### Development Workflow

1. **Dashboard Development**
```sh
docker-compose up dashboard
```

2. **API Development**
```sh
docker-compose up api
```

3. **Generated Apps Development**
```sh
docker-compose up vite
```

4. **Database Management**
- Access Adminer at http://localhost:8080
- System: PostgreSQL
- Server: postgres
- Username: postgres (default)
- Password: postgres (default)
- Database: cofounder_dev

### Local Development

To start the local development environment:

1. Start the local API server:
```sh
cd ./cofounder/api
npm run start
```

2. Access the dashboard at http://localhost:4200

3. For new projects, either:
   - Use the web dashboard
   - Or use CLI: `npm run start -- -p "ProjectName" -f "description" -a "design instructions"`

---

# Docker Deployment

### Project Structure
```
docker/
├── development/
│   ├── Dockerfile
│   ├── Dockerfile.api
│   └── docker-compose.yml
└── production/
    ├── Dockerfile
    ├── Dockerfile.api
    └── docker-compose.yml
```

### Prerequisites
- Docker
- Docker Compose

### Quick Start with Docker

1. Clone the repository:
```sh
git clone <repository-url>
cd cofounder
```

2. Create a `.env` file with your API keys:
```sh
OPENAI_API_KEY=your_openai_key
COFOUNDER_API_KEY=your_cofounder_key
```

3. Development Environment:
```sh
cd docker/development
docker-compose up --build
```

4. Production Environment:
```sh
cd docker/production
docker-compose up -d
```

The services will be available at:
- Dashboard: http://localhost:4200
- API Server: http://localhost:3000
- Generated App (when running): http://localhost:5173

### Development with Docker

For development with hot-reloading:
```sh
cd docker/development
docker-compose up
```

### Production Deployment

For production deployment:
```sh
cd docker/production
docker-compose up -d
```

### Docker Commands Reference

- Build the images: `docker-compose build`
- Start the services: `docker-compose up`
- Stop the services: `docker-compose down`
- View logs: `docker-compose logs -f`
- Rebuild a specific service: `docker-compose up --build cofounder-api`

---

# Usage

## Install & Init

* Open your terminal and run

```sh
npx @openinterface/cofounder
```

Follow the instructions. The installer 
- will ask you for your keys
- setup dirs & start installs
- will start the local `cofounder/api` builder and server
- will open the web dashboard where you can create new projects (at `http://localhost:4200` ) 

```
note :
you will be asked for a cofounder.openinterface.ai key
it is recommended to use one as it enables the designer/layoutv1 and swarm/external-apis features
and can be used without limits during the current early alpha period

the full index will be available for local download on v1 release
```

- currently using `node v22` for the whole project. 



```sh
# alternatively, you can make a new project without going through the dashboard
# by runing :
npx @openinterface/cofounder -p "YourAppProjectName" -d "describe your app here" -a "(optional) design instructions"
```


## Run Generated Apps

- Your backend & vite+react web app will incrementally generate inside `./apps/{YourApp}`
Open your terminal in `./apps/{YourApp}` and run

```sh
npm i && npm run dev
```

It will start both the backend and vite+react, concurrently, after installing their dependencies
Go to `http://localhost:5173/` to open the web app 


- From within the generated apps , you can use ⌘+K / Ctrl+K to iterate on UI components

[more details later]

## Notes

### Dashboard & Local API

If you resume later and would like to iterate on your generated apps,
the local `./cofounder/api` server needs to be running to receive queries

You can (re)start the `local cofounder API` running the following command from `./cofounder/api`

```sh
npm run start
```

The dashboard will open in `http://localhost:4200`


- note: You can also generate new apps from the same env, without the the dashboard, by running, from `./cofounder/api`, one of these commands
    
    ```sh
    npm run start -- -p "ProjectName" -f "some app description" -a "minimalist and spacious , light theme"
    npm run start -- -p "ProjectName" -f "./example_description.txt" -a "minimalist and spacious , light theme"
    ```

### Concurrency

**[the architecture will be further detailed and documented later]**

Every "node" in the `cofounder` architecture has a defined configuration under `./cofounder/api/system/structure/nodes/{category}/{name}.yaml` to handle things like concurrency, retries and limits per time interval

For example, if you want multiple LLM generations to run in parallel (when possible - sequences and parallels are defined in DAGS under `./cofounder/api/system/structure/sequences/{definition}.yaml` ),
go to

```yaml
#./cofounder/api/system/structure/nodes/op/llm.yaml
nodes:
 op:LLM::GEN:
  desc: "..."
  in: [model, messages, preparser, parser, query, stream]
  out: [generated, usage]
  queue:
   concurrency: 1 # <------------------------------- here 
 op:LLM::VECTORIZE:
  desc: "{texts} -> {vectors}"
  in: [texts]
  out: [vectors, usage]
 mapreduce: true
 op:LLM::VECTORIZE:CHUNK:
  desc: "{texts} -> {vectors}"
  in: [texts]
  out: [vectors, usage]
  queue:
   concurrency: 50
```

and change the `op:LLM::GEN` parameter `concurrency` to a higher value

The default LLM concurrency is set to `2` so you can see what's happening in your console streams step by step - but you can increment it depending on your api keys limits

---

# Changelog

---

# Roadmap

---

# Benchmarks

---

# Community & Links

- [![Cofounder](https://img.shields.io/badge/Cofounder-gray?style=for-the-badge&logo=discord&link=https://discord.gg/2kVMzeASj9)](https://discord.gg/2kVMzeASj9) | Community discord server by @flamecoders

---

# Docs, Design Systems, ...

**[WIP]**

---

# Architecture

[more details later]

archi/v1 is as follows :

![architecture](https://github.com/user-attachments/assets/b2d8b70e-7a6d-45c9-a706-0cf955d13451)


---

# Credits

- Demo design systems built using Figma renders / UI kits from:
  * blocks.pm by Hexa Plugin (see `cofounder/api/system/presets`)
  * google material
  * figma core
  * shadcn
- Dashboard node-based ui powered by [react flow](https://reactflow.dev/)
- Ollama integration for AI-powered code generation
