/**
 * Created by dseet on 6/3/2014.
 */
function errorHandler() {
    var env = process.env.NODE_ENV || 'development';
    return function(err, req, res, next) {
        res.statusCode = 500;
        switch (env) {
            case 'development':
                res.setHeader('Content-Type', 'text/json');
                res.end(JSON.stringify(err.stack));
                break;
            default:
                res.setHeader('Content-Type', 'text/plain');
                res.end('Server error');
                break;
        }
    }
}

module.exports = errorHandler;