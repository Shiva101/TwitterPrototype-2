
var app = angular.module('following', ['ngRoute']);

app.controller('mainController', function($scope, $http, $location){
  $scope.tweet_created_at = Date.now();
  var userpath= $location.absUrl();
  exp = userpath.split("/"); //to array
  var user= exp[3];  
  console.log("user is" + user)
      
    getFollowingInfo = function(){  
        $http({
           method : "POST",
           url : "/getFollowingInfo",
           data : {"user": user
        }
        }).success(function (response) {
          $scope.following = response.followingInfo;
          $scope.followingCount = response.count ;
          console.log("Angular: Followingcount is " + response.count);
      });
    }  // end function  getFollowingCount 
    

    getFollowersInfo = function(){    
        $http({
           method : "POST",
           url : "/getFollowersInfo",
           data : { "user": user
        }
        }).success(function (response) {
          $scope.followers = response.followersInfo;
          $scope.followersCount= response.count ;
          console.log("Angular: Followerscount is " + response.count);
      });
    }  // end function  getFollowersCount 


    getMyTweetsInfo = function(){    
    $http({
         method : "POST",
         url : "/getMyTweetsInfo",
         data : { "user": user
    }
    }).success(function (response) {
        $scope.myTweets = response.myTweetsInfo;
        $scope.myTweetsCount= response.count;
        console.log("Angular: my tweetcount is " + response.count);
    });
    }  // end getMyTweets
    
    $scope.follow  = function(){    
      var userpath= $location.absUrl();
      exp = userpath.split("/"); //to array
      if (exp[3]=="user"){
       var user = exp[4];

        $http({
           method : "POST",
           url : "/follow",
           data : { "userpagename" : user
        }
        }).success(function (response) {
              $scope.followbutton=true;
              $scope.followingbutton=false;   
              $scope.followersCount = $scope.followersCount + 1;
       });
    }}  // end function  follow

      $scope.unfollow  = function(){    
        var userpath= $location.absUrl();
        exp = userpath.split("/"); //to array
        if (exp[3]=="user"){
        var user = exp[4];

        $http({
           method : "POST",
           url : "/unfollow",
           data : { "userpagename" : user
        }
        }).success(function (response) {
              $scope.followbutton=false;
              $scope.followingbutton=true;   
              $scope.followersCount = $scope.followersCount - 1;
      });
    }}  // end function  follow

    $scope.userProfile = function(){
        getMyTweetsInfo();
        getFollowingInfo();
        getFollowersInfo();
        
    }

});

