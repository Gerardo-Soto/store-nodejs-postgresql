// during the test the env variable is set to test
process.env.NODE_ENV = 'test';

let { Category } = require('../db/models/category.model');

// require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let expect = require('chai').expect;
let should = chai.should();

chai.use(chaiHttp);

const request = require('supertest');

const uriV1 = '/api/v1/categories';

//Our parent block
describe('Test for categories.', () => {
    it('It should get all categories', (done) => {
        chai.request(server)
        .get(uriV1)
        .end((error, res) => {
            expect(res).to.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(4);

            done();
        });
    });
});