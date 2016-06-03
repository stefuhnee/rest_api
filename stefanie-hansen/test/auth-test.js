// 'use strict';
//
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// chai.use(chaiHttp);
// const expect = chai.expect;
// const request = require('chai').request;
// const mongoose = require('mongoose');
// const User = require('../model/user');
// const basicAuth = require('../lib/basic-auth');
// const jwtAuth = require('../lib/jwt-auth');
// const dbPort = process.env.MONGOLAB_URI;
//
// process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';
// require('../server');
//
// describe('unit tests', () => {
//   let authString;
//   let baseString;
//   let req;
//   let token;
//   let testToken;
//
//   baseString = new Buffer('user:pass').toString('base64');
//   authString = 'Basic ' + baseString;
//   req = {
//     headers: {
//       authorization: authString
//     }
//   };
//
//   before('save a test user in db for jwt-auth', (done) => {
//     request('localhost:3000')
//     .post('/signup')
//     .send({username:'test', password:'test'})
//     .end((err, res) => {
//       testToken = res.body.token.split('.')[1];
//       console.log('testToken', testToken);
//       done();
//     });
//   });
//
//   it('should decode a basic auth string into username and password', () => {
//
//     basicAuth(req, {}, () => {
//       expect(req.auth).to.eql({username: 'user', password: 'pass'});
//     });
//   });
//
//   it('should find a user with a token', () => {
//     req = {
//       headers: {
//         token: testToken
//       }
//     };
//     console.log(req);
// 
//     jwtAuth(req, {}, () => {
//       expect(req.user).to.eql(null);
//     });
//   });
//
//   describe('auth tests', () => {
//
//     after((done)=> {
//       process.env.MONGOLAB_URI = dbPort;
//       mongoose.connection.db.dropDatabase(() => {
//         done();
//       });
//     });
//
//     it('should sign up a new user', (done) => {
//       request('localhost:3000')
//       .post('/signup')
//       .send({username:'test', password:'test'})
//       .end((err, res) => {
//         token = res.body.token;
//         expect(err).to.eql(null);
//         expect(res).to.have.status(200);
//         expect(typeof token).to.eql('string');
//         done();
//       });
//     });
//
//     it('should sign in a user with a token', (done) => {
//       request('localhost:3000')
//       .get('/login')
//       .set('token', token)
//       .auth('test', 'test')
//       .end((err, res) => {
//         expect(err).to.eql(null);
//         expect(res).to.have.status(200);
//         expect(res.body.token).to.eql(token);
//         done();
//       });
//     });
//   });
// });
//
// describe('catch all test', () => {
//
//   it('should give an error for unsupported routes', (done) => {
//     request('localhost:3000')
//     .get('/test')
//     .end((err, res) => {
//       expect(err).to.not.eql(null);
//       expect(res).to.have.status(404);
//       expect(res.body).to.eql({Message: 'Not Found'});
//       done();
//     });
//   });
// });
