import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import Users from '../database/models/users';
import loginService from '../services/loginService';
import ValidationError from '../middleWares/ValidateError';

chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
  id: 1,
  username: "admin",
  role: "admin",
  email: "admin@admin.com",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
}

const bodyMock = {
  email: "admin@email.com",
  password: "secret_admin"
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifSwiaWF0IjoxNjYxOTA3NzAzfQ.1NuT4HqDMOa5y1FCiShTlp8PCI2DwVtq7BOxoHkdy0g"

describe('Login', () => {

  beforeEach(async () => {
    sinon.restore();
  });

  it('should return status 200', async () => {
    sinon.stub(Users, "findOne")
      .resolves(userMock)

    const chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send(bodyMock)

    expect(chaiHttpResponse.status).to.equal(200);
  })
  it('should return token', async () => {
    sinon.stub(loginService, "login")
      .resolves({ token })

    const chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send(bodyMock)

    expect(chaiHttpResponse.body.token).to.equal(token);
  })
  it('should return status 401', async () => {
    sinon.stub(loginService, 'login').callsFake(() => {
      throw new ValidationError(401, 'All fields must be filled')
    })

    const chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send(bodyMock)

    expect(chaiHttpResponse.status).to.equal(401);
  })
  it('should return status 400 case password or email incorrect', async () => {
    sinon.stub(loginService, 'login').callsFake(() => {
      throw new ValidationError(400, 'Incorrect email or password')
    })

    const chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send(bodyMock)

    expect(chaiHttpResponse.status).to.equal(400);
  })
})