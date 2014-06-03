/**
 * Created by dseet on 6/3/2014.
 */
var fs = require('fs');
var path = require('path');
var args = process.argv.splice(2);
var command = args.shift();
var taskDescription = args.join(' ');
var file = path.join(process.cwd(), '/.tasks');

switch (command) {
    case 'list':
        listTasks(file);
        break;
    case 'add':
        addTasks(file, taskDescription);
        break;
    default:
        console.log('Usage: ' + process.argv[0] + ' list|add [taskDescription]');
}

function loadOrInitializeTaskArray(file, callback) {
    fs.exists(file, function (exists) {
        var tasks = [];
        if(exists) {
            fs.readFile(file, 'utf8', function (err, data) {
                if(err) throw err;

                var data = data.toString();
                var tasks = JSON.parse(data || '[]');
                callback(tasks);
            });
        } else {
            callback([]);
        }
    });
}

function listTasks(file) {
    loadOrInitializeTaskArray(file, function (tasks) {
        for(var i in tasks) {
            console.log(tasks[i]);
        }
    });
}

function storeTasks(file, tasks) {
    fs.writeFile(file, JSON.stringify(tasks), 'utf8', function (err) {
        if(err) throw err;
        console.log('Saved.');
    });
}

function addTasks(file, taskDescription) {
    loadOrInitializeTaskArray(file, function (tasks) {
        tasks.push(taskDescription);
        storeTasks(file, tasks);
    });
}