# Nodejs Project

## Project Structure

- Models (schemas are created using sequelize)
- Controllers(functions for handling the data)
- Routes(all the API endpoints are listed in the routes)
- Services(all the general function which could be used in the project)
- utils (all the utilities, common functions, and other utilities are managed from utility)
- config(constants, dbConfig and other configs are managed from here)
- server.js (the main file that start the server)


## Technology Stack Used
This project uses the following technological stack:

- [Database] - In database we are using both Mysql.
- [Sequelize] - ORM for managing the relational database(we are using Mysql)
- [Hapijs] - The framework used for creating the endpoints.
- [Nodejs] - The run time javascript environment used for writing our server side code.
- [JWT] - for authenticating our endpoints.

## Installation

This project requires [Node.js](https://nodejs.org/) v12+ to run.
Mysql should be installed and configured in your system
Preferred Mysql Version - 8.0 or above


Install the dependencies and devDependencies and start the server.

```sh
npm i
node server.js
```

Note - use the .env file for using the credentials.