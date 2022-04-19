// load environment vars
const { config } = require('../config/config');

// load sequelize lib
const { Sequelize } = require('sequelize');

// Our models function to connect with the ORM
const setupModels = require('../database/index');

// encode sensitive data
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

// URI
const URI = `${config.dbProtocol}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//console.log(URI);

// connection (option 1): passing a context URI for postgres
const sequelize = new Sequelize(
    URI,
    {
        dialect: `${config.dbProtocol}`,
        logging: console.log
    }
);

// setup connection with our ORM 
setupModels(sequelize);

// execute Models on Database, Don't use on Production.
sequelize.sync();

// export our connection:
module.exports = sequelize;
