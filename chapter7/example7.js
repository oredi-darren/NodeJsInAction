var connect = require('connect');
var app = connect()
    .use(connect.favicon())
    .use(connect.logger('dev'))
    .use(connect.compress())
    .use(connect.directory('.', { icons: false, hidden:true }))
    .use(connect.static('.'))
    .use('/app/files', connect.directory('.'))
    .use('/app/files', connect.static('.', { hidden:true }))
    .use(connect.errorHandler())
    .listen(3000);
