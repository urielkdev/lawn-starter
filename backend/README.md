## Description

Backend built with NestJS, using Prisma as the ORM.

(For decisions and a more detailed description, see the [main README.md](../README.md))

Swagger run in `/docs`

[Insomnia collection ready to import](./insomnia_lawnstarter_star_wars_api.yaml)

## Note

It is strongly recommended to run all applications using docker-compose for a better experience.  
To run with docker-compose, refer to the [main README.md](../README.md).

## Installation and Running Without Docker

### Prerequisites

- Copy `.env.example`, rename it to `.env`, and fill in the correct values
- SQS queue
- Database
- Node.js 20+

### Install Dependencies

```bash
$ yarn install
```

### Database Setup

- Run:

```bash
$ yarn prisma migrate dev
```

### Running the Application

```bash
# Development
$ yarn start

# Watch mode
$ yarn start:dev

# Production mode
$ yarn build
$ yarn start:prod
```

To verify the application is running, visit `localhost:3000/health`.

## Testing

```bash
$ yarn test
```

## View/Edit Database Data

```bash
$ yarn db-studio
```

## Features

### Routes

- [x] PUT /people - Populate the people table
- [x] GET /people - Retrieve a list of people filtered by search-param
- [x] GET /people/:id - Retrieve a person by ID
- [x] PUT /movies - Populate the movies table
- [x] GET /movies - Retrieve a list of movies filtered by search-param
- [x] GET /movies/:id - Retrieve a movie by ID
- [x] PUT /statistics - Populate the statistics table
- [x] GET /statistics - Retrieve a list of statistics

### TODO

- Add more tests
- Fix the "// TODO" comments in the code
