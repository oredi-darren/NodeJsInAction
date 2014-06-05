/**
 * Created by dseet on 6/5/2014.
 */
/*var photos = [];
photos.push({
    name: 'Node.js Logo',
    path: 'http://nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
    name: 'Ryan Speaking',
    path: 'http://nodejs.org/images/ryan-speaker.jpg'
});*/
var photo = require('../models/photo');
var path = require('path');
var fs = require('fs');
var join = path.join;

exports.list = function (req, res, next) {
    photo.find({}, function (err, photos) {
        if(err) return next(err);
        res.render('photos', {
            title: 'Photos',
            photos: photos
        })
    });
};

exports.form = function (req, res) {
    res.render('photos/upload', {
        title: 'Photo upload'
    })
}

exports.submit = function (dir) {
    return function (req, res, next) {
        var img = req.files.photo.image;
        var name = req.body.photo.name || img.name;
        var destination = join(dir, img.name);

        fs.rename(img.path, destination, function (err) {
            if(err) return err;

            photo.create({
                name: name,
                path: img.name
            }, function (err) {
                if(err) return next(err);
                res.redirect('/')
            })
        });
    }
}


exports.download = function (dir) {
    return function (req, res, next) {
        var id = req.params.id;
        photo.findById(id, function (err, photo) {
            if(err) return err;
            var path = join(dir, photo.path);
            //res.sendfile(path);

            res.download(path, photo.name + '.jpg');    // extension is required to trigger download
        });
    }
}