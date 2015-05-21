// requires
var express = require('express'), 
		socketio = require('socket.io');

// application
var app = express();
var server = require('http').createServer(app);
var io = socketio.listen(server);

// set template engine
app.set('views', require('path').join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(require('path').join(__dirname, 'static')));
app.get('*', function(req, res) {
	res.render('index');
});
app.use(function(req, res, next) {
	res.status(404).send('404 Not Found. Sorry.');
});

// set socket io

// start listening
server.listen(8888);