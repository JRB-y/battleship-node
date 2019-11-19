const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors')

const server = http.createServer(app);
const io = require('socket.io').listen(server);

// List of all sockets 
let connections = [];
let players = [];

let port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log('Server Listening on port %s', port);
});

// Routing
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/public/app.html');
});

/**
 | Static files
 */
app.use(cors())
app.use('/modules', express.static(__dirname + '/node_modules/socket.io-client/dist'));
app.use(express.static(path.join(__dirname, 'public')));



// Listening to The socket
io.sockets.on('connection', (socket) => {

  connections.push(socket);

  console.log('A new user: %s user(s) online', connections.length);


  // new User
  socket.on('new-user', function (nickname) {

    socket.nickname = nickname;
    players.push([socket.id, nickname]);

    io.sockets.emit('welcome', players);

  })


  socket.on('send-game-request', function (host) {

    let guest = search(socket.id, players);

    io.to(host[0]).emit('game-request', {
      host,
      guest
    });
  });

  socket.on('game-init', function (gamePlayers) {
    let guest = gamePlayers.guest;
    let host = gamePlayers.host;

    io.to(guest[0]).emit('game-ready', {
      host,
      guest
    });
  })

  // On disconnect
  socket.on('disconnect', function () {

    connections.forEach(function (item, index) {
      if (item.id == socket.id) {
        connections.splice(index, 1);
        console.log(`User disconnected: ${connections.length} player(s) online`);
        return true;
      }
    })

    players.forEach(function (item, index) {
      if (item[1] == socket.nickname) {

        io.sockets.emit('user-disconcted', item);

        players.splice(index, 1);
        return true;
      }
    })
  })

})




io.of('game-room').on('connection', (socket) => {
  console.log('User is in Gaming Room');
  if (players.length == 2) {
    console.log('The Game will start');
  } else {
    console.log('We are waitting the other player');
  }

});

// socket server


// UTILITIES
function search(id, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i][0] === id) {
      return myArray[i];
    }
  }
}