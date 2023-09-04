import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import nullEmail from './mocks/userMock';
import nullPassword from './mocks/userMock';
import user from './mocks/userMock';
import UsersModel from '../models/UsersModel';
import sequelizeUsersModel from '../database/models/SequelizeUsersModel';
import JWT from '../utils/JWT';
import * as bcrypt from 'bcryptjs';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota user', () => {
  afterEach(sinon.restore);

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
    sinon.stub(sequelizeUsersModel, 'findOne').resolves(user as any);
    sinon.stub(bcrypt, 'compareSync').returns(true);

    sinon.stub(JWT, 'sign').returns('validateToken');
    
    const response = await chai.request(app).post('/login').send({
      email: "admin@admin.com",
      password: "secret_admin"
    });
    
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ token: 'validateToken' });
  });

  it('Retorna a role do usuário', async function() {
    sinon.stub(JWT, 'verify').returns('validToken');
    sinon.stub(sequelizeUsersModel, 'findOne').resolves(user as any);
    
    const response = await chai.request(app).get('/login/role').set('authorization', 'validToken').send();
    
    expect(response.status).to.equal(200);
    // expect(response.body).to.have.key({ role: 'admin' });
  });
  });