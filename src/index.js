const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
	socket.emit('message', 'Welcome!');

	socket.broadcast.emit('message', 'A new user join');

	socket.on('sendMessage', (msg, callback) => {
		const filter = new Filter()

		if(filter.isProfane(msg)) {
			return callback('Profanty is not allowed')
		}

		io.emit('message', msg);
		// io.emit('sendMessage', msg);

		callback()
	});

	socket.on('sendLocation', (coords, callback) => {
		io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
		callback()
	})

	socket.on('disconnect', () => {
		console.log('user disconnected');
		io.emit('message', 'User has left');
	});
})

server.listen(port, () => {
	console.log(`Server is up on port ${port}!`)
})
