var express = require('express');
var multipart = require('connect-multiparty');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/user');
var photos = require('./routes/photo');

var app = express();

// view engine setup
app.configure(function () {
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.set('relativePhotosPath', '/photos')
    app.set('absolutePhotosPath', __dirname + '/public' + app.get('relativePhotosPath'))
    app.use(favicon());
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(multipart());
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(app.router);

    /*app.get('/', routes.index);
     app.get('/users', users.list);*/

    app.get('/', photos.list);
    app.get('/upload', photos.form);
    app.post('/upload', photos.submit(app.get('absolutePhotosPath')));
    app.get('/photo/:id/download', photos.download(app.get('absolutePhotosPath')));
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}*/

app.configure('development', function () {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
})

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('title', 'My Application');

module.exports = app;
