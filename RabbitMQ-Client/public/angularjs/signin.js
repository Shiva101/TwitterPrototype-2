//loading the 'login' angularJS module
var signin = angular.module('signin', ['ngRoute']);
//defining the login controller
signin.controller('signin', function($scope, $http) {

	
	//angular.module('signin',[])
	
	//function signin($scope,$http,$location) {
		
	  //  $scope.var1 = "abcd";
		$scope.signIn = function() {
			$http({
	            method: 'POST',
	            url: '/signin',
	            data: { "username": $scope.username, "password": $scope.password }
	            
	         }).success(function(response){
	            //alert(JSON.stringify(response));
	            if(response.login == "Success")
	           	window.location.assign("/homepage"); 
	            else{
		            $scope.invalid_login = true;
		            $scope.username = '';
		            $scope.password = '';
		        }
	        }).error(function(error){
	            alert("error");
	            $scope.unexpected_error = true;
	        });
	    };
	//}

	$scope.displaySignup = function() {
		window.location.assign("/signup"); 
	};	
});
