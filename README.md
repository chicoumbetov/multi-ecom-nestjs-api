# Multi-Ecom NestJS API

This repository hosts the robust backend API for a full-featured multi-shop e-commerce platform. Built with **NestJS**, **Prisma**, and **PostgreSQL**, this API provides a scalable and secure foundation for managing multiple independent online stores, products, orders, users, and content.

The frontend application, built with Next.js, is currently in development and deployed [here](https://multi-ecom-nextjs-with-cms.netlify.app/).

## Table of Contents

- [Key Features & Concepts](#key-features--concepts)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Key Features & Concepts

This backend project demonstrates a strong understanding and practical application of modern backend development principles, specifically addressing the needs of a multi-shop e-commerce system.

- **Modular & Scalable Architecture (NestJS):**

    - Organized into distinct, decoupled modules (`Auth`, `User`, `Store`, `Product`, `Order`, `Category`, `Review`, `File`, `Statistics`), promoting maintainability and scalability.
    - Leverages NestJS's dependency injection system for clean, testable code.

- **Robust Data Modeling with Prisma ORM:**

    - Utilizes **Prisma** as a powerful, type-safe ORM for interacting with the **PostgreSQL** database.
    - The `schema.prisma` defines a comprehensive data model for `User`, `Store`, `Product`, `Category`, `Color`, `Review`, `Order`, and `OrderItem` entities, showcasing effective relational database design.
    - Clear one-to-many and many-to-many relationships (`User` to `Store`, `Store` to `Product`, `Product` to `Category`, `Order` to `OrderItem`, etc.).

- **Advanced Authentication & Authorization:**

    - **JWT-based Authentication:** Securely issues and validates JSON Web Tokens for API access.
    - **OAuth 2.0 Integration:** Seamless user authentication via **Google** and **Yandex**, demonstrating third-party service integration using Passport.js strategies.
    - **Refresh Token Mechanism:** Implemented for enhanced security and improved user experience, providing a method to obtain new access tokens without repeated logins.
    - **Authorization Guards:** Protected routes using custom `@Auth()` decorators and `JwtAuthGuard` to ensure only authenticated users can access sensitive endpoints.

- **Clear Separation of Concerns (Controllers, Services, DTOs):**

    - **Controllers:** Handle incoming HTTP requests, route them to appropriate services, and manage responses (e.g., `ProductController` for product-related operations).
    - **Services:** Encapsulate all business logic and interact with the database via Prisma (e.g., `ProductService` for product creation, retrieval, update, and deletion logic).
    - **DTOs (Data Transfer Objects):** Utilize `class-validator` for robust request payload validation (e.g., `ProductDto` for defining structure and validation rules for product creation/update requests), ensuring data integrity.

- **Multi-Shop Functionality:**

    - The `Store` entity is central to the multi-shop architecture, allowing multiple independent e-commerce stores to operate within the same system.
    - Products, categories, colors, reviews, and order items are all logically associated with specific stores, enabling true multi-tenancy.

- **Comprehensive API Endpoints:**

    - Provides a rich set of RESTful API endpoints for managing all aspects of the e-commerce platform, including product catalog, user management, store administration, order processing, reviews, and more.
    - Examples: `/products` (search, filter), `/products/by-storeId/:storeId`, `/auth/login`, `/auth/google`, `/orders`.

- **Environment Configuration:**

    - Securely manages sensitive information like database connection strings, JWT secrets, and OAuth credentials using environment variables and NestJS's `@nestjs/config` module.

- **Error Handling:**
    - Implements centralized error handling with specific exceptions (`NotFoundException`, `BadRequestException`, `UnauthorizedException`) to provide clear and informative API responses.

## Technologies Used

- **Backend Framework:** [NestJS](https://nestjs.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [Passport.js](https://www.passportjs.org/) (JWT, Google OAuth2, Yandex OAuth2)
- **Hashing:** [Argon2](https://github.com/P-H-C/phc-argon2)
- **Validation:** [Class Validator](https://github.com/typestack/class-validator)
- **Environment Management:** `@nestjs/config`
- **Deployment:** Render
- **Other Libraries:** `cookie-parser`, `dayjs`, `fs-extra`

## API Endpoints

The API is deployed at: `https://multi-ecom-nestjs-api.onrender.com/api`

Here's a brief overview of some key endpoint categories:

- **Authentication (`/auth`)**:
    - `POST /auth/login`: User login with email and password.
    - `POST /auth/register`: User registration with email and password.
    - `POST /auth/login/access-token`: Obtain new access token using refresh token.
    - `POST /auth/logout`: Invalidate session/refresh token.
    - `GET /auth/google`: Initiate Google OAuth login.
    - `GET /auth/google/callback`: Google OAuth callback endpoint.
    - `GET /auth/yandex`: Initiate Yandex OAuth login.
    - `GET /auth/yandex/callback`: Yandex OAuth callback endpoint.
- **Products (`/products`)**:
    - `GET /products`: Retrieve all products (with optional search term).
    - `GET /products/by-storeId/:storeId`: Get products by store ID (authenticated).
    - `GET /products/by-id/:id`: Get product by ID.
    - `GET /products/by-category/:categoryId`: Get products by category.
    - `GET /products/most-popular`: Get most popular products based on order items.
    - `GET /products/similar/:id`: Get products similar to a given product.
    - `POST /products/:storeId`: Create a new product for a specific store (authenticated).
    - `PUT /products/:id`: Update an existing product (authenticated).
    - `DELETE /products/:id`: Delete a product (authenticated).
- **Users (`/users`)**: (Implicit from modules, likely `/users` or `/profile`)
- **Stores (`/stores`)**: (Implicit from modules)
- **Categories (`/categories`)**: (Implicit from modules)
- **Orders (`/orders`)**: (Implicit from modules, likely handles Yookassa integration)
- **Files (`/files`)**: (Implicit from modules, likely for image uploads)
- **Reviews (`/reviews`)**: (Implicit from modules)
- **Statistics (`/statistics`)**: (Implicit from modules)

## Project Structure

The project follows a modular and feature-driven structure:

```
src/
├── auth/ # Authentication and Authorization module
│ ├── decorators/ # Custom decorators (e.g., @Auth())
│ ├── dto/ # DTOs for authentication (e.g., AuthDto)
│ ├── guards/ # Guards for protecting routes (e.g., JwtAuthGuard)
│ ├── strategies/ # Passport strategies (JWT, Google, Yandex)
│ ├── auth.controller.ts
│ ├── auth.module.ts
│ └── auth.service.ts
├── category/ # Category management module
├── color/ # Color management module
├── config/ # Application configuration (JWT, CORS, etc.)
├── file/ # File upload and management module
├── order/ # Order processing and Yookassa integration module
├── product/ # Product management module
│ ├── dto/ # DTOs for products (ProductDto)
│ ├── product.controller.ts
│ ├── product.module.ts
│ └── product.service.ts
├── review/ # Product review module
├── store/ # Store management module
├── user/ # User management module
├── statistics/ # Data statistics module
├── prisma.service.ts # Global Prisma client instance
├── app.module.ts # Root module, imports all feature modules
└── main.ts # Application entry point
├── ...
└── schema.prisma # Prisma database schema definition
```

## Getting Started

Follow these instructions to set up and run the backend API locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or Yarn
- PostgreSQL database
- Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/multi-ecom-nestjs-api.git](https://github.com/YOUR_USERNAME/multi-ecom-nestjs-api.git)
    cd multi-ecom-nestjs-api
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the project root and populate it with your environment variables. Refer to `.env.example` (or the `.env` content from your previous message) for required variables.

    ```env
    # when local DB PostgreSQL used
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/multi-ecom-next-nest?schema=public"
    # INTERNAL_DB_URL="..." # For Render deployment
    # EXTERNAL_DB_URL="..." # For Render deployment

    CLIENT_URL=http://localhost:3000
    NODE_ENV=dev
    JWT_SECRET=YOUR_SUPER_SECRET_JWT_KEY

    GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

    YANDEX_CLIENT_ID=YOUR_YANDEX_CLIENT_ID
    YANDEX_CLIENT_SECRET=YOUR_YANDEX_CLIENT_SECRET

    YOOKASSA_SHOP_ID=YOUR_YOOKASSA_SHOP_ID
    YOOKASSA_SECRET_KEY=YOUR_YOOKASSA_SECRET_KEY

    SERVER_URL=http://localhost:5001 # Or your actual backend URL
    SERVER_DOMAIN=localhost # Or your actual backend domain
    ```

    - **Important:** Replace placeholder values (`YOUR_SUPER_SECRET_JWT_KEY`, `YOUR_GOOGLE_CLIENT_ID`, etc.) with your actual credentials. For `JWT_SECRET`, generate a strong, random string.
    - Ensure your `DATABASE_URL` points to your local PostgreSQL instance.

4.  **Run Prisma migrations:**
    Generate Prisma client and apply migrations to your database.
    ```bash
    npx prisma generate
    npx prisma migrate dev --name init
    ```
    This will create the database tables defined in your `schema.prisma`.

## Running the Application

- **Development mode (with hot-reloading):**

    ```bash
    npm run start:dev
    # or
    yarn start:dev
    ```

    The API will be available at `http://localhost:5001/api` (or the port defined in `SERVER_URL` in your `.env`).

- **Production mode:**
    ```bash
    npm run build
    npm run start:prod
    # or
    yarn build
    yarn start:prod
    ```

## Deployment

The backend API is deployed on [Render](https://render.com/) and accessible at:
`https://multi-ecom-nestjs-api.onrender.com/api`

The deployment leverages environment variables for database connection (using `EXTERNAL_DB_URL` or `INTERNAL_DB_URL` for Render's internal database) and other sensitive configurations.

## Contributing

Contributions are welcome! If you find a bug or want to suggest an enhancement, please open an issue or submit a pull request.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Installed packages

yarn add @nestjs/config class-validator class-transformer

yarn add @nestjs/jwt @nestjs/passport passport passport-jwt passport-google-oa
uth20 cookie-parser argon2 dayjs fs-extra @nestjs/serve-static app-root-path @prisma/client

Yandex and payment API:
yarn add passport-yandex @a2seven/yoo-checkout

Typizations:
yarn add -D @types/multer @types/fs-extra @types/passport-jwt @types/passport-google-oauth20 @types/cookie-parser

ALTER USER postgres WITH PASSWORD 'your_new_password';

##

Instal depedencies above
Connect postgress thourhg beekeeper or pgAdmin

Define tables in schema.prisma
run `prisma db push`
run `prisma generate` in order to make prisma generate types

Check db with created tables defined in schema.

add prisma.service.ts from documentation

use cookieParser, enableCors in main.ts
enable env vars in app.module.ts through ConfigModule

Generate authorization instances
`nest generate res auth --no-spec`
Select "REST API"
"no" to generate CRUD entry points

Generate user instances
`nest generate res user --no-spec`

Configurate jwt in jwt.config.ts

Ensure that TS sees variables in env:
npm install joi
use Joi in src/config/config.module.ts

create AuthDto
Use AuthDto in User service to create 4 functions - create, getById, getByEmail, toggleFavorite

Create 3 strategies of authentication:

1. JWT - auth/strategies/jwt.strategy.ts
2. Google - auth/strategies/google
3. Yandex - auth/strategies/yandex

or any other on passport.js

# Swagger UI:

http://localhost:5001/api

https://docs.nestjs.com/deployment

# Docker build image container:

docker build -t multi-ecom-nestjs-api .

# Run docker with command:

docker-compose up --build
or
docker run -p 5001:5001 multi-ecom-nestjs-api

Generating instances:
nest g res store --no-spec

nest g res color --no-spec
nest g res review --no-spec

nest g res category --no-spec

nest g res file --no-spec

nest g res product --no-spec

nest g res order --no-spec
nest g res statistics --no-spec

https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing?lang=en#test-bank-card
test payments:
Number Type of card 3-D Secure
5555555555554477 Mastercard ✔️
5555555555554444 Mastercard ➖
6759649826438453 Maestro ➖
4793128161644804 Visa ✔️
4111111111111111 Visa ➖
4175001000000017 Visa Electron ➖
2200000000000004 Mir ✔️
2202474301322987 Mir ➖
370000000000002 American Express ➖
3528000700000000 JCB ➖
36700102000000 Diners Club
