var express = require('express'),
    app = express(),
    authenticator = require('./Authentication/Authentication'),
    path = require('path'),
    fs = require('fs');

authenticator.Configure(app);
app.listen(81);

app.get('/', authenticator.Authenticate, function (req, res) {
    res.send('hello world');
});

app.get('/login-signup', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '../UI/HTML/LoginSignup.html'));
});

var sendFileIfExists = function (filePath, res) {
    fs.exists(filePath, function (exists) {
        if (exists) {
            res.status(200).sendFile(filePath);
        } else {
            res.status(404).end();
        }
    });
};

app.get('/CSS/:name', function (req, res) {
    var fileName = req.param('name');
    var filePath = path.join(__dirname, '../UI/CSS/', fileName);
    sendFileIfExists(filePath, res);
});

app.get('/Scripts/Thirdparty/:name', function (req, res) {
    var fileName = req.param('name');
    var filePath = path.join(__dirname, '../UI/Scripts/Thirdparty/', fileName);
    sendFileIfExists(filePath, res);
});

app.get('/Scripts/:name', function (req, res) {
    var fileName = req.param('name');
    var filePath = path.join(__dirname, '../UI/Scripts/', fileName);
    sendFileIfExists(filePath, res);
});

app.get('/Fonts/:name', function (req, res) {
    var fileName = req.param('name');
    var filePath = path.join(__dirname, '../UI/Fonts/', fileName);
    sendFileIfExists(filePath, res);
});