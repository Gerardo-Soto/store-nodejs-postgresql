//This is the simplest possible way to connect with pgAdmin Pool:

const { Pool } = require('pg');
//const { database, password } = require('pg/lib/defaults');

const { config } = require('../config/config');

// encode sensitive data
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);


const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const pool = new Pool({ connectionString: URI });

// export our module:
module.exports = pool;
