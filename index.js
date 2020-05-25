var express = require('express');
var socket = require('socket.io');

// App setup

var app = express();
var server = app.listen(4000, function(){
    console.log("Listening to requests on port 4 000")
})

//Static files

app.use(express.static('public'));

/*Socket Setup, 
*first param which server u want to work with
*/
var io = socket(server);

/*listen for the connection when it's made
*The param refers to socket instance that is created
*exmpl we have 10 client each one will have his own socket connexion
*/
io.on('connection', function(socket){
    console.log("made socket connection", socket.id);

    //handle chat event
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data)
    });
});