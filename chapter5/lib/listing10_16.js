/**
 * Created by dseet on 6/3/2014.
 */
var qs = require('querystring');

exports.sendHtml = function (res, html) {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
};

exports.parseReceivedData = function (req, callback) {
    var body = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        var data = qs.parse(body);
        callback(data);
    });
};

exports.actionForm = function (id, path, label) {
    var html = '<form method = "POST" action="' + path + '">'
        + '<input type="hidden" name="id" value="' + id + '" />'
        + '<input type="submit" value="' + label + '" />'
        + '</form>';
    return html;
};

exports.add = function (db, req, res) {
    exports.parseReceivedData(req, function (work) {
        db.query("INSERT INTO work (hours, date, description) "
                + " VALUES (?, ?, ?)"
            , [work.hours, work.date, work.description]
            , function (err) {
                if (err) throw err;
                exports.show(db, res);
            });
    });
};

exports.delete = function (db, req, res) {
    exports.parseReceivedData(req, function (work) {
        db.query("DELETE FROM work WHERE ID=?"
            , [work.id]
            , function (err) {
                if (err) throw err;
                exports.show(db, res);
            });
    });
};

exports.archive = function (db, req, res) {
    exports.parseReceivedData(req, function (work) {
        db.query("UPDATE work SET archived=1 WHERE id=?"
            , [work.id]
            , function (err) {
                if (err) throw err;
                exports.show(db, res);
            });
    });
};

exports.workHitlistHtml = function (rows) {
    if(rows && rows.length > 0) {
        var html = '<table>';
        for(var i in rows) {
            html += '<tr>';
            html += '<td>' + rows[i].date + '</td>';
            html += '<td>' + rows[i].hours + '</td>';
            html += '<td>' + rows[i].description + '</td>';
            if(!rows[i].archived) {
                html += '<td>' + exports.workArchivedForm(rows[i].id) + '</td>';
            }
            html += '<td>' + exports.workDeleteForm(rows[i].id) + '</td>';
            html += '</tr>';
            return html;
        }
        html += '</table>';
    }
    return '';
};
exports.workFormHtml = function () {
    var html ='<form method="POST" action="/">'
        + '<p>Date (YYYY-MM-DD): <br /><input type="date" name="date" /></p>'
        + '<p>Hours worked: <br /><input type="hours" name="hours" /></p>'
        + '<p>Description: <br /><textarea name="description"></textarea></p>'
        + '<input type="submit" value ="Add" />'
        + '</form>';
    return html;
};

exports.workArchivedForm = function (id) {
    return exports.actionForm(id, '/archive', 'Archived');
};
exports.workDeleteForm = function (id) {
    return exports.actionForm(id, '/delete', 'Delete');
};

exports.show = function (db, res, showArchived) {
    var query = "SELECT * FROM work WHERE archived=? ORDER BY date DESC";
    var archiveValue = (showArchived) ? 1 : 0;
    db.query(query, [archiveValue],
        function (err, rows) {
            if (err) throw err;
            html = (showArchived)
                ? ''
                : '<a href="/archived">Archived Work</a><br />';
            html += exports.workHitlistHtml(rows);
            html += exports.workFormHtml();
            exports.sendHtml(res, html);
        });
};

exports.showArchived = function (db, res) {
    exports.show(db, res, true);
};
