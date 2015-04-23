'use strict';

var mocha = require('mocha'),
chai      = require('chai'),
sinon     = require('sinon'),
assert    = chai.assert,
expect    = chai.expect,
rewire    = require('rewire');

describe('API :: Todo', function(){
  before(function(done){
    // Runs before anything else
    done();
  });

  beforeEach(function(done){
    // Runs before every single test
    done();
  });

  // A test
  it('should exist', function(done){

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