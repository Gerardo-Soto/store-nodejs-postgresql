// load environment vars
const { config } = require('../config/config');

//load sequelize lib
const { Sequelize } = require('sequelize');

// encode sensitive data
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

//URI
const URI = `${config.dbProtocol}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

console.log(URI);

// connection (option 1): passing a connext URI for postgres
const sequelize = new Sequelize(
    URI,
    {
        dialect: `${config.dbProtocol}`,
        logging: console.log
    }
);

// export our connection:
module.exports = sequelize;