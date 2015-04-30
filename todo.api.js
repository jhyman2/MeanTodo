'use strict';

/**
 * Todo api
 */

var Todo = require('./Todo');

exports.get = function(req, res, next){
  Todo.find({}, function(err, docs){
    if(err){
      next(err);
    }else{
      res.status(200).send(docs);
    }
  });
};

exports.create = function(req, res, next){
  var newTodo = req.body || null;

  if(newTodo){
    var todoDB = new Todo(newTodo);
    todoDB.save(function(err, doc){
      if(err){
        next(err);
      }else{
        res.status(201).send(doc);
      }
    });
  }else{
    res.status(400).send('No data sent!');
  }
};

exports.update = function(req, res, next){
  var id = req.params.id || null,
  text   = req.body.text || null;

  if(text && id){
    Todo.findOne({_id: id}, function(err, doc){
      if(err){
        next(err);
      }else{
        doc.text = text;

        doc.save(function(err, updated){
          res.status(200).send(updated);
        });
      }
    });
  }else{
    res.status(400).send('No todo data sent.');
  }
};

exports.delete = function(req, res, next){
  var id = req.params.id || null;

  if(id){
    Todo.remove({_id: id}, function(err){
      if(err){
        next(err);
      }else{
        res.status(200).send();
      }
    });
  }else{
    res.status(400).send('No id sent.');
  }
};