/**
 * Client Side of the application
 */
const io = require("socket.io-client");

// connect to the socket (global namespace)
let socket = io.connect("http://localhost:3000");

// Connect to the namespace /games
let games = io.connect("http://localhost:3000/games");

// listening to the event 'welcome'
socket.on("welcome", data => console.log("Received" + data));

games.emit("joinRoom", "Room-3");

// listen to the games-joined of the games socket
games.on("games-joined", data => {
  console.log(data);
});

games.on("err", (err) => console.log(err));
games.on("success", (success) => console.log(success));