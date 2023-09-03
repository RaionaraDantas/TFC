import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import nullEmail from './mocks/userMock';
import nullPassword from './mocks/userMock';
import user from './mocks/userMock';
import token from './mocks/userMock';
import validateLogin from './mocks/userMock';
import UsersModel from '../database/models/SequelizeUsersModel';
import * as jwt from 'jsonwebtoken';



chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota user', () => {

  it('Retorna mensagem de erro quando não for passado email', async function() {
    
    const response = await chai.request(app).post('/login').send(nullEmail);
    
    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({ message: "All fields must be filled" });
  });

  it('Retorna mensagem de erro quando não for passado senha', async function() {
    
    const response = await chai.request(app).post('/login').send(nullPassword);
    
    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({ message: "All fields must be filled" });
  });

  it('Retorna token quando login efetuado com sucesso', async function() {
    sinon.stub(UsersModel, 'findOne').resolves(user as any);
    sinon.stub(jwt, 'sign').resolves(token.token as any);
    
    const response = await chai.request(app).post('/login').send(validateLogin);
    
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(token);
  });

  afterEach(sinon.restore);
  });