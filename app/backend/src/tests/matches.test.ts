import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';
import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import { matches } from './mocks/matchesMock';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota matches', () => {

  afterEach(sinon.restore);

  it('Retorna todas as partidas', async function() {
    sinon.stub(SequelizeMatchesModel, 'findAll').resolves(matches as any);

    const allMatches = await chai.request(app).get('/matches');
    
    expect(allMatches.status).to.equal(200);
    expect(allMatches.body).to.be.deep.equal(matches);
  });

  it('Retorna todas as partidas filtradas pela query', async function() {
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

  it('Retorna uma mensagem "Gols da partida atualizados" ao atualizar uma partida em andamento', async function() {
    sinon.stub(JWT, 'verify').returns('validToken');
    sinon.stub(SequelizeMatchesModel, 'update').resolves();

    const httpResponse = await chai.request(app).patch('/matches/3').set('authorization', 'validToken').send({
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    });
    
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Gols da partida atualizados' });
  });

  it('Retorna uma partida criada com sucesso', async function() {
    sinon.stub(JWT, 'verify').returns('validToken');
    sinon.stub(SequelizeTeamsModel,'findByPk').onFirstCall().resolves({
      id: 12,
      teamName: "Palmeiras"
    } as any).onSecondCall().resolves({
      id: 5,
      teamName: "Fluminense"
    } as any)
    sinon.stub(SequelizeMatchesModel, 'create').resolves({
      id: 1,
      homeTeamId: 12,
      homeTeamGoals: 4,
      awayTeamId: 5,
      awayTeamGoals: 1,
      inProgress: true
    } as any);

    const httpResponse = await chai.request(app).post('/matches').set('authorization', 'validToken').send({
      homeTeamId: 12, 
      awayTeamId: 5,
      homeTeamGoals: 4,
      awayTeamGoals: 1
    });
    
    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.be.deep.equal({
      id: 1,
      homeTeamId: 12,
      homeTeamGoals: 4,
      awayTeamId: 5,
      awayTeamGoals: 1,
      inProgress: true
    });
  });
});