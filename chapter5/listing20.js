/**
 * Created by dseet on 6/3/2014.
 */
var mongodb = require('mongodb');
var uri = 'mongodb://demoapi:passw0rd@ds045679.mongolab.com:45679/demoapi';
var server = mongodb.Server;
var client = mongodb.MongoClient;

client.connect(uri, function (err, db) {
    if (err) throw err;

    var collection = db.collection('test_insert');
    var _id = db.bson_serializer.ObjectID('538d48bc19acb91c1ddf8401');
/*    collection.insert({
            "title": "I like cake",
            "body": "It is quite good"
        },
        {safe: true},
        function (err, documents) {
            if (err) throw err;
            console.log('Document ID is: ' + documents[0]._id);
        });*/
    collection.update(
        {_id: _id},
        { $set: {"title": "I ate too much cake at " + new Date().toJSON()}
        },
        {safe: true},
        function (err) {
            if (err) throw err;
        });

});
