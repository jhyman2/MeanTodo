var express = require('express'),
app 		= express(),
bodyParser  = require('body-parser'),
mongoose 	= require('mongoose');

/**
*	Configuring Express
*/
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/build'));
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/**
* Connect to DB
*/
mongoose.connect('mongodb://localhost/meantodo');

/**
* Models
*/

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
app.get('/api/todos', function(req, res, next){
	Todo.find({}, function(err, docs){
		if (err){
			next(err);
		} else {
			res.status(200).send(docs);
		}
	});
});

app.post('/api/todos', function(req, res, next){
  var newTodo = req.body || null;

  if(newTodo){
    var todoDB = new Todo(newTodo);
    todoDB.save(function(err, doc){
    	if (err) {
    		next(err)
    	} else {
			res.status(201).send(doc);
    	}
    });
  }else{
    res.status(400).send('No data sent!');
  }
});

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