## Project setup
A lightweight backend to manage surveys, allowing users to submit a **rating (1 to 5)** and a **comment**.

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start:dev
```

## Run tests

```bash
# unit tests
$ npm run test
```

### Prerequisites
- Node.js 18+ and npm
- Docker Desktop (or Docker Engine)
- Local network access to ports 5432 (PostgreSQL) and 3000 (API)

### 1) Start PostgreSQL with Docker
You can start a local Postgres instance with the following command:

```bash
# Linux/macOS/PowerShell (Windows)
docker run --name wh-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=nest_survey -p 5432:5432 -d postgres:16
```

- Container name: `wh-postgres`
- User: `postgres`
- Password: `postgres`
- Database: `nest_survey`

To verify the container is running:
```bash
docker ps
```

### 2) Configure environment variables
Create (or update) a `.env` file at the project root with:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nest_survey?schema=public"
# Optional (HTTP listen port)
# PORT=3000
```

The repo already includes a `.env` with a similar `DATABASE_URL`. Make sure it matches the Docker container parameters above.

### 3) Install dependencies
```bash
npm install
```

### 4) Prepare the database (Prisma)
Generate the Prisma client and apply the schema to the database:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

These commands create the `Survey` table defined in `prisma/schema.prisma`.

### 5) Start the API
```bash
# development (watch)
npm run start:dev
# or
npm run start
```

By default, the API listens on `http://localhost:3000`.

### 6) Test the endpoints
Available endpoints:
- POST `/survey` to create a survey
- GET `/survey` to list surveys

Request examples:
```bash
# Create a survey
curl -X POST http://localhost:3000/survey \
  -H "Content-Type: application/json" \
  -d '{"rating": 5, "comment": "Perfect"}'

# Get all surveys
curl http://localhost:3000/survey
```

Notes:
- Validation is enabled: `rating` must be an integer between 1 and 5, and `comment` is required.
- Global rate limiting is configured to 5 requests per minute (HTTP 429 if exceeded).
- Logs include a request ID to ease tracing.
