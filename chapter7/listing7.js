var connect = require('connect');

var User = {
    authenticate: function (credentials, callback) {
        if (credentials.user == 'tobi'
            && credentials.pass == 'ferret') {
            callback(null, credentials);
        } else {
            callback(new Error('Incorrect credentials.'));
        }
    }
};

var app = connect()
    .use(connect.favicon())
    .use(connect.basicAuth(function (user, pass, callback) {
        User.authenticate({ user: user, pass: pass}, gotUser);
        function gotUser(err, user) {
            if(err) return err;
            callback(null, user);
        }
    }))
    .use(function(req, res) {
        res.end("I'am a secret\n");
    })
    .listen(3000);
