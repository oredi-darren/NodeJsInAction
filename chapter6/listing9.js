/**
 * Created by dseet on 6/3/2014.
 */
var connect = require('connect');
var log = require('./listing8');
var router = require('./listing10');
var routes = {
    GET: {
        '/users': function(req, res) {
            res.end('tobi, loki, jane');
        },
        '/users/:id': function(req, res, id) {
            res.end('user ' + id);
        }
    },
    DELETE: {
        '/users/:id': function(req, res, id) {
            res.end('deleted user ' + id);
        }
    }
};

connect()
    .use(router(routes))
    .listen(3000);