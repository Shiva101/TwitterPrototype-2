var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Lab2MongoDB";



exports.handle_request_userTweetInfo = function (msg, callback){
	
	var res = {};
	console.log("In handle_request_userTweetInfo:"+ msg.username);
	var username = msg.username;

	if (username!== ''){
		mongo.connect(mongoURL, function(){
		console.log('line 12Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('mytt');
		coll.findOne({username: username}, function(err, user){
			if (user) {
				console.log("Query for usertweetinfo  success");
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
	
}	// end handle_request_userTweetInfo


exports.handle_request_searchTweetInfo = function (msg, callback){
	
	var res ={};
	console.log("In handle_request_searchTweetInfo:"+ msg.q);
	var q = msg.q;

	if (q!== ''){
		mongo.connect(mongoURL, function(){
		console.log('line 12Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('globaltt');
		coll.findOne({$text:{$search:q}}, {_id:0, username:1, text:1, time:1}, function(err, user){
			if (user) {
				console.log("Query for searchtweetinfo  success");

				console.log("user:" + user);
				//console.log("username from mongodb:" + user.username);
				//console.log("tweets from mongodb:" + user.time);
				//res.username = user.username;
				//res.tweets = user.tweets;
				//res.tweetCount =  user.tweetCount;
				//res.value = "Query success";	
				res.code = "200";
				res.myObj = user;
				
			}
			 else {
				console.log("Search query failed" + err);
				res.code = "500";
				res.value = "Search Query failed";
			}
			callback(err, res);
		}); // end findOne
	});  // end mongo.connect
	}// end if
	
}	// end handle_request_searchTweetInfo