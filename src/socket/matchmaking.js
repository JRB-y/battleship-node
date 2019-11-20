/**
 * -------------------------------------------
 *  Matchmaking sockets (events and listeners)
 * -------------------------------------------
 * 
 *  - 
 *  - 
 *  - 
 */

import { lobby } from './../game/lobby';

import { searchSocket } from './../util';


exports = module.exports = function (io) {

    io.sockets.on('connection', (socket) => {

        lobby.connections.push(socket);

        console.log('A new user: %s user(s) online', lobby.connections.length);


        // new User
        socket.on('new-user', function (nickname) {

            socket.nickname = nickname;

            lobby.players.push([socket.id, nickname]);

            io.sockets.emit('welcome', lobby.players);
        })


        socket.on('send-game-request', function (host) {
            
            // get the socket of corresponding id from the lobby.players array
            let guest = searchSocket(socket.id, lobby.players);

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

            lobby.connections.forEach(function (item, index) {
                if (item.id == socket.id) {
                    lobby.connections.splice(index, 1);
                    console.log(`User disconnected: ${lobby.connections.length} player(s) online`);
                    return true;
                }
            })

            lobby.players.forEach(function (item, index) {
                if (item[1] == socket.nickname) {

                    io.sockets.emit('user-disconcted', item);

                    lobby.players.splice(index, 1);
                    return true;
                }
            })
        })

    })

}