'use strict';

var mocha = require('mocha'),
chai      = require('chai'),
sinon     = require('sinon'),
assert    = chai.assert,
expect    = chai.expect,
should    = chai.should(),
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
      save: function(){},
      findOne: function (idObj, cb) {}
    };

    sinon.spy(TodoMock, 'find');
    sinon.spy(TodoMock, 'create');
    sinon.spy(TodoMock, 'save');
    sinon.spy(TodoMock, 'findOne');

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

  it('should update good data', function (done) {
    var req = { params: { id: 1 }, body: { text: 'test text'}},
    res     = sinon.spy,
    next    = sinon.spy;

    todoApi.update(req, res, next);

    assert.ok(TodoMock.findOne.called);
    assert.typeOf(TodoMock.findOne.args[0][0], 'object');
    TodoMock.findOne.args[0][0]._id.should.equal(1);
    assert.typeOf(TodoMock.findOne.args[0][1], 'function');

    done();
  });

  it('should fail update with bad data', function (done) {
    var req = { params: { id: 0 }, body: { text: 'test text'}},
    res     = sinon.spy,
    next    = sinon.spy;

    res.status = function (code) {
      code.should.equal(400);
      return res;
    };

    res.send = function (message) {
      message.should.be.a('string');
      return res;
    }

    todoApi.update(req, res, next);
    assert.ok(!TodoMock.findOne.called);

    done();
  });

  afterEach(function(done){
    done();
  });

  after(function(done){
    done();
  });
});