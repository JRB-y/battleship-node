import { app, io } from './src/server';

// Matchmaking sockets
require('./src/socket/matchmaking')(io);
/**
 * -----------------------------------
 *  Entry point for the application
 * -----------------------------------
 */
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/public/app.html');
});
