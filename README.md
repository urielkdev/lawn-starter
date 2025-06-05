## Description

FullStack application to obtain information about characters and films from the Star Wars universe. As well as statistics on routes used by customers.

[Test instructions document](./LawnStarter_take-home_exercise_v2.pdf)

[Short answer questions](./QUESTIONS.md)

## Technologies

### Backend

- Built with NestJS, using Prisma as the ORM.

#### Database

- Postgres

A populate function was created to fetch data from [SWAPI](https://swapi.tech/) and store it in the database.

Initially, I considered using Redis as a cache for data from [SWAPI](https://swapi.tech/). However, since the official API changed in the past and was discontinued, I decided to persist the data in a database to ensure that, if this happens again, the application will already have all the data saved.

Another motivation for using PostgreSQL was to establish relationships between Movies and People, making queries easier. We can persist the logs and statistics.

By storing the data in the database, we avoid depending on [SWAPI](https://swapi.tech/) being online.

#### ElasticMQ

- ElasticMQ is a message queue system, offering an actor-based Scala implementation and an SQS-compatible REST (query) interface.

I chose ElasticMQ to simulate AWS SQS and handle the messaging for statistics. (it is lighter and faster than localstack)

### Frontend

- Built with ReactJS + Vite.

## Use Cases

// TODO

## Database Diagram

// TODO

[Prisma Schema](./backend/prisma/schema.prisma)

## Running the Entire Application with Docker Compose

Tested on Windows and MacOS

### Prerequisites

- Docker Compose (installation guide: https://docs.docker.com/compose/install/)

```bash
$ docker compose up --build
```

## Using the Application

### Backend

Import the Insomnia collection (recommended):  
[Insomnia collection ready to import](./backend/insomnia_lawnstarter_star_wars_api.yaml)

Use with Swagger at `http://localhost:3000/docs`.

(Statistics route: `http://localhost:3000/statistics`)

Read the [backend README.md](./backend/README.md) for more information.

### Frontend

Visit `http://localhost:4173/` in your browser.

Read the [frontend README.md](./frontend/README.md) for more information.

### TODO

- Draw the use cases, diagrams, and database modeling
- Deploy the application to make it easier to view without running locally
- Add more tests
- Fix the "// TODO"s in the code
