/*
THIS FILE DOESN'T USE YET!   <gerardo.8.soto@gmail.com>
*/


//This is the simplest possible way to connect, query, and disconnect with async/await:

const { Client } = require('pg');
//const { database, password } = require('pg/lib/defaults');
async function getConnection(){
    const client = new Client({
        user:'gerardoisc',
        host:'localhost',
        database:'my-store',
        password:'The-most-secure-password',
        port:5432
    });
    await client.connect();// client.connect() return a Promise
    return client;
}

// export our module:
module.exports = getConnection;

/*
const res = await client.query('SELECT $1::text a message', ['Hello, world, from pg postgres!']);
console.log(res.rows);// my test
console.log(res.rows[0].message);// Hello, world, from pg postgres!
await client.end();
*/