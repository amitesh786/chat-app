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

var messages = document.getElementById('messages');

socket.on('sendMessage', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

var sendLocation = document.getElementById('send-location');

sendLocation.addEventListener('click', (e) => {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser');
	}

	navigator.geolocation.getCurrentPosition((position) => {
		socket.emit('sendLocation', {
			"latitude": position.coords.latitude,
			"longitude": position.coords.longitude
		});
	
	})

})