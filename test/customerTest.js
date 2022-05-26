// during the test the env variable is set to test
process.env.NODE_ENV = 'test';

let Customer = require('../db/models/customer.model');

// require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let expect = require('chai').expect;
let should = chai.should();

const{ faker } = require('@faker-js/faker');

chai.use(chaiHttp);

const request = require('supertest');

const uriV1 = '/api/v1/customers';

const testCustomer= {
    // Customer attributes
    newName: faker.name.firstName(),
    newLastName: faker.name.lastName(),
    newPhone: faker.phone.phoneNumberFormat(),
    updatedPhone: faker.phone.phoneNumberFormat(),

    // User Attributes
    newEmail: faker.internet.email(),
    newPassword: faker.internet.password(10),
    updatedPassword: faker.internet.password(15),
    role: "Customer",
};
let idNewUser;

//Our parent block
describe('Test for Customers', () => {
    it('It should GET all the Customers', (done) => {
        chai.request(server)
        .get(uriV1)
        .end((error, res) => {
            //console.log(res.body);
            expect(res).to.have.status(200);
            res.body.should.be.a('array');
            //res.body.length.should.be.eql(0);
            done();
        });
    });

    it('it should POST a new customer.', (done) => {
        let newCustomer = {
            name: testCustomer.newName,
            lastName: testCustomer.newLastName,
            phone: testCustomer.newPhone,
            user: {
                email: testCustomer.newEmail,
                password: testCustomer.newPassword,
            }
        }
        chai.request(server)
        .post(uriV1)
        .send(newCustomer)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            idNewCustomer = res.body.id;
            console.log(idNewCustomer);
            
            done();
        });
    });

    /*it('It should get the new Customer by email.', (done) => {
        chai.request(server)
        .get(uriV1 + '/e/' + testCustomer.newEmail)
        .end((error, res) => {
            expect(res).to.have.status(200);
            res.body.should.be.a('object');
            //console.log(res.body.email);
            //expect(res.body.email).to.equal('sdfg');
            res.body.should.have.property('email');
            
            done();
        });
    });*/

    it('It should get the new Customer by id.', (done) => {
        chai.request(server)
        .get(uriV1 + '/' + idNewCustomer)
        .end((error, res) => {
            expect(res).to.have.status(201);
            res.body.should.be.a('object');
            //console.log(res.body.email);
            //expect(res.body.email).to.equal('sdfg');
            //res.body.should.have.property('email');
            console.log(res.body);
            done();
        });
    });
});

