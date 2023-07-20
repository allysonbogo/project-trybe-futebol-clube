import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('/leaderboard', function() {

  describe('/', function() {
    it('should return general leaderboard', async function() {
      const { status, body } = await chai.request(app).get('/leaderboard');
  
      expect(status).to.equal(200);
    });
  });
  
  describe('/home', function() {
    it('should return home leaderboard', async function() {
      const { status, body } = await chai.request(app).get('/leaderboard/home');
  
      expect(status).to.equal(200);
    });
  });
  
  describe('/away', function() {
    it('should return away leaderboard', async function() {  
      const { status, body } = await chai.request(app).get('/leaderboard/away');
  
      expect(status).to.equal(200);
    });
  });
})
