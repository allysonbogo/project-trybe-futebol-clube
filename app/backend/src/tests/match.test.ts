import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeUser from '../database/models/UserModel';
import SequelizeMatch from '../database/models/MatchModel';
import { user, users, validLoginBody, invalidEmailLoginBody, invalidPswdLoginBody } from './mocks/user.mock';
import { match, matches, updateMatchBody, validCreateBody, invalidCreateBody } from './mocks/match.mock';
import SequelizeTeam from '../database/models/TeamModel';

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

    it('should return all finished matches', async function () {
      sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
  
      const { body: { token } } = await chai.request(app).post('/login').send(validLoginBody);
  
      sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);
  
      const { status, body } = await chai
        .request(app)
        .get('/matches')
        .query({ inProgress: 'true' })
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

    it('should return an error when passing a non-existent id', async function () {
      sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
  
      const { body: { token } } = await chai.request(app).post('/login').send(validLoginBody);
  
      sinon.stub(SequelizeMatch, 'findOne').resolves(null);
  
      const { status, body } = await chai
        .request(app)
        .patch('/matches/999/finish')
        .set('Authorization', 'Bearer ' + token);
  
      expect(status).to.equal(404);
      expect(body).to.deep.equal({ message: 'Match 999 not found' });
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

    it('should return an updated match by id', async function () {
      sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
  
      const { body: { token } } = await chai.request(app).post('/login').send(validLoginBody);
  
      sinon.stub(SequelizeMatch, 'findOne').resolves(null);
  
      const { status, body } = await chai
        .request(app)
        .patch('/matches/999')
        .send(updateMatchBody)
        .set('Authorization', 'Bearer ' + token);
  
      expect(status).to.equal(404);
      expect(body).to.deep.equal({ message: 'Match 999 not found' });
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
        .send(validCreateBody)
        .set('Authorization', 'Bearer ' + token);
  
      expect(status).to.equal(201);
      expect(body).to.deep.equal(match);
    });

    it('should return an error when sending two teams with same id', async function () {
      sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
  
      const { body: { token } } = await chai.request(app).post('/login').send(validLoginBody);
  
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send(invalidCreateBody)
        .set('Authorization', 'Bearer ' + token);
  
      expect(status).to.equal(422);
      expect(body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
    });

    it('should return an error when sending a non-existent id', async function () {
      sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
  
      const { body: { token } } = await chai.request(app).post('/login').send(validLoginBody);
  
      sinon.stub(SequelizeTeam, 'findAll').resolves([]);
  
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send({ ...invalidCreateBody, awayTeamId: 1 })
        .set('Authorization', 'Bearer ' + token);
  
      expect(status).to.equal(404);
      expect(body).to.deep.equal({ message: 'There is no team with such id!' });
    });
  })
});
