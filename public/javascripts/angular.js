var app = angular.module("MainApp",[]);
//---------------------------------------------Controller-----------------------------------------------
app.controller("MainController", function($scope,$http)  {
  $scope.userdata = [];
  // GET
  $scope.getUserData = function () {
    $http({
      method : 'GET',
      url : '/getuserdata'
    }).then(function success(response){
      $scope.userdata = response.data;
    }, function error(response){
      alert('Error Occured!')
    })
  }
  // // POST
  // $scope.saveUserData = function (details) {
  //   $scope.userdata.push(details);
  //   $http({
  //     method : 'POST',
  //     url : '/insertuserdata',
  //     data : details
  //   }).then(function success(response){
  //     $scope.details = {};
  //   }, function error(response){
  //     alert('Error Occured!')
  //   })
  // }
});