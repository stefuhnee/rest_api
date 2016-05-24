'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const request = chai.request;
const fs = require('fs');
require('../lib/server');

describe('Express router tests', () => {

  describe('Catch all tests', () => {
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

  describe('POST route tests', () => {
    let fileArray = [];
    before('checking to make sure file is there before delete request', (done) => {
      fs.readdir(__dirname + '/../data', (err, files) => {
        fileArray = files;
      });
      done();
    });

    it('should respond to a POST request to /plants/:id without errors if a file with the url-defined name does not already exist and with an error if a file already exists. If a new file is created, it should have the content defined by the request body', (done) => {
      request('localhost:3000')
      .post('/plants/test')
      .send({"test":"test"})
      .end((err, res) => {
        if (fileArray.indexOf('test.json') === -1) {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(fs.readFileSync(__dirname + '/../data/test.json').toString()).to.eql('{"test":"test"}');
          expect(res.text.split(' ').pop().trim()).to.eql('{"test":"test"}');
        } else {
          expect(err).to.not.eql(null);
          expect(res).to.have.status(400);
        }
        done();
      });
    });
  });

  describe('GET route tests', () => {
    it('should respond to a GET request to /plants/:id without errors', (done) => {
      request('localhost:3000')
      .get('/plants/test')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
    });
    it('should respond to a GET request to /plants/:id with the contents of the requested file.', (done) => {
      request('localhost:3000')
      .get('/plants/test')
      .end((err, res) => {
        expect(res.text.split(' ').pop().trim()).to.eql('{"test":"test"}');
        done();
      });
    });
  });

  describe('PUT route tests', () => {
    it('should respond to a PUT request to /plants/:id without errors', (done) => {
      request('localhost:3000')
      .put('/plants/test')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
    });
    it('should respond to a PUT request to /plants/:id by creating or replacing a JSON file and sending a response with the contents of that file/request to confirm', (done) => {
      request('localhost:3000')
      .put('/plants/test')
      .send({"test":"test"})
      .end((err, res) => {
        expect(fs.readFileSync(__dirname + '/../data/test.json').toString()).to.eql('{"test":"test"}');
        expect(res.text.split(' ').pop().trim()).to.eql('{"test":"test"}');
        done();
      });
    });
  });

  describe('DELETE route tests', () => {
    let oldFileArray = [];

    before('checking to make sure file is there before delete request', (done) => {
      fs.readdir(__dirname + '/../data', (err, files) => {
        oldFileArray = files;
      });
      done();
    });

    it('should respond to a DELETE request to /plants/:id without errors and delete the file defined by the url path', (done) => {
      request('localhost:3000')
      .delete('/plants/test')
      .end((err, res) => {
        fs.readdir(__dirname + '/../data', (err, files) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(oldFileArray.length).to.not.eql(files.length);
        });
        done();
      });
    });
  });
});
