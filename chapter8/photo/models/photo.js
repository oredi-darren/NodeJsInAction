/**
 * Created by dseet on 6/5/2014.
 */
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };
var mongodbUri = 'mongodb://demoapi:passw0rd@ds045679.mongolab.com:45679/demoapi';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
mongoose.connect(mongooseUri, options);


var schema = new mongoose.Schema({
    name: String,
    path: String
});

module.exports = mongoose.model('photo', schema);