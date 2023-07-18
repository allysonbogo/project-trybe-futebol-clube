import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeUser from '../database/models/UserModel';
import SequelizeMatch from '../database/models/MatchModel';
import { user, users, validLoginBody, invalidEmailLoginBody, invalidPswdLoginBody } from './mocks/user.mock';
import { createMatchBody, match, matches, updateMatchBody } from './mocks/match.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('/matches', function () {
  afterEach(function () {
    sinon.restore();
  })

  describe('.GET', function () {
    it('should return all matches', async function () {
      sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
  
      const { body: { token } } = await chai.request(app).post('/login').send(validLoginBody);
  
      sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);
  
      const { status, body } = await chai
        .request(app)
        .get('/matches')
        .set('Authorization', 'Bearer ' + token);
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(matches);
    });
  
    it('should return a match by id', async function () {
      sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
  
      const { body: { token } } = await chai.request(app).post('/login').send(validLoginBody);
  
      sinon.stub(SequelizeMatch, 'findOne').resolves(match as any);
  
      const { status, body } = await chai
        .request(app)
        .get('/matches/1')
        .set('Authorization', 'Bearer ' + token);
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(match);
    });

    it('should return an error when passing a non-existent id', async function () {
      sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
  
      const { body: { token } } = await chai.request(app).post('/login').send(validLoginBody);
  
      sinon.stub(SequelizeMatch, 'findOne').resolves(null);
  
      const { status, body } = await chai
        .request(app)
        .get('/matches/999')
        .set('Authorization', 'Bearer ' + token);
  
      expect(status).to.equal(404);
      expect(body).to.deep.equal({ message: 'Match 999 not found' });
    });
  });

  describe('.PATCH', function () {
    it('should finish a match by id', async function () {
      sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
  
      const { body: { token } } = await chai.request(app).post('/login').send(validLoginBody);
  
      sinon.stub(SequelizeMatch, 'findOne').resolves(match as any);
  
      const { status, body } = await chai
        .request(app)
        .patch('/matches/1/finish')
        .set('Authorization', 'Bearer ' + token);
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal({ message: 'Finished' });
    });

    it('should return an updated match by id', async function () {
      sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
  
      const { body: { token } } = await chai.request(app).post('/login').send(validLoginBody);
  
      sinon.stub(SequelizeMatch, 'findOne').resolves(match as any);
  
      const { status, body } = await chai
        .request(app)
        .patch('/matches/1')
        .send(updateMatchBody)
        .set('Authorization', 'Bearer ' + token);
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(match);
    });
  })

  describe('.POST', function () {
    it('should create a match', async function () {
      sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
  
      const { body: { token } } = await chai.request(app).post('/login').send(validLoginBody);
  
      sinon.stub(SequelizeMatch, 'create').resolves(match as any);
  
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send(createMatchBody)
        .set('Authorization', 'Bearer ' + token);
  
      expect(status).to.equal(201);
      expect(body).to.deep.equal(match);
    });
  })
});
