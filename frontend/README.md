## Description

Frontend built with ReactJS + Vite.

(For decisions and a more detailed description, see the [main README.md](../README.md))

## Note

It is strongly recommended to run all applications using docker-compose for a better experience.  
To run with docker-compose, refer to the [main README.md](../README.md).

## Installation and Running Without Docker

### Prerequisites

- Copy `.env.example`, rename it to `.env`, and fill in the correct values
- Ensure the star-wars-api is running
- Node.js 20+

### Install Dependencies

```bash
$ yarn install
```

### Running the Application

```bash
# Development
$ yarn dev

# Watch mode
$ yarn start:dev

# Production mode
$ yarn build
$ yarn preview
```

To verify the application is running, visit `http://localhost:4173/` (with Docker) or `http://localhost:5173/` (without Docker) in your browser.

## TODO

- Add more tests
- Fix the "// TODO" comments in the code
