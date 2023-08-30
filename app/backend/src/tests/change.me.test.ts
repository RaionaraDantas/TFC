import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/SequelizeTeamsModel';
import teamsList from '../tests/mocks/teamsMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {

  it('Retorna todos os times', async function() {
    sinon.stub(Teams, 'findAll').resolves(teamsList as any);

    const allTeams = await chai.request(app).get('/teams');
    
    expect(allTeams.status).to.equal(200);
  });
  });