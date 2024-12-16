# project from (YouTube)

This is the jobs listing project from the [YouTube crash course](https://youtu.be/LDB4uaJ87e0).



This is a jobs listing application built with React, using **Vite** and **JSON-Server**. It supports **development** and **production** environments, with separate databases and Dockerized production.

## Technologies Used
- **React**: Frontend framework.
- **Vite**: Fast development build tool.
- **JSON-Server**: Mock REST API.
- **Docker**: Containerization for production.
- **dotenv**: Environment variable management.

## Features
- **Development and Production JSON Databases**:
  - `languages_db_dev.json`: For development.
  - `languages_db.json`: For production, persists data across restarts.
- **Dynamic Configurations**: Managed via `.env` files for ports and database paths.
- **Containerized Production**: Optimized builds with persistent storage.

## Setup

### Development
1. Install dependencies: `npm install`
2. Start development environment: `npm run dev`
   - React: `http://localhost:3000`
   - Mock API: `http://localhost:8000`

### Production
1. Build and run Docker: `docker-compose --env-file .env.docker up --build`
2. Access production:
   - React: `http://localhost:3003`
   - Mock API: `http://localhost:8008`
3. Stop: `docker-compose down`

## Environment Variables

### `.env` (Development)
- DEV_PORT: `3000`
- DEV_JSON_PORT: `8000`
- DEV_DB_PATH: Path to `languages_db_dev.json`

### `.env.docker` (Production)
- PROD_PORT: `3003`
- PROD_JSON_PORT: `8008`
- PROD_DB_PATH: Path to `languages_db.json`

## Structure
- **Frontend**: React with Vite.
- **Backend**: JSON-Server.
- **Containerization**: Docker for production.

Persistent data is stored in JSON files mapped as volumes in Docker.