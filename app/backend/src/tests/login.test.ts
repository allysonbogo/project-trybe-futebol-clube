import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeUser from '../database/models/UserModel';
import { user, users, validLoginBody, invalidEmailLoginBody, invalidPswdLoginBody } from './mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', function() {
  afterEach(function() {
    sinon.restore();
  })

  it('should return all users', async function() {
    sinon.stub(SequelizeUser, 'findAll').resolves(users as any);

    const { status, body } = await chai.request(app).get('/login');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(users);
  });

  it('should return a user by id', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);

    const { status, body } = await chai.request(app).get('/login/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(user);
  });

  it('should return an error when passing a non-existent id', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).get('/login/999');

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'User 999 not found' });
  });

  it('should return a token', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);

    const { status, body } = await chai.request(app).post('/login').send(validLoginBody);

    expect(status).to.equal(200);
    expect(body).to.have.key('token');
  });

  it('should return an error when passing a non-existent email', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login').send(invalidEmailLoginBody);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('should return an error when passing an invalid email', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);

    const { status, body } = await chai.request(app).post('/login').send(invalidEmailLoginBody);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('should return an error when passing a wrong password', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);

    const { status, body } = await chai.request(app).post('/login').send(invalidPswdLoginBody);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('should return an error when not passing an email or password', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);

    const { status, body } = await chai.request(app).post('/login').send({});

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('should return user role', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);

    const tokenResponse = await chai.request(app).post('/login').send(validLoginBody);

    const { status, body } = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', 'Bearer ' + tokenResponse.body.token);

    expect(status).to.equal(200);
    expect(body).to.have.key('role');
  });

  it('should return an error when passing a non-existent email', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);

    const tokenResponse = await chai.request(app).post('/login').send(validLoginBody);

    sinon.restore();
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', 'Bearer ' + tokenResponse.body.token);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('should return an error when passing a wrong token', async function() {
    const { status, body } = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', 'Bearer ' + 'wrong_token');

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token must be a valid token' });
  });

  it('should return an error when not passing a token', async function() {
    const { status, body } = await chai
      .request(app)
      .get('/login/role')

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token not found' });
  });
});
