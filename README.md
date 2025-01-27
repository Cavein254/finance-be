# Stock Market Stimulator

## Overview
The Stock Market Stimulator is an application designed to provide developers with access to historical stock market data for FREE. Unlike many other sites that restrict the number of API calls, this application offers extensive data to support research and experimentation. With over 7,195 stocks and 14 million data points, it is an excellent resource for financial research.

## Features
- **Unlimited Historical Data**: Access over 7,195 stocks and 14 million data points of historical stock market data.
- **Free to Use**: No restrictions on API calls, making it ideal for extensive research.
- **Multiple Databases**: Uses both MariaDB for user data and PostgreSQL for stock market data.
- **Dockerized**: Both databases are running on Docker for easy deployment.
- **Authentication**: Integration with Google authentication using Passport.js.
- **GraphQL Support**: Fast and flexible API using Apollo GraphQL to serve queries and handle mutations.

## Databases
The project uses two databases:

1. **MariaDB**: Stores user information and is used for authentication.
2. **PostgreSQL**: Stores the stock market information. This data is mostly read-only.

Both databases are containerized using Docker for simplicity and scalability.

## Server
The backend is powered by:

- **Express**: Used for handling HTTP requests and integrating Google authentication via Passport.js.
- **Apollo GraphQL**: Used for serving GraphQL queries and handling mutations, chosen for its speed and flexibility.

Both servers run on port `4001`.

## API Documentation
The API documentation is automatically generated using [SpectaQL](https://github.com/anvilco/spectaql), ensuring up-to-date and easy-to-navigate documentation.

## Logging
- **Logging**: Logs are stored locally using [Pino](https://github.com/pinojs/pino) for efficient logging and monitoring of the application.

## Installation
To get started with the Stock Market Stimulator, follow the steps below:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/stock-market-stimulator.git
   cd stock-market-stimulator

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/stock-market-stimulator.git
   cd stock-market-stimulator```

2. Set up Docker containers for MariaDB and PostgreSQL::
   ```bash
   docker-compose up -d```

2. Install PackagesL::
   ```bash
   npm install```

2. start server:
   ```bash
   npm run start```
