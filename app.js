var express = require('express'),
<<<<<<< HEAD
app 		= express(),
bodyParser  = require('body-parser'),
mongoose 	= require('mongoose');
=======
app         = express(),
bodyParser  = require('body-parser'),
mongoose    = require('mongoose');
>>>>>>> feature/edwin

/**
*	Configuring Express
*/
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/build'));
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/**
<<<<<<< HEAD
* Connect to DB
*/
mongoose.connect('mongodb://localhost/meantodo');

/**
* Models
*/
=======
 * Connect to DB
 */

mongoose.connect('mongodb://localhost/meantodo');

/**
 * Models
 */
>>>>>>> feature/edwin

var Todo = mongoose.model('Todo', { text: { type: String, required: true } });

/**
*	Routes
*/
app.get('/', function (req, res) {
  res.render('index.ejs');
});

/**
*	API
*/

// GET
app.get('/api/todos', function(req, res, next){
<<<<<<< HEAD
	Todo.find({}, function(err, docs){
		if (err){
			next(err);
		} else {
			res.status(200).send(docs);
		}
	});
=======
  Todo.find({}, function(err, docs){
    if(err){
      next(err);
    }else{
      res.status(200).send(docs);
    }
  });
>>>>>>> feature/edwin
});

// POST
app.post('/api/todos', function(req, res, next){
  var newTodo = req.body || null;

  if(newTodo){
    var todoDB = new Todo(newTodo);
    todoDB.save(function(err, doc){
<<<<<<< HEAD
    	if (err) {
    		next(err)
    	} else {
			res.status(201).send(doc);
    	}
=======
      if(err){
        next(err);
      }else{
        res.status(201).send(doc);
      }
>>>>>>> feature/edwin
    });
  }else{
    res.status(400).send('No data sent!');
  }
});

<<<<<<< HEAD
app.put('/api/todos/:id', function(req, res, next){
	var id = req.params.id || null;
	var text = req.body.text || null;

	if (text && id){
		Todo.findOne({_id: id}, function(err, doc){
			if (err){
				next(err);
			} else {
				doc.text = text;
				doc.save(function(err, updated){
					res.status(200).send(updated);
				});
			}
		});
	} else{
		res.status(400).send('No task sent.');
	}
});

// Delete a task
app.delete('/api/todos/:id', function(req, res, next){
	var id = req.params.id || null;

	if (id){
		Todo.remove({_id: id}, function(err){
			if (err){
				next(err);
			} else {
				res.status(200).send();
			}
		});
	} else {
		res.status(400).send('No id sent');
=======
// PUT
app.put('/api/todos/:id', function(req, res, next){
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
});

// DELETE
app.delete('/api/todos/:id', function(req, res, next){
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
>>>>>>> feature/edwin
	}
});

/**
*	Initializing Server
*/ 
var server = app.listen(3000, function () {

  var host = 'localhost';
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});