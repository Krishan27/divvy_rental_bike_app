process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const fs = require('fs');
//const mocha_bin = fs.realpathSync('./node_modules/mocha/bin/_mocha');
const mocha_bin = fs.realpathSync('../../../node_modules/mocha/bin/_mocha');
argv = [process.argv[0], mocha_file, '-t', 10000];
process.argv = argv.map(arg => JSON.stringify(arg));
require(mocha_bin)

const app = require('../../../app')
const station =require('../../../routes/station')



var should = chai.should();
chai.use(chaiHttp);

//Our parent block
describe('station', () => {
 describe('/GET station', () => {
     it('it should GET station info', (done) => {
     chai.request(app)
       .get('/station')
       .end((err, res) => {
             (res).should.have.status(200);
             (res.body).should.be.a('object');
             (res.body.data.length).should.be.eql(1);
             done();
          });
       });
  });

});