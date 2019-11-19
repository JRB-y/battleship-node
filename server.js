const http = require('http');
const path = require('path');
const express = require('express');
const app = express();

const server = http.createServer(app);
const io = require('socket.io').listen(server);

// Array of users (socket)
let users = [];

// number of players connected to the socket to start a game
let playersOnGame = 2;

server.listen(8000);

// Routing
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/public/app.html');
});

/**
| Static files
*/
app.use('/modules', express.static(__dirname + '/node_modules/socket.io-client/dist'));

app.use(express.static(path.join(__dirname, 'public')));

// Listening to The socket
io.sockets.on('connection', (socket) => {

  users.push(socket);
  console.log(`A new user: ${users.length} player(s) online`);

  socket.on('register-name', () => {
    console.log(1);
    socket.emit('players-online');
    console.log(2);
  });


  // On disconnect
  socket.on('disconnect', function () {
    console.log('User Disconncted');
    users.forEach(function (item, index) {
      if (item.id == socket.id) {
        users.splice(index, 1);
        console.log(`User disconnected: ${users.length} player(s) online`);
        return true;
      }
    })
  })

})

// socket server