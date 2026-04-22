# NestJS Boilerplate

Production-ready backend boilerplate with scalable architecture.

## Stack

- **NestJS 11** - Framework
- **TypeORM** - ORM
- **SQLite** - Default database (ready for PostgreSQL)
- **Zod** - Validation
- **JWT + Passport** - Authentication
- **Redis + BullMQ** - Cache & Queues
- **Pino** - Logger
- **Swagger** - Documentation
- **Jest + Supertest** - Testing

## Quick Start

```bash
npm install --legacy-peer-deps
npm run start:dev
```

API available at `http://localhost:3000`
Swagger docs at `http://localhost:3000/api/docs`

## Scripts

```bash
npm run start:dev      # Development
npm run start:prod      # Production
npm run build           # Build
npm run test             # Unit tests
npm run test:e2e         # E2E tests
npm run lint             # Lint
```

## Project Structure

```
src/
├── config/                 # Configuration (env validation)
├── database/               # TypeORM setup & migrations
├── common/                  # Shared utilities
│   ├── decorators/         # @Public, @CurrentUser
│   ├── filters/             # HttpExceptionFilter
│   ├── guards/              # PublicGuard
│   ├── interceptors/        # LoggingInterceptor
│   └── pipes/               # ZodValidationPipe
├── modules/
│   ├── auth/               # JWT auth, register, login
│   └── user/               # User CRUD
└── infra/
    ├── redis/              # Redis service
    └── queue/             # BullMQ email queue
```

## API Endpoints

### Auth

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | `/auth/register` | Register user       |
| POST   | `/auth/login`    | Login               |
| POST   | `/auth/refresh`  | Refresh token       |
| GET    | `/auth/me`       | Current user (auth) |

### Users

| Method | Endpoint     | Description |
| ------ | ------------ | ----------- |
| POST   | `/users`     | Create user |
| GET    | `/users`     | List all    |
| GET    | `/users/:id` | Get one     |
| PUT    | `/users/:id` | Update      |
| DELETE | `/users/:id` | Delete      |

## Environment Variables

```env
NODE_ENV=development
PORT=3000

DB_TYPE=sqlite
DB_DATABASE=nestjs_boilerplate

JWT_SECRET=change-me
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=change-me-refresh
JWT_REFRESH_EXPIRES_IN=7d

REDIS_HOST=localhost
REDIS_PORT=6379
```

## Features

- **Authentication**: JWT access + refresh tokens, bcrypt, Passport strategy
- **Validation**: Zod schemas with global pipe, Swagger docs
- **Security**: Helmet, rate limiting, CORS, JWT guard
- **Queues**: BullMQ with email queue, retry logic
- **Logging**: Pino structured logs, HTTP middleware
- **Database**: TypeORM with SQLite, migrations ready

## Testing

```bash
npm run test           # Unit tests
npm run test:e2e       # E2E tests
npm run test:cov       # Coverage
```

## Migrations

```bash
npm run migration:generate -- src/database/migrations/Name
npm run migration:run
npm run migration:revert
```

## Production

Switch database to PostgreSQL:

```env
DB_TYPE=postgres
DB_HOST=your-host
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=secret
DB_DATABASE=myapp
```

Then:

```bash
npm run build && npm run start:prod
```
