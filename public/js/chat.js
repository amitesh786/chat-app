var socket = io();

// const $messagesUILI = document.getElementById('messages');
const $messages = document.querySelector('#messages');
const $sendLocationButton = document.getElementById('send-location');

const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMsgTemplate = document.querySelector('#location-msg-template').innerHTML;

socket.on('message', (message) => {
	console.log(message);
	
	// templates uses
	const html = Mustache.render(messageTemplate, {
		messages: message.text,
		createdAt: moment(message.createdAt).format('h:mm a')
	})
    $messages.insertAdjacentHTML('beforeend', html);
})

socket.on('locationMessage', (msg) => {
	console.log(msg);

	const html = Mustache.render(locationMsgTemplate, {
		url: msg.url,
		createdAt: moment(msg.createdAt).format('h:mm a')
	})
	$messages.insertAdjacentHTML('beforeend', html);
})

$messageForm.addEventListener('submit', (e) => {
	e.preventDefault();
	// disable
	$messageFormButton.setAttribute('disabled', 'disabled')
	const message = e.target.elements.message.value

	socket.emit('sendMessage', message, (error) => {
		// enable
		$messageFormButton.removeAttribute('disabled')
		$messageFormInput.value = ''
		$messageFormInput.focus()

		if (error) {
			return console.log(error)
		}
		console.log('Message delivered!')
	})
})

// socket.on('sendMessage', function(msg) {
//     var item = document.createElement('li');
//     item.textContent = msg;
//     messages.appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight);
// });

$sendLocationButton.addEventListener('click', (e) => {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser');
	}
	$sendLocationButton.setAttribute('disabled', 'disabled')

	navigator.geolocation.getCurrentPosition((position) => {

		$sendLocationButton.removeAttribute('disabled')
		socket.emit('sendLocation', {
			"latitude": position.coords.latitude,
			"longitude": position.coords.longitude
		}, () => {
			console.log('Location shared!')
		});
	
	})

})