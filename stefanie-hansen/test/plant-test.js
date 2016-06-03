'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const Plant = require('../model/plant');
const mongoose = require('mongoose');

const expect = chai.expect;
const request = chai.request;

const dbPort = process.env.MONGLAB_URI;
require('../server');

describe('Plant router tests', () => {

  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  describe('Catch all test', () => {

    it('should respond to a request to a random route with an error', (done) => {
      request('localhost:3000')
      .get('/test')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  describe('tests that don\'t need data', () => {
    it('should get a list of Plants', (done) => {
      request('localhost:3000')
      .get('/plants')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
    });

    it('should post a plant', (done) => {
      request('localhost:3000')
      .post('/plants')
      .send(
        {
          commonName:'test',
          scientificName:'testus maximus',
          medicinalUses: ['test', 'test'],
          nutritionalValue: ['test'],
          zone: 2
        })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.commonName).to.eql('test');
        expect(res.body.scientificName).to.eql('testus maximus');
        expect(res.body.medicinalUses).to.eql(['test', 'test']);
        expect(res.body.nutritionalValue).to.eql(['test']);
        expect(res.body.zone).to.eql(2);
        done();
      });
    });

    it('should respond with an error if an attempt is made to post a duplicate Plant', (done) => {
      request('localhost:3000')
      .post('/plants')
      .send(
        {
          commonName:'test',
          scientificName:'testus maximus',
          medicinalUses: ['test', 'test'],
          nutritionalValue: ['test'],
          zone: 2
        })
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res).to.have.status(400);
        done();
      });
    });
  });

  describe('tests that need data', () => {
    let testPlant;
    let testPlant2;
    let testPlant3;

    beforeEach((done) => {
      testPlant = new Plant({
        commonName:'test',
        scientificName:'testus maximus',
        medicinalUses: ['test', 'test'],
        nutritionalValue: ['test'],
        zone: 2
      });

      testPlant.save((err) => {
        if (err) return console.log('Error: ', err);
        done();
      });
    });

    it('should update a plant with a PUT request', (done) => {
      testPlant.commonName = 'updatedByTest';
      request('localhost:3000')
        .put('/plants/')
        .send(testPlant)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body).to.eql({Message:'Successfully updated'});
          done();
        });
    });

    it('should delete a plant', (done) => {
      console.log(testPlant);
      request('localhost:3000')
      .delete(`/plants/${testPlant._id}`)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(`Deleted plant with ID of ${testPlant._id}`);
        done();
      });
    });

    before((done) => {

      testPlant2 = new Plant({
        commonName:'test2',
        scientificName:'testus maximus',
        medicinalUses: ['test', 'test'],
        nutritionalValue: ['test'],
        zone: 100
      });

      testPlant3 = new Plant({
        commonName:'test3',
        scientificName:'testus maximus',
        medicinalUses: ['test', 'test'],
        nutritionalValue: ['test'],
        zone: 40
      });

      testPlant2.save((err) => {
        if (err) return console.log('Error: ', err);
      });
      testPlant3.save((err) => {
        if (err) return console.log('Error: ', err);
        done();
      });
    });

    it('should get a range of zones included in the database upon any kind of request to the /plants/zones route', (done) => {
      request('localhost:3000')
      .get('/plants/zones')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('The range of zones represented in the database includes 2 - 100');
        done();
      });
    });
  });
});
