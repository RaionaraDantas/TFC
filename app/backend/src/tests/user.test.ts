import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import nullEmail from './mocks/userMock';
import nullPassword from './mocks/userMock';
import user from './mocks/userMock';
import UsersModel from '../models/UsersModel';
import token from './mocks/userMock';
// import validateLogin from './mocks/userMock';
import sequelizeUsersModel from '../database/models/SequelizeUsersModel';
import JWT from '../utils/JWT';



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
  
  it.skip('Retorna token quando login efetuado com sucesso', async function() {
    sinon.stub(sequelizeUsersModel, 'findOne').resolves(user as any);
    sinon.stub(JWT, 'sign').returns('validate token');
    
    const response = await chai.request(app).post('/login').send({
      email: "admin@admin.com",
      password: "secret_admin"
    });
    
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ token: 'validate token' });
  });

  it.skip('Retorna a role do usuário', async function() {
    sinon.stub(sequelizeUsersModel, 'findOne').resolves(user as any);
    sinon.stub(JWT, 'verify').returns({ email: 'admin@admin.com', iat: 1693668878, exp: 1693672478 });
    
    const response = await chai.request(app).get('/login/role').set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY5Mzc4OTc0OCwiZXhwIjoxNjkzODc2MTQ4fQ.YGJH4klj7_YYqmgd_oPRHYJpugpLkR9aOuiEKmTNAZo');
    
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ role: 'admin' });
  });

  afterEach(sinon.restore);
  });