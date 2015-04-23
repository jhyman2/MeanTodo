'use strict';

var mocha = require('mocha'),
chai      = require('chai'),
sinon     = require('sinon'),
assert    = chai.assert,
expect    = chai.expect,
rewire    = require('rewire'),
model;

describe('Model :: TODO', function(){
  before(function(done){
    // Runs before anything else
    model = require('../Todo');
    done();
  });

  beforeEach(function(done){
    // Runs before every single test
    done();
  });

  // A test
  it('should be a mongoose model', function(done){
    assert.ok(model);
    expect(model).to.have.property('find');
    expect(model).to.have.property('findOne');
    done();
  });

  afterEach(function(done){
    // Runs after every single test
    done();
  });

  after(function(done){
    done();
  });
});