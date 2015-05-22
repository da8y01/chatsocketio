// conexión al servidor de WebSockets
var socket = io.connect(document.location.protocol + '//' + document.location.host);

// DOM is ready
$(function() {
	// declare DOM elements
	var $app = $('.app');
	var $messages = $app.find('.messages');
	var $messagescontainer = $app.find('.messages-container');
	var $messageinput = $app.find('.messageinput').removeAttr('disabled').focus();
	var $nameinput = $app.find('.nameinput');

	// receive message
	socket.on('mensaje', function(message) {
		$messages.append($('<li>', {'class':'message', text:message.username+': '+message.text}));
		$messagescontainer.scrollTop($messagescontainer.prop('scrollHeight'));
	});

	// send message
	$messageinput.on('keypress', function(event) {
		if (event.keyCode == 13) {
			message = {
				text: $messageinput.val().trim(), 
				username: $nameinput.val().trim()
			}
			console.log('send message: ', message);
			socket.emit('mensaje', message);
			$messageinput.val('');
		}
	});
});