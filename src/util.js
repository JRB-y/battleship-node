/*
|--------------------------------------------------------------------------
| Utility functions
|--------------------------------------------------------------------------
|
*/

/**
 * Get the socket of a given ID from lobby.players
 */

function searchSocket(id, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i][0] === id) {
            return myArray[i];
        }
    }
}


module.exports = {
    searchSocket
}