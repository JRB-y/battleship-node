/**
 * Server Side of the application
 */
const express = require("express");
const app = express();
const port = 3000;
// http need to create the server
const http = require("http").createServer();
// we need to pass the http to the io()
const io = require("socket.io")(http);

// When a user connect to the server
// io.on("connection", socket => {
//	 // we emmit an event named 'welcome'
//	 socket.emit("welcome", "Hello and Welcome to SOCKET.io server");

//	 console.log("A New Client is connected");
// });

// some rooms
const gameRooms = ["Room-1", "Room-2", "Room-3"];

io.of("/games").on("connection", socket => {

  // emit an event when connect to the namespace
  socket.emit('games-joined', 'Welcome to  Game Area');

  socket.on("joinRoom", (room) => {
    if (gameRooms.includes(room)) {
      socket.join(room);
      return socket.emit('success', 'You have joined: ' + room)
    } else {
      return socket.emit('err', 'No Room name ' + room)
    }
  })

});


// Server listening to port
http.listen(port, () => {
  console.log("Server is listening on localhost: " + port);
});