const boom = require('@hapi/boom');

// Old connection to Database
//const getConnection = require('../libs/postgres');
// New connection to Database with Pool
//const pool = require('../libs/postgresPool');

// our new connection using the library Sequelize that use Pool
const sequelize = require('../libs/sequelize');


class UserService {
    constructor() {
        // old connection, the new pool is into Sequelize library
        /*this.pool = pool;
        this.pool.on('error', (err) => console.log(err));*/
    }

    async create(body) {

        return data;
    }

    async findAll() {
        // route: /users/

        //const client = await getConnection();// the value is immediately? no, => await
        //const queryResponse = await client.query('SELECT * FROM tasks');// the value is immediately? no, => await
        const question = 'SELECT * FROM tasks;';
        const [results, metadata] = await sequelize.query(question);
        
        return { results };
    }

    async findOne(id) {
        // route: /users/{int}
        const id = parseInt(id);

        const question = 'SELECT * FROM tasks WHERE id = '+id+' LIMIT 1;';
        const [result, metadata] = await sequelize.query(question);

        return { result };
    }

    async deleteOne(id) {
        // route: /users/{int}
        const id = parseInt(id);

        /* Deleting data */
        //const question = 'DELETE FROM tasks WHERE id = '+id+' LIMIT 1;';

        /* Update data - Goog practice, no exist attribute is_deleted.*/
        const question = 'UPDATE tasks SET is_deleted=true WHERE id ='+id+' LIMIT 1;';
        const [result, metadata] = await sequelize.query(question);

        return { result };
    }

    async updateOne(id, body) {
        // route: /users/{int}
        const id = parseInt(id);
        const newTitle = body.title;

        const question = 'UPDATE tasks SET title='+newTitle+' WHERE id='+id+';';
        const [result, metadata] = await sequelize.query(question);

        return { result };
    }

    async findTasks(){// ???????????????
        const postgresConnection = await getConnection();
        const queryResponse = await postgresConnection.query('SELECT * FROM tasks;');
        return queryResponse.rows;
    }
}

module.exports = UserService;






















