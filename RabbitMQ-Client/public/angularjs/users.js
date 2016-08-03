
var app = angular.module('tweetApp', ['ngRoute']);

app.controller('mainController', function($scope, $http, $location){
  $scope.tweet_created_at = Date.now();
  $scope.followerCount= 0;
  $scope.followingCount= 0;      
  $scope.myTweetsCount = 0;
  $scope.allTweetCount = 0;
  var sessionUsername = document.getElementById("username").innerHTML;
  console.log("homepage session user name is: " + sessionUsername);
  var userpath= $location.absUrl();
  exp = userpath.split("/"); //to array
     if (exp[3]=="users"){
      var user = exp[4];}
      console.log("Page is for the user: " + user);


  $scope.searchTweets = function(){
    var q = $scope.searchKeyword;
    console.log("searchKeyword is " + q);

    $http({
      method : "GET",
      url : "/search/"+q,
      data : { 
      }
    }).success(function(response) {
      window.location.assign("/search/" +q);
      $scope.myTweets=response;
    }).error(function(error) {
      
    });
  };  // end searchTweets users
    
    
    userTweetInfo = function(){    
    $http({
         method : "POST",
         url : "/userTweetInfo",
         data : { "username": user
    }
    }).success(function (res) {
        $scope.myTweets = res.tweetObj.tweets;
        $scope.tweetOwner = res.tweetObj.username;
        console.log("Angular: Received all tweet info");
    });
    }  // end getMyTweets

    getProfileInfo = function(){    
    $http({
         method : "POST",
         url : "/profileInfo",
         data : { "username": user
    }
    }).success(function (res) {
        $scope.tweetCount = res.tweetCount;
        $scope.followingCount = res.followingCount;
        $scope.followerCount = res.followerCount;
        console.log("Angular: tweetCount:" + res.tweetCount + " followingCount:" +
                    res.followingCount + " followerCount:" + res.followerCount);
    });
    }  // end getMyTweets


    $scope.userProfile = function(){
        
        getProfileInfo();
        userTweetInfo();
        
    }

});
