// conexión al servidor de WebSockets
var socket = io.connect(document.location.protocol + '//' + document.location.host);

// DOM is ready
$(function() {
	// declare DOM elements
	var $app = $('.app');
	var $messages = $app.find('.messages');
	var $messageinput = $app.find('.messageinput').removeAttr('disabled').focus();

	// receive message
	socket.on('mensaje', function(message) {
		$messages.append($('<li>', {'class':'message', text:message.text}));
		$messages.scrollTop($messages.prop('scrollHeight'));
	});

	// send message
	$messageinput.on('keypress', function(event) {
		if (event.keyCode == 13) {
			message = {text: $messageinput.val().trim()}
			console.log('send message: ', message);
			socket.emit('mensaje', message);
			$messageinput.val('');
		}
	});
});