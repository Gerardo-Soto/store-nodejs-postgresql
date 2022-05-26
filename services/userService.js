const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

// Old connection to Database
//const getConnection = require('../libs/postgres');
// New connection to Database with Pool
//const pool = require('../libs/postgresPool');

// our connection using the library Sequelize that use Pool
//const sequelize = require('../libs/sequelize');

// our new connection using ORM
// sequelize.setupModels.init makes a namespace where saved all models, called:
// database/user.models.js > config > modelName: 'User' == models.User
const { models } = require('../libs/sequelize');


class UserService {
    constructor() {
        // old connection, the new pool is into Sequelize library
        /*this.pool = pool;
        this.pool.on('error', (err) => console.log(err));*/
    }

    async create(data) {
        // this data is already validated by the middleware
//        console.log(data);

        // encrypt sensitive data
        data.password = await bcrypt.hash(data.password, 6);// hash salt 5 to 10

        // Create the new user with ORM:
        const newUser = await models.User.create(data);
        return newUser;
    }

    
    async findAll() {
        // route: /users/

        //const client = await getConnection();// the value is immediately? no, => await
        //const queryResponse = await client.query('SELECT * FROM tasks');// the value is immediately? no, => await
        //const question = 'SELECT * FROM tasks;';// query with SQL
        const question = await models.User.findAll({
            include: ['customer']
        });
        //const [results, metadata] = await sequelize.query(question);
        
        return question;
    }

    async findOne(id) {
        // route: /users/{int}
        /*const id = parseInt(id);

        const question = 'SELECT * FROM tasks WHERE id = '+id+' LIMIT 1;';
        const [result, metadata] = await sequelize.query(question);

        return { result };*/
        const user = await models.User.findByPk(id);// id is validated by validatorHandler
        if(!user){
            throw boom.notFound('My error in [userService/findOne]: user not found.');
        }
        return user;
    }

    async findByEmail(email) {
        const options = {
            include: ['customer'],
            where: {}
        };
        //console.log(query);
        //const { email } = query;
        console.log(email);
        if (email){
            options.where.email = {
                [Op.eq]: email
            };
        }
        const user = await models.User.findOne(options);
        return user;
    }

    async updateOne(id, changes) {
        // route: /users/{int}
        //const id = parseInt(id); // this validate is apply on validatorHandler
        
        // Sequelize method:
        /*const question = 'UPDATE tasks SET title='+newTitle+' WHERE id='+id+';';
        const [result, metadata] = await sequelize.query(question);

        return { result };*/

        // Sequelize model
        const user = await this.findOne(id);
        
        const updated = await user.update(changes);
        return updated;
    }


    // delete a user by id
    async deleteOne(id) {
        const user = await this.findOne(id);// id validate with validatorHandler

        await user.destroy();
        return { id };
    }

    // delete a user by email
    async deleteByEmail(email) {

    }


    // authentication user
    async auth(email, password) {
         
    }
}

module.exports = UserService;