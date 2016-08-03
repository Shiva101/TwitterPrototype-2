//loading the 'login' angularJS module
var signup = angular.module('signup', ['ngRoute']);
//defining the login controller
signup.controller('signup', function($scope, $http) {
$scope.gender= "M";
$scope.dob= "2006-04-24";

	$scope.signUp = function() {
		$http({
            method: 'POST',
            url: '/signup',
            data: { "username": $scope.username, 
            		"password": $scope.password,
                    "gender": $scope.gender,
            		"firstname": $scope.firstname,
            		"lastname": $scope.lastname,
            		"email": $scope.email,
            		"dob": $scope.dob
            		 }	            
         }).success(function(response){            
            if(response.code == 201){
            	alert(response.Signup);
           		window.location = '/success_signup';
           	}
            else if(response.code == 409){
                alert(response.Signup);
                $scope.username = '';
            }
            else if(response.code == 400){
                alert(response.Signup);
                $scope.email = '';
            }
        }).error(function(error){
            alert("error");
            $scope.unexpected_error = true;
        });
    };

	$scope.displaySignin = function() {
		window.location.assign("/signin"); 
	};	
});
