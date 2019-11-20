import {
  app,
  io
} from './server';

// Matchmaking sockets
require('./socket/matchmaking')(io);
/**
 * -----------------------------------
 *  Entry point for the application
 * -----------------------------------
 */
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/public/app.html');
});