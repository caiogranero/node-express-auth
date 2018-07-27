/* eslint no-unused-expressions: 0 */

process.env.NODE_ENV = 'test';

const User = require('../src/models/User');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');

const { expect } = chai;

chai.use(chaiHttp);

describe('Token', () => {
  beforeEach((done) => { // Before each test we empty the database
    const user = new User({ name: 'caio', password: '123' });
    user.save();
    done();
  });

  describe('/GET Token', () => {
    it('it should return a jwt token', (done) => {
      chai.request(server)
        .get('/api/token')
        .query({
          name: 'caio',
          password: '123',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('string');
          done();
        });
    });
  });

  describe('/POST Token/verify', () => {
    it('it should verify if my token is valid', (done) => {
      chai.request(server)
        .get('/api/token')
        .query({
          name: 'caio',
          password: '123',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);

          chai.request(server)
            .post('/api/token/verify')
            .set('x-access-token', res.body.data)
            .end((verifyError, verifyResponse) => {
              expect(verifyResponse.status).to.be.equal(200);
              expect(verifyResponse.body.response).to.be.an('object');
              expect(verifyResponse.body.response.hasSession).to.be.true;
              done();
            });
        });
    });
  });

  describe('/POST Token/decode', () => {
    it('it should decode my token he is valid', (done) => {
      chai.request(server)
        .get('/api/token')
        .query({
          name: 'caio',
          password: '123',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);

          const myToken = `${res.body.data}+1`;
          chai.request(server)
            .post('/api/token/decode')
            .set('x-access-token', myToken)
            .end((verifyError, verifyResponse) => {
              expect(verifyResponse.status).to.be.equal(500);
              console.log(verifyResponse);
              // expect(verifyResponse.body.error.hasSession).to.be.false;
              done();
            });
        });
    });
    
    it('it should return the decoded data of a valid token', (done) => {
      chai.request(server)
        .get('/api/token')
        .query({
          name: 'caio',
          password: '123',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);

          chai.request(server)
            .post('/api/token/decode')
            .set('x-access-token', res.body.data)
            .end((verifyError, verifyResponse) => {
              expect(verifyResponse.status).to.be.equal(200);
              expect(verifyResponse.body.response).to.be.an('object');
              expect(verifyResponse.body.response.name).to.be.equal('caio');
              done();
            });
        });
    });
  });
});