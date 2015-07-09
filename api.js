'use strict';

/**
* API
*/

var api = require('./todo.api');

module.exports = app => {
  app.get('/api/todos', api.get)
  app.post('/api/todos', api.create)
  app.put('/api/todos/:id', api.update)
  app.delete('/api/todos/:id', api.delete)
}