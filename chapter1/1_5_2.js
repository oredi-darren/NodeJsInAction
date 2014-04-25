/**
 * Created by dseet on 4/25/2014.
 */
var http = require('http');
http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(3000);
console.log('Server running at http://localhost:3000/')
