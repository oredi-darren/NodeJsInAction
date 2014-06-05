/**
 * Created by dseet on 6/5/2014.
 */
var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.send('Hello\n');
}).listen(3000);