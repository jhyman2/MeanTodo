'use strict';

var mocha = require('mocha'),
chai      = require('chai'),
sinon     = require('sinon'),
assert    = chai.assert,
expect    = chai.expect,
rewire    = require('rewire'),
todoApi   = rewire('../todo.api'),
TodoMock;

describe('API :: Todo', function(){
  before(function(done){
    done();
  });

  beforeEach(function(done){
    // Faking the Todo Model
    TodoMock = {
      find: function(){},
      create: function(){},
      save: function(){}
    };

    sinon.spy(TodoMock, 'find');
    sinon.spy(TodoMock, 'create');
    sinon.spy(TodoMock, 'save');

    todoApi.__set__('Todo', TodoMock);

    done();
  });

  it('should get', function(done){
    var req = sinon.spy,
    res     = sinon.spy,
    next    = sinon.spy;

    todoApi.get(req, res, next);

    assert.ok(TodoMock.find.called);
    assert.typeOf(TodoMock.find.args[0][0], 'object');
    assert.typeOf(TodoMock.find.args[0][1], 'function');

    done();
  });

  it('should create', function(done){
    var req = { body: { text: 'Test Todo' } },
    res     = sinon.spy,
    next    = sinon.spy;

    todoApi.create(req, res, next);

    // assert.ok(TodoMock.save.called);
    // assert.ok(TodoMock.save.called);
    // assert.typeOf(TodoMock.save.args[0][0], 'object');
    // assert.typeOf(TodoMock.save.args[0][1], 'function');

    done();
  });

  afterEach(function(done){
    done();
  });

  after(function(done){
    done();
  });
});