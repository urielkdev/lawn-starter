## Description

TODO

## Installation

```bash
$ yarn install
```

## Setup database

- Run:

```bash
$ yarn prisma migrate dev
```

## Running the app without Docker

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn build
$ yarn start:prod
```

To test if the application is running just go to localhost:3000/health

## Test

```bash
$ yarn test
```

## To view/edit database data

```bash
$ yarn db-studio
```

## Features

#### Routes

- [x] PUT /people - Populate people table
- [x] GET /people - Get the list of people with search-param
- [x] GET /people/:id - Get person by id
- [x] PUT /movies - Populate movies table
- [x] GET /movies - Get the list of movies with search-param
- [x] GET /movies/:id - Get person by id

### TODO

- Exercise (3) - statistics
- Cron to populate both people and movies
- Create more tests
- Create pagination to routes that list multiple records
- Fix the "// TODO" in the code
