'use strict';

var mocha = require('mocha');
var chai = require('chai');
var sinon = require('sinon');
var assert = chai.assert;
var expect = chai.expect;
var rewire = require('rewire');

describe('Model :: Todo', function () {
  // Runs at the very beginning before any test has been run
  before(function (done) {
    done();
  });

  // Runs before every single test (the "it" blocks)
  beforeEach(function (done) {
    done();
  });

  // A test
  it('should exist', function (done) {
    var model = require('../Todo');
    assert.ok(model);
    expect(model).to.have.property('find');
    expect(model).to.not.have.property('finds');
    expect(model).to.have.property('findOne');
    done();
  });

  // Runs after all tests have completed
  after(function (done) {
    done();
  });
});