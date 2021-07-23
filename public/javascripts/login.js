var app = angular.module("LoginApp",[]);
//---------------------------------------------Controller-----------------------------------------------
app.controller("LoginController", function($scope,$http)  {
	 $scope.Login = function (log) {
    $http({
      method : 'POST',
      url : '/login',
      data : log
    }).then(function success(response){
      $scope.accessToken = response.data.accessToken;
      window.location.href = '/home';
    }, function error(response){
      alert('Invalid Credentials')
    })
  }
});