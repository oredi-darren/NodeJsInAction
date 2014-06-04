var connect = require('connect');
var app = connect()
    .use(connect.favicon())
    .use(connect.logger('dev'))
    .use(function(req, res, next) {
        setTimeout(function() {
            next(new Error('Something broke!'));
        }, 500);
    })
    .use(connect.errorHandler())
    .listen(3000);
