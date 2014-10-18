var lameApp = angular.module('leaveamessage', []);

lameApp.controller('LoginSignUp', function ($scope) {

    var loginSignupSocket = io(CommonConstants.LOGIN_SIGNUP_SOCKET_NAMESPACE);
    loginSignupSocket.on('connect', function () {
        console.log('socket connected');
    });
    var Login = {
        EmailAddress: "",
        Password: "",
        Submit: function () {
            loginSignupSocket.emit(CommonConstants.LOGIN_SERVER_EVENT, { EmailAddress: this.EmailAddress, Password: this.Password });
        },
        Success: function (data) {
            console.log("login success", data);
        },
        Failure: function (data) {
            console.log("login failure", data);
        },
        Setup: function () {
            loginSignupSocket.on(CommonConstants.LOGIN_SUCCESS_CLIENT_EVENT, this.Success);
            loginSignupSocket.on(CommonConstants.LOGIN_FAILURE_CLIENT_EVENT, this.Failure);
        }
    };

    var SignUp = {
        EmailAddress: "",
        ChoosePassword: "",
        ReEnterPassword: "",
        Submit: function () {
            loginSignupSocket.emit(CommonConstants.SIGNUP_SERVER_EVENT, { EmailAddress: this.EmailAddress, Password: this.ChoosePassword });
        },
        Failure: function (data) {
            console.log("signup failure", data);
        },
        Success: function (data) {
            console.log("signup success", data);
        },
        Setup: function () {
            loginSignupSocket.on(CommonConstants.SIGNUP_SUCCESS_CLIENT_EVENT, this.Success);
            loginSignupSocket.on(CommonConstants.SIGNUP_FAILURE_CLIENT_EVENT, this.Failure);
        }
    };

    Login.Setup();
    SignUp.Setup();

    $scope.Login = Login;
    $scope.SignUp = SignUp;
});