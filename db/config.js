// load environment vars
const { config } = require('../config/config');

// encode sensitive data
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

// URI
const URI = `${config.dbProtocol}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Environments:
module.exports = {
    development: {
        url: URI,
        dialect: `${config.dbProtocol}`,
    },
    production: {
        url: URI,
        dialect: `${config.dbProtocol}`,
    },
} 