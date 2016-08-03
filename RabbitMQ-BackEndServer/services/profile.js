var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Lab2MongoDB";

exports.handle_request_profileInfo = function (msg, callback){
	
	var res = {};
	console.log("In handle_request_profileInfo:"+ msg.username);
	var username = msg.username;

	if (username!== ''){
		mongo.connect(mongoURL, function(){
		console.log('line 12Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('myprofile');
		coll.findOne({username: username}, {_id:0, followerCount:1, followingCount:1, tweetCount:1},
				 function(err, user){
			if (user) {
				console.log("Query for profile details success");
				console.log("followingCount count:" + user.followingCount);
				res.tweetCount = user.tweetCount;
				res.followingCount = user.followingCount;
				res.followerCount =  user.followerCount;
				res.code = "200";
				res.value = "Query success";		
			}
			 else {
				console.log("Query failed" + err);
				res.code = "500";
				res.value = "Query failed";
			}
			callback(err, res);
		}); // end findOne
	});  // end mongo.connect
	}// end if
	
}	// end handle_request_profileInfo


exports.handle_request_allTweetInfo = function (msg, callback){
	
	var res = {};
	console.log("In handle_request_allTweetInfo:"+ msg.username);
	var username = msg.username;

	if (username!== ''){
		mongo.connect(mongoURL, function(){
		console.log('line 12Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('mytt');
		coll.findOne({username: username}, function(err, user){
			if (user) {
				console.log("Query for alltweetinfo  success");
				console.log("tweetCount count:" + user.tweetCount);
				console.log("username from mongodb:" + user.username);
				console.log("tweets from mongodb:" + user.tweets);
				res.username = user.username;
				res.tweets = user.tweets;
				res.tweetCount =  user.tweetCount;
				res.code = "200";
				res.value = "Query success";	
				res.tweetObj = user;	
			}
			 else {
				console.log("Query failed" + err);
				res.code = "500";
				res.value = "Query failed";
			}
			callback(err, res);
		}); // end findOne
	});  // end mongo.connect
	}// end if
	
}	// end handle_request_allTweetInfo




exports.handle_request_postTweet = function (msg, callback){
	
	var res = {};
	console.log("In  handle_request_postTweet:"+ msg.username);
	var username = msg.username;
	var tweet_text = msg.tweet_text;
	var time = Date.now();
	
  	if (username!== ''){
		mongo.connect(mongoURL, function(err, db){
		console.log('To check user existance . Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');
		coll.findOne({username: username}, function(err, user){
			if (user) {
				console.log("user with " + username + " exist.");
				console.log('To add new tweet. Connecting to mytt collection');
				var coll = mongo.collection('mytt');
				coll.update({username: username}, {$push:{tweets: {text:tweet_text, time:time}},"$inc": {"tweetCount":1}}, 
					function(err, user){
				if (user) {
					console.log('To add new tweet to globaltt collections');
					var coll = mongo.collection('globaltt');
					coll.insert({username: username, text:tweet_text, time:time}, function(err, user){
					if (user) {
						console.log("To increase tweet count in myprofile collection");
						var coll = mongo.collection('myprofile');
						coll.update({username: username}, {"$inc": {"tweetCount":1}}, function(err, user){
						if (user) {
							console.log("Added new tweet to mytt and globaltt, tweetCount updated in myprofile collection");
							res.code = "201";
							res.value = "Sucessfully added new tweet to db";		
						}
						callback(err, res);
						}); // end collection.update for myprofile
					}
					}); // end collection.insert for globaltt
				}
				}); // end collection.update mytt
			}  // end else to check user existance 
		}); // end findOne
	});  // end mongo.connect
	}// end if
}	// end handle_request

