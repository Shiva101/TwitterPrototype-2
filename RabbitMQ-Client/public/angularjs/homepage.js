
var app = angular.module('tweetApp', ['ngRoute']);

app.controller('mainController', function($scope, $http){
  $scope.tweet_created_at = Date.now();
  $scope.followerCount= 0;
  $scope.followingCount= 0;      
  $scope.myTweetsCount = 0;
  $scope.allTweetCount = 0;
  var sessionUsername = document.getElementById("username").innerHTML;
  console.log("homepage session user name is: " + sessionUsername);

  $scope.postTweet = function(){
  $http({
      method : "POST",
      url : '/postTweet',
      data : {
        "tweet_text": $scope.tweet_text
      }
    }).success(function(response) {
        console.log("Angular: New tweet added");
        $scope.tweetCount = $scope.tweetCount + 1;
        $scope.allTweetCount = $scope.allTweetCount + 1;
        allTweetInfo();
        $scope.tweet_text='';
      }).error(function(error){
        console.log("Angular: New tweet failed to add");
    });
  };// end posttweet

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

    allTweetInfo = function(){    
    $http({
         method : "POST",
         url : "/allTweetInfo",
         data : { "username": sessionUsername
    }
    }).success(function (res) {
        $scope.multiUser = res.tweetObj;
        console.log("Angular: Received all tweet info");
    });
    }  // end getMyTweets
    
    
    getMyTweetsInfo = function(){    
    $http({
         method : "POST",
         url : "/getMyTweetsInfo",
         data : { "user": sessionUsername
    }
    }).success(function (response) {
        //$scope.myTweets = response.allTweetsInfo;
        $scope.myTweetsCount= response.count;
        console.log("Angular: my Tweetscount is " + response.count);
    });
    }  // end getMyTweets

    getProfileInfo = function(){    
    $http({
         method : "POST",
         url : "/profileInfo",
         data : { "username": sessionUsername
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
        //getMyTweetsInfo();
        getProfileInfo();
        allTweetInfo();
        //getFollowingInfo();
        //getFollowersInfo();
    }

});
