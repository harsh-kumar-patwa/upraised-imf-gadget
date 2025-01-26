
# Upraised-Imf-Gadget

This is a top-secret gadget management system built for IMF agents. It provides a RESTful API for managing gadgets, including creating, retrieving, updating, decommissioning, and initiating self-destruct sequences.

## Demo Video

[Link to Demo Video](INSERT_YOUR_DEMO_VIDEO_LINK_HERE)

## Technology Stack

*   **Node.js:** JavaScript runtime environment
*   **Express.js:** Web framework for Node.js
*   **Prisma:** Next-generation ORM for Node.js and TypeScript
*   **PostgreSQL:** Relational database
*   **JWT:** JSON Web Tokens for authentication
*   **Docker:** Containerization
*   **Render:** Cloud platform for deployment
*   **Swagger:** API documentation

## Project Structure

```

imf-gadget-api/
├── controllers/        \# API request handlers
├── middlewares/        \# Express middlewares (auth, rate limiting)
├── routes/             \# API route definitions
├── services/           \# Business logic (interaction with Prisma)
├── swagger/            \# Swagger/OpenAPI documentation setup
├── utils/              \# Utility functions (codename generation)
├── .dockerignore       \# Files to ignore when building Docker image
├── .env.example        \# Example environment variables file
├── Dockerfile          \# Dockerfile for building the application image
├── docker-compose.yml  \# Docker Compose file for local development
├── package.json        \# Project metadata and dependencies
├── package-lock.json   \# Exact dependency versions
├── prisma/             \# Prisma schema and migrations
│   └── schema.prisma
└── server.js           \# Main application entry point

````

## Prerequisites

*   **Node.js (v20 or later):** [https://nodejs.org/](https://nodejs.org/)
*   **npm (v9 or later):** Usually comes with Node.js
*   **Docker:** [https://www.docker.com/get-started](https://www.docker.com/get-started)
*   **PostgreSQL:** You'll need a PostgreSQL database. You can install it locally or use a cloud-hosted database (e.g., Render, Supabase, AWS RDS, Heroku Postgres).
*   **Render Account:** For deploying the application: [https://render.com/](https://render.com/)

## Setup

1.  **Clone the repository:**

    ```bash
    git clone [<repository-url>](https://github.com/harsh-kumar-patwa/upraised-imf-gadget)
    cd upraised-imf-gadget
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**

    *   Create a `.env` file in the root directory of the project.
    *   Copy the contents of `.env.example` into `.env`.
    *   Fill in the required environment variables:
        *   `DATABASE_URL`: Your PostgreSQL database connection string.
        *   `DIRECT_URL`: (Optional) If required for Prisma migrations with your database.
        *   `JWT_SECRET`: A strong secret for signing JWT tokens.
        *   `JWT_REFRESH_SECRET`: Another strong secret for signing refresh tokens.
        *   `GEMINI_API_KEY`: Your Google Gemini API key for codename generation.
        *   `NODE_ENV`: Set to `development` for local development and `production` for deployment.

4.  **Prisma Setup:**

    *   **Initialize Prisma:**

        ```bash
        npx prisma init
        ```

    *   **Edit `schema.prisma`:**
        *   Make sure the `provider` in the `datasource` block is set to `postgresql`.
        *   Update the `binaryTargets` in the `generator client` block to include:
            ```prisma
            binaryTargets = ["native", "linux-musl-openssl-3.0.x", "linux-musl"]
            ```

    *   **Migrate the database:**

        ```bash
        npx prisma migrate dev --name init
        ```

    *   **Generate Prisma Client:**

        ```bash
        npx prisma generate
        ```

## Running the Application Locally

1.  **Using Node.js (without Docker):**

    ```bash
    npm run dev
    ```

    This will start the server using `nodemon` for automatic restarts on file changes.

2.  **Using Docker:**

    ```bash
    docker-compose up --build
    ```

    This will build the Docker image (if it doesn't exist) and start the application in a container.

The API will be accessible at `http://localhost:3000`.

## API Documentation

*   Swagger API documentation is available at `/api-docs` (e.g., `http://localhost:3000/api-docs` , `https://upraised-imf-gadget.onrender.com/api-docs`).

## Testing the APIs

You can test the APIs using tools like:

*   **Swagger UI:** Access the Swagger UI at `/api-docs` to interactively test the API endpoints.
*   **Postman:** Import the provided `postman_collection.json` into Postman to get a pre-configured set of requests.
*   **curl:** Use `curl` commands from your terminal.

**Example `curl` Commands:**

**1. Create a Test User (Temporary Route):**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "agentId": "admin",
  "password": "secret",
  "role": "admin"
}' http://localhost:3000/api/auth/create-test-user
````

**2. Login:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "agentId": "admin",
  "password": "secret"
}' http://localhost:3000/api/auth/login
```

  * This will return an `accessToken` and set a `refreshToken` cookie.

**3. Get All Gadgets:**

```bash
curl -X GET -H "Authorization: Bearer <your_access_token>" http://localhost:3000/api/gadgets
```

**4. Create a Gadget (Requires Admin Role):**

```bash
curl -X POST -H "Authorization: Bearer <your_access_token>" http://localhost:3000/api/gadgets
```

**5. Update a Gadget (Requires Admin Role):**

```bash
curl -X PATCH -H "Authorization: Bearer <your_access_token>" -H "Content-Type: application/json" -d '{
  "name": "New Gadget Name",
  "status": "Deployed"
}' http://localhost:3000/api/gadgets/<gadget_id>
```

**6. Decommission a Gadget (Requires Admin Role):**

```bash
curl -X DELETE -H "Authorization: Bearer <your_access_token>" http://localhost:3000/api/gadgets/<gadget_id>
```

**7. Initiate Self-Destruct (Requires Admin Role):**

```bash
curl -X POST -H "Authorization: Bearer <your_access_token>" http://localhost:3000/api/gadgets/<gadget_id>/self-destruct
```




