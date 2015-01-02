var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var todos = [
	{ _id: '1', text: 'Clean my car'},
	{ _id: '2', text: 'Clean my house'},
	{ _id: '3', text: 'Clean my computer'},
	{ _id: '4', text: 'Clean my shrek'},
	{ _id: '5', text: 'Clean my donkey'}
];
/**
*	Configuring Express
*/
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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
	res.status(200).send(todos);
});

app.post('/api/todos', function(req, res, next){
  var newTodo = req.body.todo || null;

  if(newTodo){
    todos.push({
      _id: todos.length + 1,
      text: newTodo
    });
    res.status(201).send(todos[todos.length - 1]);
  }else{
    res.status(400).send('No data sent!');
  }
});

// Delete a task
app.delete('/api/todos/:id', function(req, res, next){
	var id = req.params.id || null;

	if (id){
		todos.splice((parseInt(id, 10) - 1), 1);
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