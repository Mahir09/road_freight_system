# Road Freight System Project

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
# Clone Repository
$ git clone <https://github.com/Mahir09/road_freight_system>

# Open Repo in vs code

# Run Below Command Interminal
$ npm install

# Install Postgres DataBase From Chrome
# Verify Installation
psql -U postgres

# Create a Database
CREATE DATABASE road_freight_db;

# In the root of your NestJS project(inside road_freight_system), create a file named .env.
# Add the following environment variables to the .env file:
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=<your username>
DB_PASSWORD=<your password>
DB_DATABASE=road_freight_db

```

## Running the app

```bash
# Build
$ npm run build

# Start
$ npm run start:dev

```

## Test

```bash
# Unit tests
$ npm test

# Integration tests
$ npm run test:e2e
```