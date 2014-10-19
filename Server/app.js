var express = require('express'),
    app = express(),
    authenticator = require('./Authentication/Authentication'),
    path = require('path'),
    fs = require('fs'),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io')(server),
    CommonConstants = require(path.join(__dirname, '../UI/Scripts/CommonConstants')),
    LoginSignUp = require(path.join(__dirname, 'LoginSignup')),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    flash = require('express-flash');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'thisisnot lame' }));

authenticator.Configure(app, io);
app.use(flash());
server.listen(81);
LoginSignUp(io);

app.get('/', authenticator.CheckAuthentication, function (req, res) {
    console.log("req.isAuthenticated()", req.isAuthenticated())
    res.send('hello world');
});

app.get('/login-signup', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '../UI/HTML/LoginSignup.html'));
});

app.post('/login', authenticator.AuthenticateCustomCallback);

//app.post('/login-signup', function (req, res) {
//    passport.authenticate('local', function (err, user, info) {
//        if (err) { console.log(err); return; }
//        if (!user) { return res.redirect('/login-signup'); }
//        req.logIn(user, function (err) {
//            if (err) { console.log(err); return; }
//            return res.redirect('/users/' + user.username);
//        });
//    })(req, res, next);
//});

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