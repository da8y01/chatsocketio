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

app.use('/static', express.static(require('path').join(__dirname, 'static')));
app.get('/', function(req, res) {
	res.render('index');
});
app.get('/:channel', function(req, res) {
	res.render('index', {channel: req.params.channel});
});
app.use(function(req, res, next) {
	res.status(404).send('404 Not Found. Sorry.');
});

// set socket io
io.sockets.on('connection', function(socket) {
	socket.on('mensaje', function(message) {
		console.log('Mensaje recibido: ', message);
		// io.sockets.emit('mensaje', message);
		io.to(message.channel).emit('mensaje', message);
	});

	socket.on('join', function(user) {
		socket.join(user.channel);
	});
});

// start listening
server.listen(8888);