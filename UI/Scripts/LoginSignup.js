var lameApp = angular.module('leaveamessage', []);

lameApp.controller('Login', function ($scope) {

    //var loginSignupSocket = io(CommonConstants.LOGIN_SIGNUP_SOCKET_NAMESPACE);
    //loginSignupSocket.on('connect', function () {
    //    console.log('socket connected');
    //});
    $scope.ErrorMessage = "";
    var Login = {
        EmailAddress: "",
        Password: "",
        Submit: function () {
            $.post('/Login', { username: this.EmailAddress, password: this.Password }, function (res) {
                console.log(res);
                if(res == true)
                {
                    window.location = '/';
                } else {
                    $scope.$apply(function () {
                        $scope.ErrorMessage = res;
                    });                    
                }
            });
        }
    };

    $scope.Login = Login;
});


lameApp.controller('SignUp', function ($scope) {

    //var loginSignupSocket = io(CommonConstants.LOGIN_SIGNUP_SOCKET_NAMESPACE);
    //loginSignupSocket.on('connect', function () {
    //    console.log('socket connected');
    //});
    $scope.ErrorMessage = "";

    var SignUp = {
        EmailAddress: "",
        ChoosePassword: "",
        ReEnterPassword: "",
        Submit: function () {
            //loginSignupSocket.emit(CommonConstants.SIGNUP_SERVER_EVENT, { EmailAddress: this.EmailAddress, Password: this.ChoosePassword });
        }
    };

    $scope.SignUp = SignUp;
});