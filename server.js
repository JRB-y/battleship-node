/**
 * Server Side of the application
 */
const express = require("express");
const app = express();
// http need to create the server
const http = require("http").createServer();
// we need to pass the http to the io()
const io = require("socket.io")(http);

const ioClient = require("socket.io-client");

const path = require('path');
const port = process.env.PORT || 3000;



let users = [];

// css static
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

// Route the application
app.get('/', (req, res) => {
  let client = ioClient.connect("http://localhost:3000");
  client.on('connection', socket => console.log('user connected'))

  res.sendFile(path.join(__dirname + '/public/dashboard.html'));
})

// some rooms
// const gameRooms = ["Room-1", "Room-2", "Room-3"];

// io.of("/games").on("connection", socket => {

//   // emit an event when connect to the namespace
//   socket.emit('games-joined', 'Welcome to  Game Area');

//   socket.on("joinRoom", (room) => {
//     if (gameRooms.includes(room)) {
//       socket.join(room);
//       return socket.emit('success', 'You have joined: ' + room)
//     } else {
//       return socket.emit('err', 'No Room name ' + room)
//     }
//   })

// });



app.listen(port, () => {
  console.log(`Listening on ${port}`);
  io.on('connection', socket => {
    console.log('New USER');
    // users.push(socket);
  })
});