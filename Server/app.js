var express = require('express'),
    app = express(),
    authenticator = require('./Authentication/Authentication');

authenticator.Configure(app);
app.listen(81);

app.get('/', authenticator.Authenticate, function (req, res) {
    res.send('hello world');
});

app.get('/login-signup', function (req, res) {
    res.send('This is login page');
});