var ejs = require("ejs");
var mq_client = require('../rpc/client');



exports.userpage = function (req, res){
	var user = req.params.name;
	console.log("name got = "+user);
	console.log("session username is :" + req.session.username);
	res.render("users",{"user":user, sessionUsername:req.session.username});
};


exports.userTweetInfo = function (req,res)
{
	var username = req.param("username");
	var msg_payload = { "username": username};
		
	console.log("In POST Request = username:"+ username);
	
	mq_client.make_request('userTweetInfo_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("Received userTweetInfo query result from RabbitMQ server");
				console.log("tweetCount:" + results.tweetCount);
				console.log("username:" + results.username);
				console.log("tweet:" + results.tweets);
				res.send({ tweetObj: results.tweetObj,
						   code: results.code});
			}
			else {
			console.log("Invalid Login" + results.code);
				res.send({value:"User Tweet info Query failed", code:results.code});
			}
		}  
	});
} 		// end function userTweetInfo