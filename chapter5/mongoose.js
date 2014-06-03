/**
 * Created by dseet on 6/3/2014.
 */
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };
var mongodbUri = 'mongodb://demoapi:passw0rd@ds045679.mongolab.com:45679/demoapi';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
mongoose.connect(mongooseUri, options);

var Schema = mongoose.Schema;
var Tasks = new Schema({
    project: String,
    description: String
});
mongoose.model('Task', Tasks);

var Task = mongoose.model('Task');
/*
Sample to add
var task = new Task();
task.project = 'Bikeshed';
task.description = 'Paint the bikeshed red.';
task.save(function (err) {
   if(err) throw err;
    console.log('Task saved.');
});
*/
/*
Sample to read
Task.find({'project': 'Bikeshed'}, function(err, tasks) {
    for (var i = 0; i < tasks.length; i++) {
        console.log('ID:' + tasks[i]._id);
        console.log(tasks[i].description);
    }
});

*/
Task.update(
    {_id: '538d4d8c6a1605507b5a437b'},
    {'description': 'Paint the bikeshed red. ' + new Date().toJSON()},
    {multi: false},
    function(err, rows_updated) {
        console.log('Updated');
});
/*
Sample code to delete
Task.findById('[code to remove]',
    function(err, task) {
        task.remove();
    });*/
