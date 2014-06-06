/*
 * Module Dependencies
 */
var net = require('net');

// To keep track of various users connected to this TCP server
var connectionCount = 0,
    users = {};

// Create Server
var server = net.createServer(function (socket) {

    console.log('\033[90m New Connection! \033[39m');

    var nickname, // TCP server expects the very first message until \r\n is a nickname
        timeoutId, // You can enter the nickname only in the first 10 seconds after connection
        temp = ''; // temporary storage for the data delimited by newline

    // Set the default encoding of the stream to utf-8
    socket.setEncoding('utf8');

    // helper function to broadcast messages to everone expect the current user
    function broadcast(message) {
        for (var i in users) {
            if (i != nickname) {
                users[i].write(message + '\r\n');
            }
        }
    }

    // Handle client disconnection
    socket.on('close', function () {
        connectionCount--;
        if (nickname) {
            console.log('Client disconnected... : ' + nickname);
            delete users[nickname];
            broadcast('\033[96m \'' + nickname + '\' logged out of the room!! \033[39m ');
        }
    });

    // Handle client data
    socket.on('data', function (data) {
        // buffer until newline is received
        if (data != '\r\n') {
            temp += data;
            return;
        }

        // If nickname is not set then the first message must be a nickname
        if (!nickname) {
            if (users[temp]) {
                socket.write('\033[93m > nickname already in use. Try again: \033[39m');
                temp = '';
                return;
            } else {
                clearTimeout(timeoutId); // stop the timer
                nickname = temp;
                users[nickname] = socket;
                broadcast('\033[90m > ' + nickname + ' joined the chat room \033[39m');
                socket.write('Welcome ' + nickname + '! Start typing your message...\r\n\r\n');
                temp = '';
            }
        }
        // else its a normal message which needs to be broadcasted
        else {
            broadcast('\033[96m > ' + nickname + ': \033[39m ' + temp);
            temp = '';
        }
    });

    // Display this welcome message
    socket.write(
        '\r\n > Welcome to \033[90m Node-Chat \033[39m !' + '\r\n > ' + connectionCount + ' other people are connected at this time.' + '\r\n > please write your name and press Enter (You have 10 seconds): '
    );

    // Start a timer for 10 seconds for the user to enter the nickname
    timeoutId = setTimeout(function () {
        socket.end('\r\n\r\nYou exceeded your time limit to enter the nickname!!\r\n\r\n');
        return;
    }, 10000);

    // keep track of the total number of connected users
    connectionCount++;
});

// Listen for connection - telnet localhost 3333
server.listen(3333, function () {
    console.log('\033[96m TCP Server Listening on *:3333 \033[39m');
});
