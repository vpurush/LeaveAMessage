var app = require('express');
var passport = require('./Authentication/Authentication');

app.configure(function () {
    app.use(passport.initialize());
    app.use(passport.session());
});


app.listen(81);

app.get('/', passport.authenticate('local'), function (req, res) {
});