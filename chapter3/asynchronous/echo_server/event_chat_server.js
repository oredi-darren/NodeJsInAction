var events = require('events');
var net = require('net');
var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};
channel.setMaxListeners(12);

// This appends the function as a listeners
channel.on('join', function(id, client) {
    var welcome = 'Welcome!\nGuests online: ' + (this.listeners('broadcast').length + 1);
    client.write(welcome + '\n');
    this.clients[id] = client;
    this.subscriptions[id] = function(senderId, message) {
        if (id != senderId) {
            this.clients[id].write(message);
        }
    }
    this.on('broadcast', this.subscriptions[id]);
    channel.emit('broadcast', id, id + " has joined the chat.\n");
});

channel.on('leave', function(id) {
    channel.removeListener('broadcast', this.subscriptions[id]);
    channel.emit('broadcast', id, id + " has left the chat.\n");
});

channel.on('shutdown', function(id) {
    channel.emit('broadcast', '', "Chat has shut down.\n");
    channel.removeAllListener('broadcast');
});

var server = net.createServer(function (client) {
    var id = client.remoteAddress + ':' + client.remotePort;
    channel.emit('join', id, client);

    client.on('data', function(data) {
        data = data.toString();
        if(data == "shutdown\r\n")
        {
            channel.emit('shutdown');
        }
        // This triggers the on broadcast event handler on the server
        channel.emit('broadcast', id, data);
    });

    client.on('close', function() {
        channel.emit('leave', id);
    });
});
server.listen(8888);