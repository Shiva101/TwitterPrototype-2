
	
	angular.module('firstAngulatApp',[])
	
	function personController($scope,$http,$location) {
		
	    $scope.var1 = "abcd";
		$scope.signIn = function() {
			$http({
	            method: 'POST',
	            url: '/signin',
	            data: { "username": $scope.inputUsername, "password": $scope.inputPassword }
	            
	         }).success(function(response){
	           
	            alert(JSON.stringify(response));
	            
	            if(response.login == "Success")
	           		window.location = '/success_login';
	            else
	            	window.location = '/fail_login';
	        }).error(function(error){
	            alert("error");
	        });
	    };
	}
