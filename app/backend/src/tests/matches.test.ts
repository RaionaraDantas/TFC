import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';
import { matches } from './mocks/matchesMock';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota matches', () => {

  it('Retorna todas as partidas', async function() {
    sinon.stub(SequelizeMatchesModel, 'findAll').resolves(matches as any);

    const allMatches = await chai.request(app).get('/matches');
    
    expect(allMatches.status).to.equal(200);
    expect(allMatches.body).to.be.deep.equal(matches);
  });

  it.skip('Retorna todas as partidas filtradas pela query', async function() {
    sinon.stub(SequelizeMatchesModel, 'findAll').resolves(matches as any);

    const allMatches = await chai.request(app).get('/matches?inProgress=false');
    
    expect(allMatches.status).to.equal(200);
    expect(allMatches.body).to.be.deep.equal(matches);
  });

  it('Retorna uma partida finalizada', async function() {
    sinon.stub(SequelizeMatchesModel, 'update').resolves(null as any);
    sinon.stub(JWT, 'verify').returns({ email: 'admin@admin.com', iat: 1693668878, exp: 1693672478 });

    const oneMatch = await chai.request(app).patch('/matches/1/finish').set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY5Mzc4OTc0OCwiZXhwIjoxNjkzODc2MTQ4fQ.YGJH4klj7_YYqmgd_oPRHYJpugpLkR9aOuiEKmTNAZo');
    
    expect(oneMatch.status).to.equal(200);
    expect(oneMatch.body).to.be.deep.equal({ message: 'Finished' });
  });
});