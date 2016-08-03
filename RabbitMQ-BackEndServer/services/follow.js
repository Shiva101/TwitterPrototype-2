var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Lab2MongoDB";


exports.handle_request_follow = function (msg, callback){
	
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
}	// end handle_request_follow




exports.handle_request_unfollow = function (msg, callback){
	
	var res = {};
	console.log("In  handle_request_unfollow:"+ msg.username);
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
}	// end handle_request_unfollow