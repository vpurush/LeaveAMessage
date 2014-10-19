var path = require('path'),
    CommonConstants = require(path.join(__dirname, '../UI/Scripts/CommonConstants')),
    UserRepository = require(path.join(__dirname, '/DB/User'));

var loginSignUp = function (io) {

    var loginSignupNamespace = io.of(CommonConstants.LOGIN_SIGNUP_SOCKET_NAMESPACE);
    loginSignupNamespace.on('connection', function (socket) {
        console.log("someone connected");

        socket.on(CommonConstants.LOGIN_SERVER_EVENT, function (data) {
            UserRepository.GetUser(data.EmailAddress, function (err, user) {
                if (err) {
                    socket.emit(CommonConstants.LOGIN_FAILURE_CLIENT_EVENT, CommonConstants.ERROR_OCCURRED);
                    console.log(err);
                    return;
                }
                if (user) {
                    if (user.Password == data.Password) {
                        socket.request.login(user, function (err) {
                            if (err) {
                                socket.emit(CommonConstants.LOGIN_FAILURE_CLIENT_EVENT, CommonConstants.ERROR_OCCURRED);
                                console.log(err);
                                return;
                            }
                            socket.emit(CommonConstants.LOGIN_SUCCESS_CLIENT_EVENT);
                        })                        
                    } else {
                        socket.emit(CommonConstants.LOGIN_FAILURE_CLIENT_EVENT, CommonConstants.LOGIN_FAILURE_INVALID_PASSWORD);
                    }
                } else {
                    socket.emit(CommonConstants.LOGIN_FAILURE_CLIENT_EVENT, CommonConstants.LOGIN_FAILURE_INVLAID_EMAIL);
                }
            });
        });


        socket.on(CommonConstants.SIGNUP_SERVER_EVENT, function (data) {
            UserRepository.GetUser(data.EmailAddress, function (err, user) {
                if (err) {
                    socket.emit(CommonConstants.SIGNUP_FAILURE_CLIENT_EVENT, CommonConstants.ERROR_OCCURRED);
                    console.log(err);
                    return;
                }
                if (user) {
                    socket.emit(CommonConstants.SIGNUP_FAILURE_CLIENT_EVENT, CommonConstants.SIGNUP_FAILURE_EMAIL_EXISTS);
                } else {
                    UserRepository.CreateUser(data.EmailAddress, data.Password, function (err) {
                        if (err) {
                            socket.emit(CommonConstants.SIGNUP_FAILURE_CLIENT_EVENT, CommonConstants.ERROR_OCCURRED);
                            console.log(err);
                            return;
                        }
                        socket.emit(CommonConstants.SIGNUP_SUCCESS_CLIENT_EVENT);
                    });
                }
            });
        });
    });
};

module.exports = loginSignUp;