# sample-express

Express app with load test

## How to start

- Start your own MySql Database
- Setup .env file like the .env.example
- Run `docker-compose build` (you need docker to do this)
- Run `docker-compose up -d`
- You can connect to `http://localhost:4000`

## How to run load test

- You can config in loadTest.yml file in the root
- Run `npm run test`
