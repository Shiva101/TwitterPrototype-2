
var app = angular.module('editprofile', ['ngRoute']);

app.controller('mainController', function($scope, $http, $location){
  
    window.onload = function(){    

      $http({
         method : "GET",
         url : "/getMyProfile",
         data : { 
      }
      }).success(function (response) {
        $scope.data = response;
        
    });
    } // end onload to get

  $scope.editprofile = function($location){    

    console.log("User username angular: " +$scope.username);
    console.log("User lastname angular: " +$scope.lastname);
      $http({
         method : "POST",
         url : "/editMyProfile",
         data : { "password" : $scope.password, 
                  "firstname" : $scope.firstname, 
                  "lastname" : $scope.lastname, 
                  "email" : $scope.email, 
                  "gender" : $scope.gender, 
                  "dob" : $scope.dob, 
                  "location" : $scope.location, 
                  "contact_information" : $scope.contact_information
      }
      }).success(function (response) {
       
       // reload the page to display new values
       
    });
    } // end editprofile 
});
