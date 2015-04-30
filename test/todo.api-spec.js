; 'use strict';

var mocha = require('mocha'),
    sinon = require('sinon'),
    chai = require('chai'),
    rewire = require('rewire'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe('API', function () {
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

describe('API :: Todo', function () {
  var todoApi = rewire('../todo.api'),
      TodoMock;

  beforeEach(function(done){
    TodoMock = {
      find: function(){},
      create: function(){},
      save: function(){},
      findOne: function(){}
    };

    sinon.spy(TodoMock, 'find');
    sinon.spy(TodoMock, 'create');
    sinon.spy(TodoMock, 'save');
    sinon.spy(TodoMock, 'findOne');

    todoApi.__set__('Todo', TodoMock);

    done();
  });

  it('should update', function (done) {
    var req = {
          params: {
            id: 1
          },
          body: {
            text: 'test text'
          }
        };

    todoApi.update(req);

    assert.ok(TodoMock.findOne.called);
    assert.typeOf(TodoMock.findOne.args[0][0], 'object');
    TodoMock.findOne.args[0][0]._id.should.equal(1);
    assert.typeOf(TodoMock.findOne.args[0][1], 'function');

    done();
  });

  it('should fail update', function (done) {
    var req = {
          params: {
            id: 0
          },
          body: {
            text: 'test text'
          }
        },
        res = {
          status: function () {return this;},
          send: function () {return this;}
        },
        next = sinon.spy;

    sinon.spy(res, 'status');
    sinon.spy(res, 'send');

    todoApi.update(req, res, next);

    assert.ok(res.status.called);
    assert.ok(res.send.called);
    assert.notOk(next.called);
    assert.typeOf(res.status.args[0][0], 'number');
    res.status.args[0][0].should.equal(400);
    assert.typeOf(res.send.args[0][0], 'string');

    done();
  });

});