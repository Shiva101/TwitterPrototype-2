
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
     if (exp[3]=="search"){
      var q = exp[4];}
      console.log("search term is : " + q);


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
    
    
    searchTweetInfo = function(){    
    $http({
         method : "POST",
         url : "/searchTweetInfo",
         data : { "q": q
    }
    }).success(function (res) {
        $scope.searchTweets = res;
        //$scope.tweetOwner = res.tweetObj.username;
        console.log("Angular: Received all search tweets");
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
        
        searchTweetInfo();        
    }

});
