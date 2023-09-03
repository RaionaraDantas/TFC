import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/SequelizeTeamsModel';
import teamsList from './mocks/teamsMocks';
import teamById from './mocks/teamsMocks';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota teams', () => {

  it('Retorna todos os times', async function() {
    sinon.stub(Teams, 'findAll').resolves(teamsList as any);

    const allTeams = await chai.request(app).get('/teams');
    
    expect(allTeams.status).to.equal(200);
  });

  it('Retorna um time por id', async function() {
    sinon.stub(Teams, 'findByPk').resolves(teamById as any);

    const team = await chai.request(app).get('/teams/1');
    
    expect(team.status).to.equal(200);
    expect(team.body).to.deep.equal(teamById);
  });

  it('Quando o time não existe', async function() {
    sinon.stub(Teams, 'findByPk').resolves(null);

    const team = await chai.request(app).get('/teams/100');
    
    expect(team.status).to.equal(404);
  });
  afterEach(sinon.restore);
  });