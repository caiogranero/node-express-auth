process.env.NODE_ENV = 'test';

const User = require('../src/models/User');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');

const { expect } = chai;

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach((done) => { // Before each test we empty the database
    User.remove({}, () => {
      done();
    });
  });

  describe('/POST user', () => {
    it('it should create a new user and return a id', (done) => {
      chai.request(server)
        .post('/api/user')
        .send({
          name: 'Caio',
          password: '123',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('string');
          done();
        });
    });

    it('it should not create a new user because send a empty name', (done) => {
      chai.request(server)
        .post('/api/user')
        .send({
          name: '',
          password: '123',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(500);
          expect(res.body).to.be.an('object');
          expect(res.body.error).contains('User validation failed');
          expect(res.body.error).contains('Path `name` is required');
          done();
        });
    });

    it('it should not create a new user because send a empty password', (done) => {
      chai.request(server)
        .post('/api/user')
        .send({
          name: 'Caio',
          password: '',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(500);
          expect(res.body).to.be.an('object');
          expect(res.body.error).contains('User validation failed');
          expect(res.body.error).contains('Path `password` is required');
          done();
        });
    });
  });
});
