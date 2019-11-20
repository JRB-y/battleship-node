/*
|--------------------------------------------------------------------------
| Server Module
|--------------------------------------------------------------------------
|
*/

import express from 'express';
import http from 'http';
import path from 'path';

const app = express();

const server = http.createServer(app);

const io = require('socket.io')(server);
// Cross Cors origin
io.set('origins', '*:*');


// Set the port
const port = process.env.PORT || 9900;

/*
 * =========================
 *  Static files
 * =========================
 * 
 *  - public for views
 *  - node_modules/socket.io-client/dist 'for socket.io-client
 * 
 */
app.use('/modules', express.static(__dirname + '/../node_modules/socket.io-client/dist'));
app.use(express.static(path.join(__dirname, 'public')));



/*
 * =========================
 *  Runing the server
 * =========================
 */
server.listen(port, () => {
    console.log('Server Listening on port %s', port);
});

/*
 * =========================
 *  Export the modules
 * =========================
 */
module.exports = {
    express,
    http,
    app,
    server,
    port,
    io
}