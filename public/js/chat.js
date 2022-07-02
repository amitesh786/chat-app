var socket = io();

socket.on('message', (message) => {
	console.log(message)
})

// var form = document.getElementById('message-form');
// var input = document.getElementById('input');

// form.addEventListener('submit', function(e) {
//     e.preventDefault();
//     if (input.value) {
// 		socket.emit('chat message', input.value);
// 		input.value = '';
//     }
// });

document.querySelector('#message-form').addEventListener('submit', (e) => {
	e.preventDefault();
	const message = e.target.elements.message.value
	socket.emit('sendMessage', message)
	e.target.elements.message.value = ''
})
