var ejs = require("ejs");
var mq_client = require('../rpc/client');

exports.profileInfo = function (req,res)
{
	var username = req.param("username");
	var msg_payload = { "username": username};
	console.log("In POST Request = username:"+ username);
	
	mq_client.make_request('profileInfo_queue',msg_payload, function(err,results){
		//end function 
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("Received profile query result from RabbitMQ server");
				res.send({ tweetCount: results.tweetCount,
						   followingCount: results.followingCount,
						   followerCount: results.followerCount,
						   code: results.code});
			}
			else {
				console.log("Invalid Login" + results.code);
				res.send({value:"Profile information Query", code:results.code});
			}
		}  
	});
} 		// end function profileInfo


exports.allTweetInfo = function (req,res)
{
	var username = req.param("username");
	var msg_payload = { "username": username};
		
	console.log("In POST Request = username:"+ username);
	
	mq_client.make_request('allTweetInfo_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("Received allTweetInfo query result from RabbitMQ server");
				console.log("tweetCount:" + results.tweetCount);
				console.log("username:" + results.username);
				console.log("tweet:" + results.tweets);
				res.send({ tweetObj: results.tweetObj,
						   code: results.code});
			}
			else {
			console.log("Invalid Login" + results.code);
				res.send({value:"All Tweet info Query failed", code:results.code});
			}
		}  
	});
} 		// end function getAllTweetInfo


exports.postTweet = function (req,res)
{
	var username = req.session.username;
	var tweet_text = req.param("tweet_text");
	var msg_payload = { username: username, "tweet_text": tweet_text };
	console.log("In POST Request for signup = tweet_text:"+ tweet_text);
	
	mq_client.make_request('postTweet_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			
			if (results.code == 201) {    			
				console.log( results.code + ":" + results.value);
				res.send({code:201});
			}
			else {    			
				console.log( "Error occured while posting new tweet");
				res.send({code:500});
			}
		}  
	});
}   // end function postTweet



