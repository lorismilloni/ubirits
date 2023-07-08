// import * as sinon from 'sinon';
// import * as chai from 'chai';
// import { app } from '../app';
// import Users from '../database/models/users';
// import registerService from '../services/registerService';
// import ValidationError from '../middleWares/ValidateError';

// chai.use(chaiHttp);

// const { expect } = chai;

// const register = {
//   mock: {
//     "id": 5,
//     "name": "Janaina Oliveira",
//     "email": "janaina@email.com",
//     "password": "Janaina123*",
//     "role": "Customer",
//     "token": "", 
//   },
//   json: {
//     "name": "Janaina Oliveira",
//     "email": "janaina@email.com",
//     "password": "Janaina123*",
//     "role": "Customer",
//   } 
// }

// describe('Register', () => {

//   beforeEach(async () => {
//     sinon.restore();
//   });

//   it('test route: /register', async () => {
//     sinon.stub(Users, "create").resolves(register.mock);
//       const response = await chai.request(app).post('/register').send(register.json);
//       expect(response.status).to.equal(201);  
//   });
// });
