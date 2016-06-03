'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const Supplement = require('../model/supplement');
const mongoose = require('mongoose');

const expect = chai.expect;
const request = chai.request;

const dbPort = process.env.MONGLAB_URI;
require('../server');

describe('Supplement router tests', () => {

  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  describe('tests that don\'t need data', () => {
    it('should get a list of Supplements', (done) => {
      request('localhost:3000')
      .get('/supplements')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
    });

    it('should post a supplement', (done) => {
      request('localhost:3000')
      .post('/supplements')
      .send(
        {
          name:'test',
          medicinalEffects: ['test'],
          sideEffects: ['test', 'test']
        })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('test');
        expect(res.body.medicinalEffects).to.eql(['test']);
        expect(res.body.sideEffects).to.eql(['test', 'test']);
        done();
      });
    });

    it('should respond with an error if an attempt is made to post a duplicate Supplement', (done) => {
      request('localhost:3000')
      .post('/supplements')
      .send(
        {
          name:'test',
          medicinalEffects: ['test'],
          sideEffects: ['test', 'test']
        })
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res).to.have.status(400);
        done();
      });
    });
  });

  describe('tests that need data', () => {
    let testSupplement;

    beforeEach((done) => {
      testSupplement = new Supplement({
        name:'test',
        medicinalEffects: ['test'],
        sideEffects: ['test', 'test']
      });

      testSupplement.save((err) => {
        if (err) return console.log('Error: ', err);
        done();
      });
    });

    it('should update a supplement with a PUT request', (done) => {
      testSupplement.name = 'updatedByTest';
      request('localhost:3000')
        .put('/supplements/')
        .send(testSupplement)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body).to.eql({Message:'Successfully updated'});
          done();
        });
    });

    it('should delete a supplement', (done) => {
      console.log(testSupplement);
      request('localhost:3000')
      .delete(`/supplements/${testSupplement._id}`)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(`Deleted supplement with ID of ${testSupplement._id}`);
        done();
      });
    });
  });
});
